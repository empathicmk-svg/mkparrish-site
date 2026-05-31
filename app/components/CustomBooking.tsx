"use client";

import { useMemo, useState } from "react";
import { CONTACT } from "@/app/lib/config";

// Offered slots (MK's local availability). 30-minute calls.
const SLOTS: { label: string; h: number; m: number }[] = [
  { label: "9:00 AM", h: 9, m: 0 },
  { label: "9:30 AM", h: 9, m: 30 },
  { label: "10:00 AM", h: 10, m: 0 },
  { label: "10:30 AM", h: 10, m: 30 },
  { label: "11:00 AM", h: 11, m: 0 },
  { label: "11:30 AM", h: 11, m: 30 },
  { label: "1:00 PM", h: 13, m: 0 },
  { label: "1:30 PM", h: 13, m: 30 },
  { label: "2:00 PM", h: 14, m: 0 },
  { label: "2:30 PM", h: 14, m: 30 },
  { label: "3:00 PM", h: 15, m: 0 },
  { label: "3:30 PM", h: 15, m: 30 },
  { label: "4:00 PM", h: 16, m: 0 },
];

// Next N weekdays, starting tomorrow, skipping Sat/Sun.
function nextWeekdays(count: number): Date[] {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (out.length < count) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

function fmtDay(d: Date) {
  return {
    weekday: d.toLocaleDateString(undefined, { weekday: "short" }),
    month: d.toLocaleDateString(undefined, { month: "short" }),
    day: d.getDate(),
    full: d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// Build a Google Calendar template link for the chosen slot.
function gcalLink(date: Date, slot: { h: number; m: number; label: string }) {
  const start = new Date(date);
  start.setHours(slot.h, slot.m, 0, 0);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 30);
  const f = (dt: Date) =>
    `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Discovery Call — MK Parrish",
    dates: `${f(start)}/${f(end)}`,
    ctz: tz,
    details: "30-minute discovery call with MK Parrish.",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function CustomBooking() {
  const days = useMemo(() => nextWeekdays(14), []);
  const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<(typeof SLOTS)[number] | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", format: "Video", details: "" });
  const [submitted, setSubmitted] = useState(false);

  const ready = date && slot && form.name.trim() && form.email.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || !date || !slot) return;
    const when = `${fmtDay(date).full} at ${slot.label} (${tz})`;
    const subject = `Discovery call request — ${fmtDay(date).month} ${fmtDay(date).day}, ${slot.label}`;
    const body = [
      `New discovery call request:`,
      ``,
      `When:    ${when}`,
      `Name:    ${form.name}`,
      `Email:   ${form.email}`,
      `Company: ${form.company || "—"}`,
      `Format:  ${form.format}`,
      ``,
      `What's not working:`,
      form.details || "—",
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  if (submitted && date && slot) {
    return (
      <div className="relative border border-graphite bg-obsidian p-8 md:p-12">
        <div className="absolute inset-x-0 top-0 h-px bg-petal opacity-40" />
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-petal">Request sent</p>
        <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-white md:text-4xl">
          You&apos;re on my radar.
        </h3>
        <p className="mt-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "54ch" }}>
          Your email app should have opened with the request to{" "}
          <span className="text-pearl">{CONTACT.email}</span> — hit send and I&apos;ll confirm{" "}
          <span className="text-pearl">{fmtDay(date).full} at {slot.label}</span> (or suggest the closest open time) within one business day.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={gcalLink(date, slot)}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em]"
          >
            Add to Google Calendar →
          </a>
          <button
            onClick={() => { setSubmitted(false); setDate(null); setSlot(null); }}
            className="inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-ash transition-colors hover:text-pearl"
          >
            Pick a different time
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative border border-graphite bg-obsidian">
      <div className="absolute inset-x-0 top-0 h-px bg-petal opacity-30" />

      <div className="grid gap-px bg-graphite lg:grid-cols-2">
        {/* Date picker */}
        <div className="bg-obsidian p-6 md:p-8">
          <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-iron">Step 1 — Pick a day</p>
          <div className="mt-5 grid grid-cols-3 gap-px bg-graphite sm:grid-cols-4">
            {days.map((d) => {
              const info = fmtDay(d);
              const active = date && d.toDateString() === date.toDateString();
              return (
                <button
                  type="button"
                  key={d.toISOString()}
                  onClick={() => { setDate(d); setSlot(null); }}
                  className={`flex flex-col items-center gap-1 bg-void px-2 py-4 transition-colors ${
                    active ? "bg-petal text-void" : "text-pearl hover:bg-carbon"
                  }`}
                >
                  <span className={`font-body text-[0.6rem] font-semibold uppercase tracking-[0.15em] ${active ? "text-void/70" : "text-ash"}`}>
                    {info.weekday}
                  </span>
                  <span className="font-display text-2xl leading-none">{info.day}</span>
                  <span className={`font-body text-[0.6rem] uppercase tracking-[0.15em] ${active ? "text-void/70" : "text-iron"}`}>
                    {info.month}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time picker */}
        <div className="bg-obsidian p-6 md:p-8">
          <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-iron">
            Step 2 — Pick a time <span className="text-iron/60">({tz})</span>
          </p>
          {date ? (
            <div className="mt-5 grid grid-cols-3 gap-px bg-graphite sm:grid-cols-4">
              {SLOTS.map((s) => {
                const active = slot?.label === s.label;
                return (
                  <button
                    type="button"
                    key={s.label}
                    onClick={() => setSlot(s)}
                    className={`bg-void px-2 py-3 font-body text-sm transition-colors ${
                      active ? "bg-petal text-void" : "text-pearl hover:bg-carbon"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mt-5 font-body text-sm font-light text-iron">Select a day first.</p>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="border-t border-graphite bg-obsidian p-6 md:p-8">
        <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-iron">Step 3 — Your details</p>
        <div className="mt-5 grid gap-px bg-graphite sm:grid-cols-2">
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-void px-5 py-4 font-body text-sm text-pearl placeholder:text-iron focus:outline-none focus:ring-1 focus:ring-petal/40"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-void px-5 py-4 font-body text-sm text-pearl placeholder:text-iron focus:outline-none focus:ring-1 focus:ring-petal/40"
          />
          <input
            placeholder="Company (optional)"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="bg-void px-5 py-4 font-body text-sm text-pearl placeholder:text-iron focus:outline-none focus:ring-1 focus:ring-petal/40"
          />
          <select
            value={form.format}
            onChange={(e) => setForm({ ...form, format: e.target.value })}
            className="bg-void px-5 py-4 font-body text-sm text-pearl focus:outline-none focus:ring-1 focus:ring-petal/40"
          >
            <option value="Video">Video call</option>
            <option value="Phone">Phone call</option>
          </select>
        </div>
        <textarea
          placeholder="What's not working? (optional)"
          rows={3}
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
          className="mt-px w-full bg-void px-5 py-4 font-body text-sm text-pearl placeholder:text-iron focus:outline-none focus:ring-1 focus:ring-petal/40"
        />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm font-light text-smoke">
            {date && slot ? (
              <>Requesting <span className="text-pearl">{fmtDay(date).full}</span> at <span className="text-pearl">{slot.label}</span>.</>
            ) : (
              <span className="text-iron">Pick a day and time to continue.</span>
            )}
          </p>
          <button
            type="submit"
            disabled={!ready}
            className={`inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] transition-colors ${
              ready ? "btn-primary text-void" : "cursor-not-allowed bg-graphite text-iron"
            }`}
          >
            Request This Time →
          </button>
        </div>
      </div>
    </form>
  );
}
