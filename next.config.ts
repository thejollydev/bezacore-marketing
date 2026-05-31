import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained production server at .next/standalone — a minimal
  // server.js plus ONLY the node_modules Next traces as actually used. This is
  // what keeps the Docker image small and lets the runtime be a plain
  // `node server.js` instead of `next start` + the full dependency tree.
  // Required for the Cloud Run container build (ADR 0007 — server target,
  // amended 2026-05-25 from the original static-export plan).
  output: "standalone",
};

export default nextConfig;
