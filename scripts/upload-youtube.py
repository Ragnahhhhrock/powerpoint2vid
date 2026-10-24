#!/usr/bin/env python3
"""Upload a blog post's explainer video to the PowerPoint2Vid YouTube channel.

Usage: python3 scripts/upload-youtube.py <slug> [--dry-run]
Reads  assets/blog-video/<slug>/{video.mp4,poster.jpg,captions.vtt,video.json}, content/blog/<slug>.md, content/blog/calendar.json
Writes assets/blog-video/<slug>/video.json  (adds "youtubeId" so a video is never uploaded twice)

Needs env: YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN (one-time OAuth, see docs/BLOG_VIDEOS.md).
The video is uploaded as public straight away (set YT_PRIVACY=private or unlisted for a test).
If YouTube keeps API uploads private until the Google project passes the compliance audit, publish them from YouTube Studio.
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


def set_thumbnail(token, vid, d, meta, meta_path):
    set_thumbnail(token, vid, d, meta, meta_path)


main()
