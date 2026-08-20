# ui

디자인 시스템 기반의 원자 단위 공통 컴포넌트 모음.

특정 페이지나 기능에 종속되지 않으며, 어디서든 재사용 가능해야 한다. variant/size/state가
있는 컴포넌트는 `tailwind-variants`의 `tv()`로 작성한다 (`Button.tsx` 참고).

```
ui/
├── Button/
├── Checkbox/
├── Radio/
├── Select/
├── TextField/
├── TextArea/
├── FieldHint/
└── form-wizard/   # 폼 마법사 뼈대 (FormWizard, FormCard, StepIndicator, Turnstile 등)
```

```tsx
import { Button, TextField } from "@/shared/ui";

<Button size="md">신청하기</Button>
<Button variant="outline" size="lg">이전</Button>
<TextField label="휴대폰 번호" state={isError ? "error" : "default"} hint={message} />
```

각 컴포넌트의 정확한 props는 해당 `*.tsx` 파일의 JSDoc/타입을 참고한다.
