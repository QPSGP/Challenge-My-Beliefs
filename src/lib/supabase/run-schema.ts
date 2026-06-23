import { promises as fs } from "node:fs";
import path from "node:path";

import postgres from "postgres";

export function getPostgresConnectionUrl(): string | undefined {
  return (
    process.env.POSTGRES_URL_NON_POOLING ??
    process.env.POSTGRES_URL ??
    process.env.DATABASE_URL
  );
}

export function isPostgresDirectConfigured(): boolean {
  return Boolean(getPostgresConnectionUrl());
}

function splitSqlStatements(sql: string): string[] {
  return sql
    .split(";")
    .map((statement) =>
      statement
        .split("\n")
        .filter((line) => !line.trim().startsWith("--"))
        .join("\n")
        .trim(),
    )
    .filter((statement) => statement.length > 0);
}

export async function runDatabaseSchema(): Promise<{ statementsRun: number }> {
  const connectionString = getPostgresConnectionUrl();

  if (!connectionString) {
    throw new Error(
      "No Postgres connection URL found. Vercel should inject POSTGRES_URL when Supabase is attached.",
    );
  }

  const schemaPath = path.join(process.cwd(), "supabase", "schema.sql");
  const raw = await fs.readFile(schemaPath, "utf8");
  const statements = splitSqlStatements(raw);

  const sql = postgres(connectionString, {
    ssl: "require",
    max: 1,
    idle_timeout: 20,
    connect_timeout: 30,
  });

  try {
    for (const statement of statements) {
      await sql.unsafe(statement);
    }
  } finally {
    await sql.end({ timeout: 5 });
  }

  return { statementsRun: statements.length };
}
