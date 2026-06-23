import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-errors";
import { isFounderAuthorized } from "@/lib/auth";
import { readBundledBeliefsJson, writeBeliefsJson } from "@/lib/persistence";
import { checkSupabaseHealth } from "@/lib/supabase/health";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { isPostgresDirectConfigured, runDatabaseSchema } from "@/lib/supabase/run-schema";
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
    const healthBefore = await checkSupabaseHealth();

    if (!healthBefore.tablesReady) {
      if (!isPostgresDirectConfigured()) {
        return NextResponse.json(
          {
            error:
              "Database tables are missing and POSTGRES_URL is not available. In Vercel, confirm Supabase is attached to this project, then redeploy.",
          },
          { status: 503 },
        );
      }

      schemaResult = await runDatabaseSchema();
    }

    const healthAfter = await checkSupabaseHealth();

    if (!healthAfter.tablesReady) {
      return NextResponse.json(
        {
          error: healthAfter.error ?? "Tables still not ready after schema setup.",
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
