import { NextResponse } from "next/server";

import { isFounderAuthorized } from "@/lib/auth";
import { createBelief, getBeliefs } from "@/lib/store";
import type { CreateBeliefInput } from "@/lib/types";

export async function GET() {
  const beliefs = await getBeliefs();
  return NextResponse.json({ beliefs });
}

export async function POST(request: Request) {
  if (!isFounderAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as CreateBeliefInput;

  if (!body.title?.trim() || !body.statement?.trim()) {
    return NextResponse.json({ error: "title and statement are required" }, { status: 400 });
  }

  const belief = await createBelief({
    title: body.title,
    statement: body.statement,
    confidence: body.confidence ?? "Medium",
    evidence: Array.isArray(body.evidence) ? body.evidence : [],
    disproof: body.disproof ?? "",
  });

  return NextResponse.json({ belief }, { status: 201 });
}
