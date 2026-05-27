import { NextResponse } from "next/server";

import { isFounderAuthorized } from "@/lib/auth";
import { reorderBeliefs } from "@/lib/store";
import type { ReorderBeliefsInput } from "@/lib/types";

export async function PUT(request: Request) {
  if (!isFounderAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as ReorderBeliefsInput;

  if (!Array.isArray(body.ids) || body.ids.length === 0) {
    return NextResponse.json({ error: "ids array is required" }, { status: 400 });
  }

  try {
    const beliefs = await reorderBeliefs(body.ids);
    return NextResponse.json({ beliefs });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not reorder beliefs";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
