import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";

// Single source of truth for the primary nav. Defined once, mapped over below
// AND reused by the Footer — change a route here and both update.
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/intelligrace", label: "Intelligrace" },
  { href: "/contact", label: "Contact" },
];

// Server component (no "use client") — it's static markup, ships zero JS.
export function Header() {
  return (
    <header className="relative z-10 border-b border-paper/10">
      <Container className="flex items-center justify-between gap-6 py-5">
        {/* next/link does client-side navigation between routes (no full
            page reload), the App Router equivalent of an <a> for internal links. */}
        <Link href="/" aria-label="BezaCore Labs — home" className="shrink-0">
          <Image
            src="/brand/bezacore-wordmark.png"
            alt="BezaCore Labs"
            width={160}
            height={40}
            priority
          />
        </Link>

        <nav className="flex items-center gap-5 text-sm sm:gap-7">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-paper/70 transition-colors hover:text-paper"
            >
              {label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
