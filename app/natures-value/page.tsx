import type { Metadata } from "next";
import Link from "next/link";
import { BtnGhost, BtnPrimary } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Growth Strategy Preview for Nature's Value",
  description:
    "A preview of how MK Parrish would triple Amazon ROI for a supplement manufacturer: cutting wasted spend, raising conversion, and turning Dr. Michael Murray's authority into Amazon sales and repeat customers.",
  alternates: { canonical: "/natures-value" },
  robots: { index: false, follow: false, nocache: true },
};

const insight = [
  {
    stat: "30+",
    label: "Books by Dr. Murray",
    desc: "Including the Encyclopedia of Natural Medicine. The authority is already there; the job is putting it where people buy.",
  },
  {
    stat: "1",
    label: "Face people trust",
    desc: "A doctor people can see and hear beats any label claim. Every channel should lead back to him.",
  },
  {
    stat: "3",
    label: "Places people buy",
    desc: "Retail shelf, Amazon, and direct. Each needs its own message and one shared way to measure it.",
  },
];

const pillars = [
  {
    n: "01",
    title: "Ask the Doctor",
    desc: "Short reels answering the questions people already search: magnesium forms, what to take with food, what changes after 50. One question, one answer, one product with a reason to buy it.",
  },
  {
    n: "02",
    title: "Read the Label With Me",
    desc: "Dr. Murray explains what goes into a capsule and why: dose, form, sourcing, testing. It builds trust in the brand and in the plant that makes it, which no competitor can copy.",
  },
  {
    n: "03",
    title: "The Longevity Matrix, Made Daily",
    desc: "His book turned into a 30-day routine series, with a free download that collects emails and sends people straight to the right products.",
  },
  {
    n: "04",
    title: "Made on Long Island",
    desc: "Behind-the-scenes content from Coram: quality control, the lab, the people. Manufacturing becomes a story, and a selling point retailers can repeat.",
  },
];

const amazonMath = [
  { stat: "$0.15", label: "Amazon return per $1", desc: "For every dollar Amazon costs today, about 15 cents comes back. The channel loses 85 cents on the dollar." },
  { stat: "$20", label: "Other retailers per $1", desc: "The same products return $20 per dollar elsewhere, so the products sell. The problem is how Amazon is run, not what's on it." },
  { stat: "3×", label: "90-day target", desc: "Lift Amazon to $0.45+ per dollar by cutting waste first, then fixing conversion. After that, release budget only as each milestone is hit." },
];

const diagnosis = [
  {
    title: "Ad spend with no exit",
    desc: "Broad and auto campaigns bid on searches that never convert, and branded searches people would have clicked anyway get paid for twice. This is usually the largest single leak.",
  },
  {
    title: "ASINs that lose money after fees",
    desc: "Low-price bottles often go negative once referral fees, FBA fulfillment, storage, returns and ads are counted. Without a P&L for each ASIN, spend keeps flowing to products that can't earn it back.",
  },
  {
    title: "Listings that don't convert",
    desc: "Thin images, generic copy and no brand content mean paid clicks land on a page that doesn't close. Low conversion makes every other cost look worse.",
  },
  {
    title: "Losing the Buy Box",
    desc: "Unauthorized resellers and price undercutting take the sale, the review momentum and the customer data. The brand pays for the traffic and someone else rings it up.",
  },
  {
    title: "One-time buyers",
    desc: "Supplements are bought again every 30 to 90 days. Without Subscribe & Save and follow-up offers, the brand pays again to win the same customer every month.",
  },
];

const budget = [
  { pct: 30, label: "Sponsored Products: exact match & high intent", note: "Proven keywords and defense of branded searches. Funded first because it converts best." },
  { pct: 15, label: "Listings & creative", note: "A+ Premium content, Brand Store, main images, Dr. Murray product videos. Every ad dollar works harder after this." },
  { pct: 15, label: "Sponsored Brands & Brand Video", note: "Dr. Murray on screen in search results, aimed at category searches the brand doesn't own yet." },
  { pct: 10, label: "Retention & repeat purchase", note: "Subscribe & Save discounts, Brand Tailored Promotions, and reorder reminders to recent buyers." },
  { pct: 10, label: "Retargeting & Sponsored Display", note: "Bring back shoppers who viewed but didn't buy, and defend product pages from competitor ads." },
  { pct: 10, label: "Brand protection & catalog health", note: "Brand Registry, MAP enforcement, removing unauthorized sellers, and keeping listings accurate and compliant." },
  { pct: 10, label: "Gated growth reserve", note: "Released month by month, only after the efficiency milestones below are met." },
];

const unitMath = [
  { step: "Today", spend: "$100K", back: "$15K", roi: "$0.15", note: "Illustrative: every $100K in Amazon spend returns about $15K." },
  { step: "Cut the waste", spend: "$60K", back: "$14K", roi: "$0.23", note: "Pause the 40% of spend on searches and ASINs that return almost nothing. Returns barely drop and efficiency rises more than 50%." },
  { step: "Fix conversion & price", spend: "$60K", back: "$27K", roi: "$0.45", note: "Better listings raise conversion; bundles lift order value above fee thresholds; winning back the Buy Box keeps the sale." },
  { step: "Add repeat buyers", spend: "$60K", back: "$33K+", roi: "$0.55+", note: "Subscribe & Save turns one sale into several, with no new ad cost." },
];

const plan = [
  {
    phase: "Days 1–30",
    title: "Stop the bleed",
    items: [
      "Build a P&L for every ASIN: price minus cost of goods, referral fees, FBA fees, storage, returns and ad spend",
      "Pause or cut bids on every keyword, campaign and ASIN that can't break even; add negative keywords and split branded from non-branded spend",
      "Move proven searches from auto and broad campaigns into exact-match campaigns with set bids",
      "Enforce Brand Registry and MAP; file removals for unauthorized sellers to win back the Buy Box",
      "Rewrite the top 10 revenue listings: title, bullets, main image and backend keywords, with claims checked against DSHEA and FTC rules",
    ],
  },
  {
    phase: "Days 31–60",
    title: "Rebuild to convert",
    items: [
      "Launch A+ Premium content, a Brand Store and short product videos featuring Dr. Murray on the top ASINs",
      "Bundle low-price SKUs into multipacks and routines to raise order value above FBA fee thresholds",
      "Turn on Subscribe & Save for repeat-purchase products and use Amazon Vine to build reviews on new or under-reviewed items",
      "Track Instagram-to-Amazon traffic with Amazon Attribution links to earn the Brand Referral Bonus on outside traffic",
      "Use Brand Analytics and Search Query Performance data to find the searches where the brand is shown but not chosen",
    ],
  },
  {
    phase: "Days 61–90",
    title: "Scale with gates",
    items: [
      "Release the growth reserve into Sponsored Brands Video and retargeting only for ASINs above their break-even return",
      "Run Brand Tailored Promotions for lapsed and repeat buyers, and prepare deal calendars for Prime Big Deal Days and the holidays",
      "Share Amazon search and review insights with retail and product teams so the whole company sells smarter",
      "Report Amazon ROI against the $0.45 target, show the ASIN P&L by tier, and set the next quarter's budget by return",
    ],
  },
];

const kpis = [
  ["ROI per $1", "Amazon net contribution ÷ total Amazon spend. Target: $0.15 → $0.45+ in 90 days"],
  ["TACoS", "Ad spend as a share of total Amazon sales, paid plus organic. It should fall as organic rank rises"],
  ["ASIN contribution margin", "Profit per product after every Amazon fee, sorted into grow, fix or cut"],
  ["Conversion rate", "Orders per session on the top 20 ASINs, before and after listing changes"],
  ["Buy Box share", "Share of sessions where the brand owns the sale, not a reseller"],
  ["Subscribe & Save base", "Active subscribers and their monthly recurring revenue"],
];

const fit = [
  {
    from: "Atlantic Ultraviolet · Hauppauge",
    to: "Ran national marketing for a Long Island manufacturer across distributor and dealer networks plus direct-to-consumer, 20 minutes from Coram.",
  },
  {
    from: "DEFY Media · Clevver & Smosh",
    to: "Grew a 150+ partner creator network to 80M+ monthly viewers. I know how to turn one trusted face into a channel people return to.",
  },
  {
    from: "Take-Two · National retail",
    to: "Led retail channel marketing supporting $20M+ in product revenue: in-store, trade, and launch campaigns that moved product off shelves.",
  },
  {
    from: "Ericsson · Partner programs",
    to: "Scaled partner marketing to $200M+ in influenced revenue with co-marketing kits partners could run without hand-holding.",
  },
];

export default function NaturesValuePage() {
  return (
    <div className="min-h-screen bg-void">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 pt-6">
        <Link href="/" className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-pearl">
          ← MK Parrish
        </Link>
        <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-pearl/70">
          Prepared for Nature&apos;s Value
        </span>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 md:pt-24">
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-petal">Growth strategy preview</p>
        <h1
          className="mt-4 font-display uppercase text-pearl"
          style={{ fontSize: "clamp(3.2rem, 11vw, 7.5rem)", lineHeight: 0.88 }}
        >
          Triple <span className="text-petal">Amazon ROI</span>. Grow the whole brand.
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-xl italic text-smoke md:text-2xl">
          How I would turn Amazon from Nature&apos;s Value&apos;s weakest channel into its biggest, and use @dr.michaelmurray&apos;s authority to do it.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <BtnPrimary href="/resumes/natures-value/mk-parrish-resume-natures-value-signature.pdf">Resume · Signature</BtnPrimary>
          <BtnGhost href="/resumes/natures-value/mk-parrish-resume-natures-value-classic.pdf">Resume · Classic</BtnGhost>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">The Amazon math</p>
        <div className="mt-6 grid gap-px bg-graphite md:grid-cols-3">
          {amazonMath.map((m) => (
            <div key={m.label} className="bg-obsidian p-7">
              <p className="font-display text-6xl text-petal">{m.stat}</p>
              <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{m.label}</h2>
              <p className="mt-3 font-body text-sm font-light leading-6 text-smoke">{m.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl font-body text-[0.95rem] font-light leading-7 text-smoke">
          Amazon should get the largest share of the budget, because it&apos;s where supplement shoppers search, compare and come back to
          reorder. But a bigger budget only pays off once the channel stops losing money. So the plan runs in three steps: stop the bleed,
          rebuild the listings to convert, then scale only what has proven it earns its keep.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="font-serif text-3xl italic text-pearl md:text-4xl" style={{ fontWeight: 700, lineHeight: 1.15 }}>
          Where the money is going.
        </h2>
        <p className="mt-3 max-w-3xl font-body text-[0.95rem] font-light leading-7 text-smoke">
          A $0.15 return next to $20 at other retailers rarely comes from one cause. These five leaks are the usual ones, and my first 30 days
          would confirm which are costing the most.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {diagnosis.map((d, i) => (
            <div key={d.title} className="border-t border-graphite pt-6">
              <p className="font-mono text-xs text-petal">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{d.title}</h3>
              <p className="mt-3 font-body text-[0.95rem] font-light leading-7 text-smoke">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="font-serif text-3xl italic text-pearl md:text-4xl" style={{ fontWeight: 700, lineHeight: 1.15 }}>
          How I&apos;d split the Amazon budget.
        </h2>
        <p className="mt-3 max-w-3xl font-body text-[0.95rem] font-light leading-7 text-smoke">
          Amazon gets the largest share of the total marketing budget. Inside it, every dollar has a job and a milestone. Money moves monthly
          toward whatever returns the most and away from anything that doesn&apos;t.
        </p>
        <div className="mt-8 space-y-px bg-graphite">
          {budget.map((b) => (
            <div key={b.label} className="grid items-center gap-3 bg-obsidian p-5 md:grid-cols-[5rem_1fr_14rem] md:gap-6">
              <p className="font-display text-4xl text-petal">{b.pct}%</p>
              <div>
                <h3 className="font-display text-xl uppercase tracking-[0.02em] text-pearl">{b.label}</h3>
                <p className="mt-1 font-body text-sm font-light leading-6 text-smoke">{b.note}</p>
              </div>
              <div className="h-2 w-full bg-carbon" aria-hidden="true">
                <div className="h-2 bg-petal" style={{ width: `${(b.pct / 30) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="font-serif text-3xl italic text-pearl md:text-4xl" style={{ fontWeight: 700, lineHeight: 1.15 }}>
          How the return triples.
        </h2>
        <p className="mt-3 max-w-3xl font-body text-[0.95rem] font-light leading-7 text-smoke">
          Illustrative numbers for every $100K of current Amazon spend. The real figures come from the ASIN P&amp;L in the first 30 days.
        </p>
        <div className="mt-8 grid gap-px bg-graphite md:grid-cols-4">
          {unitMath.map((u) => (
            <div key={u.step} className="bg-obsidian p-6">
              <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-petal">{u.step}</p>
              <p className="mt-3 font-display text-5xl text-pearl">{u.roi}</p>
              <p className="mt-1 font-mono text-xs text-ash">
                {u.spend} spend → {u.back} back
              </p>
              <p className="mt-3 font-body text-sm font-light leading-6 text-smoke">{u.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl font-body text-[0.95rem] font-light leading-7 text-smoke">
          Tripling to $0.45 is the 90-day milestone, not the finish line. The $40K freed from waste goes back into Amazon only as each ASIN
          proves it can pay for itself. From there, the 12-month goal is a channel that earns more than it costs. The $20 other retailers
          return shows the products can get there.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">The opportunity</p>
        <div className="mt-6 grid gap-px bg-graphite md:grid-cols-3">
          {insight.map((i) => (
            <div key={i.label} className="bg-obsidian p-7">
              <p className="font-display text-6xl text-petal">{i.stat}</p>
              <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{i.label}</h2>
              <p className="mt-3 font-body text-sm font-light leading-6 text-smoke">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="font-serif text-3xl italic text-pearl md:text-4xl" style={{ fontWeight: 700, lineHeight: 1.15 }}>
          Four content pillars that feed Amazon.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.n} className="border-t border-graphite pt-6">
              <p className="font-mono text-xs text-petal">{p.n}</p>
              <h3 className="mt-2 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{p.title}</h3>
              <p className="mt-3 font-body text-[0.95rem] font-light leading-7 text-smoke">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">The funnel</p>
        <div className="mt-6 grid gap-px bg-graphite md:grid-cols-4">
          {[
            ["See", "Reels & creator collabs"],
            ["Trust", "Ask the Doctor & label deep-dives"],
            ["Try", "Amazon listing · Brand Store · shelf QR"],
            ["Stay", "Subscribe & Save · reorder promotions"],
          ].map(([k, v]) => (
            <div key={k} className="bg-obsidian p-6">
              <p className="font-display text-4xl uppercase text-pearl">{k}</p>
              <p className="mt-2 font-body text-sm font-light text-smoke">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="font-serif text-3xl italic text-pearl md:text-4xl" style={{ fontWeight: 700, lineHeight: 1.15 }}>
          My first 90 days on Amazon.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plan.map((p) => (
            <div key={p.phase} className="border border-graphite bg-obsidian p-6">
              <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-petal">{p.phase}</p>
              <h3 className="mt-2 font-display text-3xl uppercase text-pearl">{p.title}</h3>
              <ul className="mt-4 space-y-3">
                {p.items.map((item) => (
                  <li key={item} className="font-body text-sm font-light leading-6 text-smoke">
                    <span className="text-petal">— </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">What I&apos;d report every week</p>
        <div className="mt-6 grid gap-px bg-graphite md:grid-cols-3">
          {kpis.map(([k, v]) => (
            <div key={k} className="bg-obsidian p-6">
              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{k}</h3>
              <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">Why me</p>
        <div className="mt-6 divide-y divide-graphite border-y border-graphite">
          {fit.map((f) => (
            <div key={f.from} className="grid gap-2 py-6 md:grid-cols-[16rem_1fr] md:gap-8">
              <p className="font-display text-xl uppercase tracking-[0.03em] text-petal">{f.from}</p>
              <p className="font-body text-[0.95rem] font-light leading-7 text-smoke">{f.to}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 pt-12 text-center">
        <p className="font-serif text-2xl italic text-pearl md:text-3xl" style={{ fontWeight: 600 }}>
          Strategy is only worth something once it&apos;s in market.
        </p>
        <p className="mt-6 font-display text-4xl uppercase tracking-[0.04em] text-pearl">Mary Kate Parrish</p>
        <p className="mt-2 font-body text-sm text-smoke">
          <a href="mailto:mkp414@icloud.com" className="underline underline-offset-4 hover:text-petal">
            mkp414@icloud.com
          </a>
          {" · "}
          <a href="tel:+13478534238" className="underline underline-offset-4 hover:text-petal">
            (347) 853-4238
          </a>
          {" · "}
          <a href="https://linkedin.com/in/mkparrish" className="underline underline-offset-4 hover:text-petal">
            linkedin.com/in/mkparrish
          </a>
        </p>
      </section>
    </div>
  );
}
