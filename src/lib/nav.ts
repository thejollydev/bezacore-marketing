// Single source of truth for the primary nav. Lives in a neutral module (NOT
// in Header.tsx, which is "use client") so the server-rendered Footer can
// import it as plain data — exports from a client module cross the RSC
// boundary as client references, not usable arrays. Change a route here and
// both the Header and Footer update.
// "Home" is intentionally omitted — the logo links home (standard for the nav
// density at this tier). Blog added in the v3 redesign (2026-07).
export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
