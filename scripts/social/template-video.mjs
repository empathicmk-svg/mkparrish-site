// ─────────────────────────────────────────────────────────────────────────────
// Animated reel template (1080×1920). Same look as the static post, with a
// timed entrance: glow pulse, staggered headline lines, bullets, price & CTA.
//
// All animations are `paused` with `fill: both`, so the frame grabber can scrub
// to any timestamp via Web Animations `currentTime` and capture deterministically.
// ─────────────────────────────────────────────────────────────────────────────

import { BRAND } from "./catalog.mjs";
import { FONT_CSS } from "./fonts.mjs";
import { HEART, HEART_CSS } from "./heart.mjs";

export const VIDEO = { w: 1080, h: 1920, durationMs: 5000, fps: 30 };

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
    `<span class="line" style="animation-delay:${600 + i * 150}ms">${accent(l)}</span>`
  ).join("");
  const bullets = (post.bullets || []).map((b, i) =>
    `<li style="animation-delay:${1500 + i * 160}ms">${HEART("sm")}<span>${esc(b)}</span></li>`
  ).join("");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8" /><style>
${FONT_CSS}
${HEART_CSS}
.mid .heart.md{margin-bottom:18px}
li .heart{flex:0 0 auto;margin-top:8px}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${w}px;height:${h}px}
body{position:relative;overflow:hidden;background:${P.void};color:${P.pearl};font-family:"DM Sans",sans-serif;-webkit-font-smoothing:antialiased}
@keyframes pulse{0%{opacity:.55;transform:translateX(-50%) scale(1)}100%{opacity:1;transform:translateX(-50%) scale(1.06)}}
@keyframes up{from{opacity:0;transform:translateY(46px)}to{opacity:1;transform:translateY(0)}}
@keyframes inLeft{from{opacity:0;transform:translateX(-34px)}to{opacity:1;transform:translateX(0)}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes pop{0%{opacity:0;transform:scale(.82)}70%{opacity:1;transform:scale(1.04)}100%{opacity:1;transform:scale(1)}}
@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes drift{from{transform:scale(1)}to{transform:scale(1.035)}}
.anim{animation-play-state:paused;animation-fill-mode:both;animation-timing-function:cubic-bezier(.16,1,.3,1)}
.glow{position:absolute;left:50%;top:-12%;transform:translateX(-50%);width:${Math.round(w*1.1)}px;height:${Math.round(h*0.6)}px;background:radial-gradient(ellipse at top,rgba(242,175,198,0.30),transparent 64%);animation:pulse 5000ms linear;animation-play-state:paused;animation-fill-mode:both}
.frame{position:absolute;inset:40px;border:1px solid rgba(242,175,198,0.16)}
.scene{position:absolute;inset:0;animation:drift 5000ms linear;animation-play-state:paused;animation-fill-mode:both}
.stage{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;padding:96px}
.top{display:flex;justify-content:space-between;align-items:flex-start}
.brand{font-family:"Bebas Neue",sans-serif;letter-spacing:.18em;font-size:34px}
.index{font-weight:500;letter-spacing:.35em;font-size:20px;color:${P.iron}}
.kicker{margin-top:64px;align-self:flex-start;display:inline-flex;align-items:center;gap:14px;border:1px solid rgba(242,175,198,0.5);color:${P.petal};padding:14px 22px;border-radius:999px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;font-size:21px;animation:inLeft 600ms;animation-delay:300ms}
.kicker .dot{width:9px;height:9px;background:${P.petal};border-radius:50%}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center}
.quote{font-family:"Playfair Display",serif;font-size:240px;line-height:0;color:rgba(242,175,198,0.14);height:60px;animation:fade 600ms;animation-delay:500ms}
h1{font-family:"Bebas Neue",sans-serif;font-size:${hookPx}px;line-height:.92;text-transform:uppercase;margin-top:26px;display:flex;flex-direction:column}
h1 .line{display:block;animation:up 700ms}
h1 .accent{color:${P.petal}}
.sub{font-family:"Playfair Display",serif;font-style:italic;color:${P.blush};font-size:42px;line-height:1.3;margin-top:34px;animation:up 700ms;animation-delay:1300ms}
ul{list-style:none;margin-top:52px;display:flex;flex-direction:column;gap:22px}
li{display:flex;gap:20px;align-items:flex-start;font-weight:300;font-size:30px;line-height:1.4;color:${P.smoke};animation:inLeft 600ms}
li .tick{flex:0 0 auto;margin-top:14px;width:14px;height:14px;background:${P.petal};transform:rotate(45deg)}
.bottom{margin-top:56px}
.rule{height:1px;background:linear-gradient(to right,rgba(242,175,198,.55),transparent);transform-origin:left;animation:grow 700ms;animation-delay:2200ms}
.cta-row{display:flex;align-items:center;justify-content:space-between;margin-top:34px;gap:24px}
.price{font-family:"Bebas Neue",sans-serif;font-size:96px;line-height:.9;color:#fff;animation:pop 600ms;animation-delay:2400ms}
.cta{font-family:"Bebas Neue",sans-serif;letter-spacing:.08em;font-size:40px;background:${P.petal};color:${P.void};padding:24px 40px;display:inline-flex;align-items:center;gap:14px;white-space:nowrap;animation:pop 600ms;animation-delay:2600ms}
.meta{display:flex;justify-content:space-between;margin-top:38px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;font-size:20px;color:${P.iron};animation:fade 700ms;animation-delay:2850ms}
.meta .pink{color:${P.petal}}
</style></head><body>
<div class="glow"></div>
<div class="scene"><div class="frame"></div>
  <div class="stage">
    <div class="top"><div class="brand anim" style="animation-name:up;animation-duration:600ms;animation-delay:100ms">${esc(BRAND.name)}</div><div class="index anim" style="animation-name:up;animation-duration:600ms;animation-delay:160ms">${esc(post.n || "")} / THE SHELF</div></div>
    <span class="kicker anim"><span class="dot"></span>${esc(post.kicker || "")}</span>
    <div class="mid">
      <div class="anim" style="animation-name:pop;animation-duration:600ms;animation-delay:450ms;margin-bottom:18px">${HEART("md")}</div>
      <h1>${lines.replace(/class="line"/g, 'class="line anim"')}</h1>
      ${post.sub ? `<p class="sub anim">${esc(post.sub)}</p>` : ""}
      ${bullets ? `<ul>${bullets.replace(/<li /g, '<li class="anim" ')}</ul>` : ""}
    </div>
    <div class="bottom">
      <div class="rule anim"></div>
      <div class="cta-row"><span class="price anim">${esc(post.price || "")}</span><span class="cta anim">${esc(post.cta || "Shop now")} &rarr;</span></div>
      <div class="meta anim"><span>${esc(BRAND.handle)}</span><span class="pink">${esc(BRAND.site)}</span></div>
    </div>
  </div>
</div>
</body></html>`;
}
