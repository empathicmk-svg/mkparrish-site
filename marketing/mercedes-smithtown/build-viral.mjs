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
import { render, buildReel, dir, cleanup } from './lib.mjs';
import { beats, say, pick, still, lifted, over, end } from './trend.mjs';

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
      { html: still('g63-matte-showroom.jpg', '50% center', say(['Mercedes', 'saleswoman.'], { size: 64 })), dur: beats(6) },
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
      { html: still('store-front-fall.jpg', '42% center', say(['Day in my life', 'Mercedes saleswoman edition'], { size: 60 })), dur: beats(5) },
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
      { html: still('key-fob-desk.jpg', 'center 60%', say(['a new Mercedes', '+ asking for MK'], { size: 58 })), dur: beats(5) },
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
