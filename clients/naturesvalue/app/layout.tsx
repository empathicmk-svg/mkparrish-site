import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SiteProvider from "./components/SiteProvider";
import Reveal from "./components/Reveal";
import BackToTop from "./components/BackToTop";
import { COMPANY, LOCATIONS } from "./content/site";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: `${COMPANY.name} | Private Label Supplement Manufacturer`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Nature's Value is a cGMP private label and contract manufacturer of vitamins and dietary supplements: capsules, tablets, liquid caps and powders, from formula to finished bottle.",
  openGraph: { type: "website", siteName: COMPANY.name, url: COMPANY.url },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.legalName,
  url: COMPANY.url,
  foundingDate: String(COMPANY.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: "468 Mill Road", // VERIFY, matches LOCATIONS[0]
    addressLocality: "Coram",
    addressRegion: "NY",
    postalCode: "11727",
    addressCountry: "US",
  },
  description: LOCATIONS[0].note,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-forest focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <BackToTop />
          <Reveal />
        </SiteProvider>
      </body>
    </html>
  );
}
