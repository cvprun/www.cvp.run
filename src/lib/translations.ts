export type Language = 'ko' | 'en';

export const translations = {
  ko: {
    nav: {
      features: '기능',
      modules: '모듈',
      preview: '미리보기',
      status: '개발 중',
    },

    hero: {
      badge: '웹 기반 컴퓨터 비전 · ML 플랫폼',
      titleLine1: '그래프로 잇고,',
      titleLine2: '실시간으로 본다',
      description:
        'CVP(Computer Vision Player)는 그래프 기반 비주얼 프로그래밍부터 실시간 영상 분석, 영상 관제(VMS), MLOps까지 하나로 묶은 웹 기반 컴퓨터 비전 플랫폼입니다. 설치 없이 브라우저에서 바로 시작하세요.',
      primaryCta: '개발 중',
      primaryCtaNote: '곧 브라우저에서 직접 만나보실 수 있습니다',
      secondaryCta: '기능 살펴보기',
      stat1Value: '30+',
      stat1Label: '비전 분석 도구',
      stat2Value: '실시간',
      stat2Label: 'WebRTC · RTSP 스트리밍',
      stat3Value: '제로 설치',
      stat3Label: '브라우저에서 바로 실행',
    },

    features: {
      label: '핵심 기능',
      title: '컴퓨터 비전에 필요한 모든 것, 한곳에서',
      description:
        '데이터 수집과 라벨링부터 파이프라인 구성, 실시간 추론, 관제와 배포까지 — CVP는 전체 비전 워크플로우를 하나의 플랫폼으로 묶습니다.',
      items: [
        {
          title: '그래프 기반 비주얼 프로그래밍',
          description:
            'NumPy·OpenCV 블록을 드래그앤드롭으로 연결해 코드 없이 영상 처리 파이프라인을 설계합니다.',
        },
        {
          title: '실시간 스트리밍 처리',
          description:
            'WebRTC·RTSP 라이브 스트림을 브라우저에서 바로 받아 분석하고 결과를 오버레이로 시각화합니다.',
        },
        {
          title: '30종 이상의 비전 툴킷',
          description:
            '카메라 보정, 왜곡 보정, 엣지·블롭 검출, 바코드 인식, 히스토그램, 3D 모델링까지 전문 도구를 기본 제공합니다.',
        },
        {
          title: 'VMS · CCTV 통합',
          description:
            'ONVIF 카메라 카탈로그, 라이브 뷰, 재생, PTZ 제어, 녹화 정책과 이벤트·인시던트 관리를 지원합니다.',
        },
        {
          title: '데이터셋 & MLOps',
          description:
            '라벨링과 분류, 실험 추적, MLflow 기반 모델 관리, 배포까지 이어지는 ML 파이프라인을 제공합니다.',
        },
        {
          title: '확장과 연동',
          description:
            '플러그인 아키텍처, Webhook, HTTP 클라이언트, 컨테이너 관리로 기존 시스템과 자연스럽게 연결됩니다.',
        },
      ],
    },

    modules: {
      label: '플랫폼 모듈',
      title: '하나의 플랫폼, 여러 개의 작업 공간',
      description:
        'CVP는 목적에 맞는 모듈을 한 화면에서 오가며 사용할 수 있도록 설계되었습니다.',
      items: [
        {name: 'Vision', description: '30종 이상의 영상 분석·검사 도구'},
        {name: 'VMS', description: 'CCTV·ONVIF 통합 영상 관제'},
        {name: 'Manufacturing', description: '작업지시·추적성·설비 모니터링(MES)'},
        {name: 'Datasets', description: '데이터 수집·라벨링·분류'},
        {name: 'Graphs', description: '노드 기반 파이프라인 에디터'},
        {name: 'MLflow', description: '실험 추적·모델·배포 관리'},
        {name: 'Agents', description: '원격 장비·엣지 노드 제어'},
        {name: 'Apps', description: '바코드·색상 변환 등 유틸리티'},
      ],
    },

    showcase: {
      label: '미리보기',
      title: '코드로 다시 만든 실제 CVP 화면',
      description:
        '스크린샷이 아니라 실제 컴포넌트로 구성한 목업입니다. 좌측 사이드바와 위젯 기반 대시보드로 CVP의 작업 화면을 미리 살펴보세요.',
      windowStatus: '개발 중',
      projectName: 'Demo Project',
      plan: 'Free',
      navGroup: '대시보드',
      nav: [
        '대시보드',
        '활동',
        '에이전트',
        '데이터셋',
        '그래프',
        '관제',
        '제조',
        'MLflow',
        '멤버',
        '설정',
      ],
      breadcrumbHome: '홈',
      dashTitle: '대시보드',
      dashDescription: '프로젝트의 핵심 지표와 최근 활동을 한눈에 확인하세요.',
      edit: '편집',
      preset: '기본 레이아웃',
      statAgents: '에이전트',
      statFiles: '파일',
      statDatasets: '데이터셋',
      deltaWeek: '이번 주',
      recentAgents: '최근 에이전트',
      recentFiles: '최근 파일',
      statusOnline: '온라인',
      statusIdle: '대기',
      statusOffline: '오프라인',
      collapse: '사이드바 접기',
      userName: 'Jane Doe',
      userEmail: 'jane@cvp.run',
      mockNote: '* 모든 데이터는 예시이며 실제 기능은 동작하지 않습니다.',
    },

    cta: {
      badge: '개발 중',
      title: 'CVP는 현재 개발 중입니다',
      description:
        '정식 출시를 준비하고 있습니다. 머지않아 브라우저에서 CVP를 직접 사용하실 수 있습니다.',
      button: '개발 중',
      buttonNote: '출시 준비 중',
    },

    footer: {
      description:
        'Computer Vision Player — 그래프 기반 비주얼 프로그래밍, 실시간 영상 분석, VMS, MLOps를 통합한 웹 기반 컴퓨터 비전 플랫폼.',
      productTitle: '제품',
      features: '기능',
      modules: '모듈',
      preview: '미리보기',
      statusTitle: '상태',
      inDevelopment: '개발 중',
      copyright: '© 2026 CVP. All rights reserved.',
    },
  },

  en: {
    nav: {
      features: 'Features',
      modules: 'Modules',
      preview: 'Preview',
      status: 'In development',
    },

    hero: {
      badge: 'Web-based computer vision · ML platform',
      titleLine1: 'Connect with graphs,',
      titleLine2: 'see in real time',
      description:
        'CVP (Computer Vision Player) brings graph-based visual programming, real-time video analysis, video management (VMS), and MLOps into a single web-based computer vision platform. No install — start right in your browser.',
      primaryCta: 'In development',
      primaryCtaNote: 'Coming soon, right in your browser',
      secondaryCta: 'Explore features',
      stat1Value: '30+',
      stat1Label: 'vision analysis tools',
      stat2Value: 'Real-time',
      stat2Label: 'WebRTC · RTSP streaming',
      stat3Value: 'Zero install',
      stat3Label: 'runs in the browser',
    },

    features: {
      label: 'Core features',
      title: 'Everything you need for computer vision, in one place',
      description:
        'From data capture and labeling to pipeline design, real-time inference, monitoring, and deployment — CVP unifies the entire vision workflow into a single platform.',
      items: [
        {
          title: 'Graph-based visual programming',
          description:
            'Wire NumPy and OpenCV blocks together with drag-and-drop to design image processing pipelines without writing code.',
        },
        {
          title: 'Real-time streaming',
          description:
            'Pull WebRTC and RTSP live streams straight into the browser, analyze them, and visualize results as overlays.',
        },
        {
          title: '30+ vision toolkit',
          description:
            'Camera calibration, undistortion, edge and blob detection, barcode reading, histograms, and 3D modeling — built in.',
        },
        {
          title: 'VMS & CCTV integration',
          description:
            'ONVIF camera catalog, live view, playback, PTZ control, recording policies, and event & incident management.',
        },
        {
          title: 'Datasets & MLOps',
          description:
            'A full ML pipeline spanning labeling, classification, experiment tracking, MLflow model management, and deployment.',
        },
        {
          title: 'Extensible & integrated',
          description:
            'Plugin architecture, webhooks, an HTTP client, and container management connect CVP to your existing systems.',
        },
      ],
    },

    modules: {
      label: 'Platform modules',
      title: 'One platform, many workspaces',
      description:
        'CVP is designed so you can move between purpose-built modules from a single screen.',
      items: [
        {name: 'Vision', description: '30+ image analysis & inspection tools'},
        {name: 'VMS', description: 'Unified CCTV & ONVIF video monitoring'},
        {name: 'Manufacturing', description: 'Work orders, traceability & equipment (MES)'},
        {name: 'Datasets', description: 'Data capture, labeling & classification'},
        {name: 'Graphs', description: 'Node-based pipeline editor'},
        {name: 'MLflow', description: 'Experiment, model & deployment tracking'},
        {name: 'Agents', description: 'Remote device & edge-node control'},
        {name: 'Apps', description: 'Utilities like barcode & color tools'},
      ],
    },

    showcase: {
      label: 'Preview',
      title: 'The real CVP screen, rebuilt in code',
      description:
        'Not a screenshot — a mockup built from real components. Preview the CVP workspace with its left sidebar and widget-based dashboard.',
      windowStatus: 'In development',
      projectName: 'Demo Project',
      plan: 'Free',
      navGroup: 'Dashboard',
      nav: [
        'Dashboard',
        'Activity',
        'Agents',
        'Datasets',
        'Graphs',
        'Surveillance',
        'Manufacturing',
        'MLflow',
        'Members',
        'Settings',
      ],
      breadcrumbHome: 'Home',
      dashTitle: 'Dashboard',
      dashDescription:
        "See your project's key metrics and recent activity at a glance.",
      edit: 'Edit',
      preset: 'Default layout',
      statAgents: 'Agents',
      statFiles: 'Files',
      statDatasets: 'Datasets',
      deltaWeek: 'this week',
      recentAgents: 'Recent Agents',
      recentFiles: 'Recent Files',
      statusOnline: 'Online',
      statusIdle: 'Idle',
      statusOffline: 'Offline',
      collapse: 'Collapse sidebar',
      userName: 'Jane Doe',
      userEmail: 'jane@cvp.run',
      mockNote: '* All data is illustrative; no functionality is wired up.',
    },

    cta: {
      badge: 'In development',
      title: 'CVP is currently in development',
      description:
        "We're getting ready for launch. Soon you'll be able to use CVP directly in your browser.",
      button: 'In development',
      buttonNote: 'Preparing for launch',
    },

    footer: {
      description:
        'Computer Vision Player — a web-based computer vision platform unifying graph-based visual programming, real-time video analysis, VMS, and MLOps.',
      productTitle: 'Product',
      features: 'Features',
      modules: 'Modules',
      preview: 'Preview',
      statusTitle: 'Status',
      inDevelopment: 'In development',
      copyright: '© 2026 CVP. All rights reserved.',
    },
  },
} as const;

export type Translations = (typeof translations)[Language];

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}
