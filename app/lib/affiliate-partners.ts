type PartnerStatus = "ready" | "apply" | "watch";

type AffiliatePartner = {
  slug: string;
  name: string;
  category: string;
  audience: string;
  bestFor: string;
  reason: string;
  revenueNote: string;
  href: string;
  applyHref: string;
  applyLabel: string;
  envKey: string;
  status: PartnerStatus;
};

const utm = {
  source: "mkparrish",
  medium: "partners",
  campaign: "sponsorship-affiliates",
};

function envValue(key: string) {
  return (
    process.env[key]?.trim() ||
    process.env[`NEXT_PUBLIC_${key}`]?.trim() ||
    ""
  );
}

function withUtm(url: string, slug: string) {
  try {
    const nextUrl = new URL(url);
    nextUrl.searchParams.set("utm_source", utm.source);
    nextUrl.searchParams.set("utm_medium", utm.medium);
    nextUrl.searchParams.set("utm_campaign", utm.campaign);
    nextUrl.searchParams.set("utm_content", slug);
    return nextUrl.toString();
  } catch {
    return url;
  }
}

function partnerHref(envKey: string, fallback: string, slug: string) {
  return envValue(envKey) || withUtm(fallback, slug);
}

export const AFFILIATE_DISCLOSURE =
  "Some links on this page may be affiliate or referral links. If you buy through one, MK Parrish may earn a commission at no extra cost to you. Recommendations are based on fit, not payout.";

export const AFFILIATE_PARTNERS: AffiliatePartner[] = [
  {
    slug: "kit",
    name: "Kit",
    category: "Email + digital products",
    audience: "Writers, consultants, creators, coaches, and founders building an owned list.",
    bestFor: "Lead magnets, welcome sequences, paid recommendations, commerce, and launch emails.",
    reason:
      "It fits the MK ecosystem because the offer path starts with a useful free chapter or PDF and needs a cleaner way to nurture people into books, audits, Shelf purchases, and retainers.",
    revenueNote:
      "Official program: 50% commission for the first 12 months, plus tiered recurring revenue after 12 months for qualified affiliates.",
    href: partnerHref("AFFILIATE_KIT_URL", "https://kit.com", "kit"),
    applyHref: "https://kit.com/affiliate",
    applyLabel: "Apply to Kit",
    envKey: "AFFILIATE_KIT_URL",
    status: "apply",
  },
  {
    slug: "beehiiv",
    name: "beehiiv",
    category: "Newsletter growth",
    audience: "Newsletter operators, media-style creators, and businesses that want ads, boosts, and direct sponsorships.",
    bestFor: "Newsletter publishing, ad inventory, referral growth, paid subscriptions, and sponsorship operations.",
    reason:
      "It belongs in the partner stack because The Margins can sell sponsor slots, book-launch placements, and useful reader recommendations without turning the site into ad clutter.",
    revenueNote:
      "Official program: up to 60% monthly commission for paying customers referred through the partner program.",
    href: partnerHref("AFFILIATE_BEEHIIV_URL", "https://www.beehiiv.com", "beehiiv"),
    applyHref: "https://www.beehiiv.com/partners",
    applyLabel: "Apply to beehiiv",
    envKey: "AFFILIATE_BEEHIIV_URL",
    status: "apply",
  },
  {
    slug: "hubspot",
    name: "HubSpot",
    category: "CRM + marketing ops",
    audience: "Small teams, B2B founders, consultants, and growth operators who need a real revenue system.",
    bestFor: "CRM setup, pipeline visibility, email, forms, lead routing, and sales/marketing handoff.",
    reason:
      "This is the clean B2B referral fit: MK can recommend it inside audits and outbound systems when a buyer needs CRM discipline, not another spreadsheet.",
    revenueNote:
      "Official program: 30% recurring commission for up to one year, with a 180-day cookie window.",
    href: partnerHref("AFFILIATE_HUBSPOT_URL", "https://www.hubspot.com/products/crm", "hubspot"),
    applyHref: "https://www.hubspot.com/partners/affiliates",
    applyLabel: "Apply to HubSpot",
    envKey: "AFFILIATE_HUBSPOT_URL",
    status: "apply",
  },
  {
    slug: "webflow",
    name: "Webflow",
    category: "Website platform",
    audience: "Founders, marketers, designers, and B2B teams that need to publish sharp sites without a heavy engineering queue.",
    bestFor: "Visual website builds, fast marketing pages, CMS-backed content, and design-forward service businesses.",
    reason:
      "This can support the web-design offer without competing with it: readers who DIY get a tool path; clients who want it handled still hire MK.",
    revenueNote:
      "Official affiliate program: 50% revenue share on a new customer's first subscription for up to 12 months.",
    href: partnerHref("AFFILIATE_WEBFLOW_URL", "https://webflow.com", "webflow"),
    applyHref: "https://webflow.com/solutions/affiliates",
    applyLabel: "Apply to Webflow",
    envKey: "AFFILIATE_WEBFLOW_URL",
    status: "apply",
  },
  {
    slug: "semrush",
    name: "Semrush",
    category: "SEO + AI visibility",
    audience: "B2B teams, content leads, service businesses, and founders trying to prove demand beyond vibes.",
    bestFor: "Keyword research, competitor reads, content planning, visibility audits, and post-launch growth.",
    reason:
      "It pairs naturally with homepage, offer, and growth audits: after the sentence is clear, the market still needs a way to find it.",
    revenueNote:
      "Official program: commissions vary by product and tier, including trial payouts and sale payouts up to $450.",
    href: partnerHref("AFFILIATE_SEMRUSH_URL", "https://www.semrush.com", "semrush"),
    applyHref: "https://www.semrush.com/lp/affiliate-program/en/",
    applyLabel: "Apply to Semrush",
    envKey: "AFFILIATE_SEMRUSH_URL",
    status: "apply",
  },
  {
    slug: "canva",
    name: "Canva",
    category: "Design production",
    audience: "Writers, founders, and solo operators making ebooks, carousels, one-pagers, and launch assets.",
    bestFor: "Lead magnet layouts, PDF covers, social templates, media kits, and fast brand-consistent graphics.",
    reason:
      "The Shelf and free PDF funnel already rely on design as a trust signal. Canva is an easy, high-fit recommendation for the DIY buyer.",
    revenueNote:
      "Use as a practical tool recommendation now; add the affiliate URL once the creator or partner account is approved.",
    href: partnerHref("AFFILIATE_CANVA_URL", "https://www.canva.com", "canva"),
    applyHref: "https://www.canva.com/help/canva-affiliate-marketing-program/",
    applyLabel: "Check Canvassador",
    envKey: "AFFILIATE_CANVA_URL",
    status: "apply",
  },
  {
    slug: "amazon",
    name: "Amazon Author + Associates",
    category: "Books + recommended tools",
    audience: "Readers buying MK books, office setup, writing tools, or the practical stack behind the work.",
    bestFor: "Book traffic, creator-tool roundups, writing desk recommendations, and KDP/paperback discovery.",
    reason:
      "It gives the site a simple commerce layer for books and tools while the higher-ticket service funnel keeps doing the real revenue work.",
    revenueNote:
      "Official Associates program: qualifying purchases can earn up to 10%, depending on category and program rules.",
    href: partnerHref("AFFILIATE_AMAZON_URL", "https://www.amazon.com/author/mkparrish", "amazon"),
    applyHref: "https://affiliate-program.amazon.com/",
    applyLabel: "Join Amazon Associates",
    envKey: "AFFILIATE_AMAZON_URL",
    status: "apply",
  },
];

export const PARTNER_WATCHLIST = [
  {
    name: "Notion",
    reason:
      "Strong audience fit for templates and operating systems, but the official affiliate page currently says it is not accepting new affiliates.",
    href: "https://www.notion.com/affiliates",
  },
  {
    name: "Stripe Apps / experts",
    reason:
      "Potential partner path after the checkout/product funnel is more mature; better as a case-study relationship than a generic affiliate link right now.",
    href: "https://stripe.com/partners",
  },
];

export const SPONSORSHIP_INVENTORY = [
  {
    name: "Rebecoming launch sponsor",
    price: "$500-$1,500",
    fit: "A focused sponsor placement beside the free chapter, book announcement, email mention, and social posts for the memoir audience.",
  },
  {
    name: "Book note sponsor",
    price: "$250-$750",
    fit: "One clearly disclosed sponsor note inside a useful essay or The Margins issue, capped so the reader still trusts the room.",
  },
  {
    name: "Shop guide placement",
    price: "$500-$1,500",
    fit: "A sponsored inclusion beside books, guides, or tool recommendations only when the product naturally helps readers write, publish, heal, organize, or sell.",
  },
  {
    name: "Workshop or book club partner",
    price: "$1,500-$5,000",
    fit: "A co-marketed session around Rebecoming, voice, reinvention, or the Rewrite Your Story framework with partner distribution or software value.",
  },
];

export const PARTNER_APPLICATION_QUEUE = [
  "Create official affiliate accounts for Kit, beehiiv, HubSpot, Webflow, Semrush, Canva/Canvassador, and Amazon Associates.",
  "Replace each fallback URL with the approved affiliate link in Vercel environment variables.",
  "Build one useful article, essay, or book-funnel mention per partner category before asking for higher tiers.",
  "Attach Rebecoming only where it belongs: free chapter, full book, book club/workshop, and reader-recovery sponsorship angles.",
  "Track clicks by partner slug, then double down only where traffic turns into book sales, leads, products, or calls.",
];
