import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { navLinks } from "./Header";

// Footer nav = the shared primary nav (imported from Header) plus the two
// legal stubs. Terms/Privacy 404 until Chunk D ships them — that's expected
// per the content spec, not a bug.
const footerLinks = [
  ...navLinks,
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    // mt-auto: with the body as a min-height flex column, this pins the footer
    // to the bottom even on short pages.
    <footer className="relative z-10 mt-auto border-t border-paper/10">
      <Container className="flex flex-col gap-8 py-12">
        <div className="flex flex-col gap-3">
          <Image
            src="/brand/bezacore-lockup.png"
            alt="BezaCore Labs"
            width={200}
            height={46}
          />
          <p className="text-sm text-paper/60">
            Software for the work that matters.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/60">
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors hover:text-paper"
            >
              {label}
            </Link>
          ))}
          {/* External link → plain <a> with target/rel (next/link is for
              in-app routes only). */}
          <a
            href="https://github.com/BezaCore-Labs"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-paper"
          >
            GitHub
          </a>
        </nav>

        <p className="text-xs text-paper/40">
          © 2026 BezaCore Labs LLC. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
