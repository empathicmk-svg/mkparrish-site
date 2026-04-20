"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -200, y: -200 });
  const smooth  = useRef({ x: -200, y: -200 });
  const raf     = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } =
        "touches" in e ? e.touches[0] : e;
      pos.current = { x: clientX, y: clientY };
    };

    const tick = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.07;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.07;

      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${smooth.current.x}px, ${smooth.current.y}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Soft radial glow that lags behind cursor */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "fixed",
          top: -300,
          left: -300,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(242,175,198,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9997,
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      />
      {/* Precise cursor dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(242,175,198,0.8)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "opacity 0.3s",
        }}
      />
    </>
  );
}
