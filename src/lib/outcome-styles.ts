import type { BeliefOutcome } from "@/lib/types";

export const outcomeStyles: Record<BeliefOutcome, string> = {
  unchanged: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  refined: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  changed: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export const outcomeLabels: Record<BeliefOutcome, string> = {
  unchanged: "Unchanged",
  refined: "Refined",
  changed: "Changed",
};
