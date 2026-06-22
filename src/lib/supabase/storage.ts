import { getSupabaseAdmin } from "@/lib/supabase/client";
import {
  beliefToRow,
  challengeToRow,
  revisionToRow,
  rowToBelief,
  rowToChallenge,
  rowToRevision,
  rowToWaitlist,
  waitlistToRow,
  type BeliefRow,
} from "@/lib/supabase/mappers";
import type {
  Belief,
  BeliefRevision,
  Challenge,
  ChannelInterest,
} from "@/lib/types";

function throwOnError(error: { message: string } | null): void {
  if (error) {
    throw new Error(error.message);
  }
}

async function deleteMissingIds(table: "beliefs" | "challenges" | "belief_revisions" | "channel_waitlist", keepIds: string[]): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from(table).select("id");

  throwOnError(error);

  const toDelete = (data ?? [])
    .map((row) => row.id as string)
    .filter((id) => !keepIds.includes(id));

  if (toDelete.length === 0) {
    return;
  }

  const { error: deleteError } = await supabase.from(table).delete().in("id", toDelete);
  throwOnError(deleteError);
}

export async function supabaseReadBeliefs(): Promise<Belief[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("beliefs")
    .select("*")
    .order("sort_order", { ascending: true });

  throwOnError(error);
  return ((data ?? []) as BeliefRow[]).map(rowToBelief);
}

export async function supabaseWriteBeliefs(beliefs: Belief[]): Promise<void> {
  const supabase = getSupabaseAdmin();
  const rows = beliefs.map((belief, index) => beliefToRow(belief, index));

  if (rows.length > 0) {
    const { error } = await supabase.from("beliefs").upsert(rows);
    throwOnError(error);
  }

  await deleteMissingIds("beliefs", beliefs.map((belief) => belief.id));
}

export async function supabaseReadChallenges(): Promise<Challenge[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .order("created_at", { ascending: false });

  throwOnError(error);
  return (data ?? []).map((row) => rowToChallenge(row as never));
}

export async function supabaseWriteChallenges(challenges: Challenge[]): Promise<void> {
  const supabase = getSupabaseAdmin();
  const rows = challenges.map(challengeToRow);

  if (rows.length > 0) {
    const { error } = await supabase.from("challenges").upsert(rows);
    throwOnError(error);
  }

  await deleteMissingIds("challenges", challenges.map((challenge) => challenge.id));
}

export async function supabaseReadRevisions(): Promise<BeliefRevision[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("belief_revisions")
    .select("*")
    .order("created_at", { ascending: false });

  throwOnError(error);
  return (data ?? []).map((row) => rowToRevision(row as never));
}

export async function supabaseWriteRevisions(revisions: BeliefRevision[]): Promise<void> {
  const supabase = getSupabaseAdmin();
  const rows = revisions.map(revisionToRow);

  if (rows.length > 0) {
    const { error } = await supabase.from("belief_revisions").upsert(rows);
    throwOnError(error);
  }

  await deleteMissingIds("belief_revisions", revisions.map((revision) => revision.id));
}

export async function supabaseReadWaitlist(): Promise<ChannelInterest[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("channel_waitlist")
    .select("*")
    .order("created_at", { ascending: false });

  throwOnError(error);
  return (data ?? []).map((row) => rowToWaitlist(row as never));
}

export async function supabaseWriteWaitlist(entries: ChannelInterest[]): Promise<void> {
  const supabase = getSupabaseAdmin();
  const rows = entries.map(waitlistToRow);

  if (rows.length > 0) {
    const { error } = await supabase.from("channel_waitlist").upsert(rows);
    throwOnError(error);
  }

  await deleteMissingIds("channel_waitlist", entries.map((entry) => entry.id));
}

export async function supabaseInsertWaitlistEntry(entry: ChannelInterest): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("channel_waitlist").insert(waitlistToRow(entry));

  if (error?.code === "23505") {
    throw new Error("You are already on the waitlist for this channel");
  }

  throwOnError(error);
}

export type SupabaseImportCounts = {
  beliefs: number;
  challenges: number;
  revisions: number;
  waitlist: number;
};

export async function supabaseImportAll(input: {
  beliefs: Belief[];
  challenges: Challenge[];
  revisions: BeliefRevision[];
  waitlist: ChannelInterest[];
}): Promise<SupabaseImportCounts> {
  await supabaseWriteBeliefs(input.beliefs);
  await supabaseWriteChallenges(input.challenges);
  await supabaseWriteRevisions(input.revisions);
  await supabaseWriteWaitlist(input.waitlist);

  return {
    beliefs: input.beliefs.length,
    challenges: input.challenges.length,
    revisions: input.revisions.length,
    waitlist: input.waitlist.length,
  };
}
