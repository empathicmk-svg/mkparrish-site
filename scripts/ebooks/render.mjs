// ─────────────────────────────────────────────────────────────────────────────
// Ebook render engine — turns structured content blocks into a branded, download-
// ready HTML file that matches the existing MK Parrish ebooks (void + petal, the
// same cover / section / print CSS). The <head> (Google Fonts + full style block)
// is reused verbatim from an existing ebook so the look is guaranteed identical.
//
// Block grammar (see scripts/ebooks/*.mjs for content):
//   "plain text"                 → <p>  (supports **bold** and *italic*)
//   "---"                        → <hr>
//   { h2: "Section title" }      → auto-numbered section heading (new page in PDF)
//   { h3: "Subsection" }         → Playfair italic subheading
//   { quote: "…" }               → pull quote
//   { ul: [ ... ] }              → bulleted list
//   { ol: [ ... ] }              → numbered list
//   { table: { head:[…], rows:[[…]] } }
// ─────────────────────────────────────────────────────────────────────────────

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const TEMPLATE = path.join(ROOT, "public", "downloads", "ebooks", "the-study.html");

// Pull the shared <head> (fonts + <style>…</style>) from an existing ebook.
function sharedHead() {
  const html = fs.readFileSync(TEMPLATE, "utf8");
  const head = html.slice(0, html.indexOf("</head>"));
  // Strip the template's <title> so we can set our own per book.
  return head.replace(/<title>[\s\S]*?<\/title>\s*/i, "");
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Inline markdown: **bold**, *italic*, and [text](href).
function inline(s) {
  let out = esc(s);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) => `<a href="${h}">${t}</a>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  return out;
}

function renderBlock(b) {
  if (b === "---") return "<hr>";
  if (typeof b === "string") return `<p>${inline(b)}</p>`;
  if (b.h2) return `<h2>${inline(b.h2)}</h2>`;
  if (b.h3) return `<h3>${inline(b.h3)}</h3>`;
  if (b.quote) return `<blockquote>${inline(b.quote)}</blockquote>`;
  if (b.ul) return `<ul>${b.ul.map((li) => `<li>${inline(li)}</li>`).join("")}</ul>`;
  if (b.ol) return `<ol>${b.ol.map((li) => `<li>${inline(li)}</li>`).join("")}</ol>`;
  if (b.table) {
    const head = b.table.head.map((h) => `<th>${inline(h)}</th>`).join("");
    const rows = b.table.rows
      .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
      .join("");
    return `<table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`;
  }
  return "";
}

// book = { slug, titleLead, titleRest, subtitle, price, blocks: [...] }
export function renderBook(book) {
  const body = book.blocks.map(renderBlock).join("\n");
  return `<!DOCTYPE html>
<html lang="en">
${sharedHead()}
<title>${esc(book.titleLead)} ${esc(book.titleRest)} — MK Parrish</title>
</head>
<body>

<div class="cover">
  <div class="cover-inner">
    <div class="cover-kicker">MK Parrish · mkparrish.com</div>
    <h1><span class="grad">${esc(book.titleLead)}</span> <span class="outline">${esc(book.titleRest)}</span></h1>
    <p class="subtitle">${esc(book.subtitle)}</p>
    <div class="cover-rule"></div>
    <div class="cover-meta">By MK Parrish · ${esc(book.price)}</div>
  </div>
</div>

<div class="content">
${body}
</div>

<div class="footer">
  <div class="footer-logo">MK Parrish</div>
  <div class="footer-legal">© MK Parrish · Rewrite Your Story · <a href="https://www.mkparrish.com">mkparrish.com</a></div>
</div>

</body>
</html>`;
}

export function writeBook(book) {
  const outDir = path.join(ROOT, "public", "downloads", "ebooks");
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, `${book.slug}.html`);
  fs.writeFileSync(out, renderBook(book), "utf8");
  const words = book.blocks
    .map((b) => (typeof b === "string" ? b : Object.values(b).flat().join(" ")))
    .join(" ")
    .split(/\s+/).length;
  return { out, words };
}
