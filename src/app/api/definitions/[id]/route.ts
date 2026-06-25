import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-errors";
import { isFounderAuthorized } from "@/lib/auth";
import { deleteGlossaryEntry, updateGlossaryEntry } from "@/lib/store";
import type { UpdateGlossaryEntryInput } from "@/lib/types";

type DefinitionRouteProps = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: DefinitionRouteProps) {
  try {
    if (!isFounderAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as UpdateGlossaryEntryInput;
    const entry = await updateGlossaryEntry(id, body);

    if (!entry) {
      return NextResponse.json({ error: "Definition not found" }, { status: 404 });
    }

    return NextResponse.json({ entry });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request, { params }: DefinitionRouteProps) {
  try {
    if (!isFounderAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await deleteGlossaryEntry(id);

    if (!deleted) {
      return NextResponse.json({ error: "Definition not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Definition deleted." });
  } catch (error) {
    return handleApiError(error);
  }
}
