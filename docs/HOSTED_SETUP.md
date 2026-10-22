# Hosted video service: setup

Pieces: the **site** (Cloudflare Pages, already live) calls a **runner** (this repo's `studio/`, in a container) that does the real work with Claude Opus 5.5. Nothing is switched on for visitors until you add the two Pages variables in step 4.

## What exists in the repo
| Piece | Where |
|---|---|
| Upload page | `studio.html` (`/studio`, hidden from search, not linked from the nav yet) |
| Job API (Pro only, monthly allowance, refunds on failure) | `functions/api/jobs/**`, `functions/_lib/jobs.js`, tests `scripts/test-jobs.mjs` |
| Runner service + image | `studio/server.mjs`, `studio/Dockerfile` |
| Cloudflare wrapper for the runner | `workers/runner/` |

## Steps
1. **Deploy the runner Worker** (needs Docker running locally, or a CI build):
   `cd workers/runner && npm install && npx wrangler login && npx wrangler deploy`
   Cloudflare Containers needs the Workers Paid plan.
2. **Set its secrets** (you type them; they are never shown in chat):
   `npx wrangler secret put RUNNER_SECRET` (any long random string)
   `npx wrangler secret put ANTHROPIC_API_KEY` (your Anthropic key; skip it and jobs use the plain fallback design, no Opus)
3. Note the Worker URL (`https://p2v-runner.<your-subdomain>.workers.dev`).
4. **Pages > powerpoint2vid > Settings > Variables and Secrets**, add: `RUNNER_URL` (the Worker URL), `RUNNER_SECRET` (same value as step 2, as a Secret), optional `MONTHLY_VIDEOS` (default 10). Redeploy.
5. Log in with a Pro account, open `/studio`, upload a small deck.

## Known limits (be honest with customers)
- Finished videos live on the runner for about 6 hours (`JOB_TTL_HOURS`), then expire. Persisting to R2 is the next step.
- One video renders at a time (`P2V_CONCURRENCY=1`); a 5-slide deck took ~9 minutes of rendering on a 2-core machine in testing. Scale with `max_instances` and a queue before heavy use.
- Cloudflare Containers wiring (`workers/runner`) was written against the docs and has not been deployed from here; the runner itself was tested locally.
- GSAP (no-charge licence) and Piper voice (en_US-lessac) licences should be re-checked before launch.
- Before turning this on publicly: add a privacy page and update the homepage FAQ line "Everything runs in your browser".
