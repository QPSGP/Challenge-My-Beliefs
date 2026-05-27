"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AddBeliefForm } from "@/components/add-belief-form";
import { BeliefOrderEditor } from "@/components/belief-order-editor";
import { CategoryBadge } from "@/components/category-badge";
import { OutcomeBadge } from "@/components/outcome-badge";
import { founderHeaders, getFounderKey, setFounderKey } from "@/lib/founder-client";
import type { Belief, Challenge } from "@/lib/types";

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
  const [message, setMessage] = useState("");

  const beliefOrderKey = initialBeliefs.map((belief) => belief.id).join("|");
  const pendingChallenges = initialChallenges.filter(
    (challenge) => challenge.status === "pending",
  );

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

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
        <h2 className="text-xl font-semibold text-white">Founder access</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Save your key here once, then edit any belief below.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-sky-400/40"
            value={founderKey}
            onChange={(event) => setFounderKeyState(event.target.value)}
            placeholder="Founder key (optional locally)"
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

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Edit a specific belief</h2>
        <p className="text-sm text-slate-400">
          Open any belief to change its statement, evidence, disproof standard, and ruling in one
          place.
        </p>

        {initialBeliefs.length === 0 ? (
          <p className="text-sm text-slate-500">No beliefs yet.</p>
        ) : (
          <ul className="space-y-3">
            {initialBeliefs.map((belief, index) => (
              <li
                key={belief.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
                    #{index + 1}
                  </p>
                  <p className="mt-1 font-medium text-white">{belief.title}</p>
                  <div className="mt-2">
                    <CategoryBadge category={belief.category} />
                  </div>
                  <p className="mt-2 truncate text-sm text-slate-400">{belief.statement}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <OutcomeBadge outcome={belief.outcome} />
                  <Link
                    href={`/admin/beliefs/${belief.id}`}
                    className="rounded-full border border-sky-400/40 bg-sky-400/15 px-5 py-2 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
                  >
                    Edit belief
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
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
