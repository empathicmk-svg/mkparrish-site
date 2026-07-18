import type { Metadata } from "next";
import Link from "next/link";
import { getShopProduct, productCover, CONTACT } from "@/app/lib/config";
import { Eyebrow, H1 } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Order confirmed — MK Parrish",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OrderConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const product = slug ? getShopProduct(slug) : undefined;
  const title = product?.title ?? "your paperback";

  return (
    <section className="relative flex min-h-[80vh] flex-col justify-center bg-void py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.14),transparent_65%)]" />
      </div>
      <div className="relative mx-auto w-full max-w-[720px] text-center" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
        <Eyebrow pink>Order Confirmed · Paperback</Eyebrow>
        <div className="mt-4">
          <H1>Thank you.</H1>
        </div>

        {product && (
          <div className="mt-10 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={productCover(product)}
              alt={`${product.title} cover`}
              width={1600}
              height={2560}
              className="aspect-[5/8] w-[160px] border border-graphite/70 object-cover shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            />
          </div>
        )}

        <p className="mt-8 font-body text-base font-light leading-8 text-smoke">
          Your paperback order for <span className="text-pearl">{title}</span>{" "}is confirmed and paid.
          I print and ship each copy personally, so give it a little time — I&apos;ll follow up by
          email with your shipping and tracking details.
        </p>

        <p className="mt-4 font-body text-sm font-light leading-7 text-iron">
          A receipt is on its way to your inbox. Questions about your order? Email{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-petal transition hover:text-blush">{CONTACT.email}</a>.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/shop"
            className="btn-primary inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
          >
            Back to the Shop →
          </Link>
          {product && (
            <Link
              href={`/shop/${product.slug}`}
              className="inline-flex items-center justify-center border border-graphite px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-pearl transition-colors hover:border-petal hover:text-petal"
            >
              View the book
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
