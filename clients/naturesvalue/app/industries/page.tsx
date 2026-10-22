import type { Metadata } from "next";
import { Card, Container, CtaBand, PageHero } from "../components/ui";
import { INDUSTRIES } from "../content/site";

export const metadata: Metadata = {
  title: "Who we serve",
  description: "From first-time founders to national retailers, we make supplements for brands of every size.",
  alternates: { canonical: "/industries" },
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Who we serve" title="A manufacturing partner at every stage" intro="From first-time founders to national retailers, we make supplements for brands of every size." trail={[{ href: "/industries", label: "Who we serve" }]} />
      <section className="py-20">
        <Container className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((item, i) => (
            <Card key={item.slug} href={`/industries/${item.slug}`} title={item.title} body={item.short} delay={(i % 3) * 90} />
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
