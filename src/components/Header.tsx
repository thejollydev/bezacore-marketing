"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { navLinks } from "@/lib/nav";

// "use client" for usePathname (active-link state) + the mobile-menu toggle.
// Sticky + translucent blur so the circuit/content scrolls under it; the
// wordmark glows on hover and the active link carries a warm→cobalt underline
// (the site's signature flow). Below `sm`, the inline nav is replaced by a
// hamburger button that opens a stacked link panel — the full nav + a 200px
// logo can't share one row on a phone (that overflow caused horizontal scroll).
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu on Escape. (Following a link closes it via each link's
  // onClick, so no route-change effect is needed.)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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

        {/* Desktop nav — inline from `sm` up. */}
        <nav className="hidden items-center gap-5 text-sm sm:flex sm:gap-7">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
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

        {/* Mobile menu toggle — hamburger below `sm`. */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-1 inline-flex items-center justify-center rounded-lg border border-paper/10 p-2 text-paper/80 transition-colors hover:border-paper/25 hover:bg-paper/[0.04] hover:text-paper sm:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3.5" y1="7" x2="20.5" y2="7" />
                <line x1="3.5" y1="12" x2="20.5" y2="12" />
                <line x1="3.5" y1="17" x2="20.5" y2="17" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile nav panel — stacked links, shown when open. sm:hidden so it
          never renders on desktop. */}
      {open ? (
        <nav
          id="mobile-nav"
          className="menu-panel relative overflow-hidden bg-base/95 backdrop-blur-md sm:hidden"
        >
          {/* traveling-light seam at the top edge (the hero's pulse language) */}
          <div className="beam-divider" />
          <Container className="flex flex-col py-3">
            {navLinks.map(({ href, label }, i) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${i * 55}ms` }}
                  className={`menu-item group flex items-center justify-between gap-4 rounded-lg px-3 py-3.5 font-mono text-sm uppercase tracking-[0.18em] transition-colors hover:bg-paper/[0.03] ${active ? "text-paper" : "text-paper/70 hover:text-paper"}`}
                >
                  <span className="flex items-center gap-3">
                    {/* gold→cobalt accent bar — lit on the active route, hinted on hover */}
                    <span
                      aria-hidden="true"
                      className={`h-4 w-0.5 rounded-full bg-linear-to-b from-gold to-cobalt transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
                    />
                    {label}
                  </span>
                  {/* trailing arrow slides in on active / hover (the signature flow) */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`transition-all duration-300 ${active ? "translate-x-0 opacity-90" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-70"}`}
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </Link>
              );
            })}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
