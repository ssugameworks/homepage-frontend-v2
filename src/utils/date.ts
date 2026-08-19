/** 오늘 날짜를 브라우저 로컬 타임존과 무관하게 KST(UTC+9) 기준 YYYY-MM-DD로 반환한다. */
export function todayKstDateString(): string {
  const kstMs = Date.now() + 9 * 60 * 60 * 1000;
  return new Date(kstMs).toISOString().split("T")[0] as string;
}
