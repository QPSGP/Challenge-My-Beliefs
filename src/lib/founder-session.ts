import { createHmac, timingSafeEqual } from "crypto";

export const FOUNDER_SESSION_COOKIE = "cmb_founder_session";
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

function getSessionSecret(): string {
  return (
    process.env.FOUNDER_SESSION_SECRET?.trim() ||
    process.env.FOUNDER_KEY?.trim() ||
    "local-dev-founder-session"
  );
}

export function createFounderSessionToken(): string {
  const exp = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = JSON.stringify({ exp });
  const signature = createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
  return Buffer.from(`${payload}.${signature}`).toString("base64url");
}

export function verifyFounderSessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const separator = decoded.lastIndexOf(".");

    if (separator === -1) {
      return false;
    }

    const payload = decoded.slice(0, separator);
    const signature = decoded.slice(separator + 1);
    const expected = createHmac("sha256", getSessionSecret()).update(payload).digest("hex");

    if (signature.length !== expected.length) {
      return false;
    }

    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return false;
    }

    const parsed = JSON.parse(payload) as { exp?: number };

    return typeof parsed.exp === "number" && Date.now() < parsed.exp;
  } catch {
    return false;
  }
}

export function getFounderSessionTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return null;
  }

  for (const part of cookieHeader.split(";")) {
    const [name, ...rest] = part.trim().split("=");

    if (name === FOUNDER_SESSION_COOKIE) {
      return decodeURIComponent(rest.join("="));
    }
  }

  return null;
}

export function isFounderSessionValid(request: Request): boolean {
  const token = getFounderSessionTokenFromRequest(request);

  if (!token) {
    return false;
  }

  return verifyFounderSessionToken(token);
}

export function getFounderSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

export function isFounderKeyConfigured(): boolean {
  return Boolean(process.env.FOUNDER_KEY?.trim());
}

export function verifyFounderKey(candidate: string): boolean {
  const founderKey = process.env.FOUNDER_KEY?.trim();

  if (!founderKey) {
    return true;
  }

  return candidate.trim() === founderKey;
}
