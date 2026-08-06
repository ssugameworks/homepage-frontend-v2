import { useState } from "react";
import iconBuddy from "@/assets/icons/activity/buddy.png";
import iconCoffeechat from "@/assets/icons/activity/coffeechat.png";
import iconFlow from "@/assets/icons/activity/flow.png";
import iconIdeathon from "@/assets/icons/activity/ideathon.png";
import iconMentoring from "@/assets/icons/activity/mentoring.png";
import iconMt from "@/assets/icons/activity/mt.png";
import { ActivityOverlay } from "./ActivityOverlay";
import { ACTIVITY_OVERLAYS, type ActivityId } from "./activityOverlays";
import { PlusCircleIcon } from "./icons";

type Activity = {
  id: ActivityId;
  chip: string;
  icon: string;
  title: string;
  description: string;
  buttonLabel: string;
};

// TODO: 라이팅 확정 필요 (Figma memo — 디자인 통일성을 위해 설명 2줄 유지)
const ACTIVITIES: Activity[] = [
  {
    id: "coffeechat",
    chip: "커피챗",
    icon: iconCoffeechat,
    title: "현업 이야기를 들어요",
    description:
      "현업에서 일하는 선배의 경험을 직접 들어요\n취업과 진로에 대한 고민도 편하게 나눌 수 있어요",
    buttonLabel: "프로그램 보기",
  },
  {
    id: "buddy",
    chip: "짝선짝후",
    icon: iconBuddy,
    title: "미션으로 가까워져요",
    description:
      "선배·후배가 한 팀이 되어 미션을 함께해요\n처음 만난 사람과도 자연스럽게 가까워져요",
    buttonLabel: "활동 사진 보기",
  },
  {
    id: "mentoring",
    chip: "멘토링",
    icon: iconMentoring,
    title: "경험을 공유하고 배워요",
    description: "학교 생활, 전공, 소모임까지 —\n먼저 경험한 멘토에게 편하게 질문할 수 있어요",
    buttonLabel: "프로그램 보기",
  },
  {
    id: "ideathon",
    chip: "아이디어톤",
    icon: iconIdeathon,
    title: "아이디어를 구체화해요",
    description: "팀과 함께 서비스 아이디어를 기획하고,\n멘토와 심사위원에게 직접 피드백을 받아요",
    buttonLabel: "수상작 보기",
  },
  {
    id: "flow",
    chip: "Flow",
    icon: iconFlow,
    title: "서비스로 만들어요",
    description:
      "1박 2일 동안 함께 시간을 보내며, 학기 중엔 나누지 못했던 이야기까지 편하게 나눠요.",
    buttonLabel: "수상작 보기",
  },
  {
    id: "mt",
    chip: "MT",
    icon: iconMt,
    title: "추억을 함께 만들어요",
    description:
      "1박 2일 동안 함께 시간을 보내며,\n학기 중엔 나누지 못했던 이야기까지 편하게 나눠요",
    buttonLabel: "활동 사진 보기",
  },
];

/**
 * Figma spec (web 1440×900 · mobile 390×700)
 * - 섹션: bg #FAFAFA, padding 150(web) / 24(mobile), content 세로 중앙,
 *   gap/xlarge (32 · mobile 24)
 * - main_content/title: gap 8 — 캡션 body1-500(16) gray-400,
 *   타이틀 heading1-700 (38 · mobile 24) gray-950
 * - 카드(Home/Activity/card): card/card 340(mobile 300) 정사각, padding gap/xlarge(32 · mobile 24),
 *   radius gap/large(24 · mobile 16), bg semantic/shadow(white 5%),
 *   효과 activity(0 2 5 #000 20%) — 안쪽 pt 16, 위 그룹 gap/xlarge
 * - 칩: padding 8/4, radius 16, bg gray-50, 아이콘 15 + body1-500(16) gray-600
 * - 제목: heading2-700 (28 · mobile 20), primary-950
 * - 설명: body1-300 (16/150, Light), tracking -3%, primary-950
 * - 버튼(Button/Detail): padding 16/8, radius 32, gap 8, bg button/primary-mixed,
 *   그림자 0 0 2 #000 20%, label body1-700(16) gray-50 + plus 아이콘 16
 *   — 누르면 활동 상세 모달(overlay/main)이 열림
 * - 카드 배치: flex-wrap gap 32, 중앙 정렬 / mobile: gap 24 스와이프 캐러셀
 */
export function ActivitiesSection() {
  const [openId, setOpenId] = useState<ActivityId | null>(null);

  return (
    <section
      className="flex min-h-[700px] items-center bg-[color:var(--gw-bg-white)] py-16 lg:min-h-[900px]"
      aria-label="주요 활동"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 lg:gap-8 lg:px-[150px]">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-[16px] text-[color:var(--gw-gray-400)] leading-[1.5]">
            Activities
          </p>
          <h2 className="font-bold text-[24px] text-[color:var(--gw-gray-950)] leading-[1.5] lg:text-[38px]">
            한 해동안 함께할 주요 활동이에요.
          </h2>
        </div>

        <ul className="home-carousel -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-wrap lg:justify-center lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0">
          {ACTIVITIES.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onOpen={() => setOpenId(activity.id)}
            />
          ))}
        </ul>
      </div>

      {openId ? (
        <ActivityOverlay overlay={ACTIVITY_OVERLAYS[openId]} onClose={() => setOpenId(null)} />
      ) : null}
    </section>
  );
}

function ActivityCard({ activity, onOpen }: { activity: Activity; onOpen: () => void }) {
  return (
    <li className="home-card size-[300px] shrink-0 snap-center rounded-[16px] bg-white p-6 lg:size-[340px] lg:rounded-[24px] lg:p-8">
      <div className="flex h-full flex-col items-start justify-between pt-4">
        <div className="flex flex-col items-start gap-6 lg:gap-8">
          <span className="flex items-center gap-2 rounded-[16px] bg-[color:var(--gw-gray-50)] px-2 py-1">
            <img src={activity.icon} alt="" className="size-[15px]" />
            <span className="font-medium text-[16px] text-[color:var(--gw-gray-600)] leading-[1.5]">
              {activity.chip}
            </span>
          </span>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-[20px] text-[color:var(--gw-primary-950)] leading-[1.5] lg:text-[28px]">
              {activity.title}
            </h3>
            <p className="whitespace-pre-line font-light text-[16px] text-[color:var(--gw-primary-950)] leading-[1.5] tracking-[-0.03em]">
              {activity.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          className="home-btn home-btn-primary gap-2 whitespace-nowrap px-4 py-2 font-bold text-[16px] text-[color:var(--gw-gray-50)] leading-[1.5]"
        >
          {activity.buttonLabel}
          <PlusCircleIcon />
        </button>
      </div>
    </li>
  );
}
