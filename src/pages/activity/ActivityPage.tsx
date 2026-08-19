import { Fragment, useState } from "react";
import Logo3D from "@/assets/icons/logo-mark-3d.png";
import ActivityCard, { type ActivityItem } from "@/pages/activity/ActivityCard";

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    title: "Flow: Startup Bridge",
    applyStartDate: "2026-08-01",
    applyEndDate: "2026-08-25", // D-11
    activityStartDate: "2026-08-11",
    activityEndDate: "2026-08-12",
    location: "정보 과학관",
    description: "자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명",
    imageUrl: "/images/activity-sample.png",
  },
  {
    id: "2",
    title: "Flow: Startup Bridge",
    applyStartDate: "2026-08-01",
    applyEndDate: "2026-08-15", // D-1
    activityStartDate: "2026-08-11",
    activityEndDate: "2026-08-12",
    location: "정보 과학관",
    description: "자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명",
    imageUrl: "/images/activity-sample.png",
  },
  {
    id: "3",
    title: "Flow: Startup Bridge",
    applyStartDate: "2026-08-01",
    applyEndDate: "2026-08-14", // 오늘마감
    activityStartDate: "2026-08-11",
    activityEndDate: "2026-08-12",
    location: "정보 과학관",
    description: "자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명",
    imageUrl: "/images/activity-sample.png",
  },
  {
    id: "4",
    title: "Flow: 지난 해커톤",
    applyStartDate: "2026-07-01",
    applyEndDate: "2026-07-20", // 지난 활동
    activityStartDate: "2026-07-25",
    activityEndDate: "2026-07-30",
    location: "정보 과학관",
    description: "지난 행사 설명입니다.",
    imageUrl: "/images/activity-sample.png",
  },
  {
    id: "5",
    title: "Flow: 지난 워크샵",
    applyStartDate: "2026-06-01",
    applyEndDate: "2026-06-15", // 지난 활동
    activityStartDate: "2026-06-20",
    activityEndDate: "2026-06-22",
    location: "정보 과학관",
    description: "지난 행사 설명입니다.",
    imageUrl: "/images/activity-sample.png",
  },
];

export default function ActivityPage() {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const todayStr = new Date().toISOString().split("T")[0];

  // 1. 예정된 행사의 총 개수
  const upcomingCount = MOCK_ACTIVITIES.filter(
    (activity) => activity.applyEndDate >= todayStr
  ).length;

  //  2. 필터링 및 마감 임박순(오름차순) 정렬 적용
  const filteredActivities = MOCK_ACTIVITIES.filter((activity) => {
    if (filter === "upcoming") return activity.applyEndDate >= todayStr;
    return activity.applyEndDate < todayStr;
  }).sort((a, b) => {
    if (filter === "upcoming") {
      // 마감일이 오늘과 가장 가까운 순서(오름차순: 오늘마감 -> D-1 -> D-11)
      return new Date(a.applyEndDate).getTime() - new Date(b.applyEndDate).getTime();
    }
    // 지난 활동: 가장 최근에 끝난 활동부터(내림차순)
    return new Date(b.applyEndDate).getTime() - new Date(a.applyEndDate).getTime();
  });

  // 필터 탭 컴포넌트
  const FilterTabs = (
    <div className="flex gap-3 md:gap-4 text-caption md:text-body1 font-bold">
      <button
        type="button"
        onClick={() => setFilter("upcoming")}
        className={
          filter === "upcoming" ? "text-text-primary font-bold" : "text-text-tertiary font-normal"
        }
      >
        예정된
      </button>
      <button
        type="button"
        onClick={() => setFilter("past")}
        className={
          filter === "past" ? "text-text-primary font-bold" : "text-text-tertiary font-normal"
        }
      >
        지난
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-text-primary tracking-dense">
      {/* 1. 히어로 배너 영역 */}
      <section className="relative overflow-hidden bg-[linear-gradient(90deg,var(--color-gray-50,#F2F2F3)_0%,var(--color-primary-300,#B2D3FF)_100%)] min-h-[160px] md:min-h-[200px] py-10 md:py-16 px-5 md:px-20 z-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="relative z-10">
            <h1 className="text-[22px] sm:text-3xl md:text-[38px] font-bold text-text-primary-950 leading-tight">
              함께 몰입하고 성장할 순간들이
              <br />
              기다리고 있어요
            </h1>
          </div>
          {/* 오른쪽 3D 그래픽 이미지 */}
          <div className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 h-[220%] sm:h-[230%] md:h-[240%] aspect-square flex items-center justify-center pointer-events-none select-none z-0">
            <img
              src={Logo3D}
              alt="GAMEWORKS Graphic"
              className="w-full h-full object-contain object-right drop-shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="max-w-6xl mx-auto px-5 md:px-6 py-6 md:py-[18px]">
        {/* 상단 개수 안내 헤더 */}
        <div className="flex justify-between items-end md:border-b md:border-border pb-3 md:pb-4 mb-4 md:mb-0">
          <h2 className="text-[17px] md:text-heading3 font-bold text-text-primary">
            지금 참여할 수 있는 활동이 <span className="text-primary-700">{upcomingCount}개</span>{" "}
            있어요
          </h2>

          <div className="hidden md:block">{FilterTabs}</div>
        </div>

        {/* PC 전용 상단 굵은 구분선 */}
        <div className="hidden md:block w-full h-[3px] bg-primary-900 my-4" />

        {/* 3. 활동 타임라인 리스트 */}
        {filteredActivities.length === 0 ? (
          <div className="py-20 text-center text-text-tertiary text-body1">
            {filter === "upcoming" ? "현재 예정된 활동이 없습니다." : "활동 내역이 없습니다."}
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {filteredActivities.map((activity, index) => {
              const currentMonth = activity.applyStartDate.slice(5, 7);
              const prevMonth = filteredActivities[index - 1]?.applyStartDate.slice(5, 7);
              const nextMonth = filteredActivities[index + 1]?.applyStartDate.slice(5, 7);

              const showDateHeader = index === 0 || prevMonth !== currentMonth;
              const isLastInMonth =
                index === filteredActivities.length - 1 || nextMonth !== currentMonth;

              return (
                <Fragment key={activity.id}>
                  <ActivityCard
                    activity={activity}
                    showDateHeader={showDateHeader}
                    isLastInMonth={isLastInMonth}
                    filterComponent={index === 0 ? FilterTabs : null}
                  />

                  {/* 해당 월의 마지막 카드 뒤 구분선 */}
                  {isLastInMonth && (
                    <div className="hidden md:block w-full h-[3px] bg-primary-950 my-8" />
                  )}
                </Fragment>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
