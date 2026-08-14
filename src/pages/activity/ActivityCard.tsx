import type React from "react";
import { Button } from "@/ui/Button";

export interface ActivityItem {
  id: string;
  title: string;
  applyStartDate: string;
  applyEndDate: string;
  activityStartDate: string;
  activityEndDate: string;
  location: string;
  description: string;
  imageUrl: string;
}

interface ActivityCardProps {
  activity: ActivityItem;
  showDateHeader?: boolean;
  isLastInMonth?: boolean;
  //[반응형] 모바일에서 첫 번째 월(08) 우측에 탭(예정된/지난)을 넣기 위한 prop 추가
  filterComponent?: React.ReactNode;
}

// 날짜 포맷 헬퍼 ("2026-08-01" -> "2026.08.01")
const formatDate = (dateStr: string) => dateStr.replace(/-/g, ".");
const formatPeriod = (start: string, end: string) => `${formatDate(start)} ~ ${formatDate(end)}`;

// [반응형] 남은 일수 계산 함수 추가 (D-11, D-1, 오늘마감 계산)
function getDDay(endDateStr: string): string | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDateStr);
  end.setHours(0, 0, 0, 0);

  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return null; // 마감됨
  if (diffDays === 0) return "오늘마감";
  return `D-${diffDays}`;
}

export default function ActivityCard({
  activity,
  showDateHeader = false,
  isLastInMonth = false,
  filterComponent,
}: ActivityCardProps) {
  const [year, month] = activity.applyStartDate.split("-");
  const todayStr = new Date().toISOString().split("T")[0];
  const isApplyActive = activity.applyEndDate >= todayStr;
  const dDayTag = getDDay(activity.applyEndDate);

  return (
    <div className="w-full">
      {/* [반응형] [모바일 전용 상단 월 바]
          모바일 시안처럼 카드 상단에 '2026 08'과 우측 필터 탭이 위치하고 밑줄이 그어짐 (PC에서는 숨김: md:hidden) */}
      {showDateHeader && (
        <div className="md:hidden flex items-end justify-between pb-2 mb-4 border-b-2 border-primary-950">
          <div className="flex items-baseline gap-2">
            <span className="text-body2 text-text-primary font-normal">{year}</span>
            <span className="text-[28px] font-bold text-text-primary-950 leading-none">
              {month}
            </span>
          </div>
          {/* 모바일 첫 번째 월 오른쪽에 탭 컴포넌트 렌더링 */}
          {filterComponent && <div>{filterComponent}</div>}
        </div>
      )}

      {/* 2. 카드 본문 레이아웃 */}
      <div className="grid grid-cols-12 md:gap-8 lg:gap-12 items-start w-full">
        {/* [반응형] [PC 전용 좌측 월 타임라인]
            모바일에서는 상단 바로 올라갔으므로 PC에서만 표시 (hidden md:block) */}
        <div className="hidden md:block col-span-3 md:col-span-2 pt-1 flex-shrink-0">
          {showDateHeader ? (
            <div>
              <span className="text-[14px] text-text-tertiary font-light block leading-none mb-1">
                {year}
              </span>
              <span className="text-4xl md:text-5xl lg:text-[80px] font-bold text-text-primary-950 leading-none">
                {month}
              </span>
            </div>
          ) : null}
        </div>

        {/* 우측: 카드 본문 컨테이너 */}
        <div
          className={`col-span-12 md:col-span-9 lg:col-span-10 pb-6 md:pb-8 min-w-0 w-full ${
            !isLastInMonth ? "border-b border-gray-200" : ""
          }`}
        >
          <div className="flex justify-between items-center gap-4 w-full min-w-0">
            {/* 썸네일 & 텍스트 콘텐츠 */}
            <div className="flex gap-6 flex-1 items-start min-w-0">
              {/* [반응형] [포스터 이미지]
                  모바일 시안에는 이미지가 없으므로 PC에서만 표시 (hidden md:block) */}
              <div className="hidden md:block w-[227px] h-[268px] rounded-[12px] overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
                <img
                  src={activity.imageUrl}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 텍스트 정보 영역 */}
              <div className="flex-1 space-y-2 md:space-y-3 w-full min-w-0">
                {/* 제목 & D-Day 뱃지 */}
                <div className="flex items-center gap-2">
                  <h3 className="text-[17px] md:text-heading3 font-bold text-text-primary tracking-tight truncate">
                    {activity.title}
                  </h3>
                  {/* [반응형] 계산된 dDayTag (D-11, D-1, 오늘마감) 출력 */}
                  {dDayTag && (
                    <span className="border border-red-500 text-red-500 font-bold text-[11px] md:text-body1 px-1.5 py-0.5 rounded-[4px] flex-shrink-0 leading-tight">
                      {dDayTag}
                    </span>
                  )}
                </div>

                {/* [반응형] [모바일 전용 컴팩트 텍스트 리스트]
                    모바일 시안 스타일인 "접수 기간 | 2026.08.01 ~ ..." 텍스트 (PC에서는 숨김: md:hidden) */}
                <div className="md:hidden space-y-1 text-[13px] text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium w-14 flex-shrink-0">접수 기간</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-600 truncate">
                      {formatPeriod(activity.applyStartDate, activity.applyEndDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium w-14 flex-shrink-0">활동 기간</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-600 truncate">
                      {formatPeriod(activity.activityStartDate, activity.activityEndDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium w-14 flex-shrink-0">진행 장소</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-600 truncate">{activity.location}</span>
                  </div>
                </div>

                {/* [반응형] [PC 전용 회색 상세 정보 박스]
                    모바일에서는 숨김 처리 (hidden md:block) */}
                <div className="hidden md:block w-full min-w-0 bg-[#F2F2F3] p-5 rounded-[16px] text-body2 space-y-2 text-text-secondary">
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="font-medium text-subheading text-gray-800 w-20 flex-shrink-0">
                      신청 기간
                    </span>
                    <span className="font-light text-subheading text-gray-700 truncate">
                      {formatPeriod(activity.applyStartDate, activity.applyEndDate)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 min-w-0">
                    <span className="font-medium text-subheading text-gray-800 w-20 flex-shrink-0">
                      활동 기간
                    </span>
                    <span className="font-light text-subheading text-gray-700 truncate">
                      {formatPeriod(activity.activityStartDate, activity.activityEndDate)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 min-w-0">
                    <span className="font-medium text-subheading text-gray-800 w-20 flex-shrink-0">
                      진행 장소
                    </span>
                    <span className="font-light text-subheading text-gray-700 truncate">
                      {activity.location}
                    </span>
                  </div>

                  <div className="pt-0.8 space-y-1 min-w-0">
                    <span className="font-medium text-subheading text-gray-800 block">
                      활동 설명
                    </span>
                    <p className="font-light text-subheading text-gray-700 leading-relaxed line-clamp-2 break-words">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* [반응형] [우측 버튼 반응형 크기 조절] */}
            <div className="self-center flex-shrink-0">
              <Button
                variant="primarySolid"
                size="sm"
                disabled={!isApplyActive}
                className="!min-w-0 px-3.5 py-2 text-[13px] md:text-subheading md:px-6 md:py-3 md:!min-w-28 rounded-lg"
              >
                {isApplyActive ? "신청하기" : "신청마감"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
