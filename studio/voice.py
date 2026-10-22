#!/usr/bin/env python3
"""Narrate a job: synthesise each scene's script sentence by sentence and set beat timings.

Reads <job>/plan.json, writes <job>/audio/scene-<i>.wav and updates each scene's
`duration`, `beats` [{t, text}] and `audio` in plan.json. Beats are sentence starts, measured
from the real synthesised audio, so scenes can time animation to the exact moment a line is said.

Provider: Piper (local). Swap synth() for ElevenLabs / OpenAI / Google TTS in production
(use their word timestamps to make beats word-accurate).

Usage: python3 studio/voice.py <job_dir> --voice en_US-lessac-medium.onnx
"""
import argparse, json, re, wave
from pathlib import Path

LEAD_IN, TAIL, GAP = 0.8, 1.1, 0.28   # seconds: before speech, after speech, between sentences


def sentences(text):
    return [s.strip() for s in re.split(r"(?<=[.!?])\s+", text.strip()) if s.strip()]


def spoken(s):
    # pronunciation fixes for TTS only (captions keep the written form)
    return (s.replace("powerpoint2vid.com", "PowerPoint to vid dot com")
             .replace("PowerPoint2Vid", "PowerPoint to vid"))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("job"); ap.add_argument("--voice", required=True)
    ap.add_argument("--speed", type=float, default=1.0, help="length_scale divisor (1.1 = 10% faster)")
    a = ap.parse_args()
    job = Path(a.job); plan = json.loads((job / "plan.json").read_text())
    (job / "audio").mkdir(exist_ok=True)

    from piper import PiperVoice, SynthesisConfig
    voice = PiperVoice.load(a.voice)
    cfg = SynthesisConfig(length_scale=1 / a.speed)
    sr = voice.config.sample_rate

    for i, sc in enumerate(plan["scenes"]):
        pcm, beats, t = bytearray(), [], LEAD_IN
        pcm += b"\0\0" * int(LEAD_IN * sr)
        for j, s in enumerate(sentences(sc["narration"])):
            if j:
                pcm += b"\0\0" * int(GAP * sr); t += GAP
            start = t
            for ch in voice.synthesize(spoken(s), syn_config=cfg):
                pcm += ch.audio_int16_bytes; t += len(ch.audio_int16_bytes) / 2 / sr
            beats.append({"t": round(start, 3), "end": round(t, 3), "text": s})
        speech_end = t
        dur = max(sc.get("minDuration", 0), speech_end + TAIL)
        pcm += b"\0\0" * int((dur - t) * sr)
        out = job / "audio" / f"scene-{i}.wav"
        with wave.open(str(out), "wb") as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(bytes(pcm))
        sc.update(audio=f"audio/scene-{i}.wav", duration=round(dur, 3), beats=beats, speechEnd=round(speech_end, 3))
        print(f"scene {i}: {dur:5.2f}s, {len(beats)} beats")
    (job / "plan.json").write_text(json.dumps(plan, indent=2))


if __name__ == "__main__":
    main()
