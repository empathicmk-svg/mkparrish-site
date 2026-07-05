import { NextRequest, NextResponse } from "next/server";
import { getLeadMagnet, type LeadMagnet } from "@/app/lib/lead-magnets";

const SUBSTACK_PUB = "mkparrishthemargins";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mkparrish.com").replace(/\/+$/, "");
const CHECKLIST_PATH = "/downloads/positioning-checklist.pdf";
const CHECKLIST_URL = `${SITE_URL}${CHECKLIST_PATH}`;
const SAMPLE_PATH = "/downloads/ebooks/rebecoming-sample.pdf";
const SAMPLE_URL = `${SITE_URL}${SAMPLE_PATH}`;
const BOOK_URL = `${SITE_URL}/rebecoming`;
const FROM = process.env.LEAD_FROM_EMAIL || "MK Parrish <hello@mkparrish.com>";

type LeadOffer = "positioning-checklist" | "rebecoming-sample";

type SubscribeBody = {
  email?: unknown;
  offer?: unknown;
  resource?: unknown;
  leadMagnet?: unknown;
  magnet?: unknown;
  source?: unknown;
};

const recentSubmissions = new Map<string, number>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY not set. Lead magnet email skipped; direct download link returned.");
    return false;
  }

  const url = leadMagnetUrl(magnet);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });

    if (!res.ok) {
      console.error("Resend lead magnet send error:", res.status, await res.text().catch(() => ""));
      return false;
    }

    console.log("Lead magnet email sent", { email, resource: magnet.slug, source });
    return true;
  } catch (err) {
    console.error("Resend lead magnet fetch error:", err);
    return false;
  }
}

async function sendLeadEmail(email: string, offer: LeadOffer, source: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY not set. Lead email skipped; direct download link returned.");
    return false;
  }

  const isBook = offer === "rebecoming-sample";
  const subject = isBook ? "Your free first chapter of REBECOMING" : "Your Positioning Checklist";
  const html = isBook ? rebecomingEmailHtml() : checklistEmailHtml();
  const text = isBook
    ? `Here is your free first chapter of REBECOMING: From Fear to Faith.\n\nRead chapter one: ${SAMPLE_URL}\n\nGet the full book: ${BOOK_URL}\n\n- MK Parrish\nmkparrish.com`
    : `Here's your Positioning Checklist - the 12-point audit I run before rewriting any client's copy.\n\nDownload it: ${CHECKLIST_URL}\n\n- MK Parrish\nmkparrish.com`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject,
        html,
        text,
        tags: [
          { name: "offer", value: offer },
          { name: "source", value: source.replace(/[^a-zA-Z0-9:_-]/g, "_").slice(0, 60) },
        ],
      }),
    });

    if (!res.ok) {
      console.error("Resend send error:", res.status, await res.text().catch(() => ""));
      return false;
    }

    console.log("Lead email sent", { email, offer, source });
    return true;
  } catch (err) {
    console.error("Resend fetch error:", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as SubscribeBody));
  const email = cleanEmail(body.email);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const source = cleanText(body.source, "unknown");
  const resource = body.resource ?? body.leadMagnet ?? body.magnet;

  if (typeof resource === "string" && resource.trim()) {
    const magnet = getLeadMagnet(resource);
    const isDuplicate = checkDuplicate(email, `resource:${magnet.slug}`);

    if (isDuplicate) {
      return NextResponse.json({
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
    await substackPromise.catch(() => undefined);

    return NextResponse.json({
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
    return NextResponse.json({
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
  await substackPromise.catch(() => undefined);

  return NextResponse.json({
    ok: true,
    emailed,
    checklist,
    download: checklist,
    book,
  });
}
