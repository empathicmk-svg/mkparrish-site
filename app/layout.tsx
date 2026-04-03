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
    description: "Revenue-first marketing built for brands that mean business.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
