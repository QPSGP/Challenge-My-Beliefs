import { get, put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";

import { isSupabaseConfigured } from "@/lib/supabase/client";
import { isSupabaseSchemaError } from "@/lib/supabase/health";
import {
  supabaseReadBeliefs,
  supabaseReadChallenges,
  supabaseReadRevisions,
  supabaseReadWaitlist,
  supabaseWriteBeliefs,
  supabaseWriteChallenges,
  supabaseWriteRevisions,
  supabaseWriteWaitlist,
} from "@/lib/supabase/storage";
import type {
  Belief,
  BeliefRevision,
  Challenge,
  ChannelInterest,
} from "@/lib/types";

const beliefsPath = path.join(process.cwd(), "data", "beliefs.json");
const challengesPath = path.join(process.cwd(), "data", "challenges.json");
const revisionsPath = path.join(process.cwd(), "data", "belief-revisions.json");
const waitlistPath = path.join(process.cwd(), "data", "waitlist.json");

const BLOB_BELIEFS = "cmb/beliefs.json";
const BLOB_CHALLENGES = "cmb/challenges.json";
const BLOB_REVISIONS = "cmb/belief-revisions.json";
const BLOB_WAITLIST = "cmb/waitlist.json";
const BLOB_ACCESS = "private" as const;

/** IDs from the bundled benevolent-society seed; missing from live storage => stale data. */
const BUNDLE_MARKER_IDS = ["not-means-to-end", "equal-dignity-not-outcomes"] as const;
const MIN_BUNDLE_BELIEFS = 20;

export type PersistenceMode = "supabase" | "vercel-blob" | "local-files";

export class PersistenceNotConfiguredError extends Error {
  constructor() {
    super(
      "Live saves need Supabase or Vercel Blob. See SUPABASE.md or DEPLOY.md, then redeploy.",
    );
    this.name = "PersistenceNotConfiguredError";
  }
}

export class SupabaseSchemaNotReadyError extends Error {
  constructor(detail?: string) {
    super(
      detail ??
        "Supabase tables are missing. Open Supabase → SQL Editor, run supabase/schema.sql from the repo, then try again.",
    );
    this.name = "SupabaseSchemaNotReadyError";
  }
}

function hasBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function isVercelRuntime(): boolean {
  return Boolean(process.env.VERCEL);
}

export function getPersistenceMode(): PersistenceMode {
  if (isSupabaseConfigured()) {
    return "supabase";
  }

  if (hasBlobStorage()) {
    return "vercel-blob";
  }

  return "local-files";
}

export function isBlobStorageConfigured(): boolean {
  return hasBlobStorage();
}

export function isFounderKeyConfigured(): boolean {
  return Boolean(process.env.FOUNDER_KEY);
}

export { isSupabaseConfigured };

async function readLocalJson<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function readLocalJsonOrEmpty<T>(filePath: string, fallback: T): Promise<T> {
  try {
    return await readLocalJson<T>(filePath);
  } catch {
    return fallback;
  }
}

function getBeliefIds(data: unknown): Set<string> {
  if (!Array.isArray(data)) {
    return new Set();
  }

  const ids = new Set<string>();

  for (const item of data) {
    if (
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      typeof (item as { id: unknown }).id === "string"
    ) {
      ids.add((item as { id: string }).id);
    }
  }

  return ids;
}

function isStaleLiveBeliefs(live: unknown, bundled: unknown): boolean {
  if (!Array.isArray(live) || !Array.isArray(bundled)) {
    return false;
  }

  if (bundled.length < MIN_BUNDLE_BELIEFS || live.length >= bundled.length) {
    return false;
  }

  const liveIds = getBeliefIds(live);
  return BUNDLE_MARKER_IDS.some((id) => !liveIds.has(id));
}

export async function readBundledBeliefsJson<T>(): Promise<T> {
  return readLocalJson<T>(beliefsPath);
}

export async function getBundledBeliefCount(): Promise<number> {
  const bundled = await readBundledBeliefsJson<unknown[]>();
  return Array.isArray(bundled) ? bundled.length : 0;
}

async function writeLocalJson<T>(filePath: string, data: T): Promise<void> {
  if (isVercelRuntime() && !hasBlobStorage() && !isSupabaseConfigured()) {
    throw new PersistenceNotConfiguredError();
  }

  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function readBlobJson<T>(pathname: string, localFallbackPath: string): Promise<T> {
  try {
    const result = await get(pathname, { access: BLOB_ACCESS });

    if (!result?.stream) {
      throw new Error("Blob not found");
    }

    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  } catch {
    return readLocalJsonOrEmpty<T>(localFallbackPath, [] as T);
  }
}

async function writeBlobJson<T>(pathname: string, data: T): Promise<void> {
  await put(pathname, `${JSON.stringify(data, null, 2)}\n`, {
    access: BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

async function readLegacyBeliefsJson(): Promise<Belief[]> {
  const bundled = await readBundledBeliefsJson<Belief[]>();

  if (hasBlobStorage()) {
    try {
      const result = await get(BLOB_BELIEFS, { access: BLOB_ACCESS });

      if (result?.stream) {
        const text = await new Response(result.stream).text();
        const live = JSON.parse(text) as Belief[];

        if (isStaleLiveBeliefs(live, bundled)) {
          return bundled;
        }

        return live;
      }
    } catch {
      // Fall through to bundled repo file.
    }
  }

  return bundled;
}

async function readLegacyChallengesJson(): Promise<Challenge[]> {
  if (hasBlobStorage()) {
    return readBlobJson<Challenge[]>(BLOB_CHALLENGES, challengesPath);
  }

  return readLocalJsonOrEmpty<Challenge[]>(challengesPath, []);
}

async function readLegacyRevisionsJson(): Promise<BeliefRevision[]> {
  if (hasBlobStorage()) {
    return readBlobJson<BeliefRevision[]>(BLOB_REVISIONS, revisionsPath);
  }

  return readLocalJsonOrEmpty<BeliefRevision[]>(revisionsPath, []);
}

async function readLegacyWaitlistJson(): Promise<ChannelInterest[]> {
  if (hasBlobStorage()) {
    return readBlobJson<ChannelInterest[]>(BLOB_WAITLIST, waitlistPath);
  }

  return readLocalJsonOrEmpty<ChannelInterest[]>(waitlistPath, []);
}

/** Import source data from JSON/Blob (skips Supabase). Used when migrating to Supabase. */
export async function readLegacyStorageSnapshot(): Promise<{
  beliefs: Belief[];
  challenges: Challenge[];
  revisions: BeliefRevision[];
  waitlist: ChannelInterest[];
}> {
  const [beliefs, challenges, revisions, waitlist] = await Promise.all([
    readLegacyBeliefsJson(),
    readLegacyChallengesJson(),
    readLegacyRevisionsJson(),
    readLegacyWaitlistJson(),
  ]);

  return { beliefs, challenges, revisions, waitlist };
}

async function seedSupabaseBeliefsIfNeeded(live: Belief[]): Promise<Belief[]> {
  const bundled = await readBundledBeliefsJson<Belief[]>();

  if (isStaleLiveBeliefs(live, bundled)) {
    try {
      await supabaseWriteBeliefs(bundled);
    } catch (error) {
      console.error("[persistence] Supabase seed failed:", error);
    }
    return bundled;
  }

  return live;
}

async function readSupabaseBeliefsSafe(): Promise<Belief[]> {
  try {
    const live = await supabaseReadBeliefs();
    return await seedSupabaseBeliefsIfNeeded(live);
  } catch (error) {
    console.error("[persistence] Supabase beliefs read failed, using bundled file:", error);
    return readBundledBeliefsJson<Belief[]>();
  }
}

async function readSupabaseJsonSafe<T>(read: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  try {
    return await read();
  } catch (error) {
    console.error("[persistence] Supabase read failed, using fallback:", error);
    return fallback();
  }
}

async function writeSupabaseOrThrow(write: () => Promise<void>): Promise<void> {
  try {
    await write();
  } catch (writeError) {
    if (isSupabaseSchemaError(writeError)) {
      throw new SupabaseSchemaNotReadyError();
    }
    throw writeError;
  }
}

export async function readBeliefsJson<T>(): Promise<T> {
  if (isSupabaseConfigured()) {
    return (await readSupabaseBeliefsSafe()) as T;
  }

  const bundled = await readBundledBeliefsJson<T>();

  if (hasBlobStorage()) {
    try {
      const result = await get(BLOB_BELIEFS, { access: BLOB_ACCESS });

      if (result?.stream) {
        const text = await new Response(result.stream).text();
        const live = JSON.parse(text) as T;

        if (isStaleLiveBeliefs(live, bundled)) {
          await writeBlobJson(BLOB_BELIEFS, bundled);
          return bundled;
        }

        return live;
      }
    } catch {
      // Fall through to bundled repo file.
    }
  }

  return bundled;
}

export async function writeBeliefsJson<T>(data: T): Promise<void> {
  if (isSupabaseConfigured()) {
    await writeSupabaseOrThrow(() => supabaseWriteBeliefs(data as Belief[]));
    return;
  }

  if (hasBlobStorage()) {
    await writeBlobJson(BLOB_BELIEFS, data);
    return;
  }

  await writeLocalJson(beliefsPath, data);
}

export async function readChallengesJson<T>(): Promise<T> {
  if (isSupabaseConfigured()) {
    return readSupabaseJsonSafe(
      () => supabaseReadChallenges() as Promise<T>,
      () => readLocalJsonOrEmpty<Challenge[]>(challengesPath, []) as Promise<T>,
    );
  }

  if (hasBlobStorage()) {
    return readBlobJson<T>(BLOB_CHALLENGES, challengesPath);
  }

  return readLocalJsonOrEmpty<T>(challengesPath, [] as T);
}

export async function writeChallengesJson<T>(data: T): Promise<void> {
  if (isSupabaseConfigured()) {
    await writeSupabaseOrThrow(() => supabaseWriteChallenges(data as Challenge[]));
    return;
  }

  if (hasBlobStorage()) {
    await writeBlobJson(BLOB_CHALLENGES, data);
    return;
  }

  await writeLocalJson(challengesPath, data);
}

export async function readRevisionsJson<T>(): Promise<T> {
  if (isSupabaseConfigured()) {
    return readSupabaseJsonSafe(
      () => supabaseReadRevisions() as Promise<T>,
      () => readLocalJsonOrEmpty<BeliefRevision[]>(revisionsPath, []) as Promise<T>,
    );
  }

  if (hasBlobStorage()) {
    return readBlobJson<T>(BLOB_REVISIONS, revisionsPath);
  }

  return readLocalJsonOrEmpty<T>(revisionsPath, [] as T);
}

export async function writeRevisionsJson<T>(data: T): Promise<void> {
  if (isSupabaseConfigured()) {
    await writeSupabaseOrThrow(() => supabaseWriteRevisions(data as BeliefRevision[]));
    return;
  }

  if (hasBlobStorage()) {
    await writeBlobJson(BLOB_REVISIONS, data);
    return;
  }

  await writeLocalJson(revisionsPath, data);
}

export async function readWaitlistJson<T>(): Promise<T> {
  if (isSupabaseConfigured()) {
    return readSupabaseJsonSafe(
      () => supabaseReadWaitlist() as Promise<T>,
      () => readLocalJsonOrEmpty<ChannelInterest[]>(waitlistPath, []) as Promise<T>,
    );
  }

  if (hasBlobStorage()) {
    return readBlobJson<T>(BLOB_WAITLIST, waitlistPath);
  }

  return readLocalJsonOrEmpty<T>(waitlistPath, [] as T);
}

export async function writeWaitlistJson<T>(data: T): Promise<void> {
  if (isSupabaseConfigured()) {
    await writeSupabaseOrThrow(() => supabaseWriteWaitlist(data as ChannelInterest[]));
    return;
  }

  if (hasBlobStorage()) {
    await writeBlobJson(BLOB_WAITLIST, data);
    return;
  }

  await writeLocalJson(waitlistPath, data);
}
