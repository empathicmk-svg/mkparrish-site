import { redirect } from "next/navigation";

// Product detail pages now live at /shop/[slug]. Redirect old /shelf links there.
export default async function ShelfProductRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/shop/${slug}`);
}
