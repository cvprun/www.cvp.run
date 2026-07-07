# www.cvp.run 전면 개편 플랜 — MVP SaaS 홍보 사이트

> 작성일: 2026-07-06
> 상태: **구현 완료** (2026-07-06 — Phase 1~6 코드 반영, 빌드/린트 통과. 잔여: 수동 브라우저 검수, OG 이미지, 배포)
>
> 목표: MVP SaaS 출시(참조: `~/Downloads/result.md` 전략 보고서)에 맞춰 www.cvp.run을
> "이미지 · 비디오 · 3D 포인트클라우드 라벨링 플랫폼" 홍보 사이트로 전면 개편.
>
> - **콘텐츠 구조** 레퍼런스: [supervisely.com](https://supervisely.com/) — 기능 카테고리별 개별 제품 페이지 체계
> - **디자인** 레퍼런스: [openai.com/ko-KR/codex](https://openai.com/ko-KR/codex/) — 기능 설명 ↔ 제품 UI 목업 1:1 매칭 레이아웃
> - **경쟁사**: 1차 [cvat.ai](https://www.cvat.ai/), 2차 supervisely.com

---

## 0. 레퍼런스 분석 요약

### CVAT (1차 경쟁사) — 무엇을 상대하는가

- 포지셔닝: "Complete Data Labeling Suite For Teams Building Real-World AI". 비디오·3D 포인트클라우드 모두 명시적 지원, 셀프서브 가입 가능.
- 강점: 오픈소스 신뢰(2.8M+ Docker 다운로드, 15K+ GitHub 스타), SAM 등 AI 자동화, 20+ 포맷.
- 공략 가능한 약점: **가격 불투명**(가격표 없음, Enterprise 상담), 복잡한 인터페이스와 온보딩, 무료 플랜 한계 불명확, 자체호스팅 운영 부담.
- → 우리 메시지: **투명한 가격 + 즉시 시작 + 통합 워크스페이스(라벨링과 데이터·협업이 한 곳)**.

### Supervisely (2차 경쟁사, 콘텐츠 구조 레퍼런스)

- 내비게이션이 카테고리 드롭다운 → 개별 제품 페이지 구조:
  `Labeling toolboxes`(images/videos/3d-lidar/dicom) · `Labeling automation` · `Data and Users` · `Neural Networks` · `Customization` · `Services`.
- URL 체계: `/labeling-toolbox/images/`, `/data-and-users/quality-assurance/` 같은 **카테고리/기능 2단계 경로**.
- 기능 소개는 영상 데모 + 스크린샷 + 아이콘 조합.
- 공략 가능한 약점: 데모 예약(영업 주도) 중심, 무거운 엔터프라이즈 톤.
- → 우리는 이 **IA(정보 구조)를 차용**하되, 영업 주도 CTA 대신 셀프서브 CTA로.

### OpenAI Codex 페이지 (디자인 레퍼런스)

> ⚠️ WebFetch 403 + 브라우저 확장 미연결로 실시간 열람 실패. 아래는 모델 지식(2025년 개편판) 기반이므로,
> **구현 착수 전 사람이 페이지를 직접 훑어 인상을 보정할 것을 권장.**

- 핵심 문법: **섹션당 기능 1개 = 짧은 헤드라인 + 1~2문장 + 대형 제품 UI 미디어 1개**. 기능과 비주얼이 1:1로 대응.
- 대형 디스플레이 타이포그래피(sentence case), 과감한 여백, 섹션 간 리듬감 있는 배경 전환.
- 제품 UI는 라운드 코너 프레임에 담아 풀폭에 가깝게 크게 배치. 스크롤 진입 시 미묘한 fade/slide-up + 영상 자동재생.
- 카피는 동사 주도의 짧은 선언문("Delegate tasks…" 식). 마케팅 수식어 최소화.
- → 우리 적용: 현재 사이트의 "카드 그리드 나열형"을 버리고 **풀폭 교차(alternating) 섹션 + 대형 목업** 문법으로 전환.

---

## 1. 현재 상태와 개편 범위

현 www.cvp.run (Vite 6 + React 19 + Tailwind v4 + shadcn/ui, Cloudflare Pages):

| 항목        | 현재                                               | 문제                                                                                               |
| ----------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 라우트      | `/`, `/features/:slug`(6종), `/modules/:slug`(8종) | 모듈 8종 중 5종(vms, manufacturing, mlflow, agents, graphs)이 **MVP 비활성 기능** — 홍보하면 안 됨 |
| CTA         | 전부 `disabled` + "개발 중" 뱃지                   | 출시용으로 app.cvp.run 가입 링크로 교체 필요                                                       |
| 목업        | `screens.tsx` 9종 (대시보드 등 관리 화면 위주)     | 핵심 상품인 **라벨링 에디터 3종(2D/비디오/3D) 목업이 없음**                                        |
| 가격 페이지 | 없음                                               | 신설 필수 (전략 보고서 P0 항목)                                                                    |
| 디자인      | 카드 그리드 나열 + Vercel풍 그라디언트             | Codex 스타일(대형 타입 + 1:1 미디어 매칭)로 전환                                                   |

**유지**: 기술 스택, 자체 i18n(ko/en, `translations.ts` 패턴), 다크모드 기본, 브랜드 액센트 컬러(#50e3c2 cyan 계열 유지하되 사용 절제), Cloudflare Pages 배포.

**교체**: IA 전체, 랜딩 섹션 구성, 상세 페이지 템플릿, 목업 레지스트리, 카피 전면 재작성.

---

## 2. 새 정보 구조 (IA)

### 2.1 페이지 맵

```
/                                   랜딩 (전면 재구성)
/pricing                            가격 (신설)

/labeling/images                    이미지 라벨링          ← 핵심 3종
/labeling/videos                    비디오 라벨링
/labeling/point-clouds              3D 포인트클라우드 라벨링  ★ 최대 차별점

/platform/datasets                  데이터셋 관리 + 공개 갤러리
/platform/review                    리뷰 & QA (이슈/핀 코멘트)
/platform/collaboration            팀 협업 (멤버·위키·파일·동영상 라이브러리)
/platform/developers                개발자 (액세스 토큰 API · 제품키 라이선싱)

/tools                              무료 CV 유틸리티 (SEO 유입용, 후순위 Phase)

*                                   not-found (기존 유지)
```

- 기존 `/features/:slug`, `/modules/:slug` → 위 경로로 대체. 기존 경로는 근접 페이지로 **redirect** 처리(이미 배포된 사이트라 외부 링크 존재 가능).
- ~~비활성 기능(클러스터·에이전트·제조·관제·회의록·지도·MLflow·그리드)은 **페이지·메뉴·카피에서 전부 제거**.~~
  **(2026-07-06 변경, 사용자 지시)**: 미소개 기능들을 상단 헤더의 별도 "더 보기" 섹션으로 추가.
  `/more/{apps,graphs,agents,clusters,vms,manufacturing,mlflow,grids,maps,meetings}` 10개 페이지 신설.
  apps·graphs는 `status: 'available'`, 나머지 8개는 `status: 'development'`로 구분해
  드롭다운·관련 카드·페이지 인트로에 "개발 중" 앰버 뱃지를 표시하고, 개발 중 페이지는
  CTA 대신 안내 문구(`featurePage.developmentNote`)를 노출. 핵심 랜딩 메시지는 여전히
  라벨링 3종 중심이며, 더 보기 섹션은 플랫폼 전체 스코프를 보여주는 로드맵 성격.
  **(추가, 사용자 지시)**: 더 보기 10페이지 전부에 실제 앱 화면을 재현한 고충실도
  히어로 목업을 제작해 연결 — 그래프(블루프린트 에디터: 팔레트·노드 exec/데이터 핀·
  실행 로그·인스펙터), 에이전트(상태 12단계 뱃지 테이블), 클러스터(Portainer식 탭·
  파드/디플로이먼트 테이블), 관제(비디오월 6분할+HUD+이벤트), 제조(@xyflow 토폴로지
  4열), MLflow(실험/런/메트릭 SVG 차트), 그리드(스프레드시트 시트+색상 규칙),
  지도(레이어 패널+드로잉 툴바+피처), 회의록(파이프라인 스테퍼+전사본+Wiki 카드).
  각 목업은 Explore 에이전트로 추출한 실제 컴포넌트 스펙(ko 라벨·아이콘·색 토큰)에
  근거함. 이 과정에서 그래프 페이지 카피를 실제 구현(블루프린트 스타일)에 맞게 정정.

### 2.2 상단 내비게이션 (Supervisely 방식)

```
[CVP 로고]   라벨링 ▾        플랫폼 ▾        가격      문서(외부, 준비되면)     [ko/en] [테마] [로그인] [무료로 시작 →]
             ├ 이미지         ├ 데이터셋
             ├ 비디오         ├ 리뷰 & QA
             └ 3D 포인트클라우드  ├ 팀 협업
                              └ 개발자
```

- 드롭다운은 shadcn `dropdown-menu`(이미 사용 중) 또는 hover 메가메뉴 소형판.
- 모바일: 시트/아코디언.
- "로그인" → `https://app.cvp.run/signin`, "무료로 시작" → `https://app.cvp.run/signup`. (app 측 출시 전까지는 환경 변수 `VITE_APP_URL`로 스위치, 미설정 시 대기자 명단/disabled 폴백 유지)

---

## 3. 랜딩 페이지 설계 (`/`)

Codex 문법 적용: 히어로 이후 **기능당 풀폭 섹션 1개, 각 섹션에 대형 목업 1개**.

| #   | 섹션                 | 내용                                                                                                                                                                                | 미디어                                                      |
| --- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 1   | Hero                 | H1: "비전 데이터의 워크스페이스." (en: "The workspace for vision data.") + 서브: "수집, 라벨링, 리뷰, 협업 — 팀의 비전 데이터 전부를 한 곳에서." + CTA 2개(무료로 시작 / 가격 보기) | 히어로 직하단에 **3D 에디터 목업 대형 배치** (가장 강한 훅) |
| 2   | 모달리티 전환 스트립 | 이미지 ↔ 비디오 ↔ 3D 탭/자동 순환 — 한 화면에서 3개 에디터 목업이 교차                                                                                                              | 인터랙티브 탭 목업                                          |
| 3   | 이미지 라벨링        | bbox·폴리곤·키포인트 스켈레톤 프리셋, 빠른 반응속도                                                                                                                                 | 2D 에디터 목업 (좌우 교차 배치 시작)                        |
| 4   | 비디오 라벨링        | 타임라인·키프레임·트랙 보간                                                                                                                                                         | 비디오 타임라인 목업                                        |
| 5   | 3D 포인트클라우드    | BEV·인스턴스·자동 분할(RANSAC)·LAS/LAZ                                                                                                                                              | 3D 뷰어 + BEV 목업                                          |
| 6   | 리뷰 & 협업          | 핀 코멘트 리뷰 스레드, 멤버·권한                                                                                                                                                    | 이슈 패널 목업                                              |
| 7   | 데이터 워크스페이스  | 데이터셋·파일·동영상·위키가 한 프로젝트에                                                                                                                                           | 데이터셋 그리드 목업                                        |
| 8   | 개발자               | 토큰 API·제품키 코드 스니펫                                                                                                                                                         | 코드 블록 + 토큰 화면 목업                                  |
| 9   | 가격 티저            | Free/Starter/Pro 3열 요약 + `/pricing` 링크                                                                                                                                         | —                                                           |
| 10  | 최종 CTA             | "오늘 첫 라벨을 그려보세요" + 가입 버튼                                                                                                                                             | —                                                           |
| 11  | Footer               | 제품 페이지 링크맵, 언어/테마, 법적 문서 링크                                                                                                                                       | —                                                           |

- 기존 `Features`(6카드)·`Modules`(8카드) 그리드 섹션은 **폐기**. 통계 스트립(Hero 하단)은 실측 수치가 없으므로 제거하거나 "3가지 모달리티 · 55+ 무료 도구 · 2개 언어" 같은 사실 기반 수치로 교체.

---

## 4. 기능 상세 페이지 템플릿 (7페이지 공통)

Codex 스타일 유지, Supervisely식 깊이 추가:

1. **Intro**: 키커(카테고리) + 대형 H1 + 2문장 + CTA
2. **히어로 목업**: 해당 기능의 대표 화면 풀폭 배치
3. **세부 기능 3~5개**: 각각 "소제목 + 1~2문장 + 목업/줌인 컷" 교차 반복 (핵심: **글 1블록 = 비주얼 1개, 1:1 매칭**)
4. **스펙/지원 포맷 표**: 예) 포인트클라우드 페이지 → PLY/PCD/LAS/LAZ, 지오메트리 타입 표
5. **관련 기능 크로스링크 2~3개**
6. **최종 CTA**

기존 `DetailPage`(`src/pages/detail.tsx`)의 "long text + highlights" 단일 템플릿을 위 구조의 **섹션 조립형 템플릿**으로 교체. 페이지별 콘텐츠는 데이터 파일(`src/lib/pages/*.ts`)로 선언.

---

## 5. 목업 전략 — app 코드와 1:1 매칭 (핵심 작업)

원칙: **app.cvp.run 실제 화면을 근거로 한 충실한 React 목업** (스크린샷 아님). 이유: 다크/라이트 테마 대응, i18n 텍스트 전환, 가벼운 인터랙션(탭·재생 버튼·호버) 가능, 이미지 에셋 관리 불필요.

**충실도 요구 (사용자 지시: "최대한 실제 앱 사용 환경과 유사하게")**:

- 목업 제작 전 app의 해당 화면 컴포넌트를 실제로 정독하고, **패널 배치·툴바 아이콘 구성·용어(클래스/태그/이슈 등 실제 i18n 문자열)·색 토큰**을 그대로 따른다. 임의로 "그럴듯한" UI를 창작하지 않는다.
- app의 실제 디자인 토큰(oklch 변수, 라디우스, 폰트)을 대조해 목업 스코프에 반영. 사이드바·헤더 등 앱 셸 구조(AppFrame)도 실제 앱 셸과 동일한 메뉴 구성(활성 기능만)으로.
- 목업 내 데이터는 실제 사용 시나리오에 가까운 예시(실존할 법한 클래스명·파일명·수치)로 작성. "lorem" 류 금지.
- 완성 후 실제 앱 화면과 나란히 비교하는 검수 단계를 Phase 2 종료 조건에 포함.

방식: app 저장소(`/home/zer0/Projects/app.cvp.run`)의 해당 컴포넌트를 **읽고** 레이아웃·색·구성 요소를 www의 독립 목업 컴포넌트로 재현(코드 직접 import는 하지 않음 — app은 Supabase·라우터 등 런타임 의존이 깊어 정적 사이트에 이식 비용이 과함). 데이터는 하드코딩 예시.

| 목업 (신규)                      | app 근거 코드                                                                      | 사용 페이지                       |
| -------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------- |
| `MockImageEditor`                | `src/react-app/pages/(app)/annotate/` 2D 에디터 (캔버스+클래스 패널+이슈 탭)       | 랜딩 §3, /labeling/images         |
| `MockVideoTimeline`              | 비디오 라벨링 타임라인 (눈금자·플레이헤드·트랙 마커·키프레임)                      | 랜딩 §4, /labeling/videos         |
| `Mock3dEditor`                   | 3D 에디터 (포인트 렌더 느낌은 SVG/캔버스 저밀도 재현, BEV 미니맵, 인스턴스 리스트) | 랜딩 §1·5, /labeling/point-clouds |
| `MockIssuePanel`                 | 이슈 탭 + 핀 코멘트 스레드                                                         | 랜딩 §6, /platform/review         |
| `MockDatasetGrid`                | 데이터셋 목록/샘플 그리드 (타입 아이콘: image/video/point_cloud)                   | 랜딩 §7, /platform/datasets       |
| `MockKeypointPreset`             | 키포인트 스켈레톤 그래픽 에디터(@xyflow 화면)                                      | /labeling/images                  |
| `MockWiki` / `MockVideoLibrary`  | 위키 에디터 / 동영상 플레이어                                                      | /platform/collaboration           |
| `MockTokenPanel` + `CodeSnippet` | 액세스 토큰 페이지 + curl/Python 예시                                              | /platform/developers              |
| `MockLicensePanel`               | 제품키 발급 화면 + Ed25519 오프라인 검증 스니펫                                    | /platform/developers              |

- 기존 `screens.tsx`의 9종 관리 화면 목업은 재사용 가능한 것(dashboard, datasets 등)만 새 레지스트리로 이관, 비활성 기능 화면(vms·manufacturing·mlflow·agents·graphs)은 삭제.
- `AppFrame`(브라우저 프레임)은 유지하되, 에디터류 목업은 프레임 없이 **UI 패널 단독 확대** 배치도 허용 (Codex가 터미널 UI를 크게 자르듯).
- 3D 목업 주의: WebGL 도입은 과함. 사전 렌더한 포인트 산점 데이터(수백 점)를 SVG/canvas 2D로 그려 "느낌"을 재현하는 선에서. 필요 시 실제 앱 녹화 영상(webm)을 Phase 2에서 추가.

---

## 6. 가격 페이지 (`/pricing`, 신설)

- app 측 플랜 체계(free/starter/pro/enterprise, `app.cvp.run/src/react-app/lib/plans.ts`)와 **명칭·구성 일치** 필수.
- 4열 비교표 + 자주 묻는 질문(환불·한도·데이터 익스포트 보장) 6개.
- 구체 가격 숫자는 app 측 Paddle 가격 확정 전까지 placeholder 상수(`src/lib/pricing.ts`)로 분리 — 확정 시 한 파일만 수정.
- CVAT 대비 차별 포인트("가격 불투명" 공략)이므로 반드시 숫자를 노출하는 방향.

---

## 7. 디자인 시스템 개편

- **타이포그래피**: 디스플레이 스케일 상향 (H1 `clamp(2.5rem, 6vw, 4.5rem)` 수준). 본문은 짧게 유지. 모듈명 mono 표기는 개발자 페이지로 한정.
- **컬러**: 현 brand 4색(cyan/blue/violet/pink) 중 **cyan #50e3c2 + blue #0070f3 2색으로 절제**. 그라디언트 텍스트는 히어로 1곳만. Codex처럼 배경은 뉴트럴 위주, 색은 목업 내부와 CTA에만.
- **섹션 리듬**: 다크 기본에서 섹션별 `bg` 미세 변화(neutral-950 ↔ neutral-900)로 구획. `bg-mesh-glow`는 히어로만 유지.
- **모션**: 스크롤 진입 fade/slide-up (IntersectionObserver + `tw-animate-css` 활용, `prefers-reduced-motion` 존중). 과한 패럴럭스 금지.
- **반응형**: 교차 배치 섹션은 모바일에서 상하 스택, 목업은 `overflow` 없이 축소.

---

## 8. 기술 구현 계획

### 파일 구조 (변경 후)

```
src/
  pages/
    landing.tsx            # 재작성
    pricing.tsx            # 신설
    feature.tsx            # 조립형 상세 템플릿 (detail.tsx 대체)
  components/
    nav/top-bar.tsx        # 드롭다운 내비 재작성
    sections/*.tsx         # 랜딩 섹션 컴포넌트
    mocks/*.tsx            # §5 목업 컴포넌트 (mock-image-editor.tsx 등)
    mocks/app-frame.tsx    # 유지
  lib/
    pages/                 # 페이지별 콘텐츠 데이터 (labeling-images.ts …)
    pricing.ts             # 가격 상수
    routes.ts              # 경로 상수 + 구경로 redirect 매핑
    translations.ts        # 페이지별 분할 검토 (translations/*.ts)
```

### 라우팅

- `App.tsx`에 신규 라우트 + `<Navigate>` 기반 구경로 redirect:
  `/modules/vision → /labeling/images`, `/modules/datasets → /platform/datasets`, `/features/vision-toolkit → /labeling/images`, 나머지 구 슬러그 → `/`.
- SEO: 페이지별 `<title>`/`<meta description>`(react-router v7 또는 직접 헬퍼), `sitemap.xml`·`robots.txt`를 `public/`에 추가. SPA 한계(사전 렌더 없음)는 인지하되 이번 범위에서는 메타만 — 프리렌더링(vite-plugin 계열) 도입은 후속 검토 항목.

### i18n

- ko/en 동시 작성 유지(`Translations` 타입으로 구조 강제). 카피 원문은 ko 먼저 쓰고 en 번역.
- 문자열 수가 크게 늘므로 `translations.ts`를 네임스페이스 파일로 분할(`translations/landing.ts`, `translations/pricing.ts` …)하고 인덱스에서 병합.

---

## 9. 실행 단계

| Phase               | 작업                                                                                   | 산출물                          |
| ------------------- | -------------------------------------------------------------------------------------- | ------------------------------- |
| **1. 골격**         | 라우트/내비/redirect/페이지 스캐폴드, 비활성 기능 콘텐츠 제거                          | 새 IA로 이동 가능한 빈 페이지들 |
| **2. 목업**         | app 코드 정독 → 목업 컴포넌트 9종 제작 (2D → 비디오 → 3D 순)                           | `components/mocks/*`            |
| **3. 랜딩**         | 히어로~CTA 11개 섹션 조립 + 모션                                                       | 새 `/`                          |
| **4. 상세 7페이지** | 템플릿 + 페이지별 콘텐츠 데이터 + 카피(ko/en)                                          | `/labeling/*`, `/platform/*`    |
| **5. 가격**         | `/pricing` + 랜딩 가격 티저                                                            | 가격 공개                       |
| **6. 마감**         | SEO 메타/sitemap, OG 이미지, 반응형·접근성 점검, Lighthouse, 배포                      | Cloudflare Pages 배포           |
| (후속)              | `/tools` 무료 도구 SEO 페이지, 실제 녹화 영상 교체, `/vs/cvat` 비교 페이지, 프리렌더링 | —                               |

각 Phase 종료 시 `npm run build` + 로컬 확인. Phase 2의 3D 목업이 최대 불확실 구간이므로 저밀도 SVG 산점 방식으로 시작해 조기에 룩을 확정.

---

## 10. 리스크 / 유의사항

- **Codex 디자인 분석이 모델 지식 기반**: 구현 전 사람이 실제 페이지를 열람해 인상(배경 톤, 미디어 크기감)을 보정해줄 것.
- **CTA 활성화 시점**: app.cvp.run 출시 전에 www부터 배포하면 CTA가 죽은 링크가 됨 → `VITE_APP_URL` 미설정 시 "출시 알림 받기"(이메일 수집 또는 disabled) 폴백 분기.
- **과장 금지**: AI 자동 라벨링(SAM 등)은 CVAT의 강점이지 우리 기능이 아님 — 목업·카피 어디에도 넣지 않는다. 자동 분할은 3D RANSAC/클러스터링 실제 기능 범위만 서술.
- **플랜·가격 표기**: app 측 Paddle 확정값과 어긋나면 신뢰 손상 → `pricing.ts` 단일 소스 + 확정 전 배포 시 "베타 가격" 라벨.
- **라이선스 파일 확인**: README(MIT)와 커밋 히스토리(PolyForm Noncommercial) 불일치 — 공개 배포 전 정리 필요.

## 11. 결정 사항 (2026-07-06 확정)

1. **히어로 카피 = 데이터 플랫폼형**: ko "비전 데이터의 워크스페이스." + 서브 "수집, 라벨링, 리뷰, 협업 — 팀의 비전 데이터 전부를 한 곳에서." / en "The workspace for vision data." 라벨링 3종은 히어로 직후 섹션들에서 강조.
2. **가격 = 숫자 노출 + 베타 라벨**: placeholder 숫자(Starter $29/월, Pro $99/월 수준)를 노출하고 "베타 가격" 표시. `src/lib/pricing.ts` 단일 소스.
3. **/tools = 후속으로 미룸**: 이번 범위는 랜딩 + 상세 7페이지 + 가격.
4. **테마 = 다크 우선 유지**: 다크 기본 + 라이트 토글 대응 유지.
5. **목업 충실도**: 실제 앱 사용 환경과 최대한 유사하게 (§5 충실도 요구 참조).
