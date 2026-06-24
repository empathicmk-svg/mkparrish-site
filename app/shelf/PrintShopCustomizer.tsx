"use client";

import { useMemo, useState } from "react";

const sizeOptions = ["5x7", "8x10", "11x14", "16x20"] as const;
const styleOptions = ["Serif", "Display"] as const;
const toneOptions = [
  { id: "petal", label: "Petal", swatch: "#f2afc6", text: "text-petal", wash: "rgba(242,175,198,0.16)" },
  { id: "pearl", label: "Pearl", swatch: "#fff7fb", text: "text-pearl", wash: "rgba(255,247,251,0.12)" },
  { id: "smoke", label: "Smoke", swatch: "#b8bbc4", text: "text-smoke", wash: "rgba(184,187,196,0.12)" },
  { id: "ink", label: "Ink", swatch: "#07070a", text: "text-pearl", wash: "rgba(7,7,10,0.42)" },
] as const;

type PrintSize = (typeof sizeOptions)[number];
type PrintStyle = (typeof styleOptions)[number];
type ToneId = (typeof toneOptions)[number]["id"];

function normalizePhrase(value: string) {
  return value.trim().replace(/\s+/g, " ") || "Your words here.";
}

function splitPreviewPhrase(phrase: string) {
  const words = normalizePhrase(phrase).split(" ");
  return words.reduce<string[]>((lines, word) => {
    const current = lines[lines.length - 1] ?? "";
    if (`${current} ${word}`.trim().length > 18) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`.trim();
    return lines;
  }, [""]).slice(0, 6);
}

function proofHref({
  email,
  phrase,
  size,
  style,
  tone,
}: {
  email: string;
  phrase: string;
  size: PrintSize;
  style: PrintStyle;
  tone: ToneId;
}) {
  const subject = "Custom Print Shop proof request";
  const body = [
    "Hi MK,",
    "",
    "I want a custom Print Shop proof.",
    "",
    `Phrase: ${normalizePhrase(phrase)}`,
    `Size: ${size}`,
    `Style: ${style}`,
    `Color direction: ${tone}`,
    "",
    "Please send the next steps.",
  ].join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function PrintShopCustomizer({ contactEmail }: { contactEmail: string }) {
  const [phrase, setPhrase] = useState("Your words here.");
  const [size, setSize] = useState<PrintSize>("8x10");
  const [style, setStyle] = useState<PrintStyle>("Serif");
  const [tone, setTone] = useState<ToneId>("petal");

  const activeTone = toneOptions.find((option) => option.id === tone) ?? toneOptions[0];
  const previewLines = useMemo(() => splitPreviewPhrase(phrase), [phrase]);
  const href = proofHref({ email: contactEmail, phrase, size, style, tone });

  return (
    <div className="mt-12 grid gap-px bg-graphite lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="bg-carbon p-6 md:p-8">
        <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-petal">
          Custom Proof Builder
        </p>
        <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">
          Your line, made printable.
        </h3>
        <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">
          Write the sentence, pick the size and direction, and send it to MK for a proof before it becomes a physical print.
        </p>

        <label className="mt-7 block font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash" htmlFor="print-shop-phrase">
          Phrase
        </label>
        <textarea
          id="print-shop-phrase"
          value={phrase}
          onChange={(event) => setPhrase(event.target.value)}
          maxLength={110}
          rows={4}
          className="mt-2 w-full border border-graphite bg-void px-4 py-3 font-body text-sm font-light leading-6 text-pearl outline-none transition focus:border-petal"
        />

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash">Size</p>
            <div className="mt-3 grid grid-cols-2 gap-px bg-graphite">
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

        <div className="mt-6">
          <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash">Tone</p>
          <div className="mt-3 grid grid-cols-4 gap-px bg-graphite">
            {toneOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setTone(option.id)}
                className={`flex min-h-16 flex-col items-center justify-center gap-2 bg-void px-2 py-3 font-body text-[0.58rem] font-bold uppercase tracking-[0.14em] transition hover:bg-obsidian ${
                  tone === option.id ? "text-petal" : "text-ash"
                }`}
              >
                <span className="h-4 w-4 border border-white/20" style={{ background: option.swatch }} />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <a
          href={href}
          className="btn-primary mt-7 flex w-full items-center justify-center px-5 py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.18em] text-void"
        >
          Request Proof
        </a>
      </div>

      <div className="grid place-items-center bg-void p-6 md:p-8">
        <div className="w-full max-w-[430px] border border-graphite/80 bg-obsidian p-4 shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
          <div
            className="grid aspect-[5/8] place-items-center border border-graphite/70 p-8 text-center"
            style={{
              background: `radial-gradient(circle at 50% 42%, ${activeTone.wash}, transparent 56%), #0b0b0f`,
            }}
          >
            <div>
              <div
                className={`${activeTone.text} ${
                  style === "Serif" ? "font-serif italic" : "font-display uppercase tracking-[0.05em]"
                }`}
                style={{
                  fontSize: style === "Serif" ? "clamp(2.15rem, 8vw, 4.2rem)" : "clamp(2.4rem, 9vw, 4.8rem)",
                  lineHeight: style === "Serif" ? 1.05 : 0.86,
                  textShadow: tone === "ink" ? "none" : "0 0 28px rgba(242,175,198,0.24)",
                }}
              >
                {previewLines.map((line, index) => (
                  <span key={`${line}-${index}`} className="block">
                    {line}
                  </span>
                ))}
              </div>
              <div className="mx-auto mt-8 h-px w-24 bg-petal/70" />
              <p className="mt-5 font-body text-[0.62rem] font-bold uppercase tracking-[0.22em] text-ash">
                {size} / {style} / {activeTone.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
