/** Landing page copy. Section order mirrors `pages/landing.tsx`. */
export const landing = {
  ko: {
    hero: {
      badge: '이미지 · 비디오 · 3D · 시계열',
      title: '비전 데이터의 워크스페이스.',
      description:
        '수집·라벨링·학습·현장 연동까지, 팀의 비전 데이터 작업 전 과정을 하나의 워크스페이스에서 관리합니다. 브라우저에서 바로 시작하고, 무거운 연산은 자체 GPU 에이전트가 처리합니다.',
      primaryCta: '무료로 시작',
      secondaryCta: '가격 보기',
      comingSoonNote: 'app.cvp.run은 정식 출시를 준비하고 있습니다.',
    },

    modalities: {
      label: '4가지 모달리티',
      title: '데이터 유형과 관계없이, 하나의 워크스페이스에서.',
      description:
        '이미지, 비디오, 3D 포인트클라우드, 시계열 데이터는 각 유형에 맞는 전용 에디터에서 작업합니다. 에디터는 달라도 프로젝트·클래스·리뷰·학습 워크플로는 동일하게 유지됩니다.',
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
        title: '박스에서 마스크까지, 작업 속도를 높이는 에디터.',
        body: '사각형·다각형·키포인트·브러시·매직 완드 등 13종의 도구를 단축키로 전환하며 작업합니다. 렌더링을 최적화하여 대용량 이미지에서도 지연 없는 응답 속도를 유지합니다.',
        cta: '이미지 라벨링 자세히 보기',
      },
      videos: {
        kicker: '비디오 라벨링',
        title: '키프레임만 지정하면 나머지는 자동 보간.',
        body: '상시 표시되는 타임라인에 키프레임을 추가하면 트랙이 프레임 사이를 자동으로 보간합니다. 가려졌다가 다시 나타난 객체는 기존 트랙에 연결하고, 잘못 병합된 구간은 분리합니다.',
        cta: '비디오 라벨링 자세히 보기',
      },
      pointClouds: {
        kicker: '3D 포인트클라우드',
        title: '수백만 개의 점, Pointcept가 먼저 분할합니다.',
        body: 'PLY·PCD·LAS/LAZ 파일을 브라우저에서 바로 열고 큐보이드와 세그먼트로 라벨링합니다. 자동 라벨링을 실행하면 자체 GPU에서 동작하는 Pointcept가 장면 전체를 시맨틱·인스턴스 단위로 분할합니다.',
        cta: '3D 라벨링 자세히 보기',
      },
      timeSeries: {
        kicker: '시계열 · 새 모달리티',
        title: '센서 신호에도 라벨을.',
        body: '설비의 진동·전류·온도 등 다채널 신호를 업로드하고 이상·정지·정비 구간과 순간 이벤트를 표시합니다. 채널을 분리해 비교하고, 특정 채널에만 적용되는 라벨을 지정하며, AI가 제안한 이상 구간을 검토해 수락합니다.',
        cta: '시계열 라벨링 자세히 보기',
      },
      ai: {
        kicker: 'AI 라벨링',
        title: 'AI가 초안을 생성하고, 사람은 판단에 집중합니다.',
        body: '자동 라벨링을 한 번 실행하면 RF-DETR가 박스·마스크·키포인트를 제안합니다. 클래스를 매핑하고 기존 객체와 겹치는 결과를 제외한 뒤, 선택한 결과만 적용합니다. 자체 에이전트에서 실행되므로 토큰이 소모되지 않습니다.',
        cta: 'AI 라벨링과 학습 자세히 보기',
      },
      training: {
        kicker: '학습',
        title: '라벨이 모델이 되는 11단계.',
        body: '훈련 위저드에서 태스크·모델·데이터·하이퍼파라미터·GPU를 선택하면 자체 에이전트가 학습을 수행합니다. 이미지 태스크 3종, 3D 인스턴스 세그멘테이션, 시계열 예측·이상 탐지·분류를 모두 동일한 절차로 구성하며, 학습을 마친 모델은 곧바로 자동 라벨링에 사용할 수 있습니다.',
        cta: '학습 자세히 보기',
      },
      review: {
        kicker: '리뷰 & QA',
        title: '라벨 위에 핀을 꽂고, 스레드로 해결.',
        body: '검수자가 이미지의 정확한 위치에 코멘트 핀을 남기면 라벨러는 이슈 탭의 스레드에서 답변하고 해결 처리합니다. 리뷰의 전 과정이 라벨링 화면 안에서 완결됩니다.',
        cta: '리뷰 & QA 자세히 보기',
      },
      workspace: {
        kicker: '데이터 워크스페이스',
        title: '업로드부터 QA 통계까지, 하나의 프로젝트에서.',
        body: 'YOLO·COCO·VOC·LabelMe 데이터셋을 단계별 위저드로 업로드하고 샘플 진행률과 클래스 분포를 한눈에 확인합니다. 파일, 동영상 라이브러리, 위키 문서도 같은 프로젝트에서 함께 관리합니다.',
        cta: '데이터셋 관리 자세히 보기',
      },
      edge: {
        kicker: '에이전트 · 수집기',
        title: '현장 설비까지 연결되는 플랫폼.',
        body: '머신마다 에이전트를 하나씩 설치하면 AI 추론, Modbus 설비 연동, 카메라·센서 데이터 수집이 해당 에이전트에서 실행됩니다. 여러 스트림을 하나의 타임라인에서 동기화해 재생하고, 필요한 구간만 클라우드로 업로드합니다.',
        cta: '에이전트 자세히 보기',
      },
      developers: {
        kicker: '개발자',
        title: 'CLI와 MLflow로 기존 환경과 연동.',
        body: '단일 실행 파일 CLI로 파일·데이터셋·에이전트 작업을 스크립트로 자동화합니다. 기존 MLflow 학습 스크립트는 환경 변수 두 줄만 설정하면 실행 기록이 프로젝트에 저장됩니다. 설치형 소프트웨어를 위해 오프라인 검증이 가능한 제품키도 발급합니다.',
        cta: '개발자 기능 자세히 보기',
      },
    },

    scope: {
      label: '한 프로젝트 안에',
      title: '라벨링에 필요한 주변 기능을 모두 갖추었습니다.',
      description:
        '디지털 트윈부터 전자서명까지, 별도의 도구를 도입하지 않고도 팀의 업무를 프로젝트 안에서 이어 갈 수 있습니다.',
    },

    pricingTeaser: {
      label: '가격',
      title: '카드 결제만으로 시작하는 투명한 가격.',
      description:
        '견적 요청이나 영업 미팅 없이 필요한 만큼만 이용합니다. 무료 플랜으로 충분히 검토한 뒤 도입을 결정할 수 있습니다.',
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
