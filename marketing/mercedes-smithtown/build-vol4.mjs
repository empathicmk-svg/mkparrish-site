#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — Volume 4: "Walk in with me".
 *
 * Six trend-format Reels/TikToks and four feed posts from MK's latest photos
 * and clips: the walk-in POV, a showroom fit check, a GLE walkaround, the
 * "BOO-tiful Mercedes" Halloween ghosts, fleet & member savings, and a
 * pray-on-it / sky's-the-limit motivation reel. captions-vol4.md has the
 * captions, sounds and posting plan.
 *
 * The delivery photo's plate and the customers' names are blurred in
 * media/delivery-glc-pink-bow.jpg; get the customers' OK before posting it.
 *
 * Output: output/mercedes-smithtown/vol4/{reels,feed}/
 * Run:    node marketing/mercedes-smithtown/build-vol4.mjs && node scripts/add-music.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import path from 'path';
import { HANDLE, STORE, hero, render, buildReel, dir, cleanup } from './lib.mjs';
import { beats, say, pick, still, lifted, fitted, over, end } from './trend.mjs';

const TAG = 'Ask for MK';

// ── Reels ──────────────────────────────────────────────────────────────────────
const REELS = [
  {
    name: '01-walk-in-with-me',
    scenes: [
      { html: still('store-front-fall.jpg', '42% center', say(['POV: you finally walk', 'into Mercedes 🖤'], { size: 64 })), dur: beats(5) },
      { clip: 'walk-in-entrance.mp4', start: 4.3, html: over(say(['St. James, NY 📍'])), dur: beats(4) },
      { clip: 'walk-in-entrance.mp4', start: 9.8, html: over(say(['doors open…'])), dur: beats(4) },
      { html: fitted('welcome-home-mat.jpg', say(['and the first thing', 'you see 🥹'], { size: 60 })), dur: beats(5) },
      { html: lifted('boo-ghosts.jpg', 'center 45%', say(['the ghosts agree 👻'], { top: 300 })), dur: beats(4) },
      { html: still('key-fob-desk.jpg', 'center 60%', say(['…and you leave', 'with these 🔑'], { size: 64 })), dur: beats(4) },
      { html: end({ kicker: STORE, head: 'Welcome<br><em>home.</em>' }), dur: beats(6), still: true },
    ],
  },
  {
    name: '02-fit-check',
    scenes: [
      { html: still('mk-fit-grey-plaid.jpg', 'center 30%', say(['Mercedes saleswoman', 'fit check 💅'], { size: 64 })), dur: beats(4) },
      ...[
        ['mk-fit-plaid.jpg', 'Plaid + off-shoulder'],
        ['mk-fit-bow-dress.jpg', 'Little black dress 🎀'],
        ['mk-fit-grey-plaid.jpg', 'Grey plaid'],
        ['mk-fit-beige.jpg', 'Silk + black trousers'],
      ].map(([photo, label], i) => ({ html: lifted(photo, 'center 25%', pick(i + 1, label)), dur: beats(4) })),
      { html: end({ kicker: 'Comment your number', head: 'Which fit<br><em>wins?</em>' }), dur: beats(6), still: true },
    ],
  },
  {
    name: '03-gle-walkaround',
    scenes: [
      { clip: 'gle-grey-walkaround.mp4', start: 0.2, html: over(say(['walk around this', 'GLE with me 🩶'], { size: 64 })), dur: beats(6) },
      { clip: 'gle-grey-walkaround.mp4', start: 4.8, html: over(say(['that side profile 😮‍💨'])), dur: beats(5) },
      { clip: 'gle-grey-walkaround.mp4', start: 10.6, html: over(say(['the back 👀'])), dur: beats(5) },
      { clip: 'gle-grey-walkaround.mp4', start: 15.9, html: over(say(['now step in…'])), dur: beats(6) },
      { html: end({ kicker: 'Mercedes-Benz GLE', head: 'Want the<br><em>full tour?</em>', action: ['DM “GLE”', HANDLE] }), dur: beats(6), still: true },
    ],
  },
  {
    name: '04-boo-tiful',
    scenes: [
      { html: lifted('boo-ghosts.jpg', 'center 45%', say(['“We can be happy again', 'with a BOO-tiful', 'Mercedes-Benz” 👻'], { size: 56, top: 200 })), dur: beats(6) },
      { html: still('e-class-white-lot.jpg', 'center 55%', say(['nothing scary', 'about this one 🤍'], { size: 64 })), dur: beats(5) },
      { html: still('key-fob-desk.jpg', 'center 60%', say(['trick or treat', 'yourself 🎃🔑'], { size: 64 })), dur: beats(5) },
      { html: end({ kicker: 'Happy Halloween 👻', head: 'Get a<br><em>BOO-tiful</em> one.' }), dur: beats(6), still: true },
    ],
  },
  {
    name: '05-member-savings',
    scenes: [
      { html: still('fleet-member-banner.jpg', 'center 40%', say(['Lawyer? Doctor?', 'CPA? Dentist? 👀'], { size: 64 })), dur: beats(5) },
      { html: still('fleet-member-banner.jpg', 'center 40%', say(['you may qualify for', 'member savings on', 'a new Mercedes-Benz'], { size: 56 })), dur: beats(6) },
      { html: still('key-fob-desk.jpg', 'center 60%', say(['ask me how 🔑'])), dur: beats(4) },
      { html: end({ kicker: 'Fleet & member savings', head: 'See if you<br><em>qualify.</em>', action: ['DM “SAVINGS”', HANDLE] }), dur: beats(6), still: true },
    ],
  },
  {
    name: '06-pray-on-it',
    scenes: [
      { html: still('desk-pray.jpg', 'center 45%', say(['pray on it.', 'pray over it.', 'pray through it. 🎀'], { size: 60 })), dur: beats(6) },
      { html: still('mk-fit-bow-dress.jpg', 'center 25%', say(['then go get it 💅'])), dur: beats(5) },
      { html: end({ kicker: 'Monday motivation', head: 'Sky’s the<br><em>limit.</em>', sub: 'Your next chapter might come with a star on the hood.' }), dur: beats(6), still: true },
    ],
  },
];

// ── Feed posts (4:5) ───────────────────────────────────────────────────────────
const FEED = [
  ['01-welcome-home', hero({ photo: 'store-front-fall.jpg', pos: '40% center', tag: TAG, model: '630 Middle Country Rd · St. James', head: 'Welcome <em>home.</em>', sub: 'Come see me at Mercedes-Benz of Smithtown.', action: ['DM “MK”', HANDLE] })],
  ['02-delivered', hero({ photo: 'delivery-glc-pink-bow.jpg', pos: 'center 55%', tag: TAG, model: 'Mercedes-Benz GLC 300', head: 'Another one <em>delivered.</em> 🎀', headSize: 120, sub: 'Thank you for trusting me with your new Mercedes.', action: ['You’re next', HANDLE] })],
  ['03-member-savings', hero({ photo: 'fleet-member-banner.jpg', pos: 'center 35%', tag: TAG, model: 'Fleet program & member savings', head: 'See if you <em>qualify.</em>', headSize: 130, sub: 'ABA, AMA, AICPA, ADA, United MileagePlus and Morgan Stanley members — ask me.', action: ['DM “SAVINGS”', HANDLE] })],
  ['04-pray-on-it', hero({ photo: 'desk-pray.jpg', pos: 'center 45%', tag: TAG, model: 'From my desk', head: 'Pray on it. <em>Then go.</em>', headSize: 120, sub: 'Sky’s the limit.', action: ['DM “MK”', HANDLE] })],
];

// ── Render ─────────────────────────────────────────────────────────────────────
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const reelsDir = dir('vol4/reels'), feedDir = dir('vol4/feed');
for (const [name, html] of FEED) {
  const file = path.join(feedDir, `${name}.png`);
  await render(page, html, 1080, 1350, file);
  // Instagram's and TikTok's publishing APIs only take JPEG stills.
  execFileSync('convert', [file, '-quality', '92', file.replace(/\.png$/, '.jpg')]);
}
for (const r of REELS) await buildReel(page, r, reelsDir);
await browser.close();
cleanup();
