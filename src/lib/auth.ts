import {
  isFounderKeyConfigured,
  isFounderSessionValid,
  verifyFounderKey,
} from "@/lib/founder-session";

export function isFounderAuthorized(request: Request): boolean {
  if (!isFounderKeyConfigured()) {
    return true;
  }

  if (isFounderSessionValid(request)) {
    return true;
  }

  const headerKey = request.headers.get("x-founder-key") ?? "";
  return verifyFounderKey(headerKey);
}
