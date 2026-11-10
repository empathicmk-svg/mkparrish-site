import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { isFreeProduct } from "@/app/lib/config";
import {
  downloadsConfigured,
  resolveDeliveryFile,
  stripeSessionGrants,
  verifyDownloadToken,
} from "@/app/lib/downloads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTENT_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".epub": "application/epub+zip",
  ".zip": "application/zip",
  ".html": "text/html; charset=utf-8",
};

function deny(status: number, message: string) {
  return NextResponse.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } },
  );
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  if (!segments || segments.length !== 2) {
    return deny(404, "Not found.");
  }

  const [slug, filename] = segments;
  const resolved = resolveDeliveryFile(slug, filename);
  if (!resolved) {
    return deny(404, "Not found.");
  }

  const { product, relativePath } = resolved;

  // Free products were never gated; keep their plain public URL working.
  if (isFreeProduct(product)) {
    return NextResponse.redirect(new URL(resolved.link.href, req.nextUrl.origin));
  }

  const token = req.nextUrl.searchParams.get("token");
  const sessionId = req.nextUrl.searchParams.get("session_id");

  let entitled = verifyDownloadToken(token)?.slug === slug;
  if (!entitled && sessionId) {
    entitled = await stripeSessionGrants(sessionId, slug);
  }

  if (!entitled) {
    if (!downloadsConfigured()) {
      // No signing secret, so no link can be honoured. Say so in the log
      // rather than letting a buyer think their file is missing.
      console.error(
        "DOWNLOAD_TOKEN_SECRET is not set — paid downloads cannot be authorised.",
      );
    }
    return deny(403, "This download link is invalid or has expired. Reply to your receipt email and MK will resend your files.");
  }

  // Whitelisted filename, but resolve and re-check anyway: a path that escapes
  // the directory must never be readable, whatever the lookup returned.
  //
  // The folder name is written out literally rather than imported: the build
  // traces file reads statically, and an identifier here makes it give up and
  // bundle the entire project into this function.
  const root = path.join(process.cwd(), "protected-downloads");
  const absolute = path.join(root, relativePath);
  if (absolute !== root && !absolute.startsWith(root + path.sep)) {
    return deny(404, "Not found.");
  }

  let size: number;
  try {
    const info = await stat(absolute);
    if (!info.isFile()) return deny(404, "Not found.");
    size = info.size;
  } catch {
    console.error(`Paid download missing on disk: ${relativePath}`);
    return deny(404, "Not found.");
  }

  const extension = path.extname(absolute).toLowerCase();
  const body = Readable.toWeb(createReadStream(absolute)) as ReadableStream<Uint8Array>;

  return new Response(body, {
    headers: {
      "Content-Type": CONTENT_TYPES[extension] ?? "application/octet-stream",
      "Content-Length": String(size),
      "Content-Disposition": `attachment; filename="${path.basename(absolute)}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
