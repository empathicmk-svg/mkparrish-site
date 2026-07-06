import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  SERVICE_EBOOKS,
  productCheckoutHref,
  productCover,
  type ShopProduct,
} from "@/app/lib/config";
import { ArrowLink, BtnGhost, BtnPrimary, Eyebrow, H2, RevealSection } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Creator Revenue Stack — MK Parrish",
  description:
    "Six creator monetization guides for brand deals, UGC, TikTok Shop, repurposing, AI voice, and owned audience revenue.",
};

const creatorSlugs = [
  "the-brand-deal-room",
  "the-ugc-brief-bank",
  "the-tiktok-shop-sprint",
  "the-repurposing-engine",
  "the-ai-content-twin",
  "the-creator-owned-funnel",
] as const;

const creatorProducts = creatorSlugs
  .map((slug) => SERVICE_EBOOKS.find((product) => product.slug === slug))
  .filter((product): product is Extract<ShopProduct, { slug: (typeof creatorSlugs)[number] }> => Boolean(product));

const servicesVault = SERVICE_EBOOKS.find((product) => product.slug === "the-services-vault");

const launchPath = [
  {
    label: "Day 1",
    title: "Name the money path",
    text: "Pick the one thing attention should do next: join, buy, book, reply, or save.",
  },
  {
    label: "Day 2",
    title: "Build the proof asset",
    text: "Media kit, UGC menu, affiliate tracker, or funnel map. Make the offer inspectable.",
  },
  {
    label: "Day 3",
    title: "Post the useful angle",
    text: "Teach the problem before pitching the product. The post should make the need obvious.",
  },
  {
    label: "Day 4",
    title: "Repeat with a new doorway",
    text: "Turn the same idea into a reel, carousel, LinkedIn post, story, and email.",
  },
  {
    label: "Day 5",
    title: "Track the behavior",
    text: "Watch clicks, saves, replies, sales, and the questions people ask before buying.",
  },
  {
    label: "Day 6",
    title: "Follow the money",
    text: "Double down on the product, package, or platform that created buyer behavior.",
  },
] as const;

function ProductCard({ product }: { product: (typeof creatorProducts)[number] }) {
  const checkoutHref = productCheckoutHref(product);
  const external = checkoutHref.startsWith("http");

  return (
    <article className="group flex h-full flex-col bg-void p-6 transition hover:bg-carbon md:p-7">
      <Link href={`/shop/${product.slug}`} className="relative mb-6 block overflow-hidden border border-graphite/80 bg-obsidian">
        <Image
          src={productCover(product)}
          alt={`${product.title} cover`}
          width={1600}
          height={2560}
          className="aspect-[5/8] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
        />
      </Link>
      <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.24em] text-petal">{product.tag}</p>
      <h2 className="mt-3 font-display text-3xl uppercase leading-tight tracking-[0.02em] text-pearl">{product.title}</h2>
      <p className="mt-2 font-display text-4xl text-white">{product.price}</p>
      <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">{product.desc}</p>
      <ul className="mt-6 space-y-2">
        {product.features.slice(0, 3).map((feature) => (
          <li key={feature} className="flex gap-3 font-body text-xs font-light leading-6 text-ash">
            <span className="mt-2 h-1 w-1 shrink-0 bg-petal" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-7 grid gap-2">
        <a
          href={checkoutHref}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className="btn-primary inline-flex justify-center px-5 py-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-void"
        >
          Buy {product.price}
        </a>
        <Link
          href={`/shop/${product.slug}`}
          className="inline-flex justify-center border border-graphite px-5 py-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ash transition hover:border-petal hover:text-petal"
        >
          View details
        </Link>
      </div>
    </article>
  );
}

export default function CreatorRevenuePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-void pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[68vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.15),transparent_62%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-[0.68rem] font-bold uppercase tracking-[0.32em] text-petal">
            Creator Revenue Stack
          </p>
          <h1 className="mt-5 max-w-6xl font-display text-6xl uppercase leading-[0.88] tracking-[0.01em] text-pearl md:text-8xl lg:text-9xl">
            Turn social attention <span className="text-petal">into buyer behavior.</span>
          </h1>
          <p className="mt-7 max-w-3xl font-serif text-xl italic leading-9 text-smoke md:text-2xl">
            Brand deals, UGC packages, TikTok Shop tests, repurposed campaigns, AI-safe drafting, and an owned funnel behind the feed.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {servicesVault && <BtnPrimary href={productCheckoutHref(servicesVault)}>Buy the Vault — $127</BtnPrimary>}
            <BtnGhost href="#creator-offers">Shop the six guides</BtnGhost>
          </div>
        </div>
      </section>

      <RevealSection bg="obsidian" num="01" id="creator-offers">
        <Eyebrow pink>Six ways to monetize</Eyebrow>
        <H2>Pick the revenue lane that matches the audience you already have.</H2>
        <p className="mt-5 max-w-3xl font-body text-sm font-light leading-7 text-smoke">
          Each guide is built as a practical operating asset: a way to package proof, pitch cleanly, make useful content, and send attention somewhere that can convert.
        </p>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {creatorProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </RevealSection>

      <RevealSection bg="void" num="02">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow pink>Launch rhythm</Eyebrow>
            <H2>Post for attention. Build for the sale.</H2>
            <p className="mt-5 font-body text-sm font-light leading-7 text-smoke">
              Use this sequence when the feed is moving but the money path is vague. The goal is not more content. The goal is a cleaner bridge from trust to purchase.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <ArrowLink href="/shop/the-repurposing-engine">Get the repurposing map</ArrowLink>
              <ArrowLink href="/shop/the-creator-owned-funnel">Build the funnel</ArrowLink>
            </div>
          </div>
          <div className="grid gap-px bg-graphite sm:grid-cols-2">
            {launchPath.map((step) => (
              <article key={step.title} className="bg-obsidian p-6 md:p-7">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-petal/70">{step.label}</p>
                <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{step.title}</h3>
                <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      {servicesVault && (
        <RevealSection bg="carbon" num="03">
          <div className="grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="relative border border-petal/25 bg-void">
              <Image
                src={productCover(servicesVault)}
                alt={`${servicesVault.title} cover`}
                width={1600}
                height={2560}
                className="aspect-[5/8] w-full object-cover"
                sizes="(min-width: 1024px) 34vw, 90vw"
              />
            </div>
            <div>
              <Eyebrow pink>Best value</Eyebrow>
              <H2>The whole stack is already bundled.</H2>
              <p className="mt-5 max-w-2xl font-body text-base font-light leading-8 text-smoke">
                The Services Vault now includes all fourteen guides: eight service and messaging frameworks plus the six creator monetization guides on this page. Buy the library once and build from the same shelf.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <BtnPrimary href={productCheckoutHref(servicesVault)}>Buy the Vault — $127</BtnPrimary>
                <BtnGhost href="/shop/the-services-vault">See what is included</BtnGhost>
              </div>
            </div>
          </div>
        </RevealSection>
      )}
    </>
  );
}
