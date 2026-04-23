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
import { STRIPE_EDIT, STRIPE_REWRITE, STRIPE_BYLINE, PATREON_URL } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "MK Parrish | Rebrand your life. Rewrite your story.",
  description:
    "MK Parrish writes the words people use when they stop performing and start getting paid. Strategy, copy, and reinvention for women done shrinking.",
};

const rewrites = [
  {
    label: "01",
    title: "Rewrite Your Career",
    desc: "Your LinkedIn, bio, and pitch rebuilt for the room you actually belong in now. Great work gets ignored when your story still sounds entry level.",
    cue: "for leaders, high-achievers, and switchers",
    href: "/career",
  },
  {
    label: "02",
    title: "Rewrite Your Brand",
    desc: "Positioning, messaging, and homepage copy that sounds expensive because it is specific. If people visit your site and still ask what you do, the copy is leaking money.",
    cue: "for founders and personal brands",
    href: "/brand",
  },
  {
    label: "03",
    title: "Rewrite Your Presence",
    desc: "Public-facing copy that can hold your real voice without sanding it down. Website, press bio, speaker profile, thought leadership. All aligned, finally.",
    cue: "for creators and public operators",
    href: "/presence",
  },
  {
    label: "04",
    title: "Rewrite Your Next Chapter",
    desc: "For the in-between season. The old life is gone. The new identity is forming. We write language that can carry you through the mess and into momentum.",
    cue: "for women in reinvention",
    href: "/next-chapter",
  },
];

const services = [
  {
    tag: "30-day cash play",
    title: "The Edit",
    price: "$195",
    desc: "One sharp fix. Fast. You send one asset. I return the upgraded version in your voice so you can close faster this month.",
    perks: [
      "48-hour turnaround option",
      "LinkedIn headline and about rewrite",
      "Bio, homepage hero, or offer copy",
      "One conversion-focused revision",
    ],
    cta: "Buy The Edit",
    href: STRIPE_EDIT,
    highlight: false,
  },
  {
    tag: "most booked",
    title: "The Rewrite",
    price: "$1,500",
    desc: "The full repositioning sprint. We fix your story, offers, and proof so your internet presence finally matches your real level.",
    perks: [
      "75-minute strategy session",
      "Core brand positioning statement",
      "LinkedIn plus website core pages",
      "Offer messaging and CTA map",
    ],
    cta: "Start The Rewrite",
    href: STRIPE_REWRITE,
    highlight: true,
  },
  {
    tag: "60-90 day engine",
    title: "The Dispatch",
    price: "$0 to join",
    desc: "Weekly newsletter for women rebuilding in public and getting paid for their perspective. This is where audience turns into pipeline.",
    perks: [
      "Weekly essay with one tactical play",
      "Subscriber-only office hours invites",
      "Early access to paid drops",
      "Beehiiv migration updates",
    ],
    cta: "Join The Dispatch",
    href: "/margins",
    highlight: false,
  },
  {
    tag: "long-term leverage",
    title: "The Byline",
    price: "$1,500/mo",
    desc: "Ongoing ghostwriting that builds authority while you run the business. Less content panic. More compounding trust.",
    perks: [
      "Monthly LinkedIn content system",
      "Narrative-driven newsletter drafts",
      "Founder POV library",
      "Quarterly message refresh",
    ],
    cta: "Start The Byline",
    href: STRIPE_BYLINE,
    highlight: false,
  },
];

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-svh flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.15),transparent_65%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">writer. strategist. brand architect.</p>

          <div className="mt-6">
            <H1>
              rebrand your life.
              <br />
              rewrite your story.
            </H1>
          </div>

          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            i rebuilt my life while people were still calling it a phase.
          </p>

          <div className="mt-6 max-w-2xl">
            <p className="font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "64ch" }}>
              I help smart women stop sounding like a draft. We turn your lived experience, receipts, and point of view into copy that earns trust and drives revenue.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href="#rewrites">choose your rewrite</BtnPrimary>
            <BtnGhost href="/margins">join the dispatch</BtnGhost>
          </div>
        </div>
      </section>

      <Marquee />

      <RevealSection bg="void" num="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>the problem</Eyebrow>
            <H2>
              you are not unknown.
              <span className="text-petal"> you are mispositioned.</span>
            </H2>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "64ch" }}>
            <p>Bad copy makes excellent people look optional.</p>
            <p>It is why people say you are impressive, then disappear. Your profile reads polished, your offers read vague, your prices read negotiable.</p>
            <p>I fix that. Not with fake confidence language. With precision. Proof. Narrative that lands in the first ten seconds.</p>
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-petal">no trend voice. no fake founder persona. no fluff.</p>
            <div className="mt-8">
              <ArrowLink href="/book">book a strategy call</ArrowLink>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={1} />

      <RevealSection id="rewrites" bg="obsidian" num="02">
        <Eyebrow>where to begin</Eyebrow>
        <H2>
          choose what you are
          <span className="text-petal"> rewriting first.</span>
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
              <h3 className="mt-5 font-display text-3xl uppercase tracking-[0.02em] text-pearl md:text-4xl">{r.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{r.desc}</p>
              <p className="mt-5 font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-iron">{r.cue}</p>
            </Link>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      <RevealSection bg="void" num="03">
        <Eyebrow>offers built to sell now</Eyebrow>
        <H2>
          monetization stack.
          <span className="text-petal"> ranked by speed.</span>
        </H2>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </RevealSection>

      <Marquee />
      <QuoteDivider index={3} />

      <RevealSection bg="obsidian" num="05">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>only mk</Eyebrow>
            <H2>
              this is not self-help.
              <span className="text-petal"> this is strategy in lipstick.</span>
            </H2>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "64ch" }}>
            <p>I write the sentence that gets you hired. Funded. Booked. Quoted. Remembered.</p>
            <p>My clients are brilliant and busy. They do not need another mood board. They need language that handles money conversations without getting weird.</p>
            <p>I bring corporate pattern recognition, writing chops, and a low tolerance for performance. We build your message like a business asset, not a caption calendar.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/book">book a call</BtnPrimary>
              <ArrowLink href="/about">about mk</ArrowLink>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={4} />

      <RevealSection bg="void" num="04">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>the writing</Eyebrow>
            <H2>
              words with pulse.
              <span className="text-petal"> not content sludge.</span>
            </H2>
            <H3Script>poetry, prose, strategy notes, and the in-between.</H3Script>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/writing">read the work</BtnPrimary>
              <ArrowLink href={PATREON_URL}>read the margins</ArrowLink>
            </div>
          </div>
          <div className="relative border-l-2 border-petal/40 pl-8">
            <span className="absolute -left-4 -top-6 select-none font-serif text-[6rem] leading-none text-petal/[0.09]">&ldquo;</span>
            <p
              className="font-serif italic text-pearl"
              style={{ fontSize: "clamp(1.05rem,2.2vw,1.3rem)", lineHeight: 1.95, fontWeight: 500, maxWidth: "none", color: "var(--color-pearl)" }}
            >
              i stopped auditioning for basic love.<br />
              i stopped overexplaining my ambition.<br />
              i stopped apologizing for needing a bigger life.
            </p>
            <p className="mt-6 font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ash">from the dispatch</p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={7} />

      <RevealSection bg="void" num="06">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>newsletter</Eyebrow>
            <H2>
              the dispatch.
              <span className="text-petal"> inbox, not landfill.</span>
            </H2>
            <H3Script>one honest essay. one tactical play. every week.</H3Script>
            <div className="mt-8 space-y-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
              <p>For women building the next version of themselves without pretending it is easy.</p>
              <p>Every send includes one sharp story and one move you can use that day. Career negotiation lines. offer upgrades. audience plays. emotional cleanup after big decisions.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/margins">join the dispatch</BtnPrimary>
              <ArrowLink href="/margins">see what you get</ArrowLink>
            </div>
          </div>

          <div className="flex flex-col gap-px">
            {[
              { tier: "free", price: "$0", desc: "weekly dispatch essay, one tactical play, and first look at new offers." },
              { tier: "soft cover", price: "$9/mo", desc: "everything free plus private essays, office hour replays, and monthly writing prompts." },
              { tier: "first edition", price: "$29/mo", desc: "all access plus live monthly hot-seat feedback and priority review on your copy." },
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

      <section className="relative bg-void" style={{ padding: "clamp(5rem, 12vw, 11rem) 0" }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(242,175,198,0.09),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] text-center" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">start here</p>
          <div className="mt-6">
            <H1>
              stop sounding like
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.3)" }}>
                everyone else.
              </span>
            </H1>
          </div>
          <p className="mx-auto mt-8 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            Pick one offer. Ship better words this week. Keep the revenue. Keep the voice.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href="/book">book a call</BtnPrimary>
            <BtnGhost href="/contact">get in touch</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
