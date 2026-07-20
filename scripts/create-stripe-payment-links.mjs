#!/usr/bin/env node

import fs from "node:fs/promises";

const SITE_URL = "https://www.mkparrish.com";
const STRIPE_VERSION = "2026-02-25.clover";
const CONFIG_PATH = new URL("../app/lib/config.ts", import.meta.url);
const WEBHOOK_PATH = new URL("../app/api/stripe-webhook/route.ts", import.meta.url);

const apiKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
const shouldWrite = process.argv.includes("--write");

const books = [
  {
    slug: "still-here-still-hers",
    title: "Still Here, Still Hers",
    ebookAmount: 2900,
    paperbackAmount: 4400,
  },
  {
    slug: "street-smarts",
    title: "Street Smarts",
    ebookAmount: 3900,
    paperbackAmount: 5400,
  },
  {
    slug: "make-my-own-light",
    title: "Make My Own Light",
    ebookAmount: 2900,
    paperbackAmount: 4400,
  },
  {
    slug: "the-invisible-bruise",
    title: "The Invisible Bruise",
    ebookAmount: 3900,
    paperbackAmount: 5400,
  },
  {
    slug: "decoding-angel-numbers",
    title: "Decoding Angel Numbers",
    ebookAmount: 2900,
    paperbackAmount: 4400,
  },
  {
    slug: "the-meantime",
    title: "The Meantime",
    ebookAmount: 2900,
    paperbackAmount: 4400,
  },
  {
    slug: "the-redesign-playbook",
    title: "The Redesign Playbook",
    ebookAmount: 4500,
    paperbackAmount: 5200,
  },
  {
    slug: "her-story-rewritten",
    title: "Her Story, Rewritten",
    ebookAmount: 2400,
    paperbackAmount: 3200,
  },
  {
    slug: "the-princess-who-rescued-herself",
    title: "The Princess Who Rescued Herself",
    ebookAmount: 1400,
    paperbackAmount: 1900,
  },
];

const requiredEnvMessage = [
  "Missing STRIPE_SECRET_KEY.",
  "Create or reveal a live secret/restricted key in Stripe with write access to Products, Prices, and Payment Links, then run:",
  "STRIPE_SECRET_KEY=rk_live_... npm run stripe:books",
].join("\n");

if (!apiKey) {
  console.error(requiredEnvMessage);
  process.exit(1);
}

if (!apiKey.startsWith("sk_live_") && !apiKey.startsWith("rk_live_")) {
  console.error("Refusing to create live shop links without a live Stripe secret/restricted key that starts with sk_live_ or rk_live_.");
  process.exit(1);
}

const stripeRequest = async (path, params) => {
  const body = new URLSearchParams(params);
  const response = await fetch(`https://api.stripe.com/v1${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": STRIPE_VERSION,
    },
    body,
  });

  const payload = await response.json();

  if (!response.ok) {
    const message = payload?.error?.message || response.statusText;
    throw new Error(`${path} failed: ${message}`);
  }

  return payload;
};

const money = (amount) => `$${amount / 100}`;

const createPaymentLink = async (book, format) => {
  const isPaperback = format === "paperback";
  const amount = isPaperback ? book.paperbackAmount : book.ebookAmount;
  const formatLabel = isPaperback ? "Paperback" : "Digital Edition";
  const productName = `${book.title} - ${formatLabel}`;
  const productUrl = `${SITE_URL}/shop/${book.slug}`;

  const product = await stripeRequest("/products", {
    name: productName,
    description: isPaperback
      ? `${book.title} paperback direct order. Price includes standard US shipping.`
      : `${book.title} ebook direct purchase from MK Parrish.`,
    shippable: String(isPaperback),
    url: productUrl,
    "metadata[site]": "mkparrish.com",
    "metadata[slug]": book.slug,
    "metadata[format]": format,
  });

  const price = await stripeRequest("/prices", {
    currency: "usd",
    unit_amount: String(amount),
    product: product.id,
    nickname: `${book.title} ${formatLabel} ${money(amount)}`,
    "metadata[site]": "mkparrish.com",
    "metadata[slug]": book.slug,
    "metadata[format]": format,
  });

  const linkParams = {
    "line_items[0][price]": price.id,
    "line_items[0][quantity]": "1",
    allow_promotion_codes: "true",
    billing_address_collection: "auto",
    customer_creation: "always",
    "invoice_creation[enabled]": "true",
    "metadata[site]": "mkparrish.com",
    "metadata[slug]": book.slug,
    "metadata[format]": format,
  };

  if (isPaperback) {
    Object.assign(linkParams, {
      "shipping_address_collection[allowed_countries][0]": "US",
      "phone_number_collection[enabled]": "true",
      "after_completion[type]": "redirect",
      "after_completion[redirect][url]": `${SITE_URL}/order-confirmed?slug=${book.slug}&format=paperback`,
    });
  } else {
    Object.assign(linkParams, {
      "after_completion[type]": "redirect",
      "after_completion[redirect][url]": `${SITE_URL}/order-confirmed?slug=${book.slug}&format=ebook`,
    });
  }

  const paymentLink = await stripeRequest("/payment_links", linkParams);

  return {
    productId: product.id,
    priceId: price.id,
    paymentLinkId: paymentLink.id,
    url: paymentLink.url,
  };
};

const replaceOnce = (source, before, after) => {
  if (!source.includes(before)) {
    throw new Error(`Could not find config text to replace: ${before}`);
  }

  return source.replace(before, after);
};

const writeConfig = async (results) => {
  let config = await fs.readFile(CONFIG_PATH, "utf8");

  for (const result of results) {
    config = replaceOnce(
      config,
      `href:      checkoutRequestHref("${result.title}"),`,
      `stripe:    "${result.ebook.url}",\n    href:      "${result.ebook.url}",`,
    );

    config = replaceOnce(
      config,
      `paperback: { price: "${money(result.paperbackAmount)}", href: checkoutRequestHref("${result.title} paperback") },`,
      `paperback: { price: "${money(result.paperbackAmount)}", href: "${result.paperback.url}" },`,
    );
  }

  await fs.writeFile(CONFIG_PATH, config);
};

const insertMapEntries = (source, marker, entries) => {
  const freshEntries = entries.filter((entry) => !source.includes(entry.id));
  if (freshEntries.length === 0) return source;

  const lines = freshEntries.map((entry) => `  ${entry.id}: "${entry.slug}",`).join("\n");
  return replaceOnce(source, marker, `${marker}${lines}\n`);
};

const writeWebhookMap = async (results) => {
  let webhook = await fs.readFile(WEBHOOK_PATH, "utf8");

  webhook = insertMapEntries(
    webhook,
    "const EBOOK_LINKS: Record<string, string> = {\n",
    results.map((result) => ({
      id: result.ebook.paymentLinkId,
      slug: result.slug,
    })),
  );

  webhook = insertMapEntries(
    webhook,
    "const PAPERBACK_LINKS: Record<string, string> = {\n",
    results.map((result) => ({
      id: result.paperback.paymentLinkId,
      slug: result.slug,
    })),
  );

  await fs.writeFile(WEBHOOK_PATH, webhook);
};

const main = async () => {
  const results = [];

  for (const book of books) {
    console.error(`Creating Stripe links for ${book.title}...`);
    const ebook = await createPaymentLink(book, "ebook");
    const paperback = await createPaymentLink(book, "paperback");

    results.push({
      ...book,
      ebook,
      paperback,
    });
  }

  if (shouldWrite) {
    await writeConfig(results);
    await writeWebhookMap(results);
  }

  console.log(JSON.stringify(results, null, 2));
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
