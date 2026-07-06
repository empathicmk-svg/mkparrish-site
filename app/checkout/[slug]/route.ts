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

function fallbackCheckout(product: { title: string; slug: string }) {
  const subject = `Checkout request: ${product.title}`;
  const body = [
    `Hi MK,`,
    ``,
    `I want to buy ${product.title}.`,
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

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getShopProduct(slug);

  if (!product) {
    return NextResponse.redirect(`${SITE_URL}/shop`);
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
