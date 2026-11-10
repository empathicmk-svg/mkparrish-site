#!/usr/bin/env node
/**
 * Builds a Metricool bulk-scheduling CSV for the whole content library:
 *   • 110 editorial Instagram images  (output/instagram-editorial/<src>/*.png)
 *   •  30 TikTok videos               (output/tiktok/*.mp4)
 *
 * Media is referenced by its public raw.githubusercontent.com URL (the repo is
 * public and these files are committed to main), so Metricool pulls each asset
 * directly — no separate upload step.
 *
 * Every caption keeps its original copy, then gains a CTA that leads to
 * mkparrish.com and promotes a relevant book, followed by the hashtags.
 *
 * Output: output/metricool-bulk-schedule.csv
 * Run:    node scripts/build-metricool-csv.mjs
 *
 * Import: Metricool → Calendar → Import CSV. Choose date format DD/MM/YYYY and
 * time HH:MM to match this file. Rows are scheduled (Draft=FALSE); flip the
 * Draft column to TRUE if you'd rather review them first.
 */
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.join(__dirname, '..');
const OUT_CSV   = path.join(ROOT, 'output', 'metricool-bulk-schedule.csv');

const RAW = 'https://raw.githubusercontent.com/empathicmk-svg/mkparrish-site/main';

// ── Scheduling ───────────────────────────────────────────────────────────────
const START_DATE = new Date(Date.UTC(2026, 5, 23)); // 23 Jun 2026 (month is 0-based)
const TIMES      = ['09:00', '13:00', '18:00'];     // 3 posts/day
const DRAFT      = 'FALSE';

// ── Sources: which CSV backs each image folder ──────────────────────────────
const IG_SOURCES = [
  { key: 'philosophy', folder: 'instagram-editorial/philosophy', csv: 'mk_philosophy_positivity_posts.csv' },
  { key: 'fifty',      folder: 'instagram-editorial/fifty',      csv: 'mk_50_posts.csv' },
  { key: 'bold',       folder: 'instagram-editorial/bold',       csv: 'mk_bold_posts.csv' },
];
const TIKTOK = { key: 'tiktok', folder: 'tiktok', csv: 'mk_bold_posts.csv' };

// ── Book CTAs per source (rotated for variety) ──────────────────────────────
const SHELF = 'mkparrish.com/shelf';
const CTAS = {
  philosophy: [
    `📖 If this landed — The Reinvention Workbook is the guided version. Read more at ${SHELF}`,
    `✍️ Build a voice that says it like this → Write Yourself Into the Room at ${SHELF}`,
  ],
  fifty: [
    `🤍 For the rebuild: The Reinvention Workbook — a guided companion for becoming new. ${SHELF}`,
    `📚 Every guide in one place — The Vault (complete library) at ${SHELF}`,
  ],
  bold: [
    `🔥 Move with your whole chest. Write Yourself Into the Room → ${SHELF}`,
    `🎤 Build a brand voice nobody can copy — The Brand Voice Playbook at ${SHELF}`,
  ],
  tiktok: [
    `🔥 The full library lives at ${SHELF} — start with Write Yourself Into the Room`,
    `📚 More where this came from → The Vault at ${SHELF}`,
  ],
};

// ── CSV parsing ──────────────────────────────────────────────────────────────
function parseRow(line) {
  const out = []; let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { if (inQ && line[i + 1] === '"') { cur += '"'; i++; } else inQ = !inQ; }
    else if (ch === ',' && !inQ) { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}
function parseCSV(text) {
  // Handle quoted fields that span newlines.
  const rows = []; let cur = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') { inQ = !inQ; cur += ch; }
    else if (ch === '\n' && !inQ) { rows.push(cur); cur = ''; }
    else if (ch === '\r') { /* skip */ }
    else cur += ch;
  }
  if (cur.trim()) rows.push(cur);
  const headers = parseRow(rows[0]).map(h => h.trim());
  return rows.slice(1).filter(r => r.trim()).map(r => {
    const v = parseRow(r);
    return Object.fromEntries(headers.map((h, i) => [h, (v[i] || '').trim()]));
  });
}
function loadCSV(name) { return parseCSV(fs.readFileSync(path.join(ROOT, 'output', name), 'utf-8')); }

// Index a post list by its zero-padded Number.
function byNumber(posts) {
  const m = new Map();
  for (const p of posts) m.set(String(p['Number'] || '').padStart(2, '0'), p);
  return m;
}

// ── Caption assembly ─────────────────────────────────────────────────────────
function cleanCaption(raw) {
  // Drop a trailing " | mkparrish.com" so we don't double up on the link.
  return String(raw).replace(/\s*\|\s*mkparrish\.com\s*$/i, '').trim();
}
function onScreenAlt(raw) {
  return String(raw || '').split(' / ').map(s => s.trim()).filter(Boolean).join(' ').slice(0, 280);
}
function buildText(post, srcKey, rotation) {
  const caption  = cleanCaption(post['Caption'] || '');
  const hashtags = (post['Hashtags'] || '').trim();
  const cta      = CTAS[srcKey][rotation % CTAS[srcKey].length];
  return [caption, '', cta, hashtags].filter(Boolean).join('\n');
}

// ── Build the entry queue ────────────────────────────────────────────────────
function listImages(folder) {
  const dir = path.join(ROOT, 'output', folder);
  return fs.existsSync(dir)
    ? fs.readdirSync(dir).filter(f => /\.(png|mp4)$/i.test(f)).sort()
    : [];
}
function numFromFile(f) {
  const m = f.match(/^post-(\d+)/);
  return m ? m[1].padStart(2, '0') : null;
}

// Each stream is its own list; we round-robin across them so every day mixes
// philosophy / survivor / bold / tiktok rather than running one set at a time.
const streams = [];

for (const src of IG_SOURCES) {
  const index = byNumber(loadCSV(src.csv));
  const items = [];
  let rot = 0;
  for (const file of listImages(src.folder)) {
    const post = index.get(numFromFile(file));
    if (!post) continue;
    items.push({
      network: 'Instagram',
      url: `${RAW}/output/${src.folder}/${file}`,
      text: buildText(post, src.key, rot++),
      alt: onScreenAlt(post['On-Screen Text']),
    });
  }
  streams.push(items);
}

{
  const index = byNumber(loadCSV(TIKTOK.csv));
  const items = [];
  let rot = 0;
  for (const file of listImages(TIKTOK.folder)) {
    const post = index.get(numFromFile(file));
    if (!post) continue;
    items.push({
      network: 'TikTok',
      url: `${RAW}/output/${TIKTOK.folder}/${file}`,
      text: buildText(post, TIKTOK.key, rot++),
      alt: onScreenAlt(post['On-Screen Text']),
    });
  }
  streams.push(items);
}

// Round-robin interleave.
const queue = [];
for (let i = 0; ; i++) {
  let added = false;
  for (const s of streams) { if (i < s.length) { queue.push(s[i]); added = true; } }
  if (!added) break;
}

// ── Assign dates/times: 3 per day ────────────────────────────────────────────
function fmtDate(d) {
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const yy = d.getUTCFullYear();
  return `${dd}/${mm}/${yy}`;
}

// ── Emit Metricool CSV ───────────────────────────────────────────────────────
const HEADERS = [
  'Text', 'Date', 'Time', 'Draft',
  'Facebook', 'Twitter/X', 'LinkedIn', 'GBP', 'Instagram', 'Pinterest',
  'TikTok', 'YouTube', 'Threads', 'Bluesky',
  'Picture Url 1', 'Alt text picture 1', 'Brand name (Optional)',
];
const NETS = ['Facebook', 'Twitter/X', 'LinkedIn', 'GBP', 'Instagram', 'Pinterest', 'TikTok', 'YouTube', 'Threads', 'Bluesky'];

function csvCell(s) {
  const v = String(s ?? '');
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

const lines = [HEADERS.join(',')];
queue.forEach((item, i) => {
  const day  = Math.floor(i / TIMES.length);
  const slot = i % TIMES.length;
  const date = new Date(START_DATE); date.setUTCDate(date.getUTCDate() + day);

  const row = {
    Text: item.text, Date: fmtDate(date), Time: TIMES[slot], Draft: DRAFT,
    'Picture Url 1': item.url, 'Alt text picture 1': item.alt, 'Brand name (Optional)': '',
  };
  for (const n of NETS) row[n] = (n === item.network) ? 'TRUE' : 'FALSE';

  lines.push(HEADERS.map(h => csvCell(row[h] ?? '')).join(','));
});

// Prepend a UTF-8 BOM so Metricool reads emojis correctly.
fs.writeFileSync(OUT_CSV, '﻿' + lines.join('\n') + '\n', 'utf-8');

const days = Math.ceil(queue.length / TIMES.length);
console.log(`\n✓  ${queue.length} posts → ${OUT_CSV}`);
console.log(`   ${streams.map((s, i) => `${[...IG_SOURCES, TIKTOK][i].key}:${s.length}`).join('  ')}`);
console.log(`   3/day from ${fmtDate(START_DATE)} → ~${days} days of content\n`);
