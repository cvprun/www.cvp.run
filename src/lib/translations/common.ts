/** Shared strings: top navigation, page labels, footer, CTA, not-found. */
export const common = {
  ko: {
    meta: {
      homeTitle: 'CVP — 비전 데이터의 워크스페이스',
      homeDescription:
        '이미지, 비디오, 3D 포인트클라우드, 시계열 데이터를 하나의 워크스페이스에서 수집·라벨링·학습·추론합니다. 별도 설치 없이 브라우저에서 바로 시작할 수 있습니다.',
    },

    nav: {
      primary: '주 메뉴',
      labeling: '라벨링',
      platform: '플랫폼',
      more: '더 보기',
      pricing: '가격',
      changelog: '변경 내역',
      security: '보안',
      login: '로그인',
      getStarted: '무료로 시작',
      comingSoon: '출시 준비 중',
      openMenu: '메뉴 열기',
      closeMenu: '메뉴 닫기',
      skipToContent: '본문으로 건너뛰기',
      language: '언어 선택',
      themeToLight: '라이트 모드로 전환',
      themeToDark: '다크 모드로 전환',
      groups: {
        edge: '현장 연동',
        workspace: '워크스페이스',
        build: '개발 도구',
      },
    },

    announcement: {
      label: '새 기능',
      text: '추론 섹션, MLOps 개편, ModbusTCP 장치 관리가 추가되었습니다.',
      cta: '변경 내역 보기',
      dismiss: '공지 닫기',
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
        tagline: '큐보이드 · 세그먼트 · 3D 자동 라벨링',
      },
      timeSeries: {
        label: '시계열 라벨링',
        nav: '시계열',
        tagline: '센서 · 설비 신호의 구간 · 이벤트 라벨',
      },
      datasets: {
        label: '데이터셋 관리',
        nav: '데이터셋',
        tagline: '업로드 위저드 · 샘플 목록 · QA 통계',
      },
      training: {
        label: '학습 & AI 라벨링',
        nav: '학습 & AI',
        tagline: '훈련 위저드 · 에디터 자동 라벨링',
      },
      inference: {
        label: '추론',
        nav: '추론',
        tagline: '7가지 추론 기능 · 결과를 라벨로 저장',
      },
      mlops: {
        label: 'MLOps',
        nav: 'MLOps',
        tagline: '실험 · 런 비교 · 모델 별칭',
      },
      review: {
        label: '리뷰 & QA',
        nav: '리뷰 & QA',
        tagline: '핀 코멘트로 라벨 품질 관리',
      },
      collaboration: {
        label: '팀 협업',
        nav: '팀 협업',
        tagline: '위키 · 파일 · 멤버 · 활동',
      },
      developers: {
        label: '개발자',
        nav: '개발자',
        tagline: 'CLI · S3 호환 API · MLflow',
      },
      agents: {
        label: '에이전트',
        nav: '에이전트',
        tagline: '자체 장비에서 실행되는 앱',
      },
      collectors: {
        label: '수집기',
        nav: '수집기',
        tagline: '현장 데이터를 세그먼트로 기록',
      },
      modbus: {
        label: 'ModbusTCP',
        nav: 'ModbusTCP',
        tagline: '서버 · 클라이언트 장치와 태그',
      },
      twin: {
        label: '디지털 트윈',
        nav: '디지털 트윈',
        tagline: '3D 공장 · 협동 로봇 · 실시간 바인딩',
      },
      memory: {
        label: '메모리 맵',
        nav: '메모리 맵',
        tagline: 'PLC 레지스터 방식의 공유 메모리',
      },
      media: {
        label: '동영상 라이브러리',
        nav: '동영상',
        tagline: 'HLS 암호화 · 라이브 녹화 · 360° VR',
      },
      grids: {
        label: '그리드',
        nav: '그리드',
        tagline: '7가지 보기의 스프레드시트형 DB',
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
      maps: {
        label: '지도',
        nav: '지도',
        tagline: '레이어 · 피처 드로잉',
      },
      store: {
        label: '스토어',
        nav: '스토어',
        tagline: '위키 · 그리드 · 데이터셋 마켓플레이스',
      },
      graphs: {
        label: '그래프',
        nav: '그래프',
        tagline: '블루프린트식 비전 파이프라인',
      },
      registry: {
        label: '레지스트리',
        nav: '레지스트리',
        tagline: 'Docker · Helm · pip · npm',
      },
      apps: {
        label: '애플리케이션',
        nav: '애플리케이션',
        tagline: '브라우저 안의 CV · 개발 유틸리티',
      },
    },

    cta: {
      title: '오늘 첫 라벨을 그려 보십시오',
      description:
        '별도 설치나 영업 미팅이 필요하지 않습니다. 무료 플랜으로 시작하고, 팀 규모가 커지면 상위 플랜으로 업그레이드할 수 있습니다.',
      primary: '무료로 시작',
      secondary: '가격 보기',
      comingSoonNote: 'app.cvp.run은 정식 출시를 준비하고 있습니다.',
    },

    newsletter: {
      title: '뉴스레터',
      description: '제품 소식과 업데이트를 이메일로 전해 드립니다.',
      ctaLead: '뉴스레터를 구독하면 신규 기능 소식을 가장 먼저 전해 드립니다.',
      emailLabel: '이메일 주소',
      emailPlaceholder: 'you@example.com',
      subscribe: '구독하기',
      submitting: '전송 중…',
      success: '확인 메일을 발송했습니다. 받은편지함을 확인해 주십시오.',
      error: '요청에 실패했습니다. 잠시 후 다시 시도해 주십시오.',
      confirmTitle: '뉴스레터 구독 확정',
      confirmDescription: '아래 버튼을 누르면 뉴스레터 구독이 확정됩니다.',
      confirmAction: '구독 확정하기',
      confirmSuccessTitle: '구독이 완료되었습니다',
      confirmSuccessDescription:
        '앞으로 CVP의 제품 소식과 업데이트를 이메일로 받아 보실 수 있습니다.',
      unsubscribeTitle: '뉴스레터 수신거부',
      unsubscribeDescription:
        '아래 버튼을 누르면 더 이상 뉴스레터를 발송하지 않습니다.',
      unsubscribeAction: '수신거부하기',
      unsubscribeSuccessTitle: '수신거부가 완료되었습니다',
      unsubscribeSuccessDescription:
        '이후로는 뉴스레터가 발송되지 않습니다. 언제든지 다시 구독하실 수 있습니다.',
      working: '처리 중…',
      invalidTitle: '링크가 유효하지 않습니다',
      invalidDescription:
        '링크가 만료되었거나 이미 처리되었습니다. 필요한 경우 다시 구독을 신청해 주십시오.',
    },

    footer: {
      description:
        'CVP는 이미지·비디오·3D·시계열 데이터의 수집과 라벨링부터 모델 학습까지 하나로 연결하는 비전 데이터 플랫폼입니다.',
      labelingTitle: '라벨링',
      platformTitle: '플랫폼',
      resourcesTitle: '리소스',
      pricing: '가격',
      changelog: '변경 내역',
      security: '보안',
      roadmapNote:
        '현재 베타 서비스입니다. 기능과 가격은 정식 출시 전에 변경될 수 있습니다.',
      copyright: '© 2026 CVP. All rights reserved.',
    },

    notFound: {
      title: '페이지를 찾을 수 없습니다',
      description: '요청하신 페이지의 주소가 변경되었거나 페이지가 삭제되었습니다.',
      back: '홈으로 돌아가기',
      suggestions: '다음 페이지에서 찾으시는 내용을 확인할 수 있습니다.',
    },

    misc: {
      mockNote: '* 실제 앱 화면을 재현한 데모입니다.',
      dataNote:
        '데모에 사용된 사진·영상·포인트클라우드는 공개 데이터셋의 실제 데이터입니다 — Open Images(CC BY 2.0) · COCO(CC BY 4.0) · DAVIS 2017(CC BY 4.0) · Wikimedia Commons(CC0) · PandaSet(CC0)',
      betaBadge: '베타',
    },
  },

  en: {
    meta: {
      homeTitle: 'CVP — The workspace for vision data',
      homeDescription:
        'Collect, label, train, and run inference on images, video, 3D point clouds, and time series in one workspace. Start in the browser with nothing to install.',
    },

    nav: {
      primary: 'Main menu',
      labeling: 'Labeling',
      platform: 'Platform',
      more: 'More',
      pricing: 'Pricing',
      changelog: 'Changelog',
      security: 'Security',
      login: 'Sign in',
      getStarted: 'Start for free',
      comingSoon: 'Coming soon',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      skipToContent: 'Skip to content',
      language: 'Choose language',
      themeToLight: 'Switch to light mode',
      themeToDark: 'Switch to dark mode',
      groups: {
        edge: 'Edge & field',
        workspace: 'Workspace',
        build: 'Build',
      },
    },

    announcement: {
      label: 'New',
      text: 'Inference, a rebuilt MLOps, and ModbusTCP devices are here.',
      cta: 'See the changelog',
      dismiss: 'Dismiss announcement',
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
        tagline: 'Cuboids · segments · 3D auto-label',
      },
      timeSeries: {
        label: 'Time-series labeling',
        nav: 'Time series',
        tagline: 'Ranges and events on sensor signals',
      },
      datasets: {
        label: 'Dataset management',
        nav: 'Datasets',
        tagline: 'Upload wizard · sample list · QA stats',
      },
      training: {
        label: 'Training & AI labeling',
        nav: 'Training & AI',
        tagline: 'Training wizard · auto-label in the editor',
      },
      inference: {
        label: 'Inference',
        nav: 'Inference',
        tagline: 'Seven inference features · save results as labels',
      },
      mlops: {
        label: 'MLOps',
        nav: 'MLOps',
        tagline: 'Experiments · run compare · model aliases',
      },
      review: {
        label: 'Review & QA',
        nav: 'Review & QA',
        tagline: 'Label quality through pinned comments',
      },
      collaboration: {
        label: 'Team collaboration',
        nav: 'Collaboration',
        tagline: 'Wiki · files · members · activity',
      },
      developers: {
        label: 'Developers',
        nav: 'Developers',
        tagline: 'CLI · S3-compatible API · MLflow',
      },
      agents: {
        label: 'Agents',
        nav: 'Agents',
        tagline: 'Apps that run on your own machines',
      },
      collectors: {
        label: 'Collectors',
        nav: 'Collectors',
        tagline: 'Field data recorded as segments',
      },
      modbus: {
        label: 'ModbusTCP',
        nav: 'ModbusTCP',
        tagline: 'Server and client devices with tags',
      },
      twin: {
        label: 'Digital twin',
        nav: 'Digital twin',
        tagline: '3D plants · cobots · live bindings',
      },
      memory: {
        label: 'Memory maps',
        nav: 'Memory maps',
        tagline: 'Shared memory shaped like PLC registers',
      },
      media: {
        label: 'Video library',
        nav: 'Video library',
        tagline: 'Encrypted HLS · live recording · 360° VR',
      },
      grids: {
        label: 'Grids',
        nav: 'Grids',
        tagline: 'A spreadsheet database with 7 views',
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
      maps: {
        label: 'Maps',
        nav: 'Maps',
        tagline: 'Layers · feature drawing',
      },
      store: {
        label: 'Store',
        nav: 'Store',
        tagline: 'A marketplace for wikis, grids, and datasets',
      },
      graphs: {
        label: 'Graphs',
        nav: 'Graphs',
        tagline: 'Blueprint-style vision pipelines',
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
      resourcesTitle: 'Resources',
      pricing: 'Pricing',
      changelog: 'Changelog',
      security: 'Security',
      roadmapNote:
        'Beta — features and pricing may change before general availability.',
      copyright: '© 2026 CVP. All rights reserved.',
    },

    notFound: {
      title: 'Page not found',
      description: 'This page may have moved or been removed.',
      back: 'Back to home',
      suggestions: 'You may find what you were looking for here.',
    },

    misc: {
      mockNote: '* A demo recreated from the real app screen.',
      dataNote:
        'Photos, footage, and point clouds are real data from open datasets — Open Images (CC BY 2.0) · COCO (CC BY 4.0) · DAVIS 2017 (CC BY 4.0) · Wikimedia Commons (CC0) · PandaSet (CC0)',
      betaBadge: 'Beta',
    },
  },
} as const;
