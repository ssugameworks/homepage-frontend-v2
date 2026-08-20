import dayjs from "dayjs";
import { type ReactNode, useEffect, useState } from "react";
import { ActivityCard, type ActivityListItem, fetchActivities } from "@/entities/activity";
import Logo3D from "@/shared/assets/icons/logo-mark-3d.png";
import { todayKstDateString } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { DevPreviewFab, type DevPreviewMode } from "./DevPreviewFab";
import { DUMMY_ACTIVITIES } from "./devDummyActivities";

type ActivityMonthGroup = {
  key: string;
  year: string;
  month: string;
  items: ActivityListItem[];
};

/** applyStartDate의 연/월이 같은 활동끼리 순서를 유지한 채 묶는다 (이미 정렬된 목록 기준). */
function groupByMonth(activities: ActivityListItem[]): ActivityMonthGroup[] {
  const groups: ActivityMonthGroup[] = [];
  for (const activity of activities) {
    const year = activity.applyStartDate.slice(0, 4);
    const month = activity.applyStartDate.slice(5, 7);
    const key = `${year}-${month}`;
    const current = groups.at(-1);
    if (current?.key === key) {
      current.items.push(activity);
    } else {
      groups.push({ key, year, month, items: [activity] });
    }
  }
  return groups;
}

const skeletonBar =
  "inline-block animate-pulse rounded-md bg-gray-200 text-transparent select-none";
/** 월 숫자처럼 큰 텍스트용 — 기본 skeletonBar보다 radius를 키운다. */
const skeletonBarRoundLg =
  "inline-block animate-pulse rounded-xl bg-gray-200 text-transparent select-none";

/**
 * ActivityCard 한 장 분량의 스켈레톤. 실제 카드와 동일한 마크업/치수를 쓰고,
 * API 데이터에 의존하는 부분(이미지 · 제목 · 기간/장소/설명 값 · 버튼 라벨)만 스켈레톤으로 대체한다.
 * 라벨 텍스트(신청 기간/활동 기간/진행 장소/활동 설명 등)는 API와 무관하므로 그대로 둔다.
 */
function ActivityCardSkeleton({
  isLast = false,
  showMonthHeader = false,
  filterTabs,
}: {
  isLast?: boolean;
  showMonthHeader?: boolean;
  filterTabs?: ReactNode;
}) {
  const currentYear = todayKstDateString().slice(0, 4);

  return (
    <div className="w-full">
      {/* 모바일 전용 상단 월 바 — 실제 ActivityCard와 동일한 자리, 진한 검정 대신 스켈레톤 톤의 구분선을 쓴다 */}
      {showMonthHeader && (
        <div className="mb-4 flex items-end justify-between border-b border-gray-200 pb-2 lg:hidden">
          <div className="flex items-baseline gap-2">
            <span className="typo-body2 typo-light text-text-tertiary">{currentYear}</span>
            <span className={`typo-heading1 leading-none ${skeletonBar}`}>08</span>
          </div>
          {filterTabs}
        </div>
      )}

      <div className={`w-full min-w-0 py-3 lg:py-6 ${isLast ? "" : "border-b border-gray-200"}`}>
        <div className="flex w-full min-w-0 items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-3 md:gap-4 lg:items-stretch lg:gap-6">
            {/* 중앙의 이미지 섹션 */}
            <div
              className={`aspect-4/5 w-21 shrink-0 overflow-hidden rounded-lg shadow-sm md:w-32 lg:w-56.75 lg:rounded-[0.625rem] ${skeletonBar}`}
            />

            <div className="w-full min-w-0 flex-1 space-y-2 lg:flex lg:flex-col lg:space-y-0 lg:gap-2">
              {/* 제목 */}
              <div className="flex items-center gap-3">
                <span
                  className={`typo-heading3 typo-medium inline-block w-40 max-w-full ${skeletonBar}`}
                >
                  활동 이름
                </span>
              </div>

              {/* 모바일 전용 컴팩트 텍스트 리스트 */}
              <div className="space-y-1 text-[0.8125rem] text-gray-600 md:space-y-1.5 md:text-body1 lg:hidden">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="flex shrink-0 items-center gap-1">
                    <span className="w-14 font-medium whitespace-nowrap text-gray-700 md:w-18">
                      접수 기간
                    </span>
                    <span className="text-gray-300">|</span>
                  </span>
                  <span className={`w-32 max-w-full leading-none ${skeletonBar}`}>기간 정보</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="flex shrink-0 items-center gap-1">
                    <span className="w-14 font-medium whitespace-nowrap text-gray-700 md:w-18">
                      활동 기간
                    </span>
                    <span className="text-gray-300">|</span>
                  </span>
                  <span className={`w-32 max-w-full leading-none ${skeletonBar}`}>기간 정보</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="flex shrink-0 items-center gap-1">
                    <span className="w-14 font-medium whitespace-nowrap text-gray-700 md:w-18">
                      진행 장소
                    </span>
                    <span className="text-gray-300">|</span>
                  </span>
                  <span className={`w-24 max-w-full leading-none ${skeletonBar}`}>장소 정보</span>
                </div>
              </div>

              {/* 정보 컨테이너 (데스크톱): 라벨은 그대로 두고 값만 스켈레톤 처리 */}
              <div className="hidden w-full min-w-0 rounded-lg bg-gray-100 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:overflow-hidden">
                <div className="space-y-2 p-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="typo-subheading typo-medium w-20 shrink-0 text-gray-800">
                      신청 기간
                    </span>
                    <span
                      className={`typo-subheading typo-light w-40 max-w-full leading-none ${skeletonBar}`}
                    >
                      기간 정보
                    </span>
                  </div>
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="typo-subheading typo-medium w-20 shrink-0 text-gray-800">
                      활동 기간
                    </span>
                    <span
                      className={`typo-subheading typo-light w-40 max-w-full leading-none ${skeletonBar}`}
                    >
                      기간 정보
                    </span>
                  </div>
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="typo-subheading typo-medium w-20 shrink-0 text-gray-800">
                      진행 장소
                    </span>
                    <span
                      className={`typo-subheading typo-light w-32 max-w-full leading-none ${skeletonBar}`}
                    >
                      장소 정보
                    </span>
                  </div>
                </div>
                <div className="min-w-0 space-y-1 overflow-hidden px-4 pb-4">
                  <span className="typo-subheading typo-medium block text-gray-800">활동 설명</span>
                  <span className={`typo-subheading typo-light block w-full ${skeletonBar}`}>
                    활동 설명이 곧 표시됩니다 활동 설명이 곧 표시됩니다
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 우측의 버튼: 실제 라벨과 동일한 너비를 갖도록 텍스트는 유지하되 보이지 않게 처리 */}
          <div className="shrink-0 self-center">
            <Button
              variant="primary"
              size="sm"
              disabled
              className="h-10! min-w-0! rounded-lg! px-3.5! py-2! text-body2! disabled:bg-none! disabled:bg-gray-300! disabled:text-gray-600! md:h-11! md:min-w-20! md:rounded-[0.625rem]! md:px-4! md:text-subheading! lg:h-12! lg:min-w-25! lg:px-2.5!"
            >
              <span className="invisible">신청하기</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 활동 목록(개수 안내 + 좌측 월 레이블 + 카드들)만 API 데이터에 의존하므로, 로딩 중엔 이 영역만 스켈레톤으로 대체한다. */
function ActivitiesListSkeleton({ filterTabs }: { filterTabs: ReactNode }) {
  const currentYear = todayKstDateString().slice(0, 4);

  return (
    <>
      <div className="flex items-end justify-between gap-4 pb-3">
        <h2 className="typo-heading2">
          <span className="typo-medium text-primary-950">지금 참여할 수 있는 활동이 </span>
          <span className="inline-block animate-pulse rounded-md bg-primary-200 text-transparent select-none">
            0
          </span>
          <span className="text-primary-600">개</span>
          <span className="typo-medium text-primary-950"> 있어요</span>
        </h2>

        <div className="hidden lg:block">{filterTabs}</div>
      </div>

      <div className="hidden h-px w-full bg-gray-200 lg:block" />

      <div className="mt-3 lg:mt-6 lg:flex lg:items-start lg:justify-between lg:gap-6">
        {/* 좌측의 달 (데스크톱 전용 월 레이블). 연도는 API와 무관하니 실제 올해 연도를 그대로 보여준다. */}
        <div className="hidden shrink-0 pt-1 lg:sticky lg:top-28 lg:block lg:w-28">
          <span className="typo-body2 typo-light mb-1 block leading-none text-text-tertiary">
            {currentYear}
          </span>
          <span className={`inline-block text-[5rem] leading-none font-bold ${skeletonBarRoundLg}`}>
            08
          </span>
        </div>

        <div className="min-w-0 lg:max-w-5xl lg:flex-1">
          {[0, 1, 2].map((i) => (
            <ActivityCardSkeleton
              key={i}
              isLast={i === 2}
              showMonthHeader={i === 0}
              filterTabs={filterTabs}
            />
          ))}

          <div className="hidden h-px w-full bg-gray-200 lg:block" />
        </div>
      </div>
    </>
  );
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<ActivityListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  // 개발 중 DevPreviewFab으로만 켜지는 오버라이드. null이면 실제 API 상태를 그대로 보여준다.
  const [devPreview, setDevPreview] = useState<DevPreviewMode | null>(null);
  const todayStr = todayKstDateString();

  useEffect(() => {
    let cancelled = false;

    fetchActivities()
      .then((result) => {
        if (!cancelled) setActivities(result);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "활동 목록을 불러오지 못했어요");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const displayError = devPreview ? null : error;
  const displayActivities =
    devPreview === "data" ? DUMMY_ACTIVITIES : devPreview === "skeleton" ? null : activities;

  // 예정된 행사의 총 개수
  const upcomingCount =
    displayActivities?.filter((activity) => activity.applyEndDate >= todayStr).length ?? 0;

  // 필터링 및 마감 임박순(오름차순) 정렬 적용
  const filteredActivities = (displayActivities ?? [])
    .filter((activity) => {
      if (filter === "upcoming") return activity.applyEndDate >= todayStr;
      return activity.applyEndDate < todayStr;
    })
    .sort((a, b) => {
      if (filter === "upcoming") {
        // 마감일이 오늘과 가장 가까운 순서(오름차순: 오늘마감 -> D-1 -> D-11)
        return dayjs(a.applyEndDate).valueOf() - dayjs(b.applyEndDate).valueOf();
      }
      // 지난 활동: 가장 최근에 끝난 활동부터(내림차순)
      return dayjs(b.applyEndDate).valueOf() - dayjs(a.applyEndDate).valueOf();
    });

  const FilterTabs = (
    <div className="typo-subheading typo-bold flex items-center gap-4">
      <button
        type="button"
        onClick={() => setFilter("upcoming")}
        className={filter === "upcoming" ? "text-primary-950" : "text-gray-500"}
      >
        예정된
      </button>
      <button
        type="button"
        onClick={() => setFilter("past")}
        className={filter === "past" ? "text-primary-950" : "text-gray-500"}
      >
        지난
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-white text-text-primary tracking-dense">
      {/* 히어로 배너 */}
      <section className="relative overflow-hidden bg-linear-to-r from-gray-100 to-primary-200">
        <div className="relative mx-auto w-full max-w-360 px-5 py-10 md:py-16 lg:px-20">
          <h1 className="relative z-10 max-w-sm text-heading2 leading-tight font-bold text-primary-950 sm:max-w-md sm:text-3xl md:max-w-xl md:typo-heading1">
            함께 몰입하고 성장할 순간들이
            <br />
            기다리고 있어요
          </h1>
          <img
            src={Logo3D}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -top-8 -right-6 z-0 size-36 rotate-6 object-contain select-none sm:size-48 md:-top-20 md:right-0 md:size-80 lg:-top-24 lg:right-6 lg:size-105"
          />
        </div>
      </section>

      {/* 메인 컨텐츠 — 활동 목록은 API 데이터에 의존하므로 로딩/에러 상태를 이 영역에서만 분기한다 */}
      <main className="mx-auto w-full max-w-360 px-5 pt-8 pb-6 lg:pt-10 lg:px-20">
        {displayError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="typo-subheading text-text-primary">{displayError}</p>
          </div>
        ) : !displayActivities ? (
          <ActivitiesListSkeleton filterTabs={FilterTabs} />
        ) : (
          <>
            {/* 상단 개수 안내 + 필터 탭 */}
            <div className="flex items-end justify-between gap-4 pb-3">
              <h2 className="typo-heading2">
                <span className="typo-medium text-primary-950">지금 참여할 수 있는 활동이 </span>
                <span className="text-primary-600">{upcomingCount}개</span>
                <span className="typo-medium text-primary-950"> 있어요</span>
              </h2>

              <div className="hidden lg:block">{FilterTabs}</div>
            </div>

            <div className="hidden h-px w-full bg-gray-200 lg:block" />

            {/* 활동 타임라인 리스트 */}
            {filteredActivities.length === 0 ? (
              <>
                {/* 카드가 없어 모바일/태블릿 월바에 탭을 끼워 넣을 자리가 없을 때의 대체 위치 */}
                <div className="flex justify-end pt-3 pr-1 pb-2 lg:hidden">{FilterTabs}</div>
                <div className="h-px w-full bg-gray-200 lg:hidden" />
                <div className="typo-body1 py-20 text-center text-text-tertiary">
                  {filter === "upcoming" ? "현재 예정된 활동이 없습니다." : "활동 내역이 없습니다."}
                </div>
              </>
            ) : (
              <div className="mt-3 lg:mt-6">
                {groupByMonth(filteredActivities).map((group, groupIndex) => (
                  <div
                    key={group.key}
                    className="lg:flex lg:items-start lg:justify-between lg:gap-6"
                  >
                    {/* 데스크톱 전용 월 레이블 — 그룹이 화면을 지나가는 동안 상단에 고정된다 */}
                    <div className="hidden shrink-0 pt-1 lg:sticky lg:top-28 lg:block lg:w-28">
                      <span className="typo-body2 typo-light mb-1 block leading-none text-text-tertiary">
                        {group.year}
                      </span>
                      <span className="text-[5rem] font-bold leading-none text-primary-950">
                        {group.month}
                      </span>
                    </div>

                    <div className="min-w-0 lg:max-w-5xl lg:flex-1">
                      {group.items.map((activity, i) => (
                        <ActivityCard
                          key={activity.id}
                          activity={activity}
                          showDateHeader={i === 0}
                          isLastInMonth={i === group.items.length - 1}
                          filterComponent={groupIndex === 0 && i === 0 ? FilterTabs : null}
                        />
                      ))}

                      {/* 월 그룹의 마지막 카드 뒤 구분선 */}
                      <div className="hidden h-px w-full bg-gray-200 lg:block" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <DevPreviewFab
        mode={devPreview}
        onToggle={() =>
          setDevPreview((prev) => {
            if (prev === "skeleton") return "data";
            if (prev === "data") return null;
            return "skeleton";
          })
        }
      />
    </div>
  );
}
