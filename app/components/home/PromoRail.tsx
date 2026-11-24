"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PROMOS } from "@/app/lib/brand";
import { NeonHeart } from "./Motifs";

/** One promotion at a time, rotating, with a lit heart. */
export default function PromoRail() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setI((n) => (n + 1) % PROMOS.length), 4800);
    return () => window.clearTimeout(id);
  }, [i, paused]);

  const p = PROMOS[i];
  return (
    <div
      className="relative border-y border-petal/25 bg-[linear-gradient(90deg,#0b0b0b,#1c1116_50%,#0b0b0b)]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-5 gap-y-2 px-6 py-4 text-center lg:px-10">
        <NeonHeart size={18} className="mk-flicker" />
        <p key={i} className="mk-word font-body text-sm font-light text-pearl" aria-live="polite">
          <span className="mr-3 font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">{p.label}</span>
          {p.text}
        </p>
        <Link href={p.href} className="font-body text-[0.68rem] font-bold uppercase tracking-[0.2em] text-petal transition hover:text-blush">
          {p.cta} →
        </Link>
      </div>
    </div>
  );
}
