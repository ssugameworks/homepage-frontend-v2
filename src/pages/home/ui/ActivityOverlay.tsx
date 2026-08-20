import { type ReactNode, useCallback, useEffect, useId, useRef, useState } from "react";
import modalClose from "@/shared/assets/icons/modal-close.svg";
import type {
  ActivityOverlay as ActivityOverlayData,
  GalleryCard,
  LectureCard,
  OverlaySection,
  PersonCard,
  ProjectCard,
} from "./activityOverlays";

type Props = {
  overlay: ActivityOverlayData;
  onClose: () => void;
};

/**
 * 활동 카드의 버튼을 누르면 열리는 상세 모달 (Figma: overlay/main)
 *
 * - web: 880px 폭, 소제목 아래로 카드 grid가 세로로 쌓임
 * - mobile: 340px 폭, 소제목 아래 pagination bar + 카드 가로 스와이프
 */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ActivityOverlay({ overlay, onClose }: Props) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  // 열릴 때 다이얼로그로 포커스를 옮기고, 닫히면 이전에 포커스가 있던 요소(트리거 버튼)로 되돌린다.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    return () => {
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // 다이얼로그 밖으로 포커스가 빠져나가지 않도록 Tab 순환을 가둔다.
      if (event.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        if (focusable.length === 0) return;

        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5">
      {/* 배경 클릭으로 닫기 (키보드는 Escape). 스크린리더/탭 순서에 노출되지 않는 순수 포인터 전용 오버레이라 button이 아닌 div를 쓴다. */}
      <div aria-hidden onClick={onClose} className="absolute inset-0 cursor-default bg-black/50" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="home-overlay-scroll relative flex max-h-full w-full max-w-85 flex-col gap-6 overflow-y-auto rounded-[32px] bg-surface-white px-6 py-7.5 lg:max-w-220 lg:gap-8 lg:px-17.5 lg:py-10"
      >
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* overlay/title */}
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <h2
                  id={titleId}
                  className="font-bold text-xl text-primary-950 leading-normal lg:typo-heading2"
                >
                  {overlay.title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="닫기"
                  className="size-6 shrink-0 cursor-pointer border-0 bg-transparent p-0 text-primary-950"
                >
                  <img src={modalClose} alt="" className="block size-full max-w-none" />
                </button>
              </div>
              <span aria-hidden="true" className="block h-px w-full bg-primary-950" />
            </div>
            <p className="font-medium text-sm text-primary-950 leading-normal">
              {overlay.description}
            </p>
          </div>

          {overlay.variant === "person"
            ? renderSections(overlay.sections, (cards) => (
                <CardGrid className="lg:gap-x-4 lg:gap-y-8">
                  {cards.map((card, index) => (
                    <PersonCardView
                      // biome-ignore lint/suspicious/noArrayIndexKey: 더미 데이터가 반복됨
                      key={index}
                      card={card}
                    />
                  ))}
                </CardGrid>
              ))
            : null}

          {overlay.variant === "project"
            ? renderSections(overlay.sections, (cards) => (
                <CardGrid className="lg:gap-x-6 lg:gap-y-8">
                  {cards.map((card, index) => (
                    <ProjectCardView
                      // biome-ignore lint/suspicious/noArrayIndexKey: 더미 데이터가 반복됨
                      key={index}
                      card={card}
                    />
                  ))}
                </CardGrid>
              ))
            : null}

          {overlay.variant === "lecture"
            ? renderSections(overlay.sections, (cards) => (
                <CardGrid className="lg:gap-x-8 lg:gap-y-4">
                  {cards.map((card, index) => (
                    <LectureCardView
                      // biome-ignore lint/suspicious/noArrayIndexKey: 더미 데이터가 반복됨
                      key={index}
                      card={card}
                    />
                  ))}
                </CardGrid>
              ))
            : null}

          {/* 갤러리는 카드 자체가 가로로 길어 모바일에서도 캐러셀 없이 세로로 쌓음 */}
          {overlay.variant === "gallery"
            ? renderSections(
                overlay.sections,
                (cards) => (
                  <ul className="flex list-none flex-col gap-12 p-0">
                    {cards.map((card, index) => (
                      <GalleryCardView
                        // biome-ignore lint/suspicious/noArrayIndexKey: 더미 데이터가 반복됨
                        key={index}
                        card={card}
                      />
                    ))}
                  </ul>
                ),
                false
              )
            : null}
        </div>
      </div>
    </div>
  );
}

/* ---------- section ---------- */

function renderSections<Card>(
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

/**
 * mobile 전용 가로 스와이프 캐러셀 + pagination bar
 *
 * Figma 개발 노트(overlay/pagination)
 * - Track 100×5px 고정, Fill은 (현재 / 전체) 비율로 계산
 * - Counter는 `{현재} / {전체}`, 스와이프가 끝나면 현재 페이지 갱신
 * - 전체가 1개면 숨김
 */
function Carousel({ count, children }: { count: number; children: ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [scrollable, setScrollable] = useState(false);

  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 1);

    const track = el.firstElementChild;
    if (max <= 1 || count <= 1 || !track) {
      setPage(1);
      return;
    }

    // 좌우 패딩 때문에 scrollLeft가 0에서 시작하지 않으므로, 스크롤 시작점에 가장 가까운 카드를 현재 카드로 본다
    const start =
      el.getBoundingClientRect().left + (Number.parseFloat(getComputedStyle(el).paddingLeft) || 0);
    let nearest = 0;
    let shortest = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((item, index) => {
      const distance = Math.abs(item.getBoundingClientRect().left - start);
      if (distance < shortest) {
        shortest = distance;
        nearest = index;
      }
    });

    setPage(Math.min(nearest + 1, count));
  }, [count]);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const showPagination = scrollable && count > 1;

  return (
    <div className="flex flex-col gap-8">
      {showPagination ? (
        <div className="flex items-center justify-center gap-2">
          <span className="block h-1.25 w-25 overflow-hidden rounded-[999px] bg-gray-200">
            <span
              className="block h-full rounded-[50px] bg-primary-400 transition-[width] duration-200"
              style={{ width: `${(page / count) * 100}%` }}
            />
          </span>
          <span className="font-medium text-xs text-gray-700 leading-normal">
            {page}/{count}
          </span>
        </div>
      ) : null}

      <div
        ref={scrollerRef}
        onScroll={sync}
        className="home-carousel -mx-6 flex snap-x snap-mandatory overflow-x-auto px-6"
      >
        {children}
      </div>
    </div>
  );
}

function CardGrid({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <ul
      className={["flex list-none gap-4 p-0 lg:grid lg:w-fit lg:grid-cols-3", className ?? ""].join(
        " "
      )}
    >
      {children}
    </ul>
  );
}

/* ---------- cards ---------- */

function PersonCardView({ card }: { card: PersonCard }) {
  return (
    <li className="relative h-54.25 w-37.5 shrink-0 snap-start lg:h-81.5 lg:w-56.25">
      <img
        src={card.image}
        alt=""
        className="h-47.75 w-37.5 rounded-[32px] object-cover lg:h-71.5 lg:w-56.25"
      />
      <div className="home-overlay-person-text absolute bottom-0 left-0 flex w-37.5 flex-col gap-2.5 rounded-[15px] p-5 lg:left-1/2 lg:w-57.25 lg:-translate-x-1/2">
        <Chip label={card.chip} />
        <p className="font-bold text-lg text-primary-950 leading-normal lg:typo-heading3">
          {card.name}
        </p>
        <Details details={card.details} />
      </div>
    </li>
  );
}

function ProjectCardView({ card }: { card: ProjectCard }) {
  return (
    <li className="flex w-37.5 shrink-0 snap-start flex-col lg:w-56.25">
      <img
        src={card.image}
        alt=""
        className="h-47.75 w-37.5 rounded-[32px] object-cover lg:h-71.5 lg:w-56.25"
      />
      <div className="flex flex-col gap-2.5 rounded-[15px] px-2.5 py-5">
        <Chip label={card.chip} />
        <p className="font-bold text-lg text-primary-950 leading-normal lg:typo-heading3">
          {card.name}
        </p>
        {card.details ? <Details details={card.details} /> : null}
        {card.body ? <Body text={card.body} /> : null}
      </div>
    </li>
  );
}

function GalleryCardView({ card }: { card: GalleryCard }) {
  return (
    <li className="flex w-full flex-col overflow-hidden rounded-[32px]">
      <div className="flex flex-wrap gap-1">
        {card.images.map((src, index) => (
          <img
            // biome-ignore lint/suspicious/noArrayIndexKey: 더미 데이터가 반복됨
            key={index}
            src={src}
            alt=""
            className="h-30 w-23.75 rounded-[32px] object-cover lg:h-47.75 lg:w-37.5"
          />
        ))}
      </div>
      <div className="flex flex-col gap-2.5 rounded-[15px] px-2.5 py-5">
        <p className="font-bold text-lg text-primary-950 leading-normal lg:typo-heading3">
          {card.name}
        </p>
        {card.details ? <Details details={card.details} /> : null}
        {card.body ? <Body text={card.body} /> : null}
      </div>
    </li>
  );
}

function LectureCardView({ card }: { card: LectureCard }) {
  return (
    <li className="flex w-37.5 shrink-0 snap-start flex-col lg:w-56.25">
      <img
        src={card.image}
        alt=""
        className="h-21.75 w-37.5 rounded-[32px] object-cover lg:h-32.5 lg:w-56.25"
      />
      <div className="px-2.5 py-5">
        <Body text={card.caption} />
      </div>
    </li>
  );
}

/* ---------- primitives ---------- */

/** Figma: chip — button/secondary-mixed 배경 + primary-900 라벨 */
function Chip({ label }: { label: string }) {
  return (
    <span className="home-btn-secondary flex w-fit items-center gap-2 rounded-[16px] px-2 py-1 text-center font-medium text-xs text-primary-800 leading-normal lg:text-base">
      {label}
    </span>
  );
}

function Details({ details }: { details: string[] }) {
  return (
    <ul className="m-0 list-disc pl-5.25 font-medium text-xs text-primary-950 leading-normal lg:text-sm">
      {details.map((detail) => (
        <li key={detail}>{detail}</li>
      ))}
    </ul>
  );
}

function Body({ text }: { text: string }) {
  return <p className="font-medium text-xs text-primary-950 leading-normal lg:text-sm">{text}</p>;
}
