import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { EVENT, MEMBER_OFFER, MK, PAGE_PATH, PRIZE, ROLES, SITE, STORES, TIMELINES, cleanRef, shareCode } from "@/app/libi/campaign";

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
    ["Came from share code", lead.ref || "—"],
    ["Their share code", code],
    ["QR source", lead.src],
    ["OK to text/call", lead.consent ? "yes" : "NO, email only"],
  ];
  const tel = digits(lead.phone);
  const sms = `sms:${tel}?&body=${encodeURIComponent(
    `Hi ${lead.name.split(" ")[0]}, it's MK from Mercedes-Benz of Smithtown. Great meeting you at LIBI tonight! You're entered for the Mercedes weekend (drawing ${PRIZE.drawShort}). Your $1,500 LIBI offer is good through ${MEMBER_OFFER.expiresShort}. Save my number!`,
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
    <p style="font-size:12px;color:#888;">Log them in CRM tonight. Their friends who enter with code ${escapeHtml(code)} earn them an extra entry.</p>
    <p style="font-size:10px;color:#aaa;font-family:monospace;word-break:break-all;">For the drawing (scripts/libi/draw.mjs):<br>${escapeHtml(record)}</p>
  </body></html>`;
  const plain = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nFor the drawing:\n${record}`;
  return { html, plain };
}

function entrantEmail(lead: Lead, code: string) {
  const first = escapeHtml(lead.name.split(" ")[0]);
  const shareUrl = `${SITE_URL}${PAGE_PATH}?ref=${code}`;
  const html = `<!doctype html><html><body style="margin:0;background:#f4f2f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2f0;padding:28px 14px;"><tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border:1px solid #e7e3df;">
    <tr><td style="height:4px;background:#111;font-size:0;">&nbsp;</td></tr>
    <tr><td style="padding:34px 36px 6px;">
      <p style="margin:0 0 14px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#B23A59;">${escapeHtml(EVENT.short)} · You're entered</p>
      <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;line-height:1.15;color:#0E0E0E;">${first}, you're in the drawing for a Mercedes weekend.</h1>
      <p style="margin:14px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#2b2b2b;">${escapeHtml(PRIZE.detail)} I'll draw the winner on <strong>${escapeHtml(PRIZE.drawDate)}</strong> and call you if it's you.</p>
    </td></tr>
    <tr><td style="padding:18px 36px 4px;">
      <p style="margin:0 0 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#777;">Yours either way</p>
      <p style="margin:0 0 8px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#2b2b2b;"><strong>${escapeHtml(MEMBER_OFFER.headline)}</strong> ${escapeHtml(MEMBER_OFFER.sub)}, through ${escapeHtml(MEMBER_OFFER.expires)}.</p>
      <p style="margin:0 0 8px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#2b2b2b;"><strong>+$500 on Sprinter vans</strong> for NAHB members, on top of published offers.</p>
      <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#2b2b2b;"><strong>A free fleet equity check:</strong> reply with your vehicles and I'll tell you what each is worth today.</p>
    </td></tr>
    <tr><td style="padding:22px 36px 6px;">
      <p style="margin:0 0 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#777;">Get extra entries</p>
      <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#2b2b2b;">Every person who enters with your link earns you another entry. Send it to your crew, your partners, your buyers:</p>
      <p style="margin:12px 0 0;"><a href="${shareUrl}" style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#B23A59;">${shareUrl}</a></p>
    </td></tr>
    <tr><td align="center" style="padding:24px 36px 30px;">
      <a href="tel:${MK.work}" style="display:inline-block;background:#0E0E0E;color:#fff;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:15px 28px;">Call MK · ${MK.workDisplay}</a>
    </td></tr>
    <tr><td style="padding:20px 36px;border-top:1px solid #eeeae6;">
      <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#0E0E0E;">${escapeHtml(MK.name)}</p>
      <p style="margin:4px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#888;">${escapeHtml(MK.title)} · ${escapeHtml(MK.store)}<br>${escapeHtml(MK.group)} · ${escapeHtml(MK.address)}<br>Work ${MK.workDisplay} · Cell ${MK.cellDisplay}</p>
      <p style="margin:12px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;line-height:1.5;color:#aaa;">No purchase necessary. Open to adults 21+ with a valid driver's license and insurance. One winner, drawn ${escapeHtml(PRIZE.drawDate)}. Offers subject to dealer confirmation, residency and credit approval; see MK for details.</p>
    </td></tr>
  </table></td></tr></table></body></html>`;
  const plain =
    `${lead.name.split(" ")[0]}, you're entered to win a Mercedes weekend (drawing ${PRIZE.drawDate}).\n\n` +
    `Yours either way: ${MEMBER_OFFER.headline} ${MEMBER_OFFER.sub}, through ${MEMBER_OFFER.expires}; +$500 on Sprinter vans for NAHB members; and a free fleet equity check.\n\n` +
    `Extra entries: everyone who enters with your link earns you another one: ${shareUrl}\n\n` +
    `${MK.name}, ${MK.store}\nWork ${MK.workDisplay} · Cell ${MK.cellDisplay}`;
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
      subject: `${temp} LIBI lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
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
        subject: `You're entered: win a Mercedes weekend (drawing ${PRIZE.drawShort})`,
        html: e.html,
        text: e.plain,
        tags: [{ name: "kind", value: "libi_entrant" }],
      },
      ["entrant", lead.email],
    );
  }

  return json({ ok: true, notified, emailed, code });
}
