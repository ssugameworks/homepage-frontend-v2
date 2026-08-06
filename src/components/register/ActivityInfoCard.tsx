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

const labelClass =
  "shrink-0 text-[length:var(--font-size-body1)] font-bold leading-[1.5] text-primary-950 md:text-[length:var(--font-size-heading3)]";

const valueClass =
  "text-[length:var(--font-size-body1)] font-light leading-[1.5] text-gray-700 md:text-[length:var(--font-size-heading3)]";

export function ActivityInfoCard({ activity, actions }: ActivityInfoCardProps) {
  return (
    <div className="flex w-full max-w-[20.5rem] flex-col overflow-hidden rounded-[0.9375rem] bg-surface-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:max-w-[32.5rem] md:rounded-[1.25rem]">
      <div className="flex flex-col gap-4 px-9 pt-8 pb-6 md:px-[3.1875rem] md:pt-[3.625rem] md:pb-8">
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-[0.8125rem]">
            <p className={labelClass}>신청 기간</p>
            <p className={valueClass}>{activity.applyPeriod}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-[0.8125rem]">
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

      {actions ? (
        <div className="px-9 pb-6 md:px-[3.1875rem] md:pb-[3.625rem]">{actions}</div>
      ) : null}
    </div>
  );
}
