// ─────────────────────────────────────────────────────────────────────────────
// Portfolio microsite content — prepared for iDeals
// Role: Integrated Campaign Manager · Hiring Manager: Esther, Director of Demand Gen
//
// Voice: first person, from a demand-gen / business-development leader's chair.
// Every KPI is defined with its commercial rationale, not just a number.
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
    proof: "I open every case on the commercial problem — the number at risk, the quota gap, the revenue thesis — before a single tactic.",
    anchor: "case-01",
  },
  {
    ask: "Decision-making process & trade-offs",
    proof: "I show the options I weighed, the spend I killed, and the bets I placed — including the calls that were unpopular in the room.",
    anchor: "case-01",
  },
  {
    ask: "Stakeholders & alignment with local Sales",
    proof: "I name every function I aligned — R&D, RevOps, Product, Channel, and regional Sales leadership — and how I earned and held that alignment.",
    anchor: "case-01",
  },
  {
    ask: "My specific role & contribution",
    proof: "I label where I owned the decision versus where I influenced it. No borrowed credit, no vague “we.”",
    anchor: "case-02",
  },
  {
    ask: "Measurable outcomes (KPIs, KRs)",
    proof: "Win rate, marketing-sourced vs. influenced pipeline, ROI, cycle time, ACV, engaged accounts, event→SQO — every KR tied to the commercial objective, never vanity reach.",
    anchor: "metrics",
  },
  {
    ask: "Integrated across content / digital / events / ABM",
    proof: "Case 01 orchestrates all four in one motion. Case 02 is the field/event engine. Case 03 is the localized GTM build.",
    anchor: "case-01",
  },
];

// Headline metrics band — the "at a glance" proof strip (animated counters).
export const HEADLINE_KPIS = [
  { value: 12, prefix: "+", suffix: " pts", label: "New-logo win-rate lift", sub: "22% → 34% close rate on bundled opps — the highest-leverage input I own on net-new ARR" },
  { value: 48, prefix: "$", suffix: "M", label: "Marketing-influenced pipeline", sub: "built across a 3-quarter integrated motion — ~3.4x program coverage of the number" },
  { value: 7.3, prefix: "", suffix: ":1", label: "Blended marketing-sourced ROI", sub: "11:1 on the ABM tier — CAC payback compressed to under two quarters", decimals: 1 },
  { value: 18, prefix: "−", suffix: "%", label: "Sales-cycle compression", sub: "native-fit removed evaluation friction — pipeline velocity up, time-to-revenue down" },
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
    "Win rates on the Vonage Business Voice rollout weren’t moving. I traced the leak to a product-market-fit gap in the data, escalated a packaging fix to R&D and Ops, and rebuilt the go-to-market into an ABM-led, multi-funnel motion that lifted close rate 12 points and re-rated our deal economics.",

  objective:
    "Vonage Business Voice (VBV) was in-market, but win rate on new-logo opportunities was flat — the launch was generating activity without converting it into closed ARR. My objective wasn’t more leads; it was to diagnose why deals stalled at the same rate as pre-launch and re-architect the GTM so the new product actually moved the number I was accountable for.",

  insight:
    "I pulled the pipeline apart against firmographic and technographic signal, and one data point reframed the entire motion: ~95% of our active, in-cycle prospects already ran Salesforce as their daily system of record. We were selling a standalone communications tool into a CRM-native buying committee — asking them to bolt on a disconnected point solution instead of extending the platform they already trusted. The recurring loss reason in deal reviews wasn’t price or quality; it was “another silo.”",

  escalation:
    "Rather than spend launch budget scaling demand into a poor-fit offer, I built the business case and escalated the pattern up — to the Head of R&D and the Director of Operations — with the technographic evidence and a proposal: package a native Salesforce bundle so VBV lived inside the CRM, with call activity auto-logged against pipeline. I framed it as a revenue and packaging problem, not a marketing request, pulled engineering into scoping, and that framing is what got it prioritized on the roadmap.",

  audience: [
    { segment: "Enterprise RevOps & Sales Ops leaders", note: "Own the Salesforce instance and the tech stack; the economic buyer on switching cost and data integrity." },
    { segment: "Mid-market VP Sales", note: "Want rep activity captured automatically against pipeline — a productivity and forecast-accuracy play." },
    { segment: "SMB owner-operators", note: "Buy the outcome, not the integration — they needed the simple, native-fit story and fast time-to-value." },
    { segment: "Channel resellers & SIs", note: "Sell into the Salesforce ecosystem daily; needed a tiered, attach-ready SKU to carry." },
  ],

  channels: [
    { name: "ABM", detail: "640-account target list built on technographic + intent signal; orchestrated 1:1 / 1:few / 1:many with multi-threaded plays into the buying committee." },
    { name: "Content", detail: "A single “inside your Salesforce” narrative operationalized into teardown assets, an ROI/TCO calculator, and integration proof for every funnel stage." },
    { name: "Digital / Paid", detail: "Technographic and intent-targeted paid social + search fired on active Salesforce-user signals — efficient, high-fit reach, not spray." },
    { name: "Events / Field", detail: "Salesforce-ecosystem webinars and partner sessions with SEs live on the line to de-risk the technical evaluation." },
    { name: "Sales enablement", detail: "Bundle battlecards, discovery frameworks, and a shared plays board co-owned with AEs so marketing and Sales ran one motion." },
  ],

  // Decision-making & trade-offs — the part Alina specifically wanted.
  tradeoffs: [
    {
      decision: "Fix the offer, not just the funnel",
      chose: "Escalate a product/packaging change to R&D and Ops.",
      cut: "Spending the launch budget on more top-of-funnel volume.",
      why: "Pouring demand into a poor-fit offer just scales the leak. The cheapest, highest-ROI pipeline available was the deals we were already losing on fit.",
    },
    {
      decision: "Lead with the platform, not the product",
      chose: "Position the bundle as an extension of the Salesforce system of record buyers already owned.",
      cut: "The “best cloud phone system” category story.",
      why: "A/B testing proved the native-fit angle beat the feature angle decisively. We sold the thing they wouldn’t have to rip out — lower perceived risk, faster consensus.",
    },
    {
      decision: "Tier the offer to unlock the channel",
      chose: "Stand up Enterprise / Mid-Market / SMB reseller packages under the bundle.",
      cut: "A single flagship SKU sold direct-only.",
      why: "95% Salesforce penetration meant partners could attach it fast. Tiering opened a channel-sourced pipeline lane I couldn’t reach direct — and diversified CAC.",
    },
  ],

  stakeholders: [
    { who: "Head of R&D", role: "Sponsored the native bundle on the roadmap; unblocked engineering capacity." },
    { who: "Director of Operations", role: "Pressure-tested the operational lift, pricing, and packaging feasibility." },
    { who: "Product & Engineering", role: "Scoped and shipped the Salesforce integration I made the case for." },
    { who: "Regional Sales VPs", role: "Co-owned target-account selection and the shared plays board — Sales had skin in the motion." },
    { who: "Revenue Operations", role: "Built the attribution model and the technographic/intent target list with me." },
    { who: "Channel & SI partners", role: "Carried the tiered SKUs into the Salesforce ecosystem as an attach motion." },
  ],

  // A/B test result used by the interactive toggle.
  abTest: {
    control: {
      label: "Control — “The best cloud phone system”",
      angle: "Feature-led. Reliability, call quality, price.",
      ctr: 1.9,
      mqlToSql: 21,
    },
    variant: {
      label: "Variant — “Built inside your Salesforce”",
      angle: "Native-fit led. No rip-and-replace; activity auto-logged to pipeline.",
      ctr: 3.1,
      mqlToSql: 29,
    },
    ctrLift: 64,
    conversionLift: 38,
    takeaway:
      "The native-fit message won on every downstream metric, so I made it the spine of the motion — from paid headlines to nurture to AE talk tracks. One narrative, one funnel, one story the buying committee heard consistently at every touch.",
  },

  // Funnel stages for the animated funnel infographic.
  funnel: [
    { stage: "Target accounts (Salesforce install base)", value: 640, note: "Technographic + intent-qualified ICP" },
    { stage: "Engaged accounts", value: 262, note: "41% account engagement rate" },
    { stage: "MQAs → SQLs", value: 128, note: "Sales-accepted, multi-threaded" },
    { stage: "Opportunities (SQO)", value: 74, note: "Qualified bundle pipeline" },
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
    { value: 12, prefix: "+", suffix: " pts", label: "New-logo win rate", sub: "22% → 34% on bundled opportunities — my single highest-leverage lever on net-new ARR" },
    { value: 27, prefix: "+", suffix: "%", label: "Average contract value", sub: "bundle vs. standalone VBV — richer, stickier deals from a multi-product motion" },
    { value: 14.2, prefix: "$", suffix: "M", label: "Marketing-sourced pipeline", sub: "first-touch attributed to the ABM tier across 3 quarters", decimals: 1 },
    { value: 9.6, prefix: "$", suffix: "M", label: "Channel-sourced pipeline", sub: "net-new lane unlocked by the tiered reseller SKUs I built", decimals: 1 },
    { value: 11, prefix: "", suffix: ":1", label: "ROI on the ABM tier", sub: "7.3:1 blended program — CAC payback under two quarters" },
    { value: 18, prefix: "−", suffix: "%", label: "Sales-cycle compression", sub: "native CRM fit collapsed the evaluation stage; pipeline velocity up" },
  ],

  optimization:
    "I ran this as an always-on revenue program, not a one-time launch. Every week I read win rate by segment and by message, shifted spend from the feature angle to the native-fit angle as the A/B data hardened, and re-tiered the ABM list as intent signals moved. When Enterprise engaged faster than SMB, I rebalanced field and webinar budget toward the mid-market, where the bundle’s payback story compressed the deal cycle hardest — optimizing for pipeline velocity and ROI, not lead volume.",

  contribution:
    "I owned this end-to-end: I found the fit gap in the data, built and escalated the business case to R&D and Ops, defined the bundle’s positioning and tiered packaging, ran the ABM and multi-channel motion, and stood up the attribution model with RevOps. The one thing I didn’t do was write the integration code — I made the commercial case that got it built.",
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
  role: "Owner — strategy, budget, vendor management & execution",
  oneLiner:
    "Invite-only executive roundtables for EMEA financial-services leaders — sourced, negotiated, and run by me — engineered as a pipeline-generation instrument that surfaced the conversations Sales could never buy in a cold sequence.",

  objective:
    "In-market, I needed senior financial-services decision-makers in the room with Sales — the named accounts a demo request would never surface. The commercial objective was never attendance or badge scans; it was qualified, multi-threaded conversations and sales-accepted opportunities with target-list accounts, at a cost-per-opportunity that beat our paid channels.",

  responsibilities: [
    "Set the commercial goal and the pipeline target per event, and built the invite list against Sales’ named accounts.",
    "Sourced and secured venues in-market; matched the room to the seniority of the buying committee I was convening.",
    "Owned and defended the budget line-by-line against pipeline return, not headcount.",
    "Negotiated every vendor and sponsorship contract — venue, AV, catering, and speaking slots.",
    "Landed town-hall and speaking placements for our subject-matter experts to build authority.",
    "Choreographed the follow-up so every attendee had a Sales next step inside 48 hours — protecting the return on the spend.",
  ],

  vendors: [
    { v: "Venues", note: "Private rooms in the financial districts; capacity capped to protect the peer-level tone and the quality of the conversation." },
    { v: "AV & production", note: "Deliberately light — the format was a facilitated conversation, not a stage show." },
    { v: "Catering & hospitality", note: "Chosen to hold executives in the room past the agenda, where the real pipeline conversations happen." },
    { v: "Speaking / sponsorship", note: "Town halls and panels with our SMEs; negotiated into partner events to extend reach efficiently." },
    { v: "PR", note: "Earned coverage engineered around select sessions (specifics withheld for confidentiality)." },
  ],

  // The key adjustment — Alina asked about changes made before/after execution.
  adjustment: {
    before: "A larger panel format — stage, moderator, and 40+ guests optimized for reach.",
    signal: "Event #2 filled the room, but the field-to-pipeline conversion lagged. The big-room format was diluting exactly the intimate conversations Sales needed to multi-thread.",
    after: "I cut it to intimate, invite-only tables of ~14 peers under Chatham House rules.",
    result: "Field-to-meeting conversion roughly doubled. Fewer seats, materially more pipeline per seat — a better-yielding motion.",
  },

  salesSupport:
    "Every table was built around Sales’ actual target accounts, not a general audience. Regional AEs co-owned the invite list, sat at the table, and inherited a warm, briefed, multi-threaded prospect. The program wasn’t a marketing showcase — it was a pipeline-generation instrument Sales helped aim, with shared ownership of the follow-up and the number.",

  metrics: [
    { value: 6, prefix: "", suffix: "", label: "Roundtables delivered", sub: "across 4 EMEA financial-services markets" },
    { value: 14, prefix: "~", suffix: "", label: "Senior execs per table", sub: "invite-only, peer-level buying committee" },
    { value: 68, prefix: "", suffix: "%", label: "Attendee → meeting rate", sub: "field-to-pipeline conversion after the format pivot" },
    { value: 6.8, prefix: "$", suffix: "M", label: "Influenced pipeline", sub: "from 3 flagship events; cost-per-opportunity well under paid benchmarks", decimals: 1 },
    { value: 22, prefix: "", suffix: "", label: "Sales-accepted opportunities", sub: "multi-threaded into named target accounts" },
    { value: 34, prefix: "", suffix: "%", label: "Meeting → opportunity", sub: "conversation quality over volume of badges" },
  ],

  contribution:
    "This was mine to run. I set the commercial goal, sourced the rooms, owned the budget, negotiated the contracts, booked the speaking slots, and designed the follow-up motion. When the data said the big-panel format wasn’t converting to pipeline, I made the call to shrink it — and owned the yield.",
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
  role: "EMEA marketing lead — pre-launch demand generation & localization",
  oneLiner:
    "EMEA had no product availability and no localized assets — effectively nothing to sell until GA. So I built a qualified, warm demand backlog for a product that wasn’t in-market yet, region by region, and converted it into pipeline the day we could sell.",

  objective:
    "I owned EMEA, where the product wasn’t yet available and there were no localized assets — no offer to transact. Rather than wait for GA and cede first-mover advantage, I reframed the objective: enter each market ahead of the product, build a warm, qualified audience of the ICP accounts we’d want on day one, and engineer that anticipation into pipeline the moment the offer went live.",

  strategy: [
    "Identified the top financial-industry accounts per region that were unserved and not actively covered — a clean, high-intent ICP to seed.",
    "Built a multi-drip, geo-targeted GTM awareness motion to manufacture anticipation ahead of availability.",
    "Produced original, region-specific content instead of translating US assets verbatim — localization of meaning, not words.",
    "Stood up a discrete localized landing page per target region — language, currency framing, dates, references, and events tuned to each.",
    "Anchored each region to real local events and roundtables I sponsored (see Case 02) to compound authority and reach.",
    "Aligned the account list and messaging with local Sales so the warm audience converted at launch instead of cooling.",
  ],

  // Interactive region switcher content.
  regions: [
    {
      code: "UK&I",
      name: "United Kingdom & Ireland",
      language: "English (UK)",
      message: "“Ahead of the desk” — positioned around FCA-aware operations and the London financial calendar.",
      channel: "LinkedIn thought-leadership + City roundtables + trade press.",
      event: "London executive roundtable, tied to the autumn financial-services season.",
      localized: "UK spelling, £ pricing framing, GMT scheduling, references to City institutions.",
    },
    {
      code: "DACH",
      name: "Germany · Austria · Switzerland",
      language: "German",
      message: "Precision and compliance-first — I led on risk, control, and data residency before speed.",
      channel: "XING + LinkedIn, Frankfurt field, German-language guides.",
      event: "Frankfurt roundtable aligned to the banking hub’s calendar.",
      localized: "Formal register (Sie), €/CET, GDPR-forward framing, Frankfurt references.",
    },
    {
      code: "BENELUX",
      name: "Netherlands · Belgium · Luxembourg",
      language: "Dutch / English",
      message: "Cross-border, fund-domicile angle — I spoke to Luxembourg’s fund ecosystem and Dutch pragmatism.",
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
    { value: 5, prefix: "", suffix: "", label: "Regional GTM tracks", sub: "each a discrete demand motion with its own narrative and page" },
    { value: 480, prefix: "", suffix: "", label: "Priority ICP accounts engaged", sub: "pre-launch, unserved targets warmed ahead of GA" },
    { value: 73, prefix: "+", suffix: "%", label: "Time-on-page", sub: "localized pages vs. global control — a hard relevance/engagement signal" },
    { value: 3.1, prefix: "", suffix: "×", label: "Faster time-to-first-deal", sub: "in prioritized regions at GA vs. non-prioritized", decimals: 1 },
    { value: 1900, prefix: "", suffix: "", label: "Anticipation waitlist", sub: "warm demand backlog converted at launch" },
    { value: 41, prefix: "+", suffix: "%", label: "Launch reply rate", sub: "warm, localized outreach vs. cold — a pipeline-efficiency lift" },
  ],

  messagingDecisions:
    "The core decision was to localize meaning, not words. US assets led with speed and scale; EMEA financial-services buyers led with control, compliance, and data residency. I rebuilt the value proposition around what each market actually rewarded — then matched language, currency framing, scheduling, references, and events to the region. Verbatim translation would have signaled “foreign vendor.” Local-first signaled “already here” — and that positioning is what earned the engagement lift.",

  contribution:
    "I owned EMEA demand with no product and no assets to start from. I selected the ICP target accounts, architected the multi-region anticipation motion, produced the content, stood up the localized pages and events, and aligned it all with local Sales so the warm audience converted the moment we could transact.",
};

// ─────────────────────────────────────────────────────────────────────────────
// The pivot — how this maps to iDeals (boardroom / advisory mode)
// ─────────────────────────────────────────────────────────────────────────────

export const IDEALS_FIT = {
  title: "Why this maps to iDeals",
  intro:
    "iDeals sells a security-centric platform into high-stakes, sales-led motions — M&A, due diligence, fundraising, and dealmaking, across regulated verticals and multiple regions. That is precisely the terrain I operate in: technical, trust-driven, sales-aligned, and international. Here’s how my track record maps to the mandate.",
  mapping: [
    {
      theirs: "Security-centric SaaS, sold on trust",
      mine: "I’ve sold trust-first, integration-heavy platforms where the real objection is perceived risk, not features — and de-risked it with proof.",
    },
    {
      theirs: "Sales-led, deal-driven revenue",
      mine: "Every program I ran was aimed at pipeline, win rate, and cycle time with Sales co-owning the plays — a bowtie funnel, not MQL vanity.",
    },
    {
      theirs: "Regulated verticals (finance, legal, life sciences)",
      mine: "My EMEA work was financial-services-native: compliance, data residency, and control led the message, not speed.",
    },
    {
      theirs: "Global with regional nuance",
      mine: "I’ve built market-by-market GTM with real localization of meaning — not translated US assets.",
    },
    {
      theirs: "Integrated across content, digital, events, ABM",
      mine: "Case 01 orchestrates all four in a single motion; Case 02 is the field engine; Case 03 is the localized build.",
    },
  ],
  plan: [
    { window: "Days 0–30", focus: "Learn the deal", detail: "Map the ICP, the sales motion, and the exact funnel stages where deals stall. Ride along with AEs. Read win/loss. Baseline the KRs I’ll move." },
    { window: "Days 31–60", focus: "Ship one integrated play", detail: "Pick a vertical, run a tight ABM + content + field motion with Sales co-ownership and clean, first-touch-to-closed attribution." },
    { window: "Days 61–90", focus: "Localize & scale", detail: "Adapt the winning play for a second region or vertical, harden the reporting model, and set the KR baseline for the quarter." },
  ],
};

export const CONTACT_CTA = {
  headline: "Let’s build your first integrated play.",
  body:
    "This portfolio is built to answer the brief — context, trade-offs, stakeholders, my role, and the numbers. The most useful next step is a working session where I map how I’d compress iDeals’ funnel and build the first integrated motion against your pipeline targets.",
};
