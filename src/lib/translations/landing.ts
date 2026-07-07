/** Landing page copy. Section order mirrors `pages/landing.tsx`. */
export const landing = {
  ko: {
    hero: {
      badge: '이미지 · 비디오 · 3D 포인트클라우드',
      title: '비전 데이터의 워크스페이스.',
      description:
        '수집, 라벨링, 리뷰, 협업 — 팀의 비전 데이터 전부를 한 곳에서. 설치 없이 브라우저에서 바로 시작하세요.',
      primaryCta: '무료로 시작',
      secondaryCta: '가격 보기',
      comingSoonNote: 'app.cvp.run 정식 오픈을 준비하고 있습니다.',
    },

    modalities: {
      label: '3가지 모달리티',
      title: '어떤 데이터든, 같은 워크스페이스에서.',
      description:
        '이미지, 비디오, 3D 포인트클라우드 — 데이터 타입이 달라져도 에디터만 바뀔 뿐, 프로젝트·클래스·리뷰 흐름은 그대로입니다.',
      tabs: {
        images: '이미지',
        videos: '비디오',
        pointClouds: '3D 포인트클라우드',
      },
    },

    sections: {
      images: {
        kicker: '이미지 라벨링',
        title: '박스에서 키포인트까지, 손에 붙는 에디터.',
        body: '사각형·다각형·키포인트·브러시 등 12종 도구를 단축키로 오가며 그립니다. 대용량 이미지에서도 지연 없는 반응속도를 유지하도록 렌더링을 최적화했습니다.',
        cta: '이미지 라벨링 자세히',
      },
      videos: {
        kicker: '비디오 라벨링',
        title: '키프레임만 찍으면, 사이는 보간으로.',
        body: '항상 표시되는 타임라인 위에 키프레임을 추가하면 트랙이 프레임 사이를 보간합니다. 모든 도형 타입이 트랙과 키프레임을 지원합니다.',
        cta: '비디오 라벨링 자세히',
      },
      pointClouds: {
        kicker: '3D 포인트클라우드',
        title: '수백만 점을 브라우저에서 그대로.',
        body: 'LAS/LAZ·PLY·PCD를 업로드하면 GPU 렌더링으로 즉시 열립니다. BEV(조감) 뷰, 인스턴스 관리, RANSAC 평면·클러스터 자동 분할까지 — 3D 라벨링에 필요한 것을 담았습니다.',
        cta: '3D 라벨링 자세히',
      },
      review: {
        kicker: '리뷰 & QA',
        title: '라벨 위에 핀을 꽂고, 스레드로 해결.',
        body: '검수자가 이미지 위 정확한 위치에 코멘트 핀을 남기면, 라벨러는 이슈 탭에서 스레드로 답하고 해결 처리합니다. 리뷰가 라벨링 화면 밖으로 나가지 않습니다.',
        cta: '리뷰 & QA 자세히',
      },
      workspace: {
        kicker: '데이터 워크스페이스',
        title: '라벨링 전후의 데이터까지 한 프로젝트에.',
        body: '데이터셋과 클래스는 물론 파일, 동영상 라이브러리, 위키 문서까지 프로젝트 단위로 관리합니다. 라벨링 도구 따로, 자료 창고 따로 쓰던 시대를 끝내세요.',
        cta: '데이터셋 관리 자세히',
      },
      developers: {
        kicker: '개발자',
        title: 'API 토큰과 제품키로 어디서든 연동.',
        body: '프로젝트 액세스 토큰으로 데이터를 프로그래밍 방식으로 읽고 쓰고, 설치형 소프트웨어에는 오프라인 검증 가능한 제품키를 발급합니다.',
        cta: '개발자 기능 자세히',
      },
    },

    pricingTeaser: {
      label: '가격',
      title: '카드 한 장으로 시작하는 투명한 가격.',
      description:
        '견적서와 영업 미팅 없이, 필요한 만큼만. 무료 플랜으로 충분히 써보고 결정하세요.',
      cta: '전체 가격 보기',
    },
  },

  en: {
    hero: {
      badge: 'Images · Video · 3D point clouds',
      title: 'The workspace for vision data.',
      description:
        'Collect, label, review, and collaborate — all of your team’s vision data in one place. No install, right in the browser.',
      primaryCta: 'Start for free',
      secondaryCta: 'See pricing',
      comingSoonNote: 'app.cvp.run is getting ready for launch.',
    },

    modalities: {
      label: 'Three modalities',
      title: 'Any data type, the same workspace.',
      description:
        'Images, video, and 3D point clouds — the editor changes, but your projects, classes, and review flow stay the same.',
      tabs: {
        images: 'Images',
        videos: 'Video',
        pointClouds: '3D point clouds',
      },
    },

    sections: {
      images: {
        kicker: 'Image labeling',
        title: 'From boxes to keypoints, an editor that keeps up.',
        body: 'Move between 12 tools — rectangle, polygon, keypoints, brush, and more — with shortcuts. Rendering is tuned to stay responsive even on large images.',
        cta: 'More on image labeling',
      },
      videos: {
        kicker: 'Video labeling',
        title: 'Set keyframes; interpolation fills the rest.',
        body: 'Add keyframes on an always-visible timeline and tracks interpolate between frames. Every shape type supports tracks and keyframes.',
        cta: 'More on video labeling',
      },
      pointClouds: {
        kicker: '3D point clouds',
        title: 'Millions of points, right in the browser.',
        body: 'Upload LAS/LAZ, PLY, or PCD and it opens instantly with GPU rendering. BEV view, instance management, and RANSAC plane and cluster auto-segmentation — everything 3D labeling needs.',
        cta: 'More on 3D labeling',
      },
      review: {
        kicker: 'Review & QA',
        title: 'Pin feedback on the label, resolve it in a thread.',
        body: 'Reviewers drop comment pins at the exact spot on the image; labelers reply and resolve from the issues tab. Review never leaves the labeling screen.',
        cta: 'More on review & QA',
      },
      workspace: {
        kicker: 'Data workspace',
        title: 'The data around your labels lives in the same project.',
        body: 'Manage datasets and classes alongside files, a video library, and wiki docs — per project. Stop juggling a labeling tool and a separate file dump.',
        cta: 'More on datasets',
      },
      developers: {
        kicker: 'Developers',
        title: 'Integrate anywhere with token APIs and license keys.',
        body: 'Read and write your data programmatically with project access tokens, and issue offline-verifiable license keys for installed software.',
        cta: 'More for developers',
      },
    },

    pricingTeaser: {
      label: 'Pricing',
      title: 'Transparent pricing you can start with a card.',
      description:
        'No quotes, no sales calls — pay for what you need. Try the free plan for as long as you like.',
      cta: 'See full pricing',
    },
  },
} as const;
