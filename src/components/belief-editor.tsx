"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FounderKeyBar } from "@/components/founder-key-bar";
import { readApiError } from "@/lib/api-client";
import { founderHeaders } from "@/lib/founder-client";
import { outcomeLabels } from "@/lib/outcome-styles";
import type { Belief, BeliefOutcome } from "@/lib/types";

const outcomes: BeliefOutcome[] = ["unchanged", "refined", "changed"];

type BeliefEditorProps = {
  belief: Belief;
};

export function BeliefEditor({ belief }: BeliefEditorProps) {
  const router = useRouter();
  const [founderKey, setFounderKey] = useState("");
  const [title, setTitle] = useState(belief.title);
  const [statement, setStatement] = useState(belief.statement);
  const [confidence, setConfidence] = useState(belief.confidence);
  const [evidence, setEvidence] = useState(belief.evidence.join("\n"));
  const [disproof, setDisproof] = useState(belief.disproof);
  const [outcome, setOutcome] = useState<BeliefOutcome>(belief.outcome);
  const [rulingNote, setRulingNote] = useState(belief.rulingNote);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none ring-sky-400/40 placeholder:text-slate-500 focus:ring-2";

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/beliefs/${belief.id}`, {
        method: "PUT",
        headers: founderHeaders(founderKey),
        body: JSON.stringify({
          title,
          statement,
          confidence,
          evidence: evidence
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
          disproof,
          outcome,
          rulingNote,
        }),
      });

      if (!response.ok) {
        setError(await readApiError(response));
        return;
      }

      setMessage("Belief saved. Public page updated.");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${belief.title}"? This also removes its challenges. This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/beliefs/${belief.id}`, {
        method: "DELETE",
        headers: founderHeaders(founderKey),
      });

      if (!response.ok) {
        setError(await readApiError(response));
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Network error. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <FounderKeyBar
        founderKey={founderKey}
        onFounderKeyChange={setFounderKey}
        onMessage={setMessage}
      />

      {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <form onSubmit={handleSave} className="space-y-5 rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Edit belief</p>
            <p className="mt-1 text-xs text-slate-500">ID: {belief.id}</p>
          </div>
          <Link
            href={`/beliefs/${belief.id}`}
            className="text-sm text-sky-300 hover:text-sky-200"
            target="_blank"
            rel="noreferrer"
          >
            View public page →
          </Link>
        </div>

        <label className="block text-sm text-slate-300">
          Title *
          <input
            className={fieldClass}
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label className="block text-sm text-slate-300">
          Belief statement *
          <textarea
            className={`${fieldClass} min-h-32`}
            required
            value={statement}
            onChange={(event) => setStatement(event.target.value)}
            placeholder="I believe that..."
          />
        </label>

        <label className="block text-sm text-slate-300">
          Confidence
          <select
            className={fieldClass}
            value={confidence}
            onChange={(event) => setConfidence(event.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label className="block text-sm text-slate-300">
          Supporting evidence (one point per line)
          <textarea
            className={`${fieldClass} min-h-28`}
            value={evidence}
            onChange={(event) => setEvidence(event.target.value)}
          />
        </label>

        <label className="block text-sm text-slate-300">
          What could disprove it
          <textarea
            className={`${fieldClass} min-h-24`}
            value={disproof}
            onChange={(event) => setDisproof(event.target.value)}
          />
        </label>

        <div className="border-t border-slate-800 pt-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Ruling
          </p>

          <label className="mt-4 block text-sm text-slate-300">
            Outcome
            <select
              className={fieldClass}
              value={outcome}
              onChange={(event) => setOutcome(event.target.value as BeliefOutcome)}
            >
              {outcomes.map((value) => (
                <option key={value} value={value}>
                  {outcomeLabels[value]}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-4 block text-sm text-slate-300">
            Ruling note (shown on the public belief page)
            <textarea
              className={`${fieldClass} min-h-24`}
              value={rulingNote}
              onChange={(event) => setRulingNote(event.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full border border-sky-400/40 bg-sky-400/15 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25 disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save belief"}
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => void handleDelete()}
            className="rounded-full border border-rose-400/30 bg-rose-400/10 px-6 py-3 text-sm text-rose-200 hover:bg-rose-400/20 disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete belief"}
          </button>
        </div>
      </form>
    </div>
  );
}
