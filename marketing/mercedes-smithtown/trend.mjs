/**
 * Shared templates for the trend-format Reels/TikToks (build-viral.mjs,
 * build-vol4.mjs): headlines in the website's type, the MK tag, numbered picks, photo and
 * clip scenes, and the end card, all timed to the 118 BPM "showroom" bed.
 */
import { PEARL, SMOKE, PETAL, HANDLE, STORE, img, endCard } from './lib.mjs';

// Scene lengths in beats. buildReel overlaps scenes by its 0.35s cross-fade,
// so each scene gets that back to keep every cut on the beat.
export const BEAT = 60 / 118;
export const beats = n => +(n * BEAT + 0.35).toFixed(3);

export const PHONES = 'Work 631.366.6417 · Cell 347.853.4238';

// On-screen text skips emoji: the site's Bebas Neue / Playfair Display type carries the tone.
const plain = t => t.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').replace(/\s+/g, ' ').trim();
const lift = 'text-shadow:0 2px 18px rgba(0,0,0,.55)';

/**
 * Headline in the mkparrish.com hero style, near the top of the safe area:
 * Bebas Neue capitals, with the last of several lines set as the site's pink
 * Playfair Display italic accent.
 */
export const say = (lines, { top = 250, size = 62 } = {}) => {
  const head = lines.length > 1 ? lines.slice(0, -1) : lines;
  const accent = lines.length > 1 ? lines.at(-1) : '';
  return `
  <div style="position:absolute;left:64px;right:64px;top:${top}px;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center">
    <div class="head" style="font-size:${Math.round(size * 1.8)}px;line-height:.9;${lift}">${head.map(plain).join('<br>')}</div>
    ${accent ? `<div style="font-family:'Playfair Display';font-style:italic;font-weight:700;font-size:${Math.round(size * 0.95)}px;line-height:1.15;color:${PETAL};${lift}">${plain(accent)}</div>` : ''}
  </div>`;
};

/** Small MK tag above the Reels/TikTok caption area. */
export const tag = `
  <div style="position:absolute;left:56px;bottom:470px;display:flex;align-items:baseline;gap:12px;background:rgba(8,8,8,.62);padding:10px 20px 8px;border-left:4px solid ${PETAL}">
    <b style="font-family:'Bebas Neue';font-weight:400;font-size:34px;letter-spacing:.06em;color:${PEARL}">MK</b>
    <span style="font-size:22px;color:${PETAL}">${HANDLE}</span>
    <span style="font-size:16px;letter-spacing:.14em;text-transform:uppercase;color:${SMOKE}">${STORE}</span>
  </div>`;

/** Big pink number with the model under it, for ranked/pick-one scenes. */
export const pick = (n, model) => `
  <div style="position:absolute;left:64px;right:64px;top:210px;display:flex;flex-direction:column;align-items:center;gap:6px">
    <div class="head" style="font-size:230px;color:${PETAL};line-height:.85;text-shadow:0 6px 30px rgba(0,0,0,.45)">${String(n).padStart(2, '0')}</div>
    <div style="font-family:'Playfair Display';font-style:italic;font-weight:700;font-size:58px;color:${PEARL};${lift}">${plain(model)}</div>
  </div>`;

/** Full-bleed 9:16 photo scene. */
export const still = (photo, pos, over) => `<div class="frame" style="width:1080px;height:1920px">
  <img class="photo" src="${img(photo)}" style="object-position:${pos}">
  <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.72) 0%, rgba(8,8,8,0) 36%, rgba(8,8,8,0) 66%, rgba(8,8,8,.5) 100%)"></div>
  ${over}${tag}
</div>`;

/** Photo set low over a blurred copy of itself, leaving the top clear for a number that won't sit on the bow.
 *  No MK tag here: it would land on the grille. */
export const lifted = (photo, pos, over) => `<div class="frame" style="width:1080px;height:1920px">
  <img class="photo" src="${img(photo)}" style="object-position:${pos};filter:blur(36px) brightness(.55);transform:scale(1.15)">
  <img src="${img(photo)}" style="position:absolute;left:0;top:560px;width:1080px;height:1440px;object-fit:cover;object-position:${pos}">
  <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.35) 0%, rgba(8,8,8,0) 25%)"></div>
  ${over}
</div>`;

/** Transparent overlay for a clip scene. */
export const over = html => `<div style="width:1080px;height:1920px;position:relative;font-family:'DM Sans'">
  <div style="position:absolute;inset:0 0 auto 0;height:760px;background:linear-gradient(180deg, rgba(8,8,8,.72), rgba(8,8,8,0))"></div>
  ${html}${tag}
</div>`;

export const end = ({ kicker, head, sub = PHONES, action = ['DM “MK”', HANDLE] }) => endCard({
  w: 1080, h: 1920, kicker, head, sub, action, padY: 260, sigBottom: 400, mark: '',
});

/** Whole photo fitted to the width over a blurred copy, for landscape shots a 9:16 crop would cut. */
export const fitted = (photo, over, top = 600) => `<div class="frame" style="width:1080px;height:1920px">
  <img class="photo" src="${img(photo)}" style="filter:blur(36px) brightness(.5);transform:scale(1.15)">
  <img src="${img(photo)}" style="position:absolute;left:0;top:${top}px;width:1080px;height:auto">
  ${over}${tag}
</div>`;
