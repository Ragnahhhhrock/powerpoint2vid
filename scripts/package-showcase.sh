#!/bin/bash
# Package rendered studio examples into web-ready homepage showcase assets.
# Usage: scripts/package-showcase.sh <studio example dir> <showcase id>
#   e.g. scripts/package-showcase.sh studio/examples/solar-lecture lecture
# Writes assets/showcase/<id>/{video.mp4,video.webm,poster.jpg,captions.vtt,deck.pptx,slide-N.jpg}
set -euo pipefail
src=$1; id=$2; dst=assets/showcase/$id
mkdir -p "$dst"
if [ -f "$src/out/video.mp4" ]; then
  # web encode: 1080p, CRF 23, fast start (keeps files well under Cloudflare's 25 MB limit)
  ffmpeg -y -loglevel error -i "$src/out/video.mp4" -c:v libx264 -preset slow -crf 23 -maxrate 4500k -bufsize 9000k -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k "$dst/video.mp4"
  ffmpeg -y -loglevel error -i "$dst/video.mp4" -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -deadline good -cpu-used 4 -c:a libopus -b:a 96k "$dst/video.webm"
  ffmpeg -y -loglevel error -i "$src/out/poster.jpg" -vf scale=1280:-1 -q:v 3 "$dst/poster.jpg"
  cp "$src/out/captions.vtt" "$dst/captions.vtt"
fi
[ -f "$src/input-deck.pptx" ] && cp "$src/input-deck.pptx" "$dst/deck.pptx"
for f in "$src"/assets/slide-*.png; do
  n=$(basename "$f" .png)
  ffmpeg -y -loglevel error -i "$f" -vf scale=480:-1 -q:v 4 "$dst/$n.jpg"
done
ls -la "$dst"
