import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  ChevronRight,
  CornerDownLeft,
  FlaskConical,
  LayoutDashboard,
  LineChart,
  Link2,
  ListChecks,
  Loader2,
  MoveLeft,
  Radar,
  RefreshCcw,
  Rocket,
  Tags,
  TestTube2,
  Video,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * MLOps › 개요 (`pages/(app)/proj/mlops/index.tsx`): `OverviewStats`, then
 * `RecentRunsCard` + `RegistrySummaryCard`, then the six-stage
 * `PipelineDiagram` with its loop-back rail.
 */
const COPY = {
  ko: {
    tabs: ['개요', '훈련 실험', '실험 추적', '모델', '엔드포인트'],
    stats: ['실험', '총 실행', '실행 중', '등록된 모델'],
    recentRuns: '최근 실행',
    registry: '등록된 모델',
    viewAll: '전체 보기',
    diagramTitle: 'MLOps 작업 파이프라인',
    diagramHint: '각 단계의 기능 칩을 클릭하면 해당 화면으로 이동합니다.',
    loop: '지속적 개선 루프 — 모니터링 인사이트가 다시 데이터 수집으로 이어집니다',
    stages: [
      {
        title: '데이터 수집',
        summary:
          '현장 카메라와 비디오, 파일 저장소에서 학습의 원천이 되는 원시 데이터를 모읍니다.',
        features: ['비디오', '파일 저장소'],
      },
      {
        title: '데이터 준비·라벨링',
        summary:
          '수집한 데이터를 데이터셋으로 구성하고 어노테이션으로 학습 가능한 형태로 가공합니다.',
        features: ['데이터셋', '그래프 파이프라인'],
      },
      {
        title: '학습·실험 추적',
        summary:
          '클러스터에서 모델을 학습하고 MLflow로 실험, 파라미터, 메트릭을 추적합니다.',
        features: ['훈련 실험', 'MLflow 실험'],
      },
      {
        title: '모델 레지스트리',
        summary: '검증된 모델을 버전과 스테이지로 관리하며 배포 후보를 선별합니다.',
        features: ['모델 레지스트리'],
      },
      {
        title: '배포·서빙',
        summary:
          '액세스 토큰으로 외부 학습 환경을 연동하고 에이전트로 현장에 모델을 배포합니다.',
        features: ['트래킹 엔드포인트', '액세스 토큰', '에이전트'],
      },
      {
        title: '모니터링·운영',
        summary:
          '활동과 사용량, 제조 라인 지표를 관찰해 재학습이 필요한 시점을 포착합니다.',
        features: ['활동 로그', '사용량'],
      },
    ],
  },
  en: {
    tabs: ['Overview', 'Training', 'Experiments', 'Models', 'Endpoint'],
    stats: ['Experiments', 'Total runs', 'Running', 'Registered models'],
    recentRuns: 'Recent runs',
    registry: 'Registered models',
    viewAll: 'View all',
    diagramTitle: 'MLOps Pipeline',
    diagramHint: 'Click a feature chip in each stage to open that screen.',
    loop: 'Continuous improvement loop — monitoring insights feed back into data collection',
    stages: [
      {
        title: 'Data Collection',
        summary:
          'Gather raw data for training from on-site cameras, videos, and file storage.',
        features: ['Videos', 'File Storage'],
      },
      {
        title: 'Data Prep & Labeling',
        summary:
          'Organize collected data into datasets and annotate it into a trainable form.',
        features: ['Datasets', 'Graph Pipelines'],
      },
      {
        title: 'Training & Tracking',
        summary:
          'Train models on clusters and track experiments, parameters, and metrics with MLflow.',
        features: ['Training experiments', 'MLflow Experiments'],
      },
      {
        title: 'Model Registry',
        summary:
          'Manage validated models with versions and stages, and curate deployment candidates.',
        features: ['Model Registry'],
      },
      {
        title: 'Deploy & Serve',
        summary:
          'Connect external training environments with access tokens and ship models to the field via agents.',
        features: ['Tracking Endpoint', 'Access Tokens', 'Agents'],
      },
      {
        title: 'Monitor & Operate',
        summary:
          'Watch activity, usage, and factory-line metrics to spot when retraining is needed.',
        features: ['Activity', 'Usage'],
      },
    ],
  },
} as const;

const MLOPS_TAB_ICONS = [LayoutDashboard, FlaskConical, LineChart, Boxes, Link2];

const STAT_ICONS = [FlaskConical, ListChecks, Loader2, Boxes];
const STAT_VALUES = [5, 51, 2, 3];

/** `PipelineDiagram` stage icon + accent ring, in pipeline order. */
const STAGE_STYLE: {icon: LucideIcon; className: string}[] = [
  {
    icon: Video,
    className: 'bg-sky-500/10 text-sky-600 ring-sky-500/25 dark:text-sky-400',
  },
  {
    icon: Tags,
    className: 'bg-amber-500/10 text-amber-600 ring-amber-500/25 dark:text-amber-400',
  },
  {
    icon: FlaskConical,
    className:
      'bg-violet-500/10 text-violet-600 ring-violet-500/25 dark:text-violet-400',
  },
  {
    icon: Boxes,
    className:
      'bg-emerald-500/10 text-emerald-600 ring-emerald-500/25 dark:text-emerald-400',
  },
  {
    icon: Rocket,
    className: 'bg-rose-500/10 text-rose-600 ring-rose-500/25 dark:text-rose-400',
  },
  {
    icon: Radar,
    className:
      'bg-indigo-500/10 text-indigo-600 ring-indigo-500/25 dark:text-indigo-400',
  },
];

type RunStatus = 'RUNNING' | 'FINISHED' | 'FAILED';

const RUN_STYLE: Record<RunStatus, {icon: LucideIcon; className: string}> = {
  RUNNING: {
    icon: Loader2,
    className: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  },
  FINISHED: {
    icon: CheckCircle2,
    className:
      'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  },
  FAILED: {
    icon: XCircle,
    className: 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300',
  },
};

const RECENT_RUNS: {
  name: string;
  experiment: string;
  status: RunStatus;
  start: string;
  duration: string;
}[] = [
  {
    name: 'rfdetr-medium-e50-lr1e-4',
    experiment: 'intersection-vehicles',
    status: 'RUNNING',
    start: '2026-09-30 14:12',
    duration: '2h 41m',
  },
  {
    name: 'chronos-bolt-small-h24',
    experiment: 'line3-temp-forecast',
    status: 'RUNNING',
    start: '2026-09-30 16:05',
    duration: '48m 12s',
  },
  {
    name: 'rfdetr-seg-small-e40',
    experiment: 'ppe-helmet-seg',
    status: 'FINISHED',
    start: '2026-09-29 20:31',
    duration: '3h 07m',
  },
  {
    name: 'rfdetr-medium-e50',
    experiment: 'intersection-vehicles',
    status: 'FINISHED',
    start: '2026-09-28 09:40',
    duration: '3h 58m',
  },
  {
    name: 'pointgroup-v1m1-ft',
    experiment: 'scannet-insseg-ptv3',
    status: 'FAILED',
    start: '2026-09-26 13:18',
    duration: '6m 40s',
  },
];

type Stage = 'Production' | 'Staging';

const STAGE_BADGE: Record<Stage, {icon: LucideIcon; className: string}> = {
  Production: {
    icon: Rocket,
    className:
      'border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  },
  Staging: {
    icon: TestTube2,
    className: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  },
};

const MODELS: {
  name: string;
  updated: string;
  stages: [Stage, number][];
  latest: number;
}[] = [
  {
    name: 'intersection-detector',
    updated: '2026-09-28 13:44',
    stages: [
      ['Production', 4],
      ['Staging', 5],
    ],
    latest: 5,
  },
  {
    name: 'ppe-helmet-seg',
    updated: '2026-09-29 23:52',
    stages: [['Staging', 2]],
    latest: 2,
  },
  {
    name: 'line3-temp-forecaster',
    updated: '2026-09-21 08:15',
    stages: [['Production', 7]],
    latest: 7,
  },
];

function Pill({
  icon: Icon,
  className,
  label,
  spin = false,
}: {
  icon: LucideIcon;
  className: string;
  label: string;
  spin?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-medium',
        className,
      )}
    >
      <Icon className={cn('size-2.5', spin && 'animate-spin')} />
      {label}
    </span>
  );
}

function ListCard({
  title,
  viewAll,
  children,
}: {
  title: string;
  viewAll: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-md border border-border bg-card">
      <div className="flex items-center justify-between px-3.5 pt-3 pb-1">
        <p className="text-[12px] font-semibold">{title}</p>
        <MockButton variant="ghost">
          {viewAll}
          <ArrowRight className="size-3" />
        </MockButton>
      </div>
      <ul className="flex flex-col divide-y divide-border px-3.5 pb-2">{children}</ul>
    </div>
  );
}

export function MockMlopsOverview() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="mlops"
      title="MLOps"
      tabs={c.tabs.map((label, i) => ({
        label,
        icon: MLOPS_TAB_ICONS[i],
        active: i === 0,
      }))}
    >
      {/* OverviewStats */}
      <div className="grid grid-cols-2 gap-2.5 @3xl:grid-cols-4">
        {c.stats.map((label, i) => {
          const Icon = STAT_ICONS[i];
          const live = i === 2;
          return (
            <div
              key={label}
              className="flex items-center justify-between gap-2 rounded-md border border-border bg-card px-3.5 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-[9px] font-medium tracking-wider text-muted-foreground uppercase">
                  {label}
                </p>
                <p className="mt-0.5 text-[22px] leading-tight font-semibold tracking-tight tabular-nums">
                  {STAT_VALUES[i]}
                </p>
              </div>
              <Icon
                className={cn(
                  'size-4 shrink-0',
                  live ? 'animate-spin text-primary' : 'text-muted-foreground',
                )}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-3.5 grid gap-3.5 @3xl:grid-cols-2">
        <ListCard title={c.recentRuns} viewAll={c.viewAll}>
          {RECENT_RUNS.map(run => (
            <li key={run.name} className="flex items-center gap-2.5 py-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium">{run.name}</p>
                <p className="truncate text-[9px] text-muted-foreground">
                  {run.experiment}
                </p>
              </div>
              <Pill
                {...RUN_STYLE[run.status]}
                label={run.status}
                spin={run.status === 'RUNNING'}
              />
              <span className="hidden w-20 shrink-0 text-right text-[9px] text-muted-foreground tabular-nums @5xl:block">
                {run.start}
              </span>
              <span className="w-12 shrink-0 text-right text-[9px] text-muted-foreground tabular-nums">
                {run.duration}
              </span>
            </li>
          ))}
        </ListCard>

        <ListCard title={c.registry} viewAll={c.viewAll}>
          {MODELS.map(model => (
            <li key={model.name} className="flex items-center gap-2.5 py-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium">{model.name}</p>
                <p className="truncate text-[9px] text-muted-foreground tabular-nums">
                  {model.updated}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                {model.stages.map(([stage, version]) => (
                  <span key={stage} className="flex items-center gap-1">
                    <Pill {...STAGE_BADGE[stage]} label={stage} />
                    <span className="text-[9px] text-muted-foreground tabular-nums">
                      v{version}
                    </span>
                  </span>
                ))}
                <span className="rounded-md bg-muted px-1.5 py-0.5 text-[9px] font-medium tabular-nums">
                  v{model.latest}
                </span>
              </div>
            </li>
          ))}
        </ListCard>
      </div>

      {/* PipelineDiagram */}
      <section className="mt-3.5 rounded-md border border-border bg-card px-4 py-4 @4xl:px-6 @4xl:py-5">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h4 className="text-[12px] font-semibold">{c.diagramTitle}</h4>
          <p className="text-[10px] text-muted-foreground">{c.diagramHint}</p>
        </div>

        <ol className="grid grid-cols-6">
          {c.stages.map((stage, i) => {
            const {icon: Icon, className} = STAGE_STYLE[i];
            const first = i === 0;
            const last = i === c.stages.length - 1;
            return (
              <li key={stage.title} className="min-w-0">
                <div className="flex items-center">
                  <span className={cn('h-px flex-1', first ? '' : 'bg-border')} />
                  {!first && (
                    <ChevronRight className="-ml-1 size-2.5 shrink-0 text-muted-foreground/60" />
                  )}
                  <span
                    className={cn(
                      'flex size-7 shrink-0 items-center justify-center rounded-full ring-1 ring-inset',
                      className,
                    )}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <span className={cn('h-px flex-1', last ? '' : 'bg-border')} />
                </div>
                <div className="px-1 pt-2.5 text-center @4xl:px-2">
                  <span className="block font-mono text-[9px] font-medium tracking-widest text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h5 className="text-[10px] leading-tight font-semibold @4xl:text-[11px]">
                    {stage.title}
                  </h5>
                  <p className="mt-1 hidden text-[9px] leading-relaxed text-muted-foreground @4xl:block">
                    {stage.summary}
                  </p>
                  <div className="mt-2 hidden flex-wrap justify-center gap-1 @2xl:flex">
                    {stage.features.map(feature => (
                      <span
                        key={feature}
                        className="rounded-full border border-border bg-background px-1.5 py-0.5 text-[9px] text-foreground/80"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-5 flex items-center gap-2">
          <MoveLeft className="size-3 shrink-0 text-muted-foreground/70" />
          <span className="flex-1 border-t border-dashed border-border" />
          <span className="flex min-w-0 items-center gap-1 text-[9px] text-muted-foreground">
            <RefreshCcw className="size-2.5 shrink-0" />
            <span className="truncate">{c.loop}</span>
          </span>
          <span className="flex-1 border-t border-dashed border-border" />
          <CornerDownLeft className="size-3 shrink-0 text-muted-foreground/70" />
        </div>
      </section>
    </MockAppFrame>
  );
}
