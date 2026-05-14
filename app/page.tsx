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
  STRIPE_CONTENT_ENGINE,
  STRIPE_INBOUND_SYSTEM,
  STRIPE_REVENUE_SYSTEMS,
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
const CYCLE_WORDS = ["Career", "Brand", "Story", "Future", "Narrative"];

// ── Client type cards ────────────────────────────────────────────────────────
const clientTypes = [
  {
    num: "01",
    title: "Executive",
    desc: "Your LinkedIn and bio are still describing who you were three roles ago.",
    href: "/career",
  },
  {
    num: "02",
    title: "Founder",
    desc: "Your site undersells a business that has genuinely outgrown its own copy.",
    href: "/brand",
  },
  {
    num: "03",
    title: "Creator",
    desc: "You have the audience but the brand voice doesn't match the depth of the work.",
    href: "/presence",
  },
  {
    num: "04",
    title: "In Transition",
    desc: "Your old story no longer fits and the new one isn't finished yet.",
    href: "/next-chapter",
  },
];

// ── Before/After data ────────────────────────────────────────────────────────
const baPanels = [
  {
    label: "LinkedIn Headline",
    before:
      "Marketing Manager at TechCorp | Results-driven professional with 10+ years of experience helping companies achieve growth",
    after:
      "I turn technical products into market leaders. Led $0→$42M ARR at Series B SaaS. Now: VP Marketing @ [Company] | Building in public.",
  },
  {
    label: "Homepage Headline",
    before:
      '"We provide comprehensive digital marketing solutions for businesses of all sizes."',
    after:
      '"Your competitors are getting the calls you should be getting. Here\'s exactly why — and how to fix it in 30 days."',
  },
];

// ── Process steps ────────────────────────────────────────────────────────────
const processSteps = [
  {
    num: "01",
    title: "Intake Call",
    desc: "We diagnose exactly where the language is breaking down and what it needs to do instead.",
  },
  {
    num: "02",
    title: "Strategy Brief",
    desc: "A written positioning document: your audience, your argument, your differentiators — in writing.",
  },
  {
    num: "03",
    title: "The Rewrite",
    desc: "Copy delivered in rounds with tracked changes. You see every decision and why I made it.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Final files, formatted for every platform. Plus a 30-day check-in to see it landing.",
  },
];

// ── Services data ────────────────────────────────────────────────────────────
const services = [
  {
    tag: "Quick Fix",
    title: "The Edit",
    price: "From $100",
    desc: "One piece of copy rewritten. LinkedIn bio, tagline, homepage heading, or positioning statement. You know exactly what is broken. I fix it in 48 hours.",
    perks: [
      "LinkedIn headline and about section",
      "Executive bio or speaker profile",
      "Website tagline or about copy",
      "Short-form positioning statement",
    ],
    cta: "Buy The Edit",
    href: STRIPE_EDIT,
    highlight: false,
  },
  {
    tag: "Power Hour",
    title: "The Session",
    price: "$250",
    desc: "One hour. Your copy, your positioning, your strategy — with me, live. You walk away with a written brief and a clear next move. No prep required. Just show up.",
    perks: [
      "60-minute 1:1 strategy session",
      "Live copy audit or positioning work",
      "Written follow-up brief",
      "Record to review afterward",
    ],
    cta: "Book The Session",
    href: STRIPE_SESSION,
    highlight: false,
  },
  {
    tag: "Most Requested",
    title: "The Rewrite",
    price: "From $1,500",
    desc: "A full story overhaul anchored in a strategy session. For people whose work has outpaced the language they are still using to describe it. This is where the gap closes.",
    perks: [
      "Full LinkedIn overhaul",
      "Career or brand narrative",
      "Bio, about page, and pitch copy",
      "30-minute strategy session included",
    ],
    cta: "Start The Rewrite",
    href: STRIPE_REWRITE,
    highlight: true,
  },
  {
    tag: "Full Reset",
    title: "The New Chapter",
    price: "Custom",
    desc: "Brand, website, founder story, and positioning built together from strategy to final draft. For pivots, relaunches, and reinventions where patching one section is not going to cut it.",
    perks: [
      "Brand voice and messaging guide",
      "Full website copy",
      "Founder or executive origin story",
      "Press and pitch deck narrative",
    ],
    cta: "Let's Talk",
    href: "/book",
    highlight: false,
  },
  {
    tag: "Ongoing",
    title: "The Byline",
    price: "From $1,500/mo",
    desc: "Monthly ghostwriting under your name. LinkedIn posts, essays, newsletters. Written in your voice, consistent enough to build a reputation, sharp enough that people notice.",
    perks: [
      "Monthly LinkedIn ghostwriting",
      "Long-form essays and articles",
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
    price: "From $3,500",
    desc: "Your website, built from the ground up. Strategy, copy, and design — together. For founders and personal brands who need a site that converts, not just looks good.",
    perks: [
      "Brand strategy + positioning",
      "Full website copy and design",
      "Mobile-optimized and fast",
      "Launch-ready in 3–4 weeks",
    ],
    cta: "Let's Build It",
    href: STRIPE_BUILD,
    highlight: false,
  },
];

const growthServices = [
  {
    tag: "Growth Tier",
    title: "LinkedIn Content Engine",
    price: "From $2,500/mo",
    desc: "A fully managed LinkedIn presence engineered to function as the top of your conversion funnel. Authority and pipeline, built together.",
    perks: [
      "Complete LinkedIn profile optimization",
      "3–5 high-value posts written and scheduled weekly",
      "1x inbound lead magnet per quarter",
      "Custom ghostwriting, editing, and visual assets",
    ],
    cta: "Launch Your Engine",
    href: STRIPE_CONTENT_ENGINE,
    highlight: false,
  },
  {
    tag: "Most Popular",
    title: "The Inbound System",
    price: "From $5,000/mo",
    desc: "Content plus the infrastructure that converts it. Lead capture, automated nurture, and pipeline reporting — the full loop from audience to qualified conversation.",
    perks: [
      "Everything in LinkedIn Content Engine",
      "Lead magnet strategy and design (quizzes, whitepapers, toolkits)",
      "Custom landing page or Framer lead capture flow",
      "Automated 3–5 email nurture sequence",
      "Weekly lead tracking and pipeline reporting",
    ],
    cta: "Build My Pipeline",
    href: STRIPE_INBOUND_SYSTEM,
    highlight: true,
  },
  {
    tag: "Enterprise",
    title: "E2E Revenue Systems",
    price: "Custom",
    desc: "Full-funnel Revenue Operations and deep CRM integration. Not a service. An operating system for your entire revenue motion, built to scale.",
    perks: [
      "Everything in The Inbound System",
      "Complete CRM architecture (HubSpot, Salesforce, or Pipedrive)",
      "End-to-end automation: Marketing → Sales Hub → Onboarding",
      "Revenue analytics, attribution modeling, and forecast dashboards",
      "Custom API development and third-party stack orchestration",
    ],
    cta: "Scale Globally",
    href: STRIPE_REVENUE_SYSTEMS,
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
            {["Copywriting", "Ghostwriting", "Brand Strategy", "Web Design", "LinkedIn", "RevOps"].map((s) => (
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
            Words, strategy, and reinvention for people ready to stop being misread.
          </p>

          <p className="mt-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
            You&apos;ve outgrown the version of yourself the world is still reading. I work with founders, executives, and people mid-transition to build the language that finally catches up.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BtnPrimary href="/book">Book a Strategy Call →</BtnPrimary>
            <BtnGhost href="#who">See the Work</BtnGhost>
          </div>

          {/* Social proof strip */}
          <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-graphite pt-8">
            {["Copy", "Brand Strategy", "Web Design", "Ghostwriting", "Digital Products"].map((item) => (
              <span key={item} className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ash">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      {/* ── WHO IS THIS FOR ───────────────────────────────────────────────────── */}
      <RevealSection id="who" bg="obsidian" num="01">
        <Eyebrow>Find Your Track</Eyebrow>
        <H2>
          Which rewrite do{" "}
          <span className="text-petal">you need?</span>
        </H2>
        <p className="mt-4 mb-12 font-body text-sm font-light text-smoke" style={{ maxWidth: "56ch" }}>
          Every engagement starts with the same question: what do you need the words to do? Pick the one that matches the gap you&apos;re in right now.
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
          <p className="font-body text-sm text-ash mb-4">Not sure which one fits? Start here.</p>
          <BtnPrimary href="/book">Book a Free 15-Minute Call →</BtnPrimary>
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
          This is what repositioning actually looks like. Same person. Completely different signal.
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
            This is what The Rewrite does. This is what The Edit does. This is what working with me looks like.
          </p>
          <BtnPrimary href="/book">Start Your Rewrite →</BtnPrimary>
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="03">
        <Eyebrow>Every way to work with me</Eyebrow>
        <H2>
          Six services.{" "}
          <span className="text-petal">One standard.</span>
        </H2>
        <p className="mt-4 mb-3 font-body text-sm font-light text-smoke" style={{ maxWidth: "58ch" }}>
          From a single-piece edit to a full site build — every service is anchored in the same thing: copy that actually sounds like you, says something true, and earns the response.
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
          <p className="font-body text-sm font-light text-smoke">Every project starts with a strategy call. No obligation. Just clarity.</p>
          <BtnPrimary href="/book">Book Your Call →</BtnPrimary>
        </div>
      </RevealSection>

      {/* ── REVENUE SYSTEMS ──────────────────────────────────────────────────── */}
      <RevealSection bg="void" num="04">
        <Eyebrow>Revenue &amp; Growth Systems</Eyebrow>
        <H2>
          Build the machine,{" "}
          <span className="text-petal">not just the content.</span>
        </H2>
        <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke">
          LinkedIn content engines, high-converting lead magnets, and end-to-end RevOps. For founders and revenue teams who need inbound infrastructure, not just another ghostwriter.
        </p>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {growthServices.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <ArrowLink href="/growth">See full system details</ArrowLink>
          <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-iron">
            Pipeline is the product.
          </span>
        </div>
      </RevealSection>

      <Marquee />
      <QuoteDivider index={3} />

      {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="05">
        <Eyebrow>How It Works</Eyebrow>
        <H2>
          From unclear to{" "}
          <span className="text-petal">undeniable.</span>
        </H2>
        <p className="mt-4 mb-14 font-body text-sm font-light text-smoke" style={{ maxWidth: "56ch" }}>
          Four steps. No ambiguity. You know what happens, when it happens, and exactly why every word made the cut.
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
      <RevealSection bg="void" num="06">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <Eyebrow>The Shop — Digital Products</Eyebrow>
            <H2>
              The work,{" "}
              <span className="text-petal">on demand.</span>
            </H2>
            <H3Script>Frameworks, guides, and downloads built from real client work.</H3Script>
            <p className="mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "48ch" }}>
              From decoding what the universe is sending you to rewriting how the world reads you — six guides that do actual work.
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
      <RevealSection bg="obsidian" num="07">
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
      <RevealSection bg="void" num="08">
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
                Misread.
              </span>
            </H1>
          </div>
          <p className="mx-auto mt-8 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            The people deciding whether to work with you are making that decision based on words you wrote years ago. Let&apos;s fix that.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href="/book">Book a Strategy Call →</BtnPrimary>
            <BtnGhost href="/contact">Get in Touch</BtnGhost>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <ArrowLink href="/career">Career Rewrite</ArrowLink>
            <ArrowLink href="/brand">Brand Rewrite</ArrowLink>
            <ArrowLink href="/presence">Presence Rewrite</ArrowLink>
            <ArrowLink href="/shop">The Shop</ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
