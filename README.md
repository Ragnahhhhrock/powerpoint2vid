# PowerPoint2Vid

Free, private PowerPoint to video converter at https://powerpoint2vid.com. Turns `.pptx` (and Google Slides exported as `.pptx`) into animated, narrated explainer videos, entirely in the browser.

- **Parse:** `js/pptx-parser.js` reads slides, shapes, images and speaker notes (JSZip, vendored).
- **Render/animate:** `js/renderer.js` draws slides to canvas with reveal animations, transitions and captions.
- **Narrate + record:** `js/app.js` uses the Web Speech API for voice and MediaRecorder for export (WebM, or MP4 where supported).
- **Design system:** `docs/STYLE_GUIDE.md` and `/style-guide.html`.

## Deploy (Cloudflare Pages)
Static site, no build step: framework preset *None*, build command empty, output directory `/`.

## Google tag gateway
`index.html` carries the Google tag with tag ID `G-3F8MGRVD2L`. In Cloudflare: zone > Google tag gateway > enable, enter the tag ID and a measurement path (e.g. `/metrics`).

## Analytics events (GA4)
Fired from `js/app.js` via `gtag('event', ...)`. No file names or slide content are ever sent. In GA4, mark `deck_loaded` and `export_complete` as key events.

| Event | When | Params |
|---|---|---|
| `select_input_tab` | PowerPoint / Google Slides tab chosen | `input_tab` |
| `google_slides_download` | Slides link opened as .pptx | |
| `deck_upload` | .pptx chosen or dropped | `file_size_kb` |
| `deck_loaded` | Deck parsed (also sample) | `slide_count` |
| `deck_parse_error` | .pptx could not be read | |
| `sample_deck` | Sample deck used | |
| `preview_start` | Preview with voice | voice/transition/speed/captions settings |
| `export_start` / `export_complete` / `export_cancel` | Video export lifecycle | settings, `slide_count`, `format`, `size_mb` |
| `export_unsupported` | Browser cannot record | |
| `new_deck` | New deck clicked | |
| `cta_click` / `contact_click` / `outbound_click` | Hero CTA, mailto, external links | `location`, `link_domain` |

## Regenerate share images
`python3 scripts/make-images.py` (needs Pillow and the Inter font).

Another [Mal Gordon](https://malgordon.com/) creation.
