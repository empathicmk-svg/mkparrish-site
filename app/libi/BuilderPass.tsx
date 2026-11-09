'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import FlowLines from "./FlowLines";
import { drawFlowLines } from "./flowLines";
import { EVENT, PASS, leadPerk } from "./campaign";

type Props = {
  holder?: string;
  code?: string;
  /** Show the scratch-off foil over the pass until the holder scratches it away. */
  scratch?: boolean;
  onRevealed?: () => void;
};

/** Competition Automotive Group palette (matches the cag-* tokens in globals.css): the group's
 * header is black, with a white COMPETITION, steel-blue AUTOMOTIVE GROUP and a silver swoosh. */
export const CAG = {
  ink: "#0B0C0E",
  panel: "#15171A",
  charcoal: "#2A2D32",
  steel: "#7D96A8",
  silver: "#A9ADB1",
  silverRgb: "200,204,208",
};
const CARD_BG = `linear-gradient(135deg, ${CAG.charcoal} 0%, ${CAG.panel} 50%, ${CAG.ink} 100%)`;

/** The Competition wordmark set in type: white COMPETITION over steel-blue AUTOMOTIVE GROUP. */
export function CompetitionMark({ size = 1, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`font-cag leading-none ${className}`}>
      <div style={{ fontSize: `${1.05 * size}rem`, fontWeight: 500, letterSpacing: "0.07em", color: "#FFFFFF" }}>COMPETITION</div>
      <div style={{ fontSize: `${0.44 * size}rem`, fontWeight: 400, letterSpacing: "0.3em", marginTop: `${0.28 * size}rem`, color: CAG.steel }}>
        AUTOMOTIVE GROUP
      </div>
    </div>
  );
}

/** The Competition Builder Pass card: black member card, white type, silver flow lines. */
export default function BuilderPass({ holder, code, scratch = false, onRevealed }: Props) {
  const locked = !holder || !code;
  return (
    <div className="relative mx-auto w-full max-w-[440px] select-none" style={{ aspectRatio: "1.586" }}>
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl"
        style={{ background: CARD_BG, boxShadow: "0 18px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(169,173,177,0.35)" }}
      >
        <FlowLines className="absolute inset-0 h-full w-full" focusY={0.72} count={22} alpha={0.34} rgb={CAG.silverRgb} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_0%,rgba(125,150,168,0.22),transparent_55%)]" />
        <div className="relative flex h-full flex-col justify-between p-[6%] font-cag text-white">
          <div className="flex items-start justify-between gap-3">
            <CompetitionMark size={0.92} />
            <div className="text-right text-[0.5rem] font-semibold uppercase leading-[1.6] tracking-[0.22em] text-cag-accent">
              LIBI · {EVENT.dateShort}
              <br />
              Valid thru {PASS.validShort}
            </div>
          </div>
          <div>
            <div className="uppercase leading-none" style={{ fontSize: "clamp(1.45rem, 7.4vw, 2.05rem)", fontWeight: 600, letterSpacing: "0.12em" }}>
              Builder Pass
            </div>
            {PASS.bonus && <div className="mt-1 text-sm font-medium text-cag-accent">{PASS.bonus}</div>}
          </div>
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[0.48rem] font-semibold uppercase tracking-[0.28em] text-cag-silver">Pass holder</div>
              <div className="truncate text-[clamp(0.85rem,3.9vw,1.05rem)] font-medium tracking-[0.04em]">{locked ? "Your name here" : holder}</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[0.48rem] font-semibold uppercase tracking-[0.28em] text-cag-silver">Pass №</div>
              <div className="text-[clamp(1rem,4.8vw,1.35rem)] font-semibold leading-tight tracking-[0.14em]">{locked ? "• • • •" : code}</div>
            </div>
          </div>
        </div>
      </div>
      {scratch && !locked && <ScratchFoil onRevealed={onRevealed} />}
    </div>
  );
}

/** A brushed-silver foil layer drawn on a canvas. Finger or mouse strokes erase it; past ~40% it dissolves. */
function ScratchFoil({ onRevealed }: { onRevealed?: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const strokes = useRef(0);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.clientWidth;
    const h = c.clientHeight;
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    ctx.scale(dpr, dpr);

    const foil = ctx.createLinearGradient(0, 0, w, h);
    foil.addColorStop(0, "#AEB8B3");
    foil.addColorStop(0.3, "#EEF2F0");
    foil.addColorStop(0.52, "#C3CDC8");
    foil.addColorStop(0.75, "#F7F9F8");
    foil.addColorStop(1, "#9FAAA4");
    ctx.fillStyle = foil;
    ctx.fillRect(0, 0, w, h);
    // Fine diagonal sheen so it reads as foil, not a flat block.
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 1;
    for (let x = -h; x < w; x += 7) {
      ctx.beginPath();
      ctx.moveTo(x, h);
      ctx.lineTo(x + h, 0);
      ctx.stroke();
    }
    ctx.fillStyle = CAG.ink;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const draw = () => {
      ctx.font = `600 ${Math.round(w * 0.052)}px Montserrat, Arial, sans-serif`;
      ctx.letterSpacing = `${Math.round(w * 0.012)}px`;
      ctx.fillText("SCRATCH TO REVEAL", w / 2, h / 2 - w * 0.03);
      ctx.font = `500 ${Math.round(w * 0.026)}px Montserrat, Arial, sans-serif`;
      ctx.letterSpacing = `${Math.round(w * 0.01)}px`;
      ctx.fillText("YOUR COMPETITION BUILDER PASS", w / 2, h / 2 + w * 0.045);
    };
    document.fonts.load('600 40px Montserrat').then(draw, draw);
  }, []);

  const clearedRatio = () => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return 0;
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 16) {
      total++;
      if (data[i] === 0) clear++;
    }
    return clear / total;
  };

  const scratchAt = useCallback(
    (clientX: number, clientY: number) => {
      const c = ref.current;
      const ctx = c?.getContext("2d");
      if (!c || !ctx || fading) return;
      const r = c.getBoundingClientRect();
      const p = { x: clientX - r.left, y: clientY - r.top };
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "#000"; // Any opaque colour: destination-out erases by the stroke's alpha.
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = Math.max(34, r.width * 0.11);
      ctx.beginPath();
      ctx.moveTo((last.current ?? p).x, (last.current ?? p).y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last.current = p;
      if (++strokes.current % 5 === 0 && clearedRatio() > 0.4) {
        setFading(true);
        if (navigator.vibrate) navigator.vibrate(30);
        setTimeout(() => {
          setGone(true);
          onRevealed?.();
        }, 450);
      }
    },
    [fading, onRevealed],
  );

  if (gone) return null;
  return (
    <canvas
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label="Scratch to reveal your Builder Pass, or press Enter"
      className="absolute inset-0 h-full w-full cursor-pointer touch-none rounded-2xl transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1 }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        last.current = null;
        scratchAt(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (e.buttons || e.pointerType === "touch") scratchAt(e.clientX, e.clientY);
      }}
      onPointerUp={() => (last.current = null)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFading(true);
          setTimeout(() => {
            setGone(true);
            onRevealed?.();
          }, 450);
        }
      }}
    />
  );
}

/** Draws the pass as a 1200x756 PNG for the holder's camera roll. */
export async function savePassImage(holder: string, code: string) {
  await Promise.all(["300", "500", "600"].map((w) => document.fonts.load(`${w} 40px Montserrat`))).catch(() => undefined);
  const W = 1200;
  const H = 756;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  if (!ctx) return;
  const F = "Montserrat, Arial, sans-serif";

  drawFlowLines(ctx, W, H, 2, { focusY: 0.72, count: 30, alpha: 0.34, lineWidth: 2, rgb: CAG.silverRgb });
  ctx.globalCompositeOperation = "destination-over";
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, CAG.charcoal);
  bg.addColorStop(0.5, CAG.panel);
  bg.addColorStop(1, CAG.ink);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = "source-over";
  const glow = ctx.createRadialGradient(W * 0.9, 0, 0, W * 0.9, 0, W * 0.55);
  glow.addColorStop(0, "rgba(125,150,168,0.24)");
  glow.addColorStop(1, "rgba(125,150,168,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(169,173,177,0.45)";
  ctx.lineWidth = 2;
  ctx.strokeRect(24, 24, W - 48, H - 48);

  const P = 72;
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "alphabetic";
  ctx.font = `500 46px ${F}`;
  ctx.letterSpacing = "3px";
  ctx.fillText("COMPETITION", P, P + 44);
  ctx.fillStyle = CAG.steel;
  ctx.font = `400 18px ${F}`;
  ctx.letterSpacing = "6px";
  ctx.fillText("AUTOMOTIVE GROUP", P + 2, P + 78);
  ctx.textAlign = "right";
  ctx.font = `600 18px ${F}`;
  ctx.letterSpacing = "5px";
  ctx.fillText(`LIBI · ${EVENT.dateShort.toUpperCase()}`, W - P, P + 22);
  ctx.fillText(`VALID THRU ${PASS.validShort.toUpperCase()}`, W - P, P + 52);

  ctx.textAlign = "left";
  ctx.fillStyle = "#FFFFFF";
  ctx.font = `600 104px ${F}`;
  ctx.letterSpacing = "14px";
  ctx.fillText("BUILDER PASS", P - 2, 450);
  ctx.font = `500 26px ${F}`;
  ctx.letterSpacing = "2px";
  ctx.fillStyle = CAG.silver;
  ctx.fillText(`${leadPerk().title} · +$500 Sprinter · Mercedes weekend drawing`, P, 506);

  ctx.fillStyle = CAG.silver;
  ctx.font = `600 17px ${F}`;
  ctx.letterSpacing = "5px";
  ctx.fillText("PASS HOLDER", P, H - 130);
  ctx.textAlign = "right";
  ctx.fillText("PASS №", W - P, H - 130);
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.font = `500 42px ${F}`;
  ctx.letterSpacing = "2px";
  ctx.fillText(holder, P, H - 78);
  ctx.textAlign = "right";
  ctx.font = `600 56px ${F}`;
  ctx.letterSpacing = "8px";
  ctx.fillText(code, W - P, H - 76);

  const name = `builder-pass-${code}.png`;
  // On phones, the share sheet offers "Save Image" straight to Photos.
  const blob = await new Promise<Blob | null>((res) => c.toBlob(res, "image/png"));
  if (blob && typeof File !== "undefined") {
    const file = new File([blob], name, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "My Builder Pass" });
        return;
      } catch {
        /* cancelled or blocked: fall back to a download */
      }
    }
  }
  const url = c.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
