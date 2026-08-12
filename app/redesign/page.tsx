import type { Metadata } from "next";
import Link from "next/link";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2, H3Script,
  BtnPrimary, BtnGhost, ArrowLink, FAQ,
} from "@/app/components/ui";
import { CONTACT } from "@/app/lib/config";

const ONEPAGER_PDF = "/social/founding-redesign/founding-redesign-onepager.pdf";

export const metadata: Metadata = {
  title: "Founding-Client Website Redesigns — MK Parrish",
  description:
    "Taking on a small number of founding clients this quarter for full website redesigns — audited, rebuilt fast, modern, and mobile-first — at a discounted rate in exchange for a testimonial. Hands-on from start to finish.",
  alternates: { canonical: "/redesign" },
  openGraph: {
    title: "Founding-Client Website Redesigns — MK Parrish",
    description:
      "A few founding clients this quarter get a full website redesign at a discounted rate, in exchange for a testimonial. Fast, modern, mobile-first — hands-on start to finish.",
    url: "https://www.mkparrish.com/redesign",
    images: [{ url: "/social/founding-redesign/founding-redesign-square.png" }],
  },
};

const INCLUDED = [
  {
    num: "01",
    t: "Full Site Audit",
    d: "A complete review of your current site — performance, UX, and the conversion gaps quietly losing you leads. You'll see exactly what's holding it back.",
  },
  {
    num: "02",
    t: "Redesign & Rebuild",
    d: "A fast, modern, mobile-first site rebuilt from the ground up — designed around how your customers actually decide and buy.",
  },
  {
    num: "03",
    t: "Hands-On Collaboration",
    d: "Direct access to me from kickoff to launch. No account managers, no hand-offs, no guessing what's happening next.",
  },
  {
    num: "04",
    t: "Launch & Handoff",
    d: "Shipped, tested, and yours — with everything you need to keep it running long after we're done.",
  },
];

const WHO = [
  { t: "Businesses", d: "whose site hasn't been touched in a few years." },
  { t: "Anyone losing mobile visitors", d: "to a slow or clunky experience." },
  { t: "Founders", d: "who've outgrown how their current site represents them." },
  { t: "Teams", d: "who want conversion — not just a fresh coat of paint." },
];

const CHANGES = [
  { before: "Slow, heavy pages", after: "Fast & lightweight" },
  { before: "Hard on mobile", after: "Mobile-first" },
  { before: "Looks dated", after: "Modern & on-brand" },
  { before: "Just a brochure", after: "Built to convert" },
];

const FAQS = [
  {
    q: "What does “founding client” actually mean?",
    a: "A small first group I take on at a reduced project rate this quarter. In exchange, you give an honest testimonial once your new site is live. That's the whole trade — a lower rate for a little social proof.",
  },
  {
    q: "How much does it cost?",
    a: "The founding rate is discounted from my standard build. Exact pricing depends on the size and scope of your site, so we settle it on a short call once I understand what you need. No obligation to continue after that conversation.",
  },
  {
    q: "How many spots are there?",
    a: "Only a few. I'm keeping the group small on purpose so every project gets real, undivided attention rather than being run through a queue.",
  },
  {
    q: "What do you need from me to start?",
    a: "Your current site, a sense of what's not working, and the outcomes you want the new site to drive. We'll cover the rest on the kickoff call.",
  },
  {
    q: "Do you write the copy too?",
    a: "Yes. Messaging and copy are part of the work — the rebuild is designed around words that convert, not just a new layout.",
  },
];

export default function RedesignPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[88vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.14),transparent_65%)]" />
        </div>
        <div className="relative mx-auto grid w-full max-w-[1400px] items-end gap-12 lg:grid-cols-[1.3fr_0.7fr]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div>
            <Eyebrow pink>Founding Client Offer · A Few Spots · This Quarter</Eyebrow>
            <div className="mt-4">
              <H1>Your Site,<br /><span className="text-petal">Rebuilt.</span></H1>
            </div>
            <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
              A limited founding-client redesign — fast, modern, mobile-first.
            </p>
            <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "54ch" }}>
              If your site is slow, clunky on mobile, or no longer sounds like your business, it&apos;s quietly costing you clients you never hear about. I&apos;m taking on a small number of founding clients this quarter for full redesigns — discounted, in exchange for a testimonial once the project is complete.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BtnPrimary href="/book">Book a Fit Call →</BtnPrimary>
              <BtnGhost href={ONEPAGER_PDF}>Download the One-Pager</BtnGhost>
            </div>
            <div className="mt-7 flex flex-wrap gap-6">
              {["Full audit included", "Fast, mobile-first rebuild", "Hands-on start to finish"].map((t) => (
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
              src="/social/founding-redesign/founding-redesign-portrait.png"
              alt="Founding-client website redesign — your site, rebuilt to earn its keep."
              width={1080}
              height={1350}
              className="aspect-[4/5] w-full border border-graphite/70 object-cover shadow-[0_12px_60px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <RevealSection bg="obsidian" num="01">
        <Eyebrow>What&apos;s included</Eyebrow>
        <H2>From audit{" "}<span className="text-petal">to launch.</span></H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2">
          {INCLUDED.map((g) => (
            <div key={g.num} className="bg-obsidian p-8">
              <p className="font-mono text-xs tracking-[0.2em] text-petal/60">{g.num}</p>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{g.t}</h3>
              <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{g.d}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={7} />

      {/* ── WHO IT'S FOR + WHAT CHANGES ── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>Right fit</Eyebrow>
        <H2>Who this{" "}<span className="text-petal">is for.</span></H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-4">
          {WHO.map((w) => (
            <div key={w.t} className="bg-obsidian p-8">
              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{w.t}</h3>
              <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{w.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Eyebrow>What changes</Eyebrow>
          <div className="mt-6 grid gap-px bg-graphite sm:grid-cols-2">
            {CHANGES.map((c) => (
              <div key={c.before} className="flex items-center justify-between gap-4 bg-obsidian px-7 py-6">
                <span className="font-body text-sm font-light text-iron line-through decoration-iron/60">{c.before}</span>
                <span className="font-display text-lg text-petal">&rarr;</span>
                <span className="text-right font-body text-sm font-semibold text-pearl">{c.after}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── FOUNDING TERMS ── */}
      <RevealSection bg="obsidian">
        <div className="relative border border-petal/35 bg-carbon p-8 shadow-[0_0_70px_rgba(255,181,208,0.1)] md:p-12">
          <div className="absolute inset-x-0 top-0 h-px bg-petal" />
          <p className="font-body text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-ash">The founding client terms</p>
          <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-pearl md:text-4xl">A discounted engagement</h3>
          <p className="mt-2 font-display text-4xl text-petal md:text-5xl">Founding rate</p>
          <p className="mt-5 max-w-2xl font-body text-base font-light leading-8 text-smoke">
            A reduced project rate for a limited group of founding clients, in exchange for an honest testimonial once your new site is live. <span className="text-pearl">The group is kept small on purpose</span> — so every project gets real, undivided attention.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BtnPrimary href="/book">Book a Fit Call →</BtnPrimary>
            <ArrowLink href={`mailto:${CONTACT.email}`}>Or email me directly</ArrowLink>
          </div>
        </div>
      </RevealSection>

      {/* ── FAQ ── */}
      <RevealSection bg="void" num="03">
        <Eyebrow>Before you ask</Eyebrow>
        <H2>The{" "}<span className="text-petal">details.</span></H2>
        <div className="mt-12">
          <FAQ items={FAQS} />
        </div>
      </RevealSection>

      {/* ── CTA ── */}
      <RevealSection bg="obsidian">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>A few spots only</Eyebrow>
          <H3Script>If your site no longer represents your business, let&apos;s rebuild the one that does.</H3Script>
          <div className="flex flex-wrap items-center gap-4">
            <BtnPrimary href="/book">Book a Fit Call →</BtnPrimary>
            <BtnGhost href="/studio">See the full Build</BtnGhost>
          </div>
          <ArrowLink href={ONEPAGER_PDF}>Download the one-pager (PDF)</ArrowLink>
        </div>
      </RevealSection>
    </>
  );
}
