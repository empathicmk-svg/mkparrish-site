import type { Metadata } from "next";
import { Card, Container, CtaBand, PageHero } from "../components/ui";
import { SERVICES } from "../content/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Private label, custom formulation, manufacturing, packaging, testing and regulatory support with one partner.",
  alternates: { canonical: "/services" },
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Services" title="From concept to finished bottle" intro="Private label, custom formulation, manufacturing, packaging, testing and regulatory support with one partner." trail={[{ href: "/services", label: "Services" }]} />
      <section className="py-20">
        <Container className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((item, i) => (
            <Card key={item.slug} href={`/services/${item.slug}`} title={item.title} body={item.short} delay={(i % 3) * 90} />
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
