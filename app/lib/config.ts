// ── Consulting (Stripe) ───────────────────────────────────────────────────────
export const STRIPE_EDIT        = "https://buy.stripe.com/14AcMX2Smd29gqB8ra0oM08";
export const STRIPE_REWRITE     = "https://buy.stripe.com/3cI8wHgJcd29b6h36Q0oM00";
export const STRIPE_NEW_CHAPTER = "https://buy.stripe.com/00w28j2Smfahfmx36Q0oM02";
export const STRIPE_BYLINE      = "https://buy.stripe.com/fZu00b9gKbY5eitfTC0oM03";
export const STRIPE_BUILD       = "https://buy.stripe.com/9B6cMX64ygel4HTazi0oM0f"; // The Build — $6,000 one-time
export const STRIPE_SESSION     = "https://buy.stripe.com/eVqaEPfF86DLa2dcHq0oM0g"; // The Session — $300 one-time
export const STRIPE_AUDIT       = "https://buy.stripe.com/9B64gA2nL51KamMaX38AE0e"; // The 48-Hour Positioning Audit — $97 (intake collected at checkout)

// ── Growth / Revenue Systems ─────────────────────────────────────────────────
export const STRIPE_OUTBOUND        = "https://buy.stripe.com/28E7sD0Ked295LX22M0oM0e"; // The Outbound Engine — $2,500/mo
export const STRIPE_CONTENT_ENGINE  = STRIPE_BYLINE; // LinkedIn Content Engine now routes to The Byline checkout
export const STRIPE_INBOUND_SYSTEM  = "https://buy.stripe.com/eVq5kvdx01jr1vHazi0oM0d"; // Full-Funnel Growth — $6,500/mo
export const STRIPE_REVENUE_SYSTEMS = STRIPE_INBOUND_SYSTEM; // Legacy alias; custom growth work books a call

// ── Production & Media (The Studio) ──────────────────────────────────────────
export const STRIPE_SITE     = STRIPE_BUILD; // The Site merged into The Build
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
export const BOOK_CALL_URL      = "/book";

// ── Amazon author page (books on Kindle + paperback) ─────────────────────────
export const AMAZON_AUTHOR_URL  = "https://www.amazon.com/author/mkparrish";

// ── Products not yet live ────────────────────────────────────────────────────
// Add a slug here to show "Coming Soon" instead of the buy button.
export const COMING_SOON_SLUGS = new Set<string>([]);

// ── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT = {
  email:    "mkp414@icloud.com",
  linkedin: "https://www.linkedin.com/in/mkparrish",
  phone:    "347.853.4238",
};

// ── Social links ─────────────────────────────────────────────────────────────
// Rendered as petal-pink chips with black text in the footer.
export const SOCIALS = [
  { label: "Instagram", handle: "@mk_parrish", href: "https://www.instagram.com/mk_parrish" },
  { label: "Substack",  handle: "The Margins", href: SUBSTACK_URL },
  { label: "LinkedIn",  handle: "/in/mkparrish", href: "https://www.linkedin.com/in/mkparrish" },
  { label: "Amazon",    handle: "Author Page", href: AMAZON_AUTHOR_URL },
];

// ── All ebooks / digital products (used by shop page) ────────────────────────
export const EBOOKS = [
  {
    slug:      "the-bio-teardown",
    title:     "The Bio Teardown",
    subtitle:  "5 LinkedIn headlines, rewritten — and the one formula behind every fix.",
    price:     "Free",
    tag:       "Free · Start Here",
    highlight: true,
    free:      true,
    download:  "/downloads/lead-magnets/the-bio-teardown.pdf",
    href:      "/shop/the-bio-teardown",
    features:  [
      "5 real before/after headline rewrites",
      "The WHO → OUTCOME → EDGE formula",
      "A quick win you can copy in 5 minutes",
      "Instant free download — no payment",
    ],
    desc: "The free front door to the Shelf. Five LinkedIn headlines torn down and rewritten, plus the single formula behind every fix — then the 15-minute path to fixing your whole profile.",
  },
  {
    slug:      "the-sentence-that-sells",
    title:     "The Sentence That Sells",
    subtitle:  "A small book for making the offer obvious before you touch the funnel.",
    price:     "Free",
    tag:       "Free · Mini Book",
    highlight: false,
    free:      true,
    download:  "/downloads/ebooks/the-sentence-that-sells.pdf",
    href:      "/download/the-sentence-that-sells",
    features:  [
      "The four jobs of a selling sentence",
      "A translation test for unclear offers",
      "A rewrite drill for sharper positioning",
      "Instant PDF + EPUB download",
    ],
    desc: "A practical mini-book for turning a vague offer into one clean sentence: who it is for, what changes, why now, and why this way.",
  },
  {
    slug:      "evidence-not-vibes",
    title:     "Evidence, Not Vibes",
    subtitle:  "Turn proof into trust without sounding like a case study robot.",
    price:     "Free",
    tag:       "Free · Mini Book",
    highlight: false,
    free:      true,
    download:  "/downloads/ebooks/evidence-not-vibes.pdf",
    href:      "/download/evidence-not-vibes",
    features:  [
      "Five proof types every offer needs",
      "A proof-bank system for client work",
      "Ways to place proof where buyer fear appears",
      "Instant PDF + EPUB download",
    ],
    desc: "A field guide for replacing vague credibility with evidence buyers can inspect: outcomes, process, taste, proximity, and public proof.",
  },
  {
    slug:      "the-quiet-launch",
    title:     "The Quiet Launch",
    subtitle:  "Sell without turning your audience into a countdown timer.",
    price:     "Free",
    tag:       "Free · Mini Book",
    highlight: false,
    free:      true,
    download:  "/downloads/ebooks/the-quiet-launch.pdf",
    href:      "/download/the-quiet-launch",
    features:  [
      "The three assets every quiet launch needs",
      "A seven-day launch sequence",
      "Simple ways to make the first buyer safer",
      "Instant PDF + EPUB download",
    ],
    desc: "A short, practical launch book for selling a useful offer with clarity, repetition, and taste instead of manufactured urgency.",
  },
  {
    slug:      "rebecoming",
    title:     "REBECOMING: From Fear to Faith",
    subtitle:  "A memoir about losing your fear without losing yourself.",
    price:     "$39",
    tag:       "The Memoir",
    highlight: true,
    free:      false,
    download:  "/downloads/ebooks/rebecoming.pdf",
    stripe:    "https://buy.stripe.com/cNi4gAbYl65OamM6GN8AE0s",
    href:      "https://buy.stripe.com/cNi4gAbYl65OamM6GN8AE0s",
    // Paperback via Lulu print-on-demand (sold direct, you keep the margin).
    // href is the Lulu storefront product URL — added once the title is uploaded.
    paperback: { price: "$39", href: "https://buy.stripe.com/4gMdRageBcuceD25CJ8AE0l" },
    features:  [
      "A present-tense memoir in thirteen chapters",
      "Woven through with Scripture, the saints, and the Blessed Mother",
      "On fear, faith, prayer, and rebecoming yourself",
      "Complete PDF + Kindle-ready EPUB",
    ],
    desc: "MK Parrish's flagship memoir, now expanded to thirteen present-tense chapters and woven through with Scripture, the saints, and the Blessed Mother. A vivid story about fear, faith, prayer, friendship, and the eleven minutes it took to walk through a door she was sure was not for her, and about becoming the latest model of the person she always was.",
  },
  {
    slug:      "still-here-still-hers",
    title:     "Still Here, Still Hers",
    subtitle:  "Essays on losing yourself, surviving the in-between, and learning to belong to your own life.",
    price:     "$29",
    tag:       "The In-Between",
    highlight: true,
    free:      false,
    download:  "/downloads/ebooks/still-here-still-hers.pdf",
    stripe:    "https://buy.stripe.com/14A8wQ5zXfGo8eE6GN8AE0C",
    href:      "https://buy.stripe.com/14A8wQ5zXfGo8eE6GN8AE0C",
    paperback: { price: "$44", href: "https://buy.stripe.com/fZufZi4vTcucamM6GN8AE0D" },
    features:  [
      "Intimate personal essays from the in-between",
      "On grief, heartbreak, father loss, body shame, and rebuilding",
      "Complete PDF + Kindle-ready EPUB",
      "Cover PDF/JPG included for KDP upload prep",
    ],
    desc: "For the woman who is not healed yet, but is tired of abandoning herself while she waits. A raw essay collection about surviving the in-between and still belonging to your own life.",
  },
  {
    slug:      "street-smarts",
    title:     "Street Smarts",
    subtitle:  "What my father taught me in 1,109 texts.",
    price:     "$39",
    tag:       "Memoir",
    highlight: true,
    free:      false,
    download:  "/downloads/ebooks/street-smarts.pdf",
    stripe:    "https://buy.stripe.com/3cI00k4vT3XG52s2qx8AE0E",
    href:      "https://buy.stripe.com/3cI00k4vT3XG52s2qx8AE0E",
    paperback: { price: "$54", href: "https://buy.stripe.com/bJe28s9QddygdyYe9f8AE0F" },
    features:  [
      "A father, a daughter, and an education that came too late",
      "The 1,109 texts, read back like scripture",
      "Complete PDF + Kindle-ready EPUB",
      "Lulu-ready 6 x 9 paperback interior + wrap cover",
    ],
    desc: "A raw, luminous memoir about the eleven months that finally gave MK a father after twenty-five years of silence, the texts she now reads like scripture, and the long climb from merely existing back into a life.",
  },
  {
    slug:      "make-my-own-light",
    title:     "Make My Own Light",
    subtitle:  "Poems from the dark, and the turning toward.",
    price:     "$29",
    tag:       "Poetry",
    highlight: true,
    free:      false,
    download:  "/downloads/ebooks/make-my-own-light.pdf",
    stripe:    "https://buy.stripe.com/cNieVee6t3XG0Mcc178AE0G",
    href:      "https://buy.stripe.com/cNieVee6t3XG0Mcc178AE0G",
    paperback: { price: "$44", href: "https://buy.stripe.com/fZu7sM0fD2TC9iI7KR8AE0H" },
    features:  [
      "Confessional poems on grief, fear, faith, and survival",
      "From free-falling to making your own light",
      "Complete PDF + Kindle-ready EPUB",
      "Lulu-ready 6 x 9 paperback interior + wrap cover",
    ],
    desc: "A fierce poetry collection from the dark and the turning toward it. Poems on loss, survival, and the decision to stop waiting for someone else to light the way.",
  },
  {
    slug:      "the-meantime",
    title:     "The Meantime",
    subtitle:  "A memoir on society's clock, the myth of falling behind, and finding peace while everything falls into place.",
    price:     "$29",
    tag:       "Memoir",
    highlight: true,
    free:      false,
    download:  "/downloads/ebooks/the-meantime.pdf",
    href:      "/checkout/the-meantime",
    paperback: { price: "$44", href: "/checkout/the-meantime?format=paperback" },
    features:  [
      "A reflective memoir on feeling behind and finding peace",
      "Stoicism, Kierkegaard, Nietzsche, Frankl & Rilke woven throughout",
      "Grounded in the research on the social clock, comparison & impermanence",
      "Complete PDF + Kindle-ready EPUB, plus Lulu-ready 6 x 9 paperback files",
    ],
    desc: "For anyone measuring their life against a clock they never chose to wind. The Meantime takes apart the myth of falling behind — weaving Stoic philosophy and the research on comparison and impermanence into a quiet, strategic case that the season you're in is temporary, already moving, and, in a time that isn't the clock's time, falling into place.",
  },
  {
    slug:      "the-invisible-bruise",
    title:     "The Invisible Bruise",
    subtitle:  "Surviving emotional abuse, suffering in silence, and rewriting your life.",
    price:     "$39",
    tag:       "Survival & Healing",
    highlight: false,
    free:      false,
    download:  "/downloads/ebooks/the-invisible-bruise.pdf",
    stripe:    "https://buy.stripe.com/8x25kE7I5bq8dyYaX38AE0I",
    href:      "https://buy.stripe.com/8x25kE7I5bq8dyYaX38AE0I",
    paperback: { price: "$54", href: "https://buy.stripe.com/9B6cN62nL8dWgLad5b8AE0J" },
    features:  [
      "Emotional abuse named plainly and compassionately",
      "Gaslighting, silence, and the theft of your reality",
      "Complete PDF + Kindle-ready EPUB",
      "Lulu-ready 6 x 9 paperback interior + wrap cover",
    ],
    desc: "A clear-eyed guide for anyone who has survived emotional abuse: naming what happened, understanding why you stayed quiet, and rewriting your life one true line forward.",
  },
  {
    slug:      "decoding-angel-numbers",
    title:     "Decoding Angel Numbers",
    subtitle:  "A skeptic's guide to spiritual curiosity.",
    price:     "$29",
    tag:       "Spiritual Curiosity",
    highlight: false,
    free:      false,
    download:  "/downloads/ebooks/decoding-angel-numbers.pdf",
    stripe:    "https://buy.stripe.com/fZu00k5zX51K2Ukghn8AE0K",
    href:      "https://buy.stripe.com/fZu00k5zX51K2Ukghn8AE0K",
    paperback: { price: "$44", href: "https://buy.stripe.com/bJe28s3rP9i00Mcfdj8AE0L" },
    features:  [
      "A grounded framework for the patterns you notice",
      "Discernment without superstition or dismissal",
      "Complete PDF + Kindle-ready EPUB",
      "Lulu-ready 6 x 9 paperback interior + wrap cover",
    ],
    desc: "A grounded guide for spiritually curious readers who keep noticing patterns and want a better way to pay attention without handing over their common sense.",
  },
  {
    slug:      "the-linkedin-bio-fix-kit",
    title:     "The LinkedIn Bio Fix Kit",
    subtitle:  "Fix the first thing everyone reads about you — in fifteen minutes.",
    price:     "$9",
    tag:       "Start Here · $9",
    highlight: false,
    free:      false,
    download:  "/downloads/templates/the-linkedin-bio-fix-kit.pdf",
    stripe:    "https://buy.stripe.com/bJe6oI5zXbq852s3uB8AE0f",
    href:      "https://buy.stripe.com/bJe6oI5zXbq852s3uB8AE0f",
    features:  [
      "3 headline formulas + a fill-in About template",
      "15 swipe-file opening lines you can steal",
      "The banned-words list + a 15-minute checklist",
      "Instant download — PDF + EPUB",
    ],
    desc: "The fastest fix on the Shelf. Rewrite your LinkedIn headline and About in 15 minutes with copy-paste formulas, templates, and swipe lines. Your $9 front door to everything else.",
  },
  {
    slug:      "reinvention-workbook",
    title:     "The Reinvention Workbook",
    subtitle:  "A guided writing workbook for people in the middle of becoming someone new.",
    price:     "$29",
    tag:       "Workbook",
    highlight: false,
    free:      false,
    download:  "/downloads/ebooks/reinvention-workbook.pdf",
    stripe:    "https://buy.stripe.com/14A9AUe6t65O9iIe9f8AE0k",
    href:      "https://buy.stripe.com/14A9AUe6t65O9iIe9f8AE0k",
    paperback: { price: "$34", href: "https://buy.stripe.com/8x27sM4vTfGo2Ukc178AE0o" },
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
    price:     "$39",
    tag:       "Best Seller",
    highlight: false,
    free:      false,
    download:  "/downloads/ebooks/write-yourself-into-the-room.pdf",
    stripe:    "https://buy.stripe.com/14AeVefax3XGdyY5CJ8AE0i",
    href:      "https://buy.stripe.com/14AeVefax3XGdyY5CJ8AE0i",
    paperback: { price: "$44", href: "https://buy.stripe.com/6oUaEY3rPcuc66w6GN8AE0m" },
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
    price:     "$45",
    tag:       "Digital Download",
    highlight: false,
    free:      false,
    download:  "/downloads/ebooks/brand-voice-playbook.pdf",
    stripe:    "https://buy.stripe.com/9B6bJ27I5bq8fH6aX38AE0j",
    href:      "https://buy.stripe.com/9B6bJ27I5bq8fH6aX38AE0j",
    paperback: { price: "$49", href: "https://buy.stripe.com/6oU7sM5zXeCkamM3uB8AE0n" },
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
    compareAt: "$317",
    tag:       "Best Value",
    highlight: true,
    free:      false,
    download:  "/downloads/the-vault.pdf",
    stripe:    "https://buy.stripe.com/9B69AUfax0Lu1Qgc178AE02",
    href:      "https://buy.stripe.com/9B69AUfax0Lu1Qgc178AE02",
    features:  [
      "The complete writing-and-identity library in one purchase",
      "The Brand Voice Playbook + Write Yourself Into the Room",
      "The Reinvention Workbook + healing and voice guides",
      "ZIP bundle + future library releases included",
    ],
    desc: "The highest-leverage way to buy the Shelf: every writing, voice, identity, and healing framework in one library, bundled below the individual price.",
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
    cover:     "/downloads/covers/the-edit-diy-cover.jpg",
    stripe:    "https://buy.stripe.com/cNi9AUe6tcuc2Uk6GN8AE03",
    href:      "https://buy.stripe.com/cNi9AUe6tcuc2Uk6GN8AE03",
    paperback: { price: "$29", href: "https://buy.stripe.com/00w3cw6E18dW52s8OV8AE0t" },
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
    paperback: { price: "$26", href: "https://buy.stripe.com/eVq7sM4vT3XG3YoaX38AE0u" },
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
    paperback: { price: "$52", href: "https://buy.stripe.com/9B63cw6E1gKseD2d5b8AE0v" },
    features:  [
      "Full story audit framework (career, identity, pivot narrative)",
      "LinkedIn profile optimization — every section covered",
      "Bio rewrite templates with real client examples",
      "Positioning statement builder from scratch",
    ],
    desc: "The Rewrite service — packaged as a self-guided process. For the executive, founder, or career-changer who is ready to do the work.",
  },
  {
    slug:      "the-redesign-playbook",
    title:     "The Redesign Playbook",
    subtitle:  "The self-guided system for rebuilding a slow, dated, or off-brand website — done yourself.",
    price:     "$45",
    tag:       "Website Redesign",
    highlight: true,
    free:      false,
    download:  "/downloads/templates/the-redesign-playbook.pdf",
    href:      "/checkout/the-redesign-playbook",
    paperback: { price: "$52", href: "/checkout/the-redesign-playbook?format=paperback" },
    features:  [
      "The four-part site audit: performance, clarity, mobile & conversion",
      "Message-first rebuild framework + page-by-page architecture",
      "Mobile-first, speed, and design-that-converts principles",
      "A full rebuild & launch checklist, plus Lulu-ready 6 x 9 paperback files",
    ],
    desc: "The DIY companion to The Build and the founding-client redesign offer. Audit a website that's slow, dated, or no longer sounds like your business, then rebuild it in the right order — message first, structure second, design third, speed last — with the exact framework and checklists behind MK Parrish's website work.",
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
    paperback: { price: "$42", href: "https://buy.stripe.com/fZu28s2nLbq81Qgd5b8AE0w" },
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
    paperback: { price: "$45", href: "https://buy.stripe.com/4gMaEY2nLdyg7aAe9f8AE0x" },
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
    paperback: { price: "$52", href: "https://buy.stripe.com/aFaaEY6E179SfH64yF8AE0y" },
    features:  [
      "Page-by-page copy architecture (home, about, services, contact)",
      "SEO-informed headline and subheadline frameworks",
      "CTA writing guide that converts without pressure tactics",
      "Complete copy review checklist before launch",
    ],
    desc: "The website copy framework behind The Build service. For founders building their first site or relaunching and needing every word to work.",
  },
  {
    slug:      "the-social-strategy-playbook",
    title:     "The Social Strategy Playbook",
    subtitle:  "Build a content strategy you'll actually use — the self-guided framework behind The Social Suite.",
    price:     "$38",
    tag:       "Social & Content",
    highlight: false,
    free:      false,
    download:  "/downloads/templates/the-social-strategy-playbook.pdf",
    stripe:    "https://buy.stripe.com/eVq7sM7I53XG66wfdj8AE0B",
    href:      "https://buy.stripe.com/eVq7sM7I53XG66wfdj8AE0B",
    paperback: { price: "$45", href: "https://buy.stripe.com/4gM7sMaUh3XGeD24yF8AE0z" },
    features:  [
      "Content pillar framework (what to say + why it builds authority)",
      "Brand voice calibration for social — Instagram, LinkedIn, TikTok",
      "30-day content sprint template with caption structure",
      "Posting system that doesn't depend on inspiration",
    ],
    desc: "For founders and thought leaders who know they need to show up online — and finally have a repeatable system for it. The exact content strategy framework behind The Social Suite, documented for self-study.",
  },
  {
    slug:      "the-brand-deal-room",
    title:     "The Brand Deal Room",
    subtitle:  "Media kit, rate card, pitch scripts, and a partnership tracker for creators ready to get paid.",
    price:     "$47",
    tag:       "Creator Monetization",
    highlight: true,
    free:      false,
    download:  "/downloads/templates/the-brand-deal-room.pdf",
    href:      "/checkout/the-brand-deal-room",
    features:  [
      "One-page media kit structure + copy blocks",
      "Rate card logic for posts, UGC, usage, and bundles",
      "Warm pitch, follow-up, and inbound reply scripts",
      "Partnership tracker for moving brands from maybe to invoice",
    ],
    desc: "A practical brand-deal operating room for creators who need to look ready before the next partnership email lands: media kit, rates, scripts, usage questions, and a tracker.",
  },
  {
    slug:      "the-ugc-brief-bank",
    title:     "The UGC Brief Bank",
    subtitle:  "Paid content concepts, scripts, and deliverable menus for creator work brands can actually use.",
    price:     "$38",
    tag:       "UGC & Scripts",
    highlight: false,
    free:      false,
    download:  "/downloads/templates/the-ugc-brief-bank.pdf",
    href:      "/checkout/the-ugc-brief-bank",
    features:  [
      "Five commercial UGC brief types",
      "Starter, conversion, and launch-bank package menus",
      "Demo, objection, comparison, and lifestyle script templates",
      "Brand intake questions before you quote",
    ],
    desc: "For creators who can make content but need the paid-content spine around it. Turn raw creative into packaged UGC offers, scripts, and monthly retainers.",
  },
  {
    slug:      "the-tiktok-shop-sprint",
    title:     "The TikTok Shop Sprint",
    subtitle:  "A 14-day affiliate content plan for creator commerce without torching audience trust.",
    price:     "$44",
    tag:       "Affiliate Sprint",
    highlight: true,
    free:      false,
    download:  "/downloads/templates/the-tiktok-shop-sprint.pdf",
    href:      "/checkout/the-tiktok-shop-sprint",
    features:  [
      "Product fit scoring before you promote anything",
      "Seven content angles for every affiliate product",
      "14-day posting, testing, and review sprint",
      "Tracker for clicks, sales, comments, and keep-or-cut decisions",
    ],
    desc: "A fast creator-commerce sprint for testing affiliate products with taste: choose better products, make repeated useful content, track what moves, and protect trust.",
  },
  {
    slug:      "the-repurposing-engine",
    title:     "The Repurposing Engine",
    subtitle:  "Turn one strong idea into 30 platform-native posts without making content soup.",
    price:     "$42",
    tag:       "Repurposing",
    highlight: false,
    free:      false,
    download:  "/downloads/templates/the-repurposing-engine.pdf",
    href:      "/checkout/the-repurposing-engine",
    features:  [
      "Core idea test for tension, usefulness, repeatability, and revenue",
      "30-piece repurposing map across video, carousel, LinkedIn, stories, and email",
      "Platform translation rules for each format",
      "Revenue bridge so attention points to an offer",
    ],
    desc: "A repurposing system for creators who need more output from fewer strong ideas. Same spine, different doorway, clearer path to revenue.",
  },
  {
    slug:      "the-ai-content-twin",
    title:     "The AI Content Twin",
    subtitle:  "Prompts and guardrails so AI drafts in your voice instead of the average of the internet.",
    price:     "$34",
    tag:       "AI & Voice",
    highlight: false,
    free:      false,
    download:  "/downloads/templates/the-ai-content-twin.pdf",
    href:      "/checkout/the-ai-content-twin",
    features:  [
      "Voice snapshot prompt built from your own samples",
      "Point-of-view prompt before drafting",
      "De-slop edit prompt for killing generic AI tells",
      "Platform variant prompt for TikTok, LinkedIn, Instagram, stories, and email",
    ],
    desc: "The creator-safe AI prompt workbook: voice capture, point-of-view sharpening, draft variants, and guardrails so speed does not erase the person.",
  },
  {
    slug:      "the-creator-owned-funnel",
    title:     "The Creator-Owned Funnel",
    subtitle:  "Turn followers into email, low-ticket offers, paid community, and buyer behavior.",
    price:     "$39",
    tag:       "Owned Audience",
    highlight: true,
    free:      false,
    download:  "/downloads/templates/the-creator-owned-funnel.pdf",
    href:      "/checkout/the-creator-owned-funnel",
    features:  [
      "Five-part funnel map from discovery to recurring revenue",
      "Lead magnet test tied to paid next steps",
      "Three-email welcome sequence",
      "Low-ticket ladder and social CTAs that do not feel desperate",
    ],
    desc: "For creators with attention but no system behind it. Build the bridge from social posts to email, offers, paid community, and recurring revenue.",
  },
  {
    slug:      "the-authority-carousel-kit",
    title:     "The Authority Carousel Kit",
    subtitle:  "Turn one idea into a scroll-stopping LinkedIn carousel — without the Canva chaos.",
    price:     "$48",
    tag:       "LinkedIn & Carousels",
    highlight: false,
    free:      false,
    download:  "/downloads/templates/the-authority-carousel-kit.zip",
    stripe:    "https://buy.stripe.com/5kQcN63rPdyg52s2qx8AE0g",
    href:      "https://buy.stripe.com/5kQcN63rPdyg52s2qx8AE0g",
    features:  [
      "Editable JSON carousel templates — teardown, steps & story formats",
      "The full PDF guide: house style, the 7-slide story, voice rules & the formula",
      "Copy-paste AI prompts to draft a carousel in your voice",
      "One command turns your words into LinkedIn-ready slides + a multi-page PDF",
    ],
    desc: "The carousel system behind the MK Parrish brand, packaged so you can run it yourself. Write your words into a template, run one command, and get on-brand LinkedIn slides — no designer, no Canva, no subscription. The DIY version of The Social Suite.",
  },
  {
    slug:      "the-prompt-vault",
    title:     "The Prompt Vault",
    subtitle:  "The AI prompt library for brand, copy & positioning — so the machine sounds like you, not everyone else.",
    price:     "$34",
    tag:       "AI & Prompts",
    highlight: false,
    free:      false,
    download:  "/downloads/templates/the-prompt-vault.pdf",
    stripe:    "https://buy.stripe.com/bJe3cw1jH65OgLa7KR8AE0d",
    href:      "https://buy.stripe.com/bJe3cw1jH65OgLa7KR8AE0d",
    paperback: { price: "$41", href: "https://buy.stripe.com/fZu7sMfax3XG7aAghn8AE0A" },
    features:  [
      "40+ copy-paste prompts mapped to all 7 service methods",
      "The voice-capture prompt that makes AI sound like you",
      "Edit + de-slop prompts that kill the dead giveaways of AI",
      "Instant download — PDF + EPUB, 35 pages",
    ],
    desc: "Stop shipping the average of the internet. 40+ prompts for positioning, bios, website copy, content, and email — engineered so AI drafts in your voice. The AI companion to the Services Vault.",
  },
  {
    slug:      "the-services-vault",
    title:     "The Services Vault",
    subtitle:  "All fourteen service and creator-monetization guides — the complete DIY consulting + AI library.",
    price:     "$127",
    compareAt: "$567",
    tag:       "Best Value",
    highlight: true,
    free:      false,
    download:  "/downloads/the-services-vault.pdf",
    stripe:    "https://buy.stripe.com/aFa14ogeBam452s0ip8AE09",
    href:      "/checkout/the-services-vault",
    features:  [
      "All 14 guides included (every method, every framework, every prompt)",
      "The Edit + Before the Session + The Rewrite Playbook + The New Chapter",
      "The Byline Method + The Build Copy Guide + The Social Strategy Playbook + The Prompt Vault",
      "Brand deals, UGC, TikTok Shop, repurposing, AI voice, and creator-owned funnel guides",
    ],
    desc: "The fastest monetization buy on the Shelf: every consulting method plus the new creator revenue stack. Buy one bundle, get the full library for far less than buying each guide one by one.",
  },
  {
    slug:      "her-story-rewritten",
    title:     "Her Story, Rewritten",
    subtitle:  "Eight women of the Bible, the moment everything turned, and what their stories are still saying to yours.",
    price:     "$24",
    tag:       "Faith · The Flagship",
    highlight: true,
    free:      false,
    download:  "/downloads/ebooks/her-story-rewritten.pdf",
    href:      "/checkout/her-story-rewritten",
    paperback: { price: "$32", href: "/checkout/her-story-rewritten?format=paperback" },
    features:  [
      "Eve, Hagar, Hannah, Ruth, Esther & three more — told like stories, not sermons",
      "For women of any age, any stage of faith — no Bible knowledge required",
      "Each chapter turns on the same thing: being seen, and rewritten",
      "Complete PDF + Kindle EPUB, plus Lulu-ready 6 x 9 paperback files",
    ],
    desc: "The new front door to the faith line, and a book you can hand any woman in your life. Eight women of the Bible — Eve, Hagar, Hannah, Ruth, Esther, the woman at the well, Mary Magdalene, and Martha — told as real, unsentimental stories about being seen at the bottom of the page and having everything rewritten from there. Scripture for the woman who suspects her own story isn't finished.",
  },
  {
    slug:      "the-study",
    title:     "The Study",
    subtitle:  "A modern guide to building a Bible study practice that actually sticks — on your own terms.",
    price:     "$18",
    tag:       "Faith · Start Here",
    highlight: false,
    free:      false,
    download:  "/downloads/ebooks/the-study.pdf",
    href:      "/checkout/the-study",
    paperback: { price: "$26", href: "/checkout/the-study?format=paperback" },
    features:  [
      "A simple, repeatable study rhythm you'll actually keep",
      "How to read for formation, not just information",
      "Note-taking and reflection systems that compound",
      "Instant download — PDF + Kindle EPUB",
    ],
    desc: "The front door to the faith line. A grounded, unfussy method for building a Bible study practice that sticks — on your own terms, at your own pace, without guilt or performance.",
  },
  {
    slug:      "the-sermon-notes",
    title:     "The Sermon Notes",
    subtitle:  "Turn your personal Bible study into content your audience wants — and that you can charge for.",
    price:     "$25",
    tag:       "Faith · Content",
    highlight: false,
    free:      false,
    download:  "/downloads/ebooks/the-sermon-notes.pdf",
    href:      "/checkout/the-sermon-notes",
    paperback: { price: "$32", href: "/checkout/the-sermon-notes?format=paperback" },
    features:  [
      "Turn study notes into shareable, useful content",
      "A repeatable framework from insight to post",
      "How to be generous online without giving it all away",
      "Instant download — PDF + Kindle EPUB",
    ],
    desc: "The bridge between your private study and a public audience. Take what you're already learning and turn it into content people want to read — and that can quietly build toward income.",
  },
  {
    slug:      "gospel-and-grind",
    title:     "Gospel & Grind",
    subtitle:  "Build a profitable practice grounded in what you believe — without feeling like you're selling your faith.",
    price:     "$28",
    tag:       "Faith · Business",
    highlight: true,
    free:      false,
    download:  "/downloads/ebooks/gospel-and-grind.pdf",
    href:      "/checkout/gospel-and-grind",
    paperback: { price: "$38", href: "/checkout/gospel-and-grind?format=paperback" },
    features:  [
      "Reconcile faith and money without the guilt",
      "Position and price work you believe in",
      "Sell with integrity — clear, calm, no hype",
      "Instant download — PDF + Kindle EPUB",
    ],
    desc: "For the faith-driven founder who feels the tension between calling and commerce. A framework for building a profitable practice grounded in what you believe — without feeling like you're selling your faith.",
  },
  {
    slug:      "the-calling-card",
    title:     "The Calling Card",
    subtitle:  "Build a faith-informed brand voice that connects, converts, and stays true to who you are.",
    price:     "$35",
    tag:       "Faith · Voice",
    highlight: false,
    free:      false,
    download:  "/downloads/ebooks/the-calling-card.pdf",
    href:      "/checkout/the-calling-card",
    paperback: { price: "$42", href: "/checkout/the-calling-card?format=paperback" },
    features:  [
      "A voice framework rooted in your convictions",
      "Language that connects and converts, honestly",
      "Message a mission plainly — no coyness, no apology",
      "Instant download — PDF + Kindle EPUB",
    ],
    desc: "The brand-voice guide for people whose work is inseparable from their faith. Build a voice that connects, converts, and stays true — so your message sounds like you and names the mission plainly.",
  },
  {
    slug:      "ministry-monetized",
    title:     "Ministry, Monetized",
    subtitle:  "The launch & revenue playbook for faith-based creators.",
    price:     "$42",
    tag:       "Faith · Deep Work",
    highlight: false,
    free:      false,
    download:  "/downloads/ebooks/ministry-monetized.pdf",
    href:      "/checkout/ministry-monetized",
    paperback: { price: "$52", href: "/checkout/ministry-monetized?format=paperback" },
    features:  [
      "A full launch and revenue playbook, step by step",
      "Offers, pricing, and a pipeline that fits your calling",
      "Sustainable income without burning out or selling out",
      "Instant download — PDF + Kindle EPUB",
    ],
    desc: "The deepest guide in the faith line: a complete launch and revenue playbook for faith-based creators. From offer to pipeline to sustainable income — built for people who refuse to choose between calling and paying the bills.",
  },
  {
    slug:      "scripture-and-strategy",
    title:     "Scripture & Strategy",
    subtitle:  "A complete faith-based business curriculum — from study practice to sustainable income.",
    price:     "$497",
    tag:       "Complete Curriculum",
    highlight: true,
    free:      false,
    download:  "/downloads/scripture-and-strategy.pdf",
    href:      "/checkout/scripture-and-strategy",
    features:  [
      "Eight modules: source, calling, voice, offer, pipeline, engine, obedience",
      "The full faith line woven into one guided path",
      "From study practice to positioning to sustainable revenue",
      "Instant download — complete PDF + Kindle EPUB",
    ],
    desc: "The flagship of the faith line: a complete faith-based business curriculum that takes you from a real study practice all the way to sustainable income. Eight modules, one guided path — source, calling, voice, offer, pipeline, and the discipline to keep going.",
  },
] as const;

// ── The Little Rewrites — children's book line ───────────────────────────────
// Bedtime stories about children writing their own happily ever after.
export const KIDS_BOOKS = [
  {
    slug:      "the-princess-who-rescued-herself",
    title:     "The Princess Who Rescued Herself",
    subtitle:  "A bedtime fairytale about writing your own happily ever after.",
    price:     "$14",
    tag:       "Kids · The Little Rewrites",
    highlight: true,
    free:      false,
    download:  "/downloads/ebooks/the-princess-who-rescued-herself.pdf",
    href:      "/checkout/the-princess-who-rescued-herself",
    paperback: { price: "$19", href: "/checkout/the-princess-who-rescued-herself?format=paperback" },
    features:  [
      "A modern fairytale: the princess doesn't wait for a prince — she notices the hinges",
      "A read-aloud bedtime story with a grown-up's note built in",
      "The gentle first lesson in agency: you can write your own door",
      "Complete PDF + Kindle EPUB, plus Lulu-ready 6 x 9 paperback files",
    ],
    desc: "The flagship of The Little Rewrites — a warm, funny, quietly radical bedtime fairytale for the child who is learning that they get to write their own happily ever after. Princess Wren is locked in a tower waiting for a rescue that keeps not coming, until she stops waiting and starts paying attention. The first in a children's line about kids who rewrite their own stories.",
  },
] as const;

export const SHOP_PRODUCTS = [...EBOOKS, ...SERVICE_EBOOKS, ...KIDS_BOOKS] as const;

export type ShopProduct = (typeof SHOP_PRODUCTS)[number];

export const getShopProduct = (slug: string) =>
  SHOP_PRODUCTS.find((product) => product.slug === slug);

export const productDownload = (product: ShopProduct) =>
  (product as { download?: string }).download;

export const productCover = (product: ShopProduct) =>
  (product as { cover?: string }).cover ?? `/downloads/covers/${product.slug}-cover.jpg`;

export const isFreeProduct = (product: ShopProduct) =>
  Boolean((product as { free?: boolean }).free && productDownload(product));

export const productPriceLabel = (product: ShopProduct) =>
  isFreeProduct(product) ? "Free" : product.price;

export const isLimitedFreeProduct = (product: ShopProduct) =>
  isFreeProduct(product) && Boolean((product as { limitedFree?: boolean }).limitedFree);

export const productCheckoutHref = (product: ShopProduct) => {
  const stripe = (product as { stripe?: string }).stripe;
  return stripe && stripe.length > 0 ? stripe : product.href;
};

export const productDeliveryLinks = (product: ShopProduct) => {
  const primary = productDownload(product);
  if (!primary) return [];

  const links = [{ label: "PDF", href: primary }];
  if (primary.endsWith(".pdf")) {
    links.push({ label: "EPUB", href: primary.replace(/\.pdf$/, ".epub") });
  }
  if (product.slug === "the-vault" || product.slug === "the-services-vault") {
    links.push({ label: "ZIP Bundle", href: primary.replace(/\.pdf$/, ".zip") });
  }

  return links;
};

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
  {
    title:   "Live Out Loud",
    price:   "From $22",
    stripe:  "https://buy.stripe.com/bJecN61jH51KgLa6GN8AE0p",
    sizes:   ["8×10","11×14","16×20"],
    preview: "I am here to live out loud.",
  },
  {
    title:   "Not Afraid of Storms",
    price:   "From $22",
    stripe:  "https://buy.stripe.com/8x28wQfaxfGobqQ7KR8AE0q",
    sizes:   ["8×10","11×14","16×20"],
    preview: "I am not afraid of storms.",
  },
  {
    title:   "Never Too Late",
    price:   "From $18",
    stripe:  "https://buy.stripe.com/cNicN6aUhgKsdyY8OV8AE0r",
    sizes:   ["5×7","8×10"],
    preview: "It is never too late.",
  },
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
