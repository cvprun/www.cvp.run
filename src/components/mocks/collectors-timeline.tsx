import {
  Check,
  ChevronLeft,
  ChevronRight,
  GanttChart,
  HardDrive,
  LayoutDashboard,
  Play,
  Radar,
  SkipBack,
  SkipForward,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Collectors timeline (`/proj/:id/collectors/timeline`): `TransportBar`,
 * `TimelineTracks` (tick header + one `TimelineTrack` per stream with a
 * sparkline or sample frames over its `AvailabilityBar`), the legend, and the
 * opened track below as a `ViewerFrame`.
 */

const COPY = {
  ko: {
    title: 'Collectors',
    tabs: {overview: '개요', list: '수집기', timeline: '타임라인', storage: '저장소'},
    spans: ['15분', '1시간', '6시간', '24시간'],
    now: '지금',
    goToDate: '날짜로 이동',
    payloads: {video: '영상', image: '이미지', timeseries: '시계열', record: '레코드'},
    legend: [
      '클라우드에 있음',
      '에이전트에만 있음',
      '정리됨 (조회 불가)',
      '핀으로 고정',
    ],
    fromAgent: '에이전트에서 가져옴',
    openHistory: '기록에서 열기',
    names: {
      gate: '정문 교차로 CCTV',
      vision: '라인 2 비전 검사',
      press: '프레스 2호기',
      oven: '건조로 온도',
      mes: '라인 PLC 이벤트 수신',
    },
  },
  en: {
    title: 'Collectors',
    tabs: {
      overview: 'Overview',
      list: 'All collectors',
      timeline: 'Timeline',
      storage: 'Storage',
    },
    spans: ['15 min', '1 hour', '6 hours', '24 hours'],
    now: 'Now',
    goToDate: 'Go to date',
    payloads: {
      video: 'Video',
      image: 'Image',
      timeseries: 'Time series',
      record: 'Record',
    },
    legend: [
      'In the cloud',
      'On the agent only',
      'Purged (cannot be viewed)',
      'Pinned',
    ],
    fromAgent: 'Pulled from the agent',
    openHistory: 'Open in history',
    names: {
      gate: 'Front gate CCTV',
      vision: 'Line 2 inspection',
      press: 'Press #2',
      oven: 'Drying oven temp',
      mes: 'Line PLC event inbox',
    },
  },
} as const;

/** Visible window 13:50–14:50 (1 hour); the playhead sits at 14:32:05. */
const TICKS = ['13:50', '14:00', '14:10', '14:20', '14:30', '14:40', '14:50'];
const PLAYHEAD = (42 * 60 + 5) / 3600;

type State = 'cloud' | 'local' | 'purged';
type Range = [from: number, to: number, state: State];

/** `STATE_CLASS` of `AvailabilityBar`. */
const STATE_CLASS: Record<State, string> = {
  cloud: 'bg-sky-500',
  local: 'bg-foreground/70',
  purged:
    'bg-[repeating-linear-gradient(135deg,var(--color-muted-foreground)_0_2px,transparent_2px_6px)] opacity-50',
};

const THUMBS = [
  '/mockdata/vt1.webp',
  '/mockdata/vt2.webp',
  '/mockdata/vt3.webp',
  '/mockdata/vt1.webp',
  '/mockdata/vt2.webp',
  '/mockdata/vt3.webp',
  '/mockdata/vt1.webp',
  '/mockdata/vt2.webp',
];

/** Deterministic smooth-ish series for the rollup sparklines. */
function series(seed: number, n = 60): number[] {
  return Array.from({length: n}, (_, i) => {
    const x = i / n;
    return (
      0.5 +
      0.28 * Math.sin(x * 9 + seed) +
      0.12 * Math.sin(x * 31 + seed * 2) +
      0.05 * Math.cos(x * 71 + seed)
    );
  });
}

/** Sparkline as `TimelineTrack` draws it: polyline pieces split at gaps. */
function Sparkline({values, gap}: {values: number[]; gap?: [number, number]}) {
  const w = 600;
  const h = 24;
  const pieces: string[][] = [[]];
  values.forEach((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const inGap = gap && x / w > gap[0] && x / w < gap[1];
    if (inGap) {
      if (pieces[pieces.length - 1].length) pieces.push([]);
      return;
    }
    pieces[pieces.length - 1].push(
      `${x.toFixed(1)},${(h - 2 - Math.min(1, Math.max(0, v)) * (h - 4)).toFixed(1)}`,
    );
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-5 w-full">
      {pieces
        .filter(p => p.length > 1)
        .map((p, i) => (
          <polyline
            key={i}
            points={p.join(' ')}
            fill="none"
            vectorEffect="non-scaling-stroke"
            className="stroke-primary"
            strokeWidth={1.5}
          />
        ))}
    </svg>
  );
}

function AvailabilityBar({ranges, pin}: {ranges: Range[]; pin?: [number, number]}) {
  return (
    <div className="relative h-5 overflow-hidden rounded-md bg-muted">
      {ranges.map(([from, to, state]) => (
        <span
          key={`${from}:${state}`}
          className={cn('absolute inset-y-1', STATE_CLASS[state])}
          style={{left: `${from * 100}%`, width: `${(to - from) * 100}%`}}
        />
      ))}
      {pin && (
        <span
          className="absolute top-0 h-1 bg-amber-500"
          style={{left: `${pin[0] * 100}%`, width: `${(pin[1] - pin[0]) * 100}%`}}
        />
      )}
      <span
        className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-destructive"
        style={{left: `${PLAYHEAD * 100}%`}}
      />
    </div>
  );
}

type Track = {
  name: string;
  stream: string;
  payload: keyof (typeof COPY)['ko']['payloads'];
  open?: boolean;
  spark?: number[];
  gap?: [number, number];
  thumbs?: boolean;
  ranges: Range[];
  pin?: [number, number];
};

export function MockCollectorsTimeline() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  const tracks: Track[] = [
    {
      name: c.names.gate,
      stream: 'cam-1',
      payload: 'video',
      open: true,
      ranges: [
        [0, 0.46, 'cloud'],
        [0.46, 1, 'local'],
      ],
      pin: [0.52, 0.74],
    },
    {
      name: c.names.vision,
      stream: 'frames',
      payload: 'image',
      open: true,
      thumbs: true,
      ranges: [
        [0, 0.18, 'purged'],
        [0.18, 0.6, 'cloud'],
        [0.6, 1, 'local'],
      ],
    },
    {
      name: c.names.press,
      stream: 'pressure',
      payload: 'timeseries',
      spark: series(1.3),
      gap: [0.31, 0.37],
      ranges: [
        [0, 0.31, 'local'],
        [0.37, 1, 'local'],
      ],
    },
    {
      name: c.names.oven,
      stream: 'temp',
      payload: 'timeseries',
      spark: series(4.1).map(v => 0.35 + v * 0.4),
      ranges: [[0, 1, 'cloud']],
    },
    {
      name: c.names.mes,
      stream: 'events',
      payload: 'record',
      ranges: [
        [0.04, 0.22, 'cloud'],
        [0.3, 0.55, 'cloud'],
        [0.62, 1, 'local'],
      ],
    },
  ];

  const legend = [
    STATE_CLASS.cloud,
    STATE_CLASS.local,
    STATE_CLASS.purged,
    'bg-amber-500',
  ];

  return (
    <MockAppFrame
      activeNav="collectors"
      crumbs={[{icon: GanttChart, label: c.tabs.timeline}]}
      title={c.title}
      tabs={[
        {icon: LayoutDashboard, label: c.tabs.overview},
        {icon: Radar, label: c.tabs.list},
        {icon: GanttChart, label: c.tabs.timeline, active: true},
        {icon: HardDrive, label: c.tabs.storage},
      ]}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-2.5">
          {/* TransportBar + go to date */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="flex items-center text-foreground">
                {[SkipBack, Play, SkipForward].map((Icon, i) => (
                  <span key={i} className="flex size-6 items-center justify-center">
                    <Icon className="size-3.5" />
                  </span>
                ))}
              </span>
              <span className="truncate text-[11px] tabular-nums">
                2026-10-01 14:32:05
              </span>
              <span className="ml-auto flex items-center gap-0.5">
                <ChevronLeft className="hidden size-3.5 text-muted-foreground @xl:block" />
                <span className="flex items-center rounded-md border border-border p-0.5">
                  {c.spans.map((span, i) => (
                    <span
                      key={span}
                      className={cn(
                        'rounded px-1.5 py-0.5 text-[10px] whitespace-nowrap',
                        i === 1
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground',
                        (i === 0 || i === 3) && 'hidden @xl:inline',
                      )}
                    >
                      {span}
                    </span>
                  ))}
                </span>
                <ChevronRight className="hidden size-3.5 text-muted-foreground @xl:block" />
                <MockButton className="ml-1">{c.now}</MockButton>
              </span>
            </div>
            <span className="hidden items-center gap-1.5 text-[10px] text-muted-foreground @3xl:flex">
              {c.goToDate}
              <span className="flex h-6 items-center rounded-md border border-input bg-background px-2 text-[10px] text-foreground tabular-nums">
                2026-10-01
              </span>
            </span>
          </div>

          {/* TimelineTracks */}
          <section className="flex flex-col">
            <div className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] gap-x-2.5 @3xl:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]">
              <span />
              <div className="relative h-3.5 text-[9px] text-muted-foreground">
                {TICKS.map((tick, i) => (
                  <span
                    key={tick}
                    className={cn(
                      'absolute top-0 tabular-nums whitespace-nowrap',
                      i === 0
                        ? ''
                        : i === TICKS.length - 1
                          ? '-translate-x-full'
                          : '-translate-x-1/2',
                      i % 2 === 1 && 'hidden @xl:inline',
                    )}
                    style={{left: `${(i / (TICKS.length - 1)) * 100}%`}}
                  >
                    {tick}
                  </span>
                ))}
              </div>
            </div>
            <ul className="flex flex-col divide-y divide-border">
              {tracks.map(track => (
                <li
                  key={track.stream}
                  className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] items-center gap-x-2.5 py-1.5 @3xl:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]"
                >
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span
                      className={cn(
                        'flex size-3 shrink-0 items-center justify-center rounded-[3px] border',
                        track.open
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-input',
                      )}
                    >
                      {track.open && <Check className="size-2.5" strokeWidth={3} />}
                    </span>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-[11px] font-medium">
                        {track.name}
                      </span>
                      <span className="truncate text-[10px] text-muted-foreground">
                        <span className="font-mono">{track.stream}</span> ·{' '}
                        {c.payloads[track.payload]}
                      </span>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-col gap-1">
                    {track.spark && <Sparkline values={track.spark} gap={track.gap} />}
                    {track.thumbs && (
                      <ul className="grid h-7 grid-cols-4 gap-0.5 @2xl:grid-cols-8">
                        {THUMBS.map((src, i) => (
                          <li
                            key={i}
                            className={cn(
                              'overflow-hidden rounded-sm bg-muted',
                              i >= 4 && 'hidden @2xl:block',
                              // the first sample falls in the purged range
                              i === 0 && 'opacity-0',
                            )}
                          >
                            <img
                              src={src}
                              alt=""
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                    <AvailabilityBar ranges={track.ranges} pin={track.pin} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* AvailabilityLegend */}
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
            {c.legend.map((label, i) => (
              <li key={label} className="flex items-center gap-1">
                <span className={cn('h-1.5 w-3 rounded-sm', legend[i])} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* opened viewers */}
        <section className="grid grid-cols-1 gap-3 @4xl:grid-cols-2">
          {[
            {name: c.names.gate, stream: 'cam-1', src: '/mockdata/davis-crossing.webp'},
            {name: c.names.vision, stream: 'frames', src: '/mockdata/vt2.webp'},
          ].map((viewer, i) => (
            <div
              key={viewer.stream}
              className={cn(
                'flex flex-col overflow-hidden rounded-lg border border-border bg-card',
                i > 0 && 'hidden @4xl:flex',
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-2.5 py-1.5">
                <div className="flex min-w-0 items-center gap-1.5">
                  <span className="truncate text-[11px] font-medium">
                    {viewer.name} · <span className="font-mono">{viewer.stream}</span>
                  </span>
                  <span className="inline-flex items-center rounded-full bg-muted px-1.5 py-px text-[10px] font-medium whitespace-nowrap text-muted-foreground">
                    {c.fromAgent}
                  </span>
                </div>
                <span className="hidden text-[10px] text-muted-foreground @xl:inline">
                  {c.openHistory}
                </span>
              </div>
              <div className="relative aspect-video bg-neutral-950">
                <img
                  src={viewer.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
                {i === 0 && (
                  <span className="absolute top-1.5 left-1.5 rounded bg-black/55 px-1 py-px font-mono text-[9px] text-white/90">
                    2026-10-01 14:32:05
                  </span>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </MockAppFrame>
  );
}
