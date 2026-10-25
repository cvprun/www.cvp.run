import {
  ChevronDown,
  CircleQuestionMark,
  GitCompare,
  LineChart,
  Play,
  Plus,
  Search,
  Table2,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {
  AliasChip,
  mlopsTabs,
  RunStatus,
  SourceBadge,
  type RunTone,
} from '@/components/mocks/mlops-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * MLOps › 런 filtered to one experiment (`/mlops/runs?exp=weld-bead`): the
 * status chips with counts, the experiment context bar (spec line, best run,
 * model, "new run with changes"), then the runs table with the primary metric
 * and the experiment's lr / epochs columns. Two rows are picked for compare.
 */
const COPY = {
  ko: {
    title: '런',
    newTraining: '새 학습',
    search: '런 · 실험 이름 검색',
    chips: [
      ['전체', '6'],
      ['진행', '1'],
      ['완료', '4'],
      ['실패', '1'],
      ['검토 대기', '1'],
    ],
    expName: '용접 비드 결함 탐지',
    spec: '이미지 객체 탐지 · rfdetr-medium · 데이터셋 weld-v3 · epochs 40 · lr 0.0001 · batch 4',
    bestRun: '최고 런',
    model: '모델',
    changed: '설정을 변경해 새 런',
    again: '다시 실행',
    cols: ['런', '상태', '모델', '시작'],
    unregistered: '미등록',
    selected: '2개 선택됨',
    compare: '비교 (2)',
    statuses: {
      running: '학습 중',
      succeeded: '완료',
      failed: '실패',
    },
    rows: [
      {
        n: 7,
        tone: 'running',
        metric: '0.744',
        lr: '0.0001',
        epochs: '40',
        model: '',
        start: '10월 25일 09:40',
        picked: false,
      },
      {
        n: 6,
        tone: 'succeeded',
        metric: '0.861',
        lr: '0.0001',
        epochs: '40',
        model: '',
        start: '10월 24일 14:02',
        picked: true,
        best: true,
      },
      {
        n: 5,
        tone: 'succeeded',
        metric: '0.851',
        lr: '0.0001',
        epochs: '30',
        model: 'v6',
        start: '10월 23일 11:18',
        picked: true,
      },
      {
        n: 4,
        tone: 'failed',
        metric: '—',
        lr: '0.0002',
        epochs: '30',
        model: '',
        start: '10월 22일 16:55',
        picked: false,
      },
      {
        n: 3,
        tone: 'succeeded',
        metric: '0.838',
        lr: '0.0001',
        epochs: '20',
        model: 'v5',
        start: '10월 20일 10:07',
        picked: false,
        production: true,
      },
    ],
  },
  en: {
    title: 'Runs',
    newTraining: 'New training',
    search: 'Search run or experiment name',
    chips: [
      ['All', '6'],
      ['Active', '1'],
      ['Done', '4'],
      ['Failed', '1'],
      ['To review', '1'],
    ],
    expName: 'Weld bead defect detection',
    spec: 'Image object detection · rfdetr-medium · dataset weld-v3 · epochs 40 · lr 0.0001 · batch 4',
    bestRun: 'Best run',
    model: 'Model',
    changed: 'New run with changes',
    again: 'Run again',
    cols: ['Run', 'Status', 'Model', 'Started'],
    unregistered: 'Unregistered',
    selected: '2 selected',
    compare: 'Compare (2)',
    statuses: {
      running: 'Running',
      succeeded: 'Succeeded',
      failed: 'Failed',
    },
    rows: [
      {
        n: 7,
        tone: 'running',
        metric: '0.744',
        lr: '0.0001',
        epochs: '40',
        model: '',
        start: 'Oct 25 09:40',
        picked: false,
      },
      {
        n: 6,
        tone: 'succeeded',
        metric: '0.861',
        lr: '0.0001',
        epochs: '40',
        model: '',
        start: 'Oct 24 14:02',
        picked: true,
        best: true,
      },
      {
        n: 5,
        tone: 'succeeded',
        metric: '0.851',
        lr: '0.0001',
        epochs: '30',
        model: 'v6',
        start: 'Oct 23 11:18',
        picked: true,
      },
      {
        n: 4,
        tone: 'failed',
        metric: '—',
        lr: '0.0002',
        epochs: '30',
        model: '',
        start: 'Oct 22 16:55',
        picked: false,
      },
      {
        n: 3,
        tone: 'succeeded',
        metric: '0.838',
        lr: '0.0001',
        epochs: '20',
        model: 'v5',
        start: 'Oct 20 10:07',
        picked: false,
        production: true,
      },
    ],
  },
} as const;

const CHIP_DOTS = ['', 'bg-blue-500', 'bg-emerald-500', 'bg-red-500', 'bg-amber-500'];

function Checkbox({checked}: {checked: boolean}) {
  return (
    <span
      className={cn(
        'flex size-3 shrink-0 items-center justify-center rounded-[3px] border',
        checked ? 'border-primary bg-primary text-primary-foreground' : 'border-input',
      )}
    >
      {checked && (
        <svg
          viewBox="0 0 12 12"
          className="size-2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M2.5 6.5l2.2 2L9.5 3.5" />
        </svg>
      )}
    </span>
  );
}

export function MockMlopsRuns() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="mlops"
      crumbs={[{icon: GitCompare, label: c.title}]}
      title={c.title}
      actions={
        <MockButton icon={Plus} variant="default">
          {c.newTraining}
        </MockButton>
      }
      tabs={mlopsTabs(lang, 'runs')}
    >
      {/* toolbar */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="flex h-6 w-44 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px] text-muted-foreground">
          <Search className="size-3" />
          <span className="truncate">{c.search}</span>
        </span>
        <span className="flex gap-0.5 rounded-md bg-muted p-[3px]">
          {c.chips.map(([label, count], i) => (
            <span
              key={label}
              className={cn(
                'flex items-center gap-1 rounded-[4px] px-1.5 py-0.5 text-[9.5px] font-medium whitespace-nowrap',
                i === 0 ? 'bg-background shadow-sm' : 'text-muted-foreground',
                i >= 3 && 'hidden @2xl:flex',
              )}
            >
              {CHIP_DOTS[i] && (
                <span className={cn('size-1.5 rounded-full', CHIP_DOTS[i])} />
              )}
              {label}
              <span className="opacity-60 tabular-nums">{count}</span>
            </span>
          ))}
        </span>
        <span className="ml-auto hidden h-6 items-center gap-1 rounded-md border border-input bg-background px-2 text-[10px] @3xl:flex">
          {c.expName}
          <ChevronDown className="size-3 text-muted-foreground" />
        </span>
        <span className="flex overflow-hidden rounded-md border border-border">
          <span className="flex size-6 items-center justify-center bg-accent">
            <Table2 className="size-3" />
          </span>
          <span className="flex size-6 items-center justify-center text-muted-foreground">
            <LineChart className="size-3" />
          </span>
        </span>
      </div>

      {/* experiment context bar */}
      <div className="mb-3 rounded-md border border-border bg-card px-3 py-2.5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex min-w-0 items-center gap-1.5">
            <span className="truncate text-[11px] font-semibold">{c.expName}</span>
            <SourceBadge source="cvp" />
          </span>
          <span className="text-[9.5px]">
            <span className="text-muted-foreground">{c.bestRun} </span>
            <span className="font-mono">#6 · mAP_50 0.861</span>
          </span>
          <span className="hidden items-center gap-1 text-[9.5px] @xl:flex">
            <span className="text-muted-foreground">{c.model} </span>
            weld-defect-detector
            <AliasChip alias="production" />
            v5
          </span>
          <span className="ml-auto flex gap-1">
            <MockButton>{c.changed}</MockButton>
            <MockButton icon={Play} className="hidden @2xl:inline-flex">
              {c.again}
            </MockButton>
          </span>
        </div>
        <p className="mt-1.5 truncate font-mono text-[9px] text-muted-foreground">
          {c.spec}
        </p>
      </div>

      {/* bulk bar */}
      <div className="mb-2 flex items-center gap-2 rounded-md bg-muted/60 px-2.5 py-1.5 text-[9.5px]">
        <span className="font-medium">{c.selected}</span>
        <MockButton icon={GitCompare} variant="default" className="ml-auto">
          {c.compare}
        </MockButton>
      </div>

      {/* runs table */}
      <div className="overflow-hidden rounded-md border border-border bg-card">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="bg-muted/50 text-left text-[9.5px] text-muted-foreground">
              <th className="w-7 px-2.5 py-1.5" />
              <th className="px-2 py-1.5 font-medium">{c.cols[0]}</th>
              <th className="px-2 py-1.5 font-medium">{c.cols[1]}</th>
              <th className="px-2 py-1.5 font-medium">
                <span className="inline-flex items-center gap-1 font-mono">
                  mAP_50
                  <CircleQuestionMark className="size-2.5" />
                </span>
              </th>
              <th className="hidden px-2 py-1.5 font-mono font-medium @xl:table-cell">
                lr
              </th>
              <th className="hidden px-2 py-1.5 font-mono font-medium @xl:table-cell">
                epochs
              </th>
              <th className="hidden px-2 py-1.5 font-medium @2xl:table-cell">
                {c.cols[2]}
              </th>
              <th className="hidden px-2 py-1.5 font-medium @3xl:table-cell">
                {c.cols[3]}
              </th>
            </tr>
          </thead>
          <tbody>
            {c.rows.map(row => {
              const tone = row.tone as RunTone;
              return (
                <tr
                  key={row.n}
                  className={cn('border-t border-border', row.picked && 'bg-accent/40')}
                >
                  <td className="px-2.5 py-1.5">
                    <Checkbox checked={row.picked} />
                  </td>
                  <td className="px-2 py-1.5">
                    <span className="flex items-center gap-1.5">
                      <span className="font-medium">#{row.n}</span>
                      {'best' in row && row.best && (
                        <span className="rounded bg-secondary px-1 text-[8px] font-medium tracking-wide uppercase">
                          best
                        </span>
                      )}
                    </span>
                    <span className="block text-[9px] text-muted-foreground">
                      gpu-node-01
                    </span>
                  </td>
                  <td className="px-2 py-1.5">
                    <RunStatus tone={tone}>
                      {c.statuses[row.tone as keyof typeof c.statuses]}
                    </RunStatus>
                  </td>
                  <td className="px-2 py-1.5 font-mono tabular-nums">{row.metric}</td>
                  <td className="hidden px-2 py-1.5 font-mono text-muted-foreground @xl:table-cell">
                    {row.lr}
                  </td>
                  <td className="hidden px-2 py-1.5 font-mono text-muted-foreground @xl:table-cell">
                    {row.epochs}
                  </td>
                  <td className="hidden px-2 py-1.5 @2xl:table-cell">
                    {row.model ? (
                      <span className="flex items-center gap-1">
                        weld-defect-detector {row.model}
                        {'production' in row && row.production && (
                          <AliasChip alias="production" />
                        )}
                      </span>
                    ) : (
                      <span className="rounded-md border border-border px-1 text-[9px] text-muted-foreground">
                        {c.unregistered}
                      </span>
                    )}
                  </td>
                  <td className="hidden px-2 py-1.5 text-muted-foreground tabular-nums @3xl:table-cell">
                    {row.start}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </MockAppFrame>
  );
}
