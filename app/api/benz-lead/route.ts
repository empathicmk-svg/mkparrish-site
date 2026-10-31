import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

/**
 * The Benz Blonde lead intake.
 *
 * Separate from /api/subscribe because a car lead is not a newsletter signup:
 * it carries a phone number, a vehicle, a payoff, and a timeframe, and it has to
 * reach MK fast enough to matter. Mirrors the subscribe route's origin check,
 * rate limit, honeypot, and Resend transport.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mkparrish.com").replace(/\/+$/, "");
const FROM = process.env.LEAD_FROM_EMAIL || "MK Parrish <hello@mkparrish.com>";
const NOTIFY_EMAIL = process.env.BENZ_NOTIFY_EMAIL || process.env.LEAD_NOTIFY_EMAIL || "mkp414@icloud.com";

const MAX_BODY_BYTES = 12 * 1024;
const MAX_EMAIL_LENGTH = 254;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 12;

const INTENTS = {
  "test-drive": { label: "Test drive request", reply: "your test drive" },
  trade: { label: "Trade / equity check", reply: "your trade value" },
  "lease-end": { label: "Lease pull-ahead", reply: "your lease options" },
  fit: { label: "Which model fits", reply: "finding your Benz" },
  guide: { label: "Buyer's guide download", reply: "the buyer's guide" },
  referral: { label: "Referral", reply: "your referral" },
  general: { label: "General question", reply: "your question" },
} as const;

type Intent = keyof typeof INTENTS;

function normalizeIntent(value: unknown): Intent {
  return typeof value === "string" && value in INTENTS ? (value as Intent) : "general";
}

function json(data: Record<string, unknown>, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(data, { ...init, headers });
}

function cleanText(value: unknown, max = 160) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function cleanEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isValidEmail(email: string) {
  return email.length <= MAX_EMAIL_LENGTH && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Digits only, so "(631) 555-0134" and "631-555-0134" count as the same lead. */
function digits(value: string) {
  return value.replace(/\D/g, "");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isAllowedOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const allowed = new Set(["https://www.mkparrish.com", "https://mkparrish.com", SITE_URL]);
    const vercelUrl = process.env.VERCEL_URL;
    if (vercelUrl) allowed.add(`https://${vercelUrl}`);

    return allowed.has(originUrl.origin) || Boolean(host && originUrl.host === host);
  } catch {
    return false;
  }
}

function clientKey(req: NextRequest) {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

const recentIpSubmissions = new Map<string, { count: number; expiresAt: number }>();
const recentLeads = new Map<string, number>();

function checkIpRateLimit(req: NextRequest) {
  const now = Date.now();
  const key = clientKey(req);
  for (const [storedKey, status] of recentIpSubmissions.entries()) {
    if (status.expiresAt <= now) recentIpSubmissions.delete(storedKey);
  }

  const status = recentIpSubmissions.get(key);
  if (!status || status.expiresAt <= now) {
    recentIpSubmissions.set(key, { count: 1, expiresAt: now + RATE_WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }

  status.count += 1;
  if (status.count > MAX_REQUESTS_PER_IP) {
    return { ok: false, retryAfter: Math.ceil((status.expiresAt - now) / 1000) };
  }

  return { ok: true, retryAfter: 0 };
}

/** Double-tapping submit should not page MK twice for the same person. */
function isDuplicate(contactKey: string, intent: string) {
  const now = Date.now();
  const key = `${contactKey}:${intent}`;

  for (const [storedKey, expiresAt] of recentLeads.entries()) {
    if (expiresAt <= now) recentLeads.delete(storedKey);
  }

  const existing = recentLeads.get(key);
  if (existing && existing > now) return true;

  recentLeads.set(key, now + RATE_WINDOW_MS);
  return false;
}

function idempotencyKey(...parts: string[]) {
  const hash = crypto.createHash("sha256").update(parts.join(":")).digest("hex");
  return `benz-${hash.slice(0, 48)}`;
}

async function responseSnippet(res: Response) {
  const text = await res.text().catch(() => "");
  return text.replace(/\s+/g, " ").slice(0, 500);
}

async function sendResendEmail(payload: Record<string, unknown>, idempotencyParts: string[]): Promise<boolean> {
  const key = process.env.RESEND_API_KEY || process.env.resend;
  if (!key) {
    console.warn("Resend API key not set. Benz lead email skipped; lead logged only.");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey(...idempotencyParts),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Resend send error:", res.status, await responseSnippet(res));
      return false;
    }

    return true;
  } catch (err) {
    console.error("Resend fetch error:", err);
    return false;
  }
}

type Lead = {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  timeframe: string;
  message: string;
  intent: Intent;
  source: string;
};

function ownerHtml(lead: Lead) {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#7a7a7a;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#111;"><strong>${escapeHtml(value)}</strong></td></tr>`
      : "";

  return `<!doctype html><html><body style="margin:0;background:#f4f2f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2f0;padding:28px 16px;"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#fff;border:1px solid #e7e3df;">
      <tr><td style="height:4px;background:linear-gradient(90deg,#E0869F,#F2AFC6 55%,#FFD6E4);font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:32px 36px 4px;">
        <p style="margin:0 0 14px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#B23A59;">The Benz Blonde &middot; New Lead</p>
        <h1 style="margin:0;font-family:Georgia,serif;font-size:26px;line-height:1.15;color:#0E0E0E;">${escapeHtml(INTENTS[lead.intent].label)}</h1>
      </td></tr>
      <tr><td style="padding:18px 36px 8px;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          ${row("Name", lead.name)}
          ${row("Phone", lead.phone)}
          ${row("Email", lead.email)}
          ${row("Vehicle", lead.vehicle)}
          ${row("Timeframe", lead.timeframe)}
          ${row("Source", lead.source)}
        </table>
      </td></tr>
      ${
        lead.message
          ? `<tr><td style="padding:8px 36px 8px;"><p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:#2b2b2b;white-space:pre-wrap;">${escapeHtml(lead.message)}</p></td></tr>`
          : ""
      }
      <tr><td style="padding:16px 36px 32px;">
        ${lead.phone ? `<a href="tel:${escapeHtml(digits(lead.phone))}" style="display:inline-block;background:#0E0E0E;color:#fff;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:14px 26px;margin:0 8px 8px 0;">Call now &rarr;</a>` : ""}
        <a href="mailto:${escapeHtml(lead.email)}" style="display:inline-block;background:#B23A59;color:#fff;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:14px 26px;margin:0 0 8px 0;">Reply &rarr;</a>
      </td></tr>
    </table></td></tr></table></body></html>`;
}

function customerHtml(lead: Lead) {
  const what = INTENTS[lead.intent].reply;
  return `<!doctype html><html><body style="margin:0;background:#f4f2f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2f0;padding:32px 16px;"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border:1px solid #e7e3df;">
      <tr><td style="height:4px;background:linear-gradient(90deg,#E0869F,#F2AFC6 55%,#FFD6E4);font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:38px 40px 8px;">
        <p style="margin:0 0 16px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#B23A59;">The Benz Blonde</p>
        <h1 style="margin:0 0 6px;font-family:Georgia,serif;font-size:28px;line-height:1.15;color:#0E0E0E;">Got it${lead.name ? `, ${escapeHtml(lead.name.split(" ")[0])}` : ""}.</h1>
        <p style="margin:14px 0 0;font-family:Georgia,serif;font-style:italic;font-size:16px;color:#7a7a7a;">I have ${escapeHtml(what)} in front of me.</p>
      </td></tr>
      <tr><td style="padding:16px 40px 8px;">
        <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#2b2b2b;">You will hear from me today &mdash; a real answer, not an auto-responder pretending to be one. If you want it faster, text me. That is the fastest line to me during a shift.</p>
      </td></tr>
      <tr><td align="center" style="padding:8px 40px 34px;">
        <a href="sms:+13478534238" style="display:inline-block;background:#0E0E0E;color:#fff;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:15px 30px;">Text me: 347.853.4238 &rarr;</a>
      </td></tr>
      <tr><td style="padding:22px 40px;border-top:1px solid #eeeae6;">
        <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#0E0E0E;">- MK</p>
        <p style="margin:4px 0 0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:1px;color:#b0b0b0;">The Benz Blonde &middot; Mercedes-Benz of Smithtown</p>
      </td></tr>
    </table></td></tr></table></body></html>`;
}

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json({ error: "Request too large" }, { status: 413 });
  }
  if (!isAllowedOrigin(req)) {
    return json({ error: "Request origin not allowed" }, { status: 403 });
  }
  if (!req.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return json({ error: "Content-Type must be application/json" }, { status: 415 });
  }

  const rate = checkIpRateLimit(req);
  if (!rate.ok) {
    return json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": String(rate.retryAfter) } });
  }

  const body = await req.json().catch(() => ({} as Record<string, unknown>));

  // Honeypot: bots fill every field they find, humans never see this one.
  if (typeof body.website === "string" && body.website.trim()) {
    return json({ ok: true });
  }

  const email = cleanEmail(body.email);
  const phone = cleanText(body.phone, 40);

  // A car lead is reachable or it is not a lead. One of the two is enough.
  if (!isValidEmail(email) && digits(phone).length < 10) {
    return json({ error: "Add an email or a phone number so I can reach you." }, { status: 422 });
  }

  const lead: Lead = {
    name: cleanText(body.name, 120),
    email,
    phone,
    vehicle: cleanText(body.vehicle, 160),
    timeframe: cleanText(body.timeframe, 80),
    message: cleanText(body.message, 1200),
    intent: normalizeIntent(body.intent),
    source: cleanText(body.source, 120) || "benz-blonde",
  };

  const contactKey = email || digits(phone);
  if (isDuplicate(contactKey, lead.intent)) {
    return json({ ok: true, duplicate: true, emailed: false });
  }

  const notified = NOTIFY_EMAIL
    ? await sendResendEmail(
        {
          from: FROM,
          to: [NOTIFY_EMAIL],
          ...(isValidEmail(email) ? { reply_to: email } : {}),
          subject: `Benz lead: ${INTENTS[lead.intent].label}${lead.name ? ` — ${lead.name}` : ""}`,
          html: ownerHtml(lead),
          text:
            `${INTENTS[lead.intent].label}\n\n` +
            `Name: ${lead.name || "Not provided"}\n` +
            `Phone: ${lead.phone || "Not provided"}\n` +
            `Email: ${lead.email || "Not provided"}\n` +
            `Vehicle: ${lead.vehicle || "Not provided"}\n` +
            `Timeframe: ${lead.timeframe || "Not provided"}\n` +
            `Source: ${lead.source}\n\n` +
            `${lead.message || ""}`,
          tags: [
            { name: "kind", value: "benz_lead" },
            { name: "intent", value: lead.intent },
          ],
        },
        ["benz-owner", contactKey, lead.intent, String(Date.now() - (Date.now() % RATE_WINDOW_MS))],
      )
    : false;

  const emailed = isValidEmail(email)
    ? await sendResendEmail(
        {
          from: FROM,
          to: [email],
          subject: "Got it — MK, The Benz Blonde",
          html: customerHtml(lead),
          text:
            `Got it${lead.name ? `, ${lead.name.split(" ")[0]}` : ""}.\n\n` +
            `I have ${INTENTS[lead.intent].reply} in front of me. You will hear from me today.\n\n` +
            `Want it faster? Text me: 347.853.4238\n\n- MK\nThe Benz Blonde | Mercedes-Benz of Smithtown`,
          tags: [
            { name: "kind", value: "benz_confirmation" },
            { name: "intent", value: lead.intent },
          ],
        },
        ["benz-customer", contactKey, lead.intent, String(Date.now() - (Date.now() % RATE_WINDOW_MS))],
      )
    : false;

  console.log("Benz lead", { intent: lead.intent, source: lead.source, notified, emailed });

  return json({ ok: true, emailed, notified });
}
