import type { Metadata } from "next";
import Link from "next/link";
import { QuoteMosaic } from "@/app/components/QuoteMosaic";
import { CONTACT } from "@/app/lib/config";
import {
  AFFILIATE_DISCLOSURE,
  AFFILIATE_PARTNERS,
  PARTNER_APPLICATION_QUEUE,
  SPONSORSHIP_INVENTORY,
} from "@/app/lib/affiliate-partners";

export const metadata: Metadata = {
  title: "Sponsorships & Affiliate Partners - MK Parrish",
  description:
    "Sponsor MK Parrish book, essay, and shop surfaces or apply for affiliate programs that fit the Rebecoming and Rewrite Your Story audience.",
};

const sponsorshipHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
  "MK Parrish sponsorship or affiliate partnership",
)}`;
const phoneHref = `tel:+1${CONTACT.phone.replace(/\D/g, "")}`;

const advertisingPlan = [
  {
    label: "Book front door",
    title: "Send new readers to Rebecoming first.",
    detail:
      "Advertise the free chapter, the full book, and the line that already carries the brand: You are not starting over. You are rebecoming.",
  },
  {
    label: "Shop lift",
    title: "Make the Shelf the second stop.",
    detail:
      "Use Rebecoming to introduce the voice, then route ready buyers to the shop for ebooks, workbooks, and practical guides.",
  },
  {
    label: "Sponsor fit",
    title: "Sell one useful placement at a time.",
    detail:
      "Best-fit sponsors serve women rebuilding identity, faith, work, health, money, home, publishing, or creative independence after transition.",
  },
  {
    label: "Affiliate fit",
    title: "Recommend tools that match the work.",
    detail:
      "Email, newsletter, CRM, website, SEO, design, and book-commerce tools can sit beside the books because they help readers build the next life.",
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
              Sponsorships + affiliates
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-6xl uppercase leading-[0.88] tracking-[0.01em] text-pearl md:text-8xl lg:text-9xl">
              Sponsor the work readers <span className="text-petal">trust.</span>
            </h1>
            <p className="mt-7 max-w-3xl font-serif text-xl italic leading-9 text-smoke md:text-2xl">
              MK Parrish partners should help women rewrite the story, buy the book, build the next chapter, or make the work easier to carry.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={sponsorshipHref}
                className="btn-primary inline-flex justify-center px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
              >
                Sponsor MK Parrish →
              </a>
              <a
                href={phoneHref}
                className="inline-flex justify-center border border-petal/40 px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:border-petal hover:bg-petal hover:text-void"
              >
                Call / Text {CONTACT.phone}
              </a>
              <Link
                href="/rebecoming"
                className="inline-flex justify-center border border-graphite px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal"
              >
                View Rebecoming
              </Link>
            </div>
          </div>

          <aside className="self-start border border-graphite bg-obsidian p-7 md:p-9">
            <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">
              Build this first
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

      <QuoteMosaic
        eyebrow="Why sponsors fit"
        title="The reader is not passive. She is rebuilding."
        description="The best partner placement helps the reader rewrite something real: money, voice, systems, book sales, home, health, work, or faith."
        highlighted
        primaryCta={{ href: sponsorshipHref, label: "Pitch a Sponsor Fit" }}
        secondaryCta={{ href: "/shop", label: "See the Shelf" }}
        slugs={["mk-rebecoming", "coco-style", "jayz-business", "mk-seen"]}
      />

      <section className="bg-carbon py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-px bg-graphite md:grid-cols-4">
            {advertisingPlan.map((item) => (
              <article key={item.label} className="bg-carbon p-6 md:p-7">
                <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.24em] text-petal">
                  {item.label}
                </p>
                <h2 className="mt-4 font-display text-3xl uppercase leading-none tracking-[0.02em] text-pearl">
                  {item.title}
                </h2>
                <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.detail}</p>
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
              Keep the offer clear and the room clean.
            </h2>
            <p className="mt-6 max-w-xl font-body text-base font-light leading-8 text-smoke">
              The sponsorship model is intentionally narrow: one useful partner at a time, tied to the book, the essays, the shop, or a workshop people would want anyway.
            </p>
            <a
              href={sponsorshipHref}
              className="btn-primary mt-7 inline-flex justify-center px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
            >
              Request Sponsor Details →
            </a>
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
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 grid gap-6 border-b border-graphite pb-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">
                Affiliate links to create
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
                Apply for programs that belong beside the books.
              </h2>
            </div>
            <p className="max-w-2xl font-body text-base font-light leading-8 text-smoke lg:pt-10">
              These are the first affiliate programs worth building around because they match the MK Parrish reader path: read, rewrite, publish, organize, sell, and keep going.
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
                    href={partner.applyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex justify-center px-5 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
                  >
                    {partner.applyLabel} →
                  </a>
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex justify-center border border-graphite px-5 py-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ash transition hover:border-petal hover:text-petal"
                  >
                    Current Link
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-4xl font-body text-xs font-light leading-6 text-iron">
            {AFFILIATE_DISCLOSURE}
          </p>
        </div>
      </section>

      <section className="bg-void py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-6 text-center lg:px-10">
          <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">
            Best book ad angle
          </p>
          <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-7xl">
            You are not starting over. You are rebecoming.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl font-serif text-xl italic leading-9 text-smoke">
            Lead with the sentence, show the cover, offer Chapter One, then move readers into the full Rebecoming page and the shop. Sponsors should support the reader&apos;s next chapter, not interrupt it.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/rebecoming"
              className="btn-primary inline-flex justify-center px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
            >
              Enter Rebecoming →
            </Link>
            <Link
              href="/shop"
              className="inline-flex justify-center border border-graphite px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal"
            >
              Shop the Books
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
