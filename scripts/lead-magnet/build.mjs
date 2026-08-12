// ─────────────────────────────────────────────────────────────────────────────
// Lead-magnet PDF builder — "The Bio Teardown" (free, top-of-funnel).
//
//   node scripts/lead-magnet/build.mjs
//
// Renders a branded multi-page PDF (Bebas / Playfair / DM Sans, void + petal —
// the same look as the site) and writes it to:
//   public/downloads/lead-magnets/the-bio-teardown.pdf
//
// The free download is wired into the Shelf via app/lib/config.ts (free: true),
// and its CTA funnels readers to the $9 LinkedIn Bio Fix Kit → The Vault.
// ─────────────────────────────────────────────────────────────────────────────

import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import puppeteer from "puppeteer";
import { FONT_CSS } from "../social/fonts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "..", "public", "downloads", "lead-magnets");

const BIO_FIX_KIT = "https://buy.stripe.com/bJe6oI5zXbq852s3uB8AE0f"; // $9
const VAULT = "https://buy.stripe.com/9B69AUfax0Lu1Qgc178AE02"; // $97

const TEARDOWNS = [
  {
    who: "The Operator",
    before: "Operations Manager at Acme Corp",
    after: "I turn chaotic back-offices into systems that run without me. — Ops &amp; process for scaling startups",
    why: "Leads with the transformation, not the title.",
  },
  {
    who: "The Founder",
    before: "Founder &amp; CEO | Entrepreneur | Coffee lover",
    after: "I help B2B founders sound like the expert they already are. — Positioning &amp; messaging",
    why: "One clear audience beats three vague labels.",
  },
  {
    who: "The Career-Changer",
    before: "Aspiring UX Designer | Open to opportunities",
    after: "Former teacher designing products that don't need a manual. — UX, now.",
    why: "Names the pivot as an asset, not an apology.",
  },
  {
    who: "The Consultant",
    before: "Marketing Consultant helping businesses grow",
    after: "I write the words that make people buy. — Conversion copy for DTC brands",
    why: "Specific service + specific market = instant recall.",
  },
  {
    who: "The Executive",
    before: "Senior Director of Product | MBA | Thought Leader",
    after: "I build product orgs that ship. — 0→1 leader, three exits.",
    why: "Proof does the bragging so you don't have to.",
  },
];

const P = { petal: "#F2AFC6", blush: "#F7C9D9", pearl: "#F5F5F0", smoke: "#B8B8B8", iron: "#7A7A7A" };

// A glowing petal-pink heart motif.
const HEART = (size = "") =>
  `<svg class="heart ${size}" viewBox="0 0 32 29" aria-hidden="true"><path d="M16 28.5S2.2 20.3 2.2 10.8C2.2 5.6 6.1 2 10.4 2 13 2 15 3.4 16 5.3 17 3.4 19 2 21.6 2 25.9 2 29.8 5.6 29.8 10.8 29.8 20.3 16 28.5 16 28.5z"/></svg>`;

const HEART_CSS = `
.heart{display:block;fill:${P.petal};filter:drop-shadow(0 0 16px rgba(242,175,198,.9)) drop-shadow(0 0 40px rgba(242,175,198,.55))}
.heart.lg{width:90px;height:auto;margin-bottom:26px}
.heart.sm{width:22px;height:auto}
@keyframes heartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.18)}28%{transform:scale(1)}42%{transform:scale(1.12)}70%{transform:scale(1)}}`;

function page(inner, { dark = true } = {}) {
  return `<section class="page ${dark ? "dark" : "light"}">${inner}</section>`;
}

function teardownPage(t, i) {
  return `
    <div class="pad">
      <div class="ptop"><span class="pn">${String(i + 1).padStart(2, "0")}</span><span class="pof">/ 05 · ${t.who}</span></div>
      <div class="block">
        <p class="lbl">Before</p>
        <p class="before">${t.before}</p>
      </div>
      <div class="block">
        <p class="lbl pink">After</p>
        <p class="after">${t.after}</p>
      </div>
      <div class="whyrow">${HEART("sm")}<p class="why">${t.why}</p></div>
    </div>`;
}

export function html() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8" /><style>
${FONT_CSS}
${HEART_CSS}
@page { size: 8.5in 11in; margin: 0; }
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:"DM Sans",sans-serif;color:${P.pearl};-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{position:relative;width:8.5in;height:11in;overflow:hidden;page-break-after:always}
.page.dark{background:#080808}
.page:last-child{page-break-after:auto}
.glow{position:absolute;left:50%;top:-10%;transform:translateX(-50%);width:11in;height:7in;background:radial-gradient(ellipse at top,rgba(242,175,198,0.26),transparent 64%)}
.whyrow .heart{flex:0 0 auto;margin-top:5px}
.frame{position:absolute;inset:0.34in;border:1px solid rgba(242,175,198,0.16)}
.pad{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;padding:0.9in}
/* cover */
.brand{font-family:"Bebas Neue",sans-serif;letter-spacing:.18em;font-size:26px}
.cover-mid{flex:1;display:flex;flex-direction:column;justify-content:center}
.kicker{align-self:flex-start;display:inline-flex;align-items:center;gap:12px;border:1px solid rgba(242,175,198,.5);color:${P.petal};padding:10px 18px;border-radius:999px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;font-size:14px;margin-bottom:30px}
.kicker .dot{width:7px;height:7px;background:${P.petal};border-radius:50%}
h1{font-family:"Bebas Neue",sans-serif;font-size:120px;line-height:.9;text-transform:uppercase}
h1 .accent{color:${P.petal}}
.sub{font-family:"Playfair Display",serif;font-style:italic;color:${P.blush};font-size:30px;margin-top:24px;max-width:6in}
.coverfoot{display:flex;justify-content:space-between;font-weight:500;letter-spacing:.2em;text-transform:uppercase;font-size:13px;color:${P.iron}}
.coverfoot .pink{color:${P.petal}}
/* intro */
.eyebrow{font-weight:700;letter-spacing:.25em;text-transform:uppercase;font-size:14px;color:${P.petal}}
h2{font-family:"Bebas Neue",sans-serif;font-size:64px;line-height:.95;text-transform:uppercase;margin-top:16px}
.body{font-weight:300;font-size:19px;line-height:1.6;color:${P.smoke};margin-top:22px;max-width:6in}
.formula{margin-top:34px;border-left:2px solid ${P.petal};padding:18px 26px}
.formula p{font-family:"Playfair Display",serif;font-style:italic;font-size:26px;line-height:1.45;color:${P.pearl}}
.formula .accent{color:${P.petal};font-style:normal;font-family:"Bebas Neue",sans-serif;letter-spacing:.04em}
/* teardown */
.ptop{display:flex;align-items:baseline;gap:14px;margin-bottom:auto}
.pn{font-family:"Bebas Neue",sans-serif;font-size:88px;line-height:.8;color:${P.petal}}
.pof{font-weight:500;letter-spacing:.25em;text-transform:uppercase;color:${P.iron};font-size:16px}
.block{margin-top:30px}
.lbl{font-weight:700;letter-spacing:.25em;text-transform:uppercase;font-size:13px;color:${P.iron}}
.lbl.pink{color:${P.petal}}
.before{font-family:"Playfair Display",serif;font-size:27px;line-height:1.4;color:${P.iron};margin-top:10px;text-decoration:line-through;text-decoration-color:rgba(242,175,198,.5)}
.after{font-family:"Playfair Display",serif;font-weight:500;font-size:32px;line-height:1.4;color:${P.pearl};margin-top:10px}
.whyrow{display:flex;gap:14px;align-items:flex-start;margin-top:40px;margin-bottom:auto}
.whyrow .tick{flex:0 0 auto;margin-top:9px;width:11px;height:11px;background:${P.petal};transform:rotate(45deg)}
.why{font-weight:300;font-size:19px;line-height:1.5;color:${P.smoke}}
/* CTA */
.cta-mid{flex:1;display:flex;flex-direction:column;justify-content:center}
.offer{border:1px solid rgba(242,175,198,.3);padding:30px;margin-top:22px}
.offer .o-k{font-weight:700;letter-spacing:.2em;text-transform:uppercase;font-size:13px;color:${P.petal}}
.offer h3{font-family:"Bebas Neue",sans-serif;font-size:40px;text-transform:uppercase;margin-top:8px}
.offer p{font-weight:300;font-size:17px;line-height:1.5;color:${P.smoke};margin-top:8px}
.offer .price{font-family:"Bebas Neue",sans-serif;font-size:30px;color:#fff;margin-top:12px}
.offer a{color:${P.petal};text-decoration:none;font-size:14px;word-break:break-all}
</style></head><body>

${page(`
  <div class="glow"></div><div class="frame"></div>
  <div class="pad">
    <div class="brand">MK PARRISH</div>
    <div class="cover-mid">
      ${HEART("lg")}
      <span class="kicker"><span class="dot"></span>Free · LinkedIn Teardown</span>
      <h1>The Bio<br>Tear<span class="accent">down.</span></h1>
      <p class="sub">Five LinkedIn headlines, rewritten — and the one formula behind every fix.</p>
    </div>
    <div class="coverfoot"><span>@mkeezieee</span><span class="pink">mkparrish.com</span></div>
  </div>`)}

${page(`
  <div class="glow"></div><div class="frame"></div>
  <div class="pad">
    <p class="eyebrow">The 5-minute fix</p>
    <h2>Your headline isn't a<br>job title. It's a hook.</h2>
    <p class="body">It's the first — and often only — thing a recruiter, client, or stranger reads about you. A job title tells them what you're called. A hook tells them why they should care. Every rewrite in this teardown runs on one formula:</p>
    <div class="formula"><p><span class="accent">WHO</span> you help → the <span class="accent">OUTCOME</span> you create → the <span class="accent">EDGE</span> only you have.</p></div>
    <p class="body">Read the five teardowns. Find the one closest to you. Steal the structure. →</p>
  </div>`)}

${TEARDOWNS.map((t, i) => `<section class="page dark"><div class="glow"></div><div class="frame"></div>${teardownPage(t, i)}</section>`).join("")}

${page(`
  <div class="glow"></div><div class="frame"></div>
  <div class="pad">
    <p class="eyebrow">Now do the whole profile</p>
    <div class="cta-mid">
      ${HEART("lg")}
      <h2>One headline down.<br>The rest in 15 minutes.</h2>
      <div class="offer">
        <p class="o-k">Start here · $9</p>
        <h3>The LinkedIn Bio Fix Kit</h3>
        <p>3 headline formulas, a fill-in About template, 15 stealable opening lines, and the banned-words list. The fastest fix on the Shelf.</p>
        <p class="price">$9</p>
        <a href="${BIO_FIX_KIT}">${BIO_FIX_KIT}</a>
      </div>
      <div class="offer">
        <p class="o-k">Or take everything · $97</p>
        <h3>The Vault</h3>
        <p>Every writing-and-identity ebook in one bundle — positioning, voice, and reinvention. Buy once, own the whole shelf.</p>
        <p class="price">$97</p>
        <a href="${VAULT}">${VAULT}</a>
      </div>
    </div>
    <div class="coverfoot"><span>@mkeezieee</span><span class="pink">mkparrish.com</span></div>
  </div>`)}

</body></html>`;
}

// 5:8 book cover for the Shelf card → public/downloads/covers/<slug>-cover.jpg
export function coverHTML() {
  return `<!doctype html><html><head><meta charset="utf-8" /><style>
${FONT_CSS}
${HEART_CSS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:750px;height:1200px}
body{position:relative;overflow:hidden;background:#080808;color:${P.pearl};font-family:"DM Sans",sans-serif;-webkit-font-smoothing:antialiased}
.glow{position:absolute;left:50%;top:-12%;transform:translateX(-50%);width:900px;height:760px;background:radial-gradient(ellipse at top,rgba(242,175,198,.30),transparent 64%)}
.frame{position:absolute;inset:34px;border:1px solid rgba(242,175,198,.18)}
.pad{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;padding:64px}
.brand{font-family:"Bebas Neue",sans-serif;letter-spacing:.18em;font-size:26px}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center}
.kicker{align-self:flex-start;display:inline-flex;align-items:center;gap:12px;border:1px solid rgba(242,175,198,.5);color:${P.petal};padding:11px 20px;border-radius:999px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;font-size:16px;margin-bottom:28px}
.kicker .dot{width:8px;height:8px;background:${P.petal};border-radius:50%}
h1{font-family:"Bebas Neue",sans-serif;font-size:128px;line-height:.88;text-transform:uppercase}
h1 .accent{color:${P.petal}}
.sub{font-family:"Playfair Display",serif;font-style:italic;color:${P.blush};font-size:30px;margin-top:26px}
.foot{display:flex;justify-content:space-between;font-weight:500;letter-spacing:.2em;text-transform:uppercase;font-size:15px;color:${P.iron}}
.foot .pink{color:${P.petal}}
</style></head><body>
<div class="glow"></div><div class="frame"></div>
<div class="pad">
  <div class="brand">MK PARRISH</div>
  <div class="mid">
    ${HEART("lg")}
    <span class="kicker"><span class="dot"></span>Free Download</span>
    <h1>The Bio<br>Tear<span class="accent">down.</span></h1>
    <p class="sub">5 LinkedIn headlines, rewritten.</p>
  </div>
  <div class="foot"><span>@mkeezieee</span><span class="pink">mkparrish.com</span></div>
</div>
</body></html>`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"], headless: true });

  const page = await browser.newPage();
  await page.setContent(html(), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const out = join(OUT_DIR, "the-bio-teardown.pdf");
  await page.pdf({ path: out, width: "8.5in", height: "11in", printBackground: true, preferCSSPageSize: true });
  console.log("✅ wrote", out);

  const cover = await browser.newPage();
  await cover.setViewport({ width: 750, height: 1200, deviceScaleFactor: 2 });
  await cover.setContent(coverHTML(), { waitUntil: "load" });
  await cover.evaluate(() => document.fonts.ready);
  const coverPath = join(__dirname, "..", "..", "public", "downloads", "covers", "the-bio-teardown-cover.jpg");
  await cover.screenshot({ path: coverPath, type: "jpeg", quality: 92 });
  console.log("✅ wrote", coverPath);

  await browser.close();
}

import { argv } from "node:process";
if (fileURLToPath(import.meta.url) === argv[1]) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
