import { getSupabaseAdmin, getSupabaseServiceKey, getSupabaseUrl, isSupabaseConfigured } from "@/lib/supabase/client";

export type SupabaseConfigStatus = {
  hasUrl: boolean;
  hasServiceKey: boolean;
  configured: boolean;
};

export type SupabaseHealth = {
  configured: boolean;
  config: SupabaseConfigStatus;
  tablesReady: boolean;
  beliefCount: number | null;
  error: string | null;
};

export function getSupabaseConfigStatus(): SupabaseConfigStatus {
  const hasUrl = Boolean(getSupabaseUrl());
  const hasServiceKey = Boolean(getSupabaseServiceKey());

  return {
    hasUrl,
    hasServiceKey,
    configured: hasUrl && hasServiceKey,
  };
}

function isMissingTableMessage(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    lower.includes("does not exist") ||
    lower.includes("could not find the table") ||
    lower.includes("42p01")
  );
}

export async function checkSupabaseHealth(): Promise<SupabaseHealth> {
  const config = getSupabaseConfigStatus();

  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      config,
      tablesReady: false,
      beliefCount: null,
      error: config.hasUrl
        ? "Supabase URL is set but the server key is missing. Add SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY in Vercel."
        : "Supabase is not configured.",
    };
  }

  try {
    const supabase = getSupabaseAdmin();
    const { count, error } = await supabase
      .from("beliefs")
      .select("id", { count: "exact", head: true });

    if (error) {
      return {
        configured: true,
        config,
        tablesReady: !isMissingTableMessage(error.message),
        beliefCount: null,
        error: isMissingTableMessage(error.message)
          ? "Database tables are missing. Run supabase/schema.sql in the Supabase SQL Editor."
          : error.message,
      };
    }

    return {
      configured: true,
      config,
      tablesReady: true,
      beliefCount: count ?? 0,
      error: null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Supabase error";
    return {
      configured: true,
      config,
      tablesReady: false,
      beliefCount: null,
      error: message,
    };
  }
}

export function isSupabaseSchemaError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return isMissingTableMessage(error.message);
}
