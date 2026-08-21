import lecture1 from "@/shared/assets/activity-overlay/lecture-1.png";
import lecture3 from "@/shared/assets/activity-overlay/lecture-3.png";
import person1 from "@/shared/assets/activity-overlay/person-1.png";
import person2 from "@/shared/assets/activity-overlay/person-2.png";
import person3 from "@/shared/assets/activity-overlay/person-3.png";
import project1 from "@/shared/assets/activity-overlay/project-1.png";
import project2 from "@/shared/assets/activity-overlay/project-2.png";
import project3 from "@/shared/assets/activity-overlay/project-3.png";

export type ActivityId = "coffeechat" | "buddy" | "mentoring" | "ideathon" | "flow" | "mt";

/** 인물 카드 — 이미지 위에 텍스트가 겹쳐 올라감 (커피챗) */
export type PersonCard = {
  image: string;
  chip: string;
  name: string;
  details: string[];
};

/** 프로젝트 카드 — 이미지 아래에 텍스트 (아이디어톤 · Flow) */
export type ProjectCard = {
  image: string;
  chip: string;
  name: string;
  details?: string[];
  body?: string;
};

/** 갤러리 카드 — 사진 여러 장 + 아래 설명 (짝선짝후 · MT) */
export type GalleryCard = {
  images: string[];
  name: string;
  details?: string[];
  body?: string;
};

/** 강의 카드 — 썸네일 + 한 줄 캡션 (멘토링) */
export type LectureCard = {
  image: string;
  caption: string;
};

/**
 * 하나의 소제목 아래 놓이는 카드 묶음.
 * web은 `groups`를 각각 한 덩어리(grid)로 쌓고, mobile은 전체를 하나의 스와이프 캐러셀로 합침.
 */
export type OverlaySection<Card> = {
  /** 없으면 소제목 없이 카드만 노출 (Figma: content_2처럼 제목이 붙지 않는 묶음) */
  title?: string;
  groups: Card[][];
};

type OverlayBase = {
  id: ActivityId;
  title: string;
  description: string;
};

export type ActivityOverlay =
  | (OverlayBase & { variant: "person"; sections: OverlaySection<PersonCard>[] })
  | (OverlayBase & { variant: "project"; sections: OverlaySection<ProjectCard>[] })
  | (OverlayBase & { variant: "gallery"; sections: OverlaySection<GalleryCard>[] })
  | (OverlayBase & { variant: "lecture"; sections: OverlaySection<LectureCard>[] });

// TODO: 소제목/본문 라이팅 확정 필요 (Figma 시안이 `content_title` 플레이스홀더 상태)
const PLACEHOLDER_TITLE = "content_title";

const COFFEECHAT_PEOPLE: PersonCard[] = [
  {
    image: person1,
    chip: "기획",
    name: "박준호",
    details: ["당근 프로덕트 디자이너", "신입 취업 / 포트폴리오"],
  },
  {
    image: person2,
    chip: "기획",
    name: "이서연",
    details: ["네이버", "React · TypeScript", "FE 취업 · 사이드 프로젝트"],
  },
  {
    image: person3,
    chip: "기획",
    name: "최수빈",
    details: ["서비스 기획자(PM)", "당근", "프로덕트 기획", "PM 취업 · 협업"],
  },
];

const AWARD_PROJECTS: ProjectCard[] = [
  {
    image: project1,
    chip: "🥇",
    name: "게임웍스",
    body: "앱 설명 프로젝트 설명 앱 설명 프로젝트 설명 앱 설명 프로젝트 설명",
  },
  {
    image: project2,
    chip: "🥇",
    name: "게임웍스",
    body: "앱 설명 프로젝트 설명 앱 설명 프로젝트 설명 앱 설명 프로젝트 설명",
  },
  {
    image: project3,
    chip: "🥇",
    name: "이서연",
    details: ["네이버", "React · TypeScript", "FE 취업 · 사이드 프로젝트"],
  },
];

const GALLERY_DATE: GalleryCard = {
  images: [project3, person1, person1, person1],
  name: "05/04~05/06",
  details: ["장소 : 설명설명설명설명설명설명설명설명설명"],
};

const GALLERY_MT: GalleryCard = {
  images: [project1, person1, person1, person1],
  name: "2026 MT",
  body: "설명설명설명설명설명설명설명설명설명설명설명설명설명",
};

const MENTORING_LECTURES: LectureCard[] = [
  { image: lecture1, caption: "Blender로 배우는 완전 초보자도 쉽게 따라하는 3D 기초" },
  { image: project2, caption: "C#으로 시작하는 프로그래밍 입문 & 프로그램 만들기" },
  { image: lecture3, caption: "C언어 기초에서 활용까지 제대로 배우기 초∙중∙고급 마스터 클래스" },
];

/**
 * Figma spec — Home/Activity/overlay (overlay/main)
 * - 모달: web 900×745(내부 880, px 70 / py 40) · mobile 340(px 24 / py 30), radius 32, bg #FAFAFA
 * - 헤더: 제목 heading2-700(28 · mobile 20) + 닫기 아이콘 24, divider 1px primary-950,
 *   설명 body2-500(14)
 * - 소제목: heading3-700(22 · mobile 18) / 블록 간 간격 48(web) · 32(mobile)
 * - mobile: 소제목 아래 pagination bar(트랙 100×5) + 카드 가로 스와이프
 */
export const ACTIVITY_OVERLAYS: Record<ActivityId, ActivityOverlay> = {
  coffeechat: {
    id: "coffeechat",
    title: "커피챗",
    description: "현업 이야기를 들어요",
    variant: "person",
    sections: [
      { title: PLACEHOLDER_TITLE, groups: [COFFEECHAT_PEOPLE, COFFEECHAT_PEOPLE] },
      { title: PLACEHOLDER_TITLE, groups: [COFFEECHAT_PEOPLE] },
    ],
  },
  buddy: {
    id: "buddy",
    title: "짝선짝후",
    description: "함께 만들어온 추억들이에요",
    variant: "gallery",
    sections: [
      { title: PLACEHOLDER_TITLE, groups: [[GALLERY_DATE]] },
      { title: PLACEHOLDER_TITLE, groups: [[GALLERY_DATE], [GALLERY_MT]] },
    ],
  },
  mentoring: {
    id: "mentoring",
    title: "멘토링",
    description: "경험을 공유하고 함께 성장해요",
    variant: "lecture",
    sections: [
      { title: PLACEHOLDER_TITLE, groups: [[...MENTORING_LECTURES, ...MENTORING_LECTURES]] },
      { title: PLACEHOLDER_TITLE, groups: [[...MENTORING_LECTURES, ...MENTORING_LECTURES]] },
    ],
  },
  ideathon: {
    id: "ideathon",
    title: "아이디어톤",
    description: "지금까지 총 3회의 아이디어톤이 개최되었어요",
    variant: "project",
    sections: [
      { title: PLACEHOLDER_TITLE, groups: [AWARD_PROJECTS] },
      { title: PLACEHOLDER_TITLE, groups: [AWARD_PROJECTS] },
    ],
  },
  flow: {
    id: "flow",
    title: "Flow",
    description: "지금까지 총 3회의 flow가 개최되었어요",
    variant: "project",
    sections: [
      { title: PLACEHOLDER_TITLE, groups: [AWARD_PROJECTS] },
      { title: PLACEHOLDER_TITLE, groups: [AWARD_PROJECTS] },
    ],
  },
  mt: {
    id: "mt",
    title: "MT",
    description: "함께 만들어온 추억들이에요",
    variant: "gallery",
    sections: [
      { title: PLACEHOLDER_TITLE, groups: [[GALLERY_DATE]] },
      { title: PLACEHOLDER_TITLE, groups: [[GALLERY_DATE], [GALLERY_MT]] },
    ],
  },
};
