"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Wraps a section so it "powers on" when scrolled into view: descendants with
// .power-head get the gradient + a neon flicker, .power-body fades up. Replaces
// generic reveals with characterful activation. Reduced-motion: on immediately.
type PowerVariant = "surge" | "cascade" | "charge" | "sweep";

export function PowerOnSection({
  children,
  variant = "surge",
  className = "",
}: {
  children: ReactNode;
  variant?: PowerVariant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setOn(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`power power--${variant}${on ? " powered" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
