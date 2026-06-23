import { NextResponse } from "next/server";

import { PersistenceNotConfiguredError, SupabaseSchemaNotReadyError } from "@/lib/persistence";

export function handleApiError(error: unknown) {
  if (error instanceof PersistenceNotConfiguredError) {
    return NextResponse.json({ error: error.message }, { status: 503 });
  }

  if (error instanceof SupabaseSchemaNotReadyError) {
    return NextResponse.json({ error: error.message }, { status: 503 });
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
}
