#!/usr/bin/env node
/**
 * quote — ballpark a lease or finance payment in seconds, on the phone.
 *
 *   node sales/quote.mjs --model glc300 --msrp 52000 --term 24
 *   node sales/quote.mjs --model gle350 --msrp 68000 --term 36 --down 3000
 *   node sales/quote.mjs --model sprinter2500 --msrp 62000 --term 36
 *   node sales/quote.mjs --model gle350 --msrp 68000 --finance 3.99 --term 60
 *   node sales/quote.mjs --list
 *
 * ESTIMATE ONLY — pre-tax, pre-fee. The desk and NetStar are the source of
 * truth on every contract. Use this to keep a conversation moving, not to
 * promise a number.
 *
 * Data: August 2026 MBFS Sales Program Guide + Van Program Guide, tiers A1-T2.
 */
import { c, heading, rule, args, money } from './lib/util.mjs';

// residual = % of MSRP by term; mf = money factor by term
const MODELS = {
  glc300:  { name: 'MY26 GLC 300 (W)',  mib: 1500, r: { 24: 0.62, 36: 0.52, 48: 0.40 }, mf: { 24: 0.00079, 36: 0.00161, 48: 0.00161 } },
  c300:    { name: 'MY26 C 300 (W)',    mib: 1500, r: { 24: 0.67, 36: 0.55, 48: 0.44 }, mf: { 24: 0.00262, 36: 0.00253, 48: 0.00253 } },
  gle350:  { name: 'MY26 GLE 350 4M',   mib: 2000, r: { 24: 0.65, 36: 0.56, 48: 0.45 }, mf: { 24: 0.00166, 36: 0.00237, 48: 0.00237 } },
  gle450:  { name: 'MY26 GLE 450 4M',   mib: 2000, r: { 24: 0.61, 36: 0.54, 48: 0.43 }, mf: { 24: 0.00031, 36: 0.00175, 48: 0.00175 } },
  e350:    { name: 'MY26 E 350 (W)',    mib: 2000, r: { 24: 0.60, 36: 0.53, 48: 0.40 }, mf: { 24: 0.00068, 36: 0.00189, 48: 0.00189 } },
  gla250:  { name: 'MY26 GLA 250',      mib: 1000, r: { 24: 0.61, 36: 0.55, 48: 0.43 }, mf: { 24: 0.00010, 36: 0.00218, 48: 0.00218 } },
  glb250:  { name: 'MY26 GLB 250',      mib: 1000, r: { 24: 0.63, 36: 0.55, 48: 0.44 }, mf: { 24: 0.00010, 36: 0.00162, 48: 0.00162 } },
  gls450:  { name: 'MY26 GLS 450 4M',   mib: 2000, r: { 24: 0.57, 36: 0.50, 48: 0.38 }, mf: { 24: 0.00130, 36: 0.00130, 48: 0.00130 } },
  // Sprinter — special lease MF .00195 (A9-T2), MY26 residuals
  sprinter2500: { name: 'MY26 Sprinter 2500 144"', mib: 1500, van: true,
    r: { 24: 0.56, 36: 0.49, 48: 0.42, 60: 0.35 }, mf: { 24: 0.00195, 36: 0.00195, 48: 0.00195, 60: 0.00195 } },
  sprinter3500: { name: 'MY26 Sprinter 3500 170"', mib: 1500, van: true,
    r: { 24: 0.54, 36: 0.47, 48: 0.40, 60: 0.34 }, mf: { 24: 0.00195, 36: 0.00195, 48: 0.00195, 60: 0.00195 } },
};

const a = args();

if (a.list || !a.model) {
  console.log(heading('Models loaded (August 2026 programs)'));
  for (const [k, m] of Object.entries(MODELS)) {
    console.log(`  ${c.bold(k.padEnd(14))} ${m.name.padEnd(26)} ${c.dim('MIB ' + money(m.mib))}`);
  }
  console.log(rule());
  console.log(c.dim('  node sales/quote.mjs --model glc300 --msrp 52000 --term 24'));
  process.exit(0);
}

const key = String(a.model).toLowerCase();
const m = MODELS[key];
if (!m) { console.error(c.red(`Unknown model "${a.model}". Run --list.`)); process.exit(1); }

const msrp = Number(a.msrp);
if (!msrp) { console.error(c.red('Need --msrp (e.g. --msrp 52000)')); process.exit(1); }

const term = Number(a.term || 36);
const down = Number(a.down || 0);
const sell = Number(a.sell || msrp);          // selling price before incentives
const rebate = a.rebate !== undefined ? Number(a.rebate) : m.mib;

console.log(heading(`${m.name} — ${money(msrp)} MSRP`));

if (a.finance) {
  // ---- finance ----
  const apr = Number(a.finance);
  const principal = sell - down - rebate;
  const r = apr / 100 / 12;
  const pmt = r === 0 ? principal / term : (principal * r) / (1 - Math.pow(1 + r, -term));
  console.log(`  Selling price      ${money(sell)}`);
  console.log(`  Down               ${c.dim('-' + money(down))}`);
  console.log(`  Incentive          ${c.green('-' + money(rebate))}`);
  console.log(`  Amount financed    ${c.bold(money(principal))}`);
  console.log(`  ${apr}% × ${term} mo`);
  console.log(rule());
  console.log(`  ${c.bold(c.cyan('≈ ' + money(pmt) + '/mo'))}  ${c.dim('(pre-tax, pre-fee)')}`);
} else {
  // ---- lease ----
  const res = m.r[term];
  const mf = m.mf[term];
  if (!res) {
    console.error(c.red(`No ${term}-month data for ${key}. Available: ${Object.keys(m.r).join(', ')}`));
    process.exit(1);
  }
  const residual = msrp * res;
  const netCap = sell - down - rebate;
  const depreciation = (netCap - residual) / term;
  const rentCharge = (netCap + residual) * mf;
  const pmt = depreciation + rentCharge;
  const apr = (mf * 2400).toFixed(2);

  console.log(`  Selling price      ${money(sell)}`);
  console.log(`  Cap reduction      ${c.dim('-' + money(down))}`);
  console.log(`  Incentive (MIB)    ${c.green('-' + money(rebate))}`);
  console.log(`  Net cap cost       ${c.bold(money(netCap))}`);
  console.log(`  Residual           ${money(residual)}  ${c.dim(`(${(res * 100).toFixed(0)}% × ${term}mo)`)}`);
  console.log(`  Money factor       ${mf.toFixed(5)}  ${c.dim(`(≈ ${apr}% APR)`)}`);
  console.log(rule());
  console.log(`  depreciation ${money(depreciation)}  +  rent ${money(rentCharge)}`);
  console.log(`  ${c.bold(c.cyan('≈ ' + money(pmt) + '/mo'))}  ${c.dim('(pre-tax, pre-fee, 15k mi/yr)')}`);
  console.log(c.dim(`  10k mi/yr adds ~3% residual → roughly ${money(pmt - (msrp * 0.03) / term)}/mo`));

  // Work backward: what selling price lands a target payment?
  if (a.target) {
    const target = Number(a.target);
    const neededCap = (target - residual * (mf - 1 / term)) / (1 / term + mf);
    const neededSell = neededCap + down + rebate;
    const discount = sell - neededSell;
    console.log(rule());
    console.log(c.bold(`TO HIT ${money(target)}/mo`));
    console.log(`  Sell at            ${c.bold(money(neededSell))}`);
    console.log(
      discount > 0
        ? `  Discount needed    ${c.yellow(money(discount))}  ${c.dim(`(${((discount / msrp) * 100).toFixed(1)}% off MSRP)`)}`
        : `  ${c.green('Already there')} — ${money(-discount)} of room above MSRP.`
    );
    console.log(c.dim('  Add Regional Cash / conquest / LAP and the gap shrinks fast.'));
  }
}

console.log(rule());
console.log(c.yellow('  Estimate only — confirm with the desk before you quote a customer.'));
if (m.van) {
  console.log(c.dim('  Van note: Lease Bonus Cash and Customer Cash do NOT stack — pick one.'));
  console.log(c.dim('  CBSP/Medium-Fleet customers get far larger cash. Check the CAN first.'));
}
