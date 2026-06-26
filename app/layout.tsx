import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CursorGlow from "@/app/components/CursorGlow";
import LeadCapture from "@/app/components/LeadCapture";
import MonetizationDrawer from "@/app/components/MonetizationDrawer";
import { Analytics } from "@vercel/analytics/next";
import { CONTACT, SITE_URL, SOCIALS } from "@/app/lib/config";

export const metadata: Metadata = {
  title: {
    default: "MK Parrish | Growth Marketing, Positioning & Brand Strategy",
    template: "%s — MK Parrish",
  },
  description:
    "Marketing strategy, positioning, website rewrites, outbound, and growth audits for founders, consultants, B2B SaaS teams, and growing companies.",
  applicationName: "MK Parrish",
  metadataBase: new URL(SITE_URL),
  keywords: [
    "growth marketing consultant",
    "positioning strategist",
    "brand messaging consultant",
    "website rewrite",
    "B2B SaaS marketing",
    "founder marketing strategy",
    "LinkedIn positioning audit",
    "MK Parrish",
  ],
  authors: [{ name: "MK Parrish", url: "https://www.mkparrish.com" }],
  creator: "MK Parrish",
  publisher: "MK Parrish",
  category: "Marketing consulting",
  openGraph: {
    title: "MK Parrish | Growth Marketing, Positioning & Brand Strategy",
    description:
      "Marketing strategy, positioning, website rewrites, outbound, and growth audits for founders, consultants, B2B SaaS teams, and growing companies.",
    url: SITE_URL,
    siteName: "MK Parrish",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MK Parrish | Growth Marketing, Positioning & Brand Strategy",
    description:
      "Marketing strategy, positioning, website rewrites, outbound, and growth audits for founders, consultants, B2B SaaS teams, and growing companies.",
  },
  appleWebApp: {
    title: "MK Parrish",
    statusBarStyle: "black-translucent",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "MK Parrish",
    url: SITE_URL,
    jobTitle: "Growth Marketing and Positioning Strategist",
    email: CONTACT.email,
    telephone: CONTACT.phone,
    sameAs: SOCIALS.map((social) => social.href),
    knowsAbout: [
      "Growth marketing",
      "Positioning",
      "Website copywriting",
      "Outbound strategy",
      "B2B SaaS marketing",
      "LinkedIn positioning",
      "Digital products",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "MK Parrish",
    url: SITE_URL,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    areaServed: "United States",
    serviceType: [
      "Growth audit",
      "Positioning strategy",
      "Website rewrite",
      "Outbound marketing",
      "Fractional growth leadership",
      "Brand messaging",
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <CursorGlow />
        <Nav />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MonetizationDrawer />
        <LeadCapture />
        <Analytics />
      </body>
    </html>
  );
}
