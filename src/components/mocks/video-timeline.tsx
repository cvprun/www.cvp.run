import {ChevronFirst, ChevronLast, Play, SkipBack, SkipForward} from 'lucide-react';

import {MockChrome, MockWindow, Swatch} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';

const TRACK_CAR = '#6496F5';
const TRACK_PERSON = '#FF1E1E';
const TAG_COLOR = '#F5A623';

const PLAYHEAD = 13.3; // 120 / 899

type Track = {
  name: string;
  color: string;
  keyframes: number[];
  from: number;
  to: number;
};

const TRACKS: Track[] = [
  {name: 'car', color: TRACK_CAR, keyframes: [3, 22, 40, 58, 76, 94], from: 3, to: 94},
  {name: 'person', color: TRACK_PERSON, keyframes: [10, 34, 50], from: 10, to: 50},
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

/** Interpolated-frame preview above the timeline dock. */
function FramePreview() {
  return (
    <svg
      viewBox="0 0 800 240"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={800} height={240} fill="#1c2431" />
      <polygon points="0,240 800,240 620,110 180,110" fill="#38445c" />
      <rect x={0} y={40} width={130} height={70} fill="#2b3850" />
      <rect x={660} y={30} width={140} height={80} fill="#2b3850" />
      <rect x={330} y={128} width={150} height={54} rx={9} fill="#4c5b7a" />
      <rect x={356} y={110} width={92} height={28} rx={7} fill="#55648a" />
      {/* interpolated box (dashed) trailing the keyframed one */}
      <rect
        x={252}
        y={116}
        width={168}
        height={72}
        fill="none"
        stroke={TRACK_CAR}
        strokeWidth={1.5}
        strokeDasharray="6 4"
        opacity={0.45}
      />
      <rect
        x={318}
        y={104}
        width={176}
        height={84}
        fill={TRACK_CAR}
        fillOpacity={0.12}
        stroke={TRACK_CAR}
        strokeWidth={2}
      />
      <rect
        x={318}
        y={87}
        width={38}
        height={16}
        rx={2}
        fill={TRACK_CAR}
        opacity={0.85}
      />
      <text
        x={323}
        y={99}
        fontSize={11}
        fill="#ffffff"
        fontFamily="ui-sans-serif, system-ui"
      >
        car
      </text>
    </svg>
  );
}

export function MockVideoTimeline() {
  const {t} = useLanguage();
  const m = t.mocks.timeline;

  const ticks = [0, 90, 180, 270, 360, 450, 540, 630, 720, 810];

  return (
    <MockWindow>
      <MockChrome />
      <div className="h-36 overflow-hidden bg-neutral-950 sm:h-44">
        <FramePreview />
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
                key={track.name}
                className="flex h-7 items-center gap-1.5 px-2 text-[11px]"
              >
                <Swatch color={track.color} />
                <span className="truncate">{track.name}</span>
              </div>
            ))}
            <div className="flex h-7 items-center gap-1.5 px-2 text-[11px]">
              <Swatch color={TAG_COLOR} round />
              <span className="truncate text-muted-foreground">night</span>
            </div>
          </div>

          {/* ruler + tracks */}
          <div className="relative min-w-0 flex-1">
            {/* playhead */}
            <div
              className="absolute top-0 bottom-0 z-20 w-px bg-primary"
              style={{left: `${PLAYHEAD}%`}}
            >
              <span className="absolute -top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
            </div>

            {/* ruler */}
            <div className="relative h-6 border-b border-border">
              {ticks.map((f, i) => (
                <span
                  key={f}
                  className="absolute top-0 flex h-full flex-col justify-between"
                  style={{left: `${i * 10}%`}}
                >
                  <span className="pl-1 font-mono text-[9px] text-muted-foreground">
                    {f}
                  </span>
                  <span className="h-1.5 w-px bg-border" />
                </span>
              ))}
            </div>

            {/* track rows */}
            {TRACKS.map((track, ti) => (
              <div key={track.name} className="relative h-7">
                <span
                  className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full"
                  style={{
                    left: `${track.from}%`,
                    width: `${track.to - track.from}%`,
                    backgroundColor: track.color,
                    opacity: ti === 0 ? 0.9 : 0.45,
                  }}
                />
                {track.keyframes.map(kf => (
                  <Diamond
                    key={kf}
                    at={kf}
                    color={track.color}
                    selected={ti === 0 && kf === 22}
                  />
                ))}
              </div>
            ))}

            {/* tag span row */}
            <div className="relative h-7">
              <span
                className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded"
                style={{
                  left: '46%',
                  width: '48%',
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
