"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BRAND, CTA, FOUR_CS } from "@/app/lib/brand";
import { Anchor, NeonHeart, ThinCross } from "./Motifs";

/** A button that leans toward the pointer. Desktop only; touch and reduced motion get a plain button. */
function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
  function leave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className="mk-magnetic">
      {children}
    </div>
  );
}

export default function HeroStage({ phone, phoneHref }: { phone: string; phoneHref: string }) {
  const stage = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  // Cycle Cars → Code → Content → Creative.
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % FOUR_CS.length), 2600);
    return () => window.clearInterval(id);
  }, [paused]);

  // A soft pink light follows the pointer. Written straight to CSS variables, so it never re-renders.
  function onMove(e: React.PointerEvent<HTMLElement>) {
    const el = stage.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  const lane = FOUR_CS[i];

  return (
    <section
      ref={stage}
      onPointerMove={onMove}
      className="mk-stage relative isolate overflow-hidden bg-void pb-20 pt-32 md:pb-28 md:pt-44"
    >
      <div className="mk-stage-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mk-stage-light pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mk-grain pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      {/* Floating neon motifs */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block" aria-hidden="true">
        <span className="mk-float absolute right-[10%] top-[40%]" style={{ "--mk-delay": "0s" } as React.CSSProperties}>
          <NeonHeart size={110} className="mk-flicker mk-motif-big" />
        </span>
        <span className="mk-float absolute right-[24%] top-[58%]" style={{ "--mk-delay": "1.2s" } as React.CSSProperties}>
          <ThinCross size={64} />
        </span>
        <span className="mk-float absolute right-[5%] top-[66%]" style={{ "--mk-delay": "2.1s" } as React.CSSProperties}>
          <Anchor size={70} />
        </span>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <p className="flex items-center gap-3 font-body text-[0.68rem] font-bold uppercase tracking-[0.34em] text-petal">
          <NeonHeart size={16} className="mk-flicker" />
          Luxury Concierge · {BRAND.location}
        </p>

        <h1 className="mt-6 font-display uppercase leading-[0.86] tracking-[0.01em] text-pearl">
          <span className="mk-neon-title relative block text-[clamp(4.2rem,15vw,12.5rem)]">
            MK Parrish
            <span className="mk-concierge">concierge</span>
          </span>
          <span
            className="mt-2 block min-h-[1em] text-[clamp(2.6rem,9vw,7.4rem)]"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            <span key={lane.id} className="mk-word mk-grad-text inline-block">
              {lane.word}.
            </span>
          </span>
        </h1>

        <p key={`line-${lane.id}`} className="mk-word mt-8 max-w-3xl font-serif text-xl italic leading-9 text-smoke md:text-2xl">
          {lane.tagline}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2" role="tablist" aria-label="The Four C's">
          {FOUR_CS.map((l, n) => (
            <button
              key={l.id}
              role="tab"
              aria-selected={n === i}
              onClick={() => {
                setI(n);
                setPaused(true);
              }}
              className={`border px-4 py-2 font-body text-[0.66rem] font-bold uppercase tracking-[0.2em] transition ${
                n === i
                  ? "border-petal bg-petal/10 text-petal shadow-[0_0_18px_rgba(255,181,208,0.35)]"
                  : "border-graphite text-ash hover:border-petal/60 hover:text-pearl"
              }`}
            >
              {l.word}
            </button>
          ))}
        </div>

        <p className="mt-8 max-w-2xl font-body text-base font-light leading-8 text-smoke">
          {BRAND.line} One concierge for all four, so nothing gets lost between a handoff and a launch. No agency, no account managers. You get MK.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Magnetic>
            <Link
              href="#concierge"
              className="btn-primary mk-glow-btn inline-flex w-full justify-center px-8 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void sm:w-auto"
            >
              {CTA.concierge} →
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/test-drive"
              className="inline-flex w-full justify-center border border-petal/60 px-8 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:border-petal hover:bg-petal/5 sm:w-auto"
            >
              {CTA.testDrive}
            </Link>
          </Magnetic>
          <Magnetic>
            <a
              href={phoneHref}
              className="inline-flex w-full justify-center border border-graphite px-8 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal sm:w-auto"
            >
              Call or text {phone}
            </a>
          </Magnetic>
        </div>

        <div className="mt-14 flex items-center gap-4 text-ash" aria-hidden="true">
          <span className="mk-scroll-line" />
          <span className="font-body text-[0.62rem] font-bold uppercase tracking-[0.3em]">Scroll</span>
        </div>
      </div>
    </section>
  );
}
