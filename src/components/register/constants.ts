import type { RegisterForm } from "./types";

export const INITIAL_REGISTER_FORM: RegisterForm = {
  name: "",
  phone: "",
  studentId: "",
  major: "",
  grade: null,
  parts: [],
  motivation: "",
  portfolioUrl: "",
  githubUrl: "",
  turnstileToken: "",
};

export const GRADE_OPTIONS = ["1학년", "2학년", "3학년", "4학년 이상", "휴학"] as const;

export const PART_OPTIONS = ["기획", "UX/UI 디자인", "프론트엔드", "백엔드", "기타"] as const;

export const MAJOR_OPTIONS = [
  "글로벌미디어학부",
  "소프트웨어학부",
  "전자정보공학부",
  "컴퓨터학부",
  "AI융합학부",
  "디지털미디어학과",
] as const;
