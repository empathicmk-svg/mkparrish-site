"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

// The $97 Positioning Audit's Stripe link id (from STRIPE_AUDIT) so we can tag
// that specific buy separately from other Stripe checkouts.
const AUDIT_LINK_ID = "9B64gA2nL51KamMaX38AE0e";

// One delegated click listener classifies clicks on conversion links and sends
// a Vercel Analytics custom event — no need to instrument every button.
export default function ConversionTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href) return;

      let event: string | null = null;
      const props: Record<string, string> = {};

      if (href.includes(AUDIT_LINK_ID)) {
        event = "audit_checkout_click";
      } else if (href.includes("/checkout/")) {
        event = "checkout_click";
        const slug = href.split("/checkout/")[1]?.split(/[?#]/)[0];
        if (slug) props.product = slug;
        props.format = href.includes("format=paperback") ? "paperback" : "ebook";
      } else if (href.includes("buy.stripe.com")) {
        event = "stripe_checkout_click";
      } else if (href.includes("calendly.com") || href.endsWith("/book") || href.includes("/book?") || href.includes("/book#")) {
        event = "book_call_click";
      } else if (href.includes("/redesign")) {
        event = "redesign_click";
      } else if (href.includes("substack.com") && href.includes("subscribe")) {
        event = "subscribe_click";
      }

      if (event) {
        try {
          track(event, props);
        } catch {
          /* analytics is best-effort — never block navigation */
        }
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
