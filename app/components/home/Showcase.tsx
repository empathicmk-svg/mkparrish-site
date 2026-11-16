"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PANELS = [
  {
    n: "01",
    title: "Cars",
    line: "Mercedes-Benz, brokered with a straight answer.",
    text: "New, lease or trade-in at Mercedes-Benz of Smithtown. Test drive any day, with numbers explained before you sign anything.",
    href: "/test-drive",
    cta: "Book a test drive",
    image: "/home/g580-side.jpg",
    alt: "A Mercedes-Benz G 580 on the showroom floor",
  },
  {
    n: "02",
    title: "Content",
    line: "Reels, books and words people actually finish.",
    text: "Showroom reels, quote cards, poems and books. The content that builds trust before anyone walks in or books a call.",
    href: "/posts",
    cta: "See the content",
    image: null,
    alt: "",
    quote: ["i will never", "dim another soul", "to make my own", "look brighter."],
  },
  {
    n: "03",
    title: "Consulting",
    line: "Sites and marketing that turn attention into revenue.",
    text: "Positioning, conversion websites, outbound and full-funnel growth, designed and run by the same person who writes the content.",
    href: "/services",
    cta: "Work with me",
    image: null,
    alt: "",
    code: true,
  },
] as const;

/**
 * Three lanes as an accordion: on a desktop the panel you point at opens wide; on a phone they stack.
 */
export default function Showcase() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-px bg-graphite lg:h-[34rem] lg:flex-row" onPointerLeave={() => undefined}>
      {PANELS.map((p, i) => {
        const open = i === active;
        return (
          <article
            key={p.title}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`mk-panel group relative isolate flex ${p.image ? "min-h-[26rem]" : "min-h-[36rem]"} flex-col justify-end overflow-hidden bg-void p-7 md:p-9 lg:min-h-0 ${
              open ? "mk-panel-open lg:flex-[2.2]" : "lg:flex-[1]"
            }`}
          >
            {p.image ? (
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="mk-panel-img -z-10 object-cover"
              />
            ) : "quote" in p ? (
              <div className="mk-neon -z-10 absolute inset-0 flex items-start justify-center overflow-hidden pt-10 md:pt-12" aria-hidden="true">
                <p className="text-center font-serif text-3xl italic leading-[1.15] md:text-4xl">
                  {p.quote.map((l, n) => (
                    <span key={l} className={`block ${n === p.quote.length - 1 ? "mk-neon-pink" : ""}`}>
                      {l}
                    </span>
                  ))}
                </p>
              </div>
            ) : (
              <div className="mk-code -z-10 absolute inset-0 overflow-hidden" aria-hidden="true">
                <pre>{`<section class="hero">
  <h1>Websites that sell.</h1>
  <a href="/book">Book a call</a>
</section>

const leads = await fetch("/api/inquiry")
  .then((r) => r.json());

// fast. mobile-first. yours to keep.`}</pre>
              </div>
            )}
            <div className={`${"quote" in p ? "mk-panel-shade-soft" : "mk-panel-shade"} absolute inset-0 -z-10`} aria-hidden="true" />
            <div className="gradient-rule absolute inset-x-0 top-0" />

            <p className="font-display text-5xl text-petal/70">{p.n}</p>
            <h3 className="font-display text-5xl uppercase leading-none tracking-[0.02em] text-pearl md:text-6xl">{p.title}</h3>
            <p className={`mk-panel-line mt-3 font-serif text-lg italic leading-8 text-petal ${open ? "" : "mk-panel-line-off"}`}>{p.line}</p>
            <div className={`mk-panel-more ${open ? "mk-panel-more-open" : ""}`}>
              <p className="mt-3 max-w-md font-body text-sm font-light leading-7 text-smoke">{p.text}</p>
              <Link
                href={p.href}
                className="btn-primary mt-6 inline-flex px-6 py-3 font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-void"
              >
                {p.cta} →
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
