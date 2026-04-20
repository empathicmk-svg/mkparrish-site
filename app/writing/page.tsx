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
    "Original poetry by MK Parrish — Promise Me, Mirage, and more. Raw writing on love, identity, survival, and the moment you stop asking other people to hand you a future they never had the character to build.",
};

// Each inner array is one stanza.
const PROMISE_ME: string[][] = [
  [
    "Promise me you love me.",
    "Promise me you mean it.",
    "Promise me I am not crazy for wanting what you said I could have.",
  ],
  [
    "Promise me there is no goodbye coming.",
    "Promise me there is no other woman.",
    "Promise me there is no catch.",
    "Promise me this is not another sales pitch dressed up as devotion.",
  ],
  [
    "Promise me I do not have to keep earning basic love.",
    "Promise me I do not have to perform my way into being chosen.",
    "Promise me I do not have to be prettier, quieter, thinner, easier, sexier, less emotional, more grateful, more low maintenance, more chill.",
  ],
  [
    "Promise me I am not too much just because I finally asked for something real.",
    "Promise me I am not hard to love just because I wanted consistency more than chemistry.",
    "Promise me I am not embarrassing for believing you.",
  ],
  [
    "Promise me forever was not just something pretty you said because it sounded good in the dark.",
    'Promise me \u201call in\u201d was not just a costume.',
    'Promise me \u201cride or die\u201d was not just another clich\u00e9 you borrowed because it made you sound like a man with depth.',
  ],
  [
    "Promise me I do not have to keep feeding myself crumbs and calling it hope.",
    "Promise me I do not have to live like a woman grateful for half a loaf of bread in the dark.",
    "Promise me I am still allowed to want skylights and peace and a life that does not hurt to wake up in.",
  ],
  [
    "Promise me I did not waste years kneeling at the altar of potential.",
    "Promise me I did not confuse being chosen with being loved.",
    "Promise me I did not build my whole identity around what you might become.",
  ],
  [
    "Promise me this is not what love is now.",
    "Promise me love is not anxiety.",
    "Promise me love is not begging.",
    "Promise me love is not waiting for someone to become who they advertised.",
  ],
  [
    "Promise me the world is not just a long chain of women being lied to politely.",
    "Promise me little girls are not still being raised on fantasies that turn them into perfect victims for men who like worship more than partnership.",
    "Promise me I was not stupid.",
    "Promise me I was sincere in a world that rewards performance.",
  ],
  [
    "Promise me I can stop now.",
    "Promise me I can put down the script.",
    "Promise me I can stop asking other people to hand me a future they never had the character to build.",
  ],
  [
    "Promise me I do not need your promise.",
    "Promise me I do not need your almost.",
    "Promise me I do not need another speech, another excuse, another delay, another someday.",
  ],
  [
    "Promise me I will survive the truth.",
    "Promise me I will survive being disappointed all the way to the bone.",
    "Promise me I will survive the shame of realizing I called it love when it was really hunger.",
  ],
  [
    "Promise me I can start again.",
    "Promise me I can become the person who stops confusing hope with evidence.",
    "Promise me I can finally give myself what I kept begging other people to give me.",
  ],
  [
    "Promise me nothing.",
    "Promise me absolutely nothing.",
    "Promise me no forever, no fairy tale, no me-and-you-against-the-world.",
  ],
  [
    "Promise me I learn.",
    "Promise me I leave.",
    "Promise me I remember that my life cannot rest in the mouth of someone who likes making promises more than keeping them.",
  ],
];

// Each inner array is one stanza.
const MIRAGE: string[][] = [
  [
    "\u2018Wake up,\u2019 the world said \u2014",
    "and the curtain of bliss she had mistaken for a veil",
    "fell clean from her face.",
  ],
  [
    "Above her, a spider stood sentinel,",
    "pinning its deadly web in place \u2014",
    "and caught in the silk, a girl",
    "who thought she knew.",
    "She choked on the words she once carried",
    "like gospel, like grace.",
  ],
  [
    "The girl who had begun to dream",
    "now stood still and watched each scene",
    "unspool without her \u2014",
    "a puppet waiting on the string,",
    "lungs full and breathless all the same,",
    "unable to move,",
    "unable to claim",
    "the control,",
    "the power,",
    "the feeling of freedom \u2014",
    "that old country she remembered",
    "like a half-heard name.",
  ],
  [
    "Self-worth.",
    "Accomplishment.",
    "An identity that held.",
  ],
  [
    "Instead: a hollow.",
    "A gaping hole where the story fell.",
    "A never-ending forest with no clearing,",
    "a novel no one opened, no one telling.",
  ],
  [
    "She stood there in the limbo of it,",
    "still as driftwood, dense as stone \u2014",
    "once a girl with fire in the margins,",
    "now a life that felt like someone else\u2019s loan.",
  ],
  [
    "How does a woman who wanted everything",
    "end up owing herself nothing?",
    "How does the one who dreamed the loudest",
    "become the one afraid of her own voice?",
  ],
  [
    "She wanted to rewrite the ending \u2014",
    "to scratch out every line of silence,",
    "laugh at the version of herself",
    "who waited to be chosen,",
    "and shout her own name",
    "into the open air",
    "with the kind of confidence",
    "that needs no permission,",
    "no applause,",
    "no net below.",
  ],
  [
    "She just wanted to begin.",
  ],
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
            <H1>Writing</H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Raw writing. Real reinvention. The story behind becoming her.
          </p>
          <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            This is where the work lives before it gets positioned. Poetry and memoir
            written when the only goal was to be honest.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href={PATREON_URL}>Read More in The Margins</BtnPrimary>
            <BtnGhost href="/margins">About The Margins</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── PROMISE ME — FEATURED POEM ───────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-16 lg:grid-cols-[280px_1fr]">

          {/* Sticky title col */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Poem</Eyebrow>
            <H2>Promise<br />Me</H2>
            <p className="mt-5 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "28ch" }}>
              On love, performance, hunger, and the moment you stop asking other people to hand you a future they never had the character to build.
            </p>
            <div className="mt-8">
              <ArrowLink href={PATREON_URL}>More in The Margins</ArrowLink>
            </div>
          </div>

          {/* Poem body — stanza by stanza */}
          <div className="relative border-l-2 border-petal/30 pl-8 md:pl-14">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-5 -top-10 select-none font-serif leading-none text-petal/[0.08]"
              style={{ fontSize: "clamp(6rem,14vw,11rem)" }}
            >
              &ldquo;
            </span>

            <div className="space-y-8">
              {PROMISE_ME.map((stanza, si) => (
                <div key={si} className="space-y-1">
                  {stanza.map((line, li) => (
                    <p
                      key={li}
                      className="font-serif italic text-pearl"
                      style={{
                        fontSize: "clamp(1rem, 2vw, 1.2rem)",
                        lineHeight: 1.9,
                        fontWeight: 500,
                        maxWidth: "none",
                        color: "var(--color-pearl)",
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <p className="mt-12 font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ash">
              — Promise Me, MK Parrish
            </p>

            {/* inline CTA after the poem */}
            <div className="mt-10 border-t border-graphite pt-8">
              <p className="mb-6 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "52ch" }}>
                This is what lives in The Margins. Writing that does not get cleaned up for a public feed.
                If this poem said something you needed to hear, there is more — much more — inside.
              </p>
              <div className="flex flex-wrap gap-4">
                <BtnPrimary href={PATREON_URL}>Join The Margins</BtnPrimary>
                <ArrowLink href="/margins">See membership tiers</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── MIRAGE — SECOND FEATURED POEM ───────────────────────── */}
      <RevealSection bg="void" num="02">
        <div className="grid gap-16 lg:grid-cols-[280px_1fr]">

          {/* Sticky title col */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Poem</Eyebrow>
            <H2>Mirage</H2>
            <p className="mt-5 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "28ch" }}>
              On waking up, losing yourself, and the long road back to wanting to begin.
            </p>
            <div className="mt-8">
              <ArrowLink href={PATREON_URL}>More in The Margins</ArrowLink>
            </div>
          </div>

          {/* Poem body */}
          <div className="relative border-l-2 border-petal/30 pl-8 md:pl-14">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-5 -top-10 select-none font-serif leading-none text-petal/[0.08]"
              style={{ fontSize: "clamp(6rem,14vw,11rem)" }}
            >
              &ldquo;
            </span>

            <div className="space-y-8">
              {MIRAGE.map((stanza, si) => (
                <div key={si} className="space-y-1">
                  {stanza.map((line, li) => (
                    <p
                      key={li}
                      className="font-serif italic text-pearl"
                      style={{
                        fontSize: "clamp(1rem, 2vw, 1.2rem)",
                        lineHeight: 1.9,
                        fontWeight: 500,
                        maxWidth: "none",
                        color: "var(--color-pearl)",
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <p className="mt-12 font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ash">
              — Mirage, MK Parrish
            </p>

            <div className="mt-10 border-t border-graphite pt-8">
              <p className="mb-6 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "52ch" }}>
                More work like this lives inside The Margins — writing that goes deeper than
                a public feed allows.
              </p>
              <div className="flex flex-wrap gap-4">
                <BtnPrimary href={PATREON_URL}>Join The Margins</BtnPrimary>
                <ArrowLink href="/margins">See membership tiers</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={8} />

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
                The public poems are the surface. Inside The Margins: longer memoir pieces,
                voice notes from the actual rewrite, and the writing that is too raw or too
                honest for a public feed.
              </p>
              <p>
                For the women, romantics, survivors, and overthinkers who know what it feels
                like to lose the version of life they thought they were getting — and choose
                to rebuild anyway.
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
              { name: "The Brief",   price: "$5/mo",  desc: "Weekly essays and writing drops that never go to the public feed.", highlight: false },
              { name: "The Retainer", price: "$15/mo", desc: "Everything plus raw memoir and the personal context behind the work.", highlight: true },
              { name: "The Partner", price: "$50/mo", desc: "Full access, monthly live Q&A, and direct message access.", highlight: false },
            ].map((t) => (
              <div
                key={t.name}
                className={`relative p-8 transition-all duration-300 hover:-translate-y-px ${t.highlight ? "bg-carbon" : "bg-obsidian"}`}
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
