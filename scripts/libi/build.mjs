#!/usr/bin/env node
/**
 * Builds the Competition Builder Pass QR codes and printables in MK Parrish branding:
 * black, a fine frame line, the wordmark, pink glow type and the flow-line art from
 * app/libi/flowLines.js, the same JavaScript that animates the /libi page. No photos.
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

const fonts = fs.readFileSync(path.join(ROOT, "scripts/assets/fonts-embedded.css"), "utf8");
// The page's own line-art code, run inside Chromium to paint every <canvas class="flow">.
const flowJs = fs.readFileSync(path.join(ROOT, "app/libi/flowLines.js"), "utf8").replace(/^export /m, "");
const flowRunner = `<script>${flowJs}
for (const c of document.querySelectorAll("canvas.flow")) {
  const s = 4, w = c.clientWidth, h = c.clientHeight;
  c.width = w * s; c.height = h * s;
  const ctx = c.getContext("2d"); ctx.scale(s, s);
  drawFlowLines(ctx, w, h, 2, {
    focusY: +(c.dataset.y || 0.7), count: +(c.dataset.n || 28), alpha: +(c.dataset.a || 0.55),
    origin: c.dataset.o || "left", lineWidth: +(c.dataset.lw || 1),
  });
}
</script>`;

const css = `${fonts}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; color: #F0F0EE; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.d { font-family: 'Bebas Neue', sans-serif; text-transform: uppercase; line-height: .88; letter-spacing: .01em; }
.s { font-family: 'Playfair Display', serif; font-style: italic; }
.k { font-weight: 600; letter-spacing: .28em; text-transform: uppercase; }
.pink { color: #FFB5D0; }
.glow { text-shadow: 0 0 28px rgba(242,175,198,.5); }
.ash { color: #7A7A7A; } .smoke { color: #B0B0B0; }
.qr { background: #fff; border-radius: 8px; box-shadow: 0 0 40px rgba(242,175,198,.25); }
.qr svg { display: block; width: 100%; height: 100%; }
.flow { position: absolute; inset: 0; width: 100%; height: 100%; }
.glowbg { position: absolute; inset: 0; background: radial-gradient(ellipse at 15% 0%, rgba(255,181,208,.16), transparent 60%); }
.frame { position: absolute; border: 1px solid #2C2C2C; pointer-events: none; }
.rule { width: 44px; height: 2px; background: #FFB5D0; }
.perk { border-left: 2px solid #FFB5D0; padding-left: 10px; }
`;

const mark = (size, tag = 6.5) => `
  <div style="display:flex;justify-content:space-between;align-items:flex-start;">
    <p class="d" style="font-size:${size}pt;letter-spacing:.12em;">MK Parrish</p>
    <p class="k pink" style="font-size:${tag}pt;text-align:right;line-height:1.45;">× Competition<br>Automotive Group</p>
  </div>`;

// 5x7 sign (480x672 CSS px).
const sign = `
<div class="sign" style="width:5in;height:7in;background:#080808;position:relative;overflow:hidden;">
  <canvas class="flow" data-y="0.9" data-n="30" data-a="0.6"></canvas>
  <div class="glowbg"></div>
  <div class="frame" style="inset:.14in;"></div>
  <div style="position:relative;height:100%;padding:.4in .42in .36in;display:flex;flex-direction:column;">
    ${mark(17)}
    <p class="k smoke" style="font-size:7pt;margin-top:.42in;">LIBI members · ${DATE}</p>
    <h1 class="d" style="font-size:62pt;margin-top:6pt;">Unlock your<br><span class="pink glow">Builder Pass</span></h1>
    <p class="s pink" style="font-size:12pt;margin-top:9pt;line-height:1.35;">${LEAD} at all five Competition Automotive Group stores.</p>
    <div class="rule" style="margin-top:12pt;"></div>
    <div style="display:flex;gap:.26in;align-items:center;margin-top:.26in;">
      <div class="qr" style="width:1.8in;height:1.8in;padding:6px;flex-shrink:0;">${qrSvg.table}</div>
      <div style="display:flex;flex-direction:column;gap:9pt;">
        <div class="perk"><p class="d" style="font-size:17pt;">+$500 Sprinter vans</p><p class="smoke" style="font-size:7.5pt;margin-top:2pt;">for NAHB members</p></div>
        <div class="perk"><p class="d" style="font-size:17pt;">Free fleet equity report</p><p class="smoke" style="font-size:7.5pt;margin-top:2pt;">what every truck is worth today</p></div>
        <div class="perk"><p class="d" style="font-size:17pt;">Win a Mercedes weekend</p><p class="smoke" style="font-size:7.5pt;margin-top:2pt;">drawing ${DRAW}</p></div>
      </div>
    </div>
    <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:baseline;">
      <p class="k pink" style="font-size:7pt;">Scan · Scratch · Save</p>
      <p class="d" style="font-size:14pt;">Ask for MK <span class="ash" style="font-size:11pt;">· 631.366.6417</span></p>
    </div>
  </div>
</div>`;

const signPage = `<!doctype html><html><head><style>${css}
@page { size: letter; margin: 0; }
body { width: 8.5in; height: 11in; background: #080808; overflow: hidden; }
.sign { transform: scale(1.57); transform-origin: top left; margin-left: calc((8.5in - 5in * 1.57) / 2); }
</style></head><body>${sign}${flowRunner}</body></html>`;

const signSingle = `<!doctype html><html><head><style>${css}
@page { size: 5in 7in; margin: 0; } body { width: 5in; height: 7in; }
</style></head><body>${sign}${flowRunner}</body></html>`;

// 3.5x2 handout card, ten per sheet (Avery 8371 layout: 0.75in sides, 0.5in top).
const card = `
<div style="width:3.5in;height:2in;background:#080808;position:relative;overflow:hidden;">
  <canvas class="flow" data-y="0.88" data-n="20" data-a="0.55"></canvas>
  <div class="glowbg"></div>
  <div class="frame" style="inset:.07in;border-color:#2C2C2C;"></div>
  <div style="position:relative;height:100%;display:flex;align-items:center;gap:.15in;padding:0 .2in;">
    <div class="qr" style="width:1.32in;height:1.32in;padding:3px;flex-shrink:0;border-radius:5px;">${qrSvg.card}</div>
    <div style="min-width:0;">
      <p class="d" style="font-size:9pt;letter-spacing:.14em;">MK Parrish</p>
      <p class="k ash" style="font-size:4.6pt;margin-top:5pt;">Competition Automotive Group</p>
      <p class="d pink glow" style="font-size:25pt;margin-top:1pt;">Builder Pass</p>
      <p class="s pink" style="font-size:7pt;margin-top:3pt;line-height:1.3;">${LEAD}, all five stores</p>
      <p class="smoke" style="font-size:6pt;margin-top:4pt;line-height:1.4;">+$500 Sprinter · Mercedes weekend drawing</p>
      <p class="ash" style="font-size:5.6pt;margin-top:4pt;">631.366.6417 · valid thru ${VALID}</p>
    </div>
  </div>
</div>`;
const cardsPage = `<!doctype html><html><head><style>${css}
@page { size: letter; margin: 0; }
body { width: 8.5in; height: 11in; background: #fff; padding: .5in .75in; display: grid; grid-template-columns: 3.5in 3.5in; grid-auto-rows: 2in; }
</style></head><body>${Array(10).fill(card).join("")}${flowRunner}</body></html>`;

// Phone lock screen (390x844 at 3x). The top stays clear for the clock.
const lock = `<!doctype html><html><head><style>${css}
body { width: 390px; height: 844px; background: #080808; overflow: hidden; position: relative; }
</style></head><body>
<canvas class="flow" data-y="0.3" data-n="30" data-a="0.65" data-o="center"></canvas>
<div class="glowbg"></div>
<div class="frame" style="inset:12px;border-radius:38px;"></div>
<div style="position:absolute;left:0;right:0;top:330px;text-align:center;padding:0 30px;">
  <p class="d" style="font-size:22px;letter-spacing:.14em;">MK Parrish</p>
  <p class="k pink" style="font-size:8px;margin-top:6px;">× Competition Automotive Group</p>
  <h1 class="d" style="font-size:58px;margin-top:14px;">Unlock your<br><span class="pink glow">Builder Pass</span></h1>
  <div class="qr" style="width:212px;height:212px;margin:20px auto 0;padding:7px;">${qrSvg.phone}</div>
  <p class="s pink" style="font-size:15px;margin-top:16px;">${LEAD} · all five stores</p>
  <p class="k ash" style="font-size:8px;margin-top:8px;">Scan · Scratch · Save</p>
</div>${flowRunner}</body></html>`;

const slide = `<!doctype html><html><head><style>${css}
body { width: 1920px; height: 1080px; background: #080808; overflow: hidden; position: relative; }
</style></head><body>
<canvas class="flow" data-y="0.78" data-n="40" data-a="0.6" data-lw="1.6"></canvas>
<div class="glowbg"></div>
<div class="frame" style="inset:36px;"></div>
<div style="position:relative;height:100%;padding:100px 130px;display:flex;justify-content:space-between;">
  <div style="display:flex;flex-direction:column;max-width:1060px;">
    <p class="d" style="font-size:52px;letter-spacing:.12em;">MK Parrish <span class="k pink" style="font-family:'DM Sans';font-size:18px;letter-spacing:.3em;vertical-align:middle;margin-left:18px;">× Competition Automotive Group</span></p>
    <p class="k smoke" style="font-size:20px;margin-top:90px;">LIBI members · ${DATE}</p>
    <h1 class="d" style="font-size:190px;margin-top:16px;">Unlock your<br><span class="pink glow">Builder Pass</span></h1>
    <p class="s pink" style="font-size:40px;margin-top:26px;">${LEAD} at all five Competition stores.</p>
    <p class="smoke" style="font-size:26px;margin-top:auto;">+$500 Sprinter vans for NAHB members · Free fleet equity report · Win a Mercedes weekend, drawing ${DRAW}</p>
  </div>
  <div style="align-self:center;text-align:center;">
    <div class="qr" style="width:400px;height:400px;padding:14px;border-radius:16px;">${qrSvg.slide}</div>
    <p class="k pink" style="font-size:20px;margin-top:26px;">Scan · Scratch · Save</p>
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
