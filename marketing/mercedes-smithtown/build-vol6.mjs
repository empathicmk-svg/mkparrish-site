#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — Volume 6: "Book it".
 *
 * Three trend-format Reels/TikToks and a story, each built to turn a scroll
 * into a test-drive booking: every one ends on mkparrish.com/test-drive.
 * Green flags at a dealership, how to book in 30 seconds, and things nobody
 * tells you about buying a Mercedes, cut from the showroom pans, MK's clip
 * library and her bow-collar selfies (media/mk-bow-collar-*.jpg).
 * captions-vol6.md has the captions, sounds and posting plan.
 *
 * Output: output/mercedes-smithtown/vol6/{reels,stories}/
 * Run:    node marketing/mercedes-smithtown/build-vol6.mjs && node scripts/add-music.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import path from 'path';
import { HANDLE, hero, render, buildReel, dir, cleanup } from './lib.mjs';
import { beats, say, pick, still, lifted, over, end } from './trend.mjs';

const BOOK = ['Book a test drive', 'mkparrish.com/test-drive'];

const REELS = [
  {
    name: '01-green-flags',
    scenes: [
      { clip: 'showroom-lounge-pan.mp4', start: 0.2, html: over(say(['Green flags at', 'a car dealership'], { size: 64 })), dur: beats(5) },
      { clip: 'showroom-lounge-pan.mp4', start: 12.0, html: over(say(['A lounge you', 'actually want to sit in'])), dur: beats(5) },
      { clip: 'gle-grey-walkaround.mp4', start: 15.9, html: over(say(['Your car is', 'pulled up before you arrive'])), dur: beats(5) },
      { clip: 'parktronic-self-park.mp4', start: 4, html: over(say(['Someone who shows you', 'every feature'])), dur: beats(5) },
      { clip: 'showroom-cle450-pan.mp4', start: 11.4, html: over(say(['No pressure.', 'Just your car.'])), dur: beats(4) },
      { html: still('mk-bow-collar-1.jpg', 'center 30%', say(['Your salesperson', 'actually texts back'])), dur: beats(4) },
      { html: end({ kicker: 'Book online in 30 seconds', head: 'Green flag:<br><em>MK.</em>', action: BOOK }), dur: beats(6), still: true },
    ],
  },
  {
    name: '02-book-in-30-seconds',
    scenes: [
      { clip: 'showroom-lounge-pan.mp4', start: 2.6, html: over(say(['How to test drive', 'a Mercedes this week'], { size: 64 })), dur: beats(5) },
      { clip: 'showroom-cle450-pan.mp4', start: 5.4, html: over(pick(1, 'Go to mkparrish.com/test-drive')), dur: beats(5) },
      { clip: 'showroom-lounge-pan.mp4', start: 8.6, html: over(pick(2, 'Pick your car and your time')), dur: beats(5) },
      { clip: 'walk-in-entrance.mp4', start: 8.8, html: over(pick(3, 'Walk in. It’s out front.')), dur: beats(5) },
      { html: still('mk-bow-collar-2.jpg', 'center 30%', say(['Ask for', 'MK'], { size: 70 })), dur: beats(4) },
      { html: end({ kicker: 'Mercedes-Benz of Smithtown', head: 'Book it in<br><em>30 seconds.</em>', action: BOOK }), dur: beats(6), still: true },
    ],
  },
  {
    name: '03-nobody-tells-you',
    scenes: [
      { clip: 'showroom-lounge-pan.mp4', start: 0.2, html: over(say(['Things nobody tells you', 'about buying a Mercedes'], { size: 60 })), dur: beats(5) },
      { html: still('g63-matte-showroom.jpg', '50% center', say(['You can build yours', 'exactly how you want it'])), dur: beats(5) },
      { html: lifted('fleet-member-banner.jpg', 'center 30%', say(['Your job might', 'get you member savings'])), dur: beats(5) },
      { clip: 'showroom-cle450-pan.mp4', start: 11.4, html: over(say(['Lease ending soon?', 'You have options'])), dur: beats(5) },
      { clip: 'suv-interior-tour.mp4', start: 3, html: over(say(['Test drives happen', 'on your schedule'])), dur: beats(5) },
      { html: still('mk-bow-collar-1.jpg', 'center 30%', say(['Your Mercedes girl', 'has you covered'])), dur: beats(4) },
      { html: end({ kicker: 'Save this', head: 'Then book<br><em>with me.</em>', action: BOOK }), dur: beats(6), still: true },
    ],
  },
];

// Story with room for Instagram's link sticker in the middle.
const STORY = hero({
  w: 1080, h: 1920, photo: 'showroom-gls-lounge.jpg', pos: 'center 45%', tag: 'Ask for MK',
  model: 'Mercedes-Benz of Smithtown', head: 'Your test drive,<br><em>booked.</em>', headSize: 140,
  sub: 'Pick your car and your time. It’s out front when you arrive.',
  action: BOOK, sigBottom: 250, textBottom: 380, top: 250,
});

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const reelsDir = dir('vol6/reels'), storiesDir = dir('vol6/stories');
const story = path.join(storiesDir, '01-book-your-test-drive.png');
await render(page, STORY, 1080, 1920, story);
// Instagram's publishing API only takes JPEG stills.
execFileSync('convert', [story, '-quality', '92', story.replace(/\.png$/, '.jpg')]);
for (const r of REELS) await buildReel(page, r, reelsDir);
await browser.close();
cleanup();
