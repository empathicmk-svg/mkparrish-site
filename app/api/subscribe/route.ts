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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

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
