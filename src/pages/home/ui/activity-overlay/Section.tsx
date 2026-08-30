import type { ReactNode } from "react";
import { Carousel } from "./Carousel";
import type { OverlaySection } from "./types";

export function renderSections<Card>(
  sections: OverlaySection<Card>[],
  renderGroup: (cards: Card[]) => ReactNode,
  paginated = true
) {
  return sections.map((section, index) => (
    <Section
      // biome-ignore lint/suspicious/noArrayIndexKey: 소제목이 확정 전 플레이스홀더라 중복됨
      key={index}
      section={section}
      renderGroup={renderGroup}
      paginated={paginated}
    />
  ));
}

type SectionProps<Card> = {
  section: OverlaySection<Card>;
  renderGroup: (cards: Card[]) => ReactNode;
  /** 갤러리처럼 세로로 쌓이는 카드는 모바일에서도 캐러셀로 만들지 않음 */
  paginated?: boolean;
};

function Section<Card>({ section, renderGroup, paginated = true }: SectionProps<Card>) {
  // mobile은 소제목 하나 아래를 한 개의 캐러셀로 합쳐서 보여줌
  const flattened = section.groups.flat();

  return (
    <>
      {section.title ? (
        <div className="flex flex-col gap-2.5">
          <h3 className="font-bold text-lg text-primary-950 leading-normal lg:typo-heading3">
            {section.title}
          </h3>
          {paginated ? (
            <div className="lg:hidden">
              <Carousel count={flattened.length}>{renderGroup(flattened)}</Carousel>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* mobile: 소제목이 없는 묶음만 별도 캐러셀 / desktop: 묶음별 grid */}
      {paginated && !section.title ? (
        <div className="lg:hidden">
          <Carousel count={flattened.length}>{renderGroup(flattened)}</Carousel>
        </div>
      ) : null}

      {section.groups.map((group, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: 더미 데이터가 반복됨
          key={index}
          className={paginated ? "hidden lg:block" : undefined}
        >
          {renderGroup(group)}
        </div>
      ))}
    </>
  );
}
