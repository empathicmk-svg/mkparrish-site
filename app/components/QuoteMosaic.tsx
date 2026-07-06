import Link from "next/link";
import { quotesBySlug } from "@/app/lib/quote-bank";

type QuoteCta = {
  href: string;
  label: string;
};

type QuoteMosaicProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: QuoteCta;
  secondaryCta?: QuoteCta;
  highlighted?: boolean;
  slugs: string[];
};

export function QuoteMosaic({
  eyebrow = "Margin notes",
  title = "The chorus behind the work.",
  description,
  primaryCta,
  secondaryCta,
  highlighted = false,
  slugs,
}: QuoteMosaicProps) {
  const quotes = quotesBySlug(slugs);
  if (quotes.length === 0) return null;

  const sectionClass = highlighted ? "bg-carbon py-12 md:py-16" : "bg-void py-14 md:py-20";
  const gridClass = highlighted ? "grid gap-px bg-petal/40 sm:grid-cols-2 xl:grid-cols-4" : "grid gap-px bg-graphite sm:grid-cols-2 xl:grid-cols-4";
  const cardClass = highlighted ? "flex min-h-[250px] flex-col bg-void p-6 shadow-[0_0_40px_rgba(242,175,198,0.08)]" : "flex min-h-[230px] flex-col bg-obsidian p-6";

  return (
    <section className={sectionClass}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="max-w-3xl">
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-5xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-5 max-w-2xl font-body text-sm font-light leading-7 text-smoke">
                {description}
              </p>
            ) : null}
          </div>
          {primaryCta || secondaryCta ? (
            <div className="flex flex-col justify-end gap-3">
              {primaryCta ? <QuoteMosaicLink cta={primaryCta} primary /> : null}
              {secondaryCta ? <QuoteMosaicLink cta={secondaryCta} /> : null}
            </div>
          ) : null}
        </div>

        <div className={gridClass}>
          {quotes.map((quote, index) => (
            <figure key={quote.slug} className={cardClass}>
              <p className="font-body text-[0.58rem] font-bold uppercase tracking-[0.24em] text-petal">
                {String(index + 1).padStart(2, "0")}
              </p>
              <blockquote className="mt-5 font-serif text-xl italic leading-8 text-pearl">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-auto pt-7">
                <p className="font-body text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ash">
                  {quote.author}
                </p>
                <p className="mt-1 font-body text-[0.65rem] font-light text-iron">{quote.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteMosaicLink({ cta, primary = false }: { cta: QuoteCta; primary?: boolean }) {
  const className = primary
    ? "btn-primary inline-flex justify-center px-5 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
    : "inline-flex justify-center border border-petal/30 px-5 py-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.16em] text-petal transition hover:border-petal hover:text-blush";

  if (!cta.href.startsWith("/")) {
    return (
      <a
        href={cta.href}
        target={cta.href.startsWith("http") ? "_blank" : undefined}
        rel={cta.href.startsWith("http") ? "noreferrer" : undefined}
        className={className}
      >
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
}
