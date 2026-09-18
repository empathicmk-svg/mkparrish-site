import type { Metadata } from "next";
import BenzNav from "./BenzNav";
import BenzFooter from "./BenzFooter";
import BenzPopup from "./BenzPopup";
import StickyCTA from "./StickyCTA";
import { BENZ } from "./data";

const TITLE = "The Benz Blonde — MK Parrish at Mercedes-Benz of Smithtown";
const DESCRIPTION =
  "Buy your Mercedes-Benz from a human. MK Parrish — The Benz Blonde — gives you the real number first, appraises your trade honestly, and answers her own texts. Long Island, NYC, and out-of-state.";

export const metadata: Metadata = {
  // The microsite is its own brand, so it opts out of the "%s — MK Parrish"
  // template the root layout applies to every other page.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/benz-blonde" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.mkparrish.com/benz-blonde",
    siteName: "The Benz Blonde",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/**
 * Structured data. A person shopping for a car searches locally, so the page
 * needs to tell Google who this is, where she is, and how to reach her.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: BENZ.person,
  alternateName: BENZ.brand,
  jobTitle: "Mercedes-Benz Sales Consultant",
  telephone: BENZ.phone,
  email: BENZ.email,
  url: "https://www.mkparrish.com/benz-blonde",
  worksFor: { "@type": "AutoDealer", name: BENZ.store },
  areaServed: ["Long Island", "Nassau County", "Suffolk County", "Queens", "New York City"],
};

export default function BenzLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-obsidian">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <BenzNav />
      {/* Clears the phone-only action bar so it never covers the last section. */}
      <div className="pb-[4.25rem] lg:pb-0">{children}</div>
      <BenzFooter />
      <StickyCTA />
      <BenzPopup />
    </div>
  );
}
