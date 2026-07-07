/**
 * Feature detail page copy. Each page: intro + 3 sections + spec table.
 * Section order must stay aligned with `sectionMocks` in `lib/site.ts`.
 */
export const features = {
  ko: {
    featurePage: {
      labelingKicker: '라벨링',
      platformKicker: '플랫폼',
      specsTitle: '스펙',
      relatedTitle: '함께 보기',
      ctaTitle: '직접 그려보는 게 가장 빠릅니다',
      ctaDescription: '무료 플랜에는 카드 등록이 필요 없습니다.',
    },

    pages: {
      images: {
        title: '박스에서 키포인트까지, 손에 붙는 이미지 라벨링.',
        intro:
          '12종 도구를 단축키로 오가며 그리고, 리뷰까지 같은 화면에서 끝냅니다. 대용량 이미지에서도 지연 없는 반응속도를 유지합니다.',
        sections: [
          {
            title: '12종 도구, 전부 단축키로.',
            body: '사각형(R), 회전 사각형(O), 다각형(G), 폴리라인(L), 타원(E), 점(P), 브러시(B)와 지우개(X), 키포인트(K)까지 — 마우스가 캔버스를 떠나지 않도록 모든 도구에 단축키를 달았습니다. 클래스마다 색과 지오메트리 타입이 지정되어 잘못 그릴 일이 없습니다.',
          },
          {
            title: '키포인트는 스켈레톤 프리셋으로.',
            body: '사람·손·얼굴·동물 템플릿에서 시작하거나, 그래픽 에디터에서 관절을 찍고 뼈대를 이어 프로젝트만의 스켈레톤을 정의하세요. 라벨링할 때는 프리셋을 고르기만 하면 됩니다.',
          },
          {
            title: '리뷰가 같은 화면 안에 있습니다.',
            body: '이슈 탭에서 미해결 코멘트를 확인하고, 캔버스 위 핀을 눌러 정확한 위치의 피드백에 답합니다. 라벨링과 검수 사이를 오가는 화면 전환이 없습니다.',
          },
        ],
        specs: {
          rows: [
            [
              '도형 타입',
              '사각형 · 회전 사각형 · 다각형 · 폴리라인 · 점 · 타원 · 브러시 마스크 · 키포인트',
            ],
            ['상태 워크플로', '미라벨링 → 진행 중 → 라벨링 완료 → 검토 완료'],
            [
              '편집',
              '실행 취소/다시 실행 · 정점 편집 · 이전 샘플 복제 · 격자 · 미니맵',
            ],
            ['성능', '비트맵 캐시 렌더링 · 인접 샘플 프리페치 · 이미지 LRU 캐시'],
          ],
        },
      },

      videos: {
        title: '키프레임만 찍으면, 사이는 보간으로.',
        intro:
          '항상 표시되는 타임라인 위에 트랙과 키프레임이 놓입니다. 모든 도형 타입이 트랙을 지원하고, 키프레임 사이는 자동으로 보간됩니다.',
        sections: [
          {
            title: '타임라인이 항상 곁에 있습니다.',
            body: '눈금자, 플레이헤드, 트랙별 키프레임 마커가 에디터 하단에 도킹됩니다. 프레임 단위 이동(이전/다음/처음/끝)과 fps 표시로 원하는 프레임을 정확히 잡습니다.',
          },
          {
            title: '모든 도형에 키프레임을.',
            body: '사각형만이 아닙니다. 다각형, 키포인트, 폴리라인까지 모든 도형이 키프레임을 갖고 프레임 사이를 보간합니다. 객체가 잠시 사라지면 트랙을 끊고, 다시 나타나면 잇습니다.',
          },
          {
            title: '업로드부터 재생까지 한 곳에서.',
            body: '동영상 라이브러리가 원본과 HLS 스트리밍 자산을 함께 관리합니다. 민감한 영상은 암호화해 저장하고, 플레이리스트로 정리해 팀과 돌려봅니다.',
          },
        ],
        specs: {
          rows: [
            ['타임라인', '눈금자 · 플레이헤드 · 트랙 행 · 키프레임 다이아몬드 마커'],
            ['보간', '키프레임 사이 자동 보간 · 트랙 유지/분리'],
            ['재생', '프레임 단위 이동 · fps 표시 · 배속 재생'],
            ['자산', '원본 / HLS 스트리밍 · 선택적 암호화 · 플레이리스트'],
          ],
        },
      },

      pointClouds: {
        title: '수백만 점의 포인트클라우드를 브라우저에서.',
        intro:
          'LAS/LAZ·PLY·PCD를 업로드하면 GPU 렌더링으로 즉시 열립니다. 원근 뷰와 평면·정면·측면 직교 뷰를 함께 놓고, 큐보이드와 포인트 세그먼트로 라벨링합니다.',
        sections: [
          {
            title: '4개의 시점으로 한 장면을.',
            body: '메인 원근 뷰 옆에 평면(BEV)·정면·측면 직교 뷰가 세로로 정렬됩니다. 큐보이드는 이동·회전·크기 기즈모로 다듬고, 점에 맞춤(F)·지면 스냅(Shift+F)으로 마무리합니다. 색상은 RGB·라벨·높이·강도·텍스처 모드를 오갑니다.',
          },
          {
            title: '자동 분할로 시작을 앞당기세요.',
            body: '무효점(0,0,0)을 걸러내고, RANSAC으로 바닥·테이블 같은 지배 평면을 제거한 뒤, 격자 클러스터링으로 남은 점을 인스턴스로 묶습니다. 결과가 마음에 안 들면 실행 취소 한 번이면 됩니다.',
          },
          {
            title: '쓰던 포맷 그대로 가져오고 내보냅니다.',
            body: 'LAS/LAZ는 브라우저 안에서 WASM으로 디코딩합니다. Labeled PLY, SemanticKITTI(.label), Pointcept(.npy), LAS classification까지 — 기존 파이프라인의 라벨을 그대로 가져오고 같은 포맷으로 내보냅니다.',
          },
        ],
        specs: {
          rows: [
            ['입력 포맷', 'PLY · PCD · LAS · LAZ (브라우저 내 WASM 디코딩)'],
            [
              '라벨 포맷',
              'Labeled PLY · SemanticKITTI(.label) · Pointcept(.npy) · ASCII · LAS classification',
            ],
            [
              '도구',
              '큐보이드 · 올가미/사각형 세그먼트 · 3D 점/폴리라인/폴리곤/키포인트 · 거리 측정',
            ],
            [
              '색상 모드',
              'RGB · 라벨 · 높이 · 강도 · 텍스처 (turbo/viridis 컬러맵, 인스턴스별 색상)',
            ],
            ['자동 분할', '무효점 제외 · RANSAC 지배 평면 제거 · 격자 클러스터링'],
          ],
        },
      },

      datasets: {
        title: '이미지, 비디오, 3D가 한 프로젝트의 데이터셋으로.',
        intro:
          '데이터셋마다 타입이 있고, 타입에 맞는 에디터와 도구가 자동으로 따라옵니다. 진행률과 클래스 분포가 한눈에 보입니다.',
        sections: [
          {
            title: '타입이 있는 데이터셋.',
            body: '이미지, 비디오, 포인트클라우드 — 데이터셋을 만들 때 타입을 정하면 업로드 검증부터 에디터, 도구 구성까지 타입에 맞게 준비됩니다. 서로 다른 모달리티가 한 프로젝트 안에서 나란히 관리됩니다.',
          },
          {
            title: '진행률이 보이는 관리.',
            body: '샘플마다 미라벨링·진행 중·라벨링 완료·검토 완료 상태가 있고, 데이터셋 화면 상단에 진행률 바와 클래스별 어노테이션 분포가 집계됩니다. 상태 칩을 눌러 남은 작업만 걸러 보세요.',
          },
          {
            title: '클래스와 태그는 데이터셋의 언어.',
            body: '클래스에는 색과 지오메트리 타입을, 태그에는 값 타입(선택·숫자·텍스트)을 정의합니다. 키포인트 클래스는 스켈레톤 프리셋과 연결됩니다. 공개 데이터셋 갤러리에서 COCO128 같은 예제로 바로 시작할 수도 있습니다.',
          },
        ],
        specs: {
          rows: [
            ['데이터셋 타입', '이미지 · 비디오 · 포인트 클라우드'],
            ['샘플 상태', '미라벨링 · 진행 중 · 라벨링 완료 · 검토 완료'],
            ['분류 체계', '클래스(색 · 지오메트리) · 태그(선택 · 숫자 · 텍스트)'],
            ['시작', '드래그앤드롭 업로드 · 공개 데이터셋 갤러리'],
          ],
        },
      },

      review: {
        title: '라벨 위에 핀을 꽂는 리뷰.',
        intro:
          '검수 피드백이 이미지 위 정확한 좌표에 핀으로 남습니다. 라벨러는 이슈 탭에서 스레드로 답하고, 해결하면 핀이 초록색으로 바뀝니다.',
        sections: [
          {
            title: '정확한 위치에, 정확한 피드백.',
            body: '코멘트 도구(C)로 이미지 위 아무 곳이나 클릭해 이슈를 엽니다. "3번 박스가 너무 큽니다" 대신, 그 박스 위에 핀을 꽂으세요. 비디오라면 특정 프레임에 핀이 고정됩니다.',
          },
          {
            title: '스레드로 대화하고, 해결로 닫습니다.',
            body: '이슈마다 코멘트 스레드가 붙습니다. 미해결 이슈는 노란 핀과 번호로, 해결된 이슈는 초록 체크로 표시됩니다. 전체·미해결·해결됨 필터로 남은 검수만 추려 봅니다.',
          },
          {
            title: '검수 상태가 곧 진행률.',
            body: '샘플의 검토 완료 상태와 미해결 이슈 수가 데이터셋 통계에 집계됩니다. 관리자는 데이터셋 화면만 보고도 검수가 어디까지 왔는지 알 수 있습니다.',
          },
        ],
        specs: {
          rows: [
            ['이슈 핀', '이미지 좌표 고정 · 비디오 프레임 고정 · 번호/상태 뱃지'],
            ['스레드', '코멘트 · 답글 · 해결/다시 열기 · 작성자와 상대 시간'],
            ['필터', '전체 · 미해결 · 해결됨'],
            ['집계', '데이터셋 통계에 미해결/해결 코멘트 반영'],
          ],
        },
      },

      collaboration: {
        title: '라벨링 팀의 협업 공간까지 그대로.',
        intro:
          '멤버와 역할, 위키 문서, 파일, 동영상 라이브러리가 프로젝트 단위로 묶입니다. 라벨링 가이드라인을 다른 도구에 두지 마세요.',
        sections: [
          {
            title: '가이드라인은 위키에.',
            body: 'Markdown 위키에 라벨링 기준과 엣지 케이스를 정리하세요. 수식(LaTeX), 다이어그램(Mermaid), 표를 지원하고, 텍스트·비주얼·미리보기 3가지 모드로 편집합니다. 한 페이지가 한 파일이라 내보내기도 간단합니다.',
          },
          {
            title: '파일은 Drive처럼.',
            body: '프로젝트 파일함에서 폴더를 만들고, 드래그로 선택하고, 휴지통으로 지웁니다. 이미지·영상·포인트클라우드·CSV·JSON은 타입별 뷰어로 바로 열립니다.',
          },
          {
            title: '역할로 나누는 권한.',
            body: '멤버를 초대하고 역할을 부여합니다. 검수자는 리뷰에, 라벨러는 라벨링에, 개발자는 연동에 집중하도록 권한이 나뉩니다.',
          },
        ],
        specs: {
          rows: [
            [
              '위키',
              'Markdown · LaTeX 수식 · Mermaid 다이어그램 · 3모드 에디터 · 슬라이드 발표',
            ],
            [
              '파일',
              'Drive 스타일 탐색 · 러버밴드 선택 · 휴지통/실행 취소 · 타입별 뷰어',
            ],
            ['동영상', 'HLS 스트리밍 · 선택적 암호화 · 플레이리스트'],
            ['멤버', '역할 기반 권한 · 프로젝트 단위 초대'],
          ],
        },
      },

      developers: {
        title: '토큰 하나로 붙는 API, 키 하나로 파는 소프트웨어.',
        intro:
          '프로젝트 액세스 토큰으로 데이터를 프로그래밍 방식으로 다루고, 설치형 소프트웨어에는 오프라인 검증 가능한 제품키를 발급합니다.',
        sections: [
          {
            title: '범위를 정해 발급하는 액세스 토큰.',
            body: '토큰마다 읽기/쓰기 범위와 만료일을 정합니다. 원문은 생성 직후 단 한 번만 표시되고 서버에는 해시만 남습니다. 유출이 의심되면 회전 한 번으로 교체됩니다.',
          },
          {
            title: '제품키는 발급부터 취소까지.',
            body: '정책(기간·머신 수·기능)을 정의하고 고객별 키를 발급합니다. 키는 XXXXXXXX-XXXXXXXX 형식 4그룹, 머신 활성화 현황과 만료 전략(제한/차단)까지 대시보드에서 관리합니다.',
          },
          {
            title: '오프라인에서도 검증되는 서명.',
            body: '라이선스 파일은 Ed25519로 서명됩니다. 설치형 소프트웨어는 내장한 공개키만으로 네트워크 없이 라이선스를 검증합니다. 공개키는 PEM으로 내려받아 그대로 임베드하세요.',
          },
        ],
        specs: {
          rows: [
            [
              '액세스 토큰',
              '범위 기반 권한 · 만료일 · 회전/폐기 · 원문 1회 노출(해시 저장)',
            ],
            [
              '제품키',
              '정책(기간 · 머신 수 · 기능) · 발급/일시중지/취소 · 머신 활성화 추적',
            ],
            ['오프라인 검증', 'Ed25519 서명 · 공개키 PEM 배포 · 네트워크 불필요'],
            ['API', 'REST API · 프로젝트 단위 인증'],
          ],
        },
      },
    },
  },

  en: {
    featurePage: {
      labelingKicker: 'Labeling',
      platformKicker: 'Platform',
      specsTitle: 'Specs',
      relatedTitle: 'See also',
      ctaTitle: 'The fastest way to judge it is to draw',
      ctaDescription: 'The free plan needs no credit card.',
    },

    pages: {
      images: {
        title: 'Image labeling that keeps up, from boxes to keypoints.',
        intro:
          'Move between 12 tools with shortcuts and finish review on the same screen. The editor stays responsive even on large images.',
        sections: [
          {
            title: 'Twelve tools, all on shortcuts.',
            body: 'Rectangle (R), rotated rectangle (O), polygon (G), polyline (L), ellipse (E), point (P), brush (B) and eraser (X), keypoints (K) — every tool has a shortcut so your mouse never leaves the canvas. Each class carries its color and geometry type, so wrong-shape labels can’t happen.',
          },
          {
            title: 'Keypoints come from skeleton presets.',
            body: 'Start from person, hand, face, or animal templates, or define your own skeleton in a graphical editor by placing joints and connecting bones. When labeling, you just pick the preset.',
          },
          {
            title: 'Review lives inside the editor.',
            body: 'Check open comments in the issues tab and click pins on the canvas to answer feedback at the exact spot. No context switching between labeling and QA.',
          },
        ],
        specs: {
          rows: [
            [
              'Shape types',
              'Rectangle · rotated rectangle · polygon · polyline · point · ellipse · brush mask · keypoints',
            ],
            ['Status workflow', 'Unlabeled → in progress → labeled → reviewed'],
            [
              'Editing',
              'Undo/redo · vertex editing · clone previous sample · grid · minimap',
            ],
            [
              'Performance',
              'Bitmap-cached rendering · neighbor prefetch · image LRU cache',
            ],
          ],
        },
      },

      videos: {
        title: 'Set keyframes; interpolation fills the rest.',
        intro:
          'Tracks and keyframes sit on an always-visible timeline. Every shape type supports tracks, and frames between keyframes are interpolated automatically.',
        sections: [
          {
            title: 'The timeline is always there.',
            body: 'A ruler, playhead, and per-track keyframe markers dock at the bottom of the editor. Frame-precise stepping (previous/next/first/last) and an fps badge get you to the exact frame.',
          },
          {
            title: 'Keyframes for every shape.',
            body: 'Not just boxes — polygons, keypoints, and polylines all carry keyframes and interpolate between them. When an object disappears, split the track; when it returns, continue it.',
          },
          {
            title: 'From upload to playback, one place.',
            body: 'The video library manages raw and HLS streaming assets side by side. Encrypt sensitive footage at rest and organize clips into playlists for the team.',
          },
        ],
        specs: {
          rows: [
            ['Timeline', 'Ruler · playhead · track rows · diamond keyframe markers'],
            ['Interpolation', 'Automatic between keyframes · track split/continue'],
            ['Playback', 'Frame stepping · fps badge · playback speed'],
            ['Assets', 'Raw / HLS streaming · optional encryption · playlists'],
          ],
        },
      },

      pointClouds: {
        title: 'Millions of points, labeled in the browser.',
        intro:
          'Upload LAS/LAZ, PLY, or PCD and it opens instantly with GPU rendering. Work with a perspective view plus top/front/side orthographic views, labeling with cuboids and point segments.',
        sections: [
          {
            title: 'Four viewpoints on one scene.',
            body: 'Top (BEV), front, and side orthographic views stack next to the main perspective view. Refine cuboids with move/rotate/scale gizmos, then fit-to-points (F) or snap-to-ground (Shift+F). Switch coloring between RGB, label, height, intensity, and texture.',
          },
          {
            title: 'Auto-segmentation gets you started.',
            body: 'Filter invalid (0,0,0) points, remove dominant planes like floors and tables with RANSAC, then cluster the rest into instances on a voxel grid. Not happy with the result? One undo reverts it all.',
          },
          {
            title: 'Import and export the formats you already use.',
            body: 'LAS/LAZ decodes in the browser via WASM. Labeled PLY, SemanticKITTI (.label), Pointcept (.npy), and LAS classification round-trip your existing pipeline’s labels.',
          },
        ],
        specs: {
          rows: [
            ['Input formats', 'PLY · PCD · LAS · LAZ (in-browser WASM decoding)'],
            [
              'Label formats',
              'Labeled PLY · SemanticKITTI (.label) · Pointcept (.npy) · ASCII · LAS classification',
            ],
            [
              'Tools',
              'Cuboid · lasso/box segments · 3D point/polyline/polygon/keypoints · distance measure',
            ],
            [
              'Color modes',
              'RGB · label · height · intensity · texture (turbo/viridis colormaps, per-instance colors)',
            ],
            [
              'Auto-segmentation',
              'Invalid-point filtering · RANSAC dominant plane · grid clustering',
            ],
          ],
        },
      },

      datasets: {
        title: 'Images, video, and 3D as datasets of one project.',
        intro:
          'Every dataset has a type, and the right editor and tools follow automatically. Progress and class distribution are visible at a glance.',
        sections: [
          {
            title: 'Datasets with a type.',
            body: 'Image, video, or point cloud — choose a type at creation and upload validation, the editor, and tooling line up with it. Different modalities live side by side in one project.',
          },
          {
            title: 'Management you can see.',
            body: 'Each sample moves through unlabeled, in-progress, labeled, and reviewed. A progress bar and per-class annotation counts sit at the top of the dataset. Click a status chip to filter down to what’s left.',
          },
          {
            title: 'Classes and tags are your dataset’s language.',
            body: 'Classes carry a color and geometry type; tags carry a value type (choice, number, text). Keypoint classes link to skeleton presets. Or start instantly from the public dataset gallery with examples like COCO128.',
          },
        ],
        specs: {
          rows: [
            ['Dataset types', 'Image · video · point cloud'],
            ['Sample status', 'Unlabeled · in progress · labeled · reviewed'],
            ['Taxonomy', 'Classes (color · geometry) · tags (choice · number · text)'],
            ['Getting started', 'Drag-and-drop upload · public dataset gallery'],
          ],
        },
      },

      review: {
        title: 'Review that pins feedback on the label.',
        intro:
          'QA feedback lands as a pin at exact image coordinates. Labelers reply in a thread from the issues tab; resolving turns the pin green.',
        sections: [
          {
            title: 'Exact spot, exact feedback.',
            body: 'Click anywhere on the image with the comment tool (C) to open an issue. Instead of “box #3 is too big”, put the pin on that box. On video, pins stick to a specific frame.',
          },
          {
            title: 'Discuss in threads, close with resolve.',
            body: 'Every issue carries a comment thread. Open issues show as numbered amber pins; resolved ones as green checks. Filter by all, open, or resolved to see only what’s left.',
          },
          {
            title: 'Review status is progress.',
            body: 'Reviewed samples and open-issue counts roll up into dataset statistics, so leads can see how far QA has come without opening a single sample.',
          },
        ],
        specs: {
          rows: [
            [
              'Issue pins',
              'Image-coordinate anchored · video-frame anchored · numbered status badges',
            ],
            [
              'Threads',
              'Comments · replies · resolve/reopen · author and relative time',
            ],
            ['Filters', 'All · open · resolved'],
            ['Rollups', 'Open/resolved comments feed dataset statistics'],
          ],
        },
      },

      collaboration: {
        title: 'Your labeling team’s collaboration space, included.',
        intro:
          'Members and roles, wiki docs, files, and a video library — all scoped to the project. Stop keeping labeling guidelines in another tool.',
        sections: [
          {
            title: 'Guidelines belong in the wiki.',
            body: 'Write labeling criteria and edge cases in a Markdown wiki with LaTeX math, Mermaid diagrams, and tables. Edit in text, visual, or preview mode. One page is one file, so exporting is trivial.',
          },
          {
            title: 'Files, the Drive way.',
            body: 'Create folders, rubber-band select, and delete to a trash you can undo from. Images, video, point clouds, CSV, and JSON open in type-aware viewers.',
          },
          {
            title: 'Permissions split by role.',
            body: 'Invite members and assign roles so reviewers focus on QA, labelers on labeling, and developers on integrations.',
          },
        ],
        specs: {
          rows: [
            [
              'Wiki',
              'Markdown · LaTeX math · Mermaid diagrams · 3-mode editor · slide decks',
            ],
            [
              'Files',
              'Drive-style browsing · rubber-band selection · trash/undo · type-aware viewers',
            ],
            ['Video', 'HLS streaming · optional encryption · playlists'],
            ['Members', 'Role-based permissions · per-project invites'],
          ],
        },
      },

      developers: {
        title: 'One token for the API, one key to ship software.',
        intro:
          'Work with your data programmatically through project access tokens, and issue offline-verifiable license keys for installed software.',
        sections: [
          {
            title: 'Access tokens with explicit scopes.',
            body: 'Each token gets read/write scopes and an expiry. The plaintext shows exactly once at creation — only a hash is stored. Suspect a leak? Rotate it in one click.',
          },
          {
            title: 'License keys from issue to revoke.',
            body: 'Define policies (duration, machine count, features) and issue per-customer keys in the XXXXXXXX-XXXXXXXX four-group format. Track machine activations and choose an expiry strategy (restrict or revoke) from the dashboard.',
          },
          {
            title: 'Signatures that verify offline.',
            body: 'License files are signed with Ed25519. Installed software verifies them with an embedded public key — no network required. Download the public key as PEM and embed it as-is.',
          },
        ],
        specs: {
          rows: [
            [
              'Access tokens',
              'Scoped permissions · expiry · rotate/revoke · plaintext shown once (hash stored)',
            ],
            [
              'License keys',
              'Policies (duration · machines · features) · issue/suspend/revoke · activation tracking',
            ],
            [
              'Offline verification',
              'Ed25519 signatures · public key PEM · no network required',
            ],
            ['API', 'REST API · per-project authentication'],
          ],
        },
      },
    },
  },
} as const;
