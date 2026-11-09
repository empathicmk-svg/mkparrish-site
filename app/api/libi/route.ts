import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { EVENT, MK, PAGE_PATH, PASS, PERKS, PRIZE, ROLES, SITE, STORES, TIMELINES, cleanRef, leadPerk, shareCode } from "@/app/libi/campaign";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || SITE).replace(/\/+$/, "");
const FROM = process.env.LEAD_FROM_EMAIL || "MK Parrish <hello@mkparrish.com>";
// Every entry goes to MK's personal inbox and her dealership inbox unless LIBI_NOTIFY_EMAILS overrides it.
const NOTIFY = (process.env.LIBI_NOTIFY_EMAILS || [process.env.LEAD_NOTIFY_EMAIL || "mkp414@icloud.com", MK.email].join(","))
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const MAX_BODY_BYTES = 8 * 1024;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_IP = 20; // A whole table can share one venue Wi-Fi IP.
const ipHits = new Map<string, { count: number; expiresAt: number }>();

type Lead = {
  name: string;
  phone: string;
  email: string;
  company: string;
  role: string;
  stores: string[];
  timeline: string;
  tradeIn: boolean;
  referName: string;
  referPhone: string;
  ref: string;
  src: string;
  consent: boolean;
};

function json(data: Record<string, unknown>, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(data, { ...init, headers });
}

function text(v: unknown, max = 120) {
  return typeof v === "string" ? v.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "";
}

function escapeHtml(v: string) {
  return v.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function digits(v: string) {
  return v.replace(/\D/g, "");
}

function prettyPhone(v: string) {
  const d = digits(v).replace(/^1(?=\d{10}$)/, "");
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : v;
}

function isAllowedOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const o = new URL(origin);
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const allowed = new Set(["https://www.mkparrish.com", "https://mkparrish.com", SITE_URL]);
    if (process.env.VERCEL_URL) allowed.add(`https://${process.env.VERCEL_URL}`);
    return allowed.has(o.origin) || Boolean(host && o.host === host);
  } catch {
    return false;
  }
}

function rateLimited(req: NextRequest) {
  const now = Date.now();
  const key =
    req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  for (const [k, v] of ipHits) if (v.expiresAt <= now) ipHits.delete(k);
  const hit = ipHits.get(key);
  if (!hit) {
    ipHits.set(key, { count: 1, expiresAt: now + RATE_WINDOW_MS });
    return false;
  }
  hit.count += 1;
  return hit.count > MAX_PER_IP;
}

function parse(body: Record<string, unknown>): Lead {
  const storeKeys = new Set<string>(STORES.map((s) => s.key));
  const stores = Array.isArray(body.stores)
    ? body.stores.filter((s): s is string => typeof s === "string" && storeKeys.has(s)).slice(0, STORES.length)
    : [];
  const role = text(body.role);
  const timeline = text(body.timeline);
  return {
    name: text(body.name, 80),
    phone: text(body.phone, 30),
    email: text(body.email, 254).toLowerCase(),
    company: text(body.company, 100),
    role: (ROLES as readonly string[]).includes(role) ? role : "",
    stores,
    timeline: (TIMELINES as readonly string[]).includes(timeline) ? timeline : "",
    tradeIn: body.tradeIn === true,
    referName: text(body.referName, 80),
    referPhone: text(body.referPhone, 30),
    ref: cleanRef(text(body.ref, 32)),
    src: text(body.src, 40).replace(/[^a-zA-Z0-9_-]/g, "") || "direct",
    consent: body.consent === true,
  };
}

async function send(payload: Record<string, unknown>, idem: string[]) {
  const key = process.env.RESEND_API_KEY || process.env.resend;
  if (!key) {
    console.warn("LIBI: RESEND_API_KEY not set, email skipped");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `libi-${crypto.createHash("sha256").update(idem.join(":")).digest("hex").slice(0, 48)}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("LIBI: Resend error", res.status, (await res.text().catch(() => "")).slice(0, 300));
      return false;
    }
    return true;
  } catch (err) {
    console.error("LIBI: Resend fetch error", err);
    return false;
  }
}

function storeLabels(keys: string[]) {
  return keys.map((k) => STORES.find((s) => s.key === k)?.label || k);
}

/** A hot lead is someone buying soon, with a trade, or interested in work vans. MK calls those first. */
function heat(lead: Lead) {
  let score = 0;
  if (lead.timeline === "Now") score += 3;
  if (lead.timeline === "1–3 months") score += 2;
  if (lead.tradeIn) score += 2;
  if (lead.stores.includes("sprinter")) score += 2;
  if (lead.role === "Builder / developer" || lead.role === "Trade / subcontractor") score += 1;
  if (lead.referName || lead.referPhone) score += 1;
  return score >= 5 ? "🔥 HOT" : score >= 3 ? "WARM" : "NURTURE";
}

function logLine(lead: Lead, code: string) {
  return `LIBI_LEAD ${JSON.stringify({ at: new Date().toISOString(), heat: heat(lead), code, ...lead })}`;
}

function ownerEmail(lead: Lead, code: string, record: string) {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Phone", prettyPhone(lead.phone)],
    ["Email", lead.email || "—"],
    ["Company", lead.company || "—"],
    ["Role", lead.role || "—"],
    ["Interested in", storeLabels(lead.stores).join(", ") || "—"],
    ["Timeline", lead.timeline || "—"],
    ["Trade-in / lease ending", lead.tradeIn ? "YES" : "no"],
    ["Referred someone", lead.referName || lead.referPhone ? `${lead.referName} ${prettyPhone(lead.referPhone)}`.trim() : "—"],
    ["Came from pass link", lead.ref || "—"],
    ["Their pass №", code],
    ["QR source", lead.src],
    ["OK to text/call", lead.consent ? "yes" : "NO, email only"],
  ];
  const tel = digits(lead.phone);
  const sms = `sms:${tel}?&body=${encodeURIComponent(
    `Hi ${lead.name.split(" ")[0]}, it's MK from Mercedes-Benz of Smithtown. Great meeting you at LIBI tonight! Your Competition Builder Pass is ${code}, good at all five Competition stores through ${PASS.validShort}, and you're in the Mercedes weekend drawing (${PRIZE.drawShort}). Save my number!`,
  )}`;
  const html = `<!doctype html><html><body style="font-family:Helvetica,Arial,sans-serif;color:#111;">
    <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#B23A59;margin:0 0 6px;">${escapeHtml(EVENT.short)} lead · ${heat(lead)}</p>
    <h2 style="margin:0 0 14px;">${escapeHtml(lead.name)}${lead.company ? ` · ${escapeHtml(lead.company)}` : ""}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-size:14px;">
      ${rows.map(([k, v]) => `<tr><td style="color:#777;border-bottom:1px solid #eee;">${escapeHtml(k)}</td><td style="border-bottom:1px solid #eee;"><strong>${escapeHtml(v)}</strong></td></tr>`).join("")}
    </table>
    <p style="margin:18px 0 6px;">
      <a href="tel:${tel}" style="background:#111;color:#fff;padding:10px 18px;text-decoration:none;">Call</a>
      &nbsp;<a href="${escapeHtml(sms)}" style="background:#B23A59;color:#fff;padding:10px 18px;text-decoration:none;">Text them</a>
    </p>
    <p style="font-size:12px;color:#888;">Log them in CRM tonight. Pass № ${escapeHtml(code)}: friends who get a pass through their link earn them extra drawing entries.</p>
    <p style="font-size:10px;color:#aaa;font-family:monospace;word-break:break-all;">For the drawing (scripts/libi/draw.mjs):<br>${escapeHtml(record)}</p>
  </body></html>`;
  const plain = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nFor the drawing:\n${record}`;
  return { html, plain };
}

function entrantEmail(lead: Lead, code: string) {
  const first = escapeHtml(lead.name.split(" ")[0]);
  const holder = escapeHtml(lead.name);
  const shareUrl = `${SITE_URL}${PAGE_PATH}?ref=${code}`;
  const perks = [leadPerk(), ...PERKS.slice(1)];
  const PINK = "#FFB5D0";
  const font = "Helvetica,Arial,sans-serif";
  const display = "'Bebas Neue',Impact,'Arial Narrow',sans-serif";
  const html = `<!doctype html><html><head><meta name="color-scheme" content="dark light"><style>@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital@1&display=swap');</style></head>
  <body style="margin:0;background:#080808;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:28px 14px;"><tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;">
    <tr><td style="padding:0 4px 18px;font-family:${display};font-size:24px;letter-spacing:4px;color:#F0F0EE;">MK PARRISH</td></tr>
    <tr><td style="background:#111111;border:1px solid ${PINK};border-radius:16px;padding:26px 28px;">
      <p style="margin:0;font-family:${font};font-size:10px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#7A7A7A;">Competition Automotive Group</p>
      <p style="margin:6px 0 0;font-family:${display};font-size:52px;line-height:1;letter-spacing:1px;color:${PINK};">BUILDER PASS</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;"><tr>
        <td style="font-family:${font};font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#7A7A7A;">Pass holder<br><span style="font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:20px;letter-spacing:0;text-transform:none;color:#F0F0EE;">${holder}</span></td>
        <td align="right" style="font-family:${font};font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#7A7A7A;">Pass №<br><span style="font-family:${display};font-size:30px;letter-spacing:3px;color:#F0F0EE;">${code}</span></td>
      </tr></table>
      <p style="margin:16px 0 0;font-family:${font};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${PINK};">LIBI ${escapeHtml(EVENT.dateShort)} · Valid thru ${escapeHtml(PASS.validThrough)}</p>
    </td></tr>
    <tr><td style="padding:28px 4px 6px;">
      <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:22px;line-height:1.35;color:${PINK};">${first}, your pass is live.</p>
      <p style="margin:10px 0 0;font-family:${font};font-size:15px;line-height:1.7;color:#B0B0B0;">Show pass <strong style="color:#F0F0EE;">${code}</strong> to me, or at any Competition Automotive Group store, and you're treated as a LIBI builder. Here's what it unlocks:</p>
    </td></tr>
    ${perks
      .map(
        (p) => `<tr><td style="padding:12px 4px;border-bottom:1px solid #2C2C2C;">
      <p style="margin:0;font-family:${display};font-size:20px;letter-spacing:1px;color:#F0F0EE;">${escapeHtml(p.title.toUpperCase())}</p>
      <p style="margin:2px 0 0;font-family:${font};font-size:14px;line-height:1.6;color:#B0B0B0;">${escapeHtml(p.desc)}</p></td></tr>`,
      )
      .join("")}
    <tr><td style="padding:24px 4px 6px;">
      <p style="margin:0;font-family:${font};font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#7A7A7A;">Pass it on · extra entries</p>
      <p style="margin:8px 0 0;font-family:${font};font-size:15px;line-height:1.7;color:#B0B0B0;">Everyone who gets a pass through your link adds an entry for you in the Mercedes weekend drawing (${escapeHtml(PRIZE.drawDate)}):</p>
      <p style="margin:10px 0 0;"><a href="${shareUrl}" style="font-family:${font};font-size:15px;color:${PINK};">${shareUrl}</a></p>
    </td></tr>
    <tr><td align="center" style="padding:26px 4px 30px;">
      <a href="tel:${MK.work}" style="display:inline-block;background:${PINK};color:#080808;text-decoration:none;font-family:${font};font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:15px 28px;">Call MK · ${MK.workDisplay}</a>
    </td></tr>
    <tr><td style="padding:20px 4px;border-top:1px solid #2C2C2C;">
      <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:16px;color:${PINK};">${escapeHtml(MK.name)}</p>
      <p style="margin:4px 0 0;font-family:${font};font-size:12px;line-height:1.6;color:#7A7A7A;">${escapeHtml(MK.title)} · ${escapeHtml(MK.store)}<br>${escapeHtml(MK.group)} · ${escapeHtml(MK.address)}<br>Work ${MK.workDisplay} · Cell ${MK.cellDisplay}</p>
      <p style="margin:12px 0 0;font-family:${font};font-size:11px;line-height:1.5;color:#4A4A4A;">No purchase necessary. Drawing open to adults 21+ with a valid driver's license and insurance; one winner, drawn ${escapeHtml(PRIZE.drawDate)}. Pass benefits subject to dealer confirmation, residency and credit approval; see MK for details.</p>
    </td></tr>
  </table></td></tr></table></body></html>`;
  const plain =
    `${lead.name.split(" ")[0]}, your Competition Builder Pass is live.\n\nPass №: ${code}\nValid thru ${PASS.validThrough} at all five Competition Automotive Group stores.\n\n` +
    perks.map((p) => `- ${p.title}: ${p.desc}`).join("\n") +
    `\n\nPass it on (extra drawing entries): ${shareUrl}\n\n${MK.name}, ${MK.store}\nWork ${MK.workDisplay} · Cell ${MK.cellDisplay}`;
  return { html, plain };
}

export async function POST(req: NextRequest) {
  if (Number(req.headers.get("content-length") || 0) > MAX_BODY_BYTES) return json({ error: "Too large" }, { status: 413 });
  if (!isAllowedOrigin(req)) return json({ error: "Origin not allowed" }, { status: 403 });
  if (rateLimited(req)) return json({ error: "Too many requests" }, { status: 429 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (typeof body.website === "string" && body.website.trim()) return json({ ok: true, notified: true, code: "LIBI100" });

  const lead = parse(body);
  if (!lead.name) return json({ error: "Name is required" }, { status: 422 });
  if (digits(lead.phone).length < 10) return json({ error: "A 10-digit phone number is required" }, { status: 422 });
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return json({ error: "That email doesn't look right" }, { status: 422 });

  const code = shareCode(lead.name, lead.phone);
  const temp = heat(lead);

  // Backup record: if an email ever fails, every entry is still in the Vercel runtime logs (search "LIBI_LEAD").
  const record = logLine(lead, code);
  console.log(record);

  const owner = ownerEmail(lead, code, record);
  const notified = await send(
    {
      from: FROM,
      to: NOTIFY,
      ...(lead.email ? { reply_to: lead.email } : {}),
      subject: `${temp} Builder Pass lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      html: owner.html,
      text: owner.plain,
      tags: [
        { name: "kind", value: "libi_lead" },
        { name: "src", value: lead.src },
      ],
    },
    ["owner", digits(lead.phone), lead.name.toLowerCase()],
  );

  let emailed = false;
  if (lead.email) {
    const e = entrantEmail(lead, code);
    emailed = await send(
      {
        from: FROM,
        to: [lead.email],
        reply_to: MK.email,
        subject: `Your Competition Builder Pass: ${code}`,
        html: e.html,
        text: e.plain,
        tags: [{ name: "kind", value: "libi_entrant" }],
      },
      ["entrant", lead.email],
    );
  }

  return json({ ok: true, notified, emailed, code });
}
