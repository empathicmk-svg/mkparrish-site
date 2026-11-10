"use client";

import { useEffect, useState } from "react";
import { SITE_QUOTES } from "@/app/lib/quote-bank";

export default function SiteQuoteRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % SITE_QUOTES.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, []);

  const quote = SITE_QUOTES[active];
  const nextQuotes = [quote, SITE_QUOTES[(active + 5) % SITE_QUOTES.length], SITE_QUOTES[(active + 11) % SITE_QUOTES.length]];

  return (
    <section className="site-quote-rail border-y border-petal/25 bg-void" aria-label="Rotating inspiration quotes">
      <div className="mx-auto grid max-w-[1400px] gap-px bg-petal/25 md:grid-cols-[1.1fr_0.9fr_0.9fr]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
        {nextQuotes.map((item, index) => (
          <figure key={`${item.slug}-${index}`} className="bg-void/95 px-5 py-5 md:px-7">
            <p className="font-body text-[0.56rem] font-bold uppercase tracking-[0.28em] text-petal">
              {item.category === "mk" ? "Rewrite Your Story" : item.category}
            </p>
            <blockquote className="mt-3 font-serif text-base italic leading-7 text-pearl md:text-lg">
              &ldquo;{item.text}&rdquo;
            </blockquote>
            <figcaption className="mt-3 font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ash">
              {item.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
