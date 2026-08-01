import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private working tool — keep it out of search results.
      disallow: "/desk",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
