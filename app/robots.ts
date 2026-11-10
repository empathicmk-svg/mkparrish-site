import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/config";

/**
 * Crawlers that collect pages to train or ground AI models, rather than to send
 * readers back. The writing on this site is the product, so they are turned
 * away wholesale.
 *
 * Two honest caveats. This is a request, not a control: a crawler that ignores
 * robots.txt is unaffected, and nothing here stops a human copying and pasting.
 * And `Google-Extended` is a training-only token — it governs Gemini, not
 * Google Search, so blocking it costs no search traffic.
 */
const AI_CRAWLERS = [
  "AI2Bot",
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "Claude-Web",
  "ClaudeBot",
  "DataForSeoBot",
  "Diffbot",
  "FacebookBot",
  "Google-Extended",
  "GPTBot",
  "ImagesiftBot",
  "MistralAI-User",
  "OAI-SearchBot",
  "PanguBot",
  "Perplexity-User",
  "PerplexityBot",
  "Scrapy",
  "SemrushBot-OCOB",
  "Timpibot",
  "Webzio-Extended",
  "YouBot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "meta-externalagent",
  "meta-externalfetcher",
  "omgili",
  "omgilibot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Private working tool — keep it out of search results.
          "/desk",
          // Route handlers, not pages. Nothing here renders anything to index,
          // and /api/download only ever answers a buyer holding a token.
          "/api/",
        ],
        // Note on what is deliberately NOT disallowed: the unlisted pages and
        // everything under /downloads/ are left crawlable on purpose. They are
        // served with `X-Robots-Tag: noindex` (see next.config.ts), and a
        // crawler has to fetch a URL to read that header. Blocking them here
        // instead would leave the bare URLs eligible to appear in results.
      },
      {
        userAgent: AI_CRAWLERS,
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
