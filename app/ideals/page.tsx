import type { Metadata } from "next";
import Microsite from "./Microsite";

export const metadata: Metadata = {
  title: "MK Parrish — Integrated Campaign Manager Portfolio for iDeals",
  description:
    "An iDeals-styled working portfolio for the Integrated Campaign Manager role: an Atlantic Ultraviolet distributor build, an enterprise Vonage channel program, a US localization, and a plan to own the iDeals MCP launch across North America — with coded infographics and KPIs.",
  // Private, invite-shared portfolio — kept out of search + the public sitemap.
  robots: {
    index: false,
    follow: false,
  },
};

export default function IdealsPortfolioPage() {
  return <Microsite />;
}
