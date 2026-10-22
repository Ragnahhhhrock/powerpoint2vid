#!/usr/bin/env python3
"""Narrate a job: synthesise each scene's script and set sentence beat timings.

Reads <job>/plan.json, writes <job>/audio/scene-<i>.wav and updates each scene's
`duration`, `beats` [{t, end, text}] and `audio` in plan.json. Beats are sentence starts, measured
from the real synthesised audio, so scenes can time animation to the exact moment a line is said.

Providers:
  ElevenLabs (production): used when ELEVENLABS_API_KEY is set. One request per scene with
    character timestamps, so delivery flows naturally and beats are exact. Voice from
    P2V_TTS_VOICE (an ElevenLabs voice id), model from ELEVENLABS_MODEL. Responses are cached in
    $DATA_DIR/tts-cache, so retries and re-renders don't spend credits twice.
  Piper (local fallback): used when there is no key, or if ElevenLabs fails (quota, outage), so a
    job always finishes. plan.json gets voiceProvider and, on fallback, voiceFallback=true.

Usage: python3 studio/voice.py <job_dir> --voice en_US-lessac-medium.onnx [--speed 1.0]
"""
import argparse, base64, hashlib, json, os, re, sys, time, urllib.error, urllib.request, wave
from pathlib import Path

LEAD_IN, TAIL, GAP = 0.8, 1.1, 0.28   # seconds: before speech, after speech, between sentences (Piper)
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


def eleven_scene(sents, prev, nxt, voice, model, speed, key, cache):
    """One request per scene. Returns (pcm bytes, [(start, end)] per sentence) with times relative to audio start."""
    parts = [spoken(s, eleven=True) for s in sents]
    text = " ".join(parts)
    r = eleven_request(text, prev, nxt, voice, model, speed, key, cache)
    pcm = base64.b64decode(r["audio"])
    total = len(pcm) / 2 / SR_11
    al = r["alignment"] or {}
    starts, ends = al.get("character_start_times_seconds") or [], al.get("character_end_times_seconds") or []
    n = len(starts)
    scale = n / len(text) if text and n else 0

    def at(i, arr, default):
        if not n: return default
        return arr[max(0, min(n - 1, round(i * scale)))]

    spans, off = [], 0
    for k, p in enumerate(parts):
        a = at(off, starts, total * off / max(1, len(text)))
        b = at(off + len(p) - 1, ends, total * (off + len(p)) / max(1, len(text)))
        spans.append((round(a, 3), round(max(a, b), 3)))
        off += len(p) + 1
    return pcm, spans


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

    def synth(i, sents):
        if provider == "elevenlabs":
            prev = scenes[i - 1].get("narration", "") if i else ""
            nxt = scenes[i + 1].get("narration", "") if i + 1 < len(scenes) else ""
            pcm, spans = eleven_scene(sents, prev, nxt, voice, model, a.speed, key, cache)
            return pcm, spans, SR_11
        p = get_piper(); pcm, spans = p.scene(sents); return pcm, spans, p.sr

    def narrate():
        for i, sc in enumerate(scenes):
            sents = sentences(sc.get("narration", "")) or ["."]
            pcm, spans, sr = synth(i, sents)
            out_pcm = bytearray(b"\0\0" * int(LEAD_IN * sr)) + pcm
            speech_end = LEAD_IN + len(pcm) / 2 / sr
            dur = max(sc.get("minDuration", 0), speech_end + TAIL)
            out_pcm += b"\0\0" * max(0, int((dur - speech_end) * sr))
            write_wav(job / "audio" / f"scene-{i}.wav", out_pcm, sr)
            beats = [{"t": round(LEAD_IN + s, 3), "end": round(LEAD_IN + e, 3), "text": t} for (s, e), t in zip(spans, sents)]
            sc.update(audio=f"audio/scene-{i}.wav", duration=round(dur, 3), beats=beats, speechEnd=round(speech_end, 3))
            print(f"scene {i}: {dur:5.2f}s, {len(beats)} beats ({provider})")

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
