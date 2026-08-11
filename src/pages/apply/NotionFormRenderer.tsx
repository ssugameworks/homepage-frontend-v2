import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router-dom";
import type { NotionFormSchema } from "@/api";
import { canProceedField, FIELD_KINDS, FormWizard, type StepDefinition } from "@/components/forms";
import { ROUTES } from "@/router/routes";

type FieldValue = string | string[] | null;
type NotionFormValues = Record<string, FieldValue>;

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

  const defaultValues: NotionFormValues = {};
  for (const field of schema.fields) {
    defaultValues[field.id] = defaultValueFor(field.kind);
  }
  const form = useForm({ defaultValues });

  const steps: StepDefinition<typeof form>[] = schema.fields.map((field) => ({
    id: field.id,
    render: (f) => (
      <f.Field name={field.id}>
        {(fieldApi) => FIELD_KINDS[field.kind].render(fieldApi, field)}
      </f.Field>
    ),
    canProceed: (values) => canProceedField(field.kind, field, values[field.id]),
  }));

  return (
    <FormWizard
      form={form}
      steps={steps}
      title={
        <h1 className="text-center font-bold text-primary-950">
          <span className="typo-heading3 md:typo-heading1">{schema.title}</span>
        </h1>
      }
      completeSlot={
        <div className="flex flex-1 flex-col items-center justify-center gap-2.75 py-10 text-center">
          <p className="typo-heading3 text-primary-950">제출이 완료되었어요</p>
        </div>
      }
      onComplete={() => {
        // TODO: 제출은 후속 작업으로 분리. 지금은 조회+렌더링까지만 지원.
      }}
      onFinish={() => navigate(ROUTES.HOME)}
      onExit={() => navigate(ROUTES.HOME)}
    />
  );
}
