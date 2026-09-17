import type { z } from "zod";

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

/**
 * apiGet + 응답 형태를 zod 스키마로 검증. 백엔드 응답이 기대한 형태와 어긋나면
 * 화면 렌더링 중 알 수 없는 곳에서 죽는 대신 여기서 바로 (사용자에게 친숙한 메시지로) 실패한다.
 */
export async function apiGetValidated<T>(
  path: string,
  schema: z.ZodType<T>,
  fallbackErrorMessage: string
): Promise<T> {
  const raw = await apiGet<unknown>(path, fallbackErrorMessage);
  const result = schema.safeParse(raw);
  if (!result.success) throw new Error(fallbackErrorMessage);
  return result.data;
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
