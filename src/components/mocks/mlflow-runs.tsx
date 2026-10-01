import {
  ArrowDown,
  Boxes,
  Check,
  CheckCircle2,
  ChevronDown,
  Columns3,
  FlaskConical,
  GitCompare,
  LayoutDashboard,
  LineChart,
  Link2,
  Loader2,
  MoreHorizontal,
  Search,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * MLOps › 실험 추적 (`pages/(app)/proj/mlops/experiments`): MLflow experiment
 * list on the left (280px card), the selected experiment's runs on the right
 * (`RunsToolbar` + `RunsTable` with metric/param columns).
 */
const COPY = {
  ko: {
    tabs: ['개요', '훈련 실험', '실험 추적', '모델', '엔드포인트'],
    experiments: '실험',
    showDeleted: '삭제 포함',
    runCount: (n: number) => `실행 ${n}개`,
    createdAt: '생성 2026-09-12 10:24',
    search: '실행 이름 검색',
    viewType: '활성 실행',
    columns: '컬럼',
    compare: '비교 (2)',
    cols: {name: '이름', status: '상태', start: '시작', duration: '소요'},
  },
  en: {
    tabs: ['Overview', 'Training', 'Experiments', 'Models', 'Endpoint'],
    experiments: 'Experiments',
    showDeleted: 'Show deleted',
    runCount: (n: number) => `${n} runs`,
    createdAt: 'Created 2026-09-12 10:24',
    search: 'Search run names',
    viewType: 'Active runs',
    columns: 'Columns',
    compare: 'Compare (2)',
    cols: {name: 'Name', status: 'Status', start: 'Started', duration: 'Duration'},
  },
} as const;

const MLOPS_TAB_ICONS = [LayoutDashboard, FlaskConical, LineChart, Boxes, Link2];

const EXPERIMENTS = [
  {name: 'intersection-vehicles', runs: 14, created: '2026-09-12'},
  {name: 'ppe-helmet-seg', runs: 9, created: '2026-09-03'},
  {name: 'scannet-insseg-ptv3', runs: 5, created: '2026-08-27'},
  {name: 'line3-temp-forecast', runs: 21, created: '2026-08-19'},
  {name: 'Default', runs: 2, created: '2026-08-02'},
];

type Status = 'RUNNING' | 'FINISHED' | 'FAILED';

/** `RunStatusBadge`: raw MLflow status + tinted outline badge. */
const STATUS_STYLE: Record<Status, {icon: LucideIcon; className: string}> = {
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

const METRIC_KEYS = ['train/loss', 'val/mAP_50', 'val/mAP_50_95'];
const PARAM_KEYS = ['batch_size', 'lr'];

const RUNS: {
  name: string;
  status: Status;
  start: string;
  duration: string;
  metrics: string[];
  params: string[];
  selected?: boolean;
}[] = [
  {
    name: 'rfdetr-medium-e50-lr1e-4',
    status: 'RUNNING',
    start: '2026-09-30 14:12',
    duration: '2h 41m',
    metrics: ['3.412', '0.7814', '0.5362'],
    params: ['8', '1e-4'],
    selected: true,
  },
  {
    name: 'rfdetr-medium-e50',
    status: 'FINISHED',
    start: '2026-09-28 09:40',
    duration: '3h 58m',
    metrics: ['3.187', '0.7526', '0.5104'],
    params: ['8', '2e-4'],
    selected: true,
  },
  {
    name: 'rfdetr-small-e40',
    status: 'FINISHED',
    start: '2026-09-24 21:03',
    duration: '2h 12m',
    metrics: ['3.644', '0.7091', '0.4712'],
    params: ['16', '2e-4'],
  },
  {
    name: 'rfdetr-medium-aug',
    status: 'FAILED',
    start: '2026-09-22 11:47',
    duration: '11m 24s',
    metrics: ['6.905', '—', '—'],
    params: ['8', '2e-4'],
  },
  {
    name: 'rfdetr-nano-baseline',
    status: 'FINISHED',
    start: '2026-09-18 16:20',
    duration: '48m 10s',
    metrics: ['4.218', '0.6433', '0.4025'],
    params: ['16', '4e-4'],
  },
];

function Checkbox({checked = false}: {checked?: boolean}) {
  return (
    <span
      className={cn(
        'flex size-3 items-center justify-center rounded-[3px] border',
        checked ? 'border-primary bg-primary text-primary-foreground' : 'border-input',
      )}
    >
      {checked && <Check className="size-2" strokeWidth={3} />}
    </span>
  );
}

export function MockMlflowRuns() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const selected = EXPERIMENTS[0];

  return (
    <MockAppFrame
      activeNav="mlops"
      crumbs={[{label: c.tabs[2]}]}
      title={c.tabs[2]}
      tabs={c.tabs.map((label, i) => ({
        label,
        icon: MLOPS_TAB_ICONS[i],
        active: i === 2,
      }))}
    >
      <div className="grid gap-4 @3xl:grid-cols-[200px_1fr] @5xl:grid-cols-[224px_1fr]">
        {/* experiments */}
        <div className="hidden rounded-md border border-border bg-card @3xl:block">
          <div className="flex items-center justify-between px-3 pt-3 pb-2">
            <p className="text-[12px] font-semibold">{c.experiments}</p>
            <MockButton variant="ghost">{c.showDeleted}</MockButton>
          </div>
          <ul className="flex flex-col gap-0.5 px-2 pb-2.5">
            {EXPERIMENTS.map((exp, i) => (
              <li
                key={exp.name}
                className={cn('rounded-md px-2 py-1.5', i === 0 && 'bg-accent')}
              >
                <span
                  className={cn('block truncate text-[11px]', i === 0 && 'font-medium')}
                >
                  {exp.name}
                </span>
                <span className="mt-px flex gap-2 text-[9px] text-muted-foreground">
                  <span className="tabular-nums">{c.runCount(exp.runs)}</span>
                  <span className="tabular-nums">{exp.created}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* runs */}
        <div className="min-w-0 rounded-md border border-border bg-card">
          <div className="px-3.5 pt-3 pb-2">
            <p className="text-[12px] font-semibold">{selected.name}</p>
            <p className="text-[10px] text-muted-foreground tabular-nums">
              {c.createdAt}
            </p>
          </div>

          <div className="px-3.5 pb-3">
            {/* RunsToolbar */}
            <div className="mb-3 flex items-center gap-1.5">
              <span className="flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-md border border-input px-2 text-[10px] text-muted-foreground">
                <Search className="size-3 shrink-0" />
                <span className="truncate">{c.search}</span>
              </span>
              <span className="hidden h-6 w-24 shrink-0 items-center justify-between rounded-md border border-input px-2 text-[10px] @xl:flex">
                {c.viewType}
                <ChevronDown className="size-3 text-muted-foreground" />
              </span>
              <MockButton icon={Columns3}>{c.columns}</MockButton>
              <MockButton icon={GitCompare} variant="default">
                {c.compare}
              </MockButton>
            </div>

            {/* RunsTable */}
            <div className="overflow-hidden">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="h-8 border-b border-border text-left whitespace-nowrap text-muted-foreground">
                    <th className="w-6 pr-1">
                      <Checkbox />
                    </th>
                    <th className="px-1.5 font-medium">{c.cols.name}</th>
                    <th className="px-1.5 font-medium">{c.cols.status}</th>
                    <th className="hidden px-1.5 font-medium @2xl:table-cell">
                      <span className="flex items-center gap-1">
                        {c.cols.start}
                        <ArrowDown className="size-3" />
                      </span>
                    </th>
                    <th className="hidden px-1.5 text-right font-medium @5xl:table-cell">
                      {c.cols.duration}
                    </th>
                    {METRIC_KEYS.map((key, i) => (
                      <th
                        key={key}
                        className={cn(
                          'px-1.5 text-right font-mono text-[9px] font-medium',
                          i === 0 && 'hidden @4xl:table-cell',
                          i === 2 && 'hidden @xl:table-cell',
                        )}
                      >
                        {key}
                      </th>
                    ))}
                    {PARAM_KEYS.map(key => (
                      <th
                        key={key}
                        className="hidden px-1.5 font-mono text-[9px] font-medium @5xl:table-cell"
                      >
                        {key}
                      </th>
                    ))}
                    <th className="w-5" />
                  </tr>
                </thead>
                <tbody>
                  {RUNS.map(run => {
                    const {icon: Icon, className} = STATUS_STYLE[run.status];
                    return (
                      <tr
                        key={run.name}
                        className="border-b border-border last:border-0"
                      >
                        <td className="pr-1">
                          <Checkbox checked={run.selected} />
                        </td>
                        <td className="max-w-0 truncate px-1.5 py-2 font-medium @2xl:max-w-44">
                          {run.name}
                        </td>
                        <td className="px-1.5 py-2">
                          <span
                            className={cn(
                              'inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-medium',
                              className,
                            )}
                          >
                            <Icon
                              className={cn(
                                'size-2.5',
                                run.status === 'RUNNING' && 'animate-spin',
                              )}
                            />
                            {run.status}
                          </span>
                        </td>
                        <td className="hidden px-1.5 py-2 text-[10px] whitespace-nowrap text-muted-foreground tabular-nums @2xl:table-cell">
                          {run.start}
                        </td>
                        <td className="hidden px-1.5 py-2 text-right text-[10px] whitespace-nowrap text-muted-foreground tabular-nums @5xl:table-cell">
                          {run.duration}
                        </td>
                        {run.metrics.map((value, i) => (
                          <td
                            key={METRIC_KEYS[i]}
                            className={cn(
                              'px-1.5 py-2 text-right font-mono text-[10px] tabular-nums',
                              i === 0 && 'hidden @4xl:table-cell',
                              i === 2 && 'hidden @xl:table-cell',
                            )}
                          >
                            {value}
                          </td>
                        ))}
                        {run.params.map((value, i) => (
                          <td
                            key={PARAM_KEYS[i]}
                            className="hidden px-1.5 py-2 font-mono text-[10px] @5xl:table-cell"
                          >
                            {value}
                          </td>
                        ))}
                        <td className="text-muted-foreground">
                          <MoreHorizontal className="size-3.5" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MockAppFrame>
  );
}
