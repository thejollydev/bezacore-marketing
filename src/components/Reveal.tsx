"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Scroll reveal — fades + rises content in when it enters the viewport, once.
// "use client" because it uses IntersectionObserver. Reduced-motion users (and
// the no-JS path) get the content shown immediately via the CSS fallback.
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced-motion (and no-JS) users get the content shown immediately via
    // the CSS fallback in globals.css (`.reveal` forced visible under
    // prefers-reduced-motion), so no JS branch is needed here.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${shown ? " reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
