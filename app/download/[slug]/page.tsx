import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SHOP_PRODUCTS, getShopProduct, productDeliveryLinks, productDownload } from "@/app/lib/config";
import { Eyebrow, H1 } from "@/app/components/ui";
import AutoDownload from "./AutoDownload";

export const metadata: Metadata = {
  title: "Your download — MK Parrish",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return SHOP_PRODUCTS.filter((p) => productDownload(p)).map((p) => ({ slug: p.slug }));
}

export default async function DownloadPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getShopProduct(slug);
  if (!product) notFound();

  const links = productDeliveryLinks(product);
  if (links.length === 0) notFound();

  return (
    <>
      <AutoDownload hrefs={links.map((l) => l.href)} />
      <section className="relative flex min-h-[80vh] flex-col justify-center bg-void py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.14),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[680px] text-center" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <Eyebrow pink>Thank you</Eyebrow>
          <div className="mt-4">
            <H1>Your download is ready.</H1>
          </div>
          <p className="mt-6 font-body text-base font-light leading-8 text-smoke">
            {product.title} is yours to keep. Your download should start automatically. If it does not, use the buttons below.
            Both the PDF and the Kindle-ready EPUB are included.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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

          <p className="mt-8 font-body text-xs font-light text-iron">
            Trouble downloading? Email{" "}
            <a href="mailto:mkp414@icloud.com" className="text-petal transition hover:text-blush">mkp414@icloud.com</a>{" "}
            and I will send your files directly.
          </p>

          <div className="mt-10">
            <Link href="/rebecoming" className="font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:text-petal">
              ← Back to the book
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
