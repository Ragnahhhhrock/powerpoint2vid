#!/bin/bash
# Package rendered studio examples into web-ready homepage showcase assets.
# Usage: scripts/package-showcase.sh <studio example dir> <showcase id>
#   e.g. scripts/package-showcase.sh studio/examples/solar-lecture lecture
# Writes assets/showcase/<id>/{video.mp4,video.webm,poster.jpg,captions.vtt,deck.pptx,slide-N.jpg}
set -euo pipefail
src=$1; id=$2; dst=assets/showcase/$id
mkdir -p "$dst"
if [ -f "$src/out/video.mp4" ]; then
  # the render is already web-ready and sized to its budget (P2V_MAX_MB in studio/render.mjs): copy, don't re-encode
  cp "$src/out/video.mp4" "$dst/video.mp4"; cp "$src/out/video.webm" "$dst/video.webm"
  ffmpeg -y -loglevel error -i "$src/out/poster.jpg" -vf scale=1280:-1 -q:v 3 "$dst/poster.jpg"
  cp "$src/out/captions.vtt" "$dst/captions.vtt"
fi
[ -f "$src/input-deck.pptx" ] && cp "$src/input-deck.pptx" "$dst/deck.pptx"
for f in "$src"/assets/slide-*.png; do
  n=$(basename "$f" .png)
  ffmpeg -y -loglevel error -i "$f" -vf scale=480:-1 -q:v 4 "$dst/$n.jpg"
done
ls -la "$dst"
