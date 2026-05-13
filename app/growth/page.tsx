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
  ServiceCard,
  FAQ,
} from "@/app/components/ui";
import {
  STRIPE_CONTENT_ENGINE,
  STRIPE_INBOUND_SYSTEM,
  STRIPE_REVENUE_SYSTEMS,
} from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Revenue Systems — MK Parrish",
  description:
    "LinkedIn content engines, high-converting lead magnets, and end-to-end RevOps. Pipeline is the product. Build the machine, not just the content.",
};

const tiers = [
  {
    tag: "Growth Tier",
    title: "LinkedIn Content Engine",
    price: "From $2,500/mo",
    desc: "Build authority, brand awareness, and consistent organic pipeline. A fully managed LinkedIn presence engineered to function as the top of your conversion funnel.",
    perks: [
      "Complete LinkedIn profile optimization for executive and founder accounts",
      "3–5 high-value posts written and scheduled weekly",
      "1x custom inbound lead magnet per quarter (PDF, checklist, or mini-course)",
      "Ghostwriting, editing, and custom visual assets and carousels",
    ],
    cta: "Launch Your Engine",
    href: STRIPE_CONTENT_ENGINE,
    highlight: false,
  },
  {
    tag: "Most Popular",
    title: "The Inbound System",
    price: "From $5,000/mo",
    desc: "Fully integrated content, automated lead generation, and nurturing systems. Content without infrastructure is noise. This closes the loop between audience and pipeline.",
    perks: [
      "Everything in the LinkedIn Content Engine",
      "High-converting lead magnet strategy and design (quizzes, whitepapers, toolkits)",
      "Custom landing page or Framer-optimized lead capture flow",
      "Automated 3–5 email nurture sequence built to convert",
      "Weekly lead tracking and pipeline reporting",
    ],
    cta: "Build My Pipeline",
    href: STRIPE_INBOUND_SYSTEM,
    highlight: true,
  },
  {
    tag: "Enterprise",
    title: "E2E Revenue Systems",
    price: "Custom",
    desc: "Full-funnel Revenue Operations, deep CRM integration, and infrastructure built to scale globally. This is not a service. It is an operating system for your entire revenue motion.",
    perks: [
      "Everything in The Inbound System",
      "Complete CRM architecture and solution design (HubSpot, Salesforce, or Pipedrive)",
      "End-to-end automation: Marketing → Sales Hub → Onboarding",
      "Advanced revenue analytics, attribution modeling, and forecast accuracy dashboards",
      "Custom API development and third-party stack orchestration",
    ],
    cta: "Scale Globally",
    href: STRIPE_REVENUE_SYSTEMS,
    highlight: false,
  },
];

const faqItems = [
  {
    q: "What makes this different from a standard content agency?",
    a: "Most agencies produce content. This builds systems. The LinkedIn Content Engine is not ghostwriting with a strategy deck attached — it is a pipeline asset. Every post is engineered to drive inbound. Every lead magnet is built to convert. The Inbound System closes the loop between content and pipeline with automation most agencies do not touch. The output is not impressions. It is pipeline.",
  },
  {
    q: "Do I need to already be active on LinkedIn?",
    a: "No. Every engagement starts with a full profile audit and repositioning. If your LinkedIn is three years out of date, that is the first thing fixed. The engine works whether you are starting from zero authority or scaling an existing audience into a demand generation machine.",
  },
  {
    q: "How long before I see pipeline results?",
    a: "Typically 60–90 days for measurable inbound from the Content Engine, 30–45 days for lead capture from the Inbound System once the capture flow is live. E2E Revenue Systems have a longer build window but produce compounding returns. Pipeline is tracked and reported weekly — you always know exactly what is moving and what is not.",
  },
  {
    q: "What CRMs do you work with?",
    a: "HubSpot, Salesforce, and Pipedrive natively. We can also architect on top of Monday.com, Notion, Airtable, or any API-accessible platform. Custom stack orchestration and third-party integration is part of the E2E Revenue Systems tier.",
  },
  {
    q: "Can I start with one tier and scale up?",
    a: "Yes. Most clients start with the LinkedIn Content Engine, prove out the inbound motion, and layer in the full Inbound System once the content is converting. E2E Revenue Systems is typically for companies already generating consistent inbound who need full-funnel automation, CRM architecture, and attribution before they can scale further.",
  },
  {
    q: "Is this only for B2B companies?",
    a: "Primarily. The LinkedIn-led inbound model and RevOps infrastructure is built for B2B sales cycles — founders, executives, and revenue teams with deal sizes that justify the investment. If you are selling consumer products or have an average deal size under $1,000, this is probably not the right fit. Say so in the discovery call and I will tell you honestly.",
  },
];

export default function GrowthPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[75vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Revenue Systems &middot; LinkedIn Growth &middot; RevOps
          </p>
          <div className="mt-6">
            <H1>
              Pipeline{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                Is The
              </span>
              <br />
              Product.
            </H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Build the machine, not just the content.
          </p>
          <div className="mt-6 max-w-2xl">
            <p className="font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
              Most companies produce content. Few build systems. The difference shows up in the pipeline — or the lack of one. I design, build, and run the inbound infrastructure that turns LinkedIn presence and lead magnets into compounding revenue.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href="#systems">See the Systems</BtnPrimary>
            <BtnGhost href="/book">Book a Discovery Call</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>The gap</Eyebrow>
            <H2>
              Content without{" "}
              <span className="text-petal">infrastructure</span>{" "}
              is noise.
            </H2>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
            <p>
              You are posting. You are showing up. The impressions are there. And the pipeline is not moving.
            </p>
            <p>
              That is not a content problem. It is a systems problem. Content without a lead capture mechanism is awareness that evaporates. A lead magnet without a nurture sequence is a list that never converts. A CRM without attribution modeling is a database you cannot make decisions from.
            </p>
            <p>
              The companies winning on LinkedIn right now are not the ones posting the most. They are the ones with a machine behind the content — a structured path from first impression to qualified conversation to closed revenue.
            </p>
            <p>
              That machine is what I build.
            </p>
            <div className="mt-8">
              <ArrowLink href="/book">Book a strategy call</ArrowLink>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={0} />

      {/* ── THREE FAILURE MODES ──────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>Where most companies break</Eyebrow>
        <H2>
          Three failure modes that{" "}
          <span className="text-petal">kill pipeline.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {[
            {
              num: "01",
              title: "Presence without conversion",
              desc: "A strong LinkedIn profile and consistent posting that never leads anywhere. No lead capture. No follow-up. No mechanism for turning an engaged follower into a conversation. Brand without revenue.",
            },
            {
              num: "02",
              title: "Leads without nurture",
              desc: "A lead magnet that downloads but does not convert. Someone gave you their email and then heard nothing. No sequence. No positioning. No path to a meeting. A list that decays instead of compounds.",
            },
            {
              num: "03",
              title: "Revenue data without attribution",
              desc: "A CRM full of contacts with no clear story of how they got there or which activities drove them. Marketing spends money. Sales closes deals. Nobody can connect the two. Forecasting is guesswork.",
            },
          ].map((item) => (
            <div key={item.num} className="bg-obsidian p-8">
              <p className="font-mono text-xs tracking-[0.2em] text-iron">{item.num}</p>
              <h3 className="mt-5 font-display text-2xl uppercase tracking-[0.02em] text-petal">{item.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={3} />

      {/* ── TIERS ────────────────────────────────────────────────── */}
      <RevealSection id="systems" bg="obsidian" num="03">
        <Eyebrow>Revenue systems</Eyebrow>
        <H2>
          Three ways to build{" "}
          <span className="text-petal">the machine.</span>
        </H2>
        <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke">
          Start where the gap is. Scale when the system proves itself. Every tier builds on the last.
        </p>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {tiers.map((t) => (
            <ServiceCard key={t.title} {...t} />
          ))}
        </div>

        <div className="mt-10 border-t border-graphite pt-8">
          <p className="font-body text-sm font-light text-smoke">
            All engagements start with a discovery call. No contracts without a fit conversation first.
          </p>
          <a
            href="/book"
            className="mt-4 inline-block font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal transition-colors hover:text-blush"
          >
            Book a discovery call &rarr;
          </a>
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <RevealSection bg="void" num="04">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>The process</Eyebrow>
            <H2>
              How the{" "}
              <span className="text-petal">system gets built.</span>
            </H2>
            <H3Script>Infrastructure first. Content second. Pipeline always.</H3Script>
          </div>
          <div className="space-y-px bg-graphite">
            {[
              { step: "01", title: "Audit and Architecture", desc: "Current LinkedIn presence, CRM state, lead capture mechanisms (or lack of them), and content history reviewed in full. The gap between where you are and where the pipeline needs to be is mapped precisely before anything is built." },
              { step: "02", title: "Build the Capture Layer", desc: "Lead magnets designed to convert the audience you are building. Landing pages and opt-in flows built to remove friction. Positioned with copy that does the qualifying before the sales conversation starts." },
              { step: "03", title: "Content Engine Goes Live", desc: "LinkedIn profile repositioned. The first posts built. The cadence established. Content written in your voice, engineered to drive the right inbound — not impressions, not followers. Conversations." },
              { step: "04", title: "Automate the Nurture", desc: "Email sequences built to take someone from download to meeting-ready. CRM automation maps the full journey. Leads do not fall through the gaps because there are no gaps." },
              { step: "05", title: "Measure and Compound", desc: "Pipeline tracked weekly. Attribution modeled. What is working gets scaled. What is not gets cut. The system compounds over time because every iteration is informed by data, not instinct." },
            ].map((item) => (
              <div key={item.step} className="bg-obsidian p-8">
                <div className="flex items-start gap-6">
                  <p className="w-10 flex-shrink-0 font-mono text-xs tracking-[0.2em] text-petal">{item.step}</p>
                  <div>
                    <h3 className="font-display text-xl uppercase tracking-[0.02em] text-pearl">{item.title}</h3>
                    <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={5} />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="05">
        <Eyebrow>Common questions</Eyebrow>
        <H2>
          What you{" "}
          <span className="text-petal">need to know.</span>
        </H2>
        <div className="mt-12">
          <FAQ items={faqItems} />
        </div>
      </RevealSection>

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
            <H2>
              Fix the story.{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.3)" }}>
                Fix the funnel.
              </span>
            </H2>
          </div>
          <p className="mx-auto mt-8 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            A 30-minute discovery call to map the gap and identify which system fits where you are right now.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href="/book">Book a Discovery Call</BtnPrimary>
            <BtnGhost href="/contact">Get in Touch</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
