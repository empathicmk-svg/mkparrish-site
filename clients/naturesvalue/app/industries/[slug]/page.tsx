import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ItemDetail from "../../components/ItemDetail";
import { INDUSTRIES } from "../../content/site";

export function generateStaticParams() {
  return INDUSTRIES.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = INDUSTRIES.find((i) => i.slug === slug);
  if (!item) return {};
  return { title: item.title, description: item.short, alternates: { canonical: `/industries/${slug}` } };
}

export default async function Page({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const item = INDUSTRIES.find((i) => i.slug === slug);
  if (!item) notFound();
  return <ItemDetail item={item} section="Who we serve" base="/industries" siblings={INDUSTRIES} />;
}
