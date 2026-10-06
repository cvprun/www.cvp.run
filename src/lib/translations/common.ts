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
        tagline: '13종 도구 · 매직 완드 · 자동 라벨링',
      },
      videos: {
        label: '비디오 라벨링',
        nav: '비디오',
        tagline: '타임라인 · 키프레임 · 트랙 보간',
      },
      pointClouds: {
        label: '3D 포인트클라우드',
        nav: '3D 포인트클라우드',
        tagline: '큐보이드 · 세그먼트 · Pointcept AI',
      },
      timeSeries: {
        label: '시계열 라벨링',
        nav: '시계열',
        tagline: '센서 · 설비 신호의 구간 · 이벤트 라벨',
      },
      datasets: {
        label: '데이터셋 관리',
        nav: '데이터셋',
        tagline: '업로드 위저드 · QA & 통계 · 내보내기',
      },
      training: {
        label: '학습 & AI 라벨링',
        nav: '학습 & AI',
        tagline: '훈련 위저드 · 내 GPU로 추론 · 실험 추적',
      },
      review: {
        label: '리뷰 & QA',
        nav: '리뷰 & QA',
        tagline: '핀 코멘트로 라벨 품질 관리',
      },
      collaboration: {
        label: '팀 협업',
        nav: '팀 협업',
        tagline: '위키 · 파일 · 동영상 · 멤버',
      },
      developers: {
        label: '개발자',
        nav: '개발자',
        tagline: 'CLI · MLflow 토큰 · 제품키',
      },
      agents: {
        label: '에이전트',
        nav: '에이전트',
        tagline: '내 장비에서 실행되는 AI · 산업 앱',
      },
      collectors: {
        label: '수집기',
        nav: '수집기',
        tagline: '현장 카메라 · 센서 데이터 수집',
      },
      twin: {
        label: '디지털 트윈',
        nav: '디지털 트윈',
        tagline: '3D 공장 · 실시간 바인딩 · VR',
      },
      mlflow: {
        label: 'MLOps',
        nav: 'MLOps',
        tagline: 'MLflow 호환 추적 · 모델 레지스트리',
      },
      graphs: {
        label: '그래프',
        nav: '그래프',
        tagline: '블루프린트식 비전 파이프라인',
      },
      grids: {
        label: '그리드',
        nav: '그리드',
        tagline: '7가지 보기의 스프레드시트형 DB',
      },
      maps: {
        label: '지도',
        nav: '지도',
        tagline: '레이어 · 피처 드로잉',
      },
      meetings: {
        label: '회의 · 회의록',
        nav: '회의 · 회의록',
        tagline: '화상 회의 · 녹음 → 전사 → 요약',
      },
      signatures: {
        label: '전자서명',
        nav: '전자서명',
        tagline: '결재선 · 서명 원장 · 무결성 검증',
      },
      memory: {
        label: '메모리 맵',
        nav: '메모리 맵',
        tagline: 'PLC 레지스터를 닮은 공유 메모리',
      },
      registry: {
        label: '레지스트리',
        nav: '레지스트리',
        tagline: 'Docker · Helm · pip · npm',
      },
      apps: {
        label: '어플리케이션',
        nav: '어플리케이션',
        tagline: '브라우저 안의 CV · 개발 유틸리티',
      },
      store: {
        label: '스토어',
        nav: '스토어',
        tagline: '위키 · 그리드 · 데이터셋 마켓플레이스',
      },
    },

    cta: {
      title: '오늘 첫 라벨을 그려 보십시오',
      description:
        '설치도, 영업 미팅도 없습니다. 무료 플랜으로 시작해 팀이 커지면 업그레이드할 수 있습니다.',
      primary: '무료로 시작',
      secondary: '가격 보기',
      comingSoonNote: 'app.cvp.run 정식 오픈을 준비하고 있습니다.',
    },

    newsletter: {
      title: '뉴스레터',
      description: '제품 소식과 업데이트를 이메일로 전해 드립니다.',
      ctaLead: '뉴스레터를 구독하면 새 기능 소식을 가장 먼저 받아 볼 수 있습니다.',
      emailLabel: '이메일 주소',
      emailPlaceholder: 'you@example.com',
      subscribe: '구독하기',
      submitting: '전송 중…',
      success: '확인 메일을 보냈습니다. 받은편지함을 확인해 주십시오.',
      error: '요청에 실패했습니다. 잠시 후 다시 시도해 주십시오.',
      confirmTitle: '뉴스레터 구독 확정',
      confirmDescription: '아래 버튼을 누르면 뉴스레터 구독이 확정됩니다.',
      confirmAction: '구독 확정하기',
      confirmSuccessTitle: '구독이 완료되었습니다',
      confirmSuccessDescription:
        '이제 CVP 소식과 업데이트를 이메일로 받아보실 수 있습니다.',
      unsubscribeTitle: '뉴스레터 수신거부',
      unsubscribeDescription:
        '아래 버튼을 누르면 더 이상 뉴스레터를 발송하지 않습니다.',
      unsubscribeAction: '수신거부하기',
      unsubscribeSuccessTitle: '수신거부가 완료되었습니다',
      unsubscribeSuccessDescription:
        '더 이상 메일이 발송되지 않습니다. 언제든 다시 구독하실 수 있습니다.',
      working: '처리 중…',
      invalidTitle: '링크가 유효하지 않습니다',
      invalidDescription:
        '링크가 만료되었거나 이미 처리되었습니다. 필요한 경우 다시 구독을 신청해 주십시오.',
    },

    footer: {
      description:
        'CVP — 이미지·비디오·3D·시계열 데이터를 수집하고, 라벨링하고, 학습까지 잇는 비전 데이터 플랫폼.',
      labelingTitle: '라벨링',
      platformTitle: '플랫폼',
      moreTitle: '더 보기',
      companyTitle: '제품',
      pricing: '가격',
      roadmapNote: '베타 — 기능과 가격은 정식 출시 전에 변경될 수 있습니다.',
      copyright: '© 2026 CVP. All rights reserved.',
    },

    notFound: {
      title: '페이지를 찾을 수 없습니다',
      description: '주소가 변경되었거나 삭제된 페이지입니다.',
      back: '홈으로 돌아가기',
    },

    misc: {
      mockNote: '* 실제 앱 화면을 재현한 데모입니다.',
      dataNote:
        '사진·영상·포인트 클라우드는 공개 데이터셋의 실제 데이터입니다 — Open Images(CC BY 2.0) · COCO(CC BY 4.0) · DAVIS 2017(CC BY 4.0) · Wikimedia Commons(CC0) · PandaSet(CC0)',
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
        tagline: '13 tools · magic wand · auto-label',
      },
      videos: {
        label: 'Video labeling',
        nav: 'Video',
        tagline: 'Timeline · keyframes · track interpolation',
      },
      pointClouds: {
        label: '3D point clouds',
        nav: '3D point clouds',
        tagline: 'Cuboids · segments · Pointcept AI',
      },
      timeSeries: {
        label: 'Time-series labeling',
        nav: 'Time series',
        tagline: 'Ranges and events on sensor signals',
      },
      datasets: {
        label: 'Dataset management',
        nav: 'Datasets',
        tagline: 'Upload wizard · QA & stats · export',
      },
      training: {
        label: 'Training & AI labeling',
        nav: 'Training & AI',
        tagline: 'Training wizard · inference on your GPU',
      },
      review: {
        label: 'Review & QA',
        nav: 'Review & QA',
        tagline: 'Label quality through pinned comments',
      },
      collaboration: {
        label: 'Team collaboration',
        nav: 'Collaboration',
        tagline: 'Wiki · files · video · members',
      },
      developers: {
        label: 'Developers',
        nav: 'Developers',
        tagline: 'CLI · MLflow tokens · product keys',
      },
      agents: {
        label: 'Agents',
        nav: 'Agents',
        tagline: 'AI and industrial apps on your machines',
      },
      collectors: {
        label: 'Collectors',
        nav: 'Collectors',
        tagline: 'Camera and sensor data from the floor',
      },
      twin: {
        label: 'Digital twin',
        nav: 'Digital twin',
        tagline: '3D plants · live bindings · VR',
      },
      mlflow: {
        label: 'MLOps',
        nav: 'MLOps',
        tagline: 'MLflow-compatible tracking · model registry',
      },
      graphs: {
        label: 'Graphs',
        nav: 'Graphs',
        tagline: 'Blueprint-style vision pipelines',
      },
      grids: {
        label: 'Grids',
        nav: 'Grids',
        tagline: 'A spreadsheet database with 7 views',
      },
      maps: {
        label: 'Maps',
        nav: 'Maps',
        tagline: 'Layers · feature drawing',
      },
      meetings: {
        label: 'Meetings',
        nav: 'Meetings',
        tagline: 'Video calls · record → transcribe → summarize',
      },
      signatures: {
        label: 'E-signatures',
        nav: 'E-signatures',
        tagline: 'Approval lines · signature ledger',
      },
      memory: {
        label: 'Memory maps',
        nav: 'Memory maps',
        tagline: 'Shared memory shaped like PLC registers',
      },
      registry: {
        label: 'Registry',
        nav: 'Registry',
        tagline: 'Docker · Helm · pip · npm',
      },
      apps: {
        label: 'Applications',
        nav: 'Applications',
        tagline: 'CV and developer utilities in the browser',
      },
      store: {
        label: 'Store',
        nav: 'Store',
        tagline: 'A marketplace for wikis, grids, and datasets',
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
        'CVP — the vision data platform that collects, labels, and trains on images, video, 3D, and time series.',
      labelingTitle: 'Labeling',
      platformTitle: 'Platform',
      moreTitle: 'More',
      companyTitle: 'Product',
      pricing: 'Pricing',
      roadmapNote:
        'Beta — features and pricing may change before general availability.',
      copyright: '© 2026 CVP. All rights reserved.',
    },

    notFound: {
      title: 'Page not found',
      description: 'This page may have moved or been removed.',
      back: 'Back to home',
    },

    misc: {
      mockNote: '* A demo recreated from the real app screen.',
      dataNote:
        'Photos, footage, and point clouds are real data from open datasets — Open Images (CC BY 2.0) · COCO (CC BY 4.0) · DAVIS 2017 (CC BY 4.0) · Wikimedia Commons (CC0) · PandaSet (CC0)',
      betaBadge: 'Beta',
    },
  },
} as const;
