import type { Metadata } from "next";
import Link from "next/link";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2, H3Script,
  BtnPrimary, BtnGhost, ArrowLink,
} from "@/app/components/ui";
import { SCRIPTURE_EBOOKS, PATREON_URL, COMING_SOON_SLUGS } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Scripture & Strategy — MK Parrish",
  description:
    "A Bible study ebook brand for women ready to destigmatize their faith practice and make it monetizable. Five guides covering everything from building your first study habit to launching a paid Bible study community.",
};

// Gold accent for Scripture & Strategy brand differentiation
const GOLD = "#D4A843";
const GOLD_DIM = "rgba(212, 168, 67, 0.12)";
const GOLD_LINE = "rgba(212, 168, 67, 0.35)";

export default function ScripturePage() {
  const featured = SCRIPTURE_EBOOKS.find((e) => e.highlight) ?? SCRIPTURE_EBOOKS[0];
  const rest = SCRIPTURE_EBOOKS.filter((e) => !e.highlight);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[90vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 h-[70vh] w-[80vw] -translate-x-1/2"
            style={{
              background: `radial-gradient(ellipse at top, rgba(212,168,67,0.11) 0%, transparent 65%)`,
            }}
          />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div
            className="mb-6 inline-flex items-center gap-3 border px-4 py-2"
            style={{ borderColor: GOLD_LINE }}
          >
            <span className="h-1 w-1" style={{ background: GOLD }} />
            <span className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
              A Separate Brand by MK Parrish
            </span>
          </div>
          <Eyebrow>Scripture &amp; Strategy</Eyebrow>
          <div className="mt-4">
            <H1>
              Bible Study,{" "}
              <span style={{ color: GOLD }}>Destigmatized.</span>
            </H1>
          </div>
          <p className="mt-6 font-serif text-xl italic md:text-2xl" style={{ fontWeight: 500, color: `${GOLD}cc` }}>
            Your faith practice. Your income. On your terms.
          </p>
          <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
            Bible study does not have to look like what you grew up with. It does not require a church, a curriculum,
            or someone's permission. And it does not have to be free. Scripture &amp; Strategy is a series of five
            ebooks for women who want to study Scripture on their own terms — and build something sustainable around it.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              "No church required",
              "No guilt required",
              "Income without compromise",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-1 w-1" style={{ background: GOLD }} />
                <span className="font-body text-xs font-light text-smoke">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#collection"
              className="btn-primary inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
              style={{ background: GOLD, borderColor: GOLD }}
            >
              See the Collection
            </a>
            <BtnGhost href="/shop">Back to the Main Shop</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── BRAND STATEMENT ── */}
      <RevealSection bg="obsidian">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>The Brand</Eyebrow>
            <H2>
              What Scripture &amp;{" "}
              <span style={{ color: GOLD }}>Strategy</span>{" "}
              is.
            </H2>
            <div className="mt-4 border-l-2 pl-8" style={{ borderColor: GOLD_LINE }}>
              <p className="font-serif text-xl italic text-pearl" style={{ fontWeight: 600, lineHeight: 1.75 }}>
                &ldquo;Bible study should belong to you — not just to the institution.&rdquo;
              </p>
              <p className="mt-4 font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ash">
                — MK Parrish
              </p>
            </div>
          </div>
          <div className="space-y-6 font-body text-base font-light leading-8 text-smoke">
            <p>
              Scripture &amp; Strategy starts with a simple belief: that personal Bible study is a powerful,
              deeply personal practice — and it has been unnecessarily wrapped in gatekeeping, guilt, and
              institutional language that keeps a lot of thoughtful women away from it.
            </p>
            <p>
              These guides strip that away. They give you practical methods for studying Scripture without
              a seminary background, a church attendance record, or anyone&apos;s blessing. And then they
              go further — into how to turn that practice into teachable content, a brand, a community,
              and an income stream that reflects your actual calling.
            </p>
            <p>
              This is not prosperity gospel. It is not performative faith. It is strategic, grounded,
              and designed for the woman who takes both her spirituality and her ambition seriously.
            </p>
          </div>
        </div>
      </RevealSection>

      <div
        className="bg-obsidian"
        style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}
      >
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div className="relative border-l-2 pl-6 md:pl-10" style={{ borderColor: GOLD_LINE }}>
            <blockquote className="font-serif text-xl italic leading-relaxed text-smoke md:text-2xl" style={{ fontWeight: 600 }}>
              Faith without strategy is hope. Strategy without faith is hustle. You need both.
            </blockquote>
            <p className="mt-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.3em] text-ash">
              Scripture &amp; Strategy
            </p>
          </div>
        </div>
      </div>

      {/* ── TARGET MARKET ── */}
      <RevealSection bg="void">
        <Eyebrow>Who this is for</Eyebrow>
        <H2>
          This collection is{" "}
          <span style={{ color: GOLD }}>for you if —</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              num: "01",
              title: "You study in private",
              desc: "Your faith is real but personal. You have never been part of a church community or have outgrown the one you were raised in — and you study alone, quietly, unsure if that counts.",
            },
            {
              num: "02",
              title: "You want to teach",
              desc: "You have insights from your study that other women need. You have been giving them away in group chats and coffee conversations and are ready to formalize, package, and charge for them.",
            },
            {
              num: "03",
              title: "You are building a faith-based business",
              desc: "You are a coach, creator, or consultant whose values are shaped by Scripture — and you want your brand to reflect that without feeling preachy, performative, or niche.",
            },
            {
              num: "04",
              title: "You left the church but kept the faith",
              desc: "Deconstruction does not mean you stopped believing. You left the institution. The practice stayed. These guides meet you exactly where you are.",
            },
            {
              num: "05",
              title: "You have been doing this for free",
              desc: "You lead a Bible study group. You send the notes. You do the research. Everyone benefits. You are the last to be paid — and these guides are how you change that.",
            },
            {
              num: "06",
              title: "You want to start from scratch",
              desc: "You have never had a consistent Bible study practice and you want one — without the guilt of being behind, the pressure to perform, or a curriculum someone else designed.",
            },
          ].map((item) => (
            <div key={item.num} className="bg-obsidian p-8">
              <p className="font-mono text-xs tracking-[0.2em]" style={{ color: `${GOLD}99` }}>{item.num}</p>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{item.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={5} />

      {/* ── THE COLLECTION ── */}
      <RevealSection bg="obsidian" id="collection">
        <Eyebrow>The Ebook Collection</Eyebrow>
        <H2>
          Five guides.{" "}
          <span style={{ color: GOLD }}>One library.</span>
        </H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "60ch" }}>
          Read in sequence or start where you are. Each guide is a standalone resource. Together they cover the full arc from first study practice to monetized ministry.
        </p>

        {/* Featured product */}
        <div
          className="relative mt-12 flex flex-col p-10 lg:flex-row lg:items-start lg:gap-12"
          style={{ background: "#1A1A1A", borderTop: `1px solid ${GOLD}` }}
        >
          <div
            className="absolute right-6 top-6 px-3 py-1.5 font-body text-[0.6rem] font-bold uppercase tracking-[0.25em]"
            style={{ background: GOLD_DIM, color: GOLD, border: `1px solid ${GOLD_LINE}` }}
          >
            Start Here
          </div>
          <div className="flex-1">
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-iron">{featured.tag}</p>
            <h3 className="mt-3 font-display text-5xl uppercase tracking-[0.02em] text-pearl leading-none">{featured.title}</h3>
            <p className="mt-3 font-serif text-xl italic" style={{ color: `${GOLD}cc`, fontWeight: 500 }}>
              {featured.subtitle}
            </p>
            <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
              {featured.desc}
            </p>
            <ul className="mt-6 space-y-3">
              {featured.features.map((f) => (
                <li key={f} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                  <span className="mt-2 h-1 w-1 flex-shrink-0" style={{ background: GOLD }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-col items-start gap-4 lg:mt-0 lg:w-64 lg:shrink-0">
            <p className="font-display text-6xl text-white">{featured.price}</p>
            <p className="font-body text-xs font-light text-iron">One-time purchase · Instant PDF</p>
            {COMING_SOON_SLUGS.has(featured.slug) ? (
              <div className="flex w-full items-center justify-center border border-graphite py-4 font-body text-[0.8rem] font-light uppercase tracking-[0.2em] text-iron">
                Coming Soon
              </div>
            ) : (
              <a
                href={featured.href}
                data-gumroad-overlay-checkout="true"
                className="flex w-full items-center justify-center py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
                style={{ background: GOLD }}
              >
                Buy Now — {featured.price}
              </a>
            )}
            <Link
              href={`/scripture/${featured.slug}`}
              className="flex w-full items-center justify-center py-2 font-body text-[0.65rem] font-light uppercase tracking-[0.15em] text-ash transition hover:text-pearl"
            >
              View details →
            </Link>
          </div>
        </div>

        {/* Rest of collection */}
        <div className="mt-px grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-3">
          {rest.filter((e) => e.slug !== "scripture-strategy-bundle").map((e) => (
            <div
              key={e.slug}
              className="relative flex flex-col bg-obsidian p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-carbon"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
              />
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-iron">{e.tag}</p>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-pearl leading-tight">{e.title}</h3>
              <p className="mt-2 font-display text-4xl text-white">{e.price}</p>
              <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">{e.desc}</p>
              <ul className="mt-5 space-y-2">
                {e.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex gap-3 font-body text-xs font-light leading-6 text-iron">
                    <span className="mt-2 h-1 w-1 flex-shrink-0" style={{ background: GOLD }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-2">
                {COMING_SOON_SLUGS.has(e.slug) ? (
                  <div className="flex w-full items-center justify-center border border-graphite py-4 font-body text-[0.75rem] font-light uppercase tracking-[0.2em] text-iron">
                    Coming Soon
                  </div>
                ) : (
                  <a
                    href={e.href}
                    data-gumroad-overlay-checkout="true"
                    className="flex w-full items-center justify-center py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-void transition-opacity hover:opacity-90"
                    style={{ background: GOLD }}
                  >
                    Buy Now — {e.price}
                  </a>
                )}
                <Link
                  href={`/scripture/${e.slug}`}
                  className="flex w-full items-center justify-center py-2 font-body text-[0.65rem] font-light uppercase tracking-[0.15em] text-ash transition hover:text-pearl"
                >
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bundle */}
        {SCRIPTURE_EBOOKS.filter((e) => e.slug === "scripture-strategy-bundle").map((bundle) => (
          <div
            key={bundle.slug}
            className="relative mt-px flex flex-col p-8 md:flex-row md:items-center md:gap-12"
            style={{ background: "#111111", border: `1px solid ${GOLD_LINE}` }}
          >
            <div className="flex-1">
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
                {bundle.tag}
              </p>
              <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{bundle.title}</h3>
              <p className="mt-2 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "56ch" }}>
                {bundle.desc}
              </p>
              <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {bundle.features.map((f) => (
                  <li key={f} className="flex gap-3 font-body text-xs font-light leading-6 text-iron">
                    <span className="mt-2 h-1 w-1 flex-shrink-0" style={{ background: GOLD }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-col items-start gap-3 md:mt-0 md:w-56 md:shrink-0">
              <p className="font-display text-5xl text-white">{bundle.price}</p>
              <p className="font-body text-xs font-light text-iron">All 5 guides · One price · Instant access</p>
              {COMING_SOON_SLUGS.has(bundle.slug) ? (
                <div className="flex w-full items-center justify-center border border-graphite py-4 font-body text-[0.75rem] font-light uppercase tracking-[0.2em] text-iron">
                  Coming Soon
                </div>
              ) : (
                <a
                  href={bundle.href}
                  data-gumroad-overlay-checkout="true"
                  className="flex w-full items-center justify-center py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-void"
                  style={{ background: GOLD }}
                >
                  Get the Bundle — {bundle.price}
                </a>
              )}
            </div>
          </div>
        ))}
      </RevealSection>

      <QuoteDivider index={9} />

      {/* ── HOW TO USE THE COLLECTION ── */}
      <RevealSection bg="void">
        <Eyebrow>The Sequence</Eyebrow>
        <H2>
          Where to{" "}
          <span style={{ color: GOLD }}>start.</span>
        </H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "56ch" }}>
          Each guide is self-contained. But they were designed to build on each other. Here is the sequence that makes the most sense.
        </p>
        <div className="mt-12 space-y-px bg-graphite">
          {[
            {
              step: "01",
              title: "Start with The Study",
              price: "$18",
              desc: "If you have never had a consistent Bible study practice — or if the one you had no longer fits — begin here. Five methods, zero gatekeeping. Build the habit before you build the business.",
            },
            {
              step: "02",
              title: "Then: Gospel & Grind",
              price: "$28",
              desc: "Once your practice is grounded, start building the business case. How do faith and income coexist? How do you position yourself as a faith entrepreneur without feeling like you're selling something sacred?",
            },
            {
              step: "03",
              title: "Then: The Sermon Notes",
              price: "$25",
              desc: "Your private study becomes public content. This is where one passage becomes a month of material across email, social, and digital products. The content engine starts here.",
            },
            {
              step: "04",
              title: "Then: The Calling Card",
              price: "$35",
              desc: "Now you need a brand voice that reflects your faith and converts. Not preachy. Not vague. Precise, aligned, and built to reach the audience that is already looking for what you do.",
            },
            {
              step: "05",
              title: "Then: Ministry, Monetized",
              price: "$42",
              desc: "The final step: launch, price, and grow a Bible study community people actually pay for. Membership frameworks, launch copy, pricing strategy — all of it, start to finish.",
            },
          ].map((step) => (
            <div key={step.step} className="flex gap-8 bg-obsidian p-8">
              <p className="mt-1 font-mono text-xs tracking-[0.2em] shrink-0" style={{ color: `${GOLD}80` }}>
                {step.step}
              </p>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-4">
                  <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{step.title}</h3>
                  <p className="font-display text-xl" style={{ color: GOLD }}>{step.price}</p>
                </div>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#collection"
            className="btn-primary inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
            style={{ background: GOLD, borderColor: GOLD }}
          >
            Shop the Collection
          </a>
          <BtnGhost href="/shop">Back to the Main Shop</BtnGhost>
        </div>
      </RevealSection>

      {/* ── HOW TO BUY ── */}
      <RevealSection bg="obsidian">
        <Eyebrow>How to buy</Eyebrow>
        <H2>Simple.<br /><span style={{ color: GOLD }}>Secure. Instant.</span></H2>
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
              desc: "Pay by card or PayPal. Gumroad uses Stripe — bank-level security, zero storage of your card data.",
            },
            {
              num: "03",
              title: "Download Instantly",
              desc: "Your PDF downloads immediately and is emailed to you. No account required. Access it anytime.",
            },
          ].map((step) => (
            <div key={step.num} className="bg-obsidian p-8">
              <p className="font-mono text-xs tracking-[0.2em]" style={{ color: `${GOLD}66` }}>{step.num}</p>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{step.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{step.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>
    </>
  );
}
