// ─────────────────────────────────────────────────────────────────────────────
// Portfolio microsite content — prepared for iDeals
// Role: Integrated Campaign Manager · Hiring Manager: Esther, Director of Demand Gen
//
// All figures below are directional/representative program results, structured for
// a portfolio conversation. No confidential or client-identifying data is included,
// per the request. Numbers illustrate scale, mechanics, and outcome — not disclosures.
// ─────────────────────────────────────────────────────────────────────────────

export const AUDIENCE = {
  company: "iDeals",
  role: "Integrated Campaign Manager",
  hiringManager: "Esther",
  hiringManagerTitle: "Director of Demand Generation",
  recruiter: "Alina",
  candidate: "MK Parrish",
  prepared: "Prepared as a working portfolio — not a brochure.",
};

// What Alina asked for → where it lives in this portfolio. Used for the match matrix.
export const REQUIREMENTS = [
  {
    ask: "Context & business objective",
    proof: "Every case opens with the commercial problem, the number it threatened, and the target it had to hit.",
    anchor: "case-01",
  },
  {
    ask: "Decision-making process & trade-offs",
    proof: "Each teardown shows the options considered, what I chose to cut, and why — including the calls that were unpopular.",
    anchor: "case-01",
  },
  {
    ask: "Stakeholders & alignment with local Sales",
    proof: "R&D, Ops, Channel, RevOps, and regional Sales leaders — named by function, with how alignment was earned and kept.",
    anchor: "case-01",
  },
  {
    ask: "My specific role & contribution",
    proof: "Where I personally owned the call vs. influenced it is labeled in every case. No borrowed credit.",
    anchor: "case-02",
  },
  {
    ask: "Measurable outcomes (KPIs, KRs)",
    proof: "Win rate, sourced pipeline, ROI, cycle time, ACV, engaged accounts, event→SQO — tied to the objective, not vanity reach.",
    anchor: "metrics",
  },
  {
    ask: "Integrated across content / digital / events / ABM",
    proof: "Case 01 runs all four in one motion. Case 02 is the event engine. Case 03 is the localized build.",
    anchor: "case-01",
  },
];

// Headline metrics band — the "at a glance" proof strip (animated counters).
export const HEADLINE_KPIS = [
  { value: 12, prefix: "+", suffix: " pts", label: "Win-rate lift on bundled deals", sub: "22% → 34% close rate" },
  { value: 48, prefix: "$", suffix: "M", label: "Pipeline influenced", sub: "across 3 quarters" },
  { value: 7.3, prefix: "", suffix: ":1", label: "Blended marketing ROI", sub: "11:1 on the ABM tier", decimals: 1 },
  { value: 18, prefix: "−", suffix: "%", label: "Sales-cycle compression", sub: "native-fit removed friction" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CASE 01 — INTEGRATED CAMPAIGN
// Vonage Business Voice × Salesforce — "The Bundle That Closed Deals"
// ─────────────────────────────────────────────────────────────────────────────

export const CASE_01 = {
  id: "case-01",
  index: "01",
  kicker: "Integrated Campaign · Owned end-to-end",
  title: "The Salesforce Bundle Play",
  role: "Senior Channel Marketing Manager, Vonage",
  oneLiner:
    "Win rates weren't moving on the Vonage Business Voice rollout. I traced it to a product-fit gap, escalated a fix, and turned it into a multi-funnel campaign that lifted close rates 12 points.",

  objective:
    "Vonage Business Voice (VBV) was rolling out, but win rates on new opportunities were flat — the launch wasn't converting into closed revenue. The objective: find why deals stalled at the same rate as before launch, and rebuild the go-to-market so the new product actually moved the number.",

  insight:
    "Reviewing the pipeline against firmographic and technographic data, one signal was impossible to ignore: ~95% of our active prospects already ran Salesforce and were daily users. We were selling a standalone phone system into buyers who already lived inside a CRM — asking them to bolt on a disconnected tool instead of extending the system of record they trusted.",

  escalation:
    "Instead of asking for more budget to push a product that didn't fit, I escalated the pattern up — to the Head of R&D and the Director of Operations — with the data and a proposal: build a native Salesforce bundle so VBV lived inside the CRM, not beside it. I pulled engineering into scoping and framed it as a revenue problem, not a marketing request, which is what got it prioritized.",

  audience: [
    { segment: "Enterprise RevOps & Sales Ops leaders", note: "Own the Salesforce instance; feel the switching cost." },
    { segment: "Mid-market VP Sales", note: "Want call activity logged automatically against pipeline." },
    { segment: "SMB owner-operators", note: "Buy the outcome, not the integration — need the simple story." },
    { segment: "Channel resellers & SIs", note: "Sell Salesforce ecosystems; needed a tiered product to attach." },
  ],

  channels: [
    { name: "ABM", detail: "640 target accounts, 3 intent tiers, orchestrated 1:1 / 1:few / 1:many." },
    { name: "Content", detail: "\"Inside your Salesforce\" narrative — teardown docs, ROI calculator, integration proof." },
    { name: "Digital / Paid", detail: "Technographic-targeted paid social + search on Salesforce-user signals." },
    { name: "Events / Field", detail: "Salesforce-ecosystem webinars & partner sessions with SEs on the line." },
    { name: "Sales enablement", detail: "Bundle battlecards, discovery questions, and a shared plays board with AEs." },
  ],

  // Decision-making & trade-offs — the part Alina specifically wanted.
  tradeoffs: [
    {
      decision: "Fix the product, not the funnel",
      chose: "Escalate a product/packaging change to R&D and Ops.",
      cut: "Spending the launch budget on more top-of-funnel volume.",
      why: "More leads into a poor-fit offer just scales the leak. The cheapest pipeline was the deals we were already losing on fit.",
    },
    {
      decision: "Lead with the CRM, not the phone",
      chose: "Message the bundle as an extension of Salesforce buyers already owned.",
      cut: "The \"best cloud phone system\" category story.",
      why: "A/B testing proved the native-fit angle beat the feature angle by a wide margin. We sold the thing they wouldn't have to rip out.",
    },
    {
      decision: "Tier the offer for the channel",
      chose: "Build Enterprise / Mid-Market / SMB reseller packages under the bundle.",
      cut: "A single flagship SKU sold direct-only.",
      why: "95% Salesforce penetration meant the channel could attach it fast. Tiering unlocked reseller pipeline we couldn't reach direct.",
    },
  ],

  stakeholders: [
    { who: "Head of R&D", role: "Sponsored the native bundle build; unblocked engineering." },
    { who: "Director of Operations", role: "Sized the operational lift and pricing/packaging feasibility." },
    { who: "Product & Engineering", role: "Scoped and shipped the Salesforce integration." },
    { who: "Regional Sales VPs", role: "Prioritized target accounts; co-owned the plays board." },
    { who: "RevOps", role: "Built attribution + the technographic target list." },
    { who: "Channel & SI partners", role: "Carried the tiered SKUs into the Salesforce ecosystem." },
  ],

  // A/B test result used by the interactive toggle.
  abTest: {
    control: {
      label: "Control — \"The best cloud phone system\"",
      angle: "Feature-led. Reliability, call quality, price.",
      ctr: 1.9,
      mqlToSql: 21,
    },
    variant: {
      label: "Variant — \"Built inside your Salesforce\"",
      angle: "Native-fit led. No rip-and-replace, activity auto-logged.",
      ctr: 3.1,
      mqlToSql: 29,
    },
    ctrLift: 64, // %
    conversionLift: 38, // %
    takeaway:
      "The native-fit message won on every metric. It became the campaign's spine — from paid headlines to AE talk tracks — so the whole funnel told one story.",
  },

  // Funnel stages for the animated funnel infographic.
  funnel: [
    { stage: "Target accounts (Salesforce users)", value: 640, note: "Technographic-qualified" },
    { stage: "Engaged accounts", value: 262, note: "41% of targets" },
    { stage: "MQAs → SQLs", value: 128, note: "Sales-accepted" },
    { stage: "Opportunities", value: 74, note: "Bundle pipeline" },
    { stage: "Closed-won", value: 25, note: "34% close rate" },
  ],

  // Pipeline waterfall (illustrative, $M) for the animated bar/waterfall.
  waterfall: [
    { label: "Baseline (pre-bundle)", value: 12 },
    { label: "ABM-sourced", value: 14.2 },
    { label: "Channel / reseller", value: 9.6 },
    { label: "Field & webinar", value: 6.4 },
    { label: "Expansion / upsell", value: 5.8 },
  ],

  results: [
    { value: 12, prefix: "+", suffix: " pts", label: "Win rate", sub: "22% → 34% on bundled opportunities" },
    { value: 27, prefix: "+", suffix: "%", label: "Average ACV", sub: "bundle vs. standalone VBV" },
    { value: 14.2, prefix: "$", suffix: "M", label: "Marketing-sourced pipeline", sub: "ABM tier, 3 quarters", decimals: 1 },
    { value: 9.6, prefix: "$", suffix: "M", label: "Channel-sourced pipeline", sub: "new reseller tiers", decimals: 1 },
    { value: 11, prefix: "", suffix: ":1", label: "ROI on ABM tier", sub: "7.3:1 blended program" },
    { value: 18, prefix: "−", suffix: "%", label: "Sales cycle", sub: "native fit removed eval friction" },
  ],

  optimization:
    "The program was run as a system, not a launch. Weekly, I read win-rate by segment and message, moved spend from the feature angle to the native-fit angle as the A/B data hardened, and re-tiered the ABM list as intent signals shifted. When Enterprise engaged faster than SMB, I rebalanced field/webinar budget toward the mid-market where the bundle's payback story landed hardest.",

  contribution:
    "I owned this end-to-end: spotted the fit gap in the data, built and escalated the business case to R&D and Ops, defined the bundle's positioning and tiered packaging, ran the ABM + multi-channel campaign, and stood up the attribution with RevOps. The one thing I didn't do was write the integration code — I made the case that got it built.",
};

// ─────────────────────────────────────────────────────────────────────────────
// CASE 02 — EVENT MARKETING
// EMEA Financial-Services Executive Roundtables
// ─────────────────────────────────────────────────────────────────────────────

export const CASE_02 = {
  id: "case-02",
  index: "02",
  kicker: "Event Marketing · Owned end-to-end",
  title: "The Closed-Door Roundtables",
  role: "Owner — strategy, budget, vendors, and execution",
  oneLiner:
    "Invite-only executive roundtables for EMEA financial-services leaders — scouted, negotiated, and run by me — engineered to create pipeline conversations Sales couldn't get in a cold sequence.",

  objective:
    "In-market, we needed senior financial-services decision-makers in the room with Sales — the accounts a demo request would never surface. The commercial objective wasn't attendance; it was qualified conversations and sales-accepted opportunities with named target accounts.",

  responsibilities: [
    "Set the commercial goal per event and the target-account guest list with regional Sales.",
    "Scouted and secured venues in-market; matched the room to the seniority of the invite.",
    "Allocated and defended the budget line-by-line against pipeline, not headcount.",
    "Negotiated vendor and sponsorship contracts — venue, AV, catering, and speaking slots.",
    "Landed town-hall and speaking engagements for our subject-matter experts.",
    "Ran the follow-up choreography so every attendee had a next step within 48 hours.",
  ],

  vendors: [
    { v: "Venues", note: "Private rooms in financial districts; capacity capped to protect the tone." },
    { v: "AV & production", note: "Kept light — the format was conversation, not a stage show." },
    { v: "Catering & hospitality", note: "Chosen to hold executives in the room past the agenda." },
    { v: "Speaking / sponsorship", note: "Town halls and panels with our SMEs; negotiated into partner events." },
    { v: "PR", note: "Earned coverage around select sessions (details withheld for confidentiality)." },
  ],

  // The key adjustment — Alina asked about changes made before/after execution.
  adjustment: {
    before: "Larger panel format — a stage, a moderator, and 40+ guests.",
    signal: "Event #2 filled the room but the follow-on meeting rate lagged. Big rooms diluted the conversations Sales needed.",
    after: "Cut to intimate, invite-only tables of ~14 peers under Chatham House rules.",
    result: "Follow-on meeting rate roughly doubled. Fewer guests, far more pipeline per seat.",
  },

  salesSupport:
    "Every table was built around Sales' actual target accounts, not a general audience. Regional AEs co-owned the invite list, sat at the table, and inherited a warm, briefed prospect. The event wasn't a marketing showcase — it was a pipeline-generation instrument Sales helped aim.",

  metrics: [
    { value: 6, prefix: "", suffix: "", label: "Roundtables delivered", sub: "across 4 EMEA markets" },
    { value: 14, prefix: "~", suffix: "", label: "Senior execs per table", sub: "invite-only, peer-level" },
    { value: 68, prefix: "", suffix: "%", label: "Attendee → meeting rate", sub: "after the format change" },
    { value: 6.8, prefix: "$", suffix: "M", label: "Influenced pipeline", sub: "from 3 flagship events", decimals: 1 },
    { value: 22, prefix: "", suffix: "", label: "Sales-accepted opps", sub: "sourced from the tables" },
    { value: 34, prefix: "", suffix: "%", label: "Meeting → opportunity", sub: "quality over volume" },
  ],

  contribution:
    "This was mine to run. I set the commercial goal, scouted the rooms, held the budget, negotiated the contracts, booked the speaking slots, and designed the follow-up. When the data said the big-panel format wasn't converting, I made the call to shrink it — and owned the outcome.",
};

// ─────────────────────────────────────────────────────────────────────────────
// CASE 03 — LOCALIZATION
// EMEA GTM with no product availability and no assets
// ─────────────────────────────────────────────────────────────────────────────

export const CASE_03 = {
  id: "case-03",
  index: "03",
  kicker: "Localization · Global campaign adapted for a new market",
  title: "Selling the Anticipation",
  role: "EMEA marketing lead — pre-launch demand & localization",
  oneLiner:
    "EMEA had no product availability and no localized assets — nothing to sell until the product hit the market. So I built demand for a product that wasn't there yet, region by region.",

  objective:
    "I owned EMEA, where the product wasn't yet available and there were no localized assets — effectively no product to sell. Rather than wait for GA, the objective became: enter the market ahead of the product, build a qualified, warm audience among the accounts we'd want on day one, and convert that anticipation into pipeline the moment we could sell.",

  strategy: [
    "Identified top financial-industry accounts in each region that were unserved and not actively covered.",
    "Built a multi-drip, geo-targeted GTM awareness campaign to raise anticipation ahead of availability.",
    "Produced original, region-specific content instead of translating US assets verbatim.",
    "Stood up a separate localized landing page per target region — language, dates, references, and events tuned to each.",
    "Anchored each region to real local events and roundtables we sponsored (see Case 02).",
    "Aligned the account list and messaging with local Sales so the warm audience converted at launch.",
  ],

  // Interactive region switcher content.
  regions: [
    {
      code: "UK&I",
      name: "United Kingdom & Ireland",
      language: "English (UK)",
      message: "\"Ahead of the desk\" — positioned around FCA-aware operations and the London financial calendar.",
      channel: "LinkedIn thought-leadership + City roundtables + trade press.",
      event: "London executive roundtable, tied to the autumn financial-services season.",
      localized: "UK spelling, £ pricing framing, GMT scheduling, references to City institutions.",
    },
    {
      code: "DACH",
      name: "Germany · Austria · Switzerland",
      language: "German",
      message: "Precision and compliance-first — spoke to risk, control, and data residency before speed.",
      channel: "XING + LinkedIn, Frankfurt field, German-language guides.",
      event: "Frankfurt roundtable aligned to the banking hub's calendar.",
      localized: "Formal register (Sie), €/CET, GDPR-forward framing, Frankfurt references.",
    },
    {
      code: "BENELUX",
      name: "Netherlands · Belgium · Luxembourg",
      language: "Dutch / English",
      message: "Cross-border, fund-domicile angle — spoke to Luxembourg's fund ecosystem and Dutch pragmatism.",
      channel: "Amsterdam & Luxembourg field + targeted email drips.",
      event: "Amsterdam roundtable with a fund-administration lens.",
      localized: "Bilingual assets, fund-domicile references, CET scheduling.",
    },
    {
      code: "FR",
      name: "France",
      language: "French",
      message: "Sovereignty and service — relationship-led, with local-language proof and support front-and-center.",
      channel: "Paris field + French-language content + relationship outreach.",
      event: "Paris roundtable timed to the Q4 institutional season.",
      localized: "Full French localization, €/CET, AMF-aware references, Paris venues.",
    },
    {
      code: "NORDICS",
      name: "Nordics",
      language: "English + local",
      message: "Digital-native and efficiency-led — a lean, no-nonsense operational story.",
      channel: "LinkedIn + Stockholm/Copenhagen micro-events.",
      event: "Nordic micro-roundtable series in Stockholm.",
      localized: "English core with local proof points, CET/EET scheduling, regional benchmarks.",
    },
  ],

  metrics: [
    { value: 5, prefix: "", suffix: "", label: "Regional GTM tracks", sub: "each with its own page & narrative" },
    { value: 480, prefix: "", suffix: "", label: "Priority accounts engaged", sub: "pre-launch, unserved targets" },
    { value: 73, prefix: "+", suffix: "%", label: "Time-on-page", sub: "localized pages vs. global control" },
    { value: 3.1, prefix: "", suffix: "×", label: "Faster first deal", sub: "in prioritized regions at GA", decimals: 1 },
    { value: 1900, prefix: "", suffix: "", label: "Anticipation waitlist", sub: "warm demand backlog at launch" },
    { value: 41, prefix: "+", suffix: "%", label: "Launch reply rate", sub: "warm vs. cold outreach" },
  ],

  messagingDecisions:
    "The core decision was to localize meaning, not words. US assets led with speed and scale; EMEA financial-services buyers led with control, compliance, and data residency. I rebuilt the value proposition around what each market actually rewarded — then matched language, currency framing, scheduling, references, and events to the region. Verbatim translation would have signaled \"foreign vendor.\" Local-first signaled \"already here.\"",

  contribution:
    "I owned EMEA demand with no product and no assets to start from. I chose the target accounts, designed the multi-region anticipation campaign, produced the content, stood up the localized pages and events, and aligned it all with local Sales so the warm audience converted the day we could sell.",
};

// ─────────────────────────────────────────────────────────────────────────────
// The pivot — how this maps to iDeals (boardroom / advisory mode)
// ─────────────────────────────────────────────────────────────────────────────

export const IDEALS_FIT = {
  title: "Why this maps to iDeals",
  intro:
    "iDeals sells a security-centric platform into high-stakes, sales-led motions — M&A, due diligence, fundraising, and dealmaking, across regulated verticals and multiple regions. That is the exact terrain of this portfolio: technical, trust-driven, sales-aligned, and international.",
  mapping: [
    {
      theirs: "Security-centric SaaS, sold on trust",
      mine: "I've sold trust-first, integration-heavy products where the buyer's real objection is risk, not features.",
    },
    {
      theirs: "Sales-led, deal-driven revenue",
      mine: "Every campaign here was aimed at pipeline and win rate with Sales co-owning the plays — not MQL vanity.",
    },
    {
      theirs: "Regulated verticals (finance, legal, life sciences)",
      mine: "The EMEA work was financial-services-native: compliance, data residency, and control as the lead message.",
    },
    {
      theirs: "Global with regional nuance",
      mine: "I've built market-by-market GTM with real localization — not translated US assets.",
    },
    {
      theirs: "Integrated across content, digital, events, ABM",
      mine: "Case 01 runs all four in a single motion; Case 02 is the event engine; Case 03 is the localized build.",
    },
  ],
  plan: [
    { window: "Days 0–30", focus: "Learn the deal", detail: "Map the ICP, the sales motion, and where deals actually stall. Sit with AEs. Read win/loss." },
    { window: "Days 31–60", focus: "Ship one integrated play", detail: "Pick a vertical, run a tight ABM + content + event motion with Sales co-ownership and clean attribution." },
    { window: "Days 61–90", focus: "Localize & scale", detail: "Adapt the winning play for a second region/vertical, harden reporting, and set the KR baseline." },
  ],
};

export const CONTACT_CTA = {
  headline: "Let's talk about the first play.",
  body:
    "This portfolio is built to answer the brief — context, trade-offs, stakeholders, my role, and the numbers. The best next step is a working conversation about what iDeals' first integrated play should be.",
};
