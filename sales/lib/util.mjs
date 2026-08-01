import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const DATA = join(ROOT, 'data');

export const config = JSON.parse(readFileSync(join(ROOT, 'config.json'), 'utf8'));

export function loadJson(name, fallback) {
  const p = join(DATA, name);
  if (!existsSync(p)) return fallback;
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch {
    return fallback;
  }
}

export function saveJson(name, value) {
  if (!existsSync(DATA)) mkdirSync(DATA, { recursive: true });
  writeFileSync(join(DATA, name), JSON.stringify(value, null, 2) + '\n');
}

/** Local YYYY-MM-DD (never use toISOString here — it shifts across UTC). */
export function today(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function parseDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function daysBetween(fromIso, toIso) {
  const ms = parseDate(toIso) - parseDate(fromIso);
  return Math.round(ms / 86400000);
}

export function addDays(iso, n) {
  const d = parseDate(iso);
  d.setDate(d.getDate() + n);
  return today(d);
}

/** Working days remaining in the month, honoring the day off. */
export function shiftsLeft(fromIso) {
  const d = parseDate(fromIso);
  const month = d.getMonth();
  let count = 0;
  while (d.getMonth() === month) {
    if (!config.schedule[String(d.getDay())].off) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

// ---- tiny terminal styling (no deps) ----
const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const wrap = (code) => (s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : String(s));
export const c = {
  bold: wrap('1'),
  dim: wrap('2'),
  cyan: wrap('36'),
  green: wrap('32'),
  yellow: wrap('33'),
  red: wrap('31'),
  blue: wrap('34'),
};

export function rule(char = '─', n = 62) {
  return c.dim(char.repeat(n));
}

export function heading(text) {
  return `\n${c.bold(c.cyan(text))}\n${rule()}`;
}

/** Parse `--key value` and `--flag` from argv. */
export function args(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        out[key] = next;
        i++;
      } else {
        out[key] = true;
      }
    } else {
      out._.push(a);
    }
  }
  return out;
}

export function money(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}
