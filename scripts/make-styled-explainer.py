#!/usr/bin/env python3
"""Build the homepage explainer with the app's own renderer and a video style.

Builds the example deck (same layout as make-example-video.py, updated script), narrates it
with Piper, then renders every frame in headless Chromium using js/pptx-parser.js +
js/renderer.js with a preset from js/video-styles.js, so the video looks exactly like an export.

Outputs (in --out, default ./assets/example):
  explainer-deck.pptx, explainer.mp4, explainer.webm, explainer-captions.vtt, explainer-poster.jpg

Needs: python-pptx, piper-tts, playwright (chromium), ffmpeg, Inter font.
Usage: python3 scripts/make-styled-explainer.py --voice en_US-lessac-medium.onnx [--style keynote]
Run from the repo root.
"""
import argparse, base64, functools, http.server, importlib.util, json, re, subprocess, tempfile, threading, wave
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("base", ROOT / "scripts" / "make-example-video.py")
base = importlib.util.module_from_spec(spec); spec.loader.exec_module(base)

base.SLIDES = [
    {"kind": "title", "eyebrow": "Private · Online · No upload",
     "title": ["PowerPoint to video,", "narrated."],
     "sub": "Turn any slide deck into a styled explainer video.",
     "notes": "Meet PowerPoint2Vid. Drop in a slide deck, and get back a narrated, animated explainer video, made right in your browser."},
    {"kind": "points", "title": "Slides are easy. Videos are slow.",
     "points": [("You already wrote the story.", "Your deck and speaker notes hold every word."),
                ("Recording it takes hours.", "Voiceovers, retakes, screen capture, editing."),
                ("There is a faster way.", "Let the deck narrate itself.")],
     "notes": "You already wrote the story. It lives in your slides and your speaker notes. But recording a video by hand takes hours. There is a faster way."},
    {"kind": "steps", "title": "Four steps to a finished video.",
     "steps": [("Add your deck", "Drop in a .pptx or Google Slides."),
               ("Pick a voice", "Narrator, speed and captions."),
               ("Choose a style", "Cinematic, keynote, kinetic and more."),
               ("Export", "Download the finished video.")],
     "notes": "Add your deck. Pick a narrator. Choose a video style, from minimal cinematic to this keynote look. Then export. Your speaker notes become the script."},
    {"kind": "ticks", "title": "Private by design.",
     "ticks": ["Runs in your browser", "Nothing is uploaded", "No watermark"],
     "notes": "Everything runs in your browser. Nothing is uploaded, so your slides never leave your device. There is no watermark."},
    {"kind": "cta", "title": "Try it with your own deck.", "button": "Convert PowerPoint to video",
     "url": "powerpoint2vid.com",
     "notes": "Try it with your own deck. Head to powerpoint2vid.com and turn your slides into a video in minutes."},
]

FPS, W, H = 30, 1920, 1080
PAD_IN, PAD_OUT, TAIL = 0.7, 1.0, 1.2


def serve(root):
    h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(root))
    h.log_message = lambda *a: None
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--voice", required=True)
    ap.add_argument("--style", default="keynote")
    ap.add_argument("--out", default="assets/example")
    a = ap.parse_args()
    out = ROOT / a.out; out.mkdir(parents=True, exist_ok=True)
    work = Path(tempfile.mkdtemp())

    deck = out / "explainer-deck.pptx"
    base.build_deck(deck)

    # Narration
    from piper import PiperVoice
    voice = PiperVoice.load(a.voice)
    durs, wavs = [], []
    for i, s in enumerate(base.SLIDES):
        wp = work / f"nar-{i}.wav"
        with wave.open(str(wp), "wb") as wf:
            voice.synthesize_wav(base.spoken(s["notes"]), wf)
        wavs.append(wp); durs.append(base.wav_len(wp))
    slide_len = [PAD_IN + d + PAD_OUT for d in durs]; slide_len[-1] += TAIL
    starts = [sum(slide_len[:i]) for i in range(len(slide_len))]
    total = sum(slide_len)

    # Audio track: each clip placed at its slide start + PAD_IN
    inputs, filt = [], []
    for i, wp in enumerate(wavs):
        inputs += ["-i", str(wp)]
        ms = int((starts[i] + PAD_IN) * 1000)
        filt.append(f"[{i}:a]adelay={ms}|{ms}[a{i}]")
    filt.append("".join(f"[a{i}]" for i in range(len(wavs))) + f"amix=inputs={len(wavs)}:normalize=0,apad=whole_dur={total:.3f},loudnorm=I=-16:TP=-1.5:LRA=11[a]")
    audio = work / "narration.wav"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *inputs, "-filter_complex", ";".join(filt), "-map", "[a]",
                    "-ar", "44100", "-ac", "1", "-t", f"{total:.3f}", str(audio)], check=True)

    # Captions (sentences share the speech window by character count)
    cues = []
    for i, s in enumerate(base.SLIDES):
        sents = [x.strip() for x in re.split(r"(?<=[.!?])\s+", s["notes"]) if x.strip()]
        n, cur = sum(len(x) for x in sents), starts[i] + PAD_IN
        for x in sents:
            d = durs[i] * len(x) / n; cues.append((cur, cur + d, x)); cur += d
    (out / "explainer-captions.vtt").write_text(
        "WEBVTT\n\n" + "".join(f"{base.vtt_time(s_)} --> {base.vtt_time(e_)}\n{x}\n\n" for s_, e_, x in cues))

    # Frames via the app's renderer
    from playwright.sync_api import sync_playwright
    srv = serve(ROOT)
    url = f"http://127.0.0.1:{srv.server_address[1]}"
    nframes = int(round(total * FPS))
    mp4 = out / "explainer.mp4"
    enc = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg",
                            "-i", "-", "-i", str(audio), "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p",
                            "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", "-shortest", str(mp4)], stdin=subprocess.PIPE)
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        pg.goto(url + "/index.html")
        pg.evaluate("""async ([deckUrl, W, H, style, starts, lens]) => {
          await document.fonts.load('700 40px Inter'); await document.fonts.load('400 20px Inter');
          const buf = await (await fetch(deckUrl)).arrayBuffer();
          const d = await window.parsePptx(buf, () => {});
          const c = document.createElement('canvas'); c.width = W; c.height = H;
          window.__r = { d, c, x: c.getContext('2d'), st: VideoStyles.get(style), starts, lens };
        }""", [f"/{a.out}/explainer-deck.pptx", W, H, a.style, starts, slide_len])
        BATCH = 20
        for f0 in range(0, nframes, BATCH):
            frames = pg.evaluate("""([f0, n, fps]) => {
              const { d, c, x, st, starts, lens } = window.__r, R = window.SlideRender, out = [];
              const o = { animate: true, kenburns: true, trans: st.trans, style: st };
              for (let f = f0; f < f0 + n; f++) {
                const t = f / fps; let i = starts.length - 1;
                while (i > 0 && t < starts[i]) i--;
                const el = t - starts[i], pr = Math.min(1, el / lens[i]);
                // Snappy reveals: every shape in within ~2.4s, each taking ~0.55s
                const oi = Object.assign({}, o, { revealLead: 0.15 / lens[i], revealSpan: 2.4 / lens[i], revealDur: 0.55 / lens[i] });
                R.drawFrame(x, d.slides[i], i ? d.slides[i - 1] : null, pr, oi, el, { idx: i, total: d.slides.length });
                out.push(c.toDataURL('image/jpeg', 0.93).split(',')[1]);
              }
              return out;
            }""", [f0, min(BATCH, nframes - f0), FPS])
            for fr in frames: enc.stdin.write(base64.b64decode(fr))
        b.close()
    enc.stdin.close(); enc.wait(); srv.shutdown()

    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(mp4), "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0",
                    "-row-mt", "1", "-c:a", "libopus", "-b:a", "96k", str(out / "explainer.webm")], check=True)
    # Poster: the title slide once it has fully revealed
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{slide_len[0] * 0.85:.2f}", "-i", str(mp4), "-frames:v", "1",
                    "-vf", "scale=1280:720", "-q:v", "3", str(out / "explainer-poster.jpg")], check=True)
    print(json.dumps({"seconds": round(total, 1), "frames": nframes, "style": a.style}))


if __name__ == "__main__":
    main()
