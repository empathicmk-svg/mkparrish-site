"use client";

import { useEffect, useState } from "react";
import { NEON_LINES } from "@/app/lib/brand";
import { Anchor, NeonHeart, ThinCross } from "./Motifs";

/**
 * A neon sign that cycles through MK's own lines. Each quote strikes on line by line,
 * hums, then fades for the next. Pauses on hover or focus; arrows and dots to browse.
 */
export default function NeonQuotes() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const q = NEON_LINES[i];

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setI((n) => (n + 1) % NEON_LINES.length), 6500);
    return () => window.clearTimeout(id);
  }, [i, paused]);

  const go = (d: number) => setI((n) => (n + d + NEON_LINES.length) % NEON_LINES.length);

  return (
    <div
      className="mk-sign relative mx-auto max-w-4xl px-6 py-14 md:px-14 md:py-20"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mk-sign-frame absolute inset-0" aria-hidden="true" />
      <div className="absolute left-5 top-5 md:left-8 md:top-8">
        <ThinCross size={26} />
      </div>
      <div className="absolute right-5 top-5 md:right-8 md:top-8">
        <Anchor size={26} />
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <NeonHeart size={24} className="mk-flicker" />
      </div>

      <figure key={i} className="relative text-center" aria-live="polite">
        <blockquote className="font-serif text-[clamp(1.7rem,4.6vw,3.4rem)] italic leading-[1.15]">
          {q.lines.map((line, n) => (
            <span
              key={line}
              className={`mk-neon-line block ${n === q.pink ? "mk-neon-pink" : "mk-neon-white"}`}
              style={{ animationDelay: `${0.15 + n * 0.35}s` }}
            >
              {line}
            </span>
          ))}
        </blockquote>
        <figcaption
          className="mk-neon-line mt-6 font-body text-[0.65rem] font-bold uppercase tracking-[0.34em] text-petal"
          style={{ animationDelay: `${0.25 + q.lines.length * 0.35}s` }}
        >
          — MK Parrish · {q.from}
        </figcaption>
      </figure>

      <div className="relative mt-10 flex items-center justify-center gap-4">
        <button onClick={() => go(-1)} aria-label="Previous quote" className="mk-sign-btn">
          ←
        </button>
        <div className="flex flex-wrap justify-center gap-1.5">
          {NEON_LINES.map((_, n) => (
            <button
              key={n}
              onClick={() => setI(n)}
              aria-label={`Quote ${n + 1}`}
              aria-current={n === i}
              className={`ag-round h-1.5 w-1.5 transition ${n === i ? "bg-petal shadow-[0_0_10px_#ffb5d0]" : "bg-iron hover:bg-ash"}`}
            />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next quote" className="mk-sign-btn">
          →
        </button>
      </div>
    </div>
  );
}
