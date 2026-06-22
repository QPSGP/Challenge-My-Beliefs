import { normalizeCategory } from "@/lib/categories";
import { slugify } from "@/lib/slug";
import {
  readBeliefsJson,
  readChallengesJson,
  readWaitlistJson,
  writeBeliefsJson,
  writeChallengesJson,
  writeWaitlistJson,
} from "@/lib/persistence";
import { recordBeliefRevision, revisionKindForUpdate } from "@/lib/revisions";
import type {
  Belief,
  Challenge,
  ChannelInterest,
  CreateBeliefInput,
  CreateChallengeInput,
  CreateChannelInterestInput,
  EditBeliefContentInput,
  UpdateBeliefInput,
  UpdateBeliefRulingInput,
} from "@/lib/types";

function normalizeBelief(belief: Belief): Belief {
  return {
    ...belief,
    category: normalizeCategory(belief.category),
  };
}

export async function getBeliefs(): Promise<Belief[]> {
  const beliefs = await readBeliefsJson<Belief[]>();
  return beliefs.map(normalizeBelief);
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
    category: normalizeCategory(input.category),
    confidence: input.confidence.trim() || "Medium",
    evidence: input.evidence.filter((item) => item.trim().length > 0),
    disproof: input.disproof.trim(),
    outcome: "unchanged",
    rulingNote: "",
    updatedAt: new Date().toISOString(),
  };

  beliefs.push(belief);
  await writeBeliefsJson(beliefs);
  await recordBeliefRevision(belief, "created");
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
  await recordBeliefRevision(updated, "ruling");
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

  const before = beliefs[index];
  const updated: Belief = {
    ...before,
    title: input.title.trim(),
    statement: input.statement.trim(),
    category: normalizeCategory(input.category),
    confidence: input.confidence.trim() || "Medium",
    evidence: input.evidence.filter((item) => item.trim().length > 0),
    disproof: input.disproof.trim(),
    outcome: input.outcome,
    rulingNote: input.rulingNote ?? before.rulingNote,
    updatedAt: new Date().toISOString(),
  };

  beliefs[index] = updated;
  await writeBeliefsJson(beliefs);
  await recordBeliefRevision(updated, revisionKindForUpdate(before, updated));
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

export async function createChannelInterest(
  input: CreateChannelInterestInput,
): Promise<ChannelInterest> {
  const email = input.email.trim().toLowerCase();

  if (!email.includes("@")) {
    throw new Error("A valid email is required");
  }

  const waitlist = await readWaitlistJson<ChannelInterest[]>();
  const duplicate = waitlist.some(
    (entry) => entry.channel === input.channel && entry.email === email,
  );

  if (duplicate) {
    throw new Error("You are already on the waitlist for this channel");
  }

  const entry: ChannelInterest = {
    id: `waitlist-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    channel: input.channel,
    email,
    createdAt: new Date().toISOString(),
  };

  waitlist.unshift(entry);
  await writeWaitlistJson(waitlist);
  return entry;
}

export async function getChannelInterests(channel?: ChannelInterest["channel"]): Promise<ChannelInterest[]> {
  const waitlist = await readWaitlistJson<ChannelInterest[]>();

  if (!channel) {
    return waitlist;
  }

  return waitlist.filter((entry) => entry.channel === channel);
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
