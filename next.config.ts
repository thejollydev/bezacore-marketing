import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained production server at .next/standalone — a minimal
  // server.js plus ONLY the node_modules Next traces as actually used. This is
  // what keeps the Docker image small and lets the runtime be a plain
  // `node server.js` instead of `next start` + the full dependency tree.
  // Required for the Cloud Run container build (ADR 0007 — server target,
  // amended 2026-05-25 from the original static-export plan).
  output: "standalone",

  // The Intelligrace product surface is hidden during the studio repositioning
  // (operating-model v3.5, 2026-06-17). The page content is preserved in the
  // vault (content/v1-locked.md) for when the product ships; until then the
  // route permanently redirects home. The waitlist component + /api/waitlist
  // stay in the repo, dormant and unlinked. See content/v2-studio.md.
  async redirects() {
    return [
      {
        source: "/intelligrace",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
