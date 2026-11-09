#!/usr/bin/env node
/**
 * Builds the Competition Builder Pass digital kit in Competition Automotive Group's colours
 * (dark navy and white, with a bright blue accent and gold for the upgrade), with the wordmark set
 * in Montserrat and the flow-line art from app/libi/flowLines.js (the same JavaScript that animates
 * the /libi page).
 * Digital only: no printed table signs or cards. No photos.
 *
 *   node scripts/libi/build.mjs
 *
 * Writes to output/libi/:
 *   qr-<source>.png / .svg   one QR per channel, tagged ?src= so each lead shows where it came from
 *   phone-lockscreen.png     MK's lock screen: hold the phone up, "scan this"            (src=phone)
 *   ipad-display.png         full-screen on MK's iPad at the dinner: guests scan it        (src=ipad)
 *   share-card-square.png    text or AirDrop it to a guest on the spot                   (src=text)
 *   story-9x16.png           Instagram / LinkedIn / Facebook story                        (src=social)
 *   og.png                   the preview card when the link is texted or shared (also public/libi/og.png)
 *   manager-one-pager.pdf    the offer on one page, with approval checkboxes, for the sales manager (+ .png)
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
const CERT = pick("CERT", "name");
const CERT_SHORT = pick("CERT", "short");
const GOLD = pick("GOLD", "label");
const GOLD_REWARD = pick("GOLD", "reward");
const VALID_LONG = pick("PASS", "validThrough");
const EVENT_DATE = pick("EVENT", "date");
const DATE = pick("EVENT", "dateShort");
const LEAD = BONUS || "VIP builder pricing";

const BASE = process.env.LIBI_URL || "https://www.mkparrish.com/libi";
const SOURCES = {
  phone: "MK's phone lock screen",
  ipad: "MK's iPad display",
  text: "QR card texted or AirDropped to a guest",
  social: "Instagram / LinkedIn / Facebook story",
  followup: "follow-up texts and emails",
};
const CELL = "347.853.4238";
const urlFor = (src) => `${BASE}?src=${src}`;

const qrOpts = { errorCorrectionLevel: "Q", margin: 2, color: { dark: "#06142E", light: "#FFFFFF" } };
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
    origin: c.dataset.o || "left", lineWidth: +(c.dataset.lw || 1), rgb: "214,228,255",
  });
}
</script>`;

// Competition Automotive Group colours: dark navy and white, a bright blue accent, and gold
// for the upgraded certificate.
const INK = "#06142E";
const PANEL = "#0C2247";
const CHARCOAL = "#1B3F7A";
const STEEL = "#5EB0FF";
const SILVER = "#DCE6F5";
const GOLD_C = "#F2C14E";

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
.sheen { position: absolute; inset: 0; background: radial-gradient(ellipse at 85% 0%, rgba(94,176,255,.42), transparent 60%); }
.frame { position: absolute; border: 2px solid rgba(255,255,255,.75); pointer-events: none; }
.gold { color: ${GOLD_C}; }
.chip { display: inline-block; background: #fff; color: ${INK}; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; border-radius: 999px; }
.chip b { background: ${GOLD_C}; border-radius: 999px; font-weight: 700; }
`;

// The Competition wordmark set in type: white COMPETITION over bright-blue AUTOMOTIVE GROUP.
const mark = (pt) => `
  <div style="line-height:1;">
    <div style="font-size:${pt}pt;font-weight:700;letter-spacing:.07em;color:#fff;">COMPETITION</div>
    <div style="font-size:${pt * 0.42}pt;font-weight:600;letter-spacing:.3em;margin-top:${pt * 0.3}pt;color:${STEEL};">AUTOMOTIVE GROUP</div>
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
  <h1 class="up" style="font-size:31px;line-height:1.08;letter-spacing:.06em;margin-top:20px;"><span style="font-weight:300;color:#fff;">Unlock your</span><br><span style="font-weight:700;">Builder Pass</span></h1>
  <div class="qr" style="width:212px;height:212px;margin:20px auto 0;padding:7px;">${qrSvg.phone}</div>
  <p style="font-size:13px;font-weight:600;margin-top:16px;">${LEAD} · all five stores</p>
  <p style="margin-top:10px;"><span class="chip" style="font-size:8.5px;padding:5px 11px;">${CERT_SHORT} inside</span></p>
  <p class="k steel" style="font-size:8px;margin-top:10px;">Scan · Swipe · Share</p>
</div>${flowRunner}</body></html>`;

// iPad display (820x1180 at 2x, iPad Air portrait). Shown full screen at the dinner; guests scan it.
const ipad = `<!doctype html><html><head><style>${css}
body { width: 820px; height: 1180px; overflow: hidden; position: relative; }
</style></head><body class="bg">
<canvas class="flow" data-y="0.9" data-n="36" data-a="0.45" data-lw="1.3"></canvas>
<div class="sheen"></div>
<div class="frame" style="inset:22px;border-radius:26px;"></div>
<div style="position:relative;height:100%;padding:70px 70px 64px;display:flex;flex-direction:column;align-items:center;text-align:center;">
  <div style="display:inline-block;text-align:left;">${mark(24)}</div>
  <p class="k steel" style="font-size:13px;margin-top:46px;">For LIBI members &amp; guests · ${DATE}</p>
  <h1 class="up" style="font-size:62px;line-height:1.05;letter-spacing:.05em;margin-top:14px;"><span style="font-weight:300;color:#fff;">Unlock your</span><br><span style="font-weight:700;">Builder Pass</span></h1>
  <div class="qr" style="width:420px;height:420px;margin-top:36px;padding:14px;border-radius:18px;">${qrSvg.ipad}</div>
  <p style="font-size:19px;font-weight:600;margin-top:24px;">Point your phone's camera here</p>
  <p class="soft" style="font-size:16px;font-weight:500;margin-top:18px;">${LEAD} at all five stores · +$500 Sprinter vans for NAHB members · Free fleet equity report</p>
  <p style="margin-top:20px;"><span class="chip" style="font-size:13px;padding:9px 18px;">${CERT} · share to go <b style="padding:3px 10px;">${GOLD}</b></span></p>
  <p class="k steel" style="font-size:12px;margin-top:auto;">Scan · Swipe · Share · Valid thru ${VALID}</p>
  <p class="soft" style="font-size:13px;font-weight:500;margin-top:10px;">Mary Kate Parrish · ${CELL}</p>
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
  <h1 class="up" style="font-size:66px;line-height:1.06;letter-spacing:.05em;margin-top:44px;"><span style="font-weight:300;color:#fff;">Unlock your</span><br><span style="font-weight:700;">Builder Pass</span></h1>
  <div class="qr" style="width:400px;height:400px;margin-top:40px;padding:14px;border-radius:18px;">${qrSvg.text}</div>
  <p style="font-size:26px;font-weight:600;margin-top:30px;">${LEAD} · all five stores</p>
  <p style="margin-top:16px;"><span class="chip" style="font-size:15px;padding:9px 20px;">${CERT_SHORT} · share to go <b style="padding:3px 10px;">${GOLD}</b></span></p>
  <p class="k steel" style="font-size:15px;margin-top:16px;">For LIBI members · Valid thru ${VALID}</p>
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
  <h1 class="up" style="font-size:92px;line-height:1.06;letter-spacing:.05em;margin-top:18px;"><span style="font-weight:300;color:#fff;">Unlock your</span><br><span style="font-weight:700;">Builder Pass</span></h1>
  <div class="qr" style="width:460px;height:460px;margin:56px auto 0;padding:16px;border-radius:20px;">${qrSvg.social}</div>
  <p style="font-size:34px;font-weight:600;margin-top:44px;">${LEAD} · all five stores</p>
  <p class="soft" style="font-size:26px;font-weight:500;margin-top:16px;">+$500 Sprinter vans for NAHB members · Free fleet equity report</p>
  <p style="margin-top:34px;"><span class="chip" style="font-size:20px;padding:13px 26px;">${CERT_SHORT} · share to go <b style="padding:4px 13px;">${GOLD}</b></span></p>
  <p class="k steel" style="font-size:20px;margin-top:36px;">Scan · Swipe · Share</p>
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
  <h1 class="up" style="font-size:84px;line-height:1.04;letter-spacing:.05em;margin-top:56px;"><span style="font-weight:300;color:#fff;">Unlock your</span><br><span style="font-weight:700;">Builder Pass</span></h1>
  <p style="font-size:26px;font-weight:500;margin-top:24px;color:#fff;">${LEAD} at all five Competition stores · LIBI members</p>
  <p style="margin-top:22px;"><span class="chip" style="font-size:17px;padding:10px 22px;">${CERT} · share to go <b style="padding:3px 11px;">${GOLD}</b></span></p>
</div>${flowRunner}</body></html>`;


// One page for the sales manager: the offer, what it costs, and what needs a yes. US Letter.
const box = `<span style="display:inline-block;width:11px;height:11px;border:1.5px solid ${INK};border-radius:2px;margin-right:8px;vertical-align:-1px;"></span>`;
const onePager = `<!doctype html><html><head><style>${css}
@page { size: Letter; margin: 0; }
body { width: 816px; height: 1056px; overflow: hidden; position: relative; background: #fff; color: ${INK}; font-size: 11.5px; line-height: 1.5; }
h2 { font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #1557C0; margin-bottom: 7px; }
td, th { padding: 6px 10px; text-align: left; vertical-align: top; border-bottom: 1px solid #D5DFEE; }
th { font-size: 9px; letter-spacing: .16em; text-transform: uppercase; background: ${INK}; color: #fff; border: 0; }
li { margin: 0 0 4px 15px; }
.ok { margin-bottom: 7px; }
</style></head><body>
<div class="bg" style="position:relative;height:158px;overflow:hidden;color:#fff;">
  <canvas class="flow" data-y="0.85" data-n="26" data-a="0.5"></canvas><div class="sheen"></div>
  <div style="position:relative;padding:30px 48px;display:flex;justify-content:space-between;align-items:flex-start;">
    <div>${mark(21)}<div style="font-size:24px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;margin-top:20px;white-space:nowrap;">Builder Pass <span style="font-weight:300;">· LIBI offer</span></div></div>
    <div style="text-align:right;font-size:9.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;line-height:1.9;white-space:nowrap;">For manager approval<br><span class="steel">LIBI Membership Dinner</span><br><span class="steel">${EVENT_DATE}</span></div>
  </div>
</div>
<div style="padding:22px 48px 0;">
  <p style="font-size:13px;font-weight:500;">Every LIBI member who scans our QR code gets a personal Builder Pass with a <strong>${CERT}</strong>. They redeem it in the showroom, by appointment, through ${VALID_LONG}. Each one who shares their code and brings in a colleague is upgraded to <strong>${GOLD}</strong>.</p>

  <div style="display:flex;gap:22px;margin-top:16px;">
    <div style="flex:1;border:2px dashed ${INK};border-radius:10px;padding:13px 15px;">
      <h2>What changed</h2>
      <ul>
        <li><strong>No weekend loaner.</strong> No vehicle leaves the lot overnight.</li>
        <li><strong>No drawing.</strong> It is a certificate everyone gets, so there are no sweepstakes rules to manage.</li>
        <li><strong>Showroom redemption.</strong> Every certificate is a booked appointment with a salesperson.</li>
      </ul>
    </div>
    <div style="flex:1;background:#EEF3FA;border-radius:10px;padding:13px 15px;">
      <h2>What the store gets</h2>
      <ul>
        <li>Their current vehicle is on our lot, so we appraise the trade while they drive.</li>
        <li>Builders run trucks and vans: each pass opens a fleet conversation.</li>
        <li>Name, mobile, company, timeline and trade status on every lead, tagged by pass code.</li>
      </ul>
    </div>
  </div>

  <h2 style="margin-top:18px;">What the member gets, and what it costs us</h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr><th style="width:27%;">Benefit</th><th>What we promise</th><th style="width:27%;">Cost to the store</th></tr>
    <tr><td><strong>${LEAD}</strong></td><td>MK reviews their numbers with management. No price is published.</td><td>None. Every deal is still desked by you.</td></tr>
    <tr><td><strong>+$500 on Sprinter vans</strong></td><td>The existing NAHB member incentive on new Mercedes-Benz commercial vans.</td><td>Program incentive, subject to current NAHB and MBUSA terms.</td></tr>
    <tr><td><strong>Fleet equity report</strong></td><td>A value on each vehicle they send us.</td><td>MK's time.</td></tr>
    <tr><td><strong>${CERT}</strong></td><td>A private, accompanied drive in the model they choose, pulled up and ready, with a written appraisal. Subject to availability.</td><td>None beyond a normal test drive.</td></tr>
    <tr><td><strong>${GOLD} upgrade</strong></td><td>${GOLD_REWARD} on the vehicle they arrive in, for the sharer and the colleague.</td><td>One per ${GOLD} holder who comes in. Reward and cap are yours to set.</td></tr>
  </table>

  <div style="display:flex;gap:22px;margin-top:18px;">
    <div style="flex:1.25;">
      <h2>Approvals needed</h2>
      <div class="ok">${box}"${LEAD}" wording, at all five stores</div>
      <div class="ok">${box}${CERT} as written above</div>
      <div class="ok">${box}${GOLD} reward: ${GOLD_REWARD.toLowerCase()}</div>
      <div class="ok">${box}${GOLD} reward, other: ____________________</div>
      <div class="ok">${box}Cap on ${GOLD} rewards: ________</div>
      <div class="ok">${box}Optional dollar Builder Bonus for pass holders: $ ________</div>
      <div class="ok">${box}Lead credit when a holder buys at another store</div>
    </div>
    <div style="flex:1;">
      <h2>Terms on every pass</h2>
      <p style="font-size:10.5px;color:#33415C;">One certificate per person. By appointment through ${VALID_LONG}. No cash value, not transferable. Valid driver's license required. Subject to vehicle availability, dealer confirmation, residency and credit approval. No purchase necessary.</p>
      <p style="font-size:10.5px;color:#33415C;margin-top:8px;">Live page: ${BASE.replace("https://", "")}. The offer wording is one file; any change you want is made in minutes.</p>
    </div>
  </div>
</div>
<div style="position:absolute;left:48px;right:48px;bottom:34px;display:flex;justify-content:space-between;align-items:flex-end;border-top:2px solid ${INK};padding-top:12px;">
  <div style="font-size:10px;white-space:nowrap;"><strong>Mary Kate Parrish</strong> · Mercedes-Benz of Smithtown · ${CELL}</div>
  <div style="font-size:10px;white-space:nowrap;">Approved by __________________ &nbsp; Date ________</div>
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
  await png(ipad, "ipad-display.png", 820, 1180, 2);
  await png(square, "share-card-square.png", 1080, 1080, 1);
  await png(story, "story-9x16.png", 1080, 1920, 1);
  await png(og, "og.png", 1200, 630, 1);
  await png(onePager, "manager-one-pager.png", 816, 1056, 2);
  const pdfPage = await browser.newPage({ viewport: { width: 816, height: 1056 } });
  await pdfPage.setContent(onePager, { waitUntil: "load" });
  await pdfPage.evaluate(() => document.fonts.ready);
  await pdfPage.pdf({ path: path.join(OUT, "manager-one-pager.pdf"), width: "8.5in", height: "11in", printBackground: true });
  await pdfPage.close();
} finally {
  await browser.close();
}

// Copy the images to the site so MK can grab them on her phone.
const KIT = path.join(ROOT, "public/libi/kit");
fs.mkdirSync(KIT, { recursive: true });
for (const f of ["phone-lockscreen.png", "ipad-display.png", "share-card-square.png", "story-9x16.png", "qr-text.png", "qr-followup.png"]) {
  fs.copyFileSync(path.join(OUT, f), path.join(KIT, f));
}
fs.copyFileSync(path.join(OUT, "og.png"), path.join(ROOT, "public/libi/og.png"));

const lines = Object.entries(SOURCES).map(([src, where]) => `  qr-${src}.png  → ${urlFor(src)}  (${where})`);
console.log(`Builder Pass kit built in ${path.relative(ROOT, OUT)}/\n${lines.join("\n")}`);
