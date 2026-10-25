/** Landing page copy. Section order mirrors `pages/landing.tsx`. */
export const landing = {
  ko: {
    hero: {
      badge: '이미지 · 비디오 · 3D · 시계열',
      title: '비전 데이터의 워크스페이스.',
      description:
        '수집·라벨링·학습·추론까지, 팀의 비전 데이터 작업 전 과정을 하나의 워크스페이스에서 관리합니다. 브라우저에서 바로 시작하고, 무거운 연산은 자체 GPU 에이전트가 처리합니다.',
      points: [
        '무료 플랜으로 시작',
        '설치 없이 브라우저에서',
        '추론·학습은 자체 GPU에서',
      ],
    },

    tour: {
      label: '제품 둘러보기',
      more: '자세히 보기',
      tabs: {
        images: '이미지',
        videos: '비디오',
        pointClouds: '3D 포인트클라우드',
        timeSeries: '시계열',
        inference: '추론',
      },
      captions: {
        images: '13종 도구와 자동 라벨링으로 박스부터 마스크·키포인트까지 작업합니다.',
        videos:
          '타임라인에 키프레임을 지정하면 트랙이 프레임 사이를 자동으로 보간합니다.',
        pointClouds:
          '원근 뷰와 직교 뷰 세 개를 함께 보며 큐보이드와 세그먼트로 라벨링합니다.',
        timeSeries:
          '다채널 센서 신호에 구간과 이벤트를 표시하고, AI가 제안한 이상 구간을 검토합니다.',
        inference:
          '자체 에이전트의 모델로 추론하고, 데이터셋 샘플의 결과를 곧바로 라벨로 저장합니다.',
      },
    },

    facts: [
      {value: '4', label: '데이터 유형', detail: '이미지 · 비디오 · 3D · 시계열'},
      {value: '7', label: '추론 기능', detail: '객체 탐지부터 시계열 분류까지'},
      {value: '5', label: '데이터셋 형식', detail: 'YOLO · COCO · VOC · LabelMe · CVP'},
      {value: '0원', label: '시작 비용', detail: '카드 등록 없는 무료 플랜'},
    ],

    workflow: {
      label: '작업 흐름',
      title: '수집부터 추론까지, 데이터가 한 방향으로 흐릅니다.',
      description:
        '각 단계의 결과가 다음 단계의 입력이 됩니다. 추론 결과를 라벨로 저장하면 그대로 다음 학습의 데이터가 됩니다.',
      loop: '추론 결과를 라벨로 저장하면 다시 학습 데이터가 됩니다.',
      steps: [
        {
          title: '수집',
          body: '업로드 위저드, 수집기, S3 호환 API로 데이터를 모읍니다.',
        },
        {
          title: '라벨링',
          body: '4가지 전용 에디터와 자동 라벨링으로 초안을 만들고 다듬습니다.',
        },
        {
          title: '리뷰',
          body: '핀 코멘트와 QA 통계로 라벨 품질을 점검합니다.',
        },
        {
          title: '학습',
          body: '4단계 위저드로 학습하고 모든 기록을 MLflow에 남깁니다.',
        },
        {
          title: '추론',
          body: '7가지 기능으로 추론하고 결과를 라벨로 저장합니다.',
        },
      ],
    },

    sections: {
      ai: {
        kicker: 'AI 라벨링',
        title: 'AI가 초안을 생성하고, 사람은 판단에 집중합니다.',
        body: '자동 라벨링을 실행하면 객체 탐지 모델이 박스·마스크·키포인트를 제안합니다. 클래스를 매핑하고 기존 객체와 겹치는 결과를 제외한 뒤 선택한 결과만 적용합니다. 추론은 자체 에이전트에서 실행되므로 추론 자체에는 토큰이 소모되지 않습니다.',
        cta: 'AI 라벨링과 학습 자세히 보기',
      },
      mlops: {
        kicker: 'MLOps',
        title: '런마다 결과와 근거가 남습니다.',
        body: '훈련 위저드의 학습과 기존 MLflow 스크립트의 실행이 같은 실험 목록에 기록됩니다. 런 상세는 결과를 현재 @production 버전과 비교해 보여 주고, 검토를 마친 런은 모델 버전으로 등록해 별칭으로 배포 단계를 구분합니다.',
        cta: 'MLOps 자세히 보기',
      },
      inference: {
        kicker: '추론',
        title: '7가지 추론 기능을 하나의 메뉴에서.',
        body: '객체 탐지·세그멘테이션·3D 분할·시계열 예측·이상 탐지·분류를 자체 에이전트에 캐시된 모델로 실행합니다. 개요에서 준비 상태와 확인이 필요한 항목을 파악하고, 모든 추론은 90일 동안 히스토리에 기록됩니다.',
        cta: '추론 자세히 보기',
      },
      review: {
        kicker: '리뷰 & QA',
        title: '라벨 위에 핀을 꽂고, 스레드로 해결합니다.',
        body: '검수자가 이미지의 정확한 위치에 코멘트 핀을 남기면 라벨러는 이슈 탭의 스레드에서 답변하고 해결 처리합니다. 리뷰의 전 과정이 라벨링 화면 안에서 완결됩니다.',
        cta: '리뷰 & QA 자세히 보기',
      },
      workspace: {
        kicker: '데이터 워크스페이스',
        title: '업로드부터 QA 통계까지, 하나의 프로젝트에서.',
        body: 'YOLO·COCO·VOC·LabelMe 데이터셋을 단계별 위저드로 업로드하고, 상태별 개수와 필터로 샘플을 관리하며, 조건에 맞는 샘플 전체의 상태를 한 번에 변경합니다. 파일, 동영상 라이브러리, 위키 문서도 같은 프로젝트에서 관리합니다.',
        cta: '데이터셋 관리 자세히 보기',
      },
      edge: {
        kicker: '현장 연동',
        title: '공장 설비와 직접 통신하는 플랫폼.',
        body: '에이전트에서 ModbusTCP 서버를 열거나 PLC에 연결해 태그 값을 읽고 쓰며, 수집기가 장치 값을 시계열로 녹화합니다. 기록된 구간은 디지털 트윈에서 설비의 동작으로 재생됩니다.',
        cta: 'ModbusTCP 자세히 보기',
      },
      developers: {
        kicker: '개발자',
        title: 'CLI, S3, MLflow로 기존 도구와 연동합니다.',
        body: '단일 실행 파일 CLI로 데이터셋·추론·MLOps 작업을 스크립트로 자동화하고, DVC·aws CLI 같은 S3 클라이언트로 프로젝트 저장소에 접근합니다. 기존 MLflow 학습 스크립트는 환경 변수 두 개만 설정하면 실행 기록이 프로젝트에 저장됩니다.',
        cta: '개발자 기능 자세히 보기',
      },
    },

    scope: {
      label: '한 프로젝트 안에',
      title: '라벨링에 필요한 주변 기능을 모두 갖추었습니다.',
      description:
        '현장 연동부터 전자서명까지, 별도의 도구를 도입하지 않고도 팀의 업무를 프로젝트 안에서 이어 갈 수 있습니다.',
    },

    integrations: {
      label: '연동',
      title: '이미 사용하는 형식과 도구를 그대로.',
      description:
        '표준 데이터 형식으로 가져오고 내보내며, 학습·저장소·배포 도구는 표준 프로토콜로 연결합니다.',
      groups: [
        {
          title: '데이터셋 형식',
          items: [
            'YOLO',
            'COCO',
            'Pascal VOC',
            'LabelMe',
            'CVAT',
            'MOT',
            'ImageFolder',
          ],
        },
        {
          title: '3D · 시계열',
          items: ['PLY', 'PCD', 'LAS/LAZ', 'NumPy', 'CSV', 'Parquet', 'HDF5'],
        },
        {
          title: 'ML · 저장소',
          items: ['MLflow', 'DVC', 'aws CLI', 'Docker/OCI', 'Helm', 'pip', 'npm'],
        },
        {
          title: 'AI 엔진',
          items: [
            'RF-DETR',
            'SAM 2',
            'Pointcept',
            'Chronos-Bolt',
            'AutoGluon',
            'MiniRocket',
          ],
        },
        {
          title: '현장 · 미디어',
          items: ['ModbusTCP', 'HLS', 'WebRTC', 'WebXR', 'GLB', 'DXF'],
        },
      ],
    },

    securityTeaser: {
      label: '보안',
      title: '데이터와 연산을 팀의 통제 아래에.',
      description:
        '추론과 학습은 팀이 운영하는 장비에서 실행되고, 계정과 프로젝트는 단계별 보호 장치로 관리됩니다.',
      items: [
        {
          title: '자체 장비에서 실행',
          body: '추론·학습·영상 변환이 팀이 운영하는 에이전트에서 처리됩니다.',
        },
        {
          title: '2단계 인증',
          body: '인증기 앱(TOTP)으로 로그인에 두 번째 단계를 추가합니다.',
        },
        {
          title: '범위가 지정된 토큰',
          body: '토큰마다 권한 범위와 만료일을 지정하며, 원문은 한 번만 표시됩니다.',
        },
        {
          title: '동영상 암호화',
          body: 'HLS 동영상을 AES-128로 암호화해 보관합니다.',
        },
      ],
      cta: '보안 자세히 보기',
    },

    pricingTeaser: {
      label: '가격',
      title: '카드 결제만으로 시작하는 투명한 가격.',
      description:
        '견적 요청이나 영업 미팅 없이 필요한 만큼만 이용합니다. 무료 플랜으로 충분히 검토한 뒤 도입을 결정할 수 있습니다.',
      cta: '전체 가격 보기',
    },

    changelogTeaser: {
      label: '변경 내역',
      title: '최근 추가된 기능.',
      description:
        'CVP는 매달 새로운 기능을 추가하고 있습니다. 최근 추가된 주요 기능입니다.',
      cta: '전체 변경 내역 보기',
    },
  },

  en: {
    hero: {
      badge: 'Images · Video · 3D · Time series',
      title: 'The workspace for vision data.',
      description:
        'Collect, label, train, and run inference — every step of your team’s vision data work in one workspace. Start in the browser; hand the heavy lifting to your own GPU agents.',
      points: [
        'Free plan to start',
        'Nothing to install',
        'Inference and training on your GPUs',
      ],
    },

    tour: {
      label: 'Product tour',
      more: 'Learn more',
      tabs: {
        images: 'Images',
        videos: 'Video',
        pointClouds: '3D point clouds',
        timeSeries: 'Time series',
        inference: 'Inference',
      },
      captions: {
        images: 'Boxes to masks and keypoints with 13 tools and auto-labeling.',
        videos: 'Set keyframes on the timeline and tracks interpolate between frames.',
        pointClouds:
          'Label with cuboids and segments across a perspective view and three orthographic views.',
        timeSeries:
          'Mark ranges and events on multichannel sensor signals and review anomalies AI suggests.',
        inference:
          'Run inference with models on your own agents and save dataset-sample results straight back as labels.',
      },
    },

    facts: [
      {value: '4', label: 'Data types', detail: 'Images · video · 3D · time series'},
      {
        value: '7',
        label: 'Inference features',
        detail: 'From object detection to time-series classification',
      },
      {
        value: '5',
        label: 'Dataset formats',
        detail: 'YOLO · COCO · VOC · LabelMe · CVP',
      },
      {value: '$0', label: 'To start', detail: 'A free plan, no card needed'},
    ],

    workflow: {
      label: 'Workflow',
      title: 'From collection to inference, data flows one way.',
      description:
        'Each step feeds the next. Save inference results as labels and they become the data for the next training run.',
      loop: 'Inference results saved as labels become training data again.',
      steps: [
        {
          title: 'Collect',
          body: 'Bring data in with the upload wizard, collectors, and the S3-compatible API.',
        },
        {
          title: 'Label',
          body: 'Draft and refine with four dedicated editors and auto-labeling.',
        },
        {
          title: 'Review',
          body: 'Check label quality with pinned comments and QA stats.',
        },
        {
          title: 'Train',
          body: 'Train with the four-step wizard and keep every record in MLflow.',
        },
        {
          title: 'Infer',
          body: 'Run seven inference features and save results as labels.',
        },
      ],
    },

    sections: {
      ai: {
        kicker: 'AI labeling',
        title: 'AI drafts; people decide.',
        body: 'Run auto-label and an object detection model proposes boxes, masks, and keypoints. Map classes, drop results that overlap existing objects, and apply only what you pick. It runs on your own agent, so inference itself spends no tokens.',
        cta: 'More on AI labeling & training',
      },
      mlops: {
        kicker: 'MLOps',
        title: 'Every run keeps its results and its reasons.',
        body: 'Runs from the training wizard and from existing MLflow scripts land in the same experiment list. A run’s summary compares results with the current @production version, and reviewed runs become model versions whose aliases mark the release stage.',
        cta: 'More on MLOps',
      },
      inference: {
        kicker: 'Inference',
        title: 'Seven inference features, one menu.',
        body: 'Run object detection, segmentation, 3D segmentation, and time-series forecasting, anomaly detection, and classification with models cached on your own agents. The overview shows readiness and what needs attention, and every run stays in history for 90 days.',
        cta: 'More on inference',
      },
      review: {
        kicker: 'Review & QA',
        title: 'Pin feedback on the label, resolve it in a thread.',
        body: 'Reviewers drop comment pins at the exact spot on the image; labelers reply and resolve from the issues tab. Review never leaves the labeling screen.',
        cta: 'More on review & QA',
      },
      workspace: {
        kicker: 'Data workspace',
        title: 'From upload to QA stats, in one project.',
        body: 'Upload YOLO, COCO, VOC, or LabelMe through a step-by-step wizard, manage samples with status counts and filters, and change the status of every matching sample at once. Files, the video library, and wiki docs live in the same project.',
        cta: 'More on datasets',
      },
      edge: {
        kicker: 'Edge & field',
        title: 'A platform that talks to the equipment.',
        body: 'Open a ModbusTCP server on an agent or connect to a PLC to read and write tag values, and collectors record device values as time series. Recorded ranges replay as equipment motion in the digital twin.',
        cta: 'More on ModbusTCP',
      },
      developers: {
        kicker: 'Developers',
        title: 'Plug into your tools with the CLI, S3, and MLflow.',
        body: 'Script datasets, inference, and MLOps with a single-binary CLI, and reach project storage from S3 clients such as DVC and the aws CLI. Point existing MLflow training scripts at your project with two environment variables.',
        cta: 'More for developers',
      },
    },

    scope: {
      label: 'Inside one project',
      title: 'What you need around labeling is already here.',
      description:
        'From field equipment to e-signatures — your team’s work continues inside the project without bringing in another tool.',
    },

    integrations: {
      label: 'Integrations',
      title: 'The formats and tools you already use.',
      description:
        'Import and export in standard data formats, and connect training, storage, and release tools over standard protocols.',
      groups: [
        {
          title: 'Dataset formats',
          items: [
            'YOLO',
            'COCO',
            'Pascal VOC',
            'LabelMe',
            'CVAT',
            'MOT',
            'ImageFolder',
          ],
        },
        {
          title: '3D · time series',
          items: ['PLY', 'PCD', 'LAS/LAZ', 'NumPy', 'CSV', 'Parquet', 'HDF5'],
        },
        {
          title: 'ML · storage',
          items: ['MLflow', 'DVC', 'aws CLI', 'Docker/OCI', 'Helm', 'pip', 'npm'],
        },
        {
          title: 'AI engines',
          items: [
            'RF-DETR',
            'SAM 2',
            'Pointcept',
            'Chronos-Bolt',
            'AutoGluon',
            'MiniRocket',
          ],
        },
        {
          title: 'Field · media',
          items: ['ModbusTCP', 'HLS', 'WebRTC', 'WebXR', 'GLB', 'DXF'],
        },
      ],
    },

    securityTeaser: {
      label: 'Security',
      title: 'Your data and compute, under your team’s control.',
      description:
        'Inference and training run on hardware your team operates, and accounts and projects are protected step by step.',
      items: [
        {
          title: 'Runs on your hardware',
          body: 'Inference, training, and video conversion run on agents your team operates.',
        },
        {
          title: 'Two-factor authentication',
          body: 'Add a second sign-in step with an authenticator app (TOTP).',
        },
        {
          title: 'Scoped tokens',
          body: 'Every token has scopes and an expiry, and its value is shown once.',
        },
        {
          title: 'Video encryption',
          body: 'HLS video is stored encrypted with AES-128.',
        },
      ],
      cta: 'More on security',
    },

    pricingTeaser: {
      label: 'Pricing',
      title: 'Transparent pricing you can start with a card.',
      description:
        'No quotes, no sales calls — pay for what you need. Try the free plan for as long as you like.',
      cta: 'See full pricing',
    },

    changelogTeaser: {
      label: 'Changelog',
      title: 'Recently shipped.',
      description: 'New features land in CVP every month. Here are the latest.',
      cta: 'See the full changelog',
    },
  },
} as const;
