import {
  ArrowLeft,
  Bone,
  Box,
  BoxSelect,
  Boxes as BoxesIcon,
  Eye,
  FileUp,
  Hexagon,
  Lasso,
  Locate,
  MessageSquarePlus,
  MessagesSquare,
  MousePointer2,
  Move,
  Move3d,
  Palette,
  Redo2,
  Rotate3d,
  Ruler,
  Save,
  Scale3d,
  Shapes,
  SlidersHorizontal,
  Tags,
  Undo2,
  Waypoints,
} from 'lucide-react';
import {useEffect, useMemo, useRef, useState} from 'react';

import {
  MockChrome,
  MockIconButton,
  MockWindow,
  Swatch,
} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Real LiDAR frame from PandaSet (CC0) — sequence 001, frame 40, downsampled
 * to 60k points and quantized. Per-point semantic labels and cuboids are the
 * dataset's real annotations; colors follow the app's SemanticKITTI-style
 * class palette.
 */
const POINTS_URL = '/mockdata/pandaset-points.bin';
const META_URL = '/mockdata/pandaset-meta.json';

/** PandaSet semseg class id → app palette hex. */
const LABEL_COLORS: Record<number, string> = {
  4: '#6E6E6E', // Reflection
  5: '#00AF00', // Vegetation
  6: '#96F050', // Ground
  7: '#FF00FF', // Road
  8: '#FF96FF', // Lane line marking
  9: '#FF96FF', // Stop line marking
  10: '#FF96FF', // Other road marking
  11: '#4B004B', // Sidewalk
  13: '#6496F5', // Car
  14: '#501EB4', // Pickup truck
  18: '#1E3C96', // Motorcycle
  19: '#FF3CDC', // Construction vehicle
  20: '#FF3CDC', // Other vehicle
  24: '#FF8C1E', // Personal mobility device
  30: '#FF1E1E', // Pedestrian
  36: '#FF0000', // Signs
  37: '#FF7828', // Cones
  38: '#FF7828', // Construction signs
  41: '#FFC800', // Building
  42: '#969696', // Other static object
};

const CUBOID_COLORS: Record<string, string> = {
  Car: '#6496F5',
  'Pickup Truck': '#501EB4',
  Pedestrian: '#FF1E1E',
  Motorcycle: '#1E3C96',
};

const CUBOID_LABELS = new Set(Object.keys(CUBOID_COLORS));
const SELECTED_CUBOID = 40;

/** Turbo colormap stops (same ramp as mock-ui's `turbo`, interpolated). */
const TURBO_STOPS: [number, number, number][] = [
  [0x30, 0x12, 0x3b],
  [0x46, 0x69, 0xdb],
  [0x26, 0xbc, 0xe1],
  [0x72, 0xfe, 0x5e],
  [0xd3, 0xe8, 0x35],
  [0xfb, 0x7e, 0x21],
  [0xd9, 0x38, 0x07],
];

function turboSmooth(t: number): string {
  const x = Math.min(1, Math.max(0, t)) * (TURBO_STOPS.length - 1);
  const i = Math.min(TURBO_STOPS.length - 2, Math.floor(x));
  const f = x - i;
  const a = TURBO_STOPS[i];
  const b = TURBO_STOPS[i + 1];
  const r = Math.round(a[0] + (b[0] - a[0]) * f);
  const g = Math.round(a[1] + (b[1] - a[1]) * f);
  const bl = Math.round(a[2] + (b[2] - a[2]) * f);
  return `rgb(${r},${g},${bl})`;
}

type CloudMeta = {
  count: number;
  scale: number;
  classes: {id: number; src: number; name: string; count: number}[];
  cuboids: Cuboid[];
};

type Cuboid = {
  id: number;
  label: string;
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;
  yaw: number;
  pts: number;
};

type Cloud = {
  pos: Float32Array;
  inten: Uint8Array;
  cls: Uint8Array;
  count: number;
  meta: CloudMeta;
};

function useCloud(): Cloud | null {
  const [cloud, setCloud] = useState<Cloud | null>(null);
  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch(POINTS_URL).then(r => r.arrayBuffer()),
      fetch(META_URL).then(r => r.json() as Promise<CloudMeta>),
    ])
      .then(([buf, meta]) => {
        if (!alive) {
          return;
        }
        const count = Math.floor(buf.byteLength / 8);
        const dv = new DataView(buf);
        const pos = new Float32Array(count * 3);
        const inten = new Uint8Array(count);
        const cls = new Uint8Array(count);
        for (let i = 0; i < count; i++) {
          const o = i * 8;
          pos[i * 3] = dv.getInt16(o, true) * meta.scale;
          pos[i * 3 + 1] = dv.getInt16(o + 2, true) * meta.scale;
          pos[i * 3 + 2] = dv.getInt16(o + 4, true) * meta.scale;
          inten[i] = dv.getUint8(o + 6);
          cls[i] = dv.getUint8(o + 7);
        }
        setCloud({pos, inten, cls, count, meta});
      })
      .catch(() => {
        /* mock stays empty when assets are unavailable */
      });
    return () => {
      alive = false;
    };
  }, []);
  return cloud;
}

type ColorMode = 'label' | 'height' | 'intensity';

const HEIGHT_BINS = 32;

/** Per-point color bucket index + bucket color table for the given mode. */
function buildColors(
  cloud: Cloud,
  mode: ColorMode,
): {index: Uint8Array; table: string[]} {
  const {pos, inten, cls, count, meta} = cloud;
  if (mode === 'label') {
    const table = meta.classes.map(c => LABEL_COLORS[c.src] ?? '#808080');
    return {index: cls, table};
  }
  const index = new Uint8Array(count);
  const table = Array.from({length: HEIGHT_BINS}, (_, i) =>
    turboSmooth(i / (HEIGHT_BINS - 1)),
  );
  for (let i = 0; i < count; i++) {
    const t = mode === 'height' ? (pos[i * 3 + 2] + 2.5) / 9 : inten[i] / 200;
    index[i] = Math.max(
      0,
      Math.min(HEIGHT_BINS - 1, Math.round(t * (HEIGHT_BINS - 1))),
    );
  }
  return {index, table};
}

/** Rotated cuboid corners in world space (yaw about +z). */
function cuboidCorners(c: Cuboid): [number, number, number][] {
  const cos = Math.cos(c.yaw);
  const sin = Math.sin(c.yaw);
  const out: [number, number, number][] = [];
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const lx = (sx * c.dx) / 2;
        const ly = (sy * c.dy) / 2;
        out.push([
          c.x + lx * cos - ly * sin,
          c.y + lx * sin + ly * cos,
          c.z + (sz * c.dz) / 2,
        ]);
      }
    }
  }
  return out;
}

/** Edge pairs for the corner ordering produced by `cuboidCorners`. */
const CUBOID_EDGES: [number, number][] = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
  [0, 2],
  [1, 3],
  [4, 6],
  [5, 7],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

function setupCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (w === 0 || h === 0) {
    return null;
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return null;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = '#0b1220';
  ctx.fillRect(0, 0, w, h);
  return ctx;
}

/** Perspective view from behind/above the ego vehicle (forward = +y). */
function drawMain(
  canvas: HTMLCanvasElement,
  cloud: Cloud,
  colors: {index: Uint8Array; table: string[]},
) {
  const ctx = setupCanvas(canvas);
  if (!ctx) {
    return;
  }
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const fl = h * 0.9;
  // camera at (0,-26,15) looking at (0,10,0); precomputed orthonormal basis
  const upY = 0.385;
  const upZ = 0.923;
  const fwY = 0.923;
  const fwZ = -0.385;

  const project = (
    x: number,
    y: number,
    z: number,
  ): [number, number, number] | null => {
    const dy = y + 26;
    const dz = z - 15;
    const zc = fwY * dy + fwZ * dz;
    if (zc < 2 || zc > 95) {
      return null;
    }
    const yc = upY * dy + upZ * dz;
    return [w / 2 + (fl * x) / zc, h / 2 - (fl * yc) / zc, zc];
  };

  const {pos, count} = cloud;
  const buckets: number[][] = Array.from({length: colors.table.length}, () => []);
  for (let i = 0; i < count; i++) {
    buckets[colors.index[i]].push(i);
  }
  for (let b = 0; b < buckets.length; b++) {
    ctx.fillStyle = colors.table[b];
    const list = buckets[b];
    for (const i of list) {
      const p = project(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
      if (!p) {
        continue;
      }
      const s = Math.min(3.2, Math.max(1, 150 / p[2]));
      ctx.fillRect(p[0] - s / 2, p[1] - s / 2, s, s);
    }
  }

  for (const c of cloud.meta.cuboids) {
    if (!CUBOID_LABELS.has(c.label) || c.pts < 40) {
      continue;
    }
    const selected = c.id === SELECTED_CUBOID;
    const corners = cuboidCorners(c).map(([x, y, z]) => project(x, y, z));
    if (corners.some(p => p === null)) {
      continue;
    }
    ctx.strokeStyle = selected ? '#a9c4fa' : (CUBOID_COLORS[c.label] ?? '#FFC800');
    ctx.lineWidth = selected ? 2 : 1.1;
    ctx.globalAlpha = selected ? 1 : 0.85;
    ctx.beginPath();
    for (const [a, b] of CUBOID_EDGES) {
      const pa = corners[a] as [number, number, number];
      const pb = corners[b] as [number, number, number];
      ctx.moveTo(pa[0], pa[1]);
      ctx.lineTo(pb[0], pb[1]);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

type OrthoAxis = 'top' | 'front' | 'side';

/** Orthographic slice centered on the selected cuboid (like the app's
 * TOP/FRONT/SIDE panels used to fine-tune a box). */
function drawOrtho(
  canvas: HTMLCanvasElement,
  cloud: Cloud,
  colors: {index: Uint8Array; table: string[]},
  axis: OrthoAxis,
) {
  const ctx = setupCanvas(canvas);
  if (!ctx) {
    return;
  }
  const sel = cloud.meta.cuboids.find(c => c.id === SELECTED_CUBOID);
  if (!sel) {
    return;
  }
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  const halfU =
    axis === 'side'
      ? sel.dy * 0.9 + 1.2
      : sel.dx * 0.9 + Math.abs(Math.sin(sel.yaw)) * sel.dy + 1.2;
  const halfV =
    axis === 'top'
      ? sel.dy * 0.9 + Math.abs(Math.sin(sel.yaw)) * sel.dx + 1.2
      : sel.dz * 0.9 + 0.9;
  const scale = Math.min(w / (2 * halfU), h / (2 * halfV)) * 0.9;

  const uv = (x: number, y: number, z: number): [number, number] | null => {
    let u: number;
    let v: number;
    let slab: number;
    let slabHalf: number;
    if (axis === 'top') {
      u = x - sel.x;
      v = y - sel.y;
      slab = z - sel.z;
      slabHalf = sel.dz / 2 + 0.7;
    } else if (axis === 'front') {
      u = x - sel.x;
      v = z - sel.z;
      slab = y - sel.y;
      slabHalf = sel.dy / 2 + 1;
    } else {
      u = y - sel.y;
      v = z - sel.z;
      slab = x - sel.x;
      slabHalf = sel.dx / 2 + 1;
    }
    if (Math.abs(slab) > slabHalf) {
      return null;
    }
    return [w / 2 + u * scale, h / 2 - v * scale];
  };

  const {pos, count} = cloud;
  for (let i = 0; i < count; i++) {
    const p = uv(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
    if (!p) {
      continue;
    }
    ctx.fillStyle = colors.table[colors.index[i]];
    ctx.fillRect(p[0] - 1, p[1] - 1, 2, 2);
  }

  // cuboid outline (+ drag handles on the BEV, like the app)
  ctx.strokeStyle = '#a9c4fa';
  ctx.lineWidth = 1.5;
  if (axis === 'top') {
    const cos = Math.cos(sel.yaw);
    const sin = Math.sin(sel.yaw);
    const corners: [number, number][] = [
      [-sel.dx / 2, -sel.dy / 2],
      [sel.dx / 2, -sel.dy / 2],
      [sel.dx / 2, sel.dy / 2],
      [-sel.dx / 2, sel.dy / 2],
    ].map(([lx, ly]) => [
      w / 2 + (lx * cos - ly * sin) * scale,
      h / 2 - (lx * sin + ly * cos) * scale,
    ]);
    ctx.beginPath();
    corners.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = '#a9c4fa';
    for (const [x, y] of corners) {
      ctx.fillRect(x - 2, y - 2, 4, 4);
    }
  } else {
    const width =
      axis === 'front'
        ? Math.abs(sel.dx * Math.cos(sel.yaw)) + Math.abs(sel.dy * Math.sin(sel.yaw))
        : Math.abs(sel.dy * Math.cos(sel.yaw)) + Math.abs(sel.dx * Math.sin(sel.yaw));
    ctx.strokeRect(
      w / 2 - (width * scale) / 2,
      h / 2 - (sel.dz * scale) / 2,
      width * scale,
      sel.dz * scale,
    );
  }
}

const ORTHO_AXES: OrthoAxis[] = ['top', 'front', 'side'];

export function MockPointCloudEditor() {
  const {t} = useLanguage();
  const m = t.mocks.pointCloud;
  const e = t.mocks.editor;
  const cloud = useCloud();
  const [mode, setMode] = useState<ColorMode>('label');
  const mainRef = useRef<HTMLCanvasElement>(null);
  const orthoRefs = useRef<(HTMLCanvasElement | null)[]>([null, null, null]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [, setResizeTick] = useState(0);

  const colors = useMemo(
    () => (cloud ? buildColors(cloud, mode) : null),
    [cloud, mode],
  );

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) {
      return;
    }
    const observer = new ResizeObserver(() => setResizeTick(n => n + 1));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!cloud || !colors) {
      return;
    }
    if (mainRef.current) {
      drawMain(mainRef.current, cloud, colors);
    }
    orthoRefs.current.forEach((canvas, i) => {
      if (canvas) {
        drawOrtho(canvas, cloud, colors, ORTHO_AXES[i]);
      }
    });
  });

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
    {icon: MessageSquarePlus, active: false},
  ];

  const tabs = [
    {icon: BoxesIcon, label: e.tabObjects, active: true},
    {icon: SlidersHorizontal, label: e.tabProperties, active: false},
    {icon: Shapes, label: e.tabClasses, active: false},
    {icon: Tags, label: e.tabTags, active: false},
    {icon: MessagesSquare, label: e.tabIssues, active: false},
  ];

  const modes: {key: ColorMode; label: string}[] = [
    {key: 'label', label: m.colorModes.label},
    {key: 'height', label: m.colorModes.height},
    {key: 'intensity', label: m.colorModes.intensity},
  ];

  const cuboids = cloud
    ? (() => {
        const byPts = [...cloud.meta.cuboids].sort((a, b) => b.pts - a.pts);
        const cars = byPts.filter(c => c.label === 'Car').slice(0, 4);
        const truck = byPts.find(c => c.label === 'Pickup Truck');
        const ped = byPts.find(c => c.label === 'Pedestrian');
        return [...cars, truck, ped].filter((c): c is Cuboid => Boolean(c));
      })()
    : [];

  const classSummary = cloud
    ? [...cloud.meta.classes].sort((a, b) => b.count - a.count).slice(0, 5)
    : [];

  return (
    <MockWindow>
      <MockChrome />
      {/* editor header */}
      <div className="flex h-10 items-center gap-2 border-b border-border bg-background px-3 text-xs">
        <ArrowLeft className="size-3.5 text-muted-foreground" />
        <span className="font-medium">{m.fileName}</span>
        <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          {m.pointCount}
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-muted-foreground">
          <FileUp className="size-3.5" />
          <Ruler className="size-3.5" />
          <span className="mx-1 h-4 w-px bg-border" />
          <Undo2 className="size-3.5" />
          <Redo2 className="size-3.5 opacity-50" />
          <span className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px]">
            <Save className="size-3" />
            {e.saved}
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

        {/* ortho views (selected cuboid) */}
        <div className="hidden w-28 shrink-0 flex-col gap-px border-r border-border bg-border sm:flex">
          {ORTHO_AXES.map((axis, i) => (
            <div
              key={axis}
              className="relative min-h-0 flex-1 overflow-hidden bg-[#0b1220]"
            >
              <span className="absolute top-1 left-1 z-10 rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-white/80 uppercase">
                {m.ortho[axis]}
              </span>
              <canvas
                ref={el => {
                  orthoRefs.current[i] = el;
                }}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>

        {/* main perspective viewport */}
        <div
          ref={wrapRef}
          className="relative min-w-0 flex-1 overflow-hidden bg-[#0b1220]"
        >
          {/* color mode segment control */}
          <div className="absolute top-2 left-2 z-10 flex overflow-hidden rounded bg-background/90 text-[10px] shadow">
            <span className="px-2 py-1 text-muted-foreground/50">
              {m.colorModes.rgb}
            </span>
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

          <canvas ref={mainRef} className="h-full w-full" />
        </div>

        {/* objects panel */}
        <aside className="hidden w-48 shrink-0 flex-col border-l border-border bg-muted/30 lg:flex">
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
            <span className="text-xs font-semibold">{m.objectsTitle}</span>
            <span className="text-[10px] text-muted-foreground">
              {cloud?.meta.cuboids.length ?? 0}
            </span>
          </div>
          <ul className="min-h-0 flex-1 space-y-0.5 overflow-hidden px-2">
            {cuboids.map(c => (
              <li
                key={c.id}
                className={cn(
                  'flex items-center gap-2 rounded border px-2 py-1.5 text-[11px]',
                  c.id === SELECTED_CUBOID
                    ? 'border-primary bg-accent'
                    : 'border-transparent',
                )}
              >
                <Swatch color={CUBOID_COLORS[c.label] ?? '#FFC800'} />
                <Box className="size-3 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate">{c.label}</span>
                <span className="font-mono text-[9px] text-muted-foreground">
                  {m.pointsSuffix(c.pts.toLocaleString())}
                </span>
                <Eye className="size-3 shrink-0 text-muted-foreground" />
              </li>
            ))}
          </ul>
          <div className="border-t border-border px-3 py-2">
            <span className="text-[9px] tracking-wider text-muted-foreground uppercase">
              {m.classesTitle}
            </span>
            <ul className="mt-1 space-y-0.5">
              {classSummary.map(c => (
                <li key={c.id} className="flex items-center gap-1.5 text-[10px]">
                  <Swatch color={LABEL_COLORS[c.src] ?? '#808080'} />
                  <span className="flex-1 truncate text-muted-foreground">
                    {c.name}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground">
                    {c.count.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </MockWindow>
  );
}
