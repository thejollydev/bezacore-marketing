"use client";

import { useEffect, useRef, useState } from "react";

// Self-drawing line — strokes itself in (left→right) when scrolled into view.
// pathLength={1} normalizes the dash math regardless of width. Reduced-motion
// (and no-JS) shows the line already drawn.
export function DrawLine({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className={`draw-line${drawn ? " drawn" : ""} ${className}`}
      width="100%"
      height="3"
      viewBox="0 0 320 3"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="drawline" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-amber)" />
          <stop offset="1" stopColor="var(--color-azure)" />
        </linearGradient>
      </defs>
      <path
        pathLength={1}
        d="M0 1.5 H320"
        stroke="url(#drawline)"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}
