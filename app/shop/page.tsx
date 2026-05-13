import type { Metadata } from "next";
import Link from "next/link";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2, H3Script,
  BtnPrimary, BtnGhost, ArrowLink,
} from "@/app/components/ui";
import {
  EBOOKS, PRINTS, SERVICES, MARGINS_TIERS,
  PATREON_URL, SHOP_URL, STRIPE_EDIT, STRIPE_REWRITE,
} from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Shop — MK Parrish",
  description:
    "Ebooks, guides, and digital products from MK Parrish. The Invisible Bruise, Decoding Angel Numbers, Write Yourself Into the Room, The Vault bundle, and more — instant download via Gumroad.",
};

export default function ShopPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[80vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <Eyebrow>The Work, On Demand</Eyebrow>
          <div className="mt-4">
            <H1>Shop</H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Ebooks. Guides. Poem prints. Instant access.
          </p>
          <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            Everything here is built from real work — not repurposed content. Buy directly on this page. Ebooks deliver instantly via Gumroad. Prints ship via Ko-fi.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <span className="h-1 w-1 bg-petal" />
              <span className="font-body text-xs font-light text-smoke">Instant PDF delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-1 w-1 bg-petal" />
              <span className="font-body text-xs font-light text-smoke">Secure checkout via Gumroad</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-1 w-1 bg-petal" />
              <span className="font-body text-xs font-light text-smoke">No subscription required</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── EBOOKS ── */}
      <RevealSection bg="obsidian" num="01">
        <Eyebrow>Digital Downloads</Eyebrow>
        <H2>
          Ebooks &{" "}
          <span className="text-petal">Guides</span>
        </H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "56ch" }}>
          Click any product to buy directly — checkout opens on this page without leaving the site.
        </p>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-4">
          {EBOOKS.map((e) => (
            <div
              key={e.slug}
              className={`relative flex flex-col p-8 transition-all duration-300 hover:-translate-y-1 ${
                e.highlight ? "bg-carbon shadow-[0_0_60px_rgba(242,175,198,0.08)]" : "bg-obsidian"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              {e.highlight && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-iron">{e.tag}</p>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-pearl leading-tight">{e.title}</h3>
              <p className="mt-2 font-display text-4xl text-white">{e.price}</p>
              <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">{e.desc}</p>
              <ul className="mt-5 space-y-2">
                {e.features.map((f) => (
                  <li key={f} className="flex gap-3 font-body text-xs font-light leading-6 text-iron">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 bg-petal" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-2">
                <a
                  href={e.href}
                  data-gumroad-overlay-checkout="true"
                  className="btn-primary flex w-full items-center justify-center py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-void"
                >
                  Buy Now — {e.price}
                </a>
                <Link
                  href={`/shop/${e.slug}`}
                  className="flex w-full items-center justify-center py-2 font-body text-[0.65rem] font-light uppercase tracking-[0.15em] text-ash transition hover:text-pearl"
                >
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Platform note */}
        <div className="mt-8 flex items-start gap-4 border border-graphite p-6">
          <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 bg-petal" />
          <div className="space-y-1">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ash">How it works</p>
            <p className="font-body text-sm font-light leading-7 text-smoke">
              Clicking "Buy Now" opens a secure Gumroad checkout overlay directly on this page. Pay once, download instantly. Your PDF is delivered immediately to your email — no account required.
            </p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={16} />

      {/* ── POEM PRINTS ── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>Poem Prints</Eyebrow>
        <H2>
          The words,{" "}
          <span className="text-petal">on your wall.</span>
        </H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "52ch" }}>
          Archival-quality prints. Ships via Ko-fi. For the women, survivors, and overthinkers who want the words somewhere permanent.
        </p>

        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-3">
          {PRINTS.map((p) => (
            <div
              key={p.title}
              className="group relative flex flex-col bg-obsidian p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-carbon"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <span className="select-none font-serif text-[5rem] leading-none text-petal/[0.12]">&ldquo;</span>
              <h3 className="font-display text-3xl uppercase tracking-[0.02em] text-pearl">{p.title}</h3>
              <p className="mt-1 font-display text-2xl text-white">{p.price}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <span key={s} className="border border-graphite px-3 py-1 font-mono text-[0.65rem] tracking-[0.15em] text-iron">
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">
                High-quality archival matte print. Ships in protective sleeve. Multiple sizes available.
              </p>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-8 flex w-full items-center justify-center py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-void"
              >
                Shop on Ko-fi
              </a>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={18} />

      {/* ── THE MARGINS ── */}
      <RevealSection bg="obsidian" num="03">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Eyebrow>Membership</Eyebrow>
            <H2>
              The{" "}
              <span className="text-petal">Margins.</span>
            </H2>
            <H3Script>The real work. Before it goes anywhere.</H3Script>
            <div className="mt-6 space-y-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
              <p>
                Weekly essays, raw memoir, strategy notes, and writing that is too honest for a public feed.
                The place where members get everything — unfiltered, early, and real.
              </p>
              <p>
                For the women, survivors, romantics, and overthinkers who know what it feels like
                to rebuild from scratch and want company for that process.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href={PATREON_URL}>Join The Margins</BtnPrimary>
              <ArrowLink href="/margins">See what's inside</ArrowLink>
            </div>
          </div>
          <div className="flex flex-col gap-px">
            {MARGINS_TIERS.map((t, i) => (
              <div key={t.name} className={`relative p-8 ${t.highlight ? "bg-carbon" : "bg-void"}`}>
                {t.highlight && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl">{t.name}</p>
                  <p className={`font-display text-2xl ${t.highlight ? "text-petal" : "text-white"}`}>{t.price}</p>
                </div>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{t.desc}</p>
              </div>
            ))}
            <a
              href={PATREON_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary flex w-full items-center justify-center py-5 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
            >
              Join The Margins →
            </a>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={6} />

      {/* ── CONSULTING SERVICES ── */}
      <RevealSection bg="void" num="04">
        <Eyebrow>Direct work</Eyebrow>
        <H2>
          Need more than{" "}
          <span className="text-petal">a download?</span>
        </H2>
        <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
          The guides are the self-serve option. For the full thing — copy, strategy, and someone who actually writes — I take on a limited number of direct clients.
        </p>

        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-5">
          {SERVICES.map((s) => {
            const external = s.href.startsWith("http");
            return (
              <a
                key={s.title}
                href={s.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group relative flex flex-col justify-between bg-obsidian p-6 transition-all duration-300 hover:-translate-y-px hover:bg-carbon"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                <div>
                  <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-iron">{s.tag}</p>
                  <p className="mt-2 font-display text-2xl uppercase tracking-[0.02em] text-pearl leading-tight">{s.title}</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="font-display text-lg text-petal">{s.price}</p>
                  <span className="flex h-7 w-7 items-center justify-center border border-petal/20 text-sm text-petal/50 transition-all duration-300 group-hover:border-petal group-hover:bg-petal group-hover:text-void">
                    →
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <BtnPrimary href="/book">Book a Strategy Call</BtnPrimary>
          <BtnGhost href="/#rewrites">See All Services</BtnGhost>
        </div>
      </RevealSection>

      {/* ── PLATFORM EXPLAINER ── */}
      <RevealSection bg="obsidian">
        <Eyebrow>How to buy</Eyebrow>
        <H2>Simple.<br /><span className="text-petal">Secure. Instant.</span></H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-3">
          {[
            {
              num: "01",
              title: "Click Buy Now",
              desc: "A secure Gumroad checkout opens directly on this page. You never leave mkparrish.com.",
            },
            {
              num: "02",
              title: "Pay Securely",
              desc: "Pay by card or PayPal. Gumroad uses Stripe for payments — bank-level security, zero storage of your card data.",
            },
            {
              num: "03",
              title: "Download Instantly",
              desc: "Your PDF downloads immediately and is emailed to you. No account required. Access it anytime.",
            },
          ].map((step) => (
            <div key={step.num} className="bg-obsidian p-8">
              <p className="font-mono text-xs tracking-[0.2em] text-petal/60">{step.num}</p>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{step.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-4 border border-graphite p-6">
          <span className="h-1.5 w-1.5 flex-shrink-0 bg-petal" />
          <p className="font-body text-sm font-light leading-7 text-smoke">
            <span className="font-semibold text-ash">Print orders</span> ship via Ko-fi. Click "Shop on Ko-fi" on any print to be taken to the Ko-fi store where you select your size and complete checkout.
          </p>
        </div>
      </RevealSection>
    </>
  );
}
