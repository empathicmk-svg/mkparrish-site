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
  title: "The Margins — MK Parrish",
  description:
    "The private editorial side of MK Parrish. Essays, strategy notes, and the thinking behind the work. Join on Patreon.",
};

const tiers = [
  {
    tag: "Entry",
    title: "The Brief",
    price: "$5",
    cadence: "/mo",
    desc: "Weekly essays and strategic breakdowns that never make the public feed. The thinking before it gets polished.",
    perks: [
      "Weekly long-form essays",
      "Strategic frameworks and tools",
      "Early access to published work",
      "Monthly Q&A roundup",
    ],
    highlight: false,
  },
  {
    tag: "Most Popular",
    title: "The Retainer",
    price: "$15",
    cadence: "/mo",
    desc: "Everything in The Brief, plus the raw thinking behind the client work. Frameworks, notes, and behind-the-scenes strategy.",
    perks: [
      "All Brief content",
      "Monthly strategy notes",
      "Behind-the-scenes on client frameworks",
      "Messaging and voice templates",
    ],
    highlight: true,
  },
  {
    tag: "Inner Circle",
    title: "The Partner",
    price: "$50",
    cadence: "/mo",
    desc: "Direct access. For operators who want the unfiltered version and a way in.",
    perks: [
      "All Retainer content",
      "Monthly live Q&A",
      "Direct message access",
      "Priority feedback on your copy",
    ],
    highlight: false,
  },
];

export default function MarginsPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[75vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.12),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Editorial &middot; Private &middot; Membership
          </p>
          <div className="mt-6">
            <H1>
              The{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                Margins
              </span>
            </H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            The private side of the brand.
          </p>
          <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            The essays. The notes. The behind-the-scenes becoming. The thoughts that do not belong in a bio or a pitch deck. If the public work is the polished sentence, The Margins is where you get the crossed-out versions too.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href={PATREON_URL}>Join The Margins</BtnPrimary>
            <BtnGhost href={PATREON_URL}>Start at $5/mo</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── WHAT IT IS ───────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>What lives here</Eyebrow>
            <H2>
              The thinking{" "}
              <span className="text-petal">before the edit.</span>
            </H2>
            <H3Script>Not content. Not strategy theatre. The real work.</H3Script>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke">
            <p>
              The public work is already edited. Positioned. Chosen carefully. The Margins is what happens before that.
            </p>
            <p>
              Raw strategy notes. Half-finished frameworks that turned into full engagements. The personal context behind the professional voice. The things I notice about writing, positioning, and reinvention that do not fit anywhere else.
            </p>
            <p>
              It is literary in the way that good journalism is literary. Specific. Honest. Not performing expertise. Actually sharing it.
            </p>
            <p>
              No algorithm shapes what I write here. No engagement metric decides whether it gets published. I write what I think, and the people who want that kind of access can find it here.
            </p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={4} />

      {/* ── TIERS ────────────────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>Membership tiers</Eyebrow>
        <H2>
          Choose your{" "}
          <span className="text-petal">level of access.</span>
        </H2>
        <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke">
          No contracts. Cancel any time. The work speaks for itself.
        </p>

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
                  Join as {tier.title}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-graphite pt-8 text-center">
          <p className="font-body text-sm font-light text-smoke">
            Cancel any time. No contracts. The work speaks for itself.
          </p>
          <a
            href={PATREON_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal transition-colors hover:text-blush"
          >
            View membership details on Patreon &rarr;
          </a>
        </div>
      </RevealSection>

      <QuoteDivider index={5} />

      {/* ── WHAT TO EXPECT ───────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="03">
        <Eyebrow>What you get</Eyebrow>
        <H2>
          Inside The{" "}
          <span className="text-petal">Margins.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Essays", desc: "Long-form thinking on writing, strategy, reinvention, and the friction between who people are and how they are read." },
            { title: "Strategy Notes", desc: "The raw frameworks and tools that come out of client work. Documented for people who want to apply them." },
            { title: "Behind-the-Scenes", desc: "How projects actually unfold. The thinking before the delivery. The decisions that do not make the final draft." },
            { title: "Voice and Copy Templates", desc: "Prompts, frameworks, and copy examples for building your own presence. Practical and reusable." },
            { title: "Q&A Roundups", desc: "Monthly answers to questions from members. Specific, direct, and useful." },
            { title: "Early Access", desc: "Public essays and published work sent here first, before anywhere else." },
          ].map((item) => (
            <div key={item.title} className="bg-obsidian p-8">
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-petal">{item.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="relative bg-void" style={{ padding: "clamp(5rem, 10vw, 9rem) 0" }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(242,175,198,0.07),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] text-center" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            The private side
          </p>
          <div className="mt-6">
            <H2>
              The real thinking{" "}
              <span className="text-petal">is in here.</span>
            </H2>
          </div>
          <p className="mx-auto mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            For five dollars a month, you get more than most consultants charge for an hour.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href={PATREON_URL}>Join The Margins</BtnPrimary>
            <BtnGhost href={PATREON_URL}>See Membership Options</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
