# Showcase series: Famous Decks, Reimagined

**Status:** plan, drafted 24 Oct 2026. Nothing here is scheduled. It sits outside the 90-day calendar in `content/blog/calendar.json` so the daily publishing flow is untouched.

## 1. Idea

Take well-known, publicly shared slide decks and run them through PowerPoint2Vid Pro. Publish each as a short before/after: the original deck on one side, the a.i.-directed explainer video on the other.

This proves the edge better than any feature list: ordinary slides in, extraordinary video out. A famous deck gives the demo a built-in audience and a familiar starting point.

## 2. Why it works for us

- **Demonstrates the upgrade, not just conversion.** Viewers see the story tightened, scenes redesigned and animation timed to the voice.
- **Borrowed attention.** People already search for these decks by name.
- **Natural link to the "Founders: Turning Your Pitch Deck into a Video" post (day 70) and the Convert & Create cluster.**
- **Reusable assets.** Each teardown gives a video for the blog, YouTube (@PowerPoint2Vid) and social.

## 3. Candidate decks

Status is from memory and must be checked before any work starts (see section 4).

| Priority | Deck | Why it makes a strong explainer | Main risk / check |
|---|---|---|---|
| 1 | Airbnb seed deck (2009) | Clear story: problem, solution, market, traction. Widely cited as a classic. | Confirm the original source and who published it. |
| 2 | Netflix culture deck (2009) | Very text-heavy, so the before/after shows the "upgrade and enhance" edge most clearly. | Confirm the publisher, the current licence and whether it is still hosted by Netflix. |
| 3 | YouTube Series A deck (2005) | Short, punchy, and the product is inherently visual. | Confirm who released it and when. |
| 4 | LinkedIn Series B deck (2004) | Good "how a network idea gets explained" story. | Confirm it was released by the company or founder. |
| 5 | Uber early deck (2008) | Short, simple arc, mostly visual. Needs reframing around the idea rather than the investor ask. | Provenance unclear. Do not use unless a first-party release is confirmed. |
| Pool | Buffer, Coinbase, Square, Intercom, others | Variety for later episodes. | Check each one individually. |
| Stretch | Al Gore climate slideshow | Not a pitch, but a strong data-storytelling test. | Different rights situation. Treat as a separate decision. |

## 4. Rights and approach

- Decks are still copyrighted unless the owner says otherwise. "Publicly available" does not mean "licensed for reuse".
- Only use decks the company or founders released themselves. Leaked or second-hand decks are out for public marketing.
- Before each episode: record the original source URL, the publisher, and any licence or terms in a short `source.md` next to the work.
- Frame every episode as commentary and teardown: credit the source on screen and in the description, link to the original, and say clearly that it is an independent re-imagining.
- Where practical, ask the owner for permission. A yes is a bonus, not a prerequisite for commentary, but a no ends that episode.
- Do not imply endorsement by the company. No logos beyond what is in the cited original, and no invented quotes.
- Get a quick legal read on the series format before the first public release.

## 5. Episode format

Each episode is one page plus one video.

1. **Hook.** One line on why this deck matters.
2. **The original.** Link to the source and show a few slides.
3. **The reimagined video.** The Pro-made explainer, embedded.
4. **What changed.** Three to five specific changes (story tightened, chart rebuilt as an animated chart with the same numbers, key points landing on the word that names them, transitions, captions). Only describe changes we can actually point to in the output.
5. **Try it.** Short closing section linking to the PowerPoint to video converter at `/`, with Basic as the way to try it and Pro for a.i.-directed videos. `/pricing` at most once.

## 6. Copy rules

Follow `content/blog/PRODUCT_CLAIMS.md` and `content/blog/WRITER_BRIEF.md`:

- Never the word "free". Use "no subscription needed" for Basic.
- No invented statistics, studies or quotes. Describe original decks only as far as the cited source supports.
- a.i.-directed claims describe Pro. Never name Claude or Opus.
- No privacy, on-device or no-upload claims.
- Australian spelling.

## 7. Production

- Build each video on the Pro pipeline so it shows the real output quality. No manual polish that a customer could not get.
- The original deck is the input. Retyping or restyling it by hand first would undercut the demo.
- Keep a short written record of any manual fixes so the "what changed" section stays honest.

## 8. Rollout (proposal)

1. Pilot with Airbnb and Netflix, the two strongest before/after demos.
2. Review the results and the legal read, then decide whether to continue.
3. Publish as a small separate series, for example `/blog/showcase/`, rather than inserting into the 90-day calendar.
4. If it works, add YouTube versions and a showcase landing page.
5. After 30 days, check Search Console for impressions on the deck names and the "pitch deck video" and "powerpoint to video" keywords.

## 9. Open questions

- Which of the five priority decks have confirmed first-party sources and clear terms?
- Should episodes live under `/blog` or on a dedicated `/showcase` page?
- Do we approach the owners for permission before or after the pilot?
- Does the pilot go through the daily blog-video workflow or a one-off manual run?
