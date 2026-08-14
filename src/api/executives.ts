import hongJunwooBack from "@/assets/images/executives/hong-junwoo-back.png";
import hongJunwooFront from "@/assets/images/executives/hong-junwoo-front.png";
import type { Executive } from "@/types/executive";

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
