import {ChevronFirst, ChevronLast, Play, SkipBack, SkipForward} from 'lucide-react';

import {MockChrome, MockWindow, Swatch} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';

/**
 * Real dashcam footage from Wikimedia Commons — "Dashcam Recording (urban)"
 * by Fernost (CC0), 12.3s excerpt at 30 fps. The frame below is the actual
 * frame at 73s; tracks/keyframes follow the vehicles visible in the clip
 * (white hatchback being passed, parked wagons, car ahead, parking sign).
 */
const FRAME_URL = '/mockdata/video-frame.webp';
const FRAME_W = 1440;
const FRAME_H = 753;

const TRACK_CAR = '#6496F5';
const TRACK_SIGN = '#FF0000';
const TAG_COLOR = '#F5A623';

const TOTAL_FRAMES = 368;
const PLAYHEAD_FRAME = 90;

const pct = (frame: number) => (frame / TOTAL_FRAMES) * 100;

type Track = {
  id: number;
  name: string;
  color: string;
  keyframes: number[];
  selected?: boolean;
};

const TRACKS: Track[] = [
  {id: 1, name: 'car', color: TRACK_CAR, keyframes: [0, 30, 60]},
  {id: 2, name: 'car', color: TRACK_CAR, keyframes: [30, 90, 150], selected: true},
  {id: 3, name: 'car', color: TRACK_CAR, keyframes: [0, 60, 120, 150]},
  {id: 4, name: 'traffic-sign', color: TRACK_SIGN, keyframes: [30, 120]},
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

/** Konva-style bounding box over the video frame. Solid boxes sit on a
 * keyframe; the dashed one is interpolated between keyframes. */
function Box({
  x,
  y,
  w,
  h,
  color,
  label,
  variant = 'solid',
  selected = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  label?: string;
  variant?: 'solid' | 'interpolated';
  selected?: boolean;
}) {
  if (variant === 'interpolated') {
    return (
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeDasharray="10 7"
        opacity={0.55}
      />
    );
  }
  const tagH = 24;
  const tagY = y - tagH - 3;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={color}
        fillOpacity={0.12}
        stroke={color}
        strokeWidth={selected ? 6 : 3}
      />
      {label && (
        <>
          <rect
            x={x}
            y={tagY}
            width={label.length * 9.5 + 14}
            height={tagH}
            rx={3}
            fill={color}
            opacity={0.85}
          />
          <text
            x={x + 7}
            y={tagY + tagH - 7}
            fontSize={17}
            fill="#ffffff"
            fontFamily="ui-sans-serif, system-ui"
          >
            {label}
          </text>
        </>
      )}
      {selected &&
        [
          [x, y],
          [x + w, y],
          [x, y + h],
          [x + w, y + h],
        ].map(([hx, hy], i) => (
          <circle
            key={i}
            cx={hx}
            cy={hy}
            r={7}
            fill="#3b82f6"
            stroke="#ffffff"
            strokeWidth={2.5}
          />
        ))}
    </g>
  );
}

export function MockVideoTimeline() {
  const {t} = useLanguage();
  const m = t.mocks.timeline;

  const ticks = [0, 40, 80, 120, 160, 200, 240, 280, 320, 360];

  return (
    <MockWindow>
      <MockChrome />
      {/* current frame (real footage) with tracked boxes */}
      <div className="relative w-full overflow-hidden bg-neutral-950">
        <div className="relative aspect-[1440/753] w-full">
          <img
            src={FRAME_URL}
            alt=""
            className="absolute inset-0 h-full w-full"
            loading="lazy"
          />
          <svg
            viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* car ahead — between keyframes, interpolated */}
            <Box
              x={720}
              y={446}
              w={49}
              h={37}
              color={TRACK_CAR}
              variant="interpolated"
            />
            <Box x={847} y={440} w={104} h={72} color={TRACK_CAR} label="car" />
            <Box
              x={1004}
              y={340}
              w={30}
              h={55}
              color={TRACK_SIGN}
              label="traffic-sign"
            />
            {/* selected track — keyframe on the playhead frame */}
            <Box
              x={906}
              y={433}
              w={204}
              h={115}
              color={TRACK_CAR}
              label="car"
              selected
            />
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
          <span className="ml-2 font-mono text-[11px] tabular-nums">{m.counter}</span>
          <span className="text-[10px]">·</span>
          <span className="font-mono text-[10px] tabular-nums">{m.time}</span>
          <span className="ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            {m.fps}
          </span>
        </div>

        <div className="flex">
          {/* label column */}
          <div className="w-24 shrink-0 border-r border-border bg-muted/20 sm:w-28">
            <div className="flex h-6 items-center border-b border-border px-2 text-[10px] text-muted-foreground">
              {m.frameColumn}
            </div>
            {TRACKS.map(track => (
              <div
                key={track.id}
                className="flex h-7 items-center gap-1.5 px-2 text-[11px]"
              >
                <Swatch color={track.color} />
                <span className="truncate">{track.name}</span>
              </div>
            ))}
            <div className="flex h-7 items-center gap-1.5 px-2 text-[11px]">
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
                <div key={track.id} className="relative h-7">
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
            <div className="relative h-7">
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
    </MockWindow>
  );
}
