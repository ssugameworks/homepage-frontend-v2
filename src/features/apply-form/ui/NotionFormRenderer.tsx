import type { AnyFieldApi, AnyFormApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { formatStudentId, studentIdSchema } from "@/shared/lib";
import { PrivacyConsentField, TextField } from "@/shared/ui";
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

type FieldValue = string | string[] | boolean | null;
type NotionFormValues = Record<string, FieldValue> & {
  consentGiven: boolean;
  overseasTransferConsent: boolean;
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

/** 활동 신청 시 수집하는 개인정보 고지 + 동의. 활동마다 수집 항목/목적이 달라 스키마 기반으로 문구를 채운다. */
function ApplyConsentField({
  consentField,
  transferField,
  schema,
}: {
  consentField: AnyFieldApi;
  transferField: AnyFieldApi;
  schema: NotionFormSchema;
}) {
  const collectedItems = ["학번", ...schema.fields.map((field) => field.label)].join(", ");

  const policyItems = [
    ["개인정보 관리 책임", "게임웍스 회장"],
    ["수집 항목", collectedItems],
    ["수집 및 이용 목적", `${schema.title} 참가 신청 접수, 회원 여부 확인 및 결과 안내`],
    [
      "개인정보 보유 및 이용기간",
      "수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지",
    ],
    [
      "동의 거부 권리 및 불이익",
      "동의를 거부할 권리가 있으며, 거부 시 해당 활동 신청이 제한됩니다",
    ],
  ] as const;

  // 게임웍스는 회원/신청 정보 관리를 위해 Notion(운영사: Notion Labs, Inc., 미국)을 쓰고 있어,
  // 가정이 아니라 실제로 지금 이 정보가 국외로 이전된다. 그래서 필수 동의 항목으로 분리해서 안내한다.
  const overseasTransferItems = [
    ["이전되는 항목", collectedItems],
    ["이전받는 자", "Notion Labs, Inc."],
    ["이전되는 국가", "미국"],
    ["이전 일시 및 방법", "활동 신청 시 네트워크를 통해 실시간 전송"],
    [
      "이용목적 및 보유기간",
      "활동 신청 관리 목적으로, 위 개인정보 보유 및 이용기간과 동일하게 보유",
    ],
    [
      "동의 거부 권리 및 불이익",
      "동의를 거부할 권리가 있으나, Notion을 통한 신청 정보 관리가 서비스 운영에 필수적이라 거부 시 활동 신청이 제한됩니다",
    ],
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <p className="typo-heading3 typo-bold text-primary-950">
        개인정보 수집 및 이용에 동의해주세요
      </p>

      <PrivacyConsentField
        policyItems={policyItems}
        checked={Boolean(consentField.state.value)}
        onCheckedChange={consentField.handleChange}
      />

      <PrivacyConsentField
        title="개인정보 국외 이전 동의"
        checkboxLabel="개인정보 국외 이전에 동의합니다"
        name="overseasTransferConsent"
        policyItems={overseasTransferItems}
        checked={Boolean(transferField.state.value)}
        onCheckedChange={transferField.handleChange}
      />
    </div>
  );
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
    <div className="flex flex-col gap-6">
      <p className="typo-heading3 typo-bold text-primary-950">학번을 입력해주세요</p>

      <div className="flex flex-col gap-2">
        <TextField
          label="학번"
          name="studentId"
          inputMode="numeric"
          maxLength={8}
          placeholder="학번 8자리를 입력해주세요"
          value={value}
          onChange={(e) => fieldApi.handleChange(formatStudentId(e.target.value))}
          onBlur={fieldApi.handleBlur}
          hint={formatError ? message : membershipHint}
          state={formatError || status === "not-found" || status === "error" ? "error" : "default"}
          autoFocus
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
  /** 첫 스텝에서 "이전"을 누르면 호출된다 (예: 활동 소개 화면으로 복귀). */
  onExit: () => void;
};

export function NotionFormRenderer({ schema, onExit }: NotionFormRendererProps) {
  const navigate = useNavigate();

  const defaultValues: NotionFormValues = {
    consentGiven: false,
    overseasTransferConsent: false,
    studentId: "",
    verifiedStudentId: "",
    turnstileToken: "",
  };
  for (const field of schema.fields) {
    defaultValues[field.id] = defaultValueFor(field.kind);
  }
  const form = useForm({ defaultValues });

  const consentStep: StepDefinition<typeof form> = {
    id: "consent",
    render: (f) => (
      <f.Field name="consentGiven">
        {(consentField) => (
          <f.Field name="overseasTransferConsent">
            {(transferField) => (
              <ApplyConsentField
                consentField={consentField}
                transferField={transferField}
                schema={schema}
              />
            )}
          </f.Field>
        )}
      </f.Field>
    ),
    canProceed: (values) => values.consentGiven === true && values.overseasTransferConsent === true,
  };

  const studentIdStep: StepDefinition<typeof form> = {
    id: "student-id",
    render: (f) => (
      <f.Field
        name="studentId"
        validators={{
          onBlur: ({ value }) => studentIdSchema.safeParse(value).error?.issues[0]?.message,
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

  const notionQuestionSteps: StepDefinition<typeof form>[] = schema.fields.map((field) => {
    const validateField = ({ value }: { value: unknown }) =>
      FIELD_KINDS[field.kind].schema(field).safeParse(value).error?.issues[0]?.message;
    // 텍스트 입력형은 타이핑 중이 아니라 blur 시점에, 선택형은 클릭 즉시(change)에 검증한다.
    const validators =
      FIELD_KINDS[field.kind].validateOn === "blur"
        ? { onBlur: validateField }
        : { onChange: validateField };

    return {
      id: field.id,
      render: (f) => (
        <f.Field name={field.id} validators={validators}>
          {(fieldApi) => FIELD_KINDS[field.kind].render(fieldApi, field)}
        </f.Field>
      ),
      canProceed: (values) => canProceedField(field.kind, field, values[field.id]),
    };
  });

  // 활동 신청의 고정 요구사항은 개인정보 수집 동의와 학번뿐이다. 노션 질문은 0개 이상이며,
  // 질문 DB가 없는 활동은 학번 입력 후 바로 제출 인증으로 진행한다.
  const captchaStep = createCaptchaStep<typeof form>(TURNSTILE_SITE_KEY);
  const steps = [consentStep, studentIdStep, ...notionQuestionSteps, captchaStep];

  return (
    <FormWizard
      form={form}
      steps={steps}
      storageKey={`notion-form:${schema.slug}`}
      title={
        <h1 className="text-center font-bold text-primary-950">
          <span className="typo-heading2 md:typo-heading1">{schema.title}</span>
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
          if (value != null && typeof value !== "boolean") answers[field.id] = value;
        }
        await submitFormAnswers(schema.slug, {
          studentId: values.studentId,
          answers,
          turnstileToken: values.turnstileToken,
        });
      }}
      onFinish={() => navigate(ROUTES.HOME)}
      onExit={onExit}
    />
  );
}
