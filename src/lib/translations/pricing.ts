/** Pricing page copy. Numbers live in `lib/pricing.ts`. */
export const pricing = {
  ko: {
    pricingPage: {
      title: '팀이 커지는 만큼만 내는 가격.',
      description:
        '무료로 시작해 필요할 때 업그레이드하세요. 모든 유료 플랜은 월 단위이며 언제든 해지할 수 있습니다.',
      betaNote:
        '베타 가격 — 정식 출시 시 변경될 수 있으며, 기존 구독자는 가격이 유지됩니다.',
      perMonth: '/월',
      freePrice: '무료',
      contactPrice: '문의',
      currentCta: '무료로 시작',
      paidCta: '시작하기',
      contactCta: '문의하기',
      mostPopular: '가장 인기',
      unlimited: '무제한',
      included: '포함',
      notIncluded: '—',

      planNames: {
        free: 'Free',
        starter: 'Starter',
        pro: 'Pro',
        enterprise: 'Enterprise',
      },
      planTaglines: {
        free: '개인 프로젝트와 평가용',
        starter: '소규모 팀의 첫 라벨링 프로젝트',
        pro: '여러 프로젝트를 운영하는 팀',
        enterprise: '보안·규모 요구가 있는 조직',
      },

      browserOnly: '브라우저 실행만',
      rows: {
        members: '멤버',
        storage: '스토리지',
        apiCalls: 'API 호출 / 월',
        agentTraffic: '에이전트 통신량 / 월',
        graphNodeRuns: '그래프 노드 실행 / 월',
        mlflowExperiments: 'MLOps 실험',
        twinScenes: '디지털 트윈 씬',
        wikiPages: '위키 페이지',
        gridRows: '그리드 행 (그리드당)',
        memoryMaps: '메모리 맵',
        mapFeatures: '지도 피처',
        licenseKeys: '제품키',
        labeling: '이미지 · 비디오 · 3D · 시계열 라벨링',
        aiLabeling: '에이전트 AI 라벨링 · 학습 (토큰 없음)',
        agents: '에이전트 · 에이전트 앱',
        review: '리뷰 & 이슈 스레드',
        wiki: '위키 · 파일 · 동영상 · 그리드',
        tokens: 'CLI · 액세스 토큰(MLflow · 레지스트리)',
        videoEncryption: '동영상 암호화 (AES-128)',
        prioritySupport: '우선 지원',
        auditLogs: '감사 로그',
        customS3: '커스텀 S3 스토리지',
        sso: 'SSO',
      },

      tokensTitle: '쓴 만큼만, 토큰으로.',
      tokensDescription:
        '플랜 한도를 넘는 사용과 클라우드 AI 기능은 프로젝트 토큰으로 정산합니다. 1 토큰은 1센트이며, 지출 한도를 켜면 과금 대신 멈춥니다. 내 에이전트에서 도는 AI 라벨링과 학습은 토큰을 쓰지 않습니다.',
      tokensUnit: (n: string) => `${n} 토큰`,
      tokenUses: [
        ['에이전트 통신량 초과', '100 MB 당 1 토큰'],
        ['그래프 노드 실행 초과', '1,000회 당 1 토큰'],
        ['매직 완드 (클라우드 SAM)', '클릭 1회 당 1 토큰 — SAM2 에이전트를 쓰면 무료'],
        ['회의 전사 · 요약', '녹음 1 MiB 당 1 토큰(최소 2) + 요약 1 토큰'],
        ['스토어 콘텐츠', '아이템에 매겨진 가격만큼'],
      ],

      usageTitle: '한도와 사용량은 한 화면에서.',
      usageDescription:
        '프로젝트 사용량 페이지가 할당량, 월간 종량 사용, 이번 달 과금과 크레딧 잔액을 함께 보여줍니다. 한도의 70%를 넘으면 미리 알려 드립니다.',

      faqTitle: '자주 묻는 질문',
      faq: [
        {
          q: '무료 플랜에 카드 등록이 필요한가요?',
          a: '아니요. 이메일 가입만으로 시작하며, 업그레이드 전까지 결제 정보를 요구하지 않습니다.',
        },
        {
          q: '라벨과 데이터는 언제든 가져갈 수 있나요?',
          a: '네. 라벨은 표준 포맷(COCO·YOLO·Labeled PLY·SemanticKITTI·CSV 등)으로 내보낼 수 있고, 파일은 원본 그대로 다운로드할 수 있습니다. 락인 없이 떠날 수 있는 것이 원칙입니다.',
        },
        {
          q: '플랜을 올리거나 내리면 어떻게 되나요?',
          a: '즉시 반영되며 남은 기간은 일할 계산(비례 배분)됩니다. 다운그레이드로 한도를 초과하게 되면 기존 데이터는 유지되고 새 생성만 제한됩니다.',
        },
        {
          q: '환불 정책은 어떻게 되나요?',
          a: '결제 후 14일 이내 미사용에 준하는 경우 전액 환불합니다. 문의 채널로 연락 주세요.',
        },
        {
          q: '베타 가격이 오르면 기존 구독도 오르나요?',
          a: '아니요. 베타 기간에 구독한 가격은 계정에 그대로 유지됩니다.',
        },
        {
          q: '온프레미스/설치형이 필요합니다.',
          a: 'Enterprise 문의로 연락 주세요. 제품키(Ed25519 오프라인 검증) 기반의 설치형 연동을 지원합니다.',
        },
      ],
    },
  },

  en: {
    pricingPage: {
      title: 'Pricing that grows only as your team does.',
      description:
        'Start free and upgrade when you need to. Paid plans are monthly and cancellable anytime.',
      betaNote:
        'Beta pricing — subject to change at GA; existing subscribers keep their price.',
      perMonth: '/mo',
      freePrice: 'Free',
      contactPrice: 'Contact',
      currentCta: 'Start for free',
      paidCta: 'Get started',
      contactCta: 'Contact us',
      mostPopular: 'Most popular',
      unlimited: 'Unlimited',
      included: 'Included',
      notIncluded: '—',

      planNames: {
        free: 'Free',
        starter: 'Starter',
        pro: 'Pro',
        enterprise: 'Enterprise',
      },
      planTaglines: {
        free: 'Personal projects and evaluation',
        starter: 'A small team’s first labeling project',
        pro: 'Teams running multiple projects',
        enterprise: 'Organizations with security and scale needs',
      },

      browserOnly: 'In-browser only',
      rows: {
        members: 'Members',
        storage: 'Storage',
        apiCalls: 'API calls / month',
        agentTraffic: 'Agent traffic / month',
        graphNodeRuns: 'Graph node runs / month',
        mlflowExperiments: 'MLOps experiments',
        twinScenes: 'Digital twin scenes',
        wikiPages: 'Wiki pages',
        gridRows: 'Grid rows (per grid)',
        memoryMaps: 'Memory maps',
        mapFeatures: 'Map features',
        licenseKeys: 'Product keys',
        labeling: 'Image · video · 3D · time-series labeling',
        aiLabeling: 'Agent AI labeling & training (no tokens)',
        agents: 'Agents & agent apps',
        review: 'Review & issue threads',
        wiki: 'Wiki · files · video · grids',
        tokens: 'CLI · access tokens (MLflow, registries)',
        videoEncryption: 'Video encryption (AES-128)',
        prioritySupport: 'Priority support',
        auditLogs: 'Audit logs',
        customS3: 'Custom S3 storage',
        sso: 'SSO',
      },

      tokensTitle: 'Pay for what you use, in tokens.',
      tokensDescription:
        'Usage beyond your plan and cloud AI features settle in project tokens. One token is one cent, and a spend cap stops usage instead of charging. AI labeling and training on your own agents never use tokens.',
      tokensUnit: (n: string) => `${n} tokens`,
      tokenUses: [
        ['Agent traffic overage', '1 token per 100 MB'],
        ['Graph node run overage', '1 token per 1,000 runs'],
        ['Magic wand (cloud SAM)', '1 token per click — free with a SAM2 agent'],
        [
          'Meeting transcription & summary',
          '1 token per MiB recorded (min 2) + 1 per summary',
        ],
        ['Store content', 'The price set on the item'],
      ],

      usageTitle: 'Limits and usage on one screen.',
      usageDescription:
        'The project usage page shows quotas, monthly metered usage, this month’s charges, and your credit balance together — with a heads-up once you pass 70% of a limit.',

      faqTitle: 'Frequently asked questions',
      faq: [
        {
          q: 'Does the free plan require a credit card?',
          a: 'No. Sign up with email only — we never ask for payment details until you upgrade.',
        },
        {
          q: 'Can I take my labels and data out anytime?',
          a: 'Yes. Labels export to standard formats (COCO, YOLO, Labeled PLY, SemanticKITTI, CSV, and more) and files download as-is. Leaving without lock-in is the principle.',
        },
        {
          q: 'What happens when I upgrade or downgrade?',
          a: 'Changes apply immediately with prorated billing. If a downgrade puts you over a limit, existing data is kept — only new creation is restricted.',
        },
        {
          q: 'What is the refund policy?',
          a: 'Full refund within 14 days of payment for effectively unused subscriptions. Reach out through the contact channel.',
        },
        {
          q: 'If beta prices go up, does my subscription?',
          a: 'No. The price you subscribe at during beta stays on your account.',
        },
        {
          q: 'We need on-premises / installed deployment.',
          a: 'Contact us via Enterprise. We support installed-software integration backed by license keys with Ed25519 offline verification.',
        },
      ],
    },
  },
} as const;
