import {
  Activity,
  Box,
  Cpu,
  HardDrive,
  Hourglass,
  LayoutDashboard,
  LayoutGrid,
  LineChart,
  MoreHorizontal,
  Pencil,
  Plus,
  Radar,
  RefreshCw,
  ScanSearch,
  ScrollText,
  Trash2,
  Wand2,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Agent detail, 어플리케이션 tab (`AgentDetailTabs` + `_AgentAppsTab.tsx`):
 * the published app instances the daemon supervises — app, instance key,
 * outline status badge + pid, argument summary and resource limits.
 */

const COPY = {
  ko: {
    edit: '수정',
    rotateToken: '토큰 로테이션',
    remove: '삭제',
    active: '활성',
    tabs: {
      overview: '개요',
      apps: '어플리케이션',
      resources: '리소스',
      metrics: '메트릭',
      storage: '저장소',
      logs: '로그',
      state: '상태 그래프',
    },
    listTitle: '게시된 어플리케이션',
    listDescription:
      '데몬은 이 목록만 실행합니다. 한 줄이 인스턴스 하나이고, 같은 앱을 여러 줄 두면 한 번에 받을 수 있는 요청이 늘어납니다.',
    sync: '동기화',
    add: '어플리케이션 추가',
    cols: {
      app: '앱',
      instance: '인스턴스',
      status: '상태',
      config: '실행 인자',
      resources: '한도',
    },
    status: {
      running: '실행 중',
      starting: '시작 중',
      deferred: '예산 대기',
      stopped: '중지됨',
    },
    apps: {
      rfdetr: 'RF-DETR 비전 모델',
      sam2: 'SAM2 세그멘테이션',
      pointcept: 'Pointcept 3D 세그멘테이션',
      timeseries: '시계열 예측',
      modbus: 'Modbus 모니터',
      collectorSim: '수집기 시뮬레이터',
    },
    memory: (v: string) => `메모리 ${v}`,
    gpusNone: 'GPU 없음',
  },
  en: {
    edit: 'Edit',
    rotateToken: 'Rotate Token',
    remove: 'Delete',
    active: 'Active',
    tabs: {
      overview: 'Overview',
      apps: 'Applications',
      resources: 'Resources',
      metrics: 'Metrics',
      storage: 'Storage',
      logs: 'Logs',
      state: 'State Graph',
    },
    listTitle: 'Published applications',
    listDescription:
      'The daemon runs exactly this list. One row is one instance; add more rows of the same app to take more requests at once.',
    sync: 'Sync',
    add: 'Add an application',
    cols: {
      app: 'App',
      instance: 'Instance',
      status: 'Status',
      config: 'Arguments',
      resources: 'Limits',
    },
    status: {
      running: 'running',
      starting: 'starting',
      deferred: 'waiting for budget',
      stopped: 'stopped',
    },
    apps: {
      rfdetr: 'RF-DETR Vision',
      sam2: 'SAM2 Segmentation',
      pointcept: 'Pointcept 3D Segmentation',
      timeseries: 'Time-series forecasting',
      modbus: 'Modbus Monitor',
      collectorSim: 'Collector simulator',
    },
    memory: (v: string) => `Memory ${v}`,
    gpusNone: 'No GPU',
  },
} as const;

type Status = 'running' | 'starting' | 'deferred' | 'stopped';

/** `STATUS_TONE` in `_AgentAppsTab.tsx`. */
const STATUS_TONE: Record<Status, string> = {
  running:
    'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  starting: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  deferred:
    'border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300',
  stopped: 'border-border bg-muted text-muted-foreground',
};

type AppKey = keyof (typeof COPY)['ko']['apps'];

type Limits = {memory?: string; cpu?: number; gpus?: string};

type Row = {
  app: string;
  key: AppKey;
  icon: LucideIcon;
  status: Status;
  pid?: number;
  config: string;
  limits: Limits;
};

/** Sorted by app key then instance, as the real table does. */
const ROWS: Row[] = [
  {
    app: 'collector-sim',
    key: 'collectorSim',
    icon: Radar,
    status: 'running',
    pid: 48213,
    config: 'payload=video · intervalMs=1000',
    limits: {memory: '512 MB', cpu: 50},
  },
  {
    app: 'modbus-monitor',
    key: 'modbus',
    icon: Cpu,
    status: 'stopped',
    config: 'host=10.0.0.5 · port=502 · unitId=1',
    limits: {},
  },
  {
    app: 'pointcept',
    key: 'pointcept',
    icon: Box,
    status: 'deferred',
    config: '—',
    limits: {memory: '24 GB', cpu: 800, gpus: '1'},
  },
  {
    app: 'rfdetr',
    key: 'rfdetr',
    icon: ScanSearch,
    status: 'running',
    pid: 12345,
    config: '—',
    limits: {memory: '8 GB', cpu: 400, gpus: '0'},
  },
  {
    app: 'sam2',
    key: 'sam2',
    icon: Wand2,
    status: 'running',
    pid: 12388,
    config: '—',
    limits: {memory: '6 GB', cpu: 200, gpus: '0'},
  },
  {
    app: 'timeseries',
    key: 'timeseries',
    icon: Activity,
    status: 'starting',
    config: '—',
    limits: {memory: '4 GB', gpus: 'none'},
  },
];

/** Tab label with the running-app dot (`AgentDetailTabs`). */
function AppsTabLabel({label}: {label: string}) {
  return (
    <span className="inline-flex items-center">
      {label}
      <span className="ml-1.5 size-1.5 rounded-full bg-emerald-500" />
    </span>
  );
}

export function MockAgentApps() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  const limitText = (limits: Limits): string[] => {
    const parts: string[] = [];
    if (limits.memory) parts.push(c.memory(limits.memory));
    if (limits.cpu) parts.push(`CPU ${limits.cpu}%`);
    if (limits.gpus)
      parts.push(limits.gpus === 'none' ? c.gpusNone : `GPU ${limits.gpus}`);
    return parts;
  };

  return (
    <MockAppFrame
      activeNav="agents"
      crumbs={[{label: 'gpu-node-01'}]}
      title="gpu-node-01"
      meta={
        <span className="inline-flex items-center rounded-md bg-emerald-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
          {c.active}
        </span>
      }
      actions={
        <>
          <span className="hidden items-center gap-1.5 @2xl:flex">
            <MockButton icon={Pencil}>{c.edit}</MockButton>
            <MockButton icon={RefreshCw}>{c.rotateToken}</MockButton>
          </span>
          <MockButton icon={Trash2} className="text-destructive">
            {c.remove}
          </MockButton>
        </>
      }
      tabs={[
        {icon: LayoutDashboard, label: c.tabs.overview},
        {
          icon: LayoutGrid,
          // MockTab.label is typed as a string; the dot needs a node here.
          label: <AppsTabLabel label={c.tabs.apps} />,
          active: true,
        },
        {icon: Activity, label: c.tabs.resources},
        {icon: LineChart, label: c.tabs.metrics},
        {icon: HardDrive, label: c.tabs.storage},
        {icon: ScrollText, label: c.tabs.logs},
        {icon: Workflow, label: c.tabs.state},
      ]}
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[12px] font-medium">
              {c.listTitle}
              <span className="ml-1.5 text-[10px] text-muted-foreground tabular-nums">
                {ROWS.length}
              </span>
            </p>
            <p className="line-clamp-1 text-[10px] text-muted-foreground">
              {c.listDescription}
            </p>
          </div>
          <span className="flex items-center gap-1.5">
            <MockButton icon={RefreshCw}>{c.sync}</MockButton>
            <MockButton icon={Plus} variant="default">
              {c.add}
            </MockButton>
          </span>
        </div>

        <div className="overflow-hidden rounded-md border border-border">
          <table className="w-full text-[11px]">
            <thead className="bg-muted/40 text-[10px] text-muted-foreground">
              <tr className="h-7">
                <th className="w-7 px-2 text-right font-normal">#</th>
                <th className="px-2 text-left font-normal">{c.cols.app}</th>
                <th className="hidden px-2 text-left font-normal @xl:table-cell">
                  {c.cols.instance}
                </th>
                <th className="px-2 text-left font-normal">{c.cols.status}</th>
                <th className="hidden px-2 text-left font-normal @4xl:table-cell">
                  {c.cols.config}
                </th>
                <th className="hidden px-2 text-left font-normal @3xl:table-cell">
                  {c.cols.resources}
                </th>
                <th className="w-7" />
              </tr>
            </thead>
            <tbody>
              {ROWS.map(({icon: Icon, ...row}, i) => (
                <tr key={row.app} className="border-t border-border">
                  <td className="px-2 py-2 text-right text-[10px] text-muted-foreground tabular-nums">
                    {i + 1}
                  </td>
                  <td className="max-w-0 px-2 py-2">
                    <span className="flex min-w-0 items-center gap-1.5">
                      <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate">{c.apps[row.key]}</span>
                    </span>
                  </td>
                  <td className="hidden px-2 py-2 font-mono text-[10px] whitespace-nowrap @xl:table-cell">
                    {row.app}:1
                  </td>
                  <td className="px-2 py-2">
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-md border px-1.5 py-px text-[10px] font-semibold',
                          STATUS_TONE[row.status],
                        )}
                      >
                        {c.status[row.status]}
                      </span>
                      {row.status === 'deferred' && (
                        <Hourglass className="size-3 text-muted-foreground" />
                      )}
                      {row.pid !== undefined && (
                        <span className="hidden text-[10px] text-muted-foreground tabular-nums @2xl:inline">
                          pid {row.pid}
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="hidden px-2 py-2 font-mono text-[10px] whitespace-nowrap text-muted-foreground @4xl:table-cell">
                    {row.config}
                  </td>
                  <td className="hidden px-2 py-2 text-[10px] text-muted-foreground @3xl:table-cell">
                    <span className="flex flex-wrap gap-x-2 whitespace-nowrap">
                      {limitText(row.limits).map(part => (
                        <span key={part}>{part}</span>
                      ))}
                    </span>
                  </td>
                  <td className="px-1 py-2 text-muted-foreground">
                    <span className="flex size-5 items-center justify-center">
                      <MoreHorizontal className="size-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MockAppFrame>
  );
}
