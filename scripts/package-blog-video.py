#!/usr/bin/env python3
"""Package a rendered blog explainer into web-ready assets for its post.

Usage: python3 scripts/package-blog-video.py <slug>
Reads  studio/blog/<slug>/out/{video.mp4,video.webm,poster.jpg,captions.vtt} and plan.json
Writes assets/blog-video/<slug>/{video.mp4,video.webm,poster.jpg,captions.vtt,video.json}

video.json carries the duration (seconds) and the narration transcript. scripts/build-blog.py embeds the
video in the post when assets/blog-video/<slug>/video.mp4 exists. Run build-blog.py afterwards.
"""
import json, shutil, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
slug = sys.argv[1]
job, dst = ROOT / "studio/blog" / slug, ROOT / "assets/blog-video" / slug
out = job / "out"
for f in ("video.mp4", "video.webm", "poster.jpg", "captions.vtt"):
    assert (out / f).exists(), f"missing {out / f}: render the job first (node studio/render.mjs studio/blog/{slug})"
dst.mkdir(parents=True, exist_ok=True)
# blog pages load a lighter 1280x720 encode than the 1080p master render
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(out / "video.mp4"), "-vf", "scale=1280:720", "-c:v", "libx264", "-preset", "slow",
                "-crf", "25", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "112k", "-movflags", "+faststart", str(dst / "video.mp4")], check=True)
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(out / "video.mp4"), "-vf", "scale=1280:720", "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
                "-row-mt", "1", "-c:a", "libopus", "-b:a", "96k", str(dst / "video.webm")], check=True)
shutil.copy(out / "captions.vtt", dst / "captions.vtt")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(out / "poster.jpg"), "-vf", "scale=1280:-1", "-q:v", "3", str(dst / "poster.jpg")], check=True)
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(dst / "video.mp4")],
                           capture_output=True, text=True, check=True).stdout.strip())
plan = json.loads((job / "plan.json").read_text())
meta = {"duration": round(dur, 1), "transcript": [s["narration"] for s in plan["scenes"]]}
(dst / "video.json").write_text(json.dumps(meta, indent=1, ensure_ascii=False))
for f in sorted(dst.iterdir()):
    print(f"{f.stat().st_size / 1e6:6.2f} MB  {f.relative_to(ROOT)}")
