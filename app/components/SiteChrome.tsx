'use client';

import { usePathname } from "next/navigation";

/**
 * Hides the marketing chrome (nav, footer, drawers, popups) on standalone
 * tool routes. `/desk` is a full-screen app with its own bottom tab bar; the
 * site's mobile nav overlaps it and the lead-capture modal covers it, so the
 * page is unusable on a phone with the chrome rendered. `/links` is the
 * Instagram/TikTok link-in-bio page and should open as a single clean card.
 */
const BARE_ROUTES = ["/desk", "/ideals", "/links"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));
  return bare ? null : <>{children}</>;
}
