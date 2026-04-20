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
    desc: "Your LinkedIn, bio, and professional narrative rebuilt for the career you actually have now. Not a polish. A full repositioning. Because the people deciding whether to hire you are reading copy you wrote three years ago.",
    cue: "For executives, professionals, and industry switchers",
    href: "/career",
  },
  {
    label: "02",
    title: "Rewrite Your Brand",
    desc: "Positioning, voice, and homepage copy for a business that delivers more than it sounds like. That gap is not aesthetic. It is a revenue leak, and it shows up every time someone lands on your site and leaves without reaching out.",
    cue: "For founders and company builders",
    href: "/brand",
  },
  {
    label: "03",
    title: "Rewrite Your Presence",
    desc: "Website copy, public bios, and ongoing thought leadership written in your actual voice. Every surface that forms an opinion about you before you get to speak. Most of them are underperforming right now.",
    cue: "For public-facing professionals and ghostwriting clients",
    href: "/presence",
  },
  {
    label: "04",
    title: "Rewrite Your Next Chapter",
    desc: "Full repositioning for pivots, reinventions, and the messy middle where your old story no longer fits and the new one is not finished yet. I have been here. I know how to write through it.",
    cue: "For people in genuine transition",
    href: "/next-chapter",
  },
];

const services = [
  {
    tag: "Quick Fix",
    title: "The Edit",
    price: "From $100",
    desc: "One piece of copy rewritten. LinkedIn bio, executive blurb, website tagline, or positioning statement. You know exactly what is broken. I fix it.",
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
    desc: "Monthly ghostwriting under your name. LinkedIn posts, essays, newsletters. Written in your voice by someone who actually writes. Consistent enough to build a reputation. Sharp enough that people notice.",
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
            <p>They cost you deals, roles, introductions, and the meeting that turns into the contract. Quietly. Before you even know a decision was made.</p>
            <p>
              A vague LinkedIn makes a sharp professional look unfocused. A weak about page makes a performing business look small. A stale bio makes someone who has done serious work look like they stopped five years ago.
            </p>
            <p>
              I rewrite the copy people encounter when they look you up, consider you, or decide whether to reach out. These are not just words. They are the impression you make before you get to speak.
            </p>
            <p>
              Not by building a persona. By finally presenting the real thing with enough precision that the right people recognize it.
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
      <RevealSection bg="obsidian" num="05">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>The work</Eyebrow>
            <H2>
              Not just copy.{" "}
              <span className="text-petal">Correction.</span>
            </H2>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "64ch" }}>
            <p>People are decided by fragments now.</p>
            <p>
              A headline. A homepage. A LinkedIn summary. A speaker bio. A few lines written three job titles ago by a version of you who was still figuring out what to say.
            </p>
            <p>
              I work where writing meets strategy, positioning, and reinvention. The copy I write is not decoration. It is the argument you make before anyone gets in a room with you. It either earns the meeting or it does not.
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

      {/* ── THE WRITING ──────────────────────────────────────────── */}
      <RevealSection bg="void" num="04">
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
              style={{ fontSize: "clamp(1.05rem,2.2vw,1.3rem)", lineHeight: 1.95, fontWeight: 500, maxWidth: "none", color: "var(--color-pearl)" }}
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

      <QuoteDivider index={7} />

      {/* ── THE MARGINS ──────────────────────────────────────────── */}
      <RevealSection bg="void" num="06">
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
                Not content. Not thought leadership theatre. The real thinking, before it gets positioned. If the public work is the final sentence, The Margins is the version with all the edits still showing and the margin notes intact.
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
