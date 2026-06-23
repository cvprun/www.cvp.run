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
      cardCta: '자세히 보기',
      items: [
        {
          slug: 'visual-programming',
          title: '그래프 기반 비주얼 프로그래밍',
          description:
            'NumPy·OpenCV 블록을 드래그앤드롭으로 연결해 코드 없이 영상 처리 파이프라인을 설계합니다.',
          long: '노드 캔버스 위에서 NumPy·OpenCV 연산 블록을 끌어다 연결하기만 하면 영상 처리 파이프라인이 완성됩니다. 각 노드의 출력은 다음 노드로 흐르며, 중간 결과를 실시간으로 미리 보면서 파라미터를 조정할 수 있습니다. 완성한 그래프는 그대로 저장하고 재사용하거나 에이전트로 배포할 수 있습니다.',
          points: [
            '드래그앤드롭 노드 에디터와 실시간 미리보기',
            'NumPy·OpenCV 연산 블록 기본 제공',
            '서브그래프로 파이프라인 모듈화',
            '저장한 그래프를 에이전트로 배포',
          ],
        },
        {
          slug: 'realtime-streaming',
          title: '실시간 스트리밍 처리',
          description:
            'WebRTC·RTSP 라이브 스트림을 브라우저에서 바로 받아 분석하고 결과를 오버레이로 시각화합니다.',
          long: 'WebRTC와 RTSP 라이브 스트림을 브라우저에서 직접 받아 지연을 최소화하며 분석합니다. 추론 결과는 영상 위 오버레이로 즉시 표시되고, 이벤트가 감지되면 알림과 인시던트로 기록됩니다. 여러 스트림을 동시에 모니터링할 수 있습니다.',
          points: [
            'WebRTC·RTSP 라이브 입력',
            '프레임 단위 추론 결과 오버레이',
            '이벤트 기반 알림·인시던트',
            '다중 스트림 동시 모니터링',
          ],
        },
        {
          slug: 'vision-toolkit',
          title: '30종 이상의 비전 툴킷',
          description:
            '카메라 보정, 왜곡 보정, 엣지·블롭 검출, 바코드 인식, 히스토그램, 3D 모델링까지 전문 도구를 기본 제공합니다.',
          long: '카메라 보정부터 왜곡 보정, 엣지·블롭 검출, 바코드 인식, 히스토그램 분석, 3D 모델링까지 자주 쓰는 컴퓨터 비전 도구를 설치 없이 바로 사용할 수 있습니다. 각 도구는 단독으로도, 그래프 파이프라인의 노드로도 동작합니다.',
          points: [
            '30종 이상의 전문 분석·검사 도구',
            '카메라 보정·왜곡 보정',
            '엣지·블롭·바코드·히스토그램',
            '단독 실행 또는 그래프 노드로 사용',
          ],
        },
        {
          slug: 'vms-cctv',
          title: 'VMS · CCTV 통합',
          description:
            'ONVIF 카메라 카탈로그, 라이브 뷰, 재생, PTZ 제어, 녹화 정책과 이벤트·인시던트 관리를 지원합니다.',
          long: 'ONVIF 표준 카메라를 자동으로 검색해 카탈로그로 관리하고, 라이브 뷰·재생·PTZ 제어를 한 화면에서 수행합니다. 녹화 정책 구성과 이벤트·인시던트 관리로 영상 관제 워크플로우를 완성합니다.',
          points: [
            'ONVIF 카메라 자동 검색·카탈로그',
            '라이브 뷰·재생·PTZ 제어',
            '녹화 정책 구성',
            '이벤트·인시던트 관리',
          ],
        },
        {
          slug: 'datasets-mlops',
          title: '데이터셋 & MLOps',
          description:
            '라벨링과 분류, 실험 추적, MLflow 기반 모델 관리, 배포까지 이어지는 ML 파이프라인을 제공합니다.',
          long: '수집한 데이터를 라벨링하고 분류해 데이터셋을 구성하고, 실험을 추적하며 MLflow로 모델을 등록·버전 관리합니다. 학습부터 배포까지 이어지는 MLOps 파이프라인을 플랫폼 안에서 완결합니다.',
          points: [
            '데이터 수집·라벨링·분류',
            '실험 추적과 메트릭 비교',
            'MLflow 모델 레지스트리',
            '학습 → 배포 파이프라인',
          ],
        },
        {
          slug: 'extensible',
          title: '확장과 연동',
          description:
            '플러그인 아키텍처, Webhook, HTTP 클라이언트, 컨테이너 관리로 기존 시스템과 자연스럽게 연결됩니다.',
          long: '플러그인 아키텍처로 기능을 확장하고, Webhook과 HTTP 클라이언트, 컨테이너 관리로 기존 시스템과 연결합니다. 액세스 토큰과 에이전트를 통해 외부 장비·서비스를 안전하게 통합할 수 있습니다.',
          points: [
            '플러그인 아키텍처',
            'Webhook·HTTP 연동',
            '컨테이너·에이전트 관리',
            '액세스 토큰 기반 보안',
          ],
        },
      ],
    },

    modules: {
      label: '플랫폼 모듈',
      title: '하나의 플랫폼, 여러 개의 작업 공간',
      description:
        'CVP는 목적에 맞는 모듈을 한 화면에서 오가며 사용할 수 있도록 설계되었습니다.',
      cardCta: '자세히 보기',
      items: [
        {
          slug: 'vision',
          name: 'Vision',
          description: '30종 이상의 영상 분석·검사 도구',
          long: '30종 이상의 영상 분석·검사 도구를 모은 작업 공간입니다. 보정·측정·검출·변환 도구를 골라 바로 실행하거나 그래프에 연결해 자동화합니다.',
          points: [
            '30+ 분석·검사 도구',
            '이미지·영상 입력 지원',
            '결과 시각화·내보내기',
            '그래프 노드로 재사용',
          ],
        },
        {
          slug: 'vms',
          name: 'VMS',
          description: 'CCTV·ONVIF 통합 영상 관제',
          long: 'CCTV와 ONVIF 카메라를 통합 관제하는 영상 관리 시스템입니다. 카메라 카탈로그, 멀티 채널 라이브 뷰, 재생, PTZ, 이벤트 관리를 제공합니다.',
          points: [
            '카메라 카탈로그',
            '멀티 채널 라이브 뷰',
            'PTZ 제어·프리셋',
            '이벤트·인시던트 타임라인',
          ],
        },
        {
          slug: 'manufacturing',
          name: 'Manufacturing',
          description: '작업지시·추적성·설비 모니터링(MES)',
          long: '작업 지시, 추적성, 설비 모니터링을 담당하는 제조 실행(MES) 모듈입니다. 비전 검사 결과를 생산 데이터와 연결해 품질을 관리합니다.',
          points: [
            '작업 지시·스케줄링',
            '추적성(Traceability)',
            '설비 상태 모니터링',
            '검사 결과 연동',
          ],
        },
        {
          slug: 'datasets',
          name: 'Datasets',
          description: '데이터 수집·라벨링·분류',
          long: '수집한 이미지와 영상을 라벨링하고 클래스별로 분류해 학습용 데이터셋을 구성합니다. 버전과 분할을 관리하며 학습 파이프라인으로 연결합니다.',
          points: [
            '라벨링·어노테이션',
            '클래스·태그 관리',
            '버전·분할 관리',
            '학습 파이프라인 연동',
          ],
        },
        {
          slug: 'graphs',
          name: 'Graphs',
          description: '노드 기반 파이프라인 에디터',
          long: '노드 기반 파이프라인 에디터로 영상 처리·분석 흐름을 시각적으로 설계합니다. 실시간 미리보기로 결과를 확인하고 에이전트로 배포합니다.',
          points: [
            '노드 캔버스 에디터',
            '실시간 미리보기',
            '서브그래프 모듈화',
            '에이전트 배포',
          ],
        },
        {
          slug: 'mlflow',
          name: 'MLflow',
          description: '실험 추적·모델·배포 관리',
          long: '실험을 추적하고 모델을 등록·버전 관리하며 배포 상태를 모니터링합니다. 메트릭을 시각화해 최적의 모델을 선택합니다.',
          points: [
            '실험 추적·비교',
            '모델 레지스트리',
            '메트릭 시각화',
            '배포 관리',
          ],
        },
        {
          slug: 'agents',
          name: 'Agents',
          description: '원격 장비·엣지 노드 제어',
          long: '원격 장비와 엣지 노드에 설치되어 그래프를 실행하고 스트림을 처리하는 에이전트를 관리합니다. 상태와 버전을 모니터링하고 원격으로 작업을 배포합니다.',
          points: [
            '엣지 노드 등록·상태',
            '원격 그래프 실행',
            '하트비트 모니터링',
            '버전·업데이트 관리',
          ],
        },
        {
          slug: 'apps',
          name: 'Apps',
          description: '바코드·색상 변환 등 유틸리티',
          long: '바코드, 색상 변환, JWT 뷰어, 해시 등 자주 쓰는 유틸리티 앱을 한곳에서 실행합니다. 즐겨찾기와 고정으로 자주 쓰는 도구를 빠르게 엽니다.',
          points: [
            '유틸리티 앱 런처',
            '바코드·색상·해시 도구',
            '개발자 도구 모음',
            '즐겨찾기·고정',
          ],
        },
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
        '어플리케이션',
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

    detail: {
      back: '홈으로 돌아가기',
      featureKicker: '핵심 기능',
      moduleKicker: '플랫폼 모듈',
      highlights: '주요 기능',
      previewTitle: '앱 미리보기',
      otherFeatures: '다른 기능',
      otherModules: '다른 모듈',
      notFoundTitle: '페이지를 찾을 수 없습니다',
      notFoundDesc: '요청하신 기능 또는 모듈을 찾을 수 없습니다.',
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
      cardCta: 'Learn more',
      items: [
        {
          slug: 'visual-programming',
          title: 'Graph-based visual programming',
          description:
            'Wire NumPy and OpenCV blocks together with drag-and-drop to design image processing pipelines without writing code.',
          long: 'Drag NumPy and OpenCV operation blocks onto a node canvas and connect them — that is your image processing pipeline. Each node feeds the next, and you can preview intermediate results in real time while tuning parameters. Save a finished graph to reuse it or deploy it to an agent.',
          points: [
            'Drag-and-drop node editor with live preview',
            'Built-in NumPy & OpenCV operation blocks',
            'Modularize pipelines with subgraphs',
            'Deploy saved graphs to agents',
          ],
        },
        {
          slug: 'realtime-streaming',
          title: 'Real-time streaming',
          description:
            'Pull WebRTC and RTSP live streams straight into the browser, analyze them, and visualize results as overlays.',
          long: 'Pull WebRTC and RTSP live streams straight into the browser and analyze them with minimal latency. Inference results render instantly as overlays on the video, and detected events are recorded as notifications and incidents. Monitor multiple streams at once.',
          points: [
            'WebRTC & RTSP live input',
            'Per-frame inference overlays',
            'Event-driven alerts & incidents',
            'Multi-stream monitoring',
          ],
        },
        {
          slug: 'vision-toolkit',
          title: '30+ vision toolkit',
          description:
            'Camera calibration, undistortion, edge and blob detection, barcode reading, histograms, and 3D modeling — built in.',
          long: 'Camera calibration, undistortion, edge and blob detection, barcode reading, histogram analysis, 3D modeling — the computer vision tools you reach for most, ready to use with zero install. Each tool runs standalone or as a node inside a graph pipeline.',
          points: [
            '30+ specialized analysis & inspection tools',
            'Camera calibration & undistortion',
            'Edge, blob, barcode & histogram',
            'Run standalone or as graph nodes',
          ],
        },
        {
          slug: 'vms-cctv',
          title: 'VMS & CCTV integration',
          description:
            'ONVIF camera catalog, live view, playback, PTZ control, recording policies, and event & incident management.',
          long: 'Auto-discover ONVIF cameras into a managed catalog and run live view, playback, and PTZ control from one screen. Recording policies and event & incident management complete the video monitoring workflow.',
          points: [
            'ONVIF auto-discovery & catalog',
            'Live view, playback & PTZ control',
            'Recording policy configuration',
            'Event & incident management',
          ],
        },
        {
          slug: 'datasets-mlops',
          title: 'Datasets & MLOps',
          description:
            'A full ML pipeline spanning labeling, classification, experiment tracking, MLflow model management, and deployment.',
          long: 'Label and classify captured data into datasets, track experiments, and register and version models with MLflow. The whole MLOps pipeline — from training to deployment — lives inside the platform.',
          points: [
            'Data capture, labeling & classification',
            'Experiment tracking & metric comparison',
            'MLflow model registry',
            'Training → deployment pipeline',
          ],
        },
        {
          slug: 'extensible',
          title: 'Extensible & integrated',
          description:
            'Plugin architecture, webhooks, an HTTP client, and container management connect CVP to your existing systems.',
          long: 'Extend functionality through a plugin architecture, and connect to existing systems with webhooks, an HTTP client, and container management. Access tokens and agents let you integrate external devices and services securely.',
          points: [
            'Plugin architecture',
            'Webhook & HTTP integration',
            'Container & agent management',
            'Access-token-based security',
          ],
        },
      ],
    },

    modules: {
      label: 'Platform modules',
      title: 'One platform, many workspaces',
      description:
        'CVP is designed so you can move between purpose-built modules from a single screen.',
      cardCta: 'Learn more',
      items: [
        {
          slug: 'vision',
          name: 'Vision',
          description: '30+ image analysis & inspection tools',
          long: 'A workspace gathering 30+ image analysis and inspection tools. Pick a calibration, measurement, detection, or transform tool and run it instantly, or wire it into a graph to automate.',
          points: [
            '30+ analysis & inspection tools',
            'Image & video input',
            'Result visualization & export',
            'Reusable as graph nodes',
          ],
        },
        {
          slug: 'vms',
          name: 'VMS',
          description: 'Unified CCTV & ONVIF video monitoring',
          long: 'A video management system that unifies CCTV and ONVIF cameras. It provides a camera catalog, multi-channel live view, playback, PTZ, and event management.',
          points: [
            'Camera catalog',
            'Multi-channel live view',
            'PTZ control & presets',
            'Event & incident timeline',
          ],
        },
        {
          slug: 'manufacturing',
          name: 'Manufacturing',
          description: 'Work orders, traceability & equipment (MES)',
          long: 'A manufacturing execution (MES) module for work orders, traceability, and equipment monitoring. It links vision inspection results to production data for quality control.',
          points: [
            'Work orders & scheduling',
            'Traceability',
            'Equipment monitoring',
            'Inspection-result linkage',
          ],
        },
        {
          slug: 'datasets',
          name: 'Datasets',
          description: 'Data capture, labeling & classification',
          long: 'Label captured images and video and classify them into training datasets. Manage versions and splits and connect them to training pipelines.',
          points: [
            'Labeling & annotation',
            'Class & tag management',
            'Version & split management',
            'Training pipeline integration',
          ],
        },
        {
          slug: 'graphs',
          name: 'Graphs',
          description: 'Node-based pipeline editor',
          long: 'Design image processing and analysis flows visually with a node-based pipeline editor. Verify results with live preview and deploy to agents.',
          points: [
            'Node canvas editor',
            'Live preview',
            'Subgraph modularization',
            'Agent deployment',
          ],
        },
        {
          slug: 'mlflow',
          name: 'MLflow',
          description: 'Experiment, model & deployment tracking',
          long: 'Track experiments, register and version models, and monitor deployment status. Visualize metrics to pick the best model.',
          points: [
            'Experiment tracking & comparison',
            'Model registry',
            'Metric visualization',
            'Deployment management',
          ],
        },
        {
          slug: 'agents',
          name: 'Agents',
          description: 'Remote device & edge-node control',
          long: 'Manage agents installed on remote devices and edge nodes that run graphs and process streams. Monitor status and versions and deploy work remotely.',
          points: [
            'Edge node registration & status',
            'Remote graph execution',
            'Heartbeat monitoring',
            'Version & update management',
          ],
        },
        {
          slug: 'apps',
          name: 'Apps',
          description: 'Utilities like barcode & color tools',
          long: 'Run handy utility apps — barcode, color converter, JWT viewer, hashing, and more — from one place. Pin and favorite the tools you use most for quick access.',
          points: [
            'Utility app launcher',
            'Barcode, color & hash tools',
            'Developer tool collection',
            'Favorites & pinning',
          ],
        },
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
        'Applications',
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

    detail: {
      back: 'Back to home',
      featureKicker: 'Core feature',
      moduleKicker: 'Platform module',
      highlights: 'Highlights',
      previewTitle: 'App preview',
      otherFeatures: 'Other features',
      otherModules: 'Other modules',
      notFoundTitle: 'Page not found',
      notFoundDesc: 'We could not find the feature or module you requested.',
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
