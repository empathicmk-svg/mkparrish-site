import type { Metadata } from "next";
import Link from "next/link";
import { getShopProduct, productCover, productDeliveryLinks, CONTACT } from "@/app/lib/config";
import { Eyebrow, H1 } from "@/app/components/ui";
import AutoDownload from "@/app/download/[slug]/AutoDownload";

export const metadata: Metadata = {
  title: "Order confirmed — MK Parrish",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OrderConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string; format?: string }>;
}) {
  const { slug, format } = await searchParams;
  const product = slug ? getShopProduct(slug) : undefined;
  const isPaperback = format === "paperback";
  const title = product?.title ?? "your order";
  const links = !isPaperback && product ? productDeliveryLinks(product) : [];

  return (
    <section className="relative flex min-h-[80vh] flex-col justify-center bg-void py-28">
      {links.length > 0 && <AutoDownload hrefs={links.map((l) => l.href)} />}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.14),transparent_65%)]" />
      </div>
      <div className="relative mx-auto w-full max-w-[720px] text-center" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
        <Eyebrow pink>{isPaperback ? "Order Confirmed · Paperback" : "Order Confirmed"}</Eyebrow>
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

        {isPaperback ? (
          <>
            <p className="mt-8 font-body text-base font-light leading-8 text-smoke">
              Your paperback order for <span className="text-pearl">{title}</span>{" "}is confirmed and paid.
              I print and ship each copy personally, so give it a little time — I&apos;ll follow up by
              email with your shipping and tracking details.
            </p>
            <p className="mt-4 font-body text-sm font-light leading-7 text-iron">
              A receipt is on its way to your inbox. Questions about your order? Email{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-petal transition hover:text-blush">{CONTACT.email}</a>.
            </p>
          </>
        ) : (
          <>
            <p className="mt-8 font-body text-base font-light leading-8 text-smoke">
              Your order for <span className="text-pearl">{title}</span>{" "}is confirmed. Your download is
              starting now — if it doesn&apos;t, use the buttons below. Both the PDF and the Kindle-ready
              EPUB are included, yours to keep.
            </p>
            {links.length > 0 && (
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    download
                    className="btn-primary inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
                  >
                    Download {l.label}
                  </a>
                ))}
              </div>
            )}
            <p className="mt-6 font-body text-sm font-light leading-7 text-iron">
              A receipt is on its way to your inbox. Trouble downloading? Email{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-petal transition hover:text-blush">{CONTACT.email}</a>{" "}
              and I&apos;ll send your files directly.
            </p>
          </>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/shop"
            className={
              isPaperback
                ? "btn-primary inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
                : "inline-flex items-center justify-center border border-graphite px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-pearl transition-colors hover:border-petal hover:text-petal"
            }
          >
            Back to the Shop{isPaperback ? " →" : ""}
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
