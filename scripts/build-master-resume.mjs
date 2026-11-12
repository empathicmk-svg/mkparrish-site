// Builds the master ("global") resume and cover letter: the role-agnostic set that goes on
// job boards, to recruiters and into applications. Same type system and palette as the site
// (Bebas Neue, Playfair Display italic, DM Sans; obsidian, petal, carmine).
//
//   node scripts/build-master-resume.mjs
//
// Writes to public/resumes/master/:
//   mk-parrish-resume-signature   branded two-column resume, for people (email, recruiters, networking)
//   mk-parrish-resume-ats         single-column, parser-safe resume, for job boards and ATS uploads
//   mk-parrish-cover-letter       general cover letter that reads complete with no blanks
// Each as .html, a US Letter .pdf and an A4 .pdf (-a4, for applications outside North America). Also the ATS resume as .docx (needs python3 +
// python-docx) and both documents as .txt for pasting into application forms.
//
// Tailored cover letter for one application (written to drafts/applications/<company>/, which is
// gitignored):
//
//   node scripts/build-master-resume.mjs --company "Acme" --role "Director of Partner Marketing" \
//     --to "Jane Doe" --why "One or two sentences on why this company, in your own words."

import { spawnSync } from "child_process";
import { mkdirSync, rmSync, writeFileSync } from "fs";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

// Resolves Playwright from node_modules or from a global install.
const { chromium } = createRequire(import.meta.url)("playwright");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const m = process.argv[i].match(/^--([a-z]+)$/);
  if (m) args[m[1]] = process.argv[++i] ?? "";
}
const tailored = Boolean(args.company);
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const outDir = tailored
  ? path.join(root, "drafts", "applications", slug(args.company))
  : path.join(root, "public", "resumes", "master");
mkdirSync(outDir, { recursive: true });

const PORTFOLIO_URL = "mkparrish.com/portfolio";

const contact = {
  location: "Long Island & New York, NY",
  open: "Open to remote & hybrid",
  phone: "+1 (347) 853-4238",
  email: "mkp414@icloud.com",
  linkedin: "linkedin.com/in/mkparrish",
  site: "mkparrish.com",
};

const title = "Senior Marketing & Partnerships Leader";
const subtitle = "B2B Growth · Channel & Partner Marketing · Go-to-Market";

const summary =
  "Senior B2B marketing and partnerships leader with nearly two decades growing revenue across SaaS, cloud communications, media, consulting and manufacturing. I build the go-to-market engine end to end: positioning and messaging, partner and channel programs, account-based marketing and demand generation, sales enablement, and the reporting that ties it all to pipeline. At Ericsson (Vonage) I scaled EMEA partner programs from launch to $200M+ in influenced revenue, raised enterprise win rates 15% and shortened sales cycles 30%. Today I run an AI-native consultancy and sell full-cycle myself, so I plan like a marketer and close like a seller.";

const expertise = [
  "Go-to-Market Strategy",
  "Partner & Channel Marketing",
  "Account-Based Marketing (ABM)",
  "Demand Generation",
  "Sales Enablement",
  "Brand Positioning & Messaging",
  "Pipeline Acceleration",
  "Partnerships & Co-Marketing",
  "Paid Media: LinkedIn, Programmatic, Retargeting",
  "Marketing Automation & CRM",
  "KPI Reporting & ROI",
  "Full-Cycle B2B Sales",
  "AI Workflows & Prompt Engineering",
  "Executive Ghostwriting & Content",
];

const tools =
  "Salesforce · Google Analytics · Google Ads · Meta & LinkedIn Ads · BigQuery & SQL · Figma · Excel modeling · HTML/CSS & Next.js · AI agent workflows";

// Every bullet goes in the ATS resume, .docx and .txt, where keyword coverage matters. `atsOnly`
// lists the bullet indexes the Signature resume leaves out so the page stays tight.
const roles = [
  {
    title: "Founder & Principal Consultant",
    org: "MK Parrish",
    place: "New York, NY",
    dates: "Jan 2026 – Present",
    blurb: "B2B consultancy delivering go-to-market strategy, brand messaging, conversion websites, outbound and executive ghostwriting.",
    bullets: [
      "Prospect, pitch, price and close every engagement directly with founders and business owners, then deliver the work: positioning, site, outbound and campaign.",
      "Run multi-channel outbound on AI-agent workflows for account research and personalization, with cold reply rates as high as 32%.",
      "Design ABM and demand generation programs that align channel mix, segmentation and messaging to sales stage and pipeline goals.",
      "Design, write and code conversion websites in Next.js, including mkparrish.com with its storefront, lead capture and booking flows.",
    ],
    atsOnly: [2],
  },
  {
    title: "Sales Consultant",
    org: "Mercedes-Benz of Smithtown",
    place: "Smithtown, NY",
    dates: "2026 – Present",
    blurb: null,
    bullets: [
      "Own the full consultative cycle for a premium, technology-heavy product line: prospecting, discovery, presentation, financing, negotiation and close.",
      "Opened a new prospecting channel by calling service customers ahead of their appointments, and built my own sales tools: a web-based inventory lookup, a test-drive booking page and a short-form video series.",
    ],
  },
  {
    title: "Marketing Manager",
    org: "Atlantic Ultraviolet Corporation",
    place: "Hauppauge, NY",
    dates: "Nov 2024 – Apr 2025",
    blurb: "Owned national marketing for a UV-C manufacturer across distributor, dealer, contractor and direct channels.",
    bullets: [
      "Built account-based marketing programs for high-value partner segments, aligned to regional sales goals and active pipeline opportunities.",
      "Created a partner marketing toolkit of campaign-in-a-box assets, co-branded creative and training that let partners run campaigns without central support.",
      "Launched omnichannel campaigns across paid social, programmatic, email automation, webinars and events, from brief through post-launch reporting.",
      "Owned the paid media budget and built KPI dashboards tying marketing to revenue; ran recurring pipeline reviews with sales leadership.",
    ],
    atsOnly: [2],
  },
  {
    title: "Senior Channel Marketing Manager",
    org: "Ericsson (Vonage)",
    place: "Remote",
    dates: "Nov 2019 – Oct 2024",
    blurb: "Cloud communications and API platform sold through a global reseller, referral and agency partner ecosystem.",
    bullets: [
      "Scaled EMEA partner marketing from launch to $200M+ in influenced revenue through localized reseller campaigns and multilingual enablement, raising partner engagement 45%.",
      "Launched Dollars for Demos, an incentive and co-marketing program that shortened sales cycles 30% and lifted enterprise win rates 15% in targeted segments.",
      "Led a Salesforce go-to-market partnership and bundled offer that accelerated pipeline 25% and raised average contract value 20%.",
      "Ran recurring deal-stage reviews with sales leadership to unblock stalled opportunities and improve forecast accuracy.",
      "Built playbooks and co-branded asset libraries that kept brand and message consistent across dozens of partners.",
    ],
  },
  {
    title: "Senior Partner Account Manager",
    org: "DEFY Media",
    place: "New York, NY",
    dates: "Jul 2012 – Feb 2016",
    blurb: "Partner strategy and brand partnerships at a leading youth entertainment network.",
    bullets: [
      "Scaled the creator and publisher network to 150+ partners, reaching 80M+ monthly viewers and 600M+ views.",
      "Led monetization and brand strategy for Smosh (then YouTube's #1 channel) and Clevver.",
      "Launched multimillion-dollar branded content programs with Sony, Warner Bros. and Google.",
      "Built go-to-market plans by advertiser vertical, supporting multimillion-dollar deals with Fortune 500 brands and their agencies.",
    ],
  },
  {
    title: "Marketing Manager",
    org: "Mercer",
    place: "New York, NY",
    dates: "Jun 2010 – Jun 2012",
    blurb: null,
    bullets: [
      "Grew a single CHRO forum into a global portfolio of 50+ executive networks for Fortune 50 HR leaders, owning recruitment, agendas, thought leadership and speakers.",
      "Built a CRM-driven engagement system to prioritize high-value accounts and measure network impact on revenue.",
      "Negotiated global vendor and venue contracts, cutting operating costs 50%.",
    ],
  },
  {
    title: "Channel Marketing Manager",
    org: "Take-Two Interactive",
    place: "New York, NY",
    dates: "May 2008 – Jun 2010",
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
    detail: "Bachelor of Business Administration, Marketing · Delta Sigma Pi · GW Women in Business",
  },
];

const writing = [
  "Author of Rebecoming and a catalog of business playbooks and workbooks, published on Amazon and at mkparrish.com.",
  "Publisher of The Margins, a newsletter on Substack.",
  "Designed, wrote and coded mkparrish.com: Next.js, Stripe checkout, lead capture and booking.",
];

const proof = [
  { stat: "$200M+", label: "partner-influenced revenue" },
  { stat: "$40M+", label: "career pipeline influenced" },
  { stat: "+15%", label: "enterprise win rate" },
  { stat: "−30%", label: "sales cycle length" },
  { stat: "80M+", label: "monthly viewers reached" },
  { stat: "32%", label: "cold outreach reply rate" },
];

// From the About page: the working principles, in the site's own words.
const principles = [
  ["Pipeline is the proof", "Marketing should move money, not look busy. I measure the work against booked calls, trust and revenue."],
  ["AI-native, taste-led", "I use an agent stack to ship more than one operator should be able to ship. Judgment, voice and the final call stay human."],
  ["One accountable name", "The person setting the strategy is the person shipping the work and owning the outcome."],
];

// The three kinds of role this resume is built to answer.
const lanes = [
  ["Partner & channel marketing", "Reseller, referral and alliance programs, co-marketing, incentives and partner enablement, from launch to $200M+ in influenced revenue."],
  ["Growth & demand generation", "ABM, paid media, lifecycle and events, measured on pipeline, win rate and contract value rather than lead counts."],
  ["Partnerships & revenue", "Full-cycle selling and multi-stakeholder deals, from Fortune 500 brand partnerships to outbound with cold reply rates as high as 32%."],
];

// ── Cover letter copy ──
const company = args.company || "";
const roleName = args.role || "";
const greeting = args.to ? `Dear ${args.to.split(" ")[0]},` : company ? `Dear ${company} Hiring Team,` : "Dear Hiring Team,";
const coverDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
const letter = {
  lede: `The best work still gets ignored when the story is smaller than the thing itself. I've spent nearly two decades closing that gap, and I'd like to close it for ${company || "your team"}.`,
  open: roleName
    ? `I'm writing about the ${roleName} role${company ? ` at ${company}` : ""}. What I bring is the full go-to-market engine in one person: the positioning, the partner and demand programs, the sales enablement, and the numbers that show it worked.`
    : "I'm writing about a senior marketing or partnerships role on your team. What I bring is the full go-to-market engine in one person: the positioning, the partner and demand programs, the sales enablement, and the numbers that show it worked.",
  points: [
    ["Partner revenue at scale.", "At Ericsson (Vonage) I scaled EMEA partner programs from launch to $200M+ in influenced revenue and raised partner engagement 45%."],
    ["Marketing that moves deals.", "An incentive program and a bundled Salesforce offer I led shortened sales cycles 30%, lifted enterprise win rates 15% and raised average contract value 20%."],
    ["A seller's ear.", "I run full-cycle sales myself today, with cold reply rates as high as 32% on AI-assisted outbound. I know what a rep needs from marketing because I am one."],
  ],
  why:
    args.why ||
    "I work the way a small, fast team does. I write the message, build the page, wire the lead path, run the campaign and read the numbers, with an AI agent stack that lets one operator ship what usually takes several. For you that means fewer handoffs, faster launches and one accountable name on the result.",
  close: `My portfolio, with case studies and writing samples, is at ${PORTFOLIO_URL}. I'd welcome 20 minutes to hear what you're building and show you where I can add to it.`,
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const SIZES = {
  letter: { css: "Letter", w: "8.5in", h: "11in", pdf: "Letter", suffix: "" },
  a4: { css: "A4", w: "210mm", h: "297mm", pdf: "A4", suffix: "-a4" },
};

const head = (docTitle, css, size) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<meta name="author" content="Mary Kate Parrish">
<title>${docTitle}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
:root{--void:#080808;--obsidian:#111;--graphite:#2C2C2C;--iron:#4A4A4A;--ash:#7A7A7A;--pearl:#F0F0EE;--white:#FAFAF8;--blush:#FFE0EC;--petal:#FFB5D0;--rose:#F58CAD;--carmine:#D94F7C;--lipstick:#B43259;
--display:"Bebas Neue",Impact,sans-serif;--serif:"Playfair Display",Georgia,serif;--body:"DM Sans",system-ui,sans-serif}
@page{size:${size.css};margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:var(--body);color:var(--void);background:#e9e7e4}
a{color:inherit;text-decoration:none}
.page{width:${size.w};height:${size.h};margin:0 auto;background:var(--white);position:relative;overflow:hidden}
@media screen{.page{margin:24px auto;box-shadow:0 10px 40px rgba(0,0,0,.18)}}
@media print{body{background:none}.page{margin:0;box-shadow:none;break-after:page}.page:last-child{break-after:auto}}
${css}
</style></head><body>`;

const roleHtml = (r) => `<div class="role">
  <div class="role-head"><h3>${esc(r.title)}</h3><span class="meta">${esc(r.place)} · ${esc(r.dates)}</span></div>
  <p class="org">${esc(r.org)}</p>
  ${r.blurb ? `<p class="blurb">${esc(r.blurb)}</p>` : ""}
  <ul>${r.bullets.filter((_, i) => !(r.atsOnly || []).includes(i)).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
</div>`;

// ── Signature: editorial two-column with the obsidian sidebar ──
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
.proof{display:grid;grid-template-columns:1fr 1fr;gap:12px 8px}
.proof div b{display:block;font-family:var(--display);font-weight:400;font-size:25px;color:var(--white);line-height:1}
.proof div span{font-size:8px;line-height:1.3;color:var(--ash);text-transform:uppercase;letter-spacing:.08em}
.pitch{margin-top:24px;border:1px solid var(--petal);padding:11px 11px 12px}
.pitch .k{font-size:8px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:var(--petal)}
.pitch .t{font-family:var(--serif);font-style:italic;font-weight:600;font-size:12.5px;line-height:1.3;color:var(--white);margin-top:5px}
.pitch .u{font-size:9px;color:var(--petal);margin-top:6px;font-weight:600}
.edu b{display:block;font-weight:600;color:var(--white);font-size:9.6px}
.edu p{margin-bottom:8px}
.eyebrow{font-size:8.5px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--carmine)}
.title{font-family:var(--display);font-size:25px;letter-spacing:.03em;line-height:1;margin-top:5px;color:var(--void)}
.subtitle{font-size:9px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--iron);margin-top:5px}
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
.fit{margin-top:8px;border-top:1px solid #e5e5e5}
.fit div{display:grid;grid-template-columns:1.45in 1fr;gap:10px;padding:7px 0;border-bottom:1px solid #e5e5e5}
.fit b{font-family:var(--display);font-weight:400;font-size:13.5px;letter-spacing:.03em;color:var(--lipstick);line-height:1.1}
.fit span{font-size:9.5px;line-height:1.5;color:#222}
.p2 .side{padding-top:.5in}
.foot{position:absolute;bottom:.28in;right:.5in;font-size:8px;color:var(--ash);letter-spacing:.14em;text-transform:uppercase}
`;

const signatureSide = (first) => `<aside class="side">
  ${
    first
      ? `<div class="name">Mary<br>Kate<br><span>Parrish</span></div>
  <p class="script">The sentence matters. So does the system underneath it.</p>
  <h4>Contact</h4>
  <ul><li>${esc(contact.location)}</li><li>${esc(contact.open)}</li><li>${contact.phone}</li><li>${contact.email}</li><li>${contact.linkedin}</li><li>${contact.site}</li></ul>
  <h4>By the numbers</h4>
  <div class="proof">${proof.map((p) => `<div><b>${p.stat}</b><span>${p.label}</span></div>`).join("")}</div>
  <div class="pitch"><p class="k">Portfolio</p><p class="t">Case studies, campaign plans and writing samples.</p><p class="u"><a href="https://${PORTFOLIO_URL}">${PORTFOLIO_URL} →</a></p></div>`
      : `<div class="name" style="font-size:34px">MK<br><span>Parrish</span></div>
  <h4>Expertise</h4>
  <ul>${expertise.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
  <h4>Tools</h4>
  <p>${esc(tools)}</p>
  <h4>Education</h4>
  <div class="edu">${education.map((e) => `<p><b>${esc(e.school)}</b>${esc(e.detail)}</p>`).join("")}</div>`
  }
</aside>`;

const SIG_SPLIT = 4; // roles on page one of the Signature resume
const signature = (size) =>
  head("Mary Kate Parrish · Resume", signatureCss, size) +
  `<div class="page">${signatureSide(true)}<main class="main">
  <p class="eyebrow">Resume</p>
  <p class="title">${esc(title)}</p>
  <p class="subtitle">${esc(subtitle)}</p>
  <p class="lede">I turn how a company is seen into revenue it can prove.</p>
  <p class="summary">${esc(summary)}</p>
  <h2>Experience</h2>
  ${roles.slice(0, SIG_SPLIT).map(roleHtml).join("")}
</main><p class="foot">1 / 2</p></div>
<div class="page p2">${signatureSide(false)}<main class="main">
  <h2 style="margin-top:0">Experience, continued</h2>
  ${roles.slice(SIG_SPLIT).map(roleHtml).join("")}
  <h2>Where I fit</h2>
  <div class="fit">${lanes.map(([k, v]) => `<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join("")}</div>
  <h2>Writing &amp; building</h2>
  <div class="role"><ul>${writing.map((w) => `<li>${esc(w)}</li>`).join("")}</ul></div>
  <h2>How I work</h2>
  <div class="fit">${principles.map(([k, v]) => `<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join("")}</div>
</main><p class="foot">2 / 2</p></div></body></html>`;

// ── ATS: single column, standard headings, no tables or text boxes, same type system ──
const atsCss = `
.page{padding:.5in .65in .45in}
.top{text-align:center;padding-bottom:11px;border-bottom:2px solid var(--void)}
.name{font-family:var(--display);font-size:44px;letter-spacing:.06em;line-height:1}
.title{font-family:var(--serif);font-style:italic;font-weight:600;font-size:14px;color:var(--lipstick);margin-top:4px}
.contact{font-size:10px;color:#333;margin-top:7px;letter-spacing:.01em}
.contact a{color:var(--lipstick)}
h2{font-family:var(--display);font-weight:400;font-size:18px;letter-spacing:.05em;margin:13px 0 5px;padding-bottom:3px;border-bottom:1px solid var(--petal)}
.summary{font-size:10.8px;line-height:1.55;color:#222}
.skills{font-size:10.6px;line-height:1.58;color:#222}
.skills b{font-weight:600}
.role{margin-top:9px;break-inside:avoid}
.role h3{font-family:var(--body);font-weight:700;font-size:11px;letter-spacing:.06em;text-transform:uppercase}
.org{font-size:10.6px;color:#333;margin-top:1px}
.org b{font-family:var(--serif);font-style:italic;font-weight:600;font-size:11.6px;color:var(--lipstick)}
.role ul{margin:3px 0 0 14px}
.role li{font-size:10.6px;line-height:1.48;color:#1a1a1a;margin-top:1.5px}
.edu p{font-size:10.6px;line-height:1.55}
.edu b{font-weight:600}
.foot{position:absolute;bottom:.28in;left:0;right:0;text-align:center;font-size:8.5px;color:var(--ash);letter-spacing:.03em}
`;

// Title on one line, then "Company | Location | Dates": the order resume parsers expect.
const atsRole = (r) => `<div class="role">
  <h3>${esc(r.title)}</h3>
  <p class="org"><b>${esc(r.org)}</b> | ${esc(r.place)} | ${esc(r.dates)}</p>
  <ul>${r.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
</div>`;

const selectedResults =
  proof.map((p) => `<b>${p.stat}</b> ${p.label}`).join(" · ") +
  " · <b>+45%</b> partner engagement · <b>+25%</b> pipeline from a Salesforce co-sell · <b>+20%</b> average contract value · <b>$20M+</b> retail product revenue";

const ATS_SPLIT = 4; // roles on page one of the ATS resume
const ats = (size) =>
  head("Mary Kate Parrish · Resume", atsCss, size) +
  `<div class="page">
  <header class="top">
    <h1 class="name">Mary Kate Parrish</h1>
    <p class="title">${esc(title)} · ${esc(subtitle)}</p>
    <p class="contact">${esc(contact.location)} (${esc(contact.open.toLowerCase())}) · ${contact.phone} · ${contact.email} · ${contact.linkedin} · <a href="https://${contact.site}">${contact.site}</a></p>
  </header>
  <h2>Professional Summary</h2>
  <p class="summary">${esc(summary)}</p>
  <h2>Core Competencies</h2>
  <p class="skills">${expertise.map(esc).join(" · ")}<br><b>Tools:</b> ${esc(tools)}</p>
  <h2>Professional Experience</h2>
  ${roles.slice(0, ATS_SPLIT).map(atsRole).join("")}
  <p class="foot">Mary Kate Parrish · 1 / 2</p>
</div>
<div class="page">
  <h2 style="margin-top:0">Professional Experience, continued</h2>
  ${roles.slice(ATS_SPLIT).map(atsRole).join("")}
  <h2>Selected Results</h2>
  <p class="skills">${selectedResults}</p>
  <h2>Publications and Projects</h2>
  <div class="role"><ul>${writing.map((w) => `<li>${esc(w)}</li>`).join("")}</ul></div>
  <h2>Education</h2>
  <div class="edu">${education.map((e) => `<p><b>${esc(e.school)}</b> · ${esc(e.detail)}</p>`).join("")}</div>
  <p class="foot">Mary Kate Parrish · 2 / 2</p>
</div></body></html>`;

// ── Cover letter: one page, Signature letterhead ──
const coverCss = `
.page{display:grid;grid-template-columns:2.1in 1fr}
.side{background:var(--obsidian);color:var(--pearl);padding:.55in .3in .45in .38in}
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
.main{padding:.6in .6in .5in .5in}
.eyebrow{font-size:8.5px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--carmine)}
.date{font-size:9.6px;color:var(--ash);margin-top:14px}
.to{font-size:10px;line-height:1.5;margin-top:10px;color:#222}
.headline{font-family:var(--display);font-size:30px;letter-spacing:.02em;line-height:.95;margin-top:18px}
.headline span{color:var(--carmine)}
.letter p{font-size:11px;line-height:1.7;color:#222;margin-top:13px}
.letter p.lede{font-family:var(--serif);font-style:italic;font-weight:600;font-size:15px;line-height:1.38;color:var(--void);padding-left:12px;border-left:3px solid var(--petal)}
.letter ul{margin:8px 0 0 14px}
.letter li{font-size:10.8px;line-height:1.6;color:#222;margin-top:6px}
.letter li::marker{color:var(--carmine)}
.letter b{font-weight:600}
.sign{margin-top:22px;font-size:11px;color:#222}
.sig{font-family:var(--serif);font-style:italic;font-weight:700;font-size:26px;color:var(--lipstick);margin-top:4px;line-height:1}
.signame{font-family:var(--display);font-size:15px;letter-spacing:.06em;margin-top:6px}
`;

const toBlock = [args.to, company, roleName].filter(Boolean).map(esc).join("<br>");

const cover = (size) =>
  head(`Mary Kate Parrish · Cover Letter${company ? ` · ${esc(company)}` : ""}`, coverCss, size) +
  `<div class="page"><aside class="side">
  <div class="name">Mary<br>Kate<br><span>Parrish</span></div>
  <p class="script">The sentence matters. So does the system underneath it.</p>
  <h4>Contact</h4>
  <ul><li>${esc(contact.location)}</li><li>${esc(contact.open)}</li><li>${contact.phone}</li><li>${contact.email}</li><li>${contact.linkedin}</li><li>${contact.site}</li></ul>
  <h4>By the numbers</h4>
  <ul>${proof.map((p) => `<li><b style="color:var(--white);font-weight:600">${p.stat}</b> ${p.label}</li>`).join("")}</ul>
  <div class="pitch"><p class="k">Portfolio</p><p class="t">Case studies, campaign plans and writing samples.</p><p class="u"><a href="https://${PORTFOLIO_URL}">${PORTFOLIO_URL} →</a></p></div>
</aside><main class="main">
  <p class="eyebrow">Cover letter${roleName ? ` · ${esc(roleName)}` : ""}</p>
  <p class="date">${coverDate}</p>
  ${toBlock ? `<p class="to">${toBlock}</p>` : ""}
  <h1 class="headline">Good work gets ignored<br><span>when the story is too small.</span></h1>
  <div class="letter">
    <p>${esc(greeting)}</p>
    <p class="lede">${esc(letter.lede)}</p>
    <p>${esc(letter.open)}</p>
    <ul>${letter.points.map(([k, v]) => `<li><b>${esc(k)}</b> ${esc(v)}</li>`).join("")}</ul>
    <p>${esc(letter.why)}</p>
    <p>My portfolio, with case studies and writing samples, is at <a href="https://${PORTFOLIO_URL}" style="color:var(--lipstick);font-weight:600">${PORTFOLIO_URL}</a>. I'd welcome 20 minutes to hear what you're building and show you where I can add to it.</p>
  </div>
  <div class="sign">Thank you,<p class="sig">Mary Kate Parrish</p><p class="signame">Mary Kate Parrish</p></div>
</main></div></body></html>`;

// ── Plain text, for pasting into application forms and email bodies ──
const rule = (t) => `${t.toUpperCase()}\n${"-".repeat(t.length)}`;
const resumeTxt = [
  "MARY KATE PARRISH",
  `${title} | ${subtitle.replace(/ · /g, " | ")}`,
  `${contact.location} (${contact.open.toLowerCase()}) | ${contact.phone} | ${contact.email} | ${contact.linkedin} | ${contact.site}`,
  "",
  rule("Professional Summary"),
  summary,
  "",
  rule("Core Competencies"),
  expertise.join(", "),
  `Tools: ${tools.replace(/ · /g, ", ")}`,
  "",
  rule("Professional Experience"),
  ...roles.flatMap((r) => ["", r.title, `${r.org} | ${r.place} | ${r.dates}`, ...r.bullets.map((b) => `- ${b}`)]),
  "",
  rule("Selected Results"),
  selectedResults.replace(/<\/?b>/g, "").replace(/ · /g, "; "),
  "",
  rule("Publications and Projects"),
  ...writing.map((w) => `- ${w}`),
  "",
  rule("Education"),
  ...education.map((e) => `${e.school}\n${e.detail.replace(/ · /g, ", ")}`),
  "",
].join("\n");

const coverTxt = [
  greeting,
  "",
  letter.lede,
  "",
  letter.open,
  "",
  ...letter.points.map(([k, v]) => `- ${k} ${v}`),
  "",
  letter.why,
  "",
  letter.close,
  "",
  "Thank you,",
  "Mary Kate Parrish",
  `${contact.phone} | ${contact.email} | ${contact.linkedin}`,
  "",
].join("\n");

// ── Render ──
const coverName = tailored ? `mk-parrish-cover-letter-${slug(args.company)}` : "mk-parrish-cover-letter";
const versions = tailored
  ? [[coverName, cover]]
  : [
      ["mk-parrish-resume-signature", signature],
      ["mk-parrish-resume-ats", ats],
      [coverName, cover],
    ];

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 816, height: 1123 }, deviceScaleFactor: 2 });
let overflowed = false;
for (const [name, build] of versions) {
  for (const size of Object.values(SIZES)) {
    const htmlPath = path.join(outDir, `${name}${size.suffix}.html`);
    writeFileSync(htmlPath, build(size));
    await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // Flag any page whose content runs past the bottom edge (positive = px over).
    const overflow = await page.evaluate(() =>
      [...document.querySelectorAll(".page")].map((p) => {
        const top = p.getBoundingClientRect().top;
        const kids = [...p.querySelectorAll("main > *, aside > *, .page > header, .page > h2, .page > p:not(.foot), .page > div")];
        const bottom = Math.max(...kids.map((k) => k.getBoundingClientRect().bottom - top));
        return Math.round(bottom - p.clientHeight + 26); // keep ~.27in clear at the bottom
      }),
    );
    if (overflow.some((o) => o > 0)) overflowed = true;
    await page.pdf({ path: path.join(outDir, `${name}${size.suffix}.pdf`), format: size.pdf, printBackground: true, preferCSSPageSize: true });
    if (size.suffix) rmSync(htmlPath); // keep one .html per document; the A4 copy only exists to print from
    console.log(`✓ ${name}${size.suffix} (${size.suffix ? ".pdf" : ".html, .pdf"}) px past bottom margin per page: ${overflow.join(", ")}`);
  }
}
await browser.close();

writeFileSync(path.join(outDir, `${coverName}.txt`), coverTxt);
console.log(`✓ ${coverName}.txt`);

if (!tailored) {
  writeFileSync(path.join(outDir, "mk-parrish-resume.txt"), resumeTxt);
  console.log("✓ mk-parrish-resume.txt");

  const docx = spawnSync("python3", [path.join(__dirname, "lib", "master-resume-docx.py"), path.join(outDir, "mk-parrish-resume-ats.docx")], {
    input: JSON.stringify({ title, subtitle, contact, summary, expertise, tools, roles, selectedResults: selectedResults.replace(/<\/?b>/g, ""), writing, education }),
    encoding: "utf8",
  });
  if (docx.status === 0) console.log("✓ mk-parrish-resume-ats.docx");
  else console.warn(`! skipped .docx (needs python3 with python-docx): ${(docx.stderr || docx.error?.message || "").trim().split("\n").pop()}`);
}

if (overflowed) {
  console.error("✗ content runs past the bottom margin on at least one page; trim copy or move a role to the next page.");
  process.exit(1);
}
