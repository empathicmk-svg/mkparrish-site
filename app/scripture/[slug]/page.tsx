import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SCRIPTURE_EBOOKS, COMING_SOON_SLUGS } from "@/app/lib/config";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2,
  BtnGhost, ArrowLink,
} from "@/app/components/ui";

const GOLD = "#D4A843";
const GOLD_LINE = "rgba(212, 168, 67, 0.35)";

export function generateStaticParams() {
  return SCRIPTURE_EBOOKS.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = SCRIPTURE_EBOOKS.find((e) => e.slug === params.slug);
  if (!product) return {};
  return {
    title: `${product.title} — Scripture & Strategy`,
    description: `${product.subtitle} ${product.desc}`,
  };
}

const extraContent: Record<string, { about: string[]; forWho: string[]; pullQuote: string }> = {
  "the-study": {
    about: [
      "Most Bible study resources assume you are already inside the institution. They assume a church home, a Sunday school background, a vocabulary you picked up somewhere between confirmation class and vacation Bible school. This guide assumes none of that.",
      "The Study is the entry point for the woman who has faith but has never found a method that fits her brain, her schedule, or her honest skepticism. It covers five distinct study approaches — from inductive study to lectio divina to topical deep dives — with practical templates for each, and zero requirement that you perform your faith for anyone.",
      "This is about building a practice that is yours. Consistent, meaningful, and genuinely personal — because that is the only kind that lasts.",
    ],
    forWho: [
      "You believe but have never had a structured Bible study practice",
      "You left a church and kept the faith but lost the habit",
      "Every resource you've tried assumed knowledge or commitment you don't have",
      "You want to study on your own schedule, without a group or a curriculum",
      "You are skeptical but genuinely curious — and you need a place to start",
    ],
    pullQuote: "Faith that survives deconstruction is the kind worth building on.",
  },
  "gospel-and-grind": {
    about: [
      "There is a version of faith entrepreneurship that feels like a performance — where the Scripture reference is a branding choice and the calling is a sales funnel. This guide is not about that.",
      "Gospel &amp; Grind is about the woman who actually believes what she is building around. Who wants to make real income from a practice that is genuinely her own. And who needs a framework for doing that without compromising the integrity of either the faith or the business.",
      "Covers the full alignment: how to position yourself as a faith entrepreneur without reducing your belief to a niche, how to build income streams that reflect your actual values, and how to talk about what you do in a way that is honest, magnetic, and not apologetic.",
    ],
    forWho: [
      "You want to build a business grounded in your faith without it feeling performative",
      "You have been told that faith and money don't mix and you don't believe that anymore",
      "Your values are faith-informed and you want your brand to reflect that honestly",
      "You want to charge for what you do without feeling like you're selling your faith",
      "You are a coach, creator, or consultant with a faith-based perspective that your audience needs",
    ],
    pullQuote: "The calling and the income are not in conflict. The apology is.",
  },
  "the-sermon-notes": {
    about: [
      "Everything you study privately is a potential resource for someone else. The Sermon Notes is the system for making that transfer — from your personal study practice to teachable, shareable, sellable content.",
      "Built around a simple pipeline: one passage, multiple formats. Covers how to move from personal notes to email content to social media to digital products to live teaching — with a different template for each output and a calendar structure that makes it sustainable.",
      "For the woman who studies consistently but has not yet systematized her output. Who has insights other people are paying for in workshops and courses and group programs — and who is ready to build the infrastructure to deliver them.",
    ],
    forWho: [
      "You have a consistent study practice and you are ready to share what you find",
      "You have been sharing your insights informally and are ready to formalize and charge",
      "You want to build a content library from your faith study without burning out",
      "You are a teacher or speaker who wants a more systematic approach to content creation",
      "You need to know how one study session becomes a month's worth of content",
    ],
    pullQuote: "What you find in private belongs in public. Someone is waiting for exactly what you know.",
  },
  "the-calling-card": {
    about: [
      "A faith brand voice is not a personality trait you perform. It is a reflection of your actual values, your actual language, and your actual relationship to the content you create. This guide builds it from the ground up.",
      "Adapted from The Brand Voice Playbook and rebuilt for faith-based creators, teachers, and coaches — with specific attention to the challenges of faith branding: how to be clear without being preachy, how to lead with conviction without alienating, how to write for an audience that may be anywhere on the spectrum from deeply devout to quietly spiritual.",
      "Includes a full annotated brand voice example for a faith-based business, tone calibration across formats, and the vocabulary mapping process that separates faith brands that connect from faith brands that perform.",
    ],
    forWho: [
      "Your faith informs your work but your brand doesn't reflect it clearly",
      "You sound different on every platform and want a consistent faith-informed voice",
      "You're bringing on writers or collaborators who need to understand your brand",
      "You want a document that captures your voice so you don't have to explain it every time",
      "You're launching a faith-based brand and want to start with your voice locked in",
    ],
    pullQuote: "The right words do not water down what you believe. They translate it.",
  },
  "ministry-monetized": {
    about: [
      "You have been leading a Bible study, sending the notes, running the group, doing the research. You are the curriculum. You are the product. And you have been giving it away for free.",
      "Ministry, Monetized is the playbook for changing that. Covers the full launch arc: how to position a paid Bible study community, how to price it (and why most faith creators underprice out of guilt), how to build the membership tiers that work for your audience, and how to write the launch copy that leads with mission rather than money.",
      "For the woman who has been told — or has told herself — that charging for ministry is wrong. It is not. This guide makes the case and gives you the framework to do it right.",
    ],
    forWho: [
      "You lead a Bible study and have been doing it for free",
      "You want to launch a paid community but don't know how to price or position it",
      "You feel guilty about charging for faith-based work and you need a framework that addresses that directly",
      "You have an audience and you are ready to build something structured and sustainable around them",
      "You want to turn your teaching practice into recurring revenue",
    ],
    pullQuote: "Sustainability is not the enemy of the calling. It is the condition for it.",
  },
  "scripture-strategy-bundle": {
    about: [
      "Every guide in the Scripture &amp; Strategy collection — in one purchase. From building a personal study practice to launching a paid ministry community, the full library covers every step of the faith-to-income arc.",
      "Designed to be read in sequence or used as a reference library depending on where you are in the process. Whether you are starting from zero or already teaching and need to build the business infrastructure around it, these five guides have everything you need.",
      "This is the complete toolkit for the woman who takes both her faith and her ambition seriously. No separating the two. No apologies for either.",
    ],
    forWho: [
      "You want the complete Scripture & Strategy library in one purchase",
      "You are building a faith-based business and need every framework from practice to revenue",
      "You want to start at the beginning and go all the way through",
      "You are serious about your faith practice and your income — at the same time",
      "You want every guide included as the brand grows and new releases are added",
    ],
    pullQuote: "The calling and the income are not in conflict. The apology is.",
  },
};

export default function ScriptureProductPage({ params }: { params: { slug: string } }) {
  const product = SCRIPTURE_EBOOKS.find((e) => e.slug === params.slug);
  if (!product) notFound();

  const extra = extraContent[product.slug] ?? {
    about: [product.desc],
    forWho: [...product.features],
    pullQuote: "",
  };

  const otherProducts = SCRIPTURE_EBOOKS.filter((e) => e.slug !== product.slug).slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[85vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 h-[65vh] w-[80vw] -translate-x-1/2"
            style={{
              background: `radial-gradient(ellipse at top, rgba(212,168,67,0.1) 0%, transparent 65%)`,
            }}
          />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div className="grid gap-16 lg:grid-cols-[1fr_420px]">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Link
                  href="/scripture"
                  className="font-body text-[0.65rem] font-light uppercase tracking-[0.2em] text-iron transition hover:text-pearl"
                >
                  ← Scripture &amp; Strategy
                </Link>
              </div>
              <Eyebrow>{product.tag} · Digital Download</Eyebrow>
              <div className="mt-4">
                <H1>{product.title}</H1>
              </div>
              <p className="mt-6 font-serif text-xl italic md:text-2xl" style={{ fontWeight: 500, color: `${GOLD}cc` }}>
                {product.subtitle}
              </p>
              <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
                {product.desc}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {COMING_SOON_SLUGS.has(product.slug) ? (
                  <div className="inline-flex items-center justify-center border border-graphite px-8 py-4 font-body text-[0.8rem] font-light uppercase tracking-[0.2em] text-iron">
                    Coming Soon
                  </div>
                ) : (
                  <a
                    href={product.href}
                    data-gumroad-overlay-checkout="true"
                    className="inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
                    style={{ background: GOLD }}
                  >
                    Buy Now — {product.price}
                  </a>
                )}
                <span className="font-body text-xs font-light text-iron">
                  {COMING_SOON_SLUGS.has(product.slug)
                    ? "Gumroad listing coming soon"
                    : "Instant PDF download via Gumroad · Secure checkout"}
                </span>
              </div>
            </div>

            {/* Product card */}
            <div
              className="relative flex flex-col justify-between bg-obsidian p-10"
              style={{ minHeight: "380px", borderTop: `1px solid ${GOLD}` }}
            >
              <div>
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-iron">{product.tag}</p>
                <p className="mt-4 font-display text-5xl uppercase tracking-[0.01em] text-white">{product.price}</p>
                <p className="mt-1 font-body text-xs font-light text-ash">One-time purchase · Instant access</p>
              </div>
              <ul className="my-8 space-y-4">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                    <span className="mt-2 h-1 w-1 flex-shrink-0" style={{ background: GOLD }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <a
                  href={product.href}
                  data-gumroad-overlay-checkout="true"
                  className="flex w-full items-center justify-center py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
                  style={{ background: GOLD }}
                >
                  Buy Now — {product.price}
                </a>
                <p className="text-center font-body text-[0.65rem] font-light text-iron">
                  Delivered by Gumroad · PDF format · No subscription
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-16 lg:grid-cols-[280px_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>About</Eyebrow>
            <H2>
              {product.title.split(" ").slice(0, 2).join(" ")}
              <br />
              {product.title.split(" ").slice(2).join(" ")}
            </H2>
            <div className="mt-8">
              {COMING_SOON_SLUGS.has(product.slug) ? (
                <div className="inline-flex items-center justify-center border border-graphite px-7 py-4 font-body text-[0.8rem] font-light uppercase tracking-[0.2em] text-iron">
                  Coming Soon
                </div>
              ) : (
                <a
                  href={product.href}
                  data-gumroad-overlay-checkout="true"
                  className="inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
                  style={{ background: GOLD }}
                >
                  Get It — {product.price}
                </a>
              )}
            </div>
          </div>
          <div className="space-y-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "64ch" }}>
            {extra.about.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
            {extra.pullQuote && (
              <div className="my-10 border-l-2 pl-8" style={{ borderColor: GOLD_LINE }}>
                <p className="font-serif text-xl italic text-pearl" style={{ fontWeight: 600, lineHeight: 1.75 }}>
                  &ldquo;{extra.pullQuote}&rdquo;
                </p>
                <p className="mt-4 font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ash">
                  — Scripture &amp; Strategy
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
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <H2>
              This is<br />
              <span style={{ color: GOLD }}>for you if —</span>
            </H2>
          </div>
          <ul className="space-y-4 pt-2">
            {extra.forWho.map((item, i) => (
              <li key={i} className="flex gap-4 border-b border-graphite pb-4 last:border-0">
                <span className="mt-1 font-mono text-xs tracking-[0.2em]" style={{ color: `${GOLD}66` }}>
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
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center, rgba(212,168,67,0.07) 0%, transparent 65%)`,
            }}
          />
          <div className="relative text-center" style={{ padding: "clamp(3rem,8vw,6rem) 0" }}>
            <Eyebrow>Get instant access</Eyebrow>
            <H2>{product.title}</H2>
            <p className="mx-auto mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "48ch" }}>
              {product.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {COMING_SOON_SLUGS.has(product.slug) ? (
                <div className="inline-flex items-center justify-center border border-graphite px-10 py-5 font-body text-[0.85rem] font-light uppercase tracking-[0.2em] text-iron">
                  Coming Soon
                </div>
              ) : (
                <a
                  href={product.href}
                  data-gumroad-overlay-checkout="true"
                  className="inline-flex items-center justify-center px-10 py-5 font-body text-[0.85rem] font-bold uppercase tracking-[0.2em] text-void"
                  style={{ background: GOLD }}
                >
                  Buy Now — {product.price}
                </a>
              )}
              <ArrowLink href="/scripture">See full collection</ArrowLink>
            </div>
            <p className="mt-6 font-body text-xs font-light text-iron">
              {COMING_SOON_SLUGS.has(product.slug)
                ? "Gumroad listing coming soon · PDF format · No subscription required"
                : "Secure checkout via Gumroad · Instant PDF delivery · No subscription required"}
            </p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={13} />

      {/* ── OTHER PRODUCTS ── */}
      <RevealSection bg="void">
        <Eyebrow>Also in the collection</Eyebrow>
        <H2>
          More from<br />
          <span style={{ color: GOLD }}>Scripture &amp; Strategy.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {otherProducts.map((p) => (
            <Link
              key={p.slug}
              href={`/scripture/${p.slug}`}
              className="group relative flex flex-col bg-obsidian p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-carbon"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-40"
                style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
              />
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-iron">{p.tag}</p>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{p.title}</h3>
              <p className="mt-2 font-display text-3xl" style={{ color: GOLD }}>{p.price}</p>
              <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">{p.desc}</p>
              <span
                className="mt-6 font-body text-xs font-bold uppercase tracking-[0.2em] transition-colors"
                style={{ color: `${GOLD}66` }}
              >
                View product →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/scripture"
            className="btn-primary inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
            style={{ background: GOLD, borderColor: GOLD }}
          >
            See the Full Collection
          </Link>
          <BtnGhost href="/shop">Back to the Main Shop</BtnGhost>
        </div>
      </RevealSection>
    </>
  );
}
