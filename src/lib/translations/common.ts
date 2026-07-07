/** Shared strings: top navigation, page labels, footer, CTA, not-found. */
export const common = {
  ko: {
    nav: {
      labeling: '라벨링',
      platform: '플랫폼',
      pricing: '가격',
      login: '로그인',
      getStarted: '무료로 시작',
      comingSoon: '출시 준비 중',
      openMenu: '메뉴 열기',
      closeMenu: '메뉴 닫기',
    },

    /** Labels shared by nav dropdowns, footer link map, and related-page cards. */
    pageMeta: {
      images: {
        label: '이미지 라벨링',
        nav: '이미지',
        tagline: '박스 · 폴리곤 · 키포인트를 빠르게',
      },
      videos: {
        label: '비디오 라벨링',
        nav: '비디오',
        tagline: '타임라인 · 키프레임 · 트랙 보간',
      },
      pointClouds: {
        label: '3D 포인트클라우드',
        nav: '3D 포인트클라우드',
        tagline: 'BEV · 인스턴스 · 자동 분할',
      },
      datasets: {
        label: '데이터셋 관리',
        nav: '데이터셋',
        tagline: '이미지 · 비디오 · 3D를 한 곳에서',
      },
      review: {
        label: '리뷰 & QA',
        nav: '리뷰 & QA',
        tagline: '핀 코멘트로 라벨 품질 관리',
      },
      collaboration: {
        label: '팀 협업',
        nav: '팀 협업',
        tagline: '멤버 · 위키 · 파일 · 동영상',
      },
      developers: {
        label: '개발자',
        nav: '개발자',
        tagline: '토큰 API · 제품키 라이선싱',
      },
    },

    cta: {
      title: '오늘 첫 라벨을 그려보세요',
      description:
        '설치도, 영업 미팅도 없습니다. 무료 플랜으로 시작해 팀이 커지면 업그레이드하세요.',
      primary: '무료로 시작',
      secondary: '가격 보기',
      comingSoonNote: 'app.cvp.run 정식 오픈을 준비하고 있습니다.',
    },

    footer: {
      description:
        'CVP — 이미지, 비디오, 3D 포인트클라우드를 하나의 워크스페이스에서 라벨링하고 관리하는 비전 데이터 플랫폼.',
      labelingTitle: '라벨링',
      platformTitle: '플랫폼',
      companyTitle: '제품',
      pricing: '가격',
      roadmapNote: '에이전트 · MLOps · 관제 등 더 많은 기능을 준비하고 있습니다.',
      copyright: '© 2026 CVP. All rights reserved.',
    },

    notFound: {
      title: '페이지를 찾을 수 없습니다',
      description: '주소가 바뀌었거나 삭제된 페이지입니다.',
      back: '홈으로 돌아가기',
    },

    misc: {
      mockNote: '* 실제 컴포넌트로 재현한 화면이며, 데이터는 예시입니다.',
      betaBadge: '베타',
    },
  },

  en: {
    nav: {
      labeling: 'Labeling',
      platform: 'Platform',
      pricing: 'Pricing',
      login: 'Sign in',
      getStarted: 'Start for free',
      comingSoon: 'Coming soon',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },

    pageMeta: {
      images: {
        label: 'Image labeling',
        nav: 'Images',
        tagline: 'Boxes, polygons, and keypoints — fast',
      },
      videos: {
        label: 'Video labeling',
        nav: 'Videos',
        tagline: 'Timeline, keyframes, track interpolation',
      },
      pointClouds: {
        label: '3D point clouds',
        nav: '3D point clouds',
        tagline: 'BEV, instances, auto-segmentation',
      },
      datasets: {
        label: 'Dataset management',
        nav: 'Datasets',
        tagline: 'Images, video, and 3D in one place',
      },
      review: {
        label: 'Review & QA',
        nav: 'Review & QA',
        tagline: 'Pin comments for label quality',
      },
      collaboration: {
        label: 'Team collaboration',
        nav: 'Collaboration',
        tagline: 'Members, wiki, files, and video',
      },
      developers: {
        label: 'Developers',
        nav: 'Developers',
        tagline: 'Token API and license keys',
      },
    },

    cta: {
      title: 'Draw your first label today',
      description:
        'No install, no sales call. Start on the free plan and upgrade as your team grows.',
      primary: 'Start for free',
      secondary: 'See pricing',
      comingSoonNote: 'app.cvp.run is getting ready for launch.',
    },

    footer: {
      description:
        'CVP — the vision data platform for labeling and managing images, video, and 3D point clouds in one workspace.',
      labelingTitle: 'Labeling',
      platformTitle: 'Platform',
      companyTitle: 'Product',
      pricing: 'Pricing',
      roadmapNote: 'Agents, MLOps, monitoring, and more are on the roadmap.',
      copyright: '© 2026 CVP. All rights reserved.',
    },

    notFound: {
      title: 'Page not found',
      description: 'This page may have moved or been removed.',
      back: 'Back to home',
    },

    misc: {
      mockNote: '* Recreated with real components; all data shown is sample data.',
      betaBadge: 'Beta',
    },
  },
} as const;
