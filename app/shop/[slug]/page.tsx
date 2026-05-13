import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EBOOKS, PATREON_URL } from "@/app/lib/config";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2, H3Script,
  BtnPrimary, BtnGhost, ArrowLink,
} from "@/app/components/ui";

export function generateStaticParams() {
  return EBOOKS.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = EBOOKS.find((e) => e.slug === params.slug);
  if (!product) return {};
  return {
    title: `${product.title} — MK Parrish`,
    description: `${product.subtitle} ${product.desc}`,
  };
}

const extraContent: Record<string, { about: string[]; forWho: string[]; pullQuote: string }> = {
  "invisible-bruise": {
    about: [
      "This is not a clinical guide. It is the book I needed when I was living inside something I could not yet name — when I knew something was wrong but could not prove it. When I was being destroyed quietly, in a house that looked fine from the outside.",
      "Eight chapters that move from the beginning of emotional abuse through what it does to your body, your memory, your identity — and into the long, non-linear work of rebuilding. Poetry woven through every chapter. No platitudes. No toxic positivity. Just the truth, written from inside it.",
      "For the woman who is not ready to call it abuse yet. For the woman who called it love for too long. For the woman who is finally, quietly, done.",
    ],
    forWho: [
      "You've been told you're too sensitive, too emotional, too much",
      "You apologize constantly and aren't sure why",
      "You monitor his mood before you decide how to speak",
      "You've been told what you remember didn't happen that way",
      "You stay because you love him and can't reconcile that with what he does",
      "You're in the middle of leaving, or the aftermath of it",
    ],
    pullQuote: "She was not dramatic. She was documenting.",
  },
  "reinvention-workbook": {
    about: [
      "Twenty writing exercises built from the actual reinvention process — not theory lifted from a business book. These exercises are what I used myself and refined with clients who were in the middle of becoming someone new.",
      "The workbook moves through four phases: inventory (who you were), audit (what no longer fits), excavation (who is underneath), and draft (how to write the new story). Each exercise builds on the last.",
      "Designed for people who think better when they write. Who need a prompt to get honest. Who know the answers are in there somewhere and just need the right questions.",
    ],
    forWho: [
      "You're in a career or life transition and don't know how to talk about it yet",
      "Your old story no longer fits but the new one isn't finished",
      "You've tried journaling but never know where to start",
      "You need structure to get to the truth",
      "You're rebuilding your identity after a relationship, job loss, or major change",
    ],
    pullQuote: "Promise me I can become the person who stops confusing hope with evidence.",
  },
  "write-yourself-into-the-room": {
    about: [
      "A personal brand writing guide for people who are tired of sounding like everyone else. Not a template. A framework — and a method for finding the specific language that is actually yours.",
      "Covers: how to write a bio that doesn't put people to sleep, how to build a LinkedIn that works, how to write a positioning statement that makes the right people stop and read, and how to develop a voice that is consistent across every surface.",
      "Used by executives, founders, and people mid-pivot who needed to close the gap between how good their work actually is and how it sounds on paper.",
    ],
    forWho: [
      "Your LinkedIn hasn't been updated since your last job change",
      "Your bio sounds like everyone else in your industry",
      "You've outgrown the language you're still using to describe yourself",
      "People underestimate you because your copy undersells you",
      "You want to write your own copy instead of paying someone to do it",
    ],
    pullQuote: "The wrong words cost you. Quietly. Before you even know a decision was made.",
  },
  "brand-voice-playbook": {
    about: [
      "The exact process used to build brand voice documents for clients — packaged so you can run it yourself. Includes a complete, annotated example brand voice guide so you can see what the finished product looks like.",
      "Covers the full spectrum: from core personality traits to tone calibration across contexts (social vs. email vs. sales copy), vocabulary do's and don'ts, and the framework for writing anything in your brand's voice.",
      "Built for founders and small teams who need consistency across everything they publish but don't have a full marketing department to enforce it.",
    ],
    forWho: [
      "Your brand sounds different depending on who wrote what",
      "You're bringing on writers or contractors and need to brief them",
      "You've never documented your brand voice and need a place to start",
      "Your copy is inconsistent across your website, email, and social",
      "You want a reference document your whole team can use",
    ],
    pullQuote: "Not by building a persona. By finally presenting the real thing with enough precision that the right people recognize it.",
  },
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = EBOOKS.find((e) => e.slug === params.slug);
  if (!product) notFound();

  const extra = extraContent[product.slug] ?? {
    about: [product.desc],
    forWho: product.features,
    pullQuote: "",
  };

  const otherProducts = EBOOKS.filter((e) => e.slug !== product.slug).slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[85vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div className="grid gap-16 lg:grid-cols-[1fr_420px]">
            <div>
              <Eyebrow>{product.tag} &middot; Digital Download</Eyebrow>
              <div className="mt-4">
                <H1>{product.title}</H1>
              </div>
              <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
                {product.subtitle}
              </p>
              <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
                {product.desc}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={product.href}
                  data-gumroad-overlay-checkout="true"
                  className="btn-primary inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
                >
                  Buy Now — {product.price}
                </a>
                <span className="font-body text-xs font-light text-iron">
                  Instant PDF download via Gumroad &middot; Secure checkout
                </span>
              </div>
            </div>

            {/* Product card */}
            <div
              className="relative flex flex-col justify-between bg-obsidian p-10"
              style={{ minHeight: "380px" }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-petal" />
              <div>
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-iron">{product.tag}</p>
                <p className="mt-4 font-display text-5xl uppercase tracking-[0.01em] text-white">{product.price}</p>
                <p className="mt-1 font-body text-xs font-light text-ash">One-time purchase · Instant access</p>
              </div>
              <ul className="my-8 space-y-4">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 bg-petal" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <a
                  href={product.href}
                  data-gumroad-overlay-checkout="true"
                  className="btn-primary flex w-full items-center justify-center py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
                >
                  Buy Now — {product.price}
                </a>
                <p className="text-center font-body text-[0.65rem] font-light text-iron">
                  Delivered by Gumroad &middot; PDF format &middot; No subscription
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE BOOK ── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-16 lg:grid-cols-[280px_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>About</Eyebrow>
            <H2>{product.title.split(" ").slice(0, 2).join(" ")}<br />{product.title.split(" ").slice(2).join(" ")}</H2>
            <div className="mt-8">
              <a
                href={product.href}
                data-gumroad-overlay-checkout="true"
                className="btn-primary inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
              >
                Get It — {product.price}
              </a>
            </div>
          </div>
          <div className="space-y-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "64ch" }}>
            {extra.about.map((p, i) => <p key={i}>{p}</p>)}
            {extra.pullQuote && (
              <div className="my-10 border-l-2 border-petal/40 pl-8">
                <p className="font-serif text-xl italic text-pearl" style={{ fontWeight: 600, lineHeight: 1.75 }}>
                  &ldquo;{extra.pullQuote}&rdquo;
                </p>
                <p className="mt-4 font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ash">
                  — MK Parrish
                </p>
              </div>
            )}
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={17} />

      {/* ── WHO IT'S FOR ── */}
      <RevealSection bg="void" num="02">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Who it's for</Eyebrow>
            <H2>This is<br /><span className="text-petal">for you if —</span></H2>
          </div>
          <ul className="space-y-4 pt-2">
            {extra.forWho.map((item, i) => (
              <li key={i} className="flex gap-4 border-b border-graphite pb-4 last:border-0">
                <span className="mt-1 font-mono text-xs tracking-[0.2em] text-petal/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-sm font-light leading-7 text-smoke">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </RevealSection>

      {/* ── PURCHASE CTA ── */}
      <RevealSection bg="obsidian">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(242,175,198,0.08),transparent_65%)]" />
          </div>
          <div className="relative text-center" style={{ padding: "clamp(3rem,8vw,6rem) 0" }}>
            <Eyebrow>Get instant access</Eyebrow>
            <H2>{product.title}</H2>
            <p className="mx-auto mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "48ch" }}>
              {product.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={product.href}
                data-gumroad-overlay-checkout="true"
                className="btn-primary inline-flex items-center justify-center px-10 py-5 font-body text-[0.85rem] font-bold uppercase tracking-[0.2em] text-void"
              >
                Buy Now — {product.price}
              </a>
              <ArrowLink href="/shop">See all products</ArrowLink>
            </div>
            <p className="mt-6 font-body text-xs font-light text-iron">
              Secure checkout via Gumroad &middot; Instant PDF delivery &middot; No subscription required
            </p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={13} />

      {/* ── OTHER PRODUCTS ── */}
      <RevealSection bg="void">
        <Eyebrow>Also available</Eyebrow>
        <H2>More from<br /><span className="text-petal">the shop.</span></H2>
        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {otherProducts.map((p) => (
            <a
              key={p.slug}
              href={`/shop/${p.slug}`}
              className="group relative flex flex-col bg-obsidian p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-carbon"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-iron">{p.tag}</p>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{p.title}</h3>
              <p className="mt-2 font-display text-3xl text-petal">{p.price}</p>
              <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">{p.desc}</p>
              <span className="mt-6 font-body text-xs font-bold uppercase tracking-[0.2em] text-petal/60 transition-colors group-hover:text-petal">
                View product →
              </span>
            </a>
          ))}
        </div>
      </RevealSection>

      {/* ── MARGINS CTA ── */}
      <RevealSection bg="obsidian">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Eyebrow>Want more?</Eyebrow>
            <H2>Join<br /><span className="text-petal">The Margins.</span></H2>
            <H3Script>The writing that doesn't go anywhere else.</H3Script>
            <p className="mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
              Weekly essays, raw memoir, strategy notes, and the writing that is too honest for a public feed. From $5/month. Cancel anytime.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href={PATREON_URL}>Join The Margins</BtnPrimary>
              <ArrowLink href="/margins">Learn more</ArrowLink>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-px">
            {[
              { name: "Soft Cover",   price: "$5/mo"  },
              { name: "Marked Up",    price: "$12/mo" },
              { name: "First Edition",price: "$28/mo" },
            ].map((t, i) => (
              <div key={t.name} className={`relative p-6 ${i === 1 ? "bg-carbon" : "bg-void"}`}>
                {i === 1 && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-lg uppercase tracking-[0.02em] text-pearl">{t.name}</p>
                  <p className={`font-display text-xl ${i === 1 ? "text-petal" : "text-white"}`}>{t.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>
    </>
  );
}
