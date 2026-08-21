import { SubmitLockedError, withSubmitLock } from "../_lib/lock";
import { createPage, type Env, queryDataSource, updatePage } from "../_lib/notion";
import { verifyTurnstile } from "../_lib/turnstile";
import { isValidPaymentDate, isValidPhone, toIsoDate } from "../_lib/validate";

type SubmitBody = {
  studentId?: string;
  name?: string;
  phone?: string;
  privacyConsent?: boolean;
  paymentStatus?: string;
  paymentDate?: string;
  turnstileToken?: string;
};

const PAYMENT_STATUS_OPTIONS = ["입금 완료 했습니다", "군휴학생입니다"];
const PAYMENT_COMPLETED = "입금 완료 했습니다";

/** 프론트엔드 zod 스키마(src/features/register/model/validation.ts)와 동일한 규칙을 서버에서도 강제한다. */
function validateBody(body: SubmitBody): string | null {
  if (!body.name || body.name.trim().length < 2) return "이름을 2자 이상 입력해주세요";

  if (!isValidPhone(body.phone ?? "")) return "올바른 연락처를 입력해주세요";

  if (body.privacyConsent !== true) return "개인정보 수집 및 이용에 동의해주세요";

  if (!body.paymentStatus || !PAYMENT_STATUS_OPTIONS.includes(body.paymentStatus)) {
    return "입금 여부를 선택해주세요";
  }

  if (body.paymentStatus === PAYMENT_COMPLETED && !isValidPaymentDate(body.paymentDate ?? "")) {
    return "회비 납부 날짜를 YYYY/MM/DD 형식으로 입력해주세요";
  }

  return null;
}

type Context = { env: Env; request: Request };

export async function onRequestPost(context: Context) {
  const { env, request } = context;

  let body: SubmitBody;
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed !== "object" || parsed === null) {
      return Response.json({ error: "요청 형식이 올바르지 않아요" }, { status: 400 });
    }
    body = parsed as SubmitBody;
  } catch {
    return Response.json({ error: "요청 형식이 올바르지 않아요" }, { status: 400 });
  }

  const isOptionalString = (value: unknown) => value === undefined || typeof value === "string";
  const isValid =
    typeof body.studentId === "string" &&
    typeof body.name === "string" &&
    typeof body.turnstileToken === "string" &&
    isOptionalString(body.phone) &&
    isOptionalString(body.paymentStatus) &&
    isOptionalString(body.paymentDate) &&
    (body.privacyConsent === undefined || typeof body.privacyConsent === "boolean");
  if (!isValid) {
    return Response.json({ error: "요청 형식이 올바르지 않아요" }, { status: 400 });
  }

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

      const paymentDate =
        body.paymentStatus === PAYMENT_COMPLETED && body.paymentDate
          ? toIsoDate(body.paymentDate)
          : null;

      const properties = {
        이름: { rich_text: [{ text: { content: body.name } }] },
        전화번호: { phone_number: body.phone ?? null },
        개인정보동의: { checkbox: body.privacyConsent === true },
        입금여부: body.paymentStatus ? { select: { name: body.paymentStatus } } : { select: null },
        납부날짜: paymentDate ? { date: { start: paymentDate } } : { date: null },
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
