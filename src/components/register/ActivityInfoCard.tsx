import type { ReactNode } from "react";

type ActivityInfo = {
  applyPeriod: string;
  activityPeriod: string;
  location: string;
  description: string;
};

type ActivityInfoCardProps = {
  activity: ActivityInfo;
  actions?: ReactNode;
};

const labelClass = "shrink-0 typo-body1 typo-bold text-primary-950 md:typo-heading3";

const valueClass =
  "min-w-0 break-words typo-body1 typo-light text-gray-700 md:typo-heading3 md:typo-light";

export function ActivityInfoCard({ activity, actions }: ActivityInfoCardProps) {
  return (
    <div className="flex w-full max-w-82 flex-col overflow-hidden rounded-[0.9375rem] bg-surface-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:max-w-130 md:rounded-[1.25rem]">
      <div className="flex flex-col gap-4 px-9 pt-8 pb-6 md:px-12.75 md:pt-14.5 md:pb-8">
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-3.25">
            <p className={labelClass}>신청 기간</p>
            <p className={valueClass}>{activity.applyPeriod}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-3.25">
            <p className={labelClass}>활동 기간</p>
            <p className={valueClass}>{activity.activityPeriod}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-3">
            <p className={labelClass}>진행 장소</p>
            <p className={valueClass}>{activity.location}</p>
          </div>
        </div>

        <div className="h-px w-full bg-gray-200" />

        <div className="flex flex-col gap-3 md:gap-4">
          <p className={labelClass}>활동 설명</p>
          <p className={valueClass}>{activity.description}</p>
        </div>
      </div>

      {actions ? <div className="px-9 pb-6 md:px-12.75 md:pb-14.5">{actions}</div> : null}
    </div>
  );
}
