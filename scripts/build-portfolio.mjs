/**
 * Build MK Parrish's job-search package, on-brand with mkparrish.com:
 *   1. Universal Cover Letter — a one-page branded candidate brief (company-agnostic).
 *   2. Detailed Portfolio      — a multi-page portfolio (cover, profile, work,
 *                                writing, web experience, contact).
 *
 * Shares the dark-luxury brand system (void/petal, Bebas/Playfair/DM Sans) with
 * scripts/build-marketing-brief.mjs.
 *
 * Usage:
 *   1. Start the dev server:  PORT=4311 npm run dev
 *   2. Run:                   node scripts/build-portfolio.mjs
 *
 * Env:
 *   BRIEF_BASE_URL    dev server base (default http://localhost:4311)
 *   BRIEF_SKIP_SHOTS  "1" to reuse cached screenshots in output/portfolio
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

const OUT_DIR = path.join(ROOT, "output", "portfolio");
const PUB_DIR = path.join(ROOT, "public", "downloads", "portfolio");
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(PUB_DIR, { recursive: true });

const dataUri = (buf, mime) => `data:${mime};base64,${buf.toString("base64")}`;
const fileDataUri = (p, mime) => dataUri(fs.readFileSync(p), mime);

// Brand fonts, inlined as base64 @font-face so rendering never depends on the
// network (a remote @import was silently falling back to Liberation/DejaVu).
const FONT_CSS = fs.readFileSync(path.join(__dirname, "assets", "fonts-embedded.css"), "utf8");

// ── SCREENSHOTS ─────────────────────────────────────────────────────────────
const SHOT_PAGES = [
  { slug: "home", route: "/" },
  { slug: "services", route: "/services" },
  { slug: "brand", route: "/brand" },
  { slug: "about", route: "/about" },
  { slug: "writing", route: "/writing" },
  { slug: "shop", route: "/shop" },
];

async function captureScreenshots(browser) {
  const shots = {};
  if (process.env.BRIEF_SKIP_SHOTS === "1") {
    for (const { slug } of SHOT_PAGES) shots[slug] = path.join(OUT_DIR, `shot-${slug}.png`);
    return shots;
  }
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.evaluateOnNewDocument(() => {
    try {
      localStorage.setItem("mkp_lead_seen", "1");
      sessionStorage.setItem("mkp_start_hidden", "1");
    } catch {}
  });
  for (const { slug, route } of SHOT_PAGES) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
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

const shotUri = (shots, slug) => dataUri(fs.readFileSync(shots[slug]), "image/png");

async function makeQr() {
  return QRCode.toDataURL(SITE_URL, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 360,
    color: { dark: "#080808", light: "#F2AFC6" },
  });
}

// ── SHARED BRAND CSS ─────────────────────────────────────────────────────────
const BRAND_CSS = `
  ${FONT_CSS}
  :root {
    --void:#080808; --obsidian:#111111; --carbon:#1A1A1A; --graphite:#2C2C2C;
    --iron:#4A4A4A; --ash:#7A7A7A; --smoke:#B0B0B0; --pearl:#F0F0EE; --white:#FAFAF8;
    --blush:#FFD6E4; --petal:#F2AFC6; --rose:#E0869F; --carmine:#C75B78;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:210mm; background:var(--void); color:var(--pearl); font-family:'DM Sans', system-ui, sans-serif; -webkit-font-smoothing:antialiased; font-size:10pt; }
  .page { width:210mm; height:297mm; position:relative; overflow:hidden; display:flex; flex-direction:column; page-break-after:always; }
  .page:last-child { page-break-after:auto; }
  .page::before { content:''; position:absolute; left:50%; top:-110px; transform:translateX(-50%); width:185mm; height:150mm; pointer-events:none; background:radial-gradient(ellipse, rgba(242,175,198,0.10) 0%, transparent 65%); }
  .grain { position:absolute; inset:0; z-index:1; pointer-events:none; opacity:.03; mix-blend-mode:screen; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:256px 256px; }

  /* header / footer */
  .header { display:grid; grid-template-columns:1fr auto; align-items:start; padding:8mm 12mm 4mm; border-bottom:1px solid var(--graphite); position:relative; z-index:2; }
  .header::after { content:''; position:absolute; bottom:-1px; left:12mm; width:20mm; height:2px; background:var(--petal); }
  .logo { font-family:'Bebas Neue', Impact, sans-serif; font-size:21pt; letter-spacing:.06em; text-transform:uppercase; color:var(--white); line-height:1; }
  .logo-sub { font-family:'Playfair Display', Georgia, serif; font-style:italic; font-size:8pt; color:rgba(242,175,198,.78); margin-top:2px; }
  .doc-meta { text-align:right; }
  .doc-label { font-size:6pt; font-weight:700; letter-spacing:.26em; text-transform:uppercase; color:var(--ash); margin-bottom:2px; }
  .doc-title { font-family:'Bebas Neue', Impact, sans-serif; font-size:10.5pt; letter-spacing:.07em; text-transform:uppercase; color:var(--petal); }
  .doc-for { font-size:6pt; letter-spacing:.14em; text-transform:uppercase; color:var(--iron); margin-top:2px; }

  .footer { margin-top:auto; display:grid; grid-template-columns:1fr auto; align-items:center; padding:3mm 12mm 4mm; background:var(--obsidian); position:relative; z-index:2; }
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

  /* shared type */
  .eyebrow { font-size:6pt; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:var(--petal); }
  .section-label { font-size:5.5pt; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:var(--petal); margin-bottom:2mm; }
  .section-title { font-family:'Bebas Neue', Impact, sans-serif; font-size:13pt; letter-spacing:.03em; text-transform:uppercase; color:var(--pearl); line-height:1; }

  /* metrics strip */
  .metrics { display:grid; grid-template-columns:repeat(4,1fr); border-bottom:1px solid var(--graphite); border-top:1px solid var(--graphite); position:relative; z-index:2; }
  .metric { padding:3mm 6mm; border-right:1px solid var(--graphite); }
  .metric:last-child { border-right:none; }
  .metric-num { font-family:'Bebas Neue', Impact, sans-serif; font-size:17pt; letter-spacing:.02em; color:var(--petal); line-height:1; text-shadow:0 0 18px rgba(242,175,198,.25); }
  .metric-label { font-size:5.5pt; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--ash); margin-top:1.5mm; line-height:1.4; }

  @page { size:A4; margin:0; }
  @media print { html, body { background:var(--void); -webkit-print-color-adjust:exact; print-color-adjust:exact; } .grain { display:none; } }
`;

function headerBlock({ label, title, forLine }) {
  return `<div class="header">
    <div>
      <div class="logo">MK Parrish</div>
      <div class="logo-sub">Writer first. Strategist always.</div>
    </div>
    <div class="doc-meta">
      <div class="doc-label">${label}</div>
      <div class="doc-title">${title}</div>
      <div class="doc-for">${forLine}</div>
    </div>
  </div>`;
}

function metricsBlock() {
  return `<div class="metrics">
    <div class="metric"><div class="metric-num">$40M+</div><div class="metric-label">Pipeline influenced</div></div>
    <div class="metric"><div class="metric-num">2 Decades</div><div class="metric-label">Growth &amp; marketing</div></div>
    <div class="metric"><div class="metric-num">32%</div><div class="metric-label">Cold reply rates</div></div>
    <div class="metric"><div class="metric-num">Fortune&nbsp;50</div><div class="metric-label">To growth-stage teams</div></div>
  </div>`;
}

function footerBlock(qr) {
  return `<div class="footer">
    <div class="contact">
      <div><div class="c-label">Email</div><div class="c-value">mkp414@icloud.com</div></div>
      <div><div class="c-label">LinkedIn</div><div class="c-value">/in/mkparrish</div></div>
      <div><div class="c-label">Phone</div><div class="c-value">347.853.4238</div></div>
    </div>
    <div class="qr">
      <div class="qr-text">
        <div class="cta-label">See the work</div>
        <div class="cta-url">mkparrish.com</div>
        <div class="cta-note">Scan to view the live site</div>
      </div>
      <img src="${qr}" alt="QR code linking to mkparrish.com" />
    </div>
  </div>`;
}

// ── 1. UNIVERSAL COVER LETTER ────────────────────────────────────────────────
function buildCoverLetter({ headshot, qr, shots }) {
  const css = `${BRAND_CSS}
    .hero { display:grid; grid-template-columns:30mm 1fr; gap:7mm; padding:3mm 12mm 3mm; border-bottom:1px solid var(--graphite); position:relative; z-index:2; align-items:center; }
    .portrait { position:relative; width:30mm; height:37mm; overflow:hidden; border:1px solid rgba(242,175,198,.35); box-shadow:0 0 40px rgba(242,175,198,.15); }
    .portrait img { width:100%; height:100%; object-fit:cover; object-position:center 22%; filter:grayscale(100%) contrast(1.04); }
    .portrait::after { content:''; position:absolute; inset:0; background:linear-gradient(to top, rgba(8,8,8,.4), transparent 55%); }
    .hero-body .eyebrow { margin-bottom:2.5mm; }
    .hero-name { font-family:'Bebas Neue', Impact, sans-serif; font-size:26pt; letter-spacing:.02em; text-transform:uppercase; color:var(--white); line-height:.9; }
    .hero-name .accent { color:var(--petal); text-shadow:0 0 30px rgba(242,175,198,.4); }
    .hero-role { font-family:'Playfair Display', Georgia, serif; font-style:italic; font-size:10.5pt; color:rgba(242,175,198,.9); margin-top:2.5mm; font-weight:500; }
    .hero-desc { font-size:8pt; line-height:1.45; color:var(--smoke); font-weight:300; margin-top:2mm; max-width:120mm; }

    .body { display:grid; grid-template-columns:1.04fr .96fr; border-bottom:1px solid var(--graphite); position:relative; z-index:2; }
    .col-left { padding:3mm 6mm 3mm 12mm; border-right:1px solid var(--graphite); }
    .col-right { padding:3mm 12mm 3mm 6mm; }
    .salute { font-family:'Playfair Display', Georgia, serif; font-size:10pt; color:var(--pearl); margin-bottom:2mm; }
    .note { font-size:7.5pt; line-height:1.48; color:var(--smoke); font-weight:300; margin-bottom:2mm; }
    .note strong { color:var(--pearl); font-weight:600; }
    .sign { font-family:'Playfair Display', Georgia, serif; font-style:italic; font-size:9.5pt; color:rgba(242,175,198,.9); margin-top:1mm; }
    .rule { height:1px; background:var(--graphite); margin:2.4mm 0; }
    .reason { display:flex; gap:7px; margin-bottom:2mm; }
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

    .web { padding:2.5mm 12mm; border-bottom:1px solid var(--graphite); position:relative; z-index:2; }
    .web-head { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2mm; }
    .web-note { font-family:'Playfair Display', Georgia, serif; font-style:italic; font-size:7.5pt; color:rgba(242,175,198,.8); }
    .shots { display:grid; grid-template-columns:repeat(3,1fr); gap:3mm; }
    .shot img { width:100%; aspect-ratio:16/7.6; object-fit:cover; object-position:top center; border:1px solid var(--graphite); display:block; }
    .shot figcaption { font-size:5.5pt; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--iron); margin-top:1.2mm; text-align:center; }
  `;
  const shot = (slug, label) =>
    `<figure class="shot"><img src="${shotUri(shots, slug)}" alt="mkparrish.com — ${label}" /><figcaption>${label}</figcaption></figure>`;

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />
<title>Cover Letter — MK Parrish</title><style>${css}</style></head><body>
<div class="page"><div class="grain"></div>
  ${headerBlock({ label: "Cover Letter · Candidate Brief", title: "Senior Product Marketing & Growth", forLine: "Available now · Remote / hybrid · 2026" })}
  <div class="hero">
    <div class="portrait"><img src="${headshot}" alt="MK Parrish" /></div>
    <div class="hero-body">
      <p class="eyebrow">Go-to-Market &nbsp;·&nbsp; Positioning &nbsp;·&nbsp; Product Marketing</p>
      <div class="hero-name">The PMM who can <span class="accent">write the story</span> and ship the funnel.</div>
      <div class="hero-role">Senior growth operator &amp; writer — one pair of hands, no agency layers.</div>
      <div class="hero-desc">Two decades closing the gap between what a product has become and how the market sees it. I own the narrative end to end — positioning, launches, sales enablement, and the words on every page — so the value is obvious before a buyer ever takes a call.</div>
    </div>
  </div>
  ${metricsBlock()}
  <div class="body">
    <div class="col-left">
      <p class="section-label">The note</p>
      <p class="salute">To the hiring team,</p>
      <p class="note">Most product marketing roles ask for two people in one: the strategist who can position the product, and the writer who can make the words land. <strong>I am both</strong> — and for two decades I have closed the gap between what a company builds and how its market understands it, across Fortune 50s and funded startups alike.</p>
      <p class="note">I do the thinking <em>and</em> the shipping: positioning, launch narrative, sales enablement, the website, and the campaign that puts qualified buyers in front of your team — no hand-offs, no telephone game. One senior operator who ties marketing to revenue a board will recognize: <strong>$40M+ in pipeline influenced.</strong></p>
      <p class="note">If your product is outperforming the language you use to describe it, that gap is exactly the work I do. I would love to do it for you.</p>
      <p class="sign">— MK Parrish</p>
      <div class="rule"></div>
      <p class="section-label">Why talk to me</p>
      <p class="section-title" style="margin-bottom:2.5mm;">Three reasons</p>
      <div class="reason"><span class="reason-num">01</span><div><div class="reason-title">Strategy and execution in one operator</div><div class="reason-desc">Positioning, messaging, the site, and the campaign all say the same thing and pull the same direction — because one person owns them.</div></div></div>
      <div class="reason"><span class="reason-num">02</span><div><div class="reason-title">A track record measured in revenue</div><div class="reason-desc">$40M+ in pipeline influenced across Fortune 50s and startups. I speak fluently to product, sales, and the buyer.</div></div></div>
      <div class="reason"><span class="reason-num">03</span><div><div class="reason-title">A product marketer who can actually write</div><div class="reason-desc">The rare PMM who writes every sentence by hand — the launch, the one-pager, the narrative, the homepage.</div></div></div>
    </div>
    <div class="col-right">
      <p class="section-label">What I bring</p>
      <p class="section-title" style="margin-bottom:2.5mm;">Expertise</p>
      <div class="exp"><div class="exp-name"><span class="exp-dot"></span><h4>Go-to-Market</h4></div><div class="exp-desc">Launch strategy, segmentation, and demand systems tied to qualified pipeline — B2B SaaS and consumer, first sentence to booked call.</div></div>
      <div class="exp"><div class="exp-name"><span class="exp-dot"></span><h4>Positioning &amp; Messaging</h4></div><div class="exp-desc">Category narrative, value propositions, and competitive differentiation that make a product's value obvious to the right buyer.</div></div>
      <div class="exp"><div class="exp-name"><span class="exp-dot"></span><h4>Product Marketing</h4></div><div class="exp-desc">Sales enablement, launch playbooks, lifecycle messaging, and a buyer-informed narrative that helps reps win the deals that matter.</div></div>
      <div class="exp"><div class="exp-name"><span class="exp-dot"></span><h4>Writing</h4></div><div class="exp-desc">Web, long-form, launch, and executive ghostwriting — every line by hand. Copy without strategy is decoration; I do both.</div></div>
      <div class="wins">
        <p class="section-label" style="margin-bottom:2.5mm;">Selected accomplishments</p>
        <div class="win"><span class="win-mark">→</span><span class="win-text"><strong>$40M+ pipeline influenced</strong> across two decades of demand and growth.</span></div>
        <div class="win"><span class="win-mark">→</span><span class="win-text"><strong>32% cold reply rates</strong> on outbound built on sharper positioning.</span></div>
        <div class="win"><span class="win-mark">→</span><span class="win-text"><strong>End-to-end GTM systems</strong> — site, messaging, and pipeline owned solo.</span></div>
        <div class="win"><span class="win-mark">→</span><span class="win-text"><strong>15+ frameworks authored</strong> — expert process productized and positioned.</span></div>
      </div>
    </div>
  </div>
  <div class="web">
    <div class="web-head"><p class="section-title">The web experience</p><p class="web-note">mkparrish.com — designed, written &amp; built end to end</p></div>
    <div class="shots">${shot("home", "Homepage")}${shot("services", "Services & pricing")}${shot("about", "About / story")}</div>
  </div>
  ${footerBlock(qr)}
</div></body></html>`;
}

// ── 2. DETAILED PORTFOLIO (multi-page) ───────────────────────────────────────
function buildPortfolio({ headshot, qr, shots }) {
  const css = `${BRAND_CSS}
    /* COVER */
    .cover { justify-content:center; align-items:stretch; padding:0; }
    .cover-inner { padding:0 16mm; position:relative; z-index:2; }
    .cover-eyebrow { font-size:7pt; font-weight:700; letter-spacing:.4em; text-transform:uppercase; color:var(--petal); margin-bottom:7mm; }
    .cover-grid { display:grid; grid-template-columns:1fr 46mm; gap:12mm; align-items:center; }
    .cover-name { font-family:'Bebas Neue', Impact, sans-serif; font-size:62pt; letter-spacing:.01em; text-transform:uppercase; color:var(--white); line-height:.84; }
    .cover-name .accent { color:var(--petal); text-shadow:0 0 40px rgba(242,175,198,.4); }
    .cover-role { font-family:'Playfair Display', Georgia, serif; font-style:italic; font-size:15pt; color:rgba(242,175,198,.9); margin-top:6mm; font-weight:500; }
    .cover-desc { font-size:9.5pt; line-height:1.7; color:var(--smoke); font-weight:300; margin-top:6mm; max-width:120mm; }
    .cover-portrait { position:relative; width:46mm; height:57mm; overflow:hidden; border:1px solid rgba(242,175,198,.4); box-shadow:0 0 50px rgba(242,175,198,.18); }
    .cover-portrait img { width:100%; height:100%; object-fit:cover; object-position:center 22%; filter:grayscale(100%) contrast(1.05); }
    .cover-portrait::after { content:''; position:absolute; inset:0; background:linear-gradient(to top, rgba(8,8,8,.45), transparent 55%); }
    .cover-doc { position:absolute; top:14mm; left:16mm; right:16mm; display:flex; justify-content:space-between; align-items:baseline; z-index:2; }
    .cover-foot { position:absolute; bottom:14mm; left:16mm; right:16mm; display:flex; justify-content:space-between; align-items:flex-end; z-index:2; }

    /* generic interior page */
    .pg { padding:13mm 16mm; position:relative; z-index:2; flex:1; display:flex; flex-direction:column; }
    .pg-title { font-family:'Bebas Neue', Impact, sans-serif; font-size:34pt; letter-spacing:.02em; text-transform:uppercase; color:var(--white); line-height:.9; margin-bottom:1.5mm; }
    .pg-title .accent { color:var(--petal); }
    .pg-kicker { font-size:7pt; font-weight:700; letter-spacing:.34em; text-transform:uppercase; color:var(--petal); margin-bottom:5mm; }
    .lead { font-family:'Playfair Display', Georgia, serif; font-size:14.5pt; font-style:italic; line-height:1.5; color:var(--pearl); font-weight:500; }
    .lead .accent { color:var(--petal); }
    .para { font-size:9.5pt; line-height:1.8; color:var(--smoke); font-weight:300; margin-top:5mm; max-width:158mm; }
    .para strong { color:var(--pearl); font-weight:600; }
    .pagenum { position:absolute; bottom:8mm; right:16mm; font-family:'Bebas Neue', Impact, sans-serif; font-size:9pt; letter-spacing:.1em; color:var(--iron); z-index:2; }
    .pagemark { position:absolute; bottom:8mm; left:16mm; font-size:6pt; font-weight:700; letter-spacing:.24em; text-transform:uppercase; color:var(--iron); z-index:2; }

    /* expertise grid */
    .quad { display:grid; grid-template-columns:1fr 1fr; gap:0; margin-top:9mm; border-top:1px solid var(--graphite); border-left:1px solid var(--graphite); }
    .quad-cell { padding:8.5mm; border-right:1px solid var(--graphite); border-bottom:1px solid var(--graphite); }
    .quad-cell h4 { font-family:'Bebas Neue', Impact, sans-serif; font-size:16pt; letter-spacing:.04em; text-transform:uppercase; color:var(--petal); margin-bottom:3mm; }
    .quad-cell p { font-size:8.5pt; line-height:1.65; color:var(--smoke); font-weight:300; }
    .quad-cell .tags { margin-top:4mm; font-size:6.5pt; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--iron); line-height:1.7; }

    /* work / case studies */
    .cases { margin-top:3mm; }
    .case { display:grid; grid-template-columns:14mm 1fr 32mm; gap:6mm; padding:7mm 0; border-bottom:1px solid var(--graphite); align-items:start; }
    .case:last-child { border-bottom:none; }
    .case-num { font-family:'Bebas Neue', Impact, sans-serif; font-size:22pt; color:var(--petal); opacity:.8; line-height:.9; }
    .case h4 { font-size:10.5pt; font-weight:700; letter-spacing:.04em; text-transform:uppercase; color:var(--pearl); margin-bottom:2mm; }
    .case p { font-size:8.5pt; line-height:1.6; color:var(--smoke); font-weight:300; }
    .case-result { text-align:right; }
    .case-result .r-num { font-family:'Bebas Neue', Impact, sans-serif; font-size:17pt; color:var(--petal); line-height:1; }
    .case-result .r-lab { font-size:5.5pt; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--ash); margin-top:1.5mm; }

    /* writing / published */
    .covers { display:grid; grid-template-columns:repeat(7,1fr); gap:4mm; margin-top:8mm; margin-bottom:2mm; }
    .covers img { width:100%; aspect-ratio:2/3; object-fit:cover; border:1px solid var(--graphite); display:block; box-shadow:0 6px 22px rgba(0,0,0,.5); }
    .pub-grid { display:grid; grid-template-columns:1fr 1fr; gap:0 10mm; margin-top:6mm; }
    .pub { display:grid; grid-template-columns:auto 1fr; gap:6px; padding:4.5mm 0; border-bottom:1px solid var(--graphite); align-items:baseline; }
    .pub-mark { color:var(--petal); font-size:8pt; }
    .pub-t { font-size:9pt; font-weight:600; color:var(--pearl); letter-spacing:.02em; }
    .pub-s { font-size:7.5pt; color:var(--ash); font-weight:300; line-height:1.45; margin-top:1mm; }
    .pub-tag { font-size:6pt; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--rose); margin-top:1.5mm; }

    /* gallery */
    .gallery { display:grid; grid-template-columns:1fr 1fr; gap:8mm; margin-top:11mm; }
    .gshot img { width:100%; aspect-ratio:16/12; object-fit:cover; object-position:top center; border:1px solid var(--graphite); display:block; box-shadow:0 0 30px rgba(0,0,0,.4); }
    .gshot figcaption { font-size:6.5pt; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:var(--iron); margin-top:3mm; }

    /* closing */
    .close-cta { font-family:'Bebas Neue', Impact, sans-serif; font-size:40pt; letter-spacing:.01em; text-transform:uppercase; color:var(--white); line-height:.9; margin-top:7mm; }
    .close-cta .accent { color:var(--petal); text-shadow:0 0 40px rgba(242,175,198,.4); }
  `;

  const gshot = (slug, label) =>
    `<figure class="gshot"><img src="${shotUri(shots, slug)}" alt="mkparrish.com — ${label}" /><figcaption>${label}</figcaption></figure>`;

  const pub = (mark, t, s, tag) =>
    `<div class="pub"><span class="pub-mark">${mark}</span><div><div class="pub-t">${t}</div><div class="pub-s">${s}</div><div class="pub-tag">${tag}</div></div></div>`;

  const cover = (slug) =>
    fileDataUri(path.join(ROOT, "public", "downloads", "covers", `${slug}-cover.jpg`), "image/jpeg");

  // ── PAGE 1 — COVER
  const coverPage = `<div class="page cover"><div class="grain"></div>
    <div class="cover-doc">
      <div><div class="logo">MK Parrish</div><div class="logo-sub">Writer first. Strategist always.</div></div>
      <div class="doc-meta"><div class="doc-label">Portfolio</div><div class="doc-title">Product Marketing & Growth</div><div class="doc-for">2026 Edition</div></div>
    </div>
    <div class="cover-inner">
      <div class="cover-eyebrow">Go-to-Market · Positioning · Product Marketing · Writing</div>
      <div class="cover-grid">
        <div>
          <div class="cover-name">Turn how<br/>you're seen<br/><span class="accent">into revenue.</span></div>
          <div class="cover-role">Senior growth operator &amp; writer — one pair of hands, no agency layers.</div>
          <div class="cover-desc">I help companies close the gap between what they have become and how they show up — clearer positioning, conversion websites, launch narrative, and demand systems built by one senior operator from first sentence to qualified call.</div>
        </div>
        <div class="cover-portrait"><img src="${headshot}" alt="MK Parrish" /></div>
      </div>
    </div>
    <div class="cover-foot">
      <div class="contact">
        <div><div class="c-label">Email</div><div class="c-value">mkp414@icloud.com</div></div>
        <div><div class="c-label">LinkedIn</div><div class="c-value">/in/mkparrish</div></div>
        <div><div class="c-label">Site</div><div class="c-value">mkparrish.com</div></div>
      </div>
      <div class="qr"><img src="${qr}" alt="QR to mkparrish.com" /></div>
    </div>
  </div>`;

  // ── PAGE 2 — PROFILE + EXPERTISE
  const profilePage = `<div class="page"><div class="grain"></div>
    ${metricsBlock()}
    <div class="pg">
      <div class="pg-kicker">01 — Profile</div>
      <div class="pg-title">I started as a writer.<br/><span class="accent">Then I learned to move revenue.</span></div>
      <p class="lead" style="margin-top:5mm;">Most people who can write can't build. Most who can build can't write. <span class="accent">I do both.</span></p>
      <p class="para">I spent two decades inside marketing and growth — Fortune 50 companies, funded startups, and everything between. I have influenced over <strong>$40M in pipeline</strong>, run demand across B2B and consumer, and built the systems that put qualified buyers in front of sales teams. Not activity reports. Revenue.</p>
      <p class="para">The rare combination is the point: I write — really write, every sentence — and I can build the funnel underneath it. So the positioning, the copy, the site, and the pipeline all say the same thing and pull the same direction. That is exactly where most companies leak: the words say one thing, the machine does another. I close that gap.</p>
      <div class="quad">
        <div class="quad-cell"><h4>Go-to-Market</h4><p>Launch strategy, segmentation, and demand systems tied to qualified pipeline — first sentence to booked call.</p><div class="tags">Launches · Segmentation · Demand</div></div>
        <div class="quad-cell"><h4>Positioning</h4><p>Category narrative, value propositions, and competitive differentiation that make value obvious to the right buyer.</p><div class="tags">Narrative · Value props · Messaging</div></div>
        <div class="quad-cell"><h4>Product Marketing</h4><p>Sales enablement, launch playbooks, and lifecycle messaging informed by the buyer and the win/loss.</p><div class="tags">Enablement · Playbooks · Lifecycle</div></div>
        <div class="quad-cell"><h4>Writing</h4><p>Web, long-form, launch, and executive ghostwriting — every line by hand, in the brand's voice.</p><div class="tags">Web · Launch · Ghostwriting</div></div>
      </div>
    </div>
    <div class="pagemark">MK Parrish · Portfolio</div><div class="pagenum">02</div>
  </div>`;

  // ── PAGE 3 — SELECTED WORK
  const workPage = `<div class="page"><div class="grain"></div>
    <div class="pg">
      <div class="pg-kicker">02 — Selected Work</div>
      <div class="pg-title">What I've <span class="accent">shipped.</span></div>
      <p class="para" style="margin-top:3mm; margin-bottom:2mm;">A senior operator's range — strategy and execution, owned end to end. Representative engagements and the outcomes they drove.</p>
      <div class="cases">
      <div class="case"><div class="case-num">01</div><div><h4>Outbound that books revenue</h4><p>Built and ran cold outbound end to end — list building, cold email and LinkedIn copy, sends, and every reply handled — so sales talked to buyers, not tire-kickers.</p></div><div class="case-result"><div class="r-num">32%</div><div class="r-lab">Reply rates</div></div></div>
      <div class="case"><div class="case-num">02</div><div><h4>Positioning &amp; messaging overhauls</h4><p>Repositioned companies whose results had outpaced their copy — homepage, positioning statement, and brand voice anchored in strategy, not decoration.</p></div><div class="case-result"><div class="r-num">$40M+</div><div class="r-lab">Pipeline influenced</div></div></div>
      <div class="case"><div class="case-num">03</div><div><h4>Conversion websites, end to end</h4><p>Strategy, copy, design, and build in one engagement — launch-ready in 3–4 weeks, engineered to turn traffic into booked calls. mkparrish.com is the proof of work.</p></div><div class="case-result"><div class="r-num">3–4 wk</div><div class="r-lab">Concept to launch</div></div></div>
      <div class="case"><div class="case-num">04</div><div><h4>Executive ghostwriting at scale</h4><p>Monthly thought leadership under founders' and executives' names — LinkedIn, essays, newsletters — consistent enough to build a reputation and sharp enough to open doors.</p></div><div class="case-result"><div class="r-num">Voice</div><div class="r-lab">Captured & scaled</div></div></div>
      <div class="case"><div class="case-num">05</div><div><h4>Productized GTM playbooks</h4><p>Turned my own consulting process into a library of 15+ frameworks — positioning, brand voice, website copy, AI prompts — each packaged, priced, and positioned as a product.</p></div><div class="case-result"><div class="r-num">15+</div><div class="r-lab">Frameworks shipped</div></div></div>
      <div class="case"><div class="case-num">06</div><div><h4>Full-funnel growth, one motion</h4><p>Demand through activation run together — outbound, paid, organic, SEO, and lifecycle wired into one system with the experimentation loop that says what to scale and what to kill.</p></div><div class="case-result"><div class="r-num">B2B + B2C</div><div class="r-lab">Across the funnel</div></div></div>
      </div>
    </div>
    <div class="pagemark">MK Parrish · Portfolio</div><div class="pagenum">03</div>
  </div>`;

  // ── PAGE 4 — WRITING / PUBLISHED
  const writingPage = `<div class="page"><div class="grain"></div>
    <div class="pg">
      <div class="pg-kicker">03 — The Writing</div>
      <div class="pg-title">Proof that I <span class="accent">actually write.</span></div>
      <p class="lead" style="margin-top:4mm;">A product marketer's edge is the sentence. Here is the body of work behind the claim.</p>
      <div class="covers">
        ${["write-yourself-into-the-room","rebecoming","brand-voice-playbook","the-byline-method","the-build-copy-guide","the-new-chapter-workbook","the-prompt-vault"].map((s)=>`<img src="${cover(s)}" alt="${s}" />`).join("")}
      </div>
      <p class="para" style="margin-top:3mm; margin-bottom:1mm;">Beyond client engagements, I have authored and published a library of books, frameworks, and a running essay practice — the kind of volume and range that only comes from writing every day.</p>
      <div class="pub-grid">
        ${pub("◆", "Write Yourself Into the Room", "The personal-brand writing guide for people tired of sounding like everyone else.", "Best Seller")}
        ${pub("◆", "REBECOMING: From Fear to Faith", "A memoir — losing your fear without losing yourself.", "Long-form · Memoir")}
        ${pub("◆", "The Brand Voice Playbook", "Build a brand voice document from scratch.", "Framework")}
        ${pub("◆", "The Byline Method", "The voice-capture & ghostwriting framework, documented.", "Ghostwriting")}
        ${pub("◆", "The Build: Copy Guide", "Every page, every section, every word of a full website.", "Website Copy")}
        ${pub("◆", "The New Chapter Workbook", "The brand & website repositioning framework.", "Positioning")}
        ${pub("◆", "The Prompt Vault", "An AI prompt library for brand, copy & positioning.", "AI & Prompts")}
        ${pub("◆", "The Margins", "A running essay & strategy practice on Substack.", "Thought Leadership")}
      </div>
      <p class="para"><strong>The throughline:</strong> I package expertise into products with clear positioning, a sharp promise, and copy that converts — the exact instinct great product marketing runs on.</p>
    </div>
    <div class="pagemark">MK Parrish · Portfolio</div><div class="pagenum">04</div>
  </div>`;

  // ── PAGE 5 — WEB EXPERIENCE GALLERY
  const galleryPage = `<div class="page"><div class="grain"></div>
    <div class="pg">
      <div class="pg-kicker">04 — The Web Experience</div>
      <div class="pg-title">mkparrish.com — <span class="accent">designed, written &amp; built.</span></div>
      <p class="para" style="margin-top:3mm; margin-bottom:0;">A live demonstration of the work: positioning, copy, design, and build, all by one operator. Scan the code on the cover to explore it.</p>
      <div class="gallery">
        ${gshot("home", "Home — Turn how you're seen into revenue")}
        ${gshot("services", "Services — productized offerings & pricing")}
        ${gshot("brand", "Brand — messaging & positioning")}
        ${gshot("writing", "Writing — voice & ghostwriting")}
      </div>
    </div>
    <div class="pagemark">MK Parrish · Portfolio</div><div class="pagenum">05</div>
  </div>`;

  // ── PAGE 6 — CLOSING / CONTACT
  const closingPage = `<div class="page"><div class="grain"></div>
    <div class="pg" style="display:flex; flex-direction:column; justify-content:center;">
      <div class="pg-kicker">05 — Let's talk</div>
      <div class="close-cta">If how you're seen doesn't match<br/>what you've become — <span class="accent">that's the work.</span></div>
      <p class="para" style="margin-top:7mm; font-size:9.5pt; max-width:150mm;">I bring strategy and execution in one pair of hands: a product marketer who can position the product, write the narrative, build the page, and book the call. If that is the gap on your team, I would love to talk.</p>
    </div>
    ${footerBlock(qr)}
  </div>`;

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />
<title>Portfolio — MK Parrish</title><style>${css}</style></head><body>
${coverPage}${profilePage}${workPage}${writingPage}${galleryPage}${closingPage}
</body></html>`;
}

// ── RENDER ───────────────────────────────────────────────────────────────────
async function renderDoc(browser, { html, basename }) {
  const htmlPath = path.join(OUT_DIR, `${basename}.html`);
  fs.writeFileSync(htmlPath, html);
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });
  await page.evaluate(async () => { await document.fonts.ready; });
  await new Promise((r) => setTimeout(r, 400));

  const pngPath = path.join(OUT_DIR, `${basename}.png`);
  await page.screenshot({ path: pngPath, fullPage: true });
  const pdfPath = path.join(OUT_DIR, `${basename}.pdf`);
  await page.pdf({ path: pdfPath, format: "A4", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await page.close();

  fs.copyFileSync(pdfPath, path.join(PUB_DIR, `${basename}.pdf`));
  fs.copyFileSync(pngPath, path.join(PUB_DIR, `${basename}.png`));
  console.log(`  ✓ ${basename}.pdf + .png`);
  return pdfPath;
}

async function main() {
  console.log("→ Building portfolio package");
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-lcd-text"] });

  console.log("→ Capturing site screenshots");
  const shots = await captureScreenshots(browser);

  console.log("→ Generating QR code");
  const qr = await makeQr();
  const headshot = fileDataUri(path.join(ROOT, "public", "author", "mk-parrish-photo.jpg"), "image/jpeg");

  console.log("→ Rendering Cover Letter");
  await renderDoc(browser, { html: buildCoverLetter({ headshot, qr, shots }), basename: "MK_Parrish_Cover_Letter" });

  console.log("→ Rendering Portfolio");
  await renderDoc(browser, { html: buildPortfolio({ headshot, qr, shots }), basename: "MK_Parrish_Portfolio" });

  await browser.close();
  console.log("Done. Hosted under /downloads/portfolio/");
}

main().catch((e) => { console.error(e); process.exit(1); });
