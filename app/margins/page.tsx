import type { Metadata } from "next";
import {
  RevealSection,
  QuoteDivider,
  Eyebrow,
  H1,
  H2,
  H3Script,
  BtnPrimary,
  BtnGhost,
} from "@/app/components/ui";
import { PATREON_URL } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "The Dispatch and The Margins | MK Parrish",
  description:
    "Weekly dispatches for women in reinvention plus paid essays, strategy notes, and live feedback inside The Margins.",
};

const tiers = [
  {
    tag: "Free",
    title: "The Dispatch",
    price: "$0",
    cadence: "",
    desc: "One email a week. A raw story with one tactical move you can use the same day. Built for women rebuilding in public.",
    perks: [
      "Weekly essay and tactical play",
      "First look at paid product drops",
      "Office hours announcements",
      "No spam, no content sludge",
    ],
    highlight: false,
  },
  {
    tag: "Most Popular",
    title: "Soft Cover",
    price: "$9",
    cadence: "/mo",
    desc: "Everything in The Dispatch plus private essays and the notes I do not post publicly. The messy middle, documented.",
    perks: [
      "All Dispatch sends",
      "Private essays each week",
      "Offer and copy teardown archive",
      "Monthly group Q and A replay",
    ],
    highlight: true,
  },
  {
    tag: "Inner Circle",
    title: "First Edition",
    price: "$29",
    cadence: "/mo",
    desc: "All access plus monthly hot-seat copy feedback. Closest thing to working with me without booking a full rewrite.",
    perks: [
      "All Soft Cover content",
      "Monthly live hot-seat session",
      "Priority copy feedback",
      "Beta access to new digital products",
    ],
    highlight: false,
  },
];

export default function MarginsPage() {
  return (
    <>
      <section className="relative flex min-h-[75vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.12),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">newsletter. membership. real voice.</p>
          <div className="mt-6">
            <H1>
              The <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>Dispatch</span>
            </H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            for women writing their next chapter in real time.
          </p>
          <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            Your inbox does not need another motivation memo. It needs language for hard pivots, money asks, and identity shifts that do not fit in a carousel. The free Dispatch gives you the weekly play. The paid Margins gives you the full notebook.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href={PATREON_URL}>join now</BtnPrimary>
            <BtnGhost href={PATREON_URL}>start free</BtnGhost>
          </div>
        </div>
      </section>

      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>what it is</Eyebrow>
            <H2>
              the antidote to
              <span className="text-petal"> inbox landfill.</span>
            </H2>
            <H3Script>one story. one move. no filler.</H3Script>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke">
            <p>Each send starts with a real story from reinvention, heartbreak, career pivots, money tension, and all the weird identity math in between.</p>
            <p>Then I give you one tactical move. Exact lines to use in a negotiation. A better CTA for your offer page. A positioning tweak that gets people to stop ghosting.</p>
            <p>No fake polish. No aspirational persona. You get the notes while they are still warm.</p>
            <p>If you are rebuilding while still paying bills, this is for you.</p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={4} />

      <RevealSection bg="void" num="02">
        <Eyebrow>membership tiers</Eyebrow>
        <H2>
          pick your level.
          <span className="text-petal"> keep your edge.</span>
        </H2>
        <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke">Start free. Upgrade when you want deeper access.</p>

        <div className="mt-12 grid gap-px bg-graphite lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.title}
              className={`relative flex flex-col p-8 transition-all duration-300 hover:-translate-y-1 ${
                tier.highlight ? "bg-carbon shadow-[0_0_60px_rgba(242,175,198,0.08)]" : "bg-void"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              {tier.highlight && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-iron">{tier.tag}</p>
              <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{tier.title}</h3>
              <div className="mt-3 flex items-baseline gap-0.5">
                <span className={`font-display text-4xl ${tier.highlight ? "text-petal" : "text-white"}`}>{tier.price}</span>
                <span className="font-body text-sm text-ash">{tier.cadence}</span>
              </div>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{tier.desc}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {tier.perks.map((p) => (
                  <li key={p} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 bg-petal" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href={PATREON_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex w-full items-center justify-center py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    tier.highlight ? "btn-primary text-void" : "btn-ghost"
                  }`}
                >
                  join {tier.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={5} />

      <RevealSection bg="obsidian" num="03">
        <Eyebrow>content pillars</Eyebrow>
        <H2>
          what i cover
          <span className="text-petal"> every week.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Money Language",
              desc: "Scripts for pricing, negotiating, and pitching your work without shrinking.",
            },
            {
              title: "Reinvention Diaries",
              desc: "Real-time essays on rebuilding identity after endings, exits, and big life edits.",
            },
            {
              title: "Brand Receipts",
              desc: "Breakdowns of what makes personal brands convert without turning robotic.",
            },
            {
              title: "Only MK Experiments",
              desc: "Live writing sprints and teardown sessions where I build copy in public.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-obsidian p-8">
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-petal">{item.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <section className="relative bg-void" style={{ padding: "clamp(5rem, 10vw, 9rem) 0" }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(242,175,198,0.07),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] text-center" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">welcome email promise</p>
          <div className="mt-6">
            <H2>
              subject line.
              <span className="text-petal"> you are not behind.</span>
            </H2>
          </div>
          <p className="mx-auto mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            first send includes my story, the four-part reinvention framework, and a fill-in script you can use to update your bio before dinner.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href={PATREON_URL}>join the dispatch</BtnPrimary>
            <BtnGhost href={PATREON_URL}>see membership options</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
