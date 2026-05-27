export function getFounderKey(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem("founderKey") ?? "";
}

export function setFounderKey(value: string) {
  window.localStorage.setItem("founderKey", value);
}

export function founderHeaders(extraKey = ""): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const key = extraKey || getFounderKey();

  if (key) {
    headers["x-founder-key"] = key;
  }

  return headers;
}
