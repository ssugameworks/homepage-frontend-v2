const API_BASE = "/api";

async function request<T>(
  path: string,
  init: RequestInit | undefined,
  fallbackErrorMessage: string
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, init);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? fallbackErrorMessage);
  }
  return res.json();
}

export function apiGet<T>(path: string, fallbackErrorMessage: string): Promise<T> {
  return request<T>(path, undefined, fallbackErrorMessage);
}

export function apiPost<T = unknown>(
  path: string,
  body: unknown,
  fallbackErrorMessage: string
): Promise<T> {
  return request<T>(
    path,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    fallbackErrorMessage
  );
}
