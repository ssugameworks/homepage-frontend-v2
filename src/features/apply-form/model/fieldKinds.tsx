import type { AnyFieldApi } from "@tanstack/react-form";
import type { ReactNode } from "react";
import { z } from "zod";
import { emailSchema, phoneSchema, urlSchema } from "@/shared/lib";
import { Checkbox, FieldHint, Radio, TextArea, TextField } from "@/shared/ui";
import type { FieldKind, FieldSpec } from "./types";

type FieldKindDef = {
  render: (field: AnyFieldApi, spec: FieldSpec) => ReactNode;
  schema: (spec: FieldSpec) => z.ZodType;
  /**
   * 텍스트 입력형(short_text 등)은 타이핑 중 실시간으로 에러가 뜨면 거슬리므로 blur 시점에 검증한다.
   * 선택형(단일/다중 선택)은 클릭 한 번으로 값이 바로 확정되므로 change 시점에 검증해도 문제없다.
   */
  validateOn: "change" | "blur";
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
      onBlur={field.handleBlur}
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
      onBlur={field.handleBlur}
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <p id={labelId} className="typo-heading3 typo-bold text-primary-950">
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
        className="flex flex-col gap-6.75"
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <p id={labelId} className="typo-heading3 typo-bold text-primary-950">
          {fieldLabel(spec)}
        </p>
        <FieldHint id={hintId} state={hasError ? "error" : "default"}>
          {hintText}
        </FieldHint>
      </div>
      <fieldset
        aria-labelledby={labelId}
        aria-describedby={hintId}
        className="m-0 flex flex-col gap-6.75 border-0 p-0"
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

// Record<FieldKind, ...>로 못박아 두어, FIELD_KIND_VALUES(model/types.ts)에 종류를 추가/삭제하고
// 여기 구현을 맞춰주지 않으면 타입 에러로 바로 드러난다 (기존 Record<string, ...>는 이걸 못 잡았다).
export const FIELD_KINDS = {
  short_text: { render: shortTextRenderer, schema: shortTextSchema, validateOn: "blur" },
  long_text: { render: longTextRenderer, schema: longTextSchema, validateOn: "blur" },
  single_choice: { render: singleChoiceRenderer, schema: choiceSchema, validateOn: "change" },
  multi_choice: { render: multiChoiceRenderer, schema: multiChoiceSchema, validateOn: "change" },
  url: { render: shortTextRenderer, schema: urlFieldSchema, validateOn: "blur" },
  phone: { render: shortTextRenderer, schema: phoneFieldSchema, validateOn: "blur" },
  email: { render: shortTextRenderer, schema: emailFieldSchema, validateOn: "blur" },
} satisfies Record<FieldKind, FieldKindDef>;

export function canProceedField(kind: FieldKind, spec: FieldSpec, value: unknown) {
  return FIELD_KINDS[kind].schema(spec).safeParse(value).success;
}
