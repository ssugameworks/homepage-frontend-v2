# shared

도메인 지식이 없는 범용 코드. 다른 모든 레이어가 참조할 수 있는 최하위 레이어라
반대로 이 레이어는 상위 레이어(entities/features/widgets/pages/app)를 참조하지 않는다.

- `ui/`: 디자인 시스템 컴포넌트 (Button, TextField 등) + `form-wizard/` 폼 마법사 뼈대
- `api/`: fetch 래퍼 (`apiGet`/`apiPost`)
- `config/`: 라우트 경로 상수
- `lib/`: 순수 유틸 함수, 커스텀 훅, 검증 스키마
- `assets/`: 아이콘/이미지 등 정적 파일
- `styles/`: 디자인 토큰, 전역 CSS

각 세그먼트는 `index.ts`로 공개 API를 노출한다. 세그먼트 내부 파일을 다른 레이어에서
직접 import하지 않는다.
