"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  RevealSection,
  QuoteDivider,
  Eyebrow,
  H1,
  H2,
  H3Script,
  BtnPrimary,
  BtnGhost,
  ArrowLink,
  Marquee,
  ServiceCard,
} from "@/app/components/ui";
import {
  STRIPE_EDIT,
  STRIPE_REWRITE,
  STRIPE_BYLINE,
  STRIPE_BUILD,
  STRIPE_SESSION,
  STRIPE_OUTBOUND,
  STRIPE_INBOUND_SYSTEM,
  STRIPE_REVENUE_SYSTEMS,
  STRIPE_HOSTING,
  STRIPE_SOCIAL,
  STRIPE_YOUTUBE,
  PATREON_URL,
} from "@/app/lib/config";

// ── Animated counter hook ─────────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, suffix = "") {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start: number | null = null;
          function step(ts: number) {
            if (!start) start = ts;
            const pct = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - pct, 3);
            setValue(Math.round(eased * target));
            if (pct < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, display: value + suffix };
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, display } = useCounter(value, 1600, suffix);
  return (
    <div className="flex flex-col gap-2">
      <span
        ref={ref}
        className="font-display text-petal"
        style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", lineHeight: 0.9, letterSpacing: "0.01em" }}
      >
        {display}
      </span>
      <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-ash">{label}</span>
    </div>
  );
}

// ── Word cycling words ────────────────────────────────────────────────────────
const CYCLE_WORDS = ["Pipeline"];

// ── Services data ────────────────────────────────────────────────────────────
const services = [
  {
    tag: "Quick Fix",
    title: "The Edit",
    price: "From $250",
    desc: "One piece of copy, rewritten. Headline, positioning statement, about page, or services copy. You know what is not working — I fix it in 48 hours.",
    perks: [
      "Homepage headline or tagline",
      "Positioning or mission statement",
      "About page or services copy",
      "Founder or exec bio",
    ],
    cta: "Buy The Edit",
    href: STRIPE_EDIT,
    highlight: false,
  },
  {
    tag: "Strategy Session",
    title: "The Session",
    price: "$300",
    desc: "One hour. Your messaging, your positioning, your strategy — live with me. Walk away with a written brief and a clear next move. Bring your team.",
    perks: [
      "60-minute strategy session",
      "Live copy audit or positioning work",
      "Written follow-up brief delivered same day",
      "Recording included",
    ],
    cta: "Book The Session",
    href: STRIPE_SESSION,
    highlight: false,
  },
  {
    tag: "Most Requested",
    title: "The Rewrite",
    price: "From $2,500",
    desc: "Core messaging overhauled. Homepage, positioning statement, and brand voice direction anchored in a strategy session. For companies whose results have outpaced their copy.",
    perks: [
      "Homepage and positioning copy",
      "Brand voice and messaging direction",
      "About page and services copy",
      "30-minute strategy session included",
    ],
    cta: "Start The Rewrite",
    href: STRIPE_REWRITE,
    highlight: true,
  },
  {
    tag: "Full Repositioning",
    title: "The New Chapter",
    price: "Custom",
    desc: "Full company repositioning, strategy to final copy. Brand voice guide, complete website, founder narrative, and messaging framework. For pivots, relaunches, and new-category plays.",
    perks: [
      "Brand voice and messaging guide",
      "Full website copy",
      "Founder story and pitch narrative",
      "On-brand copy bank for your team",
    ],
    cta: "Let's Talk",
    href: "/book",
    highlight: false,
  },
  {
    tag: "Ongoing",
    title: "The Byline",
    price: "From $2,500/mo",
    desc: "Monthly ghostwriting under your founders' and executives' names. LinkedIn, essays, newsletters — in their voice, consistent enough to build a reputation and sharp enough to open doors.",
    perks: [
      "Founder and executive LinkedIn ghostwriting",
      "Long-form essays and thought leadership",
      "Newsletter and email copy",
      "Strategic editorial calendar",
    ],
    cta: "Start The Byline",
    href: STRIPE_BYLINE,
    highlight: false,
  },
  {
    tag: "Full Site",
    title: "The Build",
    price: "From $6,000",
    desc: "Your company website, built from the ground up — strategy, copy, design, and production in one engagement. Launch-ready in 3–4 weeks, built to turn traffic into booked calls.",
    perks: [
      "Positioning, messaging, and page architecture",
      "Full website copy and custom design",
      "Mobile-first, fast, and SEO-ready build",
      "Launch and domain setup handled for you",
    ],
    cta: "Let's Build It",
    href: STRIPE_BUILD,
    highlight: false,
  },
];

const growthServices = [
  {
    tag: "Outbound",
    title: "The Outbound Engine",
    price: "From $2,500/mo",
    desc: "Qualified calls on your calendar. I build the lists, write the cold email and LinkedIn outreach, run the sends, and handle every reply — so your team talks to buyers, not tire-kickers. Recent campaigns: 32% reply rates.",
    perks: [
      "ICP research and clean, targeted lead lists",
      "Cold email and LinkedIn copy that earns replies",
      "Follow-up sequences and reply handling, end to end",
      "Qualified, briefed calls booked into your calendar",
      "Performance-based and rev-share structures available",
    ],
    cta: "Fill My Calendar",
    href: STRIPE_OUTBOUND,
    highlight: false,
  },
  {
    tag: "Most Popular",
    title: "Full-Funnel Growth",
    price: "From $6,500/mo",
    desc: "Demand through activation, run as one motion. Outbound, paid, organic, SEO, and lifecycle wired together — with the experimentation loop that tells you what is working and what to kill. The demand engine and the full funnel, under one operator.",
    perks: [
      "Demand gen across outbound, paid, organic, and SEO",
      "Landing pages, campaigns, and email sequences shipped weekly",
      "Hybrid motion fluency — PLG layered on SLG, self-serve + assisted",
      "Experiment velocity: test, read the numbers, double down",
      "Positioning and messaging that moves numbers, not slide decks",
    ],
    cta: "Run the Funnel",
    href: STRIPE_INBOUND_SYSTEM,
    highlight: true,
  },
  {
    tag: "Embedded",
    title: "Fractional Growth Lead",
    price: "Custom",
    desc: "I sit on your team and own the number. A senior growth operator who strategizes, ships, and owns the outcome — and partners cleanly with your product and PLG side. Not an agency. Not a strategist who needs a team to execute.",
    perks: [
      "Embedded ownership of the growth function",
      "Agent-orchestrated execution stack, built and run",
      "Full-funnel: demand gen, capture, activation, conversion",
      "Founder-facing — senior enough to own the room",
      "Clean, project-by-project collaboration with your team",
    ],
    cta: "Partner With Me",
    href: STRIPE_REVENUE_SYSTEMS,
    highlight: false,
  },
];

const productionServices = [
  {
    tag: "Always-On",
    title: "The Upkeep",
    price: "From $300/mo",
    desc: "Managed hosting, maintenance, and care so your site never goes stale. Updates, backups, monitoring, and small changes handled — you never touch a dashboard or worry about a thing breaking.",
    perks: [
      "Managed hosting and uptime monitoring",
      "Security, backups, and software updates",
      "Monthly content and copy edits included",
      "Priority turnaround on requests",
    ],
    cta: "Keep It Running",
    href: STRIPE_HOSTING,
    highlight: false,
  },
  {
    tag: "Most Requested",
    title: "The Social Suite",
    price: "From $2,000/mo",
    desc: "A complete social package, produced and managed. Content, graphics, captions, and scheduling across the platforms that fit your audience — a consistent, on-brand presence without you producing a single post.",
    perks: [
      "Full content calendar across chosen platforms",
      "Custom graphics, carousels, and short-form video",
      "Captions and copy written in your voice",
      "Scheduling, publishing, and performance reporting",
    ],
    cta: "Launch the Suite",
    href: STRIPE_SOCIAL,
    highlight: true,
  },
  {
    tag: "Video",
    title: "The Channel",
    price: "From $1,500/video",
    desc: "YouTube and long-form video, end to end. Scripting, editing, thumbnails, and publishing — built to grow a channel that compounds, not a pile of clips nobody finds.",
    perks: [
      "Scripting and story structure",
      "Editing, captions, and thumbnail design",
      "SEO-optimized titles and descriptions",
      "Repurposing into short-form clips",
    ],
    cta: "Start the Channel",
    href: STRIPE_YOUTUBE,
    highlight: false,
  },
];

const digitalProducts = [
  {
    label: "Best Seller",
    title: "Write Yourself Into the Room",
    price: "$28",
    href: "https://buy.stripe.com/00waEY9Qd1PygLa8OV8AE00",
    highlight: true,
  },
  {
    label: "Best Value",
    title: "The Vault — Full Bundle",
    price: "$97",
    href: "https://buy.stripe.com/9B69AUfax0Lu1Qgc178AE02",
    highlight: false,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLE_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentWord = CYCLE_WORDS[wordIndex];

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-svh flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[70vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.18),transparent_60%)]" />
          <div className="absolute bottom-0 right-0 h-[40vh] w-[50vw] bg-[radial-gradient(ellipse_at_bottom_right,rgba(242,175,198,0.04),transparent_60%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          {/* Service pills */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {["Growth Marketing", "Outbound & Appointment Setting", "Demand Gen", "Brand Messaging", "Web Production", "Lead Generation", "PLG / SLG"].map((s) => (
              <span key={s} className="border border-graphite px-3 py-1 font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-iron">
                {s}
              </span>
            ))}
          </div>

          <H1>
            Rewrite Your{" "}
            <br />
            <span
              key={currentWord}
              className="word-cycle-enter text-petal"
              style={{ textShadow: "0 0 60px rgba(242,175,198,0.4)", display: "inline-block" }}
            >
              {currentWord}
            </span>
          </H1>

          <p className="mt-5 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500, maxWidth: "none" }}>
            The website, outbound, and messaging that turn how you&apos;re seen into revenue you can prove.
          </p>

          <p className="mt-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
            Most companies leak revenue in the gap between what they&apos;ve become and how they read online. I close it — building conversion websites, running the outbound that books calls, and writing the messaging that lands. One senior operator for B2B SaaS, growth-stage teams, and agencies who want a partner, not another vendor.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BtnPrimary href="/book">Book a Strategy Call →</BtnPrimary>
            <BtnGhost href="#offerings">See What I Build</BtnGhost>
          </div>

          {/* Proof stat band */}
          <div className="mt-12 grid grid-cols-2 gap-px border-t border-graphite bg-graphite pt-px sm:grid-cols-4">
            {[
              { num: "$40M+", label: "Pipeline influenced" },
              { num: "2 Decades", label: "Growth + marketing" },
              { num: "32%", label: "Cold reply rates" },
              { num: "1", label: "Operator, no layers" },
            ].map((s) => (
              <div key={s.label} className="bg-void px-5 pt-8 pb-2">
                <p className="font-display text-3xl tracking-[0.02em] text-petal md:text-4xl">{s.num}</p>
                <p className="mt-2 font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ash">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      {/* ── OFFERINGS ─────────────────────────────────────────────────────────── */}
      <RevealSection id="offerings" bg="obsidian" num="01">
        <Eyebrow>Work With Me</Eyebrow>
        <H2>
          Everything I build,{" "}
          <span className="text-petal">in one place.</span>
        </H2>
        <p className="mt-4 mb-3 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
          Websites, outbound, growth, and messaging — one senior operator, clear pricing, no agency layers. Buy or book directly below. Pick one or stack them.
        </p>
        <p className="mb-12 font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal/70">
          All-in pricing. No retainer traps.
        </p>

        <div className="grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-3">
          {[...services, ...growthServices, ...productionServices].map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-graphite pt-8">
          <p className="font-body text-sm font-light text-smoke">Not sure where to start? One call and I&apos;ll tell you exactly where the revenue is leaking.</p>
          <BtnPrimary href="/book">Book a Discovery Call →</BtnPrimary>
        </div>
      </RevealSection>

      <Marquee />
      <QuoteDivider index={2} />

      {/* ── HOW I WORK (teaser) ──────────────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>How I Work</Eyebrow>
        <H2>
          From unclear to{" "}
          <span className="text-petal">undeniable.</span>
        </H2>
        <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
          The four-step process, the companies I do my best work with, and proof of what repositioning actually changes — all in one place, so the homepage stays about what you can buy.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <BtnPrimary href="/how-i-work">See How I Work →</BtnPrimary>
          <ArrowLink href="/book">Or just book a call</ArrowLink>
        </div>
      </RevealSection>

      <QuoteDivider index={6} />

      {/* ── THE SHOP ─────────────────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="07">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <Eyebrow>The Shop — Digital Products</Eyebrow>
            <H2>
              The work,{" "}
              <span className="text-petal">on demand.</span>
            </H2>
            <H3Script>Frameworks, guides, and downloads built from real client work.</H3Script>
            <p className="mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "48ch" }}>
              Frameworks and guides for rewriting how the world reads you — built from real client work, ready to use today.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/shelf">Browse The Shelf</BtnPrimary>
              <ArrowLink href="/shelf">See all downloads</ArrowLink>
            </div>
          </div>
          <div className="grid gap-px bg-graphite sm:grid-cols-2">
            {digitalProducts.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col justify-between bg-obsidian p-6 transition-all duration-300 hover:-translate-y-px hover:bg-carbon"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {item.highlight && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-50" />
                <div>
                  <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.25em] text-iron">{item.label}</p>
                  <span className="mt-2 block select-none font-serif text-[3rem] leading-none text-petal/[0.1]">&ldquo;</span>
                  <p className="mt-1 font-display text-lg uppercase tracking-[0.02em] text-pearl leading-tight">{item.title}</p>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <p className="font-display text-2xl text-petal">{item.price}</p>
                  <span className="flex h-7 w-7 items-center justify-center border border-petal/20 text-sm text-petal/50 transition-all duration-300 group-hover:border-petal group-hover:bg-petal group-hover:text-void">
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={14} />

      {/* ── THE MARGINS ──────────────────────────────────────────────────────── */}
      <RevealSection bg="void" num="08">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>The private side</Eyebrow>
            <H2>
              The{" "}
              <span className="text-petal">Margins.</span>
            </H2>
            <H3Script>Where the real thinking lives.</H3Script>
            <div className="mt-8 space-y-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
              <p>Long-form essays. Raw strategy notes. The frameworks that come out of actual client work, documented before they get cleaned up for public consumption.</p>
              <p>
                Not content. Not thought leadership theatre. The real thinking — before it gets positioned. If the public work is the final sentence, The Margins is the version with all the edits still showing.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href={PATREON_URL}>Enter The Margins</BtnPrimary>
              <ArrowLink href="/margins">Learn more</ArrowLink>
            </div>
          </div>

          <div className="flex flex-col gap-px">
            {[
              { tier: "Soft Cover", price: "$5/mo", desc: "Weekly essays and strategy notes that never go to the public feed. The thinking before it gets edited into something safe." },
              { tier: "Marked Up", price: "$12/mo", desc: "Everything in Soft Cover plus the raw frameworks pulled from client work, with the context that makes them actually useful." },
              { tier: "First Edition", price: "$28/mo", desc: "Full access plus a monthly live Q&A, direct message access, and priority feedback on your own copy. The closest thing to working with me directly." },
            ].map((t, i) => (
              <a
                key={t.tier}
                href={PATREON_URL}
                target="_blank"
                rel="noreferrer"
                className={`group relative block p-8 transition-all duration-200 hover:brightness-110 ${i === 1 ? "bg-carbon" : "bg-obsidian"}`}
              >
                {i === 1 && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl">{t.tier}</p>
                  <p className={`font-display text-2xl ${i === 1 ? "text-petal" : "text-white"}`}>{t.price}</p>
                </div>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{t.desc}</p>
                <p className="mt-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-petal opacity-0 transition-opacity group-hover:opacity-100">
                  Join on Substack →
                </p>
              </a>
            ))}
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={4} />

      {/* ── WRITING ──────────────────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="09">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>The personal work</Eyebrow>
            <H2>
              Writing that{" "}
              <span className="text-petal">started it all.</span>
            </H2>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/writing">Read the Work</BtnPrimary>
              <ArrowLink href={PATREON_URL}>More in The Margins</ArrowLink>
            </div>
          </div>
          <div className="relative border-l-2 border-petal/40 pl-8">
            <span className="absolute -left-4 -top-6 select-none font-serif text-[6rem] leading-none text-petal/[0.09]">&ldquo;</span>
            <p
              className="font-serif italic text-pearl"
              style={{ fontSize: "clamp(1.05rem,2.2vw,1.3rem)", lineHeight: 1.95, fontWeight: 500 }}
            >
              She did not wait to be described.<br />
              She picked up the pen<br />
              while they were still deciding<br />
              what kind of woman she was.<br />
              <br />
              This is not a revision. Not a rescue.<br />
              <br />
              The first draft,<br />
              finally in her own hand —<br />
              and it does not need their permission to be true.
            </p>
            <p className="mt-6 font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ash">
              — The Original
            </p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={5} />

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section className="relative bg-void pb-16 md:pb-0" style={{ padding: "clamp(5rem, 12vw, 11rem) 0" }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(242,175,198,0.1),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] text-center" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            The rewrite starts here
          </p>
          <div className="mt-6">
            <H1>
              Stop Being{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.3)" }}>
                Underestimated.
              </span>
            </H1>
          </div>
          <p className="mx-auto mt-8 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            The companies deciding whether to partner with you are judging an earlier version of your business — because that is the version your copy still describes. Let&apos;s fix that.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href="/book">Book a Discovery Call →</BtnPrimary>
            <BtnGhost href="/contact">Get in Touch</BtnGhost>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <ArrowLink href="/brand">Brand Messaging</ArrowLink>
            <ArrowLink href="/growth">Growth Marketing</ArrowLink>
            <ArrowLink href="/studio">The Studio</ArrowLink>
            <ArrowLink href="/shop">The Shop</ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
