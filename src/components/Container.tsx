import { type ReactNode } from "react";

// First shared primitive. Centers content and sets the page gutter in ONE
// place — every page, the header, and the footer use this, so the site's max
// width and side padding are controlled here and nowhere else.
// `className` is appended so callers can add per-instance spacing (e.g. py-12).
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>
      {children}
    </div>
  );
}
