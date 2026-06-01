// ── Consulting (Stripe) ───────────────────────────────────────────────────────
export const STRIPE_EDIT        = "https://buy.stripe.com/14AcMX2Smd29gqB8ra0oM08";
export const STRIPE_REWRITE     = "https://buy.stripe.com/3cI8wHgJcd29b6h36Q0oM00";
export const STRIPE_NEW_CHAPTER = "https://buy.stripe.com/00w28j2Smfahfmx36Q0oM02";
export const STRIPE_BYLINE      = "https://buy.stripe.com/fZu00b9gKbY5eitfTC0oM03";
export const STRIPE_BUILD       = "https://buy.stripe.com/9B6cMX64ygel4HTazi0oM0f"; // The Build — $6,000 one-time
export const STRIPE_SESSION     = "https://buy.stripe.com/eVqaEPfF86DLa2dcHq0oM0g"; // The Session — $300 one-time
export const STRIPE_AUDIT       = "/book"; // async positioning audit — link to checkout when ready

// ── Growth / Revenue Systems ─────────────────────────────────────────────────
export const STRIPE_OUTBOUND        = "https://buy.stripe.com/28E7sD0Ked295LX22M0oM0e"; // The Outbound Engine — $2,500/mo
export const STRIPE_CONTENT_ENGINE  = "/book"; // (legacy) link to checkout when ready
export const STRIPE_INBOUND_SYSTEM  = "https://buy.stripe.com/eVq5kvdx01jr1vHazi0oM0d"; // Full-Funnel Growth — $6,500/mo
export const STRIPE_REVENUE_SYSTEMS = "/book"; // Fractional Growth Lead (custom)

// ── Production & Media (The Studio) ──────────────────────────────────────────
// Replace with Stripe links when ready
export const STRIPE_SITE     = "/book"; // (legacy) The Site — merged into The Build
export const STRIPE_HOSTING  = "https://buy.stripe.com/9B614fgJc0fn5LXcHq0oM0j"; // The Upkeep — $300/mo
export const STRIPE_SOCIAL   = "https://buy.stripe.com/5kQ28j3Wqd29cal0YI0oM0k"; // The Social Suite — $2,000/mo
export const STRIPE_YOUTUBE  = "https://buy.stripe.com/9B6fZ9gJc2nveit36Q0oM0l"; // The Channel — $1,500/video

// ── Membership (Substack + Stripe) ───────────────────────────────────────────
// Substack handles paid membership checkout through the connected Stripe account.
export const SUBSTACK_URL           = "https://mkparrishthemargins.substack.com";
export const SUBSTACK_SUBSCRIBE_URL = `${SUBSTACK_URL}/subscribe`;
export const MEMBERSHIP_URL         = SUBSTACK_SUBSCRIBE_URL;

// Legacy alias for existing membership CTAs. Prefer MEMBERSHIP_URL in new code.
export const PATREON_URL            = MEMBERSHIP_URL;

// ── Scheduling ───────────────────────────────────────────────────────────────
export const CALENDLY_URL       = "https://www.calendly.com/mkparrish";

// ── Site ─────────────────────────────────────────────────────────────────────
export const SITE_URL           = "https://www.mkparrish.com";

// ── Products not yet live ────────────────────────────────────────────────────
// Add a slug here to show "Coming Soon" instead of the buy button.
export const COMING_SOON_SLUGS = new Set<string>();

// ── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT = {
  email:    "mkp414@icloud.com",
  linkedin: "https://www.linkedin.com/in/mkparrish",
  phone:    "347.853.4238",
};

// ── All ebooks / digital products (used by shop page) ────────────────────────
export const EBOOKS = [
  {
    slug:      "reinvention-workbook",
    title:     "The Reinvention Workbook",
    subtitle:  "A guided writing workbook for people in the middle of becoming someone new.",
    price:     "$18",
    tag:       "Digital Download",
    highlight: false,
    free:      true,
    download:  "/downloads/ebooks/reinvention-workbook.pdf",
    href:      "/downloads/ebooks/reinvention-workbook.pdf",
    features:  [
      "20 guided writing exercises",
      "The identity audit framework",
      "Voice and narrative prompts",
      "Instant download",
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
    free:      false,
    download:  "/downloads/ebooks/write-yourself-into-the-room.pdf",
    stripe:    "https://buy.stripe.com/00waEY9Qd1PygLa8OV8AE00",
    href:      "https://buy.stripe.com/00waEY9Qd1PygLa8OV8AE00",
    features:  [
      "The three-layer positioning framework",
      "Bio writing templates + real examples",
      "LinkedIn audit checklist",
      "Instant download",
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
    free:      false,
    download:  "/downloads/ebooks/brand-voice-playbook.pdf",
    stripe:    "https://buy.stripe.com/3cI28s4vTbq83Yo5CJ8AE01",
    href:      "https://buy.stripe.com/3cI28s4vTbq83Yo5CJ8AE01",
    features:  [
      "Full brand voice framework",
      "Tone spectrum mapping",
      "Do/don't vocabulary lists",
      "Complete client example included",
    ],
    desc: "The exact process used with clients — documented so you can run it yourself.",
  },
  {
    slug:      "the-vault",
    title:     "The Vault",
    subtitle:  "Every digital product in one bundle — the complete self-study library.",
    price:     "$97",
    tag:       "Best Value",
    highlight: false,
    free:      false,
    stripe:    "https://buy.stripe.com/9B69AUfax0Lu1Qgc178AE02",
    href:      "https://buy.stripe.com/9B69AUfax0Lu1Qgc178AE02",
    features:  [
      "All 3 ebooks & guides included",
      "The Brand Voice Playbook + Write Yourself Into the Room",
      "The Reinvention Workbook — plus any future releases",
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
    free:      false,
    download:  "/downloads/templates/the-edit-diy.pdf",
    stripe:    "https://buy.stripe.com/cNi9AUe6tcuc2Uk6GN8AE03",
    href:      "https://buy.stripe.com/cNi9AUe6tcuc2Uk6GN8AE03",
    features:  [
      "Copy audit checklist for any piece of writing",
      "Word-level edits for brand voice alignment",
      "Line-edit framework used in real client work",
      "Instant download",
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
    free:      false,
    download:  "/downloads/templates/before-the-session.pdf",
    stripe:    "https://buy.stripe.com/cNieVe8M91Py2Uk5CJ8AE04",
    href:      "https://buy.stripe.com/cNieVe8M91Py2Uk5CJ8AE04",
    features:  [
      "Identity and positioning self-audit",
      "Brand clarity questions (the ones that change how you see yourself)",
      "Goal-setting framework for a 60-minute session",
      "Instant download",
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
    free:      false,
    download:  "/downloads/templates/the-rewrite-playbook.pdf",
    stripe:    "https://buy.stripe.com/5kQ4gAbYl79S3Yo7KR8AE05",
    href:      "https://buy.stripe.com/5kQ4gAbYl79S3Yo7KR8AE05",
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
    free:      false,
    download:  "/downloads/templates/the-new-chapter-workbook.pdf",
    stripe:    "https://buy.stripe.com/9B69AUe6tfGobqQ2qx8AE06",
    href:      "https://buy.stripe.com/9B69AUe6tfGobqQ2qx8AE06",
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
    free:      false,
    download:  "/downloads/templates/the-byline-method.pdf",
    stripe:    "https://buy.stripe.com/cNibJ2aUh8dWamMd5b8AE07",
    href:      "https://buy.stripe.com/cNibJ2aUh8dWamMd5b8AE07",
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
    free:      false,
    download:  "/downloads/templates/the-build-copy-guide.pdf",
    stripe:    "https://buy.stripe.com/5kQ9AU8M9gKseD2aX38AE08",
    href:      "https://buy.stripe.com/5kQ9AU8M9gKseD2aX38AE08",
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
    free:      false,
    stripe:    "https://buy.stripe.com/aFa14ogeBam452s0ip8AE09",
    href:      "https://buy.stripe.com/aFa14ogeBam452s0ip8AE09",
    features:  [
      "All 6 service guides included (every method, every framework)",
      "The Edit + Before the Session + The Rewrite Playbook",
      "The New Chapter + The Byline Method + The Build Copy Guide",
      "Future service guide releases included",
    ],
    desc: "Every consulting framework documented and packaged for self-study. For the woman who is ready to do the full work — on her own timeline.",
  },
] as const;

// Prints sell via Stripe. Add the buy.stripe.com link to `stripe` when created.
export const PRINTS = [
  { title: "Promise Me",     price: "From $22", stripe: "https://buy.stripe.com/aFaeVe4vT65O1Qgghn8AE0a", sizes: ["8×10","11×14","16×20"] },
  {
    title:   "The Rewrite",
    price:   "From $22",
    stripe:  "https://buy.stripe.com/cNi6oIbYl9i0bqQc178AE0b",
    sizes:   ["8×10","11×14","16×20"],
    preview: "I picked up the pen and I felt the world shift / the weight of a lifetime becoming a gift.",
  },
  { title: "Selected Lines", price: "From $18", stripe: "https://buy.stripe.com/fZubJ2geB3XGamMaX38AE0c", sizes: ["5×7","8×10"] },
] as const;

export const SERVICES = [
  { title: "The Build",          price: "From $6,000",     tag: "Websites",     href: STRIPE_BUILD },
  { title: "The Outbound Engine", price: "From $2,500/mo", tag: "Outbound",     href: STRIPE_OUTBOUND },
  { title: "Full-Funnel Growth", price: "From $6,500/mo",  tag: "Growth",       href: STRIPE_INBOUND_SYSTEM },
  { title: "The Rewrite",        price: "From $2,500",     tag: "Messaging",    href: STRIPE_REWRITE },
  { title: "The Byline",         price: "From $2,500/mo",  tag: "Ghostwriting", href: STRIPE_BYLINE },
  { title: "The Edit",           price: "From $250",       tag: "Quick Fix",    href: STRIPE_EDIT },
] as const;

export const MARGINS_TIERS = [
  { name: "The Free List",   price: "Free",    desc: "The public essays, the poetry, and a monthly strategy note — straight to your inbox.",                               highlight: false },
  { name: "The Margins",     price: "$9/mo",   desc: "The full archive plus weekly frameworks pulled from real client work, positioning teardowns, and voice & copy templates. Or $90/yr.", highlight: true  },
  { name: "Founding Member", price: "$300/yr", desc: "Everything in The Margins, plus quarterly live office hours, direct-message access, and priority feedback on your own copy.", highlight: false },
] as const;
