import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { getShopProduct, productDeliveryLinks } from "@/app/lib/config";
import { findShelfProduct } from "@/app/lib/shelf-catalog";

export const runtime = "nodejs";
// Stripe sends the raw body; we must not let the framework parse/transform it.
export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mkparrish.com").replace(/\/+$/, "");
const FROM = process.env.LEAD_FROM_EMAIL || "MK Parrish <hello@mkparrish.com>";
const OWNER_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "mkp414@icloud.com";
const MAX_WEBHOOK_BYTES = 256 * 1024;

// Map each live payment link to the product it sells, so the email knows what
// to deliver. Unknown links still trigger an order notification to the owner.
const EBOOK_LINKS: Record<string, string> = {
  plink_1Tq0o0JICEFzVEU9PHbP7s8I: "still-here-still-hers",
  plink_1Tq0o2JICEFzVEU9J4mlFhqn: "street-smarts",
  plink_1Tq0o3JICEFzVEU9oBKPjscB: "make-my-own-light",
  plink_1Tq0o4JICEFzVEU94PK0Ild1: "the-invisible-bruise",
  plink_1Tq0o5JICEFzVEU9qEeryjJX: "decoding-angel-numbers",
  plink_1Tn0zxJICEFzVEU9gncWmsAr: "rebecoming",
  plink_1TmgtDJICEFzVEU9oKhP76GL: "reinvention-workbook",
  plink_1Tmgt7JICEFzVEU9jlMVHqAC: "write-yourself-into-the-room",
  plink_1TmgtAJICEFzVEU9q5c8wGhH: "brand-voice-playbook",
  plink_1TlCZNJICEFzVEU9mHVtB8fi: "the-linkedin-bio-fix-kit",
  plink_1Td8tLJICEFzVEU9sRUsSds6: "the-edit-guide",
  plink_1Td8ttJICEFzVEU9tslM6aeS: "before-the-session",
  plink_1Td8uWJICEFzVEU9Vf2zXQSe: "the-rewrite-playbook",
  plink_1Td8vTJICEFzVEU9XKsiOwdd: "the-new-chapter-workbook",
  plink_1Td8vvJICEFzVEU9lRg5OlwR: "the-byline-method",
  plink_1Td8wSJICEFzVEU9jVpK8ggP: "the-build-copy-guide",
  plink_1TnJJvJICEFzVEU9fyC66LCl: "the-social-strategy-playbook",
  plink_1Tl8L3JICEFzVEU9XaRmKOuQ: "the-prompt-vault",
};
const PAPERBACK_LINKS: Record<string, string> = {
  plink_1Tq0o1JICEFzVEU9QOEjF0RT: "still-here-still-hers",
  plink_1Tq0o2JICEFzVEU9xDndgSzk: "street-smarts",
  plink_1Tq0o3JICEFzVEU9uD35jmbb: "make-my-own-light",
  plink_1Tq0o4JICEFzVEU9rKOB1rfY: "the-invisible-bruise",
  plink_1Tq0o5JICEFzVEU9JU28fLmt: "decoding-angel-numbers",
  plink_1Tmgz6JICEFzVEU9j3eBWsqA: "rebecoming",
  plink_1TmgzEJICEFzVEU9SKjd8vUC: "reinvention-workbook",
  plink_1Tmgz8JICEFzVEU9JwRgrvmN: "write-yourself-into-the-room",
  plink_1TmgzBJICEFzVEU9GqXLg9rj: "brand-voice-playbook",
  plink_1Tn10pJICEFzVEU9EXukmman: "the-edit-guide",
  plink_1Tn10sJICEFzVEU9VyCugic5: "before-the-session",
  plink_1Tn10yJICEFzVEU9OI5Ja2g8: "the-rewrite-playbook",
  plink_1Tn112JICEFzVEU9FPoFQaJn: "the-new-chapter-workbook",
  plink_1Tn115JICEFzVEU9HAOUq02x: "the-byline-method",
  plink_1Tn118JICEFzVEU9u4gJLLjo: "the-build-copy-guide",
  plink_1Tn11CJICEFzVEU96rsJK3LV: "the-social-strategy-playbook",
  plink_1Tn11FJICEFzVEU9DW2jsN3X: "the-prompt-vault",
};
const PRINT_LINKS: Record<string, string> = {
  plink_1Td8xXJICEFzVEU9hmiCBkOY: "promise-me",
  plink_1Td8y2JICEFzVEU9NxdCQ8p9: "the-rewrite-print",
  plink_1Td8z3JICEFzVEU9qwlHV3dv: "selected-lines",
  plink_1Tn0g3JICEFzVEU9XzVHfUan: "live-out-loud-print",
  plink_1Tn0gbJICEFzVEU9B13LgsmX: "not-afraid-of-storms-print",
  plink_1Tn0hJJICEFzVEU9dsa4dTuh: "never-too-late-print",
  plink_1Tq0qvJICEFzVEU9x6UbPTXB: "custom-quote-print",
};

// Verify Stripe's signature without the SDK (HMAC-SHA256 over `${t}.${body}`).
function verify(rawBody: string, sigHeader: string | null, secret: string): boolean {
  if (!sigHeader) return false;
  const parts = sigHeader.split(",").map((kv) => {
    const index = kv.indexOf("=");
    return index === -1 ? [kv, ""] : [kv.slice(0, index), kv.slice(index + 1)];
  });
  const t = parts.find(([key]) => key === "t")?.[1];
  const signatures = parts.filter(([key]) => key === "v1").map(([, value]) => value);
  const timestamp = Number(t);
  if (!Number.isFinite(timestamp) || signatures.length === 0) return false;
  // Reject events older than 5 minutes (replay protection).
  if (Math.abs(Date.now() / 1000 - timestamp) >= 300) return false;

  const expected = crypto.createHmac("sha256", secret).update(`${t}.${rawBody}`).digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return signatures.some((signature) => {
    if (!/^[a-f0-9]{64}$/i.test(signature)) return false;
    try {
      return crypto.timingSafeEqual(expectedBuffer, Buffer.from(signature, "hex"));
    } catch {
      return false;
    }
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function responseSnippet(res: Response) {
  const text = await res.text().catch(() => "");
  return text.replace(/\s+/g, " ").slice(0, 500);
}

function cleanEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length > 254) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function idempotencyKey(...parts: string[]) {
  const hash = crypto.createHash("sha256").update(parts.join(":")).digest("hex");
  return `mkp-${hash.slice(0, 48)}`;
}

function fmtAddress(s: Record<string, unknown> | undefined): string {
  if (!s) return "";
  const a = (s.address as Record<string, string>) || {};
  return [s.name as string, a.line1, a.line2, [a.city, a.state, a.postal_code].filter(Boolean).join(", "), a.country]
    .filter(Boolean)
    .map((value) => escapeHtml(String(value)))
    .join("<br>");
}

function fmtCustomFields(fields: unknown): string {
  if (!Array.isArray(fields)) return "";

  return fields
    .map((field) => {
      if (!field || typeof field !== "object") return "";
      const entry = field as Record<string, unknown>;
      const label = (entry.label as Record<string, unknown> | undefined)?.custom;
      const text = (entry.text as Record<string, unknown> | undefined)?.value;
      const dropdown = (entry.dropdown as Record<string, unknown> | undefined)?.value;
      const value = text || dropdown;
      if (typeof label !== "string" || typeof value !== "string" || !value.trim()) return "";
      return `${escapeHtml(label)}: ${escapeHtml(value)}`;
    })
    .filter(Boolean)
    .join("<br>");
}

function buyerEmailFromSession(session: Record<string, unknown>): string | null {
  const customerDetails = session.customer_details as Record<string, unknown> | undefined;
  const metadata = session.metadata as Record<string, unknown> | undefined;
  const candidates = [
    customerDetails?.email,
    session.customer_email,
    session.receipt_email,
    metadata?.email,
    metadata?.buyer_email,
    metadata?.customer_email,
    metadata?.guest_email,
  ];

  for (const candidate of candidates) {
    const email = cleanEmail(candidate);
    if (email) return email;
  }

  const customFields = session.custom_fields;
  if (!Array.isArray(customFields)) return null;

  for (const field of customFields) {
    if (!field || typeof field !== "object") continue;
    const entry = field as Record<string, unknown>;
    const label = (entry.label as Record<string, unknown> | undefined)?.custom;
    const hint = [entry.key, entry.type, label].map(stringValue).join(" ").toLowerCase();
    const email = cleanEmail((entry.text as Record<string, unknown> | undefined)?.value);
    if (email && (hint.includes("email") || hint.includes("contact"))) return email;
  }

  return null;
}

async function sendEmail(
  to: string | null,
  subject: string,
  html: string,
  options: { idempotencyKey: string; replyTo?: string | null },
) {
  const key = process.env.RESEND_API_KEY || process.env.resend;
  if (!key) {
    console.warn("Resend API key not set. Purchase email skipped.");
    return false;
  }
  const payload: Record<string, unknown> = {
    from: FROM,
    subject,
    html,
  };
  if (OWNER_EMAIL && to && to !== OWNER_EMAIL) payload.cc = [OWNER_EMAIL];
  if (options.replyTo) payload.reply_to = options.replyTo;
  // If we have no buyer email, send straight to the owner so the sale is never silent.
  payload.to = to ? [to] : [OWNER_EMAIL];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": options.idempotencyKey,
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

function shell(inner: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f4f2f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2f0;padding:32px 16px;"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border:1px solid #e7e3df;">
      <tr><td style="height:4px;background:linear-gradient(90deg,#E0869F,#F2AFC6 55%,#FFD6E4);font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:36px 40px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#2b2b2b;">${inner}
        <p style="margin:24px 0 0;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#0E0E0E;">— MK Parrish</p>
        <p style="margin:4px 0 0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:1px;color:#b0b0b0;">mkparrish.com</p>
      </td></tr>
    </table></td></tr></table></body></html>`;
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const length = Number(req.headers.get("content-length") || 0);
  if (Number.isFinite(length) && length > MAX_WEBHOOK_BYTES) {
    return NextResponse.json({ error: "payload too large" }, { status: 413 });
  }

  const raw = await req.text();
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET not set — webhook cannot be verified.");
    return NextResponse.json({ error: "webhook misconfigured" }, { status: 503 });
  }
  if (!verify(raw, req.headers.get("stripe-signature"), secret)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "bad payload" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const eventId = stringValue(event.id) || crypto.createHash("sha256").update(raw).digest("hex").slice(0, 24);
  const data = event.data;
  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "missing event data" }, { status: 400 });
  }
  const sessionObject = (data as Record<string, unknown>).object;
  if (!sessionObject || typeof sessionObject !== "object") {
    return NextResponse.json({ error: "missing checkout session" }, { status: 400 });
  }

  const session = sessionObject as Record<string, unknown>;
  const plink = (session.payment_link as string) || "";
  const email = buyerEmailFromSession(session);
  const total = typeof session.amount_total === "number" ? `$${(session.amount_total / 100).toFixed(2)}` : "";
  const shipping =
    ((session.collected_information as Record<string, unknown>)?.shipping_details as Record<string, unknown>) ||
    (session.shipping_details as Record<string, unknown>) ||
    undefined;

  const ebookSlug = EBOOK_LINKS[plink];
  const paperbackSlug = PAPERBACK_LINKS[plink];
  const printSlug = PRINT_LINKS[plink];

  if (ebookSlug) {
    const product = getShopProduct(ebookSlug);
    const title = product?.title || "your book";
    const safeTitle = escapeHtml(title);
    const links = (product ? productDeliveryLinks(product) : [])
      .map(
        (l) =>
          `<a href="${SITE_URL}${escapeHtml(l.href)}" style="color:#B23A59;">Download ${escapeHtml(l.label)} &rarr;</a>`,
      )
      .join("<br>");
    await sendEmail(
      email,
      `Your copy of ${title}`,
      shell(
        `<p style="margin:0 0 14px;">Thank you so much for buying <strong>${safeTitle}</strong>. Here are your files, yours to keep:</p>
         <p style="margin:0 0 14px;">${links}</p>
         <p style="margin:0;">If a link ever gives you trouble, just reply to this email and I will send them directly.</p>`,
      ),
      {
        idempotencyKey: idempotencyKey("stripe", eventId, "ebook"),
        replyTo: email,
      },
    );
  } else if (paperbackSlug) {
    const product = getShopProduct(paperbackSlug);
    const title = product?.title || "your book";
    const safeTitle = escapeHtml(title);
    const addr = fmtAddress(shipping);
    await sendEmail(
      email,
      `Your paperback of ${title} is on the way`,
      shell(
        `<p style="margin:0 0 14px;">Thank you so much for ordering the paperback of <strong>${safeTitle}</strong>. It is printed to order and ships in about 5 to 7 business days.</p>
         ${addr ? `<p style="margin:0 0 14px;">Shipping to:<br>${addr}</p>` : ""}
         <p style="margin:0;">A portion of every sale supports my local parish. Questions? Just reply here.</p>`,
      ),
      {
        idempotencyKey: idempotencyKey("stripe", eventId, "paperback"),
        replyTo: email,
      },
    );
  } else if (printSlug) {
    const product = findShelfProduct(printSlug);
    const title = product?.title || "your print";
    const safeTitle = escapeHtml(title);
    const addr = fmtAddress(shipping);
    const fields = fmtCustomFields(session.custom_fields);
    await sendEmail(
      email,
      `Your print order: ${title}`,
      shell(
        `<p style="margin:0 0 14px;">Thank you so much for ordering <strong>${safeTitle}</strong>. Your print order is confirmed, and MK will follow up if a proof or extra detail is needed before printing.</p>
         ${fields ? `<p style="margin:0 0 14px;">Order details:<br>${fields}</p>` : ""}
         ${addr ? `<p style="margin:0 0 14px;">Shipping to:<br>${addr}</p>` : ""}
         <p style="margin:0;">Physical orders are produced after checkout and shipped to the address collected in Stripe. Questions? Just reply here.</p>`,
      ),
      {
        idempotencyKey: idempotencyKey("stripe", eventId, "print"),
        replyTo: email,
      },
    );
  } else {
    // Unknown link (e.g. a print or audit) — still notify the owner of the sale.
    await sendEmail(
      null,
      `New order${total ? ` — ${total}` : ""}`,
      shell(
        `<p style="margin:0 0 14px;">A new order just came through${total ? ` for <strong>${total}</strong>` : ""}.</p>
         ${email ? `<p style="margin:0 0 14px;">Buyer: <a href="mailto:${escapeHtml(email)}" style="color:#B23A59;">${escapeHtml(email)}</a></p>` : ""}
         ${fmtAddress(shipping) ? `<p style="margin:0;">Ship to:<br>${fmtAddress(shipping)}</p>` : "<p style=\"margin:0;\">Check your Stripe dashboard for details.</p>"}`,
      ),
      {
        idempotencyKey: idempotencyKey("stripe", eventId, "unknown"),
        replyTo: email,
      },
    );
  }

  return NextResponse.json({ received: true });
}
