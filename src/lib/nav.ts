// Single source of truth for the primary nav. Lives in a neutral module (NOT
// in Header.tsx, which is "use client") so the server-rendered Footer can
// import it as plain data — exports from a client module cross the RSC
// boundary as client references, not usable arrays. Change a route here and
// both the Header and Footer update.
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/intelligrace", label: "Intelligrace" },
  { href: "/contact", label: "Contact" },
];
