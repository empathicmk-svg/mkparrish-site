#!/usr/bin/env node
/**
 * earnings — what a deal actually pays you, and where the bonus cliffs are.
 *
 *   node sales/earnings.mjs deal --front 2200 --back 900          # new / Sprinter
 *   node sales/earnings.mjs deal --front 1400 --back 700 --used   # pre-owned
 *   node sales/earnings.mjs deal --front 900 --loaner --spot
 *   node sales/earnings.mjs month --units 14 --gross 32000
 *   node sales/earnings.mjs cliffs
 *
 * Reads sales/data/payplan.json — gitignored, because your plan carries an
 * NDA clause. If that file is missing, nothing here runs.
 */
import { loadJson, c, heading, rule, args, money, num } from './lib/util.mjs';

const plan = loadJson('payplan.json', null);
if (!plan) {
  console.error(c.red('✗ sales/data/payplan.json not found.'));
  console.error(c.dim('  That file holds your pay tiers and is intentionally not in git.'));
  process.exit(1);
}

const a = args();
const cmd = a._[0] || 'cliffs';
const cashAt = (u) => plan.unitsCashBonus[String(u)] ?? 0;
const pctAt = (u) => plan.unitsPercentBonus[String(u)] ?? 0;

try {
  if (cmd === 'deal') {
    const front = num(a.front, 'front', 0);
    const back = num(a.back, 'back', 0);
    const type = a.loaner ? plan.exLoaner : a.used ? plan.preOwned : plan.newVehicle;
    const days = num(a.days, 'days', 0);

    let adjFront = front;
    let aging = 0;
    if (type.agingBonusPerDay && days > type.agingAfterDays) {
      aging = (days - type.agingAfterDays) * type.agingBonusPerDay;
      adjFront += aging;
    }

    const rawFront = adjFront * type.frontEndPct;
    const useMin = rawFront < type.minCommission;
    const frontPay = useMin ? type.minCommission : rawFront;
    const backPay = back * type.backEndPct;
    const spot = a.spot ? plan.spotDeliveryBonus : 0;
    const total = frontPay + backPay + spot;

    console.log(heading(`${type.label} — deal payout`));
    console.log(`  Front-end gross    ${money(front)}`);
    if (aging) console.log(`  Aging bonus        ${c.green('+' + money(aging))}  ${c.dim(`(${days}d in stock)`)}`);
    console.log(`  Front commission   ${c.bold(money(frontPay))}  ${c.dim(useMin ? `MINIMUM (${(type.frontEndPct * 100).toFixed(0)}% would be ${money(rawFront)})` : `${(type.frontEndPct * 100).toFixed(0)}%`)}`);
    console.log(`  Back-end gross     ${money(back)}`);
    console.log(`  Back commission    ${money(backPay)}  ${c.dim('10%')}`);
    if (spot) console.log(`  Spot delivery      ${c.green('+' + money(spot))}`);
    console.log(rule());
    console.log(`  ${c.bold(c.cyan(money(total)))}  ${c.dim('before monthly bonuses')}`);
    if (useMin) {
      const breakeven = type.minCommission / type.frontEndPct;
      console.log(c.yellow(`  Mini deal — front gross under ${money(breakeven)} pays the same as ${money(breakeven)}.`));
      console.log(c.dim('  Above that line every extra dollar of gross is real money. Hold it.'));
    }
    console.log(c.dim(`\n  Chargeback risk: F&I cancels within ${plan.fniChargebackMonths} mo, reserve to ${plan.financeReserveChargebackMonths} mo.`));

  } else if (cmd === 'month') {
    const units = Math.round(num(a.units, 'units'));
    const gross = num(a.gross, 'gross', 0);
    const cash = cashAt(units);
    const pct = pctAt(units);
    const pctPay = gross * pct;

    console.log(heading(`Month projection — ${units} units`));
    console.log(`  Total front-end gross   ${money(gross)}  ${c.dim('(F&I excluded from this bonus)')}`);
    console.log(`  Units cash bonus        ${c.bold(money(cash))}`);
    console.log(`  Units percent bonus     ${c.bold(money(pctPay))}  ${c.dim(`(${(pct * 100).toFixed(2)}%)`)}`);
    console.log(rule());
    console.log(`  Bonus total             ${c.bold(c.cyan(money(cash + pctPay)))}`);
    console.log(c.dim('  Plus per-deal commissions, salary, CSI and supplemental bonuses.'));

    const nextCash = cashAt(units + 1);
    const nextPct = pctAt(units + 1);
    const avgGross = units > 0 ? gross / units : 0;
    const gain = (nextCash - cash) + ((gross + avgGross) * nextPct - pctPay);
    console.log(rule());
    console.log(c.bold(`ONE MORE CAR (unit ${units + 1}) is worth about ${c.green(money(gain))} in bonus alone`));
    console.log(c.dim('  …on top of that deal\'s own commission. This is why you never stop on the 30th.'));

  } else if (cmd === 'cliffs') {
    console.log(heading('Bonus cliffs — where one extra car pays huge'));
    console.log(c.dim('  Assumes ~$2,000 average front-end gross per unit for the % bonus.\n'));
    const AVG = num(a.avg, 'avg', 2000);
    const rows = [];
    for (let u = 11; u <= 30; u++) {
      const cash = cashAt(u), pct = pctAt(u);
      const totalB = cash + AVG * u * pct;
      const prev = cashAt(u - 1) + AVG * (u - 1) * pctAt(u - 1);
      rows.push({ u, cash, pct, totalB, jump: totalB - prev });
    }
    const maxJump = Math.max(...rows.map((r) => r.jump));
    for (const r of rows) {
      const isCliff = r.jump > maxJump * 0.45;
      const line = `  ${String(r.u).padStart(2)} units   cash ${money(r.cash).padStart(7)}   ${(r.pct * 100).toFixed(2)}%   bonus ${money(r.totalB).padStart(8)}   ${r.jump > 0 ? '+' + money(r.jump) : '—'}`;
      console.log(isCliff ? c.bold(c.green(line + '  ◀ CLIFF')) : (r.u === 15 ? c.bold(line) : line));
    }
    console.log(rule());
    console.log(c.bold('  Unit 12 turns the bonus on. Unit 15 more than doubles the cash bonus.'));
    console.log(c.bold('  Units 20 and 25 are the next two cliffs.'));
    console.log(c.dim('  Sprinters count as units here — same as any new MB.'));

  } else {
    console.log('Commands: deal | month | cliffs');
  }
} catch (err) {
  console.error(c.red('✗ ') + err.message);
  process.exit(1);
}
