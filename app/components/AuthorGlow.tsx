"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type Props = {
  /** Diameter in px (the photo + ring). */
  size?: number;
  /** Ring thickness in px. */
  ring?: number;
  href?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Round author portrait with an animated, glowing gradient ring and a ♡ badge.
 * Tilts toward the cursor (interactive). Degrades gracefully with
 * prefers-reduced-motion. Round corners are forced via .ag-* classes because
 * the global reset sets `border-radius: 0 !important`.
 */
export default function AuthorGlow({
  size = 128,
  ring = 4,
  href = "/about",
  priority = false,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 18, ry: px * 18 });
  };
  const reset = () => setTilt({ rx: 0, ry: 0 });

  const heart = Math.round(size * 0.32);

  return (
    <Link
      href={href}
      aria-label="About MK Parrish"
      className={`group relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size, perspective: 620 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <div
        ref={ref}
        className="ag-ring relative h-full w-full transition-transform duration-200 will-change-transform"
        style={{ padding: ring, transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <div className="ag-round relative h-full w-full overflow-hidden bg-void">
          <Image
            src="/author/mk-parrish.jpg"
            alt="MK Parrish"
            fill
            priority={priority}
            sizes={`${size}px`}
            className="ag-round object-cover object-[center_22%] transition-transform duration-500 group-hover:scale-[1.06]"
          />
          <span className="ag-round pointer-events-none absolute inset-0 bg-gradient-to-t from-void/35 via-transparent to-transparent" />
        </div>
      </div>

      {/* ♡ badge */}
      <span
        className="ag-heart ag-round absolute -bottom-1 -right-1 z-10 flex items-center justify-center bg-void"
        style={{ width: heart, height: heart, boxShadow: "0 0 14px rgba(242,175,198,0.6)" }}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" fill="#F2AFC6" style={{ width: "60%", height: "60%" }}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </span>
    </Link>
  );
}
