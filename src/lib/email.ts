const DEFAULT_SITE_URL = "https://challenge-my-beliefs.vercel.app";

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : DEFAULT_SITE_URL)
  );
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.FOUNDER_NOTIFY_EMAIL?.trim());
}

type SendEmailInput = {
  subject: string;
  text: string;
};

export async function sendFounderEmail(input: SendEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.FOUNDER_NOTIFY_EMAIL?.trim();

  if (!apiKey || !to) {
    return false;
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ?? "Challenge My Beliefs <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: input.subject,
      text: input.text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("Founder email failed:", detail);
    return false;
  }

  return true;
}

export async function notifyFounderNewChallenge(input: {
  beliefTitle: string;
  beliefId: string;
  challengerName: string;
  argument: string;
  evidence: string;
}): Promise<void> {
  const siteUrl = getSiteUrl();

  await sendFounderEmail({
    subject: `New challenge: ${input.beliefTitle}`,
    text: [
      "A new challenge was submitted on Challenge My Beliefs.",
      "",
      `Belief: ${input.beliefTitle}`,
      `Challenger: ${input.challengerName}`,
      "",
      "Argument:",
      input.argument,
      "",
      "Evidence:",
      input.evidence,
      "",
      `Review in admin: ${siteUrl}/admin`,
      `Belief page: ${siteUrl}/beliefs/${input.beliefId}`,
    ].join("\n"),
  });
}

export async function notifyFounderWaitlistSignup(input: {
  channel: string;
  email: string;
  displayName?: string;
  categoryInterest?: string;
  introduction?: string;
}): Promise<void> {
  const siteUrl = getSiteUrl();
  const channelLabel = input.channel.charAt(0).toUpperCase() + input.channel.slice(1);

  const lines = [
    `New ${channelLabel} signup on Challenge My Beliefs.`,
    "",
    `Email: ${input.email}`,
  ];

  if (input.displayName?.trim()) {
    lines.push(`Name: ${input.displayName.trim()}`);
  }

  if (input.categoryInterest?.trim()) {
    lines.push(`Category interest: ${input.categoryInterest.trim()}`);
  }

  if (input.introduction?.trim()) {
    lines.push("", "Introduction:", input.introduction.trim());
  }

  lines.push("", `View waitlists: ${siteUrl}/admin`);

  await sendFounderEmail({
    subject: `New ${channelLabel} signup: ${input.email}`,
    text: lines.join("\n"),
  });
}
