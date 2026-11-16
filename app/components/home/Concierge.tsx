"use client";

import Link from "next/link";
import { useState } from "react";

type Topic = "cars" | "website" | "marketing" | "content";

const TOPICS: {
  id: Topic;
  label: string;
  kicker: string;
  title: string;
  text: string;
  points: string[];
  href: string;
  cta: string;
  placeholder: string;
}[] = [
  {
    id: "cars",
    label: "A Mercedes-Benz",
    kicker: "Cars",
    title: "Let's find your car.",
    text: "New, a lease, or a trade-in. I'll walk you through the numbers and hand you the key.",
    points: ["Test drives, any day", "Trade-in values explained", "Straight answers on payments"],
    href: "/test-drive",
    cta: "Book a test drive",
    placeholder: "Which model, or what are you driving now?",
  },
  {
    id: "website",
    label: "A website",
    kicker: "Consulting · Web",
    title: "A site built to convert.",
    text: "Strategy, copy, design and code in one engagement. Fast, mobile-first, and yours to keep.",
    points: ["Custom builds from $6,000", "Launch in 3–4 weeks", "Hosting and upkeep from $300/mo"],
    href: "/studio",
    cta: "See web services",
    placeholder: "What does the site need to do for you?",
  },
  {
    id: "marketing",
    label: "Marketing & growth",
    kicker: "Consulting · Growth",
    title: "Qualified calls, not just traffic.",
    text: "Outbound, full-funnel growth and social, run as one motion by the person who built the pages.",
    points: ["Outbound from $2,500/mo", "Full-funnel from $6,500/mo", "Social from $2,000/mo"],
    href: "/growth",
    cta: "See growth services",
    placeholder: "Who do you want to reach, and where are leads stalling?",
  },
  {
    id: "content",
    label: "Content",
    kicker: "Content",
    title: "Words and video that get finished.",
    text: "Reels, posts, books and brand voice. Content that builds trust before anyone calls.",
    points: ["Short-form video and carousels", "Brand voice and copy", "Books and long-form writing"],
    href: "/posts",
    cta: "See the content",
    placeholder: "What do you want your content to do?",
  },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function Concierge({ email, phoneHref }: { email: string; phoneHref: string }) {
  const [topic, setTopic] = useState<Topic>("cars");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const t = TOPICS.find((x) => x.id === topic) ?? TOPICS[0];

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = new FormData(e.currentTarget);
    const payload = {
      topic,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
      website: String(form.get("website") || ""),
      source: "home-concierge",
    };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 400 || res.status === 429) {
        setError(data.error || "That did not go through. Please check the form.");
        setStatus("error");
        return;
      }
      if (data.ok) {
        setStatus("sent");
        return;
      }
      // Sending isn't set up here, or it failed: open a ready-made email instead.
      const body = `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\n\n${payload.message}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`${t.kicker} inquiry from ${payload.name}`)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
    } catch {
      setError("That did not go through. Try again, or call or text me.");
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-px bg-graphite lg:grid-cols-[0.95fr_1.05fr]">
      <div className="bg-void p-7 md:p-10">
        <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">I need…</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2" role="tablist" aria-label="What do you need?">
          {TOPICS.map((x) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={x.id === topic}
              onClick={() => {
                setTopic(x.id);
                setStatus("idle");
              }}
              className={`mk-chip border px-4 py-4 text-left font-display text-2xl uppercase tracking-[0.02em] transition ${
                x.id === topic ? "border-petal bg-petal/10 text-petal" : "border-graphite text-pearl hover:border-petal/60"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>

        <div key={topic} className="mk-word mt-8">
          <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-ash">{t.kicker}</p>
          <h3 className="mt-2 font-display text-4xl uppercase leading-[0.95] text-pearl md:text-5xl">{t.title}</h3>
          <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{t.text}</p>
          <ul className="mt-5 space-y-2">
            {t.points.map((p) => (
              <li key={p} className="flex items-center gap-3 font-body text-sm font-light text-pearl">
                <span className="h-1 w-1 bg-petal" />
                {p}
              </li>
            ))}
          </ul>
          <Link href={t.href} className="mt-7 inline-block font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:text-blush">
            {t.cta} →
          </Link>
        </div>
      </div>

      <div className="bg-obsidian p-7 md:p-10">
        {status === "sent" ? (
          <div aria-live="polite" className="flex h-full flex-col justify-center">
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Got it</p>
            <h3 className="mt-3 font-display text-4xl uppercase text-pearl md:text-5xl">I&apos;ll be in touch.</h3>
            <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">
              I reply personally, usually within one business day. In a hurry?{" "}
              <a href={phoneHref} className="text-petal underline underline-offset-4">
                Call or text me
              </a>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4" noValidate>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Tell me a little</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mk-label">Name</span>
                <input name="name" required autoComplete="name" className="mk-input" />
              </label>
              <label className="block">
                <span className="mk-label">Phone (optional)</span>
                <input name="phone" type="tel" autoComplete="tel" className="mk-input" />
              </label>
            </div>
            <label className="block">
              <span className="mk-label">Email</span>
              <input name="email" type="email" autoComplete="email" className="mk-input" />
            </label>
            <label className="block">
              <span className="mk-label">{t.placeholder}</span>
              <textarea name="message" rows={4} className="mk-input resize-none" />
            </label>
            {/* Honeypot: hidden from people, tempting to bots. */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            {error && (
              <p className="font-body text-xs leading-5 text-petal" aria-live="polite">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full px-6 py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.18em] text-void disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send to MK →"}
            </button>
            <p className="font-body text-[0.65rem] leading-5 text-iron">
              Your details go only to MK, to answer this inquiry. No list, no spam.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
