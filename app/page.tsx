import type { Metadata } from "next";
import Link from "next/link";
import LegacyOfferingsRedirect from "@/app/components/LegacyOfferingsRedirect";
import { QuoteMosaic } from "@/app/components/QuoteMosaic";

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
    eyebrow: "Books + guides",
    title: "Shop",
    text: "Buy the books, workbooks, and practical guides for rebuilding voice, clarity, and momentum.",
    href: "/shop",
    cta: "Shop the Shelf",
  },
  {
    eyebrow: "The memoir",
    title: "Rebecoming",
    text: "Read the book at the center of the MK Parrish story: fear, faith, identity, and starting again without disappearing.",
    href: "/rebecoming",
    cta: "Enter Rebecoming",
  },
  {
    eyebrow: "Sponsors",
    title: "Partners",
    text: "Sponsor Rebecoming, The Margins, the shop, or a useful reader resource without turning trust into clutter.",
    href: "/partners",
    cta: "Sponsor the Work",
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
            I help B2B companies clarify positioning, improve conversion, and build growth systems that connect the message to the pipeline. Rewrite Your Story is the line underneath all of it.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/shop" className="btn-primary inline-flex justify-center px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
              Shop Books & Guides →
            </Link>
            <Link href="/rebecoming" className="inline-flex justify-center border border-graphite px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal">
              Read Rebecoming
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
          <div className="grid gap-px bg-graphite sm:grid-cols-2 xl:grid-cols-4">
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

      <QuoteMosaic
        eyebrow="The house voice"
        title="A little philosophy, a little hustle, a little pink light."
        description="The MK Parrish world sits between story and sales: thinkers, artists, founders, rappers, and original Rewrite Your Story language."
        highlighted
        primaryCta={{ href: "/rebecoming", label: "Enter Rebecoming" }}
        secondaryCta={{ href: "/partners", label: "Sponsor the Work" }}
        slugs={["mk-rebecoming", "marcus-mind", "jayz-business", "mk-seen"]}
      />

      <section className="bg-void py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Rebecoming: From Fear To Faith</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Buy the book. Start with Chapter One.
            </h2>
            <p className="mt-6 max-w-xl font-body text-base font-light leading-8 text-smoke">
              REBECOMING is the clearest entry point into the &quot;Rewrite Your Story&quot; work: a memoir for women rebuilding identity, voice, faith, work, and life after the thing that changed everything.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/rebecoming" className="btn-primary inline-flex justify-center px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
                Enter Rebecoming →
              </Link>
              <Link href="/shop" className="inline-flex justify-center border border-graphite px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal">
                Shop All Books
              </Link>
            </div>
          </div>
          <div className="grid gap-px bg-graphite sm:grid-cols-3 lg:grid-cols-1">
            {[
              {
                label: "Free sample",
                title: "Chapter One",
                text: "Read the opening chapter when you want the first page before the purchase.",
                href: "/downloads/ebooks/rebecoming-sample.pdf",
                cta: "Read Sample",
              },
              {
                label: "Main offer",
                title: "Rebecoming",
                text: "Send book traffic to the dedicated microsite first so readers understand the story before checkout.",
                href: "/rebecoming",
                cta: "View Book",
              },
              {
                label: "Shelf",
                title: "Books + Guides",
                text: "Keep every ebook, workbook, and practical guide easy to buy from one stronger commerce surface.",
                href: "/shop",
                cta: "Open Shop",
              },
            ].map((item) => (
              <article key={item.title} className="bg-obsidian p-6 md:p-7">
                <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.24em] text-petal">{item.label}</p>
                <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{item.title}</h3>
                <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.text}</p>
                <Link href={item.href} className="mt-5 inline-flex font-body text-[0.68rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:text-blush">
                  {item.cta} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
