#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — Volume 5: "Your Mercedes girl".
 *
 * One Reel/TikTok and two feed posts from MK's black-dress selfies (retouched in
 * media/mk-black-dress-*.jpg: cropped past the selfie arm, softened and warmed)
 * and two showroom pans (the lounge and GLS, and a CLE 450 Cabriolet).
 * captions-vol5.md has the captions, sound and posting plan.
 *
 * Output: output/mercedes-smithtown/vol5/{reels,feed}/
 * Run:    node marketing/mercedes-smithtown/build-vol5.mjs && node scripts/add-music.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import path from 'path';
import { HANDLE, STORE, hero, render, buildReel, dir, cleanup } from './lib.mjs';
import { beats, say, still, over, end } from './trend.mjs';

const TAG = 'Ask for MK';

const REEL = {
  name: '01-your-mercedes-girl',
  scenes: [
    { html: still('mk-black-dress-3.jpg', 'center 30%', say(['Your Mercedes girl', 'is in the showroom'], { size: 64 })), dur: beats(5) },
    { clip: 'showroom-lounge-pan.mp4', start: 2.6, html: over(say(['The GLS', 'is waiting'])), dur: beats(5) },
    { clip: 'showroom-cle450-pan.mp4', start: 5.4, html: over(say(['Top down?', 'CLE 450 Cabriolet'])), dur: beats(5) },
    { clip: 'showroom-cle450-pan.mp4', start: 11.4, html: over(say(['That badge', 'though'])), dur: beats(4) },
    { clip: 'showroom-lounge-pan.mp4', start: 8.6, html: over(say(['Pull up a chair', 'let’s find yours'])), dur: beats(5) },
    { html: still('mk-black-dress-1.jpg', 'center 30%', say(['Ask for', 'MK'], { size: 70 })), dur: beats(4) },
    { html: end({ kicker: STORE, head: 'Come see<br><em>me.</em>' }), dur: beats(6), still: true },
  ],
};

const FEED = [
  ['01-ask-for-mk', hero({ photo: 'mk-black-dress-3.jpg', pos: 'center 25%', tag: TAG, model: STORE, head: 'Ask for <em>MK.</em>', headSize: 150, sub: 'Sales &amp; Leasing Consultant. New, AMG, Sprinter vans and custom 2027 orders.', action: ['DM “MK”', HANDLE] })],
  ['02-your-mercedes-girl', hero({ photo: 'mk-black-dress-2.jpg', pos: 'center 25%', tag: TAG, model: '630 Middle Country Rd · St. James', head: 'Your Mercedes <em>girl.</em>', headSize: 130, sub: 'Test drives all week. Text me and I’ll have it pulled up front.', action: ['DM “MK”', HANDLE] })],
];

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const reelsDir = dir('vol5/reels'), feedDir = dir('vol5/feed');
for (const [name, html] of FEED) {
  const file = path.join(feedDir, `${name}.png`);
  await render(page, html, 1080, 1350, file);
  // Instagram's and TikTok's publishing APIs only take JPEG stills.
  execFileSync('convert', [file, '-quality', '92', file.replace(/\.png$/, '.jpg')]);
}
await buildReel(page, REEL, reelsDir);
await browser.close();
cleanup();
