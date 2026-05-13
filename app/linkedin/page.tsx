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
import { STRIPE_CONTENT_ENGINE } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "LinkedIn Content Engine — MK Parrish",
  description:
    "Fully managed LinkedIn ghostwriting, profile optimization, and lead magnet creation for founders and executives building organic pipeline.",
};

const contentTypes = [
  {
    label: "Authority Posts",
    desc: "Strategic long-form posts that demonstrate domain expertise, attract the right audience, and position you as the person worth following in your space.",
  },
  {
    label: "Engagement Hooks",
    desc: "Short-form, high-engagement openers engineered to stop the scroll. Written to spark conversation with the exact decision-makers you want in your pipeline.",
  },
  {
    label: "Case Study Formats",
    desc: "Before/after and result-driven narratives built from your real client work. The social proof that makes prospects see themselves in the outcome.",
  },
  {
    label: "Thought Leadership Essays",
    desc: "700–1,200 word pieces that go deep on a single insight. The content that gets shared in Slack threads and forwarded to founders.",
  },
  {
    label: "Carousels & Visual Assets",
    desc: "Custom-designed scroll-stopping carousels and branded visual posts. Frameworks and processes made visual so they spread beyond your existing audience.",
  },
  {
    label: "Profile & Banner Copy",
    desc: "Headline, About section, and featured content rewritten to function as a landing page — converting profile visitors into inbound leads before they ever message you.",
  },
];

const whoItsFor = [
  { title: "Founders building inbound", desc: "You are the brand. Your LinkedIn is the top of your funnel. Every day you are not publishing strategically is a day competitors are." },
  { title: "Executives building authority", desc: "Your title opens doors. Your content keeps them open. A consistent LinkedIn presence compounds your professional reputation faster than any other channel." },
  { title: "Revenue teams needing pipeline", desc: "Sales-led content written to attract the buyers your team already closes. LinkedIn is the highest-intent B2B channel — most companies are leaving it untouched." },
  { title: "Professionals repositioning", desc: "Your next chapter needs an audience that already sees you as who you are becoming. The content engine builds that audience before the move, not after." },
];

export default function LinkedInPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[75vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            LinkedIn Ghostwriting &middot; Profile Optimization &middot; Lead Magnets
          </p>
          <div className="mt-6">
            <H1>
              Your LinkedIn{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                Is The
              </span>
              <br />
              Funnel.
            </H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Most profiles look like résumés. Yours will work like a pipeline.
          </p>
          <div className="mt-6 max-w-2xl">
            <p className="font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
              A fully managed LinkedIn presence for founders and executives who want inbound conversations, not just impressions. Written in your voice. Built around your expertise. Engineered to attract the people worth talking to.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href={STRIPE_CONTENT_ENGINE}>Launch Your Engine</BtnPrimary>
            <BtnGhost href="/linkedin-capabilities.pdf" target="_blank">Download the One-Pager</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>The gap</Eyebrow>
            <H2>
              Posting is not{" "}
              <span className="text-petal">a strategy.</span>
            </H2>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
            <p>
              Most LinkedIn content gets written the same way. A thought occurs. A post goes up. It collects a few likes from people who already know you. Nothing enters the pipeline.
            </p>
            <p>
              That is not a LinkedIn problem. It is a strategy problem. Inconsistent posting without positioning produces noise. Noise does not build authority. Authority is what converts.
            </p>
            <p>
              The LinkedIn Content Engine is not a ghostwriting retainer. It is a pipeline asset. Every post has a purpose. Every piece of content is part of a system designed to move the right people from follower to conversation to client.
            </p>
            <div className="mt-8">
              <ArrowLink href="/book">Book a strategy call</ArrowLink>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={1} />

      {/* ── WHAT'S INCLUDED ──────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>What is built</Eyebrow>
        <H2>
          Six content types.{" "}
          <span className="text-petal">One cohesive engine.</span>
        </H2>
        <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
          Every format serves a different role in the funnel. Together they build an audience and convert it.
        </p>

        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {contentTypes.map((ct) => (
            <div key={ct.label} className="bg-obsidian p-8 transition-all duration-300 hover:bg-carbon" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-petal">{ct.label}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{ct.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── DELIVERABLES ─────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="03">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Every month</Eyebrow>
            <H2>
              What you get{" "}
              <span className="text-petal">delivered.</span>
            </H2>
            <H3Script>Consistent. On-brand. Built to compound.</H3Script>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href={STRIPE_CONTENT_ENGINE}>Start at $2,500/mo</BtnPrimary>
            </div>
          </div>
          <div className="space-y-px bg-graphite">
            {[
              { num: "01", item: "LinkedIn profile optimization", detail: "Headline, About section, featured links, and banner rewritten to function as a conversion surface, not a job listing." },
              { num: "02", item: "12–20 posts per month", detail: "3–5 posts per week across authority, engagement, and case study formats. Written in your voice. Scheduled and published for you." },
              { num: "03", item: "1x quarterly lead magnet", detail: "A PDF, checklist, mini-course, or toolkit engineered to capture the email addresses of your best-fit audience." },
              { num: "04", item: "Custom visual assets", detail: "Carousels, branded quote graphics, and cover images. Designed to match your positioning and stop the scroll." },
              { num: "05", item: "Monthly strategy review", detail: "What is performing. What is not. What changes next month. Data-informed decisions, not gut-feel adjustments." },
            ].map((row) => (
              <div key={row.num} className="flex gap-6 bg-carbon p-7">
                <p className="w-8 flex-shrink-0 font-mono text-xs tracking-[0.2em] text-petal pt-0.5">{row.num}</p>
                <div>
                  <p className="font-body text-sm font-semibold uppercase tracking-[0.12em] text-pearl">{row.item}</p>
                  <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">{row.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={3} />

      {/* ── WHO IT'S FOR ─────────────────────────────────────────── */}
      <RevealSection bg="void" num="04">
        <Eyebrow>Right fit</Eyebrow>
        <H2>
          Who this{" "}
          <span className="text-petal">is built for.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2">
          {whoItsFor.map((w) => (
            <div key={w.title} className="bg-obsidian p-8">
              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{w.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{w.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={4} />

      {/* ── SCALE UP ─────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="05">
        <Eyebrow>When you are ready to scale</Eyebrow>
        <H2>
          The content engine is{" "}
          <span className="text-petal">the first layer.</span>
        </H2>
        <div className="mt-10 grid gap-px bg-graphite md:grid-cols-2">
          <div className="bg-void p-8">
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-iron">Next step</p>
            <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-pearl">The Inbound System</h3>
            <p className="mt-2 font-display text-3xl text-white">From $5,000/mo</p>
            <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">
              Add the infrastructure that converts LinkedIn audience into pipeline. Lead capture flows, automated nurture sequences, and weekly pipeline reporting layered on top of the content engine.
            </p>
            <div className="mt-6">
              <ArrowLink href="/growth#systems">View full tier details</ArrowLink>
            </div>
          </div>
          <div className="bg-void p-8">
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-iron">Full scale</p>
            <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-pearl">E2E Revenue Systems</h3>
            <p className="mt-2 font-display text-3xl text-white">Custom</p>
            <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">
              CRM architecture, full-funnel automation, and attribution modeling. For companies that have proven the inbound motion and need the infrastructure to scale it without breaking it.
            </p>
            <div className="mt-6">
              <ArrowLink href="/growth#systems">View full tier details</ArrowLink>
            </div>
          </div>
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
              Your profile is being read{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.3)" }}>
                right now.
              </span>
            </H2>
          </div>
          <p className="mx-auto mt-8 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "50ch" }}>
            Someone looked you up today. What they found either opened a door or quietly closed one.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href={STRIPE_CONTENT_ENGINE}>Launch Your Engine</BtnPrimary>
            <BtnGhost href="/book">Book a Discovery Call</BtnGhost>
          </div>
          <div className="mt-6">
            <a
              href="/linkedin-capabilities.pdf"
              target="_blank"
              rel="noreferrer"
              className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ash transition hover:text-petal"
            >
              Download the capabilities one-pager &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
