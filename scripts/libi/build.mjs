#!/usr/bin/env node
/**
 * Builds the Competition Builder Pass QR codes and printables in Competition Automotive
 * Group colours: canopy sage and white, the wordmark set in Montserrat, and the flow-line
 * art from app/libi/flowLines.js, the same JavaScript that animates the /libi page. No photos.
 *
 *   node scripts/libi/build.mjs
 *
 * Writes to output/libi/:
 *   qr-<source>.png / .svg          one QR per placement, tagged ?src= so MK sees which one was scanned
 *   table-sign-letter.pdf           full-page sign for an 8.5x11 acrylic table stand
 *   table-sign-5x7.pdf              the same sign at 5x7 for a small frame or easel
 *   handout-cards-10up-letter.pdf   ten 3.5x2 cards on one letter sheet (Avery 8371/5371 or cardstock)
 *   phone-lockscreen.png            set as your lock screen and hold the phone up: "scan me"
 *   slide-16x9.png                  for the room's screen or a sponsor slide
 *   table-sign-preview.png          quick look at the sign
 *
 * The printables are also copied to public/libi/kit/ (mkparrish.com/libi/kit/...).
 * Offers and dates come from app/libi/campaign.ts; rebuild after changing them.
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
  const m = campaign.match(new RegExp(`export const ${block} = \\{[\\s\\S]*?\\n  ${key}:\\s*\\n?\\s*"([^"]*)"`));
  if (!m) throw new Error(`campaign.ts: could not read ${block}.${key}`);
  return m[1];
};
const BONUS = pick("PASS", "bonus");
const VALID = pick("PASS", "validShort");
const DRAW = pick("PRIZE", "drawShort");
const DATE = pick("EVENT", "dateShort");
const LEAD = BONUS || "VIP builder pricing";

const BASE = process.env.LIBI_URL || "https://www.mkparrish.com/libi";
const SOURCES = {
  table: "table sign",
  card: "handout card",
  phone: "MK's phone lock screen",
  slide: "slide / screen",
  followup: "follow-up texts and emails",
};
const urlFor = (src) => `${BASE}?src=${src}`;

const qrOpts = { errorCorrectionLevel: "Q", margin: 2, color: { dark: "#080808", light: "#FFFFFF" } };
const qrSvg = {};
for (const src of Object.keys(SOURCES)) {
  const url = urlFor(src);
  await QRCode.toFile(path.join(OUT, `qr-${src}.png`), url, { ...qrOpts, width: 1200 });
  qrSvg[src] = await QRCode.toString(url, { ...qrOpts, type: "svg" });
  fs.writeFileSync(path.join(OUT, `qr-${src}.svg`), qrSvg[src]);
}

// Montserrat stands in for the Competition logo type (OFL font, vendored in scripts/assets/fonts).
const fonts = [300, 400, 500, 600, 700]
  .map((w) => {
    const b64 = fs.readFileSync(path.join(ROOT, `scripts/assets/fonts/Montserrat-${w}.woff`)).toString("base64");
    return `@font-face { font-family: 'Montserrat'; font-weight: ${w}; src: url(data:font/woff;base64,${b64}) format('woff'); }`;
  })
  .join("\n");
// The page's own line-art code, run inside Chromium to paint every <canvas class="flow">.
const flowJs = fs.readFileSync(path.join(ROOT, "app/libi/flowLines.js"), "utf8").replace(/^export /m, "");
const flowRunner = `<script>${flowJs}
for (const c of document.querySelectorAll("canvas.flow")) {
  const s = 4, w = c.clientWidth, h = c.clientHeight;
  c.width = w * s; c.height = h * s;
  const ctx = c.getContext("2d"); ctx.scale(s, s);
  drawFlowLines(ctx, w, h, 2, {
    focusY: +(c.dataset.y || 0.7), count: +(c.dataset.n || 28), alpha: +(c.dataset.a || 0.4),
    origin: c.dataset.o || "left", lineWidth: +(c.dataset.lw || 1), rgb: "255,255,255",
  });
}
</script>`;

// Competition Automotive Group palette: the sage of the group's event canopy, with white.
const SAGE = "#6B7F74";
const SAGE_LIGHT = "#7F9488";
const DEEP = "#3D4B44";

const css = `${fonts}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Montserrat', sans-serif; color: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.bg { background: linear-gradient(135deg, ${SAGE_LIGHT} 0%, ${SAGE} 48%, ${DEEP} 100%); }
.k { font-weight: 600; letter-spacing: .3em; text-transform: uppercase; }
.up { text-transform: uppercase; }
.soft { color: rgba(255,255,255,.82); }
.qr { background: #fff; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,.18); }
.qr svg { display: block; width: 100%; height: 100%; }
.flow { position: absolute; inset: 0; width: 100%; height: 100%; }
.sheen { position: absolute; inset: 0; background: radial-gradient(ellipse at 85% 0%, rgba(255,255,255,.22), transparent 55%); }
.frame { position: absolute; border: 1px solid rgba(255,255,255,.45); pointer-events: none; }
.rule { width: 44px; height: 1px; background: #fff; }
.perk { border-left: 2px solid #fff; padding-left: 10px; }
`;

// The Competition wordmark set in type: light, wide COMPETITION over spaced AUTOMOTIVE GROUP.
const mark = (pt) => `
  <div style="line-height:1;">
    <div style="font-size:${pt}pt;font-weight:300;letter-spacing:.2em;">COMPETITION</div>
    <div style="font-size:${pt * 0.4}pt;font-weight:500;letter-spacing:.42em;margin-top:${pt * 0.32}pt;opacity:.9;">AUTOMOTIVE GROUP</div>
  </div>`;

// 5x7 sign (480x672 CSS px).
const sign = `
<div class="sign bg" style="width:5in;height:7in;position:relative;overflow:hidden;">
  <canvas class="flow" data-y="0.9" data-n="30" data-a="0.42"></canvas>
  <div class="sheen"></div>
  <div class="frame" style="inset:.14in;"></div>
  <div style="position:relative;height:100%;padding:.42in .42in .36in;display:flex;flex-direction:column;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
      ${mark(16)}
      <p class="k" style="font-size:6.5pt;text-align:right;line-height:1.6;">LIBI<br>${DATE}</p>
    </div>
    <p class="k soft" style="font-size:7pt;margin-top:.44in;">For LIBI members &amp; guests</p>
    <h1 class="up" style="font-size:34pt;line-height:1.05;letter-spacing:.06em;margin-top:8pt;"><span style="font-weight:300;">Unlock your</span><br><span style="font-weight:700;">Builder Pass</span></h1>
    <p style="font-size:10.5pt;font-weight:500;margin-top:10pt;line-height:1.45;">${LEAD} at all five Competition Automotive Group stores.</p>
    <div class="rule" style="margin-top:12pt;"></div>
    <div style="display:flex;gap:.26in;align-items:center;margin-top:.26in;">
      <div class="qr" style="width:1.8in;height:1.8in;padding:6px;flex-shrink:0;">${qrSvg.table}</div>
      <div style="display:flex;flex-direction:column;gap:9pt;">
        <div class="perk"><p class="up" style="font-size:9.5pt;font-weight:700;letter-spacing:.08em;">+$500 Sprinter vans</p><p class="soft" style="font-size:7pt;margin-top:2pt;">for NAHB members</p></div>
        <div class="perk"><p class="up" style="font-size:9.5pt;font-weight:700;letter-spacing:.08em;">Free fleet equity report</p><p class="soft" style="font-size:7pt;margin-top:2pt;">what every truck is worth today</p></div>
        <div class="perk"><p class="up" style="font-size:9.5pt;font-weight:700;letter-spacing:.08em;">Win a Mercedes weekend</p><p class="soft" style="font-size:7pt;margin-top:2pt;">drawing ${DRAW}</p></div>
      </div>
    </div>
    <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:baseline;">
      <p class="k" style="font-size:6.5pt;">Scan · Scratch · Save</p>
      <p style="font-size:8pt;font-weight:600;letter-spacing:.08em;">ASK FOR MK <span class="soft" style="font-weight:500;">· 631.366.6417</span></p>
    </div>
  </div>
</div>`;

const signPage = `<!doctype html><html><head><style>${css}
@page { size: letter; margin: 0; }
body { width: 8.5in; height: 11in; background: ${DEEP}; overflow: hidden; }
.sign { transform: scale(1.57); transform-origin: top left; margin-left: calc((8.5in - 5in * 1.57) / 2); }
</style></head><body>${sign}${flowRunner}</body></html>`;

const signSingle = `<!doctype html><html><head><style>${css}
@page { size: 5in 7in; margin: 0; } body { width: 5in; height: 7in; }
</style></head><body>${sign}${flowRunner}</body></html>`;

// 3.5x2 handout card, ten per sheet (Avery 8371 layout: 0.75in sides, 0.5in top).
const card = `
<div class="bg" style="width:3.5in;height:2in;position:relative;overflow:hidden;">
  <canvas class="flow" data-y="0.88" data-n="20" data-a="0.38"></canvas>
  <div class="sheen"></div>
  <div class="frame" style="inset:.07in;"></div>
  <div style="position:relative;height:100%;display:flex;align-items:center;gap:.16in;padding:0 .2in;">
    <div class="qr" style="width:1.3in;height:1.3in;padding:3px;flex-shrink:0;border-radius:6px;">${qrSvg.card}</div>
    <div style="min-width:0;">
      ${mark(8.5)}
      <p class="up" style="font-size:12.5pt;font-weight:700;letter-spacing:.08em;margin-top:8pt;line-height:1.05;">Builder Pass</p>
      <p style="font-size:6.3pt;font-weight:500;margin-top:4pt;line-height:1.35;">${LEAD}, all five stores</p>
      <p class="soft" style="font-size:5.6pt;margin-top:3pt;line-height:1.4;">+$500 Sprinter · Mercedes weekend drawing</p>
      <p class="soft" style="font-size:5.4pt;margin-top:4pt;">MK Parrish · 631.366.6417 · thru ${VALID}</p>
    </div>
  </div>
</div>`;
const cardsPage = `<!doctype html><html><head><style>${css}
@page { size: letter; margin: 0; }
body { width: 8.5in; height: 11in; background: #fff; padding: .5in .75in; display: grid; grid-template-columns: 3.5in 3.5in; grid-auto-rows: 2in; }
</style></head><body>${Array(10).fill(card).join("")}${flowRunner}</body></html>`;

// Phone lock screen (390x844 at 3x). The top stays clear for the clock.
const lock = `<!doctype html><html><head><style>${css}
body { width: 390px; height: 844px; overflow: hidden; position: relative; }
</style></head><body class="bg">
<canvas class="flow" data-y="0.3" data-n="30" data-a="0.5" data-o="center"></canvas>
<div class="sheen"></div>
<div class="frame" style="inset:12px;border-radius:38px;"></div>
<div style="position:absolute;left:0;right:0;top:322px;text-align:center;padding:0 30px;">
  <div style="display:inline-block;text-align:left;">${mark(15)}</div>
  <h1 class="up" style="font-size:31px;line-height:1.08;letter-spacing:.06em;margin-top:20px;"><span style="font-weight:300;">Unlock your</span><br><span style="font-weight:700;">Builder Pass</span></h1>
  <div class="qr" style="width:212px;height:212px;margin:20px auto 0;padding:7px;">${qrSvg.phone}</div>
  <p style="font-size:13px;font-weight:600;margin-top:16px;">${LEAD} · all five stores</p>
  <p class="k soft" style="font-size:8px;margin-top:8px;">Scan · Scratch · Save</p>
</div>${flowRunner}</body></html>`;

const slide = `<!doctype html><html><head><style>${css}
body { width: 1920px; height: 1080px; overflow: hidden; position: relative; }
</style></head><body class="bg">
<canvas class="flow" data-y="0.8" data-n="40" data-a="0.42" data-lw="1.6"></canvas>
<div class="sheen"></div>
<div class="frame" style="inset:36px;"></div>
<div style="position:relative;height:100%;padding:100px 130px;display:flex;justify-content:space-between;">
  <div style="display:flex;flex-direction:column;max-width:1100px;">
    ${mark(40)}
    <p class="k soft" style="font-size:20px;margin-top:90px;">For LIBI members &amp; guests · ${DATE}</p>
    <h1 class="up" style="font-size:112px;line-height:1.04;letter-spacing:.05em;margin-top:18px;"><span style="font-weight:300;">Unlock your</span><br><span style="font-weight:700;">Builder Pass</span></h1>
    <p style="font-size:34px;font-weight:500;margin-top:30px;">${LEAD} at all five Competition stores.</p>
    <p class="soft" style="font-size:24px;font-weight:500;margin-top:auto;">+$500 Sprinter vans for NAHB members · Free fleet equity report · Win a Mercedes weekend, drawing ${DRAW}</p>
  </div>
  <div style="align-self:center;text-align:center;">
    <div class="qr" style="width:400px;height:400px;padding:14px;border-radius:16px;">${qrSvg.slide}</div>
    <p class="k" style="font-size:20px;margin-top:26px;">Scan · Scratch · Save</p>
    <p class="soft" style="font-size:18px;font-weight:500;margin-top:12px;">Ask for MK Parrish</p>
  </div>
</div>${flowRunner}</body></html>`;

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
console.log(`Builder Pass kit built in ${path.relative(ROOT, OUT)}/\n${lines.join("\n")}`);
