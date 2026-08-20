# styles

게임웍스 디자인 시스템 토큰·유틸리티.

```
styles/
├── tokens/
│   ├── colors.css      # gray / primary(blue) / text
│   └── typography.css  # size / line-height / letter-spacing
├── typography.css      # typo-* 유틸리티
└── base.css            # 리셋·기본 스타일
```

진입점은 `src/app/index.css` (`@theme`으로 Tailwind 연결).

## Colors

| Scale | Tokens |
|-------|--------|
| Gray | `gray-950` … `gray-100` |
| Primary (Blue) | `primary-950` … `primary-100` |
| Text on white | `text-primary` / `text-secondary` / `text-tertiary` (`#777`보다 진함) |
| Button | `button-primary` / `button-primary-hover` / `button-disabled` / `button-solid` / `button-solid-hover` / `button-outline` / `button-disabled-text` |

```tsx
<div className="bg-primary-950 text-primary-200" />
<p className="text-text-primary" /> {/* 흰 배경용 */}
```

## Typography

| Class | Size | Line | Letter |
|-------|------|------|--------|
| `typo-hero` | 50px | 130% | -3% |
| `typo-heading1` | 38px | 130% | -3% |
| `typo-heading2` | 28px | 130% | -3% |
| `typo-heading3` | 22px | 130% | -3% |
| `typo-subheading` | 18px | 140% | -3% |
| `typo-body1` | 16px | 140% | -3% |
| `typo-body2` | 14px | 140% | -3% |
| `typo-caption` | 12px | 140% | -3% |

Weight: `typo-bold` (700) · `typo-medium` (500) · `typo-light` (300)

```tsx
<h1 className="typo-hero">Hero</h1>
<p className="typo-body1 typo-light">Body1 Light</p>
```
