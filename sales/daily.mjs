#!/usr/bin/env node
/**
 * daily — the one command you run when you clock in.
 * Prints your shift's time blocks, your pace to goal, and who is due for follow-up.
 *
 *   node sales/daily.mjs            # today
 *   node sales/daily.mjs --day sat  # preview another shift
 */
import { config, loadJson, today, daysBetween, shiftsLeft, c, heading, rule, args } from './lib/util.mjs';

const PLAYS = {
  evening: {
    title: 'Evening-appointment engine — your best closing nights',
    blocks: [
      ['12:00–12:45', 'Set the board', ['Confirm tonight\'s appointments; pull the vehicles up front.', 'Clear overdue CRM tasks (run: pipeline.mjs due).', 'Pull AutoAlert equity + lease-maturity lists.']],
      ['1:00–2:00', 'POWER HOUR — equity calls', ['25+ dials. Lead with the good news, not "are you interested."', 'Book people for 6:00–7:30 TONIGHT — they are off work then.', 'Lease-enders: open with the LAP payment waiver.']],
      ['2:00–5:30', 'Floor + service drive', ['Take every up. Walk the service drive once.', 'Answer internet leads in under 10 minutes.']],
      ['5:30–8:00', 'PRIME — appointments show', ['Demo, work numbers, ask for the sale.', 'Ask every buyer for a referral before they leave.']],
      ['7:40–8:00', 'Close out', ['Log every conversation. Confirm tomorrow by text.']],
    ],
  },
  daytime: {
    title: 'Daytime prospecting + weekend loader',
    blocks: [
      ['9:00–9:45', 'Set the board', ['Clear CRM tasks; confirm today\'s appointments.']],
      ['9:45–11:00', 'POWER HOUR — COMMERCIAL BLOCK', ['Businesses answer the phone right now. This is your Sprinter window.', 'Work the CBSP franchise list (run: targets.mjs).', 'Also call retirees / self-employed who can come by day.']],
      ['11:00–2:00', 'Floor + service drive', ['Take ups. Walk the drive. Sub-10-minute lead response.']],
      ['2:00–3:00', 'POWER HOUR — leads & be-backs', ['You leave at 5, so SET FOR SATURDAY.', 'Re-touch every unsold from the last 7 days with something of value.']],
      ['4:30–5:00', 'Load the weekend', ['Confirm every Saturday appointment before you walk out.']],
    ],
  },
  floor: {
    title: 'Floor peak — be up all day',
    blocks: [
      ['8:30–9:00', 'Quick board set', ['Confirm today\'s appointments; vehicles pulled and clean.']],
      ['9:00–6:00', 'MAXIMIZE UPS', ['Highest walk-in traffic of the week. Minimize phone time.', 'Two service-drive walks. Referral ask at every delivery.']],
      ['5:30–6:00', 'Close out', ['Log everything. Confirm Sunday + Monday appointments.']],
    ],
  },
  family: {
    title: 'Short day — family ups & close-out',
    blocks: [
      ['11:00–3:30', 'Take ups', ['Couples and families shop Sundays — both decision-makers in the room.']],
      ['3:30–4:00', 'Reset the week', ['Confirm Monday + Tuesday appointments. Build next week\'s call list.']],
    ],
  },
};

const a = args();
const dayMap = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
const now = new Date();
const dow = a.day ? dayMap[String(a.day).toLowerCase().slice(0, 3)] : now.getDay();
if (dow === undefined) { console.error('--day must be sun..sat'); process.exit(1); }

const shift = config.schedule[String(dow)];
const iso = today();

console.log(heading(`${shift.label} — ${iso}`));

if (shift.off) {
  console.log(c.bold('Day off. Protect it.'));
  console.log(c.dim('Your CRM cadence keeps running; nothing breaks while you rest.'));
  console.log(c.dim('Six-day weeks only work if the seventh is real rest.'));
} else {
  const play = PLAYS[shift.mode];
  console.log(`${c.bold(shift.start + '–' + shift.end)}   ${c.dim(play.title)}\n`);
  for (const [time, name, items] of play.blocks) {
    const isPower = name.includes('POWER') || name.includes('PRIME') || name.includes('MAXIMIZE');
    console.log(`${c.cyan(time.padEnd(12))} ${isPower ? c.bold(name) : name}`);
    for (const it of items) console.log(`${' '.repeat(13)}${c.dim('· ' + it)}`);
    console.log('');
  }
}

// ---- pace ----
const db = loadJson('pipeline.json', { prospects: [] });
const sold = db.prospects.filter((p) => p.status === 'sold').length;
const goal = config.goal.units;
const left = shiftsLeft(iso);
const remaining = Math.max(0, goal - sold);
const perShift = left > 0 ? (remaining / left) : remaining;

console.log(rule());
console.log(c.bold('PACE'));
const bar = '█'.repeat(Math.round((sold / goal) * 24)).padEnd(24, '·');
const onPace = sold >= goal * (1 - left / Math.max(1, shiftsLeft(iso.slice(0, 8) + '01')));
console.log(`  ${(onPace ? c.green : c.yellow)(bar)}  ${c.bold(sold + '/' + goal)} units`);
console.log(`  ${left} shifts left · need ${c.bold(remaining)} more · ${perShift.toFixed(1)}/shift`);

// ---- due follow-ups ----
const due = db.prospects.filter((p) => {
  if (p.status !== 'active') return false;
  const step = config.cadenceDays[p.touches.length];
  if (step === undefined) return false;
  return daysBetween(p.firstContact, iso) >= step;
});
console.log(rule());
console.log(c.bold('FOLLOW-UPS'));
console.log(due.length
  ? `  ${c.red(due.length + ' prospect(s) waiting')} — run: ${c.bold('node sales/pipeline.mjs due')}`
  : c.dim('  Nothing overdue.'));

console.log(rule());
console.log(c.bold('DAILY TARGETS') + c.dim(`  ${config.dailyTargets.outboundTouches} touches · ${config.dailyTargets.liveConversations} conversations · ${config.dailyTargets.appointmentsSet} appointments set`));
