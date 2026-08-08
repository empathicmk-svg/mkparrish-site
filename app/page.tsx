import type { Metadata } from "next";
import Link from "next/link";
import LegacyOfferingsRedirect from "@/app/components/LegacyOfferingsRedirect";
import { QuoteMosaic } from "@/app/components/QuoteMosaic";
import { Marquee, QuoteDivider } from "@/app/components/ui";
import { SERVICES, MARGINS_TIERS, STRIPE_AUDIT, SUBSTACK_SUBSCRIBE_URL } from "@/app/lib/config";
import { featuredTestimonials } from "@/app/lib/testimonials";

const HOME_TESTIMONIALS = featuredTestimonials();

export const metadata: Metadata = {
  title: "MK Parrish — Growth Strategy, Websites & Messaging",
  description:
    "Growth strategy, conversion websites, positioning, and messaging for B2B companies. Start with the $97 Positioning Audit, the books, or a full engagement.",
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
] as const;

const MARQUEE_ITEMS = [
  "The 48-Hour Audit · $97",
  "The Build",
  "The Vault · $97",
  "Outbound Engine",
  "Full-Funnel Growth",
  "The Rewrite",
  "The Byline",
  "Website Redesigns",
  "The Margins · $9/mo",
  "Paperbacks",
  "Scripture & Strategy",
];

const BUNDLES = [
  {
    tag: "Best Value · Writing",
    title: "The Vault",
    price: "$97",
    compareAt: "$317",
    text: "Every writing, voice, identity, and healing framework in one library — for far less than buying each guide alone.",
    href: "/shop/the-vault",
  },
  {
    tag: "Best Value · Business",
    title: "The Services Vault",
    price: "$127",
    compareAt: "$567",
    text: "All fourteen consulting methods plus the creator revenue stack — the complete DIY playbook library.",
    href: "/shop/the-services-vault",
  },
  {
    tag: "Complete Curriculum",
    title: "Scripture & Strategy",
    price: "$497",
    compareAt: undefined,
    text: "A full faith-based business curriculum — from a real study practice to sustainable income, in eight guided modules.",
    href: "/shop/scripture-and-strategy",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <LegacyOfferingsRedirect />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-void pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[70vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.16),transparent_60%)]" />
          <div className="absolute bottom-0 right-0 h-[40vh] w-[50vw] bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,79,124,0.08),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-[0.68rem] font-bold uppercase tracking-[0.32em] text-petal">
            Senior growth operator
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-6xl uppercase leading-[0.88] tracking-[0.01em] text-pearl md:text-8xl lg:text-9xl">
            Turn how you&apos;re seen <span className="text-petal text-glow">into revenue.</span>
          </h1>
          <p className="mt-7 max-w-3xl font-serif text-xl italic leading-9 text-smoke md:text-2xl">
            I help B2B companies clarify positioning, improve conversion, and build growth systems that connect the message to the pipeline. Rewrite Your Story is the line underneath all of it.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/book" className="btn-primary inline-flex justify-center px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
              Book a Call →
            </Link>
            <Link href={STRIPE_AUDIT} target="_blank" rel="noreferrer" className="inline-flex justify-center border border-petal/60 px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:border-petal hover:bg-petal/5">
              Start with the $97 Audit
            </Link>
            <Link href="/shop" className="inline-flex justify-center border border-graphite px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal">
              Shop the Books
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {["Websites & positioning", "Outbound & growth systems", "35+ books & guides", "Async $97 entry point"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <span className="h-1 w-1 bg-petal" />
                <span className="font-body text-xs font-light text-smoke">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* ── FEATURED: Founding-client website redesigns ── */}
      <section className="relative overflow-hidden border-y border-petal/25 py-12 md:py-16 gradient-pink-grey-soft">
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-8 px-6 lg:grid-cols-[1.35fr_0.65fr] lg:px-10">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">
              Limited · A few founding clients · This quarter
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-5xl lg:text-6xl">
              Your site, rebuilt to <span className="text-petal">earn its keep.</span>
            </h2>
            <p className="mt-5 max-w-2xl font-body text-base font-light leading-8 text-smoke">
              Site slow, clunky on mobile, or no longer sounding like your business? I&apos;m taking on a small number of founding clients this quarter for full redesigns — audited, rebuilt fast and mobile-first, hands-on from start to finish — at a discounted rate in exchange for a testimonial.
            </p>
            <div className="mt-7 flex flex-wrap gap-6">
              {["Full site audit", "Fast, mobile-first rebuild", "Direct collaboration"].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="h-1 w-1 bg-petal" />
                  <span className="font-body text-xs font-light text-smoke">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/redesign" className="btn-primary inline-flex w-full justify-center px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
              See the Offer →
            </Link>
            <Link href="/book" className="inline-flex w-full justify-center border border-graphite px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal">
              Book a Fit Call
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROOF / CLIENT TESTIMONIALS ── */}
      <section className="relative overflow-hidden bg-void py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.06),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">In their words</p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
                Founders on <span className="text-petal">the work.</span>
              </h2>
            </div>
            <Link href="/testimonials" className="font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:text-blush">
              Read all client results →
            </Link>
          </div>
          <div className="grid gap-px bg-graphite lg:grid-cols-2">
            {HOME_TESTIMONIALS.map((t) => (
              <figure key={t.name} className="relative flex flex-col justify-between bg-obsidian p-8 md:p-10">
                <div className="absolute inset-x-0 top-0 h-px bg-petal" />
                <span className="select-none font-serif text-6xl leading-none text-petal/25">&ldquo;</span>
                <blockquote className="mt-2 font-serif text-lg italic leading-8 text-pearl md:text-xl">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-graphite pt-6">
                  <p className="font-display text-2xl uppercase tracking-[0.02em] text-white">{t.name}</p>
                  <p className="mt-1 font-body text-sm font-light text-petal">{t.role}, {t.company}</p>
                  <p className="mt-2 font-body text-[0.62rem] font-bold uppercase tracking-[0.22em] text-iron">{t.service}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <QuoteDivider index={11} />

      {/* ── SERVICES / WORK WITH ME (high-ticket) ── */}
      <section className="relative overflow-hidden bg-obsidian py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(242,175,198,0.07),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-4 max-w-3xl">
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Work with MK · Done for you</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              One senior operator,<br /><span className="text-petal">the whole revenue stack.</span>
            </h2>
            <p className="mt-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
              Websites, positioning, outbound, and growth — handled end to end. Pick the engagement that fits, or book a call and we&apos;ll find it together.
            </p>
          </div>
          <div className="mt-10 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href="/services#offerings"
                className="group/svc relative flex flex-col justify-between gap-6 bg-obsidian p-7 transition-colors duration-300 hover:bg-carbon md:p-8"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover/svc:opacity-100 gradient-rule" />
                <div>
                  <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.24em] text-iron">{s.tag}</p>
                  <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl md:text-4xl">{s.title}</h3>
                </div>
                <div className="flex items-end justify-between">
                  <span className="font-display text-2xl text-petal">{s.price}</span>
                  <span className="font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ash transition-colors group-hover/svc:text-petal">Details →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="btn-primary inline-flex justify-center px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
              Book a Call →
            </Link>
            <Link href="/services#offerings" className="inline-flex justify-center border border-graphite px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal">
              See All Services & Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── $97 AUDIT TRIPWIRE ── */}
      <section className="relative overflow-hidden border-y border-petal/25 py-14 md:py-20 gradient-pink-grey">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Start here · Async · No call required</p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-[0.02em] text-white md:text-7xl">
                The 48-Hour Positioning Audit — <span className="text-petal text-glow">$97.</span>
              </h2>
              <p className="mt-5 max-w-2xl font-body text-base font-light leading-8 text-smoke">
                Send your website, LinkedIn, and one offer page. In 48 hours you get a Loom teardown, a written scorecard, three rewritten headlines, and your three highest-priority fixes. The cheapest way to find out exactly what&apos;s costing you the click — and the front door to everything else.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href={STRIPE_AUDIT} target="_blank" rel="noreferrer" className="btn-primary inline-flex w-full justify-center px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
                Get the Audit — $97
              </Link>
              <Link href="/audit" className="inline-flex w-full justify-center border border-graphite bg-void/40 px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-pearl transition hover:border-petal hover:text-petal">
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUNDLES / BEST VALUE ── */}
      <section className="relative overflow-hidden bg-void py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(217,79,124,0.06),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Buy the bundle · Best value</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Get the whole library<br /><span className="text-petal">for the price of a few.</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {BUNDLES.map((b) => (
              <Link key={b.title} href={b.href} className="money-card group/bundle flex flex-col p-8">
                <div className="gradient-rule absolute inset-x-0 top-0" />
                <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.24em] text-petal">{b.tag}</p>
                <h3 className="mt-4 font-display text-4xl uppercase tracking-[0.02em] text-pearl">{b.title}</h3>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-display text-5xl text-white">{b.price}</span>
                  {b.compareAt && <span className="font-body text-sm font-light text-iron line-through">{b.compareAt}</span>}
                </div>
                <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">{b.text}</p>
                <span className="mt-7 inline-flex font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal transition-all group-hover/bundle:tracking-[0.24em]">
                  Get {b.title} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE TO START ── */}
      <section id="offerings" className="bg-obsidian py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Where to start</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Keep the site focused on the work.
            </h2>
          </div>
          <div className="grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
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
        secondaryCta={{ href: "/shop", label: "Shop the Shelf" }}
        slugs={["mk-rebecoming", "marcus-mind", "jayz-business", "mk-seen"]}
      />

      {/* ── REBECOMING ── */}
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

      {/* ── THE MARGINS · RECURRING ── */}
      <section className="relative overflow-hidden bg-obsidian py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(242,175,198,0.08),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">The Margins · Membership</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              The thinking before the edit.
            </h2>
            <p className="mt-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
              Strategy notes, frameworks, and unfinished thinking from real client work. Free to read; members get the full archive, weekly frameworks, and direct access.
            </p>
          </div>
          <div className="grid gap-px bg-graphite md:grid-cols-3">
            {MARGINS_TIERS.map((t) => (
              <article key={t.name} className={`flex h-full flex-col p-7 md:p-8 ${t.highlight ? "bg-carbon" : "bg-obsidian"}`}>
                {t.highlight && <div className="gradient-rule -mx-7 -mt-7 mb-6 md:-mx-8 md:-mt-8" />}
                <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.24em] text-petal">{t.name}</p>
                <p className="mt-3 font-display text-4xl text-white">{t.price}</p>
                <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">{t.desc}</p>
                <Link
                  href={SUBSTACK_SUBSCRIBE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-7 inline-flex w-full justify-center px-5 py-3.5 font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] transition ${
                    t.highlight
                      ? "btn-primary text-void"
                      : "border border-graphite text-ash hover:border-petal hover:text-petal"
                  }`}
                >
                  {t.price === "Free" ? "Subscribe Free" : "Become a Member"} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <QuoteDivider index={3} />

      {/* ── CLOSING CTA ── */}
      <section className="relative overflow-hidden py-20 md:py-28 gradient-pink-grey">
        <div className="relative mx-auto max-w-[1400px] px-6 text-center lg:px-10">
          <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Ready when you are</p>
          <h2 className="mx-auto mt-5 max-w-4xl font-display text-5xl uppercase leading-[0.92] tracking-[0.02em] text-white md:text-7xl">
            Turn how you&apos;re seen <span className="text-petal text-glow">into revenue.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg italic leading-8 text-smoke md:text-xl">
            Start with the $97 audit, grab a bundle, or book a call. Every door leads to the same place — words and systems that pay for themselves.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/book" className="btn-primary inline-flex justify-center px-8 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
              Book a Call →
            </Link>
            <Link href={STRIPE_AUDIT} target="_blank" rel="noreferrer" className="inline-flex justify-center border border-petal/60 bg-void/30 px-8 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:bg-petal/5">
              Start with the $97 Audit
            </Link>
            <Link href="/shop" className="inline-flex justify-center border border-graphite bg-void/30 px-8 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-pearl transition hover:border-petal hover:text-petal">
              Shop the Shelf
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
