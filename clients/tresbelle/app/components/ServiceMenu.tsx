import { BOOKING_URL, formatDuration, formatPrice, services } from "@/content/site";

export default function ServiceMenu() {
  return (
    <div className="space-y-20">
      {services.map((cat, i) => (
        <article key={cat.id} id={cat.id} className="reveal grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="eyebrow">
              {String(i + 1).padStart(2, "0")} · {cat.kicker}
            </p>
            <h3 className="serif-italic mt-3 text-4xl md:text-5xl">{cat.title}</h3>
            <p className="mt-4 max-w-sm leading-relaxed text-[var(--color-smoke)]">{cat.intro}</p>
          </div>

          <ul className="border-t hairline">
            {cat.services.map((s) => {
              const duration = formatDuration(s.duration);
              return (
                <li key={s.name} className="service-row border-b hairline">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener"
                    className="grid gap-2 px-1 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8 sm:px-4"
                    aria-label={`Book ${s.name}`}
                  >
                    <div>
                      <p className="display text-3xl sm:text-4xl">{s.name}</p>
                      <p className="mt-2 max-w-lg text-[var(--color-smoke)]">{s.blurb}</p>
                    </div>
                    <div className="flex items-baseline gap-4 font-mono text-sm text-[var(--color-champagne)] sm:flex-col sm:items-end sm:gap-1">
                      <span>{formatPrice(s)}</span>
                      {duration && <span className="text-[var(--color-ash)]">{duration}</span>}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </article>
      ))}
    </div>
  );
}
