"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { INDUSTRIES } from "../content/site";
import { TextLink } from "./ui";

export default function AudienceTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = INDUSTRIES[active];

  function onKeyDown(e: React.KeyboardEvent) {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    const next = (active + delta + INDUSTRIES.length) % INDUSTRIES.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="mt-10">
      <div role="tablist" aria-label="Who we serve" onKeyDown={onKeyDown} className="flex flex-wrap gap-2">
        {INDUSTRIES.map((ind, i) => (
          <button
            key={ind.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`tab-${ind.slug}`}
            aria-selected={i === active}
            aria-controls="audience-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white/80 transition-all hover:border-lime hover:text-white aria-selected:border-lime aria-selected:bg-lime aria-selected:text-forest"
          >
            {ind.title}
          </button>
        ))}
      </div>
      <div
        key={item.slug}
        id="audience-panel"
        role="tabpanel"
        aria-labelledby={`tab-${item.slug}`}
        className="toast mt-8 grid gap-8 rounded-3xl bg-white p-8 text-ink sm:p-10 lg:grid-cols-2"
      >
        <div>
          <h3 className="font-display text-2xl font-semibold text-forest">{item.short}</h3>
          <p className="mt-3 leading-relaxed text-stone">{item.body}</p>
          <div className="mt-6">
            <TextLink href={`/industries/${item.slug}`}>More for {item.title.toLowerCase()}</TextLink>
          </div>
        </div>
        <ul className="grid content-start gap-3 sm:grid-cols-2">
          {item.points.map((p) => (
            <li key={p} className="flex items-start gap-2 rounded-xl bg-sage px-4 py-3 text-sm font-medium text-forest">
              <Check size={16} className="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
