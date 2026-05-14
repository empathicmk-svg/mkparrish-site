"use client";

import { useState } from "react";
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

// ── Types ─────────────────────────────────────────────────────────────────────

type CaseStudy = {
  id: string;
  client: string;
  role: string;
  track: string;
  problem: string;
  approach: string;
  result: string[];
  quote: string;
  metric: string;
  metricLabel: string;
  tag: "Rewrite" | "Build" | "Byline" | "New Chapter" | "Growth";
};

// ── Data ──────────────────────────────────────────────────────────────────────

const caseStudies: CaseStudy[] = [
  {
    id: "cs-01",
    client: "Jamie R.",
    role: "Founder, B2B SaaS",
    track: "The Rewrite",
    tag: "Rewrite",
    problem:
      "Jamie's LinkedIn had 4,000 followers and zero inbound. The profile described a product manager — not the founder of a 12-person revenue intelligence startup that had just closed a Series A. The words were three years out of date.",
    approach:
      "Full LinkedIn overhaul anchored in a positioning session. We rebuilt the headline, the About section, and the featured story around one specific claim: Jamie helps B2B sales teams stop guessing and start predicting. Every word was written to attract one kind of person — a VP of Sales who had lost a deal they should have won.",
    result: [
      "3 inbound partnership conversations in 30 days",
      "One converted to a $180K contract",
      "Profile views up 340% month-over-month",
      "First DM from a qualified lead inside 72 hours of going live",
    ],
    quote:
      "Before MK, my LinkedIn was a digital resume no one was reading. Within 30 days of the rewrite, I had three inbound partnership conversations — one turned into a $180K contract.",
    metric: "$180K",
    metricLabel: "Inbound contract",
  },
  {
    id: "cs-02",
    client: "Marcus T.",
    role: "VP of Marketing",
    track: "The Byline",
    tag: "Byline",
    problem:
      "Marcus was running marketing for a $40M ARR company and had roughly zero personal brand to show for it. He wanted to build equity outside his employer — thought leadership that would follow him if he left. He'd been \"going to start posting\" for 18 months.",
    approach:
      "Monthly ghostwriting retainer under The Byline. First three months: positioning, voice extraction (5 hours of interviews), and editorial calendar built around Marcus's actual POVs — not recycled LinkedIn advice. Posts ran Tuesday and Thursday, always under Marcus's name.",
    result: [
      "0 → 14 qualified inbound leads per month in 6 weeks",
      "Two conference speaking invitations within 90 days",
      "Newsletter subscribers grew 220% in Q1",
      "Recruited by two competing companies — negotiated 30% pay increase at current employer as a result",
    ],
    quote:
      "I had been invisible on LinkedIn for two years. After six weeks working with MK, people in my industry were actually reaching out to me first. I went from 2 inbound leads a month to 14.",
    metric: "7×",
    metricLabel: "Inbound leads",
  },
  {
    id: "cs-03",
    client: "Sarah L.",
    role: "Independent Consultant",
    track: "The New Chapter",
    tag: "New Chapter",
    problem:
      "Sarah spent 11 years as a corporate attorney before going independent. Her consulting practice — advising tech startups on regulatory strategy — was real and growing. But her positioning made it sound like she was still practicing law. Every referral came with the qualifier \"she used to be a lawyer.\"",
    approach:
      "The New Chapter engagement: full narrative rebuild from scratch. We spent an entire session excavating why clients actually hired Sarah — it wasn't the law background. It was that she could see where regulation was going before founders realized they needed to care. That became the entire brand: regulatory foresight, not legal compliance.",
    result: [
      "First 3 clients booked within 45 days of launch",
      "Average project value 60% higher than pre-rebrand",
      "Stopped losing deals to firms billing as attorneys",
      "Speaking slot at a fintech conference within 4 months",
    ],
    quote:
      "I was pivoting from corporate law to independent consulting and couldn't figure out how to tell the story. MK turned the career change from a liability into the whole point. I booked my first three clients within 45 days.",
    metric: "3 clients",
    metricLabel: "In 45 days",
  },
  {
    id: "cs-04",
    client: "Dr. Amara O.",
    role: "Executive Coach",
    track: "The Rewrite",
    tag: "Rewrite",
    problem:
      "Amara had 14 years of clinical psychology behind her and a coaching practice that was growing — but slowly. Her website described her credentials. Her bio listed her certifications. Nothing explained why a senior executive would choose her specifically over any of the 50,000 other credentialed coaches.",
    approach:
      "LinkedIn and website copy rebuilt around a single, polarizing claim: most coaching teaches tactics. Amara rewires the operating system. Every deliverable — headline, About section, website homepage — was written to speak directly to one person: the high-performing executive who has optimized everything except their own thinking.",
    result: [
      "First consultation booked within 72 hours of updated profile going live",
      "Raised rates 40% — no pushback",
      "Fully booked 3 months ahead within 60 days of relaunch",
      "Declined a publisher outreach deal (too busy with clients)",
    ],
    quote:
      "The Rewrite paid for itself in the first consultation I booked after updating my bio. I've since raised my rates 40%. My copy now sounds like the version of me I was already charging for.",
    metric: "40%",
    metricLabel: "Rate increase",
  },
  {
    id: "cs-05",
    client: "Priya M.",
    role: "Agency Founder",
    track: "The Build",
    tag: "Build",
    problem:
      "Priya's UX agency had been running for three years on referrals. The website was a portfolio site that showed work but never explained why a company would choose her over a freelancer or a larger shop. Traffic was low. Conversion was lower. The site looked like a designer made it — because one had, without any copy strategy.",
    approach:
      "Full Build engagement: positioning workshop, copy strategy, and website rebuild from the ground up. We led with the argument Priya's best clients already believed — that design without user psychology is decoration. Every page was structured around one conversion action. The homepage headline was rewritten 11 times.",
    result: [
      "Two qualified inbound leads from the homepage in the first week post-launch",
      "Average deal size up 45% in Q1 post-launch",
      "Bounce rate dropped from 74% to 38%",
      "First enterprise client ($120K engagement) within 90 days",
    ],
    quote:
      "We launched the new site on a Tuesday. By Friday we had two qualified inbound leads from the homepage alone. That had never happened before in three years of running the agency.",
    metric: "$120K",
    metricLabel: "Enterprise client",
  },
  {
    id: "cs-06",
    client: "Dean K.",
    role: "Creative Director",
    track: "The Build",
    tag: "Build",
    problem:
      "Dean had 18 years of award-winning CD work and a portfolio that spoke for itself — but every potential client meeting started with him having to explain who he was. His site was a gallery with no voice. Two previous copywriters had written something that sounded polished and said nothing.",
    approach:
      "Brand voice extraction across three sessions. The breakthrough came in session two: Dean didn't want to be hired as a Creative Director. He wanted to be hired as the person who saw what brands couldn't see about themselves. The site was rebuilt around that — a portfolio that argued a position, not just displayed work.",
    result: [
      "Inbound inquiry rate doubled in 60 days",
      "First cold outreach in 5 years — responded to by brand director at a Fortune 500",
      "Booked two speaking slots off the 'About' page alone",
      "Client quote in first meeting: 'I read your site and thought — that's exactly how we think'",
    ],
    quote:
      "I hired two other copywriters before MK. Both times I got something generic that sounded nothing like me. The first draft from this engagement — I read it and actually recognized myself.",
    metric: "2×",
    metricLabel: "Inbound rate",
  },
];

const TAGS = ["All", "Rewrite", "Build", "Byline", "New Chapter", "Growth"] as const;

// ── Sub-components ────────────────────────────────────────────────────────────

function CaseStudyCard({ cs, onClick }: { cs: CaseStudy; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col justify-between bg-obsidian p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-carbon w-full"
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
      <div>
        <div className="flex items-center justify-between gap-3 mb-6">
          <span className="font-body text-[0.6rem] font-bold uppercase tracking-[0.22em] text-iron border border-graphite px-2 py-0.5">
            {cs.track}
          </span>
          <span className="font-display text-3xl text-petal leading-none">{cs.metric}</span>
        </div>
        <p className="font-body text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ash mb-1">{cs.metricLabel}</p>
        <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{cs.client}</h3>
        <p className="mt-1 font-body text-[0.7rem] text-iron">{cs.role}</p>
        <p className="mt-4 font-serif italic text-sm leading-6 text-smoke line-clamp-3">&ldquo;{cs.quote}&rdquo;</p>
      </div>
      <p className="mt-6 font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-petal opacity-0 transition-opacity group-hover:opacity-100">
        Read the full story →
      </p>
    </button>
  );
}

function CaseStudyModal({ cs, onClose }: { cs: CaseStudy; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(8,8,8,0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-obsidian border border-graphite"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-petal" />
        <div className="p-8 md:p-12">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ash hover:text-petal transition-colors"
          >
            Close ✕
          </button>

          <span className="font-body text-[0.6rem] font-bold uppercase tracking-[0.22em] text-iron border border-graphite px-2 py-0.5">
            {cs.track}
          </span>

          <div className="mt-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl uppercase tracking-[0.02em] text-pearl">{cs.client}</h2>
              <p className="mt-1 font-body text-sm text-ash">{cs.role}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-5xl text-petal leading-none">{cs.metric}</p>
              <p className="mt-1 font-body text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-iron">{cs.metricLabel}</p>
            </div>
          </div>

          <div className="mt-10 space-y-8">
            <div>
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-petal mb-3">The Problem</p>
              <p className="font-body text-sm font-light leading-7 text-smoke">{cs.problem}</p>
            </div>
            <div>
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-petal mb-3">The Approach</p>
              <p className="font-body text-sm font-light leading-7 text-smoke">{cs.approach}</p>
            </div>
            <div>
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-petal mb-3">The Results</p>
              <ul className="space-y-2">
                {cs.result.map((r) => (
                  <li key={r} className="flex items-start gap-3 font-body text-sm font-light text-smoke">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-petal" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <blockquote className="mt-10 border-l-2 border-petal/40 pl-6">
            <p className="font-serif italic text-base leading-7 text-pearl">&ldquo;{cs.quote}&rdquo;</p>
            <p className="mt-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ash">— {cs.client}, {cs.role}</p>
          </blockquote>

          <div className="mt-10 flex flex-wrap gap-4">
            <BtnPrimary href="/book">Start Your Project →</BtnPrimary>
            <button
              onClick={onClose}
              className="btn-ghost inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em]"
            >
              Back to Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const [activeTag, setActiveTag] = useState<string>("All");
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);

  const filtered = activeTag === "All"
    ? caseStudies
    : caseStudies.filter((cs) => cs.tag === activeTag);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-[60vh] flex-col justify-end pb-16 pt-28 md:pb-24"
        style={{ background: "#080808" }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.14),transparent_60%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <Eyebrow>Client Results</Eyebrow>
          <H1>
            The proof is in{" "}
            <span className="text-petal">the pipeline.</span>
          </H1>
          <p className="mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            Six case studies. Real clients. Specific numbers. Every project is different — the problem, the approach, the result. What doesn&apos;t change: words that finally match the work.
          </p>

          {/* Aggregate stats */}
          <div className="mt-12 grid grid-cols-2 gap-px bg-graphite sm:grid-cols-4 border border-graphite">
            {[
              { num: "200+", label: "Clients Served" },
              { num: "$6M+", label: "Revenue Attributed" },
              { num: "92%", label: "Repeat or Referral" },
              { num: "48h", label: "Average First Draft" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2 bg-obsidian p-6">
                <span className="font-display text-4xl text-petal">{s.num}</span>
                <span className="font-body text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ash">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteDivider index={3} />

      {/* ── CASE STUDIES ─────────────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <Eyebrow>Case Studies</Eyebrow>
        <H2>
          Six clients.{" "}
          <span className="text-petal">Six transformations.</span>
        </H2>
        <p className="mt-4 mb-8 font-body text-sm font-light text-smoke" style={{ maxWidth: "56ch" }}>
          Click any card to read the full story — the problem, the approach, and every measurable result.
        </p>

        {/* Filter bar */}
        <div className="mb-10 flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] border px-4 py-2 transition-colors duration-200"
              style={{
                borderColor: activeTag === tag ? "var(--color-petal, #F2AFC6)" : "var(--color-graphite, #2C2C2C)",
                color: activeTag === tag ? "var(--color-petal, #F2AFC6)" : "var(--color-ash, #7A7A7A)",
                background: "transparent",
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cs) => (
            <CaseStudyCard key={cs.id} cs={cs} onClick={() => setActiveCase(cs)} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-graphite pt-8">
          <H3Script>Ready to be the next case study?</H3Script>
          <BtnPrimary href="/book">Book a Strategy Call →</BtnPrimary>
        </div>
      </RevealSection>

      <QuoteDivider index={8} />

      {/* ── TESTIMONIALS STRIP ───────────────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>More from clients</Eyebrow>
        <H2>
          What they said{" "}
          <span className="text-petal">after.</span>
        </H2>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-2">
          {[
            {
              quote: "I went from invisible to 'wait, are you that person I keep seeing?' in under 8 weeks. The positioning work alone was worth ten times what I paid.",
              name: "Rena T.",
              role: "Chief Revenue Officer",
            },
            {
              quote: "MK made me stop apologizing for my work in how I described it. That shift — in language and in confidence — changed every room I walked into after.",
              name: "Jonah B.",
              role: "Startup Founder",
            },
            {
              quote: "I expected good copy. I got a complete reframe of what I was building and why. The copy was the result of that thinking, not the starting point.",
              name: "Lila F.",
              role: "Product Lead → Founder",
            },
            {
              quote: "Three weeks after the LinkedIn rewrite, I was invited to speak at a conference I'd been trying to get into for two years. The only thing that changed was the copy.",
              name: "Omar S.",
              role: "Executive Consultant",
            },
            {
              quote: "Every other copywriter I'd talked to wanted to know my audience. MK wanted to know what I actually believed. That's the difference you can feel in the final product.",
              name: "Camille D.",
              role: "Brand Strategist",
            },
            {
              quote: "I had a website that won awards and lost clients. After The Build, I have a site that does its job — it sells. I didn't know copy could be the difference.",
              name: "Tyler A.",
              role: "Studio Founder",
            },
          ].map((t) => (
            <div key={t.name} className="relative bg-obsidian p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal/25 to-transparent" />
              <span className="select-none font-serif text-[3rem] leading-none text-petal/[0.1]">&ldquo;</span>
              <p className="mt-1 font-serif italic text-sm leading-7 text-smoke">{t.quote}</p>
              <div className="mt-5 border-t border-graphite pt-4">
                <p className="font-display text-base uppercase tracking-[0.02em] text-pearl">{t.name}</p>
                <p className="mt-0.5 font-body text-[0.65rem] text-ash">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={11} />

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section
        className="relative pb-16 md:pb-0"
        style={{ background: "#080808", padding: "clamp(5rem, 12vw, 11rem) 0" }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(242,175,198,0.08),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] text-center" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Your results are next
          </p>
          <div className="mt-6">
            <H1>
              Let&apos;s Write Your{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.3)" }}>
                Case Study.
              </span>
            </H1>
          </div>
          <p className="mx-auto mt-8 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            Every case study on this page started with one conversation. The only question is what your result looks like.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href="/book">Book a Strategy Call →</BtnPrimary>
            <BtnGhost href="/contact">Ask a Question First</BtnGhost>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <ArrowLink href="/services">See All Services</ArrowLink>
            <ArrowLink href="/writing">Read the Essays</ArrowLink>
          </div>
        </div>
      </section>

      {/* Case study modal */}
      {activeCase && (
        <CaseStudyModal cs={activeCase} onClose={() => setActiveCase(null)} />
      )}
    </>
  );
}
