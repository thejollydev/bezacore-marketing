import { type ReactNode } from "react";

// Small uppercase label that sits above a heading ("Currently building",
// "Contact", etc.). Uses the warm spine (fire) as its accent.
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-medium uppercase tracking-[0.2em] text-fire">
      {children}
    </span>
  );
}
