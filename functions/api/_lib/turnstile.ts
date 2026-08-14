export async function verifyTurnstile(
  secretKey: string,
  token: string,
  ip: string | null
): Promise<boolean> {
  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (ip) body.set("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const result = (await res.json()) as { success: boolean };
  return result.success;
}
