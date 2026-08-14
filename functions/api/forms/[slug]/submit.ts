import {
  type ActivityFieldSpec,
  ActivityFormConfigError,
  getActivityFieldSpecs,
  validateActivityAnswers,
} from "../../_lib/activityForm";
import {
  createPage,
  type Env,
  findActivityBySlug,
  queryDataSource,
  updatePage,
} from "../../_lib/notion";
import { verifyTurnstile } from "../../_lib/turnstile";

type SubmitBody = {
  studentId?: string;
  answers?: Record<string, unknown>;
  turnstileToken?: string;
};

type Context = { params: { slug: string }; env: Env; request: Request };

export async function onRequestPost(context: Context) {
  const { env, request } = context;
  const { slug } = context.params;
  const body = (await request.json()) as SubmitBody;

  const studentId = body.studentId?.trim();
  if (!studentId || !/^\d{8}$/.test(studentId) || !body.turnstileToken) {
    return Response.json({ error: "필수 정보가 없어요" }, { status: 400 });
  }
  if (body.answers != null && (typeof body.answers !== "object" || Array.isArray(body.answers))) {
    return Response.json({ error: "답변 형식이 올바르지 않아요" }, { status: 400 });
  }
  const answers = body.answers ?? {};

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

  const activity = await findActivityBySlug(env, slug);
  if (!activity) {
    return Response.json({ error: "폼을 찾을 수 없어요" }, { status: 404 });
  }

  let fields: ActivityFieldSpec[];
  try {
    fields = await getActivityFieldSpecs(env, activity.id);
  } catch (error) {
    if (error instanceof ActivityFormConfigError) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    throw error;
  }
  const validationError = validateActivityAnswers(fields, answers);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const { results } = await queryDataSource(env, env.NOTION_RESPONSE_DATA_SOURCE_ID, {
    filter: {
      and: [
        { property: "활동", relation: { contains: activity.id } },
        { property: "학번", title: { equals: studentId } },
      ],
    },
  });

  const properties = {
    응답: { rich_text: [{ text: { content: JSON.stringify(answers) } }] },
    검토상태: { select: { name: "신규" } },
  };

  const existing = results[0];
  if (existing) {
    await updatePage(env, existing.id, properties);
  } else {
    await createPage(env, env.NOTION_RESPONSE_DATA_SOURCE_ID, {
      학번: { title: [{ text: { content: studentId } }] },
      활동: { relation: [{ id: activity.id }] },
      ...properties,
    });
  }

  return Response.json({ ok: true });
}
