import {
  Boxes,
  CheckCircle2,
  ExternalLink,
  FlaskConical,
  LayoutDashboard,
  LineChart,
  Link2,
  Loader2,
  Maximize2,
  PenLine,
  Play,
  Search,
  Square,
  Wand2,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Training experiment detail (`pages/(app)/proj/mlops/training/[experimentId]`):
 * the MLOps tab bar stays (the route tree's `mlops` frame draws it), then
 * 구성 card, 실행 (Runs) table and the 학습 추이 metric grid (`MetricCharts`).
 */
const COPY = {
  ko: {
    tabs: ['개요', '훈련 실험', '실험 추적', '모델', '엔드포인트'],
    name: '교차로 차량 탐지 v3',
    rename: '이름 변경',
    launching: '실행 중',
    config: '구성',
    framework: '프레임워크',
    model: '모델',
    trainRatio: 'Train 비율',
    epochs: '에폭',
    runs: '실행 (Runs)',
    cols: ['#', '상태', '진행률', '메트릭', '에이전트', '시작', '소요', '액션'],
    status: {running: '학습 중', succeeded: '완료', failed: '실패'},
    openMlflow: 'MLflow 실행 보기',
    useForInference: '추론에 사용',
    chartTitle: '학습 추이',
    filter: '메트릭 이름 필터',
    axis: ['스텝', '경과(초)'],
  },
  en: {
    tabs: ['Overview', 'Training', 'Experiments', 'Models', 'Endpoint'],
    name: 'Intersection vehicles v3',
    rename: 'Rename',
    launching: 'Running',
    config: 'Configuration',
    framework: 'Framework',
    model: 'Model',
    trainRatio: 'Train ratio',
    epochs: 'Epochs',
    runs: 'Runs',
    cols: [
      '#',
      'Status',
      'Progress',
      'Metrics',
      'Agent',
      'Started',
      'Duration',
      'Actions',
    ],
    status: {running: 'Running', succeeded: 'Succeeded', failed: 'Failed'},
    openMlflow: 'Open MLflow run',
    useForInference: 'Use for inference',
    chartTitle: 'Training progress',
    filter: 'Filter metric names',
    axis: ['Step', 'Elapsed (s)'],
  },
} as const;

const MLOPS_TAB_ICONS = [LayoutDashboard, FlaskConical, LineChart, Boxes, Link2];

type Status = 'running' | 'succeeded' | 'failed';

/** `TrainingStatusBadge` tints (mirrors `RunStatusBadge`). */
const STATUS_STYLE: Record<Status, {icon: LucideIcon; className: string}> = {
  running: {
    icon: Loader2,
    className: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  },
  succeeded: {
    icon: CheckCircle2,
    className:
      'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  },
  failed: {
    icon: XCircle,
    className: 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300',
  },
};

function StatusBadge({status, label}: {status: Status; label: string}) {
  const {icon: Icon, className} = STATUS_STYLE[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap',
        className,
      )}
    >
      <Icon className={cn('size-3', status === 'running' && 'animate-spin')} />
      {label}
    </span>
  );
}

type Run = {
  seq: number;
  status: Status;
  epoch: number | null;
  metrics: [string, string][];
  agent: string;
  started: string;
  duration: string;
};

const TOTAL_EPOCHS = 50;

const RUNS: Run[] = [
  {
    seq: 3,
    status: 'running',
    epoch: 34,
    metrics: [
      ['train/loss', '3.412'],
      ['val/mAP_50', '0.7814'],
      ['val/mAP_50_95', '0.5362'],
    ],
    agent: 'gpu-node-01',
    started: '2026-09-30 14:12',
    duration: '2h 41m',
  },
  {
    seq: 2,
    status: 'succeeded',
    epoch: 50,
    metrics: [
      ['train/loss', '3.187'],
      ['val/mAP_50', '0.7526'],
      ['val/mAP_50_95', '0.5104'],
    ],
    agent: 'gpu-node-01',
    started: '2026-09-28 09:40',
    duration: '3h 58m',
  },
  {
    seq: 1,
    status: 'failed',
    epoch: 3,
    metrics: [['train/loss', '6.905']],
    agent: 'edge-jetson-02',
    started: '2026-09-27 18:05',
    duration: '11m 24s',
  },
];

/** Per-epoch series of the charted (newest) run, 34 epochs so far. */
function series(fn: (e: number) => number, seed: number): number[] {
  let s = seed;
  const noise = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647 - 0.5;
  };
  return Array.from({length: 34}, (_, e) => fn(e) + noise() * fn(e) * 0.05);
}

const CHARTS: {key: string; points: number[]}[] = [
  {key: 'train/loss', points: series(e => 3.3 + 5.2 * Math.exp(-e / 5.5), 7)},
  {
    key: 'val/mAP_50',
    points: series(e => 0.79 * (1 - Math.exp(-(e + 1) / 6.5)), 11),
  },
  {
    key: 'val/mAP_50_95',
    points: series(e => 0.545 * (1 - Math.exp(-(e + 1) / 7.5)), 23),
  },
];

const CHART_W = 240;
const CHART_H = 88;
const PAD = {l: 26, r: 6, t: 6, b: 14};

/** `MetricChartCard`: mono key + expand, one uPlot line on `--chart-1`. */
function MetricChart({metricKey, points}: {metricKey: string; points: number[]}) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const lo = min - (max - min) * 0.08;
  const hi = max + (max - min) * 0.08;
  const x = (i: number) =>
    PAD.l + (i / (points.length - 1)) * (CHART_W - PAD.l - PAD.r);
  const y = (v: number) =>
    PAD.t + (1 - (v - lo) / (hi - lo)) * (CHART_H - PAD.t - PAD.b);
  const d = points
    .map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(' ');
  const ticks = [lo + (hi - lo) * 0.15, (lo + hi) / 2, hi - (hi - lo) * 0.15];

  return (
    <div className="min-w-0 rounded-md border border-border p-2.5">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="truncate font-mono text-[10px] font-medium">{metricKey}</span>
        <Maximize2 className="size-3 shrink-0 text-muted-foreground" />
      </div>
      <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="block w-full">
        {ticks.map(v => (
          <g key={v}>
            <line
              x1={PAD.l}
              x2={CHART_W - PAD.r}
              y1={y(v)}
              y2={y(v)}
              className="stroke-border"
              strokeWidth={0.6}
            />
            <text
              x={PAD.l - 3}
              y={y(v) + 2.5}
              textAnchor="end"
              className="fill-muted-foreground"
              fontSize={7}
            >
              {v >= 1 ? v.toFixed(1) : v.toFixed(2)}
            </text>
          </g>
        ))}
        {[0, 10, 20, 30].map(e => (
          <text
            key={e}
            x={x(e)}
            y={CHART_H - 3}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize={7}
          >
            {e}
          </text>
        ))}
        <path
          d={d}
          fill="none"
          stroke="#2a78d6"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Card({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <div className="rounded-md border border-border bg-card">
      <p className="px-3.5 pt-3 pb-2 text-[12px] font-semibold">{title}</p>
      {children}
    </div>
  );
}

export function MockExperimentRun() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  const config: [string, string][] = [
    [c.framework, 'rfdetr'],
    [c.model, 'rfdetr-medium'],
    [c.trainRatio, '80%'],
    [c.epochs, String(TOTAL_EPOCHS)],
  ];

  return (
    <MockAppFrame
      activeNav="mlops"
      crumbs={[{label: c.tabs[1]}, {label: c.name}]}
      title={c.name}
      actions={
        <>
          <MockButton icon={PenLine} className="hidden @xl:inline-flex">
            {c.rename}
          </MockButton>
          <MockButton icon={Play} variant="default" className="opacity-50">
            {c.launching}
          </MockButton>
        </>
      }
      tabs={c.tabs.map((label, i) => ({
        label,
        icon: MLOPS_TAB_ICONS[i],
        active: i === 1,
      }))}
    >
      <div className="space-y-3">
        {/* 구성 */}
        <Card title={c.config}>
          <div className="grid grid-cols-2 gap-2 px-3.5 pb-3 text-[11px] @2xl:grid-cols-4">
            {config.map(([label, value]) => (
              <div key={label}>
                <div className="text-[10px] text-muted-foreground">{label}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* 실행 (Runs) */}
        <Card title={c.runs}>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="h-8 border-y border-border text-left text-muted-foreground">
                <th className="px-3 font-medium">{c.cols[0]}</th>
                <th className="px-2 font-medium">{c.cols[1]}</th>
                <th className="hidden px-2 font-medium @2xl:table-cell">{c.cols[2]}</th>
                <th className="hidden px-2 font-medium @4xl:table-cell">{c.cols[3]}</th>
                <th className="hidden px-2 font-medium @5xl:table-cell">{c.cols[4]}</th>
                <th className="hidden px-2 font-medium @2xl:table-cell">{c.cols[5]}</th>
                <th className="hidden px-2 text-right font-medium @4xl:table-cell">
                  {c.cols[6]}
                </th>
                <th className="px-3 text-right font-medium">{c.cols[7]}</th>
              </tr>
            </thead>
            <tbody>
              {RUNS.map((run, ri) => (
                <tr
                  key={run.seq}
                  className={cn('align-middle', ri > 0 && 'border-t border-border')}
                >
                  <td className="px-3 py-2 tabular-nums">#{run.seq}</td>
                  <td className="px-2 py-2">
                    <StatusBadge status={run.status} label={c.status[run.status]} />
                  </td>
                  <td className="hidden px-2 py-2 @2xl:table-cell">
                    {run.epoch !== null && (
                      <span className="flex min-w-20 flex-col gap-1">
                        <span className="text-[10px] tabular-nums">
                          {run.epoch}/{TOTAL_EPOCHS} epoch
                        </span>
                        <span className="h-1 overflow-hidden rounded-full bg-primary/20">
                          <span
                            className="block h-full bg-primary"
                            style={{width: `${(run.epoch / TOTAL_EPOCHS) * 100}%`}}
                          />
                        </span>
                      </span>
                    )}
                  </td>
                  <td className="hidden px-2 py-2 @4xl:table-cell">
                    <span className="flex flex-col gap-px">
                      {run.metrics.map(([k, v]) => (
                        <span
                          key={k}
                          className="font-mono text-[9px] whitespace-nowrap"
                        >
                          <span className="text-muted-foreground">{k}</span>{' '}
                          <span className="tabular-nums">{v}</span>
                        </span>
                      ))}
                    </span>
                  </td>
                  <td className="hidden px-2 py-2 whitespace-nowrap @5xl:table-cell">
                    {run.agent}
                  </td>
                  <td className="hidden px-2 py-2 text-[10px] whitespace-nowrap text-muted-foreground tabular-nums @2xl:table-cell">
                    {run.started}
                  </td>
                  <td className="hidden px-2 py-2 text-right text-[10px] whitespace-nowrap text-muted-foreground tabular-nums @4xl:table-cell">
                    {run.duration}
                  </td>
                  <td className="px-3 py-2">
                    <span className="flex items-center justify-end gap-1">
                      <MockButton icon={ExternalLink}>
                        <span className="hidden @3xl:inline">{c.openMlflow}</span>
                      </MockButton>
                      {run.status === 'succeeded' && (
                        <MockButton icon={Wand2}>
                          <span className="hidden @3xl:inline">
                            {c.useForInference}
                          </span>
                        </MockButton>
                      )}
                      {run.status === 'running' && (
                        <MockButton icon={Square} variant="ghost" />
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* 학습 추이 */}
        <Card title={c.chartTitle}>
          <div className="px-3.5 pb-3.5">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-md border border-input px-2 text-[10px] text-muted-foreground">
                <Search className="size-3 shrink-0" />
                <span className="truncate">{c.filter}</span>
              </span>
              <span className="flex h-6 shrink-0 items-center rounded-md bg-muted p-0.5 text-[10px]">
                <span className="rounded-sm bg-background px-2 py-0.5 font-medium shadow-sm">
                  {c.axis[0]}
                </span>
                <span className="px-2 py-0.5 text-muted-foreground">{c.axis[1]}</span>
              </span>
            </div>
            <div className="grid gap-2.5 @xl:grid-cols-2 @4xl:grid-cols-3">
              {CHARTS.map((chart, i) => (
                <div key={chart.key} className={cn(i === 2 && 'hidden @4xl:block')}>
                  <MetricChart metricKey={chart.key} points={chart.points} />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </MockAppFrame>
  );
}
