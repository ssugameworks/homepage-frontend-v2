export type KVNamespace = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>;
  delete: (key: string) => Promise<void>;
};

export class SubmitLockedError extends Error {
  constructor() {
    super("이미 처리 중인 요청이 있어요. 잠시 후 다시 시도해 주세요");
    this.name = "SubmitLockedError";
  }
}

const LOCK_TTL_SECONDS = 30;

/**
 * Cloudflare KV는 compare-and-swap을 지원하지 않아 완전한 원자적 락은 아니다.
 * get→put 사이의 경합 창을 Notion 조회+쓰기 왕복(수백 ms~1s) 대신 KV 왕복(수십 ms) 수준으로
 * 크게 좁혀, 동시 제출로 인한 Notion 중복 페이지 생성 가능성을 실질적으로 낮춘다.
 */
export async function withSubmitLock<T>(
  kv: KVNamespace | undefined | null,
  key: string,
  fn: () => Promise<T>
): Promise<T> {
  if (!kv) {
    console.warn("[Lock] SUBMIT_LOCKS KV namespace is not bound. Proceeding without distributed lock.");
    return await fn();
  }

  const lockKey = `submit-lock:${key}`;
  const existing = await kv.get(lockKey);
  if (existing) throw new SubmitLockedError();

  await kv.put(lockKey, "1", { expirationTtl: LOCK_TTL_SECONDS });
  try {
    return await fn();
  } finally {
    await kv.delete(lockKey);
  }
}

