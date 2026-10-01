import {
  Aperture,
  Barcode,
  Bomb,
  Box,
  Braces,
  Code2,
  Crosshair,
  FileText,
  Globe,
  Grid3x3,
  Grip,
  LayoutGrid,
  List,
  Maximize,
  Search,
  Tag,
  Wifi,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame, useNavLabel} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

type CategoryKey = 'vision' | 'data' | 'utility' | 'game';

type AppKey =
  | 'fov'
  | 'lensPicker'
  | 'calibrate'
  | 'barcode'
  | 'modeler'
  | 'jsonFormatter'
  | 'codeEditor'
  | 'httpClient'
  | 'wifiQr'
  | 'hwpEditor'
  | 'drawEditor'
  | 'g2048'
  | 'minesweeper';

const COPY = {
  ko: {
    search: '어플리케이션 검색…',
    tags: '태그',
    groupLabel: '그룹 기준',
    groupCategory: '카테고리별',
    sortLabel: '정렬 순서',
    sortNameAsc: '이름 (오름차순)',
    footnote:
      '모든 계산은 브라우저 안에서 수행되며 어떤 데이터도 외부로 전송되지 않습니다.',
    category: {vision: '비전', data: '데이터', utility: '유틸리티', game: '게임'},
    items: {
      fov: ['FOV 계산기', '센서·렌즈·작업거리로부터 시야각, GSD, ppmm 계산.'],
      lensPicker: [
        '렌즈 추천',
        '필요 해상도(ppmm)로 대상 폭을 커버할 초점거리를 추천.',
      ],
      calibrate: [
        '카메라 캘리브레이션',
        '체커보드 프레임을 수집해 내재 행렬·왜곡 계수 계산.',
      ],
      barcode: ['바코드 / QR', 'BarcodeDetector API 와 wasm 폴백으로 1D·2D 코드 감지.'],
      modeler: [
        '3D 모델러',
        '스케치업 류의 직접 모델링 도구. 프리미티브를 배치·변형해 공장 셸·레이아웃을 저작합니다.',
      ],
      jsonFormatter: ['JSON 포맷터', 'JSON 을 정렬·검증하고 들여쓰기를 정돈합니다.'],
      codeEditor: [
        '코드 에디터',
        '여러 언어의 구문 강조를 지원하는 코드 편집기입니다.',
      ],
      httpClient: [
        'HTTP 클라이언트',
        'REST API 요청을 작성·전송하고 응답을 확인하는 Insomnia 류 도구입니다.',
      ],
      wifiQr: [
        'WiFi QR 생성기',
        'SSID와 비밀번호를 담은 WiFi 접속 QR 코드를 2.4GHz·5GHz 대역별로 만들고 내려받거나 인쇄합니다.',
      ],
      hwpEditor: [
        'HWP 편집기',
        'HWP·HWPX 한글 문서를 브라우저에서 열어 보고 편집합니다.',
      ],
      drawEditor: [
        'Draw.io 에디터',
        '다이어그램·플로우차트·와이어프레임을 브라우저 안에서 작성하고 편집합니다.',
      ],
      g2048: ['2048', '숫자 타일을 밀어 합치며 2048 타일을 만들어 보세요.'],
      minesweeper: ['지뢰찾기', '숨겨진 지뢰를 건드리지 않고 보드를 모두 열어 보세요.'],
    },
  },
  en: {
    search: 'Search applications…',
    tags: 'Tags',
    groupLabel: 'Group by',
    groupCategory: 'Category',
    sortLabel: 'Sort',
    sortNameAsc: 'Name (A–Z)',
    footnote: 'All computation runs locally in your browser. Nothing is uploaded.',
    category: {vision: 'Vision', data: 'Data', utility: 'Utility', game: 'Game'},
    items: {
      fov: [
        'FOV Calculator',
        'Field of view, GSD and ppmm from sensor + lens + working distance.',
      ],
      lensPicker: [
        'Lens Picker',
        'Recommend a focal length to cover a target at a required ppmm.',
      ],
      calibrate: [
        'Camera Calibration',
        'Capture checkerboard frames and compute intrinsics + distortion.',
      ],
      barcode: [
        'Barcode / QR',
        'Detect 1D and 2D codes via the BarcodeDetector API with a wasm fallback.',
      ],
      modeler: [
        '3D Modeler',
        'SketchUp-style direct modeling. Place and transform primitives to author factory shells and layouts.',
      ],
      jsonFormatter: ['JSON Formatter', 'Pretty-print, validate and reformat JSON.'],
      codeEditor: [
        'Code Editor',
        'Edit code with syntax highlighting for many languages.',
      ],
      httpClient: [
        'HTTP Client',
        'An Insomnia-style tool to compose, send, and inspect REST API requests.',
      ],
      wifiQr: [
        'WiFi QR Generator',
        'Build WiFi join QR codes carrying the SSID and password for the 2.4GHz and 5GHz bands.',
      ],
      hwpEditor: [
        'HWP Editor',
        'Open, view and edit Korean HWP/HWPX documents in the browser.',
      ],
      drawEditor: [
        'Draw.io Editor',
        'Create and edit diagrams, flowcharts and wireframes — fully in your browser.',
      ],
      g2048: ['2048', 'Slide and merge numbered tiles to reach the 2048 tile.'],
      minesweeper: [
        'Minesweeper',
        'Clear the board without detonating any hidden mines.',
      ],
    },
  },
} as const;

/** Subset of `constants/apps.ts` (registry order), grouped by category. */
const GROUPS: {
  category: CategoryKey;
  apps: {key: AppKey; icon: LucideIcon; tags: string[]}[];
}[] = [
  {
    category: 'vision',
    apps: [
      {key: 'fov', icon: Maximize, tags: ['optics']},
      {key: 'lensPicker', icon: Aperture, tags: ['optics']},
      {key: 'calibrate', icon: Crosshair, tags: ['calibration']},
      {key: 'barcode', icon: Barcode, tags: ['codes']},
      {key: 'modeler', icon: Box, tags: ['modeling', '3d']},
    ],
  },
  {
    category: 'data',
    apps: [{key: 'jsonFormatter', icon: Braces, tags: ['format', 'data']}],
  },
  {
    category: 'utility',
    apps: [
      {key: 'codeEditor', icon: Code2, tags: ['code', 'editor']},
      {key: 'httpClient', icon: Globe, tags: ['network', 'http']},
      {key: 'wifiQr', icon: Wifi, tags: ['network', 'wifi', 'qr']},
      {key: 'hwpEditor', icon: FileText, tags: ['document', 'hwp']},
      {key: 'drawEditor', icon: Workflow, tags: ['diagram', 'editor']},
    ],
  },
  {
    category: 'game',
    apps: [
      {key: 'g2048', icon: Grid3x3, tags: ['game', 'puzzle']},
      {key: 'minesweeper', icon: Bomb, tags: ['game', 'puzzle']},
    ],
  },
];

function Select({label, value}: {label: string; value: string}) {
  return (
    <span className="hidden h-7 items-center gap-1 rounded-md border border-input bg-background px-2 text-[10px] whitespace-nowrap @2xl:flex">
      <span className="text-muted-foreground">{label}:</span>
      {value}
    </span>
  );
}

export function MockAppsGallery() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const nav = useNavLabel();

  return (
    <MockAppFrame activeNav="apps" title={nav('apps')}>
      {/* PageToolbar: search · tags · group · sort · view mode */}
      <div className="flex items-center gap-1.5">
        <span className="flex h-7 min-w-0 flex-1 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px] text-muted-foreground">
          <Search className="size-3 shrink-0" />
          <span className="truncate">{c.search}</span>
        </span>
        <span className="flex h-7 shrink-0 items-center gap-1 rounded-md border border-input bg-background px-2 text-[10px]">
          <Tag className="size-3" />
          {c.tags}
        </span>
        <Select label={c.groupLabel} value={c.groupCategory} />
        <Select label={c.sortLabel} value={c.sortNameAsc} />
        <span className="flex shrink-0 items-center rounded-md border border-border p-0.5">
          {[LayoutGrid, List, Grip].map((Icon, i) => (
            <span
              key={i}
              className={cn(
                'flex size-6 items-center justify-center rounded text-muted-foreground',
                i === 0 && 'bg-accent text-foreground',
              )}
            >
              <Icon className="size-3" />
            </span>
          ))}
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {GROUPS.map(({category, apps}) => (
          <section key={category} className="space-y-2">
            <h4 className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              {c.category[category]}
            </h4>
            <div className="grid grid-cols-2 gap-2.5 @3xl:grid-cols-3 @5xl:grid-cols-4">
              {apps.map(({key, icon: Icon, tags}) => {
                const [title, desc] = c.items[key];
                return (
                  <div
                    key={key}
                    className="rounded-md border border-border bg-card p-2.5"
                  >
                    <span className="flex items-start gap-2">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                        <Icon className="size-3.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[11px] font-semibold">
                          {title}
                        </span>
                        <span className="block text-[8px] tracking-wider text-muted-foreground uppercase">
                          {c.category[category]}
                        </span>
                      </span>
                    </span>
                    <p className="mt-1.5 line-clamp-2 text-[10px] leading-snug text-muted-foreground">
                      {desc}
                    </p>
                    <span className="mt-1.5 hidden flex-wrap gap-1 @2xl:flex">
                      {tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded bg-muted px-1 py-px text-[8px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-5 border-t border-border pt-3 text-[9px] tracking-wider text-muted-foreground uppercase">
        {c.footnote}
      </footer>
    </MockAppFrame>
  );
}
