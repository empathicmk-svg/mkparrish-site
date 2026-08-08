"use client";

// ─────────────────────────────────────────────────────────────────────────────
// iDeals Integrated Campaign Manager — portfolio microsite.
// Opens in MK Parrish's dark-luxury brand, then transitions — via a scroll-driven
// palette engine — into a boardroom "advisory" navy/gold as the reader descends
// into the case studies. Signals range: creative brand → institutional demand gen.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { CONTACT, BOOK_CALL_URL } from "@/app/lib/config";
import {
  AUDIENCE,
  REQUIREMENTS,
  HEADLINE_KPIS,
  CASE_01,
  CASE_02,
  CASE_03,
  IDEALS_FIT,
  CONTACT_CTA,
} from "./data";
import {
  Reveal,
  Stat,
  Funnel,
  Bars,
  ABToggle,
  RegionSwitcher,
  Modal,
  FloatingCTA,
} from "./parts";

// ── Palette transition: MK petal-pink → advisory champagne-gold ───────────────
const ACCENT_FROM = [255, 181, 208]; // petal
const ACCENT_TO = [201, 168, 106]; // champagne gold
function lerpColor(a: number[], b: number[], t: number) {
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

const SECTIONS = [
  { id: "top", label: "Open" },
  { id: "brief", label: "The Brief" },
  { id: "metrics", label: "At a Glance" },
  { id: "case-01", label: "Integrated" },
  { id: "case-02", label: "Events" },
  { id: "case-03", label: "Localization" },
  { id: "fit", label: "iDeals Fit" },
  { id: "contact", label: "Contact" },
];

export default function Microsite() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const advRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [memoOpen, setMemoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeSec, setActiveSec] = useState("top");

  // Scroll-driven palette + progress engine (refs, no re-render on scroll).
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? clamp01(window.scrollY / scrollable) : 0;

      // Progress bar
      if (barRef.current) barRef.current.style.width = `${p * 100}%`;

      // Accent shifts from petal to gold across the mid-scroll.
      const accentT = clamp01((p - 0.08) / 0.34);
      const accent = lerpColor(ACCENT_FROM, ACCENT_TO, accentT);
      rootRef.current?.style.setProperty("--id-accent", accent);

      // Advisory navy background fades in; the pink hero glow fades out.
      const adv = clamp01((p - 0.05) / 0.28);
      if (advRef.current) advRef.current.style.opacity = String(adv);
      if (glowRef.current) glowRef.current.style.opacity = String(1 - adv);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Active section for the progress rail.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSec((e.target as HTMLElement).dataset.sec || "top");
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    document.querySelectorAll("[data-sec]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="id-root relative" style={{ "--id-accent": "rgb(255,181,208)" } as React.CSSProperties}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Fixed background layers (brand → boardroom transition) */}
      <div className="id-bg" aria-hidden>
        <div ref={glowRef} className="id-glow" />
        <div className="id-grid" />
        <div ref={advRef} className="id-adv" style={{ opacity: 0 }} />
      </div>

      {/* Top scroll progress bar */}
      <div className="id-progress" aria-hidden>
        <div ref={barRef} className="id-progress-fill" />
      </div>

      {/* Minimal standalone top bar */}
      <header className="id-topbar">
        <div className="id-wrap flex items-center justify-between">
          <Link href="/" className="id-wordmark" aria-label="MK Parrish home">
            <span className="id-wordmark-mark" style={{ background: "var(--id-accent)" }} />
            MK PARRISH
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="id-topbar-link hidden sm:inline-flex">
              mkparrish.com ↗
            </Link>
            <button onClick={() => window.print()} className="id-topbar-link">
              Save PDF
            </button>
            <button onClick={() => setContactOpen(true)} className="id-btn-accent id-btn-sm">
              Contact
            </button>
          </div>
        </div>
      </header>

      {/* Section rail (desktop) */}
      <nav className="id-rail" aria-label="Sections">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="id-rail-item" data-active={activeSec === s.id}>
            <span className="id-rail-dot" />
            <span className="id-rail-label">{s.label}</span>
          </a>
        ))}
      </nav>

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section id="top" data-sec="top" className="id-hero">
        <div className="id-wrap">
          <Reveal>
            <p className="id-eyebrow">
              Portfolio · Prepared for {AUDIENCE.company} — Attn: {AUDIENCE.hiringManager}, {AUDIENCE.hiringManagerTitle}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="id-h1 mt-6">
              Campaigns that move
              <br />
              <span className="id-h1-accent">pipeline</span>, not impressions.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="id-lede mt-7">
              {AUDIENCE.candidate} — a working portfolio for the{" "}
              <strong className="text-pearl">{AUDIENCE.role}</strong> role. Three campaigns owned end-to-end,
              built for the way {AUDIENCE.company} sells: high-stakes, security-centric SaaS into M&A, due
              diligence, and dealmaking. Context, trade-offs, stakeholders, my role — and the numbers.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#case-01" className="id-btn-accent">
                See the campaigns ↓
              </a>
              <button onClick={() => window.print()} className="id-btn-outline">
                Save as PDF
              </button>
              <button onClick={() => setContactOpen(true)} className="id-btn-outline">
                Contact MK
              </button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="id-hero-stats mt-14">
              {HEADLINE_KPIS.map((k) => (
                <Stat key={k.label} data={k} />
              ))}
            </div>
          </Reveal>
        </div>
        <div className="id-scrollcue" aria-hidden>
          <span>Scroll</span>
          <span className="id-scrollcue-line" />
        </div>
      </section>

      {/* Marquee — capability strip */}
      <div className="id-marquee">
        <div className="id-marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="id-marquee-item">
              {m} <span style={{ color: "var(--id-accent)" }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────── THE BRIEF ─────────────────────── */}
      <Section id="brief" eyebrow="What was asked → where it lives" title="The brief, answered line by line">
        <p className="id-body max-w-2xl">
          {AUDIENCE.recruiter}&rsquo;s note asked for concrete recent work — not high-level summaries. Below, every
          request is mapped to the exact part of this portfolio that answers it. Nothing confidential; figures are
          directional and structured for the conversation.
        </p>
        <div className="mt-10 grid gap-px overflow-hidden border md:grid-cols-2" style={{ borderColor: "var(--id-line)", background: "var(--id-line)" }}>
          {REQUIREMENTS.map((r, i) => (
            <Reveal key={r.ask} delay={i * 60}>
              <a href={`#${r.anchor}`} className="id-matrix-cell group">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-body text-[0.82rem] font-bold uppercase tracking-[0.12em] text-pearl">{r.ask}</p>
                  <span className="id-check">✓</span>
                </div>
                <p className="mt-2.5 font-body text-sm font-light leading-6 text-smoke">{r.proof}</p>
                <span className="mt-3 inline-block font-body text-[0.7rem] font-bold uppercase tracking-[0.16em] group-hover:translate-x-1" style={{ color: "var(--id-accent)", transition: "transform .3s" }}>
                  Jump to proof →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─────────────────────── METRICS BAND ─────────────────────── */}
      <Section id="metrics" eyebrow="At a glance" title="The numbers, before the story" tint>
        <p className="id-body max-w-2xl">
          The outcomes these campaigns were built to move. Each one ties back to a commercial objective in the case
          studies below — not reach, not impressions.
        </p>
        <div className="id-bigstats mt-12">
          {[...CASE_01.results.slice(0, 3), ...CASE_02.metrics.slice(3, 4), ...CASE_03.metrics.slice(2, 4)].map((k) => (
            <Reveal key={k.label}>
              <div className="id-bigstat-cell">
                <Stat data={k} big />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─────────────────────── CASE 01 ─────────────────────── */}
      <CaseHeader c={CASE_01} />
      <Section id="case-01" eyebrow={CASE_01.kicker} title={CASE_01.title} noHeadSpace>
        <p className="id-role">{CASE_01.role}</p>
        <p className="id-lede mt-4 max-w-3xl">{CASE_01.oneLiner}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <Block label="01 · Context & objective" body={CASE_01.objective} />
          <Block label="02 · The insight" body={CASE_01.insight} accent />
        </div>

        <div className="id-callout mt-12">
          <div>
            <p className="id-block-label">03 · The escalation — my move</p>
            <p className="id-body mt-3 max-w-3xl">{CASE_01.escalation}</p>
          </div>
          <button onClick={() => setMemoOpen(true)} className="id-btn-accent mt-6 shrink-0">
            Read the escalation memo →
          </button>
        </div>

        {/* Audience */}
        <SubHead n="04" t="Target audience" />
        <div className="mt-6 grid gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: "var(--id-line)", background: "var(--id-line)" }}>
          {CASE_01.audience.map((a) => (
            <div key={a.segment} className="id-surface p-5">
              <p className="font-body text-[0.82rem] font-semibold text-pearl">{a.segment}</p>
              <p className="mt-2 font-body text-[0.82rem] font-light leading-6 text-ash">{a.note}</p>
            </div>
          ))}
        </div>

        {/* Channels */}
        <SubHead n="05" t="Integrated across every channel" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CASE_01.channels.map((ch) => (
            <div key={ch.name} className="id-panel p-5">
              <p className="font-display text-2xl uppercase tracking-[0.02em]" style={{ color: "var(--id-accent)" }}>
                {ch.name}
              </p>
              <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">{ch.detail}</p>
            </div>
          ))}
        </div>

        {/* A/B + funnel */}
        <SubHead n="06" t="Optimization — the message that won" />
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <ABToggle ab={CASE_01.abTest} />
          <div className="id-panel p-6 md:p-8">
            <p className="id-block-label">The account funnel</p>
            <div className="mt-6">
              <Funnel stages={CASE_01.funnel} />
            </div>
          </div>
        </div>

        {/* Trade-offs */}
        <SubHead n="07" t="Decision-making & trade-offs" />
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {CASE_01.tradeoffs.map((t) => (
            <div key={t.decision} className="id-panel flex flex-col p-6">
              <p className="font-display text-xl uppercase tracking-[0.02em] text-white">{t.decision}</p>
              <div className="mt-4 space-y-3 text-sm">
                <p className="font-body font-light leading-6 text-smoke">
                  <span className="id-tag" style={{ color: "var(--id-accent)" }}>Chose</span> {t.chose}
                </p>
                <p className="font-body font-light leading-6 text-ash">
                  <span className="id-tag text-ash">Cut</span> {t.cut}
                </p>
                <p className="font-body font-light italic leading-6 text-smoke">
                  <span className="id-tag" style={{ color: "var(--id-accent)" }}>Why</span> {t.why}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Waterfall + stakeholders */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SubHead n="08" t="Pipeline built ($M)" flush />
            <div className="mt-6">
              <Bars data={CASE_01.waterfall} />
            </div>
          </div>
          <div>
            <SubHead n="09" t="Stakeholders & alignment" flush />
            <div className="mt-6 divide-y" style={{ borderColor: "var(--id-line)" }}>
              {CASE_01.stakeholders.map((s) => (
                <div key={s.who} className="flex gap-4 py-3" style={{ borderColor: "var(--id-line)" }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0" style={{ background: "var(--id-accent)" }} />
                  <p className="font-body text-sm font-light leading-6 text-smoke">
                    <span className="font-semibold text-pearl">{s.who}</span> — {s.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <SubHead n="10" t="Measurable outcomes" />
        <div className="mt-6 grid gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: "var(--id-line)", background: "var(--id-line)" }}>
          {CASE_01.results.map((r) => (
            <div key={r.label} className="id-surface p-6">
              <Stat data={r} />
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Block label="How it was optimized" body={CASE_01.optimization} />
          <Block label="My specific role" body={CASE_01.contribution} accent />
        </div>
      </Section>

      {/* ─────────────────────── CASE 02 ─────────────────────── */}
      <CaseHeader c={CASE_02} />
      <Section id="case-02" eyebrow={CASE_02.kicker} title={CASE_02.title} noHeadSpace>
        <p className="id-role">{CASE_02.role}</p>
        <p className="id-lede mt-4 max-w-3xl">{CASE_02.oneLiner}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <Block label="Context & commercial objective" body={CASE_02.objective} />
          <div>
            <p className="id-block-label">What I owned</p>
            <ul className="mt-4 space-y-3">
              {CASE_02.responsibilities.map((r) => (
                <li key={r} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                  <span className="mt-2 h-1 w-1 shrink-0" style={{ background: "var(--id-accent)" }} />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <SubHead n="·" t="Vendor coordination" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CASE_02.vendors.map((v) => (
            <div key={v.v} className="id-panel p-5">
              <p className="font-display text-xl uppercase tracking-[0.02em]" style={{ color: "var(--id-accent)" }}>{v.v}</p>
              <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">{v.note}</p>
            </div>
          ))}
        </div>

        {/* The adjustment — before/after */}
        <SubHead n="·" t="The adjustment I made mid-program" />
        <div className="id-callout mt-6 flex-col items-stretch gap-6 md:flex-row">
          <div className="flex-1">
            <p className="id-tag text-ash">Before</p>
            <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">{CASE_02.adjustment.before}</p>
            <p className="mt-4 id-tag text-ash">The signal</p>
            <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">{CASE_02.adjustment.signal}</p>
          </div>
          <div className="id-arrow" aria-hidden>→</div>
          <div className="flex-1">
            <p className="id-tag" style={{ color: "var(--id-accent)" }}>After</p>
            <p className="mt-2 font-body text-sm font-light leading-6 text-pearl">{CASE_02.adjustment.after}</p>
            <p className="mt-4 id-tag" style={{ color: "var(--id-accent)" }}>The result</p>
            <p className="mt-2 font-body text-sm font-semibold leading-6 text-pearl">{CASE_02.adjustment.result}</p>
          </div>
        </div>

        <div className="mt-12">
          <Block label="How it supported Sales" body={CASE_02.salesSupport} />
        </div>

        <SubHead n="·" t="How success was measured" />
        <div className="mt-6 grid gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: "var(--id-line)", background: "var(--id-line)" }}>
          {CASE_02.metrics.map((r) => (
            <div key={r.label} className="id-surface p-6">
              <Stat data={r} />
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Block label="My specific role" body={CASE_02.contribution} accent />
        </div>
      </Section>

      {/* ─────────────────────── CASE 03 ─────────────────────── */}
      <CaseHeader c={CASE_03} />
      <Section id="case-03" eyebrow={CASE_03.kicker} title={CASE_03.title} noHeadSpace>
        <p className="id-role">{CASE_03.role}</p>
        <p className="id-lede mt-4 max-w-3xl">{CASE_03.oneLiner}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <Block label="The constraint & objective" body={CASE_03.objective} />
          <div>
            <p className="id-block-label">The strategy</p>
            <ul className="mt-4 space-y-3">
              {CASE_03.strategy.map((r) => (
                <li key={r} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                  <span className="mt-2 h-1 w-1 shrink-0" style={{ background: "var(--id-accent)" }} />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <SubHead n="·" t="One global campaign, adapted region by region" />
        <p className="id-body mt-4 max-w-2xl">
          Select a market to see how the message, channels, events, and localized details changed — the same product
          story, rebuilt for what each region actually rewards.
        </p>
        <div className="mt-8">
          <RegionSwitcher regions={CASE_03.regions} />
        </div>

        <div className="mt-14">
          <Block label="Key messaging decisions" body={CASE_03.messagingDecisions} />
        </div>

        <SubHead n="·" t="Did it improve relevance & performance?" />
        <div className="mt-6 grid gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: "var(--id-line)", background: "var(--id-line)" }}>
          {CASE_03.metrics.map((r) => (
            <div key={r.label} className="id-surface p-6">
              <Stat data={r} />
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Block label="My specific role" body={CASE_03.contribution} accent />
        </div>
      </Section>

      {/* ─────────────────────── iDEALS FIT (advisory pivot) ─────────────────────── */}
      <Section id="fit" eyebrow="The pivot" title={IDEALS_FIT.title} tint>
        <p className="id-lede max-w-3xl">{IDEALS_FIT.intro}</p>

        <div className="mt-12 overflow-hidden border" style={{ borderColor: "var(--id-line)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="id-map-head">What iDeals needs</div>
            <div className="id-map-head id-map-head--accent">What this portfolio proves</div>
          </div>
          {IDEALS_FIT.mapping.map((m, i) => (
            <div key={m.theirs} className="grid grid-cols-1 border-t md:grid-cols-2" style={{ borderColor: "var(--id-line)" }}>
              <div className="id-map-cell" style={{ background: i % 2 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                {m.theirs}
              </div>
              <div className="id-map-cell id-map-cell--right" style={{ background: i % 2 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                {m.mine}
              </div>
            </div>
          ))}
        </div>

        <SubHead n="·" t="My first 90 days" />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {IDEALS_FIT.plan.map((p, i) => (
            <div key={p.window} className="id-panel relative p-6">
              <span className="id-plan-num">{i + 1}</span>
              <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--id-accent)" }}>
                {p.window}
              </p>
              <p className="mt-2 font-display text-2xl uppercase tracking-[0.02em] text-white">{p.focus}</p>
              <p className="mt-3 font-body text-sm font-light leading-6 text-smoke">{p.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─────────────────────── CONTACT ─────────────────────── */}
      <section id="contact" data-sec="contact" className="id-contact">
        <div className="id-wrap text-center">
          <Reveal>
            <p className="id-eyebrow">{AUDIENCE.prepared}</p>
            <h2 className="id-h2 mt-6">{CONTACT_CTA.headline}</h2>
            <p className="id-lede mx-auto mt-6 max-w-2xl">{CONTACT_CTA.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <button onClick={() => setContactOpen(true)} className="id-btn-accent">
                Start the conversation →
              </button>
              <a href={BOOK_CALL_URL} className="id-btn-outline">
                Book a call
              </a>
              <button onClick={() => window.print()} className="id-btn-outline">
                Save this as PDF
              </button>
            </div>
            <p className="mt-8 font-body text-sm text-ash">
              {AUDIENCE.candidate} ·{" "}
              <a href={`mailto:${CONTACT.email}`} className="id-link">{CONTACT.email}</a> ·{" "}
              <a href={`tel:+1${CONTACT.phone.replace(/\D/g, "")}`} className="id-link">{CONTACT.phone}</a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Footer note */}
      <footer className="id-footnote">
        <div className="id-wrap">
          <p>
            Prepared by {AUDIENCE.candidate} for {AUDIENCE.company}, {AUDIENCE.role}. No confidential or
            client-identifying information is included. Metrics are directional and representative — structured to show
            mechanics, decisions, and outcomes for a portfolio conversation, not as disclosures. Certain PR and
            partner details are withheld for confidentiality, as noted.
          </p>
        </div>
      </footer>

      {/* Escalation memo modal */}
      <Modal open={memoOpen} onClose={() => setMemoOpen(false)} title="The escalation memo">
        <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ash">
          Internal · Reconstructed for portfolio · Confidential specifics removed
        </p>
        <div className="mt-5 space-y-4 font-body text-[0.95rem] font-light leading-7 text-smoke">
          <p><span className="text-pearl">To:</span> Head of R&D · Director of Operations</p>
          <p><span className="text-pearl">From:</span> {AUDIENCE.candidate}, Senior Channel Marketing Manager</p>
          <p><span className="text-pearl">Re:</span> Why VBV win rates are flat — and the cheapest way to fix it</p>
          <hr style={{ borderColor: "var(--id-line)" }} />
          <p>
            Team — the Vonage Business Voice launch isn&rsquo;t converting. Win rate is holding at ~22%, essentially
            unchanged from pre-launch. More top-of-funnel spend won&rsquo;t fix a close-rate problem, so I pulled the
            pipeline apart by firmographic and technographic signal to find where deals actually die.
          </p>
          <p>
            <span className="text-pearl">The pattern is stark:</span> ~95% of our active prospects already run
            Salesforce and use it daily. We&rsquo;re asking CRM-native buyers to adopt a phone system that sits{" "}
            <em>beside</em> their system of record instead of <em>inside</em> it. In deal reviews, the recurring loss
            reason isn&rsquo;t price or quality — it&rsquo;s &ldquo;another disconnected tool.&rdquo;
          </p>
          <p>
            <span className="text-pearl">The ask:</span> scope a native Salesforce bundle so VBV lives in the CRM —
            call activity auto-logged against pipeline, no rip-and-replace. This is a product/packaging fix, not a
            campaign fix, which is why it needs R&D and Ops, not more budget. If we build it, I&rsquo;ll wrap it in a
            tiered ABM motion (Enterprise / Mid-Market / SMB, plus reseller SKUs) and re-message the whole funnel
            around native fit.
          </p>
          <p>
            <span className="text-pearl">The math:</span> we&rsquo;re already losing these deals. Closing even a
            fraction of the 95% on fit is the highest-ROI pipeline available to us — cheaper than any net-new demand
            we could buy.
          </p>
          <p className="italic" style={{ color: "var(--id-accent)" }}>
            Outcome: the bundle shipped. Win rate moved 22% → 34%, ACV +27%, blended ROI 7.3:1.
          </p>
        </div>
      </Modal>

      {/* Contact modal */}
      <Modal open={contactOpen} onClose={() => setContactOpen(false)} title="Start the conversation">
        <p className="font-body text-base font-light leading-7 text-smoke">
          The best next step is a working conversation about what {AUDIENCE.company}&rsquo;s first integrated play
          should be. Reach me directly, or book a time — I&rsquo;m happy to walk {AUDIENCE.hiringManager} through any
          case study live.
        </p>
        <div className="mt-6 grid gap-3">
          <a href={`mailto:${CONTACT.email}?subject=iDeals%20Integrated%20Campaign%20Manager%20—%20MK%20Parrish`} className="id-btn-accent w-full justify-center">
            Email {CONTACT.email} →
          </a>
          <a href={`tel:+1${CONTACT.phone.replace(/\D/g, "")}`} className="id-btn-outline w-full justify-center">
            Call {CONTACT.phone}
          </a>
          <a href={BOOK_CALL_URL} className="id-btn-outline w-full justify-center">
            Book a call →
          </a>
        </div>
      </Modal>

      <FloatingCTA email={CONTACT.email} onOpenContact={() => setContactOpen(true)} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Small composition helpers
// ─────────────────────────────────────────────────────────────────────────────

const MARQUEE = [
  "Integrated Campaigns",
  "Account-Based Marketing",
  "Event Marketing",
  "Localization & GTM",
  "Sales Alignment",
  "Pipeline & Win Rate",
  "Channel & Partner",
  "Demand Generation",
  "Positioning",
  "RevOps & Attribution",
];

function Section({
  id,
  eyebrow,
  title,
  children,
  tint = false,
  noHeadSpace = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  tint?: boolean;
  noHeadSpace?: boolean;
}) {
  return (
    <section id={id} data-sec={id} className={`id-section ${tint ? "id-section--tint" : ""}`}>
      <div className="id-wrap">
        {!noHeadSpace && (
          <Reveal>
            <p className="id-eyebrow">{eyebrow}</p>
            <h2 className="id-h2 mt-5 max-w-4xl">{title}</h2>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

// Big numbered header that opens each case study.
function CaseHeader({ c }: { c: { index: string; kicker: string; title: string } }) {
  return (
    <div className="id-casehead" data-sec={undefined}>
      <div className="id-wrap flex items-end justify-between gap-6">
        <div>
          <p className="id-eyebrow">{c.kicker}</p>
          <p className="mt-3 font-display uppercase tracking-[0.02em]" style={{ fontSize: "clamp(1rem,2vw,1.4rem)", color: "var(--id-accent)" }}>
            Case Study
          </p>
        </div>
        <span className="id-casenum">{c.index}</span>
      </div>
    </div>
  );
}

function Block({ label, body, accent = false }: { label: string; body: string; accent?: boolean }) {
  return (
    <Reveal>
      <div className={accent ? "id-block-accent" : ""}>
        <p className="id-block-label">{label}</p>
        <p className="id-body mt-3">{body}</p>
      </div>
    </Reveal>
  );
}

function SubHead({ n, t, flush = false }: { n: string; t: string; flush?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${flush ? "" : "mt-16"}`}>
      <span className="font-mono text-xs tracking-[0.2em] text-iron">{n}</span>
      <span className="h-px flex-1" style={{ background: "var(--id-line)" }} />
      <span className="font-body text-[0.72rem] font-bold uppercase tracking-[0.24em]" style={{ color: "var(--id-accent)" }}>
        {t}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scoped CSS (injected once). style-src allows 'unsafe-inline' per site CSP.
// ─────────────────────────────────────────────────────────────────────────────

const CSS = `
.id-root {
  --id-line: rgba(255,255,255,0.09);
  --id-navy: #0a1627;
  position: relative;
  color: var(--color-pearl);
  isolation: isolate;
}
.id-wrap { max-width: 1180px; margin: 0 auto; padding: 0 clamp(1.25rem, 5vw, 3rem); }

/* Fixed background transition layers */
.id-bg { position: fixed; inset: 0; z-index: -1; background: #070707; overflow: hidden; }
.id-glow {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 90vw 60vh at 50% -5%, rgba(255,181,208,0.16), transparent 60%),
    radial-gradient(ellipse 50vw 40vh at 100% 100%, rgba(217,79,124,0.08), transparent 60%);
}
.id-adv {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 90vw 70vh at 20% 0%, rgba(70,120,180,0.10), transparent 55%),
    radial-gradient(ellipse 70vw 60vh at 90% 100%, rgba(201,168,106,0.09), transparent 55%),
    linear-gradient(160deg, #0a1627 0%, #0b1220 55%, #090d16 100%);
}
.id-grid {
  position: absolute; inset: 0; opacity: 0.5;
  background-image:
    linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%);
  animation: id-grid-pan 40s linear infinite;
}
@keyframes id-grid-pan { to { background-position: 64px 64px; } }

/* Progress bar */
.id-progress { position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 60; background: rgba(255,255,255,0.06); }
.id-progress-fill { height: 100%; width: 0%; background: var(--id-accent); box-shadow: 0 0 12px var(--id-accent); transition: width .1s linear; }

/* Top bar */
.id-topbar { position: sticky; top: 0; z-index: 55; padding: .85rem 0; background: rgba(8,9,13,0.72); backdrop-filter: blur(14px); border-bottom: 1px solid var(--id-line); }
.id-wordmark { display: inline-flex; align-items: center; gap: .6rem; font-family: var(--font-display); font-size: 1.25rem; letter-spacing: .06em; color: var(--color-pearl); text-transform: uppercase; }
.id-wordmark-mark { width: 10px; height: 10px; display: inline-block; box-shadow: 0 0 12px var(--id-accent); }
.id-topbar-link { display: inline-flex; align-items: center; padding: .5rem .75rem; font-family: var(--font-body); font-size: .68rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--color-smoke); background: transparent; border: 1px solid transparent; cursor: pointer; transition: color .3s; }
.id-topbar-link:hover { color: var(--id-accent); }
.id-btn-sm { padding: .5rem 1rem; font-size: .68rem; }

/* Section rail */
.id-rail { position: fixed; right: 22px; top: 50%; transform: translateY(-50%); z-index: 50; display: none; flex-direction: column; gap: 14px; }
@media (min-width: 1280px) { .id-rail { display: flex; } }
.id-rail-item { position: relative; display: flex; align-items: center; justify-content: flex-end; height: 12px; }
.id-rail-dot { position: absolute; right: 0; width: 8px; height: 8px; background: rgba(255,255,255,0.25); transition: all .3s; }
.id-rail-label { position: absolute; right: 18px; white-space: nowrap; font-family: var(--font-body); font-size: .62rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: transparent; transition: color .3s; }
.id-rail-item:hover .id-rail-label { color: var(--color-smoke); }
.id-rail-item[data-active="true"] .id-rail-dot { background: var(--id-accent); box-shadow: 0 0 10px var(--id-accent); transform: scale(1.4); }
.id-rail-item[data-active="true"] .id-rail-label { color: var(--id-accent); }

/* Typography */
.id-eyebrow { font-family: var(--font-body); font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .28em; color: var(--id-accent); }
.id-h1 { font-family: var(--font-display); text-transform: uppercase; color: #fff; letter-spacing: .01em; line-height: .9; font-size: clamp(2.8rem, 8vw, 7rem); }
.id-h1-accent { color: var(--id-accent); text-shadow: 0 0 40px color-mix(in srgb, var(--id-accent) 40%, transparent); }
.id-h2 { font-family: var(--font-display); text-transform: uppercase; color: #fff; letter-spacing: .02em; line-height: .94; font-size: clamp(2.2rem, 5.5vw, 4.6rem); }
.id-lede { font-family: var(--font-body); font-weight: 300; line-height: 1.7; color: var(--color-smoke); font-size: clamp(1rem, 1.5vw, 1.22rem); }
.id-body { font-family: var(--font-body); font-weight: 300; line-height: 1.75; color: var(--color-smoke); font-size: .98rem; }
.id-role { font-family: var(--font-mono); font-size: .78rem; letter-spacing: .06em; color: var(--color-ash); }
.id-block-label { font-family: var(--font-body); font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .22em; color: var(--id-accent); }
.id-block-accent { border-left: 2px solid var(--id-accent); padding-left: 1.5rem; }
.id-link { color: var(--id-accent); border-bottom: 1px solid color-mix(in srgb, var(--id-accent) 40%, transparent); }
.id-tag { display: inline-block; font-family: var(--font-body); font-size: .64rem; font-weight: 800; text-transform: uppercase; letter-spacing: .14em; margin-right: .5rem; }

/* Hero */
.id-hero { position: relative; padding: clamp(5rem, 11vh, 8rem) 0 clamp(4rem, 8vw, 7rem); }
.id-hero-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(1.5rem, 4vw, 3rem); }
@media (min-width: 900px) { .id-hero-stats { grid-template-columns: repeat(4, 1fr); } }
.id-scrollcue { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; font-family: var(--font-body); font-size: .6rem; font-weight: 700; letter-spacing: .3em; text-transform: uppercase; color: var(--color-ash); }
.id-scrollcue-line { width: 1px; height: 40px; background: linear-gradient(var(--id-accent), transparent); animation: id-cue 2s ease-in-out infinite; }
@keyframes id-cue { 0%,100% { opacity: .3; transform: scaleY(.6); } 50% { opacity: 1; transform: scaleY(1); } }

/* Marquee */
.id-marquee { overflow: hidden; border-top: 1px solid var(--id-line); border-bottom: 1px solid var(--id-line); padding: 1.1rem 0; background: rgba(0,0,0,0.25); }
.id-marquee-track { display: flex; width: max-content; gap: 0; animation: id-marquee 34s linear infinite; }
.id-marquee-item { display: inline-flex; align-items: center; gap: 1.5rem; padding: 0 1.5rem; font-family: var(--font-display); font-size: 1.1rem; text-transform: uppercase; letter-spacing: .04em; color: var(--color-iron); white-space: nowrap; }
@keyframes id-marquee { to { transform: translateX(-50%); } }

/* Sections */
.id-section { position: relative; padding: clamp(4.5rem, 9vw, 8rem) 0; }
.id-section--tint { background: rgba(10,22,39,0.35); border-top: 1px solid var(--id-line); border-bottom: 1px solid var(--id-line); }
.id-contact { position: relative; padding: clamp(5rem, 12vw, 9rem) 0; }

/* Case header band */
.id-casehead { position: relative; padding: clamp(3rem,6vw,5rem) 0 0; }
.id-casenum { font-family: var(--font-display); font-size: clamp(4rem, 14vw, 11rem); line-height: .8; color: transparent; -webkit-text-stroke: 1.5px color-mix(in srgb, var(--id-accent) 55%, transparent); opacity: .8; }

/* Panels & surfaces */
.id-panel { background: rgba(255,255,255,0.025); border: 1px solid var(--id-line); backdrop-filter: blur(2px); transition: border-color .3s, transform .3s; }
.id-panel:hover { border-color: color-mix(in srgb, var(--id-accent) 45%, transparent); }
.id-surface { background: rgba(10,12,18,0.72); transition: background .3s; }
.id-surface:hover { background: rgba(20,24,34,0.82); }
.id-callout { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.5rem; margin-top: 3rem; padding: clamp(1.5rem,3vw,2.5rem); border: 1px solid var(--id-line); background: rgba(255,255,255,0.02); border-left: 3px solid var(--id-accent); }
.id-arrow { font-family: var(--font-display); font-size: 2.5rem; color: var(--id-accent); align-self: center; }

/* Match matrix */
.id-matrix-cell { display: block; background: rgba(10,12,18,0.72); padding: 1.6rem; transition: background .3s; }
.id-matrix-cell:hover { background: rgba(22,26,36,0.85); }
.id-check { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; font-size: .7rem; color: var(--color-void); background: var(--id-accent); flex-shrink: 0; }

/* Big stats band */
.id-bigstats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--id-line); border: 1px solid var(--id-line); }
@media (min-width: 900px) { .id-bigstats { grid-template-columns: repeat(3, 1fr); } }
.id-bigstat-cell { background: rgba(10,12,18,0.7); padding: clamp(1.5rem,3vw,2.5rem); height: 100%; }

/* Mapping table */
.id-map-head { font-family: var(--font-body); font-size: .72rem; font-weight: 800; text-transform: uppercase; letter-spacing: .18em; color: var(--color-ash); padding: 1rem 1.5rem; background: rgba(255,255,255,0.02); }
.id-map-head--accent { color: var(--id-accent); }
.id-map-cell { font-family: var(--font-body); font-weight: 300; line-height: 1.65; color: var(--color-smoke); padding: 1.25rem 1.5rem; font-size: .92rem; }
.id-map-cell--right { color: var(--color-pearl); border-left: 1px solid var(--id-line); }
@media (max-width: 767px) { .id-map-cell--right { border-left: none; border-top: 1px solid var(--id-line); } }

/* Plan */
.id-plan-num { position: absolute; top: 1rem; right: 1.25rem; font-family: var(--font-display); font-size: 3rem; line-height: 1; color: transparent; -webkit-text-stroke: 1px color-mix(in srgb, var(--id-accent) 40%, transparent); }

/* Buttons */
.id-btn-accent, .id-btn-outline { display: inline-flex; align-items: center; gap: .6rem; padding: .95rem 1.8rem; font-family: var(--font-body); font-size: .74rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; cursor: pointer; transition: all .3s cubic-bezier(.16,1,.3,1); border: 1px solid transparent; }
.id-btn-accent { color: #0a0a0a; background: var(--id-accent); border-color: var(--id-accent); }
.id-btn-accent:hover { box-shadow: 0 0 30px color-mix(in srgb, var(--id-accent) 45%, transparent); transform: translateY(-1px); }
.id-btn-outline { color: var(--color-pearl); background: transparent; border-color: var(--id-line); }
.id-btn-outline:hover { color: var(--id-accent); border-color: var(--id-accent); box-shadow: 0 0 20px color-mix(in srgb, var(--id-accent) 22%, transparent); }

/* A/B switch */
.id-switch { display: inline-flex; border: 1px solid var(--id-line); }
.id-switch-btn { padding: .5rem 1rem; font-family: var(--font-body); font-size: .68rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--color-ash); background: transparent; cursor: pointer; transition: all .3s; }
.id-switch-btn.is-active { color: #0a0a0a; background: var(--id-accent); }

/* Region tabs */
.id-region-tab { padding: .55rem 1.1rem; font-family: var(--font-body); font-size: .72rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--color-ash); background: rgba(255,255,255,0.03); border: 1px solid var(--id-line); cursor: pointer; transition: all .3s; }
.id-region-tab:hover { color: var(--color-pearl); }
.id-region-tab[data-active="true"] { color: #0a0a0a; background: var(--id-accent); border-color: var(--id-accent); }

/* Fade for panels on switch */
.id-fade { animation: id-fadein .45s cubic-bezier(.16,1,.3,1); }
@keyframes id-fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Modal */
.id-modal-scrim { position: fixed; inset: 0; z-index: 100; background: rgba(4,6,10,0.82); backdrop-filter: blur(6px); display: flex; align-items: flex-start; justify-content: center; padding: clamp(1rem, 6vh, 5rem) 1rem; overflow-y: auto; animation: id-fadein .3s ease; }
.id-modal { width: 100%; max-width: 680px; background: #0b0e16; border: 1px solid color-mix(in srgb, var(--id-accent) 30%, var(--id-line)); box-shadow: 0 30px 90px rgba(0,0,0,0.6); }

/* Floating CTA */
.id-floating { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 70; width: min(320px, calc(100vw - 2rem)); padding: 1.4rem 1.4rem 1.5rem; background: #0b0e16; border: 1px solid color-mix(in srgb, var(--id-accent) 35%, var(--id-line)); box-shadow: 0 20px 60px rgba(0,0,0,0.55); animation: id-slidein .5s cubic-bezier(.16,1,.3,1); }
@keyframes id-slidein { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

@media (prefers-reduced-motion: reduce) {
  .id-grid, .id-marquee-track, .id-scrollcue-line { animation: none !important; }
}

/* Print → clean PDF */
@media print {
  .id-bg { position: absolute; background: #fff !important; }
  .id-glow, .id-grid, .id-adv, .id-progress, .id-rail, .id-floating, .id-scrollcue, .id-marquee, .id-topbar { display: none !important; }
  .id-root { --id-accent: #7a5a1e; --id-line: #ccc; color: #111; }
  .id-h1, .id-h2, .id-h1-accent { color: #111 !important; text-shadow: none !important; }
  .id-body, .id-lede, .id-map-cell, .id-map-cell--right { color: #222 !important; }
  .id-panel, .id-surface, .id-matrix-cell, .id-bigstat-cell, .id-callout { background: #fafafa !important; border-color: #ddd !important; }
  .id-section, .id-contact, .id-section--tint { padding: 1.5rem 0 !important; page-break-inside: avoid; }
  section { page-break-inside: avoid; }
}
`;
