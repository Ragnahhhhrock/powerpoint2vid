#!/usr/bin/env python3
"""Narrate a job: synthesise each scene's script and set sentence beat timings.

Reads <job>/plan.json, writes <job>/audio/scene-<i>.wav and updates each scene's
`duration`, `beats` [{t, end, text}] and `audio` in plan.json. Beats are sentence starts, measured
from the real synthesised audio, so scenes can time animation to the exact moment a line is said.

Providers:
  ElevenLabs (production): used when ELEVENLABS_API_KEY is set. The script is read as one continuous
    take (or a few, for long decks) with character timestamps, then cut into scenes at the quietest
    point of each pause, so delivery flows across scene changes and no word is clipped. Beats carry
    word times (beats[i].words) so animation lands on the exact word. Voice from
    P2V_TTS_VOICE (an ElevenLabs voice id), model from ELEVENLABS_MODEL. Responses are cached in
    $DATA_DIR/tts-cache, so retries and re-renders don't spend credits twice.
  Piper (local fallback): used when there is no key, or if ElevenLabs fails (quota, outage), so a
    job always finishes. plan.json gets voiceProvider and, on fallback, voiceFallback=true.

Usage: python3 studio/voice.py <job_dir> --voice en_US-lessac-medium.onnx [--speed 1.0]
"""
import argparse, base64, hashlib, json, os, re, sys, time, urllib.error, urllib.request, wave
from pathlib import Path

LEAD_IN, TAIL, GAP = 0.8, 1.1, 0.28   # seconds: before speech (first scene), after speech, between sentences (Piper)
LEAD_NEXT, TAIL_NEXT, END_HOLD, MAX_HOLD = 0.55, 0.85, 2.2, 1.6   # ElevenLabs: pause before speech in later scenes; final hold; max silence after speech
SR_11 = 24000                          # ElevenLabs pcm_24000: 16-bit mono
DEFAULT_VOICE = "JBFqnCBsd6RMkjVDRZzb"  # George: warm, measured narrator
API = os.environ.get("ELEVENLABS_BASE", "https://api.elevenlabs.io")


def sentences(text):
    return [s.strip() for s in re.split(r"(?<![Aa]\.[Ii]\.)(?<=[.!?])\s+", text.strip()) if s.strip()]


def spoken(s, eleven=False):
    # pronunciation fixes for TTS only (captions keep the written form)
    s = (s.replace("powerpoint2vid.com", "PowerPoint to vid dot com")
          .replace("PowerPoint2Vid", "PowerPoint to vid"))
    return s.replace("a.i.", "A.I.") if eleven else s.replace("a.i.", "A I").replace("A.I.", "A I")


def write_wav(path, pcm, sr):
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(bytes(pcm))


# ---------- ElevenLabs ----------
def eleven_request(text, prev, nxt, voice, model, speed, key, cache):
    settings = {"stability": 0.45, "similarity_boost": 0.8, "style": 0.15, "use_speaker_boost": True}
    if abs(speed - 1) > 0.01:
        settings["speed"] = max(0.7, min(1.2, speed))
    body = {"text": text, "model_id": model, "voice_settings": settings}
    if prev: body["previous_text"] = prev[-600:]
    if nxt: body["next_text"] = nxt[:600]
    h = hashlib.sha256(json.dumps([voice, body], sort_keys=True).encode()).hexdigest()
    hit = cache / f"{h}.json"
    if hit.exists():
        return json.loads(hit.read_text())
    req = urllib.request.Request(
        f"{API}/v1/text-to-speech/{voice}/with-timestamps?output_format=pcm_{SR_11}",
        data=json.dumps(body).encode(), method="POST",
        headers={"xi-api-key": key, "content-type": "application/json", "accept": "application/json"})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                data = json.loads(r.read())
            break
        except urllib.error.HTTPError as e:
            detail = e.read()[:300].decode("utf8", "replace")
            if e.code in (429, 500, 502, 503) and attempt < 2:
                time.sleep(3 * (attempt + 1)); continue
            raise RuntimeError(f"ElevenLabs {e.code}: {detail}")
        except urllib.error.URLError as e:
            if attempt < 2: time.sleep(3 * (attempt + 1)); continue
            raise RuntimeError(f"ElevenLabs unreachable: {e.reason}")
    out = {"audio": data["audio_base64"], "alignment": data.get("alignment") or data.get("normalized_alignment")}
    cache.mkdir(parents=True, exist_ok=True)
    hit.write_text(json.dumps(out))
    return out


def _norm_al(r, text, total):
    al = r.get("alignment") or {}
    st, en = al.get("character_start_times_seconds") or [], al.get("character_end_times_seconds") or []
    n = len(st); scale = n / len(text) if text and n else 0
    def at(i, end=False):
        if not n: return total * (i + (1 if end else 0)) / max(1, len(text))
        return (en if end else st)[max(0, min(n - 1, round(i * scale)))]
    return at


def _quietest(pcm, sr, a, b):
    """Sample index of the quietest 20 ms window between times a and b (the cut point inside a pause)."""
    import array
    s = array.array("h", pcm)
    lo, hi = int(a * sr), int(b * sr); win = int(0.02 * sr)
    if hi - lo <= win: return (lo + hi) // 2
    best, at = None, (lo + hi) // 2
    for i in range(lo, hi - win, win // 2):
        e = sum(abs(x) for x in s[i:i + win:4])
        if best is None or e < best: best, at = e, i + win // 2
    return at


def _fade(pcm, sr, ms=12):
    import array
    s = array.array("h", pcm); k = min(len(s) // 2, int(sr * ms / 1000))
    for i in range(k):
        g = i / k; s[i] = int(s[i] * g); s[-1 - i] = int(s[-1 - i] * g)
    return s.tobytes()


GUARD = "Thanks for watching."   # spoken after the real last line and cut off, so the last word is never clipped
TAKE_CHARS = 2400                # one continuous take per this many characters (whole video for most decks)


def eleven_takes(scenes, voice, model, speed, key, cache):
    """Narrate scenes as continuous takes (natural flow across scene changes), then cut each take into
    scenes at the quietest point of each pause. Returns per scene: (pcm, speech_start, speech_end,
    [(start, end)] per sentence, [(word, t)]), times relative to that scene's audio."""
    texts = [[spoken(x, eleven=True) for x in (sentences(sc.get("narration", "")) or ["."])] for sc in scenes]
    groups, cur, size = [], [], 0
    for i, t in enumerate(texts):
        L = sum(len(x) + 1 for x in t)
        if cur and size + L > TAKE_CHARS: groups.append(cur); cur, size = [], 0
        cur.append(i); size += L
    groups.append(cur)
    out = [None] * len(scenes)
    for g, ids in enumerate(groups):
        paras = [" ".join(texts[i]) for i in ids]
        text = "\n\n".join(paras + [GUARD])
        prev = " ".join(" ".join(texts[i]) for i in groups[g - 1]) if g else ""
        nxt = " ".join(texts[groups[g + 1][0]]) if g + 1 < len(groups) else ""
        r = eleven_request(text, prev, nxt, voice, model, speed, key, cache)
        pcm = base64.b64decode(r["audio"]); total = len(pcm) / 2 / SR_11
        at = _norm_al(r, text, total)
        # character offsets of every scene paragraph, its sentences and words
        info, off = [], 0
        for i, para in zip(ids, paras):
            sp, so = [], off
            for x in texts[i]:
                sp.append((at(so), at(so + len(x) - 1, True))); so += len(x) + 1
            words = [(m.group(0), at(off + m.start())) for m in re.finditer(r"\S+", para)]
            info.append((i, at(off), at(off + len(para) - 1, True), sp, words))
            off += len(para) + 2
        guard_start = at(off)
        cuts = [0]
        for k in range(len(info)):
            nxt_start = info[k + 1][1] if k + 1 < len(info) else guard_start
            cuts.append(_quietest(pcm, SR_11, info[k][2] + 0.03, max(info[k][2] + 0.05, nxt_start - 0.03)))
        for k, (i, a, b, sp, words) in enumerate(info):
            c0, c1 = cuts[k], cuts[k + 1]; t0 = c0 / SR_11
            seg = _fade(pcm[c0 * 2:c1 * 2], SR_11)
            out[i] = (seg, a - t0, b - t0, [(x - t0, y - t0) for x, y in sp], [(w, t - t0) for w, t in words])
    return out


# ---------- Piper ----------
class Piper:
    def __init__(self, model, speed):
        from piper import PiperVoice, SynthesisConfig
        self.v = PiperVoice.load(model)
        self.cfg = SynthesisConfig(length_scale=1 / speed)
        self.sr = self.v.config.sample_rate

    def scene(self, sents):
        pcm, spans, t = bytearray(), [], 0.0
        for j, s in enumerate(sents):
            if j:
                pcm += b"\0\0" * int(GAP * self.sr); t += GAP
            start = t
            for ch in self.v.synthesize(spoken(s), syn_config=self.cfg):
                pcm += ch.audio_int16_bytes; t += len(ch.audio_int16_bytes) / 2 / self.sr
            spans.append((round(start, 3), round(t, 3)))
        return bytes(pcm), spans


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("job"); ap.add_argument("--voice", help="Piper .onnx model (fallback voice)")
    ap.add_argument("--speed", type=float, default=1.0, help="1.1 = 10% faster")
    a = ap.parse_args()
    job = Path(a.job); plan = json.loads((job / "plan.json").read_text())
    (job / "audio").mkdir(exist_ok=True)

    key = os.environ.get("ELEVENLABS_API_KEY", "").strip()
    voice = os.environ.get("P2V_TTS_VOICE", "").strip() or DEFAULT_VOICE
    if not re.fullmatch(r"[A-Za-z0-9]{10,40}", voice): voice = DEFAULT_VOICE
    model = os.environ.get("ELEVENLABS_MODEL", "eleven_multilingual_v2")
    cache = Path(os.environ.get("DATA_DIR", str(job.parent))) / "tts-cache"
    provider, piper = ("elevenlabs" if key else "piper"), None

    def get_piper():
        nonlocal piper
        if piper is None:
            if not a.voice: raise SystemExit("the local voice needs --voice <piper .onnx>")
            piper = Piper(a.voice, a.speed)
        return piper

    scenes = plan["scenes"]

    def timing(sc, speech_end, last):
        # minDuration is a soft floor: never more than MAX_HOLD of silence after the voice
        tail = END_HOLD if last else (TAIL_NEXT if provider == "elevenlabs" else TAIL)
        return max(speech_end + tail, min(sc.get("minDuration", 0), speech_end + MAX_HOLD))

    def narrate():
        if provider == "elevenlabs":
            takes = eleven_takes(scenes, voice, model, a.speed, key, cache)
        for i, sc in enumerate(scenes):
            sents = sentences(sc.get("narration", "")) or ["."]
            last = i == len(scenes) - 1
            if provider == "elevenlabs":
                seg, s0, s1, spans, words = takes[i]; sr = SR_11
                lead = LEAD_IN if i == 0 else LEAD_NEXT
                if s0 > lead:   # trim long pauses at scene changes to one steady breath (cuts are in silence)
                    cut = int((s0 - lead + 0.02) * sr); seg = _fade(seg[cut * 2:], sr)
                    d = cut / sr; s0, s1 = s0 - d, s1 - d; spans = [(x - d, y - d) for x, y in spans]; words = [(w, t - d) for w, t in words]
                keep = int((s1 + TAIL_NEXT - 0.1) * sr)
                if i < len(scenes) - 1 and len(seg) // 2 > keep: seg = _fade(seg[:keep * 2], sr)
                pad = max(0.0, lead - s0)   # natural pause already in the cut counts
                pcm = b"\0\0" * int(pad * sr) + seg
                speech_end = pad + s1
                beats = [{"t": round(pad + x, 3), "end": round(pad + y, 3), "text": t} for (x, y), t in zip(spans, sents)]
                ws = [{"w": w, "t": round(pad + t, 3)} for w, t in words]
                for bt in beats: bt["words"] = [w for w in ws if bt["t"] - 0.05 <= w["t"] <= bt["end"] + 0.05]
            else:
                p = get_piper(); seg, spans = p.scene(sents); sr = p.sr
                pcm = b"\0\0" * int(LEAD_IN * sr) + seg
                speech_end = LEAD_IN + len(seg) / 2 / sr
                beats = [{"t": round(LEAD_IN + x, 3), "end": round(LEAD_IN + y, 3), "text": t} for (x, y), t in zip(spans, sents)]
            dur = max(timing(sc, speech_end, last), len(pcm) / 2 / sr)
            pcm = bytearray(pcm) + b"\0\0" * max(0, int(dur * sr) - len(pcm) // 2)
            write_wav(job / "audio" / f"scene-{i}.wav", pcm, sr)
            sc.update(audio=f"audio/scene-{i}.wav", duration=round(dur, 3), beats=beats, speechEnd=round(speech_end, 3))
            print(f"scene {i}: {dur:5.2f}s, speech {beats[0]['t']:.2f}-{speech_end:.2f}, {len(beats)} beats ({provider})")

    try:
        narrate()
    except Exception as e:
        if provider != "elevenlabs": raise
        # quota, outage or bad voice: re-voice the whole video locally so it keeps one voice
        print(f"ElevenLabs failed ({e}); using the local voice for this video", file=sys.stderr)
        provider = "piper"; plan["voiceFallback"] = True
        narrate()
    plan["voiceProvider"] = provider
    (job / "plan.json").write_text(json.dumps(plan, indent=2))


if __name__ == "__main__":
    main()
