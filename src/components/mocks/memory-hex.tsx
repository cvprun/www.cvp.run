import {
  Binary,
  ChevronLeft,
  ChevronRight,
  Eraser,
  Layers,
  Settings,
  Table2,
  TagIcon,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {MockBadge} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Memory map detail, hex tab (`/proj/:id/memory/:mapId`, `_MemoryHexTab`):
 * page nav + range + selection status | go-to + selection actions, region
 * chips for the visible page, the paged `HexEditor` (offset · 16 bytes ·
 * ASCII) and the `HexInspector` beside it.
 */

const COPY = {
  ko: {
    tabs: ['헥스', '타입 배열', '리전', '설정'],
    selected: '선택 0010–001F (16 B)',
    gotoPlaceholder: '주소(hex)',
    goto: '이동',
    toRegion: '선택을 리전으로',
    zero: '선택 0으로',
    inspector: '인스펙터',
    selection: '선택',
    size: '크기',
    littleEndian: '리틀 엔디언',
  },
  en: {
    tabs: ['Hex', 'Typed array', 'Regions', 'Settings'],
    selected: 'Selected 0010–001F (16 B)',
    gotoPlaceholder: 'Address (hex)',
    goto: 'Go to',
    toRegion: 'Make region',
    zero: 'Zero selection',
    inspector: 'Inspector',
    selection: 'Selection',
    size: 'Size',
    littleEndian: 'Little Endian',
  },
} as const;

/** Regions defined on this map (name, start, length, tint). */
const REGIONS = [
  {name: 'holding', start: 0x00, length: 16, tint: 'bg-sky-500/12'},
  {name: 'temps_f32', start: 0x10, length: 16, tint: 'bg-violet-500/12'},
  {name: 'line_id', start: 0x20, length: 16, tint: 'bg-amber-500/14'},
  {name: 'coils', start: 0x30, length: 8, tint: 'bg-emerald-500/14'},
  {name: 'input', start: 0x40, length: 32, tint: 'bg-rose-500/10'},
];

/** Plausible PLC image: u16 BE setpoints, floats, an ASCII tag, coils, counters. */
function buildBytes(): number[] {
  const out = new Array<number>(256).fill(0);
  const put = (at: number, hex: string) => {
    hex
      .replace(/\s+/g, '')
      .match(/../g)!
      .forEach((h, i) => (out[at + i] = Number.parseInt(h, 16)));
  };
  put(0x00, '0064 01F4 0000 0BB8 0001 0000 04D2 000A');
  put(0x10, '42C86666 41A40000 3F800000 00000000');
  Array.from('PLANT-A LINE01').forEach((ch, i) => (out[0x20 + i] = ch.charCodeAt(0)));
  put(0x30, 'FF00 0100 0100 0000');
  put(0x40, '0000 0137 0000 0E2C 00FA 0003 0000 0000');
  put(0x50, '0012 7F40 0001 86A0 0000 0000 0000 0000');
  put(0x60, '44 7A 00 00 43 48 00 00');
  put(0x80, 'CAFE 0002 0001 0000');
  put(0xa0, '5345 4E53 4F52 2D30 3100');
  return out;
}

const BYTES = buildBytes();
const ROWS = 16;
const SEL_START = 0x10;
const SEL_END = 0x1f;

const hex2 = (n: number) => n.toString(16).toUpperCase().padStart(2, '0');
const ascii = (n: number) => (n >= 0x20 && n < 0x7f ? String.fromCharCode(n) : '.');
const tintAt = (offset: number) =>
  REGIONS.find(r => offset >= r.start && offset < r.start + r.length)?.tint;

function HexGrid() {
  return (
    <div className="w-fit max-w-full overflow-hidden rounded-md border border-border bg-background p-2 font-mono text-[10px] leading-[18px]">
      {/* header */}
      <div className="flex border-b border-border/60 pb-0.5 whitespace-pre text-muted-foreground/70">
        <span className="mr-2.5 w-[4ch] shrink-0" />
        <span className="shrink-0">
          {Array.from({length: 16}, (_, col) => (
            <span key={col}>
              {col === 0 ? '' : col % 8 === 0 ? '  ' : ' '}
              {hex2(col)}
            </span>
          ))}
        </span>
        <span className="ml-3 hidden shrink-0 @2xl:inline">ASCII</span>
      </div>
      {Array.from({length: ROWS}, (_, row) => {
        const rowStart = row * 16;
        return (
          <div key={row} className="flex whitespace-pre">
            <span className="mr-2.5 shrink-0 text-muted-foreground">
              {rowStart.toString(16).toUpperCase().padStart(4, '0')}
            </span>
            <span className="shrink-0">
              {Array.from({length: 16}, (_, col) => {
                const o = rowStart + col;
                const selected = o >= SEL_START && o <= SEL_END;
                const value = BYTES[o];
                return (
                  <span key={col}>
                    {col === 0 ? '' : col % 8 === 0 ? '  ' : ' '}
                    <span
                      className={cn(
                        'rounded-sm',
                        !selected && tintAt(o),
                        !selected && value === 0 && 'text-muted-foreground/60',
                        selected && 'bg-primary text-primary-foreground',
                      )}
                    >
                      {hex2(value)}
                    </span>
                  </span>
                );
              })}
            </span>
            <span className="ml-3 hidden shrink-0 text-muted-foreground @2xl:inline">
              {Array.from({length: 16}, (_, col) => {
                const o = rowStart + col;
                const selected = o >= SEL_START && o <= SEL_END;
                return (
                  <span
                    key={col}
                    className={cn(
                      'rounded-sm',
                      selected && 'bg-primary text-primary-foreground',
                    )}
                  >
                    {ascii(BYTES[o])}
                  </span>
                );
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Field({label, value}: {label: string; value: string}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-px">
      <span className="text-muted-foreground">{label}</span>
      <span className="truncate text-right text-foreground">{value}</span>
    </div>
  );
}

function Inspector({c}: {c: (typeof COPY)['ko' | 'en']}) {
  const rows: [string, string][] = [
    ['Binary', '01000010'],
    ['Int8', '66'],
    ['Uint8', '66'],
    ['Int16', '17096'],
    ['Uint16', '17096'],
    ['Int32', '1120429670'],
    ['Uint32', '1120429670'],
    ['Float16', '3.390625'],
    ['Float32', '100.2'],
    ['Float64', '5.3656e+13'],
  ];
  return (
    <div className="hidden min-w-0 flex-1 rounded-md border border-border bg-muted/20 p-2.5 font-mono text-[10px] @4xl:block">
      <div className="mb-1.5 font-sans text-[11px] font-semibold">{c.inspector}</div>
      <Field label={c.selection} value="0x10 - 0x1F" />
      <Field label={c.size} value="16 (0x10, 128 bits)" />
      <div className="my-1.5 border-t border-border/60" />
      {rows.map(([label, value]) => (
        <Field key={label} label={label} value={value} />
      ))}
      <div className="my-1.5 border-t border-border/60" />
      <span className="flex items-center gap-1.5 font-sans text-muted-foreground">
        <span className="size-3 rounded-[3px] border border-primary" />
        {c.littleEndian}
      </span>
    </div>
  );
}

export function MockMemoryHex() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="memory"
      crumbs={[{label: 'plant-a'}]}
      title="plant-a"
      meta={
        <>
          <MockBadge tone="outline" className="tabular-nums">
            64 KB
          </MockBadge>
          <MockBadge tone="outline" className="tabular-nums">
            v1284
          </MockBadge>
        </>
      }
      tabs={[
        {icon: Binary, label: c.tabs[0], active: true},
        {icon: Table2, label: c.tabs[1]},
        {icon: Layers, label: c.tabs[2]},
        {icon: Settings, label: c.tabs[3]},
      ]}
    >
      <div className="flex flex-col gap-2.5">
        {/* toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground tabular-nums">
          <MockButton className="px-1.5">
            <ChevronLeft className="size-3" />
          </MockButton>
          <MockButton className="px-1.5">
            <ChevronRight className="size-3" />
          </MockButton>
          <span>1 / 128</span>
          <span>0000 – 01FF</span>
          <span className="font-medium text-foreground">{c.selected}</span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="hidden h-6 w-24 items-center rounded-md border border-input px-2 font-mono text-[10px] text-muted-foreground/70 @2xl:flex">
              {c.gotoPlaceholder}
            </span>
            <MockButton className="hidden @2xl:inline-flex">{c.goto}</MockButton>
            <MockButton icon={TagIcon}>{c.toRegion}</MockButton>
            <MockButton icon={Eraser}>{c.zero}</MockButton>
          </span>
        </div>

        {/* region chips */}
        <div className="flex flex-wrap items-center gap-1">
          {REGIONS.map(r => (
            <span
              key={r.name}
              className={cn(
                'rounded-md border border-border px-1.5 py-px font-mono text-[9.5px]',
                r.tint,
              )}
            >
              {r.name} @ {r.start.toString(16).toUpperCase().padStart(4, '0')}
            </span>
          ))}
        </div>

        <div className="flex items-start gap-3">
          <HexGrid />
          <Inspector c={c} />
        </div>
      </div>
    </MockAppFrame>
  );
}
