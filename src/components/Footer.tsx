import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { navLinks } from "@/lib/nav";

// Footer (v3 redesign, 2026-07) — clean structured columns with brand color:
// a cobalt gradient seam, warm+cool ambient glows, amber column labels, and a
// gradient accent on the brand line. Stacks to one column on mobile.
const linkClass = "text-sm text-paper/55 transition-colors hover:text-paper";
const headClass = "font-mono text-xs font-semibold uppercase tracking-[0.2em] text-amber";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-paper/10">
      {/* cobalt gradient seam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cobalt/60 to-transparent"
      />
      {/* ambient brand glows (cool top-right, warm bottom-left) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 85% at 90% 0%, color-mix(in oklab, var(--color-cobalt) 11%, transparent), transparent 55%), radial-gradient(46% 95% at 3% 100%, color-mix(in oklab, var(--color-fire) 10%, transparent), transparent 55%)",
        }}
      />

      <Container className="relative z-10 grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" aria-label="BezaCore Labs — home" className="w-fit">
            <Image
              src="/brand/bezacore-lockup.png"
              alt="BezaCore Labs"
              width={200}
              height={46}
              className="h-9 w-auto"
            />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-paper/55">
            A <span className="text-gradient font-semibold">DevOps &amp; AI studio</span> that builds and
            runs cloud-native software — apps, AI and AI agents, and the infrastructure behind them.
          </p>
          <p className="font-mono text-xs text-paper/35">Petoskey, Michigan · Est. 2025</p>
        </div>

        {/* Studio */}
        <div className="flex flex-col gap-3">
          <p className={headClass}>Studio</p>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass}>
              {label}
            </Link>
          ))}
        </div>

        {/* More */}
        <div className="flex flex-col gap-3">
          <p className={headClass}>More</p>
          <Link href="/terms" className={linkClass}>
            Terms
          </Link>
          <Link href="/privacy" className={linkClass}>
            Privacy
          </Link>
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-3">
          <p className={headClass}>Connect</p>
          <a
            href="https://linkedin.com/in/joseph-soper-dev"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
          <Link href="/contact" className="text-sm text-azure transition-colors hover:text-paper">
            Start a project
          </Link>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-paper/10">
        <Container className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-paper/40">© 2026 BezaCore Labs LLC. All rights reserved.</p>
          <a
            href="https://climate.stripe.com/A7UnvM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-paper/40 transition-colors hover:text-paper"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#34d399", boxShadow: "0 0 8px #34d399" }}
            />
            0.5% of revenue to carbon removal via Stripe Climate
          </a>
        </Container>
      </div>
    </footer>
  );
}
