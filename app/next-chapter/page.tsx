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
  FAQ,
  ServiceCard,
} from "@/app/components/ui";
import { STRIPE_REWRITE, STRIPE_NEW_CHAPTER } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Rewrite Your Next Chapter — MK Parrish",
  description:
    "Full repositioning for career pivots, public reinventions, and next-era transitions. Strategic writing for people who are ready to be read differently.",
};

const faqItems = [
  {
    q: "Who is Next Chapter work for?",
    a: "People in genuine transition. Career pivots, industry switches, founders stepping out of the operator role, professionals moving into public work, executives coming back after time away. If the old story no longer fits who you are now, this is where we start.",
  },
  {
    q: "How is this different from the career or brand pages?",
    a: "Career repositioning is for professionals moving within their field. Brand is for businesses. Next Chapter is for people whose entire identity is shifting, not just their title or their homepage. The work is more personal, more narrative-driven, and focused on the thread that makes the whole arc make sense.",
  },
  {
    q: "What does a Next Chapter engagement look like?",
    a: "It starts with a strategy session where I understand what is actually changing and why, not just the surface version. From there we develop a positioning narrative, rewrite the key surfaces that need to reflect the new chapter, and build copy that earns the right kind of attention for where you are going.",
  },
  {
    q: "Do you work with people who are not sure what the next chapter is yet?",
    a: "Yes. Sometimes the writing process helps clarify the thinking. I work with people at the edge of transition, not just people who have already landed on the other side. If you are mid-crossing and the story is still forming, that is a completely legitimate place to start.",
  },
  {
    q: "How long does a full engagement take?",
    a: "Typically three to four weeks from our first session to final deliverables. Larger scopes can run six weeks. Timeline is set together at the start and depends on what needs to be built and how quickly you need it.",
  },
];

export default function NextChapterPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[75vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[55vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Reinvention &middot; Transition &middot; Positioning
          </p>
          <div className="mt-6">
            <H1>
              Rewrite Your{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                Next Chapter
              </span>
            </H1>
          </div>
          <p className="mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            You are not who you were when you wrote that bio. The copy still is. That mismatch costs you credibility with every person who looks you up mid-transition. We fix it by building a story that reflects where you are going, not where you have been.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href="/book">Start the Conversation</BtnPrimary>
            <BtnGhost href={STRIPE_REWRITE}>Buy The Rewrite</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── THE WORK ─────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>The shift</Eyebrow>
            <H2>
              What transition{" "}
              <span className="text-petal">actually costs you.</span>
            </H2>
            <H3Script>It is not the gap. It is the silence while you cross it.</H3Script>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke">
            <p>
              Transitions are expensive when no one can tell what you are doing. When your bio says one thing and your LinkedIn says something older. When people who should find you cannot quite locate you because the copy belongs to a chapter you have already left.
            </p>
            <p>
              This is not reinvention for the sake of having a better brand. It is precision. Finding the language that connects what you have built to where you are going, and writing it in a way that makes the arc feel intentional, not improvised.
            </p>
            <p>
              I have reinvented myself more than once. Fortune 50 to startups. Operator to strategist. I know what it feels like to be mid-crossing with a story that belongs to the last shore. And I know how to write through it.
            </p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={1} />

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>Next Chapter services</Eyebrow>
        <H2>
          Choose your{" "}
          <span className="text-petal">entry point.</span>
        </H2>

        <div className="mt-12 grid gap-px bg-graphite lg:grid-cols-2">
          <ServiceCard
            tag="Deep repositioning"
            title="The Rewrite"
            price="From $1,500"
            desc="Your new chapter, written. Core positioning narrative, primary bio, and LinkedIn rebuilt to reflect who you are now and where you are going. Not a polish of the old story. A replacement of it."
            perks={[
              "Positioning narrative for the new chapter",
              "LinkedIn overhaul",
              "Professional bio rewrite",
              "45-minute strategy session",
            ]}
            cta="Start The Rewrite"
            href={STRIPE_REWRITE}
            highlight
          />
          <ServiceCard
            tag="Full build"
            title="The New Chapter"
            price="Custom"
            desc="For full pivots and public reinventions where updating a bio is not going to be enough. Brand strategy, website copy, founder narrative, and every surface that needs to reflect who you are stepping into, built together."
            perks={[
              "Full brand and messaging strategy",
              "Website copy from scratch",
              "Origin story and founder narrative",
              "Press, pitch deck, and outreach copy",
            ]}
            cta="Let's Talk"
            href="/book"
          />
        </div>
      </RevealSection>

      <QuoteDivider index={6} />

      {/* ── WHAT TRANSITIONS LOOK LIKE ───────────────────────────── */}
      <RevealSection bg="obsidian" num="03">
        <Eyebrow>Who this is for</Eyebrow>
        <H2>
          Transitions I have{" "}
          <span className="text-petal">written through.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Career Pivots", desc: "From one industry or function to another. The connective tissue between where you have been and where you are going, written so the shift reads as deliberate, not desperate." },
            { title: "From Operator to Founder", desc: "Leaving a corporate role to build something of your own. Reframing 10 or 20 years of someone else's work as the foundation for yours." },
            { title: "Return After a Pause", desc: "Coming back after caregiving, illness, grief, or a deliberate step away. Writing the gap as part of the story instead of something to minimize or explain around." },
            { title: "Into Public Work", desc: "Speaking, writing, advising, or consulting publicly for the first time. Building a presence that reflects the depth you already have, before someone else defines it for you." },
            { title: "Post-Exit or Post-Acquisition", desc: "After a company exit, a sale, or a chapter close. Figuring out what the next thing is and how to talk about who you are in the space between." },
            { title: "The Second Act", desc: "Midlife repositioning. For people who have more clarity, range, and specific conviction now than they did at 30, and want the world to finally read it that way." },
          ].map((item) => (
            <div key={item.title} className="bg-obsidian p-8">
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-petal">{item.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={7} />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <RevealSection bg="void" num="04">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <H2>Before we begin.</H2>
            <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">
              Not here? Book a call. No pitch, just clarity.
            </p>
            <div className="mt-6">
              <ArrowLink href="/book">Schedule a call</ArrowLink>
            </div>
          </div>
          <FAQ items={faqItems} />
        </div>
      </RevealSection>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-obsidian" style={{ padding: "clamp(4rem, 8vw, 8rem) 0" }}>
        <div className="mx-auto max-w-[1400px] text-center" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <H2>
            The next chapter{" "}
            <span className="text-petal">starts with a sentence.</span>
          </H2>
          <p className="mx-auto mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            Let's find the right one.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href="/book">Book a Call</BtnPrimary>
            <BtnGhost href={STRIPE_REWRITE}>Start The Rewrite</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
