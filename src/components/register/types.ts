export type RegisterForm = {
  name: string;
  phone: string;
  /** 학번 */
  studentId: string;
  /** 학과 */
  major: string;
  grade: string | null;
  parts: string[];
  motivation: string;
  portfolioUrl: string;
  githubUrl: string;
};

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
};

export const GRADE_OPTIONS = [
  "1학년",
  "2학년",
  "3학년",
  "4학년 이상",
  "휴학",
] as const;

export const PART_OPTIONS = [
  "기획",
  "UX/UI 디자인",
  "프론트엔드",
  "백엔드",
  "기타",
] as const;

export const MAJOR_OPTIONS = [
  "글로벌미디어학부",
  "소프트웨어학부",
  "전자정보공학부",
  "컴퓨터학부",
  "AI융합학부",
  "디지털미디어학과",
] as const;

export type RegisterStep = 1 | 2 | 3 | 4 | 5 | 6 | "complete";

/** Stub for future Notion / validation API integration. */
export function validateRegisterField(
  _field: keyof RegisterForm,
  _value: unknown
): { ok: boolean; message?: string } {
  return { ok: true };
}

export function isValidName(name: string) {
  return name.trim().length >= 2;
}

export function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  // 01x (010/011/016/017/018/019) + 7~8자리
  return /^01[016789]\d{7,8}$/.test(digits);
}

export function isValidMotivation(text: string) {
  const trimmed = text.trim();
  return trimmed.length >= 50 && trimmed.length <= 150;
}

export function isValidUrl(url: string) {
  if (!url.trim()) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
