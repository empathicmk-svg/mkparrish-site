export const LEAD_MAGNETS = [
  {
    slug: "positioning-checklist",
    label: "Positioning",
    title: "The Positioning Checklist",
    shortTitle: "Positioning Checklist",
    promise:
      "A 12-point audit for the copy that sounds fine but still does not make the right person move.",
    proof: "Best for taglines, offers, sales pages, and pages that feel too vague.",
    download: "/downloads/positioning-checklist.pdf",
    emailSubject: "Your Positioning Checklist",
    emailTeaser:
      "Twelve questions that find where your message is vague, dated, or quietly losing the right buyer.",
  },
  {
    slug: "homepage-leak-map",
    label: "Homepage",
    title: "The Homepage Leak Map",
    shortTitle: "Homepage Leak Map",
    promise:
      "Nine places your homepage loses trust, momentum, or money before a visitor ever books.",
    proof: "Best for service businesses, consultants, founders, and B2B teams with traffic but weak conversion.",
    download: "/downloads/homepage-leak-map.pdf",
    emailSubject: "Your Homepage Leak Map",
    emailTeaser:
      "A fast diagnostic for the hero, offer path, proof, CTA, and lead capture moments that decide whether the right buyer stays.",
  },
  {
    slug: "about-page-rewrite-map",
    label: "About",
    title: "The About Page Rewrite Map",
    shortTitle: "About Page Map",
    promise:
      "A raw-but-useful framework for turning biography into trust, taste, and buyer confidence.",
    proof: "Best for founders, consultants, writers, and operators whose story is stronger than the page says.",
    download: "/downloads/about-page-rewrite-map.pdf",
    emailSubject: "Your About Page Rewrite Map",
    emailTeaser:
      "A practical rewrite map for cutting the resume sludge and making the page feel human, credible, and specific.",
  },
  {
    slug: "partnership-revenue-map",
    label: "Partners",
    title: "The Partnership Revenue Map",
    shortTitle: "Partnership Revenue Map",
    promise:
      "A fast map for turning useful recommendations into affiliate, sponsor, and service revenue without cheapening the brand.",
    proof: "Best for creators, consultants, writers, and service businesses with trusted content but underbuilt partner revenue.",
    download: "/downloads/partnership-revenue-map.pdf",
    emailSubject: "Your Partnership Revenue Map",
    emailTeaser:
      "A practical map for choosing partner tools, placing affiliate links, pitching sponsors, and keeping the paid offer path intact.",
  },
] as const;

export type LeadMagnet = (typeof LEAD_MAGNETS)[number];

export const DEFAULT_LEAD_MAGNET = LEAD_MAGNETS[0];

function normalizeLeadMagnetKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getLeadMagnet(slug: unknown): LeadMagnet {
  if (typeof slug !== "string") return DEFAULT_LEAD_MAGNET;
  const key = normalizeLeadMagnetKey(slug);
  return (
    LEAD_MAGNETS.find((magnet) =>
      [magnet.slug, magnet.label, magnet.title, magnet.shortTitle]
        .map(normalizeLeadMagnetKey)
        .includes(key),
    ) ?? DEFAULT_LEAD_MAGNET
  );
}
