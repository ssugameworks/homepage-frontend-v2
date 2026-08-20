import dayjs from "dayjs";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { applyFormPath } from "@/shared/config/routes";
import { todayKstDateString } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";
import type { ActivityListItem } from "../model/types";

interface ActivityCardProps {
  activity: ActivityListItem;
  showDateHeader?: boolean;
  isLastInMonth?: boolean;
  /** 모바일에서 그룹의 첫 카드 우측에 예정된/지난 탭을 함께 노출하기 위한 슬롯. */
  filterComponent?: React.ReactNode;
}

// 날짜 포맷 헬퍼 ("2026-08-01" -> "2026.08.01")
const formatDate = (dateStr: string) => dateStr.replace(/-/g, ".");
const formatPeriod = (start: string, end: string) => `${formatDate(start)} ~ ${formatDate(end)}`;

/** 남은 일수 계산 (D-11, D-1, 오늘마감). 브라우저 타임존과 무관하게 KST 기준으로 비교한다. */
function getDDay(endDateStr: string): string | null {
  const today = dayjs(todayKstDateString());
  const end = dayjs(endDateStr);

  const diffDays = end.diff(today, "day");

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
  const navigate = useNavigate();
  const [year, month] = activity.applyStartDate.split("-");
  const isApplyActive = activity.applyEndDate >= todayKstDateString();
  const dDayTag = getDDay(activity.applyEndDate);

  return (
    <div className="w-full">
      {/* 모바일 전용 상단 월 바: '2026 08'와 우측 필터 탭 (데스크톱에서는 숨김, 데스크톱 월 레이블은 ActivityPage에서 그룹 단위로 렌더링) */}
      {showDateHeader && (
        <div className="mb-4 flex items-end justify-between border-b-2 border-primary-950 pb-2 lg:hidden">
          <div className="flex items-baseline gap-2">
            <span className="typo-body2 typo-light text-text-tertiary">{year}</span>
            <span className="typo-heading1 text-primary-950 leading-none">{month}</span>
          </div>
          {filterComponent}
        </div>
      )}

      <div
        className={`w-full min-w-0 py-3 lg:py-6 ${isLastInMonth ? "" : "border-b border-gray-200"}`}
      >
        <div className="flex w-full min-w-0 items-center justify-between gap-4">
          {/* 썸네일 & 텍스트 콘텐츠: 데스크톱에서는 이미지 높이에 텍스트 컨테이너를 맞춘다(items-stretch) */}
          <div className="flex min-w-0 flex-1 items-start gap-3 md:gap-4 lg:items-stretch lg:gap-6">
            {/* 포스터 이미지: 인스타그램 게시물 비율(4:5). 포스터가 없으면 빈 배경만 표시한다. */}
            <div className="aspect-[4/5] w-21 shrink-0 overflow-hidden rounded-lg bg-gray-100 shadow-sm md:w-32 lg:w-56.75 lg:rounded-[0.625rem]">
              {activity.imageUrl && (
                <img
                  src={activity.imageUrl}
                  alt={activity.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {/* 텍스트 정보 영역: 데스크톱에서는 세로 flex로 이미지 높이를 그대로 채운다 */}
            <div className="w-full min-w-0 flex-1 space-y-2 lg:flex lg:flex-col lg:space-y-0 lg:gap-2">
              {/* 제목 & D-Day 뱃지 */}
              <div className="flex items-center gap-3">
                <h3 className="typo-heading3 typo-medium truncate text-primary-950">
                  {activity.title}
                </h3>
                {dDayTag && (
                  <span className="typo-body2 typo-bold shrink-0 rounded border border-accent-red px-1.5 py-0.5 leading-tight text-accent-red lg:typo-body1">
                    {dDayTag}
                  </span>
                )}
              </div>

              {/* 모바일 전용 컴팩트 텍스트 리스트 (데스크톱에서는 숨김) */}
              <div className="space-y-1 text-[0.8125rem] text-gray-600 md:space-y-1.5 md:text-body1 lg:hidden">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="w-14 shrink-0 font-medium whitespace-nowrap text-gray-700 md:w-18">
                    접수 기간
                  </span>
                  <span className="shrink-0 text-gray-300">|</span>
                  <span className="truncate text-gray-600">
                    {formatPeriod(activity.applyStartDate, activity.applyEndDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="w-14 shrink-0 font-medium whitespace-nowrap text-gray-700 md:w-18">
                    활동 기간
                  </span>
                  <span className="shrink-0 text-gray-300">|</span>
                  <span className="truncate text-gray-600">
                    {formatPeriod(activity.activityStartDate, activity.activityEndDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="w-14 shrink-0 font-medium whitespace-nowrap text-gray-700 md:w-18">
                    진행 장소
                  </span>
                  <span className="shrink-0 text-gray-300">|</span>
                  <span className="truncate text-gray-600">{activity.location}</span>
                </div>
              </div>

              {/* 데스크톱 전용 회색 상세 정보 박스 (모바일에서는 숨김). 남은 높이를 채우고, 넘치면 잘라낸다. */}
              <div className="hidden w-full min-w-0 rounded-lg bg-gray-100 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:overflow-hidden">
                <div className="space-y-2 p-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="typo-subheading typo-medium w-20 shrink-0 text-gray-800">
                      신청 기간
                    </span>
                    <span className="typo-subheading typo-light break-words text-gray-700">
                      {formatPeriod(activity.applyStartDate, activity.applyEndDate)}
                    </span>
                  </div>
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="typo-subheading typo-medium w-20 shrink-0 text-gray-800">
                      활동 기간
                    </span>
                    <span className="typo-subheading typo-light break-words text-gray-700">
                      {formatPeriod(activity.activityStartDate, activity.activityEndDate)}
                    </span>
                  </div>
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="typo-subheading typo-medium w-20 shrink-0 text-gray-800">
                      진행 장소
                    </span>
                    <span className="typo-subheading typo-light break-words text-gray-700">
                      {activity.location}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 space-y-1 overflow-hidden px-4 pb-4">
                  <span className="typo-subheading typo-medium block text-gray-800">활동 설명</span>
                  <p className="typo-subheading typo-light line-clamp-3 break-words text-gray-700">
                    {activity.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 신청 버튼 */}
          <div className="shrink-0 self-center">
            <Button
              variant="primary"
              size="sm"
              disabled={!isApplyActive}
              onClick={() => navigate(applyFormPath(activity.slug))}
              className="!h-10 !min-w-0 !rounded-lg !px-3.5 !py-2 !text-body2 md:!h-11 md:!min-w-20 md:!rounded-[0.625rem] md:!px-4 md:!text-subheading lg:!h-12 lg:!min-w-25 lg:!px-2.5"
            >
              {isApplyActive ? "신청하기" : "신청마감"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
