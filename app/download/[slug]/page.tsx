import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTACT, getShopProduct, isFreeProduct, productDeliveryLinks } from "@/app/lib/config";
import { gatedDeliveryLinks, signDownloadToken, stripeSessionGrants, verifyDownloadToken } from "@/app/lib/downloads";
import { Eyebrow, H1 } from "@/app/components/ui";
import AutoDownload from "./AutoDownload";

export const metadata: Metadata = {
  title: "Your download — MK Parrish",
  robots: { index: false, follow: false },
};

// Reads searchParams to check entitlement, so it cannot be prerendered.
export const dynamic = "force-dynamic";

export default async function DownloadPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string; session_id?: string }>;
}) {
  const { slug } = await params;
  const { token: providedToken, session_id: sessionId } = await searchParams;
  const product = getShopProduct(slug);
  if (!product) notFound();

  if (productDeliveryLinks(product).length === 0) notFound();

  // This page is the delivery page for the free lead magnets, which link
  // straight here. Paid products are delivered by emailed token link; honour a
  // token or a paid session if one is presented, otherwise show no files.
  let links: { label: string; href: string }[] = [];

  if (isFreeProduct(product)) {
    links = gatedDeliveryLinks(product);
  } else if (verifyDownloadToken(providedToken)?.slug === slug) {
    links = gatedDeliveryLinks(product, providedToken);
  } else if (sessionId && (await stripeSessionGrants(sessionId, slug))) {
    links = gatedDeliveryLinks(product, signDownloadToken(slug));
  }

  const showFiles = links.length > 0;

  return (
    <>
      {showFiles && <AutoDownload hrefs={links.map((l) => l.href)} />}
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
            {showFiles ? (
              <>
                {product.title} is yours to keep. Your download should start automatically. If it does
                not, use the buttons below. Both the PDF and the Kindle-ready EPUB are included.
              </>
            ) : (
              <>
                {product.title} is delivered by email. Your download links are in the receipt that
                arrives with your order — they are tied to your purchase, so they only work for you.
              </>
            )}
          </p>

          {showFiles && (
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
          )}

          <p className="mt-8 font-body text-xs font-light text-iron">
            {showFiles ? "Trouble downloading?" : "Cannot find your email?"} Email{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-petal transition hover:text-blush">{CONTACT.email}</a>{" "}
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
