import { outcomeLabels, outcomeStyles } from "@/lib/outcome-styles";
import type { BeliefOutcome } from "@/lib/types";

type OutcomeBadgeProps = {
  outcome: BeliefOutcome;
};

export function OutcomeBadge({ outcome }: OutcomeBadgeProps) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${outcomeStyles[outcome]}`}
    >
      {outcomeLabels[outcome]}
    </span>
  );
}
