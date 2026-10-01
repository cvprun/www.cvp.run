# www.cvp.run

CVP(Computer Vision Player) 제품 소개 사이트입니다.

이미지·비디오·3D 포인트클라우드·시계열 라벨링을 중심으로, AI 라벨링과 학습,
에이전트·수집기, 디지털 트윈, MLOps 등 프로젝트 워크스페이스 전체를 소개하는
비전 데이터 플랫폼 **CVP**(app.cvp.run, 베타)의 마케팅 사이트입니다.

## 구조

- 페이지 레지스트리: [`src/lib/site.ts`](./src/lib/site.ts) — 경로, 기능 페이지(라벨링 4 · 플랫폼 5 · 더 보기 13), 목업 배치, 구 경로 리다이렉트
- 문구: [`src/lib/translations/`](./src/lib/translations/) (ko/en)
- 가격·한도: [`src/lib/pricing.ts`](./src/lib/pricing.ts) — app 의 `plan_limits` 와 같은 값
- 목업: [`src/components/mocks/`](./src/components/mocks/) — app.cvp.run 실제 화면을 정적으로 재현.
  공통 셸은 `app-frame.tsx`(사이드바 기본 청사진 · 브레드크럼 · 제목 줄 · 밑줄 탭)

## 기술 스택

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (new-york)
- **Cloudflare Pages** 배포 대상
- 한국어 / 영어 i18n, 다크 · 라이트 테마

## 개발

```shell
./npm install     # 의존성 설치 (로컬 node 툴체인 자동 부트스트랩)
./npm run dev     # 개발 서버
```

## 프로덕션 빌드

```shell
./npm run build   # 타입 체크 + Vite 빌드 → dist/
./npm run preview # 빌드 결과 미리보기
```

## Cloudflare Pages 배포

빌드 결과(`dist/`)를 Cloudflare Pages로 업로드합니다.

```shell
./npm run deploy  # 빌드 후 wrangler pages deploy dist
```

Pages 프로젝트 설정은 [`wrangler.jsonc`](./wrangler.jsonc)를 참고하세요.

## 라이선스

자세한 내용은 [LICENSE](./LICENSE) 파일을 참고하세요.
**www.cvp.run**은 **MIT 라이선스**로 배포됩니다.
