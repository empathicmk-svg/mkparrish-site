"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type NeonDesign = {
  slug: string;
  phrase: string;
  subtitle: string;
  category: string;
  style?: "display" | "script";
  format: string;
  width: number;
  height: number;
  image: string;
};

const glowOptions = [
  { id: "pink", label: "Pink", color: "#ff5cac", text: "text-[#ffd7ed]", glow: "0 0 12px #ff5cac, 0 0 34px #ff2f99" },
  { id: "white", label: "White", color: "#fff7fb", text: "text-white", glow: "0 0 12px #fff7fb, 0 0 30px #f2afc6" },
  { id: "gray", label: "Gray", color: "#b8bbc4", text: "text-[#e5e7ec]", glow: "0 0 10px #b8bbc4, 0 0 28px #737782" },
  { id: "mixed", label: "Mixed", color: "#ffd7ed", text: "text-[#ffd7ed]", glow: "0 0 12px #fff7fb, 0 0 28px #ff5cac, 0 0 48px #737782" },
] as const;

const sizeOptions = ["Mini", "Classic", "Statement"] as const;
const styleOptions = ["Serif", "Block"] as const;

type GlowId = (typeof glowOptions)[number]["id"];
type NeonSize = (typeof sizeOptions)[number];
type NeonStyle = (typeof styleOptions)[number];

function normalizePhrase(value: string) {
  return value.trim().replace(/\s+/g, " ") || "Your words here";
}

function mailtoHref({
  email,
  phrase,
  glow,
  size,
  style,
  selected,
}: {
  email: string;
  phrase: string;
  glow: GlowId;
  size: NeonSize;
  style: NeonStyle;
  selected?: NeonDesign;
}) {
  const subject = "Custom neon wall art proof request";
  const body = [
    "Hi MK,",
    "",
    "I want a custom neon wall art proof.",
    "",
    `Phrase: ${normalizePhrase(phrase)}`,
    `Glow: ${glow}`,
    `Size: ${size}`,
    `Style: ${style}`,
    selected ? `Reference mockup: ${selected.phrase}` : "",
    "",
    "Please send the next steps.",
  ].filter(Boolean).join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function splitPreviewPhrase(phrase: string) {
  const words = normalizePhrase(phrase).split(" ");
  const lines = words.reduce<string[]>((acc, word) => {
    const current = acc[acc.length - 1] ?? "";
    if (`${current} ${word}`.trim().length > 17) acc.push(word);
    else acc[acc.length - 1] = `${current} ${word}`.trim();
    return acc;
  }, [""]);

  return lines.slice(0, 5);
}

export function NeonWallArtStudio({
  designs,
  contactEmail,
}: {
  designs: readonly NeonDesign[];
  contactEmail: string;
}) {
  const quoteDesigns = useMemo(
    () => designs.filter((design) => design.category === "quote").slice(0, 10),
    [designs],
  );
  const [selectedSlug, setSelectedSlug] = useState(quoteDesigns[0]?.slug ?? "");
  const [phrase, setPhrase] = useState("Your words here");
  const [glow, setGlow] = useState<GlowId>("pink");
  const [size, setSize] = useState<NeonSize>("Classic");
  const [style, setStyle] = useState<NeonStyle>("Serif");

  const selected = quoteDesigns.find((design) => design.slug === selectedSlug) ?? quoteDesigns[0];
  const activeGlow = glowOptions.find((option) => option.id === glow) ?? glowOptions[0];
  const previewLines = splitPreviewPhrase(phrase);
  const orderHref = mailtoHref({ email: contactEmail, phrase, glow, size, style, selected });

  return (
    <div className="mt-12 grid gap-px bg-graphite lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
      <div className="bg-void p-5 md:p-7">
        <div className="grid grid-cols-2 gap-px bg-graphite md:grid-cols-3 xl:grid-cols-5">
          {quoteDesigns.map((design) => {
            const active = design.slug === selectedSlug;
            return (
              <button
                key={design.slug}
                type="button"
                onClick={() => {
                  setSelectedSlug(design.slug);
                  setPhrase(design.phrase);
                  setStyle(design.style === "display" ? "Block" : "Serif");
                }}
                className={`group bg-obsidian p-3 text-left transition duration-300 hover:bg-carbon ${
                  active ? "outline outline-1 outline-petal" : ""
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <Image
                  src={design.image}
                  alt={`${design.phrase} neon wall art mockup`}
                  width={design.width}
                  height={design.height}
                  sizes="(min-width: 1280px) 13vw, (min-width: 768px) 28vw, 45vw"
                  className="aspect-square w-full object-cover opacity-90 transition duration-300 group-hover:opacity-100"
                />
                <p className="mt-3 line-clamp-2 min-h-[2.75rem] font-body text-xs font-light leading-5 text-smoke">
                  {design.phrase}
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

        <div className="mt-6 border border-graphite bg-void p-5">
          <div className="grid min-h-[360px] place-items-center border border-graphite/70 bg-[radial-gradient(circle_at_center,rgba(255,92,172,0.16),transparent_58%)] p-5 text-center">
            <div>
              <div
                className={`mx-auto max-w-[18ch] ${activeGlow.text} ${
                  style === "Serif" ? "font-serif italic" : "font-display uppercase tracking-[0.04em]"
                }`}
                style={{
                  textShadow: activeGlow.glow,
                  fontSize: style === "Serif" ? "2.75rem" : "3.25rem",
                  lineHeight: style === "Serif" ? 1.05 : 0.9,
                }}
              >
                {previewLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </div>
              <div className="mx-auto mt-10 h-px w-40 bg-petal shadow-[0_0_18px_rgba(255,92,172,0.9)]" />
              <p className="mt-5 font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash">
                {size} · {activeGlow.label} · {style}
              </p>
            </div>
          </div>
        </div>

        <label className="mt-6 block font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash" htmlFor="neon-phrase">
          Phrase
        </label>
        <textarea
          id="neon-phrase"
          value={phrase}
          onChange={(event) => setPhrase(event.target.value)}
          maxLength={90}
          rows={3}
          className="mt-2 w-full border border-graphite bg-void px-4 py-3 font-body text-sm font-light leading-6 text-pearl outline-none transition focus:border-petal"
        />

        <div className="mt-6">
          <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash">Glow</p>
          <div className="mt-3 grid grid-cols-4 gap-px bg-graphite">
            {glowOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setGlow(option.id)}
                className={`flex min-h-16 flex-col items-center justify-center gap-2 bg-void px-2 py-3 font-body text-[0.62rem] font-bold uppercase tracking-[0.16em] transition hover:bg-obsidian ${
                  glow === option.id ? "text-petal" : "text-ash"
                }`}
              >
                <span
                  className="h-4 w-4 border border-white/20"
                  style={{ background: option.color, boxShadow: `0 0 18px ${option.color}` }}
                />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash">Size</p>
            <div className="mt-3 grid grid-cols-3 gap-px bg-graphite">
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

          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash">Style</p>
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
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a
            href={orderHref}
            className="btn-primary flex items-center justify-center px-5 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
          >
            Request Proof
          </a>
          <a
            href="/neon-wall-art/contact-sheet.jpg"
            className="flex items-center justify-center border border-graphite px-5 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal/60 hover:text-petal"
          >
            View Sheet
          </a>
        </div>
      </div>
    </div>
  );
}
