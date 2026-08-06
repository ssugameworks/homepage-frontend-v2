# ui

디자인 시스템 기반의 원자 단위 공통 컴포넌트 모음.

특정 페이지나 기능에 종속되지 않으며, 어디서든 재사용 가능해야 한다.

```
ui/
├── Button/
├── Input/
└── Badge/
```

## Button

```tsx
import { Button } from "@/ui";

<Button size="md">신청하기</Button>
<Button variant="primarySolid" size="sm">신청하기</Button>
<Button variant="outline" size="lg">이전</Button>
<Button size="xl" fullWidth disabled>다음</Button>
```

- `variant`: `primary` | `primarySolid` | `outline`
- `size`: `xs` | `sm` | `md` | `lg` | `xl`
