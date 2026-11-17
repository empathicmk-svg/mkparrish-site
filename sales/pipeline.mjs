#!/usr/bin/env node
/**
 * pipeline — a follow-up engine that never lets a prospect go cold.
 *
 *   node sales/pipeline.mjs add --name "Dana R." --source equity --vehicle "GLE 350"
 *   node sales/pipeline.mjs due
 *   node sales/pipeline.mjs touch <id> --note "left vm, sending video"
 *   node sales/pipeline.mjs appt  <id> --when "Tue 6:15p"
 *   node sales/pipeline.mjs sold  <id>
 *   node sales/pipeline.mjs lost  <id> --note "bought a BMW"
 *   node sales/pipeline.mjs list [--all]
 *
 * Stores names only — keep phone numbers and addresses in your CRM, not here.
 */
import { loadJson, saveJson, today, daysBetween, addDays, config, c, heading, args, rule } from './lib/util.mjs';

const FILE = 'pipeline.json';
const SOURCES = ['equity', 'lease-end', 'conquest', 'floor', 'internet', 'service', 'referral', 'sprinter'];

const load = () => loadJson(FILE, { prospects: [] });
const save = (db) => saveJson(FILE, db);
const nextId = (db) => String(Math.max(0, ...db.prospects.map((p) => Number(p.id) || 0)) + 1);

/**
 * Cadence: day 1,2,4,7,14,21,30 after first contact.
 * Keyed off touches COMPLETED, not days elapsed — otherwise a prospect you
 * never called silently "ages out" of the schedule instead of going red.
 */
function nextDue(p) {
  if (p.status !== 'active') return null;
  const step = config.cadenceDays[p.touches.length];
  if (step === undefined) return null; // worked the full cadence → long-term list
  return addDays(p.firstContact, step);
}

function statusTag(p) {
  if (p.status === 'sold') return c.green('SOLD');
  if (p.status === 'lost') return c.dim('lost');
  if (p.appointment) return c.yellow('APPT ' + p.appointment);
  return c.blue('active');
}

const a = args();
const cmd = a._[0] || 'due';
const db = load();

switch (cmd) {
  case 'add': {
    if (!a.name) exit('Need --name. Example: add --name "Dana R." --source equity');
    const source = a.source || 'floor';
    if (!SOURCES.includes(source)) exit(`--source must be one of: ${SOURCES.join(', ')}`);
    const p = {
      id: nextId(db),
      name: a.name,
      source,
      vehicle: a.vehicle || '',
      status: 'active',
      firstContact: a.date || today(),
      appointment: null,
      touches: [],
      notes: a.note ? [a.note] : [],
    };
    db.prospects.push(p);
    save(db);
    console.log(`${c.green('✓')} added #${p.id} ${c.bold(p.name)} (${p.source}) — first follow-up due ${nextDue(p)}`);
    break;
  }

  case 'touch': {
    const p = find(a._[1]);
    p.touches.push({ date: today(), note: a.note || '' });
    if (a.note) p.notes.push(a.note);
    save(db);
    console.log(`${c.green('✓')} logged touch #${p.touches.length} on ${c.bold(p.name)}`);
    break;
  }

  case 'appt': {
    const p = find(a._[1]);
    p.appointment = a.when || 'set';
    p.touches.push({ date: today(), note: `appointment set: ${p.appointment}` });
    save(db);
    console.log(`${c.yellow('★')} appointment set for ${c.bold(p.name)} — ${p.appointment}`);
    console.log(c.dim('  Confirm by text the night before.'));
    break;
  }

  case 'sold':
  case 'lost': {
    const p = find(a._[1]);
    p.status = cmd;
    p.closedOn = today();
    if (a.note) p.notes.push(a.note);
    save(db);
    console.log(cmd === 'sold'
      ? `${c.green('✓ SOLD')} — ${c.bold(p.name)}. Ask for the referral before they leave.`
      : `${c.dim('marked lost')} — ${p.name}`);
    break;
  }

  case 'due': {
    const now = today();
    const due = db.prospects
      .filter((p) => p.status === 'active')
      .map((p) => ({ p, due: nextDue(p) }))
      .filter((x) => x.due && x.due <= now)
      .sort((x, y) => x.due.localeCompare(y.due));

    console.log(heading(`Follow-ups due — ${now}`));
    if (!due.length) {
      console.log(c.dim('Nothing overdue. Add new prospects or work your AutoAlert lists.'));
      break;
    }
    for (const { p, due: d } of due) {
      const late = daysBetween(d, now);
      const flag = late > 0 ? c.red(`${late}d late`) : c.green('today');
      console.log(`${c.bold('#' + p.id)} ${p.name.padEnd(18)} ${c.dim(p.source.padEnd(10))} ${flag}`);
      if (p.vehicle) console.log(c.dim(`     interested in: ${p.vehicle}`));
      const last = p.touches.at(-1);
      if (last) console.log(c.dim(`     last: ${last.date} — ${last.note || 'no note'}`));
    }
    console.log(rule());
    console.log(c.dim(`Log each one:  node sales/pipeline.mjs touch <id> --note "..."`));
    break;
  }

  case 'list': {
    const rows = a.all ? db.prospects : db.prospects.filter((p) => p.status === 'active');
    console.log(heading(`Pipeline (${rows.length})`));
    if (!rows.length) { console.log(c.dim('Empty. Start with: pipeline.mjs add --name "..." --source equity')); break; }
    for (const p of rows) {
      console.log(`${c.bold('#' + p.id)} ${p.name.padEnd(18)} ${p.source.padEnd(10)} ${String(p.touches.length).padStart(2)} touches  ${statusTag(p)}`);
    }
    break;
  }

  default:
    console.log(`Unknown command "${cmd}". Try: add | due | touch | appt | sold | lost | list`);
}

function find(id) {
  const p = db.prospects.find((x) => x.id === String(id));
  if (!p) exit(`No prospect #${id}. Run "list" to see IDs.`);
  return p;
}

function exit(msg) {
  console.error(c.red('✗ ') + msg);
  process.exit(1);
}
