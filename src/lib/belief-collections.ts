import type { Belief } from "@/lib/types";

export const CORE_TEN_SIZE = 10;

export function getCoreTenBeliefs(beliefs: Belief[]): Belief[] {
  return beliefs.slice(0, CORE_TEN_SIZE);
}

export function getExtendedBeliefs(beliefs: Belief[]): Belief[] {
  return beliefs.slice(CORE_TEN_SIZE);
}
