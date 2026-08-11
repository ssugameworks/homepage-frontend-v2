import type { AnyFieldApi } from "@tanstack/react-form";
import type { ReactNode } from "react";
import { z } from "zod";
import { emailSchema, phoneSchema, urlSchema } from "@/components/register/validation";
import { Checkbox, Radio, TextArea, TextField } from "@/ui";
import type { FieldSpec } from "./types";

type FieldKindDef = {
  render: (field: AnyFieldApi, spec: FieldSpec) => ReactNode;
  schema: (spec: FieldSpec) => z.ZodType;
};

function shortTextRenderer(field: AnyFieldApi, spec: FieldSpec) {
  return (
    <TextField
      label={spec.label}
      name={spec.id}
      placeholder="내용을 입력해 주세요"
      value={field.state.value ?? ""}
      onChange={(e) => field.handleChange(e.target.value)}
      hint={spec.hint}
    />
  );
}

function shortTextSchema(spec: FieldSpec) {
  const base = z.string();
  return spec.required ? base.trim().min(1) : base;
}

function longTextRenderer(field: AnyFieldApi, spec: FieldSpec) {
  return (
    <TextArea
      label={spec.label}
      name={spec.id}
      placeholder="내용을 입력해 주세요"
      value={field.state.value ?? ""}
      onChange={(e) => field.handleChange(e.target.value)}
      hint={spec.hint}
    />
  );
}

function singleChoiceRenderer(field: AnyFieldApi, spec: FieldSpec) {
  const labelId = `${spec.id}-label`;
  return (
    <div className="flex flex-col gap-6">
      <p id={labelId} className="typo-body1 typo-medium text-primary-950 md:typo-subheading">
        {spec.label}
      </p>
      <div role="radiogroup" aria-labelledby={labelId} className="flex flex-col gap-6.75">
        {(spec.options ?? []).map((option) => (
          <Radio
            key={option}
            name={spec.id}
            value={option}
            label={option}
            checked={field.state.value === option}
            onChange={() => field.handleChange(option)}
          />
        ))}
      </div>
    </div>
  );
}

function choiceSchema(spec: FieldSpec) {
  const options = spec.options ?? [];
  const base =
    options.length > 0 ? z.enum(options as [string, ...string[]]) : (z.string() as z.ZodType);
  return spec.required ? base : base.nullable();
}

function multiChoiceRenderer(field: AnyFieldApi, spec: FieldSpec) {
  const labelId = `${spec.id}-label`;
  const values: string[] = field.state.value ?? [];
  return (
    <div className="flex flex-col gap-6">
      <p id={labelId} className="typo-body1 typo-medium text-primary-950 md:typo-subheading">
        {spec.label}
      </p>
      <fieldset aria-labelledby={labelId} className="m-0 flex flex-col gap-6.75 border-0 p-0">
        {(spec.options ?? []).map((option) => {
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
            />
          );
        })}
      </fieldset>
    </div>
  );
}

function multiChoiceSchema(spec: FieldSpec) {
  const base = z.array(z.string());
  return spec.required ? base.min(1) : base;
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
  long_text: { render: longTextRenderer, schema: shortTextSchema },
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
