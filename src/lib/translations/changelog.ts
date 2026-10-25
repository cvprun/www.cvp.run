/**
 * Changelog copy. Entry ids, dates, tags and linked pages live in
 * `lib/changelog.ts`; every id there needs a title and body here in both
 * languages. Entries summarize app.cvp.run commits that are still in the
 * product (features removed later, such as clusters or MES, are left out).
 */
export const changelog = {
  ko: {
    changelogPage: {
      label: '변경 내역',
      title: 'CVP에 새로 추가된 기능.',
      description:
        'app.cvp.run에 추가된 주요 기능을 날짜순으로 정리합니다. 각 항목에서 관련 기능 페이지로 이동할 수 있습니다.',
      filterLabel: '분류',
      all: '전체',
      more: '자세히 보기',
      empty: '이 분류에 해당하는 항목이 없습니다.',
      subscribeLead: '새 기능 소식을 이메일로 전해 드립니다.',
      tags: {
        labeling: '라벨링',
        ml: '학습 · 추론',
        data: '데이터',
        edge: '현장 연동',
        workspace: '워크스페이스',
        developers: '개발자',
        security: '보안',
      },
      entries: {
        videoConverter: {
          title: '동영상 업로드 인코딩을 에이전트 변환기로',
          body: '업로드 1단계에서 인코딩 방식(브라우저만·필요할 때 변환기·모두 변환기)과 화질·속도·하드웨어 가속 등 고급 설정을 지정합니다. 변환은 자체 에이전트에서 HLS로 처리되며, 처리 중인 업로드는 라이브러리에 별도로 표시됩니다. cvp video upload 명령도 추가되었습니다.',
        },
        twoFactor: {
          title: '2단계 인증(TOTP)',
          body: '계정 보안 설정에서 인증기 앱을 등록하면 로그인할 때마다 6자리 코드를 확인합니다.',
        },
        sampleList: {
          title: '데이터셋 샘플 목록 개편',
          body: '상태별 개수 세그먼트, 댓글·태그 필터, 정렬, 쪽 이동을 제공하고, 조건에 맞는 모든 샘플을 선택해 상태를 변경하거나 삭제합니다. cvp dataset sample 명령으로도 실행합니다.',
        },
        plyLabelRules: {
          title: 'PLY 라벨 규칙',
          body: 'PLY 라벨 필드의 값마다 클래스와 객체 분리 여부를 지정하는 규칙표를 데이터셋에 저장하고, 샘플 전체에 일괄 적용합니다.',
        },
        cobotReplay: {
          title: '협동 로봇 디지털 트윈과 수집기 구간 재생',
          body: 'RB10 프리셋의 기구학 협동로봇을 수집기 시계열 채널에 바인딩하고, 기록된 구간을 재생하며 용접 토치 끝점의 궤적을 표시합니다.',
        },
        teachImport: {
          title: '로봇 교시 파일 가져오기',
          body: '용접 로봇의 교시 파일(.h5)을 기구학으로 검증한 뒤 수집기의 클라우드 전용 시계열 스트림으로 가져옵니다.',
        },
        glossary: {
          title: '파라미터·메트릭 도움말',
          body: '훈련 위저드, 런 상세, 추론 화면의 파라미터와 메트릭 이름 옆 도움말에서 의미·읽는 법·개선 방법과 도식을 확인합니다. cvp mlops explain 명령으로도 조회합니다.',
        },
        runDetail: {
          title: '런 상세 개편',
          body: '요약에서 결과 타일, 학습 곡선, 주요 파라미터와 직전 런 대비 변경된 설정을 함께 보여 주고, 파라미터 비교와 전체 로그 보기를 추가했습니다.',
        },
        inferenceSection: {
          title: '추론 섹션',
          body: '사이드바의 추론 메뉴에서 7가지 추론 기능을 실행합니다. 개요·기능·모델·히스토리 탭을 제공하며, 데이터셋 샘플의 결과는 라벨로 저장합니다.',
        },
        modbusDevices: {
          title: 'ModbusTCP 장치',
          body: '서버·클라이언트 장치를 등록하고 태그를 표·격자·카드 보기로 관리합니다. 실시간 값 확인과 쓰기, 히스토리, 수집기 녹화, 디지털 트윈 바인딩을 지원합니다.',
        },
        mlflowTracking: {
          title: '학습 기록을 MLflow에 모두 저장',
          body: '세 가지 트레이너가 파라미터·시스템 메트릭·데이터셋 계보·가중치를 MLflow 런에 기록하며, 학습을 마치면 모델 레지스트리에 자동으로 등록할 수 있습니다.',
        },
        mlopsRevamp: {
          title: 'MLOps 화면 개편',
          body: '개요·실험·런·비교·모델·연동의 6개 탭으로 재구성하고, 4단계 훈련 위저드와 모델 별칭 레인을 추가했습니다.',
        },
        videoFlows: {
          title: '동영상 업로드와 라이브 녹화의 3단계 흐름',
          body: '업로드와 스트리밍을 단계별 흐름으로 재구성하고, 카메라·휴대폰·화면 녹화와 세션 페이지, 재생목록 갤러리를 추가했습니다.',
        },
        s3Api: {
          title: 'S3 호환 API',
          body: '저장소 범위 토큰에서 S3 자격 증명을 발급하고 DVC·aws CLI 같은 S3 클라이언트로 프로젝트 파일에 접근합니다.',
        },
        agentCompat: {
          title: '에이전트 앱 호환성 확인',
          body: '앱을 추가하기 전에 호스트의 운영체제·아키텍처·glibc·GPU·드라이버를 점검합니다. cvp agent check 명령으로도 확인합니다.',
        },
        collectors: {
          title: '수집기',
          body: '에이전트가 7가지 데이터를 세그먼트로 기록하고, 여러 스트림을 하나의 타임라인에서 재생하며, 정책에 따라 필요한 구간만 클라우드에 보관합니다.',
        },
        agentLimits: {
          title: '에이전트 앱 리소스 한도',
          body: '앱 인스턴스마다 CPU·메모리·GPU·프로세스 수 한도를 지정하고 cgroup v2로 강제합니다.',
        },
        timeSeries: {
          title: '시계열 데이터셋과 에디터',
          body: '열 역할 매핑으로 CSV·Parquet을 가져오고, 구간·이벤트 라벨, 채널 스택 보기, 고정 윈도우 분류, 표 보기를 제공합니다.',
        },
        timeSeriesModels: {
          title: '시계열 예측·이상 탐지·분류',
          body: 'Chronos-Bolt 예측과 이상 구간 제안, MiniRocket 윈도우 분류를 추가하고, 훈련 위저드에서 시계열 모델을 학습합니다.',
        },
        pointceptAutolabel: {
          title: '3D AI 라벨링과 인스턴스 세그멘테이션 학습',
          body: '포인트클라우드 에디터에서 Pointcept 모델로 장면을 분할하고, 훈련 위저드에서 PointGroup 인스턴스 세그멘테이션을 학습합니다.',
        },
        polygonCleanup: {
          title: '폴리곤 정점 정리',
          body: '정점이 과도하게 많은 폴리곤을 Shift+S로 단순화하거나 직선화합니다.',
        },
        uploadWizard: {
          title: '데이터셋 업로드 위저드',
          body: 'YOLO·COCO·VOC·LabelMe·CVP 데이터셋을 슬롯별로 입력받아 브라우저에서 검증하고, 분할 정보를 태그로 보존합니다.',
        },
        standaloneCli: {
          title: '단일 실행 파일 CLI',
          body: 'Node.js 없이 설치하는 Linux·macOS·Windows용 실행 파일과 설치 스크립트를 제공하며, 이후 배포에 맞춰 자동으로 업데이트됩니다.',
        },
        pipChannels: {
          title: 'pip 채널',
          body: 'pip 레지스트리를 채널별 인덱스로 나누고 PEP 691·700·658 메타데이터를 제공합니다.',
        },
        slugUrls: {
          title: '읽기 쉬운 프로젝트·리소스 주소',
          body: '프로젝트와 데이터셋·그리드·위키 등 리소스를 UUID 대신 슬러그 주소로 엽니다.',
        },
        editorAutoLabel: {
          title: '에디터의 자동 라벨링',
          body: '연결된 객체 탐지 에이전트로 현재 샘플의 박스·마스크·키포인트 초안을 생성하고 검토해 적용합니다.',
        },
        vrVideo: {
          title: '360° 동영상과 VR 시어터',
          body: '360°·스테레오 영상을 구면으로 재생하고, WebXR 헤드셋에서 시청합니다.',
        },
        liveRecording: {
          title: '라이브 녹화',
          body: '카메라 녹화를 진행하는 동안에도 녹화 중인 영상을 시청합니다.',
        },
        subtitleChapters: {
          title: '자막·챕터 편집기',
          body: '자막 큐를 표 형식 편집기에서 다듬고, 설명의 시간 표기로 챕터를 지정합니다.',
        },
        sessions: {
          title: '계정 세션 관리',
          body: '로그인한 기기와 위치, 로그인 방식을 확인하고 다른 기기의 세션을 종료합니다.',
        },
        wikiShare: {
          title: '위키 공개 링크와 발표 모드',
          body: '위키 페이지를 공개 링크로 공유하고, 레이저·잉크·발표자 보기로 슬라이드를 발표합니다.',
        },
        gridForms: {
          title: '그리드 폼·설문·참조 열',
          body: '폼 디자이너와 설문 보기, 로그인 없이 응답하는 공개 폼, 다른 그리드를 참조하는 열을 추가했습니다.',
        },
        twinVr: {
          title: '디지털 트윈 1인칭·VR 탐색',
          body: '데스크톱 1인칭 이동과 VR 손목 패널, 설비 라벨로 현장을 탐색합니다.',
        },
        fileViewers: {
          title: '파일 뷰어 확장',
          body: 'PDF·글꼴 뷰어와 압축 파일 탐색을 추가하고, 이미지·HWP·다이어그램을 뷰어 안에서 편집합니다.',
        },
        agentStorage: {
          title: '에이전트 로컬 저장소 정리 정책',
          body: '에이전트의 로컬 캐시 용량을 확인하고 정리 주기·보존 기간·상한을 지정합니다.',
        },
        agentMetrics: {
          title: '에이전트 메트릭 시계열',
          body: '에이전트가 시스템 메트릭을 로컬 시계열로 보관하고, 웹에서 기간별로 조회합니다.',
        },
        datasetQa: {
          title: '데이터셋 QA 통계',
          body: '클래스 분포, 동시 등장, 객체 수·크기, 태그 사용을 하나의 탭에서 확인합니다.',
        },
        downloader: {
          title: '동영상 다운로더 앱',
          body: '에이전트에서 동영상과 재생목록을 내려받아 프로젝트에 저장합니다.',
        },
        wikiSlides: {
          title: '위키 슬라이드',
          body: '위키 본문을 Slidev 호환 슬라이드 덱으로 전환해 발표합니다.',
        },
        meetingRoom: {
          title: '화상 회의실',
          body: '채팅, 참가자 패널, 호스트 제어를 갖춘 화상 회의실을 프로젝트 안에서 엽니다.',
        },
        store: {
          title: '스토어',
          body: '위키·그리드·데이터셋을 버전과 함께 발행하고, 평점과 코멘트로 콘텐츠를 평가합니다.',
        },
        dimensions: {
          title: '3D 치수선과 가이드 라인',
          body: '포인트클라우드 위에 치수선을 그려 거리와 각도를 측정하고, 가이드 라인에 스냅합니다.',
        },
        rfdetrTasks: {
          title: '세그멘테이션·키포인트 학습',
          body: '객체 탐지에 더해 인스턴스 세그멘테이션과 키포인트 모델을 학습하고, 기반 모델 크기를 선택합니다.',
        },
        videoTracks: {
          title: '비디오 트랙 병합·분리',
          body: '가려졌다가 다시 나타난 객체를 기존 트랙에 이어 붙이고, 잘못 병합된 구간을 분리합니다.',
        },
        magicWand: {
          title: '매직 완드',
          body: '이미지 에디터에서 클릭 한 번으로 객체 마스크를 생성합니다.',
        },
        registries: {
          title: 'Docker·pip·npm 레지스트리',
          body: '컨테이너 이미지와 pip·npm 패키지를 프로젝트 레지스트리에 업로드하고 표준 클라이언트로 사용합니다.',
        },
        activityFeed: {
          title: '활동 피드',
          body: '프로젝트의 주요 작업을 활동 탭과 대시보드 위젯에서 시간순으로 확인합니다.',
        },
      },
    },
  },

  en: {
    changelogPage: {
      label: 'Changelog',
      title: 'New in CVP.',
      description:
        'The main features added to app.cvp.run, newest first. Each entry links to its feature page.',
      filterLabel: 'Category',
      all: 'All',
      more: 'Learn more',
      empty: 'Nothing in this category.',
      subscribeLead: 'Get new features in your inbox.',
      tags: {
        labeling: 'Labeling',
        ml: 'Training · inference',
        data: 'Data',
        edge: 'Edge & field',
        workspace: 'Workspace',
        developers: 'Developers',
        security: 'Security',
      },
      entries: {
        videoConverter: {
          title: 'Video uploads encode on your agent’s converter',
          body: 'Step one of the upload picks the encoding — browser only, converter when needed, or converter for everything — plus quality, speed, and hardware acceleration. Conversion to HLS runs on your own agent, processing uploads show in the library, and cvp video upload joins the CLI.',
        },
        twoFactor: {
          title: 'Two-factor authentication (TOTP)',
          body: 'Enroll an authenticator app in account security and every sign-in asks for a 6-digit code.',
        },
        sampleList: {
          title: 'A rebuilt dataset sample list',
          body: 'Status counts, comment and tag filters, sorting, and paging — and select every matching sample to change status or delete. Also from cvp dataset sample.',
        },
        plyLabelRules: {
          title: 'PLY label rules',
          body: 'Save a rule table that maps each PLY label value to a class and decides object splitting, then apply it to every sample at once.',
        },
        cobotReplay: {
          title: 'Cobot digital twin and collector replay',
          body: 'Bind the kinematic RB10 cobot to collector time-series channels, replay a recorded range, and see the weld torch tip’s trail.',
        },
        teachImport: {
          title: 'Robot teaching file import',
          body: 'Welding-robot teaching files (.h5) are checked with kinematics and imported as a cloud-only collector time-series stream.',
        },
        glossary: {
          title: 'Parameter and metric help',
          body: 'The help next to parameters and metrics in the training wizard, run detail, and inference screens explains meaning, how to read it, and how to improve it, with diagrams. Also from cvp mlops explain.',
        },
        runDetail: {
          title: 'A rebuilt run detail',
          body: 'The summary shows result tiles, training curves, key parameters, and the settings changed since the previous run, with parameter comparison and full logs.',
        },
        inferenceSection: {
          title: 'Inference section',
          body: 'Run seven inference features from the Inference menu, with overview, features, models, and history tabs; results on dataset samples save as labels.',
        },
        modbusDevices: {
          title: 'ModbusTCP devices',
          body: 'Register server and client devices and manage tags in table, grid, and card views — live values and writes, history, collector recording, and digital twin bindings.',
        },
        mlflowTracking: {
          title: 'Full training records in MLflow',
          body: 'All three trainers log parameters, system metrics, dataset lineage, and weights to the MLflow run, and can register the model when training finishes.',
        },
        mlopsRevamp: {
          title: 'Rebuilt MLOps screens',
          body: 'Six tabs — overview, experiments, runs, compare, models, connect — with a four-step training wizard and model alias lanes.',
        },
        videoFlows: {
          title: 'Three-step upload and live recording',
          body: 'Upload and streaming became step-by-step flows, adding camera, phone, and screen recording, a sessions page, and a playlist gallery.',
        },
        s3Api: {
          title: 'S3-compatible API',
          body: 'Issue S3 credentials from a storage-scoped token and reach project files from S3 clients such as DVC and the aws CLI.',
        },
        agentCompat: {
          title: 'Agent app compatibility checks',
          body: 'Check a host’s OS, architecture, glibc, GPU, and driver before adding an app. Also from cvp agent check.',
        },
        collectors: {
          title: 'Collectors',
          body: 'Agents record seven kinds of data as segments, many streams play on one timeline, and only the ranges your policy asks for are kept in the cloud.',
        },
        agentLimits: {
          title: 'Agent app resource limits',
          body: 'Set CPU, memory, GPU, and process limits per app instance, enforced with cgroup v2.',
        },
        timeSeries: {
          title: 'Time-series datasets and editor',
          body: 'Import CSV and Parquet with column-role mapping, then label ranges and events with stacked channels, fixed-window classification, and a table view.',
        },
        timeSeriesModels: {
          title: 'Time-series forecasting, anomalies, and classification',
          body: 'Chronos-Bolt forecasts and anomaly suggestions, MiniRocket window classification, and time-series training in the wizard.',
        },
        pointceptAutolabel: {
          title: '3D AI labeling and instance segmentation training',
          body: 'Segment scenes with Pointcept models in the point cloud editor, and train PointGroup instance segmentation in the wizard.',
        },
        polygonCleanup: {
          title: 'Polygon vertex cleanup',
          body: 'Simplify or straighten polygons with too many vertices using Shift+S.',
        },
        uploadWizard: {
          title: 'Dataset upload wizard',
          body: 'YOLO, COCO, VOC, LabelMe, and CVP datasets are filled in slot by slot, validated in the browser, and keep their splits as tags.',
        },
        standaloneCli: {
          title: 'Single-binary CLI',
          body: 'Executables and install scripts for Linux, macOS, and Windows with no Node.js required, updating themselves with each release.',
        },
        pipChannels: {
          title: 'pip channels',
          body: 'Split the pip registry into per-channel indexes with PEP 691, 700, and 658 metadata.',
        },
        slugUrls: {
          title: 'Readable project and resource URLs',
          body: 'Open projects and resources such as datasets, grids, and wiki pages by slug instead of UUID.',
        },
        editorAutoLabel: {
          title: 'Auto-labeling in the editor',
          body: 'A connected object detection agent drafts boxes, masks, and keypoints for the current sample for you to review and apply.',
        },
        vrVideo: {
          title: '360° video and a VR theater',
          body: 'Play 360° and stereo video on a sphere and watch it in WebXR headsets.',
        },
        liveRecording: {
          title: 'Live recording',
          body: 'Watch a camera recording while it is still being made.',
        },
        subtitleChapters: {
          title: 'Subtitle and chapter editors',
          body: 'Edit subtitle cues in a grid editor and set chapters from timestamps in the description.',
        },
        sessions: {
          title: 'Account session management',
          body: 'See signed-in devices, locations, and sign-in methods, and end sessions on other devices.',
        },
        wikiShare: {
          title: 'Public wiki links and presenting',
          body: 'Share wiki pages by public link and present slides with laser, ink, and presenter view.',
        },
        gridForms: {
          title: 'Grid forms, surveys, and reference columns',
          body: 'A form designer and survey view, public forms anyone can answer without signing in, and columns that reference another grid.',
        },
        twinVr: {
          title: 'First-person and VR digital twins',
          body: 'Walk the site in first person on desktop, or in VR with a wrist panel and equipment labels.',
        },
        fileViewers: {
          title: 'More file viewers',
          body: 'PDF and font viewers, archive browsing, and in-viewer editing of images, HWP files, and diagrams.',
        },
        agentStorage: {
          title: 'Agent local storage cleanup',
          body: 'Check an agent’s local cache usage and set the sweep interval, retention, and cap.',
        },
        agentMetrics: {
          title: 'Agent metric time series',
          body: 'Agents keep system metrics as local time series that you query by period from the web.',
        },
        datasetQa: {
          title: 'Dataset QA stats',
          body: 'Class distribution, co-occurrence, object counts and sizes, and tag usage on one tab.',
        },
        downloader: {
          title: 'Video downloader app',
          body: 'Download videos and playlists on an agent and save them to the project.',
        },
        wikiSlides: {
          title: 'Wiki slides',
          body: 'Turn a wiki page into a Slidev-compatible slide deck and present it.',
        },
        meetingRoom: {
          title: 'Video meeting rooms',
          body: 'Open a meeting room with chat, a participants panel, and host controls right in the project.',
        },
        store: {
          title: 'Store',
          body: 'Publish wikis, grids, and datasets with versions, and rate content with stars and comments.',
        },
        dimensions: {
          title: '3D dimensions and guide lines',
          body: 'Measure distances and angles with dimension lines on point clouds and snap to guide lines.',
        },
        rfdetrTasks: {
          title: 'Segmentation and keypoint training',
          body: 'Train instance segmentation and keypoint models alongside detection, and choose the base model size.',
        },
        videoTracks: {
          title: 'Merge and detach video tracks',
          body: 'Append objects that reappear after occlusion to their track and detach spans merged by mistake.',
        },
        magicWand: {
          title: 'Magic wand',
          body: 'Create an object mask in the image editor with a single click.',
        },
        registries: {
          title: 'Docker, pip, and npm registries',
          body: 'Push container images and pip and npm packages to the project registry and use them with standard clients.',
        },
        activityFeed: {
          title: 'Activity feed',
          body: 'Follow the project’s main actions in order on the activity tab and the dashboard widget.',
        },
      },
    },
  },
} as const;
