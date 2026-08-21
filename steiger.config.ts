import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // 정적 파일(아이콘/이미지/배경 등) 세그먼트. Vite 관례상 개별 파일 경로로 직접
    // import하므로 "내용이 아니라 목적으로 이름 지으라"는 규칙이 맞지 않는다.
    files: ["./src/shared/assets/**"],
    rules: {
      "fsd/segments-by-purpose": "off",
    },
  },
  {
    // 지금은 소비 슬라이스가 하나뿐이지만, 각각 다른 책임(회원가입 폼/노션 신청 폼/
    // 임원진 데이터)을 가진 독립 슬라이스로 의도적으로 분리했다. 소비처가 늘어날 걸
    // 전제로 한 구조라 페이지에 합치지 않는다.
    files: [
      "./src/entities/executive/**",
      "./src/features/apply-form/**",
      "./src/features/register/**",
    ],
    rules: {
      "fsd/insignificant-slice": "off",
    },
  },
]);
