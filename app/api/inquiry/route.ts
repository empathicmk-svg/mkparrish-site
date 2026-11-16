import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mkparrish.com").replace(/\/+$/, "");
const FROM = process.env.LEAD_FROM_EMAIL || "MK Parrish <hello@mkparrish.com>";
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "mkp414@icloud.com";

const MAX_BODY_BYTES = 12 * 1024;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 8;
const TOPICS = new Set(["cars", "website", "marketing", "content", "other"]);

const recentByIp = new Map<string, { count: number; expiresAt: number }>();

function json(data: Record<string, unknown>, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(data, { ...init, headers });
}

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

function isValidEmail(email: string) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    const url = new URL(origin);
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const allowed = new Set(["https://www.mkparrish.com", "https://mkparrish.com", SITE_URL]);
    if (process.env.VERCEL_URL) allowed.add(`https://${process.env.VERCEL_URL}`);
    return allowed.has(url.origin) || Boolean(host && url.host === host);
  } catch {
    return false;
  }
}

function rateLimited(req: NextRequest) {
  const now = Date.now();
  const key =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  for (const [k, v] of recentByIp.entries()) if (v.expiresAt <= now) recentByIp.delete(k);
  const entry = recentByIp.get(key);
  if (!entry) {
    recentByIp.set(key, { count: 1, expiresAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_IP;
}

/** A project or car inquiry from the homepage: emailed to MK with the visitor's address as the reply-to. */
export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) return json({ error: "Forbidden" }, { status: 403 });
  if (!req.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return json({ error: "Unsupported request" }, { status: 415 });
  }
  if (Number(req.headers.get("content-length") || 0) > MAX_BODY_BYTES) {
    return json({ error: "Too large" }, { status: 413 });
  }
  if (rateLimited(req)) return json({ error: "Too many requests. Try again in a few minutes." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this in. Pretend it worked.
  if (text(body.website, 200)) return json({ ok: true });

  const name = text(body.name, 80);
  const email = text(body.email, 254).toLowerCase();
  const phone = text(body.phone, 30);
  const message = text(body.message, 1200);
  const topic = TOPICS.has(String(body.topic)) ? String(body.topic) : "other";
  const source = text(body.source, 60) || "home-concierge";
  const extra = text(body.extra, 400);

  if (!name) return json({ error: "Please add your name." }, { status: 400 });
  if (email && !isValidEmail(email)) return json({ error: "That email doesn't look right." }, { status: 400 });
  if (!email && phone.replace(/\D/g, "").length < 10) {
    return json({ error: "Add an email or a phone number so I can reply." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY || process.env.resend;
  if (!key) {
    // Not configured here (a preview, say). The form falls back to opening an email draft.
    return json({ ok: false, fallback: true }, { status: 202 });
  }

  const subject = `New ${topic} inquiry from ${name}`;
  const lines = [
    ["Topic", topic],
    ["Name", name],
    ["Email", email || "(none)"],
    ["Phone", phone || "(none)"],
    ["Details", extra || "(none)"],
    ["Message", message || "(none)"],
    ["Source", source],
  ];
  const html = `<!doctype html><html><body style="font-family:Helvetica,Arial,sans-serif;color:#111;">
  <h2 style="margin:0 0 12px;">${escapeHtml(subject)}</h2>
  <table cellpadding="6" style="border-collapse:collapse;">${lines
    .map(([k, v]) => `<tr><td style="color:#888;vertical-align:top;">${k}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table></body></html>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `mkp-inq-${crypto
          .createHash("sha256")
          .update([email, phone, name, message, topic].join(":"))
          .digest("hex")
          .slice(0, 40)}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: [NOTIFY_EMAIL],
        ...(email ? { reply_to: email } : {}),
        subject,
        html,
        text: lines.map(([k, v]) => `${k}: ${v}`).join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("Inquiry send error:", res.status);
      return json({ ok: false, fallback: true }, { status: 202 });
    }
    return json({ ok: true });
  } catch (err) {
    console.error("Inquiry send failed:", err);
    return json({ ok: false, fallback: true }, { status: 202 });
  }
}
