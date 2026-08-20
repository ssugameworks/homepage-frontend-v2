import type { AnyFieldApi, AnyFormApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { formatStudentId, studentIdSchema } from "@/shared/lib";
import { TextField } from "@/shared/ui";
import {
  CompleteStep,
  createCaptchaStep,
  FormWizard,
  type StepDefinition,
} from "@/shared/ui/form-wizard";
import { checkMembership, submitFormAnswers } from "../api/applyFormApi";
import { canProceedField, FIELD_KINDS } from "../model/fieldKinds";
import type { NotionFormSchema } from "../model/types";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

type FieldValue = string | string[] | null;
type NotionFormValues = Record<string, FieldValue> & {
  studentId: string;
  /** 가입 신청 DB 조회에 성공한 학번. studentId와 일치할 때만 다음 단계로 넘어갈 수 있다. */
  verifiedStudentId: string;
  turnstileToken: string;
};

type MembershipStatus = "idle" | "checking" | "verified" | "not-found" | "error";

/** 학번 형식이 유효해지면 디바운스 후 가입 신청 DB에 존재하는지 확인한다. */
function useMembershipCheck(studentId: string, onResult: (verifiedId: string | null) => void) {
  const [status, setStatus] = useState<MembershipStatus>("idle");
  const [retryKey, setRetryKey] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: onResult(form.setFieldValue)는 매 렌더 재생성되지만 안정적으로 동작해 의존성에서 제외한다.
  useEffect(() => {
    if (!studentIdSchema.safeParse(studentId).success) {
      setStatus("idle");
      onResult(null);
      return;
    }

    let cancelled = false;
    setStatus("checking");
    const timer = setTimeout(() => {
      checkMembership(studentId)
        .then((result) => {
          if (cancelled) return;
          setStatus(result.exists ? "verified" : "not-found");
          onResult(result.exists ? studentId : null);
        })
        .catch(() => {
          if (cancelled) return;
          setStatus("error");
          onResult(null);
        });
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [studentId, retryKey]);

  return { status, retry: () => setRetryKey((n) => n + 1) };
}

function StudentIdField({ fieldApi, form }: { fieldApi: AnyFieldApi; form: AnyFormApi }) {
  const value = (fieldApi.state.value as string | null) ?? "";
  const message = fieldApi.state.meta.errors[0] as string | undefined;
  const formatError = value !== "" && Boolean(message);

  const { status, retry } = useMembershipCheck(value, (verifiedId) =>
    form.setFieldValue("verifiedStudentId", verifiedId ?? "")
  );

  const membershipHint =
    status === "checking"
      ? "가입 여부를 확인하고 있어요…"
      : status === "verified"
        ? "확인됐어요"
        : status === "not-found"
          ? "가입 신청 내역을 찾을 수 없어요. 먼저 가입 신청을 완료해주세요."
          : status === "error"
            ? "확인 중 문제가 발생했어요. 다시 시도해주세요."
            : undefined;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <p className="typo-body1 typo-medium text-primary-950 md:typo-subheading">
        학번을 입력해주세요
      </p>

      <div className="flex flex-col gap-2">
        <TextField
          label="학번"
          name="studentId"
          inputMode="numeric"
          maxLength={8}
          placeholder="학번 8자리를 입력해주세요"
          value={value}
          onChange={(e) => fieldApi.handleChange(formatStudentId(e.target.value))}
          hint={formatError ? message : membershipHint}
          state={formatError || status === "not-found" || status === "error" ? "error" : "default"}
        />

        {status === "not-found" ? (
          <Link
            to={ROUTES.REGISTER}
            className="px-2 typo-body2 text-(--color-button-outline) underline"
          >
            가입 신청 하러 가기
          </Link>
        ) : null}

        {status === "error" ? (
          <button
            type="button"
            onClick={retry}
            className="w-fit px-2 typo-body2 text-(--color-button-outline) underline"
          >
            다시 확인하기
          </button>
        ) : null}
      </div>
    </div>
  );
}

function defaultValueFor(kind: NotionFormSchema["fields"][number]["kind"]): FieldValue {
  if (kind === "single_choice") return null;
  if (kind === "multi_choice") return [];
  return "";
}

type NotionFormRendererProps = {
  schema: NotionFormSchema;
};

export function NotionFormRenderer({ schema }: NotionFormRendererProps) {
  const navigate = useNavigate();

  const defaultValues: NotionFormValues = {
    studentId: "",
    verifiedStudentId: "",
    turnstileToken: "",
  };
  for (const field of schema.fields) {
    defaultValues[field.id] = defaultValueFor(field.kind);
  }
  const form = useForm({ defaultValues });

  const studentIdStep: StepDefinition<typeof form> = {
    id: "student-id",
    render: (f) => (
      <f.Field
        name="studentId"
        validators={{
          onChange: ({ value }) => studentIdSchema.safeParse(value).error?.issues[0]?.message,
        }}
      >
        {(fieldApi) => <StudentIdField fieldApi={fieldApi} form={f} />}
      </f.Field>
    ),
    canProceed: (values) =>
      studentIdSchema.safeParse(values.studentId).success &&
      values.studentId !== "" &&
      values.studentId === values.verifiedStudentId,
  };

  const notionQuestionSteps: StepDefinition<typeof form>[] = schema.fields.map((field) => ({
    id: field.id,
    render: (f) => (
      <f.Field
        name={field.id}
        validators={{
          onChange: ({ value }) =>
            FIELD_KINDS[field.kind].schema(field).safeParse(value).error?.issues[0]?.message,
        }}
      >
        {(fieldApi) => FIELD_KINDS[field.kind].render(fieldApi, field)}
      </f.Field>
    ),
    canProceed: (values) => canProceedField(field.kind, field, values[field.id]),
  }));

  // 활동 신청의 고정 요구사항은 학번뿐이다. 노션 질문은 0개 이상이며,
  // 질문 DB가 없는 활동은 학번 입력 후 바로 제출 인증으로 진행한다.
  const captchaStep = createCaptchaStep<typeof form>(TURNSTILE_SITE_KEY);
  const steps = [studentIdStep, ...notionQuestionSteps, captchaStep];

  return (
    <FormWizard
      form={form}
      steps={steps}
      storageKey={`notion-form:${schema.slug}`}
      title={
        <h1 className="text-center font-bold text-primary-950">
          <span className="typo-heading3 md:typo-heading1">{schema.title}</span>
        </h1>
      }
      completeSlot={
        <CompleteStep title="제출이 완료되었어요" subtitle="확인 후 결과를 안내드릴게요" />
      }
      onComplete={async () => {
        const values = form.state.values;
        const answers: Record<string, string | string[]> = {};
        for (const field of schema.fields) {
          const value = values[field.id];
          if (value != null) answers[field.id] = value;
        }
        await submitFormAnswers(schema.slug, {
          studentId: values.studentId,
          answers,
          turnstileToken: values.turnstileToken,
        });
      }}
      onFinish={() => navigate(ROUTES.HOME)}
      onExit={() => navigate(ROUTES.HOME)}
    />
  );
}
