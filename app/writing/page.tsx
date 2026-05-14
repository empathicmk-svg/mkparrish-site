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
} from "@/app/components/ui";
import { PATREON_URL } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Writing — MK Parrish",
  description:
    "MK Parrish writes — not just strategizes. Poetry, memoir, brand copy, and ghostwritten work from the writer behind 200+ client reinventions. This is what the voice sounds like.",
};

const MIRAGE: string[][] = [
  [
    "‘Wake up,’ the world said —",
    "and the curtain of bliss she had mistaken for a veil",
    "fell clean from her face.",
  ],
  [
    "Above her, a spider stood sentinel,",
    "pinning its deadly web in place —",
    "and caught in the silk, a girl",
    "who thought she knew.",
    "She choked on the words she once carried",
    "like gospel, like grace.",
  ],
  [
    "The girl who had begun to dream",
    "now stood still and watched each scene",
    "unspool without her —",
    "a puppet waiting on the string,",
    "lungs full and breathless all the same,",
    "unable to move,",
    "unable to claim",
    "the control,",
    "the power,",
    "the feeling of freedom —",
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
    "still as driftwood, dense as stone —",
    "once a girl with fire in the margins,",
    "now a life that felt like someone else’s loan.",
  ],
  [
    "How does a woman who wanted everything",
    "end up owing herself nothing?",
    "How does the one who dreamed the loudest",
    "become the one afraid of her own voice?",
  ],
  [
    "She wanted to rewrite the ending —",
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
      {/* ── HERO ── */}
      <section className="relative flex min-h-[85vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <Eyebrow>The Craft</Eyebrow>
          <div className="mt-4">
            <H1>
              The person<br />
              who writes<br />
              <span className="text-petal">your story</span><br />
              actually writes.
            </H1>
          </div>
          <p className="mt-8 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "58ch" }}>
            Most brand strategists never write a word of their own. MK Parrish does. Poetry,
            memoir, ghostwritten executive content, and brand copy — all from the same voice.
            What you see here is what you get when you hire her.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            {[
              "200+ clients rewritten",
              "Poetry published",
              "Ghostwriting, brand copy, memoir",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-1 w-1 bg-petal" />
                <span className="font-body text-xs font-light text-smoke">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href="/book">Work With MK</BtnPrimary>
            <BtnGhost href="/shop">Shop the Writing</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── WHY THIS MATTERS ── */}
      <RevealSection bg="obsidian">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Why the writing matters</Eyebrow>
            <H2>
              Voice is not{" "}
              <span className="text-petal">a strategy.</span>
            </H2>
            <H3Script>It's a practice.</H3Script>
          </div>
          <div className="space-y-6 font-body text-base font-light leading-8 text-smoke">
            <p>
              The reason MK&apos;s clients say their copy finally sounds like them is not
              because she follows a framework. It&apos;s because she writes constantly —
              poems, essays, memoir, brand voice documents, ghostwritten columns — and
              that practice is what makes her ear for language precise enough to work
              with someone else&apos;s.
            </p>
            <p>
              You cannot fake that kind of attunement. You develop it by doing the work
              privately, for years, before anyone pays you to do it for them.
            </p>
            <p>
              What you see on this page is the proof of practice. The same voice that
              writes your LinkedIn profile writes its own poetry. That is not
              incidental. That is the whole thing.
            </p>
          </div>
        </div>

        {/* Writing types */}
        <div className="mt-16 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              type: "Poetry",
              desc: "Published and performed. The core of the voice — where economy of language and emotional precision meet.",
              link: "#mirage",
              cta: "Read Mirage →",
            },
            {
              type: "Memoir",
              desc: "Long-form essays and raw narrative inside The Margins — the writing that never goes to a public feed.",
              link: PATREON_URL,
              cta: "Read in The Margins →",
            },
            {
              type: "Brand Copy",
              desc: "Bios, LinkedIn profiles, website copy, and positioning statements for 200+ founders and executives.",
              link: "/shop/write-yourself-into-the-room",
              cta: "Get the guide →",
            },
            {
              type: "Ghostwriting",
              desc: "Executive voice capture and ongoing content for founders who write under their own name.",
              link: "/shop/the-byline-method",
              cta: "See the method →",
            },
          ].map((item) => (
            <div key={item.type} className="flex flex-col bg-obsidian p-8">
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-iron">
                Writing Type
              </p>
              <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">
                {item.type}
              </h3>
              <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">
                {item.desc}
              </p>
              <a
                href={item.link}
                className="mt-6 font-body text-xs font-bold uppercase tracking-[0.2em] text-petal/60 transition-colors hover:text-petal"
              >
                {item.cta}
              </a>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={8} />

      {/* ── MIRAGE — FEATURED POEM ── */}
      <RevealSection bg="void" num="01" id="mirage">
        <div className="grid gap-16 lg:grid-cols-[280px_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Featured Poem</Eyebrow>
            <H2>Mirage</H2>
            <p className="mt-5 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "28ch" }}>
              On waking up mid-life, losing yourself, and the long climb back to choosing to begin.
            </p>
            <p className="mt-4 font-body text-xs font-light leading-6 text-iron" style={{ maxWidth: "28ch" }}>
              This poem has been shared by thousands of women navigating identity transitions, career pivots, and reinvention. It is what the brand voice work is actually about.
            </p>
            <div className="mt-8 space-y-3">
              <BtnPrimary href="/shop">Shop the Writing</BtnPrimary>
              <div className="pt-1">
                <ArrowLink href={PATREON_URL}>More in The Margins</ArrowLink>
              </div>
            </div>
          </div>

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
              <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.2em] text-ash">
                What this means for your brand
              </p>
              <p className="mb-6 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "52ch" }}>
                The writers who rewrite your story best are the ones who have done the work themselves.
                Not borrowed a framework. Not templated the feeling. Done it — and survived it — in their own life.
                That is what you are hiring when you hire MK.
              </p>
              <div className="flex flex-wrap gap-4">
                <BtnPrimary href="/book">Book a Strategy Call</BtnPrimary>
                <ArrowLink href="/shop/the-rewrite-playbook">Get the Rewrite Playbook</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={19} />

      {/* ── WHAT THE WRITING DOES ── */}
      <RevealSection bg="obsidian" num="02">
        <Eyebrow>The commercial translation</Eyebrow>
        <H2>
          Poetry that{" "}
          <span className="text-petal">pays for itself.</span>
        </H2>
        <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "58ch" }}>
          Every skill in the writing above shows up directly in client work. This is not creative
          indulgence. This is how you build the kind of language precision that actually changes
          what someone&apos;s copy does for them.
        </p>

        <div className="mt-12 space-y-px bg-graphite">
          {[
            {
              skill: "Economy of language",
              poem: "Developed writing lines like: "She just wanted to begin."",
              client: "Translates to bios and headlines that say everything in six words instead of sixty.",
            },
            {
              skill: "Emotional precision",
              poem: "Writing about loss, identity, and reinvention from the inside — not as an observer.",
              client: "Makes brand copy feel true instead of marketed. Readers recognize themselves in it.",
            },
            {
              skill: "Voice capture",
              poem: "Years of developing a distinct, unmistakable personal voice in multiple formats.",
              client: "Enables ghostwriting that sounds like the principal — not like a hired writer.",
            },
            {
              skill: "Narrative architecture",
              poem: "Structuring long-form poems that build, turn, and land — across hundreds of lines.",
              client: "Builds LinkedIn profiles, about pages, and pitch narratives that actually move people.",
            },
          ].map((row) => (
            <div key={row.skill} className="grid gap-6 bg-obsidian p-8 lg:grid-cols-[200px_1fr_1fr]">
              <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl self-start pt-0.5">
                {row.skill}
              </p>
              <div>
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-iron mb-2">In the writing</p>
                <p className="font-body text-sm font-light leading-7 text-smoke">{row.poem}</p>
              </div>
              <div>
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-petal/60 mb-2">In client work</p>
                <p className="font-body text-sm font-light leading-7 text-smoke">{row.client}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <BtnPrimary href="/book">Book a Strategy Call</BtnPrimary>
          <BtnGhost href="/shop">Shop the Writing</BtnGhost>
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── THE MARGINS CTA ── */}
      <RevealSection bg="void">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>The private work</Eyebrow>
            <H2>
              The writing{" "}
              <span className="text-petal">goes deeper.</span>
            </H2>
            <H3Script>The Margins is where the real work lives.</H3Script>
            <div className="mt-8 space-y-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
              <p>
                What you see on this page is the public layer. Inside The Margins: longer memoir,
                the unfiltered writing from the actual reinvention, strategy essays, and raw
                frameworks from client work — the writing that does not get cleaned up for a
                public feed.
              </p>
              <p>
                For the founders, executives, and women in transition who want to understand how
                the voice behind 200+ rewrites actually thinks — and write.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href={PATREON_URL}>Join The Margins</BtnPrimary>
              <ArrowLink href="/margins">See membership tiers</ArrowLink>
            </div>
          </div>

          <div className="flex flex-col gap-px">
            {[
              { name: "Soft Cover",    price: "$5/mo",  desc: "Weekly essays and strategy notes that never go to the public feed.", highlight: false },
              { name: "Marked Up",     price: "$12/mo", desc: "Everything in Soft Cover plus raw frameworks from client work.", highlight: true },
              { name: "First Edition", price: "$28/mo", desc: "Full access, monthly live Q&A, and direct message access.", highlight: false },
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
