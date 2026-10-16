#!/usr/bin/env node
/**
 * Gives every silent Reel/TikTok a music bed, so nothing posts without sound.
 *
 * The beds are MK's own, synthesised by scripts/audio/make-music-beds.py, so
 * they're cleared for any account. Mercedes reels get "showroom" (118 BPM
 * house); the quote videos get "soft" (warm keys). Videos that already have a
 * soundtrack (e.g. the Parktronic reel's own chimes) are left alone. The video
 * stream is copied untouched; only audio is added.
 *
 * Run after the video build scripts:
 *   python3 scripts/audio/make-music-beds.py   (only if the beds changed)
 *   node scripts/add-music.mjs
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const BEDS = path.join(ROOT, 'output', 'audio');

// Folder → bed. Every .mp4 under the folder is checked.
const JOBS = [
  ['output/mercedes-smithtown', 'showroom.wav'],
  ['output/tiktok', 'soft.wav'],
];

const probe = (file, args) => execFileSync('ffprobe', ['-v', 'error', ...args, '-of', 'csv=p=0', file]).toString().trim();
const hasAudio = file => probe(file, ['-select_streams', 'a', '-show_entries', 'stream=index']) !== '';
const duration = file => parseFloat(probe(file, ['-show_entries', 'format=duration']));

function* videos(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* videos(p);
    else if (e.name.endsWith('.mp4')) yield p;
  }
}

let added = 0, kept = 0;
for (const [dir, bed] of JOBS) {
  for (const file of videos(path.join(ROOT, dir))) {
    if (hasAudio(file)) { kept++; continue; }
    const d = duration(file);
    const tmp = file.replace(/\.mp4$/, '.music.mp4');
    // Fade the bed out over the last second and level it to about -16 LUFS.
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', file, '-i', path.join(BEDS, bed),
      '-filter_complex', `[1:a]atrim=0:${d.toFixed(3)},afade=t=in:d=0.05,afade=t=out:st=${Math.max(0, d - 1).toFixed(3)}:d=1,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100[a]`,
      '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', tmp]);
    fs.renameSync(tmp, file);
    added++;
    console.log(`  ♪ ${path.relative(ROOT, file)} (${bed.replace('.wav', '')})`);
  }
}
console.log(`${added} videos given music, ${kept} already had sound.`);
