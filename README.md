# bezacore-marketing

The `bezacore.com` parent marketing site — the public surface of **BezaCore Labs LLC**, a Michigan software company building tools for small mission-driven organizations (starting with Intelligrace).

Four pages: homepage, `/about`, `/intelligrace` (waitlist), `/contact`. The contact + waitlist forms post to server API routes that send mail via [Resend](https://resend.com). The signature visual is the **fusion-circuit hero** (pure SVG/CSS — circuit traces with traveling-light pulses + a gradient headline).

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, **server build** — deployed on Cloud Run, not static export) |
| Runtime | React 19 · TypeScript 6 (strict) · Node.js LTS |
| Styling | Tailwind v4 (`@theme` in CSS, no `tailwind.config.js`) |
| Email | Resend (via `fetch`, no SDK) |
| Package manager | pnpm 11 (corepack-pinned via `packageManager`) |

## Development

```bash
pnpm install
pnpm dev      # http://localhost:3030  (port pinned to dodge a local service on 3000)
pnpm build    # production server build (.next)
pnpm start    # serve the production build on 3030
pnpm lint
```

### Environment

The forms no-op safely without mail config. To send for real, set:

- `RESEND_API_KEY` — Resend API key (required to actually send)
- `RESEND_FROM` — a verified sender on the Resend account
- `CONTACT_TO` — recipient (defaults to `joseph@bezacore.com`)

## Deployment

Containerized for **Google Cloud Run** — `output: 'standalone'` + a multi-stage `Dockerfile` (non-root Node alpine runner). The server build is required because the contact/waitlist forms need API routes.

## More

Repo conventions + architecture live in [`CLAUDE.md`](./CLAUDE.md). Strategy, content spec, and roadmap are kept in the project's vault home (not in this repo).
