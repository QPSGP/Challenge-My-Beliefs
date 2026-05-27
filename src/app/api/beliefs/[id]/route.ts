import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-errors";
import { isFounderAuthorized } from "@/lib/auth";
import {
  deleteBelief,
  getBeliefById,
  updateBelief,
  updateBeliefRuling,
} from "@/lib/store";
import type { BeliefOutcome, UpdateBeliefInput, UpdateBeliefRulingInput } from "@/lib/types";

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
  try {
    if (!isFounderAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = (await request.json()) as UpdateBeliefRulingInput;

    if (!body.outcome || !validOutcomes.includes(body.outcome)) {
      return NextResponse.json({ error: "Invalid outcome" }, { status: 400 });
    }

    const belief = await updateBeliefRuling(id, {
      outcome: body.outcome,
      rulingNote: body.rulingNote,
    });

    if (!belief) {
      return NextResponse.json({ error: "Belief not found" }, { status: 404 });
    }

    return NextResponse.json({ belief });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    if (!isFounderAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = (await request.json()) as UpdateBeliefInput;

    if (!body.title?.trim() || !body.statement?.trim()) {
      return NextResponse.json({ error: "title and statement are required" }, { status: 400 });
    }

    if (!body.outcome || !validOutcomes.includes(body.outcome)) {
      return NextResponse.json({ error: "Invalid outcome" }, { status: 400 });
    }

    const belief = await updateBelief(id, {
      title: body.title,
      statement: body.statement,
      confidence: body.confidence ?? "Medium",
      evidence: Array.isArray(body.evidence) ? body.evidence : [],
      disproof: body.disproof ?? "",
      outcome: body.outcome,
      rulingNote: body.rulingNote,
    });

    if (!belief) {
      return NextResponse.json({ error: "Belief not found" }, { status: 404 });
    }

    return NextResponse.json({ belief });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    if (!isFounderAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const deleted = await deleteBelief(id);

    if (!deleted) {
      return NextResponse.json({ error: "Belief not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
