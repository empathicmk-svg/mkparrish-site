import type { Metadata } from "next";
import Link from "next/link";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2, H3Script,
  BtnPrimary, ArrowLink,
} from "@/app/components/ui";
import { STRIPE_AUDIT } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "The Positioning Audit — MK Parrish",
  description:
    "Send your website, LinkedIn, and one offer page. In 48 hours, get a Loom teardown, a written scorecard, 3 rewritten headlines, and your 3 highest-priority fixes — $97, async, no call required.",
};

const SENDS = [
  { t: "Your website", d: "Or whatever page you point people to first." },
  { t: "Your LinkedIn", d: "The profile that's quietly costing you intros." },
  { t: "One offer page", d: "A service, product, or sales page you want to land." },
  { t: "Your goal", d: "What you want to be hired, booked, or bought for." },
];

const GETS = [
  { num: "01", t: "A 5-minute Loom", d: "Me, walking through your positioning out loud — what's working, what's leaking, and the first thing I'd change." },
  { num: "02", t: "A written scorecard", d: "Your clarity, specificity, and proof, scored — so you know exactly where the words are losing people." },
  { num: "03", t: "3 rewritten headlines", d: "Your headline or hook, rewritten three ways, ready to paste in today." },
  { num: "04", t: "3 priority fixes", d: "The highest-leverage changes, ranked. Not a 40-point list you'll never start — the three that move the needle." },
];

export default function AuditPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[88vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto grid w-full max-w-[1400px] items-end gap-12 lg:grid-cols-[1.3fr_0.7fr]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div>
            <Eyebrow>Work With Me · Async</Eyebrow>
            <div className="mt-4">
              <H1>The<br /><span className="text-petal">Positioning</span><br />Audit</H1>
            </div>
            <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
              48 hours. Your words, taken apart and put back better.
            </p>
            <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
              The step between a $22 guide and a full engagement. Send me your links; I send back a teardown, a scorecard, and the exact fixes — personally, in two business days. No call to schedule.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BtnPrimary href={STRIPE_AUDIT}>Get the Audit — $97</BtnPrimary>
              <span className="font-body text-xs font-light text-smoke">48-hour turnaround · async · no call</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-6">
              {["Delivered in 48 hours", "$97 flat", "100% async"].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="h-1 w-1 bg-petal" />
                  <span className="font-body text-xs font-light text-smoke">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/downloads/covers/the-positioning-audit-cover.jpg"
              alt="The Positioning Audit"
              width={1600}
              height={2560}
              className="aspect-[5/8] w-full border border-graphite/70 object-cover shadow-[0_12px_60px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
      </section>

      {/* ── WHAT YOU SEND ── */}
      <RevealSection bg="obsidian" num="01">
        <Eyebrow>What you send</Eyebrow>
        <H2>Four links.{" "}<span className="text-petal">That&apos;s the brief.</span></H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "54ch" }}>
          You&apos;ll enter these right at checkout — no separate form, no back-and-forth. Pay, paste, done.
        </p>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-4">
          {SENDS.map((s) => (
            <div key={s.t} className="bg-obsidian p-8">
              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{s.t}</h3>
              <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{s.d}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={18} />

      {/* ── WHAT YOU GET ── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>What you get back</Eyebrow>
        <H2>In 48 hours,{" "}<span className="text-petal">in writing.</span></H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2">
          {GETS.map((g) => (
            <div key={g.num} className="bg-obsidian p-8">
              <p className="font-mono text-xs tracking-[0.2em] text-petal/60">{g.num}</p>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{g.t}</h3>
              <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{g.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-start gap-4 border border-graphite p-6">
          <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 bg-petal" />
          <p className="font-body text-sm font-light leading-7 text-smoke">
            Want it taken further? The audit credits toward the bigger work — <Link href="/shelf/the-rewrite-playbook" className="text-petal transition hover:text-blush">The Rewrite</Link>, <Link href="/book" className="text-petal transition hover:text-blush">a Session</Link>, or <Link href="/studio" className="text-petal transition hover:text-blush">The Build</Link>. Start here; go as far as you want.
          </p>
        </div>
      </RevealSection>

      {/* ── CTA ── */}
      <RevealSection bg="obsidian">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>One small, fast yes</Eyebrow>
          <H3Script>The cheapest way to find out exactly what&apos;s costing you the click.</H3Script>
          <BtnPrimary href={STRIPE_AUDIT}>Get the Audit — $97</BtnPrimary>
          <ArrowLink href="/shelf">Or browse The Shelf first</ArrowLink>
        </div>
      </RevealSection>
    </>
  );
}
