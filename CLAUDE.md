---
vault_canonical: 04_Career/BezaCore-Labs/products/bezacore-marketing/
vault_mirrors: []
---

# CLAUDE.md — bezacore-marketing

This is the `bezacore.com` parent marketing site. Scaffolded 2026-05-17 per hub ADR 0007 v1.2 as part of BezaCore Labs Master-Plan Chunk C Phase 1.

> **Vault is canonical for all BezaCore Labs documentation.** The product home for this repo lives at `~/GoogleDrive/Obsidian/Master-Mind/04_Career/BezaCore-Labs/products/bezacore-marketing/`. Strategy, ROADMAP, content spec, and design decisions live there. This repo holds code + CLAUDE.md + README.md.

## What this repo IS

A Next.js 16 static-export marketing site for `bezacore.com` — the BezaCore Labs LLC parent surface. **Intelligrace-only public** per Master-Plan Chunk C scope rev (2026-05-16):

- Homepage: parent-company framing + Intelligrace product card
- `/about` — founder + LLC + middle-path faith posture + structural mission tier commitment
- `/intelligrace` — Intelligrace product overview + waitlist (Resend integration per ADR 0008)
- `/contact` — form → Resend → `joseph@bezacore.com`

## What this repo IS NOT

- Not the Intelligrace product marketing site (separate `intelligrace.com` surface, ships when Intelligrace does)
- Not application code (Intelligrace + BezaPM live in their own repos)
- Not a duplicate of vault planning docs (vault is canonical)
- Not a place for BezaPM mentions (BezaPM is private per operating-model v3.2)

## Stack (pinned)

| | |
|---|---|
| Runtime | Node.js (current LTS) |
| Package manager | **pnpm 11.1.2** (corepack-pinned via `packageManager` field) |
| Framework | **Next.js 16.2.6 LTS** (static export — `output: 'export'` to be configured in Phase 1) |
| React | **19.2.6** |
| TypeScript | **6.0.3** (strict) |
| CSS | **Tailwind v4.3.0** (no `tailwind.config.js` — uses `@theme` in CSS) |
| Component primitives | shadcn/ui (CLI v4-compatible) |
| Email | **Resend** for `/contact` form per hub ADR 0008 |
| Lint | ESLint 9 + `eslint-config-next` |

**Build-script approvals:** `sharp` + `unrs-resolver` are persisted in `pnpm-workspace.yaml` for clean re-clones.

## Dev workflow

```bash
# from this repo
pnpm install      # uses corepack-pinned pnpm 11.1.2
pnpm dev          # serves on http://localhost:3030 (port pinned to dodge obsidian-mcp-server on 3000)
pnpm build        # static export build
pnpm start        # production serve on 3030
pnpm lint
```

**Dev port pinned to 3030** (`package.json` scripts) because the local `obsidian-mcp-server` holds port 3000. Do not unpin without coordinating — multiple local services depend on the 3000-collision dodge.

## Multi-remote git

Single `origin` with multi-push URLs configured (set up 2026-05-17):

```
origin → ssh://git@github.com/thejollydev/bezacore-marketing.git (push)
       → ssh://git@gitlab.com/thejollydev/bezacore-marketing.git (push)
       → ssh://git@git.bezaforge.dev:2222/joseph/bezacore-marketing.git (push)
```

`git push` lands on all three. Fetch only pulls from the first. Verify with `git remote -v`.

## Canonical docs (vault)

Open in this order when working on this repo:

1. Vault `CLAUDE.md` + `AI-MASTER.md` (per global startup sequence)
2. Hub `~/Projects/bezacore-labs/CLAUDE.md` — cross-repo coordination context
3. **Product home:** `04_Career/BezaCore-Labs/products/bezacore-marketing/README.md`
4. **Content spec (locked copy for all 4 pages):** `04_Career/BezaCore-Labs/products/bezacore-marketing/content/v1-locked.md`
5. **Master-Plan Chunk C:** vault `04_Career/BezaCore-Labs/Master-Plan.md` § Chunk C
6. **Marketing-stack ADR:** hub `docs/decisions/0007-marketing-stack-nextjs-static-export.md` (v1.2 — bumped 2026-05-17 for Next 15→16, TS 5→6)
7. **Email ADR:** hub `docs/decisions/0008-transactional-email-resend.md`

## Brand assets

Production assets live at `~/Projects/bezacore-labs/brand-assets/bezacore-labs/exports/` (86 files: mark suite + wordmark + horizontal/stacked lockups × dark + light surfaces × 5 widths).

For embedding in this repo, copy needed exports to `public/brand/` and reference from there. Do not symlink — the static export build needs files inline.

## Phase status

- **Phase 1 — scaffold + content + Resend:** scaffold ✅ (2026-05-17), content lock ✅ (2026-05-21), build pending
- **Phase 2 — deploy + DNS:** deferred. GCP project + Cloud Run + Cloudflare DNS happen when Phase 1 ships and content is ready to publish

## Working style

Inherits from global CLAUDE.md (`~/.claude/CLAUDE.md`):

- Walk-through default for dev work in this repo (Joseph is learning React / Next / TS as a first-class priority per `learning-plan.md`)
- Ask first when there are multiple reasonable approaches
- Stay in scope of what was requested

## Project memory

`~/.claude/projects/-home-joseph-Projects-bezacore-marketing/memory/` will be created when the first session lands here. Hub-level memories (cross-cutting BezaCore facts that don't belong to one product repo) stay in the hub project memory at `~/.claude/projects/-home-joseph-Projects-bezacore-labs/memory/`.
