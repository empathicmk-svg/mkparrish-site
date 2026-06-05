#!/usr/bin/env node
/**
 * Converts Instagram square PNGs → TikTok vertical MP4s (1080×1920, 9:16).
 * Each video is 6 seconds with fade-in/fade-out — silent so you can add
 * your own audio in TikTok Studio or CapCut.
 *
 * Input:  output/instagram-v2/*.png
 * Output: output/tiktok/*.mp4
 * Run:    node scripts/build-tiktok-videos.mjs
 */
import { execSync } from 'child_process';
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require   = createRequire(import.meta.url);
const FFMPEG    = require('@ffmpeg-installer/ffmpeg').path;

const SRC = path.join(__dirname, '..', 'output', 'instagram-v2');
const OUT = path.join(__dirname, '..', 'output', 'tiktok');
fs.mkdirSync(OUT, { recursive: true });

// ── Settings ──────────────────────────────────────────────────────────────────
const DURATION   = 6;       // seconds per video
const FADE_DUR   = 0.7;     // fade in + fade out duration
const FPS        = 30;
const BG_COLOR   = '0x080808'; // void black matching the brand

// ── Build filter ──────────────────────────────────────────────────────────────
// 1. Scale @2x PNG down to 1080×1080
// 2. Pad to 1080×1920 (centers image at y=420)
// 3. Add subtle pink glow bars top & bottom via drawbox
// 4. Fade in / fade out
// 5. Output as yuv420p for max compatibility
function buildFilter(duration) {
  const fadeOut = duration - FADE_DUR;
  return [
    `scale=1080:1080:flags=lanczos`,
    `pad=1080:1920:0:420:color=${BG_COLOR}`,
    `drawbox=x=0:y=0:w=1080:h=420:color=0x1a0811@0.5:t=fill`,
    `drawbox=x=0:y=1500:w=1080:h=420:color=0x1a0811@0.5:t=fill`,
    `fade=t=in:st=0:d=${FADE_DUR}`,
    `fade=t=out:st=${fadeOut}:d=${FADE_DUR}`,
    `format=yuv420p`,
  ].join(',');
}

// ── Process images ────────────────────────────────────────────────────────────
const pngs = fs.readdirSync(SRC)
  .filter(f => f.endsWith('.png'))
  .sort();

if (pngs.length === 0) {
  console.error('No PNGs found in', SRC);
  process.exit(1);
}

console.log(`\nConverting ${pngs.length} images to TikTok MP4s (1080×1920)...\n`);

let done = 0;
for (const png of pngs) {
  const input  = path.join(SRC, png);
  const name   = png.replace('.png', '.mp4');
  const output = path.join(OUT, name);

  const vf  = buildFilter(DURATION);
  const cmd = [
    `"${FFMPEG}"`,
    `-y`,
    `-loop 1`,
    `-framerate ${FPS}`,
    `-i "${input}"`,
    `-vf "${vf}"`,
    `-c:v libx264`,
    `-preset fast`,
    `-crf 22`,
    `-t ${DURATION}`,
    `-r ${FPS}`,
    `-an`,          // no audio — user adds in TikTok/CapCut
    `-movflags +faststart`,
    `"${output}"`,
  ].join(' ');

  try {
    execSync(cmd, { stdio: 'pipe' });
    const kb = (fs.statSync(output).size / 1024).toFixed(0);
    done++;
    console.log(`  ✓  [${done}/${pngs.length}]  ${name}  (${kb} kb)`);
  } catch (e) {
    console.error(`  ✗  ${name}: ${e.stderr?.toString().slice(-200) || e.message}`);
  }
}

console.log(`\n✓  ${done} TikTok videos saved to output/tiktok/`);
console.log(`   Format: 1080×1920  |  ${DURATION}s  |  H.264  |  Silent`);
console.log(`   Add audio in TikTok Studio, CapCut, or Instagram Reels editor.\n`);
