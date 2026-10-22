"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { FAQ } from "../content/site";

export default function FaqList() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const items = FAQ.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q));

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Search questions</span>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-leaf" size={18} aria-hidden="true" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions, e.g. minimums"
          className="w-full rounded-full border border-line bg-white py-3.5 pl-11 pr-4 focus:border-leaf focus:outline-none focus:ring-4 focus:ring-leaf/15"
        />
      </label>
      <p className="sr-only" aria-live="polite">
        {items.length} questions shown
      </p>
      <div className="mt-8 space-y-3">
        {items.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-line bg-white open:border-leaf open:shadow-lg open:shadow-leaf/10">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-forest">
              {f.q}
              <Plus size={20} className="shrink-0 text-leaf transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-stone">{f.a}</p>
          </details>
        ))}
        {items.length === 0 && <p className="py-8 text-center text-stone">No questions match. Ask us directly instead.</p>}
      </div>
    </div>
  );
}
