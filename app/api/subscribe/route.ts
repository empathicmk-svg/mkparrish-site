import { NextRequest, NextResponse } from "next/server";

const SUBSTACK_PUB = "mkparrishthemargins";

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({ email: "" }));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://${SUBSTACK_PUB}.substack.com/api/v1/free`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Referer": `https://${SUBSTACK_PUB}.substack.com`,
          "Origin": `https://${SUBSTACK_PUB}.substack.com`,
        },
        body: JSON.stringify({ email, first_name: "", last_name: "" }),
      }
    );

    // 400 often means already subscribed — treat as success
    if (res.status === 400) {
      const body = await res.json().catch(() => ({}));
      const msg = (body?.error || body?.message || "").toLowerCase();
      if (msg.includes("already") || msg.includes("subscribed") || msg.includes("exist")) {
        return NextResponse.json({ ok: true });
      }
      console.error("Substack 400:", body);
      return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Substack subscribe error:", res.status, text);
      return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Subscribe route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
