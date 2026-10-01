import {
  Bot,
  Box,
  Camera,
  Cctv,
  Cloud,
  GanttChart,
  HardDrive,
  LayoutDashboard,
  Plus,
  Radar,
  ScanLine,
  Server,
  Webhook,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Collectors overview (`/proj/:id/collectors`): one `AgentBudgetCard` per
 * agent (budget meters + state pills), then `_AttentionList` and
 * `_StorageSummary` side by side.
 */

const COPY = {
  ko: {
    title: 'Collectors',
    create: '수집기 만들기',
    meta: '수집기 6개 · 에이전트 2대',
    tabs: {overview: '개요', list: '수집기', timeline: '타임라인', storage: '저장소'},
    online: '온라인',
    cpu: 'CPU 예산',
    cpuValue: (used: number, limit: number) => `${used}% / 한도 ${limit}%`,
    memory: '메모리 예산',
    disk: '로컬 디스크',
    highWater: (p: number) => `하한선 ${p}%`,
    states: {recording: '녹화 중', stale: '수신 끊김', deferred: '예산 초과 대기'},
    attentionTitle: '주의가 필요한 항목',
    view: '보기',
    stale: '새 세그먼트가 들어오지 않습니다.',
    deferred: '에이전트의 예산이 모자라 대기 중입니다.',
    error: 'RTSP 연결이 거부되었습니다 (401 Unauthorized).',
    storageTitle: '저장 위치',
    storageLocal: (n: number) => `로컬 (에이전트 ${n}대)`,
    storageCloud: '클라우드 보관',
    storageCloudHint: '프로젝트 저장 용량에 합산됩니다.',
    kindsTitle: '종류별 수집기',
    kinds: {
      cctv: 'CCTV',
      gige: 'GigE Vision',
      sensorProfile: '2D 프로파일 센서',
      sensor3d: '3D 센서',
      modbus: 'Modbus',
      httpServer: 'HTTP 서버',
    },
    names: {
      dock: '입고 도크 CCTV',
      press: '프레스 2호기 압력',
      weld: '용접 비드 프로파일',
      mes: '라인 PLC 이벤트 수신',
    },
  },
  en: {
    title: 'Collectors',
    create: 'New collector',
    meta: '6 collectors · 2 agents',
    tabs: {
      overview: 'Overview',
      list: 'All collectors',
      timeline: 'Timeline',
      storage: 'Storage',
    },
    online: 'Online',
    cpu: 'CPU budget',
    cpuValue: (used: number, limit: number) => `${used}% / limit ${limit}%`,
    memory: 'Memory budget',
    disk: 'Local disk',
    highWater: (p: number) => `High-water ${p}%`,
    states: {
      recording: 'Recording',
      stale: 'No signal',
      deferred: 'Waiting for budget',
    },
    attentionTitle: 'Needs attention',
    view: 'View',
    stale: 'No new segment is arriving.',
    deferred: 'Waiting because the agent budget is short.',
    error: 'The RTSP connection was refused (401 Unauthorized).',
    storageTitle: 'Storage',
    storageLocal: (n: number) => `Local (${n} agents)`,
    storageCloud: 'Cloud tier',
    storageCloudHint: 'Counts toward the project storage.',
    kindsTitle: 'Collectors by kind',
    kinds: {
      cctv: 'CCTV',
      gige: 'GigE Vision',
      sensorProfile: '2D profile sensor',
      sensor3d: '3D sensor',
      modbus: 'Modbus',
      httpServer: 'HTTP server',
    },
    names: {
      dock: 'Dock CCTV',
      press: 'Press #2 pressure',
      weld: 'Weld bead profile',
      mes: 'Line PLC event inbox',
    },
  },
} as const;

type StateKey = 'recording' | 'stale' | 'deferred';

/** `CollectorStatusBadge` tones. */
const STATE_TONE: Record<StateKey, {badge: string; dot: string}> = {
  recording: {
    badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  stale: {
    badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  deferred: {
    badge: 'bg-violet-500/10 text-violet-700 dark:text-violet-400',
    dot: 'bg-violet-500',
  },
};

type Agent = {
  name: string;
  root: string;
  cpu: [number, number];
  memory: [string, string, number];
  disk: [string, string, number];
  highWater: number;
  counts: Partial<Record<StateKey, number>>;
};

const AGENTS: Agent[] = [
  {
    name: 'line-02-edge',
    root: '/var/lib/cvp/collectors',
    cpu: [35, 200],
    memory: ['1.2 GB', '4 GB', 0.3],
    disk: ['120 GB', '500 GB', 0.24],
    highWater: 90,
    counts: {recording: 3, stale: 1},
  },
  {
    name: 'gpu-node-01',
    root: '/data/cvp',
    cpu: [180, 200],
    memory: ['3.1 GB', '8 GB', 0.39],
    disk: ['1.6 TB', '2 TB', 0.8],
    highWater: 85,
    counts: {recording: 1, deferred: 1},
  },
];

function MeterRow({
  label,
  value,
  fraction,
  limit,
}: {
  label: string;
  value: string;
  fraction: number;
  limit?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-3 text-[10px]">
        <span className="truncate text-muted-foreground">{label}</span>
        <span className="shrink-0 tabular-nums">{value}</span>
      </div>
      <div className="relative h-1.5 rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-foreground"
          style={{width: `${Math.round(fraction * 100)}%`}}
        />
        {limit !== undefined && (
          <span
            className="absolute -top-1 h-3.5 w-px bg-destructive"
            style={{left: `${limit}%`}}
          />
        )}
      </div>
    </div>
  );
}

function StatePill({
  state,
  label,
  count,
}: {
  state: StateKey;
  label: string;
  count: number;
}) {
  const tone = STATE_TONE[state];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap',
        tone.badge,
      )}
    >
      <span className={cn('size-1.5 rounded-full', tone.dot)} />
      {label}
      <span className="tabular-nums">{count}</span>
    </span>
  );
}

function KindIcon({icon: Icon}: {icon: LucideIcon}) {
  return (
    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
      <Icon className="size-3" />
    </span>
  );
}

export function MockCollectorsOverview() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  const attention = [
    {icon: Radar, tone: 'text-destructive', title: c.names.dock, text: c.error},
    {
      icon: Radar,
      tone: 'text-amber-600 dark:text-amber-400',
      title: c.names.press,
      text: c.stale,
    },
    {
      icon: Radar,
      tone: 'text-amber-600 dark:text-amber-400',
      title: c.names.weld,
      text: c.deferred,
    },
  ];

  const kinds: {icon: LucideIcon; label: string; count: number}[] = [
    {icon: Cctv, label: c.kinds.cctv, count: 1},
    {icon: Camera, label: c.kinds.gige, count: 1},
    {icon: ScanLine, label: c.kinds.sensorProfile, count: 1},
    {icon: Box, label: c.kinds.sensor3d, count: 1},
    {icon: Server, label: c.kinds.modbus, count: 1},
    {icon: Webhook, label: c.kinds.httpServer, count: 1},
  ];

  return (
    <MockAppFrame
      activeNav="collectors"
      title={c.title}
      meta={<span className="text-[11px] text-muted-foreground">{c.meta}</span>}
      actions={
        <MockButton icon={Plus} variant="default">
          {c.create}
        </MockButton>
      }
      tabs={[
        {icon: LayoutDashboard, label: c.tabs.overview, active: true},
        {icon: Radar, label: c.tabs.list},
        {icon: GanttChart, label: c.tabs.timeline},
        {icon: HardDrive, label: c.tabs.storage},
      ]}
    >
      <div className="flex flex-col gap-3">
        {/* agent budget cards */}
        <section className="grid grid-cols-1 gap-3 @2xl:grid-cols-2">
          {AGENTS.map((agent, i) => (
            <div
              key={agent.name}
              className={cn(
                'flex flex-col gap-3 rounded-md border border-border bg-card p-3.5',
                i > 0 && 'hidden @xl:flex',
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Bot className="size-3.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold">{agent.name}</p>
                    <p className="truncate text-[10px] text-muted-foreground">
                      {agent.root}
                    </p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {c.online}
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                <MeterRow
                  label={c.cpu}
                  value={c.cpuValue(agent.cpu[0], agent.cpu[1])}
                  fraction={agent.cpu[0] / agent.cpu[1]}
                />
                <MeterRow
                  label={c.memory}
                  value={`${agent.memory[0]} / ${agent.memory[1]}`}
                  fraction={agent.memory[2]}
                />
                <MeterRow
                  label={`${c.disk} · ${c.highWater(agent.highWater)}`}
                  value={`${agent.disk[0]} / ${agent.disk[1]}`}
                  fraction={agent.disk[2]}
                  limit={agent.highWater}
                />
              </div>
              <div className="flex flex-wrap gap-1">
                {(Object.keys(agent.counts) as StateKey[]).map(state => (
                  <StatePill
                    key={state}
                    state={state}
                    label={c.states[state]}
                    count={agent.counts[state] ?? 0}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="grid items-start gap-3 @3xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* _AttentionList */}
          <div className="rounded-md border border-border bg-card p-3.5">
            <div className="mb-0.5 flex items-center justify-between gap-3">
              <h4 className="text-[11px] font-semibold">{c.attentionTitle}</h4>
              <span className="rounded-md bg-secondary px-1.5 py-px text-[10px] font-semibold tabular-nums text-secondary-foreground">
                {attention.length}
              </span>
            </div>
            <ul className="divide-y divide-border">
              {attention.map(({icon: Icon, tone, title, text}) => (
                <li key={title} className="flex items-center gap-2.5 py-2">
                  <Icon className={cn('size-3.5 shrink-0', tone)} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-medium">{title}</p>
                    <p className="truncate text-[10px] text-muted-foreground">{text}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-medium">{c.view}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* _StorageSummary */}
          <div className="hidden flex-col gap-3 rounded-md border border-border bg-card p-3.5 @xl:flex">
            <h4 className="text-[11px] font-semibold">{c.storageTitle}</h4>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-3 text-[10px]">
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <HardDrive className="size-3" />
                  {c.storageLocal(2)}
                </span>
                <span className="tabular-nums">1.7 TB / 2.5 TB</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted">
                <div className="h-full w-[68%] rounded-full bg-foreground" />
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-baseline justify-between gap-3 text-[10px]">
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Cloud className="size-3" />
                  {c.storageCloud}
                </span>
                <span className="tabular-nums">84.2 GB</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{c.storageCloudHint}</p>
            </div>
            <div className="h-px bg-border" />
            <h4 className="text-[11px] font-semibold">{c.kindsTitle}</h4>
            <ul className="flex flex-col gap-1.5">
              {kinds.map(kind => (
                <li key={kind.label} className="flex items-center gap-2 text-[11px]">
                  <KindIcon icon={kind.icon} />
                  <span className="min-w-0 flex-1 truncate">{kind.label}</span>
                  <span className="tabular-nums">{kind.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MockAppFrame>
  );
}
