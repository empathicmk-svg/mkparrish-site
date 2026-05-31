import type { Metadata } from "next";
import Link from "next/link";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2, H3Script,
  BtnPrimary, ArrowLink, FAQ,
} from "@/app/components/ui";

export const metadata: Metadata = {
  title: "How I Work — MK Parrish",
  description:
    "The process, the companies I do my best work with, and proof of what repositioning changes. One senior operator, no agency layers.",
};

const clientTypes = [
  { num: "01", title: "B2B SaaS", desc: "You have product-market fit, but your homepage still reads like a seed-stage pitch. Your pipeline tells a sharper story than your copy does." },
  { num: "02", title: "Agencies & Consultants", desc: "You need a senior partner who owns the brief, runs the function, and ships without hand-holding. Not a vendor — someone who thinks like a principal." },
  { num: "03", title: "Growth-Stage Teams", desc: "Past early traction and ready for the full stack: positioning, demand gen, web presence, and the execution to back it up." },
  { num: "04", title: "Companies in Transition", desc: "Pivot, relaunch, new market, new category. The old story no longer fits the business you run today. That gap is exactly the work." },
];

const processSteps = [
  { num: "01", title: "Discovery Call", desc: "We diagnose where the language — or the funnel — is breaking down, what it needs to do, and how we measure success together." },
  { num: "02", title: "Strategy Brief", desc: "A written plan: your audience, your argument, your differentiators, your competitive angle — agreed before a word gets built." },
  { num: "03", title: "The Build", desc: "Copy, site, or campaigns delivered in rounds with clear reasoning. You see every decision and why it was made." },
  { num: "04", title: "Launch", desc: "Final deliverables, ready for every platform. Plus a 30-day check-in to confirm it is landing and moving the number." },
];

const baPanels = [
  {
    label: "Website Homepage Headline",
    before: '"We provide comprehensive digital marketing solutions for businesses of all sizes."',
    after: '"Your competitors are getting the calls you should be getting. Here\'s exactly why — and how to fix it in 30 days."',
  },
  {
    label: "Company Positioning Statement",
    before: '"A B2B SaaS platform that helps teams manage their workflows more efficiently."',
    after: '"The revenue intelligence layer your sales team didn\'t know they were missing — until the number stopped moving."',
  },
];

const faqItems = [
  { q: "How is this different from an agency?", a: "Agencies sell you a senior name on the pitch and junior work on the deliverable. You get me on the actual work — no layers, no account managers, no hand-offs. Senior thinking and execution from one operator." },
  { q: "Can I start small?", a: "Yes. Start with The Edit, The Session, or a single campaign. You will know fast what is working, what is leaking, and what to rebuild first — before committing to anything bigger." },
  { q: "Do you work on retainer, project, or fractional?", a: "All three, plus rev-share for the right outbound engagement. We scope whatever fits the work and your stage." },
  { q: "How do you use AI?", a: "I use an agent stack to ship a team's output as one operator — but judgment, voice, and the writing are mine. Leverage on production, taste on the part that matters." },
  { q: "What happens on the first call?", a: "Thirty minutes. You tell me what is not working, I tell you what I see, whether I can help, and what makes sense next. No pitch, no obligation." },
];

export default function HowIWorkPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[60vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[55vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.12),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <Eyebrow>How I Work</Eyebrow>
          <div className="mt-4"><H1>The Method</H1></div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            From unclear to undeniable — one operator, no agency layers.
          </p>
          <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            Who I do my best work with, the four-step process, and proof of what repositioning actually changes.
          </p>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ── */}
      <RevealSection bg="obsidian" num="01">
        <Eyebrow>Where We Work Best</Eyebrow>
        <H2>Which partner do{" "}<span className="text-petal">you need?</span></H2>
        <p className="mt-4 mb-12 font-body text-sm font-light text-smoke" style={{ maxWidth: "56ch" }}>
          Every engagement starts with one question: where is revenue actually leaking?
        </p>
        <div className="grid gap-px bg-graphite sm:grid-cols-2">
          {clientTypes.map((card) => (
            <div key={card.num} className="bg-obsidian p-8">
              <p className="font-mono text-[2.5rem] leading-none tracking-[0.02em] text-petal/[0.18] font-bold">{card.num}</p>
              <h3 className="mt-4 font-display text-4xl uppercase tracking-[0.02em] text-pearl md:text-5xl">{card.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{card.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={1} />

      {/* ── PROCESS ── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>The Process</Eyebrow>
        <H2>Four steps,{" "}<span className="text-petal">no ambiguity.</span></H2>
        <p className="mt-4 mb-14 font-body text-sm font-light text-smoke" style={{ maxWidth: "56ch" }}>
          You know what happens, when it happens, and why every decision made the cut.
        </p>
        <div className="grid gap-px bg-graphite md:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.num} className="bg-obsidian p-8">
              <p className="font-display leading-none text-petal/[0.15]" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", letterSpacing: "0.02em" }}>{step.num}</p>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{step.title}</h3>
              <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{step.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── BEFORE / AFTER ── */}
      <RevealSection bg="obsidian" num="03">
        <Eyebrow>The Transformation</Eyebrow>
        <H2>See the difference{" "}<span className="text-petal">words make.</span></H2>
        <p className="mt-4 mb-12 font-body text-sm font-light text-smoke" style={{ maxWidth: "58ch" }}>
          Same company, completely different signal.
        </p>
        <div className="grid gap-px bg-graphite md:grid-cols-2">
          {baPanels.map((panel) => (
            <div key={panel.label} className="bg-obsidian p-8">
              <p className="mb-5 font-body text-[0.62rem] font-bold uppercase tracking-[0.25em] text-iron">{panel.label}</p>
              <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.2em] text-iron/70">Before</p>
              <p className="mt-2 font-serif text-lg italic leading-8 text-smoke/70 line-through decoration-petal/30">{panel.before}</p>
              <p className="mt-6 font-body text-[0.62rem] font-bold uppercase tracking-[0.2em] text-petal">After</p>
              <p className="mt-2 font-serif text-xl italic leading-8 text-pearl" style={{ fontWeight: 600 }}>{panel.after}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-graphite pt-8">
          <p className="font-body text-sm font-light text-smoke">That shift is what every engagement delivers — for any company, in any market.</p>
          <BtnPrimary href="/book">Start Your Rewrite →</BtnPrimary>
        </div>
      </RevealSection>

      <QuoteDivider index={6} />

      {/* ── FAQ ── */}
      <RevealSection bg="void" num="04">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <H2>Before the{" "}<span className="text-petal">first call.</span></H2>
            <H3Script>If your question is not here, just ask.</H3Script>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/book">Book a Call</BtnPrimary>
              <ArrowLink href="/shelf">Browse The Shelf</ArrowLink>
            </div>
          </div>
          <FAQ items={faqItems} />
        </div>
      </RevealSection>
    </>
  );
}
