#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — "Ask for MK" selfie posts.
 *
 * MK's blazer mirror selfie, cropped to the reflection, colour-corrected and
 * retouched (media/mk-selfie-blazer*.jpg), as a feed post and a story.
 *
 * Output: output/mercedes-smithtown/mk-selfie/{feed,stories,clean}/
 * Run:    node marketing/mercedes-smithtown/build-mk-selfie.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import path from 'path';
import { MEDIA, VOID, PEARL, PETAL, HANDLE, STORE, topbar, sig, cta, hero, photo, render, dir, cleanup } from './lib.mjs';

const TAG = 'Ask for MK';

const feed = hero({
  photo: 'mk-selfie-blazer.jpg', pos: 'center 30%', tag: TAG,
  model: STORE, head: 'Ask for <em>MK.</em>', headSize: 150,
  sub: 'Sales &amp; Leasing Consultant. New, AMG, Sprinter vans and custom 2027 orders.',
  action: ['DM “MK”', HANDLE],
});

const story = `<div class="frame" style="width:1080px;height:1920px">
  ${photo({ photo: 'mk-selfie-blazer-tall.jpg', pos: 'center 30%' })}
  <div class="vignette"></div>
  <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.55) 0%, rgba(8,8,8,0) 14%, rgba(8,8,8,0) 58%, rgba(8,8,8,.9) 80%, ${VOID} 100%)"></div>
  ${topbar(250, TAG)}
  <div style="position:absolute;left:72px;right:72px;bottom:300px;display:flex;flex-direction:column;gap:20px">
    <div class="kicker">${STORE}</div>
    <div class="head" style="font-size:132px">Ready when<br><em>you are.</em></div>
    <div class="sub" style="font-size:40px;color:${PEARL}">Test drives all week in St. James.</div>
    ${cta('Book a test drive', 'mkparrish.com/test-drive')}
  </div>
  ${sig(250)}
</div>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const feedDir = dir('mk-selfie/feed'), storyDir = dir('mk-selfie/stories');
const cleanDir = dir('mk-selfie/clean');
// The retouched photo on its own, for posting without the branded overlay.
for (const f of ['mk-selfie-blazer', 'mk-selfie-blazer-tall'])
  execFileSync('convert', [path.join(MEDIA, `${f}.jpg`), '-modulate', '102,110,100', '-quality', '94', path.join(cleanDir, `${f}.jpg`)]);
const outs = [
  [feed, 1080, 1350, path.join(feedDir, '01-ask-for-mk.png')],
  [story, 1080, 1920, path.join(storyDir, '01-ready-when-you-are.png')],
];
for (const [html, w, h, file] of outs) {
  await render(page, html, w, h, file);
  // Instagram's and TikTok's publishing APIs only take JPEG stills.
  execFileSync('convert', [file, '-quality', '92', file.replace(/\.png$/, '.jpg')]);
}
await browser.close();
cleanup();
