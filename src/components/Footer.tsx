import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { navLinks } from "@/lib/nav";

const linkClass = "text-sm text-paper/60 transition-colors hover:text-paper";

export function Footer() {
  return (
    // mt-auto pins the footer to the bottom on short pages (body is a min-h
    // flex column). overflow-hidden clips the mark watermark.
    <footer className="grain relative z-10 mt-auto overflow-hidden">
      {/* animated light edge — the hero's traveling-pulse language, as a seam */}
      <div className="beam-divider" />
      {/* same left-concentrated glow as the hero, so the brand sits in light */}
      <div className="hero-circuit-glow" aria-hidden="true" />

      {/* large, faint brand mark watermark */}
      <Image
        src="/brand/bezacore-mark.png"
        alt=""
        aria-hidden="true"
        width={512}
        height={512}
        className="pointer-events-none absolute -right-16 -bottom-12 h-auto w-96 opacity-[0.05]"
      />

      <Container className="relative z-10 grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1fr]">
        {/* brand block — the logo, integrated as the footer's lead */}
        <div className="flex flex-col gap-5">
          <Image
            src="/brand/bezacore-lockup-stacked.png"
            alt="BezaCore Labs"
            width={380}
            height={169}
            className="h-auto w-52 [filter:drop-shadow(0_0_36px_rgba(96,165,250,0.28))]"
          />
          <p className="hero-headline-gradient max-w-xs text-xl font-semibold tracking-tight">
            Software for the work that matters.
          </p>
          <p className="text-sm text-paper/45">Petoskey, Michigan · Est. 2025</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">Site</p>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass}>
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">More</p>
          <Link href="/terms" className={linkClass}>
            Terms
          </Link>
          <Link href="/privacy" className={linkClass}>
            Privacy
          </Link>
          {/* External link → plain <a> (next/link is for in-app routes only). */}
          <a
            href="https://github.com/BezaCore-Labs"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub ↗
          </a>
        </div>
      </Container>

      <div className="relative z-10 border-t border-paper/5">
        <Container className="py-6">
          <p className="text-xs text-paper/40">© 2026 BezaCore Labs LLC. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}
