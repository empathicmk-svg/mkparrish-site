// ─────────────────────────────────────────────────────────────────────────────
// Carousel generator — multi-slide swipe posts (1080×1350) for IG / TikTok.
//
//   node scripts/social/generate-carousel.mjs [--start=2026-07-01]
//
// Writes scripts/social/out/carousels/ :
//   • <slug>-NN.png         — the slides (cover → value slides → close)
//   • carousels.csv         — one row per carousel: slide list, caption, link
// ─────────────────────────────────────────────────────────────────────────────

import { mkdir, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import puppeteer from "puppeteer";
import { POSTS } from "./catalog.mjs";
import { renderSlide, slideCount, SLIDE } from "./template-carousel.mjs";
import { csvRow, igCaption, hashtags, scheduler, nextMonday } from "./util.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "out", "carousels");

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, v] = a.replace(/^--/, "").split("=");
  return [k, v ?? true];
}));
const slot = scheduler(args.start ? new Date(String(args.start)) : nextMonday());

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"], headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: SLIDE.w, height: SLIDE.h, deviceScaleFactor: 1 });

  const rows = [];
  let made = 0;

  for (let p = 0; p < POSTS.length; p++) {
    const post = POSTS[p];
    const total = slideCount(post);
    const files = [];
    for (let i = 0; i < total; i++) {
      await page.setContent(renderSlide(post, i, total), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const file = `${post.slug}-${String(i + 1).padStart(2, "0")}.png`;
      await page.screenshot({ path: join(OUT, file), type: "png" });
      files.push(file);
      made++;
    }
    console.log(`  ✓ ${post.slug} — ${total} slides`);
    const s = slot(p);
    rows.push(csvRow([s.date, s.time, total, files.join(" | "), igCaption(post), post.link]));
  }
  await browser.close();

  const header = ["Date", "Time", "Slides", "Slide Files (in order)", "Caption", "Link"];
  await writeFile(join(OUT, "carousels.csv"), [csvRow(header), ...rows].join("\n"));
  void hashtags; // (exported for callers; captions already embed tags)

  console.log(`\n✅ ${made} slides across ${POSTS.length} carousels → scripts/social/out/carousels/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
