export type QuoteCategory =
  | "philosopher"
  | "artist"
  | "rapper"
  | "screen"
  | "business"
  | "mk";

export type SiteQuote = {
  slug: string;
  text: string;
  author: string;
  role: string;
  category: QuoteCategory;
};

export const SITE_QUOTES: SiteQuote[] = [
  {
    slug: "marcus-mind",
    text: "You have power over your mind, not outside events.",
    author: "Marcus Aurelius",
    role: "Stoic philosopher",
    category: "philosopher",
  },
  {
    slug: "seneca-difficulty",
    text: "Difficulties strengthen the mind, as labor does the body.",
    author: "Seneca",
    role: "Stoic philosopher",
    category: "philosopher",
  },
  {
    slug: "nietzsche-why",
    text: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
    role: "Philosopher",
    category: "philosopher",
  },
  {
    slug: "camus-free",
    text: "Become so absolutely free that your existence is an act of rebellion.",
    author: "Albert Camus",
    role: "Writer and philosopher",
    category: "philosopher",
  },
  {
    slug: "john-wayne-courage",
    text: "Courage is being scared to death, but saddling up anyway.",
    author: "John Wayne",
    role: "Screen icon",
    category: "screen",
  },
  {
    slug: "marilyn-fear",
    text: "Fear is stupid. So are regrets.",
    author: "Marilyn Monroe",
    role: "Screen icon",
    category: "screen",
  },
  {
    slug: "estee-worked",
    text: "I never dreamed about success. I worked for it.",
    author: "Estee Lauder",
    role: "Beauty founder",
    category: "business",
  },
  {
    slug: "jobs-hungry",
    text: "Stay hungry. Stay foolish.",
    author: "Steve Jobs",
    role: "Founder",
    category: "business",
  },
  {
    slug: "coco-style",
    text: "Fashion fades, only style remains the same.",
    author: "Coco Chanel",
    role: "Designer",
    category: "artist",
  },
  {
    slug: "biggie-timid",
    text: "Stay far from timid.",
    author: "The Notorious B.I.G.",
    role: "Rapper",
    category: "rapper",
  },
  {
    slug: "jayz-business",
    text: "I'm not a businessman, I'm a business, man.",
    author: "Jay-Z",
    role: "Rapper and founder",
    category: "rapper",
  },
  {
    slug: "nipsey-luck",
    text: "Luck is just being prepared at all times.",
    author: "Nipsey Hussle",
    role: "Rapper and entrepreneur",
    category: "rapper",
  },
  {
    slug: "mk-rebecoming",
    text: "You are not starting over. You are rebecoming.",
    author: "MK Parrish",
    role: "Writer and operator",
    category: "mk",
  },
  {
    slug: "mk-first-draft",
    text: "The first draft is survival. The second draft is power.",
    author: "MK Parrish",
    role: "Writer and operator",
    category: "mk",
  },
  {
    slug: "mk-seen",
    text: "Make the true thing impossible to misread.",
    author: "MK Parrish",
    role: "Writer and operator",
    category: "mk",
  },
  {
    slug: "mk-underestimated",
    text: "Do not confuse being underestimated with being finished.",
    author: "MK Parrish",
    role: "Writer and operator",
    category: "mk",
  },
];

export function quoteAt(index: number) {
  return SITE_QUOTES[index % SITE_QUOTES.length];
}

export function quotesBySlug(slugs: string[]) {
  return slugs
    .map((slug) => SITE_QUOTES.find((quote) => quote.slug === slug))
    .filter((quote): quote is SiteQuote => Boolean(quote));
}
