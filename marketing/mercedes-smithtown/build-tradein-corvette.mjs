#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown: "Corvette, just traded in".
 *
 * A Reel/TikTok, a five-slide carousel (Instagram carousel or TikTok photo mode),
 * a feed post and two stories from MK's walkaround video and photos of the red
 * Corvette that came in on trade. There are no photos of MK in this set: the
 * "Got a trade?" pieces use a still from the walkaround with a white Mercedes
 * behind the Corvette (media/corvette-and-mercedes.jpg). Background staff in the
 * photos are softened.
 *
 * The walkaround was shot in HDR (HLG), so it was tone-mapped to SDR when it was
 * converted to media/corvette-walk.mp4; a plain conversion turns the red orange.
 * The video's own audio is dropped (it's just the showroom): the reel gets MK's
 * showroom music bed scored to its cuts.
 *
 * Output: output/mercedes-smithtown/corvette-tradein/{reels,stories,feed,carousel}/
 * Run:    node marketing/mercedes-smithtown/build-tradein-corvette.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import path from 'path';
import { work, hero, topbar, sig, cta, endCard, img, render, buildReel, dir, cleanup } from './lib.mjs';
import { beats, say, fitted, over, end, PHONES } from './trend.mjs';
import { cutTimes, scoreReel } from './score.mjs';

const TODAY = ['Call or text MK', '347.853.4238'];
const WALK = 'corvette-walk.mp4';
const TAG = 'Just traded in';
// A still from the walkaround: the Corvette's nose with a white Mercedes behind it.
const TRADE = 'corvette-and-mercedes.jpg';

// Scenes are four beats (about 2.4s) at 118 BPM; the walkaround runs rear, driver's side, then the front.
const REEL = {
  name: '01-corvette-just-traded-in',
  scenes: [
    { clip: WALK, start: 0.3, html: over(say(['A Corvette', 'just got traded in'], { size: 64 })), dur: beats(4) },
    { clip: WALK, start: 3.0, html: over(say(['At a Mercedes-Benz', 'dealership'])), dur: beats(4), fx: 'zoomin' },
    { html: fitted('corvette-rear.jpg', say(['Four tips.', 'One wing.']), 480), dur: beats(4), fx: 'wipeleft' },
    { clip: WALK, start: 6.6, html: over(say(['Look at', 'that stance'])), dur: beats(4), fx: 'slideleft' },
    { clip: WALK, start: 10.0, html: over(say(['Now the', 'front end'])), dur: beats(4), fx: 'fadewhite' },
    { html: fitted('corvette-front.jpg', say(['Crossed flags.', 'Showroom shine.']), 480), dur: beats(4), fx: 'smoothup' },
    { clip: WALK, start: 12.5, html: over(say(['Got a trade?', 'Bring it to MK.'])), dur: beats(4), fx: 'circleopen' },
    { html: end({ kicker: 'Mercedes-Benz of Smithtown', head: 'Trade it<br><em>in.</em>', sub: PHONES, action: TODAY }), dur: beats(6), still: true, fx: 'fadeblack' },
  ],
};

/** 9:16 story: the whole photo fitted to the width over a blurred copy, one headline and the call-or-text button. */
const story = ({ photo: name, tag, model, head }) => `<div class="frame" style="width:1080px;height:1920px">
  <img class="photo" src="${img(name)}" style="filter:blur(40px) brightness(.5);transform:scale(1.15)">
  <img src="${img(name)}" style="position:absolute;left:0;top:120px;width:1080px;height:1440px;object-fit:cover;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 9%,#000 88%,transparent 100%);mask-image:linear-gradient(180deg,transparent 0,#000 9%,#000 88%,transparent 100%)">
  <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.5) 0%, rgba(8,8,8,0) 14%, rgba(8,8,8,0) 50%, rgba(8,8,8,.9) 72%, rgba(8,8,8,.97) 100%)"></div>
  ${topbar(250, tag)}
  <div style="position:absolute;left:72px;right:72px;bottom:380px;display:flex;flex-direction:column;gap:22px">
    <div class="kicker">${model}</div>
    <div class="head" style="font-size:150px">${head}</div>
    ${cta(...TODAY)}
  </div>
  ${sig(250)}
</div>`;

/** hero() with a stronger dark fade at the top, for the walkaround still (the wall is bright behind the top bar). */
const darkTop = html => html.replace('<div class="vignette"></div>',
  '<div class="vignette"></div><div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.7) 0%, rgba(8,8,8,0) 24%)"></div>');

const STORIES = [
  ['01-corvette-just-traded-in', story({ photo: 'corvette-front.jpg', tag: TAG, model: 'Corvette · On the floor in St. James', head: 'Just traded <em>in.</em>' })],
  ['02-got-a-trade', darkTop(hero({
    w: 1080, h: 1920, photo: TRADE, pos: 'center', tag: 'Trade-ins',
    model: 'Mercedes-Benz of Smithtown', head: 'Got a<br><em>trade?</em>', headSize: 170,
    sub: 'Bring it to me. I’ll bring the numbers.', action: TODAY, sigBottom: 250, textBottom: 380, top: 250,
  }))],
];

const FEED = [
  ['01-got-a-trade', darkTop(hero({
    photo: TRADE, pos: 'center 22%', tag: 'Trade-ins', model: 'Mercedes-Benz of Smithtown',
    head: 'Got a <em>trade?</em>', headSize: 150, sub: 'Bring it to me. I’ll bring the numbers.', action: TODAY,
  }))],
];

// Five 4:5 slides for an Instagram carousel or a TikTok photo post.
const slide = (n, opts) => hero({ tag: `${TAG} · ${n}/5`, ...opts });
const CAROUSEL = [
  ['01', slide(1, { photo: 'corvette-rear.jpg', pos: 'center 38%', model: 'Corvette', head: 'Just traded <em>in.</em>', headSize: 150, sub: 'Swipe for a closer look →' })],
  ['02', slide(2, { photo: 'corvette-front.jpg', pos: 'center 62%', model: 'Corvette', head: 'Face to <em>face.</em>', headSize: 150, sub: 'Showroom shine, on the floor in St. James.' })],
  ['03', slide(3, { photo: 'corvette-rear-detail.jpg', pos: 'center', model: 'Corvette', head: 'Quad <em>exhaust.</em>', headSize: 150, sub: 'Four tips, a black diffuser and our plate frame on the back.' })],
  ['04', slide(4, { photo: 'corvette-front-detail.jpg', pos: 'center', model: 'Corvette', head: 'Crossed <em>flags.</em>', headSize: 150, sub: 'A black splitter, a wide mouth and gloss red paint.' })],
  ['05', endCard({ kicker: 'Mercedes-Benz of Smithtown', head: 'Trade it<br><em>in.</em>', sub: PHONES, action: TODAY, mark: '' })],
];

// A soft diagonal chrome highlight that sweeps across the frame.
const SWEEP = `<div style="width:700px;height:1920px;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.55) 50%,transparent 70%)"></div>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const reelsDir = dir('corvette-tradein/reels'), storiesDir = dir('corvette-tradein/stories');
const feedDir = dir('corvette-tradein/feed'), carouselDir = dir('corvette-tradein/carousel');

// Instagram's and TikTok's publishing APIs only take JPEG stills.
const jpeg = file => execFileSync('convert', [file, '-quality', '92', file.replace(/\.png$/, '.jpg')]);
for (const [name, html] of STORIES) {
  const file = path.join(storiesDir, `${name}.png`);
  await render(page, html, 1080, 1920, file);
  jpeg(file);
}
for (const [name, html] of FEED) {
  const file = path.join(feedDir, `${name}.png`);
  await render(page, html, 1080, 1350, file);
  jpeg(file);
}
for (const [n, html] of CAROUSEL) {
  const file = path.join(carouselDir, `slide-${n}.png`);
  await render(page, html, 1080, 1350, file);
  jpeg(file);
}

await buildReel(page, REEL, work);
const sweep = path.join(work, 'sweep.png');
await render(page, SWEEP, 700, 1920, sweep, true);
await browser.close();

// Cool grade, glow and vignette, then the chrome sweep, then the scored soundtrack.
const graded = path.join(work, `${REEL.name}-graded.mp4`);
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', path.join(work, `${REEL.name}.mp4`), '-loop', '1', '-i', sweep,
  '-filter_complex', [
    '[0:v]colorbalance=bs=0.06:bm=0.02:bh=0.03,curves=all=\'0/0 0.5/0.47 1/1\',split[a][b]',
    '[b]gblur=sigma=26[g]',
    '[a][g]blend=all_mode=screen:all_opacity=0.18,vignette=angle=PI/5[base]',
    '[1:v]format=rgba,colorchannelmixer=aa=0.6[s]',
    '[base][s]overlay=x=\'mod(t*1100,4400)-700\':y=0:shortest=1,format=yuv420p[v]',
  ].join(';'),
  '-map', '[v]', '-c:v', 'libx264', '-crf', '21', '-preset', 'medium', '-r', '30', '-movflags', '+faststart', graded]);
scoreReel(graded, path.join(reelsDir, `${REEL.name}.mp4`), { cuts: cutTimes(REEL.scenes) });
console.log('  cuts at', cutTimes(REEL.scenes).map(t => `${t.toFixed(2)}s`).join(', '));
cleanup();
