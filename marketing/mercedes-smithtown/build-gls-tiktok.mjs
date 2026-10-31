#!/usr/bin/env node
/**
 * MK (@mk_parrish) — "POV: your Mercedes takes your selfies" GLS TikTok.
 *
 * Cuts media/gls-selfie-camera.mp4 into a CarTok feature-reveal: a hook for
 * the first 4.5s, a "plays my music too" beat after it with the Ask-for-MK
 * tag, then a 2.5s end card. The clip's own audio (the car's speakers) is
 * kept; lower it in TikTok if you add a trending sound on top.
 *
 * Output: output/mercedes-smithtown/tiktok/03-gls-selfie-camera.mp4
 * Run:    node marketing/mercedes-smithtown/build-gls-tiktok.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ROOT, MEDIA, OUT, HANDLE, work, tiktokOverlay, tiktokTag, endCard, render, cleanup } from './lib.mjs';

const CLIP = path.join(MEDIA, 'gls-selfie-camera.mp4');
const SWITCH = 4.5; // seconds: hook → second beat
const END = 2.5;    // seconds of end card
const DURATION = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', CLIP]).toString());

// CHROMIUM_PATH lets this run where Playwright's own browser build isn't installed.
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();

const hookPng = path.join(work, 'gls-hook.png');
const beatPng = path.join(work, 'gls-beat.png');
const tagPng = path.join(work, 'gls-tag.png');
const endPng = path.join(work, 'gls-end.png');
await render(page, tiktokOverlay({ model: 'Mercedes-Benz GLS', hook: 'POV: your Mercedes<br>takes your <em>selfies</em> 🤳', sub: 'Wait for it…' }), 1080, 1920, hookPng, true);
await render(page, tiktokOverlay({ model: 'Mercedes-Benz GLS', hook: '…and it plays my<br><em>music</em> too 🎶', sub: 'A 7-seater that does the most.' }), 1080, 1920, beatPng, true);
await render(page, tiktokTag(['Comment “GLS”', 'for every hidden feature']), 1080, 1920, tagPng, true);
await render(page, endCard({
  w: 1080, h: 1920, padY: 300, sigBottom: 260,
  kicker: 'Mercedes-Benz GLS · Pink Bow October',
  head: 'Want the <em>tour?</em>',
  sub: 'Comment “GLS” and I’ll show you every hidden feature.',
  action: ['Ask for MK', HANDLE],
}), 1080, 1920, endPng);
await browser.close();

const dir = path.join(OUT, 'tiktok');
fs.mkdirSync(dir, { recursive: true });
const out = path.join(dir, '03-gls-selfie-camera.mp4');
execFileSync('ffmpeg', [
  '-v', 'error', '-y',
  '-i', CLIP, '-i', hookPng, '-i', beatPng, '-i', tagPng,
  '-loop', '1', '-t', String(END), '-framerate', '30', '-i', endPng,
  '-filter_complex',
  '[0:v]eq=contrast=1.06:saturation=1.12:brightness=0.01,unsharp=5:5:0.5[g];' +
  `[g][1:v]overlay=enable='lt(t,${SWITCH})'[a];` +
  `[a][2:v]overlay=enable='gte(t,${SWITCH})'[b];` +
  `[b][3:v]overlay=enable='gte(t,${SWITCH})',fps=30,format=yuv420p,setsar=1[clip];` +
  '[4:v]fps=30,format=yuv420p,setsar=1[end];[clip][end]concat=n=2:v=1:a=0[v];' +
  `[0:a]afade=t=out:st=${(DURATION - 1.2).toFixed(2)}:d=1.2,apad=pad_dur=${END}[aud]`,
  '-map', '[v]', '-map', '[aud]', '-shortest',
  '-c:v', 'libx264', '-crf', '23', '-preset', 'medium', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out,
]);
console.log('  ✓', path.relative(ROOT, out));
cleanup();
