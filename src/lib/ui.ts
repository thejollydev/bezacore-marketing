// Shared button class strings for the v3 redesign. Neutral module (plain
// strings) so both server components and the "use client" Header can import
// them without crossing the RSC boundary as client references.
//
// Accent split (v3): azure→cobalt = the interactive/primary accent; the warm
// gold→fire gradient is reserved for brand text (headline flow, emphasis
// phrases) via .hero-headline-gradient / .text-gradient.
export const btnPrimary =
  "group inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-azure to-cobalt px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_22px_-6px_rgba(59,130,246,0.7)] transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-base";

export const btnGhost =
  "inline-flex items-center gap-2 rounded-xl border border-paper/15 bg-paper/[0.03] px-6 py-3 text-sm font-semibold text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-amber/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-azure";

export const btnPrimarySm =
  "inline-flex items-center gap-1.5 rounded-full bg-linear-to-br from-azure to-cobalt px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-white transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-azure";
