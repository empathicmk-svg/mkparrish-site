import type { Metadata } from "next";
import Microsite from "./Microsite";

export const metadata: Metadata = {
  title: "Integrated Campaign Manager — Portfolio for iDeals · MK Parrish",
  description:
    "A working portfolio prepared for iDeals: three campaigns owned end-to-end — an integrated Vonage × Salesforce bundle play, EMEA executive roundtables, and a localized EMEA go-to-market — with the context, trade-offs, stakeholders, and KPIs behind each.",
  // Private, invite-shared portfolio — kept out of search + the public sitemap.
  robots: {
    index: false,
    follow: false,
  },
};

export default function IdealsPortfolioPage() {
  return <Microsite />;
}
