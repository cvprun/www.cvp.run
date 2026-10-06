/**
 * Feature detail page copy. Each page: intro + sections + spec table.
 * Section order must stay aligned with `sectionMocks` in `lib/site.ts`.
 * Facts mirror app.cvp.run as of 2026-10 — keep claims to what the app ships.
 */
export const features = {
  ko: {
    featurePage: {
      labelingKicker: '라벨링',
      platformKicker: '플랫폼',
      specsTitle: '스펙',
      relatedTitle: '함께 보기',
      ctaTitle: '직접 그려 보는 것이 가장 빠릅니다',
      ctaDescription: '무료 플랜에는 카드 등록이 필요 없습니다.',
      moreKicker: '더 보기',
      statusAvailable: '사용 가능',
      statusInDevelopment: '개발 중',
      developmentNote:
        '이 기능은 구현을 마치고 현장 검증 중입니다. 정식 출시 전까지 내용이 변경될 수 있습니다.',
    },

    labelingTools: {
      kicker: '모든 어노테이션 타입',
      title: '정교한 라벨링 도구가 가득.',
      aiBadge: 'AI',
      footnote:
        '모든 도구에 단축키가 지정되어 있어 마우스가 캔버스를 벗어날 필요가 없습니다.',
      subtitles: {
        images:
          '객체 검출부터 인스턴스 세그멘테이션까지 — 픽셀 단위로 정확한 도구를 단축키 하나로 오가고, AI가 초안을 그립니다.',
        videos:
          '이미지와 동일한 도형 도구를 타임라인 위에서. 키프레임만 지정하면 그 사이는 보간되고, 매직 완드와 자동 라벨링은 현재 화면의 프레임에 적용됩니다.',
        pointClouds:
          '수백만 점의 3D 장면을 위한 큐보이드 · 세그먼트 · 측정 도구, 그리고 Pointcept AI 라벨링.',
        timeSeries:
          '긴 신호 위에 구간과 이벤트를 표시하고, 윈도우 단위로 분류하고, AI가 찾은 이상 구간을 검수합니다.',
      },
      tools: {
        rectangle: {
          name: '사각형',
          desc: '드래그 한 번으로 그리는 객체 검출용 바운딩 박스.',
        },
        rotatedRectangle: {
          name: '회전 사각형',
          desc: '기울어진 객체에 정확히 맞는 방향성 박스.',
        },
        ellipse: {name: '타원', desc: '원형·타원형 객체를 감싸는 타원.'},
        polygon: {
          name: '다각형',
          desc: '정점을 지정해 만드는 마스크. Shift+클릭으로 구멍도 만들 수 있습니다.',
        },
        polyline: {name: '폴리라인', desc: '차선·경로 같은 열린 선을 잇습니다.'},
        point: {name: '점', desc: '단일 좌표를 지정하는 포인트.'},
        keypoint: {
          name: '키포인트',
          desc: '스켈레톤 프리셋으로 관절·랜드마크를 표시합니다.',
        },
        brush: {name: '브러시', desc: '픽셀 단위로 칠하는 마스크. [ ] 로 크기 조절.'},
        eraser: {name: '지우개', desc: '칠한 마스크를 다시 다듬습니다.'},
        magicWand: {
          name: '매직 완드',
          desc: '클릭 한 번으로 SAM이 객체를 분할합니다. SAM2 에이전트를 사용하면 토큰이 소모되지 않습니다.',
        },
        autoLabel: {
          name: '자동 라벨링',
          desc: 'RF-DETR 에이전트가 박스·마스크·키포인트 초안을 그리고, 검토 후 적용합니다.',
        },
        cuboid: {name: '큐보이드', desc: '이동·회전·크기 기즈모로 다루는 3D 박스.'},
        point3d: {name: '3D 포인트', desc: '포인트클라우드 위의 단일 3D 점.'},
        polyline3d: {name: '3D 폴리라인', desc: '3D 공간을 가로지르는 폴리라인.'},
        polygon3d: {name: '3D 폴리곤', desc: '평면 위 영역을 그리는 3D 다각형.'},
        keypoint3d: {name: '3D 키포인트', desc: '3D 스켈레톤 키포인트.'},
        segmentLasso: {
          name: '올가미 세그먼트',
          desc: '올가미로 점을 칠해 인스턴스로 묶습니다. 표면만 / 관통 선택.',
        },
        segmentRect: {
          name: '사각형 세그먼트',
          desc: '사각형으로 점을 선택해 세그먼트. Shift+드래그로 지웁니다.',
        },
        dimension: {name: '치수', desc: '직선 · 축 정렬 · 각도 치수선을 남깁니다.'},
        guide: {name: '가이드', desc: 'X/Y/Z 축이나 자유 방향의 보조선으로 스냅.'},
        autoLabel3d: {
          name: 'Pointcept AI 라벨링',
          desc: 'Pointcept 에이전트가 장면 전체를 시맨틱·인스턴스로 분할합니다.',
        },
        range: {
          name: '구간',
          desc: '드래그로 시작–끝 구간 라벨. 채널 한정 라벨도 지원합니다.',
        },
        event: {name: '이벤트', desc: '순간 사건을 한 시점에 깃발로 표시합니다.'},
        timeZoom: {name: '확대', desc: '드래그한 범위로 확대, 더블클릭으로 원위치.'},
        windowClassify: {
          name: '윈도우 분류',
          desc: '고정 길이 윈도우를 카드로 넘기며 숫자 키로 분류합니다.',
        },
        aiSuggest: {
          name: 'AI 제안',
          desc: 'Chronos-Bolt가 매긴 이상 점수로 후보 구간을 제안합니다.',
        },
      },
    },

    pages: {
      images: {
        title: '박스에서 마스크까지, AI가 먼저 그리는 이미지 라벨링.',
        intro:
          '13종 도구를 단축키로 오가며 그리고, 매직 완드와 자동 라벨링으로 초안을 생성하고, 리뷰까지 같은 화면에서 마칩니다.',
        sections: [
          {
            title: '13종 도구, 전부 단축키로.',
            body: '사각형(R), 회전 사각형(O), 타원(E), 다각형(G), 폴리라인(L), 점(P), 키포인트(K), 브러시(B)와 지우개(X), 매직 완드(W), 코멘트(C)까지 — 모든 도구에 단축키가 지정되어 있고, 도구에 마우스를 올리면 조작법 카드가 표시됩니다. 폴리곤 정점이 너무 많으면 Shift+S로 단순화·직선화해 정리합니다.',
          },
          {
            title: '초안은 AI가, 판단은 사람이.',
            body: '헤더의 자동 라벨링(A)을 누르면 연결된 RF-DETR 에이전트가 박스·마스크·키포인트를 제안합니다. 모델 클래스를 프로젝트 클래스에 매핑하고, 기존 객체와 겹치는 결과(IoU 0.7 이상)는 자동으로 제외하고, 선택한 결과만 적용합니다. 내 GPU에서 실행되므로 토큰을 사용하지 않습니다.',
          },
          {
            title: '키포인트는 스켈레톤 프리셋으로.',
            body: '사람·손·얼굴·동물 템플릿에서 시작하거나, 그래픽 에디터에서 관절을 배치하고 뼈대를 연결해 프로젝트 고유의 스켈레톤을 정의합니다. 자동 라벨링 결과의 키포인트도 클래스 스켈레톤 순서에 맞춰 정렬됩니다.',
          },
          {
            title: '리뷰가 같은 화면 안에 있습니다.',
            body: '이슈 탭에서 미해결 코멘트를 확인하고, 캔버스 위 핀을 눌러 정확한 위치의 피드백에 답합니다. 라벨링과 검수 사이를 오가는 화면 전환이 없습니다.',
          },
        ],
        specs: {
          rows: [
            [
              '도형 타입',
              '사각형 · 회전 사각형 · 다각형(구멍 포함) · 폴리라인 · 점 · 타원 · 브러시 마스크 · 키포인트 · 분류',
            ],
            [
              'AI 보조',
              '매직 완드(SAM2 에이전트 무료 / 클라우드 토큰) · RF-DETR 자동 라벨링 · 폴리곤 정점 정리',
            ],
            ['상태 워크플로', '미라벨링 → 진행 중 → 라벨링 완료 → 검토 완료'],
            [
              '편집',
              '실행 취소/다시 실행 · 정점 편집 · 격자 · 미니맵 · 원본 JSON 보기',
            ],
            ['성능', '비트맵 캐시 렌더링 · 인접 샘플 프리페치 · 이미지 LRU 캐시'],
          ],
        },
      },

      videos: {
        title: '키프레임만 지정하면, 사이는 보간으로.',
        intro:
          '항상 표시되는 타임라인 위에 트랙과 키프레임이 놓입니다. 모든 도형 타입이 트랙을 지원하고, 키프레임 사이는 자동으로 보간됩니다.',
        sections: [
          {
            title: '타임라인이 항상 곁에 있습니다.',
            body: '눈금자, 플레이헤드, 트랙별 키프레임 다이아몬드가 에디터 하단에 도킹됩니다. 휠로 확대하고 Shift+휠로 이동하며, 프레임 번호 입력과 처음/이전/다음/끝 이동으로 원하는 프레임으로 정확히 이동합니다.',
          },
          {
            title: '트랙은 잇고, 끊고, 합칩니다.',
            body: '다각형·키포인트·폴리라인까지 모든 도형이 키프레임을 가지며 보간됩니다. 객체가 가려졌다 나타나면 기존 트랙에 이어붙이고, 잘못 합쳐진 구간은 트랙에서 분리합니다. 이전 프레임 복제(Ctrl+Shift+V)와 프레임 단위 자동 라벨링으로 반복 작업을 줄입니다.',
          },
          {
            title: '업로드부터 재생까지 한 곳에서.',
            body: '동영상 라이브러리가 원본과 HLS 스트리밍 자산을 함께 관리합니다. 민감한 영상은 AES-128로 암호화하고, 자막·챕터를 달고, 재생 목록으로 정리해 팀과 공유합니다.',
          },
        ],
        specs: {
          rows: [
            [
              '타임라인',
              '눈금자 · 플레이헤드 · 트랙 행 · 키프레임 다이아몬드 · 태그 구간 막대',
            ],
            ['트랙', '자동 보간 · 트랙으로 병합 · 이어붙이기 · 분리'],
            ['입력', 'MP4 · WebM · MOV · MKV 등'],
            ['내보내기', 'MOT · CVAT · COCO · CVP'],
          ],
        },
      },

      pointClouds: {
        title: '수백만 점의 포인트클라우드를 브라우저에서.',
        intro:
          'PLY·PCD·LAS/LAZ·ASCII·NumPy를 업로드하면 GPU 렌더링으로 즉시 열립니다. 원근 뷰와 평면·정면·측면 직교 뷰를 함께 놓고, 큐보이드와 포인트 세그먼트로 라벨링하고, Pointcept가 장면을 먼저 칠합니다.',
        sections: [
          {
            title: '4개의 시점으로 한 장면을.',
            body: '메인 원근 뷰 옆에 평면(BEV)·정면·측면 직교 뷰가 세로로 정렬됩니다. 큐보이드는 이동(T)·회전(R)·크기(S) 기즈모로 다듬고, 점에 맞춤(F)·지면 스냅(Shift+F)으로 마무리합니다. 치수선과 가이드로 거리와 각도를 재고, 색상 모드는 RGB·라벨·높이·강도·텍스처 중에서 전환합니다.',
          },
          {
            title: 'Pointcept가 장면 전체를 먼저 칠합니다.',
            body: '자동 라벨링(A)을 누르면 Pointcept 에이전트가 PTv3 시맨틱 분할이나 PointGroup 인스턴스 분할을 실행해 결과를 3D 세그먼트로 칠합니다. 이 데이터셋으로 학습한 모델은 클래스가 자동 매핑되고, 기존 세그먼트에 추가할지 대체할지 선택합니다. 실행 취소 한 번으로 되돌릴 수 있습니다.',
          },
          {
            title: '모델 없이도 자동 분할.',
            body: '무효점(0,0,0)을 걸러내고, RANSAC으로 바닥·테이블 같은 지배 평면을 제거한 뒤, 격자 클러스터링으로 남은 점을 인스턴스로 묶습니다. GPU 없이도 브라우저 안에서 처리됩니다.',
          },
          {
            title: '기존 포맷과 라벨 필드 그대로.',
            body: 'LAS/LAZ는 브라우저 안에서 WASM으로 디코딩하고, 같은 이름의 이미지는 텍스처로 입힙니다. PLY의 classification·instance 같은 라벨 필드는 값을 보고 시맨틱/인스턴스로 판정해 가져오고, Pointcept 씬 폴더와 프로파일 스택도 폴더 단위로 업로드합니다.',
          },
        ],
        specs: {
          rows: [
            [
              '입력 포맷',
              'PLY · PCD · LAS/LAZ · ASCII(.txt .csv .xyz) · NumPy(.npy) · Pointcept 씬 폴더 · 프로파일 스택',
            ],
            [
              '도구',
              '큐보이드 · 올가미/사각형 세그먼트 · 3D 점/폴리라인/폴리곤/키포인트 · 치수 · 가이드',
            ],
            ['AI', 'Pointcept PTv3 시맨틱 · PointGroup 인스턴스 · 파인튜닝 모델'],
            ['색상 모드', 'RGB · 라벨 · 높이 · 강도 · 텍스처'],
            ['내보내기', 'Pointcept(.npy) · Labeled PLY · SemanticKITTI · TXT'],
          ],
        },
      },

      timeSeries: {
        title: '센서 신호에도 라벨을. 시계열 라벨링.',
        intro:
          '설비 진동, 전류, 온도 같은 다채널 신호를 업로드하고, 정상·이상·정지 구간과 순간 이벤트를 표시합니다. AI가 이상 구간을 먼저 제안하고, 라벨은 그대로 예측·분류 모델의 학습 데이터가 됩니다.',
        sections: [
          {
            title: '어떤 표든 열 역할만 정하면.',
            body: 'CSV·Parquet·JSON Lines를 넓은 표든 긴 표든 업로드하면 타임스탬프·시리즈 ID·대상 값·공변량을 자동으로 추정합니다. 역할을 확인하고 시간대와 리샘플 간격만 선택하면 시리즈마다 하나의 Parquet 샘플이 됩니다.',
          },
          {
            title: '겹쳐 보고, 쌓아 보고, 표로 봅니다.',
            body: '모든 채널을 정규화해 겹치거나, 채널마다 줄을 나눠 쌓거나, 원본 값을 표로 봅니다. 스택 보기에서 한 채널 위를 드래그하면 해당 채널에만 적용되는 라벨이 됩니다. 아래 트랙 레인과 전체 미니맵이 긴 시리즈의 위치를 잃지 않게 합니다.',
          },
          {
            title: 'AI가 찾고, 사람이 수락합니다.',
            body: '시계열 에이전트가 Chronos-Bolt로 이상 점수를 매겨 점선 구간으로 제안하면, 수락하거나 무시합니다. 윈도우 모드에서는 고정 길이 창을 카드로 넘기며 숫자 키로 분류하고, AI 분류의 신뢰도가 낮은 창만 선별해 보여 줍니다.',
          },
        ],
        specs: {
          rows: [
            [
              '입력',
              'CSV · Parquet · JSON Lines (넓은 표 / 긴 표) · 최대 64채널 · 500만 행',
            ],
            ['라벨', '구간 · 이벤트 · 윈도우 · 채널 한정 라벨 · 분류'],
            ['보기', '겹침(채널별 정규화) · 스택 · 표 · 윈도우 모드'],
            ['AI', 'Chronos-Bolt 이상 점수 · MiniRocket 윈도우 분류 · AutoGluon 학습'],
            ['내보내기', 'CVP · CSV'],
          ],
        },
      },

      datasets: {
        title: '이미지, 비디오, 3D, 시계열이 한 프로젝트의 데이터셋으로.',
        intro:
          '데이터셋마다 타입이 있고, 타입에 맞는 업로드 검증·에디터·도구가 자동으로 적용됩니다. 업로드는 위저드로, 품질은 QA 통계로, 결과는 표준 포맷으로.',
        sections: [
          {
            title: '업로드는 단계별 위저드로.',
            body: 'YOLO·COCO·Pascal VOC·LabelMe·CVP 포맷을 선택하면 필요한 폴더와 파일을 슬롯별로 입력받습니다. 업로드 전에 브라우저 안에서 내용을 검사해 치명·오류·경고·정보 4단계로 보여주고, train/val/test 분할은 샘플 태그로 남깁니다.',
          },
          {
            title: '진행률이 보이는 샘플 관리.',
            body: '샘플마다 미라벨링·진행 중·라벨링 완료·검토 완료 상태가 있고, 썸네일 위에 라벨을 겹쳐 봅니다. 여러 샘플을 골라 상태를 한 번에 바꾸고, 포인트클라우드는 조감 썸네일, 시계열은 스파크라인으로 미리 봅니다.',
          },
          {
            title: 'QA 통계로 빈틈을 찾습니다.',
            body: '클래스 분포, 클래스 동시 등장 히트맵, 샘플당 객체 수, 객체 크기 분포, 태그 사용량을 한 탭에서 봅니다. 어떤 클래스가 부족한지, 어떤 태그가 쓰이지 않는지 학습 전에 알 수 있습니다.',
          },
        ],
        specs: {
          rows: [
            ['데이터셋 타입', '이미지 · 비디오 · 포인트 클라우드 · 시계열'],
            [
              '가져오기',
              'YOLO · COCO · Pascal VOC · LabelMe · CVP · 미디어만 · 포인트클라우드 7종 · 시계열 표',
            ],
            [
              '내보내기',
              'COCO · YOLO · VOC · LabelMe · CVAT · MOT · CSV · ImageFolder · CVP (백그라운드 zip)',
            ],
            [
              'QA',
              '클래스 분포 · 동시 등장 · 객체 수/크기 · 태그 사용 · 시간 구간 통계',
            ],
            ['시작', '공개 데이터셋 복제 (COCO128 · UCI Occupancy 등)'],
          ],
        },
      },

      training: {
        title: '라벨이 모델이 되고, 모델이 다시 라벨을 그립니다.',
        intro:
          '11단계 훈련 위저드로 실험을 구성하면 내 GPU 에이전트가 학습하고, 학습을 마친 모델은 곧바로 추론과 자동 라벨링에 사용됩니다. 모든 실행은 MLflow 호환 추적에 남습니다.',
        sections: [
          {
            title: '내 GPU에서 실행되는 추론.',
            body: 'RF-DETR(탐지·세그멘테이션·키포인트), SAM2, Pointcept, 시계열 예측 앱을 에이전트에서 활성화하면 프로젝트 화면에서 바로 추론을 실행합니다. 가중치는 명시적으로 내려받으며, 요청은 유휴 인스턴스로 전달됩니다. 클라우드 토큰은 사용하지 않습니다.',
          },
          {
            title: '실행마다 남는 추이와 결과.',
            body: '에폭별 진행률, 손실과 mAP 곡선, 로그가 실행 표에 쌓입니다. 끝난 실행은 "추론에 사용"으로 바로 앱에 연결되고, 시계열 실험은 백테스트 결과와 모델 리더보드를 보여줍니다.',
          },
          {
            title: '위저드에서 선택하는 항목.',
            body: '태스크 → 프레임워크 → 모델 → 학습 데이터 → 클래스 → Train/Val → 하이퍼파라미터 → 평가 → 내보내기 → GPU → 학습. 이미지 3종, 3D 인스턴스 세그멘테이션, 시계열 예측·이상 탐지·분류까지 같은 흐름으로 구성합니다.',
          },
        ],
        specs: {
          rows: [
            [
              '태스크',
              '객체 탐지 · 인스턴스 세그멘테이션 · 키포인트 · 3D 인스턴스 세그멘테이션 · 시계열 예측/이상 탐지/분류',
            ],
            [
              '프레임워크',
              'RF-DETR · Pointcept(PTv3 · PointGroup) · AutoGluon-TimeSeries · Chronos-Bolt · MiniRocket',
            ],
            ['실행', '에이전트 GPU · 대기열 · 진행률 · 중단'],
            ['추적', 'MLflow 호환 실험 · 메트릭 · 아티팩트 · 모델 레지스트리'],
          ],
        },
      },

      review: {
        title: '라벨 위에 핀을 꽂는 리뷰.',
        intro:
          '검수 피드백이 이미지 위 정확한 좌표에 핀으로 남습니다. 라벨러는 이슈 탭에서 스레드로 답하고, 해결하면 핀이 초록색으로 바뀝니다.',
        sections: [
          {
            title: '정확한 위치에, 정확한 피드백.',
            body: '코멘트 도구(C)로 이미지나 포인트클라우드 위 아무 곳이나 클릭해 이슈를 엽니다. "3번 박스가 너무 큽니다"라고 적는 대신, 해당 박스 위에 직접 핀을 꽂습니다. 비디오에서는 특정 프레임에 핀이 고정됩니다.',
          },
          {
            title: '스레드로 대화하고, 해결로 닫습니다.',
            body: '이슈마다 코멘트 스레드가 연결됩니다. 미해결 이슈는 노란 핀과 번호로, 해결된 이슈는 초록 체크로 표시됩니다. 전체·미해결·해결됨 필터로 남은 검수만 추려 봅니다.',
          },
          {
            title: '검수 상태가 곧 진행률.',
            body: '샘플의 검토 완료 상태와 이슈 수가 데이터셋 목록과 QA 통계에 집계됩니다. 관리자는 데이터셋 화면만으로도 검수 진행 상황을 파악할 수 있습니다.',
          },
        ],
        specs: {
          rows: [
            ['이슈 핀', '이미지 좌표 · 비디오 프레임 · 3D 좌표 고정 · 번호/상태 뱃지'],
            ['스레드', '코멘트 · 답글 · 해결/다시 열기 · 작성자와 상대 시간'],
            ['필터', '전체 · 미해결 · 해결됨'],
            ['집계', '데이터셋 진행률 · QA 통계의 코멘트 수'],
          ],
        },
      },

      collaboration: {
        title: '라벨링 팀의 협업 공간까지 그대로.',
        intro:
          '멤버와 역할, 위키 문서, 파일, 동영상 라이브러리, 회의록이 프로젝트 단위로 묶입니다. 라벨링 가이드라인을 별도의 도구에 둘 필요가 없습니다.',
        sections: [
          {
            title: '가이드라인은 위키에, 발표도 위키에서.',
            body: 'Markdown 위키에 라벨링 기준과 엣지 케이스를 정리합니다. LaTeX 수식, Mermaid 다이어그램, 그리드 임베드를 지원하고 미리보기·Markdown·비주얼 3가지 모드로 편집합니다. --- 로 나누면 슬라이드가 되고, 펜·레이저·발표자 보기로 바로 발표합니다. 공개 링크로 외부에 공유할 수도 있습니다.',
          },
          {
            title: '파일은 Drive처럼, 보기는 앱처럼.',
            body: '폴더를 만들고, 드래그로 선택해 복사·이동·휴지통으로 보냅니다. 이미지·영상·PDF·CSV·Parquet·JSON·포인트클라우드·3D 모델은 전용 뷰어로, zip/tar는 압축을 풀지 않고 내부를 탐색합니다. 코드·JSON·헥스·이미지·Draw.io 편집기로 그 자리에서 수정합니다.',
          },
          {
            title: '영상은 라이브러리로.',
            body: 'HLS로 인코딩해 어디서든 끊김 없이 재생하고, 자막(ASS·SRT·VTT)과 챕터를 달고, 360°·VR 영상까지 재생합니다. 휴대폰으로 촬영과 동시에 업로드하는 라이브 업로드와 공개 링크도 지원합니다.',
          },
        ],
        specs: {
          rows: [
            [
              '위키',
              'Markdown · LaTeX · Mermaid · 3모드 에디터 · 슬라이드 발표 · 공개 링크',
            ],
            [
              '파일',
              'Drive 스타일 탐색 · 휴지통/실행 취소 · 타입별 뷰어 · 아카이브 탐색 · 편집기',
            ],
            [
              '동영상',
              'HLS · AES-128 암호화 · 자막 편집기 · 챕터 · 360°/VR · 라이브 업로드',
            ],
            ['멤버', '역할 기반 권한 · 이메일/링크 초대'],
          ],
        },
      },

      developers: {
        title: '한 줄로 설치하는 CLI, 두 줄로 연동하는 MLflow.',
        intro:
          '단일 실행 파일 CLI로 파일·데이터셋·에이전트를 스크립트하고, 프로젝트 액세스 토큰으로 MLflow 추적과 레지스트리에 연동됩니다. 설치형 소프트웨어에는 오프라인 검증 가능한 제품키를 발급합니다.',
        sections: [
          {
            title: '범위를 정해 발급하는 액세스 토큰.',
            body: '토큰마다 실험·모델 레지스트리 읽기/쓰기, 컨테이너 레지스트리 풀/푸시 범위와 만료일을 정합니다. 원문은 생성 직후 단 한 번만 표시되고 서버에는 해시만 남습니다. 유출이 의심되면 회전 한 번으로 교체됩니다.',
          },
          {
            title: 'CLI는 실행 파일 하나.',
            body: 'Node.js 없이 curl 한 줄로 설치하고, 이후 새 배포에 맞춰 자동으로 업데이트됩니다. cvp login으로 브라우저 인증을 마치면 cvp files, cvp dataset, cvp agent 명령을 --json 출력과 함께 스크립트에서 사용합니다. 에이전트는 sudo cvp service install 로 systemd 서비스가 됩니다.',
          },
          {
            title: '제품키는 발급부터 오프라인 검증까지.',
            body: '정책(기간·머신 수·기능)을 정의하고 고객별 키를 발급합니다. 라이선스 파일은 Ed25519로 서명되어, 설치형 소프트웨어는 내장한 공개키만으로 네트워크 없이 검증합니다. 머신 활성화 현황과 만료 전략(제한/차단)도 대시보드에서 관리합니다.',
          },
        ],
        specs: {
          rows: [
            [
              '액세스 토큰',
              '범위 기반 권한 · 만료일 · 회전/폐기 · 원문 1회 노출(해시 저장)',
            ],
            [
              'CLI',
              'Linux · macOS · Windows 단일 실행 파일 · 자동 업데이트 · 개인 토큰(cvp_pat_)',
            ],
            [
              '제품키',
              '정책 · 발급/일시중지/취소 · 머신 활성화 · Ed25519 오프라인 검증',
            ],
            ['연동', 'MLflow 트래킹 URI · 컨테이너/pip/npm 레지스트리'],
          ],
        },
      },

      agents: {
        title: '내 장비에서 실행되는 CVP의 손발, 에이전트.',
        intro:
          '머신마다 에이전트를 하나 설치하고, 웹에서 앱을 활성화하면 에이전트가 이를 자식 프로세스로 실행하고 감시합니다. AI 추론·학습부터 Modbus 설비 연동, 영상 변환까지 — 무거운 일은 내 장비에서.',
        sections: [
          {
            title: '에이전트 하나, 앱 여러 개.',
            body: 'RF-DETR, SAM2, Pointcept, 시계열 예측, Modbus 모니터·시뮬레이터, 동영상 다운로드·변환, 수집기 시뮬레이터 — 앱을 인스턴스로 추가하고 실행 인자를 지정하면 준비가 끝납니다. 인스턴스를 여러 개 두면 요청이 유휴 인스턴스로 분배됩니다.',
          },
          {
            title: '공장 설비와 바로 이어집니다.',
            body: 'Modbus 모니터는 PLC 레지스터를 읽고, 시뮬레이터는 Modbus TCP 서버가 되어 값을 제공합니다. 레지스터는 메모리 맵에 미러되어 디지털 트윈과 그리드로 이어지고, 통신 히스토리에는 읽기·쓰기·예외가 모두 남습니다.',
          },
          {
            title: '자원은 한도로, 상태는 그래프로.',
            body: '앱마다 메모리·CPU·GPU·프로세스 수 한도를 정하면 cgroup으로 강제합니다. CPU·메모리·GPU·네트워크를 실시간 차트로 보고, 에이전트에 쌓인 로컬 시계열을 PromQL로 조회합니다.',
          },
        ],
        specs: {
          rows: [
            ['설치', 'curl 한 줄 · systemd 서비스 등록 · 자동 업데이트'],
            [
              '앱',
              'RF-DETR · SAM2 · Pointcept · 시계열 · Modbus · 다운로더 · 변환기 · 수집기',
            ],
            ['자원 한도', '메모리 · CPU · GPU 마스크 · 프로세스 수 (cgroup v2)'],
            ['모니터링', '리소스 차트 · PromQL 메트릭 · 로그 · 상태 그래프'],
          ],
        },
      },

      collectors: {
        title: '현장의 카메라와 센서를, 빠짐없이.',
        intro:
          '에이전트가 영상·이미지·포인트클라우드·프로파일·시계열·레코드·파일 7종 데이터를 세그먼트로 받아 로컬 디스크에 쌓고, 필요한 구간만 클라우드로 업로드합니다. 타임라인에서 여러 스트림을 같은 시각에 맞춰 재생합니다.',
        sections: [
          {
            title: '여러 스트림을 한 타임라인에.',
            body: '수집기마다 가용성 막대가 클라우드에 있는 구간, 에이전트에만 있는 구간, 정리된 구간을 색으로 구분합니다. 트랙을 골라 펼치면 같은 재생 위치로 뷰어가 함께 움직이고, 막대를 드래그해 중요한 구간을 핀으로 고정합니다.',
          },
          {
            title: '데이터 종류마다 맞는 뷰어.',
            body: '영상은 실시간 플레이어로, 이미지는 프레임 스트립과 밝기 분포로, 프로파일은 단면 그래프와 높이맵으로, 포인트클라우드는 3D로, 시계열은 롤업 그래프와 표로, 레코드는 JSON 행으로 봅니다.',
          },
          {
            title: '예산 안에서, 정책대로.',
            body: '에이전트마다 CPU·메모리·로컬 디스크 예산을 두고, 이를 초과하면 수집기를 대기시킵니다. 스트림별로 로컬·클라우드 보존 기간과 용량 상한, 업로드 조건(전체·열람한 구간·핀·끄기)을 정합니다.',
          },
        ],
        specs: {
          rows: [
            [
              '페이로드',
              '영상 · 이미지 · 프로파일 · 포인트 클라우드 · 시계열 · 레코드 · 파일',
            ],
            [
              '저장',
              '에이전트 로컬 디스크 + 프로젝트 클라우드 · 스트림별 보존 정책 · 핀',
            ],
            ['보기', '라이브 · 기록 · 타임라인(최대 4개 동시) · 가용성 막대'],
            [
              '현황',
              '현재는 수집기 시뮬레이터 제공 — CCTV · GigE · 3D 센서 · Modbus · HTTP · 파일 와처 순차 추가',
            ],
          ],
        },
      },

      twin: {
        title: '공장을 3D로 놓고, 실시간 값으로 움직입니다.',
        intro:
          '110종이 넘는 파라메트릭 설비 에셋으로 씬을 만들고, Modbus 레지스터·메모리 리전·그리드 값에 바인딩합니다. 실시간으로 보고, 기록을 되감고, 가정 시나리오로 시뮬레이션하고, 1인칭이나 VR로 현장에 들어갑니다.',
        sections: [
          {
            title: '카탈로그에서 골라 배치하는 공장.',
            body: '로봇 암·협동로봇·스카라, 벨트·롤러 컨베이어, 겐트리 용접 시스템과 포지셔너, CNC·사출기·프레스, AGV·지게차, 배관·밸브·펌프, 작업자까지. 축 각도와 엔드 이펙터 같은 파라미터로 모양이 바뀌고, GLB 모델과 DXF 평면도도 가져옵니다.',
          },
          {
            title: '값이 들어오면 설비가 반응합니다.',
            body: '노드 채널을 Modbus 레지스터, 그리드 셀, 메모리 리전, 동영상에 바인딩하고 경고·알람 임계값을 정하면 설비가 상태 색으로 빛납니다. 실시간·리플레이·What-if 시뮬레이션 세 모드로 같은 씬을 봅니다.',
          },
          {
            title: '화면 밖으로, 현장 안으로.',
            body: '현장 들어가기로 WASD 1인칭 이동을 하거나, WebXR 헤드셋으로 들어가 텔레포트하고 손목 패널로 알람을 확인합니다. 디스플레이 패널과 비디오 월에는 라이브러리의 영상이 재생됩니다.',
          },
        ],
        specs: {
          rows: [
            [
              '에셋',
              '110여 종 파라메트릭 빌더 · 사람 4종 · 환경(하늘 · 지면 · 공장동) · GLB 가져오기',
            ],
            [
              '바인딩',
              'Modbus 레지스터 · 그리드 셀/행 · 지도 피처 · 메모리 리전 · 동영상',
            ],
            ['모드', '실시간 · 리플레이(기록) · What-if 시뮬레이션'],
            ['몰입', '1인칭 · WebXR VR · 텔레포트 · 뷰 프리셋 · 씬 카메라'],
          ],
        },
      },

      mlflow: {
        title: '라벨링한 데이터가 모델이 되는 길.',
        intro:
          'MLflow 호환 실험 추적과 모델 레지스트리, 아티팩트 저장소를 프로젝트에 내장합니다. 훈련 위저드의 실행도, 기존 MLflow 클라이언트 코드의 실행도 같은 곳에 기록됩니다.',
        sections: [
          {
            title: 'MLflow 클라이언트 그대로.',
            body: 'tracking URI를 프로젝트 주소로 바꾸고 액세스 토큰만 넣으면 기존 학습 스크립트가 그대로 동작합니다. 실행을 검색하고, 메트릭·파라미터 열을 골라 표로 비교하고, 선택한 실행을 차트로 겹쳐 봅니다.',
          },
          {
            title: '레지스트리에서 배포까지.',
            body: '검증된 모델을 레지스트리에 등록하고 버전·별칭·스테이지(Staging·Production·Archived)를 관리합니다. 개요 탭은 수집 → 라벨링 → 학습 → 레지스트리 → 배포 → 모니터링 파이프라인을 한눈에 보여줍니다.',
          },
        ],
        specs: {
          rows: [
            ['추적', 'MLflow 호환 실험 · 실행 · 메트릭 · 파라미터 · 태그 · 비교'],
            ['레지스트리', '모델 버전 · 별칭 · 스테이지'],
            ['아티팩트', '프로젝트 스토리지 저장 · 파일 브라우저'],
            ['인증', '프로젝트 액세스 토큰 (실험 · 모델 레지스트리 범위)'],
          ],
        },
      },

      graphs: {
        title: '블루프린트처럼 잇는 비전 파이프라인.',
        intro:
          '언리얼 블루프린트 스타일의 비주얼 스크립팅입니다. 이벤트, 제어 흐름, 수학, 그리고 컴퓨터 비전(CVP) 노드를 exec 핀으로 이어 파이프라인을 만들고, 실행 로그로 결과를 바로 확인합니다.',
        sections: [
          {
            title: '이벤트에서 시작하는 실행 흐름.',
            body: '시작 이벤트에서 출발한 실행 흐름이 분기·For 루프 같은 제어 노드를 지나 이미지 로드 → 에이전트 모델 실행(RF-DETR) → 어노테이션 저장으로 이어집니다. 실행 중인 노드는 노랗게 빛나고, 하단 로그 패널에 출력이 쌓입니다.',
          },
          {
            title: '팔레트에서 배치하고, 인스펙터로 다듬고.',
            body: '카테고리별 노드 팔레트에서 검색해 드래그로 추가하고, 인스펙터에서 라벨과 입력 값을 조정합니다. 그래프는 자동 저장되고 템플릿으로 만들어 재사용할 수 있습니다. 브라우저 실행은 무료입니다.',
          },
        ],
        specs: {
          rows: [
            [
              '노드',
              '이벤트 · 제어 흐름 · 변수 · 수학 · 비교 · 논리 · 문자열 · 배열 · 디버그 · 유틸리티 · CVP(비전)',
            ],
            [
              '실행',
              'exec 핀 흐름 · 실행 로그 · 실행 중 노드 하이라이트 · 진입점 선택',
            ],
            ['편집', '팔레트 검색 · 인스펙터 · 자동 저장 · 템플릿'],
          ],
        },
      },

      grids: {
        title: '프로젝트 데이터를 위한 스프레드시트형 DB.',
        intro:
          '타입 있는 컬럼으로 테이블을 만들고 그리드·갤러리·칸반·캘린더·타임라인·폼·설문 7가지 보기로 봅니다. 장비 목록, 검수 체크리스트, 현장 설문 — 스프레드시트로 하던 일을 프로젝트 안으로.',
        sections: [
          {
            title: '같은 데이터, 7가지 보기.',
            body: '필터·정렬·그룹·색상 규칙을 저장한 그리드 보기부터, 선택 컬럼으로 묶는 칸반, 날짜 컬럼으로 펼치는 캘린더와 타임라인까지 보기만 바꿔 사용합니다. CSV로 가져오고 내보냅니다.',
          },
          {
            title: '폼과 설문으로 받는 데이터.',
            body: '폼 디자이너로 입력 화면을 꾸미고, 설문 보기로 한 문항씩 넘기는 응답 화면을 만듭니다. 공개 링크를 공유하면 로그인 없이 응답이 새 행으로 쌓입니다.',
          },
          {
            title: '관계와 규칙까지.',
            body: '다른 그리드의 행을 참조하는 컬럼, 값 중복을 막는 유니크 컬럼, 사람·첨부·링크 컬럼을 지원합니다. 확정된 시트는 잠가 읽기 전용으로 두고, 위키 문서에 그리드를 임베드합니다.',
          },
        ],
        specs: {
          rows: [
            [
              '컬럼',
              '텍스트 · 숫자 · 날짜 · 불리언 · 선택 · 사람 · 링크 · 첨부 · 참조',
            ],
            ['보기', '그리드 · 갤러리 · 칸반 · 캘린더 · 타임라인 · 폼 · 설문'],
            ['규칙', '필터 · 정렬 · 그룹 · 색상 · 유니크 · 시트 잠금'],
            ['공유', '폼/설문 공개 링크 · CSV 가져오기/내보내기 · 위키 임베드'],
          ],
        },
      },

      maps: {
        title: '비전 데이터에 위치를 더하다.',
        intro:
          '드론 측량, 시설 점검, 현장 카메라 배치 — 위치가 중요한 프로젝트를 위해 지도 위에 레이어와 피처를 그리고 관리합니다.',
        sections: [
          {
            title: '자체 서빙 베이스맵.',
            body: 'PMTiles 기반 베이스맵을 플랫폼이 직접 서빙해 외부 지도 API 키 없이 동작합니다. 레이어를 겹치고 켜고 끄며 프로젝트의 공간 데이터를 구성합니다.',
          },
          {
            title: '그리는 대로 GeoJSON.',
            body: '점·선·다각형 드로잉 도구로 피처를 그리면 GeoJSON으로 저장됩니다. 카메라 위치, 점검 구역, 비행 경로를 데이터로 남기고, 디지털 트윈 노드에 피처를 바인딩합니다.',
          },
        ],
        specs: {
          rows: [
            ['베이스맵', 'PMTiles 자체 서빙 · MapLibre 렌더링'],
            ['피처', 'GeoJSON 점 · 선 · 다각형 · 라벨'],
            ['레이어', '색상 · 표시/숨김 · 이름 변경'],
            ['연동', '디지털 트윈 지도 피처 바인딩'],
          ],
        },
      },

      meetings: {
        title: '회의하고, 녹음하고, 회의록은 위키로.',
        intro:
          '프로젝트 안에서 바로 화상 회의를 열고, 녹음은 전사와 요약을 거쳐 위키 페이지로 발행됩니다. 라벨링 기준을 정한 회의가 그대로 팀 문서가 됩니다.',
        sections: [
          {
            title: '링크 하나로 여는 화상 회의.',
            body: '회의 시작을 누르면 회의실이 열리고, 초대 링크와 게스트 비밀번호로 외부 참가자도 참여할 수 있습니다. 화면 공유, 손들기, 반응, 채팅, 참가자 관리를 지원하고, 회의 녹음을 켜면 회의 종료 후 AI 회의록이 발행됩니다.',
          },
          {
            title: '녹음에서 위키까지 자동으로.',
            body: '브라우저에서 마이크나 탭 오디오를 녹음하면 Whisper가 전사하고 LLM이 결정과 액션 아이템을 요약해 위키 페이지로 발행합니다. 단계별 진단으로 어느 단계에서 중단되었는지도 확인할 수 있습니다.',
          },
        ],
        specs: {
          rows: [
            ['화상 회의', 'WebRTC · 화면 공유 · 게스트 링크/비밀번호 · 녹음'],
            ['전사', 'Whisper large-v3-turbo'],
            ['요약', 'LLM 요약 · 위키 자동 발행'],
            ['비용', '녹음 1 MiB당 1 토큰(최소 2) + 요약 1 토큰'],
          ],
        },
      },

      signatures: {
        title: '결재선을 그리고, 서명은 원장에 남깁니다.',
        intro:
          '문서를 기안하고 결재·합의·참조 단계를 정해 상신하면, 서명자가 차례로 서명하거나 반려합니다. 모든 서명은 해시 체인 원장에 남아 위변조를 검증할 수 있습니다.',
        sections: [
          {
            title: '익숙한 결재란 그대로.',
            body: '단계마다 결재·합의·참조 유형과 전원 서명/1인 서명 규칙을 정합니다. 자주 사용하는 결재선은 프리셋으로 저장하고, 서명은 직접 그리거나 PNG로 등록한 이미지로 날인합니다. 인쇄용 서명 기록까지 한 번에 출력됩니다.',
          },
          {
            title: '위변조는 원장이 막습니다.',
            body: '서명 레코드마다 문서 해시와 이전 레코드 해시가 이어진 체인을 만듭니다. 무결성 검증을 누르면 모든 서명이 원본과 일치하는지 즉시 확인합니다.',
          },
        ],
        specs: {
          rows: [
            ['결재선', '결재 · 합의 · 참조 · 단계 · 전원/1인 서명 · 프리셋'],
            ['상태', '초안 · 진행 중 · 완료 · 반려 · 회수'],
            ['서명', '직접 그리기 · 이미지 업로드 · 의견'],
            ['검증', '해시 체인 원장 · 무결성 검증 · 인쇄'],
          ],
        },
      },

      memory: {
        title: 'PLC 레지스터처럼 사용하는 공유 메모리.',
        intro:
          '바이트 단위로 주소가 매겨진 메모리 맵에 설비 값을 모읍니다. 헥스로 보고, 타입 배열로 읽고, 리전으로 이름을 붙여 Modbus와 디지털 트윈 사이의 데이터 버스로 사용합니다.',
        sections: [
          {
            title: '헥스, 타입 배열, 리전.',
            body: '4 KiB 페이지 단위 헥스 에디터로 바이트를 보고 고칩니다. 같은 영역을 u8부터 f64까지, 리틀/빅 엔디안으로 해석하고, 자주 보는 범위는 리전으로 이름 붙여 값만 봅니다.',
          },
          {
            title: 'Modbus와 트윈을 잇는 버스.',
            body: 'Modbus 커넥터가 레지스터를 메모리 맵에 미러하면 영역마다 리전이 자동으로 생성됩니다. 시뮬레이터에서는 맵에서 수정한 값이 레지스터에 기록되고, 디지털 트윈은 리전 원소에 바인딩해 값을 읽습니다.',
          },
        ],
        specs: {
          rows: [
            ['보기', '헥스(4 KiB 페이지) · 타입 배열 · 리전'],
            [
              '타입',
              'u8 · i8 · u16 · i16 · u32 · i32 · u64 · i64 · f32 · f64 · 리틀/빅 엔디안',
            ],
            [
              '연동',
              'Modbus 미러(모니터 단방향 · 시뮬레이터 양방향) · 디지털 트윈 바인딩',
            ],
          ],
        },
      },

      registry: {
        title: '이미지, 차트, 패키지를 프로젝트 곁에.',
        intro:
          'Docker/OCI 이미지, Helm 차트, pip 패키지, npm 패키지를 프로젝트 레지스트리에 업로드합니다. 에이전트가 사용하는 추론 이미지와 사내 라이브러리를 데이터 옆에 둡니다.',
        sections: [
          {
            title: '기존 클라이언트 그대로.',
            body: 'docker push, helm push oci://, twine upload, npm publish — 표준 클라이언트에 프로젝트 액세스 토큰으로 로그인하면 바로 사용할 수 있습니다. 대용량 이미지는 청크 단위로 업로드됩니다.',
          },
          {
            title: 'CUDA별로 나누는 pip 채널.',
            body: 'pip 인덱스는 채널로 나눌 수 있어 cu121, cu130 같은 빌드별 휠을 따로 둡니다. 저장소 탭에서 블롭 용량과 회수 가능한 공간을 보고 정리합니다.',
          },
        ],
        specs: {
          rows: [
            ['Docker/OCI', '푸시 · 풀 · 태그 · 매니페스트 · 스토리지 정리'],
            ['Helm', 'OCI 차트'],
            ['pip', 'PEP 503/691 인덱스 · 채널 · twine 업로드'],
            ['npm', 'publish · 버전 · dist-tag'],
          ],
        },
      },

      apps: {
        title: '라벨링 전후의 부수 작업을 위한 브라우저 유틸리티.',
        intro:
          '카메라 화각 계산부터 캘리브레이션, 바코드 인식, JSON 포맷터, WiFi QR까지 — 40종 넘는 앱이 프로젝트 안에 들어 있습니다. 모든 계산은 브라우저 안에서 수행되어 데이터가 밖으로 나가지 않습니다.',
        sections: [
          {
            title: '광학 계산기부터 개발 도구까지.',
            body: 'FOV 계산기, 렌즈 추천, 피사계 심도 같은 광학 도구, 캘리브레이션·왜곡 보정·임계값·모폴로지 같은 비전 도구, HTTP 클라이언트·JWT 뷰어·해시·AES 같은 개발 도구, HWP·Draw.io 편집기, 그리고 쉬는 시간의 2048과 지뢰찾기까지.',
          },
          {
            title: '파일에서 바로 열립니다.',
            body: '파일 페이지의 "다른 앱으로 열기"로 이미지와 데이터를 알맞은 앱에 즉시 전달합니다. 확장자마다 기본 앱을 정해 두면 두 번 클릭으로 열립니다.',
          },
        ],
        specs: {
          rows: [
            [
              '비전',
              'FOV · 렌즈 추천 · DOF · 원근 보정 · 캘리브레이션 · 왜곡 보정 · 바코드/QR · 3D 모델러',
            ],
            [
              '유틸리티',
              '코드 에디터 · HTTP 클라이언트 · JWT · 해시 · AES · WiFi QR · HWP · Draw.io',
            ],
            ['개인정보', '모든 계산은 브라우저 안에서 — 외부 전송 없음'],
          ],
        },
      },

      store: {
        title: '잘 만든 위키, 그리드, 데이터셋을 사고팝니다.',
        intro:
          '프로젝트에서 만든 위키·그리드·데이터셋을 스토어에 발행하고, 다른 팀이 만든 콘텐츠를 설치합니다. 가격은 토큰으로 매기며, 설치는 대상 프로젝트를 선택하면 완료됩니다.',
        sections: [
          {
            title: '둘러보고, 미리 보고, 설치합니다.',
            body: '종류·인기·평점으로 찾고, 포함된 콘텐츠와 미리보기를 확인한 뒤 설치합니다. CVP 공식 콘텐츠에는 공식 배지가 부여되고, 버전 기록과 평점·코멘트가 남습니다.',
          },
          {
            title: '내 콘텐츠를 발행합니다.',
            body: '소스 프로젝트와 아이템을 선택하고 가격(0이면 무료)과 공개 여부를 정해 발행합니다. 그리드는 컬럼만 또는 행 데이터까지 담을 수 있고, 새 버전을 이어서 발행합니다.',
          },
        ],
        specs: {
          rows: [
            ['종류', '위키 · 그리드 · 데이터셋'],
            ['가격', '무료 또는 토큰 — 대상 프로젝트에서 차감'],
            ['신뢰', '공식 배지 · 평점 · 코멘트 · 버전 기록'],
          ],
        },
      },
    },
  },

  en: {
    featurePage: {
      labelingKicker: 'Labeling',
      platformKicker: 'Platform',
      specsTitle: 'Specs',
      relatedTitle: 'See also',
      ctaTitle: 'The fastest way to judge it is to draw',
      ctaDescription: 'The free plan needs no credit card.',
      moreKicker: 'More',
      statusAvailable: 'Available',
      statusInDevelopment: 'In development',
      developmentNote:
        'This feature is built and in field validation. Details may change before general availability.',
    },

    labelingTools: {
      kicker: 'For any type of annotation',
      title: 'Packed with advanced labeling tools.',
      aiBadge: 'AI',
      footnote: 'Every tool has a shortcut, so your mouse never leaves the canvas.',
      subtitles: {
        images:
          'From detection to instance segmentation — pixel-accurate tools one shortcut away, with AI drafting the first pass.',
        videos:
          'The same shape tools, on a timeline. Set keyframes and the frames between interpolate; the magic wand and auto-label work on the frame on screen.',
        pointClouds:
          'Cuboid, segment, and measuring tools for scenes with millions of points — plus Pointcept AI labeling.',
        timeSeries:
          'Mark ranges and events on long signals, classify fixed windows, and review the anomalies AI finds.',
      },
      tools: {
        rectangle: {
          name: 'Rectangle',
          desc: 'Bounding boxes for object detection, in one drag.',
        },
        rotatedRectangle: {
          name: 'Rotated box',
          desc: 'Oriented boxes that fit tilted objects.',
        },
        ellipse: {name: 'Ellipse', desc: 'Ellipses around round objects.'},
        polygon: {
          name: 'Polygon',
          desc: 'Vertex-by-vertex masks. Shift+click cuts holes.',
        },
        polyline: {name: 'Polyline', desc: 'Open lines for lanes and paths.'},
        point: {name: 'Point', desc: 'A single coordinate.'},
        keypoint: {
          name: 'Keypoints',
          desc: 'Joints and landmarks from skeleton presets.',
        },
        brush: {name: 'Brush', desc: 'Pixel-level masks. Resize with [ and ].'},
        eraser: {name: 'Eraser', desc: 'Refine painted masks.'},
        magicWand: {
          name: 'Magic wand',
          desc: 'One click, SAM segments the object. Token-free with a SAM2 agent.',
        },
        autoLabel: {
          name: 'Auto-label',
          desc: 'An RF-DETR agent drafts boxes, masks, and keypoints for you to review.',
        },
        cuboid: {name: 'Cuboid', desc: '3D boxes with move, rotate, and scale gizmos.'},
        point3d: {name: '3D point', desc: 'A single point on the cloud.'},
        polyline3d: {name: '3D polyline', desc: 'Polylines through 3D space.'},
        polygon3d: {name: '3D polygon', desc: 'Planar regions in 3D.'},
        keypoint3d: {name: '3D keypoints', desc: '3D skeleton keypoints.'},
        segmentLasso: {
          name: 'Lasso segment',
          desc: 'Paint points into instances with a lasso — surface or through.',
        },
        segmentRect: {
          name: 'Rect segment',
          desc: 'Select points with a rectangle. Shift+drag erases.',
        },
        dimension: {name: 'Dimension', desc: 'Aligned, axis, and angle dimensions.'},
        guide: {name: 'Guide', desc: 'Snap to X/Y/Z or free guide lines.'},
        autoLabel3d: {
          name: 'Pointcept AI labeling',
          desc: 'A Pointcept agent segments the whole scene, semantic or instance.',
        },
        range: {name: 'Range', desc: 'Drag a start–end label, optionally per channel.'},
        event: {name: 'Event', desc: 'Flag an instant at a single point in time.'},
        timeZoom: {name: 'Zoom', desc: 'Drag to zoom in; double-click to reset.'},
        windowClassify: {
          name: 'Window classify',
          desc: 'Flip through fixed windows as cards and classify with number keys.',
        },
        aiSuggest: {
          name: 'AI suggestions',
          desc: 'Candidate ranges from Chronos-Bolt anomaly scores.',
        },
      },
    },

    pages: {
      images: {
        title: 'Image labeling where AI draws the first pass.',
        intro:
          'Move between 13 tools with shortcuts, get drafts from the magic wand and auto-label, and finish review on the same screen.',
        sections: [
          {
            title: 'Thirteen tools, all on shortcuts.',
            body: 'Rectangle (R), rotated box (O), ellipse (E), polygon (G), polyline (L), point (P), keypoints (K), brush (B) and eraser (X), magic wand (W), comment (C) — every tool has a shortcut and a hover card that explains it. When a polygon has too many vertices, Shift+S simplifies or straightens it.',
          },
          {
            title: 'AI drafts, people decide.',
            body: 'Press Auto-label (A) and a connected RF-DETR agent proposes boxes, masks, and keypoints. Map model classes to project classes, skip results that overlap existing objects (IoU ≥ 0.7), and apply only what you pick. It runs on your GPU, so no tokens are spent.',
          },
          {
            title: 'Keypoints come from skeleton presets.',
            body: 'Start from person, hand, face, or animal templates, or define your own skeleton by placing joints and connecting bones. Auto-labeled keypoints are reordered to the class skeleton too.',
          },
          {
            title: 'Review lives inside the editor.',
            body: 'Check open comments in the issues tab and click pins on the canvas to answer feedback at the exact spot. No context switching between labeling and QA.',
          },
        ],
        specs: {
          rows: [
            [
              'Shape types',
              'Rectangle · rotated box · polygon (with holes) · polyline · point · ellipse · brush mask · keypoints · classification',
            ],
            [
              'AI assist',
              'Magic wand (free with SAM2 agent / cloud tokens) · RF-DETR auto-label · polygon cleanup',
            ],
            ['Status workflow', 'Unlabeled → in progress → labeled → reviewed'],
            ['Editing', 'Undo/redo · vertex editing · grid · minimap · raw JSON view'],
            [
              'Performance',
              'Bitmap-cached rendering · neighbor prefetch · image LRU cache',
            ],
          ],
        },
      },

      videos: {
        title: 'Set keyframes; interpolation fills the rest.',
        intro:
          'Tracks and keyframes sit on an always-visible timeline. Every shape type supports tracks, and frames between keyframes are interpolated automatically.',
        sections: [
          {
            title: 'The timeline is always there.',
            body: 'A ruler, playhead, and per-track keyframe diamonds dock at the bottom of the editor. Zoom with the wheel, pan with Shift+wheel, and jump with a frame number or first/previous/next/last.',
          },
          {
            title: 'Join, split, and merge tracks.',
            body: 'Polygons, keypoints, and polylines all carry keyframes and interpolate. When an object reappears after occlusion, append it to its track; when two got merged by mistake, detach. Clone previous (Ctrl+Shift+V) and per-frame auto-label cut the repetition.',
          },
          {
            title: 'From upload to playback, one place.',
            body: 'The video library manages raw and HLS streaming assets side by side. Encrypt sensitive footage with AES-128, add subtitles and chapters, and organize clips into playlists for the team.',
          },
        ],
        specs: {
          rows: [
            [
              'Timeline',
              'Ruler · playhead · track rows · keyframe diamonds · tag range bars',
            ],
            ['Tracks', 'Automatic interpolation · merge · append · detach'],
            ['Input', 'MP4 · WebM · MOV · MKV and more'],
            ['Export', 'MOT · CVAT · COCO · CVP'],
          ],
        },
      },

      pointClouds: {
        title: 'Millions of points, labeled in the browser.',
        intro:
          'Upload PLY, PCD, LAS/LAZ, ASCII, or NumPy and it opens instantly with GPU rendering. Work in perspective plus top/front/side views, label with cuboids and point segments, and let Pointcept paint the scene first.',
        sections: [
          {
            title: 'Four viewpoints on one scene.',
            body: 'Top (BEV), front, and side orthographic views stack beside the perspective view. Refine cuboids with move (T), rotate (R), and scale (S) gizmos, then fit-to-points (F) or snap-to-ground (Shift+F). Measure with dimensions and guides; color by RGB, label, height, intensity, or texture.',
          },
          {
            title: 'Pointcept paints the whole scene first.',
            body: 'Press Auto-label (A) and a Pointcept agent runs PTv3 semantic or PointGroup instance segmentation and paints the result as 3D segments. Models fine-tuned on this dataset map classes automatically; choose to add to or replace existing segments. One undo reverts it.',
          },
          {
            title: 'Auto-segmentation, no model needed.',
            body: 'Filter invalid (0,0,0) points, remove dominant planes like floors and tables with RANSAC, then cluster the rest into instances on a voxel grid — all in the browser, no GPU required.',
          },
          {
            title: 'Your formats and label fields, as-is.',
            body: 'LAS/LAZ decodes in-browser via WASM, and a same-name image becomes the texture. Label fields like classification or instance in PLY are detected from their values as semantic or instance, and Pointcept scene folders and profile stacks upload folder-by-folder.',
          },
        ],
        specs: {
          rows: [
            [
              'Input formats',
              'PLY · PCD · LAS/LAZ · ASCII (.txt .csv .xyz) · NumPy (.npy) · Pointcept scene folders · profile stacks',
            ],
            [
              'Tools',
              'Cuboid · lasso/rect segment · 3D point/polyline/polygon/keypoints · dimension · guide',
            ],
            ['AI', 'Pointcept PTv3 semantic · PointGroup instance · fine-tuned models'],
            ['Color modes', 'RGB · label · height · intensity · texture'],
            ['Export', 'Pointcept (.npy) · labeled PLY · SemanticKITTI · TXT'],
          ],
        },
      },

      timeSeries: {
        title: 'Labels for sensor signals, too. Time-series labeling.',
        intro:
          'Upload multichannel signals like vibration, current, and temperature, then mark normal, anomaly, and downtime ranges and instant events. AI suggests anomalies first, and your labels become training data for forecasting and classification.',
        sections: [
          {
            title: 'Any table — just set column roles.',
            body: 'Upload CSV, Parquet, or JSON Lines in wide or long layout, and timestamps, series IDs, targets, and covariates are inferred. Confirm the roles, pick a time zone and resampling, and each series becomes one Parquet sample.',
          },
          {
            title: 'Overlaid, stacked, or as a table.',
            body: 'Overlay every channel normalized, stack one row per channel, or read the raw values as a table. Drag inside a stacked row to make a label that applies to that channel only. Track lanes and an overview minimap keep you oriented on long series.',
          },
          {
            title: 'AI finds, people accept.',
            body: 'A time-series agent scores anomalies with Chronos-Bolt and proposes them as dashed ranges to accept or dismiss. In windows mode, flip through fixed-length windows as cards and classify with number keys — AI classify surfaces only the windows it is unsure about.',
          },
        ],
        specs: {
          rows: [
            [
              'Input',
              'CSV · Parquet · JSON Lines (wide / long) · up to 64 channels · 5M rows',
            ],
            [
              'Labels',
              'Ranges · events · windows · channel-limited labels · classification',
            ],
            [
              'Views',
              'Overlaid (per-channel normalize) · stacked · table · windows mode',
            ],
            [
              'AI',
              'Chronos-Bolt anomaly scores · MiniRocket window classify · AutoGluon training',
            ],
            ['Export', 'CVP · CSV'],
          ],
        },
      },

      datasets: {
        title: 'Images, video, 3D, and time series — datasets in one project.',
        intro:
          'Every dataset has a type, and the right upload checks, editor, and tools follow. Upload with a wizard, check quality with QA stats, and export to standard formats.',
        sections: [
          {
            title: 'Uploads, step by step.',
            body: 'Pick YOLO, COCO, Pascal VOC, LabelMe, or CVP and the wizard asks for each folder or file in its own slot. Contents are checked in the browser before upload and reported at four levels (fatal, error, warning, info), and train/val/test splits are kept as sample tags.',
          },
          {
            title: 'Sample management with visible progress.',
            body: 'Every sample is unlabeled, in progress, labeled, or reviewed, with labels overlaid on thumbnails. Change status in bulk; point clouds preview as top-down thumbnails and time series as sparklines.',
          },
          {
            title: 'Find the gaps with QA stats.',
            body: 'Class distribution, class co-occurrence heatmap, objects per sample, object size distribution, and tag usage on one tab — know which classes are short and which tags go unused before you train.',
          },
        ],
        specs: {
          rows: [
            ['Dataset types', 'Image · video · point cloud · time series'],
            [
              'Import',
              'YOLO · COCO · Pascal VOC · LabelMe · CVP · media only · 7 point-cloud kinds · time-series tables',
            ],
            [
              'Export',
              'COCO · YOLO · VOC · LabelMe · CVAT · MOT · CSV · ImageFolder · CVP (background zip)',
            ],
            [
              'QA',
              'Class distribution · co-occurrence · object count/size · tag usage · time-range stats',
            ],
            ['Start', 'Clone public datasets (COCO128, UCI Occupancy, and more)'],
          ],
        },
      },

      training: {
        title: 'Labels become models, and models draw labels again.',
        intro:
          'Configure an experiment in an 11-step training wizard, your GPU agent trains it, and the finished model goes straight to inference and auto-labeling. Every run lands in MLflow-compatible tracking.',
        sections: [
          {
            title: 'Inference on your own GPU.',
            body: 'Turn on RF-DETR (detection, segmentation, keypoints), SAM2, Pointcept, or time-series forecasting on an agent and run inference right from the project. Weights are downloaded explicitly, and requests go to an idle instance. No cloud tokens involved.',
          },
          {
            title: 'Every run keeps its curves and results.',
            body: 'Per-epoch progress, loss and mAP curves, and logs pile up in the runs table. A finished run links straight into its app with "Use for inference", and time-series experiments show backtest results and a model leaderboard.',
          },
          {
            title: 'What the wizard walks you through.',
            body: 'Task → framework → model → training data → classes → train/val → hyperparameters → evaluation → export → GPU → train. Three image tasks, 3D instance segmentation, and time-series forecasting, anomaly detection, and classification share the same flow.',
          },
        ],
        specs: {
          rows: [
            [
              'Tasks',
              'Detection · instance segmentation · keypoints · 3D instance segmentation · time-series forecast/anomaly/classify',
            ],
            [
              'Frameworks',
              'RF-DETR · Pointcept (PTv3 · PointGroup) · AutoGluon-TimeSeries · Chronos-Bolt · MiniRocket',
            ],
            ['Runs', 'Agent GPUs · queue · progress · stop'],
            [
              'Tracking',
              'MLflow-compatible experiments · metrics · artifacts · model registry',
            ],
          ],
        },
      },

      review: {
        title: 'Review that pins feedback on the label.',
        intro:
          'Reviewer feedback lands as a pin at exact image coordinates. Labelers reply in a thread from the issues tab, and resolving turns the pin green.',
        sections: [
          {
            title: 'Precise feedback, in the precise spot.',
            body: 'Use the comment tool (C) to click anywhere on an image or point cloud and open an issue. Instead of "box #3 is too big", pin it on that box. On video, pins attach to a specific frame.',
          },
          {
            title: 'Discuss in threads, close by resolving.',
            body: 'Each issue carries a comment thread. Open issues show as numbered amber pins; resolved ones as green checks. Filter by all, open, or resolved to see only what’s left.',
          },
          {
            title: 'Review status is progress.',
            body: 'Reviewed sample status and issue counts roll up into the dataset list and QA stats. Managers can tell how far review has come from the dataset screen alone.',
          },
        ],
        specs: {
          rows: [
            [
              'Issue pins',
              'Anchored to image, video frame, or 3D coordinates · number/status badges',
            ],
            [
              'Threads',
              'Comments · replies · resolve/reopen · author and relative time',
            ],
            ['Filters', 'All · open · resolved'],
            ['Rollups', 'Dataset progress · comment counts in QA stats'],
          ],
        },
      },

      collaboration: {
        title: 'Your labeling team’s workspace, included.',
        intro:
          'Members and roles, wiki docs, files, a video library, and meeting notes are bundled per project. Stop keeping labeling guidelines in another tool.',
        sections: [
          {
            title: 'Guidelines in the wiki — and present from it.',
            body: 'Document labeling criteria and edge cases in a Markdown wiki with LaTeX, Mermaid diagrams, and embedded grids, edited in preview, Markdown, or visual mode. Split with --- and it becomes slides, presented with pen, laser, and presenter view. Share outside with a public link.',
          },
          {
            title: 'Files like a drive, viewing like an app.',
            body: 'Create folders, drag-select, and copy, move, or trash. Images, video, PDF, CSV, Parquet, JSON, point clouds, and 3D models open in dedicated viewers; zip and tar are browsable without extracting. Fix things in place with code, JSON, hex, image, and Draw.io editors.',
          },
          {
            title: 'Footage in a library.',
            body: 'Encode to HLS for smooth playback anywhere, add subtitles (ASS, SRT, VTT) and chapters, and play 360° and VR video. Live upload while you record from a phone, and share with public links.',
          },
        ],
        specs: {
          rows: [
            [
              'Wiki',
              'Markdown · LaTeX · Mermaid · 3-mode editor · slide presentations · public links',
            ],
            [
              'Files',
              'Drive-style browsing · trash/undo · typed viewers · archive browsing · editors',
            ],
            [
              'Video',
              'HLS · AES-128 encryption · subtitle editor · chapters · 360°/VR · live upload',
            ],
            ['Members', 'Role-based permissions · email/link invites'],
          ],
        },
      },

      developers: {
        title: 'A one-line CLI, and MLflow in two lines.',
        intro:
          'Script files, datasets, and agents with a single-binary CLI, connect MLflow tracking and registries with project access tokens, and issue offline-verifiable product keys for installed software.',
        sections: [
          {
            title: 'Scoped access tokens.',
            body: 'Each token gets scopes — experiments and model registry read/write, container registry pull/push — and an expiry. The secret is shown exactly once and only a hash is stored. Suspect a leak? Rotate once.',
          },
          {
            title: 'The CLI is one binary.',
            body: 'Install with one curl line, no Node.js required, and it keeps itself updated with each release. After cvp login in the browser, script cvp files, cvp dataset, and cvp agent with --json output. sudo cvp service install turns an agent into a systemd service.',
          },
          {
            title: 'Product keys, issued to verified offline.',
            body: 'Define policies (duration, machine count, features) and issue keys per customer. License files are Ed25519-signed, so installed software verifies them offline with an embedded public key. Track machine activations and expiry strategy (restrict/block) from the dashboard.',
          },
        ],
        specs: {
          rows: [
            [
              'Access tokens',
              'Scoped permissions · expiry · rotate/revoke · shown once (hashed at rest)',
            ],
            [
              'CLI',
              'Single binary for Linux · macOS · Windows · auto-update · personal tokens (cvp_pat_)',
            ],
            [
              'Product keys',
              'Policies · issue/suspend/revoke · machine activation · Ed25519 offline verification',
            ],
            ['Integrations', 'MLflow tracking URI · container/pip/npm registries'],
          ],
        },
      },

      agents: {
        title: 'Agents: CVP’s hands on your own machines.',
        intro:
          'Install one agent per machine, switch apps on from the web, and the agent runs and supervises them as child processes. From AI inference and training to Modbus equipment and video conversion — the heavy lifting stays on your hardware.',
        sections: [
          {
            title: 'One agent, many apps.',
            body: 'RF-DETR, SAM2, Pointcept, time-series forecasting, Modbus monitor and simulator, video download and conversion, collector simulator — add an app as an instance and set its arguments. With several instances, requests spread across the idle ones.',
          },
          {
            title: 'Straight into factory equipment.',
            body: 'The Modbus monitor reads PLC registers; the simulator serves as a Modbus TCP server. Registers mirror into a memory map that feeds digital twins and grids, and the traffic history keeps every read, write, and exception.',
          },
          {
            title: 'Resources by limit, state by chart.',
            body: 'Set memory, CPU, GPU, and process limits per app, enforced with cgroups. Watch CPU, memory, GPU, and network on live charts, and query the agent’s local time series with PromQL.',
          },
        ],
        specs: {
          rows: [
            ['Install', 'One curl line · systemd service · auto-update'],
            [
              'Apps',
              'RF-DETR · SAM2 · Pointcept · time series · Modbus · downloader · converter · collectors',
            ],
            ['Resource limits', 'Memory · CPU · GPU mask · process count (cgroup v2)'],
            ['Monitoring', 'Resource charts · PromQL metrics · logs · state graph'],
          ],
        },
      },

      collectors: {
        title: 'Every camera and sensor on the floor, captured.',
        intro:
          'Agents receive seven payload kinds — video, image, point cloud, profile, time series, record, and file — as segments, keep them on local disk, and upload only the spans you need. Scrub many streams in sync on one timeline.',
        sections: [
          {
            title: 'Many streams, one timeline.',
            body: 'Each collector’s availability bar colors spans in the cloud, on the agent only, or already purged. Open tracks as viewers that follow the same playhead, and drag across the bar to pin the spans that matter.',
          },
          {
            title: 'A viewer for every kind of data.',
            body: 'Video in a live player, images as a frame strip with a brightness histogram, profiles as cross-sections and a heightmap, point clouds in 3D, time series as rollup charts and tables, records as JSON rows.',
          },
          {
            title: 'Within budget, by policy.',
            body: 'Give each agent a CPU, memory, and local-disk budget; collectors wait when it runs out. Per stream, set local and cloud retention and size caps, and when to upload (all, viewed spans, pinned, or off).',
          },
        ],
        specs: {
          rows: [
            [
              'Payloads',
              'Video · image · profile · point cloud · time series · record · file',
            ],
            [
              'Storage',
              'Agent local disk + project cloud · per-stream retention · pins',
            ],
            [
              'Viewing',
              'Live · history · timeline (up to 4 at once) · availability bars',
            ],
            [
              'Status',
              'Collector simulator today — CCTV · GigE · 3D sensors · Modbus · HTTP · file watcher coming',
            ],
          ],
        },
      },

      twin: {
        title: 'Lay out the plant in 3D; live values move it.',
        intro:
          'Build scenes from 110+ parametric equipment assets and bind them to Modbus registers, memory regions, and grid values. Watch live, rewind recordings, simulate what-if scenarios, and walk the floor in first person or VR.',
        sections: [
          {
            title: 'A factory dragged from the catalog.',
            body: 'Robot arms, cobots, SCARAs, belt and roller conveyors, gantry welding systems and positioners, CNC machines, injection molders, presses, AGVs, forklifts, piping, valves, pumps, and workers. Parameters like joint angles and end effectors reshape them, and GLB models and DXF floor plans import too.',
          },
          {
            title: 'Values arrive, equipment reacts.',
            body: 'Bind node channels to Modbus registers, grid cells, memory regions, or videos and set warning and alarm thresholds — equipment glows in status colors. View the same scene live, as a replay, or as a what-if simulation.',
          },
          {
            title: 'Off the screen, onto the floor.',
            body: 'Enter the site to walk in first person with WASD, or put on a WebXR headset to teleport and check alarms on a wrist panel. Display panels and video walls play footage from the library.',
          },
        ],
        specs: {
          rows: [
            [
              'Assets',
              '110+ parametric builders · 4 people · environment (sky, ground, factory hall) · GLB import',
            ],
            [
              'Bindings',
              'Modbus registers · grid cells/rows · map features · memory regions · videos',
            ],
            ['Modes', 'Live · replay (recordings) · what-if simulation'],
            [
              'Immersion',
              'First person · WebXR VR · teleport · view presets · scene cameras',
            ],
          ],
        },
      },

      mlflow: {
        title: 'The path from labeled data to models.',
        intro:
          'MLflow-compatible experiment tracking, model registry, and artifact storage built into the project. Training-wizard runs and your existing MLflow client code land in the same place.',
        sections: [
          {
            title: 'Your MLflow client, unchanged.',
            body: 'Point the tracking URI at your project and add an access token — existing training scripts just work. Search runs, pick metric and parameter columns to compare in a table, and overlay selected runs on charts.',
          },
          {
            title: 'From registry to deployment.',
            body: 'Register validated models and manage versions, aliases, and stages (Staging, Production, Archived). The overview tab maps the whole pipeline: collect → label → train → registry → deploy → monitor.',
          },
        ],
        specs: {
          rows: [
            [
              'Tracking',
              'MLflow-compatible experiments · runs · metrics · params · tags · compare',
            ],
            ['Registry', 'Model versions · aliases · stages'],
            ['Artifacts', 'Stored in project storage · file browser'],
            ['Auth', 'Project access tokens (experiments · model registry scopes)'],
          ],
        },
      },

      graphs: {
        title: 'Vision pipelines wired like blueprints.',
        intro:
          'Unreal Blueprint-style visual scripting. Wire events, flow control, math, and computer vision (CVP) nodes together with exec pins, and check results in the run log right away.',
        sections: [
          {
            title: 'Execution flows from an event.',
            body: 'Flow starts at an On Start event, passes through control nodes like branches and for-loops, and continues into load image → run agent model (RF-DETR) → save annotations. Running nodes glow yellow while output accumulates in the log panel.',
          },
          {
            title: 'Drag from the palette, refine in the inspector.',
            body: 'Search the categorized node palette and drag nodes in, then tune labels and inputs in the inspector. Graphs autosave and can become reusable templates. Running in the browser is free.',
          },
        ],
        specs: {
          rows: [
            [
              'Nodes',
              'Events · flow control · variables · math · comparison · logic · string · array · debug · utility · CVP (vision)',
            ],
            [
              'Execution',
              'Exec-pin flow · run log · running-node highlight · entry point picker',
            ],
            ['Editing', 'Palette search · inspector · autosave · templates'],
          ],
        },
      },

      grids: {
        title: 'A spreadsheet-style database for project data.',
        intro:
          'Build tables with typed columns and view them as a grid, gallery, kanban, calendar, timeline, form, or survey. Equipment lists, review checklists, field surveys — bring spreadsheet work into the project.',
        sections: [
          {
            title: 'Same data, seven views.',
            body: 'From a grid with saved filters, sorts, groups, and color rules to a kanban grouped by a select column and calendar and timeline views laid out by dates — just switch the view. Import and export CSV.',
          },
          {
            title: 'Collect data with forms and surveys.',
            body: 'Design an input screen with the form designer, or a one-question-at-a-time survey. Share a public link and responses land as new rows, no sign-in required.',
          },
          {
            title: 'Relations and rules, too.',
            body: 'Reference rows in other grids, block duplicates with unique columns, and use person, attachment, and link columns. Lock finalized sheets as read-only and embed grids in wiki docs.',
          },
        ],
        specs: {
          rows: [
            [
              'Columns',
              'Text · number · date · boolean · select · person · link · attachment · reference',
            ],
            ['Views', 'Grid · gallery · kanban · calendar · timeline · form · survey'],
            ['Rules', 'Filter · sort · group · color · unique · sheet lock'],
            ['Sharing', 'Public form/survey links · CSV import/export · wiki embeds'],
          ],
        },
      },

      maps: {
        title: 'Put your vision data on the map.',
        intro:
          'Drone surveys, facility inspections, site camera placement — draw and manage layers and features on a map for location-heavy projects.',
        sections: [
          {
            title: 'Self-served basemaps.',
            body: 'The platform serves PMTiles basemaps directly, so no third-party map API key is needed. Stack, show, and hide layers to compose your project’s spatial data.',
          },
          {
            title: 'Draw it, get GeoJSON.',
            body: 'Draw points, lines, and polygons and they save as GeoJSON. Record camera positions, inspection zones, and flight paths as data, and bind features to digital-twin nodes.',
          },
        ],
        specs: {
          rows: [
            ['Basemaps', 'Self-served PMTiles · MapLibre rendering'],
            ['Features', 'GeoJSON points · lines · polygons · labels'],
            ['Layers', 'Color · show/hide · rename'],
            ['Integrations', 'Digital-twin map-feature bindings'],
          ],
        },
      },

      meetings: {
        title: 'Meet, record, and the notes land in the wiki.',
        intro:
          'Open a video meeting right inside the project; recordings are transcribed, summarized, and published as wiki pages. The meeting that settled your labeling criteria becomes team documentation.',
        sections: [
          {
            title: 'Video meetings from a single link.',
            body: 'Start a meeting and a room opens; outside guests join with an invite link and guest password. Screen share, raise hands, react, chat, and manage participants — turn on recording and AI meeting notes are published when it ends.',
          },
          {
            title: 'From recording to wiki, automatically.',
            body: 'Record microphone or tab audio in the browser; Whisper transcribes it and an LLM summarizes decisions and action items into a wiki page. Stage-by-stage diagnostics show where anything stalled.',
          },
        ],
        specs: {
          rows: [
            [
              'Video meetings',
              'WebRTC · screen share · guest link/password · recording',
            ],
            ['Transcription', 'Whisper large-v3-turbo'],
            ['Summary', 'LLM summary · automatic wiki publishing'],
            ['Cost', '1 token per MiB recorded (min 2) + 1 per summary'],
          ],
        },
      },

      signatures: {
        title: 'Draw the approval line; keep signatures in a ledger.',
        intro:
          'Draft a document, set approve, consult, and CC stages, and submit — signers sign or reject in turn. Every signature lands in a hash-chained ledger you can verify for tampering.',
        sections: [
          {
            title: 'The approval grid you know.',
            body: 'Give each stage a type (approve, consult, CC) and a rule (everyone or any one). Save frequent lines as presets, and stamp with a drawn signature or a registered PNG. A printable signature record comes out in one go.',
          },
          {
            title: 'The ledger stops tampering.',
            body: 'Each signature record chains the document hash with the previous record’s hash. Verify integrity and every signature is checked against the original instantly.',
          },
        ],
        specs: {
          rows: [
            [
              'Approval lines',
              'Approve · consult · CC · stages · all/any rule · presets',
            ],
            ['Status', 'Draft · in progress · completed · rejected · withdrawn'],
            ['Signing', 'Draw · image upload · comments'],
            ['Verification', 'Hash-chain ledger · integrity check · print'],
          ],
        },
      },

      memory: {
        title: 'Shared memory you use like PLC registers.',
        intro:
          'Gather equipment values in a byte-addressed memory map. Inspect in hex, read as typed arrays, and name regions — a data bus between Modbus and your digital twin.',
        sections: [
          {
            title: 'Hex, typed arrays, regions.',
            body: 'View and edit bytes in a hex editor paged by 4 KiB. Read the same span as u8 through f64, little- or big-endian, and name the ranges you watch as regions to see just their values.',
          },
          {
            title: 'The bus between Modbus and twins.',
            body: 'When a Modbus connector mirrors registers into a map, a region is created per area automatically. With the simulator, edits to the map are written back to registers, and digital twins read region elements through bindings.',
          },
        ],
        specs: {
          rows: [
            ['Views', 'Hex (4 KiB pages) · typed array · regions'],
            [
              'Types',
              'u8 · i8 · u16 · i16 · u32 · i32 · u64 · i64 · f32 · f64 · little/big endian',
            ],
            [
              'Integrations',
              'Modbus mirror (monitor one-way · simulator two-way) · digital-twin bindings',
            ],
          ],
        },
      },

      registry: {
        title: 'Images, charts, and packages next to your project.',
        intro:
          'Push Docker/OCI images, Helm charts, pip packages, and npm packages to the project registry. Keep your agents’ inference images and internal libraries next to the data.',
        sections: [
          {
            title: 'The clients you already use.',
            body: 'docker push, helm push oci://, twine upload, npm publish — log in with a project access token from the standard clients. Large images upload in chunks.',
          },
          {
            title: 'pip channels per CUDA build.',
            body: 'Split the pip index into channels to keep per-build wheels like cu121 and cu130 apart. See blob usage and reclaimable space in the storage card and clean up.',
          },
        ],
        specs: {
          rows: [
            ['Docker/OCI', 'Push · pull · tags · manifests · storage cleanup'],
            ['Helm', 'OCI charts'],
            ['pip', 'PEP 503/691 index · channels · twine upload'],
            ['npm', 'Publish · versions · dist-tags'],
          ],
        },
      },

      apps: {
        title: 'Browser utilities for the chores between labels.',
        intro:
          'From camera FOV math to calibration, barcode reading, JSON formatting, and WiFi QR codes — 40+ apps live inside the project. Everything runs in the browser, so your data never leaves it.',
        sections: [
          {
            title: 'From optics calculators to dev tools.',
            body: 'Optics tools like FOV, lens picker, and depth of field; vision tools like calibration, undistortion, thresholds, and morphology; dev tools like an HTTP client, JWT viewer, hashes, and AES; HWP and Draw.io editors; and 2048 and Minesweeper for the break.',
          },
          {
            title: 'Opens straight from your files.',
            body: '"Open with another app" on the Files page hands images and data to the right app instantly. Set a default app per extension and a double-click opens it.',
          },
        ],
        specs: {
          rows: [
            [
              'Vision',
              'FOV · lens picker · DOF · perspective fix · calibration · undistort · barcode/QR · 3D modeler',
            ],
            [
              'Utilities',
              'Code editor · HTTP client · JWT · hashes · AES · WiFi QR · HWP · Draw.io',
            ],
            ['Privacy', 'All computation stays in the browser'],
          ],
        },
      },

      store: {
        title: 'Buy and sell well-made wikis, grids, and datasets.',
        intro:
          'Publish the wikis, grids, and datasets you built to the store, and install content other teams made. Prices are in tokens; installing is just picking a target project.',
        sections: [
          {
            title: 'Browse, preview, install.',
            body: 'Find by type, popularity, or rating, check the included content and preview, then install. Official CVP content carries a badge, with version history, ratings, and comments.',
          },
          {
            title: 'Publish your own.',
            body: 'Pick a source project and item, set a price (0 for free) and visibility, and publish. Grids can ship columns only or with row data, and new versions publish on top.',
          },
        ],
        specs: {
          rows: [
            ['Types', 'Wiki · grid · dataset'],
            ['Pricing', 'Free or tokens — charged to the target project'],
            ['Trust', 'Official badge · ratings · comments · version history'],
          ],
        },
      },
    },
  },
} as const;
