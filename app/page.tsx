import type { Metadata } from "next";
import Link from "next/link";
import InlineLeadCapture from "@/app/components/InlineLeadCapture";
import LegacyOfferingsRedirect from "@/app/components/LegacyOfferingsRedirect";

export const metadata: Metadata = {
  title: "MK Parrish — Growth Strategy, Websites & Messaging",
  description:
    "Growth strategy, conversion websites, positioning, and messaging for B2B companies.",
};

const cards = [
  {
    eyebrow: "Done for you",
    title: "Services",
    text: "Positioning, websites, outbound, and growth systems handled by one senior operator.",
    href: "/services#offerings",
    cta: "See Services",
  },
  {
    eyebrow: "Start here",
    title: "Resources",
    text: "Use practical audit tools to find unclear messaging, weak proof, and conversion gaps.",
    href: "/resources",
    cta: "Browse Resources",
  },
  {
    eyebrow: "Process",
    title: "How I Work",
    text: "Review the process, scope, and expectations before starting a project.",
    href: "/how-i-work",
    cta: "Review Process",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <LegacyOfferingsRedirect />

      <section className="relative overflow-hidden bg-void pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[70vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.16),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-[0.68rem] font-bold uppercase tracking-[0.32em] text-petal">
            Senior growth operator
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-6xl uppercase leading-[0.88] tracking-[0.01em] text-pearl md:text-8xl lg:text-9xl">
            Turn how you&apos;re seen <span className="text-petal">into revenue.</span>
          </h1>
          <p className="mt-7 max-w-3xl font-serif text-xl italic leading-9 text-smoke md:text-2xl">
            I help B2B companies clarify positioning, improve conversion, and build growth systems that connect the message to the pipeline.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="btn-primary inline-flex justify-center px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
              Book a Free Strategy Call →
            </Link>
            <Link href="/services#offerings" className="inline-flex justify-center border border-graphite px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal">
              See Services & Pricing
            </Link>
          </div>
        </div>
      </section>

      <section id="offerings" className="bg-obsidian py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Where to start</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Keep the site focused on the work.
            </h2>
          </div>
          <div className="grid gap-px bg-graphite lg:grid-cols-3">
            {cards.map((card) => (
              <article key={card.title} className="flex h-full flex-col bg-void p-7 md:p-9">
                <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">{card.eyebrow}</p>
                <h2 className="mt-5 font-display text-4xl uppercase tracking-[0.02em] text-pearl">{card.title}</h2>
                <p className="mt-5 font-body text-sm font-light leading-7 text-smoke">{card.text}</p>
                <div className="mt-auto pt-8">
                  <Link href={card.href} className="btn-primary inline-flex w-full justify-center px-5 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
                    {card.cta} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-void py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Free 12-point positioning audit</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Find the leak before you rewrite the page.
            </h2>
            <p className="mt-6 max-w-xl font-body text-base font-light leading-8 text-smoke">
              Use the questions I run before client work to see where your message is vague, dated, or missing proof.
            </p>
            <Link href="/resources" className="mt-7 inline-flex font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:text-blush">
              Browse all free resources →
            </Link>
          </div>
          <InlineLeadCapture />
        </div>
      </section>
    </>
  );
}
