---
title: How to Simplify a Complex Technical Slide
slug: how-to-simplify-a-complex-technical-slide
date: 2026-12-22
description: Learn how to simplify a technical presentation one slide at a time. Find the single message, cut the detail into notes and rebuild the visual in steps.
keyword: simplify technical presentation
pillar: craft
persona: presenter
---

Every technical talk has one. The architecture diagram with 40 boxes. The results table with nine columns. The equation slide that made sense to you at midnight. If you want to simplify a technical presentation, start with those slides, because they are where audiences quietly stop following.

Simplifying does not mean dumbing down. It means choosing what the audience needs to see right now and moving everything else somewhere they can still find it. Here is a repeatable way to do it.

## Why technical slides get complicated

Complex slides usually come from good intentions. You want to be thorough. You want reviewers to see you have done the work. You reuse a figure from a paper or a report because it is already made.

The problem is that a figure built for reading is different from a slide built for watching. A reader can study a dense chart for a minute, go back, and check the legend. A viewer gets a few seconds while you talk. In a video, they cannot even raise a hand to ask.

Research on multimedia learning, such as Richard Mayer's work, suggests people learn better when words and pictures work together, and when extra material that does not support the main point is removed. That is the whole job here: keep what supports the point, remove what competes with it.

## Step 1: Write the one-sentence takeaway

Before touching the design, write down what the audience should remember from this slide. One sentence, in plain words.

- "Caching cut page load time in half for repeat visitors."
- "The new sensor drifts less than the old one in hot weather."
- "Most errors happen at the hand-off between two services."

If you cannot write that sentence, the slide is not ready to simplify. It may be two or three slides pretending to be one.

Then put that sentence at the top as the headline. A headline that makes a point tells the audience what to look for before they start looking.

## Step 2: Sort everything into show, say or store

Go through every element on the slide and put it in one of three groups.

| Group | What goes here | Where it ends up |
|---|---|---|
| Show | The parts that prove the takeaway | On the slide, large and clear |
| Say | Context, caveats, method | In the speaker notes |
| Store | Full tables, raw data, every label | An appendix, handout or linked report |

On most dense slides, the "show" pile ends up much smaller than the other two. That is good news. You do not have to throw the detail away. You are just moving it to where it works better.

## Step 3: Rebuild the visual around the message

With the "show" list in hand, rebuild the visual.

### For diagrams
- Collapse groups of boxes into one labelled block when the internals do not matter for this point.
- Highlight the path or component you are talking about. Grey out the rest.
- Use direct labels on the shapes instead of a separate key.

### For charts
- Keep the one series that makes the point and fade or remove the others.
- Label the important value directly on the chart.
- Round numbers to the precision the decision needs. "About 40 ms" is usually enough.

### For equations and code
- Show only the line that matters. Put the full derivation or listing in the appendix.
- Name each term in plain words beside it: "latency = queue time + processing time".
- Increase the font size until it feels too big. On video, it probably is not.

## Step 4: Build it up in steps

A complex idea often needs to arrive in pieces. Instead of showing a full system diagram at once, reveal it in stages as you explain each part.

You can do this two ways:

1. **Duplicate the slide.** Slide A shows the first component, slide B adds the second, slide C adds the third. Each slide gets its own short speaker note.
2. **Use builds.** Animate shapes in one at a time so each part appears as you talk about it.

Both work well in video. In PowerPoint2Vid, key points are animated in and land on the word that names them, which gives a similar step-by-step reveal without extra slides.

## Simplify a technical presentation: a before and after example

Here is a typical slide from a research or engineering update.

**Before**

Headline: "System architecture overview"
Content: a diagram with 22 boxes, 30 arrows, a legend with seven colours, and three footnotes in 10pt text.

**After**

Headline: "Most failed orders stall at the payment hand-off"
Content: five blocks (Browser, Web app, Orders, Payments, Bank), the arrow between Orders and Payments in a strong colour, all others in grey. One label on the highlighted arrow: "Most timeouts happen here".

Speaker note: "Here is the order flow, simplified to five steps. Most failed orders stall in one place. It is the hand-off between the order service and the payment service. That is where we focused our fixes."

The full 22-box diagram moves to the appendix for anyone who wants it.

## Write the speaker notes for the ear

The notes carry the detail you took off the slide, so write them the way you would say them.

- Short sentences, one idea each.
- Spell out acronyms the first time, or replace them.
- Say numbers the way people say them: "about two seconds", not "1.97 s".
- Point the viewer to the visual: "Look at the red arrow."

If the deck will become a narrated video, the notes become the script. The narration follows them closely as written, so a clean note means a clear voiceover. The post on [writing a voiceover script](/blog/writing-a-voiceover-script-pace-pauses-and-plain-words) has more on pace and pauses.

## Quick checklist

- One-sentence takeaway written as the headline
- Every element sorted into show, say or store
- Only the "show" items remain on the slide
- The key part highlighted, the rest greyed out
- Labels placed directly on the visual
- Complex visuals built up in steps
- Detail moved into speaker notes or an appendix
- Text large enough to read on a laptop

## From simpler slides to a clearer video

Simple technical slides are easier to follow live, and much easier to follow in a video where nobody can ask you to go back. Once your deck is cleaned up, upload the .pptx to the [PowerPoint to video converter](/) to hear your notes read aloud with each step revealed in turn. Claude Opus 5.5 directs the video, so a dense architecture diagram is rebuilt as an animated scene that builds one component at a time, timed to your narration. If the deck holds internal diagrams or unpublished results, check your organisation's policy on using online tools before uploading.
