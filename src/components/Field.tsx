import { type ChangeEvent } from "react";

// Label + input/textarea + inline error. Presentational (no state of its own) —
// the parent form owns value/error. Used by ContactForm + WaitlistForm.
export function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  textarea = false,
  error,
  autoComplete,
  rows = 5,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  textarea?: boolean;
  error?: string;
  autoComplete?: string;
  rows?: number;
}) {
  const control =
    "w-full rounded-lg border bg-paper/5 px-4 py-3 text-paper placeholder-paper/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-base";
  const borderColor = error ? "border-red-400/60" : "border-paper/15";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm text-paper/70">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          aria-invalid={error ? true : undefined}
          className={`${control} ${borderColor} resize-y`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          className={`${control} ${borderColor}`}
        />
      )}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  );
}
