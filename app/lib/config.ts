// ── Consulting (Stripe) ───────────────────────────────────────────────────────
export const STRIPE_EDIT        = "https://buy.stripe.com/14AcMX2Smd29gqB8ra0oM08";
export const STRIPE_REWRITE     = "https://buy.stripe.com/3cI8wHgJcd29b6h36Q0oM00";
export const STRIPE_NEW_CHAPTER = "https://buy.stripe.com/00w28j2Smfahfmx36Q0oM02";
export const STRIPE_BYLINE      = "https://buy.stripe.com/fZu00b9gKbY5eitfTC0oM03";
export const STRIPE_BUILD       = "/book";
export const STRIPE_SESSION     = "/book"; // 1-hr power session — link to Calendly/book when ready
export const STRIPE_AUDIT       = "/book"; // async positioning audit — link to checkout when ready

// ── Growth / Revenue Systems ─────────────────────────────────────────────────
// Replace with Stripe links when ready
export const STRIPE_CONTENT_ENGINE  = "/book"; // LinkedIn Content Engine (from $2,500/mo)
export const STRIPE_INBOUND_SYSTEM  = "/book"; // The Inbound System (from $5,000/mo)
export const STRIPE_REVENUE_SYSTEMS = "/book"; // E2E Revenue Systems (custom)

// ── Production & Media (The Studio) ──────────────────────────────────────────
// Replace with Stripe links when ready
export const STRIPE_SITE     = "/book"; // The Site — website production (from $4,500)
export const STRIPE_HOSTING  = "/book"; // The Upkeep — hosting & maintenance (from $250/mo)
export const STRIPE_SOCIAL   = "/book"; // The Social Suite — complete social package (from $2,000/mo)
export const STRIPE_YOUTUBE  = "/book"; // The Channel — YouTube/video production (from $1,500/video)

// ── Membership (Patreon) ─────────────────────────────────────────────────────
export const PATREON_URL        = "https://www.patreon.com/MKParrish?utm_campaign=creatorshare_fan";

// ── Scheduling ───────────────────────────────────────────────────────────────
export const CALENDLY_URL       = "https://www.calendly.com/mkparrish";

// ── Site ─────────────────────────────────────────────────────────────────────
export const SITE_URL           = "https://www.mkparrish.com";

// ── Gumroad — ebooks & digital products ──────────────────────────────────────
export const GUMROAD_BASE             = "https://mkparrish.gumroad.com";
export const GR_INVISIBLE_BRUISE      = "https://mkparrish.gumroad.com/l/invisible-bruise";
export const GR_REINVENTION_WORKBOOK  = "https://mkparrish.gumroad.com/l/reinvention-workbook";
export const GR_WRITE_YOURSELF        = "https://mkparrish.gumroad.com/l/write-yourself-into-the-room";
export const GR_BRAND_VOICE           = "https://mkparrish.gumroad.com/l/brand-voice-playbook";
export const GR_ANGEL_NUMBERS         = "https://mkparrish.gumroad.com/l/decoding-angel-numbers";
export const GR_THE_VAULT             = "https://mkparrish.gumroad.com/l/the-vault"; // bundle

// ── Gumroad — service companion ebooks ───────────────────────────────────────
export const GR_EDIT_GUIDE            = "https://mkparrish.gumroad.com/l/the-edit-guide";
export const GR_BEFORE_SESSION        = "https://mkparrish.gumroad.com/l/before-the-session";
export const GR_REWRITE_PLAYBOOK      = "https://mkparrish.gumroad.com/l/the-rewrite-playbook";
export const GR_NEW_CHAPTER_WORKBOOK  = "https://mkparrish.gumroad.com/l/the-new-chapter-workbook";
export const GR_BYLINE_METHOD         = "https://mkparrish.gumroad.com/l/the-byline-method";
export const GR_BUILD_COPY_GUIDE      = "https://mkparrish.gumroad.com/l/the-build-copy-guide";
export const GR_SERVICES_VAULT        = "https://mkparrish.gumroad.com/l/the-services-vault";

// ── Products not yet live on Gumroad ─────────────────────────────────────────
// Add a slug here to show "Coming Soon" instead of the buy button.
export const COMING_SOON_SLUGS = new Set<string>();

// ── Ko-fi — prints & merch ───────────────────────────────────────────────────
export const SHOP_URL           = "https://ko-fi.com/mkparrish/shop";
export const KOFI_PROMISE_ME    = "https://ko-fi.com/mkparrish/shop";
export const KOFI_MIRAGE        = "https://ko-fi.com/mkparrish/shop";
export const KOFI_SELECTED      = "https://ko-fi.com/mkparrish/shop";

// ── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT = {
  email:    "mkp414@icloud.com",
  linkedin: "https://www.linkedin.com/in/mkparrish",
  phone:    "347.853.4238",
};

// ── All ebooks / digital products (used by shop page) ────────────────────────
export const EBOOKS = [
  {
    slug:      "invisible-bruise",
    title:     "The Invisible Bruise",
    subtitle:  "Surviving emotional abuse, suffering in silence, and rewriting your life.",
    price:     "$22",
    tag:       "New Release",
    highlight: true,
    href:      GR_INVISIBLE_BRUISE,
    features:  [
      "8 chapters on emotional abuse + recovery",
      "Poetry woven through every chapter",
      "The Rewrite framework for rebuilding identity",
      "Instant PDF download via Gumroad",
    ],
    desc: "For the woman who knows something is wrong but cannot yet prove it. Raw, honest, and written from inside it.",
  },
  {
    slug:      "reinvention-workbook",
    title:     "The Reinvention Workbook",
    subtitle:  "A guided writing workbook for people in the middle of becoming someone new.",
    price:     "$18",
    tag:       "Digital Download",
    highlight: false,
    href:      GR_REINVENTION_WORKBOOK,
    features:  [
      "20 guided writing exercises",
      "The identity audit framework",
      "Voice and narrative prompts",
      "Instant PDF download via Gumroad",
    ],
    desc: "Exercises, prompts, and frameworks pulled from real reinvention — not theory.",
  },
  {
    slug:      "write-yourself-into-the-room",
    title:     "Write Yourself Into the Room",
    subtitle:  "The personal brand writing guide for people tired of sounding like everyone else.",
    price:     "$28",
    tag:       "Best Seller",
    highlight: false,
    href:      GR_WRITE_YOURSELF,
    features:  [
      "The three-layer positioning framework",
      "Bio writing templates + real examples",
      "LinkedIn audit checklist",
      "Instant PDF download via Gumroad",
    ],
    desc: "Learn to write bios, LinkedIn copy, and positioning statements that actually sound like you.",
  },
  {
    slug:      "brand-voice-playbook",
    title:     "The Brand Voice Playbook",
    subtitle:  "Build a brand voice document from scratch.",
    price:     "$35",
    tag:       "Digital Download",
    highlight: false,
    href:      GR_BRAND_VOICE,
    features:  [
      "Full brand voice framework",
      "Tone spectrum mapping",
      "Do/don't vocabulary lists",
      "Complete client example included",
    ],
    desc: "The exact process used with clients — documented so you can run it yourself.",
  },
  {
    slug:      "decoding-angel-numbers",
    title:     "Decoding Angel Numbers",
    subtitle:  "What the numbers are trying to tell you — and how to actually use them.",
    price:     "$15",
    tag:       "New",
    highlight: false,
    href:      GR_ANGEL_NUMBERS,
    features:  [
      "All 10 primary sequences decoded",
      "Written for intelligent, attuned women",
      "Practical guidance for each number",
      "Instant PDF download via Gumroad",
    ],
    desc: "Not a list of cosmic platitudes. A framework for decoding the patterns your intuition has been sending you.",
  },
  {
    slug:      "the-vault",
    title:     "The Vault",
    subtitle:  "Every digital product in one bundle — the complete self-study library.",
    price:     "$97",
    tag:       "Best Value",
    highlight: false,
    href:      GR_THE_VAULT,
    features:  [
      "All 5 ebooks & guides included",
      "The Brand Voice Playbook + Write Yourself Into the Room",
      "The Invisible Bruise + Reinvention Workbook",
      "Decoding Angel Numbers — plus any future releases",
    ],
    desc: "The full library. Every framework, every guide, every word. One price.",
  },
] as const;

// ── Service companion ebooks — DIY versions of each consulting service ────────
export const SERVICE_EBOOKS = [
  {
    slug:      "the-edit-guide",
    title:     "The Edit: DIY Edition",
    subtitle:  "The copy editing framework MK uses with clients — done yourself.",
    price:     "$22",
    tag:       "Self-Serve",
    highlight: false,
    href:      GR_EDIT_GUIDE,
    features:  [
      "Copy audit checklist for any piece of writing",
      "Word-level edits for brand voice alignment",
      "Line-edit framework used in real client work",
      "Instant PDF download via Gumroad",
    ],
    desc: "The same eye MK brings to client copy — translated into a framework you can run yourself. Covers bios, emails, LinkedIn, and landing pages.",
  },
  {
    slug:      "before-the-session",
    title:     "Before the Session",
    subtitle:  "The pre-work that turns a strategy session into something you actually use.",
    price:     "$18",
    tag:       "Strategy Prep",
    highlight: false,
    href:      GR_BEFORE_SESSION,
    features:  [
      "Identity and positioning self-audit",
      "Brand clarity questions (the ones that change how you see yourself)",
      "Goal-setting framework for a 60-minute session",
      "Instant PDF download via Gumroad",
    ],
    desc: "For the woman who books a strategy session and wants to arrive ready. This workbook extracts the clarity before the conversation starts.",
  },
  {
    slug:      "the-rewrite-playbook",
    title:     "The Rewrite Playbook",
    subtitle:  "A self-guided LinkedIn and professional story overhaul — the full thing.",
    price:     "$45",
    tag:       "Deep Work",
    highlight: true,
    href:      GR_REWRITE_PLAYBOOK,
    features:  [
      "Full story audit framework (career, identity, pivot narrative)",
      "LinkedIn profile optimization — every section covered",
      "Bio rewrite templates with real client examples",
      "Positioning statement builder from scratch",
    ],
    desc: "The Rewrite service — packaged as a self-guided process. For the executive, founder, or career-changer who is ready to do the work.",
  },
  {
    slug:      "the-new-chapter-workbook",
    title:     "The New Chapter Workbook",
    subtitle:  "The brand and website repositioning framework — run it yourself.",
    price:     "$35",
    tag:       "Brand Repositioning",
    highlight: false,
    href:      GR_NEW_CHAPTER_WORKBOOK,
    features:  [
      "Brand audit + positioning map",
      "Website copy architecture (page by page)",
      "Voice and messaging clarity framework",
      "Full launch copy checklist",
    ],
    desc: "What it looks like to reposition a brand from the inside out. Exercises, frameworks, and copy prompts for a full reset.",
  },
  {
    slug:      "the-byline-method",
    title:     "The Byline Method",
    subtitle:  "The voice capture and ghostwriting framework — documented for the first time.",
    price:     "$38",
    tag:       "Ghostwriting",
    highlight: false,
    href:      GR_BYLINE_METHOD,
    features:  [
      "Voice capture interview questions (used with every ghostwriting client)",
      "Tone calibration guide across formats",
      "Writing-in-voice framework for consistent output",
      "Editorial calendar templates for ongoing content",
    ],
    desc: "For writers, content leads, and founders who write for others. The exact method used to capture and maintain someone else's voice at scale.",
  },
  {
    slug:      "the-build-copy-guide",
    title:     "The Build: Copy Guide",
    subtitle:  "Every page, every section, every word of a full website — written yourself.",
    price:     "$45",
    tag:       "Website Copy",
    highlight: false,
    href:      GR_BUILD_COPY_GUIDE,
    features:  [
      "Page-by-page copy architecture (home, about, services, contact)",
      "SEO-informed headline and subheadline frameworks",
      "CTA writing guide that converts without pressure tactics",
      "Complete copy review checklist before launch",
    ],
    desc: "The website copy framework behind The Build service. For founders building their first site or relaunching and needing every word to work.",
  },
  {
    slug:      "the-services-vault",
    title:     "The Services Vault",
    subtitle:  "All six service companion guides — the complete DIY consulting library.",
    price:     "$127",
    tag:       "Best Value",
    highlight: false,
    href:      GR_SERVICES_VAULT,
    features:  [
      "All 6 service guides included (every method, every framework)",
      "The Edit + Before the Session + The Rewrite Playbook",
      "The New Chapter + The Byline Method + The Build Copy Guide",
      "Future service guide releases included",
    ],
    desc: "Every consulting framework documented and packaged for self-study. For the woman who is ready to do the full work — on her own timeline.",
  },
] as const;

export const PRINTS = [
  { title: "Promise Me",     price: "From $22", href: KOFI_PROMISE_ME, sizes: ["8×10","11×14","16×20"] },
  { title: "Mirage",         price: "From $22", href: KOFI_MIRAGE,     sizes: ["8×10","11×14","16×20"] },
  { title: "Selected Lines", price: "From $18", href: KOFI_SELECTED,   sizes: ["5×7","8×10"] },
] as const;

export const SERVICES = [
  { title: "The Build",          price: "From $6,000",     tag: "Websites",     href: STRIPE_BUILD },
  { title: "The Outbound Engine", price: "From $2,500/mo", tag: "Outbound",     href: "/book" },
  { title: "Full-Funnel Growth", price: "From $6,500/mo",  tag: "Growth",       href: STRIPE_INBOUND_SYSTEM },
  { title: "The Rewrite",        price: "From $2,500",     tag: "Messaging",    href: STRIPE_REWRITE },
  { title: "The Byline",         price: "From $2,500/mo",  tag: "Ghostwriting", href: STRIPE_BYLINE },
  { title: "The Edit",           price: "From $250",       tag: "Quick Fix",    href: STRIPE_EDIT },
] as const;

export const MARGINS_TIERS = [
  { name: "Soft Cover",    price: "$5/mo",  desc: "Weekly essays and strategy notes that never go to the public feed.",                              highlight: false },
  { name: "Marked Up",     price: "$12/mo", desc: "Everything in Soft Cover plus raw frameworks from client work.",                                  highlight: true  },
  { name: "First Edition", price: "$28/mo", desc: "Full access, monthly live Q&A, direct message access, and priority feedback on your own copy.",   highlight: false },
] as const;
