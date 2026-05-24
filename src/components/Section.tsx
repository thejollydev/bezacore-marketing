import { type ReactNode } from "react";
import { Container } from "./Container";

// Vertical-rhythm wrapper for page sections. `id` enables anchor links
// (e.g. /about#why-this-exists). Spacing lives here so every section is
// consistent and tunable in one place.
export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={className}>
      <Container className="py-16 sm:py-20">{children}</Container>
    </section>
  );
}
