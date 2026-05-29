import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-errors";
import { isFounderAuthorized } from "@/lib/auth";
import { readBundledBeliefsJson, writeBeliefsJson } from "@/lib/persistence";
import type { Belief } from "@/lib/types";

export async function POST(request: Request) {
  try {
    if (!isFounderAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const beliefs = await readBundledBeliefsJson<Belief[]>();
    await writeBeliefsJson(beliefs);

    return NextResponse.json({ beliefs, count: beliefs.length });
  } catch (error) {
    return handleApiError(error);
  }
}
