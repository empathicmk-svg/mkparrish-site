// ─────────────────────────────────────────────────────────────────────────────
// Bulk social generator.
//
//   node scripts/social/generate.mjs [--formats=reel,feed] [--start=2026-07-01]
//
// Produces, in scripts/social/out/ :
//   • <slug>-<format>.png        — stylized post images (1080×1920 / 1080×1350)
//   • captions.csv               — every post + hook, caption, hashtags, link
//   • instagram-bulk.csv         — IG/Meta-style schedule (uses the feed images)
//   • tiktok-bulk.csv            — TikTok-style schedule (uses the reel images)
//   • bulk-schedule.csv          — generic Date/Time/Platform/Media/Caption sheet
//   • manifest.json              — machine-readable index of everything
//
// The images + CSVs drop straight into Meta Business Suite, Later, Buffer,
// Metricool, or TikTok's bulk uploader (map the columns on import).
// ─────────────────────────────────────────────────────────────────────────────

import { mkdir, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import puppeteer from "puppeteer";
import { POSTS, BRAND, BASE_TAGS } from "./catalog.mjs";
import { renderPost, FORMATS } from "./template.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "out");

// ── args ─────────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);
const FORMAT_LIST = (args.formats ? String(args.formats) : "reel,feed")
  .split(",")
  .map((s) => s.trim())
  .filter((f) => FORMATS[f]);
const START = args.start ? new Date(String(args.start)) : nextMonday();
const TIMES = ["09:00", "12:30", "18:00"]; // a simple 3-slots/day cadence

// ── helpers ──────────────────────────────────────────────────────────────────
function nextMonday() {
  const d = new Date();
  d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
  d.setHours(0, 0, 0, 0);
  return d;
}
function slotDate(i) {
  const day = Math.floor(i / TIMES.length);
  const d = new Date(START);
  d.setDate(d.getDate() + day);
  return { date: d.toISOString().slice(0, 10), time: TIMES[i % TIMES.length] };
}
const csvCell = (v = "") => `"${String(v).replace(/"/g, '""')}"`;
const csvRow = (cells) => cells.map(csvCell).join(",");
const hashtags = (post) =>
  [...new Set([...(post.tags || []), ...BASE_TAGS])].map((t) => `#${t}`).join(" ");
const igCaption = (post) =>
  `${post.caption}\n\n🔗 ${post.cta}: link in bio\n\n${hashtags(post)}`;
const ttCaption = (post) => {
  const tags = [...new Set([...(post.tags || []), ...BASE_TAGS])]
    .slice(0, 6)
    .map((t) => `#${t}`)
    .join(" ");
  const firstLine = post.caption.split("\n")[0];
  return `${firstLine} ${tags} #fyp`;
};

// ── render ───────────────────────────────────────────────────────────────────
async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();

  const manifest = [];
  let made = 0;

  for (const post of POSTS) {
    const entry = { slug: post.slug, kicker: post.kicker, link: post.link, files: {} };
    for (const format of FORMAT_LIST) {
      const { w, h } = FORMATS[format];
      await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
      await page.setContent(renderPost(post, format), { waitUntil: "load" });
      // Wait for webfonts, but never hang on it.
      await page.evaluate(() =>
        Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 4000))])
      );
      await new Promise((r) => setTimeout(r, 150));
      const file = `${post.slug}-${format}.png`;
      await page.screenshot({ path: join(OUT, file), type: "png" });
      entry.files[format] = file;
      made++;
      console.log(`  ✓ ${file}`);
    }
    manifest.push(entry);
  }
  await browser.close();

  // ── captions.csv (the master sheet) ────────────────────────────────────────
  const capHeader = ["slug", "category", "kicker", "price", "hook", "caption", "hashtags", "link", "reel_image", "feed_image"];
  const capRows = POSTS.map((p) =>
    csvRow([
      p.slug,
      p.category,
      p.kicker,
      p.price,
      p.hook.replace(/\*/g, "").replace(/\n/g, " "),
      p.caption,
      hashtags(p),
      p.link,
      `${p.slug}-reel.png`,
      `${p.slug}-feed.png`,
    ])
  );
  await writeFile(join(OUT, "captions.csv"), [csvRow(capHeader), ...capRows].join("\n"));

  // ── platform bulk sheets ───────────────────────────────────────────────────
  const igHeader = ["Date", "Time", "Media File", "Caption", "First Comment Link"];
  const ttHeader = ["Date", "Time", "Video/Image File", "Caption", "Link"];
  const genHeader = ["Date", "Time", "Platform", "Media File", "Caption", "Link"];

  const igRows = [];
  const ttRows = [];
  const genRows = [];

  POSTS.forEach((p, i) => {
    const ig = slotDate(i);
    igRows.push(csvRow([ig.date, ig.time, `${p.slug}-feed.png`, igCaption(p), p.link]));
    genRows.push(csvRow([ig.date, ig.time, "Instagram", `${p.slug}-feed.png`, igCaption(p), p.link]));

    const tt = slotDate(i); // same cadence, reel asset
    ttRows.push(csvRow([tt.date, tt.time, `${p.slug}-reel.png`, ttCaption(p), p.link]));
    genRows.push(csvRow([tt.date, tt.time, "TikTok", `${p.slug}-reel.png`, ttCaption(p), p.link]));
  });

  await writeFile(join(OUT, "instagram-bulk.csv"), [csvRow(igHeader), ...igRows].join("\n"));
  await writeFile(join(OUT, "tiktok-bulk.csv"), [csvRow(ttHeader), ...ttRows].join("\n"));
  await writeFile(join(OUT, "bulk-schedule.csv"), [csvRow(genHeader), ...genRows].join("\n"));

  await writeFile(
    join(OUT, "manifest.json"),
    JSON.stringify({ brand: BRAND, generatedAt: new Date().toISOString(), formats: FORMAT_LIST, posts: manifest }, null, 2)
  );

  console.log(`\n✅ ${made} images for ${POSTS.length} posts → scripts/social/out/`);
  console.log("   captions.csv · instagram-bulk.csv · tiktok-bulk.csv · bulk-schedule.csv · manifest.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
