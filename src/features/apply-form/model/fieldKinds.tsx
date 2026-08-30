import type { AnyFieldApi } from "@tanstack/react-form";
import type { ReactNode } from "react";
import { z } from "zod";
import { emailSchema, phoneSchema, urlSchema } from "@/shared/lib";
import { Checkbox, FieldHint, Radio, TextArea, TextField } from "@/shared/ui";
import type { FieldSpec } from "./types";

type FieldKindDef = {
  render: (field: AnyFieldApi, spec: FieldSpec) => ReactNode;
  schema: (spec: FieldSpec) => z.ZodType;
};

/** 필수 질문의 라벨에 빨간 별표를 덧붙인다. */
function fieldLabel(spec: FieldSpec): ReactNode {
  if (!spec.required) return spec.label;
  return (
    <>
      {spec.label} <span className="text-accent-red">*</span>
    </>
  );
}

function shortTextRenderer(field: AnyFieldApi, spec: FieldSpec) {
  const message = field.state.meta.errors[0] as string | undefined;
  const hasError = field.state.meta.isDirty && Boolean(message);
  return (
    <TextField
      label={fieldLabel(spec)}
      name={spec.id}
      placeholder="내용을 입력해 주세요"
      value={field.state.value ?? ""}
      onChange={(e) => field.handleChange(e.target.value)}
      hint={hasError ? message : spec.hint}
      state={hasError ? "error" : "default"}
      autoFocus
    />
  );
}

function shortTextSchema(spec: FieldSpec) {
  const base = z.string();
  return spec.required ? base.trim().min(1, "필수 질문이에요") : base;
}

function longTextRenderer(field: AnyFieldApi, spec: FieldSpec) {
  const value: string = field.state.value ?? "";
  const message = field.state.meta.errors[0] as string | undefined;
  const hasError = field.state.meta.isDirty && Boolean(message);
  return (
    <TextArea
      label={fieldLabel(spec)}
      name={spec.id}
      placeholder="내용을 입력해 주세요"
      value={value}
      onChange={(e) => field.handleChange(e.target.value)}
      hint={hasError ? message : spec.hint}
      state={hasError ? "error" : "default"}
      maxLength={spec.maxLength}
      autoFocus
    />
  );
}

function longTextSchema(spec: FieldSpec) {
  return z
    .string()
    .trim()
    .superRefine((value, context) => {
      if (value.length === 0) {
        if (spec.required) {
          context.addIssue({ code: "custom", message: "필수 질문이에요" });
        }
        return;
      }
      if (spec.minLength != null && value.length < spec.minLength) {
        context.addIssue({
          code: "custom",
          message: `최소 ${spec.minLength}자 이상 입력해 주세요`,
        });
      }
      if (spec.maxLength != null && value.length > spec.maxLength) {
        context.addIssue({
          code: "custom",
          message: `최대 ${spec.maxLength}자까지 입력할 수 있어요`,
        });
      }
    });
}

function singleChoiceRenderer(field: AnyFieldApi, spec: FieldSpec) {
  const labelId = `${spec.id}-label`;
  const message = field.state.meta.errors[0] as string | undefined;
  const hasError = field.state.meta.isDirty && Boolean(message);
  const hintText = hasError ? message : spec.hint;
  const hintId = hintText ? `${spec.id}-hint` : undefined;
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col">
        <p id={labelId} className="typo-subheading typo-medium text-primary-950">
          {fieldLabel(spec)}
        </p>
        <FieldHint id={hintId} state={hasError ? "error" : "default"}>
          {hintText}
        </FieldHint>
      </div>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={hintId}
        className="flex flex-col gap-4 md:gap-6.75"
      >
        {(spec.options ?? []).map((option, index) => (
          <Radio
            key={option}
            name={spec.id}
            value={option}
            label={option}
            checked={field.state.value === option}
            onChange={() => field.handleChange(option)}
            autoFocus={index === 0}
          />
        ))}
      </div>
    </div>
  );
}

function choiceSchema(spec: FieldSpec) {
  const options = spec.options ?? [];
  return z
    .string()
    .nullable()
    .superRefine((value, context) => {
      if (!value) {
        if (spec.required) context.addIssue({ code: "custom", message: "옵션을 선택해주세요" });
        return;
      }
      if (options.length > 0 && !options.includes(value)) {
        context.addIssue({ code: "custom", message: "올바른 옵션을 선택해주세요" });
      }
    });
}

function multiChoiceRenderer(field: AnyFieldApi, spec: FieldSpec) {
  const labelId = `${spec.id}-label`;
  const values: string[] = field.state.value ?? [];
  const message = field.state.meta.errors[0] as string | undefined;
  const hasError = field.state.meta.isDirty && Boolean(message);
  const hintText = hasError ? message : spec.hint;
  const hintId = hintText ? `${spec.id}-hint` : undefined;
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col">
        <p id={labelId} className="typo-subheading typo-medium text-primary-950">
          {fieldLabel(spec)}
        </p>
        <FieldHint id={hintId} state={hasError ? "error" : "default"}>
          {hintText}
        </FieldHint>
      </div>
      <fieldset
        aria-labelledby={labelId}
        aria-describedby={hintId}
        className="m-0 flex flex-col gap-4 border-0 p-0 md:gap-6.75"
      >
        {(spec.options ?? []).map((option, index) => {
          const checked = values.includes(option);
          return (
            <Checkbox
              key={option}
              name={spec.id}
              value={option}
              label={option}
              checked={checked}
              onChange={() =>
                field.handleChange(
                  checked ? values.filter((item) => item !== option) : [...values, option]
                )
              }
              autoFocus={index === 0}
            />
          );
        })}
      </fieldset>
    </div>
  );
}

function multiChoiceSchema(spec: FieldSpec) {
  const base = z.array(z.string());
  return spec.required ? base.min(1, "최소 1개 이상 선택해주세요") : base;
}

function urlFieldSchema(spec: FieldSpec) {
  return spec.required ? urlSchema : z.union([z.literal(""), urlSchema]);
}

function phoneFieldSchema(spec: FieldSpec) {
  return spec.required ? phoneSchema : z.union([z.literal(""), phoneSchema]);
}

function emailFieldSchema(spec: FieldSpec) {
  return spec.required ? emailSchema : z.union([z.literal(""), emailSchema]);
}

export const FIELD_KINDS = {
  short_text: { render: shortTextRenderer, schema: shortTextSchema },
  long_text: { render: longTextRenderer, schema: longTextSchema },
  single_choice: { render: singleChoiceRenderer, schema: choiceSchema },
  multi_choice: { render: multiChoiceRenderer, schema: multiChoiceSchema },
  url: { render: shortTextRenderer, schema: urlFieldSchema },
  phone: { render: shortTextRenderer, schema: phoneFieldSchema },
  email: { render: shortTextRenderer, schema: emailFieldSchema },
} satisfies Record<string, FieldKindDef>;

export type FieldKind = keyof typeof FIELD_KINDS;

export function canProceedField(kind: FieldKind, spec: FieldSpec, value: unknown) {
  return FIELD_KINDS[kind].schema(spec).safeParse(value).success;
}
