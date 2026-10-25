import {
  Activity,
  Boxes,
  ChartSpline,
  CircleQuestionMark,
  Copy,
  Ellipsis,
  FlaskConical,
  GitCompare,
  Rocket,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {
  AliasChip,
  mlopsTabs,
  RunStatus,
  SourceBadge,
} from '@/components/mocks/mlops-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Run detail › 요약 (`/proj/:id/mlops/runs/:runKey?section=summary`): stage
 * actions, the five section pills, then `_RunTodo` (to review),
 * `_RunResultTiles` against @production, `_RunCurvePreview`,
 * `_RunKeyParams` with the diff to the previous run, and `_RunFactsAside`.
 * Values follow the run-detail story (base v5).
 */
const COPY = {
  ko: {
    crumbExp: '용접 비드 결함 탐지',
    title: '런 #6',
    done: '완료',
    unregistered: '미등록',
    register: '모델로 등록',
    useInfer: '추론에 사용',
    sections: ['요약', '파라미터 38', '메트릭 23', '아티팩트 6', '로그'],
    compare: '비교',
    todoTitle: '검토 대기',
    todoBody: '학습은 성공했지만 아직 어떤 모델 버전의 출처도 아닙니다.',
    results: '결과',
    resultsNote: '차이는 @production v5 기준',
    bestEpoch: '최고 에폭',
    curves: '학습 곡선',
    allMetrics: '메트릭 23개 보기',
    keyParams: '주요 파라미터',
    allParams: '파라미터 38개 보기',
    changed: '런 #5 대비 바뀐 시작 설정 3개',
    changes: ['데이터셋 weld-v2 → weld-v3', 'epochs 30 → 40', '고급 · useEma — → true'],
    thisRun: '이 런',
    data: '데이터',
    model: '모델',
    facts: {
      experiment: '실험',
      framework: '프레임워크 · 모델',
      frameworkValue: '이미지 객체 탐지 · rfdetr-medium',
      agent: '에이전트',
      started: '시작',
      startedValue: '10월 24일 14:02 · 1h 50m',
      runId: 'run id',
      inputs: '입력 데이터셋',
      train: '학습',
      digest: '다이제스트 9f1c2b7e',
      split: '학습 · 검증',
      splitValue: '412 · 103 · 주석 2,370',
      classes: '클래스',
      versions: '버전',
      notYet: '아직 등록되지 않음',
      weights: '가중치',
      inUse: '지금 쓰는 버전',
    },
  },
  en: {
    crumbExp: 'Weld bead defect detection',
    title: 'Run #6',
    done: 'Succeeded',
    unregistered: 'Unregistered',
    register: 'Register as model',
    useInfer: 'Use for inference',
    sections: ['Summary', 'Parameters 38', 'Metrics 23', 'Artifacts 6', 'Logs'],
    compare: 'Compare',
    todoTitle: 'To review',
    todoBody: 'It finished, but no model version comes from it yet.',
    results: 'Results',
    resultsNote: 'Differences against @production v5',
    bestEpoch: 'Best epoch',
    curves: 'Training curves',
    allMetrics: 'All 23 metrics',
    keyParams: 'Key parameters',
    allParams: 'All 38 parameters',
    changed: '3 start settings changed since run #5',
    changes: [
      'dataset weld-v2 → weld-v3',
      'epochs 30 → 40',
      'advanced · useEma — → true',
    ],
    thisRun: 'This run',
    data: 'Data',
    model: 'Model',
    facts: {
      experiment: 'Experiment',
      framework: 'Framework · model',
      frameworkValue: 'Image object detection · rfdetr-medium',
      agent: 'Agent',
      started: 'Started',
      startedValue: 'Oct 24 14:02 · 1h 50m',
      runId: 'Run ID',
      inputs: 'Input datasets',
      train: 'train',
      digest: 'digest 9f1c2b7e',
      split: 'Train · validation',
      splitValue: '412 · 103 · 2,370 annotations',
      classes: 'Classes',
      versions: 'Versions',
      notYet: 'Not registered yet',
      weights: 'Weights',
      inUse: 'Version in use',
    },
  },
} as const;

const TILES = [
  {key: 'val/mAP_50', value: '0.861', delta: '+0.019', better: true},
  {key: 'val/mAP_50_95', value: '0.612', delta: '+0.023', better: true},
  {key: 'val/loss', value: '0.284', delta: '−0.031', better: true},
];

const PARAMS: [string, string][] = [
  ['model', 'rfdetr-medium'],
  ['epochs', '40'],
  ['batch_size', '4'],
  ['learning_rate', '0.0001'],
  ['advanced.useEma', 'true'],
  ['runner.device', 'cuda:0'],
];

/** Smooth-ish training curve: 40 epochs, rising (mAP) or falling (loss). */
function curve(rising: boolean): number[] {
  return Array.from({length: 40}, (_, i) => {
    const t = i / 39;
    const base = rising ? 1 - Math.exp(-4 * t) : Math.exp(-3.2 * t);
    const wobble = Math.sin(i * 1.7) * 0.025 + Math.sin(i * 0.6) * 0.015;
    return Math.min(1, Math.max(0, base * 0.92 + wobble + (rising ? 0.04 : 0.06)));
  });
}

function Spark({points, label}: {points: number[]; label: string}) {
  const w = 220;
  const h = 70;
  const path = points
    .map((v, i) => `${(i / (points.length - 1)) * w},${h - v * (h - 6) - 3}`)
    .join(' ');
  return (
    <div className="min-w-0 rounded-md border border-border p-2">
      <p className="mb-1 font-mono text-[9px] text-muted-foreground">{label}</p>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full" preserveAspectRatio="none">
        {[0.25, 0.5, 0.75].map(y => (
          <line
            key={y}
            x1={0}
            x2={w}
            y1={h * y}
            y2={h * y}
            className="stroke-border"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <polyline
          points={path}
          fill="none"
          className="stroke-foreground"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

function Fact({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-2 py-1 text-[9.5px]">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

function AsideCard({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <div className="rounded-md border border-border bg-card px-3 py-2">
      <p className="mb-1 text-[8.5px] font-medium tracking-wider text-muted-foreground uppercase">
        {title}
      </p>
      <dl>{children}</dl>
    </div>
  );
}

export function MockMlopsRun() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const f = c.facts;

  return (
    <MockAppFrame
      activeNav="mlops"
      crumbs={[
        {icon: Activity, label: lang === 'ko' ? '런' : 'Runs'},
        {icon: FlaskConical, label: c.crumbExp},
        {icon: ChartSpline, label: c.title},
      ]}
      title={c.title}
      titleIcon={ChartSpline}
      meta={
        <>
          <RunStatus tone="succeeded">{c.done}</RunStatus>
          <span className="hidden items-center gap-1 rounded-md border border-border px-1.5 py-px text-[9px] text-muted-foreground @xl:inline-flex">
            <Boxes className="size-2.5" />
            {c.unregistered}
          </span>
        </>
      }
      actions={
        <>
          <MockButton variant="default">{c.register}</MockButton>
          <MockButton icon={Rocket} className="hidden @2xl:inline-flex">
            {c.useInfer}
          </MockButton>
          <MockButton icon={Ellipsis} className="px-1.5" />
        </>
      }
      tabs={mlopsTabs(lang, 'runs')}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="flex gap-0.5 rounded-md bg-muted p-[3px]">
          {c.sections.map((label, i) => (
            <span
              key={label}
              className={cn(
                'rounded-[4px] px-2 py-0.5 text-[9.5px] font-medium whitespace-nowrap',
                i === 0 ? 'bg-background shadow-sm' : 'text-muted-foreground',
                i >= 3 && 'hidden @2xl:inline',
              )}
            >
              {label}
            </span>
          ))}
        </span>
        <MockButton icon={GitCompare} className="ml-auto">
          {c.compare}
        </MockButton>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="min-w-0 flex-[999_1_28rem] space-y-3">
          <div className="flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2">
            <span className="min-w-0 flex-1 text-[10px]">
              <span className="font-semibold">{c.todoTitle}</span>
              <span className="text-muted-foreground"> · {c.todoBody}</span>
            </span>
            <MockButton variant="default">{c.register}</MockButton>
          </div>

          <div>
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <p className="text-[11px] font-semibold">{c.results}</p>
              <p className="text-[9px] text-muted-foreground">{c.resultsNote}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 @2xl:grid-cols-4">
              {TILES.map(tile => (
                <div
                  key={tile.key}
                  className="rounded-lg border border-border px-2.5 py-2"
                >
                  <p className="flex items-center gap-1 font-mono text-[9px] text-muted-foreground">
                    {tile.key}
                    <CircleQuestionMark className="size-2.5" />
                  </p>
                  <p className="text-lg font-semibold tracking-tight tabular-nums">
                    {tile.value}
                  </p>
                  <p
                    className={cn(
                      'text-[9px] tabular-nums',
                      tile.better
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-red-700 dark:text-red-400',
                    )}
                  >
                    {tile.delta}
                  </p>
                </div>
              ))}
              <div className="rounded-lg border border-border px-2.5 py-2">
                <p className="text-[9px] text-muted-foreground">{c.bestEpoch}</p>
                <p className="text-lg font-semibold tracking-tight tabular-nums">
                  37
                  <span className="text-[11px] font-normal text-muted-foreground">
                    {' '}
                    / 40
                  </span>
                </p>
                <p className="text-[9px] text-muted-foreground">1h 50m</p>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-baseline justify-between">
              <p className="text-[11px] font-semibold">{c.curves}</p>
              <p className="text-[9px] text-muted-foreground">{c.allMetrics}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Spark points={curve(true)} label="val/mAP_50" />
              <Spark points={curve(false)} label="val/loss" />
            </div>
          </div>

          <div className="hidden @xl:block">
            <div className="mb-1.5 flex items-baseline justify-between">
              <p className="text-[11px] font-semibold">{c.keyParams}</p>
              <p className="text-[9px] text-muted-foreground">{c.allParams}</p>
            </div>
            <div className="rounded-md border border-border px-3 py-2">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-1 @3xl:grid-cols-3">
                {PARAMS.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-2 font-mono text-[9px]"
                  >
                    <dt className="text-muted-foreground">{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-border pt-2">
                <span className="rounded-full bg-amber-500/15 px-1.5 text-[9px] font-medium text-amber-800 dark:text-amber-300">
                  {c.changed}
                </span>
                {c.changes.map(change => (
                  <span
                    key={change}
                    className="font-mono text-[9px] text-muted-foreground"
                  >
                    {change}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden min-w-0 flex-[1_1_15rem] space-y-2.5 @3xl:block">
          <AsideCard title={c.thisRun}>
            <Fact label={f.experiment}>
              <span className="flex items-center gap-1">
                <span className="truncate">{c.crumbExp}</span>
                <SourceBadge source="cvp" />
              </span>
            </Fact>
            <Fact label={f.framework}>{f.frameworkValue}</Fact>
            <Fact label={f.agent}>gpu-node-01 · cuda:0 · RTX 4090</Fact>
            <Fact label={f.started}>{f.startedValue}</Fact>
            <Fact label={f.runId}>
              <span className="flex items-center gap-1 font-mono">
                a3f9c2e1b7d4
                <Copy className="size-2.5 text-muted-foreground" />
              </span>
            </Fact>
          </AsideCard>
          <AsideCard title={c.data}>
            <Fact label={f.inputs}>
              <span className="flex flex-wrap items-center gap-1">
                weld-v3
                <span className="rounded bg-muted px-1 text-[8.5px]">{f.train}</span>
                <span className="text-muted-foreground">{f.digest}</span>
              </span>
            </Fact>
            <Fact label={f.split}>{f.splitValue}</Fact>
            <Fact label={f.classes}>2</Fact>
          </AsideCard>
          <AsideCard title={c.model}>
            <Fact label={f.versions}>{f.notYet}</Fact>
            <Fact label={f.weights}>
              <span className="font-mono">model/ · 128 MB</span>
            </Fact>
            <Fact label={f.inUse}>
              <span className="flex items-center gap-1">
                weld-defect-detector v5
                <AliasChip alias="production" />
              </span>
            </Fact>
          </AsideCard>
        </div>
      </div>
    </MockAppFrame>
  );
}
