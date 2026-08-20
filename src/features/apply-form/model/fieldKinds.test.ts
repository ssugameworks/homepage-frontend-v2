import { describe, expect, it } from "vitest";
import { canProceedField } from "./fieldKinds";

describe("long_text validation", () => {
  it("필수 질문에서 공백만 있는 문자열을 거부한다", () => {
    const field = {
      id: "motivation",
      label: "지원 동기",
      required: true,
    };

    expect(canProceedField("long_text", field, "   ")).toBe(false);
  });

  it("글자 수는 앞뒤 공백을 제외하고 검사한다", () => {
    const field = {
      id: "motivation",
      label: "지원 동기",
      required: true,
      minLength: 3,
    };

    expect(canProceedField("long_text", field, "  ab  ")).toBe(false);
    expect(canProceedField("long_text", field, "  abc  ")).toBe(true);
  });
});
