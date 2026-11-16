import Image from "next/image";
import { SOCIALS } from "@/app/lib/config";
import Reveal from "./Reveal";

const TILES = [
  { src: "/home/g580-1.jpg", alt: "The electric G 580 at Mercedes-Benz of Smithtown", tag: "Cars", label: "The G-Wagon went electric" },
  { src: "/home/quote-never-dim.jpg", alt: "A neon quote card: i will never dim another soul to make my own look brighter", tag: "Poems", label: "Make My Own Light" },
  { src: "/home/corvette-1.jpg", alt: "A red Corvette that just came in on trade", tag: "Cars", label: "Just traded in" },
  { src: "/home/quote-attention.jpg", alt: "A neon quote card about attention and care", tag: "Books", label: "Still Here, Still Hers" },
  { src: "/home/g580-3.jpg", alt: "The rear of the G 580 with the spare tire and badge", tag: "Cars", label: "Spare tire. Still there." },
  { src: "/home/corvette-4.jpg", alt: "The front of the Corvette with the crossed-flags badge", tag: "Cars", label: "Crossed flags" },
] as const;

/** A wall of recent posts that links out to where they live. */
export default function ContentWall() {
  const insta = SOCIALS.find((s) => s.label === "Instagram")?.href ?? "https://www.instagram.com/mk_parrish";
  return (
    <div>
      <div className="grid grid-cols-2 gap-px bg-graphite md:grid-cols-3">
        {TILES.map((t, i) => (
          <Reveal key={t.src} delay={i * 70}>
            <a href={insta} target="_blank" rel="noreferrer" className="mk-tile group relative block aspect-[4/5] overflow-hidden bg-void">
              <Image src={t.src} alt={t.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="mk-tile-img object-cover" />
              <div className="mk-tile-shade absolute inset-0" aria-hidden="true" />
              <span className="absolute left-3 top-3 border border-petal/40 bg-void/70 px-2 py-1 font-body text-[0.58rem] font-bold uppercase tracking-[0.24em] text-petal backdrop-blur-sm">
                {t.tag}
              </span>
              <span className="sr-only">{t.label}</span>
            </a>
          </Reveal>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:text-petal"
          >
            {s.label} <span className="text-petal">{s.handle}</span> →
          </a>
        ))}
      </div>
    </div>
  );
}
