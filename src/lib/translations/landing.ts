/** Landing page copy. Section order mirrors `pages/landing.tsx`. */
export const landing = {
  ko: {
    hero: {
      badge: '이미지 · 비디오 · 3D · 시계열',
      title: '비전 데이터의 워크스페이스.',
      description:
        '수집, 라벨링, 학습, 현장 연동 — 팀의 비전 데이터 전부를 한 곳에서. 브라우저에서 바로 시작하고, 무거운 일은 내 GPU 에이전트에 맡기세요.',
      primaryCta: '무료로 시작',
      secondaryCta: '가격 보기',
      comingSoonNote: 'app.cvp.run 정식 오픈을 준비하고 있습니다.',
    },

    modalities: {
      label: '4가지 모달리티',
      title: '어떤 데이터든, 같은 워크스페이스에서.',
      description:
        '이미지, 비디오, 3D 포인트클라우드, 시계열 — 데이터 타입이 달라져도 에디터만 바뀔 뿐, 프로젝트·클래스·리뷰·학습 흐름은 그대로입니다.',
      tabs: {
        images: '이미지',
        videos: '비디오',
        pointClouds: '3D 포인트클라우드',
        timeSeries: '시계열',
      },
    },

    sections: {
      images: {
        kicker: '이미지 라벨링',
        title: '박스에서 마스크까지, 손에 붙는 에디터.',
        body: '사각형·다각형·키포인트·브러시·매직 완드 등 13종 도구를 단축키로 오가며 그립니다. 대용량 이미지에서도 지연 없는 반응속도를 유지하도록 렌더링을 최적화했습니다.',
        cta: '이미지 라벨링 자세히',
      },
      videos: {
        kicker: '비디오 라벨링',
        title: '키프레임만 찍으면, 사이는 보간으로.',
        body: '항상 표시되는 타임라인 위에 키프레임을 추가하면 트랙이 프레임 사이를 보간합니다. 가려졌다 나타난 객체는 트랙에 이어붙이고, 잘못 합쳐진 구간은 분리합니다.',
        cta: '비디오 라벨링 자세히',
      },
      pointClouds: {
        kicker: '3D 포인트클라우드',
        title: '수백만 점, Pointcept가 먼저 칠합니다.',
        body: 'PLY·PCD·LAS/LAZ를 브라우저에서 바로 열고, 큐보이드와 세그먼트로 라벨링합니다. 자동 라벨링을 누르면 내 GPU의 Pointcept가 장면 전체를 시맨틱·인스턴스로 분할해 줍니다.',
        cta: '3D 라벨링 자세히',
      },
      timeSeries: {
        kicker: '시계열 · 새 모달리티',
        title: '센서 신호에도 라벨을.',
        body: '설비 진동·전류·온도 같은 다채널 신호를 올리고, 이상·정지·정비 구간과 순간 이벤트를 긋습니다. 채널별로 쌓아 보고, 한 채널에만 걸리는 라벨을 남기고, AI가 제안한 이상 구간을 수락합니다.',
        cta: '시계열 라벨링 자세히',
      },
      ai: {
        kicker: 'AI 라벨링',
        title: 'AI가 초안을 그리고, 사람은 판단만.',
        body: '자동 라벨링 한 번에 RF-DETR가 박스·마스크·키포인트를 제안합니다. 클래스를 매핑하고, 이미 있는 객체와 겹치는 결과는 빼고, 고른 것만 적용하세요. 내 에이전트에서 돌기 때문에 토큰을 쓰지 않습니다.',
        cta: 'AI 라벨링과 학습 자세히',
      },
      training: {
        kicker: '학습',
        title: '라벨이 모델이 되는 11단계.',
        body: '훈련 위저드에서 태스크·모델·데이터·하이퍼파라미터·GPU를 고르면 내 에이전트가 학습합니다. 이미지 3종, 3D 인스턴스 세그멘테이션, 시계열 예측·이상 탐지·분류까지 같은 흐름이고, 끝난 모델은 바로 자동 라벨링에 쓰입니다.',
        cta: '학습 자세히',
      },
      review: {
        kicker: '리뷰 & QA',
        title: '라벨 위에 핀을 꽂고, 스레드로 해결.',
        body: '검수자가 이미지 위 정확한 위치에 코멘트 핀을 남기면, 라벨러는 이슈 탭에서 스레드로 답하고 해결 처리합니다. 리뷰가 라벨링 화면 밖으로 나가지 않습니다.',
        cta: '리뷰 & QA 자세히',
      },
      workspace: {
        kicker: '데이터 워크스페이스',
        title: '업로드부터 QA 통계까지, 한 프로젝트에.',
        body: 'YOLO·COCO·VOC·LabelMe를 단계별 위저드로 올리고, 샘플 진행률과 클래스 분포를 한눈에 봅니다. 파일, 동영상 라이브러리, 위키 문서도 같은 프로젝트 안에 있습니다.',
        cta: '데이터셋 관리 자세히',
      },
      edge: {
        kicker: '에이전트 · 수집기',
        title: '현장의 장비까지 닿는 플랫폼.',
        body: '머신마다 에이전트를 하나 설치하면 AI 추론, Modbus 설비 연동, 카메라·센서 수집이 그 위에서 돕니다. 여러 스트림을 한 타임라인에 맞춰 돌려보고, 필요한 구간만 클라우드로 올리세요.',
        cta: '에이전트 자세히',
      },
      developers: {
        kicker: '개발자',
        title: 'CLI와 MLflow로 어디서든 연동.',
        body: '실행 파일 하나짜리 CLI로 파일·데이터셋·에이전트를 스크립트하고, 기존 MLflow 학습 스크립트는 환경변수 두 줄로 프로젝트에 기록합니다. 설치형 소프트웨어에는 오프라인 검증 가능한 제품키를 발급합니다.',
        cta: '개발자 기능 자세히',
      },
    },

    scope: {
      label: '한 프로젝트 안에',
      title: '라벨링 곁에 필요한 것들이 이미 들어 있습니다.',
      description:
        '디지털 트윈부터 전자서명까지 — 따로 도구를 들이지 않아도 팀의 일이 프로젝트 안에서 이어집니다.',
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
      badge: 'Images · Video · 3D · Time series',
      title: 'The workspace for vision data.',
      description:
        'Collect, label, train, and connect to the field — all of your team’s vision data in one place. Start in the browser; hand the heavy lifting to your own GPU agents.',
      primaryCta: 'Start for free',
      secondaryCta: 'See pricing',
      comingSoonNote: 'app.cvp.run is getting ready for launch.',
    },

    modalities: {
      label: 'Four modalities',
      title: 'Any data type, the same workspace.',
      description:
        'Images, video, 3D point clouds, and time series — the editor changes, but your projects, classes, review, and training flow stay the same.',
      tabs: {
        images: 'Images',
        videos: 'Video',
        pointClouds: '3D point clouds',
        timeSeries: 'Time series',
      },
    },

    sections: {
      images: {
        kicker: 'Image labeling',
        title: 'From boxes to masks, an editor that keeps up.',
        body: 'Move between 13 tools — rectangle, polygon, keypoints, brush, magic wand, and more — with shortcuts. Rendering is tuned to stay responsive even on large images.',
        cta: 'More on image labeling',
      },
      videos: {
        kicker: 'Video labeling',
        title: 'Set keyframes; interpolation fills the rest.',
        body: 'Add keyframes on an always-visible timeline and tracks interpolate between frames. Append objects that reappear after occlusion, and detach spans merged by mistake.',
        cta: 'More on video labeling',
      },
      pointClouds: {
        kicker: '3D point clouds',
        title: 'Millions of points — Pointcept paints them first.',
        body: 'Open PLY, PCD, or LAS/LAZ right in the browser and label with cuboids and segments. Press auto-label and Pointcept on your GPU segments the whole scene, semantic or instance.',
        cta: 'More on 3D labeling',
      },
      timeSeries: {
        kicker: 'Time series · new modality',
        title: 'Labels for sensor signals, too.',
        body: 'Upload multichannel signals like vibration, current, and temperature, then mark anomaly, downtime, and maintenance ranges and instant events. Stack channels, label just one channel, and accept anomalies AI suggests.',
        cta: 'More on time-series labeling',
      },
      ai: {
        kicker: 'AI labeling',
        title: 'AI drafts; people just decide.',
        body: 'One auto-label click and RF-DETR proposes boxes, masks, and keypoints. Map classes, drop results that overlap existing objects, and apply only what you pick. It runs on your agent, so no tokens are spent.',
        cta: 'More on AI labeling & training',
      },
      training: {
        kicker: 'Training',
        title: 'Eleven steps from labels to a model.',
        body: 'Pick task, model, data, hyperparameters, and GPU in the training wizard and your agent trains it. Three image tasks, 3D instance segmentation, and time-series forecasting, anomaly detection, and classification share the flow — and finished models go straight into auto-labeling.',
        cta: 'More on training',
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
        body: 'Upload YOLO, COCO, VOC, or LabelMe through a step-by-step wizard and see sample progress and class distribution at a glance. Files, the video library, and wiki docs live in the same project.',
        cta: 'More on datasets',
      },
      edge: {
        kicker: 'Agents · collectors',
        title: 'A platform that reaches the equipment.',
        body: 'Install one agent per machine and AI inference, Modbus equipment links, and camera and sensor collection run on it. Scrub many streams on one timeline and upload only the spans you need.',
        cta: 'More on agents',
      },
      developers: {
        kicker: 'Developers',
        title: 'Integrate anywhere with the CLI and MLflow.',
        body: 'Script files, datasets, and agents with a single-binary CLI, and point existing MLflow training scripts at your project with two environment variables. Issue offline-verifiable product keys for installed software.',
        cta: 'More for developers',
      },
    },

    scope: {
      label: 'Inside one project',
      title: 'What you need around labeling is already here.',
      description:
        'From digital twins to e-signatures — your team’s work continues inside the project without bringing in another tool.',
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
