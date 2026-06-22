import { get, put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";

const beliefsPath = path.join(process.cwd(), "data", "beliefs.json");
const challengesPath = path.join(process.cwd(), "data", "challenges.json");
const revisionsPath = path.join(process.cwd(), "data", "belief-revisions.json");
const waitlistPath = path.join(process.cwd(), "data", "waitlist.json");

const BLOB_BELIEFS = "cmb/beliefs.json";
const BLOB_CHALLENGES = "cmb/challenges.json";
const BLOB_REVISIONS = "cmb/belief-revisions.json";
const BLOB_WAITLIST = "cmb/waitlist.json";
const BLOB_ACCESS = "private" as const;

/** IDs from the bundled benevolent-society seed; missing from live blob => stale data. */
const BUNDLE_MARKER_IDS = ["not-means-to-end", "equal-dignity-not-outcomes"] as const;
const MIN_BUNDLE_BELIEFS = 20;

export class PersistenceNotConfiguredError extends Error {
  constructor() {
    super(
      "Live saves need Vercel Blob. In Vercel: Storage → Create Blob → connect to this project, then redeploy.",
    );
    this.name = "PersistenceNotConfiguredError";
  }
}

function hasBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function isVercelRuntime(): boolean {
  return Boolean(process.env.VERCEL);
}

async function readLocalJson<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
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
  if (isVercelRuntime() && !hasBlobStorage()) {
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
    // Read from bundled repo files when blob is empty or unavailable.
    return readLocalJson<T>(localFallbackPath);
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

export async function readBeliefsJson<T>(): Promise<T> {
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
  if (hasBlobStorage()) {
    await writeBlobJson(BLOB_BELIEFS, data);
    return;
  }

  await writeLocalJson(beliefsPath, data);
}

export async function readChallengesJson<T>(): Promise<T> {
  if (hasBlobStorage()) {
    return readBlobJson<T>(BLOB_CHALLENGES, challengesPath);
  }

  return readLocalJson<T>(challengesPath);
}

export async function writeChallengesJson<T>(data: T): Promise<void> {
  if (hasBlobStorage()) {
    await writeBlobJson(BLOB_CHALLENGES, data);
    return;
  }

  await writeLocalJson(challengesPath, data);
}

export async function readRevisionsJson<T>(): Promise<T> {
  if (hasBlobStorage()) {
    return readBlobJson<T>(BLOB_REVISIONS, revisionsPath);
  }

  try {
    return await readLocalJson<T>(revisionsPath);
  } catch {
    return [] as T;
  }
}

export async function writeRevisionsJson<T>(data: T): Promise<void> {
  if (hasBlobStorage()) {
    await writeBlobJson(BLOB_REVISIONS, data);
    return;
  }

  await writeLocalJson(revisionsPath, data);
}

export async function readWaitlistJson<T>(): Promise<T> {
  if (hasBlobStorage()) {
    return readBlobJson<T>(BLOB_WAITLIST, waitlistPath);
  }

  try {
    return await readLocalJson<T>(waitlistPath);
  } catch {
    return [] as T;
  }
}

export async function writeWaitlistJson<T>(data: T): Promise<void> {
  if (hasBlobStorage()) {
    await writeBlobJson(BLOB_WAITLIST, data);
    return;
  }

  await writeLocalJson(waitlistPath, data);
}

export function isBlobStorageConfigured(): boolean {
  return hasBlobStorage();
}

export function isFounderKeyConfigured(): boolean {
  return Boolean(process.env.FOUNDER_KEY);
}
