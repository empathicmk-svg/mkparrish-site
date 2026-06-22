import { EBOOKS, PRINTS, SERVICE_EBOOKS } from "@/app/lib/config";

export type ShelfCollection = "ebooks" | "frameworks" | "prints";

export type ShelfProduct = {
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  tag: string;
  desc: string;
  features: readonly string[];
  forWho: readonly string[];
  collection: ShelfCollection;
  kind: "digital" | "print";
  highlight: boolean;
  href: string;
  stripe?: string;
  download?: string;
  free?: boolean;
  limitedFree?: boolean;
  sizes?: readonly string[];
  preview?: string;
  cover?: string;
  assetLinks?: readonly ShelfAssetLink[];
};

export type ShelfAssetLink = {
  label: string;
  href: string;
};

// Most product slugs map 1:1 to a generated cover at
// /downloads/covers/<slug>-cover.jpg. A few catalog slugs differ from the
// cover/source filename — list those exceptions here.
const COVER_SLUG_OVERRIDES: Record<string, string> = {
  "the-edit-guide": "the-edit-diy",
};

export function coverForSlug(slug: string): string {
  const coverSlug = COVER_SLUG_OVERRIDES[slug] ?? slug;
  return `/downloads/covers/${coverSlug}-cover.jpg`;
}

function assetSlugFor(slug: string): string {
  return COVER_SLUG_OVERRIDES[slug] ?? slug;
}

export function assetLinksForSlug(slug: string, download?: string): readonly ShelfAssetLink[] {
  if (!download) return [];

  const assetSlug = assetSlugFor(slug);
  const pdf = download.endsWith(".pdf") ? download : download.replace(/\.(zip|html|epub)$/, ".pdf");
  const epub = download.endsWith(".epub") ? download : download.replace(/\.(pdf|zip|html)$/, ".epub");

  return [
    { label: "PDF", href: pdf },
    { label: "Kindle EPUB", href: epub },
    { label: "Cover JPG", href: coverForSlug(slug) },
    { label: "KDP Info", href: `/downloads/kdp/${assetSlug}-kdp-upload-info.md` },
  ];
}

type DigitalSource = (typeof EBOOKS)[number] | (typeof SERVICE_EBOOKS)[number];

type AudienceMap = Record<string, readonly string[]>;

const PRODUCT_AUDIENCES: AudienceMap = {
  "reinvention-workbook": [
    "You are in the middle of a career, relationship, or identity shift",
    "You think more clearly when you write things down",
    "You need better questions, not more vague encouragement",
  ],
  "write-yourself-into-the-room": [
    "Your LinkedIn or bio undersells the work you actually do",
    "You are repositioning yourself for a new role, audience, or chapter",
    "You want language that sounds specific instead of professionally beige",
  ],
  "brand-voice-playbook": [
    "Your brand sounds different depending on who wrote the copy",
    "You need a practical voice guide for a team, contractor, or founder",
    "You want consistency without sanding off every trace of personality",
  ],
  "the-invisible-bruise": [
    "You are trying to name harm that did not leave a visible mark",
    "You need language for emotional abuse, gaslighting, or silent survival",
    "You are rebuilding trust in your own memory and reality",
  ],
  "decoding-angel-numbers": [
    "You keep noticing patterns and want a grounded way to reflect on them",
    "You are spiritually curious but do not want to outsource discernment",
    "You want prompts and practice instead of a superstition script",
  ],
  "the-study": [
    "You want a Bible study rhythm that fits your actual life",
    "You have tried devotional plans before and need a shame-free method",
    "You want structure without pretending you already know where to begin",
  ],
  "gospel-and-grind": [
    "You are building faith-rooted work and need business language that fits",
    "You underprice and call it humility",
    "You want to sell without turning your faith into a costume",
  ],
  "the-sermon-notes": [
    "Your notes are full but your content calendar is empty",
    "You want to translate study into useful public work",
    "You need a free-to-paid content ladder that feels honest",
  ],
  "the-calling-card": [
    "Your faith-informed brand voice sounds flatter than you actually are",
    "You need language that is warm, specific, and commercially clear",
    "You want connection and conversion without losing integrity",
  ],
  "ministry-monetized": [
    "You have a message and offer but need a launch structure",
    "You want sustainable revenue without manufactured urgency",
    "You are ready to build income around a calling without apology",
  ],
  "the-vault": [
    "You want the complete writing, identity, and voice library in one purchase",
    "You are rebuilding your story, your positioning, or the words around it",
    "You prefer a sequenced self-study library over disconnected templates",
  ],
  "scripture-and-strategy": [
    "You want the full faith, voice, content, and revenue collection",
    "You are building a faith-rooted brand, offer, or content engine",
    "You need spiritual clarity and practical structure in the same place",
  ],
  "the-edit-guide": [
    "Your copy is close, but still softer or more generic than it should be",
    "You want a repeatable editing lens for bios, emails, pages, and posts",
    "You need to tighten the language without losing your natural voice",
  ],
  "before-the-session": [
    "You booked a strategy session and want every minute to count",
    "You know the problem but have not organized the thinking yet",
    "You want to arrive clear instead of trying to discover everything out loud",
  ],
  "the-rewrite-playbook": [
    "Your professional story no longer matches the person doing the work",
    "You are changing careers, relaunching, or stepping into a bigger role",
    "You want to rebuild your positioning before rewriting the profile",
  ],
  "the-new-chapter-workbook": [
    "Your brand was built for an earlier version of you or your business",
    "You are planning a website relaunch or full repositioning",
    "You need the strategy beneath the new visuals and copy",
  ],
  "the-byline-method": [
    "You ghostwrite, lead content, or regularly write in someone else's voice",
    "You need a repeatable process for voice capture and calibration",
    "You want client work to sound recognizably human, not generically polished",
  ],
  "the-build-copy-guide": [
    "You are writing a new website and do not know what each page must accomplish",
    "Your current site has copy but no clear conversion logic",
    "You need a useful brief for yourself, a writer, or a designer",
  ],
  "the-social-strategy-playbook": [
    "You post inconsistently because every week starts from a blank page",
    "You need content pillars tied to your actual authority and point of view",
    "You want a system that works even when inspiration is off-duty",
  ],
  "the-prompt-vault": [
    "You use AI to write and everything comes out sounding generic",
    "You ghostwrite or run content and need the machine to hold a real voice",
    "You want copy-paste prompts for positioning, bios, pages, and posts",
  ],
  "the-services-vault": [
    "You want the complete DIY consulting methodology in one library",
    "You are building your own brand or improving the way you serve clients",
    "You want frameworks you can reuse instead of one-time prompts",
  ],
};

function normalizeDigital(product: DigitalSource, collection: Exclude<ShelfCollection, "prints">): ShelfProduct {
  const href: string = product.href;
  const download: string | undefined = product.download;
  const stripe: string | undefined = "stripe" in product ? product.stripe : undefined;
  const free = Boolean(product.free);
  const limitedFree = Boolean((product as { limitedFree?: boolean }).limitedFree);

  return {
    slug: product.slug,
    title: product.title,
    subtitle: product.subtitle,
    price: product.price,
    tag: product.tag,
    desc: product.desc,
    features: product.features,
    forWho: PRODUCT_AUDIENCES[product.slug] ?? product.features,
    collection,
    kind: "digital",
    highlight: product.highlight,
    href: href.startsWith("/shop/") ? download ?? href : href,
    stripe,
    download,
    free,
    limitedFree,
    cover: coverForSlug(product.slug),
    assetLinks: assetLinksForSlug(product.slug, download),
  };
}

type PrintTitle = (typeof PRINTS)[number]["title"];

const PRINT_COPY: Record<PrintTitle, {
  slug: string;
  subtitle: string;
  desc: string;
  forWho: readonly string[];
}> = {
  "Promise Me": {
    slug: "promise-me",
    subtitle: "An original MK Parrish poem, made for the wall you look at while becoming.",
    desc: "A clean, archival-quality poetry print about the promises we make to ourselves before the proof arrives.",
    forWho: [
      "You want meaningful wall art that still feels modern and restrained",
      "You are marking a new chapter, recovery, or personal promise",
      "You are buying for someone who needs words with a pulse",
    ],
  },
  "The Rewrite": {
    slug: "the-rewrite-print",
    subtitle: "A poem about picking up the pen and changing the ending yourself.",
    desc: "An original poetry print for the person who stopped waiting for permission and began again on purpose.",
    forWho: [
      "You are rebuilding after a pivot, ending, or hard-won realization",
      "You want a daily reminder that authorship is a decision",
      "You like literary art that feels personal without becoming precious",
    ],
  },
  "Selected Lines": {
    slug: "selected-lines",
    subtitle: "A smaller-format collection of lines worth keeping where you can see them.",
    desc: "Selected original lines by MK Parrish, arranged as a minimal archival print for desks, shelves, and smaller walls.",
    forWho: [
      "You want a compact print for a desk, nightstand, or gallery wall",
      "You collect language the way other people collect photographs",
      "You need a thoughtful gift that does not feel mass-produced",
    ],
  },
};

export const DIGITAL_PRODUCTS: readonly ShelfProduct[] = [
  ...EBOOKS.map((product) => normalizeDigital(product, "ebooks")),
  ...SERVICE_EBOOKS.map((product) => normalizeDigital(product, "frameworks")),
];

export const PRINT_PRODUCTS: readonly ShelfProduct[] = PRINTS.map((print) => {
  const copy = PRINT_COPY[print.title];
  return {
    slug: copy.slug,
    title: print.title,
    subtitle: copy.subtitle,
    price: print.price,
    tag: "Poetry Print",
    desc: copy.desc,
    features: [
      "Archival-quality matte print",
      `Available in ${print.sizes.join(", ")}`,
      "Shipped in a protective sleeve",
    ],
    forWho: copy.forWho,
    collection: "prints",
    kind: "print",
    highlight: false,
    href: print.stripe,
    stripe: print.stripe,
    sizes: print.sizes,
    preview: "preview" in print ? print.preview : undefined,
  };
});

export const SHELF_PRODUCTS: readonly ShelfProduct[] = [
  ...DIGITAL_PRODUCTS,
  ...PRINT_PRODUCTS,
];

export function findShelfProduct(slug: string) {
  return SHELF_PRODUCTS.find((product) => product.slug === slug);
}

export function relatedShelfProducts(product: ShelfProduct, limit = 3) {
  const sameCollection = SHELF_PRODUCTS.filter(
    (candidate) => candidate.slug !== product.slug && candidate.collection === product.collection,
  );
  const fallback = SHELF_PRODUCTS.filter(
    (candidate) => candidate.slug !== product.slug && candidate.collection !== product.collection,
  );
  return [...sameCollection, ...fallback].slice(0, limit);
}
