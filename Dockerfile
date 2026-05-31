# syntax=docker/dockerfile:1
#
# Multi-stage build for the bezacore.com Next server (Cloud Run target, ADR
# 0007). The final image carries only Next's standalone output + a plain Node
# runtime — no pnpm, no source, no dev dependencies.

# ---- base: pinned Node LTS on alpine (small). Production rides LTS (24),
#      not the machine's local "Current" Node — reproducible + supported. ----
FROM node:24-alpine AS base
# Next's native SWC binaries occasionally need glibc compat on musl/alpine.
RUN apk add --no-cache libc6-compat
# Use the pnpm version pinned in package.json "packageManager" (corepack ships
# with Node; it provisions pnpm@11.1.2 on first use).
RUN corepack enable
WORKDIR /app

# ---- deps: install dependencies from the frozen lockfile (reproducible) ----
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ---- builder: compile the app + emit .next/standalone ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ---- runner: minimal image that just runs the traced server ----
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Cloud Run injects $PORT (defaults 8080); bind all interfaces so it's reachable.
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
# Run as an unprivileged user (don't run web servers as root).
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
# Standalone output excludes public/ and .next/static — copy them in explicitly
# or the server serves HTML with no assets (the classic standalone gotcha).
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 8080
CMD ["node", "server.js"]
