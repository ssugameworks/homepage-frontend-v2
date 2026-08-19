import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { fetchActivities } from "@/api";
import Logo3D from "@/assets/icons/logo-mark-3d.png";
import ActivityCard, { type ActivityItem } from "@/pages/activity/ActivityCard";
import { todayKstDateString } from "@/utils";

type ActivityMonthGroup = { key: string; year: string; month: string; items: ActivityItem[] };

/** applyStartDate의 연/월이 같은 활동끼리 순서를 유지한 채 묶는다 (이미 정렬된 목록 기준). */
function groupByMonth(activities: ActivityItem[]): ActivityMonthGroup[] {
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

export default function ActivityPage() {
  const [activities, setActivities] = useState<ActivityItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
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

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface-white px-5 py-16 text-center">
        <p className="typo-subheading text-text-primary">{error}</p>
      </div>
    );
  }

  if (!activities) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface-white px-5 py-16 text-center">
        <p className="typo-subheading text-text-tertiary">불러오는 중이에요…</p>
      </div>
    );
  }

  // 예정된 행사의 총 개수
  const upcomingCount = activities.filter((activity) => activity.applyEndDate >= todayStr).length;

  // 필터링 및 마감 임박순(오름차순) 정렬 적용
  const filteredActivities = activities
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
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-100 to-primary-200">
        <div className="relative mx-auto w-full max-w-360 px-5 py-10 md:py-16 lg:px-20">
          <h1 className="relative z-10 max-w-56 text-[1.75rem] leading-tight font-bold text-primary-950 sm:max-w-xs sm:text-[2rem] md:max-w-lg md:typo-heading1">
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

      {/* 메인 컨텐츠 */}
      <main className="mx-auto w-full max-w-360 px-5 pt-8 pb-6 lg:pt-10 lg:px-20">
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
              <div key={group.key} className="lg:flex lg:items-start lg:justify-between lg:gap-6">
                {/* 데스크톱 전용 월 레이블 — 그룹이 화면을 지나가는 동안 상단에 고정된다 */}
                <div className="hidden shrink-0 pt-1 lg:sticky lg:top-28 lg:block lg:w-28">
                  <span className="typo-body2 typo-light mb-1 block leading-none text-text-tertiary">
                    {group.year}
                  </span>
                  <span className="text-[5rem] font-bold leading-none text-primary-950">
                    {group.month}
                  </span>
                </div>

                <div className="min-w-0 lg:max-w-[64rem] lg:flex-1">
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
      </main>
    </div>
  );
}
