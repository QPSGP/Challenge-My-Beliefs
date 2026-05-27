import { NextResponse } from "next/server";

import { isFounderAuthorized } from "@/lib/auth";
import { getBeliefById, updateBelief } from "@/lib/store";
import type { BeliefOutcome, UpdateBeliefInput } from "@/lib/types";

const validOutcomes: BeliefOutcome[] = ["unchanged", "refined", "changed"];

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const belief = await getBeliefById(id);

  if (!belief) {
    return NextResponse.json({ error: "Belief not found" }, { status: 404 });
  }

  return NextResponse.json({ belief });
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!isFounderAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as UpdateBeliefInput;

  if (!body.outcome || !validOutcomes.includes(body.outcome)) {
    return NextResponse.json({ error: "Invalid outcome" }, { status: 400 });
  }

  const belief = await updateBelief(id, {
    outcome: body.outcome,
    rulingNote: body.rulingNote,
  });

  if (!belief) {
    return NextResponse.json({ error: "Belief not found" }, { status: 404 });
  }

  return NextResponse.json({ belief });
}
