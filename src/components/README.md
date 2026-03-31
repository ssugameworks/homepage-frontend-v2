# components

페이지를 구성하는 기능 단위 컴포넌트 모음.

특정 페이지에 종속된 컴포넌트는 이곳에,  
여러 곳에서 재사용되는 원자 컴포넌트는 `ui/`에 둔다.

각 컴포넌트는 독립된 폴더로 관리하며 관련 타입과 테스트를 함께 둔다.

```
components/
└── HeroSection/
    ├── HeroSection.tsx
    ├── HeroSection.types.ts
    └── HeroSection.test.tsx
```
