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
};

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
  "the-vault": [
    "You want the complete personal-brand writing library in one purchase",
    "You are rebuilding both your positioning and the words around it",
    "You prefer a full system over collecting disconnected templates",
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
  "the-services-vault": [
    "You want the complete DIY consulting methodology in one library",
    "You are building your own brand or improving the way you serve clients",
    "You want frameworks you can reuse instead of one-time prompts",
  ],
};

function normalizeDigital(product: DigitalSource, collection: Exclude<ShelfCollection, "prints">): ShelfProduct {
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
    href: product.href,
    stripe: "stripe" in product ? product.stripe : undefined,
    download: product.download,
    free: product.free,
    limitedFree: "limitedFree" in product ? product.limitedFree : false,
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
