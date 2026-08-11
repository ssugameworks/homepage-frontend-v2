import { Link, useNavigate } from "react-router-dom";
import { IconArrowBack } from "@/assets/icons";
import { ActivityInfoCard } from "@/components/register";
import { ROUTES } from "@/router/routes";
import { Button } from "@/ui";

/** Mock activity data — replace with API later. */
const MOCK_ACTIVITY = {
  applyPeriod: "2026.08.01 ~ 2026.08.31",
  activityPeriod: "2026.08.11 ~ 2026.08.12",
  location: "정보과학관",
  description:
    "자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명",
};

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

export default function RegisterLandingPage() {
  const navigate = useNavigate();
  const applyOpen = isApplyPeriodOpen(MOCK_ACTIVITY.applyPeriod);

  return (
    <div className="flex flex-1 flex-col items-center px-5 py-16 md:px-6 md:py-22">
      <div className="flex w-full max-w-82 flex-col items-center gap-6 md:max-w-130 md:gap-6.75">
        <h1 className="text-center font-bold text-primary-950">
          <span className="typo-heading3 md:hidden">GAMEWORKS에 지원하기</span>
          <span className="hidden flex-wrap items-center justify-center md:flex">
            <span className="typo-heading1">GAMEWORKS</span>
            <span className="text-4xl leading-normal">에 지원하기</span>
          </span>
        </h1>

        <ActivityInfoCard
          activity={MOCK_ACTIVITY}
          actions={
            <Button
              type="button"
              size="xl"
              fullWidth
              className={mobileCtaClass}
              disabled={!applyOpen}
              onClick={() => {
                if (!applyOpen) return;
                navigate(ROUTES.REGISTER_APPLY);
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
          <span className="typo-body2 typo-medium text-[color:var(--color-button-outline)]">
            활동 목록으로
          </span>
        </Link>
      </div>
    </div>
  );
}
