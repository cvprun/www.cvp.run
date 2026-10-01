import {
  Boxes,
  ChevronDown,
  Cpu,
  FlaskConical,
  ImagePlus,
  Play,
  Plug,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * `/proj/:id/rfdetr` › 추론 (`pages/(app)/proj/rfdetr/_RfdetrInferTab.tsx`):
 * 추론 설정 + 탐지 결과 cards on the left, the image with the SVG box overlay
 * on the right. The sample picker thumbnails are the app's own bundled
 * Open Images samples (`constants/sampleImages.ts`).
 */
const COPY = {
  ko: {
    tabs: ['추론', '학습', '모델', '연결'],
    live: '실시간',
    phase: '대기',
    agentRunning: '실행 중',
    settingsTitle: '추론 설정',
    chooseImage: '이미지 선택',
    samples: '샘플 이미지',
    credit: 'Open Images (CC BY 2.0) · 클릭하면 바로 불러옵니다',
    threshold: '신뢰도 임계값',
    model: '모델',
    detect: '객체 탐지',
    device: '실행 디바이스',
    auto: '자동 (에이전트가 선택)',
    run: '추론 실행',
    resultTitle: '탐지 결과',
    summary: (n: number, ms: number) => `탐지 ${n}개 · ${ms}ms`,
    previewAlt: '추론 이미지 미리보기',
  },
  en: {
    tabs: ['Inference', 'Training', 'Models', 'Connect'],
    live: 'Live',
    phase: 'Idle',
    agentRunning: 'running',
    settingsTitle: 'Inference settings',
    chooseImage: 'Choose image',
    samples: 'Sample images',
    credit: 'Open Images (CC BY 2.0) · click to load instantly',
    threshold: 'Confidence threshold',
    model: 'Model',
    detect: 'Object detection',
    device: 'Device',
    auto: 'Automatic (agent decides)',
    run: 'Run inference',
    resultTitle: 'Detections',
    summary: (n: number, ms: number) => `${n} detections · ${ms}ms`,
    previewAlt: 'Inference image preview',
  },
} as const;

/** `lib/rfdetr/types.ts` DETECTION_COLORS, indexed by COCO class id. */
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
const color = (classId: number) => DETECTION_COLORS[classId % DETECTION_COLORS.length];

const IMAGE = {url: '/mockdata/gallery/g03.webp', w: 420, h: 420};
const SAMPLES = Array.from(
  {length: 12},
  (_, i) => `/mockdata/gallery/g${String(i + 1).padStart(2, '0')}.webp`,
);
const SELECTED_SAMPLE = 2;

/** RF-DETR Medium on sample g03 (NYPD patrol car). Boxes in 420×420 px. */
const DETECTIONS: {classId: number; name: string; score: number; box: number[]}[] = [
  {classId: 3, name: 'car', score: 0.968, box: [2, 28, 418, 394]},
  {classId: 1, name: 'person', score: 0.912, box: [112, 38, 141, 112]},
  {classId: 1, name: 'person', score: 0.895, box: [44, 50, 69, 112]},
  {classId: 1, name: 'person', score: 0.873, box: [66, 52, 91, 112]},
  {classId: 3, name: 'car', score: 0.819, box: [30, 48, 120, 83]},
  {classId: 8, name: 'truck', score: 0.784, box: [236, 1, 419, 50]},
  {classId: 1, name: 'person', score: 0.746, box: [139, 40, 162, 96]},
  {classId: 6, name: 'bus', score: 0.661, box: [20, 1, 182, 52]},
];

function Field({label, value, hint}: {label: string; value: string; hint?: string}) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-medium">{label}</p>
      <span className="flex h-6 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px]">
        <span className="truncate">{value}</span>
        {hint && (
          <span className="truncate text-[9px] text-muted-foreground">{hint}</span>
        )}
        <ChevronDown className="ml-auto size-3 shrink-0 text-muted-foreground" />
      </span>
    </div>
  );
}

export function MockRfdetrInference() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const threshold = 0.5;

  return (
    <MockAppFrame
      activeNav="rfdetr"
      title="RF-DETR"
      meta={
        <>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-800 dark:bg-green-500/15 dark:text-green-400">
            <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
            {c.live}
          </span>
          <span className="hidden rounded-md border border-border px-1.5 py-0.5 text-[10px] font-medium @lg:inline-flex">
            {c.phase}
          </span>
          <span className="hidden rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[10px] font-medium @lg:inline-flex">
            cuda:0
          </span>
        </>
      }
      actions={
        <span className="flex h-6 w-40 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px]">
          <Cpu className="size-3 shrink-0 opacity-70" />
          <span className="truncate">gpu-node-01</span>
          <span className="hidden text-[9px] text-muted-foreground @xl:inline">
            {c.agentRunning}
          </span>
          <ChevronDown className="ml-auto size-3 shrink-0 text-muted-foreground" />
        </span>
      }
      tabs={[
        {icon: Play, label: c.tabs[0], active: true},
        {icon: FlaskConical, label: c.tabs[1]},
        {icon: Boxes, label: c.tabs[2]},
        {icon: Plug, label: c.tabs[3]},
      ]}
    >
      <div className="grid gap-3.5 @lg:grid-cols-[180px_1fr] @4xl:grid-cols-[224px_1fr]">
        <div className="min-w-0 space-y-3.5">
          {/* 추론 설정 */}
          <div className="rounded-md border border-border bg-card p-3">
            <p className="mb-2.5 text-[11px] font-semibold">{c.settingsTitle}</p>
            <div className="space-y-3">
              <MockButton icon={ImagePlus} className="w-full justify-center">
                {c.chooseImage}
              </MockButton>

              <div className="hidden space-y-1.5 @4xl:block">
                <p className="text-[9px] text-muted-foreground">{c.samples}</p>
                <div className="grid grid-cols-6 gap-1">
                  {SAMPLES.map((url, i) => (
                    <img
                      key={url}
                      src={url}
                      alt=""
                      className={cn(
                        'aspect-square w-full rounded-[4px] border border-border object-cover',
                        i === SELECTED_SAMPLE && 'border-primary ring-2 ring-primary',
                      )}
                    />
                  ))}
                </div>
                <p className="text-[8px] text-muted-foreground">{c.credit}</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-medium">{c.threshold}</p>
                  <span className="font-mono text-[9px] text-muted-foreground">
                    {threshold.toFixed(2)}
                  </span>
                </div>
                <span className="relative block h-1 rounded-full bg-primary/20">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-primary"
                    style={{width: `${((threshold - 0.05) / 0.9) * 100}%`}}
                  />
                  <span
                    className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-background shadow"
                    style={{left: `${((threshold - 0.05) / 0.9) * 100}%`}}
                  />
                </span>
              </div>

              <Field label={c.model} value="RF-DETR Medium" hint={c.detect} />
              <div className="hidden @xl:block">
                <Field label={c.device} value={c.auto} />
              </div>

              <MockButton
                icon={Play}
                variant="default"
                className="w-full justify-center"
              >
                {c.run}
              </MockButton>
            </div>
          </div>

          {/* 탐지 결과 */}
          <div className="hidden rounded-md border border-border bg-card p-3 @lg:block">
            <p className="mb-1.5 text-[11px] font-semibold">{c.resultTitle}</p>
            <p className="mb-2 text-[10px] leading-snug text-muted-foreground">
              {c.summary(DETECTIONS.length, 84)}
              <span className="ml-1">({c.detect} · RF-DETR Medium)</span>
            </p>
            <ul className="max-h-44 space-y-1 overflow-hidden">
              {DETECTIONS.map((d, i) => (
                <li
                  key={i}
                  className="flex items-center gap-1.5 rounded border border-border px-1.5 py-0.5 text-[10px]"
                >
                  <span
                    className="size-2.5 shrink-0 rounded-sm"
                    style={{backgroundColor: color(d.classId)}}
                  />
                  <span className="min-w-0 flex-1 truncate">{d.name}</span>
                  <span className="font-mono text-[9px] text-muted-foreground">
                    {(d.score * 100).toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* preview */}
        <div className="min-w-0 self-start rounded-md border border-border bg-card p-3">
          <div className="relative">
            <img
              src={IMAGE.url}
              alt={c.previewAlt}
              className="block w-full rounded-md"
            />
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox={`0 0 ${IMAGE.w} ${IMAGE.h}`}
              preserveAspectRatio="none"
            >
              {DETECTIONS.map((d, i) => {
                const [x1, y1, x2, y2] = d.box;
                const stroke = color(d.classId);
                return (
                  <g key={i}>
                    <rect
                      x={x1}
                      y={y1}
                      width={x2 - x1}
                      height={y2 - y1}
                      fill="none"
                      stroke={stroke}
                      strokeWidth={2}
                    />
                    <text
                      x={x1 + 4}
                      y={Math.max(y1 - 6, 14)}
                      fill={stroke}
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {d.name} {Math.round(d.score * 100)}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </MockAppFrame>
  );
}
