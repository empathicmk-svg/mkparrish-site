import type { Metadata } from "next";
import { Container, CtaBand, PageHero } from "../components/ui";
import { FAQ } from "../content/site";
import FaqList from "./FaqList";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about private label and contract supplement manufacturing at Nature's Value.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero
        eyebrow="FAQ"
        title="Questions brands ask us"
        intro="Everything you need to know before you start. Can't find your answer? Ask us directly."
        trail={[{ href: "/faq", label: "FAQ" }]}
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <FaqList />
        </Container>
      </section>
      <CtaBand title="Still have questions?" />
    </>
  );
}
