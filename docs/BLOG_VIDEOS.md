# Blog explainer videos

Every blog post gets a short explainer video made from its own content and embedded after the intro. The video is built the way a Pro video is: an ordinary deck goes in, a.i.-directed animated scenes come out (the scenes are written following `studio/prompts/scene.md`).

## Per post
1. **Job folder** `studio/blog/<slug>/spec.json`: brief (palette, motion, story) and 5 to 6 slides. Each slide has `title`, `bullets`, `notes` (the narration, taken from the post, 8 to 15 seconds spoken), a `storyboard` and a `transition`. Aim for 45 to 75 seconds in total. Use the post's own example, not new claims.
2. `python3 studio/examples/build_deck.py studio/blog/<slug>` makes `input-deck.pptx`, slide PNGs and `plan.json`.
3. `python3 studio/voice.py studio/blog/<slug> --voice /tmp/voices/en_US-lessac-medium.onnx` narrates it and writes beat timings. ElevenLabs is used instead when `ELEVENLABS_API_KEY` is set (see `.github/workflows/revoice-examples.yml`).
4. Write `studio/blog/<slug>/scenes/scene-N.js`, one per slide, landing visuals on spoken words with `ctx.at(beat, word)`.
5. `CHROMIUM_PATH=<chrome> node studio/render.mjs studio/blog/<slug> --draft` for a quick look, then without `--draft`. Check `out/review/` keyframes: text inside the frame, nothing blank, no overlaps.
6. `python3 scripts/package-blog-video.py <slug>` copies the MP4, WebM, poster and captions to `assets/blog-video/<slug>/` and records duration and transcript in `video.json`.
7. `python3 scripts/build-blog.py` embeds it (figure after the intro, captions track, transcript, `VideoObject` schema, `blog_video_play` GA event).
8. Commit and push. The post stays hidden until its publish date (see `functions/blog/_middleware.js`).

## Rules
- Same claims rules as the post (`content/blog/PRODUCT_CLAIMS.md`): never the word "free", no privacy or on-device claims, "a.i." not any model name, no invented statistics. On-screen and spoken product mentions describe Pro only.
- Australian spelling in captions and on-screen text. At most ~12 words of on-screen text per scene besides data.
- Rendered output (`studio/blog/*/out`, `audio`) is git-ignored. Only the packaged `assets/blog-video/<slug>/` files and the job's `spec.json`, `plan.json`, `scenes/`, `assets/` and `input-deck.pptx` are committed.
- Keep each file under 25 MB (Cloudflare Pages limit). Pilot video is about 5 to 8 MB.
