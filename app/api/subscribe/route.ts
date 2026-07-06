import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { getLeadMagnet, type LeadMagnet } from "@/app/lib/lead-magnets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUBSTACK_PUB = "mkparrishthemargins";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mkparrish.com").replace(/\/+$/, "");
const CHECKLIST_PATH = "/downloads/positioning-checklist.pdf";
const CHECKLIST_URL = `${SITE_URL}${CHECKLIST_PATH}`;
const SAMPLE_PATH = "/downloads/ebooks/rebecoming-sample.pdf";
const SAMPLE_URL = `${SITE_URL}${SAMPLE_PATH}`;
const BOOK_URL = `${SITE_URL}/rebecoming`;
const FROM = process.env.LEAD_FROM_EMAIL || "MK Parrish <hello@mkparrish.com>";
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "mkp414@icloud.com";

type LeadOffer = "positioning-checklist" | "rebecoming-sample";

type SubscribeBody = {
  name?: unknown;
  email?: unknown;
  offer?: unknown;
  resource?: unknown;
  leadMagnet?: unknown;
  magnet?: unknown;
  source?: unknown;
  website?: unknown;
};

const recentSubmissions = new Map<string, number>();
const recentIpSubmissions = new Map<string, { count: number; expiresAt: number }>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 12;
const MAX_BODY_BYTES = 12 * 1024;
const MAX_EMAIL_LENGTH = 254;

function cleanEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isValidEmail(email: string) {
  return email.length <= MAX_EMAIL_LENGTH && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanText(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  return value.trim().slice(0, 120) || fallback;
}

function json(data: Record<string, unknown>, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(data, { ...init, headers });
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

function isJsonRequest(req: NextRequest) {
  return req.headers.get("content-type")?.toLowerCase().includes("application/json") ?? false;
}

function isRequestTooLarge(req: NextRequest) {
  const length = Number(req.headers.get("content-length") || 0);
  return Number.isFinite(length) && length > MAX_BODY_BYTES;
}

function clientKey(req: NextRequest) {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

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

function idempotencyKey(...parts: string[]) {
  const hash = crypto.createHash("sha256").update(parts.join(":")).digest("hex");
  return `mkp-${hash.slice(0, 48)}`;
}

function normalizeOffer(value: unknown): LeadOffer {
  if (value === "rebecoming" || value === "rebecoming-sample") return "rebecoming-sample";
  return "positioning-checklist";
}

function checkDuplicate(email: string, offer: string) {
  const now = Date.now();
  const key = `${email}:${offer}`;

  for (const [storedKey, expiresAt] of recentSubmissions.entries()) {
    if (expiresAt <= now) recentSubmissions.delete(storedKey);
  }

  const existingExpiry = recentSubmissions.get(key);
  if (existingExpiry && existingExpiry > now) return true;

  recentSubmissions.set(key, now + RATE_WINDOW_MS);
  return false;
}

function leadMagnetUrl(magnet: LeadMagnet) {
  return `${SITE_URL}${magnet.download}`;
}

function offerLabel(offer: LeadOffer) {
  return offer === "rebecoming-sample" ? "REBECOMING sample" : "Positioning Checklist";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function sendResendEmail(payload: Record<string, unknown>, idempotencyParts: string[]): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY not set. Email skipped; direct download link returned.");
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
      console.error("Resend send error:", res.status, await res.text().catch(() => ""));
      return false;
    }

    return true;
  } catch (err) {
    console.error("Resend fetch error:", err);
    return false;
  }
}

async function subscribeToSubstack(email: string) {
  try {
    const res = await fetch(`https://${SUBSTACK_PUB}.substack.com/api/v1/free`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://${SUBSTACK_PUB}.substack.com`,
        Origin: `https://${SUBSTACK_PUB}.substack.com`,
      },
      body: JSON.stringify({ email, first_name: "", last_name: "" }),
    });
    if (!res.ok) console.error("Substack subscribe error:", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("Substack subscribe fetch error:", err);
  }
}

function checklistEmailHtml(): string {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f4f2f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2f0;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #e7e3df;">
        <tr><td style="height:4px;background:linear-gradient(90deg,#E0869F,#F2AFC6 55%,#FFD6E4);font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:40px 40px 8px;">
          <p style="margin:0 0 18px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#B23A59;">MK Parrish &middot; Free Download</p>
          <h1 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.1;color:#0E0E0E;">The Positioning <span style="color:#B23A59;">Checklist</span></h1>
          <p style="margin:14px 0 0;font-family:Georgia,serif;font-style:italic;font-size:16px;color:#7a7a7a;">The 12-point audit I run on every client before we rewrite a single line.</p>
        </td></tr>
        <tr><td style="padding:20px 40px 8px;">
          <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#2b2b2b;">It's yours. Twelve questions that find exactly where your copy is losing people <em>before</em> you change a word. Go through them honestly. The uncomfortable <strong>no</strong> is the one worth the most money.</p>
        </td></tr>
        <tr><td align="center" style="padding:16px 40px 36px;">
          <a href="${CHECKLIST_URL}" style="display:inline-block;background:#0E0E0E;color:#ffffff;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:16px 34px;">Download the Checklist &rarr;</a>
          <p style="margin:18px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#9a9a9a;">Or paste this into your browser:<br><a href="${CHECKLIST_URL}" style="color:#B23A59;">${CHECKLIST_URL}</a></p>
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #eeeae6;">
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.7;color:#555;">You're also on <strong>The Margins</strong>, where I write about voice, positioning, and sounding like yourself on purpose. No pitch sequence. Unsubscribe any time.</p>
          <p style="margin:16px 0 0;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#0E0E0E;">- MK Parrish</p>
          <p style="margin:4px 0 0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:1px;color:#b0b0b0;">mkparrish.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

function rebecomingEmailHtml(): string {
  return `<!doctype html><html><body style="margin:0;background:#f4f2f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2f0;padding:32px 16px;"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border:1px solid #e7e3df;">
      <tr><td style="height:4px;background:linear-gradient(90deg,#E0869F,#F2AFC6 55%,#FFD6E4);font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:38px 40px 8px;">
        <p style="margin:0 0 16px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#B23A59;">MK Parrish &middot; The Memoir</p>
        <h1 style="margin:0 0 6px;font-family:Georgia,serif;font-size:30px;line-height:1.1;color:#0E0E0E;">REBECOMING: <span style="color:#B23A59;">From Fear to Faith</span></h1>
        <p style="margin:14px 0 0;font-family:Georgia,serif;font-style:italic;font-size:16px;color:#7a7a7a;">Here is your free first chapter. Then you decide.</p>
      </td></tr>
      <tr><td style="padding:18px 40px 8px;">
        <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#2b2b2b;">Thank you for wanting to read. The opening chapter is below. If the door is calling you the way it called me, the whole story is waiting.</p>
      </td></tr>
      <tr><td align="center" style="padding:8px 40px 14px;">
        <a href="${SAMPLE_URL}" style="display:inline-block;background:#0E0E0E;color:#fff;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:15px 30px;">Read Chapter One &rarr;</a>
      </td></tr>
      <tr><td align="center" style="padding:0 40px 34px;">
        <a href="${BOOK_URL}" style="display:inline-block;background:#B23A59;color:#fff;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:15px 30px;">Get the Full Book &rarr;</a>
        <p style="margin:14px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#9a9a9a;">Instant ebook or paperback. A portion of every sale supports my local parish.</p>
      </td></tr>
      <tr><td style="padding:22px 40px;border-top:1px solid #eeeae6;">
        <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#0E0E0E;">- MK Parrish</p>
        <p style="margin:4px 0 0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:1px;color:#b0b0b0;">mkparrish.com</p>
      </td></tr>
    </table></td></tr></table></body></html>`;
}

function leadMagnetEmailHtml(magnet: LeadMagnet): string {
  const title = escapeHtml(magnet.title);
  const shortTitle = escapeHtml(magnet.shortTitle);
  const promise = escapeHtml(magnet.promise);
  const teaser = escapeHtml(magnet.emailTeaser);
  const url = leadMagnetUrl(magnet);

  return `<!doctype html><html><body style="margin:0;padding:0;background:#f4f2f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2f0;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #e7e3df;">
        <tr><td style="height:4px;background:linear-gradient(90deg,#E0869F,#F2AFC6 55%,#FFD6E4);font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:40px 40px 8px;">
          <p style="margin:0 0 18px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#B23A59;">MK Parrish &middot; Free Download</p>
          <h1 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.1;color:#0E0E0E;">${title}</h1>
          <p style="margin:14px 0 0;font-family:Georgia,serif;font-style:italic;font-size:16px;color:#7a7a7a;">${promise}</p>
        </td></tr>
        <tr><td style="padding:20px 40px 8px;">
          <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#2b2b2b;">It's yours. ${teaser} Go through it honestly. The uncomfortable answer is usually the one worth the most money.</p>
        </td></tr>
        <tr><td align="center" style="padding:16px 40px 36px;">
          <a href="${url}" style="display:inline-block;background:#0E0E0E;color:#ffffff;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:16px 34px;">Download ${shortTitle} &rarr;</a>
          <p style="margin:18px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#9a9a9a;">Or paste this into your browser:<br><a href="${url}" style="color:#B23A59;">${url}</a></p>
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #eeeae6;">
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.7;color:#555;">You're also on <strong>The Margins</strong>, where I write about voice, positioning, and sounding like yourself on purpose. No pitch sequence. Unsubscribe any time.</p>
          <p style="margin:16px 0 0;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#0E0E0E;">- MK Parrish</p>
          <p style="margin:4px 0 0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:1px;color:#b0b0b0;">mkparrish.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

async function sendLeadMagnetEmail(email: string, magnet: LeadMagnet, source: string): Promise<boolean> {
  const url = leadMagnetUrl(magnet);

  const sent = await sendResendEmail(
    {
      from: FROM,
      to: [email],
      subject: magnet.emailSubject,
      html: leadMagnetEmailHtml(magnet),
      text:
        `Here's ${magnet.title}.\n\n${magnet.emailTeaser}\n\n` +
        `Download it: ${url}\n\n- MK Parrish\nmkparrish.com`,
      tags: [
        { name: "offer", value: magnet.slug },
        { name: "source", value: source.replace(/[^a-zA-Z0-9:_-]/g, "_").slice(0, 60) },
      ],
    },
    ["lead", email, magnet.slug],
  );

  if (sent) console.log("Lead magnet email sent", { email, resource: magnet.slug, source });
  return sent;
}

async function sendLeadEmail(email: string, offer: LeadOffer, source: string): Promise<boolean> {
  const isBook = offer === "rebecoming-sample";
  const subject = isBook ? "Your free first chapter of REBECOMING" : "Your Positioning Checklist";
  const html = isBook ? rebecomingEmailHtml() : checklistEmailHtml();
  const text = isBook
    ? `Here is your free first chapter of REBECOMING: From Fear to Faith.\n\nRead chapter one: ${SAMPLE_URL}\n\nGet the full book: ${BOOK_URL}\n\n- MK Parrish\nmkparrish.com`
    : `Here's your Positioning Checklist - the 12-point audit I run before rewriting any client's copy.\n\nDownload it: ${CHECKLIST_URL}\n\n- MK Parrish\nmkparrish.com`;

  const sent = await sendResendEmail(
    {
      from: FROM,
      to: [email],
      subject,
      html,
      text,
      tags: [
        { name: "offer", value: offer },
        { name: "source", value: source.replace(/[^a-zA-Z0-9:_-]/g, "_").slice(0, 60) },
      ],
    },
    ["lead", email, offer],
  );

  if (sent) console.log("Lead email sent", { email, offer, source });
  return sent;
}

async function notifyOwner({
  email,
  name,
  label,
  download,
  source,
  emailed,
}: {
  email: string;
  name: string;
  label: string;
  download: string;
  source: string;
  emailed: boolean;
}) {
  if (!NOTIFY_EMAIL) return false;

  const safeName = escapeHtml(name || "Not provided");
  const safeEmail = escapeHtml(email);
  const safeLabel = escapeHtml(label);
  const safeSource = escapeHtml(source);
  const safeDownload = escapeHtml(`${SITE_URL}${download}`);

  return sendResendEmail(
    {
      from: FROM,
      to: [NOTIFY_EMAIL],
      reply_to: email,
      subject: `New MKP lead: ${label}`,
      html: `<!doctype html><html><body>
        <p><strong>New lead:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Requested:</strong> ${safeLabel}</p>
        <p><strong>Source:</strong> ${safeSource}</p>
        <p><strong>User email sent:</strong> ${emailed ? "yes" : "no"}</p>
        <p><strong>Download:</strong> <a href="${safeDownload}">${safeDownload}</a></p>
      </body></html>`,
      text:
        `New lead: ${email}\n` +
        `Name: ${name || "Not provided"}\n` +
        `Requested: ${label}\n` +
        `Source: ${source}\n` +
        `User email sent: ${emailed ? "yes" : "no"}\n` +
        `Download: ${SITE_URL}${download}`,
      tags: [
        { name: "kind", value: "owner_notification" },
        { name: "source", value: source.replace(/[^a-zA-Z0-9:_-]/g, "_").slice(0, 60) },
      ],
    },
    ["owner-lead", email, label, source],
  );
}

export async function POST(req: NextRequest) {
  if (isRequestTooLarge(req)) {
    return json({ error: "Request too large" }, { status: 413 });
  }
  if (!isAllowedOrigin(req)) {
    return json({ error: "Request origin not allowed" }, { status: 403 });
  }
  if (!isJsonRequest(req)) {
    return json({ error: "Content-Type must be application/json" }, { status: 415 });
  }
  const rate = checkIpRateLimit(req);
  if (!rate.ok) {
    return json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  const body = await req.json().catch(() => ({} as SubscribeBody));
  const email = cleanEmail(body.email);

  if (typeof body.website === "string" && body.website.trim()) {
    return json({ ok: true, emailed: false });
  }

  if (!isValidEmail(email)) {
    return json({ error: "Invalid email" }, { status: 422 });
  }

  const name = cleanText(body.name, "");
  const source = cleanText(body.source, "unknown");
  const resource = body.resource ?? body.leadMagnet ?? body.magnet;

  if (typeof resource === "string" && resource.trim()) {
    const magnet = getLeadMagnet(resource);
    const isDuplicate = checkDuplicate(email, `resource:${magnet.slug}`);

    if (isDuplicate) {
      return json({
        ok: true,
        emailed: false,
        duplicate: true,
        checklist: magnet.download,
        download: magnet.download,
        resource: magnet.slug,
      });
    }

    const substackPromise = subscribeToSubstack(email);
    const emailed = await sendLeadMagnetEmail(email, magnet, source);
    await notifyOwner({
      email,
      name,
      label: magnet.title,
      download: magnet.download,
      source,
      emailed,
    });
    await substackPromise.catch(() => undefined);

    return json({
      ok: true,
      emailed,
      checklist: magnet.download,
      download: magnet.download,
      resource: magnet.slug,
    });
  }

  const offer = normalizeOffer(body.offer);
  const isDuplicate = checkDuplicate(email, offer);
  const checklist = offer === "rebecoming-sample" ? SAMPLE_PATH : CHECKLIST_PATH;
  const book = offer === "rebecoming-sample" ? "/rebecoming" : null;

  if (isDuplicate) {
    return json({
      ok: true,
      emailed: false,
      duplicate: true,
      checklist,
      download: checklist,
      book,
    });
  }

  const substackPromise = subscribeToSubstack(email);
  const emailed = await sendLeadEmail(email, offer, source);
  await notifyOwner({
    email,
    name,
    label: offerLabel(offer),
    download: checklist,
    source,
    emailed,
  });
  await substackPromise.catch(() => undefined);

  return json({
    ok: true,
    emailed,
    checklist,
    download: checklist,
    book,
  });
}
