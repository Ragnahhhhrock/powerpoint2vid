# PowerPoint2Vid Blog Content Strategy

**Goal:** grow organic search traffic around "PowerPoint to video converter" and its related questions, get readers trying the Basic converter, and upgrade them to Pro for a.i.-directed videos.
**Plans:** Basic (browser converter, watermarked, no subscription) and Pro (a.i. directs the video, no watermark, from A$29/month with 10 videos included, top-ups for more). Basic is the entry point; the quality jump to Pro is the upsell.
**Cadence:** one post a day for 90 days, 22 Oct 2026 to 19 Jan 2027. Each post goes live at 00:00 Perth time (AWST).
**Home:** https://powerpoint2vid.com/blog

## 1. Who we write for (personas)

| Persona | Who they are | What they need | What they search | Why PowerPoint2Vid |
|---|---|---|---|---|
| **Lecturer Leah** (educator) | University lecturer, teacher or learning designer. Has years of lecture slides. | Course videos for the LMS, flipped-classroom content, captions for accessibility, without a studio. | "lecture slides to video", "google slides to video", "add narration to powerpoint" | Speaker notes become narration; captions built in; on Pro a lecture deck plays like a produced explainer. |
| **Trainer Tom** (L&D / HR) | Corporate trainer, HR or L&D lead. Owns onboarding and compliance decks. | Consistent training videos that are quick to update when policy changes. | "onboarding video from powerpoint", "compliance training video" | Edit the deck, re-export the video. No voice talent, no re-recording. |
| **Marketer Mia** (marketer / founder) | Small-business marketer or founder with a pitch, product or webinar deck. | Explainer videos for the website, launches and social, on a small budget. | "explainer video cost", "presentation to social video", "pitch deck video" | Turns the deck she already has into a styled video at a fraction of agency cost. |
| **Seller Sam** (sales / customer success / consulting) | Account exec, CSM or consultant who sends decks to prospects and clients. | Async pitches and walkthroughs that get watched, not skimmed. | "video pitch deck", "product walkthrough video" | A narrated deck explains itself when he's not in the room. |
| **Presenter Priya** (speaker / student / researcher) | Conference speaker, student or researcher presenting findings. | Pre-recorded talks, assignment videos, research explainers. | "video presentation for assignment", "pre-recorded conference talk" | Polished, timed video from slides and notes, with no camera. |

## 2. Content pillars

| Pillar | Purpose | Posts | Main personas |
|---|---|---|---|
| **Convert & Create** | Own the "PowerPoint to video converter" topic cluster: how-tos, formats, platforms, troubleshooting. Highest commercial intent. | 19 | All |
| **Better Presentations** | Practical tips for clearer, better-designed decks. Wide reach, builds trust, feeds the converter. | 26 | All, Priya, Sam |
| **Why Explainer Videos** | The benefits and economics of explainer videos. Makes the case for turning decks into video. | 19 | Mia, Leah, Sam |
| **Playbooks by Role** | Step-by-step use cases for each persona. Converts readers who see their own job described. | 13 | One persona each |
| **Voice, Captions & Sharing** | Narration, captions, accessibility and distribution. Finishes the job after export. | 13 | Leah, Mia, Tom |

## 3. Weekly rhythm

| Mon | Tue | Wed | Thu | Fri | Sat | Sun |
|---|---|---|---|---|---|---|
| Convert & Create | Better Presentations | Playbooks by Role | Why Explainer Videos | Voice, Captions & Sharing | Better Presentations | Alternates Why Explainers / Convert & Create |

Day 1 is the cornerstone guide, "How to Convert PowerPoint to Video: The Complete Guide", which every later Convert & Create post links back to.

## 4. Core advice the blog teaches

### Presentation tips
1. **One idea per slide.** If a slide needs two headlines, it's two slides.
2. **Headlines that make a point.** "Churn fell 12% after onboarding changes" beats "Churn update".
3. **Story structure.** Situation, problem, answer, proof, next step.
4. **Less text, bigger text.** Body text 24pt+ for video; move detail into speaker notes.
5. **Contrast and accessible colour.** Aim for WCAG AA contrast; never rely on colour alone.
6. **Charts with one message.** Highlight the bar that matters, grey out the rest, label directly.
7. **White space and hierarchy.** Give the eye one place to land first.
8. **Animation with purpose.** Reveal points as you talk about them, not for decoration.
9. **Design for 16:9 screens.** Most decks are now watched, not projected.
10. **Write notes for the ear.** Short sentences, spoken words, numbers said the way people say them.

### Benefits of explainer videos
- **Explain once, reuse forever.** The same video answers the same question for every new customer, student or hire.
- **Async by default.** People watch when it suits them; fewer meetings, no time zones.
- **Better understanding.** Narration plus visuals is easier to follow than text alone.
- **Accessibility.** Captions and narration help people who are deaf, hard of hearing, reading in a second language, or watching with the sound off.
- **Consistency.** Every viewer gets the same accurate message.
- **Reach.** Video works on websites, LMSs, YouTube, LinkedIn and email.
- **Low cost from slides.** A deck you already have becomes a video without cameras, studios or voice talent.

## 5. SEO and writing rules
- Every post targets one keyword (in the schedule) in the title, meta description, first paragraph and one H2.
- Every post links to the converter (https://powerpoint2vid.com/) with anchor text that includes "PowerPoint to video converter" at least once, and to /pricing where it fits naturally.
- Posts only link to earlier posts, so readers never hit a page that isn't live yet. Related-post links are added automatically.
- 800 to 1,300 words. Plain, confident, short sentences. Australian spelling.
- House rule: never describe the product or anything else as costing nothing (the "f-word" is banned site-wide). No invented statistics, studies or quotes.
- Product claims must match the product and follow `content/blog/PRODUCT_CLAIMS.md`: an a.i.-directed explainer video made from the deck, speaker-note narration, captions and transitions, MP4 (WebM available) download. Basic: browser version, watermarked. Pro: a.i.-directed, no watermark, from A$29/month with 10 videos included. a.i. claims describe Pro. Never name Claude or Opus on the site. Never the word "free", including for Basic. No privacy, on-device or no-upload claims.

## 6. Measurement
- GA4: blog sessions, scroll depth, `cta_click` from blog posts, `deck_loaded` and `export_complete` from blog referrals.
- Search Console: impressions and position for each target keyword, reviewed weekly.
- After 30 and 60 days: refresh the top 10 posts by impressions, and write follow-ups for queries ranking 8 to 20.

## 7. How publishing works
All 90 posts are written up front and committed to the repo (`content/blog/*.md`, built to `blog/*.html` by `scripts/build-blog.py`). A Cloudflare Pages Function (`functions/blog/_middleware.js`) hides each post, its index card, feed item and sitemap entry until its publish date in Perth time. No daily manual step.

## 8. 90-day schedule

| Day | Date | Pillar | Title | Persona | Target keyword |
|---|---|---|---|---|---|
| 1 | Thu 2026-10-22 | Convert & Create | How to Convert PowerPoint to Video: The Complete Guide | All | convert powerpoint to video |
| 2 | Fri 2026-10-23 | Voice, Captions & Sharing | Captions on Presentation Videos: Why and How | Leah | captions for presentation video |
| 3 | Sat 2026-10-24 | Better Presentations | The One Idea Per Slide Rule (and When to Break It) | All | presentation design tips |
| 4 | Sun 2026-10-25 | Why Explainer Videos | What Is an Explainer Video? A Plain-English Guide | All | what is an explainer video |
| 5 | Mon 2026-10-26 | Convert & Create | PowerPoint to Video Converter: What to Look For Before You Choose | All | powerpoint to video converter |
| 6 | Tue 2026-10-27 | Better Presentations | How to Structure a Presentation: A Simple Story Framework | Priya | how to structure a presentation |
| 7 | Wed 2026-10-28 | Playbooks by Role | Lecturers: Turn Lecture Slides into Course Videos | Leah | lecture slides to video |
| 8 | Thu 2026-10-29 | Why Explainer Videos | The Benefits of Explainer Videos for Small Businesses | Mia | benefits of explainer videos |
| 9 | Fri 2026-10-30 | Voice, Captions & Sharing | Choosing a Narrator Voice and Speaking Speed | All | text to speech narrator voice |
| 10 | Sat 2026-10-31 | Better Presentations | Slide Headlines That Make a Point | Sam | slide headline writing |
| 11 | Sun 2026-11-01 | Convert & Create | How to Turn Google Slides into a Narrated Video | Leah | google slides to video |
| 12 | Mon 2026-11-02 | Convert & Create | How to Write Speaker Notes That Become a Great Voiceover | Priya | speaker notes narration |
| 13 | Tue 2026-11-03 | Better Presentations | Fonts for Presentations: Size, Pairing and Readability | All | best fonts for presentations |
| 14 | Wed 2026-11-04 | Playbooks by Role | Employee Onboarding Videos From Your Existing PowerPoint | Tom | onboarding video from powerpoint |
| 15 | Thu 2026-11-05 | Why Explainer Videos | Why People Remember More From Narrated Visuals | Leah | explainer video learning |
| 16 | Fri 2026-11-06 | Voice, Captions & Sharing | Writing a Voiceover Script: Pace, Pauses and Plain Words | Priya | voiceover script tips |
| 17 | Sat 2026-11-07 | Better Presentations | Colour in Slides: Building a Palette That Works on Screen | Mia | presentation colour palette |
| 18 | Sun 2026-11-08 | Why Explainer Videos | Async Video vs Live Meetings: When a Video Saves Everyone Time | Sam | async video communication |
| 19 | Mon 2026-11-09 | Convert & Create | MP4 or WebM? Choosing a Format for Your Presentation Video | All | powerpoint to mp4 |
| 20 | Tue 2026-11-10 | Better Presentations | Contrast and Accessibility in Slide Design | Leah | accessible presentation design |
| 21 | Wed 2026-11-11 | Playbooks by Role | Sales Teams: Send a Narrated Pitch Deck, Not a Cold PDF | Sam | video pitch deck |
| 22 | Thu 2026-11-12 | Why Explainer Videos | Where to Put an Explainer Video on Your Website | Mia | explainer video on website |
| 23 | Fri 2026-11-13 | Voice, Captions & Sharing | Pronunciation Tips for Text-to-Speech Narration | Tom | text to speech pronunciation |
| 24 | Sat 2026-11-14 | Better Presentations | How Much Text Is Too Much on a Slide? | All | too much text on slides |
| 25 | Sun 2026-11-15 | Convert & Create | PowerPoint's Built-in Video Export vs a Dedicated Converter | All | save powerpoint as video |
| 26 | Mon 2026-11-16 | Convert & Create | How to Choose a Video Style for Your Slide Deck | Mia | presentation video styles |
| 27 | Tue 2026-11-17 | Better Presentations | Designing Charts People Understand in Five Seconds | Sam | charts in presentations |
| 28 | Wed 2026-11-18 | Playbooks by Role | Flipped Classroom Videos From the Slides You Already Have | Leah | flipped classroom videos |
| 29 | Thu 2026-11-19 | Why Explainer Videos | How Explainer Videos Support Accessibility and Inclusion | Leah | accessible explainer videos |
| 30 | Fri 2026-11-20 | Voice, Captions & Sharing | Where to Share Your Presentation Video | All | share presentation video |
| 31 | Sat 2026-11-21 | Better Presentations | Using Images in Presentations Without the Clutter | Mia | images in presentations |
| 32 | Sun 2026-11-22 | Why Explainer Videos | Explainer Videos for Product Launches | Mia | product launch video |
| 33 | Mon 2026-11-23 | Convert & Create | How Long Should Each Slide Stay on Screen in a Video? | Tom | slide timing for video |
| 34 | Tue 2026-11-24 | Better Presentations | White Space: The Most Underused Tool in PowerPoint | All | powerpoint white space |
| 35 | Wed 2026-11-25 | Playbooks by Role | Compliance and Policy Training Videos Without a Studio | Tom | compliance training video |
| 36 | Thu 2026-11-26 | Why Explainer Videos | Video and Search: How Explainer Videos Help Pages Get Found | Mia | explainer video seo |
| 37 | Fri 2026-11-27 | Voice, Captions & Sharing | Uploading a Presentation Video to YouTube: Titles, Descriptions and Chapters | Mia | upload presentation to youtube |
| 38 | Sat 2026-11-28 | Better Presentations | How to Open a Presentation So People Keep Watching | Priya | how to start a presentation |
| 39 | Sun 2026-11-29 | Convert & Create | How to Add Narration to PowerPoint Without Recording Your Own Voice | Tom | add voiceover to powerpoint |
| 40 | Mon 2026-11-30 | Convert & Create | Slide Transitions That Work in Video (and Ones That Don't) | Priya | powerpoint transitions in video |
| 41 | Tue 2026-12-01 | Better Presentations | How to End a Presentation With a Clear Call to Action | Sam | how to end a presentation |
| 42 | Wed 2026-12-02 | Playbooks by Role | Marketers: Turning Decks into Social Videos | Mia | presentation to social video |
| 43 | Thu 2026-12-03 | Why Explainer Videos | Explainer Videos for Internal Communication | Tom | internal communication video |
| 44 | Fri 2026-12-04 | Voice, Captions & Sharing | Sharing Presentation Videos on LinkedIn | Sam | presentation video linkedin |
| 45 | Sat 2026-12-05 | Better Presentations | Slide Masters and Templates: Set Up Once, Save Hours | Tom | powerpoint slide master |
| 46 | Sun 2026-12-06 | Why Explainer Videos | What Explainer Videos Cost: Agencies, Tools and Doing It Yourself | Mia | explainer video cost |
| 47 | Mon 2026-12-07 | Convert & Create | How to Convert a PowerPoint to Video on a Mac | All | convert powerpoint to video on mac |
| 48 | Tue 2026-12-08 | Better Presentations | Visual Hierarchy: Guiding the Eye Across a Slide | All | visual hierarchy slides |
| 49 | Wed 2026-12-09 | Playbooks by Role | Customer Success: Product Walkthrough Videos From Slides | Sam | product walkthrough video |
| 50 | Thu 2026-12-10 | Why Explainer Videos | How Long Should an Explainer Video Be? | All | explainer video length |
| 51 | Fri 2026-12-11 | Voice, Captions & Sharing | Adding Presentation Videos to Your LMS | Leah | presentation video lms |
| 52 | Sat 2026-12-12 | Better Presentations | Icons, Shapes or Diagrams? Choosing the Right Visual | Tom | presentation diagrams |
| 53 | Sun 2026-12-13 | Convert & Create | How to Convert a PowerPoint to Video on a Chromebook | Leah | powerpoint to video chromebook |
| 54 | Mon 2026-12-14 | Convert & Create | What to Check Before Using a PowerPoint to Video Converter With Confidential Slides | Tom | private powerpoint to video converter |
| 55 | Tue 2026-12-15 | Better Presentations | Turning Bullet Points into Visuals | All | alternatives to bullet points |
| 56 | Wed 2026-12-16 | Playbooks by Role | Conference Speakers: Pre-Recorded Talks That Still Engage | Priya | pre-recorded conference talk |
| 57 | Thu 2026-12-17 | Why Explainer Videos | One Deck, Many Videos: Repurposing Your Presentations | Mia | repurpose presentation into video |
| 58 | Fri 2026-12-18 | Voice, Captions & Sharing | Embedding a Video on Your Website Without Slowing It Down | Mia | embed video website performance |
| 59 | Sat 2026-12-19 | Better Presentations | Designing 16:9 Slides for Screens and Video | All | 16:9 slide design |
| 60 | Sun 2026-12-20 | Why Explainer Videos | Explainer Videos vs Written Documentation | Tom | video vs documentation |
| 61 | Mon 2026-12-21 | Convert & Create | The Pre-Export Checklist: Getting a Deck Ready for Video | All | powerpoint to video checklist |
| 62 | Tue 2026-12-22 | Better Presentations | How to Simplify a Complex Technical Slide | Priya | simplify technical presentation |
| 63 | Wed 2026-12-23 | Playbooks by Role | Students: Making a Video Presentation for an Assignment | Priya | video presentation for assignment |
| 64 | Thu 2026-12-24 | Why Explainer Videos | Animated Slide Videos vs Talking-Head Videos | Priya | slide video vs talking head |
| 65 | Fri 2026-12-25 | Voice, Captions & Sharing | Designing Slide Videos for Silent Autoplay | Mia | silent autoplay video |
| 66 | Sat 2026-12-26 | Better Presentations | Storytelling With Data: From Numbers to Narrative | Sam | data storytelling presentation |
| 67 | Sun 2026-12-27 | Convert & Create | Presentation Video Export Problems and How to Fix Them | All | powerpoint video export problems |
| 68 | Mon 2026-12-28 | Convert & Create | How to Convert a Keynote Presentation to Video | Priya | keynote to video |
| 69 | Tue 2026-12-29 | Better Presentations | How Many Slides Do You Really Need? | All | how many slides presentation |
| 70 | Wed 2026-12-30 | Playbooks by Role | Founders: Turning Your Pitch Deck into a Video | Mia | pitch deck video |
| 71 | Thu 2026-12-31 | Why Explainer Videos | Explainer Videos That Cut Down Repeat Questions | Sam | reduce support tickets with video |
| 72 | Fri 2027-01-01 | Voice, Captions & Sharing | The Presentation Video Accessibility Checklist | Leah | accessible presentation video |
| 73 | Sat 2027-01-02 | Better Presentations | Rehearse Smarter by Watching Your Deck as a Video | Priya | presentation rehearsal tips |
| 74 | Sun 2027-01-03 | Why Explainer Videos | How to Tell Whether Your Explainer Video Is Working | Mia | explainer video metrics |
| 75 | Mon 2027-01-04 | Convert & Create | How to Turn a Canva Presentation into a Narrated Video | Mia | canva presentation to video |
| 76 | Tue 2027-01-05 | Better Presentations | Common PowerPoint Mistakes and How to Fix Them | All | powerpoint mistakes |
| 77 | Wed 2027-01-06 | Playbooks by Role | Consultants: Video Summaries of Client Reports | Sam | consulting report video |
| 78 | Thu 2027-01-07 | Why Explainer Videos | Types of Explainer Videos and Which One Fits Your Message | All | types of explainer videos |
| 79 | Fri 2027-01-08 | Voice, Captions & Sharing | Video Thumbnails That Earn the Click | Mia | video thumbnail tips |
| 80 | Sat 2027-01-09 | Better Presentations | Writing for the Ear: Making Slides and Script Work Together | Leah | presentation script writing |
| 81 | Sun 2027-01-10 | Convert & Create | Turning a Webinar Deck into an On-Demand Video | Mia | webinar slides to video |
| 82 | Mon 2027-01-11 | Convert & Create | PPTX to Video: A Five-Minute Walkthrough | All | pptx to video converter |
| 83 | Tue 2027-01-12 | Better Presentations | Using Animation With Purpose: Builds That Clarify | Tom | powerpoint animation tips |
| 84 | Wed 2027-01-13 | Playbooks by Role | Researchers: Turning Findings into an Explainer Video | Leah | research explainer video |
| 85 | Thu 2027-01-14 | Why Explainer Videos | Why Narrated Slides Beat a Silent Slide Share | Sam | narrated presentation video |
| 86 | Fri 2027-01-15 | Voice, Captions & Sharing | Presentation Videos in Other Languages | Tom | translate presentation video |
| 87 | Sat 2027-01-16 | Better Presentations | Designing Title Slides and Section Dividers | All | title slide design |
| 88 | Sun 2027-01-17 | Why Explainer Videos | Explainer Videos for Nonprofits and Fundraising | Priya | nonprofit explainer video |
| 89 | Mon 2027-01-18 | Better Presentations | The Polishing Checklist: Final Pass Before You Share a Deck | All | presentation checklist |
| 90 | Tue 2027-01-19 | Playbooks by Role | Leaders: All-Hands Updates as a Short Video | Tom | all-hands video update |