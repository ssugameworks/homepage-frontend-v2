import hongJunwooBack from "@/shared/assets/images/executives/hong-junwoo-back.png";
import hongJunwooFront from "@/shared/assets/images/executives/hong-junwoo-front.png";
import type { Executive } from "../model/types";

/**
 * 더미 데이터 — Notion API 준비 전까지 사용.
 * 이름/역할/학번은 Figma 디자인(임원진 EXEC 섹션)의 실제 예시 명단을 그대로 반영했다.
 * 실제 연동 시 Notion 응답을 이 Executive[] 형태로 매핑해서 fetchExecutives 내부만 교체하면 된다.
 * (컴포넌트/훅은 fetchExecutives의 반환 타입에만 의존하므로 변경 불필요)
 *
 * frontImageUrl/backImageUrl: 명함 전체(이름 포함)를 담은 이미지. 아직 본인 카드가 디자인된
 * 임원은 홍준우뿐이라, 나머지는 임시로 홍준우 이미지를 채워뒀다 — 각자 카드가 나오면 해당 임원
 * 항목의 frontImageUrl/backImageUrl만 새 이미지로 바꿔주면 된다.
 */
const DUMMY_EXECUTIVES: Executive[] = [
  {
    id: "exec-01",
    name: "이나현",
    role: "회장",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    // TODO: 이나현 카드 디자인 나오면 교체
    frontImageUrl: hongJunwooFront,
    backImageUrl: hongJunwooBack,
    contact: "010-1234-5678",
    isContactPublic: true,
  },
  {
    id: "exec-02",
    name: "강우현",
    role: "부회장",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    // TODO: 강우현 카드 디자인 나오면 교체
    frontImageUrl: hongJunwooFront,
    backImageUrl: hongJunwooBack,
    contact: "010-2345-6789",
    isContactPublic: true,
  },
  {
    id: "exec-03",
    name: "홍준우",
    role: "운영진",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    frontImageUrl: hongJunwooFront, // 실제 본인 카드
    backImageUrl: hongJunwooBack, // 실제 본인 카드
    contact: null,
    isContactPublic: false,
  },
  {
    id: "exec-04",
    name: "남지윤",
    role: "운영진",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    // TODO: 남지윤 카드 디자인 나오면 교체
    frontImageUrl: hongJunwooFront,
    backImageUrl: hongJunwooBack,
    contact: "010-3456-7890",
    isContactPublic: true,
  },
  {
    id: "exec-05",
    name: "임법준",
    role: "운영진",
    department: "글로벌미디어학부",
    studentId: "22학번",
    photoUrl: null,
    // TODO: 임법준 카드 디자인 나오면 교체
    frontImageUrl: hongJunwooFront,
    backImageUrl: hongJunwooBack,
    contact: null,
    isContactPublic: false,
  },
  {
    id: "exec-06",
    name: "황은성",
    role: "운영진",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    // TODO: 황은성 카드 디자인 나오면 교체
    frontImageUrl: hongJunwooFront,
    backImageUrl: hongJunwooBack,
    contact: null,
    isContactPublic: false,
  },
  {
    id: "exec-07",
    name: "이가은",
    role: "운영진",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    // TODO: 이가은 카드 디자인 나오면 교체
    frontImageUrl: hongJunwooFront,
    backImageUrl: hongJunwooBack,
    contact: "010-4567-8901",
    isContactPublic: true,
  },
  {
    id: "exec-08",
    name: "이재범",
    role: "총무",
    department: "글로벌미디어학부",
    studentId: "24학번",
    photoUrl: null,
    // TODO: 이재범 카드 디자인 나오면 교체
    frontImageUrl: hongJunwooFront,
    backImageUrl: hongJunwooBack,
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

function pastExecutive(id: string, name: string, role: string, studentId: string): Executive {
  return {
    id,
    name,
    role,
    department: "글로벌미디어학부",
    studentId,
    photoUrl: null,
    // 과거 연도 명단도 실제 카드 이미지가 없어 임시로 홍준우 이미지를 채워뒀다.
    frontImageUrl: hongJunwooFront,
    backImageUrl: hongJunwooBack,
    contact: null,
    isContactPublic: false,
  };
}

/**
 * 과거 연도 임원진 목데이터 — 로스터 캐러셀 동작 확인용 테스트 데이터.
 * TODO: 실제 역대 임원진 명단이 확정되면 이 더미를 교체(또는 API 연동)한다.
 */
const DUMMY_PAST_ROSTERS: { year: number; executives: Executive[] }[] = [
  {
    year: 2025,
    executives: [
      pastExecutive("past-2025-01", "김도윤", "회장", "23학번"),
      pastExecutive("past-2025-02", "박서연", "부회장", "23학번"),
      pastExecutive("past-2025-03", "최민준", "운영진", "23학번"),
      pastExecutive("past-2025-04", "정하은", "운영진", "24학번"),
      pastExecutive("past-2025-05", "오지훈", "총무", "23학번"),
    ],
  },
  {
    year: 2024,
    executives: [
      pastExecutive("past-2024-01", "박서연", "회장", "22학번"),
      pastExecutive("past-2024-02", "최민준", "부회장", "22학번"),
      pastExecutive("past-2024-03", "강태양", "운영진", "23학번"),
      pastExecutive("past-2024-04", "윤소율", "운영진", "23학번"),
      pastExecutive("past-2024-05", "임재현", "총무", "22학번"),
    ],
  },
  {
    year: 2023,
    executives: [
      pastExecutive("past-2023-01", "최민준", "회장", "21학번"),
      pastExecutive("past-2023-02", "강태양", "부회장", "21학번"),
      pastExecutive("past-2023-03", "이수아", "운영진", "22학번"),
      pastExecutive("past-2023-04", "배준혁", "총무", "21학번"),
    ],
  },
];

/**
 * 과거 연도 임원진 로스터를 가져온다 (현재 연도는 fetchExecutives가 담당).
 * TODO: Notion API 연동 시 아래 구현을 실제 API 호출로 교체.
 */
export async function fetchPastRosters(): Promise<{ year: number; executives: Executive[] }[]> {
  return DUMMY_PAST_ROSTERS;
}
