# widgets

여러 페이지에서 재사용되는 독립적인 큰 UI 블록.

- `header/`, `footer/`

페이지에서만 쓰이고 재사용되지 않는 큰 섹션(예: 홈페이지 히어로/FAQ 섹션)은 여기 두지 않고
해당 `pages/*/ui`에 둔다. widgets는 features/entities/shared를 참조할 수 있지만
서로를 참조하지 않는다.
