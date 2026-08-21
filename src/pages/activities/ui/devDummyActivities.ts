import dayjs from "dayjs";
import type { ActivityListItem } from "@/entities/activity";
import { todayKstDateString } from "@/shared/lib";

const today = dayjs(todayKstDateString());
const d = (offsetDays: number) => today.add(offsetDays, "day").format("YYYY-MM-DD");

/**
 * 개발 중 스켈레톤/실제 데이터 UI를 비교하기 위한 더미 활동 목록.
 * DevPreviewFab에서만 쓰이며 실제 API 응답을 대체하지 않는다.
 */
export const DUMMY_ACTIVITIES: ActivityListItem[] = [
  {
    id: "dummy-coffeechat",
    slug: "dummy-coffeechat",
    title: "현업 개발자 커피챗",
    applyStartDate: d(-5),
    applyEndDate: d(3),
    activityStartDate: d(10),
    activityEndDate: d(10),
    location: "정보과학관 401호",
    description: "현업에서 일하는 선배의 경험을 직접 듣고, 진로 고민을 편하게 나눠요.",
    imageUrl: "",
  },
  {
    id: "dummy-flow",
    slug: "dummy-flow",
    title: "Flow 아이디어 해커톤",
    applyStartDate: d(-2),
    applyEndDate: d(9),
    activityStartDate: d(16),
    activityEndDate: d(17),
    location: "게임웍스 세미나실",
    description: "1박 2일 동안 팀과 함께 서비스 아이디어를 기획하고 구현해요.",
    imageUrl: "",
  },
  {
    id: "dummy-buddy",
    slug: "dummy-buddy",
    title: "짝선짝후 미션 데이",
    applyStartDate: d(1),
    applyEndDate: d(14),
    activityStartDate: d(21),
    activityEndDate: d(21),
    location: "학생회관 대강당",
    description: "선배와 후배가 한 팀이 되어 미션을 함께 수행하며 가까워져요.",
    imageUrl: "",
  },
  {
    id: "dummy-mentoring",
    slug: "dummy-mentoring",
    title: "신입 멘토링 프로그램",
    applyStartDate: d(-40),
    applyEndDate: d(-25),
    activityStartDate: d(-20),
    activityEndDate: d(-1),
    location: "정보과학관 세미나실",
    description: "학교 생활과 전공 공부를 먼저 경험한 멘토에게 편하게 질문할 수 있어요.",
    imageUrl: "",
  },
  {
    id: "dummy-ideathon",
    slug: "dummy-ideathon",
    title: "겨울 아이디어톤",
    applyStartDate: d(-60),
    applyEndDate: d(-45),
    activityStartDate: d(-40),
    activityEndDate: d(-39),
    location: "정보과학관 대강당",
    description: "팀과 함께 서비스 아이디어를 기획하고 멘토·심사위원에게 피드백을 받아요.",
    imageUrl: "",
  },
];
