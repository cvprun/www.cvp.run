import {
  Boxes,
  ChevronDown,
  Cpu,
  Database,
  Download,
  FolderOpen,
  History,
  Image,
  LayoutDashboard,
  Play,
  RotateCcw,
  Save,
  ScanSearch,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * 추론 › 기능 › 이미지 객체 탐지 (`/proj/:id/infer/detection`, `FeatureFrame`):
 * agent + model pickers in the header, then the three panels — input source
 * (`InputSourcePanel`, dataset sample picked) | result with the SVG box
 * overlay, detections list and `ResultActions` | inference settings — and
 * the `_EngineNotice` footer, the only place the engine's product name shows.
 */
const COPY = {
  ko: {
    title: '이미지 객체 탐지',
    tabs: ['개요', '기능', '모델', '히스토리'],
    live: '실시간',
    phase: '대기',
    running: '실행 중',
    trainLink: '학습 → 실험 탭',
    model: '탐지 Medium',
    inputTitle: '입력',
    sources: ['샘플 이미지', '데이터셋', '파일', '업로드'],
    dataset: '데이터셋',
    datasetValue: '도심 주행 2026-10',
    sample: '샘플',
    sampleValue: 'street_0418.jpg',
    picked: '데이터셋 샘플 · street_0418.jpg',
    settingsTitle: '추론 설정',
    threshold: '신뢰도 임계값',
    device: '실행 장치',
    auto: '자동 (에이전트가 선택)',
    run: '추론 실행',
    resultTitle: '탐지 결과',
    summary: (n: number, ms: number) =>
      `탐지 ${n}개 · ${ms}ms (객체 탐지 · 탐지 Medium)`,
    again: '다시 추론',
    save: '라벨로 저장',
    json: 'JSON 내려받기',
    engine: '엔진 RF-DETR (Apache-2.0) · 라이선스 고지',
  },
  en: {
    title: 'Image object detection',
    tabs: ['Overview', 'Features', 'Models', 'History'],
    live: 'Live',
    phase: 'Idle',
    running: 'running',
    trainLink: 'Training → Experiments tab',
    model: 'Detection Medium',
    inputTitle: 'Input',
    sources: ['Sample image', 'Dataset', 'File', 'Upload'],
    dataset: 'Dataset',
    datasetValue: 'Urban drive 2026-10',
    sample: 'Sample',
    sampleValue: 'street_0418.jpg',
    picked: 'Dataset sample · street_0418.jpg',
    settingsTitle: 'Inference settings',
    threshold: 'Confidence threshold',
    device: 'Device',
    auto: 'Automatic (agent decides)',
    run: 'Run inference',
    resultTitle: 'Detections',
    summary: (n: number, ms: number) =>
      `${n} detections · ${ms}ms (Object detection · Detection Medium)`,
    again: 'Run again',
    save: 'Save as labels',
    json: 'Download JSON',
    engine: 'Engine RF-DETR (Apache-2.0) · License notice',
  },
} as const;

/** Class palette of the result overlay, indexed by `classId % 8`. */
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

/** Open Images V6 `6325cc0d75ab233e` (CC BY 2.0), 420×420 crop. */
const IMAGE = {url: '/mockdata/gallery/g03.webp', w: 420, h: 420};

/** Medium detector on the image above; boxes in image pixels. */
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

const SOURCE_ICONS = [Image, Database, FolderOpen, Upload];

function Select({
  label,
  value,
  icon: Icon,
}: {
  label?: string;
  value: string;
  icon?: typeof Cpu;
}) {
  return (
    <div className="space-y-1">
      {label && <p className="text-[10px] font-medium">{label}</p>}
      <span className="flex h-6 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px]">
        {Icon && <Icon className="size-3 shrink-0 opacity-70" />}
        <span className="truncate">{value}</span>
        <ChevronDown className="ml-auto size-3 shrink-0 text-muted-foreground" />
      </span>
    </div>
  );
}

function Panel({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('min-w-0 rounded-md border border-border bg-card p-3', className)}
    >
      {title && <p className="mb-2.5 text-[11px] font-semibold">{title}</p>}
      {children}
    </div>
  );
}

export function MockInferFeature() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const threshold = 0.5;
  const thresholdPct = ((threshold - 0.05) / 0.9) * 100;

  return (
    <MockAppFrame
      activeNav="infer"
      crumbs={[
        {icon: Sparkles, label: c.tabs[1]},
        {icon: ScanSearch, label: c.title},
      ]}
      title={c.title}
      titleIcon={ScanSearch}
      meta={
        <>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-800 dark:bg-green-500/15 dark:text-green-400">
            <span className="size-1.5 rounded-full bg-green-500 motion-safe:animate-pulse" />
            {c.live}
          </span>
          <span className="hidden rounded-md border border-border px-1.5 py-0.5 text-[10px] font-medium @lg:inline-flex">
            {c.phase}
          </span>
          <span className="hidden rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[10px] font-medium @2xl:inline-flex">
            cuda:0
          </span>
        </>
      }
      actions={
        <>
          <span className="flex h-6 w-36 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px]">
            <Cpu className="size-3 shrink-0 opacity-70" />
            <span className="truncate">gpu-01</span>
            <span className="hidden text-[9px] text-muted-foreground @xl:inline">
              {c.running}
            </span>
            <ChevronDown className="ml-auto size-3 shrink-0 text-muted-foreground" />
          </span>
          <span className="hidden h-6 w-36 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px] @3xl:flex">
            <span className="truncate">{c.model}</span>
            <span className="ml-auto font-mono text-[9px] text-muted-foreground">
              386 MB
            </span>
            <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
          </span>
          <span className="hidden text-[10px] text-muted-foreground underline-offset-2 @5xl:inline">
            {c.trainLink}
          </span>
        </>
      }
      tabs={[
        {icon: LayoutDashboard, label: c.tabs[0]},
        {icon: Sparkles, label: c.tabs[1], active: true},
        {icon: Boxes, label: c.tabs[2]},
        {icon: History, label: c.tabs[3]},
      ]}
    >
      <div className="grid gap-3 @3xl:grid-cols-[12rem_minmax(0,1fr)] @5xl:grid-cols-[12.5rem_minmax(0,1fr)_12.5rem]">
        {/* input */}
        <Panel title={c.inputTitle}>
          <div className="grid grid-cols-2 gap-1 rounded-md bg-muted p-1">
            {c.sources.map((label, i) => {
              const Icon = SOURCE_ICONS[i];
              return (
                <span
                  key={label}
                  className={cn(
                    'flex items-center justify-center gap-1 rounded-[4px] px-1 py-1 text-[9px] font-medium whitespace-nowrap',
                    i === 1 ? 'bg-background shadow-sm' : 'text-muted-foreground',
                  )}
                >
                  <Icon className="size-3 shrink-0" />
                  {label}
                </span>
              );
            })}
          </div>
          <div className="mt-3 space-y-2.5">
            <Select label={c.dataset} value={c.datasetValue} />
            <Select label={c.sample} value={c.sampleValue} />
            <span className="flex items-center gap-1.5 rounded-md bg-muted/40 px-2 py-1.5 text-[9.5px]">
              <Database className="size-3 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate">{c.picked}</span>
              <X className="size-3 shrink-0 text-muted-foreground" />
            </span>
          </div>
        </Panel>

        {/* result */}
        <div className="min-w-0 space-y-3 @3xl:col-start-2 @3xl:row-span-2 @3xl:row-start-1 @5xl:row-span-1">
          <Panel>
            <div className="relative mx-auto max-w-[26rem]">
              <img src={IMAGE.url} alt="" className="block w-full rounded-md" />
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
            <div className="mt-3 flex flex-wrap gap-1.5">
              <MockButton icon={RotateCcw}>{c.again}</MockButton>
              <MockButton icon={Save}>{c.save}</MockButton>
              <MockButton icon={Download} variant="ghost">
                {c.json}
              </MockButton>
            </div>
          </Panel>
          <Panel title={c.resultTitle} className="hidden @lg:block">
            <p className="-mt-1 mb-2 text-[10px] text-muted-foreground">
              {c.summary(DETECTIONS.length, 84)}
            </p>
            <ul className="grid gap-1 @2xl:grid-cols-2">
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
          </Panel>
        </div>

        {/* settings */}
        <Panel
          title={c.settingsTitle}
          className="self-start @3xl:col-start-1 @5xl:col-start-3 @5xl:row-start-1"
        >
          <div className="space-y-3">
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
                  style={{width: `${thresholdPct}%`}}
                />
                <span
                  className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-background shadow"
                  style={{left: `${thresholdPct}%`}}
                />
              </span>
            </div>
            <Select label={c.device} value={c.auto} />
            <MockButton icon={Play} variant="default" className="w-full justify-center">
              {c.run}
            </MockButton>
          </div>
        </Panel>
      </div>

      <p className="mt-4 border-t border-border pt-2.5 text-[9.5px] text-muted-foreground">
        {c.engine}
      </p>
    </MockAppFrame>
  );
}
