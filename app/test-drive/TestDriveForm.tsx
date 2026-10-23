'use client';

import { useMemo, useState } from "react";

// MK's Mercedes-Benz of Smithtown contact details: her work line takes the texts.
const WORK = "+16313666417";
const WORK_DISPLAY = "631.366.6417";
const CELL = "+13478534238";
const CELL_DISPLAY = "347.853.4238";
const EMAIL = "mparrish@mbofsmithtown.com";

const INTERESTS = [
  "SUV",
  "Sedan or coupé",
  "Convertible",
  "AMG",
  "Electric",
  "Sprinter / fleet van",
  "Custom 2027 order",
  "Not sure yet",
];
const TIMES = ["Morning", "Afternoon", "Evening"];

// Inline colour: the site's global text styles otherwise wash out dark text on pink.
const ON_PINK = { color: "#080808" };

const TRADE_LABEL = {
  display: "inline", fontSize: "0.875rem", fontWeight: 400, letterSpacing: 0,
  textTransform: "none", color: "#B0B0B0", marginBottom: 0,
} as const;

const field =
  "w-full border border-graphite bg-carbon px-4 py-3 font-body text-base text-pearl placeholder:text-iron focus:border-petal focus:outline-none";
const label = "mb-2 block font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ash";

function prettyDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function TestDriveForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [model, setModel] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tradeIn, setTradeIn] = useState(false);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const today = useMemo(() => new Date().toLocaleDateString("en-CA"), []);

  const toggle = (i: string) =>
    setInterests((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));

  const message = () =>
    [
      "Hi MK! I'd like to book a test drive at Mercedes-Benz of Smithtown.",
      `Name: ${name}`,
      phone && `Phone: ${phone}`,
      interests.length > 0 && `Interested in: ${interests.join(", ")}`,
      model && `Model: ${model}`,
      (date || time) && `Preferred: ${[prettyDate(date), time.toLowerCase()].filter(Boolean).join(", ")}`,
      tradeIn && "I have a trade-in.",
      notes && `Notes: ${notes}`,
    ]
      .filter(Boolean)
      .join("\n");

  const send = (via: "sms" | "email") => {
    if (!name.trim()) {
      setError("Add your name so I know who's coming in.");
      return;
    }
    setError("");
    const body = encodeURIComponent(message());
    window.location.href =
      via === "sms"
        ? `sms:${WORK}?&body=${body}`
        : `mailto:${EMAIL}?subject=${encodeURIComponent(`Test drive request: ${name}`)}&body=${body}`;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send("sms");
      }}
      className="flex flex-col gap-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="td-name" className={label}>Name</label>
          <input id="td-name" className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="td-phone" className={label}>Phone</label>
          <input id="td-phone" className={field} value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" autoComplete="tel" placeholder="(631) 555-0123" />
        </div>
      </div>

      <fieldset>
        <legend className={label}>What are you looking at?</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => {
            const on = interests.includes(i);
            return (
              <button
                key={i}
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={on}
                className={`border px-4 py-2 font-body text-sm transition-colors ${on ? "border-petal bg-petal font-semibold" : "border-graphite bg-carbon text-smoke hover:border-petal/60"}`}
                style={on ? ON_PINK : undefined}
              >
                {i}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="td-model" className={label}>Model, if you know it</label>
        <input id="td-model" className={field} value={model} onChange={(e) => setModel(e.target.value)} placeholder="GLE, G 63, CLE Cabriolet, Sprinter…" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="td-date" className={label}>Preferred day</label>
          <input id="td-date" className={`${field} [color-scheme:dark]`} type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <fieldset>
          <legend className={label}>Time of day</legend>
          <div className="grid grid-cols-3 gap-2">
            {TIMES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTime(time === t ? "" : t)}
                aria-pressed={time === t}
                className={`border py-3 font-body text-sm transition-colors ${time === t ? "border-petal bg-petal font-semibold" : "border-graphite bg-carbon text-smoke hover:border-petal/60"}`}
                style={time === t ? ON_PINK : undefined}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex items-center gap-3">
        <input id="td-trade" type="checkbox" checked={tradeIn} onChange={(e) => setTradeIn(e.target.checked)} className="shrink-0 accent-[#FFB5D0]" style={{ width: 20, height: 20, padding: 0 }} />
        {/* Inline styles: the global input and label rules aren't in a layer, so they beat utilities. */}
        <label htmlFor="td-trade" className="font-body" style={TRADE_LABEL}>
          I have a trade-in or a lease ending
        </label>
      </div>

      <div>
        <label htmlFor="td-notes" className={label}>Anything else?</label>
        <textarea id="td-notes" rows={3} className={field} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Colors, budget, questions…" />
      </div>

      {error && <p role="alert" className="font-body text-sm text-petal">{error}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="flex-1 bg-petal px-6 py-4 font-display text-2xl uppercase tracking-[0.06em] transition-opacity hover:opacity-90" style={ON_PINK}>
          Text MK to book
        </button>
        <button type="button" onClick={() => send("email")} className="flex-1 border border-petal px-6 py-4 font-display text-2xl uppercase tracking-[0.06em] text-petal transition-colors hover:bg-petal/10">
          Email instead
        </button>
      </div>
      <p className="font-body text-xs leading-6 text-ash">
        Both buttons open a message to me with your details filled in. Just hit send and I&apos;ll confirm your time. Rather
        call? My work line is{" "}
        <a href={`tel:${WORK}`} className="text-pearl underline underline-offset-4">{WORK_DISPLAY}</a> and my cell is{" "}
        <a href={`tel:${CELL}`} className="text-pearl underline underline-offset-4">{CELL_DISPLAY}</a>.
      </p>
    </form>
  );
}
