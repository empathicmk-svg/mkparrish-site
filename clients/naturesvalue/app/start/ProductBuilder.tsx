"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { useSite } from "../components/SiteProvider";
import { DOSAGE_FORMS } from "../content/site";
import { btn } from "../components/styles";

type Option = { value: string; label: string; hint?: string };

const STEPS: { key: string; question: string; options: Option[] }[] = [
  {
    key: "form",
    question: "What would you like to make?",
    options: [
      ...DOSAGE_FORMS.map((d) => ({ value: d.title, label: d.title, hint: d.short })),
      { value: "Not sure", label: "Not sure yet", hint: "We'll recommend a format for your ingredients." },
    ],
  },
  {
    key: "stage",
    question: "Where are you starting from?",
    options: [
      { value: "Private label", label: "I want a proven formula", hint: "Private label: your brand on an established formula." },
      { value: "Custom formulation", label: "I have an idea", hint: "We'll develop a formula around it." },
      { value: "Own formula", label: "I have a finished formula", hint: "We'll review it and get it into production." },
    ],
  },
  {
    key: "quantity",
    question: "How big is your first order likely to be?",
    options: [
      { value: "Under 5,000 units", label: "Under 5,000 units", hint: "Testing the market" },
      { value: "5,000 to 25,000 units", label: "5,000 to 25,000 units", hint: "Launching properly" },
      { value: "25,000 to 100,000 units", label: "25,000 to 100,000 units", hint: "Growing brand" },
      { value: "Over 100,000 units", label: "Over 100,000 units", hint: "High volume" },
    ],
  },
  {
    key: "packaging",
    question: "How should it be packed?",
    options: [
      { value: "Bottles", label: "Bottles", hint: "Filled, sealed and labeled" },
      { value: "Pouches or stick packs", label: "Pouches or stick packs" },
      { value: "Bulk", label: "Bulk", hint: "For your own packaging" },
      { value: "Not sure", label: "Not sure yet" },
    ],
  },
];

const STAGE_LINKS: Record<string, { href: string; label: string }> = {
  "Private label": { href: "/services/private-label", label: "How private label works" },
  "Custom formulation": { href: "/services/custom-formulation", label: "How custom formulation works" },
  "Own formula": { href: "/services/manufacturing", label: "How contract manufacturing works" },
};

export default function ProductBuilder() {
  const { openQuote } = useSite();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = step >= STEPS.length;
  const current = STEPS[step];

  function choose(value: string) {
    setAnswers((a) => ({ ...a, [current.key]: value }));
    setStep((s) => s + 1);
  }

  const summary = STEPS.map((s) => `${s.question} ${answers[s.key] ?? "-"}`).join("\n");
  const stageLink = STAGE_LINKS[answers.stage];

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-xl shadow-forest/5 sm:p-10">
      <div className="flex items-center gap-2" aria-hidden="true">
        {STEPS.map((s, i) => (
          <div key={s.key} className="h-2 flex-1 overflow-hidden rounded-full bg-sage">
            <div className={`h-full bg-leaf transition-all duration-500 ${i < step ? "w-full" : "w-0"}`} />
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-stone" aria-live="polite">
        {done ? "Your summary" : `Step ${step + 1} of ${STEPS.length}`}
      </p>

      {!done ? (
        <fieldset key={current.key} className="toast mt-6">
          <legend className="font-display text-2xl font-semibold text-forest sm:text-3xl">{current.question}</legend>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {current.options.map((o) => {
              const selected = answers[current.key] === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => choose(o.value)}
                  className="group flex items-start justify-between gap-3 rounded-2xl border-2 border-line p-5 text-left transition-all hover:-translate-y-0.5 hover:border-leaf hover:bg-sage/50 aria-pressed:border-leaf aria-pressed:bg-sage"
                >
                  <span>
                    <span className="block font-semibold text-forest">{o.label}</span>
                    {o.hint && <span className="mt-1 block text-sm text-stone">{o.hint}</span>}
                  </span>
                  <ArrowRight size={18} className="mt-1 shrink-0 text-leaf transition-transform group-hover:translate-x-1" />
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <div className="toast mt-6">
          <h2 className="font-display text-2xl font-semibold text-forest sm:text-3xl">Here&apos;s your project</h2>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <div key={s.key} className="rounded-2xl bg-sage p-4">
                <dt className="text-xs text-stone">{s.question}</dt>
                <dd className="mt-1 flex items-center justify-between font-semibold text-forest">
                  {answers[s.key]}
                  <button type="button" onClick={() => setStep(i)} className="text-xs font-medium text-leaf underline">
                    Change
                  </button>
                </dd>
              </div>
            ))}
          </dl>
          {stageLink && (
            <p className="mt-6 text-sm text-stone">
              Next, read{" "}
              <Link href={stageLink.href} className="font-semibold text-leaf underline">
                {stageLink.label.toLowerCase()}
              </Link>
              , or send this to our team now for a quote.
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                openQuote({
                  dosageForm: DOSAGE_FORMS.some((d) => d.title === answers.form) ? answers.form : "",
                  quantity: answers.quantity,
                  details: `${summary}\n\nAnything else: `,
                })
              }
              className={btn("primary")}
            >
              Send to our team <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setStep(0);
              }}
              className={btn("ghost")}
            >
              <RotateCcw size={16} /> Start over
            </button>
          </div>
        </div>
      )}

      {step > 0 && !done && (
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-stone hover:text-forest"
        >
          <ArrowLeft size={16} /> Back
        </button>
      )}
      {done && (
        <p className="mt-6 flex items-center gap-2 text-xs text-stone">
          <Check size={14} className="text-leaf" aria-hidden="true" /> No commitment. We&apos;ll reply within one business day.
        </p>
      )}
    </div>
  );
}
