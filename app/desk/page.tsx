import type { Metadata, Viewport } from "next";
import DeskApp from "./DeskApp";

export const metadata: Metadata = {
  title: "Deal Desk",
  // Private working tool, not part of the public site.
  robots: { index: false, follow: false, nocache: true },
  // Makes "Add to Home Screen" produce a real app icon that opens fullscreen
  // with no browser chrome, instead of a generic screenshot bookmark.
  appleWebApp: {
    capable: true,
    title: "Deal Desk",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: [{ url: "/desk-icon-180.png", sizes: "180x180" }],
    icon: [{ url: "/desk-icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  // Next emits the modern `mobile-web-app-capable`; iOS versions before 18
  // only honour the legacy tag, so ship both.
  other: { "apple-mobile-web-app-capable": "yes" },
};

export const viewport: Viewport = {
  themeColor: "#12303c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function DeskPage() {
  return <DeskApp />;
}
