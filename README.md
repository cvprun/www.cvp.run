# www.cvp.run

CVP(Computer Vision Player) 프로젝트 소개 랜딩 페이지입니다.

그래프 기반 비주얼 프로그래밍, 실시간 영상 분석, 영상 관제(VMS), MLOps를 통합한
웹 기반 컴퓨터 비전 플랫폼 **CVP**를 소개합니다. (현재 개발 중)

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
