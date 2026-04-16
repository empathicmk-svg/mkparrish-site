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
import { CALENDLY_URL, STRIPE_REWRITE, STRIPE_NEW_CHAPTER } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Rewrite Your Next Chapter — MK Parrish",
  description:
    "Full repositioning for career pivots, public reinventions, and next-era transitions. Strategic writing for people who are ready to be read differently.",
};

const faqItems = [
  {
    q: "Who is Next Chapter work for?",
    a: "People in genuine transition. Career pivots, industry switches, founders stepping out of the operator role, professionals moving into public work, people coming back after time away. If the old story no longer fits, this is where we start.",
  },
  {
    q: "How is this different from the career or brand pages?",
    a: "Career is for professional repositioning within a field. Brand is for businesses. Next Chapter is for people whose whole identity is shifting, not just their title. The work is more personal, more narrative-driven, and more focused on the through-line between who you were and who you are becoming.",
  },
  {
    q: "What does a Next Chapter engagement look like?",
    a: "It starts with an in-depth strategy session where I understand what is changing and why. From there we develop a positioning narrative, rewrite the key surfaces that need to reflect the new chapter, and build copy that earns the right kind of attention for where you are going.",
  },
  {
    q: "Do you work with people who are not sure what the next chapter is yet?",
    a: "Yes. Sometimes the writing helps clarify the thinking. I work with people at the edge of transition, not just people who have already made it. If you are in the middle of figuring it out, that is a fine place to start.",
  },
  {
    q: "How long does a full engagement take?",
    a: "Typically three to four weeks from our first session to final deliverables. Larger scopes can extend to six weeks. We set the timeline together based on what you need and when.",
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
            You are not who you were. The copy still is. We fix that by building a story that moves with you, not behind you.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href={CALENDLY_URL}>Start the Conversation</BtnPrimary>
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
              Transitions are expensive when no one can tell what you are doing. When your bio says one thing and your pitch says another. When people who should find you can not quite locate you because the copy belongs to a chapter you have already left.
            </p>
            <p>
              The work is not reinvention for the sake of it. It is precision. Finding the language that connects where you have been to where you are going, and writing it in a way that makes that arc feel inevitable, not improvised.
            </p>
            <p>
              I have done this myself more than once. I know what it feels like to be mid-transition and still pointing to the old version of your story. I know how to fix it.
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
            desc="Your new chapter, written. Core positioning narrative, primary bio, and LinkedIn updated to reflect the person you are now, not who you used to be."
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
            desc="For full pivots and public reinventions. Brand, website, founder story, and all the copy that needs to reflect who you are entering this next era as."
            perks={[
              "Full brand and messaging strategy",
              "Website copy from scratch",
              "Origin story and founder narrative",
              "Press, pitch deck, and outreach copy",
            ]}
            cta="Let's Talk"
            href={CALENDLY_URL}
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
            { title: "Career Pivots", desc: "From one industry or function to another. The thread between where you were and where you are going, written so it reads like inevitability." },
            { title: "From Operator to Founder", desc: "Leaving a corporate role to build your own. Reframing your experience as the foundation, not just the backstory." },
            { title: "Return After a Pause", desc: "Coming back after caregiving, illness, grief, or a deliberate break. Writing the gap as part of the story instead of something to explain away." },
            { title: "Into Public Work", desc: "Speaking, writing, advising, or consulting for the first time. Building a public identity that reflects your actual depth." },
            { title: "Post-Exit or Post-Acquisition", desc: "After a company exit, sale, or chapter close. Figuring out what comes next and what story to tell while you do." },
            { title: "The Second Act", desc: "Midlife repositioning. For people who have more clarity now than they did at 30 and want the world to finally see it." },
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
              <ArrowLink href={CALENDLY_URL}>Schedule a call</ArrowLink>
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
            <BtnPrimary href={CALENDLY_URL}>Book a Call</BtnPrimary>
            <BtnGhost href={STRIPE_REWRITE}>Start The Rewrite</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
