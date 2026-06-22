import type { Metadata } from "next";
import Link from "next/link";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2, H3Script,
  BtnPrimary, ArrowLink,
} from "@/app/components/ui";
import { EBOOKS, SERVICE_EBOOKS, MARGINS_TIERS, SUBSTACK_URL, AMAZON_AUTHOR_URL, STRIPE_AUDIT, COMING_SOON_SLUGS } from "@/app/lib/config";
import { PRINT_PRODUCTS, coverForSlug } from "@/app/lib/shelf-catalog";

export const metadata: Metadata = {
  title: "The Shelf — MK Parrish",
  description:
    "Ebooks, guides, frameworks, and prints from MK Parrish. Buy directly on the page, or grab the free downloads. Instant access — no third-party store.",
};

type Product = {
  slug: string;
  title: string;
  price: string;
  tag: string;
  highlight: boolean;
  desc: string;
  features: readonly string[];
  free?: boolean;
  limitedFree?: boolean;
  download?: string;
  stripe?: string;
  href: string;
};

function buyHref(p: Product) {
  return p.stripe && p.stripe.length > 0 ? p.stripe : p.href;
}

function ProductCard({ p, bg }: { p: Product; bg: "obsidian" | "void" }) {
  const isFree = Boolean(p.free && p.download);
  const limitedFree = isFree && Boolean(p.limitedFree);
  // Bundles + flagged picks get the lit-up treatment — they're the ones to push.
  const featured = p.highlight || p.tag === "Best Value";

  return (
    <div
      className={`relative flex flex-col p-8 transition-all duration-300 hover:-translate-y-1 ${
        featured ? "bg-carbon shadow-[0_0_60px_rgba(242,175,198,0.08)]" : bg === "void" ? "bg-void" : "bg-obsidian"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {featured && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
      <Link href={`/shelf/${p.slug}`} className="group mb-7 block overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverForSlug(p.slug)}
          alt={`${p.title} — book cover`}
          width={1600}
          height={2560}
          loading="lazy"
          className="aspect-[5/8] w-full border border-graphite/70 object-cover shadow-[0_12px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </Link>
      <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-iron">
        {limitedFree ? "Free · Limited Time" : isFree ? "Free Download" : p.tag}
      </p>
      <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-pearl leading-tight">{p.title}</h3>
      <p className="mt-2 font-display text-4xl text-white">
        {isFree ? "Free" : p.price}
        {limitedFree && <span className="ml-2 align-middle font-body text-base font-light text-iron line-through">{p.price}</span>}
      </p>
      <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">{p.desc}</p>
      <ul className="mt-5 space-y-2">
        {p.features.map((f) => (
          <li key={f} className="flex gap-3 font-body text-xs font-light leading-6 text-iron">
            <span className="mt-2 h-1 w-1 flex-shrink-0 bg-petal" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-8 space-y-2">
        {COMING_SOON_SLUGS.has(p.slug) ? (
          <div className="flex w-full items-center justify-center border border-graphite py-4 font-body text-[0.75rem] font-light uppercase tracking-[0.2em] text-iron">
            Coming Soon
          </div>
        ) : isFree ? (
          <a
            href={p.download}
            download
            className="btn-primary flex w-full items-center justify-center py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-void"
          >
            Download Free →
          </a>
        ) : (
          <a
            href={buyHref(p)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary flex w-full items-center justify-center py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-void"
          >
            Buy — {p.price}
          </a>
        )}
        <Link
          href={`/shelf/${p.slug}`}
          className="flex w-full items-center justify-center py-2 font-body text-[0.65rem] font-light uppercase tracking-[0.15em] text-ash transition hover:text-pearl"
        >
          View details →
        </Link>
      </div>
    </div>
  );
}

export default function ShelfPage() {
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
            Built from real client work — never recycled content. Buy on the page, download the moment you do. A few are free.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {["Instant download", "Secure checkout", "Yours to keep"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <span className="h-1 w-1 bg-petal" />
                <span className="font-body text-xs font-light text-smoke">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES (self-guided frameworks) ── */}
      <RevealSection bg="obsidian" num="01">
        <Eyebrow>Self-Guided Frameworks</Eyebrow>
        <H2>The{" "}<span className="text-petal">Templates.</span></H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "58ch" }}>
          Each one is the exact method behind a paid service — documented step by step. Same framework, your timeline. Start with a bundle and save.
        </p>
        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-4">
          {SERVICE_EBOOKS.map((e) => (
            <ProductCard key={e.slug} p={e as Product} bg="obsidian" />
          ))}
        </div>
        <div className="mt-8 flex items-start gap-4 border border-graphite p-6">
          <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 bg-petal" />
          <p className="font-body text-sm font-light leading-7 text-smoke">
            Want it done for you instead? <Link href="/book" className="text-petal transition hover:text-blush">Book a call</Link> — strategy, copy, and someone who actually writes it.
          </p>
        </div>
      </RevealSection>

      <QuoteDivider index={16} />

      {/* ── EBOOKS & GUIDES ── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>Digital Downloads</Eyebrow>
        <H2>Ebooks &{" "}<span className="text-petal">Guides.</span></H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "52ch" }}>
          Read them tonight, use them tomorrow. One&apos;s free for now — grab it before it isn&apos;t.
        </p>
        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-4">
          {EBOOKS.map((e) => (
            <ProductCard key={e.slug} p={e as Product} bg="void" />
          ))}
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

      <RevealSection bg="void" num="03">
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

      <QuoteDivider index={18} />

      <RevealSection bg="obsidian" num="04">
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
