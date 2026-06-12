import { NextRequest, NextResponse } from "next/server";

const SUBSTACK_PUB = "mkparrishthemargins";

// Where the hosted checklist lives. NEXT_PUBLIC_SITE_URL lets previews/staging
// point the email link at the right origin; defaults to the production domain.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mkparrish.com").replace(/\/+$/, "");
const CHECKLIST_PATH = "/downloads/positioning-checklist.pdf";
const CHECKLIST_URL = `${SITE_URL}${CHECKLIST_PATH}`;

// Must be an address on a domain verified in Resend (e.g. mkparrish.com).
const FROM = process.env.LEAD_FROM_EMAIL || "MK Parrish <hello@mkparrish.com>";

// Add the subscriber to the Substack free list. Fire-and-forget: a Substack
// hiccup must not stop the checklist from being delivered.
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
          <p style="margin:0 0 18px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#B23A59;">MK Parrish &middot; Free Resource</p>
          <h1 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.1;color:#0E0E0E;">The Positioning <span style="color:#B23A59;">Checklist</span></h1>
          <p style="margin:14px 0 0;font-family:Georgia,serif;font-style:italic;font-size:16px;color:#7a7a7a;">The 12-point audit I run on every client before we rewrite a single line.</p>
        </td></tr>
        <tr><td style="padding:20px 40px 8px;">
          <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#2b2b2b;">It's yours. Twelve questions that find exactly where your copy is losing people <em>before</em> you change a word. Go through them honestly — the uncomfortable <strong>no</strong> is the one worth the most money.</p>
        </td></tr>
        <tr><td align="center" style="padding:16px 40px 36px;">
          <a href="${CHECKLIST_URL}" style="display:inline-block;background:#0E0E0E;color:#ffffff;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:16px 34px;">Download the Checklist &rarr;</a>
          <p style="margin:18px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#9a9a9a;">Or paste this into your browser:<br><a href="${CHECKLIST_URL}" style="color:#B23A59;">${CHECKLIST_URL}</a></p>
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #eeeae6;">
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.7;color:#555;">You're also on <strong>The Margins</strong>, where I write about voice, positioning, and sounding like yourself on purpose. No pitch sequence — unsubscribe any time.</p>
          <p style="margin:16px 0 0;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#0E0E0E;">— MK Parrish</p>
          <p style="margin:4px 0 0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:1px;color:#b0b0b0;">mkparrish.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

// Email the checklist via Resend's REST API (no SDK dependency). Returns true
// only if the message was accepted. Missing key → skip cleanly (the popup still
// hands over the same download link, so the lead magnet is never withheld).
async function sendChecklistEmail(email: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY not set — checklist email skipped. Subscriber added; popup serves the direct download link.");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: "Your Positioning Checklist",
        html: checklistEmailHtml(),
        text:
          `Here's your Positioning Checklist — the 12-point audit I run before rewriting any client's copy.\n\n` +
          `Download it: ${CHECKLIST_URL}\n\n— MK Parrish\nmkparrish.com`,
      }),
    });
    if (!res.ok) {
      console.error("Resend send error:", res.status, await res.text().catch(() => ""));
      return false;
    }
    console.log("Checklist email sent to", email);
    return true;
  } catch (err) {
    console.error("Resend fetch error:", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({ email: "" }));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Add to the list (non-blocking) and send the checklist (awaited so the UI can
  // report whether the email went out). Always return the link for instant access.
  subscribeToSubstack(email);
  const emailed = await sendChecklistEmail(email);

  return NextResponse.json({ ok: true, emailed, checklist: CHECKLIST_PATH });
}
