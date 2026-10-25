import {
  Cable,
  Play,
  Plus,
  Search,
  Server,
  Settings,
  Square,
  Trash2,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * ModbusTCP device list (`/proj/:id/modbustcp`): the four-cell summary strip,
 * the type segment, and the devices table — servers opened on an agent and
 * clients polling a PLC, with collection (recording into Collectors) and
 * state pills. Rows follow `modbustcp/_stories/fixtures.ts`.
 */
const COPY = {
  ko: {
    meta: '장치 4개',
    create: '만들기',
    summary: [
      ['실행 중', '2', '전체 4개 중'],
      ['주의', '1', '오류 1'],
      ['태그', '79', '장치 4개의 합'],
      ['수집 중', '1', '수집기로 녹화하는 장치'],
    ],
    search: '이름 · 슬러그 · 에이전트 · 주소 검색',
    types: ['전체', '서버', '클라이언트'],
    cols: ['이름', '유형', '주소', '폴링', '태그', '수집', '상태'],
    server: '서버',
    client: '클라이언트',
    recording: (n: number) => `녹화 중 · 태그 ${n}개`,
    paused: '일시 정지',
    off: '꺼짐',
    states: {running: '실행 중', stopped: '정지됨', error: '오류'},
  },
  en: {
    meta: '4 devices',
    create: 'Create',
    summary: [
      ['Running', '2', 'of 4'],
      ['Attention', '1', 'Error 1'],
      ['Tags', '79', 'across 4 devices'],
      ['Collecting', '1', 'Recording into Collectors'],
    ],
    search: 'Search names, slugs, agents and addresses',
    types: ['All', 'Server', 'Client'],
    cols: ['Name', 'Type', 'Address', 'Polling', 'Tags', 'Collect', 'State'],
    server: 'Server',
    client: 'Client',
    recording: (n: number) => `Recording · ${n} tags`,
    paused: 'Paused',
    off: 'Off',
    states: {running: 'Running', stopped: 'Stopped', error: 'Error'},
  },
} as const;

type Device = {
  name: string;
  sub: string;
  type: 'server' | 'client';
  endpoint: string;
  agent: string;
  polling: string;
  tags: number;
  collect: 'recording' | 'paused' | 'off';
  collectTags?: number;
  state: 'running' | 'stopped' | 'error';
};

const DEVICES: Device[] = [
  {
    name: 'Line 1 sim',
    sub: 'line-1 · Packaging line 1 — test bench',
    type: 'server',
    endpoint: '0.0.0.0:5020',
    agent: 'edge-01',
    polling: '—',
    tags: 24,
    collect: 'recording',
    collectTags: 6,
    state: 'running',
  },
  {
    name: 'Mixer bench',
    sub: 'mixer-bench',
    type: 'server',
    endpoint: '0.0.0.0:5021',
    agent: 'edge-01',
    polling: '—',
    tags: 8,
    collect: 'off',
    state: 'stopped',
  },
  {
    name: 'PLC 3 (press)',
    sub: 'plc-3 · Hydraulic press controller',
    type: 'client',
    endpoint: '10.0.12.31:502',
    agent: 'plant-gw',
    polling: '250 ms',
    tags: 41,
    collect: 'paused',
    state: 'running',
  },
  {
    name: 'Chiller',
    sub: 'chiller',
    type: 'client',
    endpoint: 'chiller.local:502',
    agent: 'plant-gw',
    polling: '500 ms',
    tags: 6,
    collect: 'off',
    state: 'error',
  },
];

const STATE_PILL = {
  running: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  stopped: 'bg-muted text-muted-foreground',
  error: 'bg-destructive/10 text-destructive',
};
const STATE_DOT = {
  running: 'bg-emerald-500',
  stopped: 'bg-zinc-400',
  error: 'bg-destructive',
};

export function MockModbusDevices() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="modbus"
      title="ModbusTCP"
      meta={<span className="text-[10px] text-muted-foreground">{c.meta}</span>}
      actions={
        <MockButton icon={Plus} variant="default">
          {c.create}
        </MockButton>
      }
    >
      <dl className="mb-3 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border @2xl:grid-cols-4">
        {c.summary.map(([label, value, hint], i) => (
          <div key={label} className="bg-card px-3 py-2">
            <dt className="text-[9.5px] text-muted-foreground">{label}</dt>
            <dd
              className={cn(
                'text-lg leading-tight font-semibold tabular-nums',
                i === 0 && 'text-emerald-700 dark:text-emerald-400',
                i === 1 && 'text-amber-700 dark:text-amber-400',
              )}
            >
              {value}
            </dd>
            <dd className="truncate text-[9px] text-muted-foreground">{hint}</dd>
          </div>
        ))}
      </dl>

      <div className="mb-2.5 flex items-center gap-2">
        <span className="flex h-6 w-48 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px] text-muted-foreground">
          <Search className="size-3 shrink-0" />
          <span className="truncate">{c.search}</span>
        </span>
        <span className="flex gap-0.5 rounded-md bg-muted p-[3px]">
          {c.types.map((type, i) => (
            <span
              key={type}
              className={cn(
                'rounded-[4px] px-1.5 py-0.5 text-[9.5px] font-medium',
                i === 0 ? 'bg-background shadow-sm' : 'text-muted-foreground',
              )}
            >
              {type}
            </span>
          ))}
        </span>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-card">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="bg-muted/50 text-left text-[9.5px] text-muted-foreground">
              <th className="px-2.5 py-1.5 font-medium">{c.cols[0]}</th>
              <th className="hidden px-2 py-1.5 font-medium @xl:table-cell">
                {c.cols[1]}
              </th>
              <th className="px-2 py-1.5 font-medium">{c.cols[2]}</th>
              <th className="hidden px-2 py-1.5 font-medium @3xl:table-cell">
                {c.cols[3]}
              </th>
              <th className="hidden px-2 py-1.5 text-right font-medium @2xl:table-cell">
                {c.cols[4]}
              </th>
              <th className="hidden px-2 py-1.5 font-medium @2xl:table-cell">
                {c.cols[5]}
              </th>
              <th className="px-2 py-1.5 font-medium">{c.cols[6]}</th>
              <th className="hidden w-16 px-2 py-1.5 @3xl:table-cell" />
            </tr>
          </thead>
          <tbody>
            {DEVICES.map(device => {
              const TypeIcon = device.type === 'server' ? Server : Cable;
              return (
                <tr key={device.name} className="border-t border-border">
                  <td className="px-2.5 py-1.5">
                    <span className="block font-medium">{device.name}</span>
                    <span className="block truncate text-[9px] text-muted-foreground">
                      {device.sub}
                    </span>
                  </td>
                  <td className="hidden px-2 py-1.5 @xl:table-cell">
                    <span className="inline-flex items-center gap-1">
                      <TypeIcon className="size-3 text-muted-foreground" />
                      {device.type === 'server' ? c.server : c.client}
                    </span>
                  </td>
                  <td className="px-2 py-1.5">
                    <span className="block font-mono text-[9.5px]">
                      {device.endpoint}
                    </span>
                    <span className="block text-[9px] text-muted-foreground">
                      {device.agent}
                    </span>
                  </td>
                  <td className="hidden px-2 py-1.5 font-mono text-[9.5px] text-muted-foreground @3xl:table-cell">
                    {device.polling}
                  </td>
                  <td className="hidden px-2 py-1.5 text-right tabular-nums @2xl:table-cell">
                    {device.tags}
                  </td>
                  <td className="hidden px-2 py-1.5 text-[9.5px] @2xl:table-cell">
                    {device.collect === 'recording' ? (
                      <span className="text-emerald-700 dark:text-emerald-400">
                        {c.recording(device.collectTags ?? 0)}
                      </span>
                    ) : device.collect === 'paused' ? (
                      <span className="text-amber-700 dark:text-amber-400">
                        {c.paused}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">{c.off}</span>
                    )}
                  </td>
                  <td className="px-2 py-1.5">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[9px] font-medium whitespace-nowrap',
                        STATE_PILL[device.state],
                      )}
                    >
                      <span
                        className={cn('size-1.5 rounded-full', STATE_DOT[device.state])}
                      />
                      {c.states[device.state]}
                    </span>
                  </td>
                  <td className="hidden px-2 py-1.5 @3xl:table-cell">
                    <span className="flex gap-1.5">
                      {device.state === 'running' ? (
                        <Square className="size-3 text-amber-600" />
                      ) : (
                        <Play className="size-3 text-emerald-600" />
                      )}
                      <Settings className="size-3 text-sky-600" />
                      <Trash2 className="size-3 text-red-600" />
                    </span>
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
