/**
 * Activity tracking — the productivity half of the tool.
 *
 * Payments and commissions are lagging indicators; you cannot do anything about
 * them in the moment. Touches, conversations and appointments set are leading
 * indicators you control on any given shift, so those are what this counts.
 */

export const ACT_KEY = 'mk-desk-activity-v1';

export type DayLog = {
  calls: number;
  texts: number;
  convos: number;   // live two-way conversations
  appts: number;    // appointments SET
  ups: number;      // fresh guests greeted
  done: string[];   // checked shift-checklist items
};

export type Activity = Record<string, DayLog>;  // keyed YYYY-MM-DD

export const EMPTY_DAY: DayLog = { calls: 0, texts: 0, convos: 0, appts: 0, ups: 0, done: [] };

export const TARGETS = { touches: 40, convos: 10, appts: 2 };

export type CounterKey = 'calls' | 'texts' | 'convos' | 'appts' | 'ups';

export const COUNTERS: { key: CounterKey; label: string; icon: string; hint: string }[] = [
  { key: 'calls',  label: 'Calls',   icon: '📞', hint: 'every dial, connected or not' },
  { key: 'texts',  label: 'Texts',   icon: '💬', hint: 'texts and emails sent' },
  { key: 'convos', label: 'Talked',  icon: '🗣️', hint: 'actually reached a person' },
  { key: 'appts',  label: 'Appts',   icon: '📅', hint: 'appointments SET — the one that matters' },
  { key: 'ups',    label: 'Ups',     icon: '🚶', hint: 'fresh guests you greeted' },
];

export function loadActivity(): Activity {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(ACT_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function saveActivity(a: Activity) {
  try { window.localStorage.setItem(ACT_KEY, JSON.stringify(a)); } catch { /* quota / private mode */ }
}

export function dayOf(a: Activity, iso: string): DayLog {
  return { ...EMPTY_DAY, ...(a[iso] || {}), done: a[iso]?.done ?? [] };
}

export const touchesOf = (d: DayLog) => d.calls + d.texts;

/** Fraction of the day's targets met, capped at 1 each so one huge number can't mask a zero. */
export function dayScore(d: DayLog) {
  const parts = [
    Math.min(1, touchesOf(d) / TARGETS.touches),
    Math.min(1, d.convos / TARGETS.convos),
    Math.min(1, d.appts / TARGETS.appts),
  ];
  return parts.reduce((s, n) => s + n, 0) / parts.length;
}

export const hitTargets = (d: DayLog) =>
  touchesOf(d) >= TARGETS.touches && d.convos >= TARGETS.convos && d.appts >= TARGETS.appts;

/** Consecutive worked days ending today (or yesterday) where all targets were met. */
export function streak(a: Activity, todayIso: string, isWorkDay: (d: Date) => boolean): number {
  const [y, m, dd] = todayIso.split('-').map(Number);
  const cur = new Date(y, m - 1, dd);
  const pad = (n: number) => String(n).padStart(2, '0');
  const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  let count = 0;
  // Today only breaks a streak once it has activity; an untouched today is "not yet".
  if (a[todayIso] && !hitTargets(dayOf(a, todayIso))) return 0;
  if (a[todayIso] && hitTargets(dayOf(a, todayIso))) count = 1;

  cur.setDate(cur.getDate() - 1);
  for (let i = 0; i < 60; i++) {
    if (isWorkDay(cur)) {
      if (hitTargets(dayOf(a, iso(cur)))) count++;
      else break;
    }
    cur.setDate(cur.getDate() - 1);
  }
  return count;
}

/** Last n worked days, oldest first — for the week strip. */
export function recentDays(a: Activity, todayIso: string, isWorkDay: (d: Date) => boolean, n = 7) {
  const [y, m, dd] = todayIso.split('-').map(Number);
  const cur = new Date(y, m - 1, dd);
  const pad = (x: number) => String(x).padStart(2, '0');
  const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const out: { iso: string; label: string; log: DayLog; off: boolean }[] = [];
  for (let i = 0; i < 14 && out.length < n; i++) {
    const off = !isWorkDay(cur);
    out.unshift({
      iso: iso(cur),
      label: cur.toLocaleDateString(undefined, { weekday: 'narrow' }),
      log: dayOf(a, iso(cur)),
      off,
    });
    cur.setDate(cur.getDate() - 1);
  }
  return out;
}
