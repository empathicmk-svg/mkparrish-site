import crypto from "node:crypto";
import {
  getShopProduct,
  isFreeProduct,
  productDeliveryLinks,
  type ShopProduct,
} from "@/app/lib/config";
import { EBOOK_LINKS } from "@/app/lib/stripe-links";

// Paid files are deliberately NOT in public/. Anything under public/ is served
// straight off the CDN before any route runs, so a file there is readable by
// anyone who knows or guesses its URL. These live outside it and are streamed
// by /api/download only after the caller proves they bought the thing.
export const PAID_DOWNLOAD_DIR = "protected-downloads";

const SLUG = /^[a-z0-9][a-z0-9-]*$/;
const STRIPE_SESSION_ID = /^cs_[A-Za-z0-9_]+$/;
const MIN_SECRET_LENGTH = 16;

// One year. Long enough that a receipt email keeps working the way a buyer
// expects, short enough that a link scraped out of a forwarded email expires.
export const DEFAULT_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 365;

function tokenSecret(): string {
  return process.env.DOWNLOAD_TOKEN_SECRET || "";
}

/**
 * False when DOWNLOAD_TOKEN_SECRET is missing or too short. Delivery fails
 * closed in that case: no token can be minted and none will verify, so paid
 * files stay unreachable rather than falling back to being public.
 */
export function downloadsConfigured(): boolean {
  return tokenSecret().length >= MIN_SECRET_LENGTH;
}

/** `slug.exp.signature` — signature is HMAC-SHA256 over `slug.exp`. */
export function signDownloadToken(
  slug: string,
  ttlSeconds: number = DEFAULT_TOKEN_TTL_SECONDS,
): string | null {
  const secret = tokenSecret();
  if (secret.length < MIN_SECRET_LENGTH || !SLUG.test(slug)) return null;

  const payload = `${slug}.${Math.floor(Date.now() / 1000) + ttlSeconds}`;
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyDownloadToken(token: string | null | undefined): { slug: string } | null {
  const secret = tokenSecret();
  if (!token || secret.length < MIN_SECRET_LENGTH) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [slug, expiry, signature] = parts;
  if (!SLUG.test(slug)) return null;

  const expiresAt = Number(expiry);
  if (!Number.isSafeInteger(expiresAt) || expiresAt * 1000 <= Date.now()) return null;

  const expected = crypto.createHmac("sha256", secret).update(`${slug}.${expiry}`).digest();
  const given = Buffer.from(signature, "base64url");
  if (given.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(expected, given)) return null;

  return { slug };
}

/**
 * Where a product's public-looking href actually lives on disk, relative to
 * PAID_DOWNLOAD_DIR. Returns null for anything that is not a /downloads/ path.
 */
export function paidFileRelativePath(href: string): string | null {
  const prefix = "/downloads/";
  if (!href.startsWith(prefix)) return null;
  const relative = href.slice(prefix.length);
  if (!relative || relative.includes("..") || relative.includes("\\")) return null;
  return relative;
}

/**
 * The URL to hand a buyer for one delivery variant. Free products keep their
 * plain public path; paid ones route through the gate, carrying a token when
 * one could be minted.
 */
export function deliveryHref(
  product: ShopProduct,
  href: string,
  token?: string | null,
): string {
  if (isFreeProduct(product)) return href;

  const filename = href.split("/").pop();
  if (!filename) return href;

  const query = token ? `?token=${encodeURIComponent(token)}` : "";
  return `/api/download/${product.slug}/${encodeURIComponent(filename)}${query}`;
}

/** Delivery links for a product, already pointed at the gate where needed. */
export function gatedDeliveryLinks(product: ShopProduct, token?: string | null) {
  return productDeliveryLinks(product).map((link) => ({
    label: link.label,
    href: deliveryHref(product, link.href, token),
  }));
}

/**
 * Resolve `/api/download/<slug>/<filename>` back to a product and an on-disk
 * path. Only filenames the product actually ships can resolve, which is what
 * keeps the route from being a general file reader.
 */
export function resolveDeliveryFile(slug: string, filename: string) {
  if (!SLUG.test(slug)) return null;

  const product = getShopProduct(slug);
  if (!product) return null;

  const link = productDeliveryLinks(product).find(
    (candidate) => candidate.href.split("/").pop() === filename,
  );
  if (!link) return null;

  const relativePath = paidFileRelativePath(link.href);
  if (!relativePath) return null;

  return { product, link, relativePath };
}

/**
 * Does this Stripe checkout session entitle the caller to `slug`?
 *
 * Dynamic sessions carry metadata.slug; purchases made through a static
 * buy.stripe.com link carry nothing but the payment link id, so fall back to
 * the link map. Either way the session must actually be paid.
 */
export async function stripeSessionGrants(sessionId: string, slug: string): Promise<boolean> {
  if (!STRIPE_SESSION_ID.test(sessionId)) return false;

  const apiKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
  if (!apiKey) return false;

  let session: Record<string, unknown> | null = null;
  try {
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { Authorization: `Bearer ${apiKey}` }, cache: "no-store" },
    );
    if (!response.ok) return false;
    session = (await response.json()) as Record<string, unknown>;
  } catch (error) {
    console.error("Stripe session lookup failed:", error);
    return false;
  }

  if (!session || session.payment_status !== "paid") return false;

  const metadata = (session.metadata as Record<string, unknown> | null) ?? {};
  if (metadata.slug === slug) return true;

  const paymentLink = typeof session.payment_link === "string" ? session.payment_link : "";
  return Boolean(paymentLink) && EBOOK_LINKS[paymentLink] === slug;
}
