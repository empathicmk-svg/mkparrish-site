import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EBOOKS, SERVICE_EBOOKS, SUBSTACK_URL, MARGINS_TIERS, COMING_SOON_SLUGS } from "@/app/lib/config";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2, H3Script,
  BtnPrimary, BtnGhost, ArrowLink,
} from "@/app/components/ui";

const ALL_SHOP_EBOOKS = [...EBOOKS, ...SERVICE_EBOOKS] as const;

export function generateStaticParams() {
  return ALL_SHOP_EBOOKS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = ALL_SHOP_EBOOKS.find((e) => e.slug === slug);
  if (!product) return {};
  return {
    title: `${product.title} — MK Parrish`,
    description: `${product.subtitle} ${product.desc}`,
  };
}

const extraContent: Record<string, { about: string[]; forWho: string[]; pullQuote: string }> = {
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
  "the-edit-guide": {
    about: [
      "The Edit is MK Parrish's most-requested service: a fast, precise copy fix that tightens, aligns, and elevates without losing your voice. This guide translates that process into a framework you can run on any piece of writing.",
      "Covers bios, LinkedIn copy, emails, website pages, and anything that represents you professionally. Includes the exact audit questions used on every client project and the word-level editing lens that catches the language dragging your work down.",
      "Not a grammar guide. Not a style manual. A professional framework for the kind of editing that makes copy actually sound like you — just sharper.",
    ],
    forWho: [
      "You write your own copy but it never sounds as good as you want it to",
      "You've paid for a copy edit before and couldn't tell what changed",
      "Your bio, LinkedIn, or about page feels generic but you don't know why",
      "You want to edit your own work like a professional does",
      "You're a writer or strategist who edits client work and wants a repeatable framework",
    ],
    pullQuote: "The wrong words cost you. Quietly. Before you even know a decision was made.",
  },
  "before-the-session": {
    about: [
      "Most people show up to a strategy session without having done the thinking it requires. They wait for the conversation to extract it. This workbook does the extraction first — so the session can go deeper, faster.",
      "The exercises inside are the same prompts MK sends every new client before a power session. Identity audit, positioning clarity, the goal that's actually underneath the stated goal. Done in writing, before the call.",
      "For anyone booking a strategy session — with MK or with anyone — who wants to arrive with their thinking already organized instead of trying to do it out loud in real time.",
    ],
    forWho: [
      "You've booked a strategy session and want to make the most of it",
      "You know what you want to work on but can't articulate it clearly yet",
      "You need to do the pre-work before the conversation can go anywhere",
      "You're paying for an hour and you want every minute to count",
      "You want a framework for session prep you can use again and again",
    ],
    pullQuote: "She just wanted to begin.",
  },
  "the-rewrite-playbook": {
    about: [
      "The Rewrite service — the full LinkedIn and professional story overhaul — packaged into a self-guided process. Not a template you fill in. A framework you move through, with exercises, prompts, and real examples at every stage.",
      "Covers the four phases of a real rewrite: the story audit (what you've been saying and why it's not working), the identity excavation (who you actually are now versus who you're still presenting as), the positioning build (what makes you specific and irreplaceable), and the language layer (how to actually write it).",
      "Used by executives in transition, founders relaunching, and career-changers who needed to close the gap between how good their work actually is and how it sounds on paper.",
    ],
    forWho: [
      "Your LinkedIn is outdated and you keep putting off the rewrite",
      "Your professional story doesn't match who you've become",
      "You've had a pivot, a reinvention, or a major shift and can't explain it yet",
      "People underestimate you because your copy undersells you",
      "You want to do the full rewrite without hiring someone to do it for you",
    ],
    pullQuote: "She is not who she used to be, and that is not a loss.",
  },
  "the-new-chapter-workbook": {
    about: [
      "The New Chapter is the full reset — brand, positioning, website, voice, all of it rebuilt from the ground up. This workbook documents that process so you can run it without a team.",
      "Moves through the full brand repositioning arc: where you are, where you're going, what the gap is, and how to close it in words. Page-by-page website copy architecture. Voice and messaging frameworks. The full launch copy checklist for every surface that needs words.",
      "For the founder, coach, or creative who knows their current brand no longer fits and is ready to do the disciplined work of rebuilding it — not just the aesthetics, but the actual story.",
    ],
    forWho: [
      "Your brand was built for who you were, not who you are now",
      "You're relaunching a website and need to know what every page should say",
      "Your positioning is unclear and your copy reflects that",
      "You've outgrown your old story and need a framework to build the new one",
      "You want to reposition yourself without hiring a full brand agency",
    ],
    pullQuote: "I did not confuse being chosen with being loved.",
  },
  "the-byline-method": {
    about: [
      "For five years, the question clients ask most often is: how do you sound like me? This guide is the answer. The voice capture methodology — the interview questions, the tone calibration, the writing-in-voice process — documented for the first time.",
      "Covers the full ghostwriting arc from capture to output: how to conduct a voice interview, how to read the transcript for voice cues, how to calibrate tone across different formats, and how to maintain consistency across an ongoing content relationship.",
      "For writers who ghostwrite, content strategists who write for founders, and principals who want to understand what voice capture actually looks like before they hand someone their brand.",
    ],
    forWho: [
      "You ghostwrite for clients and want a more systematic approach to voice capture",
      "You're a founder who writes for your own brand and wants to brief contractors precisely",
      "You've hired writers before and the output never sounded like you",
      "You want to build a repeatable ghostwriting process you can charge more for",
      "You're a content lead responsible for a brand voice you didn't build",
    ],
    pullQuote: "The wrong words cost you. Quietly. Before you even know a decision was made.",
  },
  "the-build-copy-guide": {
    about: [
      "The Build service produces a full website — design and copy together. This guide isolates the copy side: every page, every section, every word, in a framework you can apply yourself or hand to a designer with clear direction.",
      "Covers the full website copy architecture: what the homepage actually has to do (it is not a brochure), how the about page earns trust without being a biography, how services pages convert without pressure tactics, and how the contact page closes without begging.",
      "For founders building their first real website, for teams relaunching and needing strategic copy direction, and for anyone who wants every word on their site to do work.",
    ],
    forWho: [
      "You're building a website and don't know what each page is supposed to say",
      "Your current site has words but no strategy behind them",
      "You've hired designers before but didn't know how to brief the copy",
      "You want to write your own website copy with a professional framework",
      "You're launching something new and want it to start strong",
    ],
    pullQuote: "She just wanted to begin.",
  },
  "the-services-vault": {
    about: [
      "Every consulting service MK offers has a methodology. The Services Vault is all of it — documented, packaged, and sequenced as a self-study library for the woman who is ready to do the full work herself.",
      "Six guides covering the complete consulting arc: editing, strategy sessions, full story rewrites, brand repositioning, ghostwriting, and website copy. Each one is a standalone framework. Together, they cover every dimension of how professional copy and brand strategy actually gets built.",
      "For the founder, writer, or strategist who wants the methodology — not just the output. Who wants to understand the framework well enough to run it herself or brief someone else to do it right.",
    ],
    forWho: [
      "You want the complete consulting toolkit without a retainer",
      "You're a writer or strategist who wants to level up your client process",
      "You're building your own brand and want a systematic approach to every layer",
      "You're early in your business and can't afford done-for-you but want done-right",
      "You want every methodology, every framework, every guide — in one library",
    ],
    pullQuote: "She is not who she used to be, and that is not a loss.",
  },
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = ALL_SHOP_EBOOKS.find((e) => e.slug === slug);
  if (!product) notFound();

  const extra = extraContent[product.slug] ?? {
    about: [product.desc],
    forWho: [...product.features],
    pullQuote: "",
  };

  const otherProducts = ALL_SHOP_EBOOKS.filter((e) => e.slug !== product.slug).slice(0, 3);

  // Free direct download vs paid checkout
  const dl = (product as { download?: string }).download;
  const isFree = Boolean((product as { free?: boolean }).free && dl);
  const stripe = (product as { stripe?: string }).stripe;
  const buyTarget = isFree ? (dl as string) : (stripe && stripe.length > 0 ? stripe : product.href);
  const buyLabel = isFree ? "Download Free" : "Buy Now";

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
                {COMING_SOON_SLUGS.has(product.slug) ? (
                  <div className="inline-flex items-center justify-center border border-graphite px-8 py-4 font-body text-[0.8rem] font-light uppercase tracking-[0.2em] text-iron">
                    Coming Soon
                  </div>
                ) : (
                  <a
                    href={buyTarget}
                    download={isFree ? "" : undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
                  >
                    {buyLabel}{isFree ? " →" : ` — ${product.price}`}
                  </a>
                )}
                <span className="font-body text-xs font-light text-iron">
                  {COMING_SOON_SLUGS.has(product.slug)
                    ? "Coming soon"
                    : isFree
                    ? "Free instant download · No signup"
                    : "Instant download · Secure checkout"}
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
                {COMING_SOON_SLUGS.has(product.slug) ? (
                  <div className="flex w-full items-center justify-center border border-graphite py-4 font-body text-[0.8rem] font-light uppercase tracking-[0.2em] text-iron">
                    Coming Soon
                  </div>
                ) : (
                  <a
                    href={buyTarget}
                    download={isFree ? "" : undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary flex w-full items-center justify-center py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
                  >
                    {buyLabel}{isFree ? " →" : ` — ${product.price}`}
                  </a>
                )}
                <p className="text-center font-body text-[0.65rem] font-light text-iron">
                  {COMING_SOON_SLUGS.has(product.slug)
                    ? "Coming soon"
                    : isFree
                    ? "Free · PDF format · No subscription"
                    : "PDF format · Secure checkout · No subscription"}
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
              {COMING_SOON_SLUGS.has(product.slug) ? (
                <div className="inline-flex items-center justify-center border border-graphite px-7 py-4 font-body text-[0.8rem] font-light uppercase tracking-[0.2em] text-iron">
                  Coming Soon
                </div>
              ) : (
                <a
                  href={buyTarget}
                  download={isFree ? "" : undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
                >
                  {isFree ? "Download Free →" : `Get It — ${product.price}`}
                </a>
              )}
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
              {COMING_SOON_SLUGS.has(product.slug) ? (
                <div className="inline-flex items-center justify-center border border-graphite px-10 py-5 font-body text-[0.85rem] font-light uppercase tracking-[0.2em] text-iron">
                  Coming Soon
                </div>
              ) : (
                <a
                  href={buyTarget}
                  download={isFree ? "" : undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center justify-center px-10 py-5 font-body text-[0.85rem] font-bold uppercase tracking-[0.2em] text-void"
                >
                  {buyLabel}{isFree ? " →" : ` — ${product.price}`}
                </a>
              )}
              <ArrowLink href="/shelf">Browse The Shelf</ArrowLink>
            </div>
            <p className="mt-6 font-body text-xs font-light text-iron">
              {COMING_SOON_SLUGS.has(product.slug)
                ? "Coming soon · PDF format · No subscription required"
                : isFree
                ? "Free · Instant download · No subscription required"
                : "Secure checkout · Instant delivery · No subscription required"}
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
              Weekly essays, raw memoir, strategy notes, and the writing that is too honest for a public feed. Free to start — paid from $9/month. Cancel anytime.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href={SUBSTACK_URL}>Join The Margins</BtnPrimary>
              <ArrowLink href="/margins">Learn more</ArrowLink>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-px">
            {MARGINS_TIERS.map((t) => (
              <div key={t.name} className={`relative p-6 ${t.highlight ? "bg-carbon" : "bg-void"}`}>
                {t.highlight && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-lg uppercase tracking-[0.02em] text-pearl">{t.name}</p>
                  <p className={`font-display text-xl ${t.highlight ? "text-petal" : "text-white"}`}>{t.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>
    </>
  );
}
