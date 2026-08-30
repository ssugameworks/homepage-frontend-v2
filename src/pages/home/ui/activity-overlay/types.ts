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
  /** 없으면 소제목 없이 카드만 노출 */
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
