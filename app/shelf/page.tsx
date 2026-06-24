import type { Metadata } from "next";
import Link from "next/link";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2, H3Script,
  BtnPrimary, BtnGhost, ArrowLink,
} from "@/app/components/ui";
import { EBOOKS, SERVICE_EBOOKS, MARGINS_TIERS, SUBSTACK_URL, AMAZON_AUTHOR_URL, STRIPE_AUDIT, COMING_SOON_SLUGS, CONTACT } from "@/app/lib/config";
import { PRINT_PRODUCTS } from "@/app/lib/shelf-catalog";
import ShelfBrowser, { type BrowseItem } from "@/app/components/ShelfBrowser";
import { NeonWallArtStudio, type NeonDesign } from "./NeonWallArtStudio";
import neonManifest from "@/public/neon-wall-art/manifest.json";

export const metadata: Metadata = {
  title: "The Shelf — MK Parrish",
  description:
    "Ebooks, guides, frameworks, prints, and custom neon wall art from MK Parrish. Buy directly on the page, or grab the free downloads.",
};

function priceToNum(price: string, free?: boolean): number {
  if (free) return 0;
  const m = price.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

function isBundle(tag: string): boolean {
  return tag === "Best Value" || tag === "Bundle";
}

// One unified, filterable catalog: frameworks (the DIY service methods) + ebooks
// and bundles. Order here is the "Featured" sort — curate the highest-intent items first.
const BROWSE_ITEMS: BrowseItem[] = [
  ...SERVICE_EBOOKS.map((e) => ({
    slug: e.slug,
    title: e.title,
    price: e.price,
    priceNum: priceToNum(e.price, e.free),
    compareAt: "compareAt" in e ? (e as { compareAt?: string }).compareAt : undefined,
    tag: e.tag,
    desc: e.desc,
    features: e.features,
    free: e.free,
    limitedFree: "limitedFree" in e ? (e as { limitedFree?: boolean }).limitedFree : false,
    download: e.download,
    stripe: "stripe" in e ? e.stripe : undefined,
    href: e.href,
    category: isBundle(e.tag) ? ("bundles" as const) : ("frameworks" as const),
    featured: e.highlight || isBundle(e.tag),
    comingSoon: COMING_SOON_SLUGS.has(e.slug),
  })),
  ...EBOOKS.map((e) => ({
    slug: e.slug,
    title: e.title,
    price: e.price,
    priceNum: priceToNum(e.price, e.free),
    compareAt: "compareAt" in e ? (e as { compareAt?: string }).compareAt : undefined,
    tag: e.tag,
    desc: e.desc,
    features: e.features,
    free: e.free,
    limitedFree: "limitedFree" in e ? (e as { limitedFree?: boolean }).limitedFree : false,
    download: e.download,
    stripe: "stripe" in e ? e.stripe : undefined,
    href: e.href,
    category: isBundle(e.tag) ? ("bundles" as const) : ("ebooks" as const),
    featured: e.highlight || isBundle(e.tag),
    comingSoon: COMING_SOON_SLUGS.has(e.slug),
  })),
];

export default function ShelfPage() {
  const neonDesigns = neonManifest.designs as NeonDesign[];

  return (
    <>
      <section className="relative flex min-h-[80vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <Eyebrow>The Work, On Demand</Eyebrow>
          <div className="mt-4">
            <H1>The Shelf</H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Templates. Ebooks. Prints. Yours in one click.
          </p>
          <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            Built from real client work — never recycled content. Buy on the page, download the moment you do. Or start free on The Free List.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <BtnPrimary href="#browse">Shop the Shelf</BtnPrimary>
            <BtnGhost href={SUBSTACK_URL}>Start free →</BtnGhost>
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            {["Instant download", "Secure checkout", "Yours to keep"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <span className="h-1 w-1 bg-petal" />
                <span className="font-body text-xs font-light text-smoke">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── START HERE: the value ladder — read free, buy the method, or done-for-you ── */}
      <RevealSection bg="obsidian" num="01">
        <Eyebrow pink>Start Here</Eyebrow>
        <H2>Three ways in,{" "}<span className="text-petal">one path up.</span></H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "60ch" }}>
          Read it free, buy the method, or have it done for you. Start anywhere — most people climb.
        </p>
        <div className="mt-10 grid gap-px bg-graphite md:grid-cols-3">
          {/* Rung 1 — Free */}
          <div className="flex flex-col bg-obsidian p-8">
            <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.25em] text-iron">Read · Free</p>
            <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-pearl">The Free List</h3>
            <p className="mt-2 font-display text-4xl text-white">Free</p>
            <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">
              Public essays, poetry, and a monthly strategy note — straight to your inbox. No card, no catch.
            </p>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost mt-7 flex w-full items-center justify-center py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em]"
            >
              Join free →
            </a>
          </div>

          {/* Rung 2 — Buy once (highlight) */}
          <div className="relative flex flex-col bg-carbon p-8 shadow-[0_0_60px_rgba(242,175,198,0.08)]">
            <div className="absolute inset-x-0 top-0 h-px bg-petal" />
            <span className="absolute right-4 top-4 bg-petal px-2.5 py-1 font-body text-[0.5rem] font-bold uppercase tracking-[0.2em] text-void">
              Most popular
            </span>
            <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.25em] text-petal">Buy once · Own it</p>
            <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-pearl">Frameworks &amp; Bundles</h3>
            <p className="mt-2 font-display text-4xl text-white">
              <span className="mr-1.5 align-middle font-body text-sm font-light uppercase tracking-[0.1em] text-iron">From</span>$14
            </p>
            <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">
              Every paid method, documented from real client work. Buy a single guide — or bundle the library and save.
            </p>
            <a
              href="#browse"
              className="btn-primary mt-7 flex w-full items-center justify-center py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-void"
            >
              Shop the Shelf →
            </a>
          </div>

          {/* Rung 3 — Done-for-you */}
          <div className="flex flex-col bg-obsidian p-8">
            <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.25em] text-iron">Done-for-you</p>
            <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-pearl">The 48-Hour Audit</h3>
            <p className="mt-2 font-display text-4xl text-white">
              <span className="mr-1.5 align-middle font-body text-sm font-light uppercase tracking-[0.1em] text-iron">From</span>$97
            </p>
            <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">
              MK&apos;s eyes on your positioning: a Loom teardown, a scorecard, and rewritten headlines — in 48 hours.
            </p>
            <a
              href={STRIPE_AUDIT}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-7 flex w-full items-center justify-center py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-void"
            >
              Get the Audit →
            </a>
            <Link
              href="/book"
              className="mt-2 flex w-full items-center justify-center py-2 font-body text-[0.65rem] font-light uppercase tracking-[0.15em] text-ash transition hover:text-pearl"
            >
              or book a full call →
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* ── BROWSE: all digital products, filterable + sortable ── */}
      <RevealSection bg="void" num="02" id="browse">
        <Eyebrow>Frameworks, Ebooks &amp; Bundles</Eyebrow>
        <H2>Browse{" "}<span className="text-petal">The Shelf.</span></H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "60ch" }}>
          Every framework is the exact method behind a paid service; every ebook is built from real client work. Filter by what you need, sort by price, and start with a bundle to save.
        </p>
        <div className="mt-10">
          <ShelfBrowser products={BROWSE_ITEMS} />
        </div>
        <div className="mt-8 flex items-start gap-4 border border-graphite p-6">
          <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 bg-petal" />
          <p className="font-body text-sm font-light leading-7 text-smoke">
            Want it done for you instead? <Link href="/book" className="text-petal transition hover:text-blush">Book a call</Link> — strategy, copy, and someone who actually writes it.
          </p>
        </div>
      </RevealSection>

      {/* ── AUDIT BRIDGE — the step between a PDF and a full engagement ── */}
      <RevealSection bg="obsidian">
        <div className="grid items-center gap-8 border border-petal/30 bg-carbon p-8 shadow-[0_0_60px_rgba(242,175,198,0.08)] md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <Eyebrow pink>Want MK&apos;s eyes on it?</Eyebrow>
            <H2>The 48-Hour{" "}<span className="text-petal">Positioning Audit.</span></H2>
            <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
              Past the PDFs, before a full engagement. Send your site, LinkedIn, and one offer page; get a Loom teardown, a scorecard, 3 rewritten headlines, and your top 3 fixes — in 48 hours. <span className="text-pearl">$97, async, no call.</span>
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <BtnPrimary href={STRIPE_AUDIT}>Get the Audit — $97</BtnPrimary>
            <Link href="/audit" className="font-body text-[0.7rem] font-medium uppercase tracking-[0.15em] text-ash transition hover:text-petal">See what&apos;s included →</Link>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={19} />

      {/* ── THE MARGINS — recurring membership revenue, surfaced above one-off prints ── */}
      <RevealSection bg="void" num="03">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Eyebrow>Membership</Eyebrow>
            <H2>The{" "}<span className="text-petal">Margins.</span></H2>
            <H3Script>The real work. Before it goes anywhere.</H3Script>
            <div className="mt-6 space-y-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
              <p>Weekly essays, raw memoir, strategy notes, and writing too honest for a public feed. Members get everything — unfiltered, early, and real.</p>
              <p>For the women, survivors, romantics, and overthinkers who know what it feels like to rebuild from scratch and want company for it.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href={SUBSTACK_URL}>Join The Margins</BtnPrimary>
              <ArrowLink href="/margins">See what&apos;s inside</ArrowLink>
            </div>
          </div>
          <div className="flex flex-col gap-px">
            {MARGINS_TIERS.map((t) => (
              <div key={t.name} className={`relative p-8 ${t.highlight ? "bg-carbon" : "bg-void"}`}>
                {t.highlight && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl">{t.name}</p>
                  <p className={`font-display text-2xl ${t.highlight ? "text-petal" : "text-white"}`}>{t.price}</p>
                </div>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={18} />

      <RevealSection bg="obsidian" num="04">
        <Eyebrow>Poem Prints</Eyebrow>
        <H2>The words,{" "}<span className="text-petal">on your wall.</span></H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "52ch" }}>
          Archival-quality matte prints, shipped in a protective sleeve. Bought right here — no third-party store.
        </p>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-3">
          {PRINT_PRODUCTS.map((p) => (
            <div
              key={p.slug}
              className="group relative flex flex-col bg-obsidian p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-carbon"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <span className="select-none font-serif text-[5rem] leading-none text-petal/[0.12]">&ldquo;</span>
              <h3 className="font-display text-3xl uppercase tracking-[0.02em] text-pearl">{p.title}</h3>
              <p className="mt-1 font-display text-2xl text-white">{p.price}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(p.sizes ?? []).map((s) => (
                  <span key={s} className="border border-graphite px-3 py-1 font-mono text-[0.65rem] tracking-[0.15em] text-iron">{s}</span>
                ))}
              </div>
              <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">{p.desc}</p>
              {p.stripe ? (
                <a
                  href={p.stripe}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-8 flex w-full items-center justify-center py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-void"
                >
                  Buy — {p.price}
                </a>
              ) : (
                <div className="mt-8 flex w-full items-center justify-center border border-graphite py-4 font-body text-[0.75rem] font-light uppercase tracking-[0.2em] text-iron">
                  Coming Soon
                </div>
              )}
              <Link
                href={`/shelf/${p.slug}`}
                className="mt-2 flex w-full items-center justify-center py-2 font-body text-[0.65rem] font-light uppercase tracking-[0.15em] text-ash transition hover:text-pearl"
              >
                View details →
              </Link>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={17} />

      <RevealSection id="neon-wall-art" bg="obsidian" num="05">
        <Eyebrow>Neon Wall Art</Eyebrow>
        <H2>Glowing pink{" "}<span className="text-petal">quote pieces.</span></H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "58ch" }}>
          JPG quote mockups from the MK archive, plus a custom proof builder for names, vows, private lines, and phrases that deserve to live on the wall.
        </p>
        <NeonWallArtStudio designs={neonDesigns} contactEmail={CONTACT.email} />
      </RevealSection>

      {/* ── ALSO ON AMAZON ── */}
      <RevealSection bg="void">
        <div className="grid items-center gap-8 border border-graphite p-8 md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <Eyebrow>Also on Amazon</Eyebrow>
            <H2>Read on{" "}<span className="text-petal">Kindle.</span></H2>
            <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "46ch" }}>
              Prefer Kindle, or a paperback on the shelf? My books live on Amazon too — same words, your format.
            </p>
          </div>
          <div className="flex md:justify-end">
            <BtnPrimary href={AMAZON_AUTHOR_URL}>MK Parrish on Amazon →</BtnPrimary>
          </div>
        </div>
      </RevealSection>

      {/* ── HOW TO BUY ── */}
      <RevealSection bg="obsidian">
        <Eyebrow>How it works</Eyebrow>
        <H2>Simple.<br /><span className="text-petal">Secure. Clear.</span></H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-3">
          {[
            { num: "01", title: "Choose the work", desc: "Open any detail page to see exactly what is included, who it is for, the format, and the price before you buy." },
            { num: "02", title: "Check out securely", desc: "Paid products open a secure Stripe checkout. Free downloads start directly, with no account or subscription required." },
            { num: "03", title: "Get the order", desc: "Digital products are available immediately. Physical prints are produced and shipped in a protective sleeve." },
          ].map((s) => (
            <div key={s.num} className="bg-void p-8">
              <p className="font-mono text-xs tracking-[0.2em] text-petal/60">{s.num}</p>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{s.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{s.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>
    </>
  );
}
