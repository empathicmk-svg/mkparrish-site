#!/usr/bin/env node
/**
 * Fails the build if a paid file has reappeared under public/.
 *
 * Anything in public/ is served straight off the CDN before any route runs, so
 * a paid manuscript there is readable by anyone who guesses its URL. Paid files
 * therefore live in protected-downloads/ and are streamed by /api/download only
 * to buyers (see app/lib/downloads.ts).
 *
 * Several scripts under scripts/ still write their output into
 * public/downloads/ by default. This guard is what catches it when one of them
 * puts a paid title back: the invariant is that no path may exist in both
 * trees, and that the wholesale-moved folders stay out of public/.
 *
 * Run: node scripts/check-protected-downloads.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROTECTED = path.join(ROOT, 'protected-downloads');
const PUBLIC_DOWNLOADS = path.join(ROOT, 'public', 'downloads');

// Moved wholesale, so nothing should ever be written back into them.
const MOVED_FOLDERS = ['print', 'kdp'];

function walk(dir, base = '') {
  const out = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(path.join(dir, entry.name), rel));
    else if (entry.isFile()) out.push(rel);
  }
  return out;
}

const problems = [];

for (const rel of walk(PROTECTED)) {
  if (fs.existsSync(path.join(PUBLIC_DOWNLOADS, rel))) {
    problems.push(`public/downloads/${rel} duplicates the protected copy`);
  }
}

for (const folder of MOVED_FOLDERS) {
  const leaked = walk(path.join(PUBLIC_DOWNLOADS, folder));
  for (const rel of leaked) {
    problems.push(`public/downloads/${folder}/${rel} belongs in protected-downloads/${folder}/`);
  }
}

if (problems.length > 0) {
  console.error(`\n✗ ${problems.length} paid file(s) are publicly readable:\n`);
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error(
    '\nMove each one into protected-downloads/ (same sub-path) and point the',
    'script that produced it there too. Buyers reach these through',
    '/api/download/<slug>/<file>, so nothing needs to be in public/.\n',
  );
  process.exit(1);
}

console.log('✓ No paid downloads are publicly readable.');
