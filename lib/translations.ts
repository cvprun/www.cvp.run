import type {Language} from './i18n';

export const translations = {
  ko: {
    // Navigation
    nav: {
      features: '기능',
      download: '다운로드',
      pricing: '가격',
      starOnGithub: 'GitHub 스타',
    },

    // Hero
    hero: {
      badge: 'PolyForm Noncommercial License 1.0.0',
      titleLine1: '오픈소스',
      titleLine2: 'Computer Vision Player',
      description:
        '시각 데이터를 처리, 분석, 시각화하는 강력하고 유연한 컴퓨터 비전 도구입니다.',
      installButton: 'pip로 설치',
      viewOnGithub: 'GitHub에서 보기',
      terminalComment1: '# CVP 설치',
      terminalComment2: '# CVP 애플리케이션 실행',
    },

    // Features (home page)
    featuresSection: {
      label: '기능',
      title: '컴퓨터 비전에 필요한 모든 것',
      description:
        'CVP는 기본적인 이미지 처리부터 고급 머신러닝 워크플로우까지, 컴퓨터 비전 작업을 위한 종합 도구 모음을 제공합니다.',
      items: [
        {
          title: '비주얼 프로세싱',
          description:
            '실시간 분석 기능을 갖춘 이미지 및 비디오 처리를 위한 고급 컴퓨터 비전 알고리즘.',
        },
        {
          title: '인터랙티브 플레이어',
          description:
            '프레임별 탐색, 주석 도구, 시각화 오버레이가 포함된 내장 미디어 플레이어.',
        },
        {
          title: '고성능',
          description:
            'GPU 가속, 멀티스레딩, 효율적인 메모리 관리로 속도에 최적화.',
        },
        {
          title: 'Python 네이티브',
          description:
            '익숙한 API를 갖춘 순수 Python 구현, NumPy, OpenCV, scikit-learn과의 원활한 통합.',
        },
        {
          title: '모듈식 설계',
          description:
            '개별 컴포넌트 또는 전체 처리 파이프라인을 사용할 수 있는 유연한 아키텍처.',
        },
        {
          title: '확장 가능',
          description:
            '기능을 확장하기 위한 커스텀 알고리즘, 필터, 처리 모듈용 플러그인 시스템.',
        },
      ],
    },

    // CTA
    cta: {
      title: '지금 무료로 시작하세요',
      description:
        '오픈소스 및 PolyForm Noncommercial License 1.0.0. 몇 분 만에 컴퓨터 비전 애플리케이션 구축을 시작하세요.',
      getStarted: '시작하기',
      readDocs: '문서 읽기',
    },

    // Footer
    footer: {
      description:
        'Computer Vision Player - 시각 데이터를 처리, 분석, 시각화하는 오픈소스 도구.',
      resources: '리소스',
      features: '기능',
      github: 'GitHub',
      license: '라이선스',
      community: '커뮤니티',
      issues: '이슈',
      discussions: '토론',
      contributing: '기여하기',
      legal: '법적 고지',
      privacyPolicy: '개인정보처리방침',
      termsOfService: '이용약관',
      copyright: '© 2025 CVP. PolyForm Noncommercial License 1.0.0.',
      sourceOnGithub: 'GitHub에서 소스 보기',
    },

    // Pricing
    pricing: {
      hero: {
        title: '간단하고 투명한 가격',
        description:
          '오픈소스 버전으로 무료로 시작하세요. 상업적 사용이 필요하신가요? Enterprise 라이선스를 받으세요.',
      },
      free: {
        name: 'Free',
        price: '$0',
        period: '/영구',
        description: '개인 및 비상업적 사용. GitHub에서 바로 시작하세요.',
        features: [
          '35개 이상의 모든 기능 포함',
          'Flow Mode로 비주얼 프로그래밍',
          'FFmpeg 비디오 플레이어',
          'ONVIF 카메라 지원',
          '컴퓨터 비전 알고리즘',
          '커뮤니티 지원',
          '정기 업데이트',
        ],
        button: 'GitHub에서 받기',
        license: 'PolyForm Noncommercial License 1.0.0 적용',
      },
      enterprise: {
        name: 'Enterprise',
        price: '맞춤형',
        badge: '상업적 사용',
        description: '전담 지원과 맞춤형 솔루션이 포함된 상업적 및 기업용.',
        features: [
          'Free의 모든 기능 포함',
          '상업적 사용 라이선스',
          '우선 지원',
          '맞춤형 통합',
          'SLA 보장',
          '전담 계정 관리자',
          '온프레미스 배포',
        ],
        button: '영업팀 문의',
        license: '맞춤형 상업 라이선스 계약',
      },
    },

    // Features page
    featuresPage: {
      title: '기능 - CVP Computer Vision Player',
      description:
        '비주얼 프로그래밍, FFmpeg 통합, 컴퓨터 비전 알고리즘, 네트워크 유틸리티, 종합 개발 도구를 포함한 CVP의 35개 이상의 전문 도구를 살펴보세요.',
    },

    // Download page
    download: {
      title: '다운로드 - CVP',
      description: 'CVP를 다운로드하고 설치하세요. pip, GitHub 또는 소스에서 설치할 수 있습니다.',
      hero: {
        title: 'CVP 다운로드',
        description: '몇 가지 간단한 단계로 CVP를 설치하고 컴퓨터 비전 프로젝트를 시작하세요.',
      },
      requirements: {
        title: '시스템 요구사항',
        items: [
          'Python 3.10 이상',
          'pip 패키지 매니저',
          'Windows, macOS 또는 Linux',
          '최소 4GB RAM (8GB 권장)',
        ],
      },
      methods: {
        pip: {
          title: 'pip로 설치 (권장)',
          description: '가장 쉽고 빠른 설치 방법입니다.',
          steps: ['터미널 또는 명령 프롬프트 열기', '다음 명령어 실행:'],
        },
        github: {
          title: 'GitHub에서 설치',
          description: '최신 개발 버전을 사용하려면 GitHub에서 직접 설치하세요.',
          steps: ['저장소 클론:', '디렉토리 이동 후 설치:'],
        },
      },
      quickStart: {
        title: '빠른 시작',
        description: '설치 후 다음 명령어로 CVP를 실행하세요:',
        commands: {
          player: 'CVP 플레이어 실행',
          help: '도움말 보기',
        },
      },
      cta: {
        viewDocs: '문서 보기',
        viewOnGithub: 'GitHub에서 보기',
      },
    },
  },

  en: {
    // Navigation
    nav: {
      features: 'Features',
      download: 'Download',
      pricing: 'Pricing',
      starOnGithub: 'Star on GitHub',
    },

    // Hero
    hero: {
      badge: 'PolyForm Noncommercial License 1.0.0',
      titleLine1: 'The open source',
      titleLine2: 'Computer Vision Player',
      description:
        'A powerful, flexible computer vision tool that helps you process, analyze, and visualize visual data—all in one place.',
      installButton: 'Install with pip',
      viewOnGithub: 'View on GitHub',
      terminalComment1: '# Install CVP',
      terminalComment2: '# Launch the CVP application',
    },

    // Features (home page)
    featuresSection: {
      label: 'FEATURES',
      title: 'Everything you need for computer vision',
      description:
        'CVP provides a comprehensive suite of tools for computer vision tasks, from basic image processing to advanced machine learning workflows.',
      items: [
        {
          title: 'Visual Processing',
          description:
            'Advanced computer vision algorithms for image and video processing with real-time analysis capabilities.',
        },
        {
          title: 'Interactive Player',
          description:
            'Built-in media player with frame-by-frame navigation, annotation tools, and visualization overlays.',
        },
        {
          title: 'High Performance',
          description:
            'Optimized for speed with GPU acceleration, multi-threading, and efficient memory management.',
        },
        {
          title: 'Python Native',
          description:
            'Pure Python implementation with familiar APIs, seamless integration with NumPy, OpenCV, and scikit-learn.',
        },
        {
          title: 'Modular Design',
          description:
            'Flexible architecture allowing you to use individual components or the complete processing pipeline.',
        },
        {
          title: 'Extensible',
          description:
            'Plugin system for custom algorithms, filters, and processing modules to extend functionality.',
        },
      ],
    },

    // CTA
    cta: {
      title: 'Get started for free today',
      description:
        'Open source and PolyForm Noncommercial License 1.0.0. Start building computer vision applications in minutes.',
      getStarted: 'Get Started',
      readDocs: 'Read Documentation',
    },

    // Footer
    footer: {
      description:
        'Computer Vision Player - An open source tool for processing, analyzing, and visualizing visual data.',
      resources: 'Resources',
      features: 'Features',
      github: 'GitHub',
      license: 'License',
      community: 'Community',
      issues: 'Issues',
      discussions: 'Discussions',
      contributing: 'Contributing',
      legal: 'Legal',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      copyright: '© 2025 CVP. PolyForm Noncommercial License 1.0.0.',
      sourceOnGithub: 'Source Available on GitHub',
    },

    // Pricing
    pricing: {
      hero: {
        title: 'Simple, transparent pricing',
        description:
          'Start free with our open source version. Need commercial use? Get an Enterprise license.',
      },
      free: {
        name: 'Free',
        price: '$0',
        period: '/forever',
        description:
          'For personal and non-commercial use. Get started instantly from GitHub.',
        features: [
          'All 35+ features included',
          'Visual programming with Flow Mode',
          'FFmpeg video player',
          'ONVIF camera support',
          'Computer vision algorithms',
          'Community support',
          'Regular updates',
        ],
        button: 'Get from GitHub',
        license: 'Licensed under PolyForm Noncommercial License 1.0.0',
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Custom',
        badge: 'Commercial Use',
        description:
          'For commercial and enterprise use with dedicated support and custom solutions.',
        features: [
          'Everything in Free',
          'Commercial use license',
          'Priority support',
          'Custom integrations',
          'SLA guarantees',
          'Dedicated account manager',
          'On-premise deployment',
        ],
        button: 'Contact Sales',
        license: 'Custom commercial license agreement',
      },
    },

    // Features page
    featuresPage: {
      title: 'Features - CVP Computer Vision Player',
      description:
        "Explore CVP's 35+ specialized tools including visual programming, FFmpeg integration, computer vision algorithms, network utilities, and comprehensive development tools.",
    },

    // Download page
    download: {
      title: 'Download - CVP',
      description: 'Download and install CVP. Available via pip, GitHub, or from source.',
      hero: {
        title: 'Download CVP',
        description: 'Install CVP in a few simple steps and start your computer vision projects.',
      },
      requirements: {
        title: 'System Requirements',
        items: [
          'Python 3.10 or higher',
          'pip package manager',
          'Windows, macOS, or Linux',
          'Minimum 4GB RAM (8GB recommended)',
        ],
      },
      methods: {
        pip: {
          title: 'Install with pip (Recommended)',
          description: 'The easiest and fastest way to install.',
          steps: ['Open your terminal or command prompt', 'Run the following command:'],
        },
        github: {
          title: 'Install from GitHub',
          description: 'Install directly from GitHub for the latest development version.',
          steps: ['Clone the repository:', 'Navigate to directory and install:'],
        },
      },
      quickStart: {
        title: 'Quick Start',
        description: 'After installation, run CVP with the following commands:',
        commands: {
          player: 'Launch CVP player',
          help: 'View help',
        },
      },
      cta: {
        viewDocs: 'View Documentation',
        viewOnGithub: 'View on GitHub',
      },
    },
  },
} as const;

export type Translations = (typeof translations)[Language];

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}
