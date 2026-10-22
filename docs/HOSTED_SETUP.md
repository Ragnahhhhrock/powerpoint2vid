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
4. **Pages > powerpoint2vid > Settings > Variables and Secrets**, add: `RUNNER_URL` (the Worker URL), `RUNNER_SECRET` (same value as step 2, as a Secret), optional `MONTHLY_VIDEOS` (default 10), and `ELEVENLABS_API_KEY` (Secret, for narration; done Oct 2026). Redeploy.
5. Log in with a Pro account, open `/studio`, upload a small deck.

## Narration voices (ElevenLabs)
- `ELEVENLABS_API_KEY` lives in Pages. The job API sends it to the runner with each job (over HTTPS, behind `RUNNER_SECRET`); the runner keeps it in memory for that job only and never returns it. A runner secret of the same name, if set, takes priority.
- Key settings in ElevenLabs: restricted, Text to Speech = Access, Voices = Read, everything else No Access, monthly credit cap a little under the plan's credits.
- Voices offered in `/studio` are the list in `functions/_lib/jobs.js` (`VOICES`, first = default). Change the model with runner env `ELEVENLABS_MODEL` (default `eleven_multilingual_v2`).
- `studio/voice.py` reads the whole script as one continuous take (plus a throwaway closing line so the last word is never clipped), cuts it into scenes at the quietest point of each pause, and gives every scene a steady 0.9 s breath at scene changes. Word timestamps go into `beats[i].words` so animations land on the exact word. Silence after the voice is capped at 1.6 s even when a scene asks for a longer minimum. Responses are cached on the runner so retries don't spend credits twice.
- Final renders are sized to `P2V_MAX_MB` (default 22 MB) in one encode, under Cloudflare Pages' 25 MB file limit.
- If ElevenLabs fails (quota, outage), the whole video falls back to the local Piper voice so the job still finishes (`voiceFallback` in plan.json).
- Credits are roughly one per character of narration: a 10-slide deck is about 2,000 to 5,000.

## Known limits (be honest with customers)
- Finished videos live on the runner for about 6 hours (`JOB_TTL_HOURS`), then expire. Persisting to R2 is the next step.
- One video renders at a time (`P2V_CONCURRENCY=1`); a 5-slide deck took ~9 minutes of rendering on a 2-core machine in testing. Scale with `max_instances` and a queue before heavy use.
- Cloudflare Containers wiring (`workers/runner`) was written against the docs and has not been deployed from here; the runner itself was tested locally.
- GSAP (no-charge licence) and Piper voice (en_US-lessac, now fallback only) licences should be re-checked before launch.
- Before turning this on publicly: add a privacy page and update the homepage FAQ line "Everything runs in your browser".

## Deploying from GitHub instead of a terminal
`.github/workflows/deploy-runner.yml` builds and deploys the runner on GitHub's servers. Add these repo secrets (Settings > Secrets and variables > Actions): `CLOUDFLARE_API_TOKEN` ("Edit Cloudflare Workers" template), `CLOUDFLARE_ACCOUNT_ID`, `RUNNER_SECRET`, `ANTHROPIC_API_KEY`. Then run the workflow from the Actions tab. Steps 3-5 above still apply for the Pages variables.
