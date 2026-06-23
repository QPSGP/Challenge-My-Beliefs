import postgres from "postgres";

import { DATABASE_SCHEMA_STATEMENTS, REQUIRED_TABLES } from "@/lib/supabase/schema";

export function getPostgresConnectionUrl(): string | undefined {
  const direct =
    process.env.POSTGRES_URL_NON_POOLING ??
    process.env.POSTGRES_URL ??
    process.env.DATABASE_URL ??
    process.env.SUPABASE_DB_URL;

  if (direct) {
    return direct;
  }

  const host = process.env.POSTGRES_HOST;
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const database = process.env.POSTGRES_DATABASE ?? "postgres";
  const port = process.env.POSTGRES_PORT ?? "5432";

  if (host && user && password) {
    return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
  }

  return undefined;
}

export function isPostgresDirectConfigured(): boolean {
  return Boolean(getPostgresConnectionUrl());
}

function createPostgresClient(connectionString: string) {
  return postgres(connectionString, {
    ssl: "require",
    max: 1,
    idle_timeout: 20,
    connect_timeout: 30,
    prepare: false,
  });
}

export async function postgresTablesExist(): Promise<boolean> {
  const connectionString = getPostgresConnectionUrl();
  if (!connectionString) {
    return false;
  }

  const sql = createPostgresClient(connectionString);

  try {
    const rows = await sql<{ table_name: string }[]>`
      select table_name
      from information_schema.tables
      where table_schema = 'public'
        and table_name = any(${REQUIRED_TABLES as unknown as string[]})
    `;

    return REQUIRED_TABLES.every((table) =>
      rows.some((row) => row.table_name === table),
    );
  } finally {
    await sql.end({ timeout: 5 });
  }
}

export async function runDatabaseSchema(): Promise<{ statementsRun: number }> {
  const connectionString = getPostgresConnectionUrl();

  if (!connectionString) {
    throw new Error(
      "No Postgres connection URL found. In Vercel, attach Supabase to this project (injects POSTGRES_URL). Locally, add POSTGRES_URL to .env.local from Supabase → Settings → Database.",
    );
  }

  const sql = createPostgresClient(connectionString);

  try {
    for (const statement of DATABASE_SCHEMA_STATEMENTS) {
      await sql.unsafe(statement);
    }
  } finally {
    await sql.end({ timeout: 5 });
  }

  return { statementsRun: DATABASE_SCHEMA_STATEMENTS.length };
}

export async function waitForSupabaseTablesReady(
  maxAttempts = 8,
  delayMs = 750,
): Promise<boolean> {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    if (await postgresTablesExist()) {
      return true;
    }

    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  return postgresTablesExist();
}
