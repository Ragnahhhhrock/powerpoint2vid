# PowerPoint2Vid

Private, online **PowerPoint to video converter** at https://powerpoint2vid.com. Turns `.pptx` (and Google Slides exported as `.pptx`) into animated, narrated explainer videos, entirely in the browser.

- **Parse:** `js/pptx-parser.js` reads slides, shapes, images and speaker notes (JSZip, vendored).
- **Render/animate:** `js/renderer.js` draws slides to canvas with reveal animations, transitions and captions.
- **Video styles:** `js/video-styles.js` presets (cinematic, keynote, UI springs, kinetic poster, paper & ink) adapted from [awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos) prompts. See `docs/VIDEO_STYLES.md`.
- **Narrate + record:** `js/app.js` uses the Web Speech API for voice and MediaRecorder for export (WebM, or MP4 where supported).
- **Design system:** `docs/STYLE_GUIDE.md` and `/style-guide.html`.

## Deploy (Cloudflare Pages)
Static site, no build step: framework preset *None*, build command empty, output directory `/`.

## Accounts and paywall (Pro subscription)
Previewing is open to everyone. **Exporting a video needs an account with an active Stripe subscription.** The gate is `canExport()` in `js/app.js`; it is a client-side gate, because the whole converter runs in the browser.

Flow: `/pricing` -> `/checkout?plan=monthly|yearly` -> (sign up or log in at `/account`) -> Stripe payment link with the account id in `client_reference_id` -> Stripe calls `/api/stripe-webhook` -> Pro switches on for that account.

| Path | Purpose |
|---|---|
| `functions/_lib/auth.js` | Password hashing (PBKDF2), signed session cookie, helpers |
| `functions/api/signup.js`, `login.js`, `logout.js`, `me.js` | Account API |
| `functions/api/stripe-webhook.js` | Verifies the Stripe signature and records subscription status |
| `functions/checkout.js` | Requires login, then redirects to the Stripe payment link (links are constants in this file) |
| `account.html`, `js/account.js` | Log in / create account / account page, shared account state |

**Setup (Cloudflare Pages > Settings > Variables and Secrets / Bindings):**
1. KV namespace binding named `ACCOUNTS` (production and preview).
2. Secret `SESSION_SECRET`: a long random string (e.g. `openssl rand -hex 32`).
3. Stripe Dashboard > Developers > Webhooks > add endpoint `https://powerpoint2vid.com/api/stripe-webhook` with events `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`. Copy its signing secret into a Cloudflare secret named `STRIPE_WEBHOOK_SECRET`.
4. Optional: activate the Stripe customer portal and set its login link as `PORTAL_URL` so the account page can show "Manage subscription".
5. Redeploy.

Until steps 1 to 3 are done, exporting shows "Accounts are being set up" (it fails closed). Test the backend with `node scripts/test-auth.mjs` (no network needed).

## Usage stats (homepage)
`functions/api/stats.js` (Cloudflare Pages Function) keeps four aggregate counters in KV: videos created, decks processed, slides, and video seconds. `js/stats.js` fetches them on page load and animates a stats strip, but only once **10+ videos** exist. Sample decks are not counted. Only numbers are stored, never files or content.
**Setup:** Cloudflare Pages > Settings > Functions > KV namespace bindings > add variable `STATS` pointing at a KV namespace (production and preview), then redeploy.

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
| `select_video_style` | Video style changed | `video_style` |
| `preview_start` | Preview with voice | `video_style`, voice/transition/speed/captions settings |
| `export_start` / `export_complete` / `export_cancel` | Video export lifecycle | settings, `slide_count`, `format`, `size_mb` |
| `export_unsupported` | Browser cannot record | |
| `new_deck` | New deck clicked | |
| `cta_click` / `contact_click` / `outbound_click` | Hero CTA, mailto, external links | `location`, `link_domain` |

## Homepage explainer video
The hero autoplays `assets/example/explainer.mp4` muted on load (WebM fallback, captions in `explainer-captions.vtt`); "Play with sound" restarts it with narration. It is rendered by `scripts/make-styled-explainer.py`, which builds the 5-slide deck (`explainer-deck.pptx`), narrates it with Piper, then draws every frame in headless Chromium with the app's own parser and renderer in a chosen video style (default `keynote`), so it matches a real export. Files under `/assets/*` are cached immutably (see `_headers`), so if you regenerate the video, rename the files or purge the Cloudflare cache.

## Regenerate share images
`python3 scripts/make-images.py` (needs Pillow and the Inter font).

Another [Mal Gordon](https://malgordon.com/) creation.
