"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────
const CALENDLY_URL      = "https://www.calendly.com/mkp414";
const STRIPE_AUDIT      = "https://buy.stripe.com/3cI8wHgJcd29b6h36Q0oM00";
const STRIPE_RETAINER   = "https://buy.stripe.com/fZu00b9gKbY5eitfTC0oM03";
const STRIPE_FRACTIONAL = "https://buy.stripe.com/00w28j2Smfahfmx36Q0oM02";
const STRIPE_WRITING    = "https://buy.stripe.com/14AcMX2Smd29gqB8ra0oM08";
// TODO: Replace with your actual Beehiiv subscribe URL
const BEEHIIV_URL       = "https://mkparrish.beehiiv.com/subscribe";
// TODO: Replace with your actual Patreon URL
const PATREON_URL       = "https://www.patreon.com/mkparrish";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const quotes = [
  { text: "You own everything that happened to you. Tell your stories.", author: "Anne Lamott" },
  { text: "One is not born, but rather becomes, a woman.", author: "Simone de Beauvoir" },
  { text: "We write to taste life twice, in the moment and in retrospect.", author: "Anaïs Nin" },
  { text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.", author: "Albert Camus" },
  { text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" },
  { text: "You have power over your mind, not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "The soul becomes dyed with the colour of its thoughts.", author: "Marcus Aurelius" },
  { text: "Begin anywhere.", author: "John Cage" },
  { text: "I am not afraid of storms, for I am learning how to sail my ship.", author: "Louisa May Alcott" },
  { text: "Know thyself.", author: "Socrates" },
];

const stats = [
  { num: "$40M+", label: "Pipeline Influenced" },
  { num: "3×", label: "Avg. Pipeline Growth" },
  { num: "500+", label: "Pieces Written & Placed" },
  { num: "68%", label: "SQL Conversion Increase" },
];

const serviceItems = [
  { title: "Copywriting & Ghostwriting", desc: "LinkedIn thought leadership, executive keynotes, long-form essays. Your voice — sharper, more deliberate, built to move people." },
  { title: "Demand Generation", desc: "Multi-channel activation across LinkedIn, email, paid, and events. Pipeline you can show your board." },
  { title: "ABM Strategy", desc: "ICP segmentation, persona-to-pain alignment, retargeting loops. Precision targeting without vanity metrics." },
  { title: "Fractional Growth Leadership", desc: "GTM architecture, partner programs, team mentoring, board-level reporting. I step inside your business." },
  { title: "Brand Voice & Messaging", desc: "Full brand voice guide, messaging framework, and a bank of on-brand copy your team can use forever." },
  { title: "Sales Enablement", desc: "Objection handling, buying committee playbooks, enablement content that accelerates deal velocity." },
];

const caseStudies = [
  {
    title: "Partner-Led Pipeline",
    subtitle: "Enterprise velocity and win-rate uplift",
    metric: "3.2×",
    metricLabel: "Demo-to-Opportunity Rate",
    bullets: ["Partner GTM enablement, co-branding, and demo incentives", "Persona-to-pain-to-offer alignment across the full funnel", "Retargeting loops to keep executive buyers warm"],
    outcome: "Demo-to-opportunity conversion tripled. Sales cycles shortened by a quarter. Win rates climbed across every priority segment.",
  },
  {
    title: "ABM System That Converts",
    subtitle: "Precision targeting without vanity metrics",
    metric: "$12M+",
    metricLabel: "Pipeline Influenced · 6 Months",
    bullets: ["ICP segmentation across distributors, contractors, and facility buyers", "Multi-channel activation: LinkedIn, email, display, and CRM", "Sales enablement built to handle objections and buying committees"],
    outcome: "Higher-quality pipeline handoffs, stronger SQL conversion, and marketing-sales alignment that held.",
  },
  {
    title: "Executive Demand Engine",
    subtitle: "High-value content and events that drive revenue",
    metric: "68%",
    metricLabel: "SQL Conversion Increase",
    bullets: ["Curated executive event and thought-leadership content strategy", "Audience segmentation, CRM hygiene, and lifecycle journeys", "Repeatable engagement workflows with measurable outcomes"],
    outcome: "Premium conversions increased. Enterprise pipeline deepened. Retention improved through account-level engagement at scale.",
  },
];

const pricingTiers = [
  {
    tag: "One-time",
    title: "Marketing Audit",
    price: "$1,500",
    cadence: "one-time",
    description: "Find exactly where your pipeline is breaking and what to fix immediately.",
    bullets: ["ICP and messaging alignment review", "Competitive positioning gap analysis", "Channel efficiency and attribution audit", "30-day quick-win roadmap", "Executive-ready PDF + live debrief"],
    cta: "Buy the Audit",
    stripeUrl: STRIPE_AUDIT,
    highlight: false,
  },
  {
    tag: "Most Popular",
    title: "Pipeline Acceleration",
    price: "$2,000",
    cadence: "/ month",
    description: "Ongoing strategy, execution, and optimization to drive consistent pipeline growth.",
    bullets: ["Demand gen + ABM strategy and execution", "Multi-channel activation", "CRM hygiene, lead scoring + SQL handoff", "Monthly pipeline reporting with attribution", "Sales enablement content + objection handling"],
    cta: "Start the Retainer",
    stripeUrl: STRIPE_RETAINER,
    highlight: true,
  },
  {
    tag: "Enterprise",
    title: "Embedded Growth Partner",
    price: "$5,000",
    cadence: "/ month",
    description: "I step inside your business and build revenue with you.",
    bullets: ["GTM architecture: ICP, positioning, channel mix", "Partner, alliance + co-marketing programs", "Team mentoring and hiring guidance", "Board-level pipeline and revenue reporting", "Fractional CMO presence for fundraise or rebrand"],
    cta: "Let\u2019s Talk",
    stripeUrl: STRIPE_FRACTIONAL,
    highlight: false,
  },
];

const writingTiers = [
  { tier: "One-time", title: "Single Piece", price: "From $100", desc: "One article, essay, LinkedIn post, or executive bio. Sharp, on-brand, and ready to publish." },
  { tier: "Monthly", title: "Content Retainer", price: "From $1,500/mo", desc: "4\u20138 pieces per month. LinkedIn ghostwriting, thought leadership, newsletters, or blog content." },
  { tier: "Project", title: "Executive Ghostwriting", price: "Custom", desc: "Speeches, books, white papers, keynote scripts, or board-level communications." },
  { tier: "Deep work", title: "Brand Voice & Messaging", price: "From $2,000", desc: "Full brand voice guide, messaging framework, and on-brand copy your team can use forever." },
];

const principles = [
  { title: "Language is infrastructure", text: "Your words are the first thing people judge you by. Before the product. Before the demo. Before the price. Most companies underfund language and wonder why the pipeline is weak. It's a writing problem. I learned this by being the writer inside the revenue team, watching good strategies die because nobody could explain them." },
  { title: "Pipeline is a story problem", text: "Most funnels don't fail because of bad strategy. They fail because the message is muddy, the offer is unclear, and the next step costs too much friction. Fix the story. The pipeline follows. I've watched this happen enough times that it stopped surprising me." },
  { title: "Reinvention is a skill", text: "I've rebuilt my career, my voice, and my life more than once. Not as a pivot. As a sharpening. The best brands do the same thing — they keep getting more precise about who they are and who they're for. That clarity converts. It also, for what it's worth, makes the work worth doing." },
];

const featuredWriting = [
  { title: "Pipeline, Prestige, and the Psychology of Value", type: "Essay" },
  { title: "Why Most Marketing Feels Expensive and Accomplishes Nothing", type: "Point of View" },
  { title: "The Woman Behind the Work", type: "Memoir Thread" },
];

const logos = ["Vonage", "Mercer", "Take-Two", "Atlantic Ultraviolet", "Thrive", "ProVen", "UBS"];

const aboutParagraphs = [
  "I started as a writer. Not as a hobby or a side project — as a calling. I just spent a decade disguising it as a career. Demand gen at Vonage. Partner marketing at Take-Two. Pipeline strategy at Mercer. Underneath all of it: the same person who needed the words to work. Who went home and wrote poetry and spoken word pieces and draft memoir pages nobody asked for.",
  "I grew up in New York. I've reinvented myself more than once, not because I was lost, but because I kept getting more precise. I know what it is to lose certainty — a relationship, a version of yourself you'd outgrown — and come out the other side harder to ignore. That experience lives in every piece of work I produce. I don't write generic. I don't build noise.",
  "Now I do both things out loud. The consulting is real — $40M+ in pipeline, clients who actually close deals. The writing is real — The Dispatch, The Margins, the memoir I'm drafting between client calls, the TikToks I make at midnight because something needed to be said. You get the strategist and the human. That's not a liability. It's the only thing that makes this worth doing.",
];

const alaCarte = [
  "Growth and brand audits", "Partner marketing playbooks", "ABM strategy and ICP refinement",
  "Lifecycle and email sequencing", "Lead gen to pipeline handoff", "Sales enablement",
  "Go-to-market launch planning", "Content and editorial strategy", "Conversion copywriting",
  "Creative direction", "Event and field marketing", "Executive ghostwriting",
];

const faqItems = [
  { q: "What kind of clients do you work with?", a: "Founders who need a voice, revenue teams who need a system, and executives who need someone who can hold the strategy and write the keynote. B2B, enterprise, and growth-stage companies across tech, SaaS, and professional services. Occasionally someone who just needs a really good letter written. I've done all of it." },
  { q: "How is this different from an agency?", a: "Agencies sell deliverables. I build leverage. Every engagement is scoped to your stage, your team, and the revenue outcomes that matter most. No layers. No account managers. Direct access to the strategist doing the work — who also happens to be the writer doing the work." },
  { q: "Do you write with AI?", a: "Not for client work. Every word I deliver is written by me, which means it sounds like you — not like a press release someone generated and a junior edited. Your voice, your authority, your audience. Ghost or credited. Every word earns its place." },
  { q: "What does the fractional engagement look like?", a: "Embedded. I step inside the business — GTM architecture, partner programs, team mentoring, board-level reporting. Think fractional CMO without the full-time overhead or the ego. Minimum 3-month engagement." },
  { q: "What is The Dispatch?", a: "Twice a month. An honest letter about reinvention, language, and what it takes to build something when you're also becoming someone. Not a newsletter full of marketing tips. More like an essay with a business card attached. It's free. You should be on it." },
];

const marqueeItems = [
  "Copywriting", "Ghostwriting", "Demand Generation", "ABM Strategy",
  "The Dispatch", "Sales Enablement", "Brand Voice", "The Margins",
  "GTM Strategy", "Pipeline Acceleration", "Memoir in Progress", "Executive Messaging",
];

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function check() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 200) {
        setHidden(false);
        window.removeEventListener("scroll", check);
      }
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);
  return { ref, cls: hidden ? "reveal reveal-hidden" : "reveal visible" };
}

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

function RevealSection({ children, id, bg = "obsidian", num }: { children: ReactNode; id?: string; bg?: "void" | "obsidian"; num?: string }) {
  const { ref, cls } = useReveal();
  return (
    <section
      ref={ref}
      id={id}
      className={`${cls} relative`}
      style={{ background: bg === "void" ? "#080808" : "#111111", padding: "clamp(5rem, 10vw, 9rem) 0" }}
    >
      <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
        {num && (
          <p className="mb-8 font-mono text-xs tracking-[0.2em] text-iron">{num}</p>
        )}
        {children}
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">{children}</p>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display uppercase tracking-[0.02em] text-white" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: "0.92" }}>
      {children}
    </h2>
  );
}

function H3Script({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-serif text-2xl italic text-pearl md:text-3xl lg:text-4xl" style={{ fontWeight: 700, lineHeight: 1.15 }}>
      {children}
    </h3>
  );
}

function QuoteDivider({ index }: { index: number }) {
  const q = quotes[index % quotes.length];
  const { ref, cls } = useReveal();
  return (
    <div ref={ref} className={`${cls} bg-obsidian`} style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}>
      <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
        <div className="relative border-l-2 border-petal pl-6 md:pl-10">
          <span className="absolute -left-4 -top-8 font-serif text-[8rem] leading-none text-petal/[0.12] select-none">&ldquo;</span>
          <blockquote className="font-serif text-xl italic leading-relaxed text-smoke md:text-2xl" style={{ fontWeight: 600 }}>
            {q.text}
          </blockquote>
          <p className="mt-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.3em] text-ash">
            {q.author}
          </p>
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden border-y border-graphite bg-void py-4">
      <div className="marquee-track flex w-max items-center gap-0">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span className="font-display text-lg uppercase tracking-[0.02em] text-iron">{item}</span>
            <span className="text-petal/60">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function BtnPrimary({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void transition-colors duration-300">
      {children}
    </a>
  );
}

function BtnGhost({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em]">
      {children}
    </a>
  );
}

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="group/arrow inline-flex items-center gap-2 font-body text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-petal transition-colors hover:text-blush">
      {children}
      <span className="transition-transform duration-300 group-hover/arrow:translate-x-1">&rarr;</span>
    </a>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-px bg-graphite">
      {faqItems.map((item, i) => (
        <div key={i} className="bg-carbon">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-5 text-left font-body text-base font-medium text-pearl transition-colors hover:text-petal"
          >
            {item.q}
            <span className={`ml-4 font-display text-2xl text-petal transition-transform duration-300 ${open === i ? "rotate-45" : ""}`} style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>+</span>
          </button>
          <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`} style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div className="overflow-hidden">
              <p className="px-6 pb-6 font-body text-sm font-light leading-7 text-smoke">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Pricing", href: "#pricing" },
    { label: "The Dispatch", href: "#dispatch" },
    { label: "About", href: "#about" },
  ];

  return (
    <div className="min-h-screen">

      {/* ── NAV ────────────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-graphite bg-void/[0.92] backdrop-blur-[12px]"
            : "bg-void/75 backdrop-blur-[12px]"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
          <a href="#" className="font-display text-2xl tracking-[0.02em] text-white" style={{ lineHeight: 1 }}>
            MK PARRISH
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="nav-link font-body text-[0.7rem] font-medium uppercase tracking-[0.15em] text-ash transition-colors hover:text-pearl">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary hidden px-5 py-2.5 font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-void sm:inline-flex">
              Book a Call
            </a>
            <button onClick={() => setMobileNav(!mobileNav)} className="flex flex-col gap-1.5 md:hidden" aria-label="Menu">
              <span className={`block h-px w-6 bg-pearl transition-all duration-300 ${mobileNav ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-pearl transition-all duration-300 ${mobileNav ? "opacity-0" : ""}`} />
              <span className={`block h-px w-6 bg-pearl transition-all duration-300 ${mobileNav ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
        {mobileNav && (
          <nav className="border-t border-graphite bg-void/95 px-6 py-6 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-5">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setMobileNav(false)} className="font-body text-sm uppercase tracking-[0.15em] text-ash transition hover:text-pearl">
                  {l.label}
                </a>
              ))}
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary mt-2 inline-flex justify-center px-5 py-3 font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-void">
                Book a Call
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative flex min-h-svh flex-col justify-end bg-void pb-16 pt-24 md:pb-24">
        {/* Pink glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.18),transparent_70%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Marketing Strategist &middot; Ghostwriter &middot; Writer
          </p>
          <h1 className="mt-6 font-display uppercase tracking-[0.02em] text-white" style={{ fontSize: "clamp(5rem, 16vw, 18rem)", lineHeight: "0.88" }}>
            Words that{" "}
            <span className="text-petal" style={{ textShadow: "0 0 30px rgba(242,175,198,0.4)" }}>move</span>
            <br />
            pipeline
          </h1>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Writer first. Strategist always.
          </p>
          <div className="mt-6 max-w-2xl">
            <p className="font-body text-base font-light leading-7 text-smoke" style={{ maxWidth: "68ch" }}>
              I spent a decade building pipeline for companies that couldn&apos;t tell their own story. Then I figured out mine. Now I do both — sharp copy, real strategy, and the kind of honesty that makes the right people stop scrolling. No AI fluff. No generic templates. Just words that work and pipeline you can show your board.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <BtnPrimary href={CALENDLY_URL}>Book a Strategy Call</BtnPrimary>
            <BtnGhost href="#dispatch">Read The Dispatch</BtnGhost>
          </div>

          {/* Stats */}
          <div className="stagger mt-16 grid grid-cols-2 gap-px bg-graphite sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="reveal visible bg-void p-6">
                <p className="font-display text-4xl tracking-[0.02em] text-white md:text-5xl">{s.num}</p>
                <p className="mt-2 font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ash">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ────────────────────────────────────────────── */}
      <Marquee />

      {/* ── LOGOS ──────────────────────────────────────────────── */}
      <RevealSection bg="obsidian">
        <Eyebrow>Trusted Across Teams</Eyebrow>
        <div className="mt-6 grid grid-cols-2 gap-px bg-graphite sm:grid-cols-4 lg:grid-cols-7">
          {logos.map((logo) => (
            <div key={logo} className="flex items-center justify-center bg-obsidian px-4 py-5 font-body text-sm font-medium tracking-wide text-iron transition-colors hover:text-petal">
              {logo}
            </div>
          ))}
        </div>
      </RevealSection>


      {/* ── SERVICES ───────────────────────────────────────────── */}
      <RevealSection id="services" bg="void">
        <Eyebrow>What I Do</Eyebrow>
        <H2>
          Six capabilities.{" "}
          <span className="text-petal">One outcome.</span>
        </H2>
        <H3Script>Every engagement loops back to revenue.</H3Script>
        <p className="mt-4 max-w-2xl font-body text-base font-light leading-7 text-smoke">
          Choose a lane or stack them — each is scoped to your stage and the outcomes that matter most.
        </p>
        <div className="stagger mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {serviceItems.map((s) => (
            <div key={s.title} className="reveal visible group relative bg-void p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(242,175,198,0.08)]" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{s.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{s.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>


      {/* ── WRITING ────────────────────────────────────────────── */}
      <RevealSection id="writing" bg="obsidian">
        <Eyebrow>Copywriting & Ghostwriting</Eyebrow>
        <H2>
          Words that carry weight{" "}
          <span className="text-petal">and convert.</span>
        </H2>
        <p className="mt-6 max-w-2xl font-body text-base font-light leading-7 text-smoke">
          From LinkedIn thought leadership to executive keynotes to long-form essays — I write in your voice, with your authority, for your audience. Ghost or credited. No AI fluff. No generic templates. I started as a writer. Everything I do in strategy comes back to that.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid grid-cols-1 gap-px bg-graphite sm:grid-cols-2">
            {writingTiers.map((item) => (
              <div key={item.title} className="bg-obsidian p-6">
                <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-iron">{item.tier}</p>
                <h3 className="mt-3 font-display text-xl uppercase tracking-[0.02em] text-pearl">{item.title}</h3>
                <p className="mt-2 font-body text-base font-bold text-petal">{item.price}</p>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="border border-graphite bg-carbon p-8 lg:p-10">
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">How it works</p>
            <p className="mt-6 font-serif text-2xl italic leading-9 text-pearl md:text-3xl md:leading-10" style={{ fontWeight: 600 }}>
              You talk. I write. It sounds exactly like you — only sharper, more deliberate, and built to move people.
            </p>
            <ul className="mt-8 space-y-3">
              {["LinkedIn ghostwriting & thought leadership", "Executive speeches & keynote scripts", "Long-form essays & published articles", "Newsletter & email copy", "White papers & case studies", "Book proposals & manuscript support"].map((item) => (
                <li key={item} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 bg-petal" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3">
              <a href={STRIPE_WRITING} target="_blank" rel="noreferrer" className="btn-primary flex w-full items-center justify-center px-6 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void">
                Buy a Single Piece
              </a>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-ghost flex w-full items-center justify-center px-6 py-3.5 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em]">
                Discuss a Larger Project &rarr;
              </a>
            </div>
          </div>
        </div>
      </RevealSection>


      {/* ── FEATURED WRITING ───────────────────────────────────── */}
      <RevealSection bg="void">
        <Eyebrow>Featured Writing</Eyebrow>
        <H2>Featured writing.</H2>
        <H3Script>The mind behind the strategy.</H3Script>
        <div className="stagger mt-10 grid gap-px bg-graphite md:grid-cols-3">
          {featuredWriting.map((item) => (
            <div key={item.title} className="reveal visible group cursor-pointer bg-void p-8 transition-all duration-300 hover:-translate-y-1" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-iron">{item.type}</p>
              <p className="mt-4 font-serif text-xl italic text-pearl" style={{ fontWeight: 700 }}>{item.title}</p>
              <span className="mt-6 inline-block font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal transition-colors group-hover:text-blush">Read &rarr;</span>
            </div>
          ))}
        </div>
      </RevealSection>


      {/* ── THE DISPATCH ───────────────────────────────────────── */}
      <RevealSection id="dispatch" bg="obsidian">
        <div className="grid gap-px bg-graphite lg:grid-cols-[1fr_1fr]">
          <div className="bg-obsidian p-8 lg:p-12">
            <Eyebrow>The Dispatch</Eyebrow>
            <H2>
              An honest letter.{" "}
              <span className="text-petal">Twice a month.</span>
            </H2>
            <H3Script>Not tips. Not tactics. Actually worth opening.</H3Script>
            <p className="mt-6 font-body text-base font-light leading-7 text-smoke" style={{ maxWidth: "60ch" }}>
              About reinvention, language, and the work of becoming. For people who want to actually think about what they&apos;re building — not just how to post about it. It&apos;s free. Your inbox can handle it.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <BtnPrimary href={BEEHIIV_URL}>Get on the List</BtnPrimary>
              <a href={PATREON_URL} target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em]">
                Join The Margins
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-between bg-carbon p-8 lg:p-12">
            <div>
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-iron">What you&apos;ll find inside</p>
              <ul className="mt-8 space-y-5">
                {[
                  "Essays about reinvention that don\u2019t sound like a LinkedIn post",
                  "Behind-the-scenes on building a brand and a business at the same time",
                  "Honest takes on marketing, writing, and what actually works",
                  "Early access to new work, offers, and things before they go public",
                ].map((item) => (
                  <li key={item} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 bg-petal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 border-l-2 border-petal bg-void p-6">
              <p className="font-serif text-lg italic leading-8 text-pearl" style={{ fontWeight: 600 }}>
                &ldquo;The margins are where the real thinking lives. Everything else is the performance of thinking.&rdquo;
              </p>
              <p className="mt-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.3em] text-ash">
                &mdash; M.K.
              </p>
            </div>
          </div>
        </div>
      </RevealSection>


      {/* ── THINKING / PRINCIPLES ──────────────────────────────── */}
      <RevealSection id="thinking" bg="void">
        <Eyebrow>How I Think</Eyebrow>
        <H2>The strategic point of view.</H2>
        <H3Script>Great brands are built twice. First in language, then in systems.</H3Script>
        <div className="stagger mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {principles.map((item) => (
            <div key={item.title} className="reveal visible bg-void p-8">
              <p className="font-display text-lg uppercase tracking-[0.02em] text-petal">{item.title}</p>
              <p className="mt-5 font-body text-sm font-light leading-7 text-smoke">{item.text}</p>
            </div>
          ))}
        </div>
      </RevealSection>


      {/* ── CASE STUDIES ───────────────────────────────────────── */}
      <RevealSection id="work" bg="obsidian">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Selected Work</Eyebrow>
            <H2>Strategy &rarr; outcomes.</H2>
          </div>
          <ArrowLink href="#services">What I offer</ArrowLink>
        </div>
        <div className="grid gap-px bg-graphite lg:grid-cols-3">
          {caseStudies.map((item) => (
            <div key={item.title} className="group relative bg-obsidian p-8 transition-all duration-300 hover:-translate-y-1" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
              <div className="mb-5 inline-flex items-baseline gap-2 border border-petal/20 bg-petal/[0.06] px-4 py-2">
                <span className="font-display text-3xl text-petal">{item.metric}</span>
                <span className="font-body text-[0.65rem] uppercase tracking-[0.14em] text-petal/70">{item.metricLabel}</span>
              </div>
              <p className="font-body text-sm text-ash">{item.subtitle}</p>
              <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{item.title}</h3>
              <ul className="mt-6 space-y-3">
                {item.bullets.map((b) => (
                  <li key={b} className="flex gap-3 font-body text-sm font-light leading-7 text-smoke">
                    <span className="mt-2.5 h-1 w-1 flex-shrink-0 bg-petal" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-l-2 border-petal bg-carbon p-5">
                <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-iron">Outcome</p>
                <p className="mt-2 font-body text-sm font-light leading-7 text-smoke">{item.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>


      {/* ── PRICING ────────────────────────────────────────────── */}
      <RevealSection id="pricing" bg="void">
        <Eyebrow>Consulting Menu</Eyebrow>
        <H2>
          Three ways to{" "}
          <span className="text-petal">work together.</span>
        </H2>
        <H3Script>Everything loops back to pipeline.</H3Script>
        <p className="mt-4 max-w-2xl font-body text-base font-light leading-7 text-smoke">
          Choose a lane — or stack them. Every engagement is scoped to your stage, your team, and the revenue outcomes that matter most.
        </p>

        <div className="mt-12 grid gap-px bg-graphite lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.title}
              className={`relative flex flex-col p-8 transition-all duration-300 hover:-translate-y-1 ${
                tier.highlight
                  ? "bg-carbon shadow-[0_0_60px_rgba(242,175,198,0.08)]"
                  : "bg-void"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              {tier.highlight && (
                <div className="absolute inset-x-0 top-0 h-px bg-petal" />
              )}
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-iron">{tier.tag}</p>
              <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{tier.title}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-4xl text-white">{tier.price}</span>
                <span className="font-body text-sm text-ash">{tier.cadence}</span>
              </div>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{tier.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {tier.bullets.map((b) => (
                  <li key={b} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 bg-petal" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={tier.stripeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex w-full items-center justify-center py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    tier.highlight
                      ? "btn-primary text-void"
                      : "btn-ghost"
                  }`}
                >
                  {tier.cta}
                </a>
                <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center py-2.5 font-body text-[0.7rem] font-medium uppercase tracking-[0.15em] text-ash transition hover:text-petal">
                  Or schedule a call first &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-graphite pt-10">
          <p className="mb-6 font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-iron">Also available &agrave; la carte</p>
          <div className="grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-4">
            {alaCarte.map((s) => (
              <div key={s} className="bg-void px-5 py-4 font-body text-sm font-light text-smoke transition-colors hover:text-petal">
                {s}
              </div>
            ))}
          </div>
        </div>
      </RevealSection>


      {/* ── ABOUT ──────────────────────────────────────────────── */}
      <RevealSection id="about" bg="obsidian">
        <div className="grid gap-px bg-graphite lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-obsidian p-8 lg:p-10">
            <Eyebrow>About</Eyebrow>
            <h2 className="font-display uppercase tracking-[0.02em] text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: "0.92" }}>
              I started as a writer.
            </h2>
            <p className="mt-4 font-serif text-xl italic text-petal md:text-2xl" style={{ fontWeight: 600 }}>
              Everything else is what I built around it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Writer", "Demand Generation", "ABM", "Ghostwriting", "GTM Strategy", "The Dispatch"].map((tag) => (
                <span key={tag} className="border border-petal/25 bg-petal/[0.06] px-4 py-2 font-body text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-petal">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-obsidian p-8 lg:p-10">
            <div className="space-y-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "68ch" }}>
              {aboutParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>


      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <RevealSection id="faq" bg="void">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <H2>Before the first call.</H2>
            <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">
              If your question isn&apos;t here, book a call. No pitch. Just clarity.
            </p>
          </div>
          <FAQ />
        </div>
      </RevealSection>


      {/* ── CONTACT ────────────────────────────────────────────── */}
      <RevealSection id="contact" bg="obsidian">
        <div className="grid gap-px bg-graphite lg:grid-cols-[1fr_0.85fr]">
          <div className="relative bg-obsidian p-8 lg:p-10">
            {/* Subtle glow */}
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 bg-[radial-gradient(circle,rgba(242,175,198,0.08),transparent_70%)]" />
            <Eyebrow>Let&rsquo;s build something serious</Eyebrow>
            <h2 className="font-display uppercase tracking-[0.02em] text-white" style={{ fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: "0.92" }}>
              If your brand is smaller than your ambition.
            </h2>
            <p className="mt-3 font-serif text-xl italic text-petal md:text-2xl" style={{ fontWeight: 600 }}>
              That&apos;s exactly where I come in.
            </p>
            <p className="mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "68ch" }}>
              Full-time leadership, freelance projects, consulting retainers, strategic partnership builds, writing engagements, or a conversation about something you&apos;re still figuring out. It all starts the same way. Keep it human, sharp, and outcome-driven.
            </p>
            <div className="mt-8 grid gap-px bg-graphite sm:grid-cols-3">
              {[
                { label: "Email", value: "mkp414@icloud.com", href: "mailto:mkp414@icloud.com" },
                { label: "LinkedIn", value: "/in/mkparrish", href: "https://www.linkedin.com/in/mkparrish" },
                { label: "Phone", value: "347.853.4238", href: "tel:3478534238" },
              ].map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="bg-obsidian p-5 transition-colors hover:bg-carbon">
                  <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-iron">{c.label}</p>
                  <p className="mt-2 font-body text-sm text-pearl">{c.value}</p>
                </a>
              ))}
            </div>
            <div className="mt-8">
              <BtnPrimary href={CALENDLY_URL}>Book a Strategy Call &rarr;</BtnPrimary>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-obsidian p-8 lg:p-10">
            <div>
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-iron">Final impression</p>
              <p className="mt-6 font-serif text-2xl italic leading-10 text-pearl md:text-3xl md:leading-[1.4]" style={{ fontWeight: 700 }}>
                The right words don&apos;t just tell people you&apos;re good. They change the room before you enter it.
              </p>
              <p className="mt-6 font-body text-[0.7rem] font-bold uppercase tracking-[0.3em] text-ash">
                &mdash; M.K.
              </p>
            </div>
            <div className="mt-10 space-y-px bg-graphite">
              {[
                { label: "Marketing Audit \u2014 $1.5K", url: STRIPE_AUDIT },
                { label: "Pipeline Acceleration \u2014 $2K/mo", url: STRIPE_RETAINER },
                { label: "Embedded Growth Partner \u2014 $5K/mo", url: STRIPE_FRACTIONAL },
              ].map((item) => (
                <a key={item.label} href={item.url} target="_blank" rel="noreferrer" className="flex w-full items-center justify-between bg-obsidian px-5 py-4 font-body text-sm text-smoke transition-colors hover:text-petal">
                  <span>{item.label}</span>
                  <span className="text-iron">&rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={0} />

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="border-t border-graphite bg-void" style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}>
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl">MK Parrish</p>
              <p className="mt-1 font-body text-sm font-light text-ash">Writer. Strategist. One-woman reinvention.</p>
            </div>
            <div className="flex flex-wrap gap-6">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} className="nav-link font-body text-[0.7rem] font-medium uppercase tracking-[0.15em] text-ash transition hover:text-pearl">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-10 border-t border-graphite pt-8">
            <p className="font-body text-[0.7rem] font-light tracking-[0.1em] text-iron">
              Built different. Billed accordingly. &mdash; M.K.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
