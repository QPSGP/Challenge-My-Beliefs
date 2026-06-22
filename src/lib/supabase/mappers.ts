import type {
  Belief,
  BeliefRevision,
  Challenge,
  ChannelInterest,
} from "@/lib/types";

export type BeliefRow = {
  id: string;
  title: string;
  statement: string;
  category: string;
  confidence: string;
  evidence: string[];
  disproof: string;
  outcome: Belief["outcome"];
  ruling_note: string;
  sort_order: number;
  updated_at: string;
};

export type ChallengeRow = {
  id: string;
  belief_id: string;
  challenger_name: string;
  argument: string;
  evidence: string;
  context: string;
  sources: string;
  status: Challenge["status"];
  created_at: string;
};

export type BeliefRevisionRow = {
  id: string;
  belief_id: string;
  kind: BeliefRevision["kind"];
  snapshot: Belief;
  created_at: string;
};

export type WaitlistRow = {
  id: string;
  channel: ChannelInterest["channel"];
  email: string;
  created_at: string;
};

export function beliefToRow(belief: Belief, sortOrder: number): BeliefRow {
  return {
    id: belief.id,
    title: belief.title,
    statement: belief.statement,
    category: belief.category,
    confidence: belief.confidence,
    evidence: belief.evidence,
    disproof: belief.disproof,
    outcome: belief.outcome,
    ruling_note: belief.rulingNote,
    sort_order: sortOrder,
    updated_at: belief.updatedAt,
  };
}

export function rowToBelief(row: BeliefRow): Belief {
  return {
    id: row.id,
    title: row.title,
    statement: row.statement,
    category: row.category,
    confidence: row.confidence,
    evidence: Array.isArray(row.evidence) ? row.evidence : [],
    disproof: row.disproof,
    outcome: row.outcome,
    rulingNote: row.ruling_note,
    updatedAt: row.updated_at,
  };
}

export function challengeToRow(challenge: Challenge): ChallengeRow {
  return {
    id: challenge.id,
    belief_id: challenge.beliefId,
    challenger_name: challenge.challengerName,
    argument: challenge.argument,
    evidence: challenge.evidence,
    context: challenge.context,
    sources: challenge.sources,
    status: challenge.status,
    created_at: challenge.createdAt,
  };
}

export function rowToChallenge(row: ChallengeRow): Challenge {
  return {
    id: row.id,
    beliefId: row.belief_id,
    challengerName: row.challenger_name,
    argument: row.argument,
    evidence: row.evidence,
    context: row.context,
    sources: row.sources,
    status: row.status,
    createdAt: row.created_at,
  };
}

export function revisionToRow(revision: BeliefRevision): BeliefRevisionRow {
  return {
    id: revision.id,
    belief_id: revision.beliefId,
    kind: revision.kind,
    snapshot: revision.snapshot,
    created_at: revision.createdAt,
  };
}

export function rowToRevision(row: BeliefRevisionRow): BeliefRevision {
  return {
    id: row.id,
    beliefId: row.belief_id,
    kind: row.kind,
    snapshot: row.snapshot,
    createdAt: row.created_at,
  };
}

export function waitlistToRow(entry: ChannelInterest): WaitlistRow {
  return {
    id: entry.id,
    channel: entry.channel,
    email: entry.email,
    created_at: entry.createdAt,
  };
}

export function rowToWaitlist(row: WaitlistRow): ChannelInterest {
  return {
    id: row.id,
    channel: row.channel,
    email: row.email,
    createdAt: row.created_at,
  };
}
