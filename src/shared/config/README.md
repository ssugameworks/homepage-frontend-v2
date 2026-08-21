# config

라우트 경로 상수 모음.

- `routes.ts`: 경로 문자열 상수(`ROUTES`)와 `applyFormPath` 헬퍼. 컴포넌트에서 경로 문자열을
  직접 하드코딩하지 않고 이 상수를 참조한다

실제 라우터 조립(`createBrowserRouter`)은 `app/router`에 있다.
