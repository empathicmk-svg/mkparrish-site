// ── Consulting (Stripe) ───────────────────────────────────────────────────────
export const STRIPE_EDIT        = "https://buy.stripe.com/14AcMX2Smd29gqB8ra0oM08";
export const STRIPE_REWRITE     = "https://buy.stripe.com/3cI8wHgJcd29b6h36Q0oM00";
export const STRIPE_NEW_CHAPTER = "https://buy.stripe.com/00w28j2Smfahfmx36Q0oM02";
export const STRIPE_BYLINE      = "https://buy.stripe.com/fZu00b9gKbY5eitfTC0oM03";
export const STRIPE_BUILD       = "/book";

// ── Membership (Patreon) ─────────────────────────────────────────────────────
export const PATREON_URL        = "https://www.patreon.com/MKParrish?utm_campaign=creatorshare_fan";

// ── Scheduling ───────────────────────────────────────────────────────────────
export const CALENDLY_URL       = "https://www.calendly.com/mkparrish";

// ── Site ─────────────────────────────────────────────────────────────────────
export const SITE_URL           = "https://www.mkparrish.com";

// ── Gumroad — ebooks & digital products ──────────────────────────────────────
// After creating each product on gumroad.com, replace these with your real product URLs.
// Format: https://mkparrish.gumroad.com/l/PRODUCT-SLUG
export const GUMROAD_BASE       = "https://mkparrish.gumroad.com";
export const GR_INVISIBLE_BRUISE      = "https://mkparrish.gumroad.com/l/invisible-bruise";
export const GR_REINVENTION_WORKBOOK  = "https://mkparrish.gumroad.com/l/reinvention-workbook";
export const GR_WRITE_YOURSELF        = "https://mkparrish.gumroad.com/l/write-yourself-into-the-room";
export const GR_BRAND_VOICE           = "https://mkparrish.gumroad.com/l/brand-voice-playbook";

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

// ── All products (used by shop page) ─────────────────────────────────────────
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
] as const;

export const PRINTS = [
  { title: "Promise Me",     price: "From $22", href: KOFI_PROMISE_ME, sizes: ["8×10","11×14","16×20"] },
  { title: "Mirage",         price: "From $22", href: KOFI_MIRAGE,     sizes: ["8×10","11×14","16×20"] },
  { title: "Selected Lines", price: "From $18", href: KOFI_SELECTED,   sizes: ["5×7","8×10"] },
] as const;

export const SERVICES = [
  { title: "The Edit",        price: "From $100",       tag: "Quick Fix",      href: STRIPE_EDIT },
  { title: "The Rewrite",     price: "From $1,500",     tag: "Most Requested", href: STRIPE_REWRITE },
  { title: "The New Chapter", price: "Custom",          tag: "Full Reset",     href: "/book" },
  { title: "The Byline",      price: "From $1,500/mo",  tag: "Ongoing",        href: STRIPE_BYLINE },
  { title: "The Build",       price: "From $3,500",     tag: "Full Site",      href: STRIPE_BUILD },
] as const;

export const MARGINS_TIERS = [
  { name: "Soft Cover",   price: "$5/mo",  desc: "Weekly essays and strategy notes that never go to the public feed.",                              highlight: false },
  { name: "Marked Up",    price: "$12/mo", desc: "Everything in Soft Cover plus raw frameworks from client work.",                                  highlight: true  },
  { name: "First Edition",price: "$28/mo", desc: "Full access, monthly live Q&A, direct message access, and priority feedback on your own copy.",   highlight: false },
] as const;
