// Resend transactional email via its REST API (no SDK dependency) — per ADR
// 0008. Runs only in route handlers (server). Configuration via env:
//   RESEND_API_KEY  — required to actually send (absent in local dev = no-op)
//   RESEND_FROM     — verified sender, e.g. "BezaCore Labs <hello@bezacore.com>"
//   CONTACT_TO      — destination, defaults to joseph@bezacore.com
const RESEND_ENDPOINT = "https://api.resend.com/emails";

type SendArgs = {
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail({ subject, html, replyTo }: SendArgs): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // No key configured (e.g. local dev before secrets are set). Don't pretend
    // to send; the caller surfaces the generic error state.
    console.warn("[email] RESEND_API_KEY not set — skipping send");
    return false;
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "BezaCore Labs <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? "joseph@bezacore.com"],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[email] send failed", err);
    return false;
  }
}

// Minimal email-shape check (server-side guard; the form also validates).
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Escape user input before embedding in the notification HTML.
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
