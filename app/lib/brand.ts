// ─────────────────────────────────────────────────────────────────────────────
// The MK Parrish brand: one place for the name, the Four C's, the calls to
// action and the promotions, so every page says the same thing the same way.
// See docs/brand/BRAND-AND-CTA-PLAYBOOK.md for how and where to use each line.
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = {
  name: "MK Parrish",
  title: "MK Parrish · Luxury Concierge",
  /** The Four C's, in the order they're always said. */
  line: "Cars. Code. Content. Creative.",
  promise: "One concierge for the car, the code, the content and the creative.",
  short: "The Four C's, one concierge.",
  location: "Long Island, NY",
} as const;

export type LaneId = "cars" | "code" | "content" | "creative";

export const FOUR_CS: {
  id: LaneId;
  word: string;
  tagline: string;
  text: string;
  points: string[];
  href: string;
  cta: string;
}[] = [
  {
    id: "cars",
    word: "Cars",
    tagline: "Mercedes-Benz, handled with a straight answer.",
    text: "New, lease or trade-in at Mercedes-Benz of Smithtown. Test drive any day, with the numbers explained before you sign anything.",
    points: ["Test drives, any day", "Trade-in values explained", "Straight answers on payments"],
    href: "/test-drive",
    cta: "Reserve a test drive",
  },
  {
    id: "code",
    word: "Code",
    tagline: "Websites engineered to convert.",
    text: "Strategy, copy, design and code in one engagement. Fast, mobile-first, interactive, and yours to keep.",
    points: ["Custom builds from $6,000", "Launch in 3–4 weeks", "Hosting and upkeep from $300/mo"],
    href: "/studio",
    cta: "Start your build",
  },
  {
    id: "content",
    word: "Content",
    tagline: "Reels, posts and growth that get finished.",
    text: "Short-form video, social and full-funnel marketing, run as one motion by the person who built the pages.",
    points: ["Social from $2,000/mo", "Outbound from $2,500/mo", "Full-funnel growth from $6,500/mo"],
    href: "/growth",
    cta: "Grow your audience",
  },
  {
    id: "creative",
    word: "Creative",
    tagline: "Brand, voice and words people remember.",
    text: "Positioning, brand voice, copy and books. The creative that makes you the obvious choice.",
    points: ["The $97 48-hour audit", "Messaging and copy rewrites", "Books, poems and long-form"],
    href: "/brand",
    cta: "Sharpen your brand",
  },
];

/** Short, consistent calls to action. Use these words, not variations. */
export const CTA = {
  concierge: "Book your concierge call",
  testDrive: "Reserve a test drive",
  build: "Start your build",
  audit: "Get the $97 audit",
  callText: "Call or text MK",
  checklist: "Get the free checklist",
  follow: "Follow the feed",
} as const;

/** Rotating promotions: one line each, with where they go. */
export const PROMOS: { label: string; text: string; href: string; cta: string }[] = [
  { label: "Cars", text: "Test drives any day at Mercedes-Benz of Smithtown. Ask for MK.", href: "/test-drive", cta: "Reserve" },
  { label: "Code", text: "Founding Redesign: a few full site rebuilds this quarter, discounted.", href: "/redesign", cta: "Claim a spot" },
  { label: "Creative", text: "The 48-Hour Positioning Audit: $97, no call required.", href: "/audit", cta: "Get the audit" },
  { label: "Content", text: "Free: the 12-point Positioning Checklist I run before client work.", href: "#follow", cta: "Get it free" },
];

/**
 * MK's own lines, word for word from her books and poems, for the neon quote sign.
 * `pink` marks the line that glows pink.
 */
export const NEON_LINES: { lines: string[]; pink: number; from: string }[] = [
  { lines: ["i will never", "dim another soul", "to make my own", "look brighter."], pink: 3, from: "Make My Own Light" },
  { lines: ["you are not late.", "you are simply not", "on a schedule", "that was ever yours."], pink: 0, from: "The Meantime" },
  { lines: ["you were never broken.", "you were a", "first draft."], pink: 2, from: "The Reinvention Workbook" },
  { lines: ["positioning gets you", "considered.", "voice gets you", "remembered."], pink: 3, from: "Write Yourself Into the Room" },
  { lines: ["i am the author.", "i always have been."], pink: 0, from: "The Rewrite" },
  { lines: ["i would rather see", "and ache", "than be comfortable", "and asleep."], pink: 1, from: "Make My Own Light" },
  { lines: ["the room was never locked.", "you just had not written", "the sentence", "that opened it yet."], pink: 0, from: "Write Yourself Into the Room" },
  { lines: ["confidence is a gift", "i am learning to give myself,", "since no one ever", "wrapped it for me."], pink: 3, from: "Make My Own Light" },
  { lines: ["you are not", "too sensitive.", "you were trained", "to doubt your own senses."], pink: 3, from: "The Invisible Bruise" },
  { lines: ["i know which loves", "are load-bearing", "and which are only", "decorative."], pink: 1, from: "Make My Own Light" },
  { lines: ["i am tired of making", "a crime scene", "out of my softness."], pink: 2, from: "Still Here, Still Hers" },
  { lines: ["you take a shower", "and call it a victory", "because it is."], pink: 2, from: "Still Here, Still Hers" },
  { lines: ["you need to be you.", "not a sister. not a daughter.", "not an aunt.", "just you."], pink: 3, from: "Dad, in Street Smarts" },
  { lines: ["i wanted to be chosen", "so badly that i kept", "mistaking attention", "for care."], pink: 2, from: "Still Here, Still Hers" },
  { lines: ["to be continued", "is just a longer way", "of saying", "i survived."], pink: 3, from: "Make My Own Light" },
];

/**
 * The lines that carry the brand across every page. They are short, always said
 * in this order, and they run in the ambient background behind each page.
 */
export const BRAND_BEATS: string[] = [
  BRAND.line,
  BRAND.promise,
  "The Four C's, one concierge.",
  "No handoffs. No account managers. You get MK.",
];

/**
 * The ambient background quotes: MK's own lines from NEON_LINES, with a brand beat
 * after every third one so the Four C's keep returning, never out of order.
 */
export const BACKGROUND_QUOTES: string[] = NEON_LINES.flatMap((q, n) => {
  const line = q.lines.join(" ");
  return n % 3 === 2 ? [line, BRAND_BEATS[Math.floor(n / 3) % BRAND_BEATS.length]] : [line];
});
