import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TestDriveForm from "./TestDriveForm";

export const metadata: Metadata = {
  title: "Book a Test Drive",
  description:
    "Book a Mercedes-Benz test drive with MK Parrish at Mercedes-Benz of Smithtown, 630 Middle Country Rd, St. James, NY. New, AMG, Sprinter fleet vans and custom 2027 orders.",
  alternates: { canonical: "/test-drive" },
};

const perks = [
  { title: "Pulled up and ready", desc: "Tell me what you want to drive and it'll be out front when you arrive." },
  { title: "Fleet & Sprinter vans", desc: "Cargo, crew and passenger vans, plus fleet specials for your business." },
  { title: "Custom 2027 orders", desc: "Not on the lot? We'll spec it together and I'll place the factory order." },
];

export default function TestDrivePage() {
  return (
    <div className="min-h-screen bg-void">
      <section className="relative">
        <div className="relative h-[46vh] min-h-[300px] w-full overflow-hidden">
          <Image
            src="/mercedes/test-drive-g63.jpg"
            alt="Matte black Mercedes-AMG G 63 in the Mercedes-Benz of Smithtown showroom"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_60%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,.55)_0%,rgba(8,8,8,0)_30%,rgba(8,8,8,.2)_60%,#080808_100%)]" />
          <div className="absolute inset-x-0 top-0 mx-auto flex max-w-2xl items-center justify-between px-4 pt-5">
            <Link href="/links" className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-pearl">
              ← MK Parrish
            </Link>
            <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-pearl/80">
              Mercedes-Benz of Smithtown
            </span>
          </div>
        </div>
        <div className="relative mx-auto -mt-28 max-w-2xl px-4">
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-petal">Ask for MK</p>
          <h1 className="mt-3 font-display uppercase text-pearl" style={{ fontSize: "clamp(3.4rem, 14vw, 6.5rem)", lineHeight: 0.88 }}>
            Book a <span className="text-petal">test drive</span>
          </h1>
          <p className="mt-4 font-serif text-lg italic text-smoke md:text-xl">
            Pick the car and the time. I&apos;ll have it ready.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-6 pt-10">
        <TestDriveForm />
      </section>

      <section className="mx-auto max-w-2xl px-4 py-10">
        <div className="grid gap-px bg-graphite sm:grid-cols-3">
          {perks.map((p) => (
            <div key={p.title} className="bg-obsidian p-6">
              <h2 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{p.title}</h2>
              <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-2xl px-4 pb-16 pt-4 text-center">
        <p className="font-display text-3xl uppercase tracking-[0.04em] text-pearl">Mary Kate Parrish</p>
        <p className="mt-1 font-body text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ash">
          Sales &amp; Leasing Consultant · Mercedes-Benz of Smithtown
        </p>
        <p className="mt-4 font-body text-sm leading-7 text-smoke">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Mercedes-Benz+of+Smithtown+630+Middle+Country+Rd+St+James+NY+11780"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-petal"
          >
            630 Middle Country Road, St. James, NY 11780
          </a>
          <br />
          Showroom <a href="tel:+16312652204" className="text-pearl hover:text-petal">631.265.2204</a> ·{" "}
          <a href="https://www.instagram.com/mk_parrish" target="_blank" rel="noopener noreferrer" className="text-petal">
            @mk_parrish
          </a>
        </p>
      </footer>
    </div>
  );
}
