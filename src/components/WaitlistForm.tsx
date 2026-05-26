"use client";

import { useState, type FormEvent } from "react";
import { Field } from "./Field";

// Intelligrace waitlist — email only → POST /api/waitlist → Resend. Same
// state/success/error pattern as ContactForm, single field.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (!email.trim()) {
      setError("Required.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(undefined);
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: honeypot }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="text-lg font-medium text-paper" role="status">
        You&apos;re on the list. We&apos;ll be in touch when Content Studio ships.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex max-w-md flex-col gap-3">
      {status === "error" ? (
        <p className="rounded-lg border border-red-400/40 bg-red-400/5 px-4 py-3 text-sm text-red-400" role="alert">
          Something went wrong. Please try again in a few minutes.
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <Field
            label="Email"
            name="waitlist-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(undefined);
            }}
            error={error}
            autoComplete="email"
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group mt-[26px] inline-flex w-fit items-center gap-2 rounded-full bg-linear-to-r from-gold to-fire px-6 py-3 text-sm font-medium text-ink transition-all duration-200 hover:ring-2 hover:ring-cobalt hover:ring-offset-2 hover:ring-offset-base focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:opacity-60"
        >
          {status === "submitting" ? "Joining…" : "Join"}
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>

      <input
        type="text"
        name="company"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
    </form>
  );
}
