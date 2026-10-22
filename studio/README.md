# PowerPoint2Vid Studio (v2 prototype)

Server-side pipeline that turns ordinary slides into extraordinary explainer videos, with Claude Opus 5.5 as director and motion designer. Design: [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md).

| File | Does |
|---|---|
| `runtime/` | Scene runtime: `scene.html`, `scene-runtime.js` (the `P2V.scene(ctx)` contract), GSAP |
| `voice.py` | Narration per scene: ElevenLabs when `ELEVENLABS_API_KEY` is set (voice via `P2V_TTS_VOICE`), Piper otherwise or on failure; sentence beats from real audio timestamps |
| `render.mjs` | Frame-by-frame render in headless Chromium (`__seek(t)` per frame), transitions, audio mix, captions, poster, review keyframes |
| `director.mjs` | Opus 5.5 passes: story, scenes, review loop, then final render |
| `prompts/` | System prompts for the story, scene and review passes |
| `examples/explainer-v2/` | The 5-slide example: plain input deck, plan, and its scenes |

## Run
```bash
cd studio && npm i                                   # playwright
pip install piper-tts python-pptx                   # + LibreOffice, ffmpeg
# voice model: en_US-lessac-medium.onnx (+ .json) from huggingface.co/rhasspy/piper-voices

# Full pipeline on a job folder (plan.json + assets/slide-N.png):
ANTHROPIC_API_KEY=... node director.mjs <job> --voice en_US-lessac-medium.onnx
node director.mjs <job> --dry-run                    # show request sizes, no API calls

# Just re-render the example (scenes already written):
cd examples/explainer-v2 && python3 make-deck.py && python3 ../../voice.py . --voice <onnx> && node ../../render.mjs .
node ../../render.mjs . --only 3 --draft             # quick look at one scene
```

The example's scenes were written by Opus 5.5 in a Claude session, following `prompts/scene.md`, and checked against rendered keyframes the same way the review pass does. They were not produced by an API run of `director.mjs`. They are also the worked example `director.mjs` includes in the scene prompt.
