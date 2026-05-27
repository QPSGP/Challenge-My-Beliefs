"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AddBeliefForm } from "@/components/add-belief-form";
import { BeliefOrderEditor } from "@/components/belief-order-editor";
import { founderHeaders, getFounderKey, setFounderKey } from "@/lib/founder-client";
import { outcomeLabels } from "@/lib/outcome-styles";
import type { Belief, BeliefOutcome, Challenge } from "@/lib/types";

const outcomes: BeliefOutcome[] = ["unchanged", "refined", "changed"];

type AdminDashboardProps = {
  initialBeliefs: Belief[];
  initialChallenges: Challenge[];
};

export function AdminDashboard({
  initialBeliefs,
  initialChallenges,
}: AdminDashboardProps) {
  const router = useRouter();
  const [founderKey, setFounderKeyState] = useState("");
  const [drafts, setDrafts] = useState<Record<string, { outcome: BeliefOutcome; rulingNote: string }>>(
    () =>
      Object.fromEntries(
        initialBeliefs.map((belief) => [
          belief.id,
          { outcome: belief.outcome, rulingNote: belief.rulingNote },
        ]),
      ),
  );
  const [message, setMessage] = useState("");

  const beliefOrderKey = initialBeliefs.map((belief) => belief.id).join("|");
  const pendingChallenges = initialChallenges.filter(
    (challenge) => challenge.status === "pending",
  );

  async function saveBeliefRuling(beliefId: string) {
    setMessage("");
    const draft = drafts[beliefId];

    const response = await fetch(`/api/beliefs/${beliefId}`, {
      method: "PATCH",
      headers: founderHeaders(founderKey),
      body: JSON.stringify(draft),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setMessage(data.error ?? "Could not save ruling.");
      return;
    }

    setMessage("Ruling saved.");
    router.refresh();
  }

  async function markReviewed(challengeId: string) {
    setMessage("");

    const response = await fetch("/api/challenges", {
      method: "PATCH",
      headers: founderHeaders(founderKey),
      body: JSON.stringify({ id: challengeId }),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setMessage(data.error ?? "Could not mark challenge reviewed.");
      return;
    }

    setMessage("Challenge marked reviewed.");
    router.refresh();
  }

  const selectClass =
    "mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-sky-400/40";
  const textareaClass = `${selectClass} min-h-24`;

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
        <h2 className="text-xl font-semibold text-white">Founder access</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Set a founder key if <code className="text-sky-300">FOUNDER_KEY</code> is configured in
          your environment. Otherwise founder actions work locally without a key.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-sky-400/40"
            value={founderKey}
            onChange={(event) => setFounderKeyState(event.target.value)}
            placeholder="Founder key (optional)"
          />
          <button
            type="button"
            onClick={() => setFounderKeyState(getFounderKey())}
            className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 hover:border-sky-400/40"
          >
            Load saved
          </button>
          <button
            type="button"
            onClick={() => {
              setFounderKey(founderKey);
              setMessage("Founder key saved in this browser.");
            }}
            className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 hover:border-sky-400/40"
          >
            Save key
          </button>
        </div>
      </section>

      {message ? <p className="text-sm text-sky-300">{message}</p> : null}

      <BeliefOrderEditor
        key={beliefOrderKey}
        beliefs={initialBeliefs}
        founderKey={founderKey}
        onMessage={setMessage}
      />

      <AddBeliefForm founderKey={founderKey} onMessage={setMessage} />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Record belief rulings</h2>
        {initialBeliefs.map((belief) => (
          <article
            key={belief.id}
            className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
          >
            <h3 className="text-xl font-semibold text-white">{belief.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{belief.statement}</p>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <label className="block text-sm text-slate-300">
                Outcome
                <select
                  className={selectClass}
                  value={drafts[belief.id]?.outcome ?? belief.outcome}
                  onChange={(event) =>
                    setDrafts((current) => ({
                      ...current,
                      [belief.id]: {
                        ...current[belief.id],
                        outcome: event.target.value as BeliefOutcome,
                      },
                    }))
                  }
                >
                  {outcomes.map((outcome) => (
                    <option key={outcome} value={outcome}>
                      {outcomeLabels[outcome]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm text-slate-300 lg:col-span-2">
                Ruling note (public reasoning for the outcome)
                <textarea
                  className={textareaClass}
                  value={drafts[belief.id]?.rulingNote ?? ""}
                  onChange={(event) =>
                    setDrafts((current) => ({
                      ...current,
                      [belief.id]: {
                        ...current[belief.id],
                        rulingNote: event.target.value,
                      },
                    }))
                  }
                  placeholder="Why did this belief stay unchanged, become refined, or change?"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={() => void saveBeliefRuling(belief.id)}
              className="mt-4 rounded-full border border-sky-400/40 bg-sky-400/15 px-5 py-2 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
            >
              Save ruling
            </button>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Pending challenges ({pendingChallenges.length})
        </h2>

        {pendingChallenges.length === 0 ? (
          <p className="text-sm text-slate-400">No pending challenges right now.</p>
        ) : (
          pendingChallenges.map((challenge) => {
            const belief = initialBeliefs.find((item) => item.id === challenge.beliefId);

            return (
              <article
                key={challenge.id}
                className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
              >
                <p className="text-sm uppercase tracking-[0.16em] text-sky-300">
                  {belief?.title ?? challenge.beliefId}
                </p>
                <p className="mt-2 font-medium text-white">{challenge.challengerName}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{challenge.argument}</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  <span className="font-semibold text-slate-500">Evidence: </span>
                  {challenge.evidence}
                </p>
                <button
                  type="button"
                  onClick={() => void markReviewed(challenge.id)}
                  className="mt-4 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 text-sm text-emerald-200 hover:bg-emerald-400/20"
                >
                  Mark reviewed
                </button>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}
