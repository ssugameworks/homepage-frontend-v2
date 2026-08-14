import { describe, expect, it } from "vitest";
import type { ActivityFieldSpec } from "./activityForm";
import {
  ActivityFormConfigError,
  toActivityFieldSpec,
  validateActivityAnswers,
} from "./activityForm";

describe("toActivityFieldSpec", () => {
  it("지원하지 않는 Notion 질문 타입을 거부한다", () => {
    const row = {
      id: "unsupported",
      properties: {
        라벨: { title: [{ plain_text: "날짜" }] },
        타입: { select: { name: "date" } },
      },
    };

    expect(() => toActivityFieldSpec(row)).toThrow(ActivityFormConfigError);
  });
});

describe("validateActivityAnswers", () => {
  it("질문이 없는 활동은 빈 답변을 허용한다", () => {
    expect(validateActivityAnswers([], {})).toBeNull();
  });

  it("선택 질문은 답변하지 않아도 된다", () => {
    const fields: ActivityFieldSpec[] = [
      {
        id: "motivation",
        label: "지원 동기",
        kind: "long_text",
        required: false,
      },
    ];

    expect(validateActivityAnswers(fields, {})).toBeNull();
    expect(validateActivityAnswers(fields, { motivation: "   " })).toBeNull();
  });

  it("필수 텍스트 질문은 공백만 있는 답변을 거부한다", () => {
    const fields: ActivityFieldSpec[] = [
      {
        id: "motivation",
        label: "지원 동기",
        kind: "long_text",
        required: true,
      },
    ];

    expect(validateActivityAnswers(fields, { motivation: "   " })).toBe(
      "지원 동기의 답변을 확인해 주세요"
    );
  });

  it("텍스트 길이 제한은 앞뒤 공백을 제외하고 검사한다", () => {
    const fields: ActivityFieldSpec[] = [
      {
        id: "motivation",
        label: "지원 동기",
        kind: "long_text",
        required: true,
        minLength: 3,
      },
    ];

    expect(validateActivityAnswers(fields, { motivation: "  ab  " })).toBe(
      "지원 동기의 답변을 확인해 주세요"
    );
    expect(validateActivityAnswers(fields, { motivation: "  abc  " })).toBeNull();
  });

  it("필수 선택 질문은 노션에 정의된 선택지만 허용한다", () => {
    const fields: ActivityFieldSpec[] = [
      {
        id: "part",
        label: "파트",
        kind: "single_choice",
        required: true,
        options: ["기획", "개발"],
      },
    ];

    expect(validateActivityAnswers(fields, { part: "개발" })).toBeNull();
    expect(validateActivityAnswers(fields, { part: "디자인" })).toBe("파트의 답변을 확인해 주세요");
  });

  it("해당 활동에 없는 질문 ID를 거부한다", () => {
    expect(validateActivityAnswers([], { unknown: "answer" })).toBe(
      "유효하지 않은 질문이 포함되어 있어요"
    );
  });
});
