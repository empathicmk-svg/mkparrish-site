import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import RevealObserver from "@/app/components/RevealObserver";
import { brand } from "@/content/site";

const title = `${brand.legalName}: Injectables & Skin`;

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${brand.name}` },
  description: brand.description,
  applicationName: brand.name,
  // VERIFY: set to the production domain once one is chosen.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: { title, description: brand.description, siteName: brand.legalName, type: "website" },
  twitter: { card: "summary_large_image", title, description: brand.description },
};

export const viewport: Viewport = {
  themeColor: "#12100f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Same families as mkparrish.com, trimmed to the weights this site uses. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--color-pearl)] focus:px-4 focus:py-2 focus:text-[var(--color-void)]">
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
