import { NextRequest, NextResponse } from "next/server";

const SUBSTACK_PUB = "mkparrishthemargins";

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({ email: "" }));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Fire-and-forget — don't block success on Substack's response
  fetch(`https://${SUBSTACK_PUB}.substack.com/api/v1/free`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Referer": `https://${SUBSTACK_PUB}.substack.com`,
      "Origin": `https://${SUBSTACK_PUB}.substack.com`,
    },
    body: JSON.stringify({ email, first_name: "", last_name: "" }),
  })
    .then(async (res) => {
      const text = await res.text().catch(() => "");
      if (!res.ok) console.error("Substack subscribe error:", res.status, text);
      else console.log("Substack subscribe ok:", email);
    })
    .catch((err) => console.error("Substack subscribe fetch error:", err));

  return NextResponse.json({ ok: true });
}
