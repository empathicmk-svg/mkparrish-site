"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FOUR_CS, type LaneId } from "@/app/lib/brand";
import { NeonHeart } from "./Motifs";

function Visual({ id }: { id: LaneId }) {
  if (id === "cars") {
    return (
      <Image
        src="/home/g580-side.jpg"
        alt="A Mercedes-Benz G 580 on the showroom floor"
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="mk-panel-img -z-10 object-cover"
      />
    );
  }
  if (id === "code") {
    return (
      <div className="mk-code absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <pre>{`<section class="hero">
  <h1>Websites that sell.</h1>
  <a href="/book">Start your build</a>
</section>

const lead = await fetch("/api/inquiry", {
  method: "POST",
});

// fast. mobile-first. yours to keep.`}</pre>
      </div>
    );
  }
  if (id === "content") {
    return (
      <div className="mk-content-bg absolute inset-0 -z-10 flex items-start justify-center overflow-hidden pt-10" aria-hidden="true">
        <div className="mk-phone relative h-[17rem] w-[9.5rem] overflow-hidden">
          <Image src="/home/corvette-rear.jpg" alt="" fill sizes="160px" className="object-cover" />
          <span className="absolute left-2 top-2 bg-void/70 px-1.5 py-0.5 font-body text-[0.5rem] font-bold uppercase tracking-[0.2em] text-petal">
            Reel
          </span>
          <span className="absolute bottom-3 right-2 flex flex-col items-center gap-2 text-pearl">
            <NeonHeart size={16} className="mk-flicker" />
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="mk-neon absolute inset-0 -z-10 flex items-start justify-center overflow-hidden pt-10 md:pt-12" aria-hidden="true">
      <p className="text-center font-serif text-3xl italic leading-[1.15] md:text-4xl">
        <span className="block">positioning gets you</span>
        <span className="block">considered.</span>
        <span className="block">voice gets you</span>
        <span className="mk-neon-pink block">remembered.</span>
      </p>
    </div>
  );
}

/**
 * The Four C's as an accordion: on a desktop the panel you point at opens wide; on a phone they stack.
 */
export default function Showcase() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-px bg-graphite lg:h-[36rem] lg:flex-row">
      {FOUR_CS.map((p, i) => {
        const open = i === active;
        const tall = p.id !== "cars";
        return (
          <article
            key={p.id}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`mk-panel group relative isolate flex ${tall ? "min-h-[36rem]" : "min-h-[26rem]"} flex-col justify-end overflow-hidden bg-void p-7 md:p-9 lg:min-h-0 ${
              open ? "mk-panel-open lg:flex-[2.4]" : "lg:flex-[1]"
            }`}
          >
            <Visual id={p.id} />
            <div className={`${p.id === "creative" || p.id === "content" ? "mk-panel-shade-soft" : "mk-panel-shade"} absolute inset-0 -z-10`} aria-hidden="true" />
            <div className="gradient-rule absolute inset-x-0 top-0" />

            <p className="font-display text-4xl text-petal/70 md:text-5xl">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mk-neon-hover font-display text-5xl uppercase leading-none tracking-[0.02em] text-pearl md:text-6xl">{p.word}</h3>
            <p className={`mk-panel-line mt-3 font-serif text-lg italic leading-8 text-petal ${open ? "" : "mk-panel-line-off"}`}>{p.tagline}</p>
            <div className={`mk-panel-more ${open ? "mk-panel-more-open" : ""}`}>
              <div>
                <p className="mt-3 max-w-md font-body text-sm font-light leading-7 text-smoke">{p.text}</p>
                <Link
                  href={p.href}
                  className="btn-primary mk-glow-btn mt-6 inline-flex px-6 py-3 font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-void"
                >
                  {p.cta} →
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
