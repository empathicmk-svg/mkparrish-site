"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Clock3, ExternalLink, ShieldCheck, Video } from "lucide-react";
import { CONTACT } from "@/app/lib/config";

const GOOGLE_BOOKING_URL = process.env.NEXT_PUBLIC_GOOGLE_BOOKING_URL?.trim() ?? "";

const GOOGLE_BOOKING_NOTES = [
  {
    label: "Google Meet",
    detail: "The video link is created with the booking.",
    icon: Video,
  },
  {
    label: "Busy time blocked",
    detail: "Google Calendar only shows open appointment windows.",
    icon: ShieldCheck,
  },
  {
    label: "Instant invite",
    detail: "The confirmation lands on both calendars.",
    icon: CalendarCheck,
  },
];

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

function GoogleBookingEmbed({ url }: { url: string }) {
  return (
    <div className="relative overflow-hidden border border-petal/25 bg-obsidian shadow-[0_0_90px_rgba(255,181,208,0.08)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-petal opacity-70" />
      <div className="grid bg-graphite/70 lg:grid-cols-[0.78fr_1.35fr]">
        <aside className="relative overflow-hidden bg-obsidian p-6 md:p-8 lg:min-h-[760px] lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,181,208,0.18),transparent_42%),linear-gradient(135deg,rgba(255,181,208,0.06),transparent_46%)]" />
          <div className="relative flex h-full flex-col">
            <div>
              <div className="inline-flex items-center gap-2 border border-petal/30 bg-void/70 px-3 py-2 text-petal">
                <Video className="h-4 w-4" aria-hidden="true" />
                <span className="font-body text-[0.62rem] font-bold uppercase tracking-[0.22em]">
                  Google Meet
                </span>
              </div>
              <h3 className="mt-8 font-display text-5xl uppercase leading-[0.88] tracking-[0.02em] text-pearl md:text-6xl">
                Book the room.
              </h3>
              <p className="mt-5 font-serif text-xl italic leading-8 text-petal/85">
                Choose a time that is actually open. The Meet link follows automatically.
              </p>
            </div>

            <div className="mt-8 space-y-px border border-graphite bg-graphite">
              {GOOGLE_BOOKING_NOTES.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-4 bg-void/78 p-4">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-petal/30 bg-petal/10 text-petal">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-pearl">
                        {item.label}
                      </span>
                      <span className="mt-1 block font-body text-sm font-light leading-6 text-smoke">
                        {item.detail}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto pt-8">
              <div className="border-t border-graphite pt-5">
                <p className="flex items-center gap-2 font-body text-[0.66rem] font-bold uppercase tracking-[0.22em] text-iron">
                  <Clock3 className="h-4 w-4 text-petal" aria-hidden="true" />
                  30 minutes
                </p>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
                  If the embedded calendar feels cramped on your screen, open the full Google booking page.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="bg-void p-3 md:p-4 lg:p-5">
          <div className="border border-graphite bg-obsidian">
            <div className="flex flex-col gap-3 border-b border-graphite bg-carbon px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-5">
              <div>
                <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.24em] text-petal">
                  Live Availability
                </p>
                <p className="mt-1 font-body text-sm font-light text-smoke">
                  Powered by Google Calendar.
                </p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost inline-flex items-center justify-center gap-2 px-5 py-3 font-body text-[0.68rem] font-bold uppercase tracking-[0.18em]"
              >
                Full Page
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <iframe
              title="Book a Google Meet discovery call with MK Parrish"
              src={url}
              className="block min-h-[760px] w-full border-0 bg-white lg:min-h-[840px]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="fullscreen"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailBookingFallback() {
  const [days, setDays] = useState<Date[]>([]);
  const [tz, setTz] = useState("your local timezone");
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<(typeof SLOTS)[number] | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", format: "Video", details: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setDays(nextWeekdays(14));
      setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

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
          {days.length > 0 ? (
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
          ) : (
            <p className="mt-5 font-body text-sm font-light text-iron">Loading available days.</p>
          )}
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

export default function CustomBooking() {
  if (GOOGLE_BOOKING_URL) return <GoogleBookingEmbed url={GOOGLE_BOOKING_URL} />;

  return <EmailBookingFallback />;
}
