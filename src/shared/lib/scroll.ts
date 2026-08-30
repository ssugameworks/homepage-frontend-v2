/** prefers-reduced-motion 환경에서는 애니메이션 없이 즉시 스크롤한다. */
export function smoothScrollTo(top: number) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
}
