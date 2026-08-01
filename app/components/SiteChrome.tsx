'use client';

import { usePathname } from "next/navigation";

/**
 * Hides the marketing chrome (nav, footer, drawers, popups) on standalone
 * tool routes. `/desk` is a full-screen app with its own bottom tab bar; the
 * site's mobile nav overlaps it and the lead-capture modal covers it, so the
 * page is unusable on a phone with the chrome rendered.
 */
const BARE_ROUTES = ["/desk"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));
  return bare ? null : <>{children}</>;
}
