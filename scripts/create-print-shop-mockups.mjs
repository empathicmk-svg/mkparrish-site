#!/usr/bin/env node
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";
import { FONT_CSS } from "./social/fonts.mjs";

const ROOT = process.cwd();
const COVER_DIR = path.join(ROOT, "public", "downloads", "covers");
const SYSTEM_CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const prints = [
  {
    slug: "promise-me",
    title: "Promise Me",
    line: "Promise me you will not abandon yourself again.",
    byline: "Original MK Parrish line",
  },
  {
    slug: "the-rewrite-print",
    title: "The Rewrite",
    line: "I picked up the pen and felt the world shift.",
    byline: "Original MK Parrish poem",
  },
  {
    slug: "selected-lines",
    title: "Selected Lines",
    line: "The page is still yours.",
    byline: "Original MK Parrish line",
  },
  {
    slug: "live-out-loud-print",
    title: "Live Out Loud",
    line: "I am here to live out loud.",
    byline: "Quote page proof / Emile Zola",
  },
  {
    slug: "not-afraid-of-storms-print",
    title: "Not Afraid of Storms",
    line: "I am not afraid of storms.",
    byline: "Quote page proof / Louisa May Alcott",
  },
  {
    slug: "never-too-late-print",
    title: "Never Too Late",
    line: "It is never too late.",
    byline: "Quote page proof / George Eliot",
  },
  {
    slug: "custom-quote-print",
    title: "Custom Quote Print",
    line: "Your words here.",
    byline: "Custom proof builder",
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function titleSize(title) {
  if (title.length <= 12) return 178;
  if (title.length <= 18) return 156;
  return 136;
}

function quoteSize(line) {
  if (line.length <= 18) return 116;
  if (line.length <= 30) return 102;
  if (line.length <= 44) return 88;
  return 78;
}

function mockupHtml(print) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
${FONT_CSS}
* { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --color-void: #080808;
  --color-obsidian: #111111;
  --color-carbon: #1A1A1A;
  --color-graphite: #2C2C2C;
  --color-iron: #4A4A4A;
  --color-ash: #7A7A7A;
  --color-smoke: #B0B0B0;
  --color-pearl: #F0F0EE;
  --color-white: #FAFAF8;
  --color-blush: #FFD6E4;
  --color-petal: #F2AFC6;
  --font-display: "Bebas Neue", "Anton", Impact, sans-serif;
  --font-serif: "Playfair Display", "Cormorant Garamond", Georgia, serif;
  --font-body: "DM Sans", "Inter", system-ui, sans-serif;
}
html,
body {
  width: 1600px;
  height: 2560px;
  overflow: hidden;
}
body {
  background: #202020;
  color: var(--color-pearl);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.font-display {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 0.92;
  text-transform: uppercase;
}
.font-serif {
  font-family: var(--font-serif);
  font-weight: 700;
  font-style: italic;
  line-height: 1.15;
}
.font-body {
  font-family: var(--font-body);
}
.cover {
  position: relative;
  width: 1600px;
  height: 2560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 156px 150px;
  text-align: center;
  background:
    radial-gradient(ellipse 88% 48% at 50% -8%, rgba(242, 175, 198, 0.16), transparent 62%),
    radial-gradient(ellipse 64% 42% at 108% 108%, rgba(122, 122, 122, 0.22), transparent 62%),
    linear-gradient(180deg, #262626 0%, #202020 46%, var(--color-carbon) 100%);
}
.cover::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-size: 256px 256px;
}
.cover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-iron), var(--color-petal) 50%, var(--color-blush));
}
.frame {
  position: absolute;
  inset: 74px;
  border: 1px solid rgba(242, 175, 198, 0.24);
}
.frame::before,
.frame::after {
  content: "";
  position: absolute;
  left: 94px;
  right: 94px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(242, 175, 198, 0.46), transparent);
}
.frame::before { top: 128px; }
.frame::after { bottom: 128px; }
.brand {
  position: absolute;
  top: 188px;
  left: 0;
  right: 0;
  color: var(--color-petal);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.34em;
  text-transform: uppercase;
}
.title {
  position: relative;
  z-index: 1;
  max-width: 1140px;
  color: var(--color-white);
  font-size: ${titleSize(print.title)}px;
  line-height: 0.88;
  letter-spacing: 0.025em;
  text-wrap: balance;
}
.divider {
  position: relative;
  z-index: 1;
  width: 260px;
  height: 2px;
  margin: 74px auto 66px;
  background: linear-gradient(90deg, transparent, var(--color-petal), var(--color-blush), transparent);
  box-shadow: 0 0 24px rgba(242, 175, 198, 0.24);
}
.quote {
  position: relative;
  z-index: 1;
  max-width: 1040px;
  color: var(--color-blush);
  font-size: ${quoteSize(print.line)}px;
  letter-spacing: 0;
  text-wrap: balance;
}
.byline {
  position: relative;
  z-index: 1;
  margin-top: 72px;
  color: var(--color-smoke);
  font-size: 34px;
  font-weight: 300;
  letter-spacing: 0.03em;
}
.sizes {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 176px;
  color: var(--color-ash);
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}
</style>
</head>
<body>
  <main class="cover" aria-label="${escapeHtml(print.title)} print mockup">
    <div class="frame"></div>
    <p class="brand font-body">MK Parrish Print Shop</p>
    <h1 class="title font-display">${escapeHtml(print.title)}</h1>
    <div class="divider"></div>
    <p class="quote font-serif">${escapeHtml(print.line)}</p>
    <p class="byline font-body">${escapeHtml(print.byline)}</p>
    <p class="sizes font-body">5x7 / 8x10 / 11x14 / 16x20</p>
  </main>
</body>
</html>`;
}

await fs.mkdir(COVER_DIR, { recursive: true });

const browser = await puppeteer.launch({
  ...(existsSync(SYSTEM_CHROME) ? { executablePath: SYSTEM_CHROME } : {}),
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-lcd-text"],
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 2560, deviceScaleFactor: 1 });

for (const print of prints) {
  await page.setContent(mockupHtml(print), { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((resolve) => setTimeout(resolve, 150));

  const out = path.join(COVER_DIR, `${print.slug}-cover.jpg`);
  await page.screenshot({
    path: out,
    type: "jpeg",
    quality: 94,
    clip: { x: 0, y: 0, width: 1600, height: 2560 },
  });
}

await browser.close();

console.log(`Generated ${prints.length} print shop mockups in ${COVER_DIR}`);
