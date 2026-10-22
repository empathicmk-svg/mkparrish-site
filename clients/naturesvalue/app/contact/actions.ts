"use server";

export type QuoteState = { status: "idle" | "ok" | "error"; message?: string };

const FIELDS = ["name", "company", "email", "phone", "dosageForm", "quantity", "details"] as const;
const REQUIRED = ["name", "company", "email", "details"] as const;

// Quote requests are forwarded as JSON to QUOTE_WEBHOOK_URL (a Zapier/Make hook,
// a CRM intake endpoint, or an email relay). Without it, nothing is delivered,
// so production refuses rather than dropping leads silently.
export async function requestQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("website")) return { status: "ok" };

  const data = Object.fromEntries(
    FIELDS.map((f) => [f, String(formData.get(f) ?? "").trim().slice(0, 4000)]),
  ) as Record<(typeof FIELDS)[number], string>;

  if (REQUIRED.some((f) => !data[f])) {
    return { status: "error", message: "Please fill in your name, company, email and project details." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const webhook = process.env.QUOTE_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      console.error("QUOTE_WEBHOOK_URL is not set; quote request not delivered");
      return { status: "error", message: "We couldn't send your request. Please email or call us instead." };
    }
    console.log("Quote request (dev, not delivered):", data);
    return { status: "ok" };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("Quote request delivery failed:", err);
    return { status: "error", message: "We couldn't send your request. Please try again in a moment." };
  }
  return { status: "ok" };
}
