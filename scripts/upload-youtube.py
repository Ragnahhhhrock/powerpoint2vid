#!/usr/bin/env python3
"""Upload a blog post's explainer video to the PowerPoint2Vid YouTube channel.

Usage: python3 scripts/upload-youtube.py <slug> [--dry-run]
Reads  assets/blog-video/<slug>/{video.mp4,poster.jpg,captions.vtt,video.json}, content/blog/<slug>.md, content/blog/calendar.json
Writes assets/blog-video/<slug>/video.json  (adds "youtubeId" so a video is never uploaded twice)

Needs env: YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN (one-time OAuth, see docs/BLOG_VIDEOS.md).
The video is uploaded as private and scheduled to go public at 00:00 Perth time on the post's date, the moment the post goes live.
If that moment has already passed (manual re-run) it is made public straight away.
Until the Google project passes the YouTube API compliance audit, YouTube keeps API uploads private: publish them from YouTube Studio.
Quota: videos.insert 1,600 + captions.insert 400 + thumbnails.set 50 = 2,050 of the 10,000 daily units.
Stdlib only."""
import datetime, json, os, re, sys, urllib.error, urllib.parse, urllib.request, uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://powerpoint2vid.com"
BANNED = re.compile(r"free|claude|opus|anthropic|elevenlabs", re.I)


def api(method, url, token, body=None, headers=None, raw=False):
    req = urllib.request.Request(url, data=body, method=method, headers={"Authorization": f"Bearer {token}", **(headers or {})})
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            data = r.read()
            return (r, data) if raw else (json.loads(data) if data else {})
    except urllib.error.HTTPError as e:
        sys.exit(f"YouTube API {e.code} on {method} {url.split('?')[0]}: {e.read().decode()[:600]}")


def access_token():
    for k in ("YT_CLIENT_ID", "YT_CLIENT_SECRET", "YT_REFRESH_TOKEN"):
        if not os.environ.get(k): sys.exit(f"{k} is not set")
    body = urllib.parse.urlencode({"client_id": os.environ["YT_CLIENT_ID"], "client_secret": os.environ["YT_CLIENT_SECRET"],
                                   "refresh_token": os.environ["YT_REFRESH_TOKEN"], "grant_type": "refresh_token"}).encode()
    try:
        with urllib.request.urlopen(urllib.request.Request("https://oauth2.googleapis.com/token", data=body), timeout=60) as r:
            return json.load(r)["access_token"]
    except urllib.error.HTTPError as e:
        sys.exit(f"token refresh failed ({e.code}): {e.read().decode()[:300]}. If it says invalid_grant, redo the one-time sign-in and replace YT_REFRESH_TOKEN.")


def front_matter(slug):
    t = (ROOT / "content/blog" / f"{slug}.md").read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n", t, re.S)
    return {k.strip(): v.strip() for k, v in (l.split(":", 1) for l in m.group(1).splitlines() if ":" in l)}


def main():
    slug = sys.argv[1]; dry = "--dry-run" in sys.argv
    d = ROOT / "assets/blog-video" / slug
    meta_path = d / "video.json"
    meta = json.loads(meta_path.read_text())
    if meta.get("youtubeId"):
        print(f"already on YouTube: https://youtu.be/{meta['youtubeId']}"); return
    fm = front_matter(slug)
    title = fm["title"][:90] + " | PowerPoint2Vid"
    desc = (f"{fm['description']}\n\nRead the full post: {SITE}/blog/{slug}\n\n"
            f"PowerPoint2Vid turns ordinary slides into extraordinary explainer videos: {SITE}/\n\n"
            f"Transcript:\n" + "\n".join(meta.get("transcript", [])))
    if BANNED.search(title + desc): sys.exit("banned wording in the YouTube title or description")
    tags = [t for t in (fm.get("keyword"), "PowerPoint to video converter", "explainer video", "presentation design") if t]
    go_live = next(datetime.datetime.fromisoformat(c["date"]).replace(tzinfo=datetime.timezone(datetime.timedelta(hours=8)))
                   for c in json.loads((ROOT / "content/blog/calendar.json").read_text()) if c["slug"] == slug)
    future = go_live > datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=10)
    status = {"privacyStatus": "private", "selfDeclaredMadeForKids": False, "embeddable": True}
    if future: status["publishAt"] = go_live.astimezone(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    else: status["privacyStatus"] = "public"
    snippet = {"title": title, "description": desc, "tags": tags, "categoryId": "27", "defaultLanguage": "en", "defaultAudioLanguage": "en"}
    if dry:
        print(json.dumps({"snippet": snippet, "status": status}, indent=1)[:1500]); return

    token = access_token()
    video = (d / "video.mp4").read_bytes()
    # resumable upload: start a session, then send the file
    r, _ = api("POST", "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status", token,
               json.dumps({"snippet": snippet, "status": status}).encode(),
               {"Content-Type": "application/json; charset=UTF-8", "X-Upload-Content-Type": "video/mp4", "X-Upload-Content-Length": str(len(video))}, raw=True)
    up = r.headers["Location"]
    vid = api("PUT", up, token, video, {"Content-Type": "video/mp4"})["id"]
    meta["youtubeId"] = vid; meta_path.write_text(json.dumps(meta, indent=1, ensure_ascii=False))   # record straight away
    print(f"uploaded: https://youtu.be/{vid} ({status['privacyStatus']}{', goes public ' + status.get('publishAt', '') if future else ''})")

    # captions and thumbnail are best effort: the video is already up
    try:
        b = uuid.uuid4().hex
        part = json.dumps({"snippet": {"videoId": vid, "language": "en", "name": "English", "isDraft": False}})
        body = (f"--{b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n{part}\r\n--{b}\r\nContent-Type: text/vtt\r\n\r\n").encode() + (d / "captions.vtt").read_bytes() + f"\r\n--{b}--".encode()
        api("POST", "https://www.googleapis.com/upload/youtube/v3/captions?uploadType=multipart&part=snippet", token, body, {"Content-Type": f"multipart/related; boundary={b}"})
        print("captions added")
    except SystemExit as e: print("captions skipped:", e)
    try:
        api("POST", f"https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId={vid}&uploadType=media", token, (d / "poster.jpg").read_bytes(), {"Content-Type": "image/jpeg"})
        print("thumbnail set")
    except SystemExit as e: print("thumbnail skipped (the channel may need phone verification):", e)


main()
