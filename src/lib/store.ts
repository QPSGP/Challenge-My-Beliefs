import { slugify } from "@/lib/slug";
import {
  readBeliefsJson,
  readChallengesJson,
  writeBeliefsJson,
  writeChallengesJson,
} from "@/lib/persistence";
import type {
  Belief,
  Challenge,
  CreateBeliefInput,
  CreateChallengeInput,
  EditBeliefContentInput,
  UpdateBeliefInput,
  UpdateBeliefRulingInput,
} from "@/lib/types";

export async function getBeliefs(): Promise<Belief[]> {
  return readBeliefsJson<Belief[]>();
}

export async function getBeliefById(id: string): Promise<Belief | undefined> {
  const beliefs = await getBeliefs();
  return beliefs.find((belief) => belief.id === id);
}

async function uniqueBeliefId(title: string): Promise<string> {
  const beliefs = await getBeliefs();
  const base = slugify(title);
  let id = base;
  let suffix = 2;

  while (beliefs.some((belief) => belief.id === id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }

  return id;
}

export async function createBelief(input: CreateBeliefInput): Promise<Belief> {
  const beliefs = await getBeliefs();
  const belief: Belief = {
    id: await uniqueBeliefId(input.title),
    title: input.title.trim(),
    statement: input.statement.trim(),
    confidence: input.confidence.trim() || "Medium",
    evidence: input.evidence.filter((item) => item.trim().length > 0),
    disproof: input.disproof.trim(),
    outcome: "unchanged",
    rulingNote: "",
    updatedAt: new Date().toISOString(),
  };

  beliefs.push(belief);
  await writeBeliefsJson(beliefs);
  return belief;
}

export async function reorderBeliefs(ids: string[]): Promise<Belief[]> {
  const beliefs = await getBeliefs();

  if (ids.length !== beliefs.length) {
    throw new Error("Order must include every belief exactly once");
  }

  const beliefMap = new Map(beliefs.map((belief) => [belief.id, belief]));
  const reordered: Belief[] = [];

  for (const id of ids) {
    const belief = beliefMap.get(id);

    if (!belief) {
      throw new Error("Invalid belief id in order");
    }

    reordered.push(belief);
    beliefMap.delete(id);
  }

  if (beliefMap.size > 0) {
    throw new Error("Order must include every belief exactly once");
  }

  await writeBeliefsJson(reordered);
  return reordered;
}

export async function updateBeliefRuling(
  id: string,
  input: UpdateBeliefRulingInput,
): Promise<Belief | undefined> {
  const beliefs = await getBeliefs();
  const index = beliefs.findIndex((belief) => belief.id === id);

  if (index === -1) {
    return undefined;
  }

  const updated: Belief = {
    ...beliefs[index],
    outcome: input.outcome,
    rulingNote: input.rulingNote ?? beliefs[index].rulingNote,
    updatedAt: new Date().toISOString(),
  };

  beliefs[index] = updated;
  await writeBeliefsJson(beliefs);
  return updated;
}

export async function editBeliefContent(
  id: string,
  input: EditBeliefContentInput,
): Promise<Belief | undefined> {
  const existing = await getBeliefById(id);

  if (!existing) {
    return undefined;
  }

  return updateBelief(id, {
    ...input,
    outcome: existing.outcome,
    rulingNote: existing.rulingNote,
  });
}

export async function updateBelief(
  id: string,
  input: UpdateBeliefInput,
): Promise<Belief | undefined> {
  const beliefs = await getBeliefs();
  const index = beliefs.findIndex((belief) => belief.id === id);

  if (index === -1) {
    return undefined;
  }

  const updated: Belief = {
    ...beliefs[index],
    title: input.title.trim(),
    statement: input.statement.trim(),
    confidence: input.confidence.trim() || "Medium",
    evidence: input.evidence.filter((item) => item.trim().length > 0),
    disproof: input.disproof.trim(),
    outcome: input.outcome,
    rulingNote: input.rulingNote ?? beliefs[index].rulingNote,
    updatedAt: new Date().toISOString(),
  };

  beliefs[index] = updated;
  await writeBeliefsJson(beliefs);
  return updated;
}

export async function deleteBelief(id: string): Promise<boolean> {
  const beliefs = await getBeliefs();
  const filtered = beliefs.filter((belief) => belief.id !== id);

  if (filtered.length === beliefs.length) {
    return false;
  }

  await writeBeliefsJson(filtered);

  const challenges = await readChallengesJson<Challenge[]>();
  const remaining = challenges.filter((challenge) => challenge.beliefId !== id);
  await writeChallengesJson(remaining);

  return true;
}

export async function getChallenges(beliefId?: string): Promise<Challenge[]> {
  const challenges = await readChallengesJson<Challenge[]>();

  if (!beliefId) {
    return challenges;
  }

  return challenges.filter((challenge) => challenge.beliefId === beliefId);
}

export async function createChallenge(input: CreateChallengeInput): Promise<Challenge> {
  const belief = await getBeliefById(input.beliefId);

  if (!belief) {
    throw new Error("Belief not found");
  }

  const challenges = await readChallengesJson<Challenge[]>();
  const challenge: Challenge = {
    id: `challenge-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    beliefId: input.beliefId,
    challengerName: input.challengerName?.trim() || "Anonymous",
    argument: input.argument.trim(),
    evidence: input.evidence.trim(),
    context: input.context.trim(),
    sources: input.sources?.trim() ?? "",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  challenges.unshift(challenge);
  await writeChallengesJson(challenges);
  return challenge;
}

export async function markChallengeReviewed(id: string): Promise<Challenge | undefined> {
  const challenges = await readChallengesJson<Challenge[]>();
  const index = challenges.findIndex((challenge) => challenge.id === id);

  if (index === -1) {
    return undefined;
  }

  challenges[index] = {
    ...challenges[index],
    status: "reviewed",
  };

  await writeChallengesJson(challenges);
  return challenges[index];
}
