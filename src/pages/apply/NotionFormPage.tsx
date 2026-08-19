import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFormSchema, type NotionFormSchema } from "@/api";
import { IconArrowBack } from "@/assets/icons";
import {
  ActivityInfoCard,
  activityInfoLabelClass,
  activityInfoValueClass,
} from "@/components/activity";
import { ROUTES } from "@/router/routes";
import { Button } from "@/ui";
import { todayKstDateString } from "@/utils";
import { NotionFormRenderer } from "./NotionFormRenderer";

dayjs.extend(customParseFormat);

const mobileCtaClass =
  "max-md:h-auto max-md:min-h-0 max-md:rounded-[0.625rem] max-md:px-6 max-md:py-2.25 max-md:typo-body1 max-md:typo-bold";

/** 브라우저 로컬 타임존과 무관하게 KST 기준으로 신청기간을 판정한다. */
function isApplyPeriodOpen(applyPeriod: string, now = dayjs(todayKstDateString())) {
  const [startRaw, endRaw] = applyPeriod.split("~").map((part) => part?.trim());

  const start = startRaw ? dayjs(startRaw, "YYYY.MM.DD") : null;
  if (start?.isValid() && now.isBefore(start.startOf("day"))) return false;

  const end = endRaw ? dayjs(endRaw, "YYYY.MM.DD") : null;
  if (end?.isValid() && now.isAfter(end.endOf("day"))) return false;

  return true;
}

function BackToActivitiesLink() {
  return (
    <Link
      to={ROUTES.ACTIVITIES}
      className="inline-flex items-center gap-2 rounded-2xl border-2 border-solid border-primary-600 px-4 py-2"
    >
      <span className="relative flex size-4.5 shrink-0 rotate-90 items-center justify-center overflow-clip">
        <IconArrowBack aria-hidden className="absolute inset-0 block size-full max-w-none" />
      </span>
      <span className="typo-body2 typo-medium text-(--color-button-outline)">활동 목록으로</span>
    </Link>
  );
}

function ActivityIntro({ schema, onStart }: { schema: NotionFormSchema; onStart: () => void }) {
  const applyOpen = isApplyPeriodOpen(schema.activity.applyPeriod);

  return (
    <div className="flex flex-1 flex-col items-center px-5 py-16 md:px-6 md:py-22">
      <div className="flex w-full max-w-82 flex-col items-center gap-6 md:max-w-130 md:gap-6.75">
        <h1 className="text-center font-bold text-primary-950">
          <span className="typo-heading3 md:typo-heading1">{schema.title}</span>
        </h1>

        <ActivityInfoCard
          activity={schema.activity}
          actions={
            <Button
              type="button"
              size="xl"
              fullWidth
              className={mobileCtaClass}
              disabled={!applyOpen}
              onClick={() => {
                if (!isApplyPeriodOpen(schema.activity.applyPeriod)) return;
                onStart();
              }}
            >
              {applyOpen ? "다음" : "신청 마감"}
            </Button>
          }
        />

        <BackToActivitiesLink />
      </div>
    </div>
  );
}

/** ActivityIntro와 동일한 텍스트 크기/레이아웃을 유지해서 로딩 완료 시 레이아웃 시프트가 없게 한다. */
function ActivityIntroSkeleton() {
  const skeletonBar =
    "inline-block animate-pulse rounded-md bg-gray-200 text-transparent select-none";

  return (
    <div className="flex flex-1 flex-col items-center px-5 py-16 md:px-6 md:py-22">
      <div className="flex w-full max-w-82 flex-col items-center gap-6 md:max-w-130 md:gap-6.75">
        <h1 className="text-center font-bold text-primary-950">
          <span className={`typo-heading3 md:typo-heading1 ${skeletonBar}`}>
            활동 정보를 불러오고 있어요
          </span>
        </h1>

        <div className="flex w-full max-w-82 flex-col overflow-hidden rounded-[0.9375rem] bg-surface-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:max-w-130 md:rounded-[1.25rem]">
          <div className="flex flex-col gap-4 px-9 pt-8 pb-6 md:px-12.75 md:pt-14.5 md:pb-8">
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-3.25">
                <p className={activityInfoLabelClass}>신청 기간</p>
                <span className={`${activityInfoValueClass} ${skeletonBar}`}>
                  2026.08.01 ~ 2026.08.31
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-3.25">
                <p className={activityInfoLabelClass}>활동 기간</p>
                <span className={`${activityInfoValueClass} ${skeletonBar}`}>
                  2026.08.11 ~ 2026.08.12
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-3">
                <p className={activityInfoLabelClass}>진행 장소</p>
                <span className={`${activityInfoValueClass} ${skeletonBar}`}>정보과학관</span>
              </div>
            </div>

            <div className="h-px w-full bg-gray-200" />

            <div className="flex flex-col gap-3 md:gap-4">
              <p className={activityInfoLabelClass}>활동 설명</p>
              <span className={`${activityInfoValueClass} ${skeletonBar} w-full`}>
                자세한 설명이 곧 표시됩니다
              </span>
            </div>
          </div>

          <div className="px-9 pb-6 md:px-12.75 md:pb-14.5">
            <Button
              type="button"
              size="xl"
              fullWidth
              className={`${mobileCtaClass} pointer-events-none animate-pulse`}
              disabled
            >
              &nbsp;
            </Button>
          </div>
        </div>

        <BackToActivitiesLink />
      </div>
    </div>
  );
}

export default function NotionFormPage() {
  const { slug } = useParams<{ slug: string }>();
  const [schema, setSchema] = useState<NotionFormSchema | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setSchema(null);
    setError(null);
    setStarted(false);

    fetchFormSchema(slug)
      .then((result) => {
        if (!cancelled) setSchema(result);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "폼을 불러오지 못했어요");
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center">
        <p className="typo-subheading text-primary-950">{error}</p>
      </div>
    );
  }

  if (!schema) {
    return <ActivityIntroSkeleton />;
  }

  if (!started) {
    return <ActivityIntro schema={schema} onStart={() => setStarted(true)} />;
  }

  return <NotionFormRenderer schema={schema} />;
}
