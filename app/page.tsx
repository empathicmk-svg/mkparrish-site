import type { Metadata } from "next";
import Link from "next/link";
import InlineLeadCapture from "@/app/components/InlineLeadCapture";
import LegacyOfferingsRedirect from "@/app/components/LegacyOfferingsRedirect";
import { STRIPE_SESSION, SUBSTACK_URL } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "MK Parrish — Growth Strategy, Websites & Messaging",
  description:
    "MK Parrish builds sharper positioning, conversion websites, outbound, and demand systems that turn how B2B companies are seen into qualified pipeline.",
};

const paths = [
  {
    number: "01",
    eyebrow: "Done for you",
    title: "Hire MK",
    price: "Projects from $250",
    desc: "For founders and growth teams who need a senior operator to find the leak, fix the message, and ship the work. Strategy and execution stay in one pair of hands.",
    bullets: [
      "Positioning and copy that make the value obvious",
      "Conversion websites designed and built end to end",
      "Outbound and demand systems tied to qualified pipeline",
    ],
    primaryHref: "/services#offerings",
    primaryLabel: "Explore Services",
    secondaryHref: STRIPE_SESSION,
    secondaryLabel: "Book The $300 Strategy Session",
    external: false,
  },
  {
    number: "02",
    eyebrow: "Use my process",
    title: "Buy the Framework",
    price: "$18–$127",
    desc: "For capable people who can do the work once the path is clear. Get the structures, prompts, and decision tools I use in real client engagements.",
    bullets: [
      "Website, positioning, and brand voice guides",
      "Practical workbooks built for implementation",
      "Bundles that replace a very expensive blank page",
    ],
    primaryHref: "/shelf",
    primaryLabel: "Shop the Frameworks",
    secondaryHref: "/resources",
    secondaryLabel: "Start With a Free Tool",
    external: false,
  },
  {
    number: "03",
    eyebrow: "Read the thinking",
    title: "Enter The Margins",
    price: "Free + paid",
    desc: "For people who care about voice, reinvention, and the thinking behind the polished work. Essays, strategy notes, and honest work from the middle of becoming.",
    bullets: [
      "Free essays and useful strategy notes",
      "Deeper paid frameworks and field notes",
      "Writing with a pulse, not a content quota",
    ],
    primaryHref: SUBSTACK_URL,
    primaryLabel: "Read The Margins",
    secondaryHref: "/margins",
    secondaryLabel: "See What It Is",
    external: true,
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
            Senior growth operator + writer
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-6xl uppercase leading-[0.88] tracking-[0.01em] text-pearl md:text-8xl lg:text-9xl">
            Turn how you&apos;re seen <span className="text-petal">into revenue.</span>
          </h1>
          <p className="mt-7 max-w-3xl font-serif text-xl italic leading-9 text-smoke md:text-2xl">
            I help B2B companies close the gap between what they have become and how they show up. Clearer positioning, conversion websites, and growth systems built by one senior operator from first sentence to qualified call.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="btn-primary inline-flex justify-center px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
            >
              Book a Free Strategy Call →
            </Link>
            <Link
              href="/services#offerings"
              className="inline-flex justify-center border border-graphite px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal"
            >
              See Services & Pricing
            </Link>
          </div>
          <p className="mt-7 font-body text-[0.65rem] font-bold uppercase tracking-[0.18em] text-iron">
            $40M+ pipeline influenced · Fortune 50 to growth-stage teams · No agency layers
          </p>
        </div>
      </section>

      <section className="bg-obsidian py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Choose your level of help</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Bring me the problem. Pick how much of it you want handled.
            </h2>
          </div>
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
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Free 12-point positioning audit</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Find the leak before you rewrite the page.
            </h2>
            <p className="mt-6 max-w-xl font-body text-base font-light leading-8 text-smoke">
              Most weak copy is not a writing problem. It is a positioning problem wearing a nicer font. Use the questions I run before client work to see where your message is vague, dated, or costing you the right opportunities.
            </p>
            <Link
              href="/resources"
              className="mt-7 inline-flex font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:text-blush"
            >
              Browse all free resources →
            </Link>
          </div>
          <InlineLeadCapture />
        </div>
      </section>
    </>
  );
}
