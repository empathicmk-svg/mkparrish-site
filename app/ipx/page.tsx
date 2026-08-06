import type { Metadata } from "next";
import {
  RevealSection,
  QuoteDivider,
  Eyebrow,
  H1,
  H2,
  H3Script,
  BtnPrimary,
  BtnGhost,
  Marquee,
} from "@/app/components/ui";
import { BOOK_CALL_URL, CONTACT } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "IPX Launch — Digital Media Plan",
  description:
    "A one-page digital media plan for a hypothetical IPX awareness campaign: a $120K, 12-week launch flight across paid social, paid search, and one influencer partnership — with channel allocation, KPIs, flighting, and reasoning. A work sample by MK Parrish.",
  alternates: { canonical: "/ipx" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "IPX Launch — Digital Media Plan (Work Sample)",
    description:
      "A $120K, 12-week awareness flight across paid social, search, and one influencer partnership. Channel allocation, KPIs, flighting, and the reasoning behind each call.",
    url: "https://www.mkparrish.com/ipx",
  },
};

// ── Top-line numbers ──────────────────────────────────────────────────────────
const TOPLINE = [
  { k: "$120K", v: "Working media" },
  { k: "12 wks", v: "Launch flight" },
  { k: "3+1", v: "Channels + reserve" },
  { k: "~1.3M", v: "In-target reach" },
];

// ── Assumptions ───────────────────────────────────────────────────────────────
const ASSUMPTIONS = [
  {
    t: "The product",
    d: "IPX — a new secure dealmaking / collaboration platform from ideals. Early-stage: strong category, near-zero brand recognition outside the existing customer base.",
  },
  {
    t: "Who we're reaching",
    d: "M&A advisors, corporate development, PE/VC, and finance & legal deal teams at mid-market and enterprise firms. North America primary; UK & DACH secondary.",
  },
  {
    t: "The objective",
    d: "Awareness first — plant IPX in the consideration set of a narrow, high-value ICP — and seed a warm pipeline of waitlist and demo signups to hand to sales.",
  },
  {
    t: "The constraint",
    d: "A premium B2B audience is expensive to reach. This plan optimizes for qualified reach and brand lift, not vanity impressions. Precision beats volume at this stage.",
  },
];

// ── Allocation ────────────────────────────────────────────────────────────────
const ALLOCATION = [
  {
    channel: "LinkedIn",
    group: "Paid social",
    budget: 36000,
    pct: 30,
    role: "Primary ICP reach + thought-leadership. Job-title, seniority, and industry targeting no other channel matches.",
    color: "var(--color-petal)",
  },
  {
    channel: "Meta",
    group: "Paid social",
    budget: 18000,
    pct: 15,
    role: "Efficient retargeting of site + video engagers, plus lookalikes off signups. Cheap frequency where LinkedIn is dear.",
    color: "var(--color-rose)",
  },
  {
    channel: "Google Search",
    group: "Paid search",
    budget: 30000,
    pct: 25,
    role: "Capture existing category intent, defend the IPX brand term, and conquest competitor searches.",
    color: "var(--color-carmine)",
  },
  {
    channel: "Microsoft Ads",
    group: "Paid search",
    budget: 6000,
    pct: 5,
    role: "The finance/legal desktop audience over-indexes on Edge/Bing at lower CPCs. Small spend, disproportionate quality.",
    color: "var(--color-lipstick)",
  },
  {
    channel: "Influencer partnership",
    group: "Trusted voice",
    budget: 18000,
    pct: 15,
    role: "One deep partnership with a category-native voice to borrow trust an unknown brand can't buy with ad impressions.",
    color: "var(--color-blush)",
  },
  {
    channel: "Test & measurement reserve",
    group: "Reserve",
    budget: 12000,
    pct: 10,
    role: "Brand-lift study, creative iteration, and contingency to move budget to whatever is working by week 4.",
    color: "var(--color-iron)",
  },
];

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

// ── KPI tiers ─────────────────────────────────────────────────────────────────
const KPI_TIERS = [
  {
    tier: "North star — awareness",
    accent: true,
    items: [
      { m: "In-target reach", g: "~1.3M unique in-ICP" },
      { m: "Aided awareness lift", g: "+8–10 pts (exposed vs. control)" },
      { m: "Qualified frequency", g: "3–5× over the flight" },
    ],
  },
  {
    tier: "Efficiency",
    accent: false,
    items: [
      { m: "Blended CPM", g: "≤ $18" },
      { m: "Social CTR", g: "≥ 0.7%" },
      { m: "Search impression share", g: "≥ 55% on priority terms" },
    ],
  },
  {
    tier: "Engagement",
    accent: false,
    items: [
      { m: "Video 25% completion", g: "≥ 30%" },
      { m: "LinkedIn engagement rate", g: "≥ 4%" },
      { m: "Landing-page bounce", g: "≤ 45%" },
    ],
  },
  {
    tier: "Pipeline signal",
    accent: true,
    items: [
      { m: "Waitlist / content signups", g: "~1,800" },
      { m: "Demo / sales-qualified leads", g: "~220" },
      { m: "Cost per demo", g: "≤ $550" },
    ],
  },
];

// ── Flighting ─────────────────────────────────────────────────────────────────
const PHASES = [
  {
    num: "01",
    weeks: "Weeks 1–4",
    name: "Teach the category",
    body: "Broad thought-leadership on LinkedIn, category search terms live, and the influencer launch series. Establish the problem IPX solves before we ever ask for a demo.",
    channels: ["LinkedIn awareness", "Google category terms", "Influencer part 1"],
  },
  {
    num: "02",
    weeks: "Weeks 5–8",
    name: "Build consideration",
    body: "Retargeting switches on. Case-for-IPX creative, comparison and proof assets, brand-defense search, and the influencer's live webinar / podcast deep-dive.",
    channels: ["Meta retargeting", "Brand-defense search", "Influencer webinar"],
  },
  {
    num: "03",
    weeks: "Weeks 9–12",
    name: "Convert warm demand",
    body: "Demo-led creative, lookalikes built from signups, competitor conquesting, and scale into the winners. Brand-lift study reads out to close the loop.",
    channels: ["Lookalikes", "Conquesting", "Brand-lift readout"],
  },
];

// ── Measurement ───────────────────────────────────────────────────────────────
const MEASUREMENT = [
  {
    cadence: "Weekly",
    d: "Pacing, CPM/CPC, CTR, frequency, and top-creative review. Pause fatigued creative, trim wasteful search terms, keep delivery on plan.",
  },
  {
    cadence: "Biweekly",
    d: "Reallocation. Move up to 15% of budget toward the best-performing channel and phase out the weakest, funded by the reserve line.",
  },
  {
    cadence: "End of flight",
    d: "Brand-lift study readout, full-funnel attribution (first-touch, last-touch, and assisted), pipeline sourced, and a scale plan for the next quarter.",
  },
];

// ── Reasoning ─────────────────────────────────────────────────────────────────
const REASONING = [
  {
    t: "Why $120K, and why phased",
    d: "Enough to reach a narrow ICP with real frequency across three channels for a full quarter, small enough to be a defensible early-stage test — not a bet-the-quarter number. Phasing means week-4 learnings fund week-9 scale instead of guessing up front.",
  },
  {
    t: "Why paid social leads (45%)",
    d: "IPX's buyers are identifiable by title and industry, and LinkedIn is the only channel that targets them that precisely. Meta rides underneath it as cheap retargeting and reach-extension, so we're not paying LinkedIn CPMs to hit the same warm user twice.",
  },
  {
    t: "Why search is a third (30%)",
    d: "The category already has demand — people search 'virtual data room' and competitor names every day. Search captures that intent now, defends the brand term the moment awareness lifts, and is the cleanest signal of what messaging actually converts.",
  },
  {
    t: "Why one influencer, not ten",
    d: "An unknown brand's scarcest asset is trust. One deep, exclusive partnership with a voice this ICP already believes buys more credibility than a dozen shallow shoutouts — and we amplify their content as ads for a trust-and-cost advantage owned creative can't match.",
  },
];

export default function IpxPage() {
  const paidSocial = 36000 + 18000;
  const paidSearch = 30000 + 6000;

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[86vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.14),transparent_65%)]" />
        </div>
        <div
          className="relative mx-auto w-full max-w-[1400px]"
          style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}
        >
          <Eyebrow pink>Digital Media Plan · Work Sample · Hypothetical Campaign</Eyebrow>
          <div className="mt-4">
            <H1>
              Launching <span className="text-petal">IPX.</span>
              <br />A 90-day awareness flight.
            </H1>
          </div>
          <p
            className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl"
            style={{ fontWeight: 500, maxWidth: "40ch" }}
          >
            $120K across paid social, search, and one influencer partnership — built to
            reach a narrow, high-value ICP and seed real pipeline.
          </p>
          <p
            className="mt-4 font-body text-base font-light leading-8 text-smoke"
            style={{ maxWidth: "58ch" }}
          >
            A one-page media plan for an early-stage platform launch: the allocation, the
            KPIs, the flighting, and the reasoning behind every call. Prepared for the
            ideals hiring exercise.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BtnPrimary href="#allocation">See the Allocation ↓</BtnPrimary>
            <BtnGhost href={BOOK_CALL_URL}>Talk Through It</BtnGhost>
          </div>

          {/* topline stats */}
          <div className="mt-12 grid grid-cols-2 gap-px border border-graphite/70 bg-graphite/70 sm:grid-cols-4">
            {TOPLINE.map((s) => (
              <div key={s.v} className="bg-void px-5 py-6">
                <p className="font-display text-4xl text-white md:text-5xl">{s.k}</p>
                <p className="mt-1 font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ash">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Awareness",
          "Paid Social",
          "LinkedIn",
          "Meta",
          "Paid Search",
          "Google",
          "Microsoft Ads",
          "Influencer",
          "Brand Lift",
          "Pipeline",
        ]}
      />

      {/* ── THE BRIEF / ASSUMPTIONS ── */}
      <RevealSection bg="void">
        <Eyebrow pink>01 · The Brief, Read Honestly</Eyebrow>
        <div className="mt-3 max-w-4xl">
          <H2>Assumptions first.</H2>
        </div>
        <p className="mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke">
          A plan is only as good as what it admits it&apos;s assuming. Here&apos;s the
          frame everything below is built on — stated up front so it&apos;s easy to
          challenge.
        </p>
        <div className="mt-12 grid gap-px bg-graphite/70 md:grid-cols-2">
          {ASSUMPTIONS.map((a) => (
            <div key={a.t} className="bg-obsidian p-7 md:p-8">
              <H3Script>{a.t}</H3Script>
              <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
                {a.d}
              </p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={0} />

      {/* ── ALLOCATION ── */}
      <RevealSection id="allocation" bg="void">
        <Eyebrow pink>02 · Where The $120K Goes</Eyebrow>
        <div className="mt-3 max-w-4xl">
          <H2>Channel allocation.</H2>
        </div>
        <p className="mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke">
          Paid social leads at 45%, search takes a third, one influencer partnership gets
          15%, and a 10% reserve stays liquid to chase whatever&apos;s working.
        </p>

        {/* stacked bar */}
        <div className="mt-12">
          <div className="flex h-10 w-full overflow-hidden rounded-sm border border-graphite">
            {ALLOCATION.map((a) => (
              <div
                key={a.channel}
                title={`${a.channel} — ${a.pct}%`}
                style={{ width: `${a.pct}%`, background: a.color }}
                className="h-full"
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {ALLOCATION.map((a) => (
              <div key={a.channel} className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5"
                  style={{ background: a.color }}
                />
                <span className="font-body text-xs font-light text-smoke">
                  {a.channel} <span className="text-ash">· {a.pct}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* table */}
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-graphite">
                {["Channel", "Bucket", "Budget", "%", "Role"].map((h) => (
                  <th
                    key={h}
                    className="pb-4 pr-4 font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ash"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALLOCATION.map((a) => (
                <tr key={a.channel} className="border-b border-graphite/50 align-top">
                  <td className="py-5 pr-4">
                    <span className="font-display text-lg uppercase tracking-[0.02em] text-pearl">
                      {a.channel}
                    </span>
                  </td>
                  <td className="py-5 pr-4 font-body text-xs font-light uppercase tracking-[0.15em] text-ash">
                    {a.group}
                  </td>
                  <td className="whitespace-nowrap py-5 pr-4 font-display text-xl text-white">
                    {fmt(a.budget)}
                  </td>
                  <td className="py-5 pr-4 font-display text-xl text-petal">{a.pct}%</td>
                  <td className="max-w-md py-5 font-body text-sm font-light leading-6 text-smoke">
                    {a.role}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-5 pr-4">
                  <span className="font-display text-lg uppercase tracking-[0.02em] text-petal">
                    Total
                  </span>
                </td>
                <td />
                <td className="whitespace-nowrap py-5 pr-4 font-display text-xl text-petal">
                  {fmt(120000)}
                </td>
                <td className="py-5 pr-4 font-display text-xl text-petal">100%</td>
                <td className="py-5 font-body text-xs font-light uppercase tracking-[0.15em] text-ash">
                  Working media · fees &amp; production held separately
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* bucket callouts */}
        <div className="mt-10 grid gap-px bg-graphite/70 sm:grid-cols-3">
          {[
            { k: "Paid social", v: fmt(paidSocial), p: "45%" },
            { k: "Paid search", v: fmt(paidSearch), p: "30%" },
            { k: "Influencer", v: fmt(18000), p: "15%" },
          ].map((b) => (
            <div key={b.k} className="bg-obsidian px-6 py-7">
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ash">
                {b.k}
              </p>
              <p className="mt-2 font-display text-3xl text-white">
                {b.v} <span className="text-petal">· {b.p}</span>
              </p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={1} />

      {/* ── KPIs ── */}
      <RevealSection bg="void">
        <Eyebrow pink>03 · How We Know It Worked</Eyebrow>
        <div className="mt-3 max-w-4xl">
          <H2>KPIs &amp; targets.</H2>
        </div>
        <p className="mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke">
          This is an awareness campaign, so reach and brand lift are the north star — but
          every awareness dollar still has to leave a pipeline fingerprint. Targets assume
          category-typical B2B benchmarks.
        </p>
        <div className="mt-12 grid gap-px bg-graphite/70 md:grid-cols-2 xl:grid-cols-4">
          {KPI_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className={`bg-obsidian p-7 ${
                tier.accent ? "border-t-2 border-petal" : "border-t-2 border-graphite"
              }`}
            >
              <p
                className={`font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${
                  tier.accent ? "text-petal" : "text-ash"
                }`}
              >
                {tier.tier}
              </p>
              <ul className="mt-5 space-y-4">
                {tier.items.map((it) => (
                  <li key={it.m}>
                    <p className="font-body text-sm font-medium text-pearl">{it.m}</p>
                    <p className="mt-0.5 font-display text-lg text-white">{it.g}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl font-body text-xs font-light italic leading-6 text-ash">
          Guardrails: frequency capped 3–4×/week per platform, brand-safety allowlists on
          all placements, 1-day view-through window on retargeting, and a holdout cell
          reserved for the brand-lift study.
        </p>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── CHANNEL DEEP DIVE ── */}
      <RevealSection bg="void">
        <Eyebrow pink>04 · The Channels, In Detail</Eyebrow>
        <div className="mt-3 max-w-4xl">
          <H2>What each dollar buys.</H2>
        </div>

        <div className="mt-12 space-y-px bg-graphite/70">
          {/* Paid social */}
          <div className="bg-obsidian p-7 md:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <H3Script>Paid social — {fmt(paidSocial)} · 45%</H3Script>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-petal">
                Primary
              </span>
            </div>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div>
                <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl">
                  LinkedIn · {fmt(36000)}
                </p>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
                  Objective-split between awareness (thought-leadership video and document
                  ads) and traffic. Targeted by job title, seniority, function, and
                  industry against the ICP, plus matched-audience lists of target
                  accounts. Assume a ~$38 CPM — expensive, but no other channel puts IPX
                  in front of a corporate-development VP this cleanly.
                </p>
              </div>
              <div>
                <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl">
                  Meta · {fmt(18000)}
                </p>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
                  Retargeting of site visitors and video engagers, plus lookalikes seeded
                  from waitlist signups. At a ~$11 CPM it delivers the frequency that turns
                  a first LinkedIn impression into recall — without paying premium CPMs to
                  re-reach a warm user.
                </p>
              </div>
            </div>
          </div>

          {/* Paid search */}
          <div className="bg-obsidian p-7 md:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <H3Script>Paid search — {fmt(paidSearch)} · 30%</H3Script>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-petal">
                Intent capture
              </span>
            </div>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div>
                <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl">
                  Google · {fmt(30000)}
                </p>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
                  Three campaigns: non-brand category terms (&ldquo;virtual data
                  room,&rdquo; &ldquo;secure deal room,&rdquo; &ldquo;M&amp;A deal
                  management&rdquo;), a low-cost brand-defense campaign on
                  &ldquo;IPX,&rdquo; and measured competitor conquesting. Category CPCs run
                  steep (~$12 blended), so tight negatives and intent-matched landing pages
                  carry the efficiency.
                </p>
              </div>
              <div>
                <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl">
                  Microsoft Ads · {fmt(6000)}
                </p>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
                  A small, high-return sliver. The enterprise finance and legal audience
                  over-indexes on Edge/Bing from corporate desktops, and CPCs run below
                  Google&apos;s. Same campaign structure, imported and re-bid.
                </p>
              </div>
            </div>
          </div>

          {/* Influencer */}
          <div className="bg-carbon p-7 shadow-[0_0_70px_rgba(255,181,208,0.08)] md:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <H3Script>Influencer partnership — {fmt(18000)} · 15%</H3Script>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-petal">
                Borrowed trust
              </span>
            </div>
            <p className="mt-6 max-w-3xl font-body text-sm font-light leading-7 text-smoke">
              One deep, exclusive partnership with a category-native voice — a respected
              corporate-development or M&amp;A operator with an engaged LinkedIn following
              and a newsletter, or a finance-ops podcast this ICP already trusts. The
              package:
            </p>
            <div className="mt-6 grid gap-px bg-graphite/70 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { t: "3-part content series", d: "Problem → approach → IPX, in their own voice across the flight." },
                { t: "One live session", d: "A webinar or podcast episode co-produced with the IPX team." },
                { t: "Newsletter feature", d: "A dedicated placement to their owned, opted-in audience." },
                { t: "Whitelisted amplification", d: "We run their content as ads — higher trust, lower CPMs than brand creative." },
              ].map((x) => (
                <div key={x.t} className="bg-obsidian p-5">
                  <p className="font-body text-sm font-medium text-pearl">{x.t}</p>
                  <p className="mt-2 font-body text-xs font-light leading-6 text-smoke">
                    {x.d}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl font-body text-xs font-light italic leading-6 text-ash">
              Terms: category exclusivity for the flight (no competing VDR), defined
              deliverables and dates, 6-month usage rights, and unique UTMs plus a promo
              path so the partnership&apos;s contribution is measured on its own, not lost
              in blended numbers.
            </p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={3} />

      {/* ── FLIGHTING ── */}
      <RevealSection bg="void">
        <Eyebrow pink>05 · The 12-Week Flight</Eyebrow>
        <div className="mt-3 max-w-4xl">
          <H2>Flighting &amp; sequence.</H2>
        </div>
        <p className="mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke">
          Spend isn&apos;t flat — it earns the right to scale. Teach the category, build
          consideration off that base, then convert the warm demand it created.
        </p>
        <div className="mt-12 grid gap-px bg-graphite/70 lg:grid-cols-3">
          {PHASES.map((p) => (
            <div key={p.num} className="bg-obsidian p-7 md:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-5xl text-petal/30">{p.num}</span>
                <span className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ash">
                  {p.weeks}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl md:text-3xl">
                {p.name}
              </h3>
              <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
                {p.body}
              </p>
              <ul className="mt-5 space-y-2">
                {p.channels.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-3 font-body text-xs font-light uppercase tracking-[0.12em] text-smoke"
                  >
                    <span className="h-1 w-1 flex-shrink-0 bg-petal" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={4} />

      {/* ── MEASUREMENT ── */}
      <RevealSection bg="void">
        <Eyebrow pink>06 · Closing The Loop</Eyebrow>
        <div className="mt-3 max-w-4xl">
          <H2>Measurement &amp; optimization.</H2>
        </div>
        <div className="mt-12 grid gap-px bg-graphite/70 md:grid-cols-3">
          {MEASUREMENT.map((x) => (
            <div key={x.cadence} className="bg-obsidian p-7 md:p-8">
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal">
                {x.cadence}
              </p>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">
                {x.d}
              </p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={5} />

      {/* ── REASONING ── */}
      <RevealSection bg="void">
        <Eyebrow pink>07 · The Thinking</Eyebrow>
        <div className="mt-3 max-w-4xl">
          <H2>Why this plan.</H2>
        </div>
        <div className="mt-12 grid gap-px bg-graphite/70 md:grid-cols-2">
          {REASONING.map((r) => (
            <div key={r.t} className="bg-obsidian p-7 md:p-8">
              <H3Script>{r.t}</H3Script>
              <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
                {r.d}
              </p>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* ── CLOSE ── */}
      <section className="relative overflow-hidden bg-void py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(242,175,198,0.12),transparent_65%)]" />
        </div>
        <div
          className="relative mx-auto w-full max-w-[1400px] text-center"
          style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}
        >
          <Eyebrow pink>The 30-second version</Eyebrow>
          <div className="mx-auto mt-3 max-w-4xl">
            <H2>
              Reach the right few, <span className="text-petal">precisely</span> — then
              scale what works.
            </H2>
          </div>
          <p className="mx-auto mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke">
            $120K, 12 weeks, three channels and a reserve. Paid social to find a narrow
            ICP, search to catch its intent, one trusted voice to make an unknown brand
            credible — measured on brand lift and the pipeline it seeds.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href={BOOK_CALL_URL}>Book a Call</BtnPrimary>
            <BtnGhost href={`mailto:${CONTACT.email}`}>Email Me</BtnGhost>
          </div>
          <p className="mt-12 font-body text-xs font-light leading-6 text-ash">
            Prepared by Mary Kate Parrish · Work sample for the ideals hiring exercise.
            <br />
            IPX is a hypothetical campaign; figures are illustrative, category-typical
            planning assumptions — not results.
          </p>
        </div>
      </section>
    </>
  );
}
