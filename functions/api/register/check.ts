import { type Env, queryDataSource } from "../_lib/notion";
import { enforceRateLimit, RateLimitedError } from "../_lib/rateLimit";

type Context = { env: Env; request: Request };

const RATE_LIMIT = { limit: 20, windowSeconds: 60 };

/** 활동 신청 시 학번이 가입 신청 DB(dev)에 존재하는지 확인한다 — 가입 신청을 완료한 사람만 활동에 신청할 수 있다. */
export async function onRequestGet(context: Context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const studentId = url.searchParams.get("studentId")?.trim() ?? "";

  if (!/^\d{8}$/.test(studentId)) {
    return Response.json({ error: "학번 8자리를 입력해주세요" }, { status: 400 });
  }

  // 학번은 개인 식별 정보라, IP당 요청 수를 제한해 전수조사(enumeration)를 어렵게 한다.
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  try {
    await enforceRateLimit(env.SUBMIT_LOCKS, `register-check:${ip}`, RATE_LIMIT);
  } catch (err) {
    if (err instanceof RateLimitedError) {
      return Response.json({ error: err.message }, { status: 429 });
    }
    console.error("register/check: rate limit check failed", err);
    return Response.json({ error: "가입 여부를 확인하지 못했어요" }, { status: 503 });
  }

  try {
    const { results } = await queryDataSource(env, env.NOTION_REGISTER_DATA_SOURCE_ID, {
      filter: { property: "학번", title: { equals: studentId } },
    });
    return Response.json({ exists: results.length > 0 });
  } catch (err) {
    console.error("register/check: Notion query failed", err);
    return Response.json({ error: "가입 여부를 확인하지 못했어요" }, { status: 500 });
  }
}
