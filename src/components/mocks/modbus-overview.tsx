import {
  Activity,
  ChevronDown,
  Cpu,
  History,
  LayoutDashboard,
  MemoryStick,
  Play,
  Plug,
  Settings,
  Square,
} from 'lucide-react';
import type {ReactNode} from 'react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';

/**
 * Modbus app, 개요 tab (`/proj/:id/modbus`, `_ModbusOverviewTab.tsx`) in
 * simulator mode: run-state hero, connector stats, requests by area
 * (`_ModbusTrafficChart`), recent activity and the register areas.
 */

const COPY = {
  ko: {
    title: 'Modbus',
    live: '실시간',
    stop: '중지',
    tabs: {
      overview: '개요',
      history: '통신 히스토리',
      memoryMap: '메모리 맵',
      settings: '설정',
      connect: '에이전트 연결',
    },
    listening: '수신 대기',
    agentOnline: '에이전트 온라인',
    role: '이 에이전트가 Modbus TCP 서버를 구동하며 레지스터 값의 source of truth 역할을 합니다. 값은 연결된 메모리 맵과 양방향으로 미러링됩니다.',
    statsTitle: '커넥터 상태',
    stat: {
      connection: '연결 상태',
      unitId: 'Unit ID',
      areas: '영역 수',
      registers: '총 레지스터',
      requests: '요청',
      lastActivity: '마지막 활동',
      memoryMap: '메모리 맵',
      latency: '수신 간격',
    },
    trafficTitle: '영역별 요청',
    trafficSession: '이 화면을 연 뒤로 받은 기록 기준입니다.',
    trafficCounts: (r: number, w: number, e: number) =>
      `읽기 ${r} · 쓰기 ${w} · 예외 ${e}`,
    kinds: {read: '읽기', write: '쓰기', exception: '예외'},
    recentTitle: '최근 활동',
    openHistory: '통신 히스토리에서 보기',
    areasTitle: '레지스터 영역',
    areaLength: (n: number) => `길이 ${n}`,
    areaPoll: (n: number) => `폴링 ${n}ms`,
    illegalAddress: 'Illegal data address',
  },
  en: {
    title: 'Modbus',
    live: 'Live',
    stop: 'Stop',
    tabs: {
      overview: 'Overview',
      history: 'Traffic history',
      memoryMap: 'Memory map',
      settings: 'Settings',
      connect: 'Connect Agent',
    },
    listening: 'Listening',
    agentOnline: 'Agent online',
    role: 'This agent runs a Modbus TCP server and owns the register values. They mirror both ways with the linked memory map.',
    statsTitle: 'Connector state',
    stat: {
      connection: 'Connection',
      unitId: 'Unit ID',
      areas: 'Areas',
      registers: 'Total registers',
      requests: 'Requests',
      lastActivity: 'Last activity',
      memoryMap: 'Memory map',
      latency: 'Receive interval',
    },
    trafficTitle: 'Requests by area',
    trafficSession: 'Counted since this screen was opened.',
    trafficCounts: (r: number, w: number, e: number) =>
      `${r} read · ${w} write · ${e} exception`,
    kinds: {read: 'Read', write: 'Write', exception: 'Exception'},
    recentTitle: 'Recent activity',
    openHistory: 'Open traffic history',
    areasTitle: 'Register areas',
    areaLength: (n: number) => `Length ${n}`,
    areaPoll: (n: number) => `Poll ${n}ms`,
    illegalAddress: 'Illegal data address',
  },
} as const;

type Kind = 'read' | 'write' | 'exception';

/** `--traffic-*` colors of `_ModbusTrafficChart` (light values). */
const KIND_COLOR: Record<Kind, string> = {
  read: '#2a78d6',
  write: '#1baf7a',
  exception: '#d03b3b',
};

const AREA_LABEL = {
  holding: 'Holding Register',
  input: 'Input Register',
  coil: 'Coil',
  discrete: 'Discrete Input',
} as const;

type Area = keyof typeof AREA_LABEL;

const TRAFFIC: {area: Area; counts: Record<Kind, number>}[] = [
  {area: 'holding', counts: {read: 412, write: 96, exception: 4}},
  {area: 'input', counts: {read: 288, write: 0, exception: 0}},
  {area: 'coil', counts: {read: 134, write: 41, exception: 0}},
  {area: 'discrete', counts: {read: 57, write: 0, exception: 2}},
];

const AREAS: {area: Area; address: number; length: number}[] = [
  {area: 'holding', address: 0, length: 120},
  {area: 'input', address: 0, length: 64},
  {area: 'coil', address: 0, length: 32},
  {area: 'discrete', address: 100, length: 16},
];

const RECENT: {ts: string; kind: Kind; area: Area; address: number; error?: boolean}[] =
  [
    {ts: '2026-10-01 14:32:05', kind: 'read', area: 'holding', address: 40},
    {ts: '2026-10-01 14:32:05', kind: 'write', area: 'coil', address: 3},
    {ts: '2026-10-01 14:32:04', kind: 'read', area: 'input', address: 12},
    {
      ts: '2026-10-01 14:32:04',
      kind: 'exception',
      area: 'holding',
      address: 180,
      error: true,
    },
    {ts: '2026-10-01 14:32:03', kind: 'read', area: 'discrete', address: 100},
  ];

function Card({
  title,
  subtitle,
  aside,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-md border border-border bg-card ${className ?? ''}`}>
      <div className="flex items-center justify-between gap-2 px-3.5 pt-3 pb-2">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold">{title}</p>
          {subtitle && <p className="text-[10px] text-muted-foreground">{subtitle}</p>}
        </div>
        {aside}
      </div>
      <div className="px-3.5 pb-3">{children}</div>
    </div>
  );
}

export function MockModbusOverview() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  const total = TRAFFIC.reduce(
    (sum, row) => sum + row.counts.read + row.counts.write + row.counts.exception,
    0,
  );
  const max = Math.max(
    ...TRAFFIC.map(row => row.counts.read + row.counts.write + row.counts.exception),
  );

  const stats: [string, string][] = [
    [c.stat.connection, c.live],
    [c.stat.unitId, '1'],
    [c.stat.areas, String(AREAS.length)],
    [c.stat.registers, String(AREAS.reduce((s, a) => s + a.length, 0))],
    [c.stat.requests, String(total)],
    [c.stat.lastActivity, '2026-10-01 14:32:05'],
    [c.stat.memoryMap, 'press-line-2 · 64 KB'],
    [c.stat.latency, '250ms'],
  ];

  return (
    <MockAppFrame
      activeNav="modbus"
      title={c.title}
      meta={
        <span className="inline-flex items-center gap-1 rounded-md bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-800">
          <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
          {c.live}
        </span>
      }
      actions={
        <>
          <span className="hidden h-6 w-40 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px] shadow-sm @xl:flex">
            <Cpu className="size-3 shrink-0 opacity-70" />
            <span className="min-w-0 flex-1 truncate">line-02-edge</span>
            <ChevronDown className="size-3 shrink-0 opacity-50" />
          </span>
          <MockButton icon={Square}>{c.stop}</MockButton>
        </>
      }
      tabs={[
        {icon: LayoutDashboard, label: c.tabs.overview, active: true},
        {icon: History, label: c.tabs.history},
        {icon: MemoryStick, label: c.tabs.memoryMap},
        {icon: Settings, label: c.tabs.settings},
        {icon: Plug, label: c.tabs.connect},
      ]}
    >
      <div className="space-y-3">
        {/* hero */}
        <div className="space-y-1.5 rounded-md border border-border bg-card px-3.5 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <Play className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[14px] font-semibold">{c.listening}</span>
            <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground">
              {c.agentOnline}
            </span>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">0.0.0.0:5020</p>
          <p className="line-clamp-2 max-w-xl text-[11px] text-muted-foreground">
            {c.role}
          </p>
        </div>

        {/* stats */}
        <Card title={c.statsTitle}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 @2xl:grid-cols-3 @4xl:grid-cols-4">
            {stats.map(([label, value]) => (
              <div key={label} className="min-w-0 space-y-0.5">
                <p className="text-[10px] text-muted-foreground">{label}</p>
                <p className="truncate font-mono text-[11px]">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-3 @3xl:grid-cols-2">
          {/* traffic by area */}
          <Card title={c.trafficTitle} subtitle={c.trafficSession}>
            <ul className="space-y-2">
              {TRAFFIC.map(({area, counts}) => (
                <li key={area} className="space-y-1">
                  <div className="flex items-baseline justify-between gap-3 text-[10px]">
                    <span className="truncate">{AREA_LABEL[area]}</span>
                    <span className="shrink-0 font-mono text-muted-foreground">
                      {c.trafficCounts(counts.read, counts.write, counts.exception)}
                    </span>
                  </div>
                  <div className="flex h-1.5 gap-0.5 overflow-hidden rounded-full bg-muted">
                    {(Object.keys(KIND_COLOR) as Kind[]).map(kind =>
                      counts[kind] > 0 ? (
                        <span
                          key={kind}
                          className="h-full rounded-full"
                          style={{
                            width: `${(counts[kind] / max) * 100}%`,
                            backgroundColor: KIND_COLOR[kind],
                          }}
                        />
                      ) : null,
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
              {(Object.keys(KIND_COLOR) as Kind[]).map(kind => (
                <li key={kind} className="flex items-center gap-1">
                  <span
                    className="size-1.5 rounded-full"
                    style={{backgroundColor: KIND_COLOR[kind]}}
                  />
                  {c.kinds[kind]}
                </li>
              ))}
            </ul>
          </Card>

          {/* recent activity */}
          <Card
            title={c.recentTitle}
            aside={
              <MockButton icon={Activity} variant="ghost" className="px-1">
                {c.openHistory}
              </MockButton>
            }
          >
            <ul className="divide-y divide-border">
              {RECENT.map((event, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 py-1.5 text-[10px]"
                >
                  <span className="font-mono text-muted-foreground">{event.ts}</span>
                  <span>{c.kinds[event.kind]}</span>
                  <span>{AREA_LABEL[event.area]}</span>
                  <code className="font-mono">{event.address}</code>
                  {event.error && (
                    <span className="text-destructive">{c.illegalAddress}</span>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* register areas */}
        <Card title={c.areasTitle}>
          <ul className="divide-y divide-border">
            {AREAS.map(({area, address, length}) => (
              <li
                key={area}
                className="flex flex-wrap items-center gap-x-3 gap-y-0.5 py-1.5 text-[11px]"
              >
                <span className="w-28 shrink-0">{AREA_LABEL[area]}</span>
                <code className="font-mono text-[10px]">
                  {address} – {address + length - 1}
                </code>
                <span className="text-[10px] text-muted-foreground">
                  {c.areaLength(length)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </MockAppFrame>
  );
}
