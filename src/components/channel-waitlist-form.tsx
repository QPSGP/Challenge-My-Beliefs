"use client";

import { useState } from "react";

import type { ChannelSlug } from "@/lib/types";

type ChannelWaitlistFormProps = {
  channel: ChannelSlug;
  channelName: string;
};

export function ChannelWaitlistForm({ channel, channelName }: ChannelWaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channel, email }),
    });

    const data = (await response.json()) as { error?: string; message?: string };

    setPending(false);

    if (!response.ok) {
      setMessage(data.error ?? "Could not join the waitlist.");
      return;
    }

    setEmail("");
    setMessage(data.message ?? `You are on the ${channelName} waitlist.`);
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className="rounded-3xl border border-sky-400/20 bg-sky-400/10 p-6"
    >
      <h2 className="text-lg font-semibold text-white">Join the {channelName} waitlist</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Get notified when this channel launches. No spam — just launch updates.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-sky-400/40"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full border border-sky-400/40 bg-sky-400/15 px-5 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25 disabled:opacity-60"
        >
          {pending ? "Joining…" : "Notify me"}
        </button>
      </div>
      {message ? <p className="mt-3 text-sm text-sky-200">{message}</p> : null}
    </form>
  );
}
