// ─────────────────────────────────────────────────────────────────────────────
// Social campaign catalog — the copy that gets monetized.
//
// Each entry becomes a set of stylized posts (one per `formats`). The marketing
// copy here (hook / sub / bullets / caption / tags) is what drives the sale, so
// it is intentionally hand-written per product rather than scraped from config.
//
// `hook`  — the big on-image headline. Wrap ONE phrase in *asterisks* to paint
//           it petal-pink (the brand accent). Use \n for deliberate line breaks.
// `link`  — the real checkout / destination (kept in sync with app/lib/config.ts).
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = {
  name:    "MK PARRISH",
  handle:  "@mkeezieee",
  site:    "mkparrish.com",
  margins: "The Margins on Substack",
};

const BASE_TAGS = ["mkparrish", "personalbranding", "writingcommunity", "founderbrand"];

export const POSTS = [
  // ── FRONT DOOR ──────────────────────────────────────────────────────────────
  {
    slug: "the-linkedin-bio-fix-kit",
    n: "01",
    category: "Ebook · Front Door",
    kicker: "Start Here · $9",
    hook: "Fix the first thing\neveryone *reads* about you.",
    sub: "In fifteen minutes. No rewrite spiral.",
    bullets: [
      "3 headline formulas + a fill-in About template",
      "15 swipe-file opening lines you can steal",
      "The banned-words list + a 15-min checklist",
    ],
    price: "$9",
    cta: "Grab the Kit",
    link: "https://buy.stripe.com/bJe6oI5zXbq852s3uB8AE0f",
    caption:
      "Your LinkedIn headline is the first thing every recruiter, client, and stranger reads — and most of them are written like a job title, not a hook.\n\nThe LinkedIn Bio Fix Kit rewrites it in 15 minutes: 3 headline formulas, a fill-in-the-blank About template, 15 stealable opening lines, and the banned-words list that's quietly making you sound like everyone else.\n\nThe $9 front door to the whole Shelf. 👇",
    tags: ["linkedintips", "linkedinbio", "personalbrand", "careeradvice", "jobsearch"],
  },

  // ── BEST SELLER ─────────────────────────────────────────────────────────────
  {
    slug: "write-yourself-into-the-room",
    n: "02",
    category: "Ebook · Best Seller",
    kicker: "Best Seller · $28",
    hook: "Stop sounding like\n*everyone else.*",
    sub: "The personal-brand writing guide.",
    bullets: [
      "The three-layer positioning framework",
      "Bio templates + real before/after examples",
      "The LinkedIn audit checklist",
    ],
    price: "$28",
    cta: "Read the Guide",
    link: "https://buy.stripe.com/00waEY9Qd1PygLa8OV8AE00",
    caption:
      "You're not boring. Your copy is.\n\nWrite Yourself Into the Room is the writing guide for people tired of sounding like a LinkedIn template. Learn the three-layer positioning framework, then write bios and profiles that actually sound like you — with real before/after examples.\n\nThe best seller on the Shelf. 👇",
    tags: ["personalbranding", "copywriting", "linkedintips", "writingtips", "solopreneur"],
  },

  // ── WORKBOOK ────────────────────────────────────────────────────────────────
  {
    slug: "reinvention-workbook",
    n: "03",
    category: "Ebook · Workbook",
    kicker: "Workbook · $18",
    hook: "For the people in the\nmiddle of *becoming*\nsomeone new.",
    sub: "A guided writing workbook.",
    bullets: [
      "20 guided writing exercises",
      "The identity audit framework",
      "Voice and narrative prompts",
    ],
    price: "$18",
    cta: "Start the Work",
    link: "https://mkparrish.com/shop/reinvention-workbook",
    caption:
      "Reinvention isn't a vibe. It's a writing project.\n\nThe Reinvention Workbook: 20 guided exercises, an identity audit, and the voice prompts pulled from real reinvention — not theory. For anyone rewriting who they are on the page first.\n\nLink below. 👇",
    tags: ["journaling", "reinvention", "writingprompts", "selfdiscovery", "personalgrowth"],
  },

  // ── PLAYBOOK ────────────────────────────────────────────────────────────────
  {
    slug: "brand-voice-playbook",
    n: "04",
    category: "Ebook · Playbook",
    kicker: "Digital Download · $35",
    hook: "Build a brand voice\nfrom *scratch.*",
    sub: "The exact process used with clients.",
    bullets: [
      "Full brand voice framework",
      "Tone spectrum mapping",
      "Do / don't vocabulary lists + a client example",
    ],
    price: "$35",
    cta: "Get the Playbook",
    link: "https://buy.stripe.com/3cI28s4vTbq83Yo5CJ8AE01",
    caption:
      "\"Make it sound like us\" is not a brief.\n\nThe Brand Voice Playbook turns that vague feeling into a document: the full framework, tone spectrum mapping, do/don't vocabulary lists, and a complete client example — the exact process used with paying clients, handed to you.\n\nLink below. 👇",
    tags: ["brandvoice", "branding", "contentstrategy", "copywriting", "smallbusiness"],
  },

  // ── THE VAULT (writing bundle) ──────────────────────────────────────────────
  {
    slug: "the-vault",
    n: "05",
    category: "Bundle · Best Value",
    kicker: "Best Value · $97",
    hook: "Every framework.\nEvery word.\n*One price.*",
    sub: "The complete self-study library.",
    bullets: [
      "All 3 writing-and-identity ebooks",
      "Brand Voice Playbook + Write Yourself Into the Room",
      "The Reinvention Workbook + future releases",
    ],
    price: "$97",
    cta: "Open the Vault",
    link: "https://buy.stripe.com/9B69AUfax0Lu1Qgc178AE02",
    caption:
      "The whole library, one price.\n\nThe Vault bundles every writing-and-identity ebook — the Brand Voice Playbook, Write Yourself Into the Room, and the Reinvention Workbook — plus every future release. Buy once, own the whole shelf.\n\nLink below. 👇",
    tags: ["bundle", "personalbranding", "writingtips", "digitalproducts", "founderbrand"],
  },

  // ── SERVICE GUIDES (DIY consulting) ─────────────────────────────────────────
  {
    slug: "the-rewrite-playbook",
    n: "06",
    category: "Service Guide · Deep Work",
    kicker: "Deep Work · $45",
    hook: "Overhaul your whole\n*professional story.*",
    sub: "The Rewrite — self-guided.",
    bullets: [
      "Full story audit (career, identity, pivot)",
      "LinkedIn optimization — every section",
      "Bio templates + a positioning-statement builder",
    ],
    price: "$45",
    cta: "Run the Rewrite",
    link: "https://buy.stripe.com/5kQ4gAbYl79S3Yo7KR8AE05",
    caption:
      "The $2,500 Rewrite service — packaged as a process you can run yourself.\n\nThe Rewrite Playbook: a full story audit, section-by-section LinkedIn optimization, bio templates with real examples, and a positioning-statement builder. For the founder or career-changer ready to do the work.\n\nLink below. 👇",
    tags: ["linkedintips", "careerchange", "personalbranding", "executivebranding", "storytelling"],
  },
  {
    slug: "the-byline-method",
    n: "07",
    category: "Service Guide · Ghostwriting",
    kicker: "Ghostwriting · $38",
    hook: "Make AI sound like\n*you* — not everyone.",
    sub: "The voice-capture method, documented.",
    bullets: [
      "Voice-capture interview questions",
      "Tone calibration across formats",
      "Editorial calendar templates",
    ],
    price: "$38",
    cta: "Learn the Method",
    link: "https://buy.stripe.com/cNibJ2aUh8dWamMd5b8AE07",
    caption:
      "How do ghostwriters keep someone's voice consistent across hundreds of posts? A system.\n\nThe Byline Method documents it for the first time: voice-capture interview questions, tone calibration, a write-in-voice framework, and editorial calendar templates. For writers, content leads, and founders who write for others.\n\nLink below. 👇",
    tags: ["ghostwriting", "contentcreation", "copywriting", "writingtips", "personalbrand"],
  },
  {
    slug: "the-social-strategy-playbook",
    n: "08",
    category: "Service Guide · Social",
    kicker: "Social & Content · $38",
    hook: "A content system that\ndoesn't depend on\n*inspiration.*",
    sub: "The framework behind The Social Suite.",
    bullets: [
      "Content pillar framework",
      "Brand voice for IG, LinkedIn & TikTok",
      "30-day sprint template + caption structure",
    ],
    price: "$38",
    cta: "Get the System",
    link: "https://buy.stripe.com/8x26oz9gKd294HTcHq0oM0m",
    caption:
      "If your posting depends on feeling inspired, you don't have a strategy — you have a mood.\n\nThe Social Strategy Playbook: a content pillar framework, brand voice calibration for IG/LinkedIn/TikTok, and a 30-day sprint template with caption structure. The repeatable system behind The Social Suite.\n\nLink below. 👇",
    tags: ["contentstrategy", "socialmediatips", "contentcreator", "marketingtips", "smallbusiness"],
  },
  {
    slug: "the-prompt-vault",
    n: "09",
    category: "Service Guide · AI",
    kicker: "AI & Prompts · $34",
    hook: "Stop shipping the\n*average* of the internet.",
    sub: "40+ prompts that draft in your voice.",
    bullets: [
      "40+ prompts mapped to 7 service methods",
      "The voice-capture prompt",
      "De-slop prompts that kill the AI giveaways",
    ],
    price: "$34",
    cta: "Open the Vault",
    link: "https://buy.stripe.com/bJe3cw1jH65OgLa7KR8AE0d",
    caption:
      "Generic AI copy is just the average of everything ever written. That's the problem.\n\nThe Prompt Vault: 40+ copy-paste prompts for positioning, bios, websites, content, and email — engineered so AI drafts in YOUR voice — plus the edit prompts that kill the dead giveaways of AI writing.\n\nLink below. 👇",
    tags: ["aitools", "chatgptprompts", "aiwriting", "copywriting", "contentcreation"],
  },
  {
    slug: "the-authority-carousel-kit",
    n: "10",
    category: "Service Guide · Carousels",
    kicker: "LinkedIn & Carousels · $48",
    hook: "One idea into a\nscroll-stopping *carousel.*",
    sub: "No Canva chaos. One command.",
    bullets: [
      "Editable JSON carousel templates",
      "The 7-slide story formula + house style",
      "AI prompts that draft it in your voice",
    ],
    price: "$48",
    cta: "Get the Kit",
    link: "https://buy.stripe.com/5kQcN63rPdyg52s2qx8AE0g",
    caption:
      "Carousels build authority faster than any other LinkedIn format — if you can make them without losing a weekend to Canva.\n\nThe Authority Carousel Kit: editable templates, the 7-slide story formula, house style, and AI prompts. Write your words, run one command, get on-brand slides + a PDF. No designer, no subscription.\n\nLink below. 👇",
    tags: ["linkedincarousel", "linkedintips", "contentcreation", "personalbranding", "b2bmarketing"],
  },

  // ── SERVICES VAULT (the big bundle) ─────────────────────────────────────────
  {
    slug: "the-services-vault",
    n: "11",
    category: "Bundle · Best Value",
    kicker: "Best Value · $127 (worth $275)",
    hook: "The whole consulting\nplaybook. *Your* timeline.",
    sub: "All 8 service guides + the AI prompt library.",
    bullets: [
      "All 8 DIY guides — $275 bought one by one",
      "Every method, every framework, every prompt",
      "The Prompt Vault + future releases included",
    ],
    price: "$127",
    cta: "Get the Vault",
    link: "https://buy.stripe.com/aFa14ogeBam452s0ip8AE09",
    caption:
      "Eight consulting frameworks. Bought one by one, that's $275.\n\nThe Services Vault is $127: The Edit, Before the Session, The Rewrite Playbook, The New Chapter, The Byline Method, The Build Copy Guide, The Social Strategy Playbook, and the full Prompt Vault — plus every future release.\n\nThe entire playbook, on your timeline. 👇",
    tags: ["digitalproducts", "consulting", "personalbranding", "founderbrand", "smallbusiness"],
  },

  // ── THE AUDIT (productized service) ─────────────────────────────────────────
  {
    slug: "the-audit",
    n: "12",
    category: "Service · Productized",
    kicker: "48 Hours · $97 · No Call",
    hook: "MK's eyes on your\n*positioning.* In 48 hours.",
    sub: "Async. No meeting. Just fixes.",
    bullets: [
      "A Loom teardown of your site + LinkedIn",
      "A scorecard + 3 rewritten headlines",
      "Your top 3 fixes — delivered in 48 hours",
    ],
    price: "$97",
    cta: "Book the Audit",
    link: "https://buy.stripe.com/9B64gA2nL51KamMaX38AE0e",
    caption:
      "Sometimes you don't need a six-week engagement. You need someone who knows what they're doing to look at it and tell you what's broken.\n\nThe 48-Hour Positioning Audit: send your site, LinkedIn, and one offer page — get a Loom teardown, a scorecard, 3 rewritten headlines, and your top 3 fixes. $97, async, no call.\n\nLink below. 👇",
    tags: ["positioning", "personalbranding", "copywriting", "founder", "marketingtips"],
  },

  // ── THE MARGINS (recurring membership) ──────────────────────────────────────
  {
    slug: "the-margins",
    n: "13",
    category: "Membership · Recurring",
    kicker: "Membership · Free + $9/mo",
    hook: "The real work.\n*Before* it goes anywhere.",
    sub: "Weekly frameworks, teardowns & templates.",
    bullets: [
      "Free List: essays + a monthly strategy note",
      "$9/mo: full archive, weekly frameworks, teardowns",
      "Voice & copy templates from real client work",
    ],
    price: "Free + $9/mo",
    cta: "Join The Margins",
    link: "https://mkparrishthemargins.substack.com/subscribe",
    caption:
      "The frameworks, the teardowns, and the writing too honest for a public feed — that all lives in The Margins.\n\nFree List: public essays + a monthly strategy note. $9/mo: the full archive, weekly frameworks pulled from real client work, positioning teardowns, and voice & copy templates.\n\nFor the women, survivors, and overthinkers rebuilding from scratch. 👇",
    tags: ["substack", "newsletter", "writingcommunity", "personalbranding", "contentstrategy"],
  },
];

export { BASE_TAGS };
