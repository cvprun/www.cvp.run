import {
  Activity,
  BetweenHorizontalStart,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Flag,
  Layers,
  MousePointer2,
  Redo2,
  Rows3,
  Save,
  Sparkles,
  Table2,
  Trash2,
  Undo2,
  ZoomIn,
} from 'lucide-react';
import type {ReactNode} from 'react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {seededRandom} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Time-series labeling editor (`_TimeSeriesAnnotatePage` in stacked view):
 * `TimeSeriesToolbar` → `TimeSeriesChannelPanel` | `TimeSeriesStack` +
 * `TimeSeriesTrackLanes` + `TimeSeriesOverview` | `TimeSeriesLabelPanel`.
 * One press line, 1-minute sensor data; the view shows 12 of 168 hours.
 */

const COPY = {
  ko: {
    dataset: '프레스 라인 센서',
    unsaved: '저장되지 않은 변경 사항',
    save: '저장',
    normalize: '채널별 정규화',
    view: {overlay: '겹침', stack: '스택', table: '표'},
    mode: {ranges: '구간', windows: '윈도우'},
    channels: '채널',
    pastOnly: '과거만 앎',
    facts: [
      ['간격', '1m'],
      ['행', '10,080'],
      ['기간', '168h'],
      ['결측', '0.2%'],
    ],
    rulerHint: '여기를 끌면: 전체 채널',
    classes: '클래스',
    selection: '선택한 라벨',
    start: '시작',
    end: '끝',
    duration: '길이',
    appliesTo: '적용 채널',
    deleteLabel: '라벨 삭제',
    labels: '라벨',
    filters: ['전체', '전체 채널', '채널 한정', '이벤트'],
    scopeAll: '전체 채널',
    suggestions: 'AI 제안',
    accept: '수락',
    dismiss: '무시',
    lane: 'AI',
    classNames: ['이상', '정지', '정비', '정상'],
  },
  en: {
    dataset: 'Press line sensors',
    unsaved: 'Unsaved changes',
    save: 'Save',
    normalize: 'Normalize per channel',
    view: {overlay: 'Overlaid', stack: 'Stacked', table: 'Table'},
    mode: {ranges: 'Ranges', windows: 'Windows'},
    channels: 'Channels',
    pastOnly: 'past only',
    facts: [
      ['Interval', '1m'],
      ['Rows', '10,080'],
      ['Span', '168h'],
      ['Missing', '0.2%'],
    ],
    rulerHint: 'Drag here: all channels',
    classes: 'Classes',
    selection: 'Selected label',
    start: 'Start',
    end: 'End',
    duration: 'Length',
    appliesTo: 'Applies to channels',
    deleteLabel: 'Delete label',
    labels: 'Labels',
    filters: ['All', 'All channels', 'Channel only', 'Events'],
    scopeAll: 'all channels',
    suggestions: 'AI suggestions',
    accept: 'Accept',
    dismiss: 'Dismiss',
    lane: 'AI',
    classNames: ['anomaly', 'downtime', 'maintenance', 'normal'],
  },
} as const;

/** anomaly / downtime / maintenance / normal. */
const CLASS_COLORS = ['#f97316', '#64748b', '#a855f7', '#22c55e'];
const CLASS_COUNTS = [6, 3, 2, 9];

/** `TS_STACK_HEADER_W` (148) and the plot's y-axis (52), scaled. */
const HEADER_W = 118;
const AXIS_W = 34;
const PLOT_LEFT = HEADER_W + AXIS_W;

/** Visible range: 2026-09-18 06:00 – 18:00, sampled every 2 minutes. */
const VIEW_FROM_H = 6;
const VIEW_SPAN_H = 12;
const N = 361;
const CURSOR_H = 7.7; // 13:42

type Label = {
  cls: number;
  /** Hours since 06:00 of the visible day. */
  from: number;
  to: number;
  channels?: string[];
  selected?: boolean;
};

const LABELS: Label[] = [
  {cls: 2, from: 1.5, to: 1.5},
  {cls: 1, from: 3.667, to: 4.417},
  {
    cls: 0,
    from: 7.083,
    to: 8.333,
    channels: ['vib_rms', 'motor_current'],
    selected: true,
  },
  {cls: 3, from: 9, to: 11.5},
];
const SUGGESTION = {from: 10.167, to: 10.917, channel: 'vib_rms', score: 0.87};

const pct = (h: number) => `${(h / VIEW_SPAN_H) * 100}%`;

function clock(h: number): string {
  const total = Math.round((VIEW_FROM_H + h) * 60);
  const hh = String(Math.floor(total / 60)).padStart(2, '0');
  const mm = String(total % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}
const stamp = (h: number) => `2026-09-18 ${clock(h)}`;

/** 0 outside [a, b], 1 inside, with a linear ramp of `r` hours. */
function inWindow(h: number, a: number, b: number, r = 0.08): number {
  return Math.max(0, Math.min(1, (h - a) / r, (b - h) / r));
}

type Channel = {
  name: string;
  unit: string;
  color: string;
  past?: boolean;
  values: number[];
};

function makeChannel(
  name: string,
  unit: string,
  color: string,
  seed: number,
  f: (h: number, noise: number) => number,
  past = false,
): Channel {
  const rand = seededRandom(seed);
  const values = Array.from({length: N}, (_, i) =>
    f((i / (N - 1)) * VIEW_SPAN_H, rand() - 0.5),
  );
  return {name, unit, color, past, values};
}

const down = (h: number) => inWindow(h, 3.667, 4.417);
const anomaly = (h: number) => inWindow(h, 7.083, 8.333, 0.15);

const CHANNELS: Channel[] = [
  makeChannel('vib_rms', 'mm/s', '#0070f3', 11, (h, n) => {
    const base = 2.1 + 0.25 * Math.sin(h * 2.1) + n * 0.36;
    const a = anomaly(h) * (2.4 + 1.6 * Math.sin(h * 9) ** 2 + n * 1.4);
    const bump = inWindow(h, 10.167, 10.917, 0.12) * (1.1 + n * 0.5);
    return base + a + bump - down(h) * (base - 0.15 - n * 0.06);
  }),
  makeChannel('motor_current', 'A', '#0f9d8a', 23, (h, n) => {
    const base = 38 + 1.2 * Math.sin(h * 1.3) + n * 1.8;
    return base + anomaly(h) * (5 + n * 5) - down(h) * (base - 0.6);
  }),
  makeChannel(
    'temp_c',
    '°C',
    '#d97706',
    37,
    (h, n) =>
      57.5 +
      2.4 * Math.sin(((h - 2) / 12) * Math.PI) +
      n * 0.3 -
      down(h) * 1.8 +
      anomaly(h) * 2.2,
    true,
  ),
  makeChannel('pressure', 'bar', '#7928ca', 41, (h, n) => {
    const base = 182 + 3 * Math.sin(h * 6) + n * 3.2;
    return base - down(h) * (base - 12);
  }),
];

function niceScale(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.08 || 1;
  const lo = min - pad;
  const hi = max + pad;
  const raw = (hi - lo) / 3;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = ([1, 2, 2.5, 5, 10].find(s => s * mag >= raw) ?? 10) * mag;
  const ticks: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) ticks.push(v);
  return {lo, hi, min, max, ticks, step};
}

const fmt = (v: number) => (Math.abs(v) >= 100 ? v.toFixed(0) : v.toFixed(1));

function linePath(values: number[], lo: number, hi: number, h = 100): string {
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 1000;
      const y = (1 - (v - lo) / (hi - lo)) * h;
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join('');
}

/** Label bands / event markers / suggestion outline in one plot row. */
function Bands({channel, ruler = false}: {channel?: string; ruler?: boolean}) {
  return (
    <>
      {LABELS.filter(l => !ruler || !l.channels).map((l, i) => {
        const color = CLASS_COLORS[l.cls];
        const foreign = !!channel && !!l.channels && !l.channels.includes(channel);
        if (l.from === l.to) {
          return (
            <span
              key={i}
              className="absolute inset-y-0"
              style={{left: pct(l.from), opacity: foreign ? 0.25 : 1}}
            >
              <span
                className="absolute inset-y-0 left-0 border-l border-dashed"
                style={{borderColor: color}}
              />
              <svg width="7" height="8" className="absolute top-0.5 left-0">
                <path d="M0 0 L7 3.5 L0 7 Z" fill={color} />
              </svg>
            </span>
          );
        }
        return (
          <span
            key={i}
            className="absolute inset-y-0"
            style={{
              left: pct(l.from),
              width: pct(l.to - l.from),
              opacity: foreign ? 0.25 : 1,
            }}
          >
            <span
              className="absolute inset-0 opacity-[0.12]"
              style={{background: color}}
            />
            <span
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{background: color}}
            />
            {l.selected && (
              <>
                <span
                  className="absolute inset-0 border-[1.5px]"
                  style={{borderColor: color}}
                />
                {[0, 1].map(side => (
                  <span
                    key={side}
                    className={cn(
                      'absolute top-1/2 h-4 w-[5px] -translate-y-1/2 rounded-sm border-[1.5px] bg-white',
                      side ? '-right-[3px]' : '-left-[3px]',
                    )}
                    style={{borderColor: color}}
                  />
                ))}
              </>
            )}
          </span>
        );
      })}
      {channel === SUGGESTION.channel && (
        <span
          className="absolute inset-y-px border border-dashed"
          style={{
            left: pct(SUGGESTION.from),
            width: pct(SUGGESTION.to - SUGGESTION.from),
            borderColor: '#e5484d',
          }}
        />
      )}
    </>
  );
}

function Cursor({label}: {label?: string}) {
  return (
    <>
      <span
        className="absolute inset-y-0 w-px bg-foreground/70"
        style={{left: pct(CURSOR_H)}}
      />
      {label && (
        <span
          className="absolute top-1 rounded bg-foreground px-1 py-px font-mono text-[9px] whitespace-nowrap text-background"
          style={{left: `calc(${pct(CURSOR_H)} + 5px)`}}
        >
          {label}
        </span>
      )}
    </>
  );
}

const X_TICKS = [0, 2, 4, 6, 8, 10];

function StackRow({channel, first}: {channel: Channel; first: boolean}) {
  const s = niceScale(channel.values);
  const y = (v: number) => `${(1 - (v - s.lo) / (s.hi - s.lo)) * 100}%`;
  return (
    <div className="flex h-[76px] border-b border-border">
      <div
        className="flex shrink-0 flex-col gap-px border-r border-border px-2 py-1.5"
        style={{width: HEADER_W}}
      >
        <span className="flex items-center gap-1.5">
          <span
            className="size-1.5 shrink-0 rounded-full"
            style={{background: channel.color}}
          />
          <span className="min-w-0 flex-1 truncate font-mono text-[10px] font-medium">
            {channel.name}
          </span>
          <Eye className="size-3 shrink-0 text-muted-foreground" />
        </span>
        <span className="text-[9px] text-muted-foreground">{channel.unit}</span>
        <span className="font-mono text-[9px] text-muted-foreground">
          {fmt(s.min)} – {fmt(s.max)}
        </span>
      </div>
      {/* y axis */}
      <div className="relative shrink-0" style={{width: AXIS_W}}>
        {s.ticks.map(v => (
          <span
            key={v}
            className="absolute right-1 -translate-y-1/2 text-[8px] text-muted-foreground tabular-nums"
            style={{top: y(v)}}
          >
            {s.step < 1 ? v.toFixed(1) : v.toFixed(0)}
          </span>
        ))}
      </div>
      <div className="relative min-w-0 flex-1 overflow-hidden">
        {s.ticks.map(v => (
          <span
            key={v}
            className="absolute inset-x-0 h-px bg-border/60"
            style={{top: y(v)}}
          />
        ))}
        {X_TICKS.map(h => (
          <span
            key={h}
            className="absolute inset-y-0 w-px bg-border/60"
            style={{left: pct(h)}}
          />
        ))}
        <Bands channel={channel.name} />
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
        >
          <path
            d={linePath(channel.values, s.lo, s.hi)}
            fill="none"
            stroke={channel.color}
            strokeWidth={1.1}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <Cursor label={first ? stamp(CURSOR_H) : undefined} />
      </div>
    </div>
  );
}

/** Overview: whole 7-day series (30-min buckets) + label bands + brush. */
const OVERVIEW_BANDS: [number, number, number][] = [
  [2, 10, 3],
  [14.2, 15.1, 0],
  [20, 30, 3],
  [33.5, 34.2, 0],
  [40, 42.5, 1],
  [45, 56, 3],
  [79.5, 79.6, 2],
  [81.67, 82.42, 1],
  [85.08, 86.33, 0],
  [87, 89.5, 3],
  [92, 100, 3],
  [101, 102.3, 0],
  [105, 115, 3],
  [118, 119.2, 1],
  [126.4, 127, 0],
  [128, 140, 3],
  [135, 135.1, 2],
  [142, 149, 3],
  [150.2, 151, 0],
  [155, 165, 3],
];
const OVERVIEW_LINE = (() => {
  const rand = seededRandom(7);
  const values = Array.from({length: 337}, (_, i) => {
    const h = i / 2;
    const spike = OVERVIEW_BANDS.some(([a, b, c]) => c === 0 && h >= a && h <= b)
      ? 3
      : 0;
    const stop = OVERVIEW_BANDS.some(([a, b, c]) => c === 1 && h >= a && h <= b);
    return stop
      ? 0.2
      : 2.1 + 0.3 * Math.sin((h / 24) * Math.PI * 2) + (rand() - 0.5) * 0.5 + spike;
  });
  return linePath(values, -0.5, 6, 34);
})();
const BRUSH_FROM = 78 / 168;
const BRUSH_W = 12 / 168;

export function MockTimeseriesEditor() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const cursorIndex = Math.round((CURSOR_H / VIEW_SPAN_H) * (N - 1));
  const selected = LABELS[2];

  return (
    <MockAppFrame
      activeNav="datasets"
      fill
      crumbs={[{icon: Activity, label: c.dataset}, {label: 'press-01'}]}
    >
      <div className="flex h-full flex-col text-[11px]">
        {/* toolbar */}
        <div className="flex min-h-9 flex-wrap items-center gap-1.5 border-b border-border px-2.5 py-1">
          <span className="flex gap-0.5 rounded-md bg-muted p-0.5">
            {[MousePointer2, BetweenHorizontalStart, Flag, ZoomIn].map((Icon, i) => (
              <span
                key={i}
                className={cn(
                  'flex h-5 w-6 items-center justify-center rounded',
                  i === 0
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground',
                )}
              >
                <Icon className="size-3" />
              </span>
            ))}
          </span>
          <span className="flex gap-0.5 rounded-md bg-muted p-0.5">
            {(
              [
                [Layers, c.view.overlay],
                [Rows3, c.view.stack],
                [Table2, c.view.table],
              ] as const
            ).map(([Icon, label], i) => (
              <span
                key={label}
                className={cn(
                  'flex h-5 items-center gap-1 rounded px-1.5 text-[10px]',
                  i === 1
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground',
                )}
              >
                <Icon className="size-3" />
                <span className="hidden @4xl:inline">{label}</span>
              </span>
            ))}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground opacity-50">
            <span className="flex h-3.5 w-6 items-center justify-end rounded-full bg-primary p-px">
              <span className="size-3 rounded-full bg-background" />
            </span>
            <span className="hidden @3xl:inline">{c.normalize}</span>
          </span>
          <span className="flex gap-0.5 rounded-md bg-muted p-0.5">
            <span className="h-5 rounded bg-background px-2 text-[10px] leading-5 shadow-sm">
              {c.mode.ranges}
            </span>
            <span className="h-5 rounded px-2 text-[10px] leading-5 text-muted-foreground">
              {c.mode.windows}
            </span>
          </span>
          <span className="flex-1" />
          <span className="hidden font-mono text-[10px] text-muted-foreground @5xl:inline">
            {stamp(0)} – {stamp(12)}
          </span>
          <span className="hidden text-[10px] text-muted-foreground @2xl:inline">
            {c.unsaved}
          </span>
          <span className="flex items-center gap-0.5">
            <span className="flex size-6 items-center justify-center text-muted-foreground">
              <Undo2 className="size-3.5" />
            </span>
            <span className="flex size-6 items-center justify-center text-muted-foreground/40">
              <Redo2 className="size-3.5" />
            </span>
            <MockButton icon={Save} variant="default">
              {c.save}
            </MockButton>
          </span>
          <span className="flex items-center gap-1">
            <span className="flex size-6 items-center justify-center rounded-md border border-input">
              <ChevronLeft className="size-3.5" />
            </span>
            <span className="min-w-9 text-center text-[10px] text-muted-foreground tabular-nums">
              3 / 12
            </span>
            <span className="flex size-6 items-center justify-center rounded-md border border-input">
              <ChevronRight className="size-3.5" />
            </span>
          </span>
        </div>

        <div className="flex min-h-0 flex-1">
          {/* channels */}
          <aside className="relative hidden w-40 shrink-0 border-r border-border bg-card @3xl:block">
            <div className="absolute inset-0 flex flex-col gap-0.5 overflow-hidden p-1.5">
              <h4 className="px-1.5 pt-1 pb-0.5 text-[10px] font-semibold text-muted-foreground">
                {c.channels}
              </h4>
              {CHANNELS.map(ch => (
                <span
                  key={ch.name}
                  className="flex items-center gap-2 rounded-md px-1.5 py-1"
                >
                  <span
                    className="flex size-3 shrink-0 items-center justify-center rounded-[3px]"
                    style={{background: ch.color}}
                  >
                    <Check className="size-2 text-white" strokeWidth={3} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-mono text-[10px]">{ch.name}</span>
                    <span className="truncate text-[9px] text-muted-foreground">
                      {ch.past ? `${ch.unit} · ${c.pastOnly}` : ch.unit}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] tabular-nums">
                    {fmt(ch.values[cursorIndex])}
                  </span>
                </span>
              ))}
              <dl className="mx-1.5 mt-2 space-y-1 border-t border-border pt-2 text-[10px]">
                {c.facts.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-medium tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          {/* chart column */}
          <section className="flex min-w-0 flex-1 flex-col gap-1.5 p-1.5">
            <div className="overflow-hidden rounded-md border border-border bg-card">
              {/* ruler: drag here to label every channel */}
              <div className="flex h-[22px] border-b border-border">
                <span
                  className="flex shrink-0 items-center truncate px-2 text-[9px] text-muted-foreground"
                  style={{width: HEADER_W}}
                >
                  <span className="truncate">{c.rulerHint}</span>
                </span>
                <span className="shrink-0" style={{width: AXIS_W}} />
                <span className="relative min-w-0 flex-1 overflow-hidden">
                  <Bands ruler />
                  {X_TICKS.map(h => (
                    <span
                      key={h}
                      className="absolute top-1 border-l border-border pl-0.5 text-[8px] text-muted-foreground"
                      style={{left: pct(h)}}
                    >
                      {clock(h)}
                    </span>
                  ))}
                </span>
              </div>
              {CHANNELS.map((ch, i) => (
                <StackRow key={ch.name} channel={ch} first={i === 0} />
              ))}
              {/* x axis of the last row */}
              <div className="relative h-4" style={{marginLeft: PLOT_LEFT}}>
                {X_TICKS.map(h => (
                  <span
                    key={h}
                    className="absolute top-0.5 -translate-x-1/2 text-[8px] text-muted-foreground"
                    style={{left: pct(h)}}
                  >
                    {h === 0 ? '09/18' : clock(h)}
                  </span>
                ))}
              </div>
            </div>

            {/* track lanes: one per class + AI */}
            <div className="rounded-md border border-border bg-card py-0.5">
              {[
                ...c.classNames.map((n, i) => ({name: n, cls: i})),
                {name: c.lane, cls: -1},
              ].map(lane => (
                <div
                  key={lane.name}
                  className="relative flex h-[18px] border-b border-border last:border-b-0"
                >
                  <span className="absolute top-0.5 left-1 text-[9px] text-muted-foreground">
                    {lane.name}
                  </span>
                  <span className="relative flex-1" style={{marginLeft: PLOT_LEFT}}>
                    {lane.cls >= 0 ? (
                      LABELS.filter(l => l.cls === lane.cls).map((l, i) => (
                        <span
                          key={i}
                          className={cn(
                            'absolute top-[2px] h-[13px] rounded-[3px]',
                            l.selected && 'ring-1 ring-foreground',
                          )}
                          style={{
                            left:
                              l.from === l.to
                                ? `calc(${pct(l.from)} - 3px)`
                                : pct(l.from),
                            width: l.from === l.to ? 6 : pct(l.to - l.from),
                            background: CLASS_COLORS[l.cls],
                            opacity: l.selected ? 1 : 0.75,
                          }}
                        />
                      ))
                    ) : (
                      <span
                        className="absolute top-[2px] h-[13px] rounded-[3px] border border-dashed bg-[#fff5f5]"
                        style={{
                          left: pct(SUGGESTION.from),
                          width: pct(SUGGESTION.to - SUGGESTION.from),
                          borderColor: '#e5484d',
                        }}
                      />
                    )}
                    <span
                      className="absolute inset-y-0 w-px bg-foreground/60"
                      style={{left: pct(CURSOR_H)}}
                    />
                  </span>
                </div>
              ))}
            </div>

            {/* overview minimap */}
            <div className="rounded-md border border-border bg-card px-1">
              <svg
                viewBox="0 0 1000 40"
                preserveAspectRatio="none"
                className="block h-10 w-full"
              >
                <path
                  d={OVERVIEW_LINE}
                  transform="translate(0 3)"
                  fill="none"
                  className="stroke-muted-foreground"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
                {OVERVIEW_BANDS.map(([a, b, cls], i) => (
                  <rect
                    key={i}
                    x={(a / 168) * 1000}
                    y={35}
                    width={Math.max(1.5, ((b - a) / 168) * 1000)}
                    height={4}
                    fill={CLASS_COLORS[cls]}
                  />
                ))}
                <rect
                  x={0}
                  y={0}
                  width={BRUSH_FROM * 1000}
                  height={40}
                  className="fill-foreground/5"
                />
                <rect
                  x={(BRUSH_FROM + BRUSH_W) * 1000}
                  y={0}
                  width={(1 - BRUSH_FROM - BRUSH_W) * 1000}
                  height={40}
                  className="fill-foreground/5"
                />
                <rect
                  x={BRUSH_FROM * 1000}
                  y={1}
                  width={BRUSH_W * 1000}
                  height={38}
                  rx={3}
                  fill="none"
                  className="stroke-foreground"
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </section>

          {/* label panel */}
          <aside className="relative hidden w-52 shrink-0 border-l border-border bg-card @4xl:block">
            <div className="absolute inset-0 flex flex-col gap-2.5 overflow-hidden p-2.5">
              <section>
                <PanelHeading>{c.classes}</PanelHeading>
                <div className="space-y-px">
                  {c.classNames.map((name, i) => (
                    <span
                      key={name}
                      className={cn(
                        'flex items-center gap-2 rounded-md border px-1.5 py-0.5',
                        i === selected.cls
                          ? 'border-foreground bg-accent'
                          : 'border-transparent',
                      )}
                    >
                      <span
                        className="size-2 shrink-0 rounded-sm"
                        style={{background: CLASS_COLORS[i]}}
                      />
                      <span className="min-w-0 flex-1 truncate">{name}</span>
                      <span className="text-[10px] text-muted-foreground tabular-nums">
                        {CLASS_COUNTS[i]}
                      </span>
                      <kbd className="rounded border border-border px-1 font-mono text-[9px] text-muted-foreground">
                        {i + 1}
                      </kbd>
                    </span>
                  ))}
                </div>
              </section>

              <section className="space-y-1 border-t border-border pt-2.5">
                <PanelHeading>{c.selection}</PanelHeading>
                <span className="flex h-6 items-center gap-1.5 rounded-md border border-input px-2 text-[10px]">
                  <span
                    className="size-2 rounded-sm"
                    style={{background: CLASS_COLORS[0]}}
                  />
                  <span className="flex-1">{c.classNames[0]}</span>
                  <ChevronDown className="size-3 text-muted-foreground" />
                </span>
                <dl className="space-y-0.5 text-[10px]">
                  {(
                    [
                      [c.start, stamp(selected.from)],
                      [c.end, stamp(selected.to)],
                      [c.duration, '1h 15m'],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="font-mono">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div>
                  <p className="mb-1 text-[10px] text-muted-foreground">
                    {c.appliesTo}
                  </p>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {CHANNELS.map(ch => {
                      const on = selected.channels?.includes(ch.name);
                      return (
                        <span
                          key={ch.name}
                          className="flex min-w-0 items-center gap-1.5 text-[10px]"
                        >
                          <span
                            className={cn(
                              'flex size-3 shrink-0 items-center justify-center rounded-[3px] border',
                              on
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-input',
                            )}
                          >
                            {on && <Check className="size-2" strokeWidth={3} />}
                          </span>
                          <span className="truncate font-mono">{ch.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
                <MockButton icon={Trash2} className="w-full justify-center">
                  {c.deleteLabel}
                </MockButton>
              </section>

              <section className="space-y-1.5 border-t border-border pt-2.5">
                <PanelHeading>
                  {c.labels} <span className="tabular-nums">20</span>
                </PanelHeading>
                <div className="flex flex-wrap gap-1">
                  {c.filters.map((f, i) => (
                    <span
                      key={f}
                      className={cn(
                        'h-5 rounded-full border px-2 text-[9px] leading-[18px]',
                        i === 0
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border',
                      )}
                    >
                      {f}{' '}
                      <span className="tabular-nums opacity-70">
                        {[20, 15, 3, 2][i]}
                      </span>
                    </span>
                  ))}
                </div>
                {LABELS.slice(2, 3).map(l => (
                  <span
                    key={l.from}
                    className={cn(
                      'grid grid-cols-[8px_minmax(0,1fr)_auto] items-center gap-x-1.5 rounded-md border px-1.5 py-1',
                      l.selected ? 'border-foreground bg-accent' : 'border-border',
                    )}
                  >
                    <span
                      className="size-2 rounded-sm"
                      style={{background: CLASS_COLORS[l.cls]}}
                    />
                    <span className="truncate text-[10px] font-medium">
                      {c.classNames[l.cls]}
                    </span>
                    <span className="max-w-20 truncate rounded-full border border-border px-1.5 text-[9px] text-muted-foreground">
                      {l.channels?.join(', ') ?? c.scopeAll}
                    </span>
                    <span />
                    <span className="col-span-2 truncate font-mono text-[9px] text-muted-foreground">
                      {stamp(l.from)} – {clock(l.to)}
                    </span>
                  </span>
                ))}
              </section>

              <section className="space-y-1.5 border-t border-border pt-2.5">
                <PanelHeading>
                  <Sparkles className="size-3" />
                  {c.suggestions}
                </PanelHeading>
                <div className="space-y-1.5 rounded-md border border-dashed border-red-300 p-2 dark:border-red-900">
                  <span className="flex justify-between gap-2 text-[10px]">
                    <span className="truncate font-mono">
                      {stamp(SUGGESTION.from)} – {clock(SUGGESTION.to)}
                    </span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      {SUGGESTION.score.toFixed(2)}
                    </span>
                  </span>
                  <span className="flex gap-1.5">
                    <MockButton variant="default" className="flex-1 justify-center">
                      {c.accept}
                    </MockButton>
                    <MockButton>{c.dismiss}</MockButton>
                  </span>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </MockAppFrame>
  );
}

function PanelHeading({children}: {children: ReactNode}) {
  return (
    <h4 className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
      {children}
    </h4>
  );
}
