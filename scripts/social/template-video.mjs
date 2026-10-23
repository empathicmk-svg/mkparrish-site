// ─────────────────────────────────────────────────────────────────────────────
// Animated reel template (1080×1920) — heavily stylized, motion-throughout.
//
// Three acts inside one clip:
//   1. Entrance  (0–2.6s)  glow bloom, kinetic headline, bullets, price + CTA
//   2. Hold      (2.6–4.2s) continuous aurora drift, accent shimmer, CTA pulse
//   3. CTA card  (4.2–6s)   full-screen takeover: SHOP THE EBOOKS → the site
//
// A petal "→ mkparrish.com/shop" ticker is pinned the whole time, so the
// website/shop CTA is on screen from frame one.
//
// All animations are CSS with `animation-play-state:paused; fill:both`, so the
// frame grabber scrubs deterministically via Web-Animations `currentTime`.
// Infinite pulses are fine — currentTime maps into the current iteration.
// ─────────────────────────────────────────────────────────────────────────────

import { BRAND } from "./catalog.mjs";
import { FONT_CSS } from "./fonts.mjs";

export const VIDEO = { w: 1080, h: 1920, durationMs: 6000, fps: 24 };

const P = {
  void: "#080808", petal: "#F2AFC6", blush: "#F7C9D9",
  pearl: "#F5F5F0", smoke: "#B8B8B8", iron: "#7A7A7A",
};

const esc = (s = "") => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const accent = (s) => esc(s).replace(/\*([^*]+)\*/g, `<span class="accent">$1</span>`);

function headlineSize(hook) {
  const longest = Math.max(...hook.split("\n").map((l) => l.replace(/\*/g, "").length));
  if (longest <= 14) return 150;
  if (longest <= 18) return 128;
  if (longest <= 24) return 108;
  if (longest <= 30) return 92;
  return 78;
}

export function renderVideo(post) {
  const { w, h } = VIDEO;
  const hookPx = headlineSize(post.hook);
  const lines = post.hook.split("\n").map((l, i) =>
    `<span class="line anim" style="animation-delay:${550 + i * 150}ms">${accent(l)}</span>`
  ).join("");
  const bullets = (post.bullets || []).map((b, i) =>
    `<li class="anim" style="animation-delay:${1450 + i * 150}ms"><span class="tick"></span><span>${esc(b)}</span></li>`
  ).join("");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8" /><style>
${FONT_CSS}
*{margin:0;padding:0;box-sizing:border-box}
/* Every animation holds its first/last frame so the frame-grabber can scrub to
   any timestamp deterministically (overrides the animation shorthand fill:none). */
*{animation-fill-mode:both!important}
html,body{width:${w}px;height:${h}px}
body{position:relative;overflow:hidden;background:${P.void};color:${P.pearl};font-family:"DM Sans",sans-serif;-webkit-font-smoothing:antialiased}

/* ── keyframes ───────────────────────────────────────────────────────────── */
@keyframes up{from{opacity:0;transform:translateY(48px)}to{opacity:1;transform:translateY(0)}}
@keyframes inLeft{from{opacity:0;transform:translateX(-36px)}to{opacity:1;transform:translateX(0)}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes pop{0%{opacity:0;transform:scale(.8)}70%{opacity:1;transform:scale(1.05)}100%{opacity:1;transform:scale(1)}}
@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
/* continuous, full-duration motion */
@keyframes auroraA{0%{transform:translate(-6%,-4%) scale(1)}50%{transform:translate(6%,3%) scale(1.12)}100%{transform:translate(-4%,-2%) scale(1.04)}}
@keyframes auroraB{0%{transform:translate(5%,4%) scale(1.05)}50%{transform:translate(-6%,-3%) scale(1.15)}100%{transform:translate(4%,2%) scale(1.06)}}
@keyframes drift{from{transform:scale(1.015)}to{transform:scale(1.05)}}
@keyframes grain{0%{transform:translate(0,0)}25%{transform:translate(-2%,1%)}50%{transform:translate(1%,-2%)}75%{transform:translate(-1%,2%)}100%{transform:translate(2%,-1%)}}
/* loops (infinite, scrubbed by currentTime) */
@keyframes shimmer{0%,100%{text-shadow:0 0 0 rgba(242,175,198,0)}50%{text-shadow:0 0 34px rgba(242,175,198,.65)}}
@keyframes pulseBtn{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(242,175,198,.55)}50%{transform:scale(1.045);box-shadow:0 0 46px 6px rgba(242,175,198,.5)}}
@keyframes arrow{0%,100%{transform:translateX(0)}50%{transform:translateX(12px)}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes cardUp{0%{opacity:0;transform:translateY(70px)}100%{opacity:1;transform:translateY(0)}}
@keyframes ring{0%{opacity:.6;transform:scale(.6)}100%{opacity:0;transform:scale(1.5)}}

.anim{animation-play-state:paused;animation-fill-mode:both;animation-timing-function:cubic-bezier(.16,1,.3,1)}
.loop{animation-play-state:paused;animation-fill-mode:both;animation-timing-function:ease-in-out;animation-iteration-count:infinite}

/* ── background ──────────────────────────────────────────────────────────── */
.aur{position:absolute;border-radius:50%;filter:blur(8px);mix-blend-mode:screen;animation-play-state:paused;animation-fill-mode:both;animation-timing-function:ease-in-out}
.aurA{left:-10%;top:-12%;width:${Math.round(w*1.3)}px;height:${Math.round(h*0.62)}px;background:radial-gradient(ellipse at center,rgba(242,175,198,.30),transparent 60%);animation:auroraA 6000ms}
.aurB{right:-18%;bottom:6%;width:${Math.round(w*1.2)}px;height:${Math.round(h*0.55)}px;background:radial-gradient(ellipse at center,rgba(247,201,217,.18),transparent 62%);animation:auroraB 6000ms}
.grain{position:absolute;inset:0;opacity:.05;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
.frame{position:absolute;inset:40px;border:1px solid rgba(242,175,198,0.16)}
.scene{position:absolute;inset:0;animation:drift 6000ms linear;animation-play-state:paused;animation-fill-mode:both}

/* ── stage ───────────────────────────────────────────────────────────────── */
.stage{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;padding:96px 96px 150px}
.top{display:flex;justify-content:space-between;align-items:flex-start}
.brand{font-family:"Bebas Neue",sans-serif;letter-spacing:.18em;font-size:34px}
.index{font-weight:500;letter-spacing:.35em;font-size:20px;color:${P.iron}}
.kicker{margin-top:60px;align-self:flex-start;display:inline-flex;align-items:center;gap:14px;border:1px solid rgba(242,175,198,0.5);color:${P.petal};padding:14px 22px;border-radius:999px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;font-size:21px;animation:inLeft 600ms;animation-delay:300ms}
.kicker .dot{width:9px;height:9px;background:${P.petal};border-radius:50%}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center}
.quote{font-family:"Playfair Display",serif;font-size:240px;line-height:0;color:rgba(242,175,198,0.14);height:60px;animation:fade 600ms;animation-delay:450ms}
h1{font-family:"Bebas Neue",sans-serif;font-size:${hookPx}px;line-height:.92;text-transform:uppercase;margin-top:26px;display:flex;flex-direction:column}
h1 .line{display:block;animation:up 700ms}
h1 .accent{color:${P.petal};animation:shimmer 2200ms;animation-play-state:paused;animation-fill-mode:both;animation-iteration-count:infinite;animation-timing-function:ease-in-out}
.sub{font-family:"Playfair Display",serif;font-style:italic;color:${P.blush};font-size:42px;line-height:1.3;margin-top:34px;animation:up 700ms;animation-delay:1250ms}
ul{list-style:none;margin-top:50px;display:flex;flex-direction:column;gap:22px}
li{display:flex;gap:20px;align-items:flex-start;font-weight:300;font-size:30px;line-height:1.4;color:${P.smoke};animation:inLeft 600ms}
li .tick{flex:0 0 auto;margin-top:14px;width:14px;height:14px;background:${P.petal};transform:rotate(45deg)}
.bottom{margin-top:50px}
.rule{height:1px;background:linear-gradient(to right,rgba(242,175,198,.55),transparent);transform-origin:left;animation:grow 700ms;animation-delay:2100ms}
.cta-row{display:flex;align-items:center;justify-content:space-between;margin-top:34px;gap:24px}
.price{font-family:"Bebas Neue",sans-serif;font-size:96px;line-height:.9;color:#fff;animation:pop 600ms;animation-delay:2300ms}
.cta{font-family:"Bebas Neue",sans-serif;letter-spacing:.08em;font-size:40px;background:${P.petal};color:${P.void};padding:24px 40px;display:inline-flex;align-items:center;gap:14px;white-space:nowrap;animation:pop 600ms cubic-bezier(.16,1,.3,1) 2300ms both,pulseBtn 1600ms ease-in-out 2900ms infinite both}
.cta .ar{display:inline-block;animation:arrow 1600ms;animation-play-state:paused;animation-fill-mode:both;animation-iteration-count:infinite;animation-timing-function:ease-in-out}

/* pinned shop ticker — CTA on screen the entire clip */
.ticker{position:absolute;left:0;right:0;bottom:70px;z-index:3;overflow:hidden;white-space:nowrap;-webkit-mask-image:linear-gradient(to right,transparent,#000 8%,#000 92%,transparent)}
.ticker .run{display:inline-block;animation:ticker 6000ms linear;animation-play-state:paused;animation-fill-mode:both}
.ticker b{font-family:"Bebas Neue",sans-serif;letter-spacing:.14em;font-size:30px;color:${P.petal};margin:0 28px;opacity:.9}
.ticker i{color:${P.iron};font-style:normal;margin:0 6px}

/* ── act 3: shop end-card ────────────────────────────────────────────────── */
.endcard{position:absolute;inset:0;z-index:5;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 90px;background:radial-gradient(ellipse at 50% 28%,rgba(242,175,198,.20),transparent 60%),${P.void};animation:cardUp 700ms;animation-delay:4200ms}
.endcard .eyebrow{font-family:"Bebas Neue",sans-serif;letter-spacing:.4em;font-size:26px;color:${P.iron};animation:fade 600ms;animation-delay:4400ms}
.endcard h2{font-family:"Bebas Neue",sans-serif;font-size:188px;line-height:.86;text-transform:uppercase;margin-top:30px;animation:up 700ms;animation-delay:4550ms}
.endcard h2 .accent{color:${P.petal};display:block;animation:shimmer 1800ms;animation-play-state:paused;animation-fill-mode:both;animation-iteration-count:infinite}
.endcard .from{margin-top:30px;font-family:"Playfair Display",serif;font-style:italic;font-size:46px;color:${P.blush};animation:fade 600ms;animation-delay:4750ms}
.bigcta{position:relative;margin-top:64px;font-family:"Bebas Neue",sans-serif;letter-spacing:.06em;font-size:62px;background:${P.petal};color:${P.void};padding:36px 70px;display:inline-flex;align-items:center;gap:20px;animation:pulseBtn 1500ms;animation-play-state:paused;animation-fill-mode:both;animation-iteration-count:infinite}
.bigcta .ar{display:inline-block;animation:arrow 1500ms;animation-play-state:paused;animation-fill-mode:both;animation-iteration-count:infinite}
.url{margin-top:54px;font-family:"Bebas Neue",sans-serif;font-size:72px;letter-spacing:.02em;color:#fff;animation:up 700ms;animation-delay:4900ms}
.url .px{color:${P.petal}}
.uline{height:3px;width:62%;margin:18px auto 0;background:linear-gradient(to right,transparent,${P.petal},transparent);transform-origin:center;animation:grow 700ms;animation-delay:5100ms}
.endcard .bib{margin-top:46px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;font-size:26px;color:${P.smoke};animation:fade 700ms;animation-delay:5200ms}
.endcard .bib .pink{color:${P.petal}}
.endcard .ring{position:absolute;left:50%;top:38%;width:520px;height:520px;margin:-260px 0 0 -260px;border:2px solid rgba(242,175,198,.4);border-radius:50%;animation:ring 1800ms;animation-play-state:paused;animation-fill-mode:both;animation-iteration-count:infinite}
</style></head><body>
<div class="aur aurA"></div>
<div class="aur aurB"></div>
<div class="grain"></div>
<div class="scene"><div class="frame"></div>
  <div class="stage">
    <div class="top"><div class="brand anim" style="animation-name:up;animation-duration:600ms;animation-delay:100ms">${esc(BRAND.name)}</div><div class="index anim" style="animation-name:up;animation-duration:600ms;animation-delay:160ms">${esc(post.n || "")} / THE SHELF</div></div>
    <span class="kicker anim"><span class="dot"></span>${esc(post.kicker || "")}</span>
    <div class="mid">
      <div class="quote anim"></div>
      <h1>${lines}</h1>
      ${post.sub ? `<p class="sub anim">${esc(post.sub)}</p>` : ""}
      ${bullets ? `<ul>${bullets}</ul>` : ""}
    </div>
    <div class="bottom">
      <div class="rule anim"></div>
      <div class="cta-row"><span class="price anim">${esc(post.price || "")}</span><span class="cta anim">${esc(post.cta || "Shop now")} <span class="ar">&rarr;</span></span></div>
    </div>
  </div>
</div>

<div class="ticker"><span class="run loop">${
  Array.from({ length: 8 }).map(() =>
    `<b>SHOP THE EBOOKS <i>&middot;</i> ${esc(BRAND.shop)} <i>&middot;</i> LINK IN BIO</b>`
  ).join("")
}</span></div>

<div class="endcard anim">
  <div class="ring loop"></div>
  <div class="eyebrow anim">${esc(BRAND.name)} &middot; THE SHELF</div>
  <h2 class="anim">SHOP THE<span class="accent">EBOOKS</span></h2>
  <p class="from anim">${esc(post.price || "")} &middot; instant download</p>
  <span class="bigcta loop">${esc(post.cta || "Shop now")} <span class="ar">&rarr;</span></span>
  <div class="url anim"><span class="px">&#9656;</span> ${esc(BRAND.shop)}</div>
  <div class="uline anim"></div>
  <div class="bib anim">Tap the <span class="pink">link in bio</span> &middot; ${esc(BRAND.handle)}</div>
</div>
</body></html>`;
}
