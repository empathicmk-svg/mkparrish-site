// Builds two Nature's Value–tailored resumes (Signature + Classic) in the
// mkparrish.com type system — Bebas Neue, Playfair Display italic, DM Sans —
// and renders each to HTML + US Letter PDF in public/resumes/natures-value/.
//
//   node scripts/build-natures-value-resumes.mjs

import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "resumes", "natures-value");
mkdirSync(outDir, { recursive: true });

const PITCH_URL = "mkparrish.com/natures-value";

const contact = {
  location: "Long Island & New York, NY",
  phone: "(347) 853-4238",
  email: "mkp414@icloud.com",
  linkedin: "linkedin.com/in/mkparrish",
  site: "mkparrish.com",
};

const title = "Marketing Manager · Brand, Retail & Partner Growth";

const summary =
  "Marketing manager with nearly two decades turning trusted brands into products people buy, across consumer, retail, media, and manufacturing. I own the work from strategy through launch: audience and channel planning, briefs and creative direction, build, QA, and the measurement that proves it worked. I've run national marketing for a Long Island manufacturer across distributor, dealer and direct-to-consumer channels, grown a creator network to 80M+ monthly viewers, and led retail channel marketing supporting $20M+ in product revenue. I'd bring that mix to Nature's Value: making the science credible, the story human, and every campaign accountable to sell-through.";

const expertise = [
  "Brand Strategy & Positioning",
  "Retail & Channel Marketing",
  "Social & Creator / Influencer Programs",
  "Expert-Led Content Strategy",
  "Amazon & E-Commerce Growth",
  "Integrated Omnichannel Campaigns",
  "Partner & Co-Marketing Kits",
  "Email, CRM & Retention",
  "Paid Social, Search & Programmatic",
  "Test-and-Learn / A/B Testing",
  "KPI Dashboards & ROI",
  "Budget & Agency Management",
  "Claims-Aware Copy (DSHEA / FTC)",
];

const tools =
  "Salesforce · Google Analytics · Google Ads · Meta & LinkedIn Ads · BigQuery & SQL · Unica · Responsys · Figma · Excel modeling · AI & prompt engineering";

const roles = [
  {
    title: "Founder & Principal, Fractional Marketing",
    org: "MK Parrish",
    meta: "New York, NY · Jan 2026 – Present",
    blurb: "Independent consultancy delivering marketing strategy, campaign launch, and partner program design for technology and consumer clients.",
    bullets: [
      "Build client marketing strategies and carry them through launch: channel plan, brief, creative direction, build, QA, and post-campaign read.",
      "Run test-and-learn programs across creative, offer, audience, and landing page, turning results into clear next-cycle recommendations.",
      "Delivered $40M+ in influenced pipeline across engagements, with cold-reply rates as high as 32%.",
    ],
  },
  {
    title: "Marketing Manager",
    org: "Atlantic Ultraviolet Corporation",
    meta: "Hauppauge, NY · Nov 2024 – Apr 2025",
    blurb: "Owned national marketing for a Long Island manufacturer across a distributor, dealer and contractor network plus direct-to-consumer demand.",
    bullets: [
      "Led the national marketing plan across the distributor and contractor network, aligning campaign calendars and co-marketing with regional sales goals to drive sell-through.",
      "Built a partner marketing toolkit with campaign-in-a-box assets, co-branded creative, and training that let partners run campaigns without central support.",
      "Launched omnichannel campaigns across paid social, programmatic, email automation, webinars and events, from brief through post-launch reporting.",
      "Owned the paid media budget and built KPI dashboards tying marketing to revenue for executive reviews.",
    ],
  },
  {
    title: "Senior Channel Marketing Manager",
    org: "Ericsson (Vonage)",
    meta: "Remote · Nov 2019 – Oct 2024",
    blurb: "Owned partner marketing strategy and regional go-to-market across a global reseller, referral, and agency ecosystem.",
    bullets: [
      "Scaled EMEA partner marketing from launch to $200M+ in influenced revenue through localized campaigns and multilingual enablement, raising partner engagement 45%.",
      "Launched Dollars for Demos, an incentive and co-marketing program that shortened sales cycles 30% and lifted win rates 15%.",
      "Led a Salesforce go-to-market partnership and bundled offer that accelerated pipeline 25% and raised average contract value 20%.",
      "Built playbooks and co-branded asset libraries that kept brand and message consistent across dozens of partners.",
    ],
  },
  {
    title: "Senior Partner Account Manager",
    org: "DEFY Media (Alloy Digital)",
    meta: "New York, NY · Jul 2012 – Oct 2016",
    blurb: "Directed partner strategy and brand partnerships at a leading youth entertainment, fashion and beauty network.",
    bullets: [
      "Scaled the creator and publisher network to 150+ partners, reaching 80M+ monthly viewers and 600M+ views.",
      "Led monetization and brand strategy for Smosh (then YouTube's #1 channel) and Clevver, a top destination for beauty, style and lifestyle content.",
      "Launched multimillion-dollar branded content programs with Sony, Warner Bros. and Google.",
      "Built go-to-market plans by vertical (beauty, retail, lifestyle), supporting multimillion-dollar deals with Fortune 500 brands and their agencies.",
    ],
  },
  {
    title: "Marketing Manager",
    org: "Mercer",
    meta: "New York, NY · Jun 2010 – Jun 2012",
    blurb: null,
    bullets: [
      "Grew a single CHRO forum into a global portfolio of 50+ executive networks, owning recruitment, agendas, thought leadership and speakers.",
      "Negotiated global vendor and venue contracts, cutting operating costs 50% while improving the attendee experience.",
    ],
  },
  {
    title: "Channel Marketing Manager",
    org: "Take-Two Interactive",
    meta: "New York, NY · May 2008 – Jun 2010",
    blurb: null,
    bullets: [
      "Led retail channel marketing across national retail partners, supporting $20M+ in product revenue.",
      "Ran launch campaigns across in-store, digital, trade and events, and built ROI forecasting models for promotional plans.",
    ],
  },
];

const education = [
  {
    school: "The George Washington University School of Business",
    detail: "BBA, Concentration in Marketing · 2009 · GW Women in Business · Delta Sigma Pi",
  },
  { school: "The Marymount School of New York", detail: "Full Butler Scholarship · 2005" },
];

const proof = [
  { stat: "$200M+", label: "partner-influenced revenue" },
  { stat: "80M+", label: "monthly viewers, creator network" },
  { stat: "$20M+", label: "retail product revenue" },
  { stat: "$40M+", label: "influenced pipeline" },
];

const bring = [
  "Amazon turnaround: a P&L for every ASIN, cutting wasted ad spend, and listings rebuilt to convert, aiming to triple Amazon ROI in 90 days.",
  "Budget discipline: Amazon gets the largest budget, released month by month only as each product proves it pays for itself.",
  "Dr. Michael Murray's authority on Amazon: A+ content, Brand Store and Sponsored Brands video, plus Instagram traffic sent to Amazon with Attribution links.",
  "Repeat revenue through Subscribe & Save, with Amazon search data shared with retail and product teams to grow the whole company.",
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const head = (docTitle, css) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${docTitle}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
:root{--void:#080808;--obsidian:#111;--graphite:#2C2C2C;--iron:#4A4A4A;--ash:#7A7A7A;--pearl:#F0F0EE;--white:#FAFAF8;--blush:#FFE0EC;--petal:#FFB5D0;--rose:#F58CAD;--carmine:#D94F7C;--lipstick:#B43259;
--display:"Bebas Neue",Impact,sans-serif;--serif:"Playfair Display",Georgia,serif;--body:"DM Sans",system-ui,sans-serif}
@page{size:Letter;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:var(--body);color:var(--void);background:#e9e7e4}
a{color:inherit;text-decoration:none}
.page{width:8.5in;min-height:11in;margin:0 auto;background:var(--white);position:relative;overflow:hidden}
@media screen{.page{margin:24px auto;box-shadow:0 10px 40px rgba(0,0,0,.18)}}
@media print{body{background:none}.page{margin:0;box-shadow:none;break-after:page}.page:last-child{break-after:auto}}
${css}
</style></head><body>`;

const roleHtml = (r) => `<div class="role">
  <div class="role-head"><h3>${esc(r.title)}</h3><span class="meta">${esc(r.meta)}</span></div>
  <p class="org">${esc(r.org)}</p>
  ${r.blurb ? `<p class="blurb">${esc(r.blurb)}</p>` : ""}
  <ul>${r.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
</div>`;

// ── Version A: Signature — editorial two-column with the obsidian sidebar ──
const signatureCss = `
.page{display:grid;grid-template-columns:2.45in 1fr}
.side{background:var(--obsidian);color:var(--pearl);padding:.55in .32in .45in .4in}
.main{padding:.55in .5in .4in .42in}
.name{font-family:var(--display);font-size:52px;line-height:.86;letter-spacing:.01em;color:var(--white)}
.name span{color:var(--petal)}
.script{font-family:var(--serif);font-style:italic;font-weight:600;color:var(--petal);font-size:15px;line-height:1.25;margin-top:12px}
.side h4{font-family:var(--body);font-size:8.5px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--petal);margin:22px 0 9px}
.side p,.side li{font-size:9.6px;line-height:1.55;color:#d6d6d3}
.side ul{list-style:none}
.side li{padding:3px 0;border-bottom:1px solid #262626}
.side li:last-child{border:0}
.proof{display:grid;grid-template-columns:1fr 1fr;gap:10px 8px}
.proof div b{display:block;font-family:var(--display);font-weight:400;font-size:25px;color:var(--white);line-height:1}
.proof div span{font-size:8px;line-height:1.3;color:var(--ash);text-transform:uppercase;letter-spacing:.08em}
.pitch{margin-top:22px;border:1px solid var(--petal);padding:11px 11px 12px}
.pitch .k{font-size:8px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:var(--petal)}
.pitch .t{font-family:var(--serif);font-style:italic;font-weight:600;font-size:12.5px;line-height:1.3;color:var(--white);margin-top:5px}
.pitch .u{font-size:9px;color:var(--petal);margin-top:6px;font-weight:600}
.edu b{display:block;font-weight:600;color:var(--white);font-size:9.6px}
.edu p{margin-bottom:8px}
.eyebrow{font-size:8.5px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--carmine)}
.title{font-family:var(--display);font-size:22px;letter-spacing:.03em;margin-top:4px;color:var(--void)}
.summary{font-size:10.2px;line-height:1.62;color:#2a2a2a;margin-top:10px}
.lede{font-family:var(--serif);font-style:italic;font-weight:600;font-size:16px;line-height:1.3;color:var(--void);margin-top:14px;padding-left:12px;border-left:3px solid var(--petal)}
h2{font-family:var(--display);font-weight:400;font-size:21px;letter-spacing:.04em;margin:20px 0 4px;display:flex;align-items:center;gap:10px}
h2:after{content:"";flex:1;height:1px;background:var(--petal)}
.role{margin-top:11px;break-inside:avoid}
.role-head{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.role h3{font-family:var(--display);font-weight:400;font-size:16.5px;letter-spacing:.03em}
.meta{font-size:8.4px;color:var(--ash);white-space:nowrap;letter-spacing:.04em}
.org{font-family:var(--serif);font-style:italic;font-weight:600;font-size:11.5px;color:var(--lipstick);margin-top:-1px}
.blurb{font-size:9.4px;color:#555;line-height:1.5;margin-top:2px}
.role ul{margin:4px 0 0 13px}
.role li{font-size:9.6px;line-height:1.5;color:#222;margin-top:2px}
.role li::marker{color:var(--carmine)}
.p2 .side{padding-top:.5in}
.foot{position:absolute;bottom:.28in;right:.5in;font-size:8px;color:var(--ash);letter-spacing:.14em;text-transform:uppercase}
`;

const signatureSide = (first) => `<aside class="side">
  ${
    first
      ? `<div class="name">Mary<br>Kate<br><span>Parrish</span></div>
  <p class="script">Making the science credible, the story human, and every campaign accountable.</p>
  <h4>Contact</h4>
  <ul><li>${contact.location}</li><li>${contact.phone}</li><li>${contact.email}</li><li>${contact.linkedin}</li><li>${contact.site}</li></ul>
  <h4>By the numbers</h4>
  <div class="proof">${proof.map((p) => `<div><b>${p.stat}</b><span>${p.label}</span></div>`).join("")}</div>
  <div class="pitch"><p class="k">Prepared for Nature's Value</p><p class="t">See my growth plan for @dr.michaelmurray &amp; the brand.</p><p class="u"><a href="https://${PITCH_URL}">${PITCH_URL} →</a></p></div>`
      : `<div class="name" style="font-size:34px">MK<br><span>Parrish</span></div>
  <h4>Expertise</h4>
  <ul>${expertise.map((e) => `<li>${e}</li>`).join("")}</ul>
  <h4>Tools</h4>
  <p>${tools}</p>
  <h4>Education</h4>
  <div class="edu">${education.map((e) => `<p><b>${e.school}</b>${e.detail}</p>`).join("")}</div>`
  }
</aside>`;

const signature =
  head("Mary Kate Parrish — Resume (Signature) · Nature's Value", signatureCss) +
  `<div class="page">${signatureSide(true)}<main class="main">
  <p class="eyebrow">Resume · Nature's Value</p>
  <p class="title">${title}</p>
  <p class="lede">I turn trusted voices into products people reach for, on the feed and on the shelf.</p>
  <p class="summary">${esc(summary)}</p>
  <h2>Experience</h2>
  ${roles.slice(0, 3).map(roleHtml).join("")}
</main><p class="foot">1 / 2</p></div>
<div class="page p2">${signatureSide(false)}<main class="main">
  <h2 style="margin-top:0">Experience, continued</h2>
  ${roles.slice(3).map(roleHtml).join("")}
  <h2>What I'd bring to Nature's Value</h2>
  <div class="role"><ul>${bring.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>
  <p class="lede" style="margin-top:16px">Full 90-day plan: <a href="https://${PITCH_URL}" style="color:var(--lipstick)">${PITCH_URL}</a></p>
</main><p class="foot">2 / 2</p></div></body></html>`;

// ── Version B: Classic — single-column, ATS-friendly, same type system ──
const classicCss = `
.page{padding:.55in .65in .5in}
.top{text-align:center;padding-bottom:12px;border-bottom:2px solid var(--void)}
.name{font-family:var(--display);font-size:46px;letter-spacing:.06em;line-height:1}
.title{font-family:var(--serif);font-style:italic;font-weight:600;font-size:14px;color:var(--lipstick);margin-top:4px}
.contact{font-size:9.4px;color:#333;margin-top:7px;letter-spacing:.02em}
.contact a{color:var(--lipstick)}
.pitch{margin-top:12px;background:var(--blush);padding:9px 14px;display:flex;justify-content:space-between;align-items:center;gap:12px}
.pitch p{font-family:var(--serif);font-style:italic;font-weight:600;font-size:11.5px}
.pitch a{font-size:9.4px;font-weight:700;color:var(--lipstick);white-space:nowrap;letter-spacing:.04em}
h2{font-family:var(--display);font-weight:400;font-size:17px;letter-spacing:.1em;margin:15px 0 5px;padding-bottom:3px;border-bottom:1px solid var(--petal)}
.summary{font-size:10px;line-height:1.6;color:#222}
.skills{font-size:9.6px;line-height:1.6;color:#222}
.skills b{font-weight:600}
.role{margin-top:9px;break-inside:avoid}
.role-head{display:flex;justify-content:space-between;align-items:baseline}
.role h3{font-family:var(--body);font-weight:700;font-size:10.4px;letter-spacing:.06em;text-transform:uppercase}
.meta{font-size:9px;color:#555}
.org{font-family:var(--serif);font-style:italic;font-weight:600;font-size:11px;color:var(--lipstick)}
.blurb{font-size:9.4px;color:#555;line-height:1.5}
.role ul{margin:3px 0 0 14px}
.role li{font-size:9.7px;line-height:1.5;color:#1a1a1a;margin-top:1.5px}
.edu p{font-size:9.7px;line-height:1.55}
.edu b{font-weight:600}
.foot{position:absolute;bottom:.28in;left:0;right:0;text-align:center;font-size:8px;color:var(--ash);letter-spacing:.14em;text-transform:uppercase}
`;

const classic =
  head("Mary Kate Parrish — Resume (Classic) · Nature's Value", classicCss) +
  `<div class="page">
  <header class="top">
    <h1 class="name">Mary Kate Parrish</h1>
    <p class="title">${title}</p>
    <p class="contact">${contact.location} · ${contact.phone} · ${contact.email} · ${contact.linkedin} · <a href="https://${contact.site}">${contact.site}</a></p>
  </header>
  <div class="pitch"><p>Prepared for Nature's Value: my growth plan for @dr.michaelmurray and the brand.</p><a href="https://${PITCH_URL}">${PITCH_URL} →</a></div>
  <h2>Summary</h2>
  <p class="summary">${esc(summary)}</p>
  <h2>Core Expertise</h2>
  <p class="skills">${expertise.join(" · ")}<br><b>Tools:</b> ${tools}</p>
  <h2>Professional Experience</h2>
  ${roles.slice(0, 3).map(roleHtml).join("")}
  <p class="foot">Mary Kate Parrish · 1 / 2</p>
</div>
<div class="page">
  <h2 style="margin-top:0">Professional Experience, continued</h2>
  ${roles.slice(3).map(roleHtml).join("")}
  <h2>What I'd Bring to Nature's Value</h2>
  <div class="role"><ul>${bring.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>
  <h2>Selected Results</h2>
  <p class="skills">${proof.map((p) => `<b>${p.stat}</b> ${p.label}`).join(" · ")} · 45% lift in partner engagement · 30% shorter sales cycles · 50% lower operating costs</p>
  <h2>Education</h2>
  <div class="edu">${education.map((e) => `<p><b>${e.school}</b> · ${e.detail}</p>`).join("")}</div>
  <p class="foot">Mary Kate Parrish · 2 / 2</p>
</div></body></html>`;

const versions = [
  ["mk-parrish-resume-natures-value-signature", signature],
  ["mk-parrish-resume-natures-value-classic", classic],
];

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const page = await browser.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 2 });
for (const [name, html] of versions) {
  const htmlPath = path.join(outDir, `${name}.html`);
  writeFileSync(htmlPath, html);
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(outDir, `${name}.pdf`), format: "Letter", printBackground: true, preferCSSPageSize: true });
  console.log(`✓ ${name} (.html, .pdf)`);
}
await browser.close();
