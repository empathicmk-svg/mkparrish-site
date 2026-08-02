/**
 * Inventory — parse a pasted stock list and rank it by what it pays you.
 *
 * Anchors on the VIN rather than on column positions, because the same export
 * arrives tab-separated from a spreadsheet, comma-separated from a CSV, or as
 * one run-on string when copied out of a PDF. A 17-character VIN is
 * unambiguous in all three, so everything else is read relative to it.
 */

export const INV_KEY = 'mk-desk-inventory-v1';

export type Unit = {
  stock: string;
  vin: string;
  type: 'New' | 'Pre-Owned' | 'CPO' | '';
  year: number | null;
  make: string;
  model: string;
  price: number | null;
  miles: number;
  days: number;
  status: string;
};

/**
 * Deliberately case-SENSITIVE. With the /i flag the VIN character class also
 * matched lowercase, so a match could start inside the colour field and run
 * "BlackW1Y4NBVY6RT1" together as a bogus VIN, throwing every field after it
 * out of alignment. VINs are uppercase, and exclude I, O and Q.
 */
const VIN_RE =
  /([A-HJ-NPR-Z0-9]{17})[^\dA-Za-z]{0,3}(\d{1,3}(?:,\d{3})*|\d+)[^\d$]{0,3}(?:\$\s?(\d{1,3}(?:,\d{3})*))?[^\d]{0,3}(\d{1,4})\s*(In[- ]?Stock|In[- ]?Transit|Sold|On[- ]?Order|Available)?/g;

const MAKES = [
  'Mercedes-Benz', 'Mercedes Benz', 'Toyota', 'BMW', 'Chevrolet', 'Cadillac', 'Subaru',
  'Land Rover', 'Audi', 'Honda', 'Ford', 'Lexus', 'Jeep', 'Nissan', 'Porsche', 'Volvo',
  'Acura', 'Hyundai', 'Kia', 'Volkswagen', 'Tesla', 'GMC', 'RAM', 'Dodge', 'Mazda',
  'INFINITI', 'Lincoln', 'Buick', 'Mitsubishi', 'Genesis', 'MINI', 'Alfa Romeo',
  'Maserati', 'Jaguar', 'Bentley', 'Rivian',
];

export function parseInventory(text: string): Unit[] {
  const flat = text.replace(/\r/g, '').replace(/[\t|]+/g, ' ').replace(/\n+/g, ' ');
  const units: Unit[] = [];
  const seen = new Set<string>();
  let cursor = 0;

  VIN_RE.lastIndex = 0;
  for (let m = VIN_RE.exec(flat); m; m = VIN_RE.exec(flat)) {
    const vin = m[1].toUpperCase();
    if (seen.has(vin)) { cursor = VIN_RE.lastIndex; continue; }

    const head = flat.slice(cursor, m.index);
    cursor = VIN_RE.lastIndex;

    // Stock number: first token of the record, letters+digits.
    const stock = (head.match(/([A-Z]{0,2}\d{4,6}[A-Z]{0,2})/) || [, ''])[1];

    /**
     * Type, year and make arrive as one run-on token ("...SmithtownPre-Owned
     * 2024Mercedes-Benz..."), so word boundaries never fire. Anchor instead on
     * the fact that the type is immediately followed by the year, and the year
     * by the make.
     */
    const meta = head.match(
      /(Certified[ -]?Pre[- ]?Owned|Pre[- ]?Owned|CPO|New)\s*(20[1-3]\d)\s*([A-Za-z][A-Za-z-]+(?:\s[A-Z][a-z]+)?)/,
    );

    let type: Unit['type'] = '';
    let year: number | null = null;
    let make = '';
    let model = '';

    if (meta) {
      const t = meta[1].toLowerCase();
      type = /cpo|certified/.test(t) ? 'CPO' : /pre/.test(t) ? 'Pre-Owned' : 'New';
      year = Number(meta[2]);
      make = MAKES.find((mk) => head.includes(mk)) || meta[3];
      const after = head.slice(head.indexOf(meta[2]) + 4).replace(make, '');
      model = after.split(/Base|\d ?Door|RWD|AWD|4WD|Automatic/)[0];
    } else {
      make = MAKES.find((mk) => head.includes(mk)) || '';
    }

    model = model
      .replace(/([a-z])([A-Z])/g, '$1 $2')   // GLA-ClassGLA250 -> GLA-Class GLA250
      .replace(/\s{2,}/g, ' ')
      .trim()
      .slice(0, 34);

    units.push({
      stock, vin, type, year, make, model,
      miles: Number((m[2] || '0').replace(/,/g, '')),
      price: m[3] ? Number(m[3].replace(/,/g, '')) : null,
      days: Number(m[4] || 0),
      status: (m[5] || '').replace(/\s+/g, '-'),
    });
    seen.add(vin);
  }
  return units;
}

export const isSprinter = (u: Unit) => /sprinter|metris/i.test(u.model);
export const isUsed = (u: Unit) => u.type === 'Pre-Owned' || u.type === 'CPO';

/**
 * Extra commissionable gross from the stock-aging bonus. Comes straight from
 * the operator's own pay plan — new units do not earn it.
 */
export function agingBonus(u: Unit, perDay: number, afterDays: number) {
  if (!isUsed(u) || !perDay) return 0;
  return u.days > afterDays ? (u.days - afterDays) * perDay : 0;
}

export function loadInventory(): Unit[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(INV_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveInventory(units: Unit[]) {
  try { window.localStorage.setItem(INV_KEY, JSON.stringify(units)); } catch { /* quota */ }
}

/** Map a stock unit onto a configured model key so Quote can price it. */
export function matchModelKey(u: Unit, modelKeys: string[], names: Record<string, string>): string | null {
  const hay = `${u.model}`.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!hay) return null;
  let best: { key: string; score: number } | null = null;
  for (const k of modelKeys) {
    const n = (names[k] || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!n) continue;
    const core = n.replace(/^my2\d/, '');
    let score = 0;
    if (core.includes(hay) || hay.includes(core.slice(0, 8))) score = hay.length;
    if (isSprinter(u) && /sprinter/.test(core)) score = Math.max(score, 6);
    if (score && (!best || score > best.score)) best = { key: k, score };
  }
  return best?.key ?? null;
}
