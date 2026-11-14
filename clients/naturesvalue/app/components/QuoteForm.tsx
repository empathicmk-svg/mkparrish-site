"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { requestQuote, type QuoteState } from "../actions";
import { DOSAGE_FORMS } from "../content/site";

export type QuotePrefill = { dosageForm?: string; quantity?: string; details?: string };

const input =
  "mt-1.5 block w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-ink placeholder:text-stone/60 focus:border-leaf focus:outline-none focus:ring-4 focus:ring-leaf/15";

function Field({ label, children, optional }: { label: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      {optional && <span className="font-normal text-stone"> (optional)</span>}
      {children}
    </label>
  );
}

export default function QuoteForm({
  prefill = {},
  onSuccess,
  variant = "full",
  source = "contact",
}: {
  prefill?: QuotePrefill;
  onSuccess?: () => void;
  variant?: "full" | "short";
  source?: string;
}) {
  const [state, action, pending] = useActionState<QuoteState, FormData>(async (prev, formData) => {
    const result = await requestQuote(prev, formData);
    if (result.status === "ok") onSuccess?.();
    return result;
  }, { status: "idle" });

  if (state.status === "ok" && !onSuccess) {
    return (
      <div role="status" className="rounded-2xl border border-line bg-white p-8">
        <CheckCircle2 className="text-leaf" size={32} aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl font-semibold text-forest">Thanks, we&apos;ve got it.</h2>
        <p className="mt-2 text-stone">Our team will review your project and reply within one business day.</p>
      </div>
    );
  }

  const short = variant === "short";

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="source" value={source} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name">
          <input name="name" required autoComplete="name" className={input} />
        </Field>
        {!short && (
          <Field label="Company">
            <input name="company" required autoComplete="organization" className={input} />
          </Field>
        )}
        <Field label="Email">
          <input name="email" type="email" required autoComplete="email" className={input} />
        </Field>
        {!short && (
          <>
            <Field label="Phone" optional>
              <input name="phone" type="tel" autoComplete="tel" className={input} />
            </Field>
            <Field label="Dosage form" optional>
              <select name="dosageForm" className={input} defaultValue={prefill.dosageForm ?? ""}>
                <option value="">Not sure yet</option>
                {DOSAGE_FORMS.map((f) => (
                  <option key={f.slug}>{f.title}</option>
                ))}
              </select>
            </Field>
            <Field label="Estimated quantity" optional>
              <input
                name="quantity"
                defaultValue={prefill.quantity}
                placeholder="e.g. 50,000 bottles a year"
                className={input}
              />
            </Field>
          </>
        )}
      </div>
      <Field label={short ? "What would you like to make?" : "Project details"}>
        <textarea
          name="details"
          required
          rows={short ? 3 : 5}
          defaultValue={prefill.details}
          placeholder="Your product, key ingredients, whether you have a formula, and when you need it."
          className={input}
        />
      </Field>
      <div aria-hidden="true" className="hidden">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {state.status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-forest px-6 py-3 font-semibold text-white transition-colors hover:bg-moss disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : short ? "Get my free review" : "Send request"}
      </button>
    </form>
  );
}
