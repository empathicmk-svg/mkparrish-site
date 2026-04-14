import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MK Parrish — Growth Marketing, ABM & Fractional CMO",
  description:
    "Revenue-first marketing built for brands that mean business. Demand gen, ABM, partner marketing, fractional growth leadership, and conversion copywriting.",
  metadataBase: new URL("https://www.mkparrish.com"),
  openGraph: {
    title: "MK Parrish — Growth Marketing, ABM & Fractional CMO",
    description:
      "Revenue-first marketing built for brands that mean business.",
    url: "https://www.mkparrish.com",
    siteName: "MK Parrish",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MK Parrish — Growth Marketing, ABM & Fractional CMO",
    description:
      "Revenue-first marketing built for brands that mean business.",
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
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
