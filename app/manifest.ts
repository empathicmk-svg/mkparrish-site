import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MK Parrish — Growth Marketing & Positioning Strategist",
    short_name: "MK Parrish",
    description:
      "Growth marketing, positioning, website rewrites, outbound, and audits for founders, consultants, B2B SaaS teams, and growing companies.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
