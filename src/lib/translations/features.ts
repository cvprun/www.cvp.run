/**
 * Feature detail page copy. Each page: intro + 3 sections + spec table.
 * Section order must stay aligned with `sectionMocks` in `lib/site.ts`.
 */
export const features = {
  ko: {
    featurePage: {
      labelingKicker: '라벨링',
      platformKicker: '플랫폼',
      specsTitle: '스펙',
      relatedTitle: '함께 보기',
      ctaTitle: '직접 그려보는 게 가장 빠릅니다',
      ctaDescription: '무료 플랜에는 카드 등록이 필요 없습니다.',
      moreKicker: '더 보기',
      statusAvailable: '사용 가능',
      statusInDevelopment: '개발 중',
      developmentNote:
        '이 기능은 현재 개발 중이며, 정식 출시 전까지 내용이 바뀔 수 있습니다.',
    },

    labelingTools: {
      kicker: '모든 어노테이션 타입',
      title: '정교한 라벨링 도구가 가득.',
      aiBadge: 'AI',
      footnote: '모든 도구에 단축키가 붙어 있어 마우스가 캔버스를 떠나지 않습니다.',
      subtitles: {
        images:
          '객체 검출부터 인스턴스 세그멘테이션까지 — 픽셀 단위로 정확한 도구를 단축키 하나로 오갑니다.',
        videos:
          '이미지와 똑같은 도형 도구를 타임라인 위에서. 키프레임만 찍으면 사이는 보간됩니다.',
        pointClouds: '수백만 점의 3D 장면을 위한 큐보이드 · 세그먼트 · 측정 도구.',
      },
      tools: {
        rectangle: {
          name: '사각형',
          desc: '드래그 한 번으로 그리는 객체 검출용 바운딩 박스.',
        },
        rotatedRectangle: {
          name: '회전 사각형',
          desc: '기울어진 객체에 딱 맞는 방향성 박스.',
        },
        ellipse: {name: '타원', desc: '원형·타원형 객체를 감싸는 타원.'},
        polygon: {
          name: '다각형',
          desc: '정점을 찍어 만드는 인스턴스 세그멘테이션 마스크.',
        },
        polyline: {name: '폴리라인', desc: '차선·경로 같은 열린 선을 잇습니다.'},
        point: {name: '점', desc: '단일 좌표를 콕 찍는 포인트.'},
        keypoint: {
          name: '키포인트',
          desc: '스켈레톤 프리셋으로 관절·랜드마크를 찍습니다.',
        },
        brush: {name: '브러시', desc: '픽셀 단위로 칠하는 마스크.'},
        eraser: {name: '지우개', desc: '칠한 마스크를 다시 다듬습니다.'},
        magicWand: {
          name: '매직 완드',
          desc: '클릭 한 번, AI(SAM)가 객체를 분할합니다.',
        },
        cuboid: {name: '큐보이드', desc: '이동·회전·크기 기즈모로 다루는 3D 박스.'},
        point3d: {name: '3D 포인트', desc: '포인트클라우드 위의 단일 3D 점.'},
        polyline3d: {name: '3D 폴리라인', desc: '3D 공간을 가로지르는 폴리라인.'},
        polygon3d: {name: '3D 폴리곤', desc: '평면 위 영역을 그리는 3D 다각형.'},
        keypoint3d: {name: '3D 키포인트', desc: '3D 스켈레톤 키포인트.'},
        segmentLasso: {
          name: '올가미 세그먼트',
          desc: '올가미로 점을 칠해 인스턴스로 묶습니다.',
        },
        segmentRect: {
          name: '사각형 세그먼트',
          desc: '사각형으로 점을 선택해 세그먼트.',
        },
        dimension: {name: '치수', desc: '두 점 사이 거리를 재는 치수선.'},
      },
    },

    pages: {
      images: {
        title: '박스에서 키포인트까지, 손에 붙는 이미지 라벨링.',
        intro:
          '12종 도구를 단축키로 오가며 그리고, 리뷰까지 같은 화면에서 끝냅니다. 대용량 이미지에서도 지연 없는 반응속도를 유지합니다.',
        sections: [
          {
            title: '12종 도구, 전부 단축키로.',
            body: '사각형(R), 회전 사각형(O), 다각형(G), 폴리라인(L), 타원(E), 점(P), 브러시(B)와 지우개(X), 키포인트(K)까지 — 마우스가 캔버스를 떠나지 않도록 모든 도구에 단축키를 달았습니다. 클래스마다 색과 지오메트리 타입이 지정되어 잘못 그릴 일이 없습니다.',
          },
          {
            title: '키포인트는 스켈레톤 프리셋으로.',
            body: '사람·손·얼굴·동물 템플릿에서 시작하거나, 그래픽 에디터에서 관절을 찍고 뼈대를 이어 프로젝트만의 스켈레톤을 정의하세요. 라벨링할 때는 프리셋을 고르기만 하면 됩니다.',
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
              '사각형 · 회전 사각형 · 다각형 · 폴리라인 · 점 · 타원 · 브러시 마스크 · 키포인트',
            ],
            ['상태 워크플로', '미라벨링 → 진행 중 → 라벨링 완료 → 검토 완료'],
            [
              '편집',
              '실행 취소/다시 실행 · 정점 편집 · 이전 샘플 복제 · 격자 · 미니맵',
            ],
            ['성능', '비트맵 캐시 렌더링 · 인접 샘플 프리페치 · 이미지 LRU 캐시'],
          ],
        },
      },

      videos: {
        title: '키프레임만 찍으면, 사이는 보간으로.',
        intro:
          '항상 표시되는 타임라인 위에 트랙과 키프레임이 놓입니다. 모든 도형 타입이 트랙을 지원하고, 키프레임 사이는 자동으로 보간됩니다.',
        sections: [
          {
            title: '타임라인이 항상 곁에 있습니다.',
            body: '눈금자, 플레이헤드, 트랙별 키프레임 마커가 에디터 하단에 도킹됩니다. 프레임 단위 이동(이전/다음/처음/끝)과 fps 표시로 원하는 프레임을 정확히 잡습니다.',
          },
          {
            title: '모든 도형에 키프레임을.',
            body: '사각형만이 아닙니다. 다각형, 키포인트, 폴리라인까지 모든 도형이 키프레임을 갖고 프레임 사이를 보간합니다. 객체가 잠시 사라지면 트랙을 끊고, 다시 나타나면 잇습니다.',
          },
          {
            title: '업로드부터 재생까지 한 곳에서.',
            body: '동영상 라이브러리가 원본과 HLS 스트리밍 자산을 함께 관리합니다. 민감한 영상은 암호화해 저장하고, 플레이리스트로 정리해 팀과 돌려봅니다.',
          },
        ],
        specs: {
          rows: [
            ['타임라인', '눈금자 · 플레이헤드 · 트랙 행 · 키프레임 다이아몬드 마커'],
            ['보간', '키프레임 사이 자동 보간 · 트랙 유지/분리'],
            ['재생', '프레임 단위 이동 · fps 표시 · 배속 재생'],
            ['자산', '원본 / HLS 스트리밍 · 선택적 암호화 · 플레이리스트'],
          ],
        },
      },

      pointClouds: {
        title: '수백만 점의 포인트클라우드를 브라우저에서.',
        intro:
          'LAS/LAZ·PLY·PCD를 업로드하면 GPU 렌더링으로 즉시 열립니다. 원근 뷰와 평면·정면·측면 직교 뷰를 함께 놓고, 큐보이드와 포인트 세그먼트로 라벨링합니다.',
        sections: [
          {
            title: '4개의 시점으로 한 장면을.',
            body: '메인 원근 뷰 옆에 평면(BEV)·정면·측면 직교 뷰가 세로로 정렬됩니다. 큐보이드는 이동·회전·크기 기즈모로 다듬고, 점에 맞춤(F)·지면 스냅(Shift+F)으로 마무리합니다. 색상은 RGB·라벨·높이·강도·텍스처 모드를 오갑니다.',
          },
          {
            title: '자동 분할로 시작을 앞당기세요.',
            body: '무효점(0,0,0)을 걸러내고, RANSAC으로 바닥·테이블 같은 지배 평면을 제거한 뒤, 격자 클러스터링으로 남은 점을 인스턴스로 묶습니다. 결과가 마음에 안 들면 실행 취소 한 번이면 됩니다.',
          },
          {
            title: '쓰던 포맷 그대로 가져오고 내보냅니다.',
            body: 'LAS/LAZ는 브라우저 안에서 WASM으로 디코딩합니다. Labeled PLY, SemanticKITTI(.label), Pointcept(.npy), LAS classification까지 — 기존 파이프라인의 라벨을 그대로 가져오고 같은 포맷으로 내보냅니다.',
          },
        ],
        specs: {
          rows: [
            ['입력 포맷', 'PLY · PCD · LAS · LAZ (브라우저 내 WASM 디코딩)'],
            [
              '라벨 포맷',
              'Labeled PLY · SemanticKITTI(.label) · Pointcept(.npy) · ASCII · LAS classification',
            ],
            [
              '도구',
              '큐보이드 · 올가미/사각형 세그먼트 · 3D 점/폴리라인/폴리곤/키포인트 · 거리 측정',
            ],
            [
              '색상 모드',
              'RGB · 라벨 · 높이 · 강도 · 텍스처 (turbo/viridis 컬러맵, 인스턴스별 색상)',
            ],
            ['자동 분할', '무효점 제외 · RANSAC 지배 평면 제거 · 격자 클러스터링'],
          ],
        },
      },

      datasets: {
        title: '이미지, 비디오, 3D가 한 프로젝트의 데이터셋으로.',
        intro:
          '데이터셋마다 타입이 있고, 타입에 맞는 에디터와 도구가 자동으로 따라옵니다. 진행률과 클래스 분포가 한눈에 보입니다.',
        sections: [
          {
            title: '타입이 있는 데이터셋.',
            body: '이미지, 비디오, 포인트클라우드 — 데이터셋을 만들 때 타입을 정하면 업로드 검증부터 에디터, 도구 구성까지 타입에 맞게 준비됩니다. 서로 다른 모달리티가 한 프로젝트 안에서 나란히 관리됩니다.',
          },
          {
            title: '진행률이 보이는 관리.',
            body: '샘플마다 미라벨링·진행 중·라벨링 완료·검토 완료 상태가 있고, 데이터셋 화면 상단에 진행률 바와 클래스별 어노테이션 분포가 집계됩니다. 상태 칩을 눌러 남은 작업만 걸러 보세요.',
          },
          {
            title: '클래스와 태그는 데이터셋의 언어.',
            body: '클래스에는 색과 지오메트리 타입을, 태그에는 값 타입(선택·숫자·텍스트)을 정의합니다. 키포인트 클래스는 스켈레톤 프리셋과 연결됩니다. 공개 데이터셋 갤러리에서 COCO128 같은 예제로 바로 시작할 수도 있습니다.',
          },
        ],
        specs: {
          rows: [
            ['데이터셋 타입', '이미지 · 비디오 · 포인트 클라우드'],
            ['샘플 상태', '미라벨링 · 진행 중 · 라벨링 완료 · 검토 완료'],
            ['분류 체계', '클래스(색 · 지오메트리) · 태그(선택 · 숫자 · 텍스트)'],
            ['시작', '드래그앤드롭 업로드 · 공개 데이터셋 갤러리'],
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
            body: '코멘트 도구(C)로 이미지 위 아무 곳이나 클릭해 이슈를 엽니다. "3번 박스가 너무 큽니다" 대신, 그 박스 위에 핀을 꽂으세요. 비디오라면 특정 프레임에 핀이 고정됩니다.',
          },
          {
            title: '스레드로 대화하고, 해결로 닫습니다.',
            body: '이슈마다 코멘트 스레드가 붙습니다. 미해결 이슈는 노란 핀과 번호로, 해결된 이슈는 초록 체크로 표시됩니다. 전체·미해결·해결됨 필터로 남은 검수만 추려 봅니다.',
          },
          {
            title: '검수 상태가 곧 진행률.',
            body: '샘플의 검토 완료 상태와 미해결 이슈 수가 데이터셋 통계에 집계됩니다. 관리자는 데이터셋 화면만 보고도 검수가 어디까지 왔는지 알 수 있습니다.',
          },
        ],
        specs: {
          rows: [
            ['이슈 핀', '이미지 좌표 고정 · 비디오 프레임 고정 · 번호/상태 뱃지'],
            ['스레드', '코멘트 · 답글 · 해결/다시 열기 · 작성자와 상대 시간'],
            ['필터', '전체 · 미해결 · 해결됨'],
            ['집계', '데이터셋 통계에 미해결/해결 코멘트 반영'],
          ],
        },
      },

      collaboration: {
        title: '라벨링 팀의 협업 공간까지 그대로.',
        intro:
          '멤버와 역할, 위키 문서, 파일, 동영상 라이브러리가 프로젝트 단위로 묶입니다. 라벨링 가이드라인을 다른 도구에 두지 마세요.',
        sections: [
          {
            title: '가이드라인은 위키에.',
            body: 'Markdown 위키에 라벨링 기준과 엣지 케이스를 정리하세요. 수식(LaTeX), 다이어그램(Mermaid), 표를 지원하고, 텍스트·비주얼·미리보기 3가지 모드로 편집합니다. 한 페이지가 한 파일이라 내보내기도 간단합니다.',
          },
          {
            title: '파일은 Drive처럼.',
            body: '프로젝트 파일함에서 폴더를 만들고, 드래그로 선택하고, 휴지통으로 지웁니다. 이미지·영상·포인트클라우드·CSV·JSON은 타입별 뷰어로 바로 열립니다.',
          },
          {
            title: '역할로 나누는 권한.',
            body: '멤버를 초대하고 역할을 부여합니다. 검수자는 리뷰에, 라벨러는 라벨링에, 개발자는 연동에 집중하도록 권한이 나뉩니다.',
          },
        ],
        specs: {
          rows: [
            [
              '위키',
              'Markdown · LaTeX 수식 · Mermaid 다이어그램 · 3모드 에디터 · 슬라이드 발표',
            ],
            [
              '파일',
              'Drive 스타일 탐색 · 러버밴드 선택 · 휴지통/실행 취소 · 타입별 뷰어',
            ],
            ['동영상', 'HLS 스트리밍 · 선택적 암호화 · 플레이리스트'],
            ['멤버', '역할 기반 권한 · 프로젝트 단위 초대'],
          ],
        },
      },

      developers: {
        title: '토큰 하나로 붙는 API, 키 하나로 파는 소프트웨어.',
        intro:
          '프로젝트 액세스 토큰으로 데이터를 프로그래밍 방식으로 다루고, 설치형 소프트웨어에는 오프라인 검증 가능한 제품키를 발급합니다.',
        sections: [
          {
            title: '범위를 정해 발급하는 액세스 토큰.',
            body: '토큰마다 읽기/쓰기 범위와 만료일을 정합니다. 원문은 생성 직후 단 한 번만 표시되고 서버에는 해시만 남습니다. 유출이 의심되면 회전 한 번으로 교체됩니다.',
          },
          {
            title: '제품키는 발급부터 취소까지.',
            body: '정책(기간·머신 수·기능)을 정의하고 고객별 키를 발급합니다. 키는 XXXXXXXX-XXXXXXXX 형식 4그룹, 머신 활성화 현황과 만료 전략(제한/차단)까지 대시보드에서 관리합니다.',
          },
          {
            title: '오프라인에서도 검증되는 서명.',
            body: '라이선스 파일은 Ed25519로 서명됩니다. 설치형 소프트웨어는 내장한 공개키만으로 네트워크 없이 라이선스를 검증합니다. 공개키는 PEM으로 내려받아 그대로 임베드하세요.',
          },
        ],
        specs: {
          rows: [
            [
              '액세스 토큰',
              '범위 기반 권한 · 만료일 · 회전/폐기 · 원문 1회 노출(해시 저장)',
            ],
            [
              '제품키',
              '정책(기간 · 머신 수 · 기능) · 발급/일시중지/취소 · 머신 활성화 추적',
            ],
            ['오프라인 검증', 'Ed25519 서명 · 공개키 PEM 배포 · 네트워크 불필요'],
            ['API', 'REST API · 프로젝트 단위 인증'],
          ],
        },
      },

      apps: {
        title: '라벨링 사이의 모든 잡일을 위한 CV 유틸리티.',
        intro:
          '카메라 FOV 계산부터 왜곡 보정, 바코드 인식, JSON 포매터까지 — 50종 이상의 유틸리티 앱이 프로젝트 안에 들어 있습니다. 따로 설치할 것도, 탭을 옮겨 다닐 것도 없습니다.',
        sections: [
          {
            title: '광학 계산기부터 개발 도구까지.',
            body: '화각(FOV) 계산기, 렌즈 픽커, 피사계 심도 같은 광학 도구와 카메라 캘리브레이션, 왜곡 보정, 바코드 인식 같은 비전 도구, 그리고 HTTP 클라이언트, JSON 포매터, JWT 뷰어, 헥스 에디터 같은 개발 도구가 한 갤러리에 모여 있습니다.',
          },
          {
            title: '파일에서 바로 열립니다.',
            body: '파일 페이지의 "다른 앱으로 열기"로 이미지와 데이터를 알맞은 앱에 즉시 전달합니다. 다운로드해서 다른 프로그램에 붙여 넣는 왕복이 사라집니다.',
          },
        ],
        specs: {
          rows: [
            ['광학', 'FOV 계산기 · 렌즈 픽커 · 피사계 심도(DOF)'],
            ['비전', '카메라 캘리브레이션 · 왜곡 보정 · 바코드 · 3D 모델러'],
            ['개발자', 'HTTP 클라이언트 · JSON 포매터 · JWT 뷰어 · 헥스 에디터'],
            ['통합', '파일 페이지 "다른 앱으로 열기" 연동'],
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
            body: '시작 이벤트에서 출발한 실행 흐름이 분기·For 루프 같은 제어 노드를 지나 이미지 로드 → 모델 실행 → 어노테이션 저장으로 이어집니다. 실행 중인 노드는 노랗게 빛나고, 하단 로그 패널에 출력이 쌓입니다.',
          },
          {
            title: '팔레트에서 끌어다 놓고, 인스펙터로 다듬고.',
            body: '카테고리별 노드 팔레트에서 검색해 드래그로 추가하고, 인스펙터에서 라벨과 입력 값을 조정합니다. 그래프는 30초마다 자동 저장되고 템플릿으로 만들어 재사용할 수 있습니다.',
          },
        ],
        specs: {
          rows: [
            [
              '노드',
              '이벤트 · 제어 흐름 · 변수 · 수학 · 비교 · 논리 · 문자열 · 배열 · 형변환 · 디버그 · CVP(비전)',
            ],
            ['실행', 'exec 핀 흐름 · 실행 로그 · 실행 중 노드 하이라이트'],
            ['편집', '팔레트 검색 · 인스펙터 · 자동 저장 · 템플릿'],
            ['배포', '엣지 에이전트 원격 실행 (준비 중)'],
          ],
        },
      },

      agents: {
        title: '엣지 장비에서 돌아가는 CVP의 손발.',
        intro:
          '현장 장비와 엣지 노드에 에이전트를 설치해 그래프 실행, 데이터 수집, 장비 연동을 맡깁니다. 플랫폼에서 상태를 모니터링하고 원격으로 작업을 내립니다.',
        sections: [
          {
            title: '원격 실행과 스케줄링.',
            body: '에이전트는 하트비트로 상태를 보고하고, cron 스케줄에 따라 작업을 실행합니다. 추론 앱(예: RF-DETR 감지)의 실행과 학습도 에이전트가 담당합니다.',
          },
          {
            title: '산업 장비와의 연결.',
            body: 'Modbus 같은 산업 프로토콜로 PLC·센서와 통신하고, 수집한 데이터를 프로젝트로 올립니다. 현장과 클라우드 사이의 다리 역할입니다.',
          },
        ],
        specs: {
          rows: [
            ['실행', '그래프 · 추론/학습 앱 (RF-DETR 등)'],
            ['스케줄', 'cron 기반 로컬 스케줄러'],
            ['프로토콜', 'Modbus 등 산업 장비 연동'],
            ['모니터링', '하트비트 · 버전 · 원격 작업'],
          ],
        },
      },

      clusters: {
        title: 'Kubernetes 클러스터를 프로젝트 안에서.',
        intro:
          '학습·추론 워크로드가 도는 Kubernetes 클러스터를 등록하고, 워크로드·노드·이벤트를 프로젝트 화면에서 직접 제어합니다.',
        sections: [
          {
            title: 'Portainer처럼, 프로젝트에 붙어서.',
            body: '파드, 디플로이먼트, 서비스 상태를 탭 UI로 살펴보고 제어합니다. 클러스터 자원이 어떤 프로젝트의 어떤 작업에 쓰이는지 맥락을 잃지 않습니다.',
          },
          {
            title: '안전한 프록시 연결.',
            body: '클러스터 API에는 플랫폼의 리버스 프록시를 거쳐 접근합니다. 자격 증명을 브라우저에 두지 않고도 제어 화면을 쓸 수 있습니다.',
          },
        ],
        specs: {
          rows: [
            ['리소스', '파드 · 디플로이먼트 · 서비스 · 노드 · 이벤트'],
            ['연결', '플랫폼 리버스 프록시 경유'],
            ['UI', '클러스터 상세 탭 · 상태 대시보드'],
          ],
        },
      },

      vms: {
        title: '카메라 등록부터 인시던트까지, 통합 관제.',
        intro:
          'CCTV 카메라를 카탈로그로 관리하고 라이브 뷰, 재생, 이벤트·인시던트 워크플로를 하나의 관제 화면에서 처리합니다.',
        sections: [
          {
            title: '보고, 돌려보고, 움직이고.',
            body: '멀티 채널 라이브 레이아웃과 타임라인 재생, PTZ 제어를 지원합니다. 카메라는 카탈로그로 등록해 권한과 설정을 일괄 관리합니다.',
          },
          {
            title: '이벤트가 인시던트가 되기까지.',
            body: '규칙에 걸린 이벤트는 인시던트로 승격해 담당자에게 배정하고, 웹훅으로 외부 시스템에 알립니다. 감사 로그와 영상 내보내기로 사후 조사를 지원합니다.',
          },
        ],
        specs: {
          rows: [
            ['카메라', '카탈로그 · PTZ · 레이아웃'],
            ['모니터링', '멀티 채널 라이브 · 타임라인 재생'],
            ['워크플로', '규칙 · 이벤트 → 인시던트 · 웹훅'],
            ['기록', '감사 로그 · 영상 내보내기'],
          ],
        },
      },

      manufacturing: {
        title: '비전 검사와 생산 데이터를 잇는 MES.',
        intro:
          '작업 지시, 추적성, 설비 모니터링을 담당하는 제조 실행 모듈입니다. MESA-11 모델을 기반으로 검사 결과를 생산 맥락과 연결합니다.',
        sections: [
          {
            title: '주문에서 스케줄까지.',
            body: '제품 카탈로그와 생산 주문, 작업 스케줄을 관리하고 진행 상황을 대시보드로 봅니다.',
          },
          {
            title: '토폴로지로 보는 공장.',
            body: '설비와 작업 단위를 그래프 토폴로지로 시각화하고, 작업 단위에 엣지 에이전트를 연결해 현장 데이터를 수집합니다. 추적성 조회로 언제 어떤 설비에서 무엇이 생산됐는지 따라갑니다.',
          },
        ],
        specs: {
          rows: [
            ['모델', 'MESA-11 기반 기능 구성'],
            ['기능', '생산 주문 · 카탈로그 · 스케줄 · 추적성 · 설비'],
            ['시각화', '아키텍처 다이어그램 · 그래프 토폴로지'],
          ],
        },
      },

      mlflow: {
        title: '라벨링한 데이터가 모델이 되는 길.',
        intro:
          'MLflow 호환 실험 추적과 모델 레지스트리, 아티팩트 저장소를 프로젝트에 내장합니다. 기존 MLflow 클라이언트 코드를 그대로 씁니다.',
        sections: [
          {
            title: 'MLflow 클라이언트 그대로.',
            body: 'tracking URI를 프로젝트 주소로 바꾸고 액세스 토큰만 넣으면 기존 학습 스크립트가 그대로 동작합니다. 실험, 런, 메트릭이 프로젝트에 쌓입니다.',
          },
          {
            title: '레지스트리에서 엔드포인트까지.',
            body: '검증된 모델을 레지스트리에 등록하고 버전을 관리합니다. 아티팩트는 프로젝트 스토리지에 저장됩니다.',
          },
        ],
        specs: {
          rows: [
            ['추적', 'MLflow 호환 실험 · 런 · 메트릭'],
            ['레지스트리', '모델 등록 · 버전 관리'],
            ['아티팩트', '프로젝트 스토리지 저장'],
            ['인증', '프로젝트 액세스 토큰'],
          ],
        },
      },

      grids: {
        title: '프로젝트 데이터를 위한 스프레드시트형 DB.',
        intro:
          'Airtable처럼 테이블을 만들고 행과 필드를 관리합니다. 실험 조건표, 장비 목록, 검수 체크리스트 — 스프레드시트로 하던 일을 프로젝트 안으로.',
        sections: [
          {
            title: '필드 타입이 있는 테이블.',
            body: '텍스트, 숫자, 선택, 날짜 등 타입 있는 필드로 데이터를 구조화하고, 뷰로 필터·정렬을 저장합니다.',
          },
          {
            title: 'AI 에이전트가 읽고 쓰는 데이터.',
            body: '프로젝트의 원격 MCP 서버를 통해 그리드가 도구로 노출됩니다. AI 에이전트가 테이블을 조회하고 갱신하는 자동화를 만들 수 있습니다.',
          },
        ],
        specs: {
          rows: [
            ['필드', '텍스트 · 숫자 · 선택 · 날짜 등 타입 필드'],
            ['뷰', '필터 · 정렬 저장'],
            ['연동', '원격 MCP 서버 도구 노출'],
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
            body: 'PMTiles 기반 베이스맵을 플랫폼이 직접 서빙해 외부 지도 API 키 없이 동작합니다. 레이어를 겹쳐 프로젝트의 공간 데이터를 구성합니다.',
          },
          {
            title: '그리는 대로 GeoJSON.',
            body: '점·선·폴리곤 드로잉 도구로 피처를 그리면 GeoJSON으로 저장됩니다. 카메라 위치, 점검 구역, 비행 경로를 데이터로 남기세요.',
          },
        ],
        specs: {
          rows: [
            ['베이스맵', 'PMTiles 자체 서빙 · MapLibre 렌더링'],
            ['피처', 'GeoJSON 점 · 선 · 폴리곤'],
            ['드로잉', 'terra-draw 기반 편집 도구'],
          ],
        },
      },

      meetings: {
        title: '회의가 끝나면 회의록이 위키에 있습니다.',
        intro:
          '회의를 녹음하면 전사, 요약, 위키 발행까지 자동으로 이어집니다. 라벨링 기준 회의가 그대로 팀 문서가 됩니다.',
        sections: [
          {
            title: '녹음에서 요약까지.',
            body: '브라우저에서 녹음하면 Whisper가 전사하고 LLM이 핵심 결정과 액션 아이템을 요약합니다.',
          },
          {
            title: '위키로 발행.',
            body: '완성된 회의록은 프로젝트 위키 페이지로 발행됩니다. 라벨링 가이드라인 변경 이력이 회의록과 함께 남습니다.',
          },
        ],
        specs: {
          rows: [
            ['전사', 'Whisper 음성 인식'],
            ['요약', 'LLM 요약 · 액션 아이템 추출'],
            ['발행', '프로젝트 위키 자동 발행'],
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
        'This feature is under active development and may change before general availability.',
    },

    labelingTools: {
      kicker: 'For any type of annotation',
      title: 'Packed with advanced labeling tools.',
      aiBadge: 'AI',
      footnote: 'Every tool has a shortcut, so your mouse never leaves the canvas.',
      subtitles: {
        images:
          'From object detection to instance segmentation — pixel-accurate tools, each one a shortcut away.',
        videos:
          'The same shape tools as images, on a timeline. Set keyframes and the frames between interpolate.',
        pointClouds:
          'Cuboids, segments, and measurement for scenes of millions of points.',
      },
      tools: {
        rectangle: {
          name: 'Rectangle',
          desc: 'Bounding boxes for object detection in a single drag.',
        },
        rotatedRectangle: {
          name: 'Rotated box',
          desc: 'Oriented boxes that hug tilted objects.',
        },
        ellipse: {name: 'Ellipse', desc: 'Ellipses that wrap round and oval objects.'},
        polygon: {
          name: 'Polygon',
          desc: 'Vertex polygons for instance-segmentation masks.',
        },
        polyline: {
          name: 'Polyline',
          desc: 'Open lines for lanes, paths, and boundaries.',
        },
        point: {name: 'Point', desc: 'Single-coordinate point annotations.'},
        keypoint: {
          name: 'Keypoints',
          desc: 'Skeleton keypoints for joints and landmarks.',
        },
        brush: {name: 'Brush', desc: 'Pixel-level masks, painted freehand.'},
        eraser: {name: 'Eraser', desc: 'Erase to refine painted masks.'},
        magicWand: {
          name: 'Magic wand',
          desc: 'Click once — AI (SAM) segments the object.',
        },
        cuboid: {
          name: 'Cuboid',
          desc: '3D boxes with move, rotate, and scale gizmos.',
        },
        point3d: {name: '3D Point', desc: 'Single 3D points in the cloud.'},
        polyline3d: {name: '3D Polyline', desc: 'Polylines that cross 3D space.'},
        polygon3d: {name: '3D Polygon', desc: '3D polygons for planar regions.'},
        keypoint3d: {name: '3D Keypoints', desc: '3D skeleton keypoints.'},
        segmentLasso: {
          name: 'Lasso segment',
          desc: 'Lasso-paint points into instances.',
        },
        segmentRect: {
          name: 'Rectangle segment',
          desc: 'Rectangle-select points into segments.',
        },
        dimension: {
          name: 'Dimension',
          desc: 'Measure distances with dimension lines.',
        },
      },
    },

    pages: {
      images: {
        title: 'Image labeling that keeps up, from boxes to keypoints.',
        intro:
          'Move between 12 tools with shortcuts and finish review on the same screen. The editor stays responsive even on large images.',
        sections: [
          {
            title: 'Twelve tools, all on shortcuts.',
            body: 'Rectangle (R), rotated rectangle (O), polygon (G), polyline (L), ellipse (E), point (P), brush (B) and eraser (X), keypoints (K) — every tool has a shortcut so your mouse never leaves the canvas. Each class carries its color and geometry type, so wrong-shape labels can’t happen.',
          },
          {
            title: 'Keypoints come from skeleton presets.',
            body: 'Start from person, hand, face, or animal templates, or define your own skeleton in a graphical editor by placing joints and connecting bones. When labeling, you just pick the preset.',
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
              'Rectangle · rotated rectangle · polygon · polyline · point · ellipse · brush mask · keypoints',
            ],
            ['Status workflow', 'Unlabeled → in progress → labeled → reviewed'],
            [
              'Editing',
              'Undo/redo · vertex editing · clone previous sample · grid · minimap',
            ],
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
            body: 'A ruler, playhead, and per-track keyframe markers dock at the bottom of the editor. Frame-precise stepping (previous/next/first/last) and an fps badge get you to the exact frame.',
          },
          {
            title: 'Keyframes for every shape.',
            body: 'Not just boxes — polygons, keypoints, and polylines all carry keyframes and interpolate between them. When an object disappears, split the track; when it returns, continue it.',
          },
          {
            title: 'From upload to playback, one place.',
            body: 'The video library manages raw and HLS streaming assets side by side. Encrypt sensitive footage at rest and organize clips into playlists for the team.',
          },
        ],
        specs: {
          rows: [
            ['Timeline', 'Ruler · playhead · track rows · diamond keyframe markers'],
            ['Interpolation', 'Automatic between keyframes · track split/continue'],
            ['Playback', 'Frame stepping · fps badge · playback speed'],
            ['Assets', 'Raw / HLS streaming · optional encryption · playlists'],
          ],
        },
      },

      pointClouds: {
        title: 'Millions of points, labeled in the browser.',
        intro:
          'Upload LAS/LAZ, PLY, or PCD and it opens instantly with GPU rendering. Work with a perspective view plus top/front/side orthographic views, labeling with cuboids and point segments.',
        sections: [
          {
            title: 'Four viewpoints on one scene.',
            body: 'Top (BEV), front, and side orthographic views stack next to the main perspective view. Refine cuboids with move/rotate/scale gizmos, then fit-to-points (F) or snap-to-ground (Shift+F). Switch coloring between RGB, label, height, intensity, and texture.',
          },
          {
            title: 'Auto-segmentation gets you started.',
            body: 'Filter invalid (0,0,0) points, remove dominant planes like floors and tables with RANSAC, then cluster the rest into instances on a voxel grid. Not happy with the result? One undo reverts it all.',
          },
          {
            title: 'Import and export the formats you already use.',
            body: 'LAS/LAZ decodes in the browser via WASM. Labeled PLY, SemanticKITTI (.label), Pointcept (.npy), and LAS classification round-trip your existing pipeline’s labels.',
          },
        ],
        specs: {
          rows: [
            ['Input formats', 'PLY · PCD · LAS · LAZ (in-browser WASM decoding)'],
            [
              'Label formats',
              'Labeled PLY · SemanticKITTI (.label) · Pointcept (.npy) · ASCII · LAS classification',
            ],
            [
              'Tools',
              'Cuboid · lasso/box segments · 3D point/polyline/polygon/keypoints · distance measure',
            ],
            [
              'Color modes',
              'RGB · label · height · intensity · texture (turbo/viridis colormaps, per-instance colors)',
            ],
            [
              'Auto-segmentation',
              'Invalid-point filtering · RANSAC dominant plane · grid clustering',
            ],
          ],
        },
      },

      datasets: {
        title: 'Images, video, and 3D as datasets of one project.',
        intro:
          'Every dataset has a type, and the right editor and tools follow automatically. Progress and class distribution are visible at a glance.',
        sections: [
          {
            title: 'Datasets with a type.',
            body: 'Image, video, or point cloud — choose a type at creation and upload validation, the editor, and tooling line up with it. Different modalities live side by side in one project.',
          },
          {
            title: 'Management you can see.',
            body: 'Each sample moves through unlabeled, in-progress, labeled, and reviewed. A progress bar and per-class annotation counts sit at the top of the dataset. Click a status chip to filter down to what’s left.',
          },
          {
            title: 'Classes and tags are your dataset’s language.',
            body: 'Classes carry a color and geometry type; tags carry a value type (choice, number, text). Keypoint classes link to skeleton presets. Or start instantly from the public dataset gallery with examples like COCO128.',
          },
        ],
        specs: {
          rows: [
            ['Dataset types', 'Image · video · point cloud'],
            ['Sample status', 'Unlabeled · in progress · labeled · reviewed'],
            ['Taxonomy', 'Classes (color · geometry) · tags (choice · number · text)'],
            ['Getting started', 'Drag-and-drop upload · public dataset gallery'],
          ],
        },
      },

      review: {
        title: 'Review that pins feedback on the label.',
        intro:
          'QA feedback lands as a pin at exact image coordinates. Labelers reply in a thread from the issues tab; resolving turns the pin green.',
        sections: [
          {
            title: 'Exact spot, exact feedback.',
            body: 'Click anywhere on the image with the comment tool (C) to open an issue. Instead of “box #3 is too big”, put the pin on that box. On video, pins stick to a specific frame.',
          },
          {
            title: 'Discuss in threads, close with resolve.',
            body: 'Every issue carries a comment thread. Open issues show as numbered amber pins; resolved ones as green checks. Filter by all, open, or resolved to see only what’s left.',
          },
          {
            title: 'Review status is progress.',
            body: 'Reviewed samples and open-issue counts roll up into dataset statistics, so leads can see how far QA has come without opening a single sample.',
          },
        ],
        specs: {
          rows: [
            [
              'Issue pins',
              'Image-coordinate anchored · video-frame anchored · numbered status badges',
            ],
            [
              'Threads',
              'Comments · replies · resolve/reopen · author and relative time',
            ],
            ['Filters', 'All · open · resolved'],
            ['Rollups', 'Open/resolved comments feed dataset statistics'],
          ],
        },
      },

      collaboration: {
        title: 'Your labeling team’s collaboration space, included.',
        intro:
          'Members and roles, wiki docs, files, and a video library — all scoped to the project. Stop keeping labeling guidelines in another tool.',
        sections: [
          {
            title: 'Guidelines belong in the wiki.',
            body: 'Write labeling criteria and edge cases in a Markdown wiki with LaTeX math, Mermaid diagrams, and tables. Edit in text, visual, or preview mode. One page is one file, so exporting is trivial.',
          },
          {
            title: 'Files, the Drive way.',
            body: 'Create folders, rubber-band select, and delete to a trash you can undo from. Images, video, point clouds, CSV, and JSON open in type-aware viewers.',
          },
          {
            title: 'Permissions split by role.',
            body: 'Invite members and assign roles so reviewers focus on QA, labelers on labeling, and developers on integrations.',
          },
        ],
        specs: {
          rows: [
            [
              'Wiki',
              'Markdown · LaTeX math · Mermaid diagrams · 3-mode editor · slide decks',
            ],
            [
              'Files',
              'Drive-style browsing · rubber-band selection · trash/undo · type-aware viewers',
            ],
            ['Video', 'HLS streaming · optional encryption · playlists'],
            ['Members', 'Role-based permissions · per-project invites'],
          ],
        },
      },

      developers: {
        title: 'One token for the API, one key to ship software.',
        intro:
          'Work with your data programmatically through project access tokens, and issue offline-verifiable license keys for installed software.',
        sections: [
          {
            title: 'Access tokens with explicit scopes.',
            body: 'Each token gets read/write scopes and an expiry. The plaintext shows exactly once at creation — only a hash is stored. Suspect a leak? Rotate it in one click.',
          },
          {
            title: 'License keys from issue to revoke.',
            body: 'Define policies (duration, machine count, features) and issue per-customer keys in the XXXXXXXX-XXXXXXXX four-group format. Track machine activations and choose an expiry strategy (restrict or revoke) from the dashboard.',
          },
          {
            title: 'Signatures that verify offline.',
            body: 'License files are signed with Ed25519. Installed software verifies them with an embedded public key — no network required. Download the public key as PEM and embed it as-is.',
          },
        ],
        specs: {
          rows: [
            [
              'Access tokens',
              'Scoped permissions · expiry · rotate/revoke · plaintext shown once (hash stored)',
            ],
            [
              'License keys',
              'Policies (duration · machines · features) · issue/suspend/revoke · activation tracking',
            ],
            [
              'Offline verification',
              'Ed25519 signatures · public key PEM · no network required',
            ],
            ['API', 'REST API · per-project authentication'],
          ],
        },
      },

      apps: {
        title: 'CV utilities for everything between labels.',
        intro:
          'From camera FOV math to undistortion, barcode reading, and a JSON formatter — 50+ utility apps live inside your project. Nothing to install, no tab juggling.',
        sections: [
          {
            title: 'From optics calculators to dev tools.',
            body: 'Optics tools like an FOV calculator, lens picker, and depth-of-field; vision tools like camera calibration, undistortion, and barcode reading; and developer tools like an HTTP client, JSON formatter, JWT viewer, and hex editor — all in one gallery.',
          },
          {
            title: 'They open straight from Files.',
            body: '“Open with app” on the Files page hands images and data to the right tool instantly. No more download-and-paste round trips.',
          },
        ],
        specs: {
          rows: [
            ['Optics', 'FOV calculator · lens picker · depth of field'],
            ['Vision', 'Camera calibration · undistortion · barcode · 3D modeler'],
            ['Developer', 'HTTP client · JSON formatter · JWT viewer · hex editor'],
            ['Integration', '“Open with app” from the Files page'],
          ],
        },
      },

      graphs: {
        title: 'Vision pipelines, wired like Blueprints.',
        intro:
          'Unreal-Blueprint-style visual scripting. Chain event, flow-control, math, and computer-vision (CVP) nodes through exec pins into a pipeline, and watch results in the execution log.',
        sections: [
          {
            title: 'Execution starts at an event.',
            body: 'Flow leaves the start event, passes control nodes like Branch and For Loop, and runs Load Image → Run Model → Save Annotations. Executing nodes glow yellow while output accumulates in the log panel below.',
          },
          {
            title: 'Drag from the palette, refine in the inspector.',
            body: 'Search the categorized node palette and drag nodes in; adjust labels and input values in the inspector. Graphs auto-save every 30 seconds and can be reused as templates.',
          },
        ],
        specs: {
          rows: [
            [
              'Nodes',
              'Events · flow control · variables · math · comparison · logic · string · array · cast · debug · CVP (vision)',
            ],
            ['Execution', 'Exec-pin flow · execution log · executing-node highlight'],
            ['Editing', 'Palette search · inspector · auto-save · templates'],
            ['Deployment', 'Remote execution on edge agents (planned)'],
          ],
        },
      },

      agents: {
        title: 'CVP’s hands and feet on edge devices.',
        intro:
          'Install agents on field devices and edge nodes to run graphs, collect data, and talk to equipment. Monitor status and dispatch work from the platform.',
        sections: [
          {
            title: 'Remote execution and scheduling.',
            body: 'Agents report health via heartbeats and run jobs on cron schedules. Inference apps (such as RF-DETR detection) run and train on the agent too.',
          },
          {
            title: 'Connected to industrial equipment.',
            body: 'Talk to PLCs and sensors over industrial protocols like Modbus and push collected data into the project — the bridge between the floor and the cloud.',
          },
        ],
        specs: {
          rows: [
            ['Execution', 'Graphs · inference/training apps (RF-DETR and more)'],
            ['Scheduling', 'Local cron scheduler'],
            ['Protocols', 'Modbus and other equipment integrations'],
            ['Monitoring', 'Heartbeats · versions · remote jobs'],
          ],
        },
      },

      clusters: {
        title: 'Kubernetes clusters, inside the project.',
        intro:
          'Register the Kubernetes clusters running your training and inference workloads, and control workloads, nodes, and events from the project.',
        sections: [
          {
            title: 'Like Portainer, but attached to your project.',
            body: 'Browse and control pods, deployments, and services in a tabbed UI — without losing the context of which project the resources serve.',
          },
          {
            title: 'A safe proxied connection.',
            body: 'Cluster APIs are reached through the platform’s reverse proxy, so the control screen works without putting credentials in the browser.',
          },
        ],
        specs: {
          rows: [
            ['Resources', 'Pods · deployments · services · nodes · events'],
            ['Connection', 'Via the platform reverse proxy'],
            ['UI', 'Cluster detail tabs · status dashboard'],
          ],
        },
      },

      vms: {
        title: 'Unified monitoring from camera to incident.',
        intro:
          'Manage CCTV cameras as a catalog and handle live view, playback, and the event-to-incident workflow on one monitoring screen.',
        sections: [
          {
            title: 'Watch, replay, move.',
            body: 'Multi-channel live layouts, timeline playback, and PTZ control. Cameras register into a catalog for centralized settings and permissions.',
          },
          {
            title: 'From event to incident.',
            body: 'Rule-matched events escalate into assignable incidents and notify external systems via webhooks. Audit logs and footage exports support investigations.',
          },
        ],
        specs: {
          rows: [
            ['Cameras', 'Catalog · PTZ · layouts'],
            ['Monitoring', 'Multi-channel live · timeline playback'],
            ['Workflow', 'Rules · events → incidents · webhooks'],
            ['Records', 'Audit logs · footage exports'],
          ],
        },
      },

      manufacturing: {
        title: 'The MES that links vision inspection to production.',
        intro:
          'A manufacturing execution module for work orders, traceability, and equipment monitoring — built on the MESA-11 model to tie inspection results to production context.',
        sections: [
          {
            title: 'From orders to schedules.',
            body: 'Manage the product catalog, production orders, and work schedules, with progress on a dashboard.',
          },
          {
            title: 'Your plant as a topology.',
            body: 'Visualize equipment and work units as a graph topology and attach edge agents to work units to collect floor data. Traceability queries follow what was produced, when, and on which equipment.',
          },
        ],
        specs: {
          rows: [
            ['Model', 'MESA-11-based feature set'],
            [
              'Features',
              'Production orders · catalog · schedule · traceability · equipment',
            ],
            ['Visualization', 'Architecture diagram · graph topology'],
          ],
        },
      },

      mlflow: {
        title: 'The path from labeled data to models.',
        intro:
          'MLflow-compatible experiment tracking, a model registry, and artifact storage built into the project. Your existing MLflow client code works as-is.',
        sections: [
          {
            title: 'Your MLflow client, unchanged.',
            body: 'Point the tracking URI at your project and pass an access token — existing training scripts just work. Experiments, runs, and metrics accumulate in the project.',
          },
          {
            title: 'From registry to endpoints.',
            body: 'Register validated models in the registry and manage versions. Artifacts are stored in project storage.',
          },
        ],
        specs: {
          rows: [
            ['Tracking', 'MLflow-compatible experiments · runs · metrics'],
            ['Registry', 'Model registration · versioning'],
            ['Artifacts', 'Stored in project storage'],
            ['Auth', 'Project access tokens'],
          ],
        },
      },

      grids: {
        title: 'A spreadsheet-style database for project data.',
        intro:
          'Create tables and manage rows and fields, Airtable-style. Experiment matrices, equipment lists, QA checklists — bring spreadsheet work into the project.',
        sections: [
          {
            title: 'Tables with typed fields.',
            body: 'Structure data with typed fields — text, number, choice, date — and save filters and sorting as views.',
          },
          {
            title: 'Data AI agents can read and write.',
            body: 'Grids are exposed as tools through the project’s remote MCP server, so AI agents can query and update tables in your automations.',
          },
        ],
        specs: {
          rows: [
            ['Fields', 'Typed fields: text · number · choice · date'],
            ['Views', 'Saved filters · sorting'],
            ['Integration', 'Tools exposed via the remote MCP server'],
          ],
        },
      },

      maps: {
        title: 'Add location to your vision data.',
        intro:
          'Drone surveys, facility inspections, camera placement — draw and manage layers and features on a map for projects where location matters.',
        sections: [
          {
            title: 'Self-served basemaps.',
            body: 'PMTiles basemaps are served by the platform itself — no external map API keys. Stack layers to organize your project’s spatial data.',
          },
          {
            title: 'Draw it, get GeoJSON.',
            body: 'Point, line, and polygon drawing tools store features as GeoJSON. Keep camera positions, inspection zones, and flight paths as data.',
          },
        ],
        specs: {
          rows: [
            ['Basemaps', 'Self-served PMTiles · MapLibre rendering'],
            ['Features', 'GeoJSON points · lines · polygons'],
            ['Drawing', 'terra-draw editing tools'],
          ],
        },
      },

      meetings: {
        title: 'The meeting ends; the minutes are already in the wiki.',
        intro:
          'Record a meeting and transcription, summarization, and wiki publishing follow automatically. Labeling-criteria discussions become team documentation.',
        sections: [
          {
            title: 'From recording to summary.',
            body: 'Record in the browser; Whisper transcribes and an LLM summarizes key decisions and action items.',
          },
          {
            title: 'Published to the wiki.',
            body: 'Finished minutes publish as project wiki pages, so guideline changes keep their meeting history alongside them.',
          },
        ],
        specs: {
          rows: [
            ['Transcription', 'Whisper speech recognition'],
            ['Summary', 'LLM summaries · action item extraction'],
            ['Publishing', 'Automatic project wiki publishing'],
          ],
        },
      },
    },
  },
} as const;
