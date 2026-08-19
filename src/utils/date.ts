import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/** 오늘 날짜를 브라우저 로컬 타임존과 무관하게 KST(UTC+9) 기준 YYYY-MM-DD로 반환한다. */
export function todayKstDateString(): string {
  return dayjs.utc().add(9, "hour").format("YYYY-MM-DD");
}
