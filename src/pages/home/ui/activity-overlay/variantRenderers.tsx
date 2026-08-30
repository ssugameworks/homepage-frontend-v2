import type { ReactNode } from "react";
import { CardGrid } from "./CardGrid";
import { GalleryCardView } from "./GalleryCardView";
import { LectureCardView } from "./LectureCardView";
import { PersonCardView } from "./PersonCardView";
import { ProjectCardView } from "./ProjectCardView";
import { renderSections } from "./Section";
import type {
  ActivityOverlay,
  GalleryCard,
  LectureCard,
  OverlaySection,
  PersonCard,
  ProjectCard,
} from "./types";

type OverlayVariantRenderer = (overlay: ActivityOverlay) => ReactNode;

/** overlay.variant별로 어떤 카드뷰 + 레이아웃으로 섹션을 렌더링할지 매핑한다. */
export const OVERLAY_VARIANT_RENDERERS = {
  person: (overlay) =>
    renderSections(overlay.sections as OverlaySection<PersonCard>[], (cards) => (
      <CardGrid className="lg:gap-x-4 lg:gap-y-8">
        {cards.map((card, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: 더미 데이터가 반복됨
          <PersonCardView key={index} card={card} />
        ))}
      </CardGrid>
    )),
  project: (overlay) =>
    renderSections(overlay.sections as OverlaySection<ProjectCard>[], (cards) => (
      <CardGrid className="lg:gap-x-6 lg:gap-y-8">
        {cards.map((card, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: 더미 데이터가 반복됨
          <ProjectCardView key={index} card={card} />
        ))}
      </CardGrid>
    )),
  lecture: (overlay) =>
    renderSections(overlay.sections as OverlaySection<LectureCard>[], (cards) => (
      <CardGrid className="lg:gap-x-8 lg:gap-y-4">
        {cards.map((card, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: 더미 데이터가 반복됨
          <LectureCardView key={index} card={card} />
        ))}
      </CardGrid>
    )),
  // 갤러리는 카드 자체가 가로로 길어 모바일에서도 캐러셀 없이 세로로 쌓음
  gallery: (overlay) =>
    renderSections(
      overlay.sections as OverlaySection<GalleryCard>[],
      (cards) => (
        <ul className="flex list-none flex-col gap-12 p-0">
          {cards.map((card, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 더미 데이터가 반복됨
            <GalleryCardView key={index} card={card} />
          ))}
        </ul>
      ),
      false
    ),
} satisfies Record<ActivityOverlay["variant"], OverlayVariantRenderer>;
