// Builds two ADP-tailored resumes (Signature + Classic) and a cover letter for the
// ADP HRO Comprehensive Services sales role (payroll, benefits, HR and talent
// outsourcing on ADP Workforce Now). Same layout
// and type system as the Nature's Value set — Bebas Neue, Playfair Display italic,
// DM Sans — with the accent palette swapped to ADP red. Renders each to HTML +
// US Letter PDF in public/resumes/adp/.
//
//   node scripts/build-adp-resumes.mjs

import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "resumes", "adp");
mkdirSync(outDir, { recursive: true });

const PITCH_URL = "mkparrish.com/adp";

const contact = {
  location: "Long Island & New York, NY",
  phone: "(347) 853-4238",
  email: "mkp414@icloud.com",
  linkedin: "linkedin.com/in/mkparrish",
  site: "mkparrish.com",
};

// Title from the posting: "ADP is hiring a Sales Representative for our Comprehensive
// Services business" (an HRO Sales Representative role).
const role = "Sales Representative, HRO Comprehensive Services";
const title = `${role} · ADP`;

const summary =
  "Consultative, competitive B2B seller with nearly two decades selling technology and services to business owners and executives, from multimillion-dollar Fortune 500 partnerships at DEFY Media to $200M+ in partner-influenced cloud revenue at Ericsson. I run the full cycle today, prospecting, qualifying, presenting, negotiating and closing, at Mercedes-Benz of Smithtown and at my own consultancy, where I'm working with Long Island's construction employers through the Long Island Builders Institute. I learned the HR and benefits buyer at Mercer with CHROs and Fortune 50 leaders, and I prospect with AI-driven research and multi-channel outreach. I'd bring that to ADP Comprehensive Services: selling top-down to small and mid-market owners who want ADP's experts to carry HR, payroll, benefits and talent while they run the business.";

const expertise = [
  "Full Sales Cycle: Prospect, Qualify, Present, Negotiate, Close",
  "Consultative & Solution-Based Selling",
  "Top-Down Selling to Owners & Executives",
  "Territory Management & Pipeline Discipline",
  "Multi-Channel Prospecting & Appointment Setting",
  "AI-Driven Sales Tools & Data Insights",
  "HR, Payroll, Benefits & Talent Solutions",
  "HR Outsourcing (HRO) Value Selling",
  "Cross-Selling with Internal Partners",
  "Warm-Lead & Channel-Partner Conversion",
  "Negotiation & Objection Handling",
  "Referral & Client-Advocacy Programs",
]

const tools =
  "Salesforce CRM · AI research & personalization agents · LinkedIn Sales tools · Google Analytics · Excel modeling · Figma · HTML/CSS & Next.js";

const roles = [
  {
    title: "Sales Consultant",
    org: "Mercedes-Benz of Smithtown",
    meta: "Smithtown, NY · 2026 – Present",
    blurb: "Consultative sales of a premium, technology-heavy product line to Long Island buyers and business owners.",
    bullets: [
      "Own the full consultative cycle: prospecting, discovery, presentation, financing, negotiation and close.",
      "Sell on total value, not sticker price: warranty, service, technology and peace of mind, the same case Comprehensive Services makes against a cheaper payroll provider.",
      "Opened a new prospecting channel by calling service customers ahead of their appointments, turning existing customers into showroom appointments.",
      "Mastered a complex EV, hybrid and driver-assistance portfolio, and coded a custom web-based inventory lookup tool to answer buyer questions in real time; built a test-drive booking page and short-form video series that bring new buyers in.",
    ],
  },
  {
    title: "Founder & Principal Consultant",
    org: "MK Parrish",
    meta: "New York, NY · Jan 2026 – Present",
    blurb: "B2B consultancy delivering go-to-market strategy, web development, social media, branding and ghostwriting.",
    bullets: [
      "Prospect, pitch, price and close every engagement directly with business owners.",
      "Working with the Long Island Builders Institute (LIBI) and its subcontractor network: owners of growing construction and trade businesses with multi-site crews, union and prevailing-wage payroll, and heavy compliance needs.",
      "Run multi-channel outbound powered by AI-agent workflows for account research and personalization, booking meetings at cold reply rates as high as 32%.",
      "Delivered $40M+ in influenced pipeline across client engagements.",
    ],
  },
  {
    title: "Marketing Manager",
    org: "Atlantic Ultraviolet Corporation",
    meta: "Hauppauge, NY · Nov 2024 – Apr 2025",
    blurb: null,
    bullets: [
      "Partnered with sales leadership in recurring pipeline reviews to refine territory targeting and grow distributor and contractor revenue for a Long Island manufacturer.",
      "Built account-based programs and sales enablement tools tied to active opportunities.",
    ],
  },
  {
    title: "Senior Channel Marketing Manager",
    org: "Ericsson (Vonage)",
    meta: "Remote · Nov 2019 – Oct 2024",
    blurb: "Cloud communications and API platform sold to businesses through reseller, referral and agency partners.",
    bullets: [
      "Ran recurring deal-stage reviews with sales leadership to unblock stalled opportunities, raising enterprise win rates 15% and shortening sales cycles 30% in targeted segments.",
      "Positioned a bundled Salesforce offering as a cross-sell, accelerating pipeline 25% and lifting average contract value 20%.",
      "Scaled EMEA partner programs from launch to $200M+ in influenced revenue.",
      "Launched Dollars for Demos, an incentive program that put more first meetings on partner calendars.",
    ],
  },
  {
    title: "Senior Partner Account Manager",
    org: "DEFY Media",
    meta: "New York, NY · Jul 2012 – Feb 2016",
    blurb: null,
    bullets: [
      "Closed multimillion-dollar partnerships with Sony, Warner Bros. and Google across complex, multi-stakeholder enterprise cycles.",
      "Managed a book of 150+ accounts reaching 80M+ monthly viewers, driving retention and expansion revenue.",
    ],
  },
  {
    title: "Marketing Manager",
    org: "Mercer (HR & benefits consulting)",
    meta: "New York, NY · Jun 2010 – Jun 2012",
    blurb: null,
    bullets: [
      "Built relationships with CHROs and Fortune 50 HR leaders, growing a single CHRO forum into 50+ executive networks focused on HR, benefits and workforce strategy.",
      "Negotiated global vendor and venue contracts, cutting operating costs 50%.",
    ],
  },
  {
    title: "Channel Marketing Manager",
    org: "Take-Two Interactive",
    meta: "New York, NY · May 2008 – Jun 2010",
    blurb: null,
    bullets: ["Drove $20M+ in product revenue through national retail partners."],
  },
];

const education = [
  {
    school: "The George Washington University School of Business",
    detail: "BBA, Concentration in Marketing · 2009 · Delta Sigma Pi",
  },
  { school: "The Marymount School of New York", detail: "Full Butler Scholarship · 2005" },
  { school: "Published author", detail: "Books and long-form writing at mkparrish.com" },
];

const proof = [
  { stat: "$200M+", label: "partner-influenced revenue" },
  { stat: "+15%", label: "enterprise win rate" },
  { stat: "−30%", label: "sales cycle length" },
  { stat: "32%", label: "cold outreach reply rate" },
  { stat: "150+", label: "accounts managed" },
  { stat: "+20%", label: "average contract value" },
];

// The offer, as I'd pitch each bundle to a buyer.
const bundles = [
  ["Comprehensive Pay", "Payroll administration, tax filing and compliance, audits and reconciliation, run by ADP specialists."],
  ["Comprehensive Benefits", "Benefits administration, open enrollment and carrier invoice reconciliation, with a Benefits Specialist."],
  ["Comprehensive HR", "Day-to-day HR guidance, compliance support and a forms and best-practices library, with an HR Specialist."],
  ["Comprehensive Talent", "A Talent Consultant to help source, hire and keep the right people."],
  ["Across every bundle", "ADP Workforce Now, a strategic advisor, regular business reviews and phone support for employees and managers. The client keeps its plans and its decisions."],
];

// ADP's required and preferred qualifications for this posting, and the proof for each.
const fit = [
  ["Adaptability & emotional intelligence", "Read the room for a living: a first-time luxury buyer, a CHRO at Mercer, a subcontractor owner on a job site. Each needs a different conversation."],
  ["Critical thinking & business acumen", "Built ROI forecasting models for retail promotions at Take-Two and KPI dashboards tying marketing to revenue at Atlantic UV; I'd sell Comprehensive Services on the cost of the work it removes, not price per employee."],
  ["Communication & persuasion", "Closed multimillion-dollar, multi-stakeholder deals with Sony, Warner Bros. and Google; published author and ghostwriter."],
  ["Grit & resilience", "Built a consultancy from zero, cold-prospecting every client, while selling on the floor at Mercedes-Benz."],
  ["Sales execution & territory management", "Ran Salesforce deal-stage reviews that raised win rates 15% and cut sales cycles 30%; partnered on territory targeting at Atlantic UV."],
  ["Modern selling skills", "AI-agent workflows for account research and personalization, with cold reply rates as high as 32%; coded my own sales tools."],
  ["Consultative, solution-based selling", "Nearly two decades selling services and solutions, plus a cross-sell (+25% pipeline, +20% ACV) built with internal partners at Ericsson."],
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ADP red replaces the site's pink accents. --petal is the light red used on the dark
// sidebar; --carmine and --lipstick carry ADP red on the white page.
const head = (docTitle, css) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${docTitle}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
:root{--void:#080808;--obsidian:#121212;--graphite:#2C2C2C;--iron:#4A4A4A;--ash:#7A7A7A;--pearl:#F0F0EE;--white:#FFFFFF;--blush:#FBE7E5;--petal:#FF6B5E;--rose:#F04A3E;--carmine:#D0271D;--lipstick:#A81F17;
--display:"Bebas Neue",Impact,sans-serif;--serif:"Playfair Display",Georgia,serif;--body:"DM Sans",system-ui,sans-serif}
@page{size:Letter;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:var(--body);color:var(--void);background:#e9e7e4}
a{color:inherit;text-decoration:none}
.page{width:8.5in;height:11in;margin:0 auto;background:var(--white);position:relative;overflow:hidden}
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

// ── Version A: Signature — editorial two-column with the dark sidebar ──
const signatureCss = `
.page{display:grid;grid-template-columns:2.45in 1fr}
.side{background:var(--obsidian);color:var(--pearl);padding:.55in .32in .45in .4in;border-top:6px solid var(--carmine)}
.main{padding:.55in .5in .4in .42in}
.name{font-family:var(--display);font-size:52px;line-height:.86;letter-spacing:.01em;color:var(--white)}
.name span{color:var(--petal)}
.script{font-family:var(--serif);font-style:italic;font-weight:600;color:var(--petal);font-size:15px;line-height:1.25;margin-top:12px}
.side h4{font-family:var(--body);font-size:8.5px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--petal);margin:20px 0 9px}
.side p,.side li{font-size:9.6px;line-height:1.55;color:#d6d6d3}
.side ul{list-style:none}
.side li{padding:3px 0;border-bottom:1px solid #262626}
.side li:last-child{border:0}
.proof{display:grid;grid-template-columns:1fr 1fr;gap:10px 8px}
.proof div b{display:block;font-family:var(--display);font-weight:400;font-size:25px;color:var(--white);line-height:1}
.proof div span{font-size:8px;line-height:1.3;color:var(--ash);text-transform:uppercase;letter-spacing:.08em}
.pitch{margin-top:20px;border:1px solid var(--petal);padding:11px 11px 12px}
.pitch .k{font-size:8px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:var(--petal)}
.pitch .t{font-family:var(--serif);font-style:italic;font-weight:600;font-size:12.5px;line-height:1.3;color:var(--white);margin-top:5px}
.pitch .u{font-size:9px;color:var(--petal);margin-top:6px;font-weight:600}
.edu b{display:block;font-weight:600;color:var(--white);font-size:9.6px}
.edu p{margin-bottom:8px}
.eyebrow{font-size:8.5px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--carmine)}
.title{font-family:var(--display);font-size:21px;letter-spacing:.03em;margin-top:4px;color:var(--void)}
.summary{font-size:10px;line-height:1.6;color:#2a2a2a;margin-top:10px}
.lede{font-family:var(--serif);font-style:italic;font-weight:600;font-size:16px;line-height:1.3;color:var(--void);margin-top:14px;padding-left:12px;border-left:3px solid var(--carmine)}
h2{font-family:var(--display);font-weight:400;font-size:21px;letter-spacing:.04em;margin:18px 0 4px;display:flex;align-items:center;gap:10px}
h2:after{content:"";flex:1;height:1px;background:var(--carmine)}
.role{margin-top:10px;break-inside:avoid}
.role-head{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.role h3{font-family:var(--display);font-weight:400;font-size:16.5px;letter-spacing:.03em}
.meta{font-size:8.4px;color:var(--ash);white-space:nowrap;letter-spacing:.04em}
.org{font-family:var(--serif);font-style:italic;font-weight:600;font-size:11.5px;color:var(--carmine);margin-top:-1px}
.blurb{font-size:9.4px;color:#555;line-height:1.5;margin-top:2px}
.role ul{margin:4px 0 0 13px}
.role li{font-size:9.5px;line-height:1.5;color:#222;margin-top:2px}
.role li::marker{color:var(--carmine)}
.fit{margin-top:8px;border-top:1px solid #e5e5e5}
.fit div{display:grid;grid-template-columns:1.55in 1fr;gap:10px;padding:6px 0;border-bottom:1px solid #e5e5e5}
.fit b{font-family:var(--display);font-weight:400;font-size:13.5px;letter-spacing:.03em;color:var(--carmine);line-height:1.1}
.fit span{font-size:9.4px;line-height:1.5;color:#222}
.p2 .side{padding-top:.5in}
.foot{position:absolute;bottom:.28in;right:.5in;font-size:8px;color:var(--ash);letter-spacing:.14em;text-transform:uppercase}
`;

const signatureSide = (first) => `<aside class="side">
  ${
    first
      ? `<div class="name">Mary<br>Kate<br><span>Parrish</span></div>
  <p class="script">You keep control. ADP's experts carry the work. I sell that promise.</p>
  <h4>Contact</h4>
  <ul><li>${contact.location}</li><li>${contact.phone}</li><li>${contact.email}</li><li>${contact.linkedin}</li><li>${contact.site}</li></ul>
  <h4>By the numbers</h4>
  <div class="proof">${proof.map((p) => `<div><b>${p.stat}</b><span>${p.label}</span></div>`).join("")}</div>
  <div class="pitch"><p class="k">Prepared for ADP</p><p class="t">How I'd sell HRO Comprehensive Services on Long Island.</p><p class="u"><a href="https://${PITCH_URL}">${PITCH_URL} →</a></p></div>`
      : `<div class="name" style="font-size:34px">MK<br><span>Parrish</span></div>
  <h4>Core competencies</h4>
  <ul>${expertise.map((e) => `<li>${e}</li>`).join("")}</ul>
  <h4>Tools</h4>
  <p>${tools}</p>
  <h4>Education</h4>
  <div class="edu">${education.map((e) => `<p><b>${e.school}</b>${e.detail}</p>`).join("")}</div>`
  }
</aside>`;

const signature =
  head("Mary Kate Parrish — Resume (Signature) · ADP", signatureCss) +
  `<div class="page">${signatureSide(true)}<main class="main">
  <p class="eyebrow">Resume · ADP Comprehensive Services</p>
  <p class="title">${title}</p>
  <p class="lede">Owners didn't start a business to run payroll. I show them who will.</p>
  <p class="summary">${esc(summary)}</p>
  <h2>Experience</h2>
  ${roles.slice(0, 4).map(roleHtml).join("")}
</main><p class="foot">1 / 2</p></div>
<div class="page p2">${signatureSide(false)}<main class="main">
  <h2 style="margin-top:0">Experience, continued</h2>
  ${roles.slice(4).map(roleHtml).join("")}
  <h2>What I'd sell</h2>
  <div class="fit">${bundles.map(([k, v]) => `<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join("")}</div>
  <h2>What ADP asks for, and my proof</h2>
  <div class="fit">${fit.map(([k, v]) => `<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join("")}</div>
  <p class="lede" style="margin-top:14px;font-size:14px">Full sales plan: <a href="https://${PITCH_URL}" style="color:var(--carmine)">${PITCH_URL}</a></p>
</main><p class="foot">2 / 2</p></div></body></html>`;

// ── Version B: Classic — single-column, ATS-friendly, same type system ──
const classicCss = `
.page{padding:.5in .62in .45in}
.top{text-align:center;padding-bottom:11px;border-bottom:2px solid var(--carmine)}
.name{font-family:var(--display);font-size:44px;letter-spacing:.06em;line-height:1}
.title{font-family:var(--serif);font-style:italic;font-weight:600;font-size:13.5px;color:var(--carmine);margin-top:4px}
.contact{font-size:9.4px;color:#333;margin-top:7px;letter-spacing:.02em}
.contact a{color:var(--carmine)}
.pitch{margin-top:11px;background:var(--blush);padding:8px 14px;display:flex;justify-content:space-between;align-items:center;gap:12px}
.pitch p{font-family:var(--serif);font-style:italic;font-weight:600;font-size:11.5px}
.pitch a{font-size:9.4px;font-weight:700;color:var(--carmine);white-space:nowrap;letter-spacing:.04em}
h2{font-family:var(--display);font-weight:400;font-size:17px;letter-spacing:.1em;margin:13px 0 5px;padding-bottom:3px;border-bottom:1px solid var(--carmine)}
.summary{font-size:9.9px;line-height:1.58;color:#222}
.skills{font-size:9.6px;line-height:1.6;color:#222}
.skills b{font-weight:600}
.role{margin-top:8px;break-inside:avoid}
.role-head{display:flex;justify-content:space-between;align-items:baseline}
.role h3{font-family:var(--body);font-weight:700;font-size:10.3px;letter-spacing:.06em;text-transform:uppercase}
.meta{font-size:9px;color:#555}
.org{font-family:var(--serif);font-style:italic;font-weight:600;font-size:11px;color:var(--carmine)}
.blurb{font-size:9.4px;color:#555;line-height:1.5}
.role ul{margin:3px 0 0 14px}
.role li{font-size:9.6px;line-height:1.48;color:#1a1a1a;margin-top:1.5px}
.edu p{font-size:9.7px;line-height:1.55}
.edu b{font-weight:600}
.foot{position:absolute;bottom:.28in;left:0;right:0;text-align:center;font-size:8px;color:var(--ash);letter-spacing:.14em;text-transform:uppercase}
`;

const classic =
  head("Mary Kate Parrish — Resume (Classic) · ADP", classicCss) +
  `<div class="page">
  <header class="top">
    <h1 class="name">Mary Kate Parrish</h1>
    <p class="title">${title}</p>
    <p class="contact">${contact.location} · ${contact.phone} · ${contact.email} · ${contact.linkedin} · <a href="https://${contact.site}">${contact.site}</a></p>
  </header>
  <div class="pitch"><p>Prepared for ADP: how I'd sell HRO Comprehensive Services on Long Island.</p><a href="https://${PITCH_URL}">${PITCH_URL} →</a></div>
  <h2>Professional Summary</h2>
  <p class="summary">${esc(summary)}</p>
  <h2>Core Competencies</h2>
  <p class="skills">${expertise.join(" · ")}<br><b>Tools:</b> ${tools}</p>
  <h2>Professional Experience</h2>
  ${roles.slice(0, 3).map(roleHtml).join("")}
  <p class="foot">Mary Kate Parrish · 1 / 2</p>
</div>
<div class="page">
  <h2 style="margin-top:0">Professional Experience, continued</h2>
  ${roles.slice(3).map(roleHtml).join("")}
  <h2>What I'd Sell: ADP Comprehensive Services</h2>
  <div class="role"><ul>${bundles.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join("")}</ul></div>
  <h2>ADP Qualifications and My Proof</h2>
  <div class="role"><ul>${fit.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join("")}</ul></div>
  <h2>Selected Results</h2>
  <p class="skills">${proof.map((p) => `<b>${p.stat}</b> ${p.label}`).join(" · ")} · +25% pipeline from cross-sell · $20M+ retail revenue · $40M+ influenced pipeline</p>
  <h2>Education</h2>
  <div class="edu">${education.map((e) => `<p><b>${e.school}</b> · ${e.detail}</p>`).join("")}</div>
  <p class="foot">Mary Kate Parrish · 2 / 2</p>
</div></body></html>`;

// ── Cover letter — one page, Signature letterhead ──
const coverCss = `
.page{display:grid;grid-template-columns:2.1in 1fr}
.side{background:var(--obsidian);color:var(--pearl);padding:.55in .3in .45in .38in;border-top:6px solid var(--carmine)}
.name{font-family:var(--display);font-size:44px;line-height:.86;color:var(--white)}
.name span{color:var(--petal)}
.script{font-family:var(--serif);font-style:italic;font-weight:600;color:var(--petal);font-size:13px;line-height:1.3;margin-top:12px}
.side h4{font-size:8.5px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--petal);margin:22px 0 8px}
.side ul{list-style:none}
.side li{font-size:9.4px;line-height:1.5;color:#d6d6d3;padding:3px 0;border-bottom:1px solid #262626}
.side li:last-child{border:0}
.pitch{margin-top:22px;border:1px solid var(--petal);padding:10px}
.pitch .k{font-size:7.5px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:var(--petal)}
.pitch .t{font-family:var(--serif);font-style:italic;font-weight:600;font-size:12px;line-height:1.3;color:var(--white);margin-top:5px}
.pitch .u{font-size:8.6px;color:var(--petal);margin-top:6px;font-weight:600}
.main{padding:.55in .58in .45in .5in}
.eyebrow{font-size:8.5px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--carmine)}
.date{font-size:9.6px;color:var(--ash);margin-top:12px}
.to{font-size:10px;line-height:1.5;margin-top:8px;color:#222}
.headline{font-family:var(--display);font-size:29px;letter-spacing:.02em;line-height:.95;margin-top:14px}
.headline span{color:var(--carmine)}
.letter p{font-size:10.1px;line-height:1.6;color:#222;margin-top:9px}
.letter p.lede{font-family:var(--serif);font-style:italic;font-weight:600;font-size:13.5px;line-height:1.35;color:var(--void);padding-left:12px;border-left:3px solid var(--carmine)}
.letter ul{margin:5px 0 0 14px}
.letter li{font-size:10px;line-height:1.5;color:#222;margin-top:3px}
.letter li::marker{color:var(--carmine)}
.letter b{font-weight:600}
.sign{margin-top:12px;font-size:10.2px;color:#222}
.sig{font-family:var(--serif);font-style:italic;font-weight:700;font-size:24px;color:var(--carmine);margin-top:3px;line-height:1}
.signame{font-family:var(--display);font-size:15px;letter-spacing:.06em;margin-top:5px}
`;

const coverDate = "November 4, 2026";

const cover =
  head("Mary Kate Parrish — Cover Letter · ADP", coverCss) +
  `<div class="page"><aside class="side">
  <div class="name">Mary<br>Kate<br><span>Parrish</span></div>
  <p class="script">You keep control. ADP's experts carry the work. I sell that promise.</p>
  <h4>Contact</h4>
  <ul><li>${contact.location}</li><li>${contact.phone}</li><li>${contact.email}</li><li>${contact.linkedin}</li><li>${contact.site}</li></ul>
  <h4>By the numbers</h4>
  <ul>${proof.map((p) => `<li><b style="color:var(--white);font-weight:600">${p.stat}</b> ${p.label}</li>`).join("")}</ul>
  <div class="pitch"><p class="k">My sales plan</p><p class="t">The four bundles, the buyers, and my first 90 days.</p><p class="u"><a href="https://${PITCH_URL}">${PITCH_URL} →</a></p></div>
</aside><main class="main">
  <p class="eyebrow">Cover letter · ${role}</p>
  <p class="date">${coverDate}</p>
  <p class="to">Evan Greenblatt<br>ADP · HRO Comprehensive Services<br>Evan.Greenblatt@adp.com</p>
  <h1 class="headline">You keep control. <span>ADP carries the work.</span></h1>
  <div class="letter">
    <p>Dear Evan,</p>
    <p class="lede">Most owners I meet on Long Island are stuck between two bad options: run payroll, benefits and HR themselves on software, or hand their people to a PEO. Comprehensive Services is the third way, and I'd like to be the one who shows them it exists.</p>
    <p>I'm applying for the ${role} role because I understand what it sells, and I'm the motivated, consultative, competitive seller the posting describes. Comprehensive Pay, Benefits, HR and Talent put ADP specialists on the work an owner's staff carries today, from payroll tax and audits to open enrollment, carrier invoices, compliance and hiring, all on Workforce Now, with a strategic advisor and regular business reviews. The client keeps its own plans and its own decisions. That's a service sale, sold on the hours, risk and turnover it removes, not on price per employee.</p>
    <p>It's also the sale I make every day at Mercedes-Benz of Smithtown, where I run the full cycle and win on the value of what's included, not the sticker. Before that, I learned the HR and benefits buyer at Mercer with CHROs and Fortune 50 leaders; raised enterprise win rates <b>15%</b> and cut sales cycles <b>30%</b> at Ericsson on the way to <b>$200M+</b> in influenced revenue; and closed multimillion-dollar partnerships with Sony, Warner Bros. and Google at DEFY Media.</p>
    <p>How I'd build the business:</p>
    <ul>
      <li><b>Start where I'm trusted.</b> Through the Long Island Builders Institute I'm working with builders and subcontractors: multi-site crews, union and prevailing-wage payroll, and constant hiring.</li>
      <li><b>Sell top-down, consultatively.</b> The owner hears hours and risk, the CFO hears cost and control, the HR leader hears relief. Then I recommend the mix of HR, payroll, benefits and talent that fixes it, and turn the win into referrals.</li>
      <li><b>Work the whole ADP network.</b> AI-driven research and multi-channel outreach (32% reply rates) for new logos, plus fast follow-up on warm leads from marketing and channel partners, and cross-sells with ADP colleagues into current clients.</li>
    </ul>
    <p>I wrote out the full plan, including the four bundles, the buyers, discovery questions, objections and my first 90 days, at <a href="https://${PITCH_URL}" style="color:var(--carmine);font-weight:600">${PITCH_URL}</a>. I'd welcome 20 minutes to walk you through it.</p>
  </div>
  <div class="sign">Thank you,<p class="sig">Mary Kate Parrish</p><p class="signame">Mary Kate Parrish</p></div>
</main></div></body></html>`;

const versions = [
  ["mk-parrish-resume-adp-signature", signature],
  ["mk-parrish-resume-adp-classic", classic],
  ["mk-parrish-cover-letter-adp", cover],
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
  // Flag any page whose content runs past the bottom edge.
  const overflow = await page.evaluate(() =>
    [...document.querySelectorAll(".page")].map((p) => {
      const kids = [...p.querySelectorAll("main, aside, .page > *")];
      const bottom = Math.max(...kids.map((k) => k.scrollHeight + k.offsetTop));
      return bottom - p.clientHeight;
    }),
  );
  const pdfPath = path.join(outDir, `${name}.pdf`);
  await page.pdf({ path: pdfPath, format: "Letter", printBackground: true, preferCSSPageSize: true });
  console.log(`✓ ${name} (.html, .pdf) overflow px per page: ${overflow.join(", ")}`);
}
await browser.close();
