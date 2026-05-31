import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const donationHosts = new Set(["jaydonation.vercel.app"]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];

  if (host && donationHosts.has(host) && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/for-day";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
