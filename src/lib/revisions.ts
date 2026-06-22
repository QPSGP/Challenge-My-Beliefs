import {
  readRevisionsJson,
  writeRevisionsJson,
} from "@/lib/persistence";
import type { Belief, BeliefRevision, BeliefRevisionKind } from "@/lib/types";

const MAX_REVISIONS_PER_BELIEF = 25;

function revisionId(): string {
  return `rev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function recordBeliefRevision(
  belief: Belief,
  kind: BeliefRevisionKind,
): Promise<BeliefRevision> {
  const revisions = await readRevisionsJson<BeliefRevision[]>();
  const entry: BeliefRevision = {
    id: revisionId(),
    beliefId: belief.id,
    kind,
    snapshot: { ...belief },
    createdAt: new Date().toISOString(),
  };

  const kept = revisions.filter((revision) => revision.beliefId !== belief.id);
  const forBelief = revisions.filter((revision) => revision.beliefId === belief.id);
  const nextForBelief = [entry, ...forBelief].slice(0, MAX_REVISIONS_PER_BELIEF);

  await writeRevisionsJson([...nextForBelief, ...kept]);
  return entry;
}

export async function getBeliefRevisions(beliefId: string): Promise<BeliefRevision[]> {
  const revisions = await readRevisionsJson<BeliefRevision[]>();
  return revisions
    .filter((revision) => revision.beliefId === beliefId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function contentFieldsChanged(before: Belief, after: Belief): boolean {
  return (
    before.title !== after.title ||
    before.statement !== after.statement ||
    before.category !== after.category ||
    before.confidence !== after.confidence ||
    before.disproof !== after.disproof ||
    JSON.stringify(before.evidence) !== JSON.stringify(after.evidence)
  );
}

export function revisionKindForUpdate(before: Belief, after: Belief): BeliefRevisionKind {
  if (contentFieldsChanged(before, after)) {
    return "content";
  }

  return "ruling";
}
