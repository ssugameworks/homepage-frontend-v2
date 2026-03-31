# api

서버와의 통신을 담당하는 함수 모음.

도메인별로 파일을 분리하며, 컴포넌트에서 fetch를 직접 호출하지 않는다.

```
api/
├── client.ts     ← 공통 baseURL, 헤더, 에러 처리
├── members.ts
└── notices.ts
```
