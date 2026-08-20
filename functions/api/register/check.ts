import { type Env, queryDataSource } from "../_lib/notion";

type Context = { env: Env; request: Request };

/** 활동 신청 시 학번이 가입 신청 DB(dev)에 존재하는지 확인한다 — 가입 신청을 완료한 사람만 활동에 신청할 수 있다. */
export async function onRequestGet(context: Context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const studentId = url.searchParams.get("studentId")?.trim() ?? "";

  if (!/^\d{8}$/.test(studentId)) {
    return Response.json({ error: "학번 8자리를 입력해주세요" }, { status: 400 });
  }

  const { results } = await queryDataSource(env, env.NOTION_REGISTER_DATA_SOURCE_ID, {
    filter: { property: "학번", title: { equals: studentId } },
  });

  return Response.json({ exists: results.length > 0 });
}
