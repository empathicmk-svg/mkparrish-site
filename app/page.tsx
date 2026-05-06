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

// ── Data ──────────────────────────────────────────────────────────────────────

const rewrites = [
  {
    label: "01",
    title: "Rewrite Your Career",
    desc: "Your LinkedIn, bio, and professional narrative rebuilt for the career you actually have now. Not a polish. A full repositioning. The people deciding whether to hire you are reading copy you wrote three years ago.",
    cue: "For executives, professionals, and industry switchers",
    href: "/career",
    icon: "↗",
  },
  {
    label: "02",
    title: "Rewrite Your Brand",
    desc: "Positioning, voice, and homepage copy for a business that delivers more than it sounds like. That gap is not aesthetic. It is a revenue leak — and it shows up every time someone lands on your site and leaves without reaching out.",
    cue: "For founders and company builders",
    href: "/brand",
    icon: "↗",
  },
  {
    label: "03",
    title: "Rewrite Your Presence",
    desc: "Website copy, public bios, and ongoing thought leadership written in your actual voice. Every surface that forms an opinion about you before you get to speak. Most of them are underperforming right now.",
    cue: "For public-facing professionals and ghostwriting clients",
    href: "/presence",
    icon: "↗",
  },
  {
    label: "04",
    title: "Rewrite Your Next Chapter",
    desc: "Full repositioning for pivots, reinventions, and the messy middle where your old story no longer fits and the new one is not finished yet. I have been here. I know how to write through it.",
    cue: "For people in genuine transition",
    href: "/next-chapter",
    icon: "↗",
  },
];

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
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-svh flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[70vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.18),transparent_60%)]" />
          <div className="absolute bottom-0 right-0 h-[40vh] w-[50vw] bg-[radial-gradient(ellipse_at_bottom_right,rgba(242,175,198,0.04),transparent_60%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          {/* Eyebrow services strip */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {["Copywriting", "Ghostwriting", "Brand Strategy", "Web Design", "Reinvention"].map((s) => (
              <span key={s} className="border border-graphite px-3 py-1 font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-iron">
                {s}
              </span>
            ))}
          </div>

          <H1>
            Rewrite{" "}
            <span className="text-petal" style={{ textShadow: "0 0 60px rgba(242,175,198,0.4)" }}>
              Your
            </span>
            <br />
            Story
          </H1>

          <p className="mt-5 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500, maxWidth: "none" }}>
            Words, strategy, and reinvention for people ready to stop being misread.
          </p>

          <p className="mt-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
            You have outgrown the version of yourself the world is still reading. I work with founders, executives, and people mid-transition to build language that finally catches up.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BtnPrimary href="/book">Book a Strategy Call →</BtnPrimary>
            <BtnGhost href="#rewrites">See the Work</BtnGhost>
          </div>

          {/* Social proof strip */}
          <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-graphite pt-8">
            <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-iron">
              Trusted by
            </p>
            {["Founders", "Executives", "Authors", "Public Figures", "People in Transition"].map((t) => (
              <span key={t} className="font-body text-[0.7rem] font-light text-ash">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <section className="bg-void border-b border-graphite">
        <div
          className="mx-auto max-w-[1400px] grid grid-cols-2 gap-px bg-graphite md:grid-cols-4"
          style={{ padding: "0" }}
        >
          {[
            { value: 200, suffix: "+", label: "Clients Rewritten" },
            { value: 6, suffix: " Figures", label: "Client Revenue Generated" },
            { value: 4, suffix: " Services", label: "Ways to Work Together" },
            { value: 6, suffix: " Guides", label: "Digital Products in the Shop" },
          ].map((s) => (
            <div key={s.label} className="bg-void px-8 py-10">
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>
      </section>

      {/* ── THE COST OF WRONG WORDS ───────────────────────────────────────────── */}
      <RevealSection bg="void" num="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <H2>
              The wrong words{" "}
              <span className="text-petal">cost you.</span>
            </H2>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "64ch" }}>
            <p>They cost you deals, roles, introductions, and the meeting that turns into the contract. Quietly. Before you even know a decision was made.</p>
            <p>
              A vague LinkedIn makes a sharp professional look unfocused. A weak about page makes a performing business look small. A stale bio makes someone who has done serious work look like they stopped five years ago.
            </p>
            <p>
              I rewrite the copy people encounter when they look you up, consider you, or decide whether to reach out. Not by building a persona. By finally presenting the real thing with enough precision that the right people recognize it.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/book">Start With a Call</BtnPrimary>
              <ArrowLink href="/about">About MK</ArrowLink>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={1} />

      {/* ── CHOOSE YOUR REWRITE ───────────────────────────────────────────────── */}
      <RevealSection id="rewrites" bg="obsidian" num="02">
        <Eyebrow>Where to begin</Eyebrow>
        <H2>
          Choose what you are{" "}
          <span className="text-petal">rewriting.</span>
        </H2>
        <p className="mt-4 mb-12 font-body text-sm font-light text-smoke" style={{ maxWidth: "56ch" }}>
          Every offering starts with the same question: what do you need the words to do? Pick the one that matches the gap you're in right now.
        </p>

        <div className="grid gap-px bg-graphite sm:grid-cols-2">
          {rewrites.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group relative bg-obsidian p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-carbon hover:shadow-[0_0_32px_rgba(242,175,198,0.06)]"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs tracking-[0.2em] text-iron">{r.label}</p>
                <span className="flex h-8 w-8 items-center justify-center border border-petal/20 text-sm text-petal/50 transition-all duration-300 group-hover:border-petal group-hover:bg-petal group-hover:text-void">
                  {r.icon}
                </span>
              </div>
              <h3 className="mt-5 font-display text-3xl uppercase tracking-[0.02em] text-pearl md:text-4xl">
                {r.title}
              </h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{r.desc}</p>
              <p className="mt-5 font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-iron">{r.cue}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="font-body text-sm text-ash mb-4">Not sure which one fits? Start here.</p>
          <BtnPrimary href="/book">Book a Free 15-Minute Call →</BtnPrimary>
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── ALL SERVICES ──────────────────────────────────────────────────────── */}
      <RevealSection bg="void" num="03">
        <Eyebrow>Every way to work with me</Eyebrow>
        <H2>
          Six services.{" "}
          <span className="text-petal">One standard.</span>
        </H2>
        <p className="mt-4 mb-12 font-body text-sm font-light text-smoke" style={{ maxWidth: "58ch" }}>
          From a single-piece edit to a full site build — every service is anchored in the same thing: copy that actually sounds like you, says something true, and earns the response.
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

      <Marquee />
      <QuoteDivider index={3} />

      {/* ── THE WORK — WHY MK ──────────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="04">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Why it works</Eyebrow>
            <H2>
              Not just copy.{" "}
              <span className="text-petal">Correction.</span>
            </H2>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/book">Book a Call</BtnPrimary>
              <ArrowLink href="/about">About MK</ArrowLink>
            </div>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "64ch" }}>
            <p>People are decided by fragments now. A headline. A homepage. A LinkedIn summary. A few lines written three job titles ago by a version of you who was still figuring out what to say.</p>
            <p>
              I work where writing meets strategy, positioning, and reinvention. The copy I write is not decoration. It is the argument you make before anyone gets in a room with you. It either earns the meeting or it does not.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "No AI copy",
                "No generic frameworks",
                "No rented voice",
                "No one-size pitch decks",
                "Real strategy first",
                "You sound like you",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 border border-graphite px-4 py-3">
                  <span className="h-1 w-1 flex-shrink-0 bg-petal" />
                  <span className="font-body text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-pearl">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={17} />

      {/* ── THE SHOP — EMPIRE PRODUCTS ─────────────────────────────────────────── */}
      <RevealSection bg="void" num="05">
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
            {digitalProducts.map((item, i) => (
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

      {/* ── THE MARGINS ────────────────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="06">
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

      {/* ── WRITING ────────────────────────────────────────────────────────────── */}
      <RevealSection bg="void" num="07">
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
              Promise me I do not have to keep earning basic love.<br />
              Promise me I do not have to perform my way into being chosen.<br />
              <br />
              Promise me I can finally give myself<br />
              what I kept begging other people to give me.
            </p>
            <p className="mt-6 font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ash">
              — Promise Me
            </p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={5} />

      {/* ── FINAL CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-void" style={{ padding: "clamp(5rem, 12vw, 11rem) 0" }}>
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
            The people deciding whether to work with you are making that decision based on words you wrote years ago. Let's fix that.
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
