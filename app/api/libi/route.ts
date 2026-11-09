import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { CERT, EVENT, GOLD, MK, PAGE_PATH, PASS, PERKS, ROLES, SITE, STORES, TIMELINES, cleanRef, leadPerk, levelLabel, shareCode, type Level } from "@/app/libi/campaign";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || SITE).replace(/\/+$/, "");
// Send from the site's verified address, but under the Competition program's name.
const FROM_ADDRESS = (process.env.LEAD_FROM_EMAIL || "hello@mkparrish.com").match(/<([^>]+)>/)?.[1] ?? (process.env.LEAD_FROM_EMAIL || "hello@mkparrish.com");
const FROM = `Competition Builder Pass <${FROM_ADDRESS}>`;
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

function logLine(lead: Lead, code: string, level: Level) {
  return `LIBI_LEAD ${JSON.stringify({ at: new Date().toISOString(), heat: heat(lead), code, level, ...lead })}`;
}

function ownerEmail(lead: Lead, code: string, level: Level, record: string) {
  const first = lead.name.split(" ")[0];
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
    ["Came from pass link", lead.ref ? `${lead.ref} (upgrade ${lead.ref} to ${GOLD.label})` : "—"],
    ["Their pass №", code],
    ["Certificate level", levelLabel(level).toUpperCase()],
    ["QR source", lead.src],
    ["OK to text/call", lead.consent ? "yes" : "NO, email only"],
  ];
  const tel = digits(lead.phone);
  const sms = `sms:${tel}?&body=${encodeURIComponent(
    `Hi ${first}, it's MK from Mercedes-Benz of Smithtown. Great meeting you at LIBI tonight! Your Competition Builder Pass is ${code}, good at all five Competition stores through ${PASS.validShort}, and it includes your ${levelLabel(level)} ${CERT.short}. Which Mercedes should I have pulled up for you, and what day works? Save my number!`,
  )}`;
  const html = `<!doctype html><html><body style="font-family:Helvetica,Arial,sans-serif;color:#111;">
    <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#1557C0;margin:0 0 6px;">${escapeHtml(EVENT.short)} lead · ${heat(lead)}</p>
    <h2 style="margin:0 0 14px;">${escapeHtml(lead.name)}${lead.company ? ` · ${escapeHtml(lead.company)}` : ""}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-size:14px;">
      ${rows.map(([k, v]) => `<tr><td style="color:#777;border-bottom:1px solid #eee;">${escapeHtml(k)}</td><td style="border-bottom:1px solid #eee;"><strong>${escapeHtml(v)}</strong></td></tr>`).join("")}
    </table>
    <p style="margin:18px 0 6px;">
      <a href="tel:${tel}" style="background:#06142E;color:#fff;padding:10px 18px;text-decoration:none;">Call</a>
      &nbsp;<a href="${escapeHtml(sms)}" style="background:#1557C0;color:#fff;padding:10px 18px;text-decoration:none;">Text them</a>
    </p>
    ${lead.ref ? `<p style="font-size:14px;background:#FFF6DC;border-left:4px solid #E0A82E;padding:10px 12px;"><strong>${GOLD.label} upgrade:</strong> ${escapeHtml(first)} activated with code <strong>${escapeHtml(lead.ref)}</strong>. Both certificates are now ${GOLD.label} (${escapeHtml(GOLD.reward.toLowerCase())}). Text the holder of ${escapeHtml(lead.ref)} to tell them.</p>` : ""}
    <p style="font-size:12px;color:#888;">Log them in CRM tonight. Pass № ${escapeHtml(code)}: when a colleague activates a pass with this code, both certificates go ${GOLD.label}.</p>
    <p style="font-size:10px;color:#aaa;font-family:monospace;word-break:break-all;">For the ${GOLD.label} tally (scripts/libi/upgrades.mjs):<br>${escapeHtml(record)}</p>
  </body></html>`;
  const plain = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nFor the ${GOLD.label} tally:\n${record}`;
  return { html, plain };
}

function entrantEmail(lead: Lead, code: string, level: Level) {
  const first = escapeHtml(lead.name.split(" ")[0]);
  const holder = escapeHtml(lead.name);
  const shareUrl = `${SITE_URL}${PAGE_PATH}?ref=${code}`;
  const perks = [leadPerk(), ...PERKS.slice(1)];
  const gold = level === "gold";
  // Competition Automotive Group colours: dark navy and white, with a bright blue accent.
  // Montserrat where the mail app allows web fonts.
  const STEEL = "#5EB0FF"; // accent on navy
  const BLUE = "#1557C0"; // accent on white
  const GOLD_C = "#F2C14E";
  const SILVER = "#B9C9E4";
  const INK = "#06142E";
  const font = "Montserrat,'Helvetica Neue',Helvetica,Arial,sans-serif";
  const html = `<!doctype html><html><head><meta name="color-scheme" content="light"><style>@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;700&display=swap');</style></head>
  <body style="margin:0;background:#EEF3FA;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF3FA;padding:28px 14px;"><tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;">
    <tr><td style="background:${INK};border-radius:12px 12px 0 0;padding:22px 28px;font-family:${font};">
      <div style="font-size:24px;font-weight:500;letter-spacing:2px;color:#FFFFFF;">COMPETITION</div>
      <div style="font-size:9px;font-weight:400;letter-spacing:5px;margin-top:5px;color:${STEEL};">AUTOMOTIVE GROUP</div>
    </td></tr>
    <tr><td style="height:14px;font-size:0;line-height:0;">&nbsp;</td></tr>
    <tr><td style="background:${INK};background-image:linear-gradient(135deg,#1B3F7A 0%,#0C2247 50%,${INK} 100%);border:1px solid #24467F;border-radius:16px;padding:26px 28px;font-family:${font};color:#FFFFFF;">
      <div style="font-size:10px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${STEEL};">LIBI ${escapeHtml(EVENT.dateShort)} · Valid thru ${escapeHtml(PASS.validShort)}</div>
      <div style="margin-top:10px;font-size:34px;font-weight:600;letter-spacing:5px;line-height:1.1;">BUILDER PASS</div>
      <div style="margin-top:10px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${gold ? GOLD_C : "#FFFFFF"};">${escapeHtml(levelLabel(level))} · ${escapeHtml(CERT.short)}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;"><tr>
        <td style="font-family:${font};font-size:9px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${SILVER};">Pass holder<br><span style="font-size:18px;font-weight:500;letter-spacing:1px;text-transform:none;color:#FFFFFF;">${holder}</span></td>
        <td align="right" style="font-family:${font};font-size:9px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${SILVER};">Pass №<br><span style="font-size:24px;font-weight:600;letter-spacing:4px;color:#FFFFFF;">${code}</span></td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:28px 4px 6px;font-family:${font};">
      <div style="font-size:20px;font-weight:600;color:${INK};">${first}, your pass is live.</div>
      <div style="margin-top:10px;font-size:15px;line-height:1.7;color:#33415C;">Show pass <strong>${code}</strong> to me, or at any Competition Automotive Group store, and you're treated as a LIBI builder. Here's what it unlocks:</div>
    </td></tr>
    ${perks
      .map(
        (p) => `<tr><td style="padding:12px 4px;border-bottom:1px solid #D5DFEE;font-family:${font};">
      <div style="font-size:13px;font-weight:700;letter-spacing:2px;color:${INK};">${escapeHtml(p.title.toUpperCase())}</div>
      <div style="margin-top:3px;font-size:14px;line-height:1.6;color:#4E5359;">${escapeHtml(p.desc)}</div></td></tr>`,
      )
      .join("")}
    <tr><td style="padding:22px 0 6px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:2px dashed ${INK};border-radius:14px;"><tr><td style="padding:22px 24px;font-family:${font};">
        <div style="font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${BLUE};">Certificate · ${escapeHtml(levelLabel(level))}${gold ? " ★" : ""}</div>
        <div style="margin-top:8px;font-size:22px;font-weight:700;letter-spacing:1px;line-height:1.2;color:${INK};">${escapeHtml(CERT.headline)}</div>
        <div style="margin-top:8px;font-size:14px;line-height:1.6;color:#33415C;">${escapeHtml(CERT.detail)}</div>
        ${gold ? `<div style="margin-top:12px;font-size:14px;line-height:1.6;color:${INK};"><strong>${escapeHtml(GOLD.label)} upgrade: ${escapeHtml(GOLD.reward)}.</strong> ${escapeHtml(GOLD.desc)}</div>` : ""}
        <div style="margin-top:14px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${INK};">Code ${code} · ${escapeHtml(CERT.redeem)} · thru ${escapeHtml(PASS.validShort)}</div>
      </td></tr></table>
    </td></tr>
    <tr><td style="padding:24px 4px 6px;font-family:${font};">
      <div style="font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${BLUE};">${gold ? "Pass it on" : `Share your code · go ${escapeHtml(GOLD.label)}`}</div>
      <div style="margin-top:8px;font-size:15px;line-height:1.7;color:#33415C;">${
        gold
          ? `Your certificate is already ${escapeHtml(GOLD.label)}. Send your link to a partner or foreman and their certificate starts at ${escapeHtml(GOLD.label)} too:`
          : `When a colleague activates a pass with your link, you both go ${escapeHtml(GOLD.label)}: ${escapeHtml(GOLD.reward.toLowerCase())} when you come in for your drive. I'll text you when your upgrade lands.`
      }</div>
      <div style="margin-top:10px;"><a href="${shareUrl}" style="font-size:15px;font-weight:600;color:${BLUE};">${shareUrl}</a></div>
    </td></tr>
    <tr><td align="center" style="padding:26px 4px 30px;">
      <a href="tel:${MK.cell}" style="display:inline-block;background:${INK};color:#FFFFFF;text-decoration:none;font-family:${font};font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:15px 28px;border-radius:6px;">Call or text MK · ${MK.cellDisplay}</a>
    </td></tr>
    <tr><td style="padding:20px 4px;border-top:1px solid #D5DFEE;font-family:${font};">
      <div style="font-size:10px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${BLUE};">Your LIBI contact</div>
      <div style="margin-top:4px;font-size:15px;font-weight:600;color:${INK};">${escapeHtml(MK.name)}</div>
      <div style="margin-top:4px;font-size:12px;line-height:1.6;color:#6A7076;">${escapeHtml(MK.title)} · ${escapeHtml(MK.store)}<br>${escapeHtml(MK.group)} · ${escapeHtml(MK.address)}<br>Cell ${MK.cellDisplay}</div>
      <div style="margin-top:12px;font-size:11px;line-height:1.5;color:#9AA0A6;">No purchase necessary. One certificate per person, by appointment through ${escapeHtml(PASS.validThrough)}; no cash value, not transferable. Test drives need a valid driver's license and are subject to vehicle availability. Pass and certificate benefits are subject to dealer confirmation, residency and credit approval; see MK for details.</div>
    </td></tr>
  </table></td></tr></table></body></html>`;
  const plain =
    `${lead.name.split(" ")[0]}, your Competition Builder Pass is live.\n\nPass №: ${code}\nValid thru ${PASS.validThrough} at all five Competition Automotive Group stores.\n\n` +
    perks.map((p) => `- ${p.title}: ${p.desc}`).join("\n") +
    `\n\n${levelLabel(level)} ${CERT.short}: ${CERT.detail}${level === "gold" ? ` ${GOLD.label} upgrade: ${GOLD.reward}.` : ""}\n${CERT.redeem}, code ${code}.` +
    `\n\n${level === "gold" ? "Pass it on" : `Share your code and you both go ${GOLD.label} (${GOLD.reward.toLowerCase()})`}: ${shareUrl}\n\n${MK.name}, ${MK.store}\nCell ${MK.cellDisplay}`;
  return { html, plain };
}

export async function POST(req: NextRequest) {
  if (Number(req.headers.get("content-length") || 0) > MAX_BODY_BYTES) return json({ error: "Too large" }, { status: 413 });
  if (!isAllowedOrigin(req)) return json({ error: "Origin not allowed" }, { status: 403 });
  if (rateLimited(req)) return json({ error: "Too many requests" }, { status: 429 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (typeof body.website === "string" && body.website.trim()) return json({ ok: true, notified: true, code: "LIBI100", level: "silver" });

  const lead = parse(body);
  if (!lead.name) return json({ error: "Name is required" }, { status: 422 });
  if (digits(lead.phone).length < 10) return json({ error: "A 10-digit phone number is required" }, { status: 422 });
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return json({ error: "That email doesn't look right" }, { status: 422 });

  const code = shareCode(lead.name, lead.phone);
  // Arriving through someone's share link starts the certificate at Gold (your own code doesn't count).
  if (lead.ref === code) lead.ref = "";
  const level: Level = lead.ref ? "gold" : "silver";
  const temp = heat(lead);

  // Backup record: if an email ever fails, every entry is still in the Vercel runtime logs (search "LIBI_LEAD").
  const record = logLine(lead, code, level);
  console.log(record);

  const owner = ownerEmail(lead, code, level, record);
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
    const e = entrantEmail(lead, code, level);
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

  return json({ ok: true, notified, emailed, code, level });
}
