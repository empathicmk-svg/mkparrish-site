"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Eye } from "lucide-react";
import Modal from "./Modal";
import { useSite } from "./SiteProvider";
import { DOSAGE_FORMS, type Item } from "../content/site";
import { btn } from "./styles";
import { FormIcon } from "./FormIcon";

// Dosage-form cards with a "Quick look" popup for each.
export default function DosageGrid() {
  const { openQuote } = useSite();
  const [active, setActive] = useState<Item | null>(null);

  return (
    <>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {DOSAGE_FORMS.map((f, i) => (
          <article
            key={f.slug}
            data-reveal
            style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white p-6 transition-all hover:-translate-y-1.5 hover:border-leaf hover:shadow-2xl hover:shadow-leaf/15"
          >
            <div className="flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-sage to-cream transition-colors group-hover:from-lime/40">
              <FormIcon slug={f.slug} />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-forest">{f.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-stone">{f.short}</p>
            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActive(f)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-leaf"
              >
                <Eye size={16} aria-hidden="true" /> Quick look
              </button>
              <Link href={`/capabilities/${f.slug}`} className="text-sm font-semibold text-forest hover:underline">
                Details
              </Link>
            </div>
          </article>
        ))}
      </div>

      <Modal open={active !== null} onClose={() => setActive(null)} labelledBy="quicklook-title">
        {active && (
          <div className="grid sm:grid-cols-[12rem_1fr]">
            <div className="flex items-center justify-center bg-gradient-to-br from-lime/50 to-sage p-8">
              <FormIcon slug={active.slug} large />
            </div>
            <div className="p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">Dosage form</p>
              <h2 id="quicklook-title" className="mt-2 font-display text-3xl font-semibold text-forest">
                {active.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone">{active.body}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {active.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const form = active.title;
                    setActive(null);
                    openQuote({ dosageForm: form });
                  }}
                  className={btn("primary")}
                >
                  Quote {active.title.toLowerCase()}
                </button>
                <Link href={`/capabilities/${active.slug}`} onClick={() => setActive(null)} className={btn("ghost")}>
                  Full details
                </Link>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
