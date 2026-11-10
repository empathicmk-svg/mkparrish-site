// ─────────────────────────────────────────────────────────────────────────────
// Build a Metricool bulk-upload CSV for the reels.
//
//   node scripts/social/generate-metricool.mjs [--start=YYYY-MM-DD] [--base=URL]
//
// Metricool's CSV importer needs media as a PUBLIC URL that points straight at
// the file, so this references the reels where they're hosted on the site:
//   <base>/social/<slug>.mp4      (default base: https://www.mkparrish.com)
//
// One row per reel, published to BOTH Instagram (as a Reel) and TikTok. Columns
// follow Metricool's template order; if Metricool updates the template, download
// theirs and paste these values in (the data also lives in captions.csv).
// ─────────────────────────────────────────────────────────────────────────────

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { POSTS } from "./catalog.mjs";
import { csvRow, igCaption, scheduler } from "./util.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "out", "videos");

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, v] = a.replace(/^--/, "").split("=");
  return [k, v ?? true];
}));
const BASE = String(args.base || "https://www.mkparrish.com").replace(/\/$/, "");
function startDate() {
  if (args.start) return new Date(String(args.start));
  const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(0, 0, 0, 0); return d; // tomorrow
}
const slot = scheduler(startDate());

const HEADER = [
  "Text", "Date", "Time", "Draft",
  "Facebook", "Twitter/X", "LinkedIn", "GBP", "Instagram", "Pinterest",
  "TikTok", "YouTube", "Threads", "Bluesky",
  "Instagram Post Type", "Picture Url 1",
];

const rows = POSTS.map((p, i) => {
  const s = slot(i);
  return csvRow([
    igCaption(p),          // Text — full caption + shop CTA + hashtags
    s.date,                // Date (YYYY-MM-DD)
    s.time,                // Time (HH:MM)
    "FALSE",               // Draft
    "FALSE",               // Facebook
    "FALSE",               // Twitter/X
    "FALSE",               // LinkedIn
    "FALSE",               // GBP
    "TRUE",                // Instagram
    "FALSE",               // Pinterest
    "TRUE",                // TikTok
    "FALSE",               // YouTube
    "FALSE",               // Threads
    "FALSE",               // Bluesky
    "REEL",                // Instagram Post Type
    `${BASE}/social/${p.slug}.mp4`,
  ]);
});

await writeFile(join(OUT, "metricool.csv"), "﻿" + [csvRow(HEADER), ...rows].join("\r\n"), "utf8");
console.log(`✅ metricool.csv → ${POSTS.length} reels, IG Reel + TikTok, base ${BASE}`);
console.log(`   schedule starts ${slot(0).date} ${slot(0).time}`);
