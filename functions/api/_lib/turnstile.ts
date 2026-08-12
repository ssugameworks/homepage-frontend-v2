export async function verifyTurnstile(
  secretKey: string,
  token: string,
  ip: string | null
): Promise<boolean> {
  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const result = (await res.json()) as { success: boolean };
    return result.success;
  } catch {
    // 네트워크/파싱 실패도 "검증 안 됨"으로 취급 — 호출자가 항상 일관된 실패 응답을 주게 한다.
    return false;
  }
}
