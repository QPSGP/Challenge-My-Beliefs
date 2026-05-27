import { NextResponse } from "next/server";

import { isFounderAuthorized } from "@/lib/auth";
import { createChallenge, getChallenges, markChallengeReviewed } from "@/lib/store";
import type { CreateChallengeInput } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const beliefId = searchParams.get("beliefId") ?? undefined;
  const challenges = await getChallenges(beliefId);

  return NextResponse.json({ challenges });
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateChallengeInput;

  if (!body.beliefId?.trim()) {
    return NextResponse.json({ error: "beliefId is required" }, { status: 400 });
  }

  if (!body.argument?.trim() || !body.evidence?.trim() || !body.context?.trim()) {
    return NextResponse.json(
      { error: "argument, evidence, and context are required" },
      { status: 400 },
    );
  }

  try {
    const challenge = await createChallenge(body);
    return NextResponse.json({ challenge }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Belief not found" }, { status: 404 });
  }
}

export async function PATCH(request: Request) {
  if (!isFounderAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { id?: string };

  if (!body.id?.trim()) {
    return NextResponse.json({ error: "Challenge id is required" }, { status: 400 });
  }

  const challenge = await markChallengeReviewed(body.id);

  if (!challenge) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
  }

  return NextResponse.json({ challenge });
}
