import { NextRequest, NextResponse } from "next/server";
import { CONTACT, SITE_URL as DEFAULT_SITE_URL, getShopProduct, isFreeProduct, productDownload } from "@/app/lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STRIPE_VERSION = "2026-02-25.clover";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
const LIVE_SECRET_KEY = /^(sk|rk)_live_/;

function priceCents(price: string) {
  const match = price.replace(/,/g, "").match(/\d+(?:\.\d{1,2})?/);
  if (!match) return 0;
  return Math.round(Number(match[0]) * 100);
}

function fallbackCheckout(product: { title: string; slug: string }, format: "ebook" | "paperback" = "ebook") {
  const label = format === "paperback" ? `${product.title} (paperback)` : product.title;
  const subject = `Checkout request: ${label}`;
  const body = [
    `Hi MK,`,
    ``,
    `I want to buy ${label}.`,
    `Product page: ${SITE_URL}/shop/${product.slug}`,
    ``,
    `Please send me the checkout link.`,
  ].join("\n");

  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function stripeRequest(pathname: string, params: URLSearchParams) {
  const apiKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
  if (!apiKey) return null;
  if (process.env.VERCEL_ENV === "production" && !LIVE_SECRET_KEY.test(apiKey)) {
    console.warn("Stripe checkout skipped: production is not configured with a live secret key.");
    return null;
  }

  const response = await fetch(`https://api.stripe.com/v1${pathname}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": STRIPE_VERSION,
    },
    body: params,
  });

  const payload = (await response.json().catch(() => null)) as { url?: string; error?: { message?: string } } | null;

  if (!response.ok) {
    const message = payload?.error?.message || response.statusText;
    throw new Error(`Stripe checkout failed: ${message}`);
  }

  return payload;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getShopProduct(slug);

  if (!product) {
    return NextResponse.redirect(`${SITE_URL}/shop`);
  }

  const format = req.nextUrl.searchParams.get("format") === "paperback" ? "paperback" : "ebook";

  // ── Paperback: dynamic Stripe checkout with shipping collected ──────────────
  if (format === "paperback") {
    const paperback = (product as { paperback?: { price: string; href: string } }).paperback;
    if (!paperback) {
      return NextResponse.redirect(fallbackCheckout(product, "paperback"));
    }
    if (paperback.href?.startsWith("https://buy.stripe.com/")) {
      return NextResponse.redirect(paperback.href);
    }
    const pbAmount = priceCents(paperback.price);
    if (pbAmount <= 0) {
      return NextResponse.redirect(fallbackCheckout(product, "paperback"));
    }

    const pb = new URLSearchParams();
    pb.set("mode", "payment");
    pb.set("success_url", `${SITE_URL}/order-confirmed?slug=${product.slug}&session_id={CHECKOUT_SESSION_ID}`);
    pb.set("cancel_url", `${SITE_URL}/shop/${product.slug}`);
    pb.set("allow_promotion_codes", "true");
    pb.set("billing_address_collection", "auto");
    pb.set("shipping_address_collection[allowed_countries][0]", "US");
    pb.set("phone_number_collection[enabled]", "true");
    pb.set("customer_creation", "always");
    pb.set("invoice_creation[enabled]", "true");
    pb.set("line_items[0][quantity]", "1");
    pb.set("line_items[0][price_data][currency]", "usd");
    pb.set("line_items[0][price_data][unit_amount]", String(pbAmount));
    pb.set("line_items[0][price_data][product_data][name]", `${product.title} (Paperback)`);
    pb.set("line_items[0][price_data][product_data][description]", product.subtitle);
    pb.set("line_items[0][price_data][product_data][url]", `${SITE_URL}/shop/${product.slug}`);
    pb.set("line_items[0][price_data][product_data][metadata][site]", "mkparrish.com");
    pb.set("line_items[0][price_data][product_data][metadata][slug]", product.slug);
    pb.set("metadata[site]", "mkparrish.com");
    pb.set("metadata[slug]", product.slug);
    pb.set("metadata[format]", "paperback");

    try {
      const session = await stripeRequest("/checkout/sessions", pb);
      if (session?.url) {
        return NextResponse.redirect(session.url);
      }
    } catch (error) {
      console.error(error);
    }
    return NextResponse.redirect(fallbackCheckout(product, "paperback"));
  }

  const staticStripe = (product as { stripe?: string }).stripe;
  if (staticStripe?.startsWith("https://buy.stripe.com/")) {
    return NextResponse.redirect(staticStripe);
  }

  const download = productDownload(product);
  if (isFreeProduct(product) && download) {
    return NextResponse.redirect(`${SITE_URL}${download}`);
  }

  const amount = priceCents(product.price);
  if (!download || amount <= 0) {
    return NextResponse.redirect(fallbackCheckout(product));
  }

  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("success_url", `${SITE_URL}/download/${product.slug}?session_id={CHECKOUT_SESSION_ID}`);
  body.set("cancel_url", `${SITE_URL}/shop/${product.slug}`);
  body.set("allow_promotion_codes", "true");
  body.set("billing_address_collection", "auto");
  body.set("customer_creation", "always");
  body.set("invoice_creation[enabled]", "true");
  body.set("line_items[0][quantity]", "1");
  body.set("line_items[0][price_data][currency]", "usd");
  body.set("line_items[0][price_data][unit_amount]", String(amount));
  body.set("line_items[0][price_data][product_data][name]", product.title);
  body.set("line_items[0][price_data][product_data][description]", product.subtitle);
  body.set("line_items[0][price_data][product_data][url]", `${SITE_URL}/shop/${product.slug}`);
  body.set("line_items[0][price_data][product_data][metadata][site]", "mkparrish.com");
  body.set("line_items[0][price_data][product_data][metadata][slug]", product.slug);
  body.set("metadata[site]", "mkparrish.com");
  body.set("metadata[slug]", product.slug);
  body.set("metadata[format]", "ebook");

  try {
    const session = await stripeRequest("/checkout/sessions", body);
    if (session?.url) {
      return NextResponse.redirect(session.url);
    }
  } catch (error) {
    console.error(error);
  }

  return NextResponse.redirect(fallbackCheckout(product));
}
