import React, { Fragment, useState } from "react";
import Logo3D from "@/assets/icons/logo-mark-3d.png";
import ActivityCard, { type ActivityItem } from "@/pages/activity/ActivityCard";

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    title: "Flow: Startup Bridge",
    applyStartDate: "2026-08-01",
    applyEndDate: "2026-08-14", // 오늘 마감 테스트 (현재 날짜 기준)
    activityStartDate: "2026-08-15",
    activityEndDate: "2026-08-20",
    location: "정보과학관",
    description:
      "자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명",
    imageUrl: "/images/activity-sample.png",
  },
  {
    id: "2",
    title: "Flow: Startup Bridge",
    applyStartDate: "2026-08-01",
    applyEndDate: "2026-08-10", // 이미 모집 마감된 활동
    activityStartDate: "2026-08-11",
    activityEndDate: "2026-08-12",
    location: "정보과학관",
    description:
      "자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명",
    imageUrl: "/images/activity-sample.png",
  },
  {
    id: "3",
    title: "Flow: Startup Bridge",
    applyStartDate: "2026-07-01",
    applyEndDate: "2026-07-20", // 지난 7월 활동
    activityStartDate: "2026-07-25",
    activityEndDate: "2026-07-30",
    location: "정보과학관",
    description:
      "자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명",
    imageUrl: "/images/activity-sample.png",
  },
];

export default function ActivityPage() {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-text-primary tracking-dense">
      {/* 1. 히어로 배너 영역 */}
      <section className="relative overflow-hidden bg-[linear-gradient(90deg,var(--color-gray-50,#F2F2F3)_0%,var(--color-primary-300,#B2D3FF)_100%)] py-16 px-6 md:px-20 z-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="relative z-10">
            <h1 className="text-heading1 font-bold text-text-primary-950 text-[38px] leading-tight">
              함께 몰입하고 성장할 순간들이
              <br />
              기다리고 있어요
            </h1>
          </div>
          {/* 오른쪽 3D 그래픽 이미지 */}
          <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2  md:h-[230%] aspect-square flex items-center justify-center pointer-events-none select-none z-0">
            <img
              src={Logo3D}
              alt="GAMEWORKS Graphic"
              className="w-full h-full object-contain object-right drop-shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="max-w-6xl mx-auto px-6  py-[18px]">
        {/* 상단 필터 & 카운트 헤더 */}
        <div className="flex justify-between items-end border-b border-border">
          <h2 className="text-heading3 font-medium text-text-primary">
            지금 참여할 수 있는 활동이{" "}
            <span className="text-primary-700 font-bold">{MOCK_ACTIVITIES.length}개</span> 있어요
          </h2>

          <div className="flex gap-4 text-body1  font-bold">
            <button
              type="button"
              onClick={() => setFilter("upcoming")}
              className={
                filter === "upcoming" ? "text-text-primary font-bold" : "text-text-tertiary"
              }
            >
              예정된
            </button>
            <button
              type="button"
              onClick={() => setFilter("past")}
              className={filter === "past" ? "text-text-primary font-bold" : "text-text-tertiary"}
            >
              지난
            </button>
          </div>
        </div>
        <div className="w-full h-[3px] bg-primary-900 my-4" />

        {/* 3. 활동 타임라인 리스트 */}
        <div className="space-y-6">
          {MOCK_ACTIVITIES.map((activity, index) => {
            const currentMonth = activity.applyStartDate.slice(5, 7);
            const prevMonth = MOCK_ACTIVITIES[index - 1]?.applyStartDate.slice(5, 7);
            const nextMonth = MOCK_ACTIVITIES[index + 1]?.applyStartDate.slice(5, 7);

            const showDateHeader = index === 0 || prevMonth !== currentMonth;
            const isLastInMonth =
              index === MOCK_ACTIVITIES.length - 1 || nextMonth !== currentMonth;

            return (
              <Fragment key={activity.id}>
                <ActivityCard
                  activity={activity}
                  showDateHeader={showDateHeader}
                  isLastInMonth={isLastInMonth}
                />

                {/* 해당 월의 마지막 카드 바로 뒤에 전체 가로 구분선 출력 */}
                {isLastInMonth && <div className="w-full h-[3px] bg-primary-900 my-8" />}
              </Fragment>
            );
          })}
        </div>
      </main>
    </div>
  );
}
