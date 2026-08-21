# lib

UI와 무관한 순수 유틸리티, 검증 스키마, 범용 훅 모음.

- `cx.ts` 자리 없음: 클래스 조합은 `tailwind-variants`의 `tv()`를 쓴다 (`shared/ui`, `shared/ui/form-wizard` 참고)
- `date.ts`: KST 기준 날짜 유틸
- `validation/`: zod 스키마 (학번, 전화번호, URL, 이메일 등)
- `hooks/`: 여러 곳에서 쓰는 범용 훅 (`useCountUp`, `useInView`)

React에 의존하지 않는 함수는 동일한 입력에 항상 동일한 결과를 반환해야 한다.
