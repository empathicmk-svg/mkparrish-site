#!/usr/bin/env node
/**
 * Builds the LIBI dinner QR codes and printables.
 *
 *   node scripts/libi/build.mjs
 *
 * Writes to output/libi/:
 *   qr-<source>.png / .svg   one QR per placement, each tagged ?src= so MK sees which one people scanned
 *   table-sign-letter.pdf    full-page sign for an 8.5x11 acrylic table stand
 *   table-sign-5x7.pdf       the same sign at 5x7 for a small frame or easel
 *   handout-cards-10up-letter.pdf       ten 3.5x2 cards on one letter sheet (Avery 8371/5371 or plain cardstock)
 *   phone-lockscreen.png     set as your lock screen and hold the phone up: "scan me"
 *   slide-16x9.png           for the ask: a sponsor slide or the room's screen
 *
 * The printables are also copied to public/libi/kit/ (mkparrish.com/libi/kit/...).
 *
 * Offers, dates and contacts come from app/libi/campaign.ts. The script reads them as text so
 * it has no TypeScript step; if you change the campaign there, rebuild these.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import { chromium } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output/libi");
fs.mkdirSync(OUT, { recursive: true });

const campaign = fs.readFileSync(path.join(ROOT, "app/libi/campaign.ts"), "utf8");
const pick = (block, key) => {
  const m = campaign.match(new RegExp(`export const ${block} = \\{[\\s\\S]*?\\n  ${key}:\\s*\\n?\\s*"([^"]+)"`));
  if (!m) throw new Error(`campaign.ts: could not read ${block}.${key}`);
  return m[1];
};
const OFFER = pick("MEMBER_OFFER", "headline");
const OFFER_SUB = pick("MEMBER_OFFER", "sub");
const EXPIRES = pick("MEMBER_OFFER", "expiresShort");
const DRAW = pick("PRIZE", "drawShort");
const DRAW_LONG = pick("PRIZE", "drawDate");

const BASE = process.env.LIBI_URL || "https://www.mkparrish.com/libi";
const SOURCES = {
  table: "table sign",
  card: "handout card",
  phone: "MK's phone lock screen",
  slide: "slide / screen",
  followup: "follow-up texts and emails",
};
const urlFor = (src) => `${BASE}?src=${src}`;

const fonts = fs.readFileSync(path.join(ROOT, "scripts/assets/fonts-embedded.css"), "utf8");
const dataUri = (file) => `data:image/jpeg;base64,${fs.readFileSync(file).toString("base64")}`;
const HERO = dataUri(path.join(ROOT, "public/mercedes/test-drive-g63.jpg"));

const qrOpts = { errorCorrectionLevel: "Q", margin: 2, color: { dark: "#080808", light: "#FFFFFF" } };
const qrSvg = {};
for (const src of Object.keys(SOURCES)) {
  const url = urlFor(src);
  await QRCode.toFile(path.join(OUT, `qr-${src}.png`), url, { ...qrOpts, width: 1200 });
  qrSvg[src] = await QRCode.toString(url, { ...qrOpts, type: "svg" });
  fs.writeFileSync(path.join(OUT, `qr-${src}.svg`), qrSvg[src]);
}

const css = `${fonts}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; color: #F0F0EE; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.d { font-family: 'Bebas Neue', sans-serif; text-transform: uppercase; line-height: .9; letter-spacing: .01em; }
.s { font-family: 'Playfair Display', serif; font-style: italic; }
.k { font-size: 9pt; font-weight: 600; letter-spacing: .28em; text-transform: uppercase; }
.pink { color: #FFB5D0; }
.qr { background: #fff; padding: 6px; border-radius: 6px; }
.qr svg { display: block; width: 100%; height: 100%; }
`;

// 5x7 table sign, two per letter sheet.
const sign = `
<div class="sign" style="width:5in;height:7in;background:#080808;position:relative;overflow:hidden;display:flex;flex-direction:column;">
  <div style="height:2.3in;background:url(${HERO}) center 62%/cover;position:relative;">
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,8,8,.55),rgba(8,8,8,0) 35%,#080808);"></div>
    <p class="k" style="position:absolute;top:.25in;left:.3in;font-size:7pt;">LIBI Membership Dinner</p>
    <p class="k" style="position:absolute;top:.25in;right:.3in;font-size:7pt;opacity:.85;">Mercedes-Benz of Smithtown</p>
  </div>
  <div style="padding:0 .35in;margin-top:-.55in;position:relative;">
    <p class="k pink" style="font-size:7.5pt;">Scan to enter</p>
    <h1 class="d" style="font-size:54pt;margin-top:4pt;">Win a <span class="pink">Mercedes</span> weekend</h1>
    <p class="s" style="font-size:11pt;color:#B0B0B0;margin-top:6pt;">48 hours in the Mercedes you choose. G-Class, AMG, S-Class or a Sprinter for the jobsite.</p>
  </div>
  <div style="display:flex;gap:.25in;align-items:center;padding:.22in .35in 0;">
    <div class="qr" style="width:1.85in;height:1.85in;flex-shrink:0;">${qrSvg.table}</div>
    <div>
      <p class="d pink" style="font-size:30pt;">${OFFER}</p>
      <p style="font-size:9pt;color:#B0B0B0;margin-top:3pt;">${OFFER_SUB}, through ${EXPIRES}</p>
      <p class="d" style="font-size:19pt;margin-top:8pt;">+$500 Sprinter vans</p>
      <p style="font-size:9pt;color:#B0B0B0;margin-top:3pt;">for NAHB members</p>
    </div>
  </div>
  <div style="margin-top:auto;padding:.18in .35in;border-top:1px solid #2C2C2C;display:flex;justify-content:space-between;align-items:baseline;">
    <p class="d" style="font-size:16pt;">Ask for MK <span style="color:#7A7A7A;font-size:12pt;">· 631.366.6417</span></p>
    <p class="k" style="font-size:6.5pt;color:#7A7A7A;">Drawing ${DRAW}</p>
  </div>
</div>`;

// The same sign scaled up to fill a letter page, for a standard 8.5x11 acrylic table stand.
const signPage = `<!doctype html><html><head><style>${css}
@page { size: letter; margin: 0; }
body { width: 8.5in; height: 11in; background: #080808; overflow: hidden; }
.sign { transform: scale(1.57); transform-origin: top left; margin-left: calc((8.5in - 5in * 1.57) / 2); }
</style></head><body>${sign}</body></html>`;

// Full-size single sign on its own page, for a frame or a plexi stand.
const signSingle = `<!doctype html><html><head><style>${css}
@page { size: 5in 7in; margin: 0; } body { width: 5in; height: 7in; }
</style></head><body>${sign}</body></html>`;

// 3.5x2 handout card, ten per sheet (Avery 8371 layout: 0.75in side, 0.5in top margins).
const card = `
<div style="width:3.5in;height:2in;background:#080808;display:flex;align-items:center;gap:.14in;padding:0 .16in;overflow:hidden;">
  <div class="qr" style="width:1.45in;height:1.45in;flex-shrink:0;padding:4px;">${qrSvg.card}</div>
  <div style="min-width:0;">
    <p class="k pink" style="font-size:5.5pt;letter-spacing:.22em;">LIBI members · scan me</p>
    <p class="d" style="font-size:21pt;margin-top:3pt;">Win a <span class="pink">Mercedes</span> weekend</p>
    <p style="font-size:7pt;color:#B0B0B0;margin-top:4pt;line-height:1.35;"><b style="color:#F0F0EE;">${OFFER}</b> any new car, thru ${EXPIRES}<br><b style="color:#F0F0EE;">+$500</b> Sprinter vans, NAHB members</p>
    <p style="font-size:6.5pt;color:#7A7A7A;margin-top:5pt;">MK Parrish · Mercedes-Benz of Smithtown<br>631.366.6417 · Drawing ${DRAW}</p>
  </div>
</div>`;
const cardsPage = `<!doctype html><html><head><style>${css}
@page { size: letter; margin: 0; }
body { width: 8.5in; height: 11in; background: #fff; padding: .5in .75in; display: grid; grid-template-columns: 3.5in 3.5in; grid-auto-rows: 2in; gap: 0; }
</style></head><body>${Array(10).fill(card).join("")}</body></html>`;

// Phone lock screen: the top third stays clear for the clock.
const lock = `<!doctype html><html><head><style>${css}
body { width: 390px; height: 844px; background: #080808; overflow: hidden; position: relative; }
</style></head><body>
<div style="position:absolute;left:0;right:0;top:120px;height:330px;background:url(${HERO}) 42% 72%/auto 150%;opacity:.75;"></div>
<div style="position:absolute;inset:0;background:linear-gradient(180deg,#080808 14%,rgba(8,8,8,0) 26%,rgba(8,8,8,.1) 40%,#080808 54%);"></div>
<div style="position:absolute;left:0;right:0;top:330px;text-align:center;padding:0 28px;">
  <p class="k pink" style="font-size:9px;">LIBI members · scan me</p>
  <h1 class="d" style="font-size:52px;margin-top:6px;">Win a <span class="pink">Mercedes</span> weekend</h1>
  <div class="qr" style="width:220px;height:220px;margin:18px auto 0;padding:8px;">${qrSvg.phone}</div>
  <p class="d pink" style="font-size:26px;margin-top:16px;">${OFFER} · thru ${EXPIRES}</p>
  <p style="font-size:11px;color:#B0B0B0;margin-top:6px;">MK Parrish · Mercedes-Benz of Smithtown · 631.366.6417</p>
</div></body></html>`;

const slide = `<!doctype html><html><head><style>${css}
body { width: 1920px; height: 1080px; background: #080808; overflow: hidden; display: flex; }
</style></head><body>
<div style="width:58%;background:url(${HERO}) center 60%/cover;position:relative;"><div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,8,8,0) 55%,#080808);"></div></div>
<div style="flex:1;padding:110px 100px 90px 30px;display:flex;flex-direction:column;">
  <p class="k pink" style="font-size:20px;">LIBI members &amp; guests</p>
  <h1 class="d" style="font-size:150px;margin-top:16px;">Win a <span class="pink">Mercedes</span> weekend</h1>
  <div style="display:flex;gap:44px;align-items:center;margin-top:40px;">
    <div class="qr" style="width:330px;height:330px;padding:12px;flex-shrink:0;">${qrSvg.slide}</div>
    <div>
      <p class="d pink" style="font-size:64px;">${OFFER}</p>
      <p style="font-size:22px;color:#B0B0B0;margin-top:8px;">${OFFER_SUB}<br>through ${EXPIRES}</p>
      <p class="d" style="font-size:40px;margin-top:22px;">+$500 Sprinter vans</p>
      <p style="font-size:22px;color:#B0B0B0;margin-top:6px;">for NAHB members</p>
    </div>
  </div>
  <p style="margin-top:auto;font-size:24px;color:#7A7A7A;">MK Parrish · Mercedes-Benz of Smithtown · Competition Automotive Group · Drawing ${DRAW_LONG}</p>
</div></body></html>`;

// Use a local Chromium if one is set (or pre-installed), else Playwright's own.
const exe = process.env.CHROMIUM_PATH || (fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
try {
  const page = await browser.newPage();
  const pdf = async (html, file, opts) => {
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: path.join(OUT, file), printBackground: true, ...opts });
  };
  await pdf(signPage, "table-sign-letter.pdf", { format: "Letter" });
  await pdf(signSingle, "table-sign-5x7.pdf", { width: "5in", height: "7in" });
  await pdf(cardsPage, "handout-cards-10up-letter.pdf", { format: "Letter" });

  const png = async (html, file, width, height, scale) => {
    const p = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
    await p.setContent(html, { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(OUT, file) });
    await p.close();
  };
  await png(lock, "phone-lockscreen.png", 390, 844, 3);
  await png(slide, "slide-16x9.png", 1920, 1080, 1);
  // CSS inches are 96px on screen, so a 5x7in sign is exactly 480x672.
  await png(signSingle, "table-sign-preview.png", 480, 672, 2);
} finally {
  await browser.close();
}

// Copy the printables to the site so MK can grab them on her phone: mkparrish.com/libi/kit/<file>.
const KIT = path.join(ROOT, "public/libi/kit");
fs.mkdirSync(KIT, { recursive: true });
for (const f of ["table-sign-letter.pdf", "table-sign-5x7.pdf", "handout-cards-10up-letter.pdf", "phone-lockscreen.png", "slide-16x9.png", "qr-table.png", "qr-followup.png"]) {
  fs.copyFileSync(path.join(OUT, f), path.join(KIT, f));
}

const lines = Object.entries(SOURCES).map(([src, where]) => `  qr-${src}.png  → ${urlFor(src)}  (${where})`);
console.log(`LIBI kit built in ${path.relative(ROOT, OUT)}/\n${lines.join("\n")}`);
