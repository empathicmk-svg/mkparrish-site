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
import { STRIPE_REWRITE } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Company Repositioning — MK Parrish",
  description:
    "Strategic repositioning for companies in transition. Pivots, relaunches, new market entry, new category plays. When the old story no longer fits, this is the work.",
};

const faqItems = [
  {
    q: "Who is Next Chapter repositioning for?",
    a: "Companies in genuine strategic transition. Product pivots, market repositioning, rebrands, post-acquisition integration, new category plays, or any moment where the old story is actively misleading potential customers and partners. If the business has changed faster than the language describing it, this is where we start.",
  },
  {
    q: "How is this different from the brand messaging page?",
    a: "Brand messaging is about sharpening how you describe what you already do. Next Chapter is for companies making a significant strategic shift — entering a new market, repositioning for enterprise, moving upmarket, or building toward a category you do not yet own. The work is more structural and more narrative-driven.",
  },
  {
    q: "What does a Next Chapter engagement look like?",
    a: "It starts with a strategy session where I understand what is actually changing and why — not just the surface version. From there we develop a positioning strategy, rewrite the key surfaces that need to reflect the new direction, and build the copy that earns the right kind of attention from the right market.",
  },
  {
    q: "Can you help if we are still figuring out the new direction?",
    a: "Yes. Sometimes the writing process helps clarify the thinking. I work with companies at the edge of transition, not just ones that have already landed. If the strategy is still forming and you need someone to think through it before the copy starts, that is a legitimate place to start.",
  },
  {
    q: "How long does a full engagement take?",
    a: "Typically three to four weeks from our first session to final deliverables. Larger scopes — full team positioning, complete website, and messaging framework — can run six weeks. Timeline is set together at the start.",
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
            Repositioning &middot; Market Transition &middot; Category Strategy
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
            Your company is not what it was when you wrote that homepage. You have pivoted the product, entered a new market, closed a funding round, or shifted the entire strategy. The copy is still describing the old version. I write the language for where you are actually going.
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
              What a misaligned story{" "}
              <span className="text-petal">actually costs.</span>
            </H2>
            <H3Script>It is not the pivot. It is what it sounds like while you cross it.</H3Script>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke">
            <p>
              Strategic transitions are expensive when the market cannot tell what you are doing. When your website describes the old product and your deck describes the new strategy. When buyers from the right category cannot find you because the copy still belongs to the market you have already left.
            </p>
            <p>
              This is not repositioning for the sake of having a better brand. It is precision. Finding the language that connects what you have built to where you are going — and writing it in a way that makes the arc feel intentional, not improvised.
            </p>
            <p>
              I have done this work across product pivots, market repositioning, company relaunches, and new category plays. The challenge is never inventing a new story. It is finding the real thread between what exists and where it is going, and writing it clearly enough that the right market can follow.
            </p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={1} />

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>Repositioning services</Eyebrow>
        <H2>
          Choose your{" "}
          <span className="text-petal">entry point.</span>
        </H2>

        <div className="mt-12 grid gap-px bg-graphite lg:grid-cols-2">
          <ServiceCard
            tag="Core repositioning"
            title="The Rewrite"
            price="From $2,500"
            desc="Your new direction, written. Core positioning narrative, homepage, and primary messaging rebuilt to reflect the company you are running now — not the one you launched with. Not a polish of the old story. A replacement of it."
            perks={[
              "New positioning narrative",
              "Homepage copy overhaul",
              "Brand voice direction",
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
            desc="For pivots, relaunches, and new category plays where updating the homepage is not going to be enough. Positioning strategy, complete website copy, messaging framework, and every surface that needs to reflect where the company is going — built together."
            perks={[
              "Full positioning and messaging strategy",
              "Complete website copy",
              "Category and market narrative",
              "Press, pitch deck, and outreach copy",
            ]}
            cta="Let's Talk"
            href="/book"
          />
        </div>
      </RevealSection>

      <QuoteDivider index={6} />

      {/* ── TRANSITION TYPES ─────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="03">
        <Eyebrow>What this covers</Eyebrow>
        <H2>
          Transitions I have{" "}
          <span className="text-petal">written through.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Product Pivots", desc: "When the product fundamentally changes direction. Rewriting the story so the new positioning makes the pivot feel like the obvious move, not a reset." },
            { title: "New Market Entry", desc: "Moving upmarket, entering enterprise, or targeting a new vertical. Building the messaging that earns credibility with a buyer who did not know you existed yet." },
            { title: "Post-Funding Repositioning", desc: "After a Series A or B, when the company needs to grow into its new category and the old scrappy messaging no longer matches the ambition or the ask." },
            { title: "Category Creation", desc: "Building toward a market position no one owns yet. Naming the category, writing the manifesto, and creating the language that makes you the obvious reference point." },
            { title: "Post-Acquisition Integration", desc: "Merging brands, aligning messaging, and writing a coherent story about a combined company for buyers who know one side but not the other." },
            { title: "The Strategic Relaunch", desc: "Companies that have been around long enough to have out-built their original positioning. Rebuilding the language from the current reality, not the original pitch." },
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
            <span className="text-petal">starts with a strategy call.</span>
          </H2>
          <p className="mx-auto mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            Tell me where the company is and where it is going. We will figure out the right scope from there.
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
