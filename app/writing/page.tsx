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
  ArrowLink,
} from "@/app/components/ui";
import { PATREON_URL } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Writing — MK Parrish",
  description:
    "Poetry, memoir, and the real story of becoming her. Original writing by MK Parrish.",
};

const poems = [
  {
    lines: [
      "I stopped writing about what happened",
      "and started writing about what stayed.",
      "There is a difference —",
      "one is a wound",
      "and one is a scar that learned to speak.",
    ],
    title: "What Stayed",
    note: "On grief and the things that survive it.",
  },
  {
    lines: [
      "She is not who she used to be,",
      "and that is not a loss.",
      "It is the most precise kind of arrival —",
      "the one where you finally recognize",
      "the face in the mirror",
      "and say: oh, there you are.",
    ],
    title: "Arrival",
    note: "On reinvention and the self that was always there.",
  },
  {
    lines: [
      "There are versions of you that didn't make it here.",
      "Pour something out for them anyway.",
      "They carried you further than you know.",
      "",
      "The woman you are now",
      "was built on the wreckage",
      "of every version that broke first.",
    ],
    title: "For the Ones Who Didn't Make It",
    note: "On becoming and the cost of it.",
  },
  {
    lines: [
      "I have been rewriting this sentence",
      "for three years.",
      "",
      "Not because the words were wrong —",
      "because I kept changing",
      "into someone who needed different ones.",
    ],
    title: "Three Years",
    note: "On finding the language for who you are now.",
  },
];

export default function WritingPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <Eyebrow>The Work</Eyebrow>
          <div className="mt-4">
            <H1>
              Writing
            </H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Raw writing. Real reinvention. The story behind becoming her.
          </p>
          <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            This is where the work lives before it gets positioned. Poetry, memoir,
            and the kind of writing that comes out when you stop trying to make it
            sound like something and just let it be true.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href={PATREON_URL}>Read More in The Margins</BtnPrimary>
            <BtnGhost href="/margins">About The Margins</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── POEMS ────────────────────────────────────────────────── */}
      {poems.map((poem, idx) => (
        <RevealSection key={poem.title} bg={idx % 2 === 0 ? "obsidian" : "void"} num={`0${idx + 1}`}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            {/* Left: title + note */}
            <div>
              <Eyebrow>Poem</Eyebrow>
              <H2>{poem.title}</H2>
              <p className="mt-5 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "34ch" }}>
                {poem.note}
              </p>
              {idx === 0 && (
                <div className="mt-8">
                  <ArrowLink href={PATREON_URL}>More in The Margins</ArrowLink>
                </div>
              )}
            </div>

            {/* Right: poem text */}
            <div className="relative border-l-2 border-petal/40 pl-8 md:pl-12">
              <span className="absolute -left-4 -top-8 select-none font-serif text-[7rem] leading-none text-petal/[0.09]">&ldquo;</span>
              {poem.lines.map((line, i) =>
                line === "" ? (
                  <br key={i} />
                ) : (
                  <p
                    key={i}
                    className="font-serif italic text-pearl"
                    style={{
                      fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)",
                      lineHeight: 1.95,
                      fontWeight: 500,
                      maxWidth: "none",
                      color: "var(--color-pearl)",
                    }}
                  >
                    {line}
                  </p>
                )
              )}
              <p className="mt-8 font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ash">
                — {poem.title}
              </p>
            </div>
          </div>
        </RevealSection>
      ))}

      <QuoteDivider index={6} />

      {/* ── THE MARGINS CTA ──────────────────────────────────────── */}
      <RevealSection bg="void">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Read more</Eyebrow>
            <H2>
              The writing{" "}
              <span className="text-petal">goes deeper.</span>
            </H2>
            <H3Script>The Margins is where the real work lives.</H3Script>
            <div className="mt-8 space-y-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
              <p>
                The public poems are the surface. Inside The Margins: longer memoir
                pieces, voice notes from the actual rewrite, and the writing that is
                too raw or too honest for a public feed.
              </p>
              <p>
                For the women, romantics, survivors, and overthinkers who know what
                it feels like to lose the version of life they thought they were
                getting — and choose to rebuild anyway.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href={PATREON_URL}>Join The Margins</BtnPrimary>
              <ArrowLink href="/margins">See membership tiers</ArrowLink>
            </div>
          </div>

          {/* Tier preview */}
          <div className="flex flex-col gap-px">
            {[
              { name: "The Brief", price: "$5/mo", desc: "Weekly essays and writing drops that never go to the public feed." },
              { name: "The Retainer", price: "$15/mo", desc: "Everything plus raw memoir and the personal context behind the work.", highlight: true },
              { name: "The Partner", price: "$50/mo", desc: "Full access, monthly live Q&A, and direct message access." },
            ].map((t) => (
              <div
                key={t.name}
                className={`relative p-8 transition-all duration-300 hover:-translate-y-px ${
                  t.highlight ? "bg-carbon" : "bg-obsidian"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {t.highlight && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl">{t.name}</p>
                  <p className={`font-display text-2xl ${t.highlight ? "text-petal" : "text-white"}`}>{t.price}</p>
                </div>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{t.desc}</p>
              </div>
            ))}
            <a
              href={PATREON_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-px flex w-full items-center justify-center py-5 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
            >
              Join The Margins →
            </a>
          </div>
        </div>
      </RevealSection>
    </>
  );
}
