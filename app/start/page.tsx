import type { Metadata } from "next";
import Link from "next/link";
import InlineLeadCapture from "@/app/components/InlineLeadCapture";
import { STRIPE_SESSION, SUBSTACK_URL } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Start Here",
  description: "Choose the right way to work with MK Parrish: done-for-you strategy and execution, self-serve frameworks, or free writing and resources.",
};

const paths = [
  {
    number: "01",
    eyebrow: "Done for you",
    title: "Hire MK",
    price: "From $250",
    desc: "For companies and founders who want the outcome handled. Messaging, conversion websites, outbound, demand generation, and full-funnel growth without an agency relay race.",
    bullets: [
      "Quick copy fixes and positioning work",
      "Strategy sessions with a written action brief",
      "Websites, outbound engines, and ongoing growth",
    ],
    primaryHref: "/#offerings",
    primaryLabel: "See All Services",
    secondaryHref: STRIPE_SESSION,
    secondaryLabel: "Book The $300 Session",
    external: false,
  },
  {
    number: "02",
    eyebrow: "Do it yourself",
    title: "Buy the Framework",
    price: "$18–$127",
    desc: "For smart people who do not need more inspiration. They need the process, the prompts, and the exact structure used in real client work.",
    bullets: [
      "Ebooks, workbooks, and implementation guides",
      "Brand voice, website copy, and positioning systems",
      "Bundles for the full self-study library",
    ],
    primaryHref: "/shelf",
    primaryLabel: "Browse The Shelf",
    secondaryHref: "/shelf",
    secondaryLabel: "See Every Download",
    external: false,
  },
  {
    number: "03",
    eyebrow: "Read first",
    title: "Enter The Margins",
    price: "Free + paid",
    desc: "For readers, writers, and future clients who want the thinking before the polished case study. Essays, strategy notes, voice, and the occasional beautifully useful detour.",
    bullets: [
      "Free essays and practical strategy notes",
      "Paid membership for deeper frameworks",
      "A direct line into MK's evolving body of work",
    ],
    primaryHref: SUBSTACK_URL,
    primaryLabel: "Join The Margins",
    secondaryHref: "/margins",
    secondaryLabel: "Learn More",
    external: true,
  },
] as const;

export default function StartPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-void pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[70vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.16),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-[0.68rem] font-bold uppercase tracking-[0.32em] text-petal">Start here</p>
          <h1 className="mt-5 max-w-5xl font-display text-6xl uppercase leading-[0.88] tracking-[0.01em] text-pearl md:text-8xl lg:text-9xl">
            Pick the door that matches <span className="text-petal">what you need.</span>
          </h1>
          <p className="mt-7 max-w-3xl font-serif text-xl italic leading-9 text-smoke md:text-2xl">
            Done for you. Do it yourself. Or read first and decide later. A business should make it easy to buy, not force people into a scavenger hunt.
          </p>
        </div>
      </section>

      <section className="bg-obsidian py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-px bg-graphite lg:grid-cols-3">
            {paths.map((path) => (
              <article key={path.number} className="flex h-full flex-col bg-void p-7 md:p-9">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">{path.eyebrow}</p>
                  <p className="font-display text-2xl text-petal/40">{path.number}</p>
                </div>
                <h2 className="mt-5 font-display text-4xl uppercase tracking-[0.02em] text-pearl">{path.title}</h2>
                <p className="mt-2 font-display text-2xl text-petal">{path.price}</p>
                <p className="mt-5 font-body text-sm font-light leading-7 text-smoke">{path.desc}</p>
                <ul className="mt-6 space-y-3">
                  {path.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                      <span className="text-petal">→</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  {path.external ? (
                    <a
                      href={path.primaryHref}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary inline-flex w-full justify-center px-5 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
                    >
                      {path.primaryLabel} →
                    </a>
                  ) : (
                    <Link
                      href={path.primaryHref}
                      className="btn-primary inline-flex w-full justify-center px-5 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
                    >
                      {path.primaryLabel} →
                    </Link>
                  )}

                  {path.secondaryHref.startsWith("http") ? (
                    <a
                      href={path.secondaryHref}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex w-full justify-center border border-graphite px-5 py-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ash transition hover:border-petal hover:text-petal"
                    >
                      {path.secondaryLabel}
                    </a>
                  ) : (
                    <Link
                      href={path.secondaryHref}
                      className="mt-3 inline-flex w-full justify-center border border-graphite px-5 py-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ash transition hover:border-petal hover:text-petal"
                    >
                      {path.secondaryLabel}
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-void py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Not ready to buy</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Start with the thing that tells you what is broken.
            </h2>
            <p className="mt-6 max-w-xl font-body text-base font-light leading-8 text-smoke">
              The free Positioning Checklist is the cleanest first step. Twelve questions. No 47-email nurture sequence. No man in a rented Lamborghini explaining funnels.
            </p>
            <Link
              href="/resources"
              className="mt-7 inline-flex font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:text-blush"
            >
              See the tools behind the work →
            </Link>
          </div>
          <InlineLeadCapture />
        </div>
      </section>
    </>
  );
}
