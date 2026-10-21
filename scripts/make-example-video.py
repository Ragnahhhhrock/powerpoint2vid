#!/usr/bin/env python3
"""Build the homepage example: a PowerPoint2Vid-styled deck, then a narrated explainer video.

Outputs (in --out, default ./assets/example):
  example-deck.pptx   5-slide deck using the style-guide tokens, narration in speaker notes
  example-video.mp4   narrated, captioned video (H.264 + AAC)
  example-video.webm  same video (VP9 + Opus)
  example-captions.vtt
  example-poster.jpg

Needs: python-pptx, piper-tts, ffmpeg, LibreOffice (soffice), pdftoppm, Inter font,
and a Piper voice model (--voice path/to/en_US-lessac-medium.onnx).
Usage: python3 scripts/make-example-video.py --voice /path/to/en_US-lessac-medium.onnx
"""
import argparse, json, re, subprocess, wave, shutil, tempfile
from pathlib import Path
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

# Tokens from styles.css :root (docs/STYLE_GUIDE.md)
INK900, INK500, INK300 = "0e1330", "5b6190", "aab0d4"
PAPER50, PAPER100, PAPER200, WHITE = "f8f7fc", "efedf8", "e1def1", "ffffff"
VIOLET500, VIOLET600, CORAL500, MINT500 = "6d4aff", "5b3df0", "ff6b4a", "1fbf8f"
FONT = "Inter"

def rgb(h): return RGBColor.from_string(h.upper())

SLIDES = [
    {"kind": "title",
     "eyebrow": "Free · Private · Online",
     "title": ["PowerPoint to video,", "narrated."],
     "sub": "Turn any slide deck into an explainer video.",
     "notes": "Meet PowerPoint2Vid. It turns a PowerPoint deck into a narrated explainer video, right in your browser."},
    {"kind": "points",
     "title": "Slides are easy. Videos are slow.",
     "points": [("You already wrote the story.", "Your deck and speaker notes hold every word."),
                ("Recording it takes hours.", "Voiceovers, retakes, screen capture, editing."),
                ("There is a faster way.", "Let the deck narrate itself.")],
     "notes": "You already wrote the story. It lives in your slides and your speaker notes. But recording a video by hand takes hours. There is a faster way."},
    {"kind": "steps",
     "title": "Four steps to a finished video.",
     "steps": [("Add your deck", "Drop a .pptx file in."),
               ("Pick voice and style", "Narrator, speed, transitions."),
               ("Preview", "Watch it, slide by slide."),
               ("Export", "Download the video.")],
     "notes": "Add your deck. Pick a voice and a style. Preview it. Then export. Your speaker notes become the script, and shapes animate in as each point is spoken."},
    {"kind": "ticks",
     "title": "Private by design.",
     "ticks": ["Runs in your browser", "Nothing is uploaded", "No sign-up, no watermark", "Free to use"],
     "notes": "Everything runs in your browser. Nothing is uploaded, so your slides never leave your device. There is no sign-up and no watermark, and it is free."},
    {"kind": "cta",
     "title": "Try it with your own deck.",
     "button": "Convert PowerPoint to video",
     "url": "powerpoint2vid.com",
     "notes": "Try it with your own deck. Head to powerpoint2vid.com and turn your slides into a video in minutes."},
]

# Spoken form differs slightly from the written notes where TTS needs help.
def spoken(t): return t.replace("PowerPoint2Vid", "PowerPoint to Vid").replace("powerpoint2vid.com", "powerpoint two vid dot com")

def box(slide, x, y, w, h, fill=None, line=None, radius=None, shape=None):
    shp = slide.shapes.add_shape(shape or (MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE),
                                 Inches(x), Inches(y), Inches(w), Inches(h))
    if radius is not None and shp.adjustments:
        shp.adjustments[0] = min(0.5, radius / min(w, h))
    if fill: shp.fill.solid(); shp.fill.fore_color.rgb = rgb(fill)
    else: shp.fill.background()
    if line: shp.line.color.rgb = rgb(line); shp.line.width = Pt(1.25)
    else: shp.line.fill.background()
    st = shp._element.find('{http://schemas.openxmlformats.org/presentationml/2006/main}style')
    if st is not None: shp._element.remove(st)
    return shp

def text(slide, x, y, w, h, runs, size=24, bold=False, color=INK900, align=PP_ALIGN.LEFT,
         anchor=MSO_ANCHOR.TOP, spacing=None, line_spacing=None):
    """runs: str or list of lines; each line is str or list of (text, color) tuples."""
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame; tf.word_wrap = True; tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    lines = runs if isinstance(runs, list) else [runs]
    for i, line in enumerate(lines):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        if line_spacing: p.line_spacing = line_spacing
        for seg in (line if isinstance(line, list) else [(line, color)]):
            r = p.add_run(); r.text = seg[0]
            r.font.name = FONT; r.font.size = Pt(size); r.font.bold = bold
            r.font.color.rgb = rgb(seg[1])
    return tb

def brand(slide, dark=False):
    box(slide, 0.6, 0.45, 0.42, 0.42, fill=VIOLET500, radius=0.1)
    tri = slide.shapes.add_shape(MSO_SHAPE.ISOSCELES_TRIANGLE, Inches(0.74), Inches(0.57), Inches(0.17), Inches(0.18))
    tri.rotation = 90; tri.fill.solid(); tri.fill.fore_color.rgb = rgb(WHITE); tri.line.fill.background()
    st = tri._element.find('{http://schemas.openxmlformats.org/presentationml/2006/main}style')
    if st is not None: tri._element.remove(st)
    text(slide, 1.12, 0.45, 4, 0.42, [[("PowerPoint", INK900), ("2Vid", VIOLET500)]], size=18, bold=True, anchor=MSO_ANCHOR.MIDDLE)

def footer(slide, n, total):
    text(slide, 0.6, 6.95, 6, 0.3, "powerpoint2vid.com", size=11, color=INK500)
    text(slide, 11.7, 6.95, 1.05, 0.3, f"{n} / {total}", size=11, color=INK500, align=PP_ALIGN.RIGHT)

def background(slide, color=PAPER50):
    bg = slide.background.fill; bg.solid(); bg.fore_color.rgb = rgb(color)

def build_deck(path):
    prs = Presentation()
    prs.slide_width, prs.slide_height = Inches(13.333), Inches(7.5)
    blank = prs.slide_layouts[6]
    total = len(SLIDES)
    for i, s in enumerate(SLIDES, 1):
        sl = prs.slides.add_slide(blank); background(sl)
        brand(sl)
        k = s["kind"]
        if k == "title":
            pill = box(sl, 4.67, 1.75, 4.0, 0.46, fill=PAPER100, line=PAPER200, radius=0.23)
            text(sl, 4.67, 1.75, 4.0, 0.46, s["eyebrow"].upper(), size=12, bold=True, color=VIOLET500,
                 align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
            text(sl, 1.2, 2.5, 10.93, 2.3, [[(s["title"][0], INK900)], [(s["title"][1], VIOLET500)]],
                 size=66, bold=True, align=PP_ALIGN.CENTER, line_spacing=0.95)
            text(sl, 2.2, 5.0, 8.93, 0.6, s["sub"], size=26, color=INK500, align=PP_ALIGN.CENTER)
            box(sl, 5.67, 5.95, 2.0, 0.09, fill=CORAL500, radius=0.045)
        elif k == "points":
            text(sl, 0.6, 1.3, 12.1, 1.0, s["title"], size=44, bold=True)
            y = 2.7
            for head, sub in s["points"]:
                box(sl, 0.6, y, 12.13, 1.18, fill=WHITE, line=PAPER200, radius=0.2)
                box(sl, 0.6, y + 0.22, 0.09, 0.74, fill=VIOLET500, radius=0.04)
                text(sl, 1.05, y + 0.17, 11.3, 0.5, head, size=24, bold=True)
                text(sl, 1.05, y + 0.66, 11.3, 0.4, sub, size=17, color=INK500)
                y += 1.38
        elif k == "steps":
            text(sl, 0.6, 1.3, 12.1, 1.0, s["title"], size=44, bold=True)
            cw, gap, x0, y0 = 2.82, 0.28, 0.6, 2.9
            for j, (head, sub) in enumerate(s["steps"]):
                x = x0 + j * (cw + gap)
                box(sl, x, y0, cw, 3.1, fill=WHITE, line=PAPER200, radius=0.3)
                c = box(sl, x + 0.35, y0 + 0.4, 0.62, 0.62, fill=VIOLET500, shape=MSO_SHAPE.OVAL)
                text(sl, x + 0.35, y0 + 0.4, 0.62, 0.62, str(j + 1), size=22, bold=True, color=WHITE,
                     align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
                text(sl, x + 0.35, y0 + 1.3, cw - 0.7, 0.9, head, size=22, bold=True)
                text(sl, x + 0.35, y0 + 2.2, cw - 0.7, 0.7, sub, size=16, color=INK500)
        elif k == "ticks":
            text(sl, 0.6, 1.3, 12.1, 1.0, s["title"], size=44, bold=True)
            cw, ch, gx, gy, x0, y0 = 5.94, 1.45, 0.25, 0.25, 0.6, 2.7
            for j, t in enumerate(s["ticks"]):
                x = x0 + (j % 2) * (cw + gx); y = y0 + (j // 2) * (ch + gy)
                box(sl, x, y, cw, ch, fill=WHITE, line=PAPER200, radius=0.25)
                box(sl, x + 0.45, y + 0.4, 0.65, 0.65, fill=MINT500, shape=MSO_SHAPE.OVAL)
                text(sl, x + 0.45, y + 0.4, 0.65, 0.65, "\u2713", size=24, bold=True, color=WHITE,
                     align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
                text(sl, x + 1.4, y, cw - 1.7, ch, t, size=26, bold=True, anchor=MSO_ANCHOR.MIDDLE)
        elif k == "cta":
            text(sl, 1.2, 2.2, 10.93, 1.6, s["title"], size=60, bold=True, align=PP_ALIGN.CENTER,
                 anchor=MSO_ANCHOR.MIDDLE)
            box(sl, 4.17, 4.2, 5.0, 0.8, fill=CORAL500, radius=0.4)
            text(sl, 4.17, 4.2, 5.0, 0.8, s["button"], size=22, bold=True, color=WHITE,
                 align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
            text(sl, 2.2, 5.4, 8.93, 0.5, s["url"], size=24, bold=True, color=VIOLET500, align=PP_ALIGN.CENTER)
        footer(sl, i, total)
        sl.notes_slide.notes_text_frame.text = s["notes"]
    prs.save(path)

def run(cmd, **kw):
    subprocess.run(cmd, check=True, **kw)

def wav_len(p):
    with wave.open(str(p)) as w: return w.getnframes() / w.getframerate()

def vtt_time(t):
    h, m, s = int(t // 3600), int(t % 3600 // 60), t % 60
    return f"{h:02d}:{m:02d}:{s:06.3f}"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--voice", required=True)
    ap.add_argument("--out", default="assets/example")
    ap.add_argument("--keep", help="keep working files in this dir")
    a = ap.parse_args()
    out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
    work = Path(a.keep) if a.keep else Path(tempfile.mkdtemp())
    work.mkdir(parents=True, exist_ok=True)

    deck = out / "example-deck.pptx"
    build_deck(deck)

    # Render slides to PNG (1920x1080)
    run(["soffice", "--headless", "--convert-to", "pdf", "--outdir", str(work), str(deck)],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    run(["pdftoppm", "-png", "-scale-to-x", "1920", "-scale-to-y", "1080", str(work / "example-deck.pdf"), str(work / "slide")])
    pngs = sorted(work.glob("slide-*.png"))
    assert len(pngs) == len(SLIDES), pngs

    # Narration per slide
    from piper import PiperVoice
    voice = PiperVoice.load(a.voice)
    PAD_IN, PAD_OUT = 0.6, 0.9   # silence before/after each slide's narration
    clips = []
    for i, s in enumerate(SLIDES, 1):
        wp = work / f"nar-{i}.wav"
        with wave.open(str(wp), "wb") as wf:
            voice.synthesize_wav(spoken(s["notes"]), wf)
        clips.append((wp, wav_len(wp)))

    # Per-slide clips with Ken-Burns-free subtle fade, captions burned via VTT-style segments
    segs, cues, t = [], [], 0.0
    for i, ((wp, dur), png) in enumerate(zip(clips, pngs), 1):
        total = dur + PAD_IN + PAD_OUT
        seg = work / f"seg-{i}.mp4"
        run(["ffmpeg", "-y", "-loglevel", "error", "-loop", "1", "-t", f"{total:.3f}", "-i", str(png),
             "-i", str(wp),
             "-filter_complex",
             f"[0:v]scale=1920:1080,format=yuv420p,fade=t=in:st=0:d=0.4,fade=t=out:st={total-0.4:.3f}:d=0.4[v];"
             f"[1:a]adelay={int(PAD_IN*1000)}|{int(PAD_IN*1000)},apad=whole_dur={total:.3f}[a]",
             "-map", "[v]", "-map", "[a]", "-r", "30", "-c:v", "libx264", "-preset", "medium", "-crf", "20",
             "-c:a", "aac", "-b:a", "128k", "-ar", "44100", "-ac", "1", "-t", f"{total:.3f}", str(seg)], )
        segs.append(seg)
        # Captions: split narration into sentences, share the speech window by character count
        sents = [x.strip() for x in re.split(r"(?<=[.!?])\s+", SLIDES[i-1]["notes"]) if x.strip()]
        n = sum(len(x) for x in sents); cur = t + PAD_IN
        for x in sents:
            d = dur * len(x) / n
            cues.append((cur, cur + d, x)); cur += d
        t += total

    lst = work / "list.txt"
    lst.write_text("".join(f"file '{p}'\n" for p in segs))
    mp4, webm = out / "example-video.mp4", out / "example-video.webm"
    run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(lst),
         "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
         "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-c:a", "aac", "-b:a", "128k", str(mp4)])
    run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(mp4), "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0",
         "-row-mt", "1", "-c:a", "libopus", "-b:a", "96k", str(webm)])

    (out / "example-captions.vtt").write_text(
        "WEBVTT\n\n" + "".join(f"{vtt_time(a_)} --> {vtt_time(b_)}\n{x}\n\n" for a_, b_, x in cues))
    run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(pngs[0]), "-vf", "scale=1280:720", "-q:v", "3",
         str(out / "example-poster.jpg")])
    print(json.dumps({"seconds": round(t, 1), "files": sorted(p.name for p in out.iterdir())}))

if __name__ == "__main__":
    main()
