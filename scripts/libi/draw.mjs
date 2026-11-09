#!/usr/bin/env node
/**
 * Tally entries and draw the LIBI Mercedes-weekend winner.
 *
 *   node scripts/libi/draw.mjs entries.txt            # show the tally only
 *   node scripts/libi/draw.mjs entries.txt --draw     # tally, then pick a winner
 *
 * entries.txt: paste in every "LIBI_LEAD {...}" line, from the Vercel runtime logs
 * (search LIBI_LEAD) or from the bottom of the lead emails. Lines without one are ignored,
 * so you can paste whole log exports.
 * For entries that came in by text, add a line like:
 *   LIBI_LEAD {"name":"Jane Doe","phone":"6315550123","code":"JANE123","ref":"PAT396"}
 *
 * Entries: one per person, plus one for each person who entered with their share code,
 * plus one if they referred someone on the form. Duplicates (same phone) count once.
 */
import fs from "node:fs";
import crypto from "node:crypto";

const [file, flag] = process.argv.slice(2);
if (!file) {
  console.error("Usage: node scripts/libi/draw.mjs entries.txt [--draw]");
  process.exit(1);
}

const people = new Map();
for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
  const i = line.indexOf("LIBI_LEAD");
  if (i < 0) continue;
  const start = line.indexOf("{", i);
  if (start < 0) continue;
  let rec;
  try {
    rec = JSON.parse(line.slice(start, line.lastIndexOf("}") + 1));
  } catch {
    continue;
  }
  const phone = String(rec.phone || "").replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (!rec.name || phone.length !== 10) continue;
  if (!people.has(phone)) people.set(phone, { ...rec, phone });
}

const list = [...people.values()];
const tally = list.map((p) => {
  const referrals = list.filter((o) => o.ref && o.ref === p.code && o.phone !== p.phone).length;
  const named = p.referName || p.referPhone ? 1 : 0;
  return { name: p.name, company: p.company || "", phone: p.phone, code: p.code, entries: 1 + referrals + named, referrals, named };
});
tally.sort((a, b) => b.entries - a.entries || a.name.localeCompare(b.name));

console.log(`\n${tally.length} people · ${tally.reduce((s, t) => s + t.entries, 0)} entries\n`);
for (const t of tally) {
  console.log(`${String(t.entries).padStart(3)}  ${t.name}${t.company ? ` (${t.company})` : ""}  ${t.code}  [${t.referrals} via link, ${t.named} named]`);
}

if (flag === "--draw" && tally.length) {
  const tickets = tally.flatMap((t) => Array(t.entries).fill(t));
  const winner = tickets[crypto.randomInt(tickets.length)];
  console.log(`\n🏁 Winner: ${winner.name}${winner.company ? ` (${winner.company})` : ""}, ${winner.phone}, ${winner.entries} of ${tickets.length} entries`);
  console.log("Screen-record this draw for the announcement post.\n");
}
