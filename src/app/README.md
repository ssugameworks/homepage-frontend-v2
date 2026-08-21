# app

앱 전역 부트스트랩, 라우터 조립, 루트 레이아웃.

- `App.tsx`, `frontend.tsx`: 엔트리포인트
- `router/`: `createBrowserRouter` 인스턴스. 각 라우트는 `pages/*`를 lazy import한다
- `layouts/`: 여러 라우트가 공유하는 레이아웃 쉘 (`RootLayout`, `RegisterLayout`). `widgets/header`, `widgets/footer`를 조합한다
- `index.css`, `global.d.ts`: 전역 스타일 진입점, 전역 타입 선언

다른 모든 레이어를 참조할 수 있는 최상위 레이어다. 반대로 `app`을 참조하는 코드는 없어야 한다.
