import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFormSchema, type NotionFormSchema } from "@/api";
import { IconArrowBack } from "@/assets/icons";
import { ActivityInfoCard } from "@/components/activity";
import { ROUTES } from "@/router/routes";
import { Button } from "@/ui";
import { NotionFormRenderer } from "./NotionFormRenderer";

const mobileCtaClass =
  "max-md:h-auto max-md:min-h-0 max-md:rounded-[0.625rem] max-md:px-6 max-md:py-2.25 max-md:typo-body1 max-md:typo-bold";

/** Parses `YYYY.MM.DD` as local end-of-day. */
function parseDotDateEndOfDay(value: string) {
  const [year, month, day] = value.split(".").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day, 23, 59, 59, 999);
}

function isApplyPeriodOpen(applyPeriod: string, now = new Date()) {
  const endRaw = applyPeriod.split("~")[1]?.trim();
  if (!endRaw) return true;
  const end = parseDotDateEndOfDay(endRaw);
  if (!end) return true;
  return now.getTime() <= end.getTime();
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

        <Link
          to={ROUTES.ACTIVITIES}
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-solid border-primary-600 px-4 py-2"
        >
          <span className="relative flex size-4.5 shrink-0 rotate-90 items-center justify-center overflow-clip">
            <IconArrowBack aria-hidden className="absolute inset-0 block size-full max-w-none" />
          </span>
          <span className="typo-body2 typo-medium text-(--color-button-outline)">
            활동 목록으로
          </span>
        </Link>
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
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center">
        <p className="typo-subheading text-gray-400">불러오는 중이에요…</p>
      </div>
    );
  }

  if (!started) {
    return <ActivityIntro schema={schema} onStart={() => setStarted(true)} />;
  }

  return <NotionFormRenderer schema={schema} />;
}
