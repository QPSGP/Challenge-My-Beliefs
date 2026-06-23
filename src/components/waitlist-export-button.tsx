"use client";

import type { ChannelInterest } from "@/lib/types";
import { downloadWaitlistCsv } from "@/lib/waitlist-export";

type WaitlistExportButtonProps = {
  entries: ChannelInterest[];
  filename: string;
  label?: string;
};

export function WaitlistExportButton({
  entries,
  filename,
  label = "Export CSV",
}: WaitlistExportButtonProps) {
  return (
    <button
      type="button"
      disabled={entries.length === 0}
      onClick={() => downloadWaitlistCsv(entries, filename)}
      className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-sky-400/40 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}
