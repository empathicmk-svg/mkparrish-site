import type { Metadata } from "next";
import { Container, PageHero } from "../components/ui";
import ProductBuilder from "./ProductBuilder";

export const metadata: Metadata = {
  title: "Build Your Product",
  description: "Answer four quick questions about your supplement and send the summary to our team for a quote.",
  alternates: { canonical: "/start" },
};

export default function StartPage() {
  return (
    <>
      <PageHero
        eyebrow="Build your product"
        title="Plan your supplement in four steps"
        intro="Answer four quick questions and we'll turn them into a project summary you can send straight to our team."
        trail={[{ href: "/start", label: "Build your product" }]}
      />
      <section className="bg-cream py-16 sm:py-20">
        <Container className="max-w-4xl">
          <ProductBuilder />
        </Container>
      </section>
    </>
  );
}
