# assets

이미지, 아이콘 등 정적 파일 모음.

```
assets/
├── icons/            # 아이콘 SVG + index.ts 배럴 (IconXxx 이름으로 export)
├── images/
├── backgrounds/
├── partners/
└── activity-overlay/
```

아이콘은 `@/shared/assets`(또는 `@/shared/assets/icons`)에서 이름으로 import한다.
이미지/배경 등 바이너리 파일은 배럴을 거치지 않고 파일 경로로 직접 import한다
(Vite 정적 에셋 관례).
