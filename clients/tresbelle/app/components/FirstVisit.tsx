import { firstVisit } from "@/content/site";

export default function FirstVisit() {
  return (
    <ol className="grid gap-px bg-[rgba(217,195,160,0.18)] sm:grid-cols-2 lg:grid-cols-4">
      {firstVisit.map((s) => (
        <li key={s.n} className="reveal bg-[var(--color-obsidian)] p-8">
          <span className="eyebrow">Step {s.n}</span>
          <h3 className="display mt-4 text-4xl">{s.title}</h3>
          <p className="mt-3 leading-relaxed text-[var(--color-smoke)]">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
