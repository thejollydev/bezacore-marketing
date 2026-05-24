import { type ReactNode } from "react";
import { Container } from "./Container";
import { Kicker } from "./Kicker";

// Route title block: optional kicker + H1 + optional intro/framing line.
// Used by /about (title only), /intelligrace, and /contact (kicker + intro).
export function PageHeader({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-paper/10">
      <Container className="py-20 sm:py-28">
        {kicker ? <Kicker>{kicker}</Kicker> : null}
        <h1
          className={`${kicker ? "mt-4 " : ""}text-6xl font-semibold tracking-tight text-paper sm:text-7xl lg:text-8xl`}
        >
          {title}
        </h1>
        {children ? (
          <div className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">
            {children}
          </div>
        ) : null}
      </Container>
    </header>
  );
}
