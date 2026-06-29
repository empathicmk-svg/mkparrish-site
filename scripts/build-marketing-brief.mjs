/**
 * Build the Product Marketing Candidate Brief — a one-page, on-brand marketing
 * one-pager (PDF + PNG) tailored to a Senior Product Marketing Manager
 * application at CareerPlug.
 *
 * Pipeline:
 *   1. Screenshot the live site (localhost dev server) for the "web experience" panel.
 *   2. Generate a QR code linking to mkparrish.com.
 *   3. Inline the real headshot, QR, and screenshots as base64 data URIs.
 *   4. Render the assembled HTML to A4 PDF + 2x PNG preview via Puppeteer.
 *
 * Usage:
 *   1. Start the dev server:  PORT=4311 npm run dev
 *   2. Run:                   node scripts/build-marketing-brief.mjs
 *
 * Env:
 *   BRIEF_BASE_URL   dev server base (default http://localhost:4311)
 *   BRIEF_SKIP_SHOTS set to "1" to reuse cached screenshots in output/marketing-brief
 */

import puppeteer from "puppeteer";
import QRCode from "qrcode";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const BASE_URL = process.env.BRIEF_BASE_URL || "http://localhost:4311";
const SITE_URL = "https://www.mkparrish.com";

const OUT_DIR = path.join(ROOT, "output", "marketing-brief");
const PUB_DIR = path.join(ROOT, "public", "downloads", "marketing-brief");
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(PUB_DIR, { recursive: true });

const BASENAME = "MK_Parrish_CareerPlug_Product_Marketing_Brief";

// ── helpers ───────────────────────────────────────────────────────────────
const dataUri = (buf, mime) => `data:${mime};base64,${buf.toString("base64")}`;

function fileDataUri(absPath, mime) {
  return dataUri(fs.readFileSync(absPath), mime);
}

// ── 1. SCREENSHOTS ──────────────────────────────────────────────────────────
const SHOT_PAGES = [
  { slug: "home", route: "/" },
  { slug: "services", route: "/services" },
  { slug: "about", route: "/about" },
];

async function captureScreenshots(browser) {
  const shots = {};
  if (process.env.BRIEF_SKIP_SHOTS === "1") {
    for (const { slug } of SHOT_PAGES) {
      shots[slug] = path.join(OUT_DIR, `shot-${slug}.png`);
    }
    return shots;
  }
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  // Suppress the lead-capture popup + "Start Here" drawer so screenshots show
  // the actual pages, not an overlay.
  await page.evaluateOnNewDocument(() => {
    try {
      localStorage.setItem("mkp_lead_seen", "1");
      sessionStorage.setItem("mkp_start_hidden", "1");
    } catch {}
  });
  for (const { slug, route } of SHOT_PAGES) {
    const url = `${BASE_URL}${route}`;
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    // settle: let fonts/animations land, scroll to trigger reveals, return to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 1200));
    const out = path.join(OUT_DIR, `shot-${slug}.png`);
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    shots[slug] = out;
    console.log(`  ✓ screenshot: ${slug}`);
  }
  await page.close();
  return shots;
}

// ── 2. QR CODE ────────────────────────────────────────────────────────────
async function makeQr() {
  return QRCode.toDataURL(SITE_URL, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 360,
    color: { dark: "#080808", light: "#F2AFC6" }, // black modules on petal field
  });
}

// ── 3. HTML ─────────────────────────────────────────────────────────────────
function buildHtml({ headshot, qr, shots }) {
  const shotImg = (slug, label) =>
    `<figure class="shot">
       <img src="${dataUri(fs.readFileSync(shots[slug]), "image/png")}" alt="mkparrish.com — ${label}" />
       <figcaption>${label}</figcaption>
     </figure>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Product Marketing Candidate Brief — MK Parrish</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap');

  :root {
    --void:#080808; --obsidian:#111111; --carbon:#1A1A1A; --graphite:#2C2C2C;
    --iron:#4A4A4A; --ash:#7A7A7A; --smoke:#B0B0B0; --pearl:#F0F0EE; --white:#FAFAF8;
    --blush:#FFD6E4; --petal:#F2AFC6; --rose:#E0869F; --carmine:#C75B78;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body {
    width:210mm; height:297mm; background:var(--void); color:var(--pearl);
    font-family:'DM Sans', system-ui, sans-serif; -webkit-font-smoothing:antialiased; font-size:10pt;
  }
  /* film grain */
  body::before {
    content:''; position:fixed; inset:0; z-index:9999; pointer-events:none; opacity:.03; mix-blend-mode:screen;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:256px 256px;
  }
  .page { width:210mm; height:297mm; position:relative; overflow:hidden; display:flex; flex-direction:column; }
  .page::before {
    content:''; position:absolute; left:50%; top:-110px; transform:translateX(-50%);
    width:185mm; height:150mm; pointer-events:none;
    background:radial-gradient(ellipse, rgba(242,175,198,0.11) 0%, transparent 65%);
  }

  /* ── HEADER ── */
  .header { display:grid; grid-template-columns:1fr auto; align-items:start; padding:6mm 12mm 3.5mm; border-bottom:1px solid var(--graphite); position:relative; z-index:2; }
  .header::after { content:''; position:absolute; bottom:-1px; left:12mm; width:20mm; height:2px; background:var(--petal); }
  .logo { font-family:'Bebas Neue', Impact, sans-serif; font-size:20pt; letter-spacing:.06em; text-transform:uppercase; color:var(--white); line-height:1; }
  .logo-sub { font-family:'Playfair Display', Georgia, serif; font-style:italic; font-size:8pt; color:rgba(242,175,198,.78); margin-top:2px; }
  .doc-meta { text-align:right; }
  .doc-label { font-size:6pt; font-weight:700; letter-spacing:.26em; text-transform:uppercase; color:var(--ash); margin-bottom:2px; }
  .doc-title { font-family:'Bebas Neue', Impact, sans-serif; font-size:10.5pt; letter-spacing:.07em; text-transform:uppercase; color:var(--petal); }
  .doc-for { font-size:6pt; letter-spacing:.14em; text-transform:uppercase; color:var(--iron); margin-top:2px; }

  /* ── HERO ── */
  .hero { display:grid; grid-template-columns:30mm 1fr; gap:7mm; padding:3.5mm 12mm 3mm; border-bottom:1px solid var(--graphite); position:relative; z-index:2; align-items:center; }
  .portrait { position:relative; width:30mm; height:37mm; overflow:hidden; border:1px solid rgba(242,175,198,.35); box-shadow:0 0 40px rgba(242,175,198,.15); }
  .portrait img { width:100%; height:100%; object-fit:cover; object-position:center 22%; filter:grayscale(100%) contrast(1.04); }
  .portrait::after { content:''; position:absolute; inset:0; background:linear-gradient(to top, rgba(8,8,8,.4), transparent 55%); }
  .hero-body .eyebrow { font-size:6pt; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:var(--petal); margin-bottom:2.5mm; }
  .hero-name { font-family:'Bebas Neue', Impact, sans-serif; font-size:26pt; letter-spacing:.02em; text-transform:uppercase; color:var(--white); line-height:.9; }
  .hero-name .accent { color:var(--petal); text-shadow:0 0 30px rgba(242,175,198,.4); }
  .hero-role { font-family:'Playfair Display', Georgia, serif; font-style:italic; font-size:10.5pt; color:rgba(242,175,198,.9); margin-top:2.5mm; font-weight:500; }
  .hero-desc { font-size:8pt; line-height:1.45; color:var(--smoke); font-weight:300; margin-top:2mm; max-width:120mm; }

  /* ── METRICS STRIP ── */
  .metrics { display:grid; grid-template-columns:repeat(4,1fr); border-bottom:1px solid var(--graphite); position:relative; z-index:2; }
  .metric { padding:2.2mm 6mm; border-right:1px solid var(--graphite); }
  .metric:last-child { border-right:none; }
  .metric-num { font-family:'Bebas Neue', Impact, sans-serif; font-size:16pt; letter-spacing:.02em; color:var(--petal); line-height:1; text-shadow:0 0 18px rgba(242,175,198,.25); }
  .metric-label { font-size:5.5pt; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--ash); margin-top:1.2mm; line-height:1.4; }

  /* ── BODY ── */
  .body { display:grid; grid-template-columns:1.04fr .96fr; border-bottom:1px solid var(--graphite); position:relative; z-index:2; }
  .col-left { padding:3mm 6mm 3mm 12mm; border-right:1px solid var(--graphite); }
  .col-right { padding:3mm 12mm 3mm 6mm; }
  .section-label { font-size:5.5pt; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:var(--petal); margin-bottom:2mm; }
  .section-title { font-family:'Bebas Neue', Impact, sans-serif; font-size:12pt; letter-spacing:.03em; text-transform:uppercase; color:var(--pearl); margin-bottom:2.5mm; line-height:1; }
  .why { font-size:7.5pt; line-height:1.55; color:var(--smoke); font-weight:300; }
  .why strong { color:var(--pearl); font-weight:600; }
  .rule { height:1px; background:var(--graphite); margin:2.2mm 0; }

  .reason { display:flex; gap:7px; margin-bottom:2.2mm; }
  .reason:last-child { margin-bottom:0; }
  .reason-num { font-family:'Bebas Neue', Impact, sans-serif; font-size:12pt; line-height:.9; color:var(--petal); flex-shrink:0; width:8mm; opacity:.85; }
  .reason-title { font-size:7.5pt; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:var(--pearl); margin-bottom:1px; }
  .reason-desc { font-size:7pt; line-height:1.5; color:var(--smoke); font-weight:300; }

  .exp { margin-bottom:2mm; padding-bottom:2mm; border-bottom:1px solid var(--graphite); }
  .exp:last-of-type { border-bottom:none; margin-bottom:0; padding-bottom:0; }
  .exp-name { display:flex; align-items:baseline; gap:6px; }
  .exp-dot { width:4px; height:4px; border-radius:50%; background:var(--petal); flex-shrink:0; }
  .exp-name h4 { font-size:7.5pt; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--pearl); }
  .exp-desc { font-size:7pt; line-height:1.5; color:var(--smoke); font-weight:300; margin-top:1.2mm; }

  .wins { margin-top:2.2mm; padding-top:2.2mm; border-top:1px solid var(--graphite); }
  .win { display:flex; gap:6px; align-items:flex-start; margin-bottom:1.4mm; }
  .win:last-child { margin-bottom:0; }
  .win-mark { color:var(--petal); font-weight:700; font-size:7pt; flex-shrink:0; margin-top:.5px; }
  .win-text { font-size:7pt; line-height:1.45; color:var(--smoke); font-weight:300; }
  .win-text strong { color:var(--pearl); font-weight:600; }

  /* ── WEB EXPERIENCE ── */
  .web { padding:3mm 12mm; border-bottom:1px solid var(--graphite); position:relative; z-index:2; }
  .web-head { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2.2mm; }
  .web-head .section-title { margin-bottom:0; }
  .web-note { font-family:'Playfair Display', Georgia, serif; font-style:italic; font-size:7.5pt; color:rgba(242,175,198,.8); }
  .shots { display:grid; grid-template-columns:repeat(3,1fr); gap:3mm; }
  .shot { position:relative; }
  .shot img { width:100%; aspect-ratio:16/8.2; object-fit:cover; object-position:top center; border:1px solid var(--graphite); display:block; }
  .shot figcaption { font-size:5.5pt; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--iron); margin-top:1.2mm; text-align:center; }

  /* ── FOOTER ── */
  .footer { margin-top:auto; display:grid; grid-template-columns:1fr auto; align-items:center; padding:2.5mm 12mm 3mm; background:var(--obsidian); position:relative; z-index:2; }
  .footer::before { content:''; position:absolute; top:0; left:12mm; right:12mm; height:1px; background:linear-gradient(90deg, transparent, rgba(242,175,198,.5) 40%, rgba(242,175,198,.5) 60%, transparent); }
  .contact { display:flex; gap:9mm; }
  .c-label { font-size:6pt; font-weight:700; letter-spacing:.24em; text-transform:uppercase; color:var(--iron); margin-bottom:1.5mm; }
  .c-value { font-size:8pt; color:var(--pearl); letter-spacing:.02em; line-height:1.4; }
  .qr { display:flex; align-items:center; gap:5mm; }
  .qr-text { text-align:right; }
  .qr-text .cta-label { font-size:6pt; font-weight:700; letter-spacing:.24em; text-transform:uppercase; color:var(--petal); margin-bottom:1.5mm; }
  .qr-text .cta-url { font-family:'Bebas Neue', Impact, sans-serif; font-size:13pt; letter-spacing:.05em; text-transform:uppercase; color:var(--white); }
  .qr-text .cta-note { font-size:6pt; letter-spacing:.08em; color:var(--ash); margin-top:1.5mm; }
  .qr img { width:18mm; height:18mm; display:block; border:2px solid var(--petal); }

  @page { size:A4; margin:0; }
  @media print {
    html, body { background:var(--void); -webkit-print-color-adjust:exact; print-color-adjust:exact; }
    body::before { display:none; }
  }
</style>
</head>
<body>
<div class="page">

  <!-- HEADER -->
  <div class="header">
    <div>
      <div class="logo">MK Parrish</div>
      <div class="logo-sub">Writer first. Strategist always.</div>
    </div>
    <div class="doc-meta">
      <div class="doc-label">Product Marketing · Candidate Brief</div>
      <div class="doc-title">Senior Product Marketing Manager</div>
      <div class="doc-for">Prepared for CareerPlug &nbsp;·&nbsp; 2026</div>
    </div>
  </div>

  <!-- HERO -->
  <div class="hero">
    <div class="portrait"><img src="${headshot}" alt="MK Parrish" /></div>
    <div class="hero-body">
      <p class="eyebrow">Go-to-Market &nbsp;·&nbsp; Positioning &nbsp;·&nbsp; Product Marketing</p>
      <div class="hero-name">The PMM who can <span class="accent">write the story</span> and ship the funnel.</div>
      <div class="hero-role">Senior growth operator &amp; writer — one pair of hands, no agency layers.</div>
      <div class="hero-desc">Two decades closing the gap between what a product has become and how the market sees it. I own the narrative end to end — positioning, launches, sales enablement, and the words on every page — so the value is obvious before a buyer ever takes a call.</div>
    </div>
  </div>

  <!-- METRICS -->
  <div class="metrics">
    <div class="metric"><div class="metric-num">$40M+</div><div class="metric-label">Pipeline influenced</div></div>
    <div class="metric"><div class="metric-num">2 Decades</div><div class="metric-label">Growth &amp; marketing</div></div>
    <div class="metric"><div class="metric-num">32%</div><div class="metric-label">Cold reply rates</div></div>
    <div class="metric"><div class="metric-num">Fortune&nbsp;50</div><div class="metric-label">To growth-stage teams</div></div>
  </div>

  <!-- BODY -->
  <div class="body">
    <div class="col-left">
      <p class="section-label">The fit</p>
      <p class="section-title">Why CareerPlug</p>
      <p class="why">
        CareerPlug already has the product and the proof — hiring software that helps thousands of small businesses and franchises make better hires. In a category like recruiting software, the win goes to whoever makes the value <strong>unmistakable</strong>: why this, why now, why you. That gap — between a genuinely great product and the language that sells it — is the exact work I have done for two decades.
      </p>
      <p class="why" style="margin-top:3mm;">
        I would own the GTM narrative across the funnel: <strong>positioning that differentiates, launches that land, enablement that helps sales win, and copy that converts</strong> — so the market sees CareerPlug as clearly as its customers already do.
      </p>

      <div class="rule"></div>

      <p class="section-label">The case</p>
      <p class="section-title">Three reasons I'm the hire</p>

      <div class="reason">
        <span class="reason-num">01</span>
        <div>
          <div class="reason-title">Strategy and execution in one operator</div>
          <div class="reason-desc">Most teams buy a senior name and get junior output. I do the thinking and the shipping — positioning, messaging, the website, and the campaign all say the same thing and pull the same direction.</div>
        </div>
      </div>
      <div class="reason">
        <span class="reason-num">02</span>
        <div>
          <div class="reason-title">A track record measured in revenue</div>
          <div class="reason-desc">$40M+ in pipeline influenced across Fortune 50s and funded startups. I speak fluently to product, sales, and the buyer — and I tie marketing to numbers a board will recognize, not activity reports.</div>
        </div>
      </div>
      <div class="reason">
        <span class="reason-num">03</span>
        <div>
          <div class="reason-title">A product marketer who can actually write</div>
          <div class="reason-desc">The rare PMM who writes every sentence by hand — the launch, the one-pager, the sales narrative, the homepage. Clear words are the whole job, and they are the thing I am best at.</div>
        </div>
      </div>
    </div>

    <div class="col-right">
      <p class="section-label">What I bring</p>
      <p class="section-title">Expertise</p>

      <div class="exp">
        <div class="exp-name"><span class="exp-dot"></span><h4>Go-to-Market</h4></div>
        <div class="exp-desc">Launch strategy, segmentation, and demand systems tied to qualified pipeline — across B2B SaaS and consumer, from first sentence to booked call.</div>
      </div>
      <div class="exp">
        <div class="exp-name"><span class="exp-dot"></span><h4>Positioning &amp; Messaging</h4></div>
        <div class="exp-desc">Category narrative, value propositions, and competitive differentiation that make a product's value obvious to the right buyer.</div>
      </div>
      <div class="exp">
        <div class="exp-name"><span class="exp-dot"></span><h4>Product Marketing</h4></div>
        <div class="exp-desc">Sales enablement, launch playbooks, lifecycle messaging, and a buyer-informed narrative that helps reps win the deals that matter.</div>
      </div>
      <div class="exp">
        <div class="exp-name"><span class="exp-dot"></span><h4>Writing</h4></div>
        <div class="exp-desc">Web, long-form, launch, and executive ghostwriting — every line written by hand. Copy without strategy is decoration; I do both.</div>
      </div>

      <div class="wins">
        <p class="section-label" style="margin-bottom:2.5mm;">Selected accomplishments</p>
        <div class="win"><span class="win-mark">→</span><span class="win-text"><strong>$40M+ pipeline influenced</strong> across two decades of demand and growth.</span></div>
        <div class="win"><span class="win-mark">→</span><span class="win-text"><strong>32% cold reply rates</strong> on outbound built on sharper positioning.</span></div>
        <div class="win"><span class="win-mark">→</span><span class="win-text"><strong>End-to-end GTM systems</strong> — site, messaging, and pipeline owned solo.</span></div>
        <div class="win"><span class="win-mark">→</span><span class="win-text"><strong>Fortune 50 to startup</strong> range — same operator, every altitude.</span></div>
      </div>
    </div>
  </div>

  <!-- WEB EXPERIENCE -->
  <div class="web">
    <div class="web-head">
      <p class="section-title">The web experience</p>
      <p class="web-note">mkparrish.com — designed, written &amp; built end to end</p>
    </div>
    <div class="shots">
      ${shotImg("home", "Homepage")}
      ${shotImg("services", "Services & pricing")}
      ${shotImg("about", "About / story")}
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="contact">
      <div>
        <div class="c-label">Email</div>
        <div class="c-value">mkp414@icloud.com</div>
      </div>
      <div>
        <div class="c-label">LinkedIn</div>
        <div class="c-value">/in/mkparrish</div>
      </div>
      <div>
        <div class="c-label">Phone</div>
        <div class="c-value">347.853.4238</div>
      </div>
    </div>
    <div class="qr">
      <div class="qr-text">
        <div class="cta-label">See the work</div>
        <div class="cta-url">mkparrish.com</div>
        <div class="cta-note">Scan to view the live site</div>
      </div>
      <img src="${qr}" alt="QR code linking to mkparrish.com" />
    </div>
  </div>

</div>
</body>
</html>`;
}

// ── 4. RENDER ─────────────────────────────────────────────────────────────
async function main() {
  console.log("→ Building Product Marketing Candidate Brief");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-lcd-text"],
  });

  console.log("→ Capturing site screenshots");
  const shots = await captureScreenshots(browser);

  console.log("→ Generating QR code");
  const qr = await makeQr();

  const headshot = fileDataUri(path.join(ROOT, "public", "author", "mk-parrish-photo.jpg"), "image/jpeg");

  const html = buildHtml({ headshot, qr, shots });
  const htmlPath = path.join(OUT_DIR, `${BASENAME}.html`);
  fs.writeFileSync(htmlPath, html);
  console.log(`  ✓ html: ${path.relative(ROOT, htmlPath)}`);

  console.log("→ Rendering PDF + PNG");
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600)); // let fonts settle

  const pngPath = path.join(OUT_DIR, `${BASENAME}.png`);
  await page.screenshot({ path: pngPath, fullPage: true });

  const pdfOut = path.join(OUT_DIR, `${BASENAME}.pdf`);
  await page.pdf({ path: pdfOut, format: "A4", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });

  // publish hosted copies
  const pubPdf = path.join(PUB_DIR, `${BASENAME}.pdf`);
  const pubPng = path.join(PUB_DIR, `${BASENAME}.png`);
  fs.copyFileSync(pdfOut, pubPdf);
  fs.copyFileSync(pngPath, pubPng);

  await browser.close();

  console.log(`  ✓ PDF:  ${path.relative(ROOT, pdfOut)}`);
  console.log(`  ✓ PNG:  ${path.relative(ROOT, pngPath)}`);
  console.log(`  ✓ Hosted at /downloads/marketing-brief/${BASENAME}.pdf`);
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
