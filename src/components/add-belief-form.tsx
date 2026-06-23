"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { CategoryField } from "@/components/category-field";
import { founderRequestInit } from "@/lib/founder-client";

type AddBeliefFormProps = {
  founderKey: string;
  onMessage: (message: string) => void;
  embedded?: boolean;
};

type FormState = {
  title: string;
  statement: string;
  category: string;
  confidence: string;
  evidence: string;
  disproof: string;
};

const initialState: FormState = {
  title: "",
  statement: "",
  category: "Individual Rights",
  confidence: "High",
  evidence: "",
  disproof: "",
};

export function AddBeliefForm({ founderKey, onMessage, embedded = false }: AddBeliefFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none ring-sky-400/40 placeholder:text-slate-500 focus:ring-2";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    onMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/beliefs", {
        method: "POST",
        ...founderRequestInit(founderKey),
        body: JSON.stringify({
          title: form.title,
          statement: form.statement,
          category: form.category,
          confidence: form.confidence,
          evidence: form.evidence
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
          disproof: form.disproof,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Could not add belief.");
        return;
      }

      setForm(initialState);
      onMessage("Belief added. It appears at the end of the list — reorder if needed.");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        embedded ? "space-y-5" : "space-y-5 rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
      }
    >
      {!embedded ? (
        <div>
          <h2 className="text-xl font-semibold text-white">Add a new belief</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            New beliefs are appended to the end. Use the order controls below to move them where
            you want.
          </p>
        </div>
      ) : null}

      <label className="block text-sm text-slate-300">
        Title *
        <input
          className={fieldClass}
          required
          value={form.title}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          placeholder="Short label for the belief card"
        />
      </label>

      <label className="block text-sm text-slate-300">
        Belief statement *
        <textarea
          className={`${fieldClass} min-h-28`}
          required
          value={form.statement}
          onChange={(event) =>
            setForm((current) => ({ ...current, statement: event.target.value }))
          }
          placeholder="I believe that..."
        />
      </label>

      <CategoryField
        value={form.category}
        onChange={(category) => setForm((current) => ({ ...current, category }))}
        fieldClass={fieldClass}
      />

      <label className="block text-sm text-slate-300">
        Confidence
        <select
          className={fieldClass}
          value={form.confidence}
          onChange={(event) =>
            setForm((current) => ({ ...current, confidence: event.target.value }))
          }
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>

      <label className="block text-sm text-slate-300">
        Supporting evidence (one point per line)
        <textarea
          className={`${fieldClass} min-h-24`}
          value={form.evidence}
          onChange={(event) =>
            setForm((current) => ({ ...current, evidence: event.target.value }))
          }
          placeholder="Why you currently hold this belief"
        />
      </label>

      <label className="block text-sm text-slate-300">
        What could disprove it
        <textarea
          className={`${fieldClass} min-h-20`}
          value={form.disproof}
          onChange={(event) =>
            setForm((current) => ({ ...current, disproof: event.target.value }))
          }
          placeholder="The standard a serious challenge must meet"
        />
      </label>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full border border-sky-400/40 bg-sky-400/15 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25 disabled:opacity-60"
      >
        {isSubmitting ? "Adding..." : "Add belief"}
      </button>
    </form>
  );
}
