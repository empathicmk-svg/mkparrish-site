"use client";

import { useState } from "react";
import { BENZ } from "./data";

export type Intent = "test-drive" | "trade" | "lease-end" | "fit" | "guide" | "referral" | "general";

type Field = "name" | "phone" | "email" | "vehicle" | "timeframe" | "message";

const TIMEFRAMES = ["This week", "This month", "1–3 months", "3–6 months", "Just researching"];

/**
 * One form, every lane. Each page passes the fields that actually matter for
 * that conversation — asking a trade-in lead for a timeframe kills the
 * submission, asking a test-drive lead for a payoff amount does the same.
 */
export default function LeadForm({
  intent,
  source,
  fields = ["name", "phone", "email", "message"],
  vehicleLabel = "Vehicle you're interested in",
  vehiclePlaceholder = "GLE, C-Class, not sure yet…",
  messageLabel = "Anything I should know?",
  messagePlaceholder = "Optional — the more you tell me, the less I have to ask.",
  submitLabel = "Send it →",
  successTitle = "Got it.",
  successBody = "You will hear from me today. Want it faster? Text me — that is the fastest line to me during a shift.",
  compact = false,
}: {
  intent: Intent;
  source: string;
  fields?: Field[];
  vehicleLabel?: string;
  vehiclePlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
  compact?: boolean;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const has = (f: Field) => fields.includes(f);
  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/benz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website, intent, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "failed");
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "failed"
          ? err.message
          : `Something went wrong on my end. Text me instead — ${BENZ.phone}.`,
      );
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full border border-graphite bg-carbon px-5 py-4 font-body text-sm text-pearl placeholder:text-iron transition-colors duration-200 focus:border-petal focus:outline-none";

  if (done) {
    return (
      <div className="border border-petal/35 bg-carbon p-8 md:p-10" aria-live="polite">
        <p className="font-display text-4xl uppercase leading-none tracking-[0.02em] text-petal">{successTitle}</p>
        <p className="mt-5 font-body text-base font-light leading-7 text-smoke">{successBody}</p>
        <a
          href={BENZ.smsHref}
          className="btn-primary mt-6 inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
        >
          Text me: {BENZ.phone} →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      {/* Honeypot — off-screen, not display:none, so bots still fill it. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor={`bb-website-${intent}`}>Website</label>
        <input
          id={`bb-website-${intent}`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {has("name") && (
        <div>
          <label className="sr-only" htmlFor={`bb-name-${intent}`}>Your name</label>
          <input id={`bb-name-${intent}`} name="name" type="text" autoComplete="name" placeholder="Your name" value={values.name || ""} onChange={set("name")} className={inputCls} />
        </div>
      )}

      <div className={compact ? "space-y-3" : "grid gap-4 sm:grid-cols-2"}>
        {has("phone") && (
          <div>
            <label className="sr-only" htmlFor={`bb-phone-${intent}`}>Phone number</label>
            <input id={`bb-phone-${intent}`} name="phone" type="tel" autoComplete="tel" placeholder="Phone (fastest)" value={values.phone || ""} onChange={set("phone")} className={inputCls} />
          </div>
        )}
        {has("email") && (
          <div>
            <label className="sr-only" htmlFor={`bb-email-${intent}`}>Email address</label>
            <input id={`bb-email-${intent}`} name="email" type="email" autoComplete="email" placeholder="your@email.com" value={values.email || ""} onChange={set("email")} className={inputCls} />
          </div>
        )}
      </div>

      {has("vehicle") && (
        <div>
          <label className="sr-only" htmlFor={`bb-vehicle-${intent}`}>{vehicleLabel}</label>
          <input id={`bb-vehicle-${intent}`} name="vehicle" type="text" placeholder={vehiclePlaceholder} value={values.vehicle || ""} onChange={set("vehicle")} className={inputCls} />
        </div>
      )}

      {has("timeframe") && (
        <div>
          <label className="sr-only" htmlFor={`bb-timeframe-${intent}`}>When are you looking to move?</label>
          <select id={`bb-timeframe-${intent}`} name="timeframe" value={values.timeframe || ""} onChange={set("timeframe")} className={`${inputCls} appearance-none`}>
            <option value="">When are you looking to move?</option>
            {TIMEFRAMES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      )}

      {has("message") && (
        <div>
          <label className="sr-only" htmlFor={`bb-message-${intent}`}>{messageLabel}</label>
          <textarea id={`bb-message-${intent}`} name="message" rows={compact ? 3 : 4} placeholder={messagePlaceholder} value={values.message || ""} onChange={set("message")} className={`${inputCls} resize-y`} />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending…" : submitLabel}
      </button>

      {error && (
        <p className="font-body text-[0.75rem] leading-5 text-petal" aria-live="polite">{error}</p>
      )}

      <p className="font-body text-[0.65rem] leading-5 text-iron">
        No spam, no drip sequence, no handing your number to four other salespeople. It comes to me.
      </p>
    </form>
  );
}
