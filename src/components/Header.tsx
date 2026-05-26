"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { navLinks } from "@/lib/nav";

// "use client" for usePathname (active-link state). Sticky + translucent blur
// so the circuit/content scrolls under it; the wordmark glows on hover and the
// active link carries a warm→cobalt underline (the site's signature flow).
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-base/70 backdrop-blur-md">
      {/* gradient light edge instead of a flat border (ties to the brand flow) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-cobalt/45 to-transparent"
      />
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link href="/" aria-label="BezaCore Labs — home" className="group shrink-0">
          {/* full lockup (mark + wordmark) for stronger brand presence */}
          <Image
            src="/brand/bezacore-lockup.png"
            alt="BezaCore Labs"
            width={200}
            height={46}
            priority
            className="transition duration-300 group-hover:[filter:drop-shadow(0_0_16px_rgba(96,165,250,0.55))]"
          />
        </Link>

        <nav className="flex items-center gap-5 text-sm sm:gap-7">
          {navLinks.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group relative font-mono text-xs uppercase tracking-[0.18em] transition-colors ${active ? "text-paper" : "text-paper/70 hover:text-paper"}`}
              >
                {label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-px bg-linear-to-r from-gold to-cobalt transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
