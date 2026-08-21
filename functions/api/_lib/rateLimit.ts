import type { KVNamespace } from "./lock";

export class RateLimitedError extends Error {
  constructor() {
    super("요청이 너무 많아요. 잠시 후 다시 시도해 주세요");
    this.name = "RateLimitedError";
  }
}

/**
 * 고정 윈도우 방식의 단순 rate limit. KV는 compare-and-swap을 지원하지 않아 완벽한 원자성은
 * 없지만(lock.ts와 동일한 한계), 학번 전수조사 같은 대량 요청을 실질적으로 늦추기엔 충분하다.
 */
export async function enforceRateLimit(
  kv: KVNamespace,
  key: string,
  { limit, windowSeconds }: { limit: number; windowSeconds: number }
): Promise<void> {
  const rateLimitKey = `rate-limit:${key}`;
  const current = await kv.get(rateLimitKey);
  const count = current ? Number(current) : 0;
  if (count >= limit) throw new RateLimitedError();
  await kv.put(rateLimitKey, String(count + 1), { expirationTtl: windowSeconds });
}
