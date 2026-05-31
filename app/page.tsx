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
  STRIPE_INBOUND_SYSTEM,
  STRIPE_REVENUE_SYSTEMS,
  STRIPE_HOSTING,
  STRIPE_SOCIAL,
  STRIPE_YOUTUBE,
  PATREON_URL,
  SHOP_URL,
  GR_ANGEL_NUMBERS,
  GR_WRITE_YOURSELF,
  GR_THE_VAULT,
  GR_INVISIBLE_BRUISE,
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

// ── Client type cards ────────────────────────────────────────────────────────
const clientTypes = [
  {
    num: "01",
    title: "B2B SaaS",
    desc: "You have product-market fit, but your homepage still reads like a seed-stage pitch. Your pipeline tells a sharper story than your copy does.",
    href: "/brand",
  },
  {
    num: "02",
    title: "Agencies & Consultants",
    desc: "You need a senior partner who owns the brief, runs the function, and ships without hand-holding. Not a vendor — someone who thinks like a principal.",
    href: "/brand",
  },
  {
    num: "03",
    title: "Growth-Stage Teams",
    desc: "Past early traction and ready for the full stack: positioning, demand gen, web presence, and the execution to back it up.",
    href: "/growth",
  },
  {
    num: "04",
    title: "Companies in Transition",
    desc: "Pivot, relaunch, new market, new category. The old story no longer fits the business you run today. That gap is exactly the work.",
    href: "/next-chapter",
  },
];

// ── Before/After data ────────────────────────────────────────────────────────
const baPanels = [
  {
    label: "Website Homepage Headline",
    before:
      '"We provide comprehensive digital marketing solutions for businesses of all sizes."',
    after:
      '"Your competitors are getting the calls you should be getting. Here\'s exactly why — and how to fix it in 30 days."',
  },
  {
    label: "Company Positioning Statement",
    before:
      '"A B2B SaaS platform that helps teams manage their workflows more efficiently."',
    after:
      '"The revenue intelligence layer your sales team didn\'t know they were missing — until the number stopped moving."',
  },
];

// ── Process steps ────────────────────────────────────────────────────────────
const processSteps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We diagnose where the language is breaking down, what it needs to do, and how we measure success together.",
  },
  {
    num: "02",
    title: "Strategy Brief",
    desc: "A written positioning document: your audience, your argument, your differentiators, your competitive angle — in writing before a word gets drafted.",
  },
  {
    num: "03",
    title: "The Rewrite",
    desc: "Copy delivered in rounds with tracked changes. Your team sees every decision and the reasoning behind it.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Final deliverables, formatted for every platform. Plus a 30-day check-in to confirm it is landing.",
  },
];

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
    href: "/book",
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
    label: "New",
    title: "Decoding Angel Numbers",
    price: "$15",
    href: GR_ANGEL_NUMBERS,
    highlight: false,
  },
  {
    label: "Best Seller",
    title: "Write Yourself Into the Room",
    price: "$28",
    href: GR_WRITE_YOURSELF,
    highlight: true,
  },
  {
    label: "New Release",
    title: "The Invisible Bruise",
    price: "$22",
    href: GR_INVISIBLE_BRUISE,
    highlight: false,
  },
  {
    label: "Best Value",
    title: "The Vault — Full Bundle",
    price: "$97",
    href: GR_THE_VAULT,
    highlight: false,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [baState, setBaState] = useState<Record<number, "before" | "after">>({ 0: "before", 1: "before" });
  const [activeCard, setActiveCard] = useState<number | null>(null);

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
            <BtnGhost href="#who">See What I Build</BtnGhost>
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

      {/* ── WHO IS THIS FOR ───────────────────────────────────────────────────── */}
      <RevealSection id="who" bg="obsidian" num="01">
        <Eyebrow>Where We Work Best</Eyebrow>
        <H2>
          Which partner do{" "}
          <span className="text-petal">you need?</span>
        </H2>
        <p className="mt-4 mb-12 font-body text-sm font-light text-smoke" style={{ maxWidth: "56ch" }}>
          Every engagement starts with one question: where is revenue actually leaking? Pick the track that matches your gap right now.
        </p>

        <div className="grid gap-px bg-graphite sm:grid-cols-2">
          {clientTypes.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
              className="group relative flex flex-col justify-between bg-obsidian p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-carbon"
              style={{
                border: activeCard === i ? "1px solid rgba(242,175,198,0.35)" : "1px solid transparent",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
              <div>
                <p className="font-mono text-[2.5rem] leading-none tracking-[0.02em] text-petal/[0.18] font-bold">
                  {card.num}
                </p>
                <h3 className="mt-4 font-display text-4xl uppercase tracking-[0.02em] text-pearl md:text-5xl">
                  {card.title}
                </h3>
                <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{card.desc}</p>
              </div>
              <div className="mt-8 flex items-center gap-2">
                <span className="font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-petal opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="font-body text-sm text-ash mb-4">Not sure which track fits? Start here.</p>
          <BtnPrimary href="/book">Book a Free Discovery Call →</BtnPrimary>
        </div>
      </RevealSection>

      <QuoteDivider index={1} />

      {/* ── BEFORE / AFTER SHOWCASE ──────────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>The Transformation</Eyebrow>
        <H2>
          See the difference{" "}
          <span className="text-petal">words make.</span>
        </H2>
        <p className="mt-4 mb-12 font-body text-sm font-light text-smoke" style={{ maxWidth: "58ch" }}>
          This is what repositioning looks like. Same company, completely different signal.
        </p>

        <div className="grid gap-px bg-graphite md:grid-cols-2">
          {baPanels.map((panel, idx) => (
            <div key={idx} className="ba-panel">
              <p className="mb-4 font-body text-[0.62rem] font-bold uppercase tracking-[0.25em] text-iron">
                {panel.label}
              </p>
              <div className="ba-tab-bar">
                <button
                  className={`ba-tab${baState[idx] === "before" ? " active" : ""}`}
                  onClick={() => setBaState((s) => ({ ...s, [idx]: "before" }))}
                >
                  Before
                </button>
                <button
                  className={`ba-tab${baState[idx] === "after" ? " active" : ""}`}
                  onClick={() => setBaState((s) => ({ ...s, [idx]: "after" }))}
                >
                  After
                </button>
              </div>
              {baState[idx] === "before" ? (
                <p className="before-text">{panel.before}</p>
              ) : (
                <p className="after-text">
                  {panel.after}
                  <span className="mt-3 block font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-petal">
                    — Rewritten by MK
                  </span>
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-graphite pt-8">
          <p className="font-body text-sm font-light text-smoke">
            That shift is what The Rewrite delivers — for any company, in any market.
          </p>
          <BtnPrimary href="/book">Start Your Rewrite →</BtnPrimary>
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="03">
        <Eyebrow>Every way to work together</Eyebrow>
        <H2>
          Six services.{" "}
          <span className="text-petal">One standard.</span>
        </H2>
        <p className="mt-4 mb-3 font-body text-sm font-light text-smoke" style={{ maxWidth: "58ch" }}>
          From a single-piece fix to a full repositioning, every engagement holds the same standard: copy that reflects what your business actually does, says something true, and earns the response.
        </p>
        <p className="mb-12 font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal/70">
          All-in pricing. No retainer traps.
        </p>

        <div className="grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-graphite pt-8">
          <p className="font-body text-sm font-light text-smoke">Every engagement starts with a discovery call. No pitch, no obligation — just a clear diagnosis.</p>
          <BtnPrimary href="/book">Book a Discovery Call →</BtnPrimary>
        </div>
      </RevealSection>

      {/* ── REVENUE SYSTEMS ──────────────────────────────────────────────────── */}
      <RevealSection bg="void" num="04">
        <Eyebrow>Growth Marketing &amp; Demand Gen</Eyebrow>
        <H2>
          A growth operator,{" "}
          <span className="text-petal">not just a writer.</span>
        </H2>
        <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke">
          Full-funnel demand — outbound, paid, organic, SEO, content, lifecycle — built and run by one AI-native operator. For SLG teams layering on PLG, growth-stage companies building their first real demand engine, and B2B teams that need someone to strategize, ship, and own the number.
        </p>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {growthServices.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <ArrowLink href="/growth">See the full growth offering</ArrowLink>
          <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-iron">
            I pick the channels. I ship. I own the outcome.
          </span>
        </div>
      </RevealSection>

      {/* ── PRODUCTION & MEDIA ───────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="05">
        <Eyebrow>The Studio — Production &amp; Media</Eyebrow>
        <H2>
          Built, produced,{" "}
          <span className="text-petal">and kept running.</span>
        </H2>
        <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke">
          Strategy is only worth what ships. Hosting, social, and video — produced and managed end to end, on-brand, so your company's presence keeps pace with the business once the site is live.
        </p>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {productionServices.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-graphite pt-8">
          <p className="font-body text-sm font-light text-smoke">
            Bundle production with copy and strategy, or bring me in for the build alone. Either way, it ships finished.
          </p>
          <BtnPrimary href="/book">Scope a Project →</BtnPrimary>
        </div>
      </RevealSection>

      <Marquee />
      <QuoteDivider index={3} />

      {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
      <RevealSection bg="void" num="06">
        <Eyebrow>How It Works</Eyebrow>
        <H2>
          From unclear to{" "}
          <span className="text-petal">undeniable.</span>
        </H2>
        <p className="mt-4 mb-14 font-body text-sm font-light text-smoke" style={{ maxWidth: "56ch" }}>
          Four steps, no ambiguity. Your team knows what happens, when, and why every word made the cut.
        </p>

        <div className="grid gap-px bg-graphite md:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.num} className="bg-obsidian p-8">
              <p
                className="font-display leading-none text-petal/[0.15]"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)", letterSpacing: "0.02em" }}
              >
                {step.num}
              </p>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">
                {step.title}
              </h3>
              <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <BtnPrimary href="/book">Start With a Call →</BtnPrimary>
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
              From decoding what the universe is sending you to rewriting how the world reads you — guides that do real work.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/shop">Browse the Full Shop</BtnPrimary>
              <ArrowLink href={SHOP_URL}>Ko-fi Store</ArrowLink>
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
                  Join on Patreon →
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
