"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { founderHeaders } from "@/lib/founder-client";
import type { Belief } from "@/lib/types";

type BeliefOrderEditorProps = {
  beliefs: Belief[];
  founderKey: string;
  onMessage: (message: string) => void;
};

export function BeliefOrderEditor({ beliefs, founderKey, onMessage }: BeliefOrderEditorProps) {
  const router = useRouter();
  const [orderedIds, setOrderedIds] = useState(() => beliefs.map((belief) => belief.id));
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const beliefById = new Map(beliefs.map((belief) => [belief.id, belief]));

  function move(id: string, direction: "up" | "down") {
    setOrderedIds((current) => {
      const index = current.indexOf(id);

      if (index === -1) {
        return current;
      }

      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= current.length) {
        return current;
      }

      const next = [...current];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  }

  async function saveOrder() {
    setError("");
    onMessage("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/beliefs/reorder", {
        method: "PUT",
        headers: founderHeaders(founderKey),
        body: JSON.stringify({ ids: orderedIds }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Could not save order.");
        return;
      }

      onMessage("Belief order saved.");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  const orderChanged =
    orderedIds.join("|") !== beliefs.map((belief) => belief.id).join("|");

  return (
    <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Belief order</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Position #1 is your lead belief — what visitors see first. Use the arrows to
          reorder, then save.
        </p>
      </div>

      <ol className="space-y-3">
        {orderedIds.map((id, index) => {
          const belief = beliefById.get(id);

          if (!belief) {
            return null;
          }

          return (
            <li
              key={id}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4"
            >
              <span className="w-8 text-sm font-semibold text-sky-300">{index + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white">{belief.title}</p>
                <p className="mt-1 truncate text-sm text-slate-400">{belief.statement}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => move(id, "up")}
                  className="rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-sky-400/40 disabled:opacity-40"
                  aria-label={`Move ${belief.title} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={index === orderedIds.length - 1}
                  onClick={() => move(id, "down")}
                  className="rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-sky-400/40 disabled:opacity-40"
                  aria-label={`Move ${belief.title} down`}
                >
                  ↓
                </button>
              </div>
            </li>
          );
        })}
      </ol>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <button
        type="button"
        disabled={isSaving || !orderChanged}
        onClick={() => void saveOrder()}
        className="rounded-full border border-sky-400/40 bg-sky-400/15 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25 disabled:opacity-60"
      >
        {isSaving ? "Saving..." : "Save order"}
      </button>
    </section>
  );
}
