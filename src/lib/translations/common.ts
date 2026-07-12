/** Shared strings: top navigation, page labels, footer, CTA, not-found. */
export const common = {
  ko: {
    nav: {
      labeling: '라벨링',
      platform: '플랫폼',
      more: '더 보기',
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
      apps: {
        label: '어플리케이션',
        nav: '어플리케이션',
        tagline: '50+ CV 유틸리티 도구 모음',
      },
      graphs: {
        label: '그래프',
        nav: '그래프',
        tagline: '노드 기반 비전 파이프라인',
      },
      agents: {
        label: '에이전트',
        nav: '에이전트',
        tagline: '엣지 장비 원격 실행',
      },
      clusters: {
        label: '클러스터',
        nav: '클러스터',
        tagline: 'Kubernetes 클러스터 제어',
      },
      vms: {
        label: '관제 (VMS)',
        nav: '관제 (VMS)',
        tagline: 'CCTV 통합 관제',
      },
      manufacturing: {
        label: '제조 (MES)',
        nav: '제조 (MES)',
        tagline: '작업지시 · 추적성 · 설비',
      },
      mlflow: {
        label: 'MLOps',
        nav: 'MLOps',
        tagline: 'MLflow 실험 추적 · 모델 레지스트리',
      },
      grids: {
        label: '그리드',
        nav: '그리드',
        tagline: '스프레드시트형 데이터베이스',
      },
      maps: {
        label: '지도',
        nav: '지도',
        tagline: 'GIS 레이어 · 피처 드로잉',
      },
      meetings: {
        label: '회의록',
        nav: '회의록',
        tagline: '녹음 → 전사 → 요약 자동화',
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

    newsletter: {
      title: '뉴스레터',
      description: '제품 소식과 업데이트를 이메일로 받아보세요.',
      ctaLead: '뉴스레터로 새 기능 소식을 먼저 받아보세요.',
      emailLabel: '이메일 주소',
      emailPlaceholder: 'you@example.com',
      subscribe: '구독하기',
      submitting: '전송 중…',
      success: '확인 메일을 보냈습니다. 받은편지함을 확인해 주세요.',
      error: '요청에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      confirmTitle: '뉴스레터 구독 확정',
      confirmDescription: '아래 버튼을 누르면 뉴스레터 구독이 확정됩니다.',
      confirmAction: '구독 확정하기',
      confirmSuccessTitle: '구독이 완료되었습니다',
      confirmSuccessDescription:
        '이제 CVP 소식과 업데이트를 이메일로 받아보실 수 있습니다.',
      unsubscribeTitle: '뉴스레터 수신거부',
      unsubscribeDescription:
        '아래 버튼을 누르면 더 이상 뉴스레터를 보내드리지 않습니다.',
      unsubscribeAction: '수신거부하기',
      unsubscribeSuccessTitle: '수신거부가 완료되었습니다',
      unsubscribeSuccessDescription:
        '더 이상 메일이 발송되지 않습니다. 언제든 다시 구독하실 수 있습니다.',
      working: '처리 중…',
      invalidTitle: '링크가 유효하지 않습니다',
      invalidDescription:
        '링크가 만료되었거나 이미 처리되었습니다. 필요하면 다시 가입을 시도해 주세요.',
    },

    footer: {
      description:
        'CVP — 이미지, 비디오, 3D 포인트클라우드를 하나의 워크스페이스에서 라벨링하고 관리하는 비전 데이터 플랫폼.',
      labelingTitle: '라벨링',
      platformTitle: '플랫폼',
      moreTitle: '더 보기',
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
      mockNote: '* 실제 컴포넌트로 재현한 화면입니다.',
      dataNote:
        '사진·영상·포인트 클라우드는 공개 데이터셋의 실제 데이터입니다 — Open Images(CC BY 2.0) · Wikimedia Commons(CC0) · PandaSet(CC0)',
      betaBadge: '베타',
    },
  },

  en: {
    nav: {
      labeling: 'Labeling',
      platform: 'Platform',
      more: 'More',
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
      apps: {
        label: 'Applications',
        nav: 'Applications',
        tagline: '50+ CV utility tools',
      },
      graphs: {
        label: 'Graphs',
        nav: 'Graphs',
        tagline: 'Node-based vision pipelines',
      },
      agents: {
        label: 'Agents',
        nav: 'Agents',
        tagline: 'Remote execution on edge devices',
      },
      clusters: {
        label: 'Clusters',
        nav: 'Clusters',
        tagline: 'Kubernetes cluster control',
      },
      vms: {
        label: 'Monitoring (VMS)',
        nav: 'Monitoring (VMS)',
        tagline: 'Unified CCTV monitoring',
      },
      manufacturing: {
        label: 'Manufacturing (MES)',
        nav: 'Manufacturing (MES)',
        tagline: 'Work orders · traceability · equipment',
      },
      mlflow: {
        label: 'MLOps',
        nav: 'MLOps',
        tagline: 'MLflow tracking · model registry',
      },
      grids: {
        label: 'Grids',
        nav: 'Grids',
        tagline: 'Spreadsheet-style database',
      },
      maps: {
        label: 'Maps',
        nav: 'Maps',
        tagline: 'GIS layers · feature drawing',
      },
      meetings: {
        label: 'Meetings',
        nav: 'Meetings',
        tagline: 'Record → transcribe → summarize',
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

    newsletter: {
      title: 'Newsletter',
      description: 'Get product news and updates in your inbox.',
      ctaLead: 'Be the first to hear about new features via the newsletter.',
      emailLabel: 'Email address',
      emailPlaceholder: 'you@example.com',
      subscribe: 'Subscribe',
      submitting: 'Sending…',
      success: 'Confirmation email sent. Please check your inbox.',
      error: 'Something went wrong. Please try again in a moment.',
      confirmTitle: 'Confirm your subscription',
      confirmDescription:
        'Click the button below to confirm your newsletter subscription.',
      confirmAction: 'Confirm subscription',
      confirmSuccessTitle: 'Subscription confirmed',
      confirmSuccessDescription: 'You will now receive CVP news and updates by email.',
      unsubscribeTitle: 'Unsubscribe from the newsletter',
      unsubscribeDescription:
        'Click the button below to stop receiving the newsletter.',
      unsubscribeAction: 'Unsubscribe',
      unsubscribeSuccessTitle: 'You have been unsubscribed',
      unsubscribeSuccessDescription:
        'No more emails will be sent. You can subscribe again anytime.',
      working: 'Working…',
      invalidTitle: 'This link is not valid',
      invalidDescription:
        'The link has expired or was already used. Feel free to sign up again.',
    },

    footer: {
      description:
        'CVP — the vision data platform for labeling and managing images, video, and 3D point clouds in one workspace.',
      labelingTitle: 'Labeling',
      platformTitle: 'Platform',
      moreTitle: 'More',
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
      mockNote: '* Recreated with real product components.',
      dataNote:
        'Photos, footage, and point clouds are real data from open datasets — Open Images (CC BY 2.0) · Wikimedia Commons (CC0) · PandaSet (CC0)',
      betaBadge: 'Beta',
    },
  },
} as const;
