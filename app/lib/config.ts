// ── Consulting (Stripe) ───────────────────────────────────────────────────────
export const STRIPE_EDIT        = "https://buy.stripe.com/14AcMX2Smd29gqB8ra0oM08";
export const STRIPE_REWRITE     = "https://buy.stripe.com/3cI8wHgJcd29b6h36Q0oM00";
export const STRIPE_NEW_CHAPTER = "https://buy.stripe.com/00w28j2Smfahfmx36Q0oM02";
export const STRIPE_BYLINE      = "https://buy.stripe.com/fZu00b9gKbY5eitfTC0oM03";
export const STRIPE_BUILD       = "/book";
export const STRIPE_SESSION     = "/book"; // 1-hr power session — link to Calendly/book when ready
export const STRIPE_AUDIT       = "/book"; // async positioning audit — link to checkout when ready

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

// ── Gumroad — Scripture & Strategy ebooks ────────────────────────────────────
export const GR_THE_STUDY             = "https://mkparrish.gumroad.com/l/the-study";
export const GR_GOSPEL_AND_GRIND      = "https://mkparrish.gumroad.com/l/gospel-and-grind";
export const GR_SERMON_NOTES          = "https://mkparrish.gumroad.com/l/the-sermon-notes";
export const GR_CALLING_CARD          = "https://mkparrish.gumroad.com/l/the-calling-card";
export const GR_MINISTRY_MONETIZED    = "https://mkparrish.gumroad.com/l/ministry-monetized";
export const GR_SCRIPTURE_BUNDLE      = "https://mkparrish.gumroad.com/l/scripture-strategy-bundle";

// ── Products not yet live on Gumroad ─────────────────────────────────────────
// Remove a slug from this set once the Gumroad product URL is live.
export const COMING_SOON_SLUGS = new Set([
  "the-edit-guide",
  "before-the-session",
  "the-rewrite-playbook",
  "the-new-chapter-workbook",
  "the-byline-method",
  "the-build-copy-guide",
  "the-services-vault",
  "the-study",
  "gospel-and-grind",
  "the-sermon-notes",
  "the-calling-card",
  "ministry-monetized",
  "scripture-strategy-bundle",
]);

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

// ── Scripture & Strategy — Bible study ebook brand ───────────────────────────
export const SCRIPTURE_EBOOKS = [
  {
    slug:      "the-study",
    title:     "The Study",
    subtitle:  "A modern guide to building a Bible study practice that actually sticks — on your own terms.",
    price:     "$18",
    tag:       "Start Here",
    highlight: true,
    href:      GR_THE_STUDY,
    features:  [
      "5 Bible study methods decoded (no seminary required)",
      "Daily and weekly study templates",
      "No-church-required, no-guilt-required approach",
      "Instant PDF download via Gumroad",
    ],
    desc: "For the woman who wants to study Scripture but has never found a method that fits her brain, her schedule, or her skepticism. This is the entry point.",
  },
  {
    slug:      "gospel-and-grind",
    title:     "Gospel & Grind",
    subtitle:  "Build a profitable practice grounded in what you believe — without feeling like you're selling your faith.",
    price:     "$28",
    tag:       "Faith + Business",
    highlight: false,
    href:      GR_GOSPEL_AND_GRIND,
    features:  [
      "Faith-to-brand alignment framework",
      "Monetization without manipulation guide",
      "Values-based positioning for faith entrepreneurs",
      "Instant PDF download via Gumroad",
    ],
    desc: "For the faith-driven entrepreneur who wants income and integrity in the same sentence. How to build something real without watering yourself down.",
  },
  {
    slug:      "the-sermon-notes",
    title:     "The Sermon Notes",
    subtitle:  "Turn your personal Bible study into content your audience wants — and that you can charge for.",
    price:     "$25",
    tag:       "Content Creation",
    highlight: false,
    href:      GR_SERMON_NOTES,
    features:  [
      "Study-to-content pipeline (how one passage becomes a month of material)",
      "12 content format templates for faith creators",
      "Email, social, and course conversion frameworks",
      "Instant PDF download via Gumroad",
    ],
    desc: "What you study privately does not have to stay private. A complete system for turning your own Scripture practice into shareable, sellable content.",
  },
  {
    slug:      "the-calling-card",
    title:     "The Calling Card",
    subtitle:  "Build a faith-informed brand voice that connects, converts, and stays true to who you are.",
    price:     "$35",
    tag:       "Brand Voice",
    highlight: false,
    href:      GR_CALLING_CARD,
    features:  [
      "Faith brand voice framework (full build from scratch)",
      "Audience language mapping for faith-based markets",
      "Platform-specific voice calibration guide",
      "Complete annotated brand voice example included",
    ],
    desc: "The Brand Voice Playbook — reimagined for faith content creators, teachers, and coaches who need their words to reflect their values and move people to act.",
  },
  {
    slug:      "ministry-monetized",
    title:     "Ministry, Monetized",
    subtitle:  "Launch, grow, and charge for your Bible study community — without losing the calling in the process.",
    price:     "$42",
    tag:       "Revenue Strategy",
    highlight: false,
    href:      GR_MINISTRY_MONETIZED,
    features:  [
      "Community launch playbook (from zero to paying members)",
      "Pricing and positioning guide for faith-based offerings",
      "Membership tier framework for Bible study groups",
      "Launch copy templates that lead with mission, not money",
    ],
    desc: "The playbook for women who have been giving their Bible study away for free and are ready to build something sustainable around it.",
  },
  {
    slug:      "scripture-strategy-bundle",
    title:     "The Scripture & Strategy Bundle",
    subtitle:  "All five Scripture & Strategy ebooks — the complete faith-to-income library.",
    price:     "$97",
    tag:       "Complete Library",
    highlight: false,
    href:      GR_SCRIPTURE_BUNDLE,
    features:  [
      "All 5 Scripture & Strategy ebooks included",
      "The Study + Gospel & Grind + The Sermon Notes",
      "The Calling Card + Ministry, Monetized",
      "Future Scripture & Strategy releases included",
    ],
    desc: "From first study to full income. Every framework in the Scripture & Strategy collection — for the woman ready to build her faith practice into something that pays.",
  },
] as const;

export const PRINTS = [
  { title: "Promise Me",     price: "From $22", href: KOFI_PROMISE_ME, sizes: ["8×10","11×14","16×20"] },
  { title: "Mirage",         price: "From $22", href: KOFI_MIRAGE,     sizes: ["8×10","11×14","16×20"] },
  { title: "Selected Lines", price: "From $18", href: KOFI_SELECTED,   sizes: ["5×7","8×10"] },
] as const;

export const SERVICES = [
  { title: "The Edit",        price: "From $100",       tag: "Quick Fix",      href: STRIPE_EDIT },
  { title: "The Session",     price: "$250",             tag: "Power Hour",     href: STRIPE_SESSION },
  { title: "The Rewrite",     price: "From $1,500",     tag: "Most Requested", href: STRIPE_REWRITE },
  { title: "The New Chapter", price: "Custom",           tag: "Full Reset",     href: "/book" },
  { title: "The Byline",      price: "From $1,500/mo",  tag: "Ongoing",        href: STRIPE_BYLINE },
  { title: "The Build",       price: "From $3,500",     tag: "Full Site",      href: STRIPE_BUILD },
] as const;

export const MARGINS_TIERS = [
  { name: "Soft Cover",    price: "$5/mo",  desc: "Weekly essays and strategy notes that never go to the public feed.",                              highlight: false },
  { name: "Marked Up",     price: "$12/mo", desc: "Everything in Soft Cover plus raw frameworks from client work.",                                  highlight: true  },
  { name: "First Edition", price: "$28/mo", desc: "Full access, monthly live Q&A, direct message access, and priority feedback on your own copy.",   highlight: false },
] as const;
