import {
  ChevronDown,
  Database,
  FileSpreadsheet,
  Grid3x3,
  History,
  LayoutGrid,
  Pause,
  Pencil,
  Plus,
  Search,
  Server,
  Settings,
  Square,
  Table2,
  Tags,
  Trash2,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * ModbusTCP › device › 태그 (`/proj/:id/modbustcp/:deviceId`, table view) for
 * a server device: the six-cell status strip, the tags toolbar (area segment,
 * address notation, CSV, view switch) and the tag table with live values —
 * switches for bit tags, inputs for writable numbers, a generator badge for
 * generated values. Tags follow the device story (`_stories/tags.ts`).
 */
const COPY = {
  ko: {
    device: 'Line 1 sim',
    running: '실행 중',
    role: '서버',
    stop: '정지',
    tabs: ['태그', '히스토리', '수집', '설정'],
    strip: [
      ['주소', '0.0.0.0:5020'],
      ['에이전트', 'edge-01'],
      ['지금 상태', '대기 중'],
      ['연결 클라이언트', '2'],
      ['요청/s', '18.4'],
      ['갱신 주기', '500 ms'],
    ],
    search: '이름 · 단위 · 그룹 · 설명 검색',
    areas: ['전체', '홀딩', '입력', '코일', '이산'],
    pause: '일시 정지',
    notation: ['주소 0 기반', '4xxxx'],
    cols: ['이름', '영역 · 주소', '자료형', '값', '단위', '접근', '갱신'],
    collect: '수집',
    generator: '생성기',
    addTag: '태그 추가',
    footer: '응답하는 주소 9개 · 태그 6개',
    holding: '홀딩',
    input: '입력',
    coil: '코일',
  },
  en: {
    device: 'Line 1 sim',
    running: 'Running',
    role: 'Server',
    stop: 'Stop',
    tabs: ['Tags', 'History', 'Collect', 'Settings'],
    strip: [
      ['Address', '0.0.0.0:5020'],
      ['Agent', 'edge-01'],
      ['Now', 'Listening'],
      ['Connected clients', '2'],
      ['Requests/s', '18.4'],
      ['Update interval', '500 ms'],
    ],
    search: 'Search names, units, groups and descriptions',
    areas: ['All', 'Holding', 'Input', 'Coil', 'Discrete'],
    pause: 'Pause',
    notation: ['Zero-based', '4xxxx'],
    cols: ['Name', 'Area · address', 'Type', 'Value', 'Unit', 'Access', 'Updated'],
    collect: 'Collect',
    generator: 'Generator',
    addTag: 'Add tag',
    footer: '9 addresses answering · 6 tags',
    holding: 'Holding',
    input: 'Input',
    coil: 'Coil',
  },
} as const;

type Area = 'holding' | 'input' | 'coil';

type Tag = {
  name: string;
  group: string;
  area: Area;
  addr: string;
  dtype: string;
  value: string | boolean;
  unit: string;
  access: 'R' | 'RW';
  collect?: boolean;
  generated?: boolean;
  time: string;
};

const TAGS: Tag[] = [
  {
    name: 'Tank temp',
    group: 'Tank A',
    area: 'holding',
    addr: '0–1',
    dtype: 'f32 · BE',
    value: '72.4',
    unit: '°C',
    access: 'RW',
    collect: true,
    time: '10:42:07',
  },
  {
    name: 'Tank pressure',
    group: 'Tank A',
    area: 'holding',
    addr: '4–5',
    dtype: 'f32 · BE',
    value: '3.18',
    unit: 'bar',
    access: 'RW',
    collect: true,
    time: '10:42:07',
  },
  {
    name: 'Pump speed',
    group: 'Pump',
    area: 'holding',
    addr: '2',
    dtype: 'u16',
    value: '1450',
    unit: 'rpm',
    access: 'RW',
    time: '10:42:06',
  },
  {
    name: 'Pressure',
    group: 'Pump',
    area: 'input',
    addr: '0',
    dtype: 'i16 · ×0.1',
    value: '3.2',
    unit: 'bar',
    access: 'R',
    generated: true,
    collect: true,
    time: '10:42:07',
  },
  {
    name: 'Ram position',
    group: 'Press',
    area: 'input',
    addr: '1–2',
    dtype: 'f32 · BE',
    value: '128.6',
    unit: 'mm',
    access: 'R',
    generated: true,
    time: '10:42:07',
  },
  {
    name: 'Pump run',
    group: 'Pump',
    area: 'coil',
    addr: '0',
    dtype: 'bit',
    value: true,
    unit: '',
    access: 'RW',
    time: '10:41:55',
  },
];

function Switch({on}: {on: boolean}) {
  return (
    <span
      className={cn(
        'inline-flex h-3.5 w-6 shrink-0 items-center rounded-full p-px',
        on ? 'justify-end bg-primary' : 'justify-start bg-input',
      )}
    >
      <span className="size-3 rounded-full bg-background shadow" />
    </span>
  );
}

export function MockModbusTags() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const areaLabel = {holding: c.holding, input: c.input, coil: c.coil};

  return (
    <MockAppFrame
      activeNav="modbus"
      crumbs={[{icon: Server, label: c.device}]}
      title={c.device}
      titleIcon={Server}
      meta={
        <>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-px text-[9.5px] font-medium text-emerald-700 dark:text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {c.running}
          </span>
          <span className="text-[10px] text-muted-foreground">{c.role}</span>
        </>
      }
      actions={<MockButton icon={Square}>{c.stop}</MockButton>}
      tabs={[
        {icon: Tags, label: c.tabs[0], active: true},
        {icon: History, label: c.tabs[1]},
        {icon: Database, label: c.tabs[2]},
        {icon: Settings, label: c.tabs[3]},
      ]}
    >
      {/* status strip */}
      <dl className="mb-3 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border @3xl:grid-cols-6">
        {c.strip.map(([label, value], i) => (
          <div key={label} className="bg-card px-2.5 py-2">
            <dt className="text-[9px] text-muted-foreground">{label}</dt>
            <dd
              className={cn(
                'mt-0.5 truncate text-[11px] font-semibold tabular-nums',
                i === 0 && 'font-mono font-medium',
                i === 2 && 'text-emerald-700 dark:text-emerald-400',
              )}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {/* toolbar */}
      <div className="mb-2.5 flex flex-wrap items-center gap-2">
        <span className="flex h-6 w-40 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px] text-muted-foreground">
          <Search className="size-3 shrink-0" />
          <span className="truncate">{c.search}</span>
        </span>
        <span className="flex gap-0.5 rounded-md bg-muted p-[3px]">
          {c.areas.map((area, i) => (
            <span
              key={area}
              className={cn(
                'rounded-[4px] px-1.5 py-0.5 text-[9.5px] font-medium',
                i === 0 ? 'bg-background shadow-sm' : 'text-muted-foreground',
                i >= 3 && 'hidden @2xl:inline',
              )}
            >
              {area}
            </span>
          ))}
        </span>
        <MockButton icon={Pause} className="hidden @3xl:inline-flex">
          {c.pause}
        </MockButton>
        <span className="ml-auto hidden overflow-hidden rounded-md border border-border text-[9.5px] @2xl:flex">
          <span className="bg-accent px-1.5 py-0.5 font-medium">{c.notation[0]}</span>
          <span className="px-1.5 py-0.5 font-mono text-muted-foreground">
            {c.notation[1]}
          </span>
        </span>
        <MockButton icon={FileSpreadsheet} className="hidden @xl:inline-flex">
          CSV
          <ChevronDown className="size-2.5" />
        </MockButton>
        <span className="flex overflow-hidden rounded-md border border-border">
          <span className="flex size-6 items-center justify-center bg-accent">
            <Table2 className="size-3" />
          </span>
          <span className="flex size-6 items-center justify-center text-muted-foreground">
            <Grid3x3 className="size-3" />
          </span>
          <span className="flex size-6 items-center justify-center text-muted-foreground">
            <LayoutGrid className="size-3" />
          </span>
        </span>
      </div>

      {/* tag table */}
      <div className="overflow-hidden rounded-md border border-border bg-card">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="bg-muted/50 text-left text-[9.5px] text-muted-foreground">
              <th className="px-2.5 py-1.5 font-medium">{c.cols[0]}</th>
              <th className="px-2 py-1.5 font-medium">{c.cols[1]}</th>
              <th className="hidden px-2 py-1.5 font-medium @xl:table-cell">
                {c.cols[2]}
              </th>
              <th className="px-2 py-1.5 text-right font-medium">{c.cols[3]}</th>
              <th className="px-2 py-1.5 font-medium">{c.cols[4]}</th>
              <th className="hidden px-2 py-1.5 font-medium @2xl:table-cell">
                {c.cols[5]}
              </th>
              <th className="hidden px-2 py-1.5 font-medium @3xl:table-cell">
                {c.cols[6]}
              </th>
              <th className="hidden w-12 px-2 py-1.5 @3xl:table-cell" />
            </tr>
          </thead>
          <tbody>
            {TAGS.map(tag => (
              <tr key={tag.name} className="border-t border-border">
                <td className="px-2.5 py-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="font-medium">{tag.name}</span>
                    {tag.collect && (
                      <span className="rounded border border-border px-1 text-[8.5px] text-muted-foreground">
                        {c.collect}
                      </span>
                    )}
                  </span>
                  <span className="block text-[9px] text-muted-foreground">
                    {tag.group}
                  </span>
                </td>
                <td className="px-2 py-1.5 whitespace-nowrap tabular-nums">
                  {areaLabel[tag.area]} {tag.addr}
                </td>
                <td className="hidden px-2 py-1.5 font-mono text-[9.5px] text-muted-foreground @xl:table-cell">
                  {tag.dtype}
                </td>
                <td className="px-2 py-1.5 text-right">
                  {typeof tag.value === 'boolean' ? (
                    <span className="flex justify-end">
                      <Switch on={tag.value} />
                    </span>
                  ) : tag.generated ? (
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <span className="rounded bg-secondary px-1 text-[8.5px] text-muted-foreground">
                        {c.generator}
                      </span>
                      {tag.value}
                    </span>
                  ) : (
                    <span className="inline-block w-16 rounded-md border border-input bg-background px-1.5 py-px text-right font-mono tabular-nums">
                      {tag.value}
                    </span>
                  )}
                </td>
                <td className="px-2 py-1.5 text-muted-foreground">{tag.unit}</td>
                <td className="hidden px-2 py-1.5 font-mono text-muted-foreground @2xl:table-cell">
                  {tag.access}
                </td>
                <td className="hidden px-2 py-1.5 font-mono text-[9px] text-muted-foreground @3xl:table-cell">
                  {tag.time}
                </td>
                <td className="hidden px-2 py-1.5 @3xl:table-cell">
                  <span className="flex gap-1.5 text-muted-foreground">
                    <Pencil className="size-3" />
                    <Trash2 className="size-3" />
                  </span>
                </td>
              </tr>
            ))}
            <tr className="border-t border-border">
              <td colSpan={8} className="px-2.5 py-1.5 text-muted-foreground">
                <span className="inline-flex items-center gap-1 text-[9.5px]">
                  <Plus className="size-3" />
                  {c.addTag}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[9px] text-muted-foreground">{c.footer}</p>
    </MockAppFrame>
  );
}
