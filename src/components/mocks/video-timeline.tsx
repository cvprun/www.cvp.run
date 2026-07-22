import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronRight,
  Eye,
  MessagesSquare,
  Pentagon,
  Play,
  Shapes,
  SkipBack,
  SkipForward,
  SlidersHorizontal,
  Tags,
  Boxes as BoxesIcon,
} from 'lucide-react';

import {MockChrome, MockWindow, Swatch} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * DAVIS 2017 `crossing` sequence (annotations CC BY 4.0, DAVIS challenge
 * organizers) — 52 frames at 24 fps, 854×480. The frame below is the real
 * frame 30 and every polygon is the dataset's own pixel-accurate instance
 * mask, contour-traced and simplified. The truck outline wraps around both
 * pedestrians because the mask encodes that occlusion.
 */
const FRAME_URL = '/mockdata/davis-crossing.webp';
const FRAME_W = 854;
const FRAME_H = 480;

const CLASS_PERSON = '#FF1E1E';
const CLASS_TRUCK = '#501EB4';
const TAG_COLOR = '#F5A623';

const TOTAL_FRAMES = 51;
const PLAYHEAD_FRAME = 30;

const pct = (frame: number) => (frame / TOTAL_FRAMES) * 100;

type Shape = {
  id: number;
  name: string;
  color: string;
  /** Polygon vertices in frame coordinates, `x,y x,y …`. */
  points: string;
  /** Label anchor — the polygon's first exterior vertex in the app. */
  anchor: [number, number];
  /** Axis-aligned bounds, used for the selection halo. */
  bbox: [number, number, number, number];
  selected?: boolean;
};

const SHAPES: Shape[] = [
  {
    id: 1,
    name: 'person',
    color: CLASS_PERSON,
    anchor: [252, 249],
    bbox: [236, 249, 317, 408],
    points:
      '252,249 245,268 260,284 260,300 254,304 268,318 271,331 258,342 252,390 236,406 260,407 271,367 284,360 303,390 292,399 315,398 311,375 295,343 301,343 306,329 296,294 266,253',
  },
  {
    id: 2,
    name: 'person',
    color: CLASS_PERSON,
    anchor: [179, 224],
    bbox: [149, 224, 223, 408],
    points:
      '179,224 172,237 182,256 149,318 182,287 190,318 182,352 197,386 184,405 191,408 223,399 210,344 220,317 221,277 213,256 195,246 191,227',
  },
  {
    id: 3,
    name: 'truck',
    color: CLASS_TRUCK,
    anchor: [279, 223],
    bbox: [159, 223, 364, 344],
    selected: true,
    points:
      '194,230 196,246 214,256 222,277 212,337 237,344 248,325 268,327 253,304 259,284 244,268 252,248 290,278 306,325 335,322 354,331 364,317 358,280 318,240 279,223 290,230',
  },
];

type Track = {
  id: number;
  name: string;
  color: string;
  keyframes: number[];
  selected?: boolean;
};

const TRACKS: Track[] = [
  {id: 2, name: 'person', color: CLASS_PERSON, keyframes: [0, 12, 26, 38, 51]},
  {id: 1, name: 'person', color: CLASS_PERSON, keyframes: [0, 10, 20, 30, 40, 51]},
  {
    id: 3,
    name: 'truck',
    color: CLASS_TRUCK,
    keyframes: [0, 16, 30, 44, 51],
    selected: true,
  },
];

function Diamond({
  at,
  color,
  selected = false,
}: {
  at: number;
  color: string;
  selected?: boolean;
}) {
  return (
    <span
      className={
        'absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] border ' +
        (selected ? 'border-primary ring-1 ring-primary' : 'border-background')
      }
      style={{left: `${at}%`, backgroundColor: color}}
    />
  );
}

/** Instance mask rendered the way the editor's Konva canvas draws polygons:
 * class-colored outline over a 10% fill, a heavier stroke plus selection halo,
 * transform anchors and vertex handles when the shape is selected. */
function Polygon({shape}: {shape: Shape}) {
  const {points, color, name, anchor, bbox, selected} = shape;
  const [minX, minY, maxX, maxY] = bbox;
  const tagH = 17;
  const tagY = anchor[1] - tagH - 3;
  const halo = {x: minX - 3, y: minY - 3, w: maxX - minX + 6, h: maxY - minY + 6};
  const box = {x: minX - 4, y: minY - 4, w: maxX - minX + 8, h: maxY - minY + 8};
  const vertices = points.split(' ').map(p => p.split(',').map(Number));
  const anchors: [number, number][] = [
    [box.x, box.y],
    [box.x + box.w / 2, box.y],
    [box.x + box.w, box.y],
    [box.x, box.y + box.h / 2],
    [box.x + box.w, box.y + box.h / 2],
    [box.x, box.y + box.h],
    [box.x + box.w / 2, box.y + box.h],
    [box.x + box.w, box.y + box.h],
  ];

  return (
    <g>
      {selected && (
        <>
          <rect
            x={halo.x}
            y={halo.y}
            width={halo.w}
            height={halo.h}
            fill="none"
            stroke="#1d4ed8"
            strokeWidth={3}
            opacity={0.45}
          />
          <rect
            x={halo.x}
            y={halo.y}
            width={halo.w}
            height={halo.h}
            fill="none"
            stroke="#60a5fa"
            strokeWidth={1.5}
            strokeDasharray="5 3"
          />
        </>
      )}
      <polygon
        points={points}
        fill={color}
        fillOpacity={0.12}
        stroke={color}
        strokeWidth={selected ? 3 : 1.6}
        strokeLinejoin="round"
      />
      <rect
        x={anchor[0]}
        y={tagY}
        width={name.length * 6.5 + 9}
        height={tagH}
        rx={2}
        fill={color}
        opacity={0.85}
      />
      <text
        x={anchor[0] + 4.5}
        y={tagY + tagH - 5}
        fontSize={12}
        fill="#ffffff"
        fontFamily="ui-sans-serif, system-ui"
      >
        {name}
      </text>
      {selected && (
        <>
          {anchors.map(([ax, ay], i) => (
            <rect
              key={`a${i}`}
              x={ax - 3.5}
              y={ay - 3.5}
              width={7}
              height={7}
              fill="#ffffff"
              stroke="#3b82f6"
              strokeWidth={1.2}
            />
          ))}
          {vertices.map(([vx, vy], i) => (
            <circle
              key={`v${i}`}
              cx={vx}
              cy={vy}
              r={3.5}
              fill="#3b82f6"
              stroke="#ffffff"
              strokeWidth={1.2}
            />
          ))}
        </>
      )}
    </g>
  );
}

export function MockVideoTimeline() {
  const {t} = useLanguage();
  const m = t.mocks.timeline;
  const e = t.mocks.editor;

  const ticks = [0, 6, 12, 18, 24, 30, 36, 42, 48];

  const tabs = [
    {icon: BoxesIcon, label: e.tabObjects, active: true},
    {icon: SlidersHorizontal, label: e.tabProperties, active: false},
    {icon: Shapes, label: e.tabClasses, active: false},
    {icon: Tags, label: e.tabTags, active: false},
    {icon: MessagesSquare, label: e.tabIssues, active: false},
  ];

  return (
    <MockWindow className="@container">
      <MockChrome />
      <div className="flex">
        <div className="flex min-w-0 flex-1 flex-col">
          {/* current frame (real DAVIS footage) with its instance masks */}
          <div className="relative w-full overflow-hidden bg-neutral-950">
            <div className="relative aspect-[854/480] w-full">
              <img
                src={FRAME_URL}
                alt=""
                className="absolute inset-0 h-full w-full"
                loading="lazy"
              />
              <svg
                viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {SHAPES.filter(s => !s.selected).map(s => (
                  <Polygon key={s.id} shape={s} />
                ))}
                {SHAPES.filter(s => s.selected).map(s => (
                  <Polygon key={s.id} shape={s} />
                ))}
              </svg>
            </div>
          </div>

          {/* timeline dock */}
          <div className="border-t border-border bg-card">
            {/* playback controls */}
            <div className="flex items-center gap-1 border-b border-border px-2 py-1 text-xs text-muted-foreground">
              <ChevronFirst className="size-3.5" aria-label={m.first} />
              <SkipBack className="size-3.5" aria-label={m.prev} />
              <span className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
                <Play className="size-3" aria-label={m.play} />
              </span>
              <SkipForward className="size-3.5" aria-label={m.next} />
              <ChevronLast className="size-3.5" aria-label={m.last} />
              <span className="ml-2 font-mono text-[11px] tabular-nums text-foreground">
                {m.counter}
              </span>
              <span className="text-[10px]">·</span>
              <span className="font-mono text-[10px] tabular-nums">{m.time}</span>
              <span className="ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                {m.fps}
              </span>
            </div>

            <div className="flex">
              {/* label column */}
              <div className="w-24 shrink-0 border-r border-border bg-muted/20 @2xl:w-28">
                <div className="flex h-6 items-center border-b border-border px-2 text-[10px] text-muted-foreground">
                  {m.frameColumn}
                </div>
                {TRACKS.map(track => (
                  <div
                    key={track.id}
                    className={cn(
                      'flex h-6 items-center gap-1.5 px-2 text-[11px]',
                      track.selected && 'bg-accent',
                    )}
                  >
                    <Swatch color={track.color} />
                    <span className="truncate">{track.name}</span>
                  </div>
                ))}
                <div className="flex h-6 items-center gap-1.5 px-2 text-[11px]">
                  <Swatch color={TAG_COLOR} round />
                  <span className="truncate text-muted-foreground">daylight</span>
                </div>
              </div>

              {/* ruler + tracks */}
              <div className="relative min-w-0 flex-1">
                {/* playhead */}
                <div
                  className="absolute top-0 bottom-0 z-20 w-px bg-primary"
                  style={{left: `${pct(PLAYHEAD_FRAME)}%`}}
                >
                  <span className="absolute -top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
                </div>

                {/* ruler */}
                <div className="relative h-6 border-b border-border">
                  {ticks.map(f => (
                    <span
                      key={f}
                      className="absolute top-0 flex h-full flex-col justify-between"
                      style={{left: `${pct(f)}%`}}
                    >
                      <span className="pl-1 font-mono text-[9px] text-muted-foreground">
                        {f}
                      </span>
                      <span className="h-1.5 w-px bg-border" />
                    </span>
                  ))}
                </div>

                {/* track rows */}
                {TRACKS.map(track => {
                  const from = track.keyframes[0];
                  const to = track.keyframes[track.keyframes.length - 1];
                  return (
                    <div key={track.id} className="relative h-6">
                      <span
                        className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full"
                        style={{
                          left: `${pct(from)}%`,
                          width: `${pct(to - from)}%`,
                          backgroundColor: track.color,
                          opacity: track.selected ? 0.9 : 0.45,
                        }}
                      />
                      {track.keyframes.map(kf => (
                        <Diamond
                          key={kf}
                          at={pct(kf)}
                          color={track.color}
                          selected={track.selected && kf === PLAYHEAD_FRAME}
                        />
                      ))}
                    </div>
                  );
                })}

                {/* tag span row */}
                <div className="relative h-6">
                  <span
                    className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded"
                    style={{
                      left: '0%',
                      width: '100%',
                      backgroundColor: TAG_COLOR,
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* editor status bar */}
          <div className="flex h-6 items-center gap-3 border-t border-border bg-background px-3 font-mono text-[10px] text-muted-foreground">
            <span>x: 268 y: 341</span>
            <span>100%</span>
            <span className="ml-auto font-sans">{m.objectCount}</span>
          </div>
        </div>

        {/* objects panel — tracked instances, video mode */}
        <aside className="hidden w-52 shrink-0 flex-col border-l border-border bg-muted/30 @3xl:flex">
          <div className="grid grid-cols-5 gap-0.5 p-1.5">
            {tabs.map(({icon: Icon, label, active}) => (
              <span
                key={label}
                title={label}
                className={cn(
                  'flex h-8 items-center justify-center rounded',
                  active ? 'bg-background shadow-sm' : 'text-muted-foreground',
                )}
              >
                <Icon className="size-3.5" />
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between px-3 py-1.5">
            <span className="text-xs font-semibold">{e.objectsTitle}</span>
            <span className="text-[10px] text-muted-foreground">{TRACKS.length}</span>
          </div>
          <ul className="min-h-0 flex-1 space-y-0.5 px-2">
            {TRACKS.map(track => (
              <li key={track.id}>
                <div
                  className={cn(
                    'rounded border px-1.5 py-1',
                    track.selected ? 'border-primary bg-accent' : 'border-transparent',
                  )}
                >
                  <div className="flex items-center gap-1 text-[11px]">
                    {track.selected ? (
                      <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="size-3 shrink-0 text-muted-foreground" />
                    )}
                    <Swatch color={track.color} />
                    <Pentagon className="size-3 shrink-0 text-muted-foreground" />
                    <span className="flex-1 truncate">{track.name}</span>
                    <Eye className="size-3 shrink-0 text-muted-foreground" />
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 pl-4 text-[9px] text-muted-foreground">
                    <span className="rounded bg-muted px-1">
                      {m.keyframeCount(String(track.keyframes.length))}
                    </span>
                    <span className="font-mono">
                      f{track.keyframes[0]}–f
                      {track.keyframes[track.keyframes.length - 1]}
                    </span>
                  </div>
                </div>
                {track.selected && (
                  <ul className="mt-0.5 space-y-0.5 pl-4">
                    {track.keyframes.slice(1, 4).map(kf => (
                      <li
                        key={kf}
                        className="flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[10px]"
                      >
                        <span
                          className={cn(
                            'rounded px-1 font-mono text-[9px]',
                            kf === PLAYHEAD_FRAME
                              ? 'bg-primary/15 text-primary'
                              : 'text-muted-foreground',
                          )}
                        >
                          f{kf}
                        </span>
                        <Pentagon className="size-2.5 shrink-0 text-muted-foreground" />
                        <span className="flex-1 truncate text-muted-foreground">
                          {track.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="border-t border-border px-3 py-2">
            <span className="block truncate text-[10px] text-muted-foreground">
              {m.sequenceNote}
            </span>
          </div>
        </aside>
      </div>
    </MockWindow>
  );
}
