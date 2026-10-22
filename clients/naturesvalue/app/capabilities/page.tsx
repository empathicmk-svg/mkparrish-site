import type { Metadata } from "next";
import { Card, Container, CtaBand, PageHero } from "../components/ui";
import { DOSAGE_FORMS } from "../content/site";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "Capsules, tablets, liquid caps and powders, made under one cGMP quality system.",
  alternates: { canonical: "/capabilities" },
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Capabilities" title="Every format your formula needs" intro="Capsules, tablets, liquid caps and powders, made under one cGMP quality system." trail={[{ href: "/capabilities", label: "Capabilities" }]} />
      <section className="py-20">
        <Container className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DOSAGE_FORMS.map((item, i) => (
            <Card key={item.slug} href={`/capabilities/${item.slug}`} title={item.title} body={item.short} delay={(i % 3) * 90} />
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
