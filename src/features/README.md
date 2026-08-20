# features

사용자 상호작용이 있는 비즈니스 유스케이스.

- `register/`: 회원가입 마법사
- `apply-form/`: 노션 기반 동적 활동 신청 폼

각 슬라이스는 `model/`(로직·상태·검증), `api/`, `ui/`로 구성하고 슬라이스 루트의 `index.ts`로
공개 API를 노출한다. 다른 slice의 내부 파일을 직접 import하지 않는다. entities/shared는
참조할 수 있지만 features끼리는 서로 참조하지 않는다.
