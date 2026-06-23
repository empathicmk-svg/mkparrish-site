"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { coverForSlug } from "@/app/lib/shelf-catalog";

export type BrowseItem = {
  slug: string;
  title: string;
  price: string;
  priceNum: number;
  compareAt?: string;
  tag: string;
  desc: string;
  features: readonly string[];
  free?: boolean;
  limitedFree?: boolean;
  download?: string;
  stripe?: string;
  href: string;
  category: "frameworks" | "ebooks" | "bundles";
  featured: boolean;
  comingSoon?: boolean;
};

type FilterKey = "all" | "frameworks" | "ebooks" | "bundles" | "free";
type SortKey = "featured" | "price-asc" | "price-desc";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "frameworks", label: "Frameworks" },
  { key: "ebooks", label: "Ebooks" },
  { key: "bundles", label: "Bundles" },
  { key: "free", label: "Free" },
];

function numFrom(price?: string): number {
  if (!price) return 0;
  const m = price.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

function badgeFor(p: BrowseItem): string | null {
  if (p.free) return "Free";
  if (p.category === "bundles") return "Best Value";
  if (p.tag === "Best Seller") return "Best Seller";
  if (p.tag.startsWith("Start Here")) return "Start Here";
  if (p.featured) return "Featured";
  return null;
}

function buyHref(p: BrowseItem) {
  return p.stripe && p.stripe.length > 0 ? p.stripe : p.href;
}

function Card({ p }: { p: BrowseItem }) {
  const isFree = Boolean(p.free && p.download);
  const limitedFree = isFree && Boolean(p.limitedFree);
  const badge = badgeFor(p);
  const save = p.compareAt ? numFrom(p.compareAt) - p.priceNum : 0;

  return (
    <div
      className={`group/card relative flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 ${
        p.featured ? "bg-carbon shadow-[0_0_60px_rgba(242,175,198,0.08)]" : "bg-obsidian"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {p.featured && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}

      <Link href={`/shelf/${p.slug}`} className="group relative mb-6 block overflow-hidden">
        {badge && (
          <span className="absolute left-3 top-3 z-10 bg-petal px-2.5 py-1 font-body text-[0.55rem] font-bold uppercase tracking-[0.2em] text-void">
            {badge}
          </span>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverForSlug(p.slug)}
          alt={`${p.title} — book cover`}
          width={1600}
          height={2560}
          loading="lazy"
          className="aspect-[5/8] w-full border border-graphite/70 object-cover shadow-[0_12px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </Link>

      <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.25em] text-iron">{p.tag}</p>
      <h3 className="mt-2 font-display text-2xl uppercase leading-tight tracking-[0.02em] text-pearl">{p.title}</h3>
      <p className="mt-2 flex items-baseline gap-2 font-display text-4xl text-white">
        {isFree ? "Free" : p.price}
        {limitedFree && (
          <span className="align-middle font-body text-base font-light text-iron line-through">{p.price}</span>
        )}
        {!isFree && p.compareAt && (
          <span className="font-body text-base font-light text-iron line-through">{p.compareAt}</span>
        )}
      </p>
      {save > 0 && (
        <p className="mt-1 font-body text-[0.65rem] font-bold uppercase tracking-[0.18em] text-petal">
          Save ${save} vs. buying separately
        </p>
      )}
      <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">{p.desc}</p>
      <ul className="mt-5 space-y-2">
        {p.features.slice(0, 3).map((f) => (
          <li key={f} className="flex gap-3 font-body text-xs font-light leading-6 text-iron">
            <span className="mt-2 h-1 w-1 flex-shrink-0 bg-petal" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-7 space-y-2">
        {p.comingSoon ? (
          <div className="flex w-full items-center justify-center border border-graphite py-4 font-body text-[0.75rem] font-light uppercase tracking-[0.2em] text-iron">
            Coming Soon
          </div>
        ) : isFree ? (
          <a
            href={p.download}
            download
            className="btn-primary flex w-full items-center justify-center py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-void"
          >
            Download Free →
          </a>
        ) : (
          <a
            href={buyHref(p)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary flex w-full items-center justify-center py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-void"
          >
            Buy — {p.price}
          </a>
        )}
        <Link
          href={`/shelf/${p.slug}`}
          className="flex w-full items-center justify-center py-2 font-body text-[0.65rem] font-light uppercase tracking-[0.15em] text-ash transition hover:text-pearl"
        >
          View details →
        </Link>
      </div>
    </div>
  );
}

export default function ShelfBrowser({ products }: { products: BrowseItem[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    return {
      all: products.length,
      frameworks: products.filter((p) => p.category === "frameworks").length,
      ebooks: products.filter((p) => p.category === "ebooks").length,
      bundles: products.filter((p) => p.category === "bundles").length,
      free: products.filter((p) => p.free).length,
    } as Record<FilterKey, number>;
  }, [products]);

  // The best-value bundle drives the upsell nudge — pick the biggest saving.
  const topBundle = useMemo(() => {
    const bundles = products.filter((p) => p.category === "bundles" && p.compareAt);
    return bundles.sort((a, b) => numFrom(b.compareAt) - b.priceNum - (numFrom(a.compareAt) - a.priceNum))[0] ?? null;
  }, [products]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter((p) => {
      const matchesFilter =
        filter === "all" ? true : filter === "free" ? Boolean(p.free) : p.category === filter;
      if (!matchesFilter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );
    });
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.priceNum - b.priceNum);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.priceNum - a.priceNum);
    // Featured: lead with bundles + bestsellers (featured), keep curated order within.
    return [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [products, filter, sort, query]);

  const showUpsell = topBundle && filter !== "bundles";

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 border-y border-graphite py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter products">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  aria-pressed={active}
                  className={`flex items-center gap-2 border px-4 py-2 font-body text-[0.62rem] font-bold uppercase tracking-[0.18em] transition-colors ${
                    active
                      ? "border-petal bg-petal text-void"
                      : "border-graphite text-ash hover:border-petal/50 hover:text-pearl"
                  }`}
                >
                  {f.label}
                  <span className={active ? "text-void/70" : "text-iron"}>{counts[f.key]}</span>
                </button>
              );
            })}
          </div>

          <label className="flex items-center gap-3 font-body text-[0.62rem] font-bold uppercase tracking-[0.18em] text-iron">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-graphite bg-void px-3 py-2 font-body text-[0.62rem] font-medium uppercase tracking-[0.12em] text-pearl outline-none transition-colors hover:border-petal/50 focus:border-petal"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </label>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the shelf…"
            aria-label="Search products"
            className="w-full border border-graphite bg-void px-4 py-3 pl-10 font-body text-sm font-light text-pearl placeholder:text-iron outline-none transition-colors hover:border-petal/40 focus:border-petal"
          />
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-iron"
            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
        </div>
      </div>

      {/* Bundle upsell nudge */}
      {showUpsell && (
        <Link
          href={`/shelf/${topBundle.slug}`}
          className="mt-6 flex flex-col items-start gap-2 border border-petal/30 bg-carbon p-5 transition-colors hover:border-petal/60 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-body text-sm font-light leading-7 text-smoke">
            <span className="font-body text-[0.6rem] font-bold uppercase tracking-[0.25em] text-petal">Buying more than one?</span>
            <br />
            <span className="text-pearl">{topBundle.title}</span> bundles it all for {topBundle.price}
            {topBundle.compareAt && (
              <> — save ${numFrom(topBundle.compareAt) - topBundle.priceNum} vs. buying separately.</>
            )}
          </p>
          <span className="font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-petal">Get the bundle →</span>
        </Link>
      )}

      {/* Grid */}
      {shown.length > 0 ? (
        <div className="mt-8 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      ) : (
        <p className="mt-10 font-body text-sm font-light text-iron">No matches — try another filter or search.</p>
      )}
    </div>
  );
}
