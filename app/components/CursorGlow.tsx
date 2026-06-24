"use client";

import { useEffect, useRef } from "react";

const interactiveSelector = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "summary",
  "label",
  "[role='button']",
  "[role='link']",
  "[tabindex]:not([tabindex='-1'])",
  "[data-cursor]",
  ".btn-primary",
  ".btn-ghost",
  ".btn-text",
  ".card",
].join(",");

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -200, y: -200 });
  const smooth  = useRef({ x: -200, y: -200 });
  const scale   = useRef(0.8);
  const targetScale = useRef(0.8);
  const opacity = useRef(0);
  const targetOpacity = useRef(0);
  const raf     = useRef<number>(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return undefined;

    document.documentElement.classList.add("has-custom-cursor");

    const setInteractiveState = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      targetScale.current = element?.closest(interactiveSelector) ? 1.95 : 1;
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } =
        "touches" in e ? e.touches[0] : e;
      pos.current = { x: clientX, y: clientY };
      targetOpacity.current = 1;
      setInteractiveState(e.target);
    };

    const onPointerOver = (e: PointerEvent) => {
      setInteractiveState(e.target);
    };

    const onPointerOut = (e: PointerEvent) => {
      setInteractiveState(e.relatedTarget);
    };

    const onLeave = () => {
      targetOpacity.current = 0;
    };

    const tick = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.07;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.07;
      scale.current += (targetScale.current - scale.current) * 0.18;
      opacity.current += (targetOpacity.current - opacity.current) * 0.16;

      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${smooth.current.x}px, ${smooth.current.y}px) scale(${1 + (scale.current - 1) * 0.34})`;
        glowRef.current.style.opacity = `${opacity.current * (targetScale.current > 1 ? 0.98 : 0.72)}`;
      }
      if (heartRef.current) {
        heartRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${scale.current})`;
        heartRef.current.style.opacity = `${opacity.current}`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("mouseleave", onLeave);
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
          opacity: 0,
        }}
      />
      {/* Heart cursor that blooms over interactive surfaces */}
      <div
        ref={heartRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 26,
          height: 26,
          backgroundImage: "url('/cursor-heart.svg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          filter:
            "drop-shadow(0 0 10px rgba(242,175,198,0.95)) drop-shadow(0 0 24px rgba(199,91,120,0.55))",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          opacity: 0,
        }}
      />
    </>
  );
}
