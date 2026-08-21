# pages

라우트와 1:1로 대응되는 슬라이스 모음. 각 슬라이스는 `ui/`에 페이지 컴포넌트를 두고,
슬라이스 루트의 `index.ts`로 default export를 재노출한다 (`app/router`가 이 배럴을 통해 lazy import한다).

페이지는 `widgets`/`features`/`entities`를 조립하는 역할만 하며, 비즈니스 로직은
아래 레이어에 위임한다. pages끼리는 서로 import하지 않는다 (여러 라우트가 같은 레이아웃을
써야 하면 `app/layouts`로 올린다).
