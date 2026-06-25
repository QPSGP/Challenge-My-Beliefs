import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-errors";
import { isFounderAuthorized } from "@/lib/auth";
import { createGlossaryEntry, getDefinitionsDocument } from "@/lib/store";
import type { CreateGlossaryEntryInput } from "@/lib/types";

export async function GET() {
  try {
    const document = await getDefinitionsDocument();
    return NextResponse.json(document);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    if (!isFounderAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as CreateGlossaryEntryInput;
    const entry = await createGlossaryEntry(body);

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
