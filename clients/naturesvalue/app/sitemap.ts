import type { MetadataRoute } from "next";
import { COMPANY, PAGES } from "./content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: `${COMPANY.url}${p.href === "/" ? "" : p.href}`,
    changeFrequency: "monthly",
    priority: p.href === "/" ? 1 : 0.7,
  }));
}
