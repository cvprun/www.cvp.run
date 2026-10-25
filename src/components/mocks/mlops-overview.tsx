import {
  Activity,
  Boxes,
  FlaskConical,
  Plus,
  Rocket,
  Square,
  TestTube2,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {MockCard, MockFlowStrip, type FlowCell} from '@/components/mocks/mock-ui';
import {
  Delta,
  mlopsTabs,
  RunStatus,
  SourceBadge,
  type RunTone,
} from '@/components/mocks/mlops-ui';
import {useLanguage} from '@/lib/i18n';

/**
 * MLOps › 개요 (`/proj/:id/mlops`), rebuilt around work to do: the FlowStrip
 * (데이터 → 실험 → 런 → 모델 → 추론), then 진행 중인 학습 · 확인할 것 ·
 * 최근 실행 · 등록된 모델. Rows follow the overview story seed.
 */
const COPY = {
  ko: {
    newTraining: '새 학습',
    flow: [
      {label: '데이터', value: '4', detail: '데이터셋'},
      {label: '실험', value: '5', detail: '진행 중 2'},
      {label: '런', value: '21', detail: '진행 2 · 실패 2'},
      {label: '모델', value: '3', detail: '검토 대기 런 2', warn: true},
      {label: '추론', value: '3/4', detail: '에이전트 온라인'},
    ] as FlowCell[],
    inProgress: '진행 중인 학습',
    toCheck: '확인할 것',
    recent: '최근 실행',
    registered: '등록된 모델',
    viewAll: '전체 보기',
    stop: '중단',
    register: '모델로 등록',
    openRun: '런 보기',
    review: '검토 대기',
    training: [
      {
        name: 'PCB 부품 세그멘테이션 #3',
        tone: 'running' as RunTone,
        status: '학습 중',
        meta: '이미지 객체 탐지 · gpu-node-01 · 09:12 시작',
        epoch: [21, 40],
        metric: 'segm_mAP_50 0.701',
      },
      {
        name: '공장 바닥 3D 인스턴스 #6',
        tone: 'preparing' as RunTone,
        status: '준비 중',
        meta: '포인트 클라우드 세그멘테이션 · gpu-node-01 · 10:02 시작',
        epoch: [0, 50],
        metric: '',
      },
    ],
    checks: [
      {
        name: '용접 비드 결함 탐지 #6',
        sdk: false,
        metric: 'mAP_50 0.861',
        delta: '+0.023',
        against: '@production v5 대비',
      },
      {
        name: 'yolo-baseline · yolov8n-sweep-12',
        sdk: true,
        metric: 'mAP50 0.792',
        delta: '',
        against: 'yolo-detector에는 아직 @production 버전이 없습니다.',
      },
    ],
    runs: [
      {
        name: 'detector-v3 sweep',
        exp: 'yolo-baseline',
        state: 'RUNNING',
        tone: 'running' as RunTone,
        when: '10:31',
        took: '—',
      },
      {
        name: 'detector-v2 baseline',
        exp: 'yolo-baseline',
        state: 'FINISHED',
        tone: 'succeeded' as RunTone,
        when: '어제',
        took: '2h 17m',
      },
      {
        name: 'keypoint tune',
        exp: 'pose-lab',
        state: 'KILLED',
        tone: 'muted' as RunTone,
        when: '10월 23일',
        took: '41m',
      },
    ],
    models: [
      {
        name: 'weld-defect-detector',
        updated: '10월 24일',
        prod: 'v5',
        staging: 'v6',
        latest: 'v7',
      },
      {
        name: 'keypoint-estimator',
        updated: '10월 21일',
        prod: 'v3',
        staging: '',
        latest: 'v4',
      },
      {name: 'ocr-reader', updated: '10월 12일', prod: 'v2', staging: '', latest: 'v2'},
    ],
  },
  en: {
    newTraining: 'New training',
    flow: [
      {label: 'Data', value: '4', detail: 'Datasets'},
      {label: 'Experiments', value: '5', detail: '2 in progress'},
      {label: 'Runs', value: '21', detail: '2 active · 2 failed'},
      {label: 'Models', value: '3', detail: '2 runs to review', warn: true},
      {label: 'Inference', value: '3/4', detail: 'Agents online'},
    ] as FlowCell[],
    inProgress: 'Training in progress',
    toCheck: 'To check',
    recent: 'Recent runs',
    registered: 'Registered models',
    viewAll: 'View all',
    stop: 'Stop',
    register: 'Register as model',
    openRun: 'Open run',
    review: 'To review',
    training: [
      {
        name: 'PCB part segmentation #3',
        tone: 'running' as RunTone,
        status: 'Running',
        meta: 'Image object detection · gpu-node-01 · started 09:12',
        epoch: [21, 40],
        metric: 'segm_mAP_50 0.701',
      },
      {
        name: 'Factory floor 3D instances #6',
        tone: 'preparing' as RunTone,
        status: 'Preparing',
        meta: 'Point cloud segmentation · gpu-node-01 · started 10:02',
        epoch: [0, 50],
        metric: '',
      },
    ],
    checks: [
      {
        name: 'Weld bead defect detection #6',
        sdk: false,
        metric: 'mAP_50 0.861',
        delta: '+0.023',
        against: 'vs @production v5',
      },
      {
        name: 'yolo-baseline · yolov8n-sweep-12',
        sdk: true,
        metric: 'mAP50 0.792',
        delta: '',
        against: 'yolo-detector has no @production yet.',
      },
    ],
    runs: [
      {
        name: 'detector-v3 sweep',
        exp: 'yolo-baseline',
        state: 'RUNNING',
        tone: 'running' as RunTone,
        when: '10:31',
        took: '—',
      },
      {
        name: 'detector-v2 baseline',
        exp: 'yolo-baseline',
        state: 'FINISHED',
        tone: 'succeeded' as RunTone,
        when: 'Yesterday',
        took: '2h 17m',
      },
      {
        name: 'keypoint tune',
        exp: 'pose-lab',
        state: 'KILLED',
        tone: 'muted' as RunTone,
        when: 'Oct 23',
        took: '41m',
      },
    ],
    models: [
      {
        name: 'weld-defect-detector',
        updated: 'Oct 24',
        prod: 'v5',
        staging: 'v6',
        latest: 'v7',
      },
      {
        name: 'keypoint-estimator',
        updated: 'Oct 21',
        prod: 'v3',
        staging: '',
        latest: 'v4',
      },
      {name: 'ocr-reader', updated: 'Oct 12', prod: 'v2', staging: '', latest: 'v2'},
    ],
  },
} as const;

export function MockMlopsOverview() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="mlops"
      title="MLOps"
      actions={
        <MockButton icon={Plus} variant="default">
          {c.newTraining}
        </MockButton>
      }
      tabs={mlopsTabs(lang, 'overview')}
    >
      <MockFlowStrip cells={[...c.flow]} />

      <div className="mt-3 grid gap-3 @3xl:grid-cols-2">
        <MockCard
          icon={FlaskConical}
          title={c.inProgress}
          link={c.viewAll}
          badge={
            <span className="text-[10px] text-muted-foreground tabular-nums">2</span>
          }
        >
          <ul className="space-y-2.5">
            {c.training.map(run => {
              const [epoch, total] = run.epoch;
              return (
                <li key={run.name} className="flex items-center gap-2">
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate text-[10.5px] font-medium">
                        {run.name}
                      </span>
                      <RunStatus tone={run.tone}>{run.status}</RunStatus>
                    </span>
                    <span className="mt-0.5 block truncate text-[9px] text-muted-foreground">
                      {run.meta}
                    </span>
                  </span>
                  {run.metric && (
                    <span className="hidden w-24 shrink-0 @xl:block">
                      <span className="block text-right font-mono text-[9px] text-muted-foreground tabular-nums">
                        epoch {epoch} / {total}
                      </span>
                      <span className="mt-1 block h-[3px] overflow-hidden rounded-full bg-muted">
                        <span
                          className="block h-full rounded-full bg-foreground"
                          style={{width: `${(epoch / total) * 100}%`}}
                        />
                      </span>
                      <span className="mt-1 block text-right font-mono text-[8.5px]">
                        {run.metric}
                      </span>
                    </span>
                  )}
                  <MockButton icon={Square}>{c.stop}</MockButton>
                </li>
              );
            })}
          </ul>
        </MockCard>

        <MockCard icon={TestTube2} title={c.toCheck} link={c.viewAll}>
          <ul className="space-y-2.5">
            {c.checks.map(check => (
              <li key={check.name} className="flex items-center gap-2">
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="shrink-0 rounded-md border border-border px-1 text-[9px] text-amber-700 dark:text-amber-400">
                      {c.review}
                    </span>
                    <span className="truncate text-[10.5px] font-medium">
                      {check.name}
                    </span>
                    {check.sdk && <SourceBadge source="sdk" />}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[9px]">
                    <span className="font-mono whitespace-nowrap">{check.metric}</span>
                    {check.delta && <Delta value={check.delta} better />}
                    <span className="truncate text-muted-foreground">
                      {check.against}
                    </span>
                  </span>
                </span>
                <span className="hidden shrink-0 gap-1 @lg:flex">
                  <MockButton variant="default">{c.register}</MockButton>
                  <MockButton>{c.openRun}</MockButton>
                </span>
              </li>
            ))}
          </ul>
        </MockCard>

        <MockCard icon={Activity} title={c.recent} link={c.viewAll}>
          <ul className="space-y-2">
            {c.runs.map(run => (
              <li key={run.name} className="flex items-center gap-2 text-[10px]">
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{run.name}</span>
                  <span className="block truncate text-[9px] text-muted-foreground">
                    {run.exp}
                  </span>
                </span>
                <RunStatus tone={run.tone}>{run.state}</RunStatus>
                <span className="w-14 shrink-0 text-right text-[9px] text-muted-foreground tabular-nums">
                  {run.when}
                </span>
                <span className="hidden w-12 shrink-0 text-right font-mono text-[9px] text-muted-foreground @lg:block">
                  {run.took}
                </span>
              </li>
            ))}
          </ul>
        </MockCard>

        <MockCard icon={Boxes} title={c.registered} link={c.viewAll}>
          <ul className="space-y-2">
            {c.models.map(model => (
              <li key={model.name} className="flex items-center gap-2">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[10.5px] font-medium">
                    {model.name}
                  </span>
                  <span className="block text-[9px] text-muted-foreground">
                    {model.updated}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1">
                  <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-500/15 px-1 py-px text-[9px] font-medium text-emerald-700 dark:text-emerald-400">
                    <Rocket className="size-2.5" />
                    {model.prod}
                  </span>
                  {model.staging && (
                    <span className="inline-flex items-center gap-0.5 rounded-md bg-amber-500/15 px-1 py-px text-[9px] font-medium text-amber-700 dark:text-amber-400">
                      <TestTube2 className="size-2.5" />
                      {model.staging}
                    </span>
                  )}
                  <span className="rounded-md bg-muted px-1 py-px text-[9px] text-muted-foreground">
                    {model.latest}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </MockCard>
      </div>
    </MockAppFrame>
  );
}
