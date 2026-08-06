import { Link, useNavigate } from "react-router-dom";
import iconArrowBack from "@/assets/icons/register/icon-arrow-back.svg";
import { ActivityInfoCard } from "@/components/register";
import { ROUTES } from "@/router/routes";
import { Button } from "@/ui";

/** Mock activity data — replace with API later. */
const MOCK_ACTIVITY = {
  applyPeriod: "2026.08.01 ~ 2026.08.02",
  activityPeriod: "2026.08.11 ~ 2026.08.12",
  location: "정보과학관",
  description:
    "자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명 자세한 설명",
};

const mobileCtaClass =
  "max-md:h-auto max-md:min-h-0 max-md:rounded-[0.625rem] max-md:px-6 max-md:py-[0.5625rem] max-md:text-[length:var(--font-size-body1)] max-md:font-bold max-md:leading-[1.5]";

export default function RegisterLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center px-5 py-16 md:px-6 md:py-[5.5rem]">
      <div className="flex w-full max-w-[20.5rem] flex-col items-center gap-6 md:max-w-[32.5rem] md:gap-[1.6875rem]">
        <h1 className="text-center font-bold text-primary-950">
          <span className="typo-heading3 md:hidden">GAMEWORKS에 지원하기</span>
          <span className="hidden flex-wrap items-center justify-center md:flex">
            <span className="typo-heading1">GAMEWORKS</span>
            <span className="text-[2.25rem] leading-[1.5]">에 지원하기</span>
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
              onClick={() => navigate(ROUTES.REGISTER_APPLY)}
            >
              다음
            </Button>
          }
        />

        <Link
          to={ROUTES.ACTIVITIES}
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-solid border-primary-600 px-4 py-2"
        >
          <span className="relative flex size-[1.125rem] shrink-0 rotate-90 items-center justify-center overflow-clip">
            <img
              src={iconArrowBack}
              alt=""
              className="absolute inset-0 block size-full max-w-none"
            />
          </span>
          <span className="typo-body2 typo-medium text-[color:var(--color-button-outline)]">
            활동 목록으로
          </span>
        </Link>
      </div>
    </div>
  );
}
