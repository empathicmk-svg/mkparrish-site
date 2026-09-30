// Generates branded 1200x630 Open Graph share images (public/og/*.png) using
// the pre-installed Chromium. Fonts embedded from the founding-redesign kit.
// Run: node marketing/og/build-og.mjs
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const OUT = path.join(ROOT, "public", "og");
const TMP = path.join(__dirname, ".tmp");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });

const fonts = fs.readFileSync(path.join(ROOT, "marketing", "founding-redesign", "fonts.css"), "utf8");
const SHELL = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";

// title may contain a <span class="accent"> for the pink word.
const specs = [
  { name: "default", kicker: "Rewrite Your Story",
    title: 'Turn how you&rsquo;re seen <span class="accent">into revenue.</span>',
    sub: "Growth strategy, conversion websites, positioning &amp; messaging for B2B companies." },
  { name: "shop", kicker: "The Shelf",
    title: 'Books, guides <span class="accent">&amp; bundles.</span>',
    sub: "Memoir, poetry, and practical playbooks for voice, clarity, and momentum." },
  { name: "services", kicker: "Work with MK",
    title: 'The whole <span class="accent">revenue stack.</span>',
    sub: "Websites, positioning, outbound, and growth &mdash; done for you by one senior operator." },
  { name: "audit", kicker: "Start here · Async",
    title: 'The 48-Hour <span class="accent">Positioning Audit.</span>',
    sub: "$97. Your words, taken apart and put back better &mdash; in two business days, no call." },
  { name: "book", kicker: "Let&rsquo;s talk",
    title: 'Book a <span class="accent">call.</span>',
    sub: "Find the engagement that fits &mdash; websites, messaging, or full-funnel growth." },
];

const html = (s) => `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased}
.og{width:1200px;height:630px;position:relative;overflow:hidden;padding:70px 84px;display:flex;flex-direction:column;justify-content:space-between;
  background:radial-gradient(ellipse 72% 60% at 12% -12%,rgba(242,175,198,0.20),transparent 55%),radial-gradient(ellipse 52% 52% at 104% 112%,rgba(217,79,124,0.13),transparent 55%),#0E0E0E}
.frame{position:absolute;inset:26px;border:1px solid rgba(242,175,198,0.18)}
.top{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:baseline}
.brand{font-family:'Bebas Neue',Impact,sans-serif;font-size:36px;letter-spacing:.1em;text-transform:uppercase;color:#FAFAF8}
.kicker{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#F2AFC6}
.mid{position:relative;z-index:2}
.title{font-family:'Bebas Neue',Impact,sans-serif;text-transform:uppercase;letter-spacing:.01em;line-height:.9;color:#FAFAF8;font-size:104px}
.title .accent{color:#F2AFC6;text-shadow:0 0 34px rgba(242,175,198,.4)}
.sub{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:30px;line-height:1.35;color:rgba(242,175,198,.92);margin-top:26px;max-width:940px}
.rule{width:72px;height:3px;background:#F2AFC6;margin-top:30px;box-shadow:0 0 22px rgba(242,175,198,.5)}
.bottom{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;font-family:'DM Sans',sans-serif;font-size:16px;letter-spacing:.08em;color:#7A7A7A}
.bottom .url{color:#B0B0B0}
</style></head><body><div class="og"><div class="frame"></div>
<div class="top"><div class="brand">MK Parrish</div><div class="kicker">${s.kicker}</div></div>
<div class="mid"><div class="title">${s.title}</div><div class="sub">${s.sub}</div><div class="rule"></div></div>
<div class="bottom"><span class="url">mkparrish.com</span><span>Growth · Websites · Messaging</span></div>
</div></body></html>`;

for (const s of specs) {
  const htmlPath = path.join(TMP, `${s.name}.html`);
  fs.writeFileSync(htmlPath, html(s));
  execSync(
    `${SHELL} --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=1 ` +
    `--window-size=1200,630 --default-background-color=00000000 --virtual-time-budget=5000 ` +
    `--screenshot="${path.join(OUT, s.name + ".png")}" "file://${htmlPath}"`,
    { stdio: "ignore" }
  );
  console.log(`✓ og/${s.name}.png`);
}
fs.rmSync(TMP, { recursive: true, force: true });
console.log(`\nOG images written to ${OUT}`);
