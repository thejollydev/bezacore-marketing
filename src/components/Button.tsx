import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary";

// Shared CTA primitive. The cobalt signature lives HERE — both on hover and on
// keyboard focus — so "cobalt once per surface, as the interactive accent" is
// enforced by the component, not by remembering. The trailing arrow nudges
// right on hover (a small, restrained micro-interaction).
const base =
  "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

const variants: Record<Variant, string> = {
  primary:
    "bg-linear-to-r from-gold to-fire text-ink hover:ring-2 hover:ring-cobalt hover:ring-offset-2 hover:ring-offset-ink",
  secondary:
    "border border-paper/20 text-paper hover:border-paper/40 hover:bg-paper/5",
};

export function CTALink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}
