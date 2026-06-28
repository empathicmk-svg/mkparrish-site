import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { getShopProduct, productDeliveryLinks } from "@/app/lib/config";

export const runtime = "nodejs";
// Stripe sends the raw body; we must not let the framework parse/transform it.
export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mkparrish.com").replace(/\/+$/, "");
const FROM = process.env.LEAD_FROM_EMAIL || "MK Parrish <hello@mkparrish.com>";
const OWNER_EMAIL = "mkp414@icloud.com"; // CC'd on every purchase

// Map each live payment link to the product it sells, so the email knows what
// to deliver. Unknown links still trigger an order notification to the owner.
const EBOOK_LINKS: Record<string, string> = {
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

// Verify Stripe's signature without the SDK (HMAC-SHA256 over `${t}.${body}`).
function verify(rawBody: string, sigHeader: string | null, secret: string): boolean {
  if (!sigHeader) return false;
  const parts = Object.fromEntries(sigHeader.split(",").map((kv) => kv.split("=")));
  const t = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${t}.${rawBody}`).digest("hex");
  try {
    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v1))) return false;
  } catch {
    return false;
  }
  // Reject events older than 5 minutes (replay protection).
  return Math.abs(Date.now() / 1000 - Number(t)) < 300;
}

function fmtAddress(s: Record<string, unknown> | undefined): string {
  if (!s) return "";
  const a = (s.address as Record<string, string>) || {};
  return [s.name as string, a.line1, a.line2, [a.city, a.state, a.postal_code].filter(Boolean).join(", "), a.country]
    .filter(Boolean)
    .join("<br>");
}

async function sendEmail(to: string | null, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY not set — purchase email skipped.");
    return;
  }
  const payload: Record<string, unknown> = {
    from: FROM,
    subject,
    html,
    cc: [OWNER_EMAIL],
  };
  // If we have no buyer email, send straight to the owner so the sale is never silent.
  payload.to = to ? [to] : [OWNER_EMAIL];
  if (!to) delete payload.cc;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.error("Resend send error:", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("Resend fetch error:", err);
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
  const raw = await req.text();
  if (!secret) {
    console.warn("STRIPE_WEBHOOK_SECRET not set — webhook ignored.");
    return NextResponse.json({ received: true });
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

  const session = (event.data as Record<string, Record<string, unknown>>).object as Record<string, unknown>;
  const plink = (session.payment_link as string) || "";
  const email = ((session.customer_details as Record<string, unknown>)?.email as string) || null;
  const total = typeof session.amount_total === "number" ? `$${(session.amount_total / 100).toFixed(2)}` : "";
  const shipping =
    ((session.collected_information as Record<string, unknown>)?.shipping_details as Record<string, unknown>) ||
    (session.shipping_details as Record<string, unknown>) ||
    undefined;

  const ebookSlug = EBOOK_LINKS[plink];
  const paperbackSlug = PAPERBACK_LINKS[plink];

  if (ebookSlug) {
    const product = getShopProduct(ebookSlug);
    const title = product?.title || "your book";
    const links = (product ? productDeliveryLinks(product) : [])
      .map((l) => `<a href="${SITE_URL}${l.href}" style="color:#B23A59;">Download ${l.label} &rarr;</a>`)
      .join("<br>");
    await sendEmail(
      email,
      `Your copy of ${title}`,
      shell(
        `<p style="margin:0 0 14px;">Thank you so much for buying <strong>${title}</strong>. Here are your files, yours to keep:</p>
         <p style="margin:0 0 14px;">${links}</p>
         <p style="margin:0;">If a link ever gives you trouble, just reply to this email and I will send them directly.</p>`,
      ),
    );
  } else if (paperbackSlug) {
    const product = getShopProduct(paperbackSlug);
    const title = product?.title || "your book";
    const addr = fmtAddress(shipping);
    await sendEmail(
      email,
      `Your paperback of ${title} is on the way`,
      shell(
        `<p style="margin:0 0 14px;">Thank you so much for ordering the paperback of <strong>${title}</strong>. It is printed to order and ships in about 5 to 7 business days.</p>
         ${addr ? `<p style="margin:0 0 14px;">Shipping to:<br>${addr}</p>` : ""}
         <p style="margin:0;">A portion of every sale supports my local parish. Questions? Just reply here.</p>`,
      ),
    );
  } else {
    // Unknown link (e.g. a print or audit) — still notify the owner of the sale.
    await sendEmail(
      null,
      `New order${total ? ` — ${total}` : ""}`,
      shell(
        `<p style="margin:0 0 14px;">A new order just came through${total ? ` for <strong>${total}</strong>` : ""}.</p>
         ${email ? `<p style="margin:0 0 14px;">Buyer: ${email}</p>` : ""}
         ${fmtAddress(shipping) ? `<p style="margin:0;">Ship to:<br>${fmtAddress(shipping)}</p>` : "<p style=\"margin:0;\">Check your Stripe dashboard for details.</p>"}`,
      ),
    );
  }

  return NextResponse.json({ received: true });
}
