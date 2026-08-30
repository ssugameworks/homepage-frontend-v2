export async function verifyTurnstile(
  secretKey: string,
  token: string,
  ip: string | null
): Promise<boolean> {
  if (!secretKey) {
    console.error("[Turnstile] TURNSTILE_SECRET_KEY is missing or empty in environment variables.");
    return false;
  }

  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const result = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
      messages?: string[];
    };
    if (!result.success) {
      console.error("[Turnstile] Verification failed:", {
        errorCodes: result["error-codes"],
        messages: result.messages,
      });
    }
    return result.success;
  } catch (err) {
    console.error("[Turnstile] Network or parse error during siteverify:", err);
    return false;
  }
}

