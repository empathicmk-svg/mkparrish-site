"use client";

import { useMemo, useState } from "react";
import type { ShelfProduct } from "@/app/lib/shelf-catalog";

const sizeOptions = ["5x7", "8x10", "11x14", "16x20"] as const;
const styleOptions = ["Serif", "Display"] as const;
const toneOptions = [
  { id: "petal", label: "Petal", swatch: "#F2AFC6", text: "text-petal", wash: "rgba(242,175,198,0.16)" },
  { id: "pearl", label: "Pearl", swatch: "#FAFAF8", text: "text-white", wash: "rgba(250,250,248,0.09)" },
  { id: "smoke", label: "Smoke", swatch: "#B0B0B0", text: "text-smoke", wash: "rgba(176,176,176,0.12)" },
  { id: "ink", label: "Ink", swatch: "#1A1A1A", text: "text-pearl", wash: "rgba(26,26,26,0.38)" },
] as const;

type PrintSize = (typeof sizeOptions)[number];
type PrintStyle = (typeof styleOptions)[number];
type ToneId = (typeof toneOptions)[number]["id"];

type Preset = {
  slug: string;
  title: string;
  phrase: string;
  source: string;
  cover?: string;
  sizes: readonly string[];
};

function normalizePhrase(value: string) {
  return value.trim().replace(/\s+/g, " ") || "Your words here.";
}

function sourceFor(product: ShelfProduct) {
  const source = product.assetLinks?.find((link) => !link.label.includes("Mockup") && !link.label.includes("Proof"));
  if (source) return source.label;
  if (product.slug === "custom-quote-print") return "Custom proof builder";
  return product.tag;
}

function presetFromProduct(product: ShelfProduct): Preset {
  return {
    slug: product.slug,
    title: product.title,
    phrase: product.preview ?? product.subtitle,
    source: sourceFor(product),
    cover: product.cover,
    sizes: product.sizes ?? sizeOptions,
  };
}

function proofHref({
  email,
  phrase,
  title,
  size,
  style,
  tone,
  reference,
}: {
  email: string;
  phrase: string;
  title: string;
  size: PrintSize;
  style: PrintStyle;
  tone: ToneId;
  reference?: Preset;
}) {
  const subject = "Custom Print Shop proof request";
  const body = [
    "Hi MK,",
    "",
    "I want a custom Print Shop proof.",
    "",
    `Title: ${title.trim() || "Custom Quote Print"}`,
    `Phrase: ${normalizePhrase(phrase)}`,
    `Size: ${size}`,
    `Style: ${style}`,
    `Color direction: ${tone}`,
    reference ? `Starting proof: ${reference.title}` : "",
    "",
    "Please send the next steps.",
  ].filter(Boolean).join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function compactSize(size: string) {
  return size.replace("×", "x");
}

function MockupPreview({
  title,
  phrase,
  source,
  size,
  style,
  tone,
}: {
  title: string;
  phrase: string;
  source: string;
  size: PrintSize;
  style: PrintStyle;
  tone: ToneId;
}) {
  const activeTone = toneOptions.find((option) => option.id === tone) ?? toneOptions[0];
  const cleanPhrase = normalizePhrase(phrase);
  const quoteSize =
    cleanPhrase.length > 74
      ? "clamp(1.45rem, 3.7vw, 2.6rem)"
      : cleanPhrase.length > 46
        ? "clamp(1.65rem, 4.3vw, 3rem)"
        : "clamp(1.85rem, 4.9vw, 3.45rem)";

  return (
    <div className="w-full max-w-[560px] border border-graphite/80 bg-carbon p-4 shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
      <div
        className="relative grid aspect-[5/8] overflow-hidden border border-petal/20 p-8 text-center md:p-10"
        style={{
          background: `radial-gradient(ellipse 88% 48% at 50% -8%, ${activeTone.wash}, transparent 62%), radial-gradient(ellipse 64% 42% at 108% 108%, rgba(122,122,122,0.22), transparent 62%), linear-gradient(180deg, #262626 0%, #202020 46%, #1A1A1A 100%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-iron via-petal to-blush" />
        <div className="pointer-events-none absolute inset-5 border border-petal/20" />
        <p className="relative z-10 font-body text-[0.5rem] font-bold uppercase tracking-[0.32em] text-petal md:text-[0.62rem]">
          MK Parrish Print Shop
        </p>

        <div className="relative z-10 grid place-items-center">
          <div className="w-full">
            <p className="font-display uppercase leading-[0.88] tracking-[0.02em] text-white" style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}>
              {title.trim() || "Custom Quote Print"}
            </p>
            <div className="mx-auto my-7 h-px w-28 bg-gradient-to-r from-transparent via-petal to-transparent md:my-9 md:w-40" />
            <p
              className={`${activeTone.text} ${
                style === "Serif" ? "font-serif italic" : "font-display uppercase tracking-[0.02em]"
              }`}
              style={{
                fontSize: style === "Serif" ? quoteSize : "clamp(2.15rem, 6vw, 4.8rem)",
                lineHeight: style === "Serif" ? 1.1 : 0.9,
                textShadow: tone === "ink" ? "none" : "0 0 28px rgba(242,175,198,0.22)",
                textWrap: "balance",
              }}
            >
              {cleanPhrase}
            </p>
            <p className="mx-auto mt-7 max-w-[24ch] font-body text-[0.65rem] font-light leading-5 text-smoke md:text-sm">
              {source}
            </p>
          </div>
        </div>

        <p className="relative z-10 self-end font-body text-[0.5rem] font-bold uppercase tracking-[0.24em] text-ash md:text-[0.62rem]">
          {size} / {style} / {activeTone.label}
        </p>
      </div>
    </div>
  );
}

export function PrintShopCustomizer({
  contactEmail,
  products,
}: {
  contactEmail: string;
  products: readonly ShelfProduct[];
}) {
  const presets = useMemo(() => products.map(presetFromProduct), [products]);
  const defaultPreset = presets.find((preset) => preset.slug === "custom-quote-print") ?? presets[0];
  const [selectedSlug, setSelectedSlug] = useState(defaultPreset?.slug ?? "");
  const selected = presets.find((preset) => preset.slug === selectedSlug) ?? defaultPreset;
  const [title, setTitle] = useState(defaultPreset?.title ?? "Custom Quote Print");
  const [phrase, setPhrase] = useState(defaultPreset?.phrase ?? "Your words here.");
  const [size, setSize] = useState<PrintSize>("8x10");
  const [style, setStyle] = useState<PrintStyle>("Serif");
  const [tone, setTone] = useState<ToneId>("petal");
  const href = proofHref({ email: contactEmail, phrase, title, size, style, tone, reference: selected });

  function selectPreset(preset: Preset) {
    setSelectedSlug(preset.slug);
    setTitle(preset.title);
    setPhrase(preset.phrase);
    const firstSize = preset.sizes.map(compactSize).find((presetSize) => sizeOptions.includes(presetSize as PrintSize));
    if (firstSize) setSize(firstSize as PrintSize);
    setStyle("Serif");
    setTone(preset.slug === "custom-quote-print" ? "petal" : tone);
  }

  return (
    <div id="print-shop-studio" className="mt-12 scroll-mt-36 grid gap-px bg-graphite lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
      <div className="bg-void p-5 md:p-7">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-petal">
              Choose a Starting Proof
            </p>
            <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">
              Tap a mockup, rewrite the words, and keep the proof system intact.
            </p>
          </div>
          <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.22em] text-iron">
            Built from the customizer
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px bg-graphite">
          {presets.map((preset) => {
            const active = preset.slug === selectedSlug;
            return (
              <button
                key={preset.slug}
                type="button"
                onClick={() => selectPreset(preset)}
                className={`group bg-obsidian p-3 text-left transition duration-300 hover:bg-carbon ${
                  active ? "outline outline-1 outline-petal" : ""
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {preset.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preset.cover}
                    alt={`${preset.title} print proof`}
                    width={1600}
                    height={2560}
                    className="aspect-[5/8] w-full border border-graphite/70 object-cover opacity-90 transition duration-300 group-hover:opacity-100"
                  />
                )}
                <p className="mt-3 min-h-[2.5rem] font-display text-lg uppercase leading-tight tracking-[0.02em] text-pearl">
                  {preset.title}
                </p>
                <p className="line-clamp-2 font-body text-[0.72rem] font-light leading-5 text-smoke">
                  {preset.phrase}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-carbon p-6 md:p-8">
        <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-petal">
          Customize Your Own
        </p>
        <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">
          Your line, made printable.
        </h3>
        <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">
          Edit the proof directly. The preview uses the same Bebas Neue, Playfair Display, DM Sans, petal, and carbon system as the site.
        </p>

        <div className="mt-7 grid place-items-center bg-void p-4 md:p-6">
          <MockupPreview title={title} phrase={phrase} source={selected?.source ?? "Custom proof builder"} size={size} style={style} tone={tone} />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash" htmlFor="print-shop-title">
            Print Title
            <input
              id="print-shop-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={34}
              className="mt-2 w-full border border-graphite bg-void px-4 py-3 font-body text-sm font-light normal-case tracking-normal text-pearl outline-none transition focus:border-petal"
            />
          </label>

          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash">Size</p>
            <div className="mt-2 grid grid-cols-2 gap-px bg-graphite">
              {sizeOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  className={`bg-void px-3 py-3 font-body text-[0.62rem] font-bold uppercase tracking-[0.16em] transition hover:bg-obsidian ${
                    size === option ? "text-petal" : "text-ash"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="mt-5 block font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash" htmlFor="print-shop-phrase">
          Phrase
          <textarea
            id="print-shop-phrase"
            value={phrase}
            onChange={(event) => setPhrase(event.target.value)}
            maxLength={120}
            rows={3}
            className="mt-2 w-full border border-graphite bg-void px-4 py-3 font-body text-sm font-light normal-case tracking-normal leading-6 text-pearl outline-none transition focus:border-petal"
          />
        </label>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash">Quote Font</p>
            <div className="mt-3 grid grid-cols-2 gap-px bg-graphite">
              {styleOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStyle(option)}
                  className={`bg-void px-3 py-3 font-body text-[0.62rem] font-bold uppercase tracking-[0.16em] transition hover:bg-obsidian ${
                    style === option ? "text-petal" : "text-ash"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash">Tone</p>
            <div className="mt-3 grid grid-cols-4 gap-px bg-graphite">
              {toneOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setTone(option.id)}
                  className={`flex min-h-14 flex-col items-center justify-center gap-2 bg-void px-2 py-2 font-body text-[0.54rem] font-bold uppercase tracking-[0.12em] transition hover:bg-obsidian ${
                    tone === option.id ? "text-petal" : "text-ash"
                  }`}
                >
                  <span className="h-4 w-4 border border-white/20" style={{ background: option.swatch }} />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <a
          href={href}
          className="btn-primary mt-7 flex w-full items-center justify-center px-5 py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.18em] text-void"
        >
          Request Proof
        </a>
      </div>
    </div>
  );
}
