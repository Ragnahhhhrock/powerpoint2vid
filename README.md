# PowerPoint2Vid

Free, private PowerPoint to video converter at https://powerpoint2vid.com. Turns `.pptx` (and Google Slides exported as `.pptx`) into animated, narrated explainer videos, entirely in the browser.

- **Parse:** `js/pptx-parser.js` reads slides, shapes, images and speaker notes (JSZip, vendored).
- **Render/animate:** `js/renderer.js` draws slides to canvas with reveal animations, transitions and captions.
- **Narrate + record:** `js/app.js` uses the Web Speech API for voice and MediaRecorder for export (WebM, or MP4 where supported).
- **Design system:** `docs/STYLE_GUIDE.md` and `/style-guide.html`.

## Deploy (Cloudflare Pages)
Static site, no build step: framework preset *None*, build command empty, output directory `/`.

## Google tag gateway
`index.html` carries the Google tag with placeholder ID `G-XXXXXXXXXX`. Replace it, then in Cloudflare: zone > Google tag gateway > enable, enter the tag ID and a measurement path (e.g. `/metrics`).

## Regenerate share images
`python3 scripts/make-images.py` (needs Pillow and the Inter font).

Another [Mal Gordon](https://malgordon.com/) creation.
