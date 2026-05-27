export function isFounderAuthorized(request: Request): boolean {
  const founderKey = process.env.FOUNDER_KEY;

  if (!founderKey) {
    return true;
  }

  const headerKey = request.headers.get("x-founder-key");
  return headerKey === founderKey;
}
