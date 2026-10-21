"""Build content/blog/calendar.json: the 90-day blog schedule.

Weekly rhythm (Perth time, one post a day):
  Mon  Convert & Create        Tue  Better Presentations   Wed  Playbooks by Role
  Thu  Why Explainer Videos    Fri  Voice, Captions & Sharing
  Sat  Better Presentations    Sun  alternates Convert & Create / Why Explainer Videos
Day 1 is the cornerstone guide, whatever the weekday.
Run: python3 scripts/make-blog-calendar.py
"""
import datetime, json, re, pathlib

START = datetime.date(2026, 10, 22)
DAYS = 90

PILLARS = {
    "convert": "Convert & Create",
    "craft": "Better Presentations",
    "why": "Why Explainer Videos",
    "playbook": "Playbooks by Role",
    "share": "Voice, Captions & Sharing",
}

# (title, target keyword, primary persona)
# personas: educator, trainer, marketer, seller, presenter, all
Q = {
"convert": [
 ("How to Convert PowerPoint to Video: The Complete Guide", "convert powerpoint to video", "all"),
 ("PowerPoint to Video Converter: What to Look For Before You Choose", "powerpoint to video converter", "all"),
 ("How to Turn Google Slides into a Narrated Video", "google slides to video", "educator"),
 ("How to Write Speaker Notes That Become a Great Voiceover", "speaker notes narration", "presenter"),
 ("MP4 or WebM? Choosing a Format for Your Presentation Video", "powerpoint to mp4", "all"),
 ("PowerPoint's Built-in Video Export vs a Dedicated Converter", "save powerpoint as video", "all"),
 ("How to Choose a Video Style for Your Slide Deck", "presentation video styles", "marketer"),
 ("How Long Should Each Slide Stay on Screen in a Video?", "slide timing for video", "trainer"),
 ("How to Add Narration to PowerPoint Without Recording Your Own Voice", "add voiceover to powerpoint", "trainer"),
 ("Slide Transitions That Work in Video (and Ones That Don't)", "powerpoint transitions in video", "presenter"),
 ("How to Convert a PowerPoint to Video on a Mac", "convert powerpoint to video on mac", "all"),
 ("How to Convert a PowerPoint to Video on a Chromebook", "powerpoint to video chromebook", "educator"),
 ("Private by Design: Why Converting Slides in Your Browser Matters", "private powerpoint to video converter", "trainer"),
 ("The Pre-Export Checklist: Getting a Deck Ready for Video", "powerpoint to video checklist", "all"),
 ("Presentation Video Export Problems and How to Fix Them", "powerpoint video export problems", "all"),
 ("How to Convert a Keynote Presentation to Video", "keynote to video", "presenter"),
 ("How to Turn a Canva Presentation into a Narrated Video", "canva presentation to video", "marketer"),
 ("Turning a Webinar Deck into an On-Demand Video", "webinar slides to video", "marketer"),
 ("PPTX to Video: A Five-Minute Walkthrough", "pptx to video converter", "all"),
],
"craft": [
 ("The One Idea Per Slide Rule (and When to Break It)", "presentation design tips", "all"),
 ("How to Structure a Presentation: A Simple Story Framework", "how to structure a presentation", "presenter"),
 ("Slide Headlines That Make a Point", "slide headline writing", "seller"),
 ("Fonts for Presentations: Size, Pairing and Readability", "best fonts for presentations", "all"),
 ("Colour in Slides: Building a Palette That Works on Screen", "presentation colour palette", "marketer"),
 ("Contrast and Accessibility in Slide Design", "accessible presentation design", "educator"),
 ("How Much Text Is Too Much on a Slide?", "too much text on slides", "all"),
 ("Designing Charts People Understand in Five Seconds", "charts in presentations", "seller"),
 ("Using Images in Presentations Without the Clutter", "images in presentations", "marketer"),
 ("White Space: The Most Underused Tool in PowerPoint", "powerpoint white space", "all"),
 ("How to Open a Presentation So People Keep Watching", "how to start a presentation", "presenter"),
 ("How to End a Presentation With a Clear Call to Action", "how to end a presentation", "seller"),
 ("Slide Masters and Templates: Set Up Once, Save Hours", "powerpoint slide master", "trainer"),
 ("Visual Hierarchy: Guiding the Eye Across a Slide", "visual hierarchy slides", "all"),
 ("Icons, Shapes or Diagrams? Choosing the Right Visual", "presentation diagrams", "trainer"),
 ("Turning Bullet Points into Visuals", "alternatives to bullet points", "all"),
 ("Designing 16:9 Slides for Screens and Video", "16:9 slide design", "all"),
 ("How to Simplify a Complex Technical Slide", "simplify technical presentation", "presenter"),
 ("Storytelling With Data: From Numbers to Narrative", "data storytelling presentation", "seller"),
 ("How Many Slides Do You Really Need?", "how many slides presentation", "all"),
 ("Rehearse Smarter by Watching Your Deck as a Video", "presentation rehearsal tips", "presenter"),
 ("Common PowerPoint Mistakes and How to Fix Them", "powerpoint mistakes", "all"),
 ("Writing for the Ear: Making Slides and Script Work Together", "presentation script writing", "educator"),
 ("Using Animation With Purpose: Builds That Clarify", "powerpoint animation tips", "trainer"),
 ("Designing Title Slides and Section Dividers", "title slide design", "all"),
 ("The Polishing Checklist: Final Pass Before You Share a Deck", "presentation checklist", "all"),
],
"why": [
 ("What Is an Explainer Video? A Plain-English Guide", "what is an explainer video", "all"),
 ("The Benefits of Explainer Videos for Small Businesses", "benefits of explainer videos", "marketer"),
 ("Why People Remember More From Narrated Visuals", "explainer video learning", "educator"),
 ("Async Video vs Live Meetings: When a Video Saves Everyone Time", "async video communication", "seller"),
 ("Where to Put an Explainer Video on Your Website", "explainer video on website", "marketer"),
 ("How Explainer Videos Support Accessibility and Inclusion", "accessible explainer videos", "educator"),
 ("Explainer Videos for Product Launches", "product launch video", "marketer"),
 ("Video and Search: How Explainer Videos Help Pages Get Found", "explainer video seo", "marketer"),
 ("Explainer Videos for Internal Communication", "internal communication video", "trainer"),
 ("What Explainer Videos Cost: Agencies, Tools and Doing It Yourself", "explainer video cost", "marketer"),
 ("How Long Should an Explainer Video Be?", "explainer video length", "all"),
 ("One Deck, Many Videos: Repurposing Your Presentations", "repurpose presentation into video", "marketer"),
 ("Explainer Videos vs Written Documentation", "video vs documentation", "trainer"),
 ("Animated Slide Videos vs Talking-Head Videos", "slide video vs talking head", "presenter"),
 ("Explainer Videos That Cut Down Repeat Questions", "reduce support tickets with video", "seller"),
 ("How to Tell Whether Your Explainer Video Is Working", "explainer video metrics", "marketer"),
 ("Types of Explainer Videos and Which One Fits Your Message", "types of explainer videos", "all"),
 ("Why Narrated Slides Beat a Silent Slide Share", "narrated presentation video", "seller"),
 ("Explainer Videos for Nonprofits and Fundraising", "nonprofit explainer video", "presenter"),
],
"playbook": [
 ("Lecturers: Turn Lecture Slides into Course Videos", "lecture slides to video", "educator"),
 ("Employee Onboarding Videos From Your Existing PowerPoint", "onboarding video from powerpoint", "trainer"),
 ("Sales Teams: Send a Narrated Pitch Deck, Not a Cold PDF", "video pitch deck", "seller"),
 ("Flipped Classroom Videos From the Slides You Already Have", "flipped classroom videos", "educator"),
 ("Compliance and Policy Training Videos Without a Studio", "compliance training video", "trainer"),
 ("Marketers: Turning Decks into Social Videos", "presentation to social video", "marketer"),
 ("Customer Success: Product Walkthrough Videos From Slides", "product walkthrough video", "seller"),
 ("Conference Speakers: Pre-Recorded Talks That Still Engage", "pre-recorded conference talk", "presenter"),
 ("Students: Making a Video Presentation for an Assignment", "video presentation for assignment", "presenter"),
 ("Founders: Turning Your Pitch Deck into a Video", "pitch deck video", "marketer"),
 ("Consultants: Video Summaries of Client Reports", "consulting report video", "seller"),
 ("Researchers: Turning Findings into an Explainer Video", "research explainer video", "educator"),
 ("Leaders: All-Hands Updates as a Short Video", "all-hands video update", "trainer"),
],
"share": [
 ("Captions on Presentation Videos: Why and How", "captions for presentation video", "educator"),
 ("Choosing a Narrator Voice and Speaking Speed", "text to speech narrator voice", "all"),
 ("Writing a Voiceover Script: Pace, Pauses and Plain Words", "voiceover script tips", "presenter"),
 ("Pronunciation Tips for Text-to-Speech Narration", "text to speech pronunciation", "trainer"),
 ("Where to Share Your Presentation Video", "share presentation video", "all"),
 ("Uploading a Presentation Video to YouTube: Titles, Descriptions and Chapters", "upload presentation to youtube", "marketer"),
 ("Sharing Presentation Videos on LinkedIn", "presentation video linkedin", "seller"),
 ("Adding Presentation Videos to Your LMS", "presentation video lms", "educator"),
 ("Embedding a Video on Your Website Without Slowing It Down", "embed video website performance", "marketer"),
 ("Designing Slide Videos for Silent Autoplay", "silent autoplay video", "marketer"),
 ("The Presentation Video Accessibility Checklist", "accessible presentation video", "educator"),
 ("Video Thumbnails That Earn the Click", "video thumbnail tips", "marketer"),
 ("Presentation Videos in Other Languages", "translate presentation video", "trainer"),
],
}

WEEK = {0: "convert", 1: "craft", 2: "playbook", 3: "why", 4: "share", 5: "craft"}  # Sun handled below

def slugify(t):
    s = re.sub(r"[^a-z0-9]+", "-", t.lower().replace("'", "")).strip("-")
    return s[:70].rstrip("-")

def main():
    queues = {k: list(v) for k, v in Q.items()}
    out, sun = [], 0
    for i in range(DAYS):
        d = START + datetime.timedelta(days=i)
        if i == 0:
            p = "convert"
        elif d.weekday() == 6:
            p = ("why", "convert")[sun % 2]; sun += 1
        else:
            p = WEEK[d.weekday()]
        if not queues[p]:  # fall back to whichever queue is longest
            p = max(queues, key=lambda k: len(queues[k]))
        title, kw, persona = queues[p].pop(0)
        out.append({"day": i + 1, "date": d.isoformat(), "weekday": d.strftime("%a"),
                    "pillar": p, "pillar_name": PILLARS[p], "title": title,
                    "slug": slugify(title), "keyword": kw, "persona": persona})
    left = sum(len(v) for v in queues.values())
    assert left == 0, f"{left} topics unscheduled: { {k: len(v) for k, v in queues.items()} }"
    assert len({o['slug'] for o in out}) == DAYS
    path = pathlib.Path(__file__).resolve().parent.parent / "content/blog/calendar.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(out, indent=1) + "\n")
    from collections import Counter
    print(Counter(o["pillar"] for o in out), out[-1]["date"])

if __name__ == "__main__":
    main()
