import { faqs } from "@/content/site";

/** Native <details> accordion: keyboard and screen-reader friendly, no JS. */
export default function Faq() {
  return (
    <div className="border-t hairline">
      {faqs.map((f) => (
        <details key={f.q} className="faq-item reveal group border-b hairline">
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <span className="serif-italic text-2xl md:text-3xl">{f.q}</span>
            <span aria-hidden className="faq-icon display shrink-0 text-3xl text-[var(--color-petal)] transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-8 leading-relaxed text-[var(--color-smoke)]">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
