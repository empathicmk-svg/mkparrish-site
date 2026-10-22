import type { MetadataRoute } from "next";
import { COMPANY } from "./content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/capabilities", "/quality", "/about", "/contact"].map((path) => ({
    url: `${COMPANY.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
