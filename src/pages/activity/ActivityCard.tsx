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
}

// 날짜 포맷 헬퍼 함수 ("2026-08-01" -> "2026.08.01")
const formatDate = (dateStr: string) => dateStr.replace(/-/g, ".");
const formatPeriod = (start: string, end: string) => `${formatDate(start)} ~ ${formatDate(end)}`;

export default function ActivityCard({
  activity,
  showDateHeader = false,
  isLastInMonth = false,
}: ActivityCardProps) {
  // 1. 연도 및 월 자동 계산 (모집 시작일 기준)
  const [year, month] = activity.applyStartDate.split("-");

  // 2. 오늘 날짜 및 마감 상태 판별
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // "YYYY-MM-DD"

  // 오늘이 마감일인지 여부
  const isTodayDeadline = activity.applyEndDate === todayStr;

  // 신청 가능 여부: 오늘이 종료일 이전이거나 오늘인 경우
  const isApplyActive = activity.applyEndDate >= todayStr;

  return (
    <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start w-full">
      {/* 1. 좌측: 연도 / 월 타임라인 */}
      <div className="col-span-3 md:col-span-2 pt-1 flex-shrink-0">
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

      {/* 2. 우측: 활동 카드 본문 컨테이너 */}
      <div
        className={`col-span-9 sm:col-span-10 pb-8 min-w-0 w-full ${
          !isLastInMonth ? "border-b border-gray-200" : ""
        }`}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full min-w-0">
          {/* 좌측: 썸네일 + 콘텐츠 정보 */}
          <div className="flex flex-col sm:flex-row gap-6 flex-1 items-start w-full min-w-0">
            {/* 포스터 / 썸네일 이미지 */}
            <div className="w-full sm:w-[227px] h-[268px] rounded-[12px] overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
              <img
                src={activity.imageUrl}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 카드 텍스트 정보 */}
            <div className="flex-1 space-y-3 w-full min-w-0">
              {/* 제목 + 오늘마감 뱃지 */}
              <div className="flex items-center gap-2.5">
                <h3 className="text-heading3 font-medium text-text-primary tracking-tight truncate">
                  {activity.title}
                </h3>
                {isTodayDeadline && (
                  <span className="bg-red-50 text-accent-red border border-red-200 text-caption px-2 py-0.5 rounded font-semibold flex-shrink-0">
                    오늘마감
                  </span>
                )}
              </div>

              {/* 상세 스펙 박스 */}
              <div className="w-full min-w-0 bg-[#F2F2F3] p-5 rounded-[16px] text-body2 space-y-2 text-text-secondary">
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
                  <span className="font-medium text-subheading text-gray-800 block">활동 설명</span>
                  <p className="font-light text-subheading text-gray-700 leading-relaxed line-clamp-2 break-words">
                    {activity.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 우측: 신청 / 마감 버튼 */}
          <div className="self-end lg:self-center flex-shrink-0">
            {isApplyActive ? (
              <button
                type="button"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium text-body2 px-6 py-3 rounded-xl transition-all shadow-sm active:scale-95"
              >
                신청하기
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="bg-gray-600 text-white font-medium text-body2 px-6 py-3 rounded-xl cursor-not-allowed opacity-90"
              >
                신청마감
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
