"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Standard amortized payment. A 0% rate is just the balance split evenly. */
export function monthlyPayment(balance: number, aprPercent: number, months: number) {
  if (balance <= 0 || months <= 0) return 0;
  const r = aprPercent / 1200;
  if (r === 0) return balance / months;
  return (balance * r) / (1 - Math.pow(1 + r, -months));
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  format: (n: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="mk-label">{label}</span>
        <span className="font-display text-2xl text-pearl">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mk-range mt-2 w-full"
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
    </label>
  );
}

function CarEstimator() {
  const [price, setPrice] = useState(70000);
  const [down, setDown] = useState(5000);
  const [trade, setTrade] = useState(0);
  const [apr, setApr] = useState(6);
  const [term, setTerm] = useState(60);

  const out = useMemo(() => {
    const balance = Math.max(0, price - down - trade);
    const m = monthlyPayment(balance, apr, term);
    return { balance, m, total: m * term, interest: m * term - balance };
  }, [price, down, trade, apr, term]);

  return (
    <div className="grid gap-px bg-graphite lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6 bg-void p-7 md:p-10">
        <Slider label="Vehicle price" value={price} min={30000} max={250000} step={1000} onChange={setPrice} format={(n) => usd.format(n)} />
        <Slider label="Down payment" value={down} min={0} max={Math.min(price, 100000)} step={500} onChange={setDown} format={(n) => usd.format(n)} />
        <Slider label="Trade-in value" value={trade} min={0} max={Math.min(price, 100000)} step={500} onChange={setTrade} format={(n) => usd.format(n)} />
        <Slider label="Interest rate (APR)" value={apr} min={0} max={14} step={0.1} onChange={setApr} format={(n) => `${n.toFixed(1)}%`} />
        <div>
          <span className="mk-label">Term</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {[36, 48, 60, 72, 84].map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                aria-pressed={t === term}
                className={`border px-4 py-2 font-body text-[0.7rem] font-bold uppercase tracking-[0.16em] transition ${
                  t === term ? "border-petal bg-petal/10 text-petal" : "border-graphite text-ash hover:border-petal/60"
                }`}
              >
                {t} mo
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between bg-obsidian p-7 md:p-10">
        <div aria-live="polite">
          <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Estimated payment</p>
          <p className="mt-3 font-display text-7xl leading-none text-pearl md:text-8xl">
            <span className="mk-grad-text">{usd.format(Math.round(out.m))}</span>
            <span className="text-3xl text-ash">/mo</span>
          </p>
          <dl className="mt-8 divide-y divide-graphite border-y border-graphite font-body text-sm">
            <div className="flex justify-between py-3">
              <dt className="font-light text-smoke">Amount financed</dt>
              <dd className="text-pearl">{usd.format(out.balance)}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="font-light text-smoke">Total interest</dt>
              <dd className="text-pearl">{usd.format(Math.max(0, Math.round(out.interest)))}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="font-light text-smoke">Total of payments</dt>
              <dd className="text-pearl">{usd.format(Math.round(out.total))}</dd>
            </div>
          </dl>
        </div>
        <div className="mt-8">
          <Link href="/test-drive" className="btn-primary inline-flex w-full justify-center px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
            Get exact numbers from MK →
          </Link>
          <p className="mt-4 font-body text-[0.65rem] leading-5 text-iron">
            An estimate from the figures you enter, not an offer. It leaves out tax, title and fees, and your real rate and any lease or finance program depend on credit approval and what is current.
          </p>
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  { id: "audit", name: "48-Hour Positioning Audit", once: 97, monthly: 0, note: "Async teardown and your top three fixes" },
  { id: "build", name: "The Build", once: 6000, monthly: 0, note: "Full custom site, launch-ready in 3–4 weeks" },
  { id: "upkeep", name: "The Upkeep", once: 0, monthly: 300, note: "Hosting, maintenance, updates and small changes" },
  { id: "outbound", name: "The Outbound Engine", once: 0, monthly: 2500, note: "Cold email and LinkedIn built to book calls" },
  { id: "funnel", name: "Full-Funnel Growth", once: 0, monthly: 6500, note: "Acquisition through activation, weekly experiments" },
  { id: "social", name: "The Social Suite", once: 0, monthly: 2000, note: "Content, graphics and scheduling, managed" },
] as const;

function ProjectBuilder() {
  const [picked, setPicked] = useState<Set<string>>(new Set(["build"]));

  const totals = useMemo(() => {
    let once = 0;
    let monthly = 0;
    for (const s of SERVICES) {
      if (picked.has(s.id)) {
        once += s.once;
        monthly += s.monthly;
      }
    }
    return { once, monthly };
  }, [picked]);

  function toggle(id: string) {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="grid gap-px bg-graphite lg:grid-cols-[1.1fr_0.9fr]">
      <ul className="bg-void">
        {SERVICES.map((s) => {
          const on = picked.has(s.id);
          return (
            <li key={s.id} className="border-b border-graphite last:border-b-0">
              <button
                onClick={() => toggle(s.id)}
                aria-pressed={on}
                className={`flex w-full items-center gap-4 p-5 text-left transition md:p-6 ${on ? "bg-petal/[0.06]" : "hover:bg-carbon"}`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center border text-xs ${
                    on ? "border-petal bg-petal text-void" : "border-iron text-transparent"
                  }`}
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="flex-1">
                  <span className="block font-display text-2xl uppercase tracking-[0.02em] text-pearl">{s.name}</span>
                  <span className="block font-body text-xs font-light leading-6 text-smoke">{s.note}</span>
                </span>
                <span className="font-display text-xl text-petal">
                  {s.once ? `${usd.format(s.once)}` : `${usd.format(s.monthly)}/mo`}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col justify-between bg-obsidian p-7 md:p-10">
        <div aria-live="polite">
          <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Your starting point</p>
          <dl className="mt-5 space-y-5">
            <div>
              <dt className="font-body text-xs font-light uppercase tracking-[0.2em] text-smoke">One-time, from</dt>
              <dd className="font-display text-6xl leading-none text-pearl">
                <span className="mk-grad-text">{usd.format(totals.once)}</span>
              </dd>
            </div>
            <div>
              <dt className="font-body text-xs font-light uppercase tracking-[0.2em] text-smoke">Monthly, from</dt>
              <dd className="font-display text-6xl leading-none text-pearl">
                <span className="mk-grad-text">{usd.format(totals.monthly)}</span>
                <span className="text-2xl text-ash">/mo</span>
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-8">
          <Link href="#concierge" className="btn-primary inline-flex w-full justify-center px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
            Talk this through with MK →
          </Link>
          <p className="mt-4 font-body text-[0.65rem] leading-5 text-iron">
            Starting prices from this site. Final scope and price are set on a call.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Estimators() {
  const [tab, setTab] = useState<"car" | "project">("car");
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Choose a tool">
        {(
          [
            ["car", "Mercedes payment estimator"],
            ["project", "Project builder"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`border px-5 py-3 font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] transition ${
              tab === id ? "border-petal bg-petal/10 text-petal" : "border-graphite text-ash hover:border-petal/60"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "car" ? <CarEstimator /> : <ProjectBuilder />}
    </div>
  );
}
