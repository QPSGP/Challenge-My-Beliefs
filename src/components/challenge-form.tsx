"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ChallengeFormProps = {
  beliefId: string;
  beliefTitle: string;
};

type FormState = {
  challengerName: string;
  argument: string;
  evidence: string;
  context: string;
  sources: string;
};

const initialState: FormState = {
  challengerName: "",
  argument: "",
  evidence: "",
  context: "",
  sources: "",
};

export function ChallengeForm({ beliefId, beliefTitle }: ChallengeFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          beliefId,
          ...form,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Could not submit challenge.");
        return;
      }

      setForm(initialState);
      setSuccess("Challenge submitted. It will appear below once the page refreshes.");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none ring-sky-400/40 placeholder:text-slate-500 focus:ring-2";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
    >
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Submit a challenge</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">{beliefTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Bring objective evidence and contextual honesty. Emotional pressure without substance
          does not count.
        </p>
      </div>

      <label className="block text-sm text-slate-300">
        Your name (optional)
        <input
          className={fieldClass}
          value={form.challengerName}
          onChange={(event) => updateField("challengerName", event.target.value)}
          placeholder="Anonymous is fine"
        />
      </label>

      <label className="block text-sm text-slate-300">
        Challenge argument *
        <textarea
          className={`${fieldClass} min-h-28`}
          required
          value={form.argument}
          onChange={(event) => updateField("argument", event.target.value)}
          placeholder="Explain why you believe this belief may be incorrect."
        />
      </label>

      <label className="block text-sm text-slate-300">
        Objective evidence *
        <textarea
          className={`${fieldClass} min-h-28`}
          required
          value={form.evidence}
          onChange={(event) => updateField("evidence", event.target.value)}
          placeholder="Facts, data, or observable outcomes that support your challenge."
        />
      </label>

      <label className="block text-sm text-slate-300">
        Contextual honesty *
        <textarea
          className={`${fieldClass} min-h-28`}
          required
          value={form.context}
          onChange={(event) => updateField("context", event.target.value)}
          placeholder="Relevant context, incentives, timing, or framing that affects interpretation."
        />
      </label>

      <label className="block text-sm text-slate-300">
        Sources (optional)
        <textarea
          className={`${fieldClass} min-h-20`}
          value={form.sources}
          onChange={(event) => updateField("sources", event.target.value)}
          placeholder="Links, studies, or citations."
        />
      </label>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-300">{success}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full border border-sky-400/40 bg-sky-400/15 px-6 py-3 text-sm font-semibold text-sky-100 transition hover:bg-sky-400/25 disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit challenge"}
      </button>
    </form>
  );
}
