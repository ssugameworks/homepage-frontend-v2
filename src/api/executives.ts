import type { Executive } from "@/types/executive";

/**
 * 더미 데이터 — Notion API 준비 전까지 사용.
 * 이름/역할/학번은 Figma 디자인(임원진 EXEC 섹션)의 실제 예시 명단을 그대로 반영했다.
 * 실제 연동 시 Notion 응답을 이 Executive[] 형태로 매핑해서 fetchExecutives 내부만 교체하면 된다.
 * (컴포넌트/훅은 fetchExecutives의 반환 타입에만 의존하므로 변경 불필요)
 */
const DUMMY_EXECUTIVES: Executive[] = [
  {
    id: "exec-01",
    name: "이나현",
    initial: "L",
    role: "회장",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    contact: "010-1234-5678",
    isContactPublic: true,
  },
  {
    id: "exec-02",
    name: "강우현",
    initial: "K",
    role: "부회장",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    contact: "010-2345-6789",
    isContactPublic: true,
  },
  {
    id: "exec-03",
    name: "홍준우",
    initial: "H",
    role: "운영진",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    contact: null,
    isContactPublic: false,
  },
  {
    id: "exec-04",
    name: "남지윤",
    initial: "N",
    role: "운영진",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    contact: "010-3456-7890",
    isContactPublic: true,
  },
  {
    id: "exec-05",
    name: "임법준",
    initial: "L",
    role: "운영진",
    department: "글로벌미디어학부",
    studentId: "22학번",
    photoUrl: null,
    contact: null,
    isContactPublic: false,
  },
  {
    id: "exec-06",
    name: "황은성",
    initial: "H",
    role: "운영진",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    contact: null,
    isContactPublic: false,
  },
  {
    id: "exec-07",
    name: "이가은",
    initial: "L",
    role: "운영진",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    contact: "010-4567-8901",
    isContactPublic: true,
  },
  {
    id: "exec-08",
    name: "이재범",
    initial: "L",
    role: "총무",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    contact: "010-5678-9012",
    isContactPublic: true,
  },
];

/**
 * 임원진 목록을 가져온다.
 * TODO: Notion API 연동 시 아래 구현을 실제 API 호출로 교체.
 */
export async function fetchExecutives(): Promise<Executive[]> {
  return DUMMY_EXECUTIVES;
}
