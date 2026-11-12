#!/usr/bin/env python3
"""
Scores one reel to its exact timeline: the "showroom" bed, plus a key click on
every typed character, a soft chime on every printed output line, a whoosh into
every cut and a low hit on the beat it lands on. Everything is synthesised here
(no samples), so the soundtrack is cleared for any account.

Cue sheet (JSON, times in seconds from the start of the reel):
  {"duration": 18.2, "bed": "output/audio/showroom.wav",
   "cuts": [2.03, 4.07], "keys": [0.4, 0.43], "outs": [3.1], "duck": [[0.2, 3.4]]}
Neon reels also use "zaps" (a tube striking, one per flicker-on) and
"hum" ([start, end] ranges of a lit sign's low buzz).

Run: python3 scripts/audio/mix-timed.py cues.json out.wav   (needs numpy)
"""
import json
import sys
import wave

import numpy as np

SR = 44100
rng = np.random.default_rng(11)


def lowpass(x, cutoff):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / np.sqrt(1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, len(x))


def decay(n, seconds):
    return np.exp(-np.arange(n) / (seconds * SR))


def click():
    """A short mechanical key: a bright tick over a tiny low thump."""
    n = int(0.03 * SR)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    tick = (noise - lowpass(noise, 2800)) * decay(n, 0.0035)
    thump = np.sin(2 * np.pi * 190 * t) * decay(n, 0.008) * 0.5
    return (tick + thump) * 0.5


def chime():
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    tone = np.sin(2 * np.pi * 1318.5 * t) + 0.45 * np.sin(2 * np.pi * 1975.5 * t)
    return tone * decay(n, 0.09) * 0.22


def whoosh(length=0.32):
    """Filtered noise that swells into the cut."""
    n = int(length * SR)
    rise = np.linspace(0, 1, n) ** 2.4
    noise = lowpass(rng.standard_normal(n), 4500)
    return noise * rise * 0.22


def hit():
    """Pitch-dropping sub with a transient, landing on the beat."""
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    freq = 46 + 40 * np.exp(-t * 18)
    sub = np.sin(2 * np.pi * np.cumsum(freq) / SR) * decay(n, 0.16)
    snap = lowpass(rng.standard_normal(n), 3000) * decay(n, 0.006) * 0.35
    return (sub + snap) * 0.7


def zap():
    """A neon tube striking: a crackle of filtered noise over a decaying 120 Hz buzz."""
    n = int(0.28 * SR)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    crackle = (noise - lowpass(noise, 1800)) * decay(n, 0.012) * 0.55
    buzz = sum(np.sin(2 * np.pi * 120 * k * t) / k for k in (1, 2, 3, 5)) * decay(n, 0.07) * 0.32
    return crackle + buzz


def hum(seconds):
    """The steady mains buzz of a lit sign, with a slow flutter so it doesn't sit still."""
    n = int(seconds * SR)
    t = np.arange(n) / SR
    tone = sum(np.sin(2 * np.pi * 120 * k * t) / k ** 1.5 for k in (1, 2, 3, 4))
    flutter = 1 + 0.15 * np.sin(2 * np.pi * 0.7 * t)
    return tone * flutter * 0.035


def place(track, sound, at, gain=1.0, pan=0.0):
    i = int(round(at * SR))
    if i >= track.shape[0]:
        return
    if i < 0:
        sound, i = sound[-i:], 0
    j = min(track.shape[0], i + len(sound))
    seg = sound[: j - i] * gain
    track[i:j, 0] += seg * (1 - max(0, pan))
    track[i:j, 1] += seg * (1 + min(0, pan))


def read_wav(file):
    with wave.open(file) as w:
        data = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
        return data.reshape(-1, w.getnchannels())


def main(cue_file, out_file):
    cues = json.load(open(cue_file))
    n = int(cues["duration"] * SR)
    bed = read_wav(cues["bed"])
    if len(bed) < n:
        bed = np.concatenate([bed] * (n // len(bed) + 1))
    bed = bed[:n].copy()

    # Duck the music under typing so the keys read, with 60 ms ramps.
    gain = np.full(n, 0.9)
    ramp = int(0.06 * SR)
    for a, b in cues.get("duck", []):
        i, j = int(a * SR), min(n, int(b * SR))
        gain[i:j] = 0.5
        gain[max(0, i - ramp):i] = np.linspace(0.9, 0.5, i - max(0, i - ramp))
        gain[j:min(n, j + ramp)] = np.linspace(0.5, 0.9, min(n, j + ramp) - j)
    mix = bed * gain[:, None]

    fx = np.zeros((n, 2))
    for t in cues.get("keys", []):
        place(fx, click(), t, gain=rng.uniform(0.7, 1.0), pan=rng.uniform(-0.25, 0.25))
    for t in cues.get("outs", []):
        place(fx, chime(), t)
    for t in cues.get("zaps", []):
        place(fx, zap(), t, gain=rng.uniform(0.75, 1.0), pan=rng.uniform(-0.15, 0.15))
    for a, b in cues.get("hum", []):
        place(fx, hum(b - a), a)
    w = whoosh()
    for t in cues.get("cuts", []):
        place(fx, w, t - len(w) / SR + 0.02)
        place(fx, hit(), t)
    mix += fx

    # Fade in and out, then peak at -1 dBFS (the mux step sets loudness).
    fade = int(0.03 * SR)
    mix[:fade] *= np.linspace(0, 1, fade)[:, None]
    tail = min(n, SR)
    mix[-tail:] *= np.linspace(1, 0, tail)[:, None]
    mix *= 0.89 / max(1e-9, np.abs(mix).max())

    with wave.open(out_file, "wb") as out:
        out.setnchannels(2)
        out.setsampwidth(2)
        out.setframerate(SR)
        out.writeframes((mix * 32767).astype(np.int16).tobytes())


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
