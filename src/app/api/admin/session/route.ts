import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-errors";
import {
  createFounderSessionToken,
  FOUNDER_SESSION_COOKIE,
  getFounderSessionCookieOptions,
  isFounderKeyConfigured,
  isFounderSessionValid,
  verifyFounderKey,
} from "@/lib/founder-session";

export async function GET(request: Request) {
  const keyRequired = isFounderKeyConfigured();

  return NextResponse.json({
    keyRequired,
    signedIn: keyRequired ? isFounderSessionValid(request) : true,
  });
}

export async function POST(request: Request) {
  try {
    if (!isFounderKeyConfigured()) {
      return NextResponse.json({
        message: "Founder key is not required in this environment.",
        signedIn: true,
      });
    }

    const body = (await request.json()) as { key?: string };

    if (!verifyFounderKey(body.key ?? "")) {
      return NextResponse.json({ error: "Invalid founder key" }, { status: 401 });
    }

    const response = NextResponse.json({ message: "Signed in.", signedIn: true });
    response.cookies.set(
      FOUNDER_SESSION_COOKIE,
      createFounderSessionToken(),
      getFounderSessionCookieOptions(),
    );

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE() {
  const response = NextResponse.json({ message: "Signed out.", signedIn: false });
  response.cookies.set(FOUNDER_SESSION_COOKIE, "", {
    ...getFounderSessionCookieOptions(),
    maxAge: 0,
  });

  return response;
}
