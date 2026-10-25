import {
  ArrowDownWideNarrow,
  Cpu,
  Download,
  KeyRound,
  LayoutGrid,
  ListFilter,
  Play,
  Plus,
  Search,
  Square,
  Table2,
  Trash2,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Agents list (`/proj/:id/agents`, `_AgentsTable.tsx`) on the list toolkit:
 * search, the status segment with counts, filter/sort/view controls, then the
 * table — name + slug, solid status badge, running-app chips, the reported
 * host profile, CLI build with the update chip, last connected and the
 * coloured row actions. Rows follow `_AgentsTable.stories.tsx`.
 */
const COPY = {
  ko: {
    tabs: ['에이전트', '설치'],
    create: '에이전트 생성',
    search: '이름·슬러그·호스트 검색',
    segments: [
      ['기본', '6', ''],
      ['실행 중', '3', 'bg-emerald-500'],
      ['확인 필요', '2', 'bg-amber-500'],
      ['중지', '1', 'bg-slate-400'],
    ],
    filter: '필터',
    sort: '마지막 연결',
    cols: ['이름', '상태', '실행 중인 앱', '호스트', 'CLI', '마지막 연결'],
    update: '업데이트',
    noGpu: 'GPU 없음',
    status: {
      active: '활성',
      disconnected: '연결 끊김',
      start_failed: '기동 실패',
      stopped: '중지됨',
    },
    reason: 'glibc 2.35 이상이 필요합니다',
  },
  en: {
    tabs: ['Agents', 'Install'],
    create: 'Create Agent',
    search: 'Search by name, slug or host',
    segments: [
      ['Default', '6', ''],
      ['Running', '3', 'bg-emerald-500'],
      ['Needs attention', '2', 'bg-amber-500'],
      ['Stopped', '1', 'bg-slate-400'],
    ],
    filter: 'Filter',
    sort: 'Last connected',
    cols: ['Name', 'Status', 'Running apps', 'Host', 'CLI', 'Last Connected'],
    update: 'Update',
    noGpu: 'No GPU',
    status: {
      active: 'Active',
      disconnected: 'Disconnected',
      start_failed: 'Start failed',
      stopped: 'Stopped',
    },
    reason: 'glibc 2.35 or newer is required',
  },
} as const;

type Status = 'active' | 'disconnected' | 'start_failed' | 'stopped';

const STATUS_CLASS: Record<Status, string> = {
  active: 'bg-emerald-500 text-white',
  disconnected: 'bg-amber-500 text-white',
  start_failed: 'bg-red-500 text-white',
  stopped: 'bg-slate-500 text-white',
};

type Agent = {
  name: string;
  slug: string;
  status: Status;
  apps: string[];
  host: string;
  gpu: string | null;
  cli: string;
  outdated?: boolean;
  /** Last connected, ko / en. */
  last: [string, string];
};

const AGENTS: Agent[] = [
  {
    name: 'GPU server 1',
    slug: 'gpu-01',
    status: 'active',
    apps: ['rfdetr', 'sam2'],
    host: 'Linux · x64',
    gpu: 'RTX 4090 · 24 GB',
    cli: '0.14.2',
    last: ['10:42', '10:42'],
  },
  {
    name: 'zer0-hp-zbook',
    slug: 'zer0-hp-zbook',
    status: 'active',
    apps: ['pointcept', 'rfdetr', 'sam2'],
    host: 'Linux · x64',
    gpu: 'RTX PRO 2000 · 8 GB',
    cli: '0.14.2',
    last: ['10:40', '10:40'],
  },
  {
    name: 'Line 3 collector',
    slug: 'line3-edge',
    status: 'active',
    apps: ['modbustcp-client'],
    host: 'Linux · arm64',
    gpu: null,
    cli: '0.14.2',
    last: ['10:42', '10:42'],
  },
  {
    name: 'Warehouse camera node',
    slug: 'warehouse-cam',
    status: 'disconnected',
    apps: [],
    host: 'Linux · x64',
    gpu: null,
    cli: '0.13.0',
    outdated: true,
    last: ['10월 24일', 'Oct 24'],
  },
  {
    name: 'Jetson inspector',
    slug: 'jetson-insp',
    status: 'start_failed',
    apps: [],
    host: 'Linux · arm64',
    gpu: 'Orin · 32 GB',
    cli: '0.14.2',
    last: ['10월 23일', 'Oct 23'],
  },
  {
    name: 'QA laptop',
    slug: 'qa-laptop',
    status: 'stopped',
    apps: [],
    host: 'Windows · x64',
    gpu: null,
    cli: '0.14.2',
    last: ['10월 21일', 'Oct 21'],
  },
];

export function MockAgentList() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="agents"
      title={lang === 'ko' ? '에이전트' : 'Agents'}
      actions={
        <MockButton icon={Plus} variant="default">
          {c.create}
        </MockButton>
      }
      tabs={[
        {icon: Cpu, label: c.tabs[0], active: true},
        {icon: Download, label: c.tabs[1]},
      ]}
    >
      <div className="mb-2.5 flex flex-wrap items-center gap-2">
        <span className="flex h-6 w-40 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px] text-muted-foreground">
          <Search className="size-3 shrink-0" />
          <span className="truncate">{c.search}</span>
        </span>
        <span className="flex gap-0.5 rounded-md bg-muted p-[3px]">
          {c.segments.map(([label, count, dot], i) => (
            <span
              key={label}
              className={cn(
                'flex items-center gap-1 rounded-[4px] px-1.5 py-0.5 text-[9.5px] font-medium whitespace-nowrap',
                i === 0 ? 'bg-background shadow-sm' : 'text-muted-foreground',
                i >= 2 && 'hidden @2xl:flex',
              )}
            >
              {dot && <span className={cn('size-1.5 rounded-full', dot)} />}
              {label}
              <span className="opacity-60 tabular-nums">{count}</span>
            </span>
          ))}
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <MockButton icon={ListFilter} className="hidden @xl:inline-flex">
            {c.filter}
          </MockButton>
          <MockButton icon={ArrowDownWideNarrow} className="hidden @3xl:inline-flex">
            {c.sort}
          </MockButton>
          <span className="flex overflow-hidden rounded-md border border-border">
            <span className="flex size-6 items-center justify-center bg-accent">
              <Table2 className="size-3" />
            </span>
            <span className="flex size-6 items-center justify-center text-muted-foreground">
              <LayoutGrid className="size-3" />
            </span>
          </span>
        </span>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-card">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="bg-muted/50 text-left text-[9.5px] text-muted-foreground">
              <th className="px-2.5 py-1.5 font-medium">{c.cols[0]}</th>
              <th className="px-2 py-1.5 font-medium">{c.cols[1]}</th>
              <th className="hidden px-2 py-1.5 font-medium @2xl:table-cell">
                {c.cols[2]}
              </th>
              <th className="hidden px-2 py-1.5 font-medium @3xl:table-cell">
                {c.cols[3]}
              </th>
              <th className="hidden px-2 py-1.5 font-medium @4xl:table-cell">
                {c.cols[4]}
              </th>
              <th className="hidden px-2 py-1.5 font-medium @xl:table-cell">
                {c.cols[5]}
              </th>
              <th className="w-16 px-2 py-1.5" />
            </tr>
          </thead>
          <tbody>
            {AGENTS.map(agent => (
              <tr key={agent.slug} className="border-t border-border">
                <td className="px-2.5 py-1.5">
                  <span className="block font-medium">{agent.name}</span>
                  <span className="block font-mono text-[9px] text-muted-foreground">
                    {agent.slug}
                  </span>
                </td>
                <td className="px-2 py-1.5">
                  <span
                    className={cn(
                      'inline-flex rounded-md px-1.5 py-px text-[9px] font-semibold whitespace-nowrap',
                      STATUS_CLASS[agent.status],
                    )}
                  >
                    {c.status[agent.status]}
                  </span>
                  {agent.status === 'start_failed' && (
                    <span className="mt-0.5 block text-[8.5px] text-muted-foreground">
                      {c.reason}
                    </span>
                  )}
                </td>
                <td className="hidden px-2 py-1.5 @2xl:table-cell">
                  <span className="flex gap-1">
                    {agent.apps.slice(0, 2).map(app => (
                      <span
                        key={app}
                        className="rounded border border-border px-1 font-mono text-[8.5px] text-muted-foreground"
                      >
                        {app}
                      </span>
                    ))}
                    {agent.apps.length > 2 && (
                      <span className="rounded border border-dashed border-border px-1 text-[8.5px] text-muted-foreground">
                        +{agent.apps.length - 2}
                      </span>
                    )}
                  </span>
                </td>
                <td className="hidden px-2 py-1.5 @3xl:table-cell">
                  <span className="block">{agent.host}</span>
                  <span className="block text-[9px] text-muted-foreground">
                    {agent.gpu ?? c.noGpu}
                  </span>
                </td>
                <td className="hidden px-2 py-1.5 @4xl:table-cell">
                  <span className="flex items-center gap-1">
                    <span className="font-mono text-[9.5px]">{agent.cli}</span>
                    {agent.outdated && (
                      <span className="rounded bg-amber-100 px-1 text-[8.5px] text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
                        {c.update}
                      </span>
                    )}
                  </span>
                </td>
                <td className="hidden px-2 py-1.5 text-muted-foreground tabular-nums @xl:table-cell">
                  {agent.last[lang === 'ko' ? 0 : 1]}
                </td>
                <td className="px-2 py-1.5">
                  <span className="flex justify-end gap-1.5">
                    {agent.status === 'active' ? (
                      <Square className="size-3 text-amber-600" />
                    ) : (
                      <Play className="size-3 text-emerald-600" />
                    )}
                    <KeyRound className="size-3 text-sky-600" />
                    <Trash2
                      className={cn(
                        'size-3',
                        agent.status === 'active'
                          ? 'text-muted-foreground/30'
                          : 'text-red-600',
                      )}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockAppFrame>
  );
}
