import {
  getBundledBeliefCount,
  getPersistenceMode,
  readBeliefsJson,
  readChallengesJson,
  readRevisionsJson,
  readWaitlistJson,
} from "@/lib/persistence";
import { checkSupabaseHealth, type SupabaseHealth } from "@/lib/supabase/health";

export type SystemStatus = {
  runtime: "local" | "vercel";
  persistence: "local-files" | "vercel-blob" | "supabase";
  supabase: SupabaseHealth;
  blobConfigured: boolean;
  founderKeyRequired: boolean;
  beliefCount: number;
  bundledBeliefCount: number;
  beliefsSynced: boolean;
  challengeCount: number;
  revisionCount: number;
  waitlistCount: number;
};

export async function getSystemStatus(): Promise<SystemStatus> {
  const [beliefs, challenges, revisions, waitlist, bundledBeliefCount, supabase] =
    await Promise.all([
      readBeliefsJson<unknown[]>(),
      readChallengesJson<unknown[]>(),
      readRevisionsJson<unknown[]>(),
      readWaitlistJson<unknown[]>(),
      getBundledBeliefCount(),
      checkSupabaseHealth(),
    ]);

  const beliefCount = Array.isArray(beliefs) ? beliefs.length : 0;
  const persistence = getPersistenceMode();

  return {
    runtime: process.env.VERCEL ? "vercel" : "local",
    persistence,
    supabase,
    blobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    founderKeyRequired: Boolean(process.env.FOUNDER_KEY),
    beliefCount,
    bundledBeliefCount,
    beliefsSynced: beliefCount >= bundledBeliefCount,
    challengeCount: Array.isArray(challenges) ? challenges.length : 0,
    revisionCount: Array.isArray(revisions) ? revisions.length : 0,
    waitlistCount: Array.isArray(waitlist) ? waitlist.length : 0,
  };
}
