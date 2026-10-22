import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ItemDetail from "../../components/ItemDetail";
import { SERVICES } from "../../content/site";

export function generateStaticParams() {
  return SERVICES.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = SERVICES.find((i) => i.slug === slug);
  if (!item) return {};
  return { title: item.title, description: item.short, alternates: { canonical: `/services/${slug}` } };
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const item = SERVICES.find((i) => i.slug === slug);
  if (!item) notFound();
  return <ItemDetail item={item} section="Services" base="/services" siblings={SERVICES} />;
}
