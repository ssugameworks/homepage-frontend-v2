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
 * 과거 연도 임원진 실제 명단. 이름 앞 숫자는 학번(기수) — 예: "17 장현준" = 17학번 장현준.
 * "기타"는 그 해의 정식 역할은 아니지만 함께 기록해둔 특이사항(예: 차기 회장/총무 내정)이다.
 */
const DUMMY_PAST_ROSTERS: { year: number; executives: Executive[] }[] = [
  {
    year: 2025,
    executives: [
      pastExecutive("past-2025-01", "이나현", "회장", "24학번"),
      pastExecutive("past-2025-02", "이재범", "총무", "24학번"),
      pastExecutive("past-2025-03", "강우현", "부회장", "24학번"),
      pastExecutive("past-2025-04", "홍준우", "부회장", "24학번"),
      pastExecutive("past-2025-05", "이가은", "부회장", "24학번"),
    ],
  },
  {
    year: 2024,
    executives: [
      pastExecutive("past-2024-01", "문세종", "회장", "20학번"),
      pastExecutive("past-2024-02", "민경민", "총무", "22학번"),
      pastExecutive("past-2024-03", "최원재", "부회장", "21학번"),
      pastExecutive("past-2024-04", "강민지", "부회장", "23학번"),
    ],
  },
  {
    year: 2023,
    executives: [
      pastExecutive("past-2023-01", "유재준", "회장", "19학번"),
      pastExecutive("past-2023-02", "조태현", "총무", "20학번"),
      pastExecutive("past-2023-03", "이지희", "부회장", "19학번"),
      pastExecutive("past-2023-04", "유윤상", "부회장", "20학번"),
      pastExecutive("past-2023-05", "문세종(차기 회장)", "기타", "20학번"),
    ],
  },
  {
    year: 2022,
    executives: [
      pastExecutive("past-2022-01", "이지희", "회장", "19학번"),
      pastExecutive("past-2022-02", "김가영", "총무", "19학번"),
      pastExecutive("past-2022-03", "변우진", "부회장", "21학번"),
      pastExecutive("past-2022-04", "임정하", "부회장", "21학번"),
    ],
  },
  {
    year: 2021,
    executives: [
      pastExecutive("past-2021-01", "장현준", "회장", "17학번"),
      pastExecutive("past-2021-02", "방지훈", "총무", "19학번"),
      pastExecutive("past-2021-03", "김세환", "부회장", "20학번"),
      pastExecutive("past-2021-04", "박희선", "부회장", "20학번"),
    ],
  },
  {
    year: 2020,
    executives: [
      pastExecutive("past-2020-01", "장현준", "회장", "17학번"),
      pastExecutive("past-2020-02", "이시은", "총무", "18학번"),
      pastExecutive("past-2020-03", "이경모", "부회장", "19학번"),
    ],
  },
  {
    year: 2019,
    executives: [
      pastExecutive("past-2019-01", "신동호", "회장", "15학번"),
      pastExecutive("past-2019-02", "전수현", "총무", "18학번"),
      pastExecutive("past-2019-03", "김세찬", "부회장", "16학번"),
    ],
  },
  {
    year: 2018,
    executives: [
      pastExecutive("past-2018-01", "이인", "회장", "13학번"),
      pastExecutive("past-2018-02", "장현준", "총무", "17학번"),
      pastExecutive("past-2018-03", "정은서", "부회장", "17학번"),
      pastExecutive("past-2018-04", "전수현(차기 총무)", "기타", "18학번"),
    ],
  },
  {
    year: 2017,
    executives: [
      pastExecutive("past-2017-01", "전민수", "회장", "13학번"),
      pastExecutive("past-2017-02", "권준상", "총무", "16학번"),
      pastExecutive("past-2017-03", "방소윤", "부회장", "16학번"),
      pastExecutive("past-2017-04", "장현준(차기 총무)", "기타", "17학번"),
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
