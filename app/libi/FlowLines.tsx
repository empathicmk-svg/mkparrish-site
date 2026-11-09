'use client';

import { useEffect, useRef } from "react";
import { drawFlowLines } from "./flowLines";

type Props = {
  className?: string;
  origin?: "left" | "center";
  focusY?: number;
  count?: number;
  alpha?: number;
  /** Line colour as "r,g,b". */
  rgb?: string;
};

/** Animated flow lines on a canvas (white by default, for the Competition sage). Holds still for people who prefer reduced motion. */
export default function FlowLines({ className, origin = "left", focusY = 0.6, count = 28, alpha = 0.55, rgb = "255,255,255" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const frame = (ms: number) => {
      drawFlowLines(ctx, w, h, still ? 2 : ms / 1000, { origin, focusY, count, alpha, rgb });
      if (!still) raf = requestAnimationFrame(frame);
    };

    size();
    const ro = new ResizeObserver(() => {
      size();
      if (still) frame(0);
    });
    ro.observe(canvas);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [origin, focusY, count, alpha, rgb]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
