import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-errors";
import { isFounderAuthorized } from "@/lib/auth";
import { filterBeliefsByCategory } from "@/lib/categories";
import { createBelief, getBeliefs } from "@/lib/store";
import type { CreateBeliefInput } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const beliefs = filterBeliefsByCategory(await getBeliefs(), category);

  return NextResponse.json({ beliefs });
}

export async function POST(request: Request) {
  try {
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
      category: body.category ?? "Uncategorized",
      confidence: body.confidence ?? "Medium",
      evidence: Array.isArray(body.evidence) ? body.evidence : [],
      disproof: body.disproof ?? "",
    });

    return NextResponse.json({ belief }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
