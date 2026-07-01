import type { Metadata } from "next";
import Link from "next/link";
import InlineLeadCapture from "@/app/components/InlineLeadCapture";
import {
  AFFILIATE_DISCLOSURE,
  AFFILIATE_PARTNERS,
  PARTNER_APPLICATION_QUEUE,
  PARTNER_WATCHLIST,
  SPONSORSHIP_INVENTORY,
} from "@/app/lib/affiliate-partners";

export const metadata: Metadata = {
  title: "Partner Stack - MK Parrish",
  description:
    "Affiliate-ready tools, sponsor inventory, and partnership paths for MK Parrish readers, founders, writers, and growth operators.",
};

const moneyPaths = [
  {
    label: "Affiliate links",
    title: "Recommend tools that match the work.",
    detail:
      "Email, newsletter, CRM, website, SEO, and design tools already fit the reader journey: diagnose the leak, fix the page, publish the work, and sell from it.",
  },
  {
    label: "Sponsorships",
    title: "Sell context, not random ad space.",
    detail:
      "The Margins, resource guides, teardown videos, and workshops can carry one useful sponsor when the partner helps the reader make money or sound clearer.",
  },
  {
    label: "Services",
    title: "Use the stack as a bridge to audits and retainers.",
    detail:
      "Tool clicks should never be the ceiling. Every recommendation should point back to the $97 audit, The Build, The Byline, or a growth system when the buyer wants it handled.",
  },
] as const;

export default function PartnersPage() {
  const primaryPartners = AFFILIATE_PARTNERS.filter((partner) => partner.status !== "watch");

  return (
    <>
      <section className="relative overflow-hidden bg-void pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[70vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.16),transparent_60%)]" />
        </div>
        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
          <div>
            <p className="font-body text-[0.68rem] font-bold uppercase tracking-[0.32em] text-petal">
              Affiliate + partnership ops
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-6xl uppercase leading-[0.88] tracking-[0.01em] text-pearl md:text-8xl lg:text-9xl">
              Make the tools around the work <span className="text-petal">pay rent.</span>
            </h1>
            <p className="mt-7 max-w-3xl font-serif text-xl italic leading-9 text-smoke md:text-2xl">
              The fastest partner money is not a random link farm. It is a small stack of tools that naturally appears inside the advice people already came here to trust.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resources"
                className="btn-primary inline-flex justify-center px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
              >
                View The Resource Stack →
              </Link>
              <Link
                href="/audit"
                className="inline-flex justify-center border border-graphite px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal"
              >
                Start With The $97 Audit
              </Link>
            </div>
          </div>

          <aside className="self-start border border-graphite bg-obsidian p-7 md:p-9">
            <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">
              Fast money order
            </p>
            <ol className="mt-5 space-y-4">
              {PARTNER_APPLICATION_QUEUE.map((item, index) => (
                <li key={item} className="grid grid-cols-[48px_1fr] gap-4 border-b border-graphite pb-4 last:border-0 last:pb-0">
                  <span className="font-display text-4xl leading-none text-petal/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-sm font-light leading-7 text-smoke">{item}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="bg-carbon py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-px bg-graphite md:grid-cols-3">
            {moneyPaths.map((path) => (
              <article key={path.label} className="bg-carbon p-6 md:p-7">
                <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.24em] text-petal">
                  {path.label}
                </p>
                <h2 className="mt-4 font-display text-3xl uppercase leading-none tracking-[0.02em] text-pearl">
                  {path.title}
                </h2>
                <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{path.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-obsidian py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 grid gap-6 border-b border-graphite pb-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">
                Affiliate-ready stack
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
                Recommend what the reader already needs next.
              </h2>
            </div>
            <p className="max-w-2xl font-body text-base font-light leading-8 text-smoke lg:pt-10">
              These are the partner categories that fit MK Parrish without diluting the brand: tools for owned audience, clearer sites, better growth operations, and sellable creative assets.
            </p>
          </div>

          <div className="grid gap-px bg-graphite md:grid-cols-2 xl:grid-cols-3">
            {primaryPartners.map((partner) => (
              <article key={partner.slug} className="flex min-h-[430px] flex-col bg-void p-7 transition hover:bg-carbon">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.24em] text-petal">
                      {partner.category}
                    </p>
                    <h3 className="mt-4 font-display text-4xl uppercase tracking-[0.02em] text-pearl">
                      {partner.name}
                    </h3>
                  </div>
                  <span className="border border-petal/30 px-3 py-1 font-body text-[0.58rem] font-bold uppercase tracking-[0.16em] text-petal">
                    {partner.envKey}
                  </span>
                </div>
                <p className="mt-5 font-body text-sm font-light leading-7 text-smoke">{partner.bestFor}</p>
                <p className="mt-4 font-body text-xs font-light leading-6 text-iron">{partner.reason}</p>
                <div className="mt-6 border-t border-graphite pt-5">
                  <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.24em] text-petal">
                    Revenue note
                  </p>
                  <p className="mt-2 font-body text-xs font-light leading-6 text-smoke">{partner.revenueNote}</p>
                </div>
                <div className="mt-auto flex flex-col gap-3 pt-7">
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="btn-primary inline-flex justify-center px-5 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
                  >
                    Visit {partner.name} →
                  </a>
                  <a
                    href={partner.applyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center border border-graphite px-5 py-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ash transition hover:border-petal hover:text-petal"
                  >
                    {partner.applyLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-void py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-10">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">
              Sponsor inventory
            </p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Sell useful placement, not visual noise.
            </h2>
            <p className="mt-6 max-w-xl font-body text-base font-light leading-8 text-smoke">
              The best sponsorships on this site should feel like a helpful recommendation inside a serious conversation. That keeps trust intact and pricing defensible.
            </p>
          </div>

          <div className="grid gap-px bg-graphite sm:grid-cols-2">
            {SPONSORSHIP_INVENTORY.map((slot) => (
              <article key={slot.name} className="bg-obsidian p-6 md:p-7">
                <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.24em] text-petal">
                  {slot.price}
                </p>
                <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">
                  {slot.name}
                </h3>
                <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{slot.fit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-obsidian py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">
              Lead magnet
            </p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Give them the map before you ask for the click.
            </h2>
            <p className="mt-6 max-w-xl font-body text-base font-light leading-8 text-smoke">
              The Partnership Revenue Map teaches the exact logic behind this page: what to recommend, where to place links, when to pitch sponsors, and how to avoid turning trust into clutter.
            </p>
          </div>
          <InlineLeadCapture initialSlug="partnership-revenue-map" source="partners-page" />
        </div>
      </section>

      <section className="bg-void py-16 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[1fr_0.7fr] lg:px-10">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">
              Disclosure + watchlist
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.02em] text-pearl md:text-5xl">
              Trust first. Commission second.
            </h2>
            <p className="mt-5 max-w-3xl font-body text-sm font-light leading-7 text-smoke">
              {AFFILIATE_DISCLOSURE}
            </p>
          </div>

          <div className="space-y-3">
            {PARTNER_WATCHLIST.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-graphite bg-obsidian p-5 transition hover:border-petal/50 hover:bg-carbon"
              >
                <p className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{item.name}</p>
                <p className="mt-2 font-body text-xs font-light leading-6 text-smoke">{item.reason}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
