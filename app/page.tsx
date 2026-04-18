import type { Metadata } from "next";
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
  STRIPE_NEW_CHAPTER,
  STRIPE_BYLINE,
  PATREON_URL,
} from "@/app/lib/config";

export const metadata: Metadata = {
  title: "MK Parrish — Rewrite Your Story",
  description:
    "Words, strategy, and reinvention for people ready to stop being misread. Work with MK Parrish on copywriting, positioning, and personal brand strategy.",
};

const rewrites = [
  {
    label: "01",
    title: "Rewrite Your Career",
    desc: "Your LinkedIn, bio, and professional narrative rebuilt for who you have actually become. Not a polish. A repositioning.",
    cue: "For executives, professionals, and industry switchers",
    href: "/career",
  },
  {
    label: "02",
    title: "Rewrite Your Brand",
    desc: "Messaging, voice, and homepage copy for a business that performs better than it sounds. The gap between those two things is costing you.",
    cue: "For founders and company builders",
    href: "/brand",
  },
  {
    label: "03",
    title: "Rewrite Your Presence",
    desc: "Website copy, public bios, and ongoing thought leadership written in your voice. Every surface that exists before you speak.",
    cue: "For public-facing professionals and ghostwriting clients",
    href: "/presence",
  },
  {
    label: "04",
    title: "Rewrite Your Next Chapter",
    desc: "Full repositioning for pivots, reinventions, and transitions that require a new story, not a revised one. For people mid-crossing.",
    cue: "For people in genuine transition",
    href: "/next-chapter",
  },
];

const services = [
  {
    tag: "Quick Fix",
    title: "The Edit",
    price: "From $100",
    desc: "One piece of copy rewritten. LinkedIn bio, executive blurb, website tagline, or positioning statement. Delivered sharp. Delivered fast.",
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
    tag: "Most Requested",
    title: "The Rewrite",
    price: "From $1,500",
    desc: "A full story overhaul with a strategy session. For people whose work has outgrown the language they are still using to describe it.",
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
    desc: "Brand, website, founder story, and next-era messaging built together. For pivots, relaunches, and reinventions where the whole story needs to move.",
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
    desc: "Monthly ghostwriting under your name. LinkedIn posts, essays, newsletters. Written in your voice. Sharp enough to build something.",
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
];

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-svh flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.15),transparent_65%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Copywriting &middot; Ghostwriting &middot; Strategy &middot; Reinvention
          </p>

          <div className="mt-6">
            <H1>
              Rewrite{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                Your
              </span>
              <br />
              Story
            </H1>
          </div>

          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Words, strategy, and reinvention for people ready to stop being misread.
          </p>

          <div className="mt-6 max-w-2xl">
            <p className="font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "64ch" }}>
              You have outgrown the version of you the world is still reading. I work with founders, executives, and people mid-transition to build language that finally catches up.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href="#rewrites">Choose Your Rewrite</BtnPrimary>
            <BtnGhost href="/margins">Enter The Margins</BtnGhost>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ── THE WRONG WORDS ──────────────────────────────────────── */}
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
            <p>They cost you deals, roles, introductions, and momentum. Quietly. Before you even know a decision was made.</p>
            <p>
              A vague LinkedIn makes a sharp professional look unfocused. A weak about page makes a performing business look small. A stale bio makes someone who has done serious work look like they stopped growing.
            </p>
            <p>
              I rewrite the copy people encounter when they look you up, consider you, judge you, or decide whether to reach out. The fragments forming opinions on your behalf, right now.
            </p>
            <p>
              Not by manufacturing a persona. By finally presenting the real thing with precision and nerve.
            </p>
            <div className="mt-8">
              <ArrowLink href="/book">Book a strategy call</ArrowLink>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={1} />

      {/* ── CHOOSE YOUR REWRITE ──────────────────────────────────── */}
      <RevealSection id="rewrites" bg="obsidian" num="02">
        <Eyebrow>Where to begin</Eyebrow>
        <H2>
          Choose what you are{" "}
          <span className="text-petal">rewriting.</span>
        </H2>

        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2">
          {rewrites.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group relative bg-obsidian p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-carbon hover:shadow-[0_0_32px_rgba(242,175,198,0.06)]"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-50" />
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs tracking-[0.2em] text-iron">{r.label}</p>
                <span className="flex h-8 w-8 items-center justify-center border border-petal/20 text-sm text-petal/50 transition-all duration-300 group-hover:border-petal group-hover:bg-petal group-hover:text-void">
                  &rarr;
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
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <RevealSection bg="void" num="03">
        <Eyebrow>Work with me directly</Eyebrow>
        <H2>
          Four ways to{" "}
          <span className="text-petal">work together.</span>
        </H2>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </RevealSection>

      <Marquee />
      <QuoteDivider index={3} />

      {/* ── CORRECTION ───────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="04">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>The work</Eyebrow>
            <H2>
              Not just copy.{" "}
              <span className="text-petal">Correction.</span>
            </H2>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "64ch" }}>
            <p>People are judged by fragments now.</p>
            <p>
              A headline. A homepage. A LinkedIn summary. A speaker bio. A few lines written years ago by a version of you who was still figuring out the pitch.
            </p>
            <p>
              I work at the place where writing meets strategy, visibility, and reinvention. The copy I write is not decoration. It is a positioning instrument. It changes the room before you enter it.
            </p>
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-petal">
              No AI copy. No generic frameworks. No rented voice.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/book">Book a Call</BtnPrimary>
              <ArrowLink href="/about">About MK</ArrowLink>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={4} />

      {/* ── THE MARGINS ──────────────────────────────────────────── */}
      <RevealSection bg="void" num="05">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>The private side</Eyebrow>
            <H2>
              The{" "}
              <span className="text-petal">Margins.</span>
            </H2>
            <H3Script>Where the real thinking lives.</H3Script>
            <div className="mt-8 space-y-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
              <p>Long-form essays. Raw strategy notes. The frameworks that come out of real client work.</p>
              <p>
                Not content. Not performance. The thinking that happens before any of it gets published. If the public work is the final sentence, The Margins is the draft with all the edits still showing.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href={PATREON_URL}>Enter The Margins</BtnPrimary>
              <ArrowLink href="/margins">Learn more</ArrowLink>
            </div>
          </div>

          <div className="flex flex-col gap-px">
            {[
              { tier: "Soft Cover", price: "$5/mo", desc: "Weekly essays and strategy notes that never make the public feed. The thinking before it gets cleaned up." },
              { tier: "Marked Up", price: "$12/mo", desc: "Everything in Soft Cover, plus the raw frameworks from client work and behind-the-scenes process notes." },
              { tier: "First Edition", price: "$28/mo", desc: "Full access plus a monthly live Q&A, direct message access, and priority feedback on your copy." },
            ].map((t, i) => (
              <div key={t.tier} className={`relative p-8 ${i === 1 ? "bg-carbon" : "bg-obsidian"}`}>
                {i === 1 && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl">{t.tier}</p>
                  <p className={`font-display text-2xl ${i === 1 ? "text-petal" : "text-white"}`}>{t.price}</p>
                </div>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={5} />

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="relative bg-void" style={{ padding: "clamp(5rem, 12vw, 11rem) 0" }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(242,175,198,0.09),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] text-center" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Start here
          </p>
          <div className="mt-6">
            <H1>
              Rewrite{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.3)" }}>
                Your
              </span>{" "}
              Story
            </H1>
          </div>
          <p className="mx-auto mt-8 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            Because being misunderstood is expensive.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href="/book">Book a Call</BtnPrimary>
            <BtnGhost href="/contact">Get in Touch</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
