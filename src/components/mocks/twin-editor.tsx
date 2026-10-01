import {
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyCenter,
  ArrowDownToLine,
  Bot,
  Camera,
  ChevronDown,
  Copy,
  Eye,
  EyeOff,
  Forklift,
  HardHat,
  ImageIcon,
  Lock,
  LockOpen,
  Magnet,
  Monitor,
  Move3d,
  PenLine,
  Plus,
  Redo2,
  RotateCw,
  Ruler,
  Save,
  Scaling,
  Search,
  Sun,
  Trash2,
  Undo2,
  type LucideIcon,
} from 'lucide-react';
import type {ReactNode} from 'react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Digital twin scene editor (`/proj/:id/twin/:sceneId/edit`): asset browser
 * (catalog tab, search, category chips, asset tiles) | `TwinCanvas` with the
 * transform toolbar, selection toolbar and view menu | scene tree, binding
 * panel and node inspector. The 3D viewport is an isometric SVG rendering of
 * a welding cell on the canvas' `#0b1220` background.
 */

const COPY = {
  ko: {
    scene: '용접 셀 A동',
    unsaved: '저장하지 않은 변경',
    backToList: '씬 목록',
    save: '저장',
    catalog: '카탈로그',
    projectModels: '프로젝트 모델',
    searchAssets: '에셋 검색',
    all: '전체',
    categories: [
      '컨베이어',
      '보관',
      '기계',
      '로봇',
      '차량',
      '구조물',
      '센서',
      '소품',
      '사람',
      '환경',
    ],
    groups: {robot: '로봇', machine: '기계', vehicle: '차량', person: '사람'},
    assets: {
      robotArm: '로봇 암',
      cobotArm: '협동로봇',
      weldingGantry: '겐트리 용접 시스템',
      weldingPositioner: '용접 포지셔너',
      agvCart: 'AGV 대차',
      conveyorBelt: '벨트 컨베이어',
      worker: '작업자',
      displayPanel: '디스플레이 패널',
    },
    sceneTree: (n: number) => `오브젝트 (${n})`,
    nodes: [
      '하늘·조명',
      '바닥',
      '로봇 암 R1',
      '용접 포지셔너 P1',
      '벨트 컨베이어 C1',
      'AGV 대차 02',
      '안전 펜스',
      '작업자',
      '디스플레이 패널',
    ],
    bindings: (n: number) => `바인딩 (${n})`,
    add: '추가',
    modbus: 'Modbus 레지스터',
    memory: '메모리 리전',
    connector: '커넥터',
    area: '레지스터 영역',
    address: '레지스터 주소',
    memoryMap: '메모리 맵',
    region: '리전',
    name: '이름',
    position: '위치',
    rotation: '회전',
    scale: '크기',
    parameters: '파라미터',
    reach: '리치 (m)',
    joint: (n: number) => `${n}축 (deg)`,
    tool: '엔드 이펙터',
    welder: '용접 토치',
    tools: {move: '이동', rotate: '회전', scale: '크기 조절', snap: '스냅'},
  },
  en: {
    scene: 'Welding cell A',
    unsaved: 'Unsaved changes',
    backToList: 'Back to scenes',
    save: 'Save',
    catalog: 'Catalog',
    projectModels: 'Project models',
    searchAssets: 'Search assets',
    all: 'All',
    categories: [
      'Conveyors',
      'Storage',
      'Machines',
      'Robots',
      'Vehicles',
      'Infrastructure',
      'Sensors',
      'Props',
      'People',
      'Environment',
    ],
    groups: {
      robot: 'Robots',
      machine: 'Machines',
      vehicle: 'Vehicles',
      person: 'People',
    },
    assets: {
      robotArm: 'Robot arm',
      cobotArm: 'Collaborative robot',
      weldingGantry: 'Welding gantry',
      weldingPositioner: 'Welding positioner',
      agvCart: 'AGV cart',
      conveyorBelt: 'Belt conveyor',
      worker: 'Worker',
      displayPanel: 'Display panel',
    },
    sceneTree: (n: number) => `Objects (${n})`,
    nodes: [
      'Sky & lighting',
      'Floor',
      'Robot arm R1',
      'Welding positioner P1',
      'Belt conveyor C1',
      'AGV cart 02',
      'Safety fence',
      'Worker',
      'Display panel',
    ],
    bindings: (n: number) => `Bindings (${n})`,
    add: 'Add',
    modbus: 'Modbus register',
    memory: 'Memory region',
    connector: 'Connector',
    area: 'Register area',
    address: 'Register address',
    memoryMap: 'Memory map',
    region: 'Region',
    name: 'Name',
    position: 'Position',
    rotation: 'Rotation',
    scale: 'Scale',
    parameters: 'Parameters',
    reach: 'Reach (m)',
    joint: (n: number) => `Joint ${n} (deg)`,
    tool: 'End effector',
    welder: 'Weld torch',
    tools: {move: 'Move', rotate: 'Rotate', scale: 'Scale', snap: 'Snap'},
  },
} as const;

type C = (typeof COPY)['ko' | 'en'];

/* ------------------------------------------------------------------ */
/* isometric scene                                                     */
/* ------------------------------------------------------------------ */

const S = 31;
const O = {x: 318, y: 58};

/** World (x, y on the floor, z up, metres) → screen. */
function P(x: number, y: number, z = 0): [number, number] {
  return [O.x + (x - y) * 0.866 * S, O.y + (x + y) * 0.5 * S - z * S];
}
const pts = (...ps: [number, number][]) => ps.map(p => p.join(',')).join(' ');

type Shade = [top: string, left: string, right: string];

function Box({
  x,
  y,
  z = 0,
  w,
  d,
  h,
  c,
  opacity,
}: {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  c: Shade;
  opacity?: number;
}) {
  return (
    <g opacity={opacity} strokeLinejoin="round">
      <polygon
        points={pts(
          P(x, y + d, z),
          P(x + w, y + d, z),
          P(x + w, y + d, z + h),
          P(x, y + d, z + h),
        )}
        fill={c[1]}
      />
      <polygon
        points={pts(
          P(x + w, y, z),
          P(x + w, y + d, z),
          P(x + w, y + d, z + h),
          P(x + w, y, z + h),
        )}
        fill={c[2]}
      />
      <polygon
        points={pts(
          P(x, y, z + h),
          P(x + w, y, z + h),
          P(x + w, y + d, z + h),
          P(x, y + d, z + h),
        )}
        fill={c[0]}
      />
    </g>
  );
}

const STEEL: Shade = ['#aab3bf', '#77818e', '#5a636f'];
const DARK: Shade = ['#3a414c', '#262c35', '#1c2129'];
const BLUE: Shade = ['#6f8fb8', '#4a6a94', '#36516f'];
const YELLOW: Shade = ['#fde047', '#eab308', '#b88a06'];
const CARTON: Shade = ['#d7b07a', '#b58a52', '#916b3c'];

function Link3({
  a,
  b,
  width,
  color,
  shade,
}: {
  a: [number, number, number];
  b: [number, number, number];
  width: number;
  color: string;
  shade: string;
}) {
  const [x1, y1] = P(...a);
  const [x2, y2] = P(...b);
  return (
    <g strokeLinecap="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={shade} strokeWidth={width} />
      <line
        x1={x1 - 1}
        y1={y1 - 1.5}
        x2={x2 - 1}
        y2={y2 - 1.5}
        stroke={color}
        strokeWidth={width * 0.6}
      />
    </g>
  );
}

function Joint({at, r}: {at: [number, number, number]; r: number}) {
  const [x, y] = P(...at);
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#2a2f38" />
      <circle cx={x - r * 0.25} cy={y - r * 0.25} r={r * 0.45} fill="#4b5361" />
    </g>
  );
}

function Arrow({
  from,
  to,
  color,
}: {
  from: [number, number];
  to: [number, number];
  color: string;
}) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const base: [number, number] = [to[0] - ux * 11, to[1] - uy * 11];
  const nx = -uy * 4.5;
  const ny = ux * 4.5;
  return (
    <g>
      <line
        x1={from[0]}
        y1={from[1]}
        x2={base[0]}
        y2={base[1]}
        stroke={color}
        strokeWidth={2.4}
      />
      <polygon
        points={pts(to, [base[0] + nx, base[1] + ny], [base[0] - nx, base[1] - ny])}
        fill={color}
      />
    </g>
  );
}

function Scene() {
  // robot joint chain reaching toward the positioner
  const chain: [number, number, number][] = [
    [6.2, 3.3, 0.6],
    [6.2, 3.3, 1.05],
    [5.95, 3.15, 2.4],
    [7.75, 4.15, 2.15],
    [8.3, 4.55, 1.72],
  ];
  const tip = P(8.62, 4.86, 1.3);
  const origin = P(6.2, 3.3, 0);

  return (
    <svg
      viewBox="30 30 630 390"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
    >
      <defs>
        <radialGradient id="twin-bg" cx="50%" cy="38%" r="75%">
          <stop offset="0" stopColor="#1a2640" />
          <stop offset="1" stopColor="#0b1220" />
        </radialGradient>
        <linearGradient id="twin-floor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b4453" />
          <stop offset="0.55" stopColor="#2c3441" />
          <stop offset="1" stopColor="#1f2530" />
        </linearGradient>
        <radialGradient id="twin-spark">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.25" stopColor="#bfe3ff" />
          <stop offset="0.6" stopColor="#60a5fa" stopOpacity="0.5" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="twin-light" cx="45%" cy="45%" r="55%">
          <stop offset="0" stopColor="#fff7e6" stopOpacity="0.16" />
          <stop offset="1" stopColor="#fff7e6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="660" height="420" fill="url(#twin-bg)" />

      {/* floor + grid */}
      <polygon
        points={pts(P(0, 0), P(12, 0), P(12, 10), P(0, 10))}
        fill="url(#twin-floor)"
      />
      <g stroke="#ffffff" strokeOpacity="0.07" strokeWidth="0.8">
        {Array.from({length: 13}, (_, i) => (
          <line
            key={`x${i}`}
            x1={P(i, 0)[0]}
            y1={P(i, 0)[1]}
            x2={P(i, 10)[0]}
            y2={P(i, 10)[1]}
          />
        ))}
        {Array.from({length: 11}, (_, i) => (
          <line
            key={`y${i}`}
            x1={P(0, i)[0]}
            y1={P(0, i)[1]}
            x2={P(12, i)[0]}
            y2={P(12, i)[1]}
          />
        ))}
      </g>
      <polygon
        points={pts(P(0, 0), P(12, 0), P(12, 10), P(0, 10))}
        fill="url(#twin-light)"
      />

      {/* floor markings: AGV lane + robot safety zone */}
      <g fill="none" stroke="#facc15" strokeOpacity="0.55" strokeWidth="1.6">
        <polyline points={pts(P(0.4, 1.7), P(4.2, 1.7))} strokeDasharray="8 6" />
        <polyline points={pts(P(0.4, 3.4), P(4.2, 3.4))} strokeDasharray="8 6" />
        <polygon
          points={pts(P(4.8, 2.6), P(10, 2.6), P(10, 6.1), P(4.8, 6.1))}
          strokeDasharray="5 4"
        />
      </g>

      {/* AGV cart */}
      <Box x={1.6} y={2.05} z={0.05} w={1.4} d={0.9} h={0.28} c={YELLOW} />
      <polyline
        points={pts(P(1.6, 2.95, 0.12), P(3.0, 2.95, 0.12))}
        stroke="#1c1917"
        strokeWidth="2.5"
        strokeDasharray="5 4"
      />
      <Box x={1.8} y={2.2} z={0.33} w={1.0} d={0.6} h={0.05} c={STEEL} />
      <Box
        x={2.0}
        y={2.3}
        z={0.38}
        w={0.55}
        d={0.4}
        h={0.35}
        c={['#60a5fa', '#2563eb', '#1d4ed8']}
      />
      <circle
        cx={P(2.3, 2.5, 0.85)[0]}
        cy={P(2.3, 2.5, 0.85)[1]}
        r="2.6"
        fill="#22c55e"
      />

      {/* safety fence (mesh panels on the back two sides of the cell) */}
      <g>
        <polygon
          points={pts(P(4.6, 2.4), P(10.2, 2.4), P(10.2, 2.4, 1.7), P(4.6, 2.4, 1.7))}
          fill="#facc15"
          fillOpacity="0.07"
          stroke="#facc15"
          strokeOpacity="0.35"
        />
        <polygon
          points={pts(P(4.6, 2.4), P(4.6, 6.2), P(4.6, 6.2, 1.7), P(4.6, 2.4, 1.7))}
          fill="#facc15"
          fillOpacity="0.07"
          stroke="#facc15"
          strokeOpacity="0.35"
        />
        {[4.6, 6.0, 7.4, 8.8, 10.2].map(x => (
          <Box
            key={`fx${x}`}
            x={x - 0.04}
            y={2.36}
            w={0.08}
            d={0.08}
            h={1.7}
            c={YELLOW}
          />
        ))}
        {[3.7, 5.0, 6.2].map(y => (
          <Box
            key={`fy${y}`}
            x={4.56}
            y={y - 0.04}
            w={0.08}
            d={0.08}
            h={1.7}
            c={YELLOW}
          />
        ))}
      </g>

      {/* robot arm R1 (selected) */}
      <Box x={5.75} y={2.85} w={0.9} d={0.9} h={0.45} c={DARK} />
      <ellipse
        cx={P(6.2, 3.3, 0.6)[0]}
        cy={P(6.2, 3.3, 0.6)[1]}
        rx="19"
        ry="10"
        fill="#f08c1a"
      />
      <ellipse
        cx={P(6.2, 3.3, 0.68)[0]}
        cy={P(6.2, 3.3, 0.68)[1]}
        rx="16"
        ry="8.5"
        fill="#fdba4d"
      />
      {/* display panel on stand */}
      <Box x={10.9} y={0.9} w={0.08} d={0.08} h={1.0} c={DARK} />
      <Box x={10.1} y={0.7} w={1.7} d={0.1} h={1.0} z={1.0} c={DARK} />
      <polygon
        points={pts(
          P(10.18, 0.8, 1.07),
          P(11.72, 0.8, 1.07),
          P(11.72, 0.8, 1.93),
          P(10.18, 0.8, 1.93),
        )}
        fill="#07101f"
      />
      <polyline
        points={pts(
          ...[0.2, 0.45, 0.35, 0.6, 0.5, 0.72, 0.62, 0.8].map(
            (v, i) => P(10.3 + i * 0.19, 0.8, 1.15 + v * 0.65) as [number, number],
          ),
        )}
        fill="none"
        stroke="#34d399"
        strokeWidth="1.6"
      />
      {[0.3, 0.55, 0.42].map((v, i) => (
        <polygon
          key={i}
          points={pts(
            P(10.3 + i * 0.22, 0.8, 1.12),
            P(10.45 + i * 0.22, 0.8, 1.12),
            P(10.45 + i * 0.22, 0.8, 1.12 + v * 0.4),
            P(10.3 + i * 0.22, 0.8, 1.12 + v * 0.4),
          )}
          fill="#38bdf8"
          fillOpacity="0.55"
        />
      ))}

      {/* welding positioner P1 with workpiece */}
      <Box x={8.3} y={4.55} w={1.0} d={0.9} h={0.62} c={BLUE} />
      <Box x={8.65} y={4.85} w={0.3} d={0.3} h={0.28} z={0.62} c={DARK} />
      <ellipse
        cx={P(8.8, 5.0, 1.0)[0]}
        cy={P(8.8, 5.0, 1.0)[1]}
        rx="25"
        ry="11"
        transform={`rotate(-14 ${P(8.8, 5.0, 1.0).join(' ')})`}
        fill="#8b95a3"
        stroke="#5a636f"
        strokeWidth="1.5"
      />
      <Box x={8.45} y={4.75} w={0.7} d={0.45} h={0.22} z={1.02} c={STEEL} />

      {/* robot arm links (after the positioner so the torch stays in front) */}
      <Link3 a={chain[0]} b={chain[1]} width={22} color="#fdba4d" shade="#c96a0c" />
      <Link3 a={chain[1]} b={chain[2]} width={17} color="#fbbf24" shade="#c96a0c" />
      <Link3 a={chain[2]} b={chain[3]} width={13} color="#fbbf24" shade="#c96a0c" />
      <Link3 a={chain[3]} b={chain[4]} width={9} color="#fdba4d" shade="#b45309" />
      <line
        x1={P(...chain[4])[0]}
        y1={P(...chain[4])[1]}
        x2={tip[0]}
        y2={tip[1]}
        stroke="#9ca3af"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Joint at={chain[1]} r={8.5} />
      <Joint at={chain[2]} r={7} />
      <Joint at={chain[3]} r={5.5} />
      <Joint at={chain[4]} r={4} />
      <circle cx={tip[0]} cy={tip[1]} r="16" fill="url(#twin-spark)" />
      <circle cx={tip[0]} cy={tip[1]} r="2.2" fill="#ffffff" />
      {/* selection box helper */}
      <g fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.85">
        <polygon points={pts(P(5.6, 2.7), P(8.8, 2.7), P(8.8, 5.0), P(5.6, 5.0))} />
        <polygon
          points={pts(
            P(5.6, 2.7, 2.6),
            P(8.8, 2.7, 2.6),
            P(8.8, 5.0, 2.6),
            P(5.6, 5.0, 2.6),
          )}
        />
        {(
          [
            [5.6, 2.7],
            [8.8, 2.7],
            [8.8, 5.0],
            [5.6, 5.0],
          ] as const
        ).map(([x, y]) => (
          <line
            key={`${x}${y}`}
            x1={P(x, y)[0]}
            y1={P(x, y)[1]}
            x2={P(x, y, 2.6)[0]}
            y2={P(x, y, 2.6)[1]}
          />
        ))}
      </g>

      {/* belt conveyor C1 with cartons */}
      {[1.3, 3.9, 6.8].map(x => (
        <Box key={x} x={x} y={6.7} w={0.1} d={0.7} h={0.55} c={DARK} />
      ))}
      <Box x={1.2} y={6.6} z={0.55} w={6} d={0.9} h={0.22} c={STEEL} />
      <polygon
        points={pts(
          P(1.28, 6.66, 0.78),
          P(7.12, 6.66, 0.78),
          P(7.12, 7.44, 0.78),
          P(1.28, 7.44, 0.78),
        )}
        fill="#222831"
      />
      <g stroke="#ffffff" strokeOpacity="0.08">
        {Array.from({length: 14}, (_, i) => (
          <line
            key={i}
            x1={P(1.5 + i * 0.4, 6.66, 0.78)[0]}
            y1={P(1.5 + i * 0.4, 6.66, 0.78)[1]}
            x2={P(1.5 + i * 0.4, 7.44, 0.78)[0]}
            y2={P(1.5 + i * 0.4, 7.44, 0.78)[1]}
          />
        ))}
      </g>
      <Box x={2.2} y={6.8} z={0.78} w={0.6} d={0.5} h={0.4} c={CARTON} />
      <Box x={4.6} y={6.75} z={0.78} w={0.7} d={0.6} h={0.45} c={CARTON} />

      {/* worker */}
      <g transform={`translate(${P(4.9, 8.7).join(' ')})`}>
        <ellipse cx="0" cy="1" rx="9" ry="3.5" fill="#000" opacity="0.35" />
        <path
          d="M-3 0 L-3.5 -20 M3 0 L3.5 -20"
          stroke="#1e3a5f"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <rect x="-7" y="-39" width="14" height="21" rx="4" fill="#f97316" />
        <rect x="-7" y="-30" width="14" height="2.5" fill="#e5e7eb" />
        <path
          d="M-7 -36 L-10 -22 M7 -36 L10 -22"
          stroke="#f97316"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="0" cy="-45" r="5.5" fill="#e0b48c" />
        <path d="M-6.5 -45.5 A6.5 6.5 0 0 1 6.5 -45.5 Z" fill="#facc15" />
        <rect x="-8" y="-46.2" width="16" height="1.8" rx="0.9" fill="#eab308" />
      </g>

      {/* translate gizmo (TransformControls: X red, Y up green, Z blue) */}
      <g>
        <Arrow from={origin} to={P(7.7, 3.3, 0)} color="#ef4444" />
        <Arrow from={origin} to={P(6.2, 3.3, 1.25)} color="#22c55e" />
        <Arrow from={origin} to={P(6.2, 4.9, 0)} color="#3b82f6" />
        <polygon
          points={pts(
            P(6.45, 3.3, 0.25),
            P(6.8, 3.3, 0.25),
            P(6.8, 3.3, 0.6),
            P(6.45, 3.3, 0.6),
          )}
          fill="#3b82f6"
          fillOpacity="0.45"
        />
        <polygon
          points={pts(P(6.45, 3.55), P(6.8, 3.55), P(6.8, 3.9), P(6.45, 3.9))}
          fill="#22c55e"
          fillOpacity="0.45"
        />
        <circle cx={origin[0]} cy={origin[1]} r="3.5" fill="#fef08a" stroke="#ca8a04" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* panels                                                              */
/* ------------------------------------------------------------------ */

function ToolBtn({icon: Icon, pressed}: {icon: LucideIcon; pressed?: boolean}) {
  return (
    <span
      className={cn(
        'flex size-6 items-center justify-center rounded-md',
        pressed ? 'bg-primary text-primary-foreground' : 'text-foreground/80',
      )}
    >
      <Icon className="size-3.5" />
    </span>
  );
}

const FloatBar = ({className, children}: {className: string; children: ReactNode}) => (
  <div
    className={cn(
      'absolute flex items-center gap-0.5 rounded-lg border border-border bg-background/95 p-0.5 shadow-sm backdrop-blur',
      className,
    )}
  >
    {children}
  </div>
);

const Sep = () => <span className="mx-0.5 h-4 w-px bg-border" />;

function AssetBrowser({c}: {c: C}) {
  const groups: {label: string; items: {name: string; icon: LucideIcon}[]}[] = [
    {
      label: c.groups.robot,
      items: [
        {name: c.assets.robotArm, icon: Bot},
        {name: c.assets.cobotArm, icon: Bot},
      ],
    },
    {
      label: c.groups.machine,
      items: [
        {name: c.assets.weldingGantry, icon: Ruler},
        {name: c.assets.weldingPositioner, icon: RotateCw},
        {name: c.assets.conveyorBelt, icon: AlignHorizontalJustifyCenter},
        {name: c.assets.displayPanel, icon: Monitor},
      ],
    },
    {
      label: c.groups.vehicle,
      items: [{name: c.assets.agvCart, icon: Forklift}],
    },
    {
      label: c.groups.person,
      items: [{name: c.assets.worker, icon: HardHat}],
    },
  ];
  return (
    <aside className="hidden w-40 shrink-0 flex-col border-r border-border @3xl:flex">
      <div className="flex shrink-0 border-b border-border text-[10px]">
        <span className="flex-1 border-b-2 border-primary py-1 text-center font-medium">
          {c.catalog}
        </span>
        <span className="flex-1 border-b-2 border-transparent py-1 text-center text-muted-foreground">
          {c.projectModels}
        </span>
      </div>
      <div className="space-y-1.5 border-b border-border p-2">
        <span className="flex h-6 items-center gap-1.5 rounded-md border border-input px-1.5 text-[10px] text-muted-foreground/70">
          <Search className="size-3 text-muted-foreground" />
          {c.searchAssets}
        </span>
        <div className="flex flex-wrap gap-0.5">
          {[c.all, ...c.categories].map((label, i) => (
            <span
              key={label}
              className={cn(
                'rounded-full border px-1.5 text-[9px] leading-4',
                i === 0
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground',
              )}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-2.5 overflow-hidden p-2">
        {groups.map(group => (
          <section key={group.label}>
            <h4 className="mb-1 text-[9px] font-medium text-muted-foreground">
              {group.label}
            </h4>
            <div className="grid grid-cols-2 gap-1">
              {group.items.map(({name, icon: Icon}) => (
                <span
                  key={name}
                  className="flex flex-col gap-0.5 rounded-md border border-border p-1"
                >
                  <span className="flex h-8 items-center justify-center rounded bg-muted">
                    <Icon className="size-4 text-primary/70" />
                  </span>
                  <span className="line-clamp-2 text-[9px] leading-tight">{name}</span>
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}

function Field({children, className}: {children: ReactNode; className?: string}) {
  return (
    <span
      className={cn(
        'flex h-5 items-center rounded border border-input bg-background px-1.5 text-[9.5px] tabular-nums',
        className,
      )}
    >
      {children}
    </span>
  );
}

function Vec({label, values}: {label: string; values: string[]}) {
  return (
    <div className="space-y-0.5">
      <p className="text-[9.5px] font-medium">{label}</p>
      <div className="grid grid-cols-3 gap-1">
        {values.map((v, i) => (
          <Field key={i}>{v}</Field>
        ))}
      </div>
    </div>
  );
}

function RightPanel({c}: {c: C}) {
  const badges = ['sun', 'B', 'B', 'B', 'B', 'A', 'B', 'B', 'B'];
  return (
    <aside className="hidden w-52 shrink-0 flex-col overflow-hidden border-l border-border @4xl:flex">
      {/* scene tree */}
      <h4 className="border-b border-border px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground">
        {c.sceneTree(c.nodes.length)}
      </h4>
      <ul className="border-b border-border p-1">
        {c.nodes.map((name, i) => {
          const hidden = i === 7;
          return (
            <li
              key={name}
              className={cn(
                'flex items-center gap-1.5 rounded px-1.5 py-[3px]',
                i === 2 && 'bg-accent',
              )}
            >
              {badges[i] === 'sun' ? (
                <Sun className="size-3 shrink-0 text-muted-foreground" />
              ) : (
                <span className="rounded bg-muted px-1 text-[8.5px] text-muted-foreground">
                  {badges[i]}
                </span>
              )}
              <span
                className={cn(
                  'flex-1 truncate text-[10px]',
                  hidden && 'text-muted-foreground line-through',
                )}
              >
                {name}
              </span>
              {i === 1 && <Lock className="size-2.5 text-muted-foreground" />}
              {hidden ? (
                <EyeOff className="size-3 text-muted-foreground" />
              ) : (
                <Eye className="size-3 text-muted-foreground" />
              )}
            </li>
          );
        })}
      </ul>

      {/* bindings */}
      <div className="flex items-center justify-between border-b border-border px-2.5 py-1">
        <h4 className="text-[10px] font-medium text-muted-foreground">
          {c.bindings(2)}
        </h4>
        <MockButton icon={Plus} variant="ghost" className="h-5 px-1">
          {c.add}
        </MockButton>
      </div>
      <div className="space-y-1.5 border-b border-border p-2">
        {[
          {
            slot: 'j1',
            kind: c.modbus,
            rows: [
              [c.area, 'Holding'],
              [c.address, '40001'],
            ],
          },
          {
            slot: 'j2',
            kind: c.memory,
            rows: [
              [c.memoryMap, 'plant-a'],
              [c.region, 'holding'],
            ],
          },
        ].map(b => (
          <div key={b.slot} className="space-y-1 rounded-lg border border-border p-1.5">
            <div className="flex gap-1">
              <Field className="flex-1 justify-between font-mono">
                {b.slot}
                <ChevronDown className="size-2.5 text-muted-foreground" />
              </Field>
              <Trash2 className="size-3 self-center text-destructive" />
            </div>
            <Field className="justify-between">
              {b.kind}
              <ChevronDown className="size-2.5 text-muted-foreground" />
            </Field>
            <div className="grid grid-cols-2 gap-1">
              {b.rows.map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <p className="truncate text-[8.5px] text-muted-foreground">{k}</p>
                  <Field className="font-mono">{v}</Field>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* node inspector */}
      <div className="min-h-0 flex-1 space-y-2 overflow-hidden p-2.5">
        <div className="space-y-0.5">
          <p className="text-[9.5px] font-medium">{c.name}</p>
          <Field>{c.nodes[2]}</Field>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Eye className="size-3" />
          <LockOpen className="size-3" />
          <Trash2 className="ml-auto size-3 text-destructive" />
        </div>
        <Vec label={c.position} values={['6', '0', '3.5']} />
        <Vec label={c.rotation} values={['0', '35', '0']} />
        <Vec label={c.scale} values={['1', '1', '1']} />
        <div className="space-y-1.5 border-t border-border pt-2">
          <p className="text-[9.5px] font-medium text-muted-foreground">
            {c.parameters}
          </p>
          <div className="grid grid-cols-2 gap-x-1.5 gap-y-1">
            {[
              [c.reach, '1.4'],
              [c.joint(1), '28'],
              [c.joint(2), '-34'],
              [c.joint(3), '62'],
              [c.joint(4), '0'],
              [c.joint(5), '-45'],
              [c.joint(6), '15'],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0 space-y-0.5">
                <p className="truncate text-[8.5px]">{k}</p>
                <Field>{v}</Field>
              </div>
            ))}
          </div>
          <div className="space-y-0.5">
            <p className="text-[8.5px]">{c.tool}</p>
            <Field className="justify-between">
              {c.welder}
              <ChevronDown className="size-2.5 text-muted-foreground" />
            </Field>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MockTwinEditor() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="twin"
      crumbs={[{label: c.scene}]}
      title={c.scene}
      actions={
        <>
          <span className="hidden text-[10px] text-muted-foreground @2xl:inline">
            {c.unsaved}
          </span>
          <MockButton className="hidden @2xl:inline-flex">{c.backToList}</MockButton>
          <MockButton icon={Save} variant="default">
            {c.save}
          </MockButton>
        </>
      }
      fill
    >
      {/* the frame height comes from the sidebar; the editor fills it */}
      <div className="relative h-[24rem] @3xl:h-full @3xl:min-h-[30rem]">
        <div className="absolute inset-0 flex">
          <AssetBrowser c={c} />

          <div className="relative min-w-0 flex-1 overflow-hidden bg-[#0b1220]">
            <Scene />
            <FloatBar className="top-2 left-2">
              <ToolBtn icon={Move3d} pressed />
              <ToolBtn icon={RotateCw} />
              <ToolBtn icon={Scaling} />
              <Sep />
              <ToolBtn icon={Magnet} pressed />
              <Sep />
              <ToolBtn icon={Undo2} />
              <ToolBtn icon={Redo2} />
            </FloatBar>
            <FloatBar className="top-2 right-2">
              <ToolBtn icon={Camera} />
            </FloatBar>
            <FloatBar className="bottom-2 left-2">
              <ToolBtn icon={Copy} />
              <ToolBtn icon={ArrowDownToLine} />
              <ToolBtn icon={AlignVerticalJustifyCenter} />
              <ToolBtn icon={AlignHorizontalJustifyCenter} />
              <span className="flex size-6 items-center justify-center text-destructive">
                <Trash2 className="size-3.5" />
              </span>
              <span className="hidden items-center gap-0.5 @2xl:flex">
                <Sep />
                <ToolBtn icon={Ruler} />
                <ToolBtn icon={PenLine} />
                <ToolBtn icon={ImageIcon} />
              </span>
            </FloatBar>
          </div>

          <RightPanel c={c} />
        </div>
      </div>
    </MockAppFrame>
  );
}
