/**
 * Deal Desk — types and storage.
 *
 * SECURITY NOTE, deliberately: no money factors, residuals, incentive amounts,
 * or pay-plan tiers live in this repository. Those figures are dealer-
 * confidential ("Do Not Forward") and the pay plan carries an NDA clause.
 * The deployed page ships empty and reads its numbers from localStorage on
 * each device, so nothing sensitive is ever served from the web or committed
 * to git. The math below is generic; only the operator's own data fills it in.
 */

export type ModelSpec = {
  name: string;
  mib: number;
  van?: boolean;
  r: Record<string, number>;  // residual % of MSRP, keyed by term
  mf: Record<string, number>; // money factor, keyed by term
};

export type DealType = {
  label: string;
  front: number;      // front-end commission rate
  back: number;       // back-end commission rate
  min: number;        // minimum commission floor
  agePerDay?: number;
  ageAfter?: number;
};

export type DeskConfig = {
  models: Record<string, ModelSpec>;
  dealTypes: Record<string, DealType>;
  spotBonus: number;
  unitsCash: Record<string, number>;
  unitsPct: Record<string, number>;
  goal?: number;
};

export type Prospect = {
  id: number;
  name: string;
  src: string;
  veh: string;
  first: string;   // YYYY-MM-DD
  touches: number;
  status: 'active' | 'sold' | 'lost';
};

export const CADENCE = [1, 2, 4, 7, 14, 21, 30];
export const CFG_KEY = 'mk-desk-config-v1';
export const PIPE_KEY = 'mk-desk-pipeline-v1';

export const SOURCES = ['equity', 'lease-end', 'conquest', 'floor', 'internet', 'service', 'referral', 'sprinter'];

/* ---------- date helpers (local time; toISOString would shift days) ---------- */
const pad = (n: number) => String(n).padStart(2, '0');
export const todayISO = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parseISO = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const daysBetween = (a: string, b: string) => Math.round((+parseISO(b) - +parseISO(a)) / 86400000);
export const addDays = (s: string, n: number) => { const d = parseISO(s); d.setDate(d.getDate() + n); return todayISO(d); };

export const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

/** Next follow-up date, keyed off touches completed so neglect surfaces as late. */
export function nextDue(p: Prospect): string | null {
  const step = CADENCE[p.touches];
  return step === undefined ? null : addDays(p.first, step);
}

/* ---------- lease math ---------- */
export function leasePayment(msrp: number, sell: number, down: number, rebate: number, residualPct: number, mf: number, term: number) {
  const residual = msrp * residualPct;
  const cap = sell - down - rebate;
  const depreciation = (cap - residual) / term;
  const rent = (cap + residual) * mf;
  return { residual, cap, depreciation, rent, payment: depreciation + rent };
}

/** Selling price required to land a target payment. */
export function sellPriceForPayment(target: number, residual: number, mf: number, term: number, down: number, rebate: number) {
  const cap = (target - residual * (mf - 1 / term)) / (1 / term + mf);
  return cap + down + rebate;
}

/* ---------- commission math ---------- */
export function dealPayout(t: DealType, front: number, back: number, days: number, spot: boolean, spotBonus: number) {
  let adjusted = front;
  let aging = 0;
  if (t.agePerDay && t.ageAfter !== undefined && days > t.ageAfter) {
    aging = (days - t.ageAfter) * t.agePerDay;
    adjusted += aging;
  }
  const raw = adjusted * t.front;
  const usedMinimum = raw < t.min;
  const frontPay = usedMinimum ? t.min : raw;
  const backPay = back * t.back;
  const spotPay = spot ? spotBonus : 0;
  return {
    aging, frontPay, backPay, spotPay, usedMinimum,
    breakeven: t.min / t.front,
    total: frontPay + backPay + spotPay,
  };
}

/**
 * Bulk-add prospects from text pasted out of a report you are authorised to
 * view. Accepts one prospect per line; splits on tab, comma, or pipe and takes
 * the first two fields as name and vehicle. Anything that looks like a phone
 * number or email is dropped — customer contact details belong in the CRM,
 * not in browser storage.
 */
export function parsePastedList(text: string, source: string): Prospect[] {
  const PHONE = /(\+?\d[\d\s().-]{7,}\d)/g;
  const EMAIL = /\S+@\S+\.\S+/g;
  const out: Prospect[] = [];
  const seen = new Set<string>();
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(PHONE, '').replace(EMAIL, '').trim();
    if (!line) continue;
    const parts = line.split(/\t|\||,/).map((s) => s.trim()).filter(Boolean);
    if (!parts.length) continue;
    const name = parts[0].slice(0, 60);
    if (!name || /^(name|customer|client)$/i.test(name)) continue; // header row
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      id: Date.now() + out.length,
      name,
      src: source,
      veh: (parts[1] || '').slice(0, 40),
      first: todayISO(),
      touches: 0,
      status: 'active',
    });
  }
  return out;
}

export function loadConfig(): DeskConfig | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CFG_KEY);
    if (!raw) return null;
    const cfg = JSON.parse(raw);
    return cfg && cfg.models && cfg.dealTypes ? (cfg as DeskConfig) : null;
  } catch {
    return null;
  }
}

export function loadPipeline(): Prospect[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PIPE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
