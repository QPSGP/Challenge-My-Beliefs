export type BeliefOutcome = "unchanged" | "refined" | "changed";

export type Belief = {
  id: string;
  title: string;
  statement: string;
  category: string;
  confidence: string;
  evidence: string[];
  disproof: string;
  outcome: BeliefOutcome;
  rulingNote: string;
  updatedAt: string;
};

export type ChallengeStatus = "pending" | "reviewed";

export type Challenge = {
  id: string;
  beliefId: string;
  challengerName: string;
  argument: string;
  evidence: string;
  context: string;
  sources: string;
  status: ChallengeStatus;
  createdAt: string;
};

export type CreateChallengeInput = {
  beliefId: string;
  challengerName?: string;
  argument: string;
  evidence: string;
  context: string;
  sources?: string;
};

export type UpdateBeliefRulingInput = {
  outcome: BeliefOutcome;
  rulingNote?: string;
};

export type EditBeliefContentInput = {
  title: string;
  statement: string;
  category: string;
  confidence: string;
  evidence: string[];
  disproof: string;
};

export type UpdateBeliefInput = EditBeliefContentInput & {
  outcome: BeliefOutcome;
  rulingNote?: string;
};

export type CreateBeliefInput = {
  title: string;
  statement: string;
  category: string;
  confidence: string;
  evidence: string[];
  disproof: string;
};

export type ReorderBeliefsInput = {
  ids: string[];
};

export type BeliefRevisionKind = "created" | "content" | "ruling";

export type BeliefRevision = {
  id: string;
  beliefId: string;
  kind: BeliefRevisionKind;
  snapshot: Belief;
  createdAt: string;
};

export type ChannelSlug = "social" | "podcast" | "community";

export type ChannelInterest = {
  id: string;
  channel: ChannelSlug;
  email: string;
  displayName: string;
  introduction: string;
  categoryInterest: string;
  createdAt: string;
};

export type CreateChannelInterestInput = {
  channel: ChannelSlug;
  email: string;
  displayName?: string;
  introduction?: string;
  categoryInterest?: string;
};
