import type { MetadataRoute } from "next";
import { EBOOKS, SERVICE_EBOOKS, SITE_URL } from "@/app/lib/config";

const lastModified = new Date("2026-07-06");

const staticRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/rebecoming", changeFrequency: "weekly", priority: 0.95 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/studio", changeFrequency: "monthly", priority: 0.8 },
  { path: "/growth", changeFrequency: "monthly", priority: 0.8 },
  { path: "/brand", changeFrequency: "monthly", priority: 0.8 },
  { path: "/audit", changeFrequency: "monthly", priority: 0.75 },
  { path: "/how-i-work", changeFrequency: "monthly", priority: 0.75 },
  { path: "/shelf", changeFrequency: "weekly", priority: 0.9 },
  { path: "/shop", changeFrequency: "weekly", priority: 0.8 },
  { path: "/margins", changeFrequency: "weekly", priority: 0.85 },
  { path: "/writing", changeFrequency: "monthly", priority: 0.75 },
  { path: "/posts", changeFrequency: "weekly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/book", changeFrequency: "monthly", priority: 0.85 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const productRoutes = [...EBOOKS, ...SERVICE_EBOOKS].flatMap((product) => [
    {
      url: `${SITE_URL}/shelf/${product.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    },
    {
      url: `${SITE_URL}/shop/${product.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    },
  ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...productRoutes,
  ];
}
