import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-errors";
import { createChannelInterest } from "@/lib/store";
import type { ChannelSlug, CreateChannelInterestInput } from "@/lib/types";

const validChannels: ChannelSlug[] = ["social", "podcast", "community"];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateChannelInterestInput;

    if (!validChannels.includes(body.channel)) {
      return NextResponse.json({ error: "Invalid channel" }, { status: 400 });
    }

    if (!body.email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await createChannelInterest(body);

    return NextResponse.json({
      message: "You are on the waitlist. We will notify you when this channel launches.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
