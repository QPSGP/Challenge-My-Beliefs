"use client";

import { getFounderKey, setFounderKey } from "@/lib/founder-client";

type FounderKeyBarProps = {
  founderKey: string;
  onFounderKeyChange: (key: string) => void;
  onMessage?: (message: string) => void;
};

export function FounderKeyBar({
  founderKey,
  onFounderKeyChange,
  onMessage,
}: FounderKeyBarProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
      <p className="text-sm font-semibold text-white">Founder key</p>
      <p className="mt-1 text-sm text-slate-400">
        Required on the live site if <code className="text-sky-300">FOUNDER_KEY</code> is set in
        Vercel. Optional when running locally.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-sky-400/40"
          value={founderKey}
          onChange={(event) => onFounderKeyChange(event.target.value)}
          placeholder="Enter founder key"
        />
        <button
          type="button"
          onClick={() => onFounderKeyChange(getFounderKey())}
          className="rounded-full border border-slate-700 px-4 py-3 text-sm text-slate-200 hover:border-sky-400/40"
        >
          Load saved
        </button>
        <button
          type="button"
          onClick={() => {
            setFounderKey(founderKey);
            onMessage?.("Founder key saved in this browser.");
          }}
          className="rounded-full border border-slate-700 px-4 py-3 text-sm text-slate-200 hover:border-sky-400/40"
        >
          Save key
        </button>
      </div>
    </div>
  );
}
