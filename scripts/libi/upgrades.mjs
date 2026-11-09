#!/usr/bin/env node
/**
 * Lists every Builder Pass and who has earned the Gold certificate upgrade.
 *
 *   node scripts/libi/upgrades.mjs entries.txt
 *
 * entries.txt: paste in every "LIBI_LEAD {...}" line, from the Vercel runtime logs
 * (search LIBI_LEAD) or from the bottom of the lead emails. Lines without one are ignored,
 * so you can paste whole log exports.
 * For passes that came in by text, add a line like:
 *   LIBI_LEAD {"name":"Jane Doe","phone":"6315550123","code":"JANE123","ref":"PAT396"}
 *
 * Gold: someone activated a pass with your code, or you activated yours with someone else's.
 * Duplicates (same phone) count once.
 */
import fs from "node:fs";

const [file] = process.argv.slice(2);
if (!file) {
  console.error("Usage: node scripts/libi/upgrades.mjs entries.txt");
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
const codes = new Set(list.map((p) => p.code));
const rows = list.map((p) => {
  const brought = list.filter((o) => o.ref && o.ref === p.code && o.phone !== p.phone);
  const cameFrom = p.ref && p.ref !== p.code ? p.ref : "";
  return { ...p, brought, cameFrom, gold: brought.length > 0 || Boolean(cameFrom) };
});
rows.sort((a, b) => Number(b.gold) - Number(a.gold) || b.brought.length - a.brought.length || a.name.localeCompare(b.name));

const gold = rows.filter((r) => r.gold);
console.log(`\n${rows.length} passes · ${gold.length} Gold · ${rows.length - gold.length} Silver\n`);
for (const r of rows) {
  const why = [
    r.brought.length && `brought in ${r.brought.map((o) => o.name).join(", ")}`,
    r.cameFrom && `came in on ${r.cameFrom}${codes.has(r.cameFrom) ? "" : " (code not on file)"}`,
  ].filter(Boolean).join("; ");
  console.log(`${r.gold ? "GOLD  " : "silver"}  ${r.name}${r.company ? ` (${r.company})` : ""}  ${r.code}  ${r.phone}${why ? `  [${why}]` : ""}`);
}
console.log("");
