#!/usr/bin/env python3
"""Narrate a job: synthesise each scene's script and set sentence beat timings.

Reads <job>/plan.json, writes <job>/audio/scene-<i>.wav and updates each scene's
`duration`, `beats` [{t, end, text}] and `audio` in plan.json. Beats are sentence starts, measured
from the real synthesised audio, so scenes can time animation to the exact moment a line is said.

Voice: Piper, a local text-to-speech model (no account or API key). plan.json gets voiceProvider = "piper".

Usage: python3 studio/voice.py <job_dir> --voice en_US-lessac-medium.onnx [--speed 1.0]
"""
import argparse, json, re, wave
from pathlib import Path

LEAD_IN, TAIL, GAP, MAX_HOLD = 0.8, 1.1, 0.28, 1.6   # seconds: before speech (first scene), after speech, between sentences, max silence after speech


def sentences(text):
    return [s.strip() for s in re.split(r"(?<![Aa]\.[Ii]\.)(?<=[.!?])\s+", text.strip()) if s.strip()]


def spoken(s):
    # pronunciation fixes for TTS only (captions keep the written form)
    s = (s.replace("powerpoint2vid.com", "PowerPoint to vid dot com")
          .replace("PowerPoint2Vid", "PowerPoint to vid"))
    return s.replace("a.i.", "A I").replace("A.I.", "A I")


def write_wav(path, pcm, sr):
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(bytes(pcm))


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
    ap.add_argument("job"); ap.add_argument("--voice", required=True, help="Piper .onnx model")
    ap.add_argument("--speed", type=float, default=1.0, help="1.1 = 10% faster")
    a = ap.parse_args()
    job = Path(a.job); plan = json.loads((job / "plan.json").read_text())
    (job / "audio").mkdir(exist_ok=True)
    piper = Piper(a.voice, a.speed)
    scenes = plan["scenes"]
    for i, sc in enumerate(scenes):
        sents = sentences(sc.get("narration", "")) or ["."]
        seg, spans = piper.scene(sents); sr = piper.sr
        pcm = b"\0\0" * int(LEAD_IN * sr) + seg
        speech_end = LEAD_IN + len(seg) / 2 / sr
        beats = [{"t": round(LEAD_IN + x, 3), "end": round(LEAD_IN + y, 3), "text": t} for (x, y), t in zip(spans, sents)]
        # minDuration is a soft floor: never more than MAX_HOLD of silence after the voice
        dur = max(speech_end + TAIL, min(sc.get("minDuration", 0), speech_end + MAX_HOLD), len(pcm) / 2 / sr)
        pcm = bytearray(pcm) + b"\0\0" * max(0, int(dur * sr) - len(pcm) // 2)
        write_wav(job / "audio" / f"scene-{i}.wav", pcm, sr)
        sc.update(audio=f"audio/scene-{i}.wav", duration=round(dur, 3), beats=beats, speechEnd=round(speech_end, 3))
        print(f"scene {i}: {dur:5.2f}s, speech {beats[0]['t']:.2f}-{speech_end:.2f}, {len(beats)} beats (piper)")
    plan["voiceProvider"] = "piper"
    plan.pop("voiceFallback", None)
    (job / "plan.json").write_text(json.dumps(plan, indent=2))


if __name__ == "__main__":
    main()
