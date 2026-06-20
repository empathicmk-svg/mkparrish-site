import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMING_SOON_SLUGS, SITE_URL } from "@/app/lib/config";
import {
  findShelfProduct,
  relatedShelfProducts,
  SHELF_PRODUCTS,
  type ShelfProduct,
} from "@/app/lib/shelf-catalog";
import {
  ArrowLink,
  Eyebrow,
  H1,
  H2,
  QuoteDivider,
  RevealSection,
} from "@/app/components/ui";

export function generateStaticParams() {
  return SHELF_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findShelfProduct(slug);

  if (!product) return {};

  return {
    title: `${product.title} — The Shelf | MK Parrish`,
    description: `${product.subtitle} ${product.desc}`,
    alternates: {
      canonical: `${SITE_URL}/shelf/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} — MK Parrish`,
      description: product.desc,
      url: `${SITE_URL}/shelf/${product.slug}`,
      type: "website",
    },
  };
}

function isFreeProduct(product: ShelfProduct) {
  return Boolean(product.free && product.download);
}

function purchaseLabel(product: ShelfProduct) {
  if (isFreeProduct(product)) return "Download Free";
  if (product.kind === "print") return `Buy Print — ${product.price}`;
  return `Buy Now — ${product.price}`;
}

function accessLabel(product: ShelfProduct) {
  if (COMING_SOON_SLUGS.has(product.slug)) return "Coming soon";
  if (product.kind === "print") return "Secure checkout · Printed and shipped to you";
  if (product.limitedFree) return `Free for a limited time · Normally ${product.price}`;
  if (isFreeProduct(product)) return "Free PDF · Instant download · No signup";
  return "Secure checkout · Digital download · No subscription";
}

function ProductAction({
  product,
  className,
}: {
  product: ShelfProduct;
  className: string;
}) {
  if (COMING_SOON_SLUGS.has(product.slug)) {
    return (
      <div className={`${className} border border-graphite text-iron`}>
        Coming Soon
      </div>
    );
  }

  if (isFreeProduct(product)) {
    return (
      <a href={product.download} download className={`${className} btn-primary text-void`}>
        {purchaseLabel(product)} →
      </a>
    );
  }

  return (
    <a
      href={product.stripe || product.href}
      target="_blank"
      rel="noreferrer"
      className={`${className} btn-primary text-void`}
    >
      {purchaseLabel(product)}
    </a>
  );
}

function formatDescription(product: ShelfProduct) {
  if (product.kind === "print") {
    return "An original MK Parrish poetry print produced as archival-quality wall art. Clean enough for a modern room, personal enough to mean something every time you pass it.";
  }

  if (product.collection === "frameworks") {
    return "This is the self-guided version of a real consulting process. The structure, prompts, and decision tools are designed to move you from staring at the problem to making specific choices you can use.";
  }

  return "Built from real writing and positioning work, this guide gives you a practical path through the problem instead of another pile of advice to save and never use.";
}

export default async function ShelfProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findShelfProduct(slug);

  if (!product) notFound();

  const relatedProducts = relatedShelfProducts(product);
  const free = isFreeProduct(product);

  return (
    <>
      <section className="relative overflow-hidden bg-void pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[70vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.14),transparent_62%)]" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Link
            href="/shelf"
            className="font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ash transition hover:text-petal"
          >
            ← Back to The Shelf
          </Link>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
            <div>
              <Eyebrow>
                {product.tag} · {product.kind === "print" ? "Physical Print" : "Digital Download"}
              </Eyebrow>
              <div className="mt-4 max-w-5xl">
                <H1>{product.title}</H1>
              </div>
              <p
                className="mt-6 max-w-3xl font-serif text-xl italic leading-9 text-petal/85 md:text-2xl"
                style={{ fontWeight: 500 }}
              >
                {product.subtitle}
              </p>
              <p className="mt-5 max-w-2xl font-body text-base font-light leading-8 text-smoke">
                {product.desc}
              </p>

              {product.preview && (
                <blockquote className="mt-8 max-w-2xl border-l-2 border-petal/40 pl-6">
                  <p className="font-serif text-lg italic leading-8 text-pearl">
                    “{product.preview}”
                  </p>
                </blockquote>
              )}
            </div>

            <aside className="relative bg-obsidian p-8 md:p-10">
              <div className="absolute inset-x-0 top-0 h-px bg-petal" />
              {product.cover && (
                <div className="mb-8 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.cover}
                    alt={`${product.title} — book cover`}
                    width={1600}
                    height={2560}
                    className="aspect-[5/8] w-full border border-graphite/70 object-cover shadow-[0_16px_60px_rgba(0,0,0,0.55)]"
                  />
                </div>
              )}
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.24em] text-iron">
                {product.kind === "print" ? "Original Poetry Print" : product.tag}
              </p>
              <p className="mt-4 font-display text-5xl uppercase tracking-[0.01em] text-white">
                {free ? "Free" : product.price}
                {product.limitedFree && (
                  <span className="ml-3 align-middle font-body text-lg font-light text-iron line-through">
                    {product.price}
                  </span>
                )}
              </p>
              <p className="mt-2 font-body text-xs font-light leading-6 text-ash">
                {accessLabel(product)}
              </p>

              <ul className="my-8 space-y-4">
                {product.features.map((feature) => (
                  <li key={feature} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 bg-petal" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <ProductAction
                product={product}
                className="flex w-full items-center justify-center px-5 py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.18em]"
              />
              <p className="mt-4 text-center font-body text-[0.65rem] font-light leading-5 text-iron">
                {product.kind === "print"
                  ? "Secure Stripe checkout · Available sizes shown at checkout"
                  : free
                    ? "No account required · Yours to keep"
                    : "One-time purchase · No subscription"}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Eyebrow>What it is</Eyebrow>
            <H2>
              Clear enough
              <br />
              <span className="text-petal">to actually use.</span>
            </H2>
          </div>
          <div className="space-y-6 font-body text-base font-light leading-8 text-smoke">
            <p>{product.desc}</p>
            <p>{formatDescription(product)}</p>
            {product.kind === "digital" && (
              <p>
                No filler chapter written to make the page count look impressive. The point is movement: clearer thinking, stronger language, and work you can put into the world.
              </p>
            )}
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={17} />

      <RevealSection bg="void" num="02">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow>{product.kind === "print" ? "Made for" : "Good fit if"}</Eyebrow>
            <H2>
              This belongs
              <br />
              <span className="text-petal">with you if —</span>
            </H2>
          </div>
          <ul className="space-y-4 pt-2">
            {product.forWho.map((item, index) => (
              <li key={item} className="flex gap-4 border-b border-graphite pb-4 last:border-0">
                <span className="mt-1 font-mono text-xs tracking-[0.2em] text-petal/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-sm font-light leading-7 text-smoke">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </RevealSection>

      <RevealSection bg="obsidian" num="03">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Eyebrow>{product.kind === "print" ? "Print details" : "Inside"}</Eyebrow>
            <H2>
              What you
              <br />
              <span className="text-petal">actually get.</span>
            </H2>
          </div>
          <div className="grid gap-px bg-graphite sm:grid-cols-2">
            {product.features.map((feature, index) => (
              <div key={feature} className="bg-void p-7">
                <p className="font-mono text-xs tracking-[0.2em] text-petal/60">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection bg="void">
        <div className="relative overflow-hidden text-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(242,175,198,0.09),transparent_65%)]" />
          </div>
          <div className="relative py-12 md:py-20">
            <Eyebrow>{free ? "Get it now" : "Ready when you are"}</Eyebrow>
            <H2>{product.title}</H2>
            <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-8 text-smoke">
              {product.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <ProductAction
                product={product}
                className="inline-flex items-center justify-center px-9 py-5 font-body text-[0.8rem] font-bold uppercase tracking-[0.18em]"
              />
              <ArrowLink href="/shelf">Browse The Shelf</ArrowLink>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={13} />

      <RevealSection bg="obsidian">
        <Eyebrow>Keep browsing</Eyebrow>
        <H2>
          More from
          <br />
          <span className="text-petal">The Shelf.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {relatedProducts.map((related) => (
            <Link
              key={related.slug}
              href={`/shelf/${related.slug}`}
              className="group relative flex min-h-[300px] flex-col bg-void p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-carbon"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-50" />
              {related.cover && (
                <div className="mb-6 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={related.cover}
                    alt={`${related.title} — book cover`}
                    width={1600}
                    height={2560}
                    loading="lazy"
                    className="aspect-[5/8] w-full border border-graphite/70 object-cover shadow-[0_12px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-iron">
                {related.tag}
              </p>
              <h3 className="mt-4 font-display text-2xl uppercase leading-tight tracking-[0.02em] text-pearl">
                {related.title}
              </h3>
              <p className="mt-2 font-display text-3xl text-petal">
                {isFreeProduct(related) ? "Free" : related.price}
              </p>
              <p className="mt-5 flex-1 font-body text-sm font-light leading-7 text-smoke">
                {related.desc}
              </p>
              <span className="mt-7 font-body text-xs font-bold uppercase tracking-[0.2em] text-petal/60 transition group-hover:text-petal">
                View details →
              </span>
            </Link>
          ))}
        </div>
      </RevealSection>
    </>
  );
}
