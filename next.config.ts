import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self' https://buy.stripe.com https://checkout.stripe.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://*.vercel-scripts.com https://tracker.metricool.com",
      "connect-src 'self' https://vitals.vercel-insights.com https://*.vercel-insights.com https://va.vercel-scripts.com https://*.vercel-scripts.com https://tracker.metricool.com https://*.metricool.com https://checkout.stripe.com",
      "frame-src 'self' https://checkout.stripe.com https://calendar.google.com https://calendar.app.google",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Static files in public/ are served as octet-stream by default;
        // browsers need the manifest MIME type to honour start_url.
        source: "/desk.webmanifest",
        headers: [{ key: "Content-Type", value: "application/manifest+json" }],
      },
      {
        // The IPX case study is a standalone HTML file in public/, reached at
        // /ipx via the rewrite below. Same octet-stream caveat as above: without
        // an explicit type the browser downloads it instead of rendering it.
        // It is an unlisted client deliverable, so keep it out of search too.
        source: "/ipx",
        headers: [
          { key: "Content-Type", value: "text/html; charset=utf-8" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/ipx.html",
        headers: [
          { key: "Content-Type", value: "text/html; charset=utf-8" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        // Serve the one-pager with its real type so it opens in the browser's
        // PDF viewer rather than downloading as an unnamed blob.
        source: "/downloads/IPX-Digital-Media-Plan-MK-Parrish.pdf",
        headers: [
          { key: "Content-Type", value: "application/pdf" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // The IPX case study lives as a self-contained HTML file in public/ so it
      // keeps its own dark theme and scripts, untouched by the site's chrome.
      // The rewrite gives it the clean /ipx URL. It is deliberately absent from
      // Nav, Footer and sitemap: shared by link only.
      {
        source: "/ipx",
        destination: "/ipx.html",
      },
    ];
  },
  async redirects() {
    return [
      // The store lives at /shop. /shelf and /shelf/[slug] redirect to /shop in
      // the route handlers; keep the old /theshelf path working too.
      {
        source: "/theshelf/:path*",
        destination: "/shop/:path*",
        permanent: true,
      },
      // The booking page lives at /book; /booking is the more natural word
      // people type/link, so keep it working.
      {
        source: "/booking",
        destination: "/book",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
