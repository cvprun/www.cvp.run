import {
  AlertTriangle,
  Bot,
  Box,
  Camera,
  ChartGantt,
  HardDrive,
  LayoutDashboard,
  Plus,
  Radar,
  Server,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {MockCard} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Collectors › 개요 (`/proj/:id/collectors`, reworked 2026-10-01): the
 * five-cell status strip, 주의가 필요한 항목 beside 종류별 수집기, and the
 * agents table with CPU / memory budget and local-disk meters (high-water
 * tick). Rows follow the factory story; kinds shown are the ones the app can
 * create today (simulator, ModbusTCP devices) plus imported streams.
 */
const COPY = {
  ko: {
    title: '개요',
    tabs: ['개요', '수집기', '타임라인', '저장소'],
    create: '수집기 만들기',
    meta: '수집기 6개 · 에이전트 3대',
    strip: [
      {label: '녹화 중', value: '3', hint: '수집기 6개 가운데', tone: 'ok'},
      {
        label: '주의',
        value: '2',
        hint: '수신 끊김 1 · 에이전트 오프라인 1',
        tone: 'warn',
      },
      {label: '정지', value: '1', hint: '꺼 두었거나 멈춘 수집기', tone: ''},
      {
        label: '로컬 녹화',
        value: '1.9 TB',
        hint: '에이전트 3대 · 디스크 2.9 TB',
        tone: '',
      },
      {
        label: '클라우드 보관',
        value: '155.2 GB',
        hint: '프로젝트 저장 용량에 합산됩니다.',
        tone: '',
      },
    ],
    attention: '주의가 필요한 항목',
    attentionRows: [
      {
        icon: Radar,
        title: 'SIM-04 · line3-edge-02',
        desc: '새 세그먼트가 수신되지 않습니다.',
        pill: '수신 끊김',
      },
      {
        icon: Bot,
        title: 'qa-bench-pc',
        desc: '오프라인 — 이 에이전트에만 있는 구간은 조회할 수 없습니다.',
        pill: '에이전트 오프라인',
      },
    ],
    view: '보기',
    byKind: '종류별 수집기',
    kinds: [
      {icon: Radar, label: '시뮬레이터', count: 4},
      {icon: Server, label: 'ModbusTCP', count: 2},
      {icon: Camera, label: 'GigE Vision', count: 0, soon: true},
      {icon: Box, label: '3D 센서', count: 0, soon: true},
    ],
    soon: '준비 중',
    agents: '에이전트',
    cols: ['에이전트', '연결', '수집기', 'CPU 예산', '메모리 예산', '로컬 디스크'],
    online: '온라인',
    offline: '오프라인',
    limit: '한도',
    highWater: '하한선 85%',
  },
  en: {
    title: 'Overview',
    tabs: ['Overview', 'All collectors', 'Timeline', 'Storage'],
    create: 'New collector',
    meta: '6 collectors · 3 agents',
    strip: [
      {label: 'Recording', value: '3', hint: 'of 6 collectors', tone: 'ok'},
      {
        label: 'Needs attention',
        value: '2',
        hint: 'No signal 1 · Agent offline 1',
        tone: 'warn',
      },
      {label: 'Stopped', value: '1', hint: 'Turned off or stopped', tone: ''},
      {
        label: 'Local recordings',
        value: '1.9 TB',
        hint: '3 agents · 2.9 TB of disk',
        tone: '',
      },
      {
        label: 'Cloud tier',
        value: '155.2 GB',
        hint: 'Counts toward the project storage.',
        tone: '',
      },
    ],
    attention: 'Needs attention',
    attentionRows: [
      {
        icon: Radar,
        title: 'SIM-04 · line3-edge-02',
        desc: 'No new segment is arriving.',
        pill: 'No signal',
      },
      {
        icon: Bot,
        title: 'qa-bench-pc',
        desc: 'Offline — ranges that exist only on this agent cannot be viewed.',
        pill: 'Agent offline',
      },
    ],
    view: 'View',
    byKind: 'Collectors by kind',
    kinds: [
      {icon: Radar, label: 'Simulator', count: 4},
      {icon: Server, label: 'ModbusTCP', count: 2},
      {icon: Camera, label: 'GigE Vision', count: 0, soon: true},
      {icon: Box, label: '3D sensor', count: 0, soon: true},
    ],
    soon: 'Coming soon',
    agents: 'Agents',
    cols: ['Agent', 'Link', 'Collectors', 'CPU budget', 'Memory budget', 'Local disk'],
    online: 'Online',
    offline: 'Offline',
    limit: 'limit',
    highWater: 'High-water 85%',
  },
} as const;

type AgentRow = {
  name: string;
  online: boolean;
  collectors: number;
  cpu: [number, number];
  mem: [number, number];
  disk: [number, number];
};

const AGENTS: AgentRow[] = [
  {
    name: 'line3-edge-01',
    online: true,
    collectors: 3,
    cpu: [368, 800],
    mem: [9.4, 24],
    disk: [872, 1000],
  },
  {
    name: 'line3-edge-02',
    online: true,
    collectors: 2,
    cpu: [570, 600],
    mem: [6.1, 16],
    disk: [604, 1000],
  },
  {
    name: 'qa-bench-pc',
    online: false,
    collectors: 1,
    cpu: [0, 400],
    mem: [0, 8],
    disk: [412, 900],
  },
];

function Meter({
  used,
  total,
  highWater,
}: {
  used: number;
  total: number;
  highWater?: number;
}) {
  const pct = Math.min(100, (used / total) * 100);
  const warn = pct >= 90 || (highWater !== undefined && pct >= highWater);
  return (
    <span className="relative mt-1 block h-1 w-full rounded-full bg-muted">
      <span
        className={cn(
          'absolute inset-y-0 left-0 rounded-full',
          warn ? 'bg-amber-500' : 'bg-foreground',
        )}
        style={{width: `${pct}%`}}
      />
      {highWater !== undefined && (
        <span
          className="absolute -top-0.5 h-2 w-px bg-destructive"
          style={{left: `${highWater}%`}}
        />
      )}
    </span>
  );
}

export function MockCollectorsOverview() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const tabIcons: LucideIcon[] = [LayoutDashboard, Radar, ChartGantt, HardDrive];

  return (
    <MockAppFrame
      activeNav="collectors"
      crumbs={[{icon: LayoutDashboard, label: c.title}]}
      title={c.title}
      titleIcon={LayoutDashboard}
      meta={<span className="text-[10px] text-muted-foreground">{c.meta}</span>}
      actions={
        <MockButton icon={Plus} variant="default">
          {c.create}
        </MockButton>
      }
      tabs={c.tabs.map((label, i) => ({icon: tabIcons[i], label, active: i === 0}))}
    >
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border @3xl:grid-cols-5">
        {c.strip.map(cell => (
          <div key={cell.label} className="bg-card px-3 py-2.5">
            <dt className="text-[9.5px] text-muted-foreground">{cell.label}</dt>
            <dd
              className={cn(
                'text-lg leading-tight font-semibold tabular-nums',
                cell.tone === 'ok' && 'text-emerald-700 dark:text-emerald-400',
                cell.tone === 'warn' && 'text-amber-700 dark:text-amber-400',
              )}
            >
              {cell.value}
            </dd>
            <dd className="truncate text-[9px] text-muted-foreground">{cell.hint}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 grid gap-3 @3xl:grid-cols-[1.4fr_1fr]">
        <MockCard
          icon={AlertTriangle}
          title={c.attention}
          badge={
            <span className="text-[10px] text-muted-foreground tabular-nums">2</span>
          }
        >
          <ul className="space-y-2">
            {c.attentionRows.map(row => {
              const Icon = row.icon;
              return (
                <li key={row.title} className="flex items-center gap-2">
                  <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[10px] font-medium">
                      {row.title}
                    </span>
                    <span className="block truncate text-[9px] text-muted-foreground">
                      {row.desc}
                    </span>
                  </span>
                  <span className="hidden shrink-0 items-center gap-1 rounded-full bg-amber-500/10 px-1.5 py-px text-[9px] font-medium text-amber-700 @xl:inline-flex dark:text-amber-400">
                    <span className="size-1.5 rounded-full bg-amber-500" />
                    {row.pill}
                  </span>
                  <span className="shrink-0 text-[9.5px] text-muted-foreground">
                    {c.view}
                  </span>
                </li>
              );
            })}
          </ul>
        </MockCard>

        <MockCard icon={Radar} title={c.byKind}>
          <ul className="grid grid-cols-2 gap-1.5">
            {c.kinds.map(kind => {
              const Icon = kind.icon;
              return (
                <li
                  key={kind.label}
                  className={cn(
                    'flex items-center gap-1.5',
                    'soon' in kind && kind.soon && 'opacity-55',
                  )}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted">
                    <Icon className="size-3" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[10px]">{kind.label}</span>
                    <span className="block text-[9px] text-muted-foreground tabular-nums">
                      {'soon' in kind && kind.soon ? c.soon : kind.count}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </MockCard>
      </div>

      <div className="mt-3 overflow-hidden rounded-md border border-border bg-card">
        <p className="px-3 pt-2.5 pb-2 text-[11px] font-semibold">{c.agents}</p>
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-t border-border bg-muted/50 text-left text-[9.5px] text-muted-foreground">
              <th className="px-3 py-1.5 font-medium">{c.cols[0]}</th>
              <th className="px-2 py-1.5 font-medium">{c.cols[1]}</th>
              <th className="hidden px-2 py-1.5 text-right font-medium @xl:table-cell">
                {c.cols[2]}
              </th>
              <th className="hidden px-2 py-1.5 font-medium @2xl:table-cell">
                {c.cols[3]}
              </th>
              <th className="hidden px-2 py-1.5 font-medium @3xl:table-cell">
                {c.cols[4]}
              </th>
              <th className="px-3 py-1.5 font-medium">{c.cols[5]}</th>
            </tr>
          </thead>
          <tbody>
            {AGENTS.map(agent => (
              <tr
                key={agent.name}
                className={cn('border-t border-border', !agent.online && 'opacity-60')}
              >
                <td className="px-3 py-1.5">
                  <span className="block font-medium">{agent.name}</span>
                  <span className="block font-mono text-[9px] text-muted-foreground">
                    /var/lib/cvp
                  </span>
                </td>
                <td className="px-2 py-1.5">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-1.5 py-px text-[9px] font-medium',
                      agent.online
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {agent.online ? c.online : c.offline}
                  </span>
                </td>
                <td className="hidden px-2 py-1.5 text-right tabular-nums @xl:table-cell">
                  {agent.collectors}
                </td>
                <td className="hidden w-28 px-2 py-1.5 @2xl:table-cell">
                  <span className="block text-[9px] tabular-nums">
                    {agent.cpu[0]}% / {c.limit} {agent.cpu[1]}%
                  </span>
                  <Meter used={agent.cpu[0]} total={agent.cpu[1]} />
                </td>
                <td className="hidden w-28 px-2 py-1.5 @3xl:table-cell">
                  <span className="block text-[9px] tabular-nums">
                    {agent.mem[0]} GB / {agent.mem[1]} GB
                  </span>
                  <Meter used={agent.mem[0]} total={agent.mem[1]} />
                </td>
                <td className="w-32 px-3 py-1.5">
                  <span className="block text-[9px] tabular-nums">
                    {agent.disk[0]} GB / {agent.disk[1]} GB
                  </span>
                  <Meter used={agent.disk[0]} total={agent.disk[1]} highWater={85} />
                  <span className="mt-0.5 block text-[8.5px] text-muted-foreground">
                    {c.highWater}
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
