import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router-dom";
import type { NotionFormSchema } from "@/api";
import { submitFormAnswers } from "@/api";
import {
  CompleteStep,
  canProceedField,
  createCaptchaStep,
  FIELD_KINDS,
  FormWizard,
  type StepDefinition,
} from "@/components/forms";
import { formatStudentId, studentIdSchema } from "@/components/register/validation";
import { ROUTES } from "@/router/routes";
import { TextField } from "@/ui";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

type FieldValue = string | string[] | null;
type NotionFormValues = Record<string, FieldValue> & {
  studentId: string;
  turnstileToken: string;
};

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

  const defaultValues: NotionFormValues = { studentId: "", turnstileToken: "" };
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
        {(fieldApi) => {
          const message = fieldApi.state.meta.errors[0] as string | undefined;
          const hasError = fieldApi.state.value !== "" && Boolean(message);
          return (
            <TextField
              label="학번"
              name="studentId"
              inputMode="numeric"
              maxLength={8}
              placeholder="학번 8자리를 입력해주세요"
              value={fieldApi.state.value ?? ""}
              onChange={(e) => fieldApi.handleChange(formatStudentId(e.target.value))}
              hint={hasError ? message : undefined}
              state={hasError ? "error" : "default"}
            />
          );
        }}
      </f.Field>
    ),
    canProceed: (values) => studentIdSchema.safeParse(values.studentId).success,
  };

  const fieldSteps: StepDefinition<typeof form>[] = schema.fields.map((field) => ({
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

  const captchaStep = createCaptchaStep<typeof form>(TURNSTILE_SITE_KEY);

  const steps = [studentIdStep, ...fieldSteps, captchaStep];

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
