"use client";

import { useState } from "react";

import { SUGGESTED_CATEGORIES } from "@/lib/categories";

type CommunityJoinFormProps = {
  defaultCategory?: string;
};

export function CommunityJoinForm({ defaultCategory = "" }: CommunityJoinFormProps) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [categoryInterest, setCategoryInterest] = useState(defaultCategory);
  const [introduction, setIntroduction] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channel: "community",
        email,
        displayName,
        introduction,
        categoryInterest,
      }),
    });

    const data = (await response.json()) as { error?: string; message?: string };

    setPending(false);

    if (!response.ok) {
      setMessage(data.error ?? "Could not join the community.");
      return;
    }

    setDisplayName("");
    setEmail("");
    setIntroduction("");
    setMessage(data.message ?? "You are on the community list. We will be in touch.");
  }

  const categories = SUGGESTED_CATEGORIES.filter((category) => category !== "Uncategorized");

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      id="join"
      className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-8"
    >
      <h2 className="text-2xl font-semibold text-white">Join the community</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Early members help shape working groups and moderation norms. Tell us who you are and what
        you want to contribute.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Name
          </span>
          <input
            required
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Your name"
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-400/40"
          />
        </label>

        <label className="block sm:col-span-1">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-400/40"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Category interest (optional)
          </span>
          <select
            value={categoryInterest}
            onChange={(event) => setCategoryInterest(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-400/40"
          >
            <option value="">General / not sure yet</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Why do you want to join?
          </span>
          <textarea
            required
            value={introduction}
            onChange={(event) => setIntroduction(event.target.value)}
            rows={4}
            placeholder="What beliefs or categories interest you? What evidence or perspective can you bring?"
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-400/40"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-6 py-3 text-sm font-semibold text-emerald-100 hover:bg-emerald-400/25 disabled:opacity-60"
      >
        {pending ? "Joining…" : "Request to join"}
      </button>

      {message ? <p className="mt-4 text-sm text-emerald-200">{message}</p> : null}
    </form>
  );
}
