import { sendEmail, isValidEmail, escapeHtml } from "@/lib/email";

// POST /api/waitlist — Intelligrace waitlist signups → Resend. Single-list,
// announcement-only per the binding privacy promise in the content spec.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  const honeypot = String(body.company ?? "").trim();

  if (honeypot) return Response.json({ ok: true });
  if (!isValidEmail(email)) return Response.json({ ok: false }, { status: 400 });

  const sent = await sendEmail({
    subject: "New Intelligrace waitlist signup",
    html: `<h2>New Intelligrace waitlist signup</h2><p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    replyTo: email,
  });

  return Response.json({ ok: sent }, { status: sent ? 200 : 500 });
}
