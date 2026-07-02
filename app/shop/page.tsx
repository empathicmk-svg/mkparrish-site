import type { Metadata } from "next";
import Link from "next/link";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2, H3Script,
  BtnPrimary, BtnGhost, ArrowLink,
} from "@/app/components/ui";
import { EBOOKS, SERVICE_EBOOKS, MARGINS_TIERS, SUBSTACK_URL, AMAZON_AUTHOR_URL, STRIPE_AUDIT, COMING_SOON_SLUGS, CONTACT } from "@/app/lib/config";
import { PRINT_SHOP_PRODUCTS, coverForSlug, type ShelfProduct } from "@/app/lib/shelf-catalog";
import ShelfBrowser, { type BrowseItem } from "@/app/components/ShelfBrowser";
import { PrintShopCustomizer } from "../shelf/PrintShopCustomizer";

export const metadata: Metadata = {
  title: "Shop — MK Parrish",
  description:
    "Ebooks, guides, frameworks, prints, and custom quote pieces from MK Parrish. Buy directly on the page, or grab the free downloads.",
};

function priceToNum(price: string, free?: boolean): number {
  if (free) return 0;
  const m = price.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

function isBundle(tag: string): boolean {
  return tag === "Best Value" || tag === "Bundle";
}

// One unified, filterable catalog. Order here is the "Featured" sort, so the
// book library leads and the DIY service frameworks follow.
const BROWSE_ITEMS: BrowseItem[] = [
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
];

const FEATURED_BOOK_SLUGS = [
  "rebecoming",
  "still-here-still-hers",
  "street-smarts",
  "make-my-own-light",
  "the-vault",
] as const;

const FEATURED_BOOKS = FEATURED_BOOK_SLUGS
  .map((slug) => BROWSE_ITEMS.find((item) => item.slug === slug))
  .filter((item): item is BrowseItem => Boolean(item));

function productActionHref(product: ShelfProduct) {
  return product.stripe && product.stripe.length > 0 ? product.stripe : product.href;
}

function PrintShopCard({ product }: { product: ShelfProduct }) {
  const actionHref = productActionHref(product);
  const comingSoon = COMING_SOON_SLUGS.has(product.slug);
  const requestProof = actionHref.startsWith("mailto:");
  const external = actionHref.startsWith("http");
  const cover = product.cover ?? `/downloads/covers/${product.slug}-cover.jpg`;

  return (
    <div
      className={`group/card relative flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 ${
        product.highlight ? "bg-carbon shadow-[0_0_60px_rgba(242,175,198,0.08)]" : "bg-obsidian"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {product.highlight && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}

      <Link href={`/shop/${product.slug}`} className="group relative mb-6 block shrink-0 overflow-hidden">
        <span className="absolute left-3 top-3 z-10 bg-petal px-2.5 py-1 font-body text-[0.55rem] font-bold uppercase tracking-[0.2em] text-void">
          {product.tag}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt={`${product.title} print mockup`}
          width={1600}
          height={2560}
          loading="lazy"
          className="aspect-[5/8] w-full border border-graphite/70 object-cover shadow-[0_12px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </Link>

      <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.25em] text-iron">The Print Shop</p>
      <h3 className="mt-2 min-h-[3.5rem] font-display text-2xl uppercase leading-tight tracking-[0.02em] text-pearl">{product.title}</h3>
      <p className="mt-2 font-display text-4xl text-white">{product.price}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(product.sizes ?? []).map((size) => (
          <span key={size} className="border border-graphite px-3 py-1 font-mono text-[0.65rem] tracking-[0.15em] text-iron">
            {size}
          </span>
        ))}
      </div>
      <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">{product.desc}</p>

      <div className="mt-7 space-y-2">
        {comingSoon ? (
          <div className="flex w-full items-center justify-center border border-graphite py-4 font-body text-[0.75rem] font-light uppercase tracking-[0.2em] text-iron">
            Coming Soon
          </div>
        ) : (
          <a
            href={actionHref}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="btn-primary flex w-full items-center justify-center py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-void"
          >
            {requestProof ? "Request Proof" : `Buy — ${product.price}`}
          </a>
        )}
        <Link
          href={`/shop/${product.slug}`}
          className="flex w-full items-center justify-center py-2 font-body text-[0.65rem] font-light uppercase tracking-[0.15em] text-ash transition hover:text-pearl"
        >
          View details →
        </Link>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <section className="relative flex min-h-[64vh] flex-col justify-end bg-void pb-12 pt-28 md:min-h-[68vh] md:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <Eyebrow>The Work, On Demand</Eyebrow>
          <div className="mt-4">
            <H1>The Shop</H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Memoir, poetry, premium PDFs, and the frameworks that sell the work.
          </p>
          <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            Start with REBECOMING, the in-between essays, and the poetry books. Then pick the self-study framework or bundle that moves the next piece of your story into revenue.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <BtnPrimary href="#featured-books">Shop the Books</BtnPrimary>
            <BtnGhost href="#print-shop-studio">Shop the Print Shop</BtnGhost>
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            {["PDF + Kindle EPUB", "Stripe or direct checkout", "Lulu-ready paperbacks"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <span className="h-1 w-1 bg-petal" />
                <span className="font-body text-xs font-light text-smoke">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RevealSection id="featured-books" bg="obsidian" num="01">
        <Eyebrow pink>Featured Books</Eyebrow>
        <H2>Start with<br /><span className="text-petal">the books that burn.</span></H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "62ch" }}>
          The memoir, the in-between essays, the father-loss book, the poetry, and the bundle. Premium PDF/EPUB files first; Lulu-ready paperbacks where the wrap files are already built.
        </p>
        <div className="mt-12 grid auto-rows-fr gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-5">
          {FEATURED_BOOKS.map((book) => {
            const actionHref = book.stripe && book.stripe.length > 0 ? book.stripe : book.href;
            const requestCheckout = actionHref.startsWith("mailto:");
            const external = actionHref.startsWith("http");
            return (
              <div key={book.slug} className="group/card relative flex h-full flex-col bg-carbon p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-x-0 top-0 h-px bg-petal" />
                <Link href={`/shop/${book.slug}`} className="relative mb-5 block overflow-hidden">
                  <span className="absolute left-3 top-3 z-10 bg-petal px-2.5 py-1 font-body text-[0.5rem] font-bold uppercase tracking-[0.18em] text-void">
                    {book.tag}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverForSlug(book.slug)}
                    alt={`${book.title} cover`}
                    width={1600}
                    height={2560}
                    loading="eager"
                    className="aspect-[5/8] w-full border border-graphite/70 object-cover shadow-[0_12px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover/card:scale-[1.03]"
                  />
                </Link>
                <h3 className="font-display text-xl uppercase leading-tight tracking-[0.02em] text-pearl">{book.title}</h3>
                <p className="mt-2 flex items-baseline gap-2 font-display text-3xl text-white">
                  {book.price}
                  {book.compareAt && <span className="font-body text-sm font-light text-iron line-through">{book.compareAt}</span>}
                </p>
                <p className="mt-3 line-clamp-4 flex-1 font-body text-xs font-light leading-6 text-smoke">{book.desc}</p>
                <div className="mt-6 space-y-2">
                  <a
                    href={actionHref}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="btn-primary flex w-full items-center justify-center py-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.18em] text-void"
                  >
                    {requestCheckout ? "Request Checkout" : `Buy — ${book.price}`}
                  </a>
                  <Link
                    href={`/shop/${book.slug}`}
                    className="flex w-full items-center justify-center py-2 font-body text-[0.6rem] font-light uppercase tracking-[0.15em] text-ash transition hover:text-pearl"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </RevealSection>

      {/* ── START HERE: the value ladder — read free, buy the method, or done-for-you ── */}
      <RevealSection bg="void" num="02">
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
              <span className="mr-1.5 align-middle font-body text-sm font-light uppercase tracking-[0.1em] text-iron">From</span>$9
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
      <RevealSection bg="obsidian" num="03" id="browse">
        <Eyebrow>Frameworks, Ebooks &amp; Bundles</Eyebrow>
        <H2>Browse{" "}<span className="text-petal">The Shop.</span></H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "60ch" }}>
          Every book, framework, and bundle on the page. Filter by what you need, sort by price, and start with a bundle to save.
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
      <RevealSection bg="void">
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
      <RevealSection bg="void" num="04">
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

      <RevealSection id="print-shop" bg="obsidian" num="05">
        <Eyebrow>The Print Shop</Eyebrow>
        <H2>The words,{" "}<span className="text-petal">on your wall.</span></H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "58ch" }}>
          Start with a proof, change the line, and send it to MK before anything gets printed. The mockups are built from the same customizer system: Bebas Neue, Playfair Display, DM Sans, petal pink, and carbon grey.
        </p>
        <PrintShopCustomizer contactEmail={CONTACT.email} products={PRINT_SHOP_PRODUCTS} />
        <div className="mt-12 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-petal">
              Shop The Proofs
            </p>
            <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">
              Ready-made starting points, displayed with the same card styling as the ebooks.
            </p>
          </div>
          <a href="#print-shop-studio" className="font-body text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:text-petal">
            Customize first ↑
          </a>
        </div>
        <div className="mt-6 grid auto-rows-fr gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {PRINT_SHOP_PRODUCTS.map((product) => (
            <PrintShopCard key={product.slug} product={product} />
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={17} />

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
            { num: "02", title: "Check out clearly", desc: "Live products open secure Stripe checkout. Private-release books open a direct checkout request. Free downloads start immediately." },
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
