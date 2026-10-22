import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ItemDetail from "../../components/ItemDetail";
import { DOSAGE_FORMS } from "../../content/site";

export function generateStaticParams() {
  return DOSAGE_FORMS.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/capabilities/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = DOSAGE_FORMS.find((i) => i.slug === slug);
  if (!item) return {};
  return { title: item.title, description: item.short, alternates: { canonical: `/capabilities/${slug}` } };
}

export default async function Page({ params }: PageProps<"/capabilities/[slug]">) {
  const { slug } = await params;
  const item = DOSAGE_FORMS.find((i) => i.slug === slug);
  if (!item) notFound();
  return <ItemDetail item={item} section="Capabilities" base="/capabilities" siblings={DOSAGE_FORMS} dosageForm />;
}
