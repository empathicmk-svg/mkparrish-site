#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — trend-format Reels/TikToks.
 *
 * Six short videos cut from MK's own photos and clips, each built on a format
 * that's trending this fall (pick-one, costume reveal, fall edit, day in my
 * life, rate-it, things that just make sense). Text uses the native
 * caption-box look, and every cut lands on the beat of the "showroom" bed
 * (118 BPM) so a trending sound picked in-app lines up too.
 * captions-viral.md pairs each one with its sound and captions.
 *
 * Output: output/mercedes-smithtown/viral/
 * Run:    node marketing/mercedes-smithtown/build-viral.mjs && node scripts/add-music.mjs
 */
import { chromium } from 'playwright';
import {
  VOID, PEARL, SMOKE, PETAL, HANDLE, STORE, img, endCard, render, buildReel, dir, cleanup,
} from './lib.mjs';

// Scene lengths in beats. buildReel overlaps scenes by its 0.35s cross-fade,
// so each scene gets that back to keep every cut on the beat.
const BEAT = 60 / 118;
const beats = n => +(n * BEAT + 0.35).toFixed(3);

const PHONES = 'Work 631.366.6417 · Cell 347.853.4238';

// ── Templates ──────────────────────────────────────────────────────────────────

/** Native-style caption boxes, one per line, centred near the top of the safe area. */
const say = (lines, { top = 250, size = 62, dark = false } = {}) => `
  <div style="position:absolute;left:64px;right:64px;top:${top}px;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center">
    ${lines.map(l => `<span style="background:${dark ? VOID : PEARL};color:${dark ? PEARL : VOID};font-family:'DM Sans';font-weight:700;font-size:${size}px;line-height:1.18;padding:8px 24px 10px;border-radius:16px">${l}</span>`).join('')}
  </div>`;

/** Small MK tag above the Reels/TikTok caption area. */
const tag = `
  <div style="position:absolute;left:56px;bottom:470px;display:flex;align-items:baseline;gap:12px;background:rgba(8,8,8,.62);padding:10px 20px 8px;border-left:4px solid ${PETAL}">
    <b style="font-family:'Bebas Neue';font-weight:400;font-size:34px;letter-spacing:.06em;color:${PEARL}">MK</b>
    <span style="font-size:22px;color:${PETAL}">${HANDLE}</span>
    <span style="font-size:16px;letter-spacing:.14em;text-transform:uppercase;color:${SMOKE}">${STORE}</span>
  </div>`;

/** Big pink number with the model under it, for ranked/pick-one scenes. */
const pick = (n, model) => `
  <div style="position:absolute;left:64px;right:64px;top:210px;display:flex;flex-direction:column;align-items:center;gap:6px">
    <div class="head" style="font-size:230px;color:${PETAL};line-height:.85;text-shadow:0 6px 30px rgba(0,0,0,.45)">${String(n).padStart(2, '0')}</div>
    <span style="background:${PEARL};color:${VOID};font-weight:700;font-size:52px;padding:6px 24px 8px;border-radius:14px">${model}</span>
  </div>`;

/** Full-bleed 9:16 photo scene. */
const still = (photo, pos, over) => `<div class="frame" style="width:1080px;height:1920px">
  <img class="photo" src="${img(photo)}" style="object-position:${pos}">
  <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.45) 0%, rgba(8,8,8,0) 30%, rgba(8,8,8,0) 66%, rgba(8,8,8,.5) 100%)"></div>
  ${over}${tag}
</div>`;

/** Photo set low over a blurred copy of itself, leaving the top clear for a number that won't sit on the bow.
 *  No MK tag here: it would land on the grille. */
const lifted = (photo, pos, over) => `<div class="frame" style="width:1080px;height:1920px">
  <img class="photo" src="${img(photo)}" style="object-position:${pos};filter:blur(36px) brightness(.55);transform:scale(1.15)">
  <img src="${img(photo)}" style="position:absolute;left:0;top:560px;width:1080px;height:1440px;object-fit:cover;object-position:${pos}">
  <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.35) 0%, rgba(8,8,8,0) 25%)"></div>
  ${over}
</div>`;

/** Transparent overlay for a clip scene. */
const over = html => `<div style="width:1080px;height:1920px;position:relative;font-family:'DM Sans'">
  <div style="position:absolute;inset:0 0 auto 0;height:640px;background:linear-gradient(180deg, rgba(8,8,8,.45), rgba(8,8,8,0))"></div>
  ${html}${tag}
</div>`;

const end = ({ kicker, head, sub = PHONES, action = ['DM “MK”', HANDLE] }) => endCard({
  w: 1080, h: 1920, kicker, head, sub, action, padY: 260, sigBottom: 400, mark: '',
});

// ── Reels ──────────────────────────────────────────────────────────────────────
const REELS = [
  {
    name: '01-pick-one',
    scenes: [
      { html: still('g63-matte-showroom.jpg', '50% center', say(['Pick one.', 'No overthinking. 👇'], { size: 70 })), dur: beats(4) },
      ...[
        ['sedan-silver-stars.jpg', 'center 60%', 'The all-new CLA'],
        ['amg-gt-front-white.jpg', 'center 62%', 'AMG GT 4-Door Coupé'],
        ['amg-suv-black-front.jpg', 'center 62%', 'Mercedes-AMG GLE'],
        ['g63-matte-showroom.jpg', '48% center', 'G-Class'],
        ['amg-matte-white-front.jpg', 'center 60%', 'Matte AMG E-Class'],
        ['gls-white-front.jpg', 'center 60%', 'GLS · 7 seats'],
      ].map(([photo, pos, model], i) => ({ html: lifted(photo, pos, pick(i + 1, model)), dur: beats(3) })),
      { html: end({ kicker: 'Comment your number', head: 'Which one<br>is <em>yours?</em>' }), dur: beats(6), still: true },
    ],
  },
  {
    name: '02-halloween-costume',
    scenes: [
      { clip: 'matte-amg-walkaround.mp4', start: 1, html: over(say(['My Halloween costume', 'this year: 🎃'], { size: 66 })), dur: beats(4) },
      { html: still('mk-selfie-blazer-tall.jpg', 'center 30%', say(['Mercedes saleswoman. 💅'], { size: 64 })), dur: beats(6) },
      { html: still('suv-black-front.jpg', 'center 45%', say(['The scariest part?', 'You’ll want two. 🖤'], { size: 64 })), dur: beats(6) },
      { html: end({ kicker: 'Trick or treat yourself', head: 'Ask for<br><em>MK.</em>' }), dur: beats(6), still: true },
    ],
  },
  {
    name: '03-fell-in-love-in-october',
    scenes: [
      { html: still('suv-black-outdoor.jpg', '78% center', say(['we fell in love', 'in october 🍂'], { size: 66 })), dur: beats(6) },
      { clip: 'glc-white-walkaround.mp4', start: 4.5, html: over(say(['a Long Island fall drive'], { size: 56 })), dur: beats(6) },
      { html: still('gle-street-fair.jpg', 'center 72%', say(['street fairs + a new GLE'], { size: 56 })), dur: beats(6) },
      { clip: 'cabriolet-walkaround.mp4', start: 15.5, html: over(say(['cognac leather season'], { size: 56 })), dur: beats(6) },
      { html: still('sedan-silver-daylight.jpg', 'center 55%', say(['and a pink bow on top 🎀'], { size: 56 })), dur: beats(6) },
      { html: end({ kicker: 'Mercedes-Benz of Smithtown', head: 'Come meet<br><em>yours.</em>' }), dur: beats(6), still: true },
    ],
  },
  {
    name: '04-day-in-my-life',
    scenes: [
      { html: still('mk-fit-check.jpg', '55% 20%', say(['day in my life:', 'Mercedes saleswoman 🖤'], { size: 60 })), dur: beats(5) },
      { clip: 'cle-graphite-walkaround.mp4', start: 2, html: over(say(['9:15 · first walkaround'], { size: 56 })), dur: beats(5) },
      { clip: 'matte-amg-walkaround.mp4', start: 13, html: over(say(['11:00 · “can I see the matte one?”'], { size: 50 })), dur: beats(5) },
      { clip: 'suv-interior-tour.mp4', start: 3, html: over(say(['1:30 · interior tour'], { size: 56 })), dur: beats(5) },
      { clip: 'parktronic-self-park.mp4', start: 4, html: over(say(['3:00 · showing off', 'the car that parks itself'], { size: 52 })), dur: beats(6) },
      { html: still('sedan-silver-stars.jpg', 'center 60%', say(['5:45 · pink bows on', 'tomorrow’s deliveries 🎀'], { size: 52 })), dur: beats(5) },
      { html: end({ kicker: 'Your turn', head: 'Come see<br><em>me.</em>' }), dur: beats(6), still: true },
    ],
  },
  {
    name: '05-rate-the-interior',
    scenes: [
      { html: still('cle-cognac-interior.jpg', 'center 60%', say(['Rate the interior', '1–10. Be honest. 👀'], { size: 62 })), dur: beats(5) },
      { clip: 'cabriolet-walkaround.mp4', start: 15.5, html: over(pick(1, 'CLE Cabriolet · cognac')), dur: beats(5) },
      { html: still('suv-interior-white.jpg', 'center 55%', pick(2, 'White leather SUV')), dur: beats(5) },
      { clip: 'suv-interior-tour.mp4', start: 9, html: over(pick(3, 'The screens at night')), dur: beats(5) },
      { html: end({ kicker: 'Comment your scores', head: 'Which one’s<br>a <em>10?</em>' }), dur: beats(6), still: true },
    ],
  },
  {
    name: '06-things-that-make-sense',
    scenes: [
      { html: still('suv-black-front.jpg', 'center 45%', say(['things that just', 'make sense:'], { size: 70 })), dur: beats(4) },
      { html: still('suv-black-front.jpg', 'center 45%', say(['black GLE + pink bow 🎀'], { size: 58 })), dur: beats(4) },
      { html: still('amg-matte-white-front.jpg', 'center 60%', say(['matte paint + AMG badge'], { size: 58 })), dur: beats(4) },
      { html: still('gls-white-front.jpg', 'center 60%', say(['7 seats + zero compromise'], { size: 58 })), dur: beats(4) },
      { clip: 'cabriolet-walkaround.mp4', start: 10, html: over(say(['October + top down'], { size: 58 })), dur: beats(4) },
      { html: still('mk-selfie-blazer-tall.jpg', 'center 30%', say(['a new Mercedes', '+ asking for MK 💅'], { size: 58 })), dur: beats(5) },
      { html: end({ kicker: 'Mercedes-Benz of Smithtown', head: 'Just makes<br><em>sense.</em>' }), dur: beats(6), still: true },
    ],
  },
];

// ── Render ─────────────────────────────────────────────────────────────────────
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const outDir = dir('viral');
for (const r of REELS) await buildReel(page, r, outDir);
await browser.close();
cleanup();
