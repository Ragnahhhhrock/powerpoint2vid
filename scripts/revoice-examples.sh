#!/bin/bash
# Re-voice and re-render the Pro example videos with ElevenLabs narration, then package them for the site.
# The Basic demo (assets/example) is left alone.
# Needs: ELEVENLABS_API_KEY, Python 3, Node + studio deps (npm ci in studio/), ffmpeg, Chromium (Playwright).
# Usage (from repo root): scripts/revoice-examples.sh [only-id]
#   ids: explainer lecture pitch onboarding (comma-separated for several, e.g. lecture,pitch)
set -euo pipefail
[ -n "${ELEVENLABS_API_KEY:-}" ] || { echo "ELEVENLABS_API_KEY is not set"; exit 1; }
ONLY=${1:-}

# id | studio example | ElevenLabs voice (see VOICES in functions/_lib/jobs.js)
EXAMPLES="
explainer|explainer-v3|JBFqnCBsd6RMkjVDRZzb
lecture|solar-lecture|IKne3meq5aSn9XLyUdCD
pitch|pitch-tidewell|EXAVITQu4vr4xnSDxMaL
onboarding|onboarding-harbour|XrExE9yKIg1WjnnlVkGX
"

for row in $EXAMPLES; do
  IFS='|' read -r id ex voice <<<"$row"
  [ -z "$ONLY" ] || [[ ",$ONLY," == *",$id,"* ]] || continue
  src=studio/examples/$ex
  echo "=== $id ($ex) voice $voice"
  P2V_TTS_VOICE=$voice DATA_DIR=$PWD/.tts-cache python3 studio/voice.py "$src"
  python3 -c "import json,sys; p=json.load(open('$src/plan.json')); sys.exit(0 if p.get('voiceProvider')=='elevenlabs' and not p.get('voiceFallback') else 'ElevenLabs narration failed for $id')"
  node studio/render.mjs "$src"

  if [ "$id" = explainer ]; then
    # homepage hero + first showcase video
    d=assets/example-v3; n=explainer-v3b
    # the render is already web-ready and sized to its budget (P2V_MAX_MB): copy it, don't re-encode
    cp "$src/out/video.mp4" "$d/$n.mp4"; cp "$src/out/video.webm" "$d/$n.webm"
    ffmpeg -y -loglevel error -i "$src/out/poster.jpg" -vf scale=1280:-1 -q:v 3 "$d/$n-poster.jpg"
    cp "$src/out/captions.vtt" "$d/$n-captions.vtt"
    secs=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$d/$n.mp4" | awk '{printf "%d", $1+0.5}')
    sed -i -E "s/(<small>5 slides · )[0-9]+ sec/\1$secs sec/; s/(explainer-v3b\.mp4\", \"uploadDate\": \"[0-9-]+\", \"duration\": \"PT)[0-9]+S/\1${secs}S/" index.html
  else
    scripts/package-showcase.sh "$src" "$id"
  fi
done

# Cloudflare Pages rejects files over 25 MB: stop before publishing anything that big
big=$(find assets -type f -size +24M); [ -z "$big" ] || { echo "too big for Cloudflare Pages: $big"; exit 1; }

# Cache-bust: /assets/* is served immutable, so bump the version on every video, poster and caption URL.
v=$(date -u +%Y%m%d%H%M)
sed -i -E "/assets\/|AV = /s/\?v=[0-9]{12}/?v=$v/g; s/showcase\.js\?v=[0-9]{12}/showcase.js?v=$v/" index.html js/showcase.js
echo "done, asset version $v"
