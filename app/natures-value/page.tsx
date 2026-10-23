import type { Metadata } from "next";
import Link from "next/link";
import { BtnGhost, BtnPrimary } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Growth Strategy Preview for Nature's Value",
  description:
    "A preview of how MK Parrish would grow a doctor-led supplement brand: turning Dr. Michael Murray's authority on Instagram into retail sell-through and repeat customers.",
  alternates: { canonical: "/natures-value" },
  robots: { index: false, follow: false, nocache: true },
};

const insight = [
  {
    stat: "30+",
    label: "Books by Dr. Murray",
    desc: "Including the Encyclopedia of Natural Medicine. The authority is already there; the job is putting it where people buy.",
  },
  {
    stat: "1",
    label: "Face people trust",
    desc: "A doctor people can see and hear beats any label claim. Every channel should lead back to him.",
  },
  {
    stat: "3",
    label: "Places people buy",
    desc: "Retail shelf, Amazon, and direct. Each needs its own message and one shared way to measure it.",
  },
];

const pillars = [
  {
    n: "01",
    title: "Ask the Doctor",
    desc: "Short reels answering the questions people already search: magnesium forms, what to take with food, what changes after 50. One question, one answer, one product with a reason to buy it.",
  },
  {
    n: "02",
    title: "Read the Label With Me",
    desc: "Dr. Murray explains what goes into a capsule and why: dose, form, sourcing, testing. It builds trust in the brand and in the plant that makes it, which no competitor can copy.",
  },
  {
    n: "03",
    title: "The Longevity Matrix, Made Daily",
    desc: "His book turned into a 30-day routine series, with a free download that collects emails and sends people straight to the right products.",
  },
  {
    n: "04",
    title: "Made on Long Island",
    desc: "Behind-the-scenes content from Coram: quality control, the lab, the people. Manufacturing becomes a story, and a selling point retailers can repeat.",
  },
];

const plan = [
  {
    phase: "Days 1–30",
    title: "Audit & align",
    items: [
      "Audit Instagram, Amazon listings, retail placement, and the website against the top three competitors",
      "Map every claim to regulatory review (DSHEA, FTC endorsement rules) so content ships quickly and safely",
      "Set one dashboard: reach, saves, clicks, email sign-ups, Amazon sessions, retail sell-through",
    ],
  },
  {
    phase: "Days 31–60",
    title: "Launch the engine",
    items: [
      "Publish the four content pillars on a weekly calendar, batch-filmed with Dr. Murray in half-day shoots",
      "Launch the Longevity Matrix 30-day email series with product-matched recommendations",
      "Brief retail partners with a campaign-in-a-box: shelf talkers, QR codes to Dr. Murray videos, co-op social posts",
    ],
  },
  {
    phase: "Days 61–90",
    title: "Scale what works",
    items: [
      "Put paid spend behind the top 10% of organic posts: creator-licensed ads on Meta and Sponsored Brands video on Amazon",
      "Recruit a creator and practitioner network of naturopaths, dietitians and wellness creators with clear compliance guardrails",
      "Report results against revenue and set the next-quarter budget",
    ],
  },
];

const fit = [
  {
    from: "Atlantic Ultraviolet · Hauppauge",
    to: "Ran national marketing for a Long Island manufacturer across distributor and dealer networks plus direct-to-consumer, 20 minutes from Coram.",
  },
  {
    from: "DEFY Media · Clevver & Smosh",
    to: "Grew a 150+ partner creator network to 80M+ monthly viewers. I know how to turn one trusted face into a channel people return to.",
  },
  {
    from: "Take-Two · National retail",
    to: "Led retail channel marketing supporting $20M+ in product revenue: in-store, trade, and launch campaigns that moved product off shelves.",
  },
  {
    from: "Ericsson · Partner programs",
    to: "Scaled partner marketing to $200M+ in influenced revenue with co-marketing kits partners could run without hand-holding.",
  },
];

export default function NaturesValuePage() {
  return (
    <div className="min-h-screen bg-void">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 pt-6">
        <Link href="/" className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-pearl">
          ← MK Parrish
        </Link>
        <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-pearl/70">
          Prepared for Nature&apos;s Value
        </span>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 md:pt-24">
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-petal">Growth strategy preview</p>
        <h1
          className="mt-4 font-display uppercase text-pearl"
          style={{ fontSize: "clamp(3.2rem, 11vw, 7.5rem)", lineHeight: 0.88 }}
        >
          Turn the doctor&apos;s <span className="text-petal">authority</span> into sell-through
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-xl italic text-smoke md:text-2xl">
          How I would grow a doctor-led supplement brand from @dr.michaelmurray&apos;s feed to the retail shelf.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <BtnPrimary href="/resumes/natures-value/mk-parrish-resume-natures-value-signature.pdf">Resume · Signature</BtnPrimary>
          <BtnGhost href="/resumes/natures-value/mk-parrish-resume-natures-value-classic.pdf">Resume · Classic</BtnGhost>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">The opportunity</p>
        <div className="mt-6 grid gap-px bg-graphite md:grid-cols-3">
          {insight.map((i) => (
            <div key={i.label} className="bg-obsidian p-7">
              <p className="font-display text-6xl text-petal">{i.stat}</p>
              <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{i.label}</h2>
              <p className="mt-3 font-body text-sm font-light leading-6 text-smoke">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="font-serif text-3xl italic text-pearl md:text-4xl" style={{ fontWeight: 700, lineHeight: 1.15 }}>
          Four content pillars, each with a clear job.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.n} className="border-t border-graphite pt-6">
              <p className="font-mono text-xs text-petal">{p.n}</p>
              <h3 className="mt-2 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{p.title}</h3>
              <p className="mt-3 font-body text-[0.95rem] font-light leading-7 text-smoke">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">The funnel</p>
        <div className="mt-6 grid gap-px bg-graphite md:grid-cols-4">
          {[
            ["See", "Reels & creator collabs"],
            ["Trust", "Ask the Doctor & label deep-dives"],
            ["Try", "QR on shelf · Amazon · direct"],
            ["Stay", "30-day email routine & subscribe-and-save"],
          ].map(([k, v]) => (
            <div key={k} className="bg-obsidian p-6">
              <p className="font-display text-4xl uppercase text-pearl">{k}</p>
              <p className="mt-2 font-body text-sm font-light text-smoke">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="font-serif text-3xl italic text-pearl md:text-4xl" style={{ fontWeight: 700, lineHeight: 1.15 }}>
          My first 90 days.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plan.map((p) => (
            <div key={p.phase} className="border border-graphite bg-obsidian p-6">
              <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-petal">{p.phase}</p>
              <h3 className="mt-2 font-display text-3xl uppercase text-pearl">{p.title}</h3>
              <ul className="mt-4 space-y-3">
                {p.items.map((item) => (
                  <li key={item} className="font-body text-sm font-light leading-6 text-smoke">
                    <span className="text-petal">— </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">Why me</p>
        <div className="mt-6 divide-y divide-graphite border-y border-graphite">
          {fit.map((f) => (
            <div key={f.from} className="grid gap-2 py-6 md:grid-cols-[16rem_1fr] md:gap-8">
              <p className="font-display text-xl uppercase tracking-[0.03em] text-petal">{f.from}</p>
              <p className="font-body text-[0.95rem] font-light leading-7 text-smoke">{f.to}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 pt-12 text-center">
        <p className="font-serif text-2xl italic text-pearl md:text-3xl" style={{ fontWeight: 600 }}>
          Strategy is only worth something once it&apos;s in market.
        </p>
        <p className="mt-6 font-display text-4xl uppercase tracking-[0.04em] text-pearl">Mary Kate Parrish</p>
        <p className="mt-2 font-body text-sm text-smoke">
          <a href="mailto:mkp414@icloud.com" className="underline underline-offset-4 hover:text-petal">
            mkp414@icloud.com
          </a>
          {" · "}
          <a href="tel:+13478534238" className="underline underline-offset-4 hover:text-petal">
            (347) 853-4238
          </a>
          {" · "}
          <a href="https://linkedin.com/in/mkparrish" className="underline underline-offset-4 hover:text-petal">
            linkedin.com/in/mkparrish
          </a>
        </p>
      </section>
    </div>
  );
}
