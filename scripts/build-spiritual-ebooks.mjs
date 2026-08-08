#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Builds the manifestation / self-mastery ebook line into branded, download-ready
// HTML files that match the existing MK Parrish ebooks. Then run
// `node scripts/build-pdfs.mjs` (and build-epubs.mjs) to render the PDF/EPUB
// editions the shop links to.
//
//   node scripts/build-spiritual-ebooks.mjs
// ─────────────────────────────────────────────────────────────────────────────

import { writeBook, writeMarkdownSource } from "./ebooks/render.mjs";
import { theManifest } from "./ebooks/the-manifest.mjs";
import { theCompound } from "./ebooks/the-compound.mjs";
import { manifestingMoney } from "./ebooks/manifesting-money.mjs";
import { theMorningBlueprint } from "./ebooks/the-morning-blueprint.mjs";
import { theCosmosStarterKit } from "./ebooks/the-cosmos-starter-kit.mjs";

const BOOKS = [theManifest, theCompound, manifestingMoney, theMorningBlueprint, theCosmosStarterKit];

let total = 0;
for (const book of BOOKS) {
  const { out, words } = writeBook(book);
  writeMarkdownSource(book); // EPUB source → products/ebooks/<slug>.md
  total += words;
  const pages = Math.round(words / 300); // ~300 words per 6x9 page
  console.log(`✓ ${book.slug.padEnd(24)} ~${String(words).padStart(6)} words  (~${pages} pages)  → ${out.replace(process.cwd() + "/", "")}`);
}
console.log(`\nDone. ${BOOKS.length} ebooks (HTML + markdown source), ~${total} words total.`);
console.log("Next: node scripts/build-pdfs.mjs  &&  node scripts/build-epubs.mjs  &&  node scripts/build-covers.mjs");
