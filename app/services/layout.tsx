import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services · Growth, Websites & Messaging",
  description:
    "Websites, positioning, outbound, and full-funnel growth handled by one senior operator. From the $97 Positioning Audit to The Build, The Rewrite, and ongoing growth systems — pick the engagement or book a call.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — MK Parrish",
    description:
      "Websites, positioning, outbound, and growth — done for you by one senior operator. Start with the $97 audit or book a call.",
    url: "https://www.mkparrish.com/services",
    images: ["/og/services.png"],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
