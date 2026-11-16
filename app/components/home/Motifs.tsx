import type { CSSProperties } from "react";

/* Thin-line neon motifs: a heart, a cross and an anchor. Decorative only (aria-hidden). */

type MotifProps = { size?: number; className?: string; style?: CSSProperties };

export function NeonHeart({ size = 28, className = "", style }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={`mk-motif mk-motif-pink ${className}`} style={style} aria-hidden="true">
      <path
        d="M12 20.6 10.8 19.5C6.1 15.3 3 12.5 3 9.1 3 6.3 5.2 4.2 7.9 4.2c1.6 0 3.1.7 4.1 1.9 1-1.2 2.5-1.9 4.1-1.9 2.7 0 4.9 2.1 4.9 4.9 0 3.4-3.1 6.2-7.8 10.4L12 20.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A thin white outline heart, for the linked chains that run down the page edges. */
export function WhiteHeart({ size = 14, className = "" }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={`mk-motif mk-motif-white ${className}`} aria-hidden="true">
      <path
        d="M12 20.6 10.8 19.5C6.1 15.3 3 12.5 3 9.1 3 6.3 5.2 4.2 7.9 4.2c1.6 0 3.1.7 4.1 1.9 1-1.2 2.5-1.9 4.1-1.9 2.7 0 4.9 2.1 4.9 4.9 0 3.4-3.1 6.2-7.8 10.4L12 20.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * A column of thin white hearts joined by hairlines, fixed to one edge of the viewport
 * so it runs down the page as you scroll. Desktop only; decorative.
 */
export function HeartChain({ side = "left", hearts = 7 }: { side?: "left" | "right"; hearts?: number }) {
  return (
    <div
      aria-hidden="true"
      className={`mk-chain pointer-events-none fixed inset-y-0 z-[5] hidden flex-col items-center py-24 md:flex ${
        side === "left" ? "left-2 lg:left-5" : "right-2 lg:right-5"
      }`}
    >
      {Array.from({ length: hearts }, (_, i) => (
        <div key={i} className="flex flex-1 flex-col items-center">
          <WhiteHeart size={13} />
          {i < hearts - 1 && <span className="mk-chain-link mt-1.5 w-px flex-1" />}
        </div>
      ))}
    </div>
  );
}

export function ThinCross({ size = 28, className = "", style }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={`mk-motif mk-motif-white ${className}`} style={style} aria-hidden="true">
      <path d="M12 2.5v19M6.5 8h11" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}

export function Anchor({ size = 28, className = "", style }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={`mk-motif mk-motif-white ${className}`} style={style} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="4.6" r="1.9" />
        <path d="M12 6.5v14.2M8.2 10h7.6" />
        <path d="M4.2 13.6c.4 4 3.7 7.1 7.8 7.1s7.4-3.1 7.8-7.1" />
        <path d="M2.9 15.1l1.3-1.6 1.7 1.2M21.1 15.1l-1.3-1.6-1.7 1.2" />
      </g>
    </svg>
  );
}

const SHAPES = { heart: NeonHeart, cross: ThinCross, anchor: Anchor } as const;
type Kind = keyof typeof SHAPES;

/** A row ornament: cross · heart · anchor, with hairlines either side. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`mk-ornament ${className}`} aria-hidden="true">
      <span className="mk-ornament-line" />
      <ThinCross size={22} />
      <NeonHeart size={22} className="mk-flicker" />
      <Anchor size={22} />
      <span className="mk-ornament-line mk-ornament-line-r" />
    </div>
  );
}

/**
 * Floating motifs scattered across a section. Positions are in percent of the section.
 * Hidden on small screens where they would crowd the text.
 */
export function MotifField({
  items,
}: {
  items: { kind: Kind; x: number; y: number; size?: number; delay?: number; pink?: boolean }[];
}) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block" aria-hidden="true">
      {items.map((m, i) => {
        const Shape = SHAPES[m.kind];
        return (
          <span
            key={i}
            className="mk-float absolute"
            style={{ left: `${m.x}%`, top: `${m.y}%`, "--mk-delay": `${m.delay ?? i * 0.7}s` } as CSSProperties}
          >
            <Shape size={m.size ?? 30} className={m.pink ? "mk-motif-pink mk-flicker" : ""} />
          </span>
        );
      })}
    </div>
  );
}
