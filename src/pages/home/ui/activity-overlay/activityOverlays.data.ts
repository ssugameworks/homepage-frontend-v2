import lecture1 from "@/shared/assets/activity-overlay/lecture-1.png";
import lecture3 from "@/shared/assets/activity-overlay/lecture-3.png";
import person1 from "@/shared/assets/activity-overlay/person-1.png";
import person2 from "@/shared/assets/activity-overlay/person-2.png";
import person3 from "@/shared/assets/activity-overlay/person-3.png";
import project1 from "@/shared/assets/activity-overlay/project-1.png";
import project2 from "@/shared/assets/activity-overlay/project-2.png";
import project3 from "@/shared/assets/activity-overlay/project-3.png";
import { ACTIVITY_META } from "./activityMeta";
import type {
  ActivityId,
  ActivityOverlay,
  GalleryCard,
  LectureCard,
  PersonCard,
  ProjectCard,
} from "./types";

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
 *
 * 소제목(section.title)은 라이팅이 아직 확정되지 않아 생략한다 — Section이 title 없는
 * 섹션도 캐러셀/그리드만으로 정상 렌더링한다.
 */
export const ACTIVITY_OVERLAYS: Record<ActivityId, ActivityOverlay> = {
  coffeechat: {
    id: "coffeechat",
    title: ACTIVITY_META.coffeechat.label,
    description: "현업 이야기를 들어요",
    variant: "person",
    sections: [
      { groups: [COFFEECHAT_PEOPLE, COFFEECHAT_PEOPLE] },
      { groups: [COFFEECHAT_PEOPLE] },
    ],
  },
  buddy: {
    id: "buddy",
    title: ACTIVITY_META.buddy.label,
    description: "함께 만들어온 추억들이에요",
    variant: "gallery",
    sections: [{ groups: [[GALLERY_DATE]] }, { groups: [[GALLERY_DATE], [GALLERY_MT]] }],
  },
  mentoring: {
    id: "mentoring",
    title: ACTIVITY_META.mentoring.label,
    description: "경험을 공유하고 함께 성장해요",
    variant: "lecture",
    sections: [
      { groups: [[...MENTORING_LECTURES, ...MENTORING_LECTURES]] },
      { groups: [[...MENTORING_LECTURES, ...MENTORING_LECTURES]] },
    ],
  },
  ideathon: {
    id: "ideathon",
    title: ACTIVITY_META.ideathon.label,
    description: "지금까지 총 3회의 아이디어톤이 개최되었어요",
    variant: "project",
    sections: [{ groups: [AWARD_PROJECTS] }, { groups: [AWARD_PROJECTS] }],
  },
  flow: {
    id: "flow",
    title: ACTIVITY_META.flow.label,
    description: "지금까지 총 3회의 flow가 개최되었어요",
    variant: "project",
    sections: [{ groups: [AWARD_PROJECTS] }, { groups: [AWARD_PROJECTS] }],
  },
  mt: {
    id: "mt",
    title: ACTIVITY_META.mt.label,
    description: "함께 만들어온 추억들이에요",
    variant: "gallery",
    sections: [{ groups: [[GALLERY_DATE]] }, { groups: [[GALLERY_DATE], [GALLERY_MT]] }],
  },
};
