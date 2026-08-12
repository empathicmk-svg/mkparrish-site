// ─────────────────────────────────────────────────────────────────────────────
// Carousel renderer — turns one offer into a swipeable multi-slide set
// (1080×1350 each). Slide order:
//   1            cover        — kicker + hook
//   2 … n-1      value slides — one bullet per slide, big and numbered
//   n            close        — price + CTA + handle
// ─────────────────────────────────────────────────────────────────────────────

import { BRAND } from "./catalog.mjs";
import { FONT_CSS } from "./fonts.mjs";

export const SLIDE = { w: 1080, h: 1350 };

const P = {
  void: "#080808", carbon: "#1A1A1A", petal: "#F2AFC6", blush: "#F7C9D9",
  pearl: "#F5F5F0", smoke: "#B8B8B8", iron: "#7A7A7A",
};

const esc = (s = "") => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const hookHTML = (h) => esc(h).replace(/\n/g, "<br>").replace(/\*([^*]+)\*/g, `<span class="accent">$1</span>`);

// Each slide's body is built here; chrome (fonts, frame, footer) is shared.
function slideBody(post, i, total) {
  // cover
  if (i === 0) {
    return `
      <span class="kicker"><span class="dot"></span>${esc(post.kicker || "")}</span>
      <div class="grow center">
        <div class="quote">&ldquo;</div>
        <h1 class="cover">${hookHTML(post.hook)}</h1>
        ${post.sub ? `<p class="sub">${esc(post.sub)}</p>` : ""}
      </div>
      <div class="swipe">Swipe &rarr;</div>`;
  }
  // close
  if (i === total - 1) {
    return `
      <span class="kicker"><span class="dot"></span>${esc(post.kicker || "")}</span>
      <div class="grow center">
        <p class="closeline">${esc(post.cta || "Get it")}</p>
        <div class="bigprice">${esc(post.price || "")}</div>
        <span class="cta">${esc(post.cta || "Shop now")} &rarr;</span>
      </div>
      <div class="meta"><span>${esc(BRAND.handle)}</span><span class="pink">${esc(BRAND.site)}</span></div>`;
  }
  // value slide
  const bullet = post.bullets[i - 1] || "";
  const idx = String(i).padStart(2, "0");
  return `
    <div class="vtop"><span class="vidx">${idx}</span><span class="vof">/ ${String(total - 2).padStart(2, "0")}</span></div>
    <div class="grow center">
      <p class="vbullet">${esc(bullet)}</p>
    </div>
    <div class="meta"><span>${esc(post.kicker || "")}</span><span class="pink">${esc(BRAND.site)}</span></div>`;
}

export function renderSlide(post, i, total) {
  const { w, h } = SLIDE;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8" />
<style>
  ${FONT_CSS}
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${w}px;height:${h}px}
  body{position:relative;overflow:hidden;background:${P.void};color:${P.pearl};font-family:"DM Sans",sans-serif;-webkit-font-smoothing:antialiased}
  .glow{position:absolute;left:50%;top:-14%;transform:translateX(-50%);width:${Math.round(w*1.2)}px;height:${Math.round(h*0.7)}px;background:radial-gradient(ellipse at top,rgba(242,175,198,0.18),transparent 62%)}
  .frame{position:absolute;inset:34px;border:1px solid rgba(242,175,198,0.16)}
  .stage{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;padding:84px}
  .grow{flex:1;display:flex;flex-direction:column}
  .center{justify-content:center}
  .kicker{align-self:flex-start;display:inline-flex;align-items:center;gap:14px;border:1px solid rgba(242,175,198,0.5);color:${P.petal};padding:13px 22px;border-radius:999px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;font-size:20px}
  .kicker .dot{width:9px;height:9px;background:${P.petal};border-radius:50%}
  .quote{font-family:"Playfair Display",serif;font-size:200px;line-height:0;color:rgba(242,175,198,0.14);height:54px}
  h1.cover{font-family:"Bebas Neue",Impact,sans-serif;font-size:130px;line-height:0.9;text-transform:uppercase;margin-top:30px}
  h1.cover .accent{color:${P.petal}}
  .sub{font-family:"Playfair Display",serif;font-style:italic;color:${P.blush};font-size:40px;margin-top:30px}
  .swipe{align-self:flex-end;font-family:"Bebas Neue",sans-serif;letter-spacing:.1em;font-size:38px;color:${P.petal}}
  .vtop{display:flex;align-items:baseline;gap:18px}
  .vidx{font-family:"Bebas Neue",sans-serif;font-size:120px;line-height:0.8;color:${P.petal}}
  .vof{font-weight:500;letter-spacing:.3em;color:${P.iron};font-size:26px}
  .vbullet{font-family:"Playfair Display",serif;font-weight:500;font-size:66px;line-height:1.18;color:${P.pearl};max-width:${w-168}px}
  .closeline{font-family:"Playfair Display",serif;font-style:italic;color:${P.smoke};font-size:44px}
  .bigprice{font-family:"Bebas Neue",sans-serif;font-size:200px;line-height:0.85;color:#fff;margin:18px 0 40px}
  .cta{align-self:flex-start;font-family:"Bebas Neue",sans-serif;letter-spacing:.08em;font-size:44px;background:${P.petal};color:${P.void};padding:24px 44px;display:inline-flex;gap:14px}
  .meta{display:flex;justify-content:space-between;font-weight:500;letter-spacing:.2em;text-transform:uppercase;font-size:20px;color:${P.iron}}
  .meta .pink{color:${P.petal}}
</style></head><body>
  <div class="glow"></div><div class="frame"></div>
  <div class="stage">${slideBody(post, i, total)}</div>
</body></html>`;
}

// Cover + one slide per bullet + close.
export const slideCount = (post) => 2 + (post.bullets ? post.bullets.length : 0);
