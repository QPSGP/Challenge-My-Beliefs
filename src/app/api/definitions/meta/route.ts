import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-errors";
import { isFounderAuthorized } from "@/lib/auth";
import { resetDefinitionsToSeed, updateDefinitionsIntro } from "@/lib/store";

export async function PATCH(request: Request) {
  try {
    if (!isFounderAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { intro?: string; resetToSeed?: boolean };

    if (body.resetToSeed) {
      const document = await resetDefinitionsToSeed();
      return NextResponse.json({ document, message: "Definitions restored to the default glossary." });
    }

    if (body.intro === undefined) {
      return NextResponse.json({ error: "intro or resetToSeed is required" }, { status: 400 });
    }

    const document = await updateDefinitionsIntro(body.intro);
    return NextResponse.json({ document });
  } catch (error) {
    return handleApiError(error);
  }
}
