# api

서버(Cloudflare Pages Functions, `functions/api`)와의 통신을 담당하는 함수 모음.

도메인별로 파일을 분리하며, 컴포넌트에서 fetch를 직접 호출하지 않는다.

```text
api/
├── client.ts     ← 공통 baseURL(/api), 에러 응답 파싱, GET/POST 헬퍼
├── activities.ts ← 활동 목록 (Notion 연동)
├── notion.ts     ← 활동 신청 폼 스키마/제출 (Notion 연동)
├── register.ts   ← 동아리 가입 신청 제출 (Notion 연동)
└── executives.ts ← 임원진 목록 (더미 데이터, Notion 미연동)
```

새 API를 추가할 때는 `client.ts`의 `apiGet`/`apiPost`를 사용해 요청을 보내고,
실패 시 보여줄 기본 에러 메시지를 함께 넘긴다. 서버가 `{ error: string }`을
내려주면 그 메시지를, 아니면 기본 메시지를 던진다.
