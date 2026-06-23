import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-errors";
import { isFounderAuthorized } from "@/lib/auth";
import { readBundledBeliefsJson, writeBeliefsJson } from "@/lib/persistence";
import { checkSupabaseHealth } from "@/lib/supabase/health";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  isPostgresDirectConfigured,
  postgresTablesExist,
  runDatabaseSchema,
  waitForSupabaseTablesReady,
} from "@/lib/supabase/run-schema";
import type { Belief } from "@/lib/types";

export async function POST(request: Request) {
  try {
    if (!isFounderAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isSupabaseConfigured() && !isPostgresDirectConfigured()) {
      return NextResponse.json(
        { error: "Supabase is not connected. Attach Supabase to this Vercel project first." },
        { status: 400 },
      );
    }

    let schemaResult: { statementsRun: number } | null = null;
    const tablesExistBefore = isPostgresDirectConfigured()
      ? await postgresTablesExist()
      : false;

    if (!tablesExistBefore) {
      if (!isPostgresDirectConfigured()) {
        return NextResponse.json(
          {
            error:
              "Database tables are missing and POSTGRES_URL is not available. In Vercel: Storage → Supabase → connect to this project, then redeploy. Locally: add POSTGRES_URL to .env.local (Supabase → Settings → Database → connection string).",
          },
          { status: 503 },
        );
      }

      schemaResult = await runDatabaseSchema();
      const ready = await waitForSupabaseTablesReady();

      if (!ready) {
        return NextResponse.json(
          {
            error:
              "Tables were created but Supabase has not refreshed yet. Wait 30 seconds and click the button again.",
            schemaResult,
          },
          { status: 503 },
        );
      }
    }

    const healthAfter = await checkSupabaseHealth();

    if (!healthAfter.tablesReady) {
      return NextResponse.json(
        {
          error:
            healthAfter.error ??
            "Tables still not ready. Wait 30 seconds and try again, or run supabase/schema.sql in Supabase SQL Editor.",
          schemaResult,
        },
        { status: 503 },
      );
    }

    const bundled = await readBundledBeliefsJson<Belief[]>();
    await writeBeliefsJson(bundled);

    return NextResponse.json({
      message: "Database ready and benevolent society beliefs loaded.",
      schemaResult,
      beliefCount: bundled.length,
      tablesReady: true,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
