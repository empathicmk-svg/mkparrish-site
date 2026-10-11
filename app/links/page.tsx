import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Links",
  description:
    "MK Parrish — Mercedes-Benz specialist at Mercedes-Benz of Smithtown, and marketing & web design for brands that want to be seen.",
  alternates: { canonical: "/links" },
};

type LinkItem = { label: string; note: string; href: string };

const IG_DM = "https://ig.me/m/mk_parrish";

const mercedes: LinkItem[] = [
  { label: "DM me “PINK” for a test drive", note: "Pink Bow October — every car on the floor wears one", href: IG_DM },
  { label: "Shop the inventory", note: "Mercedes-Benz of Smithtown · Competition Automotive Group", href: "https://www.mbofsmithtown.com" },
  {
    label: "Visit the showroom",
    note: "630 Middle Country Rd, St. James, NY · ask for MK",
    href: "https://www.google.com/maps/search/?api=1&query=Mercedes-Benz+of+Smithtown+630+Middle+Country+Rd+St+James+NY+11780",
  },
  { label: "Lease ending? Let’s talk options", note: "DM me “LEASE” with your model and maturity month", href: IG_DM },
];

const marketing: LinkItem[] = [
  { label: "Work with me", note: "Websites, messaging and growth strategy", href: "/services" },
  { label: "Book a call", note: "Pick a time that works for you", href: "/book" },
  { label: "Get a website audit", note: "See what’s costing you leads", href: "/audit" },
  { label: "The Shelf", note: "Books, guides and playbooks", href: "/shelf" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/mk_parrish" },
  { label: "TikTok", href: "https://www.tiktok.com/@mk_parrish" },
  { label: "Website", href: "/" },
];

function LinkButton({ item }: { item: LinkItem }) {
  const external = item.href.startsWith("http");
  const className =
    "group flex items-center justify-between gap-4 border border-petal/25 bg-carbon/80 px-5 py-4 transition-colors hover:border-petal hover:bg-graphite/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-petal";
  const body = (
    <>
      <span className="min-w-0">
        <span className="block font-body text-base font-semibold text-pearl">{item.label}</span>
        <span className="mt-0.5 block font-body text-[0.8rem] text-ash">{item.note}</span>
      </span>
      <span aria-hidden className="text-petal transition-transform group-hover:translate-x-1">
        →
      </span>
    </>
  );
  return external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {body}
    </Link>
  );
}

function Group({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-[1.6rem] uppercase tracking-[0.06em] text-pearl">{title}</h2>
      <div className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <LinkButton key={item.label} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function LinksPage() {
  return (
    <div className="relative min-h-screen bg-void">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.16),transparent_65%)]" />
      <div className="relative mx-auto w-full max-w-md px-4 pb-16 pt-12">
        <header className="flex flex-col items-center text-center">
          <div className="relative h-28 w-28 overflow-hidden border-2 border-petal/60">
            <Image
              src="/author/mk-parrish-photo.jpg"
              alt="MK Parrish"
              fill
              priority
              sizes="7rem"
              className="object-cover object-[center_20%] grayscale"
            />
          </div>
          <h1 className="mt-5 font-display text-5xl uppercase tracking-[0.04em] text-pearl">MK Parrish</h1>
          <p className="mt-2 font-serif text-lg italic text-petal">
            Selling Mercedes-Benz. Building brands.
          </p>
          <p className="mt-3 font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-ash">
            Smithtown, NY · Marketing &amp; web design
          </p>
          <p className="mt-6 inline-flex items-center gap-2 border border-petal/50 bg-void/60 px-4 py-1.5 font-body text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-petal">
            🎀 Pink Bow October
          </p>
        </header>

        <Group title="Mercedes-Benz" items={mercedes} />
        <Group title="Marketing & web" items={marketing} />

        <section className="mt-10 border border-petal/25 bg-petal px-5 py-5">
          {/* Inline colour: the site's global text styles otherwise wash this out on pink. */}
          <p className="font-display text-2xl uppercase tracking-[0.04em]" style={{ color: "#080808" }}>
            Early detection saves lives.
          </p>
          <p className="mt-1 font-body text-sm" style={{ color: "#080808" }}>
            Every pink bow on our floor this month is a reminder. Talk to your doctor about the screening that’s right
            for you.
          </p>
        </section>

        <nav aria-label="Social profiles" className="mt-10 flex justify-center gap-6">
          {socials.map((s) =>
            s.href.startsWith("http") ? (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ash transition-colors hover:text-petal"
              >
                {s.label}
              </a>
            ) : (
              <Link
                key={s.label}
                href={s.href}
                className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ash transition-colors hover:text-petal"
              >
                {s.label}
              </Link>
            ),
          )}
        </nav>
        <p className="mt-6 text-center font-body text-[0.65rem] uppercase tracking-[0.2em] text-iron">@mk_parrish</p>
      </div>
    </div>
  );
}
