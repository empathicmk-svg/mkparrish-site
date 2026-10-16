#!/usr/bin/env python3
"""
Original, royalty-free music beds for MK's Reels and TikToks.

Everything here is synthesised from scratch (no samples, no third-party
loops), so the beds can be used on any account, including Business accounts
whose in-app music library is restricted.

  showroom.wav  118 BPM deep-house groove in A minor, for the Mercedes reels
  soft.wav      76 BPM warm keys in F major, for the quote videos

Run: python3 scripts/audio/make-music-beds.py   (needs numpy)
Out: output/audio/{showroom,soft}.wav  (44.1 kHz stereo, 16-bit)
"""
import os
import wave

import numpy as np

SR = 44100
ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
OUT = os.path.join(ROOT, 'output', 'audio')
rng = np.random.default_rng(7)


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def env(n, attack, decay):
    """Linear attack, exponential decay, n samples long."""
    a = max(1, int(attack * SR))
    e = np.exp(-np.arange(n) / (decay * SR))
    e[:a] *= np.linspace(0, 1, a)
    return e


def lowpass(x, cutoff):
    """Gentle frequency-domain low-pass (no ringing, no scipy needed)."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / np.sqrt(1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, len(x))


def highpass(x, cutoff):
    return x - lowpass(x, cutoff)


def saw(freq, n, detune=0.0):
    t = np.arange(n) / SR
    out = np.zeros(n)
    for d in (-detune, 0, detune):
        ph = (t * freq * (1 + d) + rng.random()) % 1.0
        out += 2 * ph - 1
    return out / 3


def place(track, sound, at):
    i = int(at * SR)
    if i >= len(track):
        return
    j = min(len(track), i + len(sound))
    track[i:j] += sound[: j - i]


def delay(x, secs, feedback, mix):
    d = int(secs * SR)
    y = x.copy()
    tap = x.copy()
    for _ in range(6):
        tap = np.concatenate([np.zeros(d), tap[:-d]]) * feedback
        y += tap * mix / feedback
    return y


def reverb(x, mix=0.25):
    """Cheap room: a few decaying, low-passed echoes at prime-ish spacings."""
    y = np.zeros_like(x)
    for ms, g in ((29, .5), (37, .45), (53, .4), (71, .35), (97, .3), (131, .25), (173, .2), (227, .15)):
        d = int(ms / 1000 * SR)
        y[d:] += x[:-d] * g
    return x + lowpass(y, 5000) * mix


def stereo(left, right):
    return np.stack([left, right], axis=1)


def normalise(x, peak=0.89):
    return x * (peak / np.max(np.abs(x)))


def fade(x, fin, fout):
    n = len(x)
    x[: int(fin * SR)] *= np.linspace(0, 1, int(fin * SR))[:, None]
    x[n - int(fout * SR):] *= np.linspace(1, 0, int(fout * SR))[:, None]
    return x


def write(name, x):
    os.makedirs(OUT, exist_ok=True)
    pcm = (np.clip(x, -1, 1) * 32767).astype('<i2')
    with wave.open(os.path.join(OUT, name), 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(f'  ✓ output/audio/{name}  {len(x) / SR:.1f}s')


# ── Showroom: 118 BPM deep house ───────────────────────────────────────────────
def showroom():
    bpm = 118
    beat = 60 / bpm
    bars = 16
    n = int(bars * 4 * beat * SR) + SR
    kick, clap, hat, bass, keys, pad = (np.zeros(n) for _ in range(6))
    duck = np.ones(n)

    k = int(0.32 * SR)
    t = np.arange(k) / SR
    f = 45 + 85 * np.exp(-t * 28)
    kick_s = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(k, 0.001, 0.13)
    kick_s += np.sin(2 * np.pi * 1500 * t) * np.exp(-t * 400) * 0.15
    c = int(0.18 * SR)
    hat_len = int(0.05 * SR)
    open_len = int(0.16 * SR)

    # A minor: Am9, Fmaj7, Cmaj7, G6 — roots and voicings.
    prog = [(45, [57, 60, 64, 67, 71]), (41, [57, 60, 64, 65]), (48, [55, 59, 60, 64]), (43, [55, 59, 62, 64])]

    for bar in range(bars):
        root, chord = prog[bar % 4]
        b0 = bar * 4 * beat
        for q in range(4):
            tq = b0 + q * beat
            place(kick, kick_s, tq)
            d = env(int(0.3 * SR), 0.002, 0.09)
            place(duck, -0.6 * d, tq)
            if q in (1, 3):
                noise = rng.standard_normal(c) * env(c, 0.001, 0.045)
                place(clap, noise, tq)
            # off-beat hats, an open hat on the last "and" of each bar
            ln = open_len if q == 3 else hat_len
            place(hat, rng.standard_normal(ln) * env(ln, 0.0005, 0.05 if q == 3 else 0.012), tq + beat / 2)
            place(hat, rng.standard_normal(hat_len) * env(hat_len, 0.0005, 0.008) * 0.35, tq + beat / 4 * 3)
            # off-beat bass, octave jump on beat 4
            bl = int(beat * 0.45 * SR)
            note = root + (12 if q == 3 else 0)
            tb = np.arange(bl) / SR
            bs = (np.sin(2 * np.pi * midi(note) * tb) + 0.3 * saw(midi(note), bl)) * env(bl, 0.004, 0.18)
            place(bass, bs, tq + beat / 2)
        # syncopated chord stabs: 1, the "and" of 2, and 4
        for pos, length in ((0, 0.3), (1.5, 0.25), (3, 0.35)):
            sl = int(length * SR)
            stab = sum(saw(midi(m), sl, 0.004) for m in chord) * env(sl, 0.003, 0.12)
            place(keys, stab, b0 + pos * beat)
        pl = int(4 * beat * SR)
        pd = sum(saw(midi(m), pl, 0.006) for m in chord) * env(pl, 0.4, 3.0)
        place(pad, pd, b0)

    duck = np.clip(duck, 0.35, 1)
    clap = highpass(lowpass(clap, 5000), 900)
    hat = highpass(hat, 7000)
    bass = lowpass(bass, 600) * duck
    keys = reverb(delay(lowpass(keys, 2200), beat * 0.75, 0.35, 0.5), 0.35) * duck
    pad = reverb(lowpass(pad, 1200), 0.5) * duck

    L = kick * 0.75 + clap * 0.3 + hat * 0.13 + bass * 0.6 + keys * 0.3 + pad * 0.16
    R = kick * 0.75 + clap * 0.3 + np.roll(hat, int(0.004 * SR)) * 0.13 + bass * 0.6 + np.roll(keys, int(0.011 * SR)) * 0.3 + np.roll(pad, int(0.017 * SR)) * 0.16
    x = normalise(stereo(L, R))
    return fade(x[: int(bars * 4 * beat * SR)], 0.02, 1.0)


# ── Soft: 76 BPM warm keys ─────────────────────────────────────────────────────
def soft():
    bpm = 76
    beat = 60 / bpm
    bars = 8
    n = int(bars * 4 * beat * SR) + 2 * SR
    keys, bass, hat, bell = (np.zeros(n) for _ in range(4))
    prog = [(41, [53, 57, 60, 64]), (40, [52, 55, 59, 62]), (38, [50, 53, 57, 60]), (36, [48, 52, 55, 59])]

    def ep(note, length):
        """Electric-piano-ish tone: sine with a little 2nd/3rd harmonic and tremolo."""
        ln = int(length * SR)
        t = np.arange(ln) / SR
        f = midi(note)
        tone = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(4 * np.pi * f * t) * np.exp(-t * 3) + 0.08 * np.sin(6 * np.pi * f * t) * np.exp(-t * 6)
        return tone * (1 + 0.12 * np.sin(2 * np.pi * 4.5 * t)) * env(ln, 0.01, 1.4)

    melody = [72, 69, 67, 69, 71, 67, 64, 67, 69, 65, 64, 62, 64, 60, 62, 64]
    for bar in range(bars):
        root, chord = prog[bar % 4]
        b0 = bar * 4 * beat
        for i, m in enumerate(chord):
            place(keys, ep(m, 4 * beat), b0 + i * 0.03)          # gently rolled chord
        place(keys, 0.35 * sum(ep(m, 2 * beat) for m in chord), b0 + 2.5 * beat)
        bl = int(4 * beat * SR)
        tb = np.arange(bl) / SR
        place(bass, np.sin(2 * np.pi * midi(root) * tb) * env(bl, 0.02, 2.0), b0)
        for q in range(8):
            hl = int(0.06 * SR)
            place(hat, rng.standard_normal(hl) * env(hl, 0.002, 0.02) * (0.6 if q % 2 else 1), b0 + q * beat / 2)
        for h in range(2):
            note = melody[(bar * 2 + h) % len(melody)]
            place(bell, ep(note + 12, 2 * beat) * 0.5, b0 + h * 2 * beat + beat)

    keys = reverb(lowpass(keys, 3500), 0.6)
    bell = reverb(delay(lowpass(bell, 5000), beat * 0.75, 0.4, 0.5), 0.7)
    hat = highpass(hat, 6000)
    bass = lowpass(bass, 300)
    L = keys * 0.35 + bell * 0.18 + hat * 0.05 + bass * 0.45
    R = np.roll(keys, int(0.013 * SR)) * 0.35 + np.roll(bell, int(0.02 * SR)) * 0.18 + hat * 0.05 + bass * 0.45
    x = normalise(stereo(L, R))
    return fade(x[: int(bars * 4 * beat * SR)], 0.3, 1.5)


if __name__ == '__main__':
    write('showroom.wav', showroom())
    write('soft.wav', soft())
