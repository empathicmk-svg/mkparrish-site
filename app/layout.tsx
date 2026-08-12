import type { Metadata } from "next";
import "./globals.css";
import "./font-fixes.css";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CursorGlow from "@/app/components/CursorGlow";
import LeadCapture from "@/app/components/LeadCapture";
import SiteChrome from "@/app/components/SiteChrome";
import MonetizationDrawer from "@/app/components/MonetizationDrawer";
import SiteQuoteRail from "@/app/components/SiteQuoteRail";
import { Analytics } from "@vercel/analytics/next";
import ConversionTracking from "@/app/components/ConversionTracking";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "MK Parrish — Growth Strategy, Websites & Messaging",
    template: "%s — MK Parrish",
  },
  description:
    "Websites, outbound, and messaging that turn how you're seen into revenue. Senior growth strategy for B2B SaaS, agencies, and growth-stage teams.",
  applicationName: "MK Parrish",
  metadataBase: new URL("https://www.mkparrish.com"),
  openGraph: {
    title: "MK Parrish — Growth Strategy, Websites & Messaging",
    description:
      "Websites, outbound, and messaging that turn how you're seen into revenue. Senior growth strategy for B2B SaaS, agencies, and growth-stage teams.",
    url: "https://www.mkparrish.com",
    siteName: "MK Parrish",
    type: "website",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "MK Parrish — Turn how you're seen into revenue." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MK Parrish — Growth Strategy, Websites & Messaging",
    description:
      "Websites, outbound, and messaging that turn how you're seen into revenue. Senior growth strategy for B2B SaaS, agencies, and growth-stage teams.",
    images: ["/og/default.png"],
  },
  appleWebApp: {
    title: "MK Parrish",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="site-body flex min-h-full flex-col overflow-x-hidden">
        <SiteChrome>
          <CursorGlow />
          <Nav />
        </SiteChrome>
        <main className="site-main flex-1 pb-20 md:pb-0">{children}</main>
        <SiteChrome>
          <SiteQuoteRail />
          <MonetizationDrawer />
          <LeadCapture />
          <Footer />
        </SiteChrome>
        <Analytics />
        <ConversionTracking />
        <Script id="metricool-tracker" strategy="afterInteractive">
          {`function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"9cdfb02654dbeaea53c4119175b6e129"})});`}
        </Script>
      </body>
    </html>
  );
}
