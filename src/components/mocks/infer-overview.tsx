import {
  Box,
  Boxes,
  CheckCircle2,
  Download,
  GraduationCap,
  History,
  LayoutDashboard,
  ScanSearch,
  Server,
  Sparkles,
  TrendingUp,
  TriangleAlert,
  Wand2,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {MockCard, MockFlowStrip, type FlowCell} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * 추론 › 개요 (`/proj/:id/infer`, `pages/(app)/proj/infer/index.tsx`): the
 * five-cell FlowStrip, then 준비 상태 · 확인할 항목 · 최근 추론 · 에이전트.
 * Rows follow the story fixtures; model labels use the app's generalized
 * names (`탐지 Medium`), not product names.
 */
type Status = 'ready' | 'model_missing' | 'trained_only';

const STATUS_DOT: Record<Status, string> = {
  ready: 'bg-emerald-500',
  model_missing: 'bg-amber-500',
  trained_only: 'bg-violet-500',
};

const COPY = {
  ko: {
    title: '개요',
    tabs: ['개요', '기능', '모델', '히스토리'],
    open: '추론 열기',
    flow: [
      {
        label: '기능',
        value: '5/7',
        detail: '모델 내려받기 1 · 학습 필요 1',
        warn: true,
      },
      {label: '에이전트', value: '3/4', detail: '온라인 · 실행 중 인스턴스 6'},
      {label: '모델', value: '8', detail: '캐시 2.2 GB'},
      {label: '오늘 추론', value: '14', detail: '실패 1', warn: true},
      {label: '라벨 저장', value: '37', detail: '이번 주 · 데이터셋 2개'},
    ] as FlowCell[],
    readiness: '준비 상태',
    featuresTab: '기능 탭',
    groups: [
      {label: '이미지', parts: ['ready', 'ready'] as Status[], text: '준비됨 2'},
      {
        label: '포인트 클라우드',
        parts: ['ready', 'ready'] as Status[],
        text: '준비됨 2',
      },
      {
        label: '시계열',
        parts: ['ready', 'model_missing', 'trained_only'] as Status[],
        text: '준비됨 1 · 모델 내려받기 필요 1 · 학습 필요 1',
      },
    ],
    legend: {
      ready: '준비됨',
      model_missing: '모델 내려받기 필요',
      trained_only: '학습 필요',
    },
    attention: '확인이 필요한 항목',
    attentionRows: [
      {
        kind: 'model_missing',
        title: '이상 탐지 모델이 cpu-office 외 1대에 없습니다.',
        detail: '예측 Small (제로샷) · 182.2 MB',
        action: '내려받기',
      },
      {
        kind: 'trained_only',
        title: '분류 기능에는 학습한 모델이 필요합니다.',
        detail: '사전학습 모델이 없는 기능입니다.',
        action: '실험에서 학습',
      },
      {
        kind: 'failed',
        title: '객체 탐지 추론 1건이 오늘 실패했습니다.',
        detail: '09:42 · gpu-01 · weights_missing: detect:large',
        action: '기록 보기',
      },
    ],
    recent: '최근 추론',
    historyLink: '히스토리',
    ok: '성공',
    failed: '실패',
    runs: [
      {
        icon: ScanSearch,
        name: '객체 탐지',
        model: '탐지 Medium',
        line: 'weld-0421.jpg · gpu-01 · 탐지 4 · 0.3초',
        time: '10:12',
        ok: true,
      },
      {
        icon: Wand2,
        name: '세그멘테이션',
        model: '세그멘테이션 Small (2.1)',
        line: 'IMG_2231.png · gpu-01 · 점수 0.93 · 0.4초',
        time: '10:05',
        ok: true,
      },
      {
        icon: Box,
        name: '시맨틱',
        model: '3D 분할 · 실내 (ScanNet v2)',
        line: 'scan-07.ply · gpu-01 · 점 1204511 · 클래스 13 · 18.4초',
        time: '09:58',
        ok: true,
      },
      {
        icon: TrendingUp,
        name: '예측',
        model: '예측 Small (제로샷)',
        line: 'line-2-temp.parquet · cpu-office · 24단계 예측 · 0.9초',
        time: '09:51',
        ok: true,
      },
      {
        icon: ScanSearch,
        name: '객체 탐지',
        model: '',
        line: 'weld-0419.jpg · gpu-01 · weights_missing: detect:large',
        time: '09:42',
        ok: false,
      },
    ],
    agents: '에이전트',
    modelsTab: '모델 탭',
    agentRows: [
      {
        name: 'gpu-01',
        badge: 'RTX 4090',
        detail: '7개 기능 · 캐시 1.7 GB · 여유 812 GB',
        right: '4 실행 중',
        online: true,
      },
      {
        name: 'cpu-office',
        badge: 'Linux · x64',
        detail: '예측 · 이상 탐지 · 분류 · 캐시 182.2 MB · 여유 120 GB',
        right: '1 실행 중',
        online: true,
      },
      {
        name: 'old-03',
        badge: 'Linux · x64',
        detail: '객체 탐지 · 캐시 0 B',
        right: '1 실행 중',
        online: true,
      },
      {
        name: 'edge-02',
        badge: 'Linux · arm64',
        detail: '연결 안 됨 · 마지막 접속 10월 22일',
        right: '',
        online: false,
      },
    ],
  },
  en: {
    title: 'Overview',
    tabs: ['Overview', 'Features', 'Models', 'History'],
    open: 'Open inference',
    flow: [
      {
        label: 'Features',
        value: '5/7',
        detail: '1 need a model · 1 need training',
        warn: true,
      },
      {label: 'Agents', value: '3/4', detail: 'Online · 6 instances running'},
      {label: 'Models', value: '8', detail: '2.2 GB cached'},
      {label: 'Runs today', value: '14', detail: '1 failed', warn: true},
      {label: 'Labels saved', value: '37', detail: 'This week · 2 datasets'},
    ] as FlowCell[],
    readiness: 'Readiness',
    featuresTab: 'Features tab',
    groups: [
      {label: 'Image', parts: ['ready', 'ready'] as Status[], text: '2 ready'},
      {label: 'Point cloud', parts: ['ready', 'ready'] as Status[], text: '2 ready'},
      {
        label: 'Time series',
        parts: ['ready', 'model_missing', 'trained_only'] as Status[],
        text: '1 ready · 1 model download needed · 1 training needed',
      },
    ],
    legend: {
      ready: 'Ready',
      model_missing: 'Model download needed',
      trained_only: 'Training needed',
    },
    attention: 'Needs attention',
    attentionRows: [
      {
        kind: 'model_missing',
        title: 'cpu-office and 1 more have no model for Anomaly.',
        detail: 'Forecast Small (zero-shot) · 182.2 MB',
        action: 'Download',
      },
      {
        kind: 'trained_only',
        title: 'Classify needs a trained model.',
        detail: 'This feature has no pretrained weights.',
        action: 'Train in experiments',
      },
      {
        kind: 'failed',
        title: '1 object detection run failed today.',
        detail: '09:42 · gpu-01 · weights_missing: detect:large',
        action: 'View runs',
      },
    ],
    recent: 'Recent runs',
    historyLink: 'History',
    ok: 'OK',
    failed: 'Failed',
    runs: [
      {
        icon: ScanSearch,
        name: 'Object detection',
        model: 'Detection Medium',
        line: 'weld-0421.jpg · gpu-01 · 4 detections · 0.3s',
        time: '10:12',
        ok: true,
      },
      {
        icon: Wand2,
        name: 'Segmentation',
        model: 'Segmentation Small (2.1)',
        line: 'IMG_2231.png · gpu-01 · Score 0.93 · 0.4s',
        time: '10:05',
        ok: true,
      },
      {
        icon: Box,
        name: 'Semantic',
        model: '3D segmentation · indoor (ScanNet v2)',
        line: 'scan-07.ply · gpu-01 · 1204511 points · 13 classes · 18.4s',
        time: '09:58',
        ok: true,
      },
      {
        icon: TrendingUp,
        name: 'Forecast',
        model: 'Forecast Small (zero-shot)',
        line: 'line-2-temp.parquet · cpu-office · 24-step forecast · 0.9s',
        time: '09:51',
        ok: true,
      },
      {
        icon: ScanSearch,
        name: 'Object detection',
        model: '',
        line: 'weld-0419.jpg · gpu-01 · weights_missing: detect:large',
        time: '09:42',
        ok: false,
      },
    ],
    agents: 'Agents',
    modelsTab: 'Models tab',
    agentRows: [
      {
        name: 'gpu-01',
        badge: 'RTX 4090',
        detail: '7 features · 1.7 GB cached · 812 GB free',
        right: '4 running',
        online: true,
      },
      {
        name: 'cpu-office',
        badge: 'Linux · x64',
        detail: 'Forecast · Anomaly · Classify · 182.2 MB cached · 120 GB free',
        right: '1 running',
        online: true,
      },
      {
        name: 'old-03',
        badge: 'Linux · x64',
        detail: 'Object detection · 0 B cached',
        right: '1 running',
        online: true,
      },
      {
        name: 'edge-02',
        badge: 'Linux · arm64',
        detail: 'Not connected · last seen Oct 22',
        right: '',
        online: false,
      },
    ],
  },
} as const;

const ATTENTION_ICON: Record<string, {icon: LucideIcon; tone: string}> = {
  model_missing: {
    icon: Download,
    tone: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  },
  trained_only: {
    icon: GraduationCap,
    tone: 'bg-violet-500/15 text-violet-700 dark:text-violet-400',
  },
  failed: {icon: XCircle, tone: 'bg-destructive/15 text-destructive'},
};

function RunBadge({ok, label}: {ok: boolean; label: string}) {
  return ok ? (
    <span className="inline-flex shrink-0 items-center gap-0.5 rounded-md border border-border px-1 py-px text-[9px] font-medium text-emerald-700 dark:text-emerald-400">
      <CheckCircle2 className="size-2.5" />
      {label}
    </span>
  ) : (
    <span className="inline-flex shrink-0 items-center gap-0.5 rounded-md bg-destructive px-1 py-px text-[9px] font-medium text-white">
      <XCircle className="size-2.5" />
      {label}
    </span>
  );
}

export function MockInferOverview() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="infer"
      crumbs={[{icon: LayoutDashboard, label: c.title}]}
      title={c.title}
      titleIcon={LayoutDashboard}
      actions={
        <MockButton icon={Sparkles} variant="default">
          {c.open}
        </MockButton>
      }
      tabs={[
        {icon: LayoutDashboard, label: c.tabs[0], active: true},
        {icon: Sparkles, label: c.tabs[1]},
        {icon: Boxes, label: c.tabs[2]},
        {icon: History, label: c.tabs[3]},
      ]}
    >
      <MockFlowStrip cells={[...c.flow]} />

      <div className="mt-3 grid gap-3 @3xl:grid-cols-2">
        <MockCard icon={CheckCircle2} title={c.readiness} link={c.featuresTab}>
          <ul className="space-y-2">
            {c.groups.map(group => (
              <li
                key={group.label}
                className="grid grid-cols-[5.5rem_1fr] items-center gap-2"
              >
                <span className="text-[10px] font-medium">{group.label}</span>
                <span>
                  <span className="flex h-1.5 gap-px overflow-hidden rounded-full bg-muted">
                    {group.parts.map((part, i) => (
                      <span key={i} className={cn('flex-1', STATUS_DOT[part])} />
                    ))}
                  </span>
                  <span className="mt-1 block text-[9.5px] text-muted-foreground tabular-nums">
                    {group.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-2">
            {(Object.keys(STATUS_DOT) as Status[]).map(status => (
              <span
                key={status}
                className="flex items-center gap-1 text-[9px] text-muted-foreground"
              >
                <span className={cn('size-1.5 rounded-full', STATUS_DOT[status])} />
                {c.legend[status]}
              </span>
            ))}
          </div>
        </MockCard>

        <MockCard
          icon={TriangleAlert}
          title={c.attention}
          badge={
            <span className="rounded-md border border-border px-1 text-[9px] font-medium text-amber-700 tabular-nums dark:text-amber-400">
              3
            </span>
          }
        >
          <ul className="space-y-2">
            {c.attentionRows.map(row => {
              const {icon: Icon, tone} = ATTENTION_ICON[row.kind];
              return (
                <li key={row.title} className="flex items-center gap-2">
                  <span
                    className={cn(
                      'flex size-6 shrink-0 items-center justify-center rounded-full',
                      tone,
                    )}
                  >
                    <Icon className="size-3" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[10px]">{row.title}</span>
                    <span className="block truncate text-[9px] text-muted-foreground">
                      {row.detail}
                    </span>
                  </span>
                  <MockButton className="hidden @lg:inline-flex">
                    {row.action}
                  </MockButton>
                </li>
              );
            })}
          </ul>
        </MockCard>

        <MockCard icon={History} title={c.recent} link={c.historyLink}>
          <ul className="space-y-1.5">
            {c.runs.map((run, i) => {
              const Icon = run.icon;
              return (
                <li key={i} className="flex items-start gap-2">
                  <RunBadge ok={run.ok} label={run.ok ? c.ok : c.failed} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1 text-[10px] font-medium">
                      <Icon className="size-3 shrink-0 text-muted-foreground" />
                      <span className="truncate">
                        {run.name}
                        {run.model && (
                          <span className="font-normal text-muted-foreground">
                            {' '}
                            · {run.model}
                          </span>
                        )}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'block truncate text-[9px]',
                        run.ok ? 'text-muted-foreground' : 'text-destructive',
                      )}
                    >
                      {run.line}
                    </span>
                  </span>
                  <span className="shrink-0 text-[9px] text-muted-foreground tabular-nums">
                    {run.time}
                  </span>
                </li>
              );
            })}
          </ul>
        </MockCard>

        <MockCard icon={Server} title={c.agents} link={c.modelsTab}>
          <ul className="space-y-2">
            {c.agentRows.map(agent => (
              <li key={agent.name} className="flex items-center gap-2">
                <span
                  className={cn(
                    'size-1.5 shrink-0 rounded-full',
                    agent.online ? 'bg-emerald-500' : 'bg-zinc-400',
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-[10px] font-medium">
                    {agent.name}
                    <span className="rounded bg-secondary px-1 text-[8.5px] font-normal text-muted-foreground">
                      {agent.badge}
                    </span>
                  </span>
                  <span className="block truncate text-[9px] text-muted-foreground">
                    {agent.detail}
                  </span>
                </span>
                {agent.right && (
                  <span className="shrink-0 text-[9px] text-muted-foreground">
                    {agent.right}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </MockCard>
      </div>
    </MockAppFrame>
  );
}
