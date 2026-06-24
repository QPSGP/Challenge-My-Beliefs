import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-errors";
import { isFounderAuthorized } from "@/lib/auth";
import { isEmailConfigured, sendFounderEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    if (!isFounderAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          error:
            "Email is not configured. Set RESEND_API_KEY and FOUNDER_NOTIFY_EMAIL in Vercel or .env.local, then redeploy.",
        },
        { status: 400 },
      );
    }

    const sent = await sendFounderEmail({
      subject: "Challenge My Beliefs — test alert",
      text: [
        "This is a test email from Challenge My Beliefs.",
        "",
        "If you received this, founder alerts are working for:",
        "- New challenges",
        "- Community, podcast, and social waitlist signups",
        "",
        "Admin: https://challenge-my-beliefs.vercel.app/admin",
      ].join("\n"),
    });

    if (!sent) {
      return NextResponse.json(
        { error: "Resend rejected the email. Check RESEND_API_KEY and your Resend account." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message: `Test email sent to ${process.env.FOUNDER_NOTIFY_EMAIL?.trim()}.`,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
