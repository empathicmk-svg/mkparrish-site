import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CursorGlow from "@/app/components/CursorGlow";

export const metadata: Metadata = {
  title: {
    default: "MK Parrish — Writer & Marketing Growth Strategist",
    template: "%s — MK Parrish",
  },
  description:
    "MK Parrish: writer & marketing growth strategist. Words, strategy, and reinvention for people ready to stop being misread.",
  applicationName: "MK Parrish",
  metadataBase: new URL("https://www.mkparrish.com"),
  openGraph: {
    title: "MK Parrish — Writer & Marketing Growth Strategist",
    description:
      "MK Parrish: writer & marketing growth strategist. Words, strategy, and reinvention for people ready to stop being misread.",
    url: "https://www.mkparrish.com",
    siteName: "MK Parrish",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MK Parrish — Writer & Marketing Growth Strategist",
    description:
      "MK Parrish: writer & marketing growth strategist. Words, strategy, and reinvention for people ready to stop being misread.",
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
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <CursorGlow />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
