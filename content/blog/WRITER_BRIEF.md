# Writer brief: PowerPoint2Vid blog

You are writing blog posts for https://powerpoint2vid.com, an online PowerPoint to video converter. Read `docs/BLOG_STRATEGY.md` (personas, pillars, rules) and `content/blog/calendar.json` (every post's day, date, title, slug, keyword, persona, pillar) before writing.

## Output
One file per post: `content/blog/<slug>.md` (slug exactly as in calendar.json). Format:

```
---
title: <exact title from calendar>
slug: <slug>
date: <date from calendar>
description: <meta description, 140-158 characters, includes the target keyword naturally>
keyword: <keyword from calendar>
pillar: <pillar key from calendar>
persona: <persona from calendar>
---

<intro paragraph(s), no H1 — the title is rendered separately>

## <H2 sections> ...
```

- 900 to 1,300 words of body.
- The target keyword appears in the first paragraph and in at least one H2 (natural wording, no stuffing).
- Use H2 and H3, short paragraphs, bulleted or numbered lists where they help, and at most one markdown table. A "Quick checklist" or "Key takeaways" list near the end is good.
- End with a short H2 section that ties the topic back to turning slides into video, linking to the converter at `/` with anchor text containing "PowerPoint to video converter" (e.g. `[PowerPoint to video converter](/)`). Mention `/pricing` only where it fits naturally (at most once).
- Include at least one concrete example (a sample slide headline, a before/after rewrite, a sample speaker-note script, etc.).
- Internal links to other blog posts: only to posts whose calendar date is EARLIER than this post's date, as `/blog/<slug>`, at most 2, and only where genuinely relevant. Never link to a post dated the same day or later.
- No images (none are available). No HTML. No emoji.

## Voice
Plain, confident, short sentences. Practical and specific; every section should give the reader something to do. Australian spelling (colour, organise, optimise, centre). Write for the post's persona but keep it useful to anyone. No hype words ("revolutionary", "game-changer", "unlock", "elevate", "seamless", "delve"). Don't open with "In today's fast-paced world" or similar.

## Hard rules
1. NEVER use the letters "free" anywhere — not "free", "for free", "free trial", "freedom", "hands-free", "royalty-free", "carefree", "frees up", "feel free". Rephrase instead (e.g. "licensed for reuse", "go ahead and", "gives you back time", "without your hands"). Also avoid any "costs nothing / no charge" framing. Grep your files for "free" (case-insensitive) before finishing and fix every hit.
2. No invented statistics, percentages, study names, survey results, quotes or named experts. You may refer to well-established ideas in general terms (e.g. "research on multimedia learning, such as Richard Mayer's work, suggests people learn better from words and pictures together than from words alone"; WCAG contrast ratios 4.5:1 / 3:1). If unsure, leave it out.
3. Product claims must match the facts below exactly. Never invent features.
4. Third-party products (PowerPoint, Google Slides, Keynote, Canva, YouTube, LinkedIn, Moodle, Canvas, Blackboard) — describe only well-known, stable features, in general terms (e.g. "Keynote can export a presentation as a PowerPoint file"). Don't give exact menu paths unless you're certain; prefer "look for the Export or Download option".
5. Be fair about alternatives (e.g. PowerPoint's own video export exists and records timings/narration you speak yourself). Don't disparage named competitors.

## Product facts (PowerPoint2Vid)
- Runs entirely in the browser: the .pptx is parsed, animated, narrated and recorded on the user's device. Slides are never uploaded.
- Input: PowerPoint .pptx files. Google Slides: download as Microsoft PowerPoint (.pptx) then drop it in (the Google Slides tab gives a download link). Other tools (Keynote, Canva) work by exporting to .pptx first. Old .ppt files need saving as .pptx first.
- Narration: the browser's built-in text-to-speech voices read the speaker notes. Narration script options: speaker notes, else slide text (default); speaker notes only; slide text only; no narration (silent). Available voices depend on the device and browser. Speaking speed is adjustable.
- Timing follows the speech; there's a "minimum seconds per slide" setting.
- Six video styles: Clean (full-bleed, shapes fade up), Minimal cinematic (slow push-in, blur-in reveals, vignette, light grain, lower-third captions), Keynote launch (slide as a rounded card on a dark stage, drifting camera, glass captions), UI springs (warm-grey canvas, springy motion), Kinetic poster (hard cuts, shapes slam in, bold HUD labels), Paper & ink (slide pinned to paper, film grain, hand-drawn underline, typewriter-tape captions).
- Transitions: crossfade, slide, zoom, none.
- Options: animate shapes in one by one; burn in captions (sentence-by-sentence, burned into the video — there is no separate caption file export); gentle zoom on images; record narration into the video (in Chrome, choose "this tab" and tick "share tab audio").
- Preview with voice is open to everyone. Exporting the video needs PowerPoint2Vid Pro: A$12 a month or A$99 a year (about A$8.25 a month). Unlimited slides and videos, no watermark, cancel any time.
- Export: the browser records in real time (keep the tab in the foreground). Output is usually WebM, or MP4 in browsers that support it. WebM plays in Chrome, Edge, Firefox and most editors and converts to MP4 with common tools.
- It does NOT do: AI avatars, stock footage, background music, timeline editing, voice cloning, recording your own microphone, direct upload to YouTube/LMS, caption files (SRT/VTT), team accounts (teams can email contact@powerpoint2vid.com).

When done, report the list of files you wrote and confirm a case-insensitive grep for "free" returns nothing in them.
