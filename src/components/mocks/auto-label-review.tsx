import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Redo2,
  Save,
  Sparkles,
  LineSquiggle,
  Undo2,
  X,
} from 'lucide-react';

import {MockChrome, MockWindow} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * RF-DETR auto-label review, as the 2D editor shows it after a run:
 * `AutoLabelPreviewOverlay` (dashed SVG boxes over the canvas, deselected ones
 * faded, unmapped ones gray) + the floating `AutoLabelReviewPanel` card.
 *
 * Same photo as the image-editor mock (Open Images V6 c7b1e6f7c38fa1a0,
 * CC BY 2.0); detections are that image's real boxes with model-like jitter.
 */
const IMAGE_URL = '/mockdata/street-hero.webp';
const IMG_W = 1440;
const IMG_H = 1080;

const COPY = {
  ko: {
    fileName: 'street_0426.jpg',
    status: '진행 중',
    position: '8 / 12',
    unsaved: '저장되지 않은 변경 사항',
    title: '자동 라벨링 결과',
    discard: '버리기',
    mapping: '클래스 매핑',
    mappedCount: (mapped: number, total: number) => `${total}개 중 ${mapped}개 연결됨`,
    results: '결과',
    selectAll: '전체 선택',
    skip: '건너뜀',
    overlap: '중복',
    createMissing: '매핑되지 않은 이름으로 클래스 만들기',
    skipOverlapping: '기존 객체와 겹치는 결과 제외',
    apply: (n: number) => `적용 (${n})`,
  },
  en: {
    fileName: 'street_0426.jpg',
    status: 'In progress',
    position: '8 / 12',
    unsaved: 'Unsaved changes',
    title: 'Auto-label results',
    discard: 'Discard',
    mapping: 'Class mapping',
    mappedCount: (mapped: number, total: number) => `${mapped} of ${total} mapped`,
    results: 'Results',
    selectAll: 'Select all',
    skip: 'Skip',
    overlap: 'exists',
    createMissing: 'Create classes for unmapped names',
    skipOverlapping: 'Skip results that overlap existing objects',
    apply: (n: number) => `Apply (${n})`,
  },
} as const;

/** Dataset classes (target of the mapping). */
const DATASET_CLASSES: Record<string, string> = {
  car: '#6496F5',
  person: '#FF1E1E',
  truck: '#501EB4',
  'traffic-light': '#FFC800',
  'traffic-sign': '#FF0000',
};

/** `lib/rfdetr/types.ts` DETECTION_COLORS / detectionColor(classId). */
const DETECTION_COLORS = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
];
const detectionColor = (classId: number) =>
  DETECTION_COLORS[classId % DETECTION_COLORS.length];

/** Preview color of results that will not be applied. */
const UNMAPPED_COLOR = '#94a3b8';

/** COCO model classes seen in the result → dataset class (null = skip). */
const MODEL_CLASSES: {
  classId: number;
  name: string;
  count: number;
  target: string | null;
}[] = [
  {classId: 3, name: 'car', count: 5, target: 'car'},
  {classId: 10, name: 'traffic light', count: 3, target: 'traffic-light'},
  {classId: 1, name: 'person', count: 1, target: 'person'},
  {classId: 8, name: 'truck', count: 1, target: 'truck'},
  {classId: 13, name: 'stop sign', count: 1, target: null},
];

type Detection = {
  classId: number;
  score: number;
  box: [number, number, number, number];
  selected: boolean;
  overlap?: boolean;
};

const DETECTIONS: Detection[] = [
  {classId: 3, score: 0.94, box: [1156, 744, 1357, 924], selected: true},
  {classId: 8, score: 0.91, box: [288, 709, 552, 899], selected: true},
  {classId: 1, score: 0.89, box: [478, 734, 638, 992], selected: true},
  {
    classId: 10,
    score: 0.86,
    box: [61, 14, 146, 190],
    selected: false,
    overlap: true,
  },
  {classId: 3, score: 0.83, box: [714, 754, 790, 803], selected: true},
  {
    classId: 10,
    score: 0.81,
    box: [510, 12, 597, 186],
    selected: false,
    overlap: true,
  },
  {classId: 3, score: 0.77, box: [964, 758, 1054, 797], selected: true},
  {
    classId: 10,
    score: 0.72,
    box: [1229, 368, 1336, 556],
    selected: false,
    overlap: true,
  },
  {classId: 3, score: 0.64, box: [1313, 749, 1363, 822], selected: true},
  {classId: 13, score: 0.58, box: [1349, 674, 1395, 717], selected: true},
  {classId: 3, score: 0.46, box: [850, 758, 903, 790], selected: false},
];

/** Objects already on the sample (labeled earlier): lights and signs. */
const EXISTING: {color: string; x: number; y: number; w: number; h: number}[] = [
  {color: '#FFC800', x: 63, y: 11, w: 81, h: 176},
  {color: '#FFC800', x: 513, y: 9, w: 81, h: 180},
  {color: '#FFC800', x: 1233, y: 371, w: 101, h: 182},
  {color: '#FF0000', x: 220, y: 50, w: 104, h: 117},
  {color: '#FF0000', x: 340, y: 36, w: 113, h: 115},
];

const HOVERED = 0;

function targetOf(classId: number): string | null {
  return MODEL_CLASSES.find(c => c.classId === classId)?.target ?? null;
}

function modelName(classId: number): string {
  return MODEL_CLASSES.find(c => c.classId === classId)?.name ?? '';
}

function MockCheckbox({checked}: {checked: boolean}) {
  return (
    <span
      className={cn(
        'flex size-3 shrink-0 items-center justify-center rounded-[3px] border',
        checked
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-input bg-background',
      )}
    >
      {checked && <Check className="size-2.5" strokeWidth={3} />}
    </span>
  );
}

function HeaderIcon({icon: Icon, dim = false}: {icon: typeof Undo2; dim?: boolean}) {
  return (
    <span
      className={cn(
        'flex size-6 shrink-0 items-center justify-center rounded-md',
        dim ? 'text-muted-foreground/40' : 'text-muted-foreground',
      )}
    >
      <Icon className="size-3.5" />
    </span>
  );
}

export function MockAutoLabelReview() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  const mapped = MODEL_CLASSES.filter(m => m.target !== null).length;
  const applicable = DETECTIONS.filter(
    d => d.selected && targetOf(d.classId) !== null,
  ).length;

  return (
    <MockWindow className="@container">
      <MockChrome />
      {/* EditorHeader (trimmed to what a narrow column keeps) */}
      <div className="flex h-10 items-center gap-1.5 border-b border-border bg-background px-2.5">
        <HeaderIcon icon={ArrowLeft} />
        <span className="mr-1 truncate text-[11px] font-medium">{c.fileName}</span>
        <span className="hidden h-6 w-24 shrink-0 items-center gap-1.5 rounded-md border border-input px-2 text-[10px] @xl:flex">
          <LineSquiggle className="size-3 text-amber-600 dark:text-amber-400" />
          <span className="flex-1 truncate">{c.status}</span>
          <ChevronDown className="size-3 text-muted-foreground/60" />
        </span>
        <span className="flex items-center">
          <HeaderIcon icon={ChevronLeft} />
          <span className="min-w-10 text-center text-[10px] text-muted-foreground tabular-nums">
            {c.position}
          </span>
          <HeaderIcon icon={ChevronRight} />
        </span>
        <span className="flex-1" />
        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-accent text-foreground">
          <Sparkles className="size-3.5" />
        </span>
        <span className="mx-1 h-5 w-px shrink-0 bg-border" />
        <HeaderIcon icon={Undo2} dim />
        <HeaderIcon icon={Redo2} dim />
        <span className="ml-1 hidden h-6 shrink-0 items-center gap-1 rounded-md border border-input px-2 text-[10px] font-medium text-muted-foreground shadow-sm @2xl:flex">
          <Save className="size-3" />
          {c.unsaved}
        </span>
      </div>

      <div className="relative h-[24rem] overflow-hidden bg-neutral-950 sm:h-[27rem]">
        {/* canvas + AutoLabelPreviewOverlay (image anchored left so the
            floating review card covers as little of it as possible) */}
        <svg
          viewBox={`0 0 ${IMG_W} ${IMG_H}`}
          className="h-full w-full"
          preserveAspectRatio="xMinYMid meet"
        >
          <image href={IMAGE_URL} width={IMG_W} height={IMG_H} />
          {EXISTING.map((o, i) => (
            <rect
              key={i}
              x={o.x}
              y={o.y}
              width={o.w}
              height={o.h}
              fill={o.color}
              fillOpacity={0.12}
              stroke={o.color}
              strokeWidth={5}
            />
          ))}
          {DETECTIONS.map((d, i) => {
            const target = targetOf(d.classId);
            const color = target ? DATASET_CLASSES[target] : UNMAPPED_COLOR;
            const on = d.selected && target !== null;
            const [x1, y1, x2, y2] = d.box;
            return (
              <g key={i} opacity={on ? 1 : 0.3}>
                <rect
                  x={x1}
                  y={y1}
                  width={x2 - x1}
                  height={y2 - y1}
                  fill="none"
                  stroke={color}
                  strokeWidth={i === HOVERED ? 8 : 5.5}
                  strokeDasharray="16 11"
                />
              </g>
            );
          })}
        </svg>

        {/* AutoLabelReviewPanel */}
        <div className="absolute top-2.5 right-2.5 flex max-h-[calc(100%-1.25rem)] w-60 flex-col gap-2.5 rounded-lg border border-border bg-background/95 p-2.5 shadow-lg backdrop-blur @2xl:w-64">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium">{c.title}</span>
            <X className="size-3 text-muted-foreground" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-medium">{c.mapping}</span>
              <span className="text-muted-foreground">
                {c.mappedCount(mapped, MODEL_CLASSES.length)}
              </span>
            </div>
            <div className="space-y-1">
              {MODEL_CLASSES.map(m => (
                <div key={m.classId} className="flex items-center gap-1.5">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{backgroundColor: detectionColor(m.classId)}}
                  />
                  <span className="w-[4.5rem] shrink-0 truncate text-[10px]">
                    {m.name}
                  </span>
                  <span className="w-4 shrink-0 text-right text-[10px] text-muted-foreground tabular-nums">
                    {m.count}
                  </span>
                  <span className="flex h-5 min-w-0 flex-1 items-center gap-1 rounded-md border border-input bg-background px-1.5 text-[10px]">
                    <span
                      className={cn(
                        'flex-1 truncate',
                        !m.target && 'text-muted-foreground',
                      )}
                    >
                      {m.target ?? c.skip}
                    </span>
                    <ChevronDown className="size-2.5 shrink-0 text-muted-foreground/60" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="min-h-0 space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-medium">{c.results}</span>
              <span className="flex items-center gap-1">
                <MockCheckbox checked={false} />
                {c.selectAll}
              </span>
            </div>
            <div className="h-28 overflow-hidden rounded border border-border p-0.5 sm:h-32">
              {DETECTIONS.map((d, i) => {
                const target = targetOf(d.classId);
                return (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center gap-1.5 rounded px-1 py-[3px]',
                      i === HOVERED && 'bg-accent',
                    )}
                  >
                    <MockCheckbox checked={d.selected} />
                    <span className="min-w-0 flex-1 truncate text-[10px]">
                      {target ?? modelName(d.classId)}
                      {!target && (
                        <span className="text-muted-foreground">
                          {' · '}
                          {c.skip}
                        </span>
                      )}
                    </span>
                    {d.overlap && (
                      <span className="rounded bg-muted px-1 text-[8px] text-muted-foreground">
                        {c.overlap}
                      </span>
                    )}
                    <span className="text-[10px] text-muted-foreground tabular-nums">
                      {d.score.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-1">
            <span className="flex items-center gap-1.5 text-[10px]">
              <MockCheckbox checked={false} />
              <span className="truncate">{c.createMissing}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[10px]">
              <MockCheckbox checked />
              <span className="truncate">{c.skipOverlapping}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="flex h-6 flex-1 items-center justify-center gap-1 rounded-md bg-primary text-[10px] font-medium text-primary-foreground shadow">
              <Check className="size-3" />
              {c.apply(applicable)}
            </span>
            <span className="flex h-6 items-center rounded-md px-2 text-[10px] font-medium text-muted-foreground">
              {c.discard}
            </span>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}
