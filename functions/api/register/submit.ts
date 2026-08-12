import { createPage, type Env, queryDataSource, updatePage } from "../_lib/notion";
import { verifyTurnstile } from "../_lib/turnstile";

type SubmitBody = {
  studentId?: string;
  name?: string;
  phone?: string;
  major?: string;
  grade?: string;
  parts?: string[];
  motivation?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  turnstileToken?: string;
};

type Context = { env: Env; request: Request };

export async function onRequestPost(context: Context) {
  const { env, request } = context;

  let body: SubmitBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "요청 형식이 올바르지 않아요" }, { status: 400 });
  }

  const isValid =
    typeof body.studentId === "string" &&
    typeof body.name === "string" &&
    typeof body.turnstileToken === "string" &&
    (body.parts === undefined || Array.isArray(body.parts));
  if (!isValid) {
    return Response.json({ error: "요청 형식이 올바르지 않아요" }, { status: 400 });
  }

  const studentId = body.studentId?.trim();
  if (!studentId || !body.name || !body.turnstileToken) {
    return Response.json({ error: "필수 정보가 없어요" }, { status: 400 });
  }

  const verified = await verifyTurnstile(
    env.TURNSTILE_SECRET_KEY,
    body.turnstileToken,
    request.headers.get("CF-Connecting-IP")
  );
  if (!verified) {
    return Response.json(
      { error: "사람인지 확인할 수 없었어요. 다시 시도해 주세요" },
      { status: 400 }
    );
  }

  const { results } = await queryDataSource(env, env.NOTION_REGISTER_DATA_SOURCE_ID, {
    filter: { property: "학번", title: { equals: studentId } },
  });

  const properties = {
    이름: { rich_text: [{ text: { content: body.name } }] },
    전화번호: { phone_number: body.phone ?? null },
    학과: body.major ? { select: { name: body.major } } : { select: null },
    학년: body.grade ? { select: { name: body.grade } } : { select: null },
    파트: { multi_select: (body.parts ?? []).map((name) => ({ name })) },
    지원동기: { rich_text: [{ text: { content: body.motivation ?? "" } }] },
    포트폴리오링크: { url: body.portfolioUrl || null },
    깃허브링크: { url: body.githubUrl || null },
    검토상태: { select: { name: "신규" } },
  };

  const existing = results[0];
  if (existing) {
    await updatePage(env, existing.id, properties);
  } else {
    await createPage(env, env.NOTION_REGISTER_DATA_SOURCE_ID, {
      학번: { title: [{ text: { content: studentId } }] },
      ...properties,
    });
  }

  return Response.json({ ok: true });
}
