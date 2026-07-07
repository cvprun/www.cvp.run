import {
  Bone,
  Box,
  BoxSelect,
  Hexagon,
  Lasso,
  Locate,
  MousePointer2,
  Move,
  Move3d,
  Palette,
  Rotate3d,
  Ruler,
  Save,
  Scale3d,
  Wand2,
  Waypoints,
} from 'lucide-react';
import {useState} from 'react';

import {
  MockChrome,
  MockIconButton,
  MockWindow,
  Swatch,
  seededRandom,
  turbo,
} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

const CAR_COLOR = '#6496F5';
const BUILDING_COLOR = '#FFC800';
const GROUND_COLOR = '#475569';

type Pt = {
  x: number;
  y: number;
  r: number;
  h: number;
  i: number;
  c: 'ground' | 'car' | 'wall';
};

function makePoints(): Pt[] {
  const rnd = seededRandom(42);
  const pts: Pt[] = [];
  // ground plane with fake perspective (further = higher on screen, smaller)
  for (let n = 0; n < 420; n++) {
    const depth = rnd();
    const x = 40 + rnd() * 720;
    const y = 150 + depth * 250 + (rnd() - 0.5) * 10;
    pts.push({
      x,
      y,
      r: 0.9 + depth * 1.4,
      h: 0.05 + rnd() * 0.12,
      i: rnd() * 0.5,
      c: 'ground',
    });
  }
  // car cluster
  for (let n = 0; n < 130; n++) {
    const x = 430 + rnd() * 130;
    const y = 268 + rnd() * 58;
    pts.push({x, y, r: 1.6, h: 0.35 + (326 - y) / 90, i: 0.5 + rnd() * 0.5, c: 'car'});
  }
  // wall / building slice on the left
  for (let n = 0; n < 150; n++) {
    const x = 80 + rnd() * 110;
    const y = 120 + rnd() * 180;
    pts.push({x, y, r: 1.3, h: 0.4 + (300 - y) / 200, i: 0.3 + rnd() * 0.4, c: 'wall'});
  }
  return pts;
}

const POINTS = makePoints();

type ColorMode = 'rgb' | 'label' | 'height' | 'intensity';

function pointColor(p: Pt, mode: ColorMode): string {
  switch (mode) {
    case 'height':
      return turbo(p.h);
    case 'intensity':
      return turbo(p.i);
    case 'label':
      return p.c === 'car' ? CAR_COLOR : p.c === 'wall' ? BUILDING_COLOR : GROUND_COLOR;
    case 'rgb': {
      const v = Math.round(120 + p.i * 110);
      return `rgb(${v - 14},${v - 6},${v + 10})`;
    }
  }
}

/** Pseudo-3D cuboid wireframe (front + back rects joined at corners). */
function Cuboid({selected = true}: {selected?: boolean}) {
  const stroke = selected ? '#a9c4fa' : CAR_COLOR;
  const front = {x: 420, y: 262, w: 150, h: 70};
  const dx = 26;
  const dy = -16;
  const b = {x: front.x + dx, y: front.y + dy, w: front.w, h: front.h};
  const corners: [number, number, number, number][] = [
    [front.x, front.y, b.x, b.y],
    [front.x + front.w, front.y, b.x + b.w, b.y],
    [front.x, front.y + front.h, b.x, b.y + b.h],
    [front.x + front.w, front.y + front.h, b.x + b.w, b.y + b.h],
  ];
  return (
    <g stroke={stroke} strokeWidth={1.5} fill="none">
      <rect x={b.x} y={b.y} width={b.w} height={b.h} opacity={0.55} />
      {corners.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} opacity={0.55} />
      ))}
      <rect
        x={front.x}
        y={front.y}
        width={front.w}
        height={front.h}
        fill={CAR_COLOR}
        fillOpacity={0.15}
      />
    </g>
  );
}

function OrthoPanel({
  label,
  variant,
}: {
  label: string;
  variant: 'top' | 'front' | 'side';
}) {
  const rnd = seededRandom(variant === 'top' ? 7 : variant === 'front' ? 11 : 13);
  const dots = Array.from({length: 90}, () => ({
    x: 8 + rnd() * 96,
    y: 10 + rnd() * 52,
    h: rnd(),
  }));
  const box =
    variant === 'top'
      ? {x: 48, y: 24, w: 30, h: 16}
      : variant === 'front'
        ? {x: 46, y: 34, w: 32, h: 18}
        : {x: 40, y: 34, w: 44, h: 18};
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-[#0b1220]">
      <span className="absolute top-1 left-1 z-10 rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-white/80 uppercase">
        {label}
      </span>
      <svg
        viewBox="0 0 112 72"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={0.9} fill={turbo(d.h)} opacity={0.85} />
        ))}
        <rect
          x={box.x}
          y={box.y}
          width={box.w}
          height={box.h}
          fill="none"
          stroke={CAR_COLOR}
          strokeWidth={1.2}
        />
      </svg>
    </div>
  );
}

export function MockPointCloudEditor() {
  const {t} = useLanguage();
  const m = t.mocks.pointCloud;
  const [mode, setMode] = useState<ColorMode>('height');

  const tools = [
    {icon: MousePointer2, active: false},
    {icon: Move, active: false},
    {icon: Box, active: true},
    {icon: Locate, active: false},
    {icon: Waypoints, active: false},
    {icon: Hexagon, active: false},
    {icon: Bone, active: false},
    {icon: Lasso, active: false},
    {icon: BoxSelect, active: false},
  ];

  const modes: {key: ColorMode; label: string}[] = [
    {key: 'rgb', label: m.colorModes.rgb},
    {key: 'label', label: m.colorModes.label},
    {key: 'height', label: m.colorModes.height},
    {key: 'intensity', label: m.colorModes.intensity},
  ];

  const instances = [
    {id: 1, color: CAR_COLOR, points: '4,182'},
    {id: 2, color: BUILDING_COLOR, points: '18,406'},
    {id: 3, color: '#98DF8A', points: '2,047'},
  ];

  return (
    <MockWindow>
      <MockChrome />
      {/* editor header */}
      <div className="flex h-10 items-center gap-2 border-b border-border bg-background px-3 text-xs">
        <span className="font-medium">{m.fileName}</span>
        <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          {m.pointCount}
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-muted-foreground">
          <Wand2 className="size-3.5" />
          <Ruler className="size-3.5" />
          <span className="mx-1 h-4 w-px bg-border" />
          <span className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px]">
            <Save className="size-3" />
          </span>
        </span>
      </div>

      <div className="flex h-[24rem] sm:h-[27rem]">
        {/* tool sidebar */}
        <div className="flex w-11 shrink-0 flex-col items-center gap-0.5 border-r border-border bg-background py-2">
          {tools.map(({icon, active}, i) => (
            <MockIconButton key={i} icon={icon} active={active} />
          ))}
          <span className="mt-auto">
            <MockIconButton icon={Palette} />
          </span>
        </div>

        {/* ortho views */}
        <div className="hidden w-28 shrink-0 flex-col gap-px border-r border-border bg-border sm:flex">
          <OrthoPanel label={m.ortho.top} variant="top" />
          <OrthoPanel label={m.ortho.front} variant="front" />
          <OrthoPanel label={m.ortho.side} variant="side" />
        </div>

        {/* main viewport */}
        <div className="relative min-w-0 flex-1 overflow-hidden bg-[#0b1220]">
          {/* color mode segment control */}
          <div className="absolute top-2 left-2 z-10 flex overflow-hidden rounded bg-background/90 text-[10px] shadow">
            {modes.map(({key, label}) => (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={cn(
                  'px-2 py-1',
                  mode === key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent',
                )}
              >
                {label}
              </button>
            ))}
            <span className="px-2 py-1 text-muted-foreground/50">
              {m.colorModes.texture}
            </span>
          </div>

          {/* transform gizmo toggles */}
          <div className="absolute top-2 right-2 z-10 flex gap-0.5 rounded bg-background/90 p-1 shadow">
            <span className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Move3d className="size-3.5" />
            </span>
            <span className="flex size-6 items-center justify-center rounded text-muted-foreground">
              <Rotate3d className="size-3.5" />
            </span>
            <span className="flex size-6 items-center justify-center rounded text-muted-foreground">
              <Scale3d className="size-3.5" />
            </span>
          </div>

          <svg
            viewBox="0 0 800 430"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* ground grid */}
            <g stroke="#334155" strokeWidth={0.6} opacity={0.6}>
              {Array.from({length: 9}, (_, i) => (
                <line
                  key={`h${i}`}
                  x1={0}
                  y1={160 + i * 34}
                  x2={800}
                  y2={150 + i * 34}
                />
              ))}
              {Array.from({length: 13}, (_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * 66}
                  y1={140}
                  x2={i * 66 - (i - 6) * 30}
                  y2={430}
                />
              ))}
            </g>
            {POINTS.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill={pointColor(p, mode)}
                opacity={0.9}
              />
            ))}
            <Cuboid />
          </svg>
        </div>

        {/* instances panel */}
        <aside className="hidden w-44 shrink-0 flex-col border-l border-border bg-muted/30 lg:flex">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="text-xs font-semibold">{m.objectsTitle}</span>
            <span className="text-[10px] text-muted-foreground">
              {instances.length}
            </span>
          </div>
          <ul className="space-y-0.5 p-2">
            {instances.map((ins, i) => (
              <li
                key={ins.id}
                className={cn(
                  'flex items-center gap-2 rounded border px-2 py-1.5 text-[11px]',
                  i === 0 ? 'border-primary bg-accent' : 'border-transparent',
                )}
              >
                <Swatch color={ins.color} />
                <span className="flex-1 truncate">
                  {m.instancePrefix} #{ins.id}
                </span>
                <span className="font-mono text-[9px] text-muted-foreground">
                  {ins.points}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </MockWindow>
  );
}
