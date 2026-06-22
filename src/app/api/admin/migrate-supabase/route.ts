import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-errors";
import { isFounderAuthorized } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { supabaseImportAll } from "@/lib/supabase/storage";
import { readLegacyStorageSnapshot } from "@/lib/persistence";

export async function POST(request: Request) {
  try {
    if (!isFounderAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." },
        { status: 400 },
      );
    }

    const snapshot = await readLegacyStorageSnapshot();
    const counts = await supabaseImportAll(snapshot);

    return NextResponse.json({
      message: "Imported legacy data into Supabase.",
      counts,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
