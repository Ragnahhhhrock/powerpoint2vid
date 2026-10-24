#!/bin/bash
# Make, package and embed the explainer video for one blog post.
# Usage (repo root): scripts/make-blog-video.sh <slug> [--revoice]
#   default     full pipeline: post -> plain deck -> a.i. director (story, scenes, review) -> ElevenLabs narration -> render
#   --revoice   keep the existing scenes and only re-narrate and re-render (e.g. swap a Piper voice for ElevenLabs)
# Needs: ELEVENLABS_API_KEY, ANTHROPIC_API_KEY (not for --revoice), Python 3 (python-pptx, markdown, Pillow),
#        LibreOffice + pdftoppm, ffmpeg, Node + studio deps, Chromium (Playwright). See docs/BLOG_VIDEOS.md.
set -euo pipefail
slug=${1:?usage: make-blog-video.sh <slug> [--revoice]}; mode=${2:-}
job=studio/blog/$slug
[ -f "content/blog/$slug.md" ] || { echo "no post content/blog/$slug.md"; exit 1; }
[ -n "${ELEVENLABS_API_KEY:-}" ] || { echo "ELEVENLABS_API_KEY is not set"; exit 1; }
export P2V_TTS_VOICE=${P2V_TTS_VOICE:-JBFqnCBsd6RMkjVDRZzb}   # George, the blog narrator (same voice for every post)
export DATA_DIR=$PWD/.tts-cache

if [ "$mode" = "--revoice" ]; then
  python3 studio/voice.py "$job"
  python3 -c "import json,sys; p=json.load(open('$job/plan.json')); sys.exit(0 if p.get('voiceProvider')=='elevenlabs' and not p.get('voiceFallback') else 'ElevenLabs narration failed')"
  node studio/render.mjs "$job"
else
  [ -n "${ANTHROPIC_API_KEY:-}" ] || { echo "ANTHROPIC_API_KEY is not set"; exit 1; }
  rm -rf "$job/out" "$job/audio" "$job/scenes"
  node studio/blog-spec.mjs "$slug"
  python3 studio/examples/build_deck.py "$job"
  # --voice is only the Piper fallback; a fallback is rejected below so every post keeps the same narrator
  node studio/director.mjs "$job" --voice unused.onnx
  python3 -c "import json,sys; p=json.load(open('$job/plan.json')); sys.exit(1 if p.get('degraded') or p.get('voiceProvider')!='elevenlabs' or p.get('voiceFallback') else 0)" \
    || { echo "director fell back (template scenes or non-ElevenLabs voice): not publishing this video"; exit 1; }
fi

# house rules on what viewers will read and hear
if grep -qiE 'free|claude|opus|elevenlabs' "$job/out/captions.vtt"; then echo "banned wording in captions"; exit 1; fi
python3 scripts/package-blog-video.py "$slug"
python3 scripts/build-blog.py --no-images
big=$(find assets/blog-video -type f -size +24M); [ -z "$big" ] || { echo "too big for Cloudflare Pages: $big"; exit 1; }
echo "video ready for $slug"
