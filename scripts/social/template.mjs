// ─────────────────────────────────────────────────────────────────────────────
// The stylized post renderer. Builds an HTML document (Bebas Neue / Playfair /
// DM Sans, void-black + petal-pink) that Puppeteer rasterizes to PNG.
//
// Two formats:
//   reel  — 1080×1920  (TikTok / IG Reels / Stories cover)
//   feed  — 1080×1350  (IG portrait feed / carousel cover)
// ─────────────────────────────────────────────────────────────────────────────

import { BRAND } from "./catalog.mjs";
import { FONT_CSS } from "./fonts.mjs";
import { HEART, HEART_CSS } from "./heart.mjs";

export const FORMATS = {
  reel: { w: 1080, h: 1920 },
  feed: { w: 1080, h: 1350 },
};

const PALETTE = {
  void: "#080808",
  obsidian: "#111111",
  carbon: "#1A1A1A",
  graphite: "#2A2A2A",
  petal: "#F2AFC6",
  blush: "#F7C9D9",
  pearl: "#F5F5F0",
  smoke: "#B8B8B8",
  iron: "#7A7A7A",
};

const esc = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Turn "*petal* words" into a span; keep \n as <br>.
function renderHook(hook) {
  return esc(hook)
    .replace(/\n/g, "<br>")
    .replace(/\*([^*]+)\*/g, `<span class="accent">$1</span>`);
}

// Headline size scales down as the hook gets longer so it never overflows.
function headlineSize(hook, format) {
  const longest = Math.max(...hook.split("\n").map((l) => l.replace(/\*/g, "").length));
  const base = format === "reel" ? 1 : 0.84;
  let px;
  if (longest <= 14) px = 150;
  else if (longest <= 18) px = 128;
  else if (longest <= 24) px = 108;
  else if (longest <= 30) px = 92;
  else px = 78;
  return Math.round(px * base);
}

export function renderPost(post, format = "reel") {
  const { w, h } = FORMATS[format];
  const hookPx = headlineSize(post.hook, format);
  const pad = format === "reel" ? 96 : 80;

  const bullets = (post.bullets || [])
    .map(
      (b) => `<li>${HEART("sm")}<span>${esc(b)}</span></li>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
${FONT_CSS}
${HEART_CSS}
  .mid .heart.md { margin-bottom: 18px; }
  li .heart { flex:0 0 auto; margin-top:8px; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --void:${PALETTE.void}; --obsidian:${PALETTE.obsidian}; --carbon:${PALETTE.carbon};
    --graphite:${PALETTE.graphite}; --petal:${PALETTE.petal}; --blush:${PALETTE.blush};
    --pearl:${PALETTE.pearl}; --smoke:${PALETTE.smoke}; --iron:${PALETTE.iron};
  }
  html, body { width:${w}px; height:${h}px; }
  body {
    position: relative; overflow: hidden;
    background: var(--void);
    font-family: "DM Sans", system-ui, sans-serif;
    color: var(--pearl);
    -webkit-font-smoothing: antialiased;
  }
  /* atmosphere */
  .glow {
    position:absolute; left:50%; top:-12%; transform:translateX(-50%);
    width:${Math.round(w * 1.1)}px; height:${Math.round(h * 0.6)}px;
    background: radial-gradient(ellipse at top, rgba(242,175,198,0.28), transparent 64%);
    pointer-events:none;
  }
  .grain {
    position:absolute; inset:0; opacity:0.05; pointer-events:none; mix-blend-mode:overlay;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  }
  .frame { position:absolute; inset:${Math.round(pad * 0.42)}px; border:1px solid rgba(242,175,198,0.16); }
  .stage {
    position:relative; z-index:2; height:100%;
    display:flex; flex-direction:column; padding:${pad}px;
  }
  /* header */
  .top { display:flex; justify-content:space-between; align-items:flex-start; }
  .brand { font-family:"Bebas Neue",Impact,sans-serif; letter-spacing:.18em; font-size:34px; color:var(--pearl); }
  .index { font-family:"DM Sans"; font-weight:500; letter-spacing:.35em; font-size:20px; color:var(--iron); }
  .kicker {
    margin-top:${format === "reel" ? 64 : 40}px;
    display:inline-flex; align-self:flex-start; align-items:center; gap:14px;
    border:1px solid rgba(242,175,198,0.5); color:var(--petal);
    padding:14px 22px; border-radius:999px;
    font-weight:700; letter-spacing:.22em; text-transform:uppercase; font-size:21px;
  }
  .kicker .dot { width:9px; height:9px; background:var(--petal); border-radius:50%; }
  /* body */
  .mid { flex:1; display:flex; flex-direction:column; justify-content:center; }
  .quote { font-family:"Playfair Display",serif; font-size:240px; line-height:0; color:rgba(242,175,198,0.14); height:60px; }
  h1 {
    font-family:"Bebas Neue",Impact,sans-serif;
    font-size:${hookPx}px; line-height:0.92; letter-spacing:0.005em;
    text-transform:uppercase; color:var(--pearl); margin-top:26px;
  }
  h1 .accent { color:var(--petal); }
  .sub {
    font-family:"Playfair Display",serif; font-style:italic; font-weight:500;
    color:var(--blush); font-size:${format === "reel" ? 42 : 36}px; line-height:1.3;
    margin-top:34px; max-width:${Math.round(w - pad * 2)}px;
  }
  ul { list-style:none; margin-top:${format === "reel" ? 52 : 34}px; display:flex; flex-direction:column; gap:22px; }
  li { display:flex; gap:20px; align-items:flex-start; font-weight:300; font-size:${format === "reel" ? 30 : 27}px; line-height:1.4; color:var(--smoke); }
  li .tick { flex:0 0 auto; margin-top:14px; width:14px; height:14px; background:var(--petal); transform:rotate(45deg); }
  /* footer */
  .bottom { margin-top:${format === "reel" ? 56 : 34}px; }
  .rule { height:1px; background:linear-gradient(to right, rgba(242,175,198,0.55), transparent); }
  .cta-row { display:flex; align-items:center; justify-content:space-between; margin-top:34px; gap:24px; }
  .pricewrap { display:flex; align-items:baseline; gap:18px; }
  .price { font-family:"Bebas Neue",Impact,sans-serif; font-size:${format === "reel" ? 96 : 80}px; line-height:0.9; color:#fff; }
  .pricelbl { font-weight:500; letter-spacing:.2em; text-transform:uppercase; font-size:19px; color:var(--iron); }
  .cta {
    font-family:"Bebas Neue",Impact,sans-serif; letter-spacing:.08em; font-size:${format === "reel" ? 40 : 34}px;
    background:var(--petal); color:var(--void); padding:${format === "reel" ? "24px 40px" : "20px 34px"};
    display:inline-flex; align-items:center; gap:14px; white-space:nowrap;
  }
  .meta { display:flex; justify-content:space-between; margin-top:38px; font-weight:500; letter-spacing:.2em; text-transform:uppercase; font-size:20px; color:var(--iron); }
  .meta .pink { color:var(--petal); }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="frame"></div>
  <div class="grain"></div>
  <div class="stage">
    <div class="top">
      <div class="brand">${esc(BRAND.name)}</div>
      <div class="index">${esc(post.n || "")} / THE SHELF</div>
    </div>
    <span class="kicker"><span class="dot"></span>${esc(post.kicker || "")}</span>

    <div class="mid">
      ${HEART("md")}
      <h1>${renderHook(post.hook)}</h1>
      ${post.sub ? `<p class="sub">${esc(post.sub)}</p>` : ""}
      ${bullets ? `<ul>${bullets}</ul>` : ""}
    </div>

    <div class="bottom">
      <div class="rule"></div>
      <div class="cta-row">
        <div class="pricewrap">
          <span class="price">${esc(post.price || "")}</span>
        </div>
        <span class="cta">${esc(post.cta || "Shop now")} &rarr;</span>
      </div>
      <div class="meta">
        <span>${esc(BRAND.handle)}</span>
        <span class="pink">${esc(BRAND.site)}</span>
      </div>
    </div>
  </div>
</body>
</html>`;
}
