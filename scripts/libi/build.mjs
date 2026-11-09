#!/usr/bin/env node
/**
 * Builds the Competition Builder Pass digital kit in Competition Automotive Group's header
 * colours (black, white, steel blue, silver), with the wordmark set in Montserrat and the silver
 * flow-line art from app/libi/flowLines.js (the same JavaScript that animates the /libi page).
 * Digital only: no printed table signs or cards. No photos.
 *
 *   node scripts/libi/build.mjs
 *
 * Writes to output/libi/:
 *   qr-<source>.png / .svg   one QR per channel, tagged ?src= so each lead shows where it came from
 *   phone-lockscreen.png     MK's lock screen: hold the phone up, "scan this"            (src=phone)
 *   slide-16x9.png           the room's screen during announcements                      (src=slide)
 *   share-card-square.png    text or AirDrop it to a guest on the spot                   (src=text)
 *   story-9x16.png           Instagram / LinkedIn / Facebook story                        (src=social)
 *   og.png                   the preview card when the link is texted or shared (also public/libi/og.png)
 *
 * The images are also copied to public/libi/kit/.
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
  phone: "MK's phone lock screen",
  slide: "room screen slide",
  text: "QR card texted or AirDropped to a guest",
  social: "Instagram / LinkedIn / Facebook story",
  followup: "follow-up texts and emails",
};
const CELL = "347.853.4238";
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
    origin: c.dataset.o || "left", lineWidth: +(c.dataset.lw || 1), rgb: "200,204,208",
  });
}
</script>`;

// Competition Automotive Group header colours: black, white COMPETITION, steel-blue
// AUTOMOTIVE GROUP and a silver swoosh (echoed here by silver flow lines).
const INK = "#0B0C0E";
const PANEL = "#15171A";
const CHARCOAL = "#2A2D32";
const STEEL = "#7D96A8";
const SILVER = "#A9ADB1";

const css = `${fonts}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Montserrat', sans-serif; color: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.bg { background: linear-gradient(135deg, ${CHARCOAL} 0%, ${PANEL} 45%, ${INK} 100%); }
.k { font-weight: 600; letter-spacing: .3em; text-transform: uppercase; }
.up { text-transform: uppercase; }
.soft { color: ${SILVER}; }
.steel { color: ${STEEL}; }
.qr { background: #fff; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,.18); }
.qr svg { display: block; width: 100%; height: 100%; }
.flow { position: absolute; inset: 0; width: 100%; height: 100%; }
.sheen { position: absolute; inset: 0; background: radial-gradient(ellipse at 85% 0%, rgba(125,150,168,.24), transparent 55%); }
.frame { position: absolute; border: 1px solid rgba(169,173,177,.4); pointer-events: none; }
.rule { width: 44px; height: 1px; background: ${STEEL}; }
.perk { border-left: 2px solid ${STEEL}; padding-left: 10px; }
`;

// The Competition wordmark set in type: white COMPETITION over steel-blue AUTOMOTIVE GROUP.
const mark = (pt) => `
  <div style="line-height:1;">
    <div style="font-size:${pt}pt;font-weight:500;letter-spacing:.07em;color:#fff;">COMPETITION</div>
    <div style="font-size:${pt * 0.42}pt;font-weight:400;letter-spacing:.3em;margin-top:${pt * 0.3}pt;color:${STEEL};">AUTOMOTIVE GROUP</div>
  </div>`;

// Phone lock screen (390x844 at 3x). The top stays clear for the clock.
const lock = `<!doctype html><html><head><style>${css}
body { width: 390px; height: 844px; overflow: hidden; position: relative; }
</style></head><body class="bg">
<canvas class="flow" data-y="0.3" data-n="30" data-a="0.5" data-o="center"></canvas>
<div class="sheen"></div>
<div class="frame" style="inset:12px;border-radius:38px;"></div>
<div style="position:absolute;left:0;right:0;top:322px;text-align:center;padding:0 30px;">
  <div style="display:inline-block;text-align:left;">${mark(15)}</div>
  <h1 class="up" style="font-size:31px;line-height:1.08;letter-spacing:.06em;margin-top:20px;"><span style="font-weight:300;color:#D5D8DB;">Unlock your</span><br><span style="font-weight:700;">Builder Pass</span></h1>
  <div class="qr" style="width:212px;height:212px;margin:20px auto 0;padding:7px;">${qrSvg.phone}</div>
  <p style="font-size:13px;font-weight:600;margin-top:16px;">${LEAD} · all five stores</p>
  <p class="k steel" style="font-size:8px;margin-top:8px;">Scan · Scratch · Save</p>
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
    <p class="k steel" style="font-size:20px;margin-top:90px;">For LIBI members &amp; guests · ${DATE}</p>
    <h1 class="up" style="font-size:112px;line-height:1.04;letter-spacing:.05em;margin-top:18px;"><span style="font-weight:300;color:#D5D8DB;">Unlock your</span><br><span style="font-weight:700;">Builder Pass</span></h1>
    <p style="font-size:34px;font-weight:500;margin-top:30px;">${LEAD} at all five Competition stores.</p>
    <p class="soft" style="font-size:24px;font-weight:500;margin-top:auto;">+$500 Sprinter vans for NAHB members · Free fleet equity report · Win a Mercedes weekend, drawing ${DRAW}</p>
  </div>
  <div style="align-self:center;text-align:center;">
    <div class="qr" style="width:400px;height:400px;padding:14px;border-radius:16px;">${qrSvg.slide}</div>
    <p class="k steel" style="font-size:20px;margin-top:26px;">Scan · Scratch · Save</p>
    <p class="soft" style="font-size:18px;font-weight:500;margin-top:12px;">Ask for MK Parrish · ${CELL}</p>
  </div>
</div>${flowRunner}</body></html>`;

// Square QR card (1080x1080) to text or AirDrop to a guest on the spot.
const square = `<!doctype html><html><head><style>${css}
body { width: 1080px; height: 1080px; overflow: hidden; position: relative; }
</style></head><body class="bg">
<canvas class="flow" data-y="0.86" data-n="34" data-a="0.45" data-lw="1.4"></canvas>
<div class="sheen"></div>
<div class="frame" style="inset:28px;"></div>
<div style="position:relative;height:100%;padding:80px 90px;display:flex;flex-direction:column;align-items:center;text-align:center;">
  <div style="display:inline-block;text-align:left;">${mark(30)}</div>
  <h1 class="up" style="font-size:66px;line-height:1.06;letter-spacing:.05em;margin-top:44px;"><span style="font-weight:300;color:#D5D8DB;">Unlock your</span><br><span style="font-weight:700;">Builder Pass</span></h1>
  <div class="qr" style="width:400px;height:400px;margin-top:40px;padding:14px;border-radius:18px;">${qrSvg.text}</div>
  <p style="font-size:26px;font-weight:600;margin-top:34px;">${LEAD} · all five stores</p>
  <p class="k steel" style="font-size:16px;margin-top:12px;">For LIBI members · Valid thru ${VALID}</p>
</div>${flowRunner}</body></html>`;

// Story (1080x1920) for Instagram, LinkedIn or Facebook stories.
const story = `<!doctype html><html><head><style>${css}
body { width: 1080px; height: 1920px; overflow: hidden; position: relative; }
</style></head><body class="bg">
<canvas class="flow" data-y="0.22" data-n="40" data-a="0.55" data-o="center" data-lw="1.6"></canvas>
<div class="sheen"></div>
<div class="frame" style="inset:34px;border-radius:40px;"></div>
<div style="position:absolute;left:0;right:0;top:620px;text-align:center;padding:0 90px;">
  <div style="display:inline-block;text-align:left;">${mark(34)}</div>
  <p class="k steel" style="font-size:22px;margin-top:60px;">For LIBI members &amp; guests</p>
  <h1 class="up" style="font-size:92px;line-height:1.06;letter-spacing:.05em;margin-top:18px;"><span style="font-weight:300;color:#D5D8DB;">Unlock your</span><br><span style="font-weight:700;">Builder Pass</span></h1>
  <div class="qr" style="width:460px;height:460px;margin:56px auto 0;padding:16px;border-radius:20px;">${qrSvg.social}</div>
  <p style="font-size:34px;font-weight:600;margin-top:44px;">${LEAD} · all five stores</p>
  <p class="soft" style="font-size:26px;font-weight:500;margin-top:16px;">+$500 Sprinter vans for NAHB members · Win a Mercedes weekend</p>
  <p class="k steel" style="font-size:20px;margin-top:40px;">Scan · Scratch · Save</p>
</div>${flowRunner}</body></html>`;

// Link-preview card (1200x630): what people see when the link is texted or shared. No QR.
const og = `<!doctype html><html><head><style>${css}
body { width: 1200px; height: 630px; overflow: hidden; position: relative; }
</style></head><body class="bg">
<canvas class="flow" data-y="0.82" data-n="36" data-a="0.5" data-lw="1.4"></canvas>
<div class="sheen"></div>
<div class="frame" style="inset:24px;"></div>
<div style="position:relative;height:100%;padding:70px 84px;display:flex;flex-direction:column;">
  ${mark(30)}
  <h1 class="up" style="font-size:84px;line-height:1.04;letter-spacing:.05em;margin-top:56px;"><span style="font-weight:300;color:#D5D8DB;">Unlock your</span><br><span style="font-weight:700;">Builder Pass</span></h1>
  <p style="font-size:26px;font-weight:500;margin-top:24px;color:#D5D8DB;">${LEAD} at all five Competition stores · LIBI members</p>
</div>${flowRunner}</body></html>`;

// Use a local Chromium if one is set (or pre-installed), else Playwright's own.
const exe = process.env.CHROMIUM_PATH || (fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
try {
  const png = async (html, file, width, height, scale) => {
    const p = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
    await p.setContent(html, { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(OUT, file) });
    await p.close();
  };
  await png(lock, "phone-lockscreen.png", 390, 844, 3);
  await png(slide, "slide-16x9.png", 1920, 1080, 1);
  await png(square, "share-card-square.png", 1080, 1080, 1);
  await png(story, "story-9x16.png", 1080, 1920, 1);
  await png(og, "og.png", 1200, 630, 1);
} finally {
  await browser.close();
}

// Copy the images to the site so MK can grab them on her phone.
const KIT = path.join(ROOT, "public/libi/kit");
fs.mkdirSync(KIT, { recursive: true });
for (const f of ["phone-lockscreen.png", "slide-16x9.png", "share-card-square.png", "story-9x16.png", "qr-text.png", "qr-followup.png"]) {
  fs.copyFileSync(path.join(OUT, f), path.join(KIT, f));
}
fs.copyFileSync(path.join(OUT, "og.png"), path.join(ROOT, "public/libi/og.png"));

const lines = Object.entries(SOURCES).map(([src, where]) => `  qr-${src}.png  → ${urlFor(src)}  (${where})`);
console.log(`Builder Pass kit built in ${path.relative(ROOT, OUT)}/\n${lines.join("\n")}`);
