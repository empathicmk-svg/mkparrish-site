"use client";

import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// 🔧 REPLACE THESE VALUES — everything else is ready to deploy
// ─────────────────────────────────────────────────────────────────────────────
const YOUTUBE_VIDEO_ID  = "YOUR_YOUTUBE_VIDEO_ID";        // e.g. "dQw4w9WgXcQ"
const CALENDLY_URL      = "https://www.calendly.com/mkp414";
const STRIPE_AUDIT      = "https://buy.stripe.com/3cI8wHgJcd29b6h36Q0oM00";
const STRIPE_RETAINER   = "https://buy.stripe.com/fZu00b9gKbY5eitfTC0oM03";
const STRIPE_FRACTIONAL = "https://buy.stripe.com/00w28j2Smfahfmx36Q0oM02";
const STRIPE_WRITING    = "https://buy.stripe.com/YOUR_WRITING_LINK"; // 🔧 Add your Stripe link for writing
// ─────────────────────────────────────────────────────────────────────────────

type CaseStudy = {
  title: string;
  subtitle: string;
  bullets: string[];
  outcome: string;
  metric: string;
  metricLabel: string;
};

type Principle = {
  title: string;
  text: string;
};

type WritingItem = {
  title: string;
  type: string;
};

type PricingTier = {
  tag: string;
  title: string;
  price: string;
  cadence: string;
  description: string;
  bullets: string[];
  cta: string;
  stripeUrl: string;
  highlight: boolean;
};

const caseStudies: CaseStudy[] = [
  {
    title: "Partner-Led Pipeline",
    subtitle: "Enterprise velocity and win-rate uplift",
    metric: "3.2×",
    metricLabel: "Demo-to-Opportunity Rate",
    bullets: [
      "Partner GTM enablement, co-branding, and demo incentives",
      "Persona to pain to offer alignment across the full funnel",
      "Retargeting loops to keep executive buyers warm",
    ],
    outcome:
      "Demo-to-opportunity conversion tripled. Sales cycles shortened by a quarter. Win rates climbed across every priority segment.",
  },
  {
    title: "ABM System That Actually Converts",
    subtitle: "Precision targeting without vanity metrics",
    metric: "$12M+",
    metricLabel: "Pipeline Influenced in 6 Months",
    bullets: [
      "ICP segmentation across distributors, contractors, and facility buyers",
      "Multi-channel activation: LinkedIn, email, display, and CRM",
      "Sales enablement built to handle objections and buying committees",
    ],
    outcome:
      "Higher-quality pipeline handoffs, stronger SQL conversion, and marketing-sales alignment that actually held.",
  },
  {
    title: "Executive Demand Engine",
    subtitle: "High-value content and events that drive revenue",
    metric: "68%",
    metricLabel: "SQL Conversion Increase",
    bullets: [
      "Curated executive event and thought-leadership content strategy",
      "Audience segmentation, CRM hygiene, and lifecycle journeys",
      "Repeatable engagement workflows with measurable outcomes",
    ],
    outcome:
      "Premium conversions increased. Enterprise pipeline deepened. Retention improved through account-level engagement at scale.",
  },
];

const pricingTiers: PricingTier[] = [
  {
    tag: "One-time · Quick win",
    title: "Marketing Audit",
    price: "$250",
    cadence: "one-time",
    description:
      "Find exactly where your pipeline is breaking and what to fix immediately.",
    bullets: [
      "ICP and messaging alignment review",
      "Competitive positioning gap analysis",
      "Channel efficiency and attribution audit",
      "30-day quick-win roadmap",
      "Executive-ready PDF + live debrief call",
    ],
    cta: "Buy the Audit",
    stripeUrl: STRIPE_AUDIT,
    highlight: false,
  },
  {
    tag: "Most Popular · Monthly",
    title: "Pipeline Acceleration System",
    price: "$2,000",
    cadence: "/ month",
    description:
      "Ongoing strategy, execution, and optimization to drive consistent pipeline growth.",
    bullets: [
      "Demand gen + ABM strategy and execution",
      "Multi-channel activation (LinkedIn, email, paid, events)",
      "CRM hygiene, lead scoring + SQL handoff systems",
      "Monthly pipeline reporting with attribution",
      "Sales enablement content + objection handling",
    ],
    cta: "Start the Retainer",
    stripeUrl: STRIPE_RETAINER,
    highlight: true,
  },
  {
    tag: "Enterprise · Embedded",
    title: "Fractional Head of Growth",
    price: "$5,000",
    cadence: "/ month",
    description:
      "I step inside your business and directly build revenue with you.",
    bullets: [
      "GTM architecture: ICP, positioning, channel mix",
      "Partner, alliance + co-marketing programs",
      "Team mentoring and hiring guidance",
      "Board-level pipeline and revenue reporting",
      "Fractional CMO presence for fundraise or rebrand",
    ],
    cta: "Let's Talk",
    stripeUrl: STRIPE_FRACTIONAL,
    highlight: false,
  },
];

const principles: Principle[] = [
  {
    title: "Pipeline is the product",
    text: "Marketing should not just look active. It should create momentum, reduce friction, and move revenue forward. Everything else is noise.",
  },
  {
    title: "Brand creates perceived value",
    text: "The strongest companies do not simply sell better. They communicate authority so clearly that the market treats them as more valuable before the first call.",
  },
  {
    title: "Clarity converts",
    text: "Most funnels don't fail because of traffic. They fail because the message is weak, the offer is muddy, or the next step is unclear. Fix the story. Fix the funnel.",
  },
];

const featuredWriting: WritingItem[] = [
  { title: "Pipeline, Prestige, and the Psychology of Value", type: "Essay" },
  { title: "Why Most Marketing Feels Expensive and Accomplishes Nothing", type: "Point of View" },
  { title: "The Woman Behind the Work", type: "Memoir Thread" },
];

const logos: string[] = [
  "Vonage", "Mercer", "Take-Two", "Atlantic Ultraviolet", "Thrive", "ProVen", "UBS",
];

const aboutParagraphs: string[] = [
  "I started as a writer. That never changed. What changed is what I built around it — a decade of growth marketing, partner strategy, and demand generation work inside Fortune 50 companies, scrappy startups, and everything in between. I have influenced over $40M in pipeline, scaled brands across industries, and learned that the difference between a company that converts and one that just looks active almost always comes down to the words.",
  "I grew up in New York. I have reinvented myself more than once — not as a pivot, but as a sharpening. I know what it is to lose certainty and come out the other side more precise, more deliberate, and harder to ignore. That experience lives in every piece of work I produce. I do not write generic. I do not build noise. I build things that move.",
  "My clients are founders who need a voice, revenue teams who need a system, and executives who need someone who can hold the strategy and write the keynote. I work ghost or credited, retained or project-based, fractional or full-send. If your brand is smaller than your ambition — or your copy is not doing its job — that is where I come in.",
];

function LuxuryCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: Event) => {
      const t = e.target as HTMLElement | null;
      setHovering(Boolean(t?.closest("a, button")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[100] hidden rounded-full border border-white/40 bg-white/20 mix-blend-screen transition-all duration-75 md:block"
        style={{ left: pos.x - 6, top: pos.y - 6, width: hovering ? 18 : 10, height: hovering ? 18 : 10 }}
      />
      <div
        className="pointer-events-none fixed z-[90] hidden rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 blur-[2px] transition-all duration-200 md:block"
        style={{ left: pos.x - 25, top: pos.y - 25, width: hovering ? 70 : 45, height: hovering ? 70 : 45 }}
      />
      <div
        className="pointer-events-none fixed z-[80] hidden rounded-full bg-cyan-400/10 blur-2xl transition-all duration-500 md:block"
        style={{ left: pos.x - 60, top: pos.y - 60, width: hovering ? 140 : 90, height: hovering ? 140 : 90 }}
      />
    </>
  );
}

function PhilosopherQuote({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="my-16 flex flex-col items-center gap-4 px-4 text-center animate-fade-in-slow">
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />
      <blockquote className="max-w-2xl text-xl font-light italic leading-9 text-white/55 sm:text-2xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <p className="text-xs uppercase tracking-[0.3em] text-white/30">— {author}</p>
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
    </div>
  );
}

function VideoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-sm text-white/60 transition hover:text-white"
        >
          ✕ Close
        </button>
        <div className="aspect-video overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
            title="MK Parrish Intro Video"
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: none; }
        }
        .animate-fade-in      { animation: fadeIn 0.7s ease both; }
        .animate-fade-in-slow { animation: fadeIn 1s ease both; }
      `}</style>

      <div className="min-h-screen overflow-x-hidden bg-[#060816] text-white selection:bg-fuchsia-500/30">
        <LuxuryCursor />
        {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}

        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-10%] top-[-5%] h-[36rem] w-[36rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute right-[-8%] top-[10%] h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[20%] h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-10">

          {/* NAV */}
          <header className="sticky top-0 z-30 mb-10 rounded-full border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/55">Mary Kate Parrish</p>
                <p className="mt-1 text-sm text-white/75">Fortune 50 polish • corporate luxury • growth brain</p>
              </div>
              <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
                <a href="#writing"  className="transition hover:text-white">Writing</a>
                <a href="#work"     className="transition hover:text-white">Work</a>
                <a href="#services" className="transition hover:text-white">Services</a>
                <a href="#thinking" className="transition hover:text-white">Thinking</a>
                <a href="#about"    className="transition hover:text-white">About</a>
                <a href="#contact"  className="transition hover:text-white">Contact</a>
              </nav>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
              >
                Book a Call
              </a>
            </div>
          </header>

          {/* HERO */}
          <section className="grid items-center gap-10 pb-14 pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 animate-fade-in">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-white/50">
                Copywriting · Ghostwriting · Strategy · Demand Gen
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
                I write the words that make brands feel expensive.
                <span className="bg-gradient-to-r from-fuchsia-400 via-white to-cyan-300 bg-clip-text text-transparent">
                  {" "}Then I build the systems that make them grow.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                Writer energy with enterprise discipline. I ghost for executives, convert for founders, and build demand gen machines for revenue teams who are done guessing. No AI fluff. No generic templates. Just sharp copy and pipeline you can show your board.
              </p>
              <p className="mt-4 max-w-2xl text-base font-medium uppercase tracking-[0.16em] text-fuchsia-200/90">
                I do not apply for roles. I build leverage.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                >
                  Book a Strategy Call
                </a>
                <button
                  onClick={() => setVideoOpen(true)}
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  ▶ Play Intro Video
                </button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { num: "3×",    label: "Avg. Pipeline Growth"   },
                  { num: "$40M+", label: "Pipeline Influenced"    },
                  { num: "500+",  label: "Pieces Written & Placed" },
                ].map((s) => (
                  <div key={s.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-2xl font-semibold text-white">{s.num}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero video card */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/20 via-transparent to-cyan-400/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.05] shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div
                  className="relative aspect-video cursor-pointer"
                  onClick={() => setVideoOpen(true)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                    alt="Watch MK Parrish intro"
                    className="h-full w-full object-cover opacity-80"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition hover:scale-110 hover:bg-white/20">
                      <div className="ml-1 h-0 w-0 border-b-[10px] border-l-[18px] border-t-[10px] border-b-transparent border-l-white border-t-transparent" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">Brand signal</p>
                  <p className="mt-2 text-lg font-medium text-white">Strategic. Poised. Impossible to ignore.</p>
                </div>
              </div>
            </div>
          </section>

          <PhilosopherQuote quote="You have power over your mind, not outside events. Realize this, and you will find strength." author="Marcus Aurelius" />

          {/* LOGO STRIP */}
          <section className="mb-18 rounded-[2rem] border border-white/10 bg-white/[0.035] px-6 py-6 lg:px-8 animate-fade-in">
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">Trusted across teams</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/70 sm:grid-cols-4 lg:grid-cols-7">
              {logos.map((logo) => (
                <div
                  key={logo}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-center font-medium transition duration-300 hover:scale-[1.03] hover:border-fuchsia-300/25 hover:bg-white/[0.08]"
                >
                  {logo}
                </div>
              ))}
            </div>
          </section>

          <PhilosopherQuote quote="One is not born, but rather becomes, a woman." author="Simone de Beauvoir" />

          {/* WRITING + GHOSTWRITING */}
          <section id="writing" className="mb-24 animate-fade-in">
            <div className="mb-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-200">Writer first. Strategist always.</span>
              </div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Copywriting & Ghostwriting</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Words that carry weight{" "}
                <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">and convert.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/65">
                From LinkedIn thought leadership to executive keynotes to long-form essays — I write in your voice, with your authority, for your audience. Ghost or credited. No AI fluff. No generic templates.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    tier: "One-time",
                    title: "Single Piece",
                    price: "From $300",
                    desc: "One article, essay, LinkedIn post, or executive bio. Sharp, on-brand, and ready to publish.",
                  },
                  {
                    tier: "Monthly",
                    title: "Content Retainer",
                    price: "From $1,500/mo",
                    desc: "4–8 pieces per month. LinkedIn ghostwriting, thought leadership, newsletters, or blog content.",
                  },
                  {
                    tier: "Project",
                    title: "Executive Ghostwriting",
                    price: "Custom",
                    desc: "Speeches, books, white papers, keynote scripts, or board-level communications. Scoped per project.",
                  },
                  {
                    tier: "Deep work",
                    title: "Brand Voice & Messaging",
                    price: "From $2,000",
                    desc: "Full brand voice guide, messaging framework, and a bank of on-brand copy your team can use forever.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:border-fuchsia-300/25 hover:bg-white/[0.06]"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-white/40">{item.tier}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-base font-semibold text-fuchsia-200">{item.price}</p>
                    <p className="mt-3 text-sm leading-7 text-white/62">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-between rounded-[2rem] border border-fuchsia-400/25 bg-gradient-to-b from-fuchsia-500/15 to-white/[0.03] p-8 lg:p-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/45">How it works</p>
                  <p className="mt-5 text-xl font-medium leading-9 text-white/90">
                    You talk. I write. It sounds exactly like you — only sharper, more deliberate, and built to move people.
                  </p>
                  <ul className="mt-8 space-y-3">
                    {[
                      "LinkedIn ghostwriting & thought leadership",
                      "Executive speeches & keynote scripts",
                      "Long-form essays & published articles",
                      "Newsletter & email copy",
                      "White papers & case studies",
                      "Book proposals & manuscript support",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-white/70">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fuchsia-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 flex flex-col gap-3">
                  <a
                    href={STRIPE_WRITING}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full bg-white py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-fuchsia-50"
                  >
                    Buy a Single Piece
                  </a>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Discuss a Larger Project →
                  </a>
                </div>
              </div>
            </div>
          </section>

          <PhilosopherQuote quote="We are what we repeatedly do. Excellence, then, is not an act, but a habit." author="Aristotle" />

          {/* THINKING */}
          <section id="thinking" className="mb-24 animate-fade-in">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">How I think</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  The strategic point of view behind the work
                </h2>
              </div>
              <p className="hidden max-w-xl text-sm leading-6 text-white/60 lg:block">
                Great brands are built twice. First in language, then in systems.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {principles.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-6"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-200">{item.title}</p>
                  <p className="mt-4 text-base leading-8 text-white/72">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <PhilosopherQuote quote="The secret of change is to focus all of your energy not on fighting the old, but on building the new." author="Socrates" />

          {/* VIDEO + WRITING */}
          <section id="video" className="mb-24 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] animate-fade-in">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.025] p-8 lg:p-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Video capability</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                This portfolio was built to speak, not just scroll.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">
                Watch a 2-minute breakdown of how I think about pipeline, brand authority, and the gap
                most marketing teams refuse to close.
              </p>
              <div
                className="relative mt-8 aspect-video cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/35"
                onClick={() => setVideoOpen(true)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                  alt="Play intro video"
                  className="h-full w-full object-cover opacity-70 transition hover:opacity-90"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition hover:scale-110">
                    <div className="ml-1 h-0 w-0 border-b-[9px] border-l-[15px] border-t-[9px] border-b-transparent border-l-white border-t-transparent" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 lg:p-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Featured writing</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                A life portfolio should also reveal the mind behind the strategy.
              </h2>
              <div className="mt-8 space-y-4">
                {featuredWriting.map((item) => (
                  <div
                    key={item.title}
                    className="cursor-pointer rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-fuchsia-300/25 hover:bg-white/[0.06]"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">{item.type}</p>
                    <p className="mt-2 text-lg text-white">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <PhilosopherQuote quote="The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion." author="Albert Camus" />

          {/* CASE STUDIES */}
          <section id="work" className="mb-24 animate-fade-in">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Selected work</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Strategy → execution → outcomes.
                </h2>
              </div>
              <a href="#services" className="text-sm text-white/65 underline underline-offset-4">
                What I offer
              </a>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {caseStudies.map((item) => (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-fuchsia-300/25 hover:shadow-[0_30px_90px_rgba(255,0,170,0.12)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-400/8 opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex items-baseline gap-1.5 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-500/10 px-4 py-2">
                      <span className="text-2xl font-semibold text-fuchsia-200">{item.metric}</span>
                      <span className="text-xs uppercase tracking-[0.14em] text-fuchsia-300/70">{item.metricLabel}</span>
                    </div>
                    <p className="text-sm text-white/55">{item.subtitle}</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-white/70">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fuchsia-300" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-black/30 p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/45">Outcome</p>
                      <p className="mt-3 text-sm leading-7 text-white/78">{item.outcome}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <PhilosopherQuote quote="He who has a why to live can bear almost any how." author="Friedrich Nietzsche" />

          {/* SERVICES + PRICING */}
          <section
            id="services"
            className="mb-24 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-white/[0.04] to-cyan-400/8 p-8 lg:p-10 animate-fade-in"
          >
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Consulting menu</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Three ways to work together.{" "}
                <span className="text-white/55">Everything loops back to pipeline.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/65">
                Choose a lane — or stack them. Every engagement is scoped to your stage, your team, and
                the revenue outcomes that matter most.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.title}
                  className={`relative flex flex-col rounded-[2rem] border p-7 transition duration-300 hover:scale-[1.015] ${
                    tier.highlight
                      ? "border-fuchsia-400/40 bg-gradient-to-b from-fuchsia-500/20 to-white/[0.04] shadow-[0_0_80px_rgba(200,60,255,0.15)]"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-fuchsia-500 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">{tier.tag}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{tier.title}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-semibold text-white">{tier.price}</span>
                    <span className="text-sm text-white/45">{tier.cadence}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/62">{tier.description}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm leading-6 text-white/70">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-300" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href={tier.stripeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition hover:scale-[1.02] ${
                        tier.highlight
                          ? "bg-white text-black hover:bg-fuchsia-50"
                          : "border border-white/20 bg-white/10 text-white hover:bg-white/15"
                      }`}
                    >
                      {tier.cta}
                    </a>
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-full border border-white/10 py-2.5 text-xs font-medium text-white/55 transition hover:text-white"
                    >
                      Or schedule a call first →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-white/10 pt-10">
              <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/40">Also available à la carte</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Growth and brand audits",
                  "Partner marketing and alliance playbooks",
                  "ABM strategy and ICP refinement",
                  "Lifecycle and email sequencing",
                  "Lead gen to pipeline handoff systems",
                  "Sales enablement and objection handling",
                  "Go-to-market launch planning",
                  "Content and editorial strategy",
                  "Conversion copywriting",
                  "Creative direction",
                  "Event and field marketing strategy",
                  "Executive messaging and ghostwriting",
                ].map((service) => (
                  <div
                    key={service}
                    className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4 text-sm text-white/75 backdrop-blur-sm transition duration-300 hover:scale-[1.02] hover:border-cyan-300/20 hover:bg-white/[0.06]"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <PhilosopherQuote quote="Know thyself." author="Socrates" />

          {/* ABOUT */}
          <section id="about" className="mb-24 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] animate-fade-in">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 lg:p-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">About</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                I started as a writer. Everything else is what I built around it.
              </h2>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.025] p-8 lg:p-10">
              <div className="space-y-6 text-base leading-8 text-white/74">
                {aboutParagraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Demand Generation", "ABM", "Partner Marketing", "GTM Strategy", "Copywriting", "Fractional CMO"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-fuchsia-300/25 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-fuchsia-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <PhilosopherQuote quote="In the middle of difficulty lies opportunity." author="Albert Einstein" />

          {/* LEAD FUNNEL */}
          <section
            id="lead-funnel"
            className="mb-24 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.04] to-fuchsia-500/10 p-8 lg:p-10 animate-fade-in"
          >
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">The path forward</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Turn curiosity into clients, calls, and real opportunities.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
                  This site is built to do three things fast: establish authority, create trust, and convert
                  attention into action. Start with a paid audit, book a call, or reach out directly.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={STRIPE_AUDIT}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                  >
                    Start a Growth Audit
                  </a>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Book a Strategy Call
                  </a>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { step: "01", title: "Watch the intro",  desc: "Get an instant feel for how I think, speak, and lead.", accent: "hover:border-fuchsia-300/25", clickable: true  },
                  { step: "02", title: "Review the work",  desc: "See strategy, execution, and outcomes in one place.",   accent: "hover:border-cyan-300/25",    clickable: false },
                  { step: "03", title: "Convert",          desc: "Book the audit, schedule the call, or open a larger engagement.", accent: "hover:border-white/25", clickable: false },
                ].map((s) => (
                  <div
                    key={s.step}
                    onClick={s.clickable ? () => setVideoOpen(true) : undefined}
                    className={`rounded-[1.5rem] border border-white/10 bg-black/25 p-5 transition duration-300 hover:scale-[1.02] ${s.accent} ${s.clickable ? "cursor-pointer" : ""}`}
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-white/45">Step {s.step}</p>
                    <p className="mt-3 text-lg text-white">{s.title}</p>
                    <p className="mt-2 text-sm leading-7 text-white/68">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/20 via-[#060816] to-cyan-400/10 p-8 lg:p-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Let&apos;s build something serious</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                If you need a revenue-focused partner with taste, clarity, and range — reach out.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
                Full-time leadership, freelance projects, consulting retainers, strategic partnership builds,
                writing engagements, or high-level brand work. Keep it human, sharp, and outcome-driven.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Email",    value: "mkp414@icloud.com",         href: "mailto:mkp414@icloud.com" },
                  { label: "LinkedIn", value: "/in/mkparrish", href: "https://www.linkedin.com/in/mkparrish" },
                  { label: "Phone",    value: "347.853.4238",               href: "tel:3478534238" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5 transition hover:border-fuchsia-300/25 hover:bg-white/[0.06]"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-white/45">{c.label}</p>
                    <p className="mt-3 text-sm text-white/90">{c.value}</p>
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-fuchsia-50"
                >
                  Book a Strategy Call →
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 lg:p-10">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Final impression</p>
                <p className="mt-5 text-2xl font-medium leading-10 text-white/92">
                  The right brand does not just tell people you are good. It changes the room before you enter it.
                </p>
              </div>
              <div className="mt-10 space-y-3">
                {[
                  { label: "Revenue Leak Audit — $250",         url: STRIPE_AUDIT,       accent: "hover:border-fuchsia-300/25" },
                  { label: "Pipeline Acceleration — $2K/mo",  url: STRIPE_RETAINER,    accent: "hover:border-cyan-300/25"    },
                  { label: "Embedded Growth Partner — $5K/mo", url: STRIPE_FRACTIONAL, accent: "hover:border-fuchsia-300/25" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex w-full items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/25 px-5 py-4 text-sm text-white/80 transition hover:bg-white/[0.06] ${item.accent}`}
                  >
                    <span>{item.label}</span>
                    <span className="text-white/40">→</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="mt-20 border-t border-white/10 py-8 text-sm text-white/50">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-white/80">MK Parrish</p>
                <p className="mt-1">Growth marketer + strategist + writer.</p>
              </div>
              <div className="flex gap-6 text-xs uppercase tracking-[0.12em]">
                <a href="#work"     className="transition hover:text-white">Work</a>
                <a href="#services" className="transition hover:text-white">Services</a>
                <a href="#about"    className="transition hover:text-white">About</a>
                <a href="#contact"  className="transition hover:text-white">Contact</a>
              </div>
              <p>Built for growth, not just looks.</p>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}
