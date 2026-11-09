'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import FlowLines from "./FlowLines";
import { drawFlowLines } from "./flowLines";
import { EVENT, PASS, leadPerk } from "./campaign";

// The site's global .font-serif is bold; the pass uses regular Playfair italic.
const SERIF = { fontWeight: 400 } as const;

type Props = {
  holder?: string;
  code?: string;
  /** Show the scratch-off foil over the pass until the holder scratches it away. */
  scratch?: boolean;
  onRevealed?: () => void;
};

const PINK = "#FFB5D0";

/** The Competition Builder Pass card: MK Parrish black, a fine pink frame and flow lines. */
export default function BuilderPass({ holder, code, scratch = false, onRevealed }: Props) {
  const locked = !holder || !code;
  return (
    <div className="relative mx-auto w-full max-w-[440px] select-none" style={{ aspectRatio: "1.586" }}>
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl border border-petal/50 bg-void"
        style={{ boxShadow: "0 0 50px rgba(242,175,198,0.18), inset 0 0 0 1px rgba(255,255,255,0.04)" }}
      >
        <FlowLines className="absolute inset-0 h-full w-full" focusY={0.7} count={22} alpha={0.5} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(255,181,208,0.16),transparent_60%)]" />
        <div className="relative flex h-full flex-col justify-between p-[6%]">
          <div className="flex items-start justify-between">
            <div className="font-display text-[clamp(1rem,4.6vw,1.35rem)] uppercase leading-none tracking-[0.12em] text-pearl">MK Parrish</div>
            <div className="text-right font-body text-[0.55rem] font-semibold uppercase leading-[1.5] tracking-[0.22em] text-petal">
              LIBI · {EVENT.dateShort}
              <br />
              <span className="text-ash">Valid thru {PASS.validShort}</span>
            </div>
          </div>
          <div>
            <div className="font-body text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-ash">Competition Automotive Group</div>
            <div
              className="font-display uppercase leading-[0.9] text-petal"
              style={{ fontSize: "clamp(1.9rem, 9.5vw, 2.75rem)", textShadow: "0 0 26px rgba(242,175,198,0.45)" }}
            >
              Builder Pass
            </div>
            {PASS.bonus && <div className="mt-1 font-serif text-sm italic text-pearl" style={SERIF}>{PASS.bonus}</div>}
          </div>
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="font-body text-[0.5rem] font-semibold uppercase tracking-[0.28em] text-ash">Pass holder</div>
              <div className="truncate font-serif text-[clamp(0.95rem,4.2vw,1.2rem)] italic text-pearl" style={SERIF}>{locked ? "Your name here" : holder}</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="font-body text-[0.5rem] font-semibold uppercase tracking-[0.28em] text-ash">Pass №</div>
              <div className="font-display text-[clamp(1.2rem,5.6vw,1.6rem)] leading-none tracking-[0.08em] text-pearl">{locked ? "• • • •" : code}</div>
            </div>
          </div>
        </div>
      </div>
      {scratch && !locked && <ScratchFoil onRevealed={onRevealed} />}
    </div>
  );
}

/** A pink foil layer drawn on a canvas. Finger or mouse strokes erase it; past ~40% it dissolves. */
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
    foil.addColorStop(0, "#F58CAD");
    foil.addColorStop(0.35, "#FFE0EC");
    foil.addColorStop(0.55, "#FFB5D0");
    foil.addColorStop(0.8, "#FAFAF8");
    foil.addColorStop(1, "#F58CAD");
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
    ctx.fillStyle = "#080808";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const draw = () => {
      ctx.font = `${Math.round(w * 0.09)}px "Bebas Neue", Impact, sans-serif`;
      ctx.fillText("SCRATCH TO REVEAL", w / 2, h / 2 - w * 0.035);
      ctx.font = `600 ${Math.round(w * 0.028)}px "DM Sans", sans-serif`;
      ctx.fillText("YOUR BUILDER PASS", w / 2, h / 2 + w * 0.045);
    };
    document.fonts.load('40px "Bebas Neue"').then(draw, draw);
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
  await Promise.all([
    document.fonts.load('80px "Bebas Neue"'),
    document.fonts.load('italic 40px "Playfair Display"'),
    document.fonts.load('600 20px "DM Sans"'),
  ]).catch(() => undefined);
  const W = 1200;
  const H = 756;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#080808";
  ctx.fillRect(0, 0, W, H);
  drawFlowLines(ctx, W, H, 2, { focusY: 0.7, count: 30, alpha: 0.5, lineWidth: 2 });
  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = "#080808";
  ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = "source-over";
  const glow = ctx.createRadialGradient(W * 0.85, 0, 0, W * 0.85, 0, W * 0.6);
  glow.addColorStop(0, "rgba(255,181,208,0.18)");
  glow.addColorStop(1, "rgba(255,181,208,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(255,181,208,0.5)";
  ctx.lineWidth = 2;
  ctx.strokeRect(24, 24, W - 48, H - 48);

  const P = 72;
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#F0F0EE";
  ctx.font = '56px "Bebas Neue", Impact, sans-serif';
  ctx.letterSpacing = "8px";
  ctx.fillText("MK PARRISH", P, P + 48);
  ctx.textAlign = "right";
  ctx.font = '600 20px "DM Sans", sans-serif';
  ctx.letterSpacing = "5px";
  ctx.fillStyle = PINK;
  ctx.fillText(`LIBI · ${EVENT.dateShort.toUpperCase()}`, W - P, P + 22);
  ctx.fillStyle = "#7A7A7A";
  ctx.fillText(`VALID THRU ${PASS.validShort.toUpperCase()}`, W - P, P + 52);

  ctx.textAlign = "left";
  ctx.fillStyle = "#7A7A7A";
  ctx.fillText("COMPETITION AUTOMOTIVE GROUP", P, 360);
  ctx.letterSpacing = "2px";
  ctx.fillStyle = PINK;
  ctx.shadowColor = "rgba(242,175,198,0.6)";
  ctx.shadowBlur = 40;
  ctx.font = '150px "Bebas Neue", Impact, sans-serif';
  ctx.fillText("BUILDER PASS", P - 4, 500);
  ctx.shadowBlur = 0;
  const perk = leadPerk().title;
  ctx.font = 'italic 34px "Playfair Display", Georgia, serif';
  ctx.fillStyle = "#F0F0EE";
  ctx.letterSpacing = "0px";
  ctx.fillText(`${perk} · +$500 Sprinter · Mercedes weekend drawing`, P, 556);

  ctx.fillStyle = "#7A7A7A";
  ctx.font = '600 18px "DM Sans", sans-serif';
  ctx.letterSpacing = "5px";
  ctx.fillText("PASS HOLDER", P, H - 130);
  ctx.textAlign = "right";
  ctx.fillText("PASS №", W - P, H - 130);
  ctx.textAlign = "left";
  ctx.letterSpacing = "0px";
  ctx.fillStyle = "#F0F0EE";
  ctx.font = 'italic 46px "Playfair Display", Georgia, serif';
  ctx.fillText(holder, P, H - 76);
  ctx.textAlign = "right";
  ctx.font = '72px "Bebas Neue", Impact, sans-serif';
  ctx.letterSpacing = "6px";
  ctx.fillText(code, W - P, H - 74);

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
