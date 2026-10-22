import type { MetadataRoute } from "next";
import { COMPANY, IS_PREVIEW } from "./content/site";

export default function robots(): MetadataRoute.Robots {
  if (IS_PREVIEW) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${COMPANY.url}/sitemap.xml` };
}
