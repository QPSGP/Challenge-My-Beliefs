import { get, put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";

const beliefsPath = path.join(process.cwd(), "data", "beliefs.json");
const challengesPath = path.join(process.cwd(), "data", "challenges.json");

const BLOB_BELIEFS = "cmb/beliefs.json";
const BLOB_CHALLENGES = "cmb/challenges.json";
const BLOB_ACCESS = "private" as const;

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
  if (hasBlobStorage()) {
    return readBlobJson<T>(BLOB_BELIEFS, beliefsPath);
  }

  return readLocalJson<T>(beliefsPath);
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
