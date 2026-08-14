import React, { Fragment, useState } from "react";
import ActivityCard, { type ActivityItem } from "@/pages/activity/ActivityCard";

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    year: "2026",
    month: "08",
    title: "Flow: Startup Bridge",
    statusTag: "오늘마감",
    applyPeriod: "2026.08.01 ~ 2026.08.02",
    activityPeriod: "2026.08.11 ~ 2026.08.12",
    location: "정보과학관",
    description:
      "자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명",
    imageUrl: "/images/activity-sample.png",
    isApplyActive: true,
  },
  {
    id: "2",
    year: "2026",
    month: "08",
    title: "Flow: Startup Bridge",
    statusTag: "오늘마감",
    applyPeriod: "2026.08.01 ~ 2026.08.02",
    activityPeriod: "2026.08.11 ~ 2026.08.12",
    location: "정보과학관",
    description:
      "자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명",
    imageUrl: "/images/activity-sample.png",
    isApplyActive: true,
  },
  {
    id: "3",
    year: "2026",
    month: "07",
    title: "Flow: Startup Bridge",
    statusTag: "오늘마감",
    applyPeriod: "2026.08.01 ~ 2026.08.02",
    activityPeriod: "2026.08.11 ~ 2026.08.12",
    location: "정보과학관",
    description:
      "자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명",
    imageUrl: "/images/activity-sample.png",
    isApplyActive: true,
  },
];

export default function ActivityPage() {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-text-primary tracking-dense">
      {/* 1. 히어로 배너 영역 */}
      <section className="relative overflow-hidden bg-[linear-gradient(90deg,var(--color-gray-50,#F2F2F3)_0%,var(--color-primary-300,#B2D3FF)_100%)] py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-heading1 font-bold text-text-primary-950 text-[38px] leading-tight">
              함께 몰입하고 성장할 순간들이
              <br />
              기다리고 있어요
            </h1>
          </div>
          {/* 오른쪽 3D 그래픽 이미지 */}
          <div className="hidden md:block w-52 h-52 relative">
            {/* <img src="/images/hero-graphic.png" alt="Hero" className="w-full h-full object-contain" /> */}
          </div>
        </div>
      </section>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="max-w-6xl mx-auto px-6  py-[18px]">
        {/* 상단 필터 & 카운트 헤더 */}
        <div className="flex justify-between items-end border-b border-border pb-4 mb-10">
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

        {/* 3. 활동 타임라인 리스트 */}
        <div className="space-y-6">
          {MOCK_ACTIVITIES.map((activity, index) => {
            // 1. 새로운 월이 시작되는지 체크
            const showDateHeader =
              index === 0 || MOCK_ACTIVITIES[index - 1]?.month !== activity.month;

            // 2. 해당 월의 마지막 아이템인지 체크 (다음 아이템이 없거나, 다음 아이템의 월이 다를 때)
            const isLastInMonth =
              index === MOCK_ACTIVITIES.length - 1 ||
              MOCK_ACTIVITIES[index + 1]?.month !== activity.month;

            return (
              <Fragment key={activity.id}>
                <ActivityCard
                  activity={activity}
                  showDateHeader={showDateHeader}
                  isLastInMonth={isLastInMonth}
                />

                {/* 해당 월의 마지막 카드 바로 뒤에 전체 가로 구분선 출력 */}
                {isLastInMonth && <div className="w-full h-[1px] bg-gray-300 my-8" />}
              </Fragment>
            );
          })}
        </div>
      </main>
    </div>
  );
}
