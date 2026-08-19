import { SubmitLockedError, withSubmitLock } from "../_lib/lock";
import { createPage, type Env, queryDataSource, updatePage } from "../_lib/notion";
import { verifyTurnstile } from "../_lib/turnstile";
import { isHttpUrl, isValidPhone } from "../_lib/validate";

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

const GRADE_OPTIONS = ["1학년", "2학년", "3학년", "4학년 이상", "휴학"];
const PART_OPTIONS = ["기획", "UX/UI 디자인", "프론트엔드", "백엔드", "기타"];
const MAJOR_OPTIONS = [
  "글로벌미디어학부",
  "소프트웨어학부",
  "전자정보공학부",
  "컴퓨터학부",
  "AI융합학부",
  "디지털미디어학과",
];

/** 프론트엔드 zod 스키마(src/components/register/validation.ts)와 동일한 규칙을 서버에서도 강제한다. */
function validateBody(body: SubmitBody): string | null {
  if (!body.name || body.name.trim().length < 2) return "이름을 2자 이상 입력해주세요";

  if (!isValidPhone(body.phone ?? "")) return "올바른 휴대폰 번호를 입력해주세요";

  if (!body.major || !MAJOR_OPTIONS.includes(body.major)) return "학과를 선택해주세요";
  if (!body.grade || !GRADE_OPTIONS.includes(body.grade)) return "학년을 선택해주세요";

  if (
    !Array.isArray(body.parts) ||
    body.parts.length === 0 ||
    !body.parts.every((part) => typeof part === "string" && PART_OPTIONS.includes(part))
  ) {
    return "파트를 선택해주세요";
  }

  const motivation = (body.motivation ?? "").trim();
  if (motivation.length < 50 || motivation.length > 150) {
    return "지원 계기는 50자 이상 150자 이내로 작성해주세요";
  }

  const portfolioUrl = (body.portfolioUrl ?? "").trim();
  const githubUrl = (body.githubUrl ?? "").trim();
  if (portfolioUrl && !isHttpUrl(portfolioUrl)) return "올바른 포트폴리오 URL을 입력해주세요";
  if (githubUrl && !isHttpUrl(githubUrl)) return "올바른 깃허브 URL을 입력해주세요";
  if (!portfolioUrl && !githubUrl) return "포트폴리오 또는 깃허브 링크를 입력해주세요";

  return null;
}

type Context = { env: Env; request: Request };

export async function onRequestPost(context: Context) {
  const { env, request } = context;
  const body = (await request.json()) as SubmitBody;

  const studentId = body.studentId?.trim();
  if (!studentId || !/^\d{8}$/.test(studentId) || !body.turnstileToken) {
    return Response.json({ error: "필수 정보가 없어요" }, { status: 400 });
  }

  const validationError = validateBody(body);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
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

  try {
    await withSubmitLock(env.SUBMIT_LOCKS, `register:${studentId}`, async () => {
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
    });
  } catch (err) {
    if (err instanceof SubmitLockedError) {
      return Response.json({ error: err.message }, { status: 429 });
    }
    throw err;
  }

  return Response.json({ ok: true });
}
