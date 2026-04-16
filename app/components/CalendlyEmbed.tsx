"use client";

import Script from "next/script";
import { CALENDLY_URL } from "@/app/lib/config";

// Strip www. — Calendly's widget requires calendly.com (no www) for inline embeds
const baseUrl = CALENDLY_URL.replace("https://www.calendly.com", "https://calendly.com");

const EMBED_URL =
  `${baseUrl}?background_color=080808&text_color=f0f0ee&primary_color=f2afc6&hide_gdpr_banner=1&hide_event_type_details=0`;

export default function CalendlyEmbed() {
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: 700 }}>
      {/* Petal accent line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-petal opacity-30" />

      <div
        className="calendly-inline-widget w-full"
        data-url={EMBED_URL}
        style={{ minWidth: 320, height: 700 }}
      />

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
