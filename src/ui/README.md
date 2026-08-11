# ui

디자인 시스템 기반의 원자 단위 공통 컴포넌트 모음.

특정 페이지나 기능에 종속되지 않으며, 어디서든 재사용 가능해야 한다.

```
ui/
├── Button/
├── Checkbox/
├── Radio/
├── TextField/
└── TextArea/
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

## Checkbox

```tsx
import { Checkbox } from "@/ui";

<Checkbox name="parts" value="기획" label="기획" checked={checked} onChange={onChange} />
```

- 여러 개를 그룹으로 쓸 때는 상위를 `<fieldset aria-labelledby>`로 감싸 그룹 라벨을 연결한다.

## Radio

```tsx
import { Radio } from "@/ui";

<Radio name="grade" value="1학년" label="1학년" checked={checked} onChange={onChange} />
```

- `name`은 필수다 (같은 그룹의 라디오는 동일한 `name`을 공유해야 한다).
- 여러 개를 그룹으로 쓸 때는 상위를 `role="radiogroup" aria-labelledby`로 감싸 그룹 라벨을 연결한다.

## TextField

```tsx
import { TextField } from "@/ui";

<TextField
  label="휴대폰 번호"
  value={value}
  onChange={onChange}
  state={isError ? "error" : "default"}
  hint={isError ? "올바른 휴대폰 번호를 입력해주세요" : undefined}
/>
```

- `state`: `default` | `error`
- `hint`: 도움말 또는 에러 메시지. `aria-describedby`로 input에 자동 연결된다.

## TextArea

```tsx
import { TextArea } from "@/ui";

<TextArea
  label="지원 동기"
  value={value}
  onChange={onChange}
  maxLength={150}
  state={isError ? "error" : "default"}
  hint={isError ? "50자 이상 150자 이하로 입력해주세요" : undefined}
/>
```

- `state`, `hint`는 `TextField`와 동일하게 동작한다.
- `maxLengthDisplay`를 생략하면 `maxLength`를 그대로 글자수 카운터에 사용한다.
