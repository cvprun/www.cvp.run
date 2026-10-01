import {
  ArrowLeft,
  Boxes as BoxesIcon,
  Brush,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleDot,
  Diamond,
  Eraser,
  Eye,
  FileJson,
  Grid3x3,
  Keyboard,
  MessageSquarePlus,
  MessagesSquare,
  MousePointer2,
  Move,
  Pentagon,
  PersonStanding,
  Redo2,
  Save,
  Settings2,
  Shapes,
  Sparkles,
  Spline,
  Square,
  Tags,
  Undo2,
  Wand2,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from 'lucide-react';

import {
  MockChrome,
  MockIconButton,
  MockWindow,
  Swatch,
} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/** Open Images V6 validation image c7b1e6f7c38fa1a0 (CC BY 2.0, iwona_kellie).
 * Boxes below are the dataset's real bounding-box annotations, scaled to the
 * 1440×1080 canvas. */
const IMAGE_URL = '/mockdata/street-hero.webp';
const IMG_W = 1440;
const IMG_H = 1080;

const CLASS_CAR = '#6496F5';
const CLASS_PERSON = '#FF1E1E';
const CLASS_TRUCK = '#501EB4';
const CLASS_LIGHT = '#FFC800';
const CLASS_SIGN = '#FF0000';

type Obj = {
  id: number;
  name: string;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
  selected?: boolean;
};

const OBJECTS: Obj[] = [
  {
    id: 1,
    name: 'car',
    color: CLASS_CAR,
    x: 1161,
    y: 749,
    w: 193,
    h: 171,
    selected: true,
  },
  {id: 2, name: 'car', color: CLASS_CAR, x: 718, y: 758, w: 68, h: 43},
  {id: 3, name: 'car', color: CLASS_CAR, x: 853, y: 761, w: 47, h: 27},
  {id: 4, name: 'car', color: CLASS_CAR, x: 968, y: 761, w: 83, h: 34},
  {id: 5, name: 'car', color: CLASS_CAR, x: 1316, y: 752, w: 45, h: 67},
  {id: 6, name: 'truck', color: CLASS_TRUCK, x: 293, y: 713, w: 256, h: 182},
  {id: 7, name: 'person', color: CLASS_PERSON, x: 482, y: 740, w: 153, h: 248},
  {id: 8, name: 'traffic-light', color: CLASS_LIGHT, x: 63, y: 11, w: 81, h: 176},
  {id: 9, name: 'traffic-light', color: CLASS_LIGHT, x: 513, y: 9, w: 81, h: 180},
  {id: 10, name: 'traffic-light', color: CLASS_LIGHT, x: 1233, y: 371, w: 101, h: 182},
  {id: 11, name: 'traffic-sign', color: CLASS_SIGN, x: 220, y: 50, w: 104, h: 117},
  {id: 12, name: 'traffic-sign', color: CLASS_SIGN, x: 340, y: 36, w: 113, h: 115},
  {id: 13, name: 'traffic-sign', color: CLASS_SIGN, x: 1352, y: 677, w: 41, h: 38},
];

const CLASS_NAMES = 'car · person · truck · traffic-light · traffic-sign';

/** Bounding box + class label, matching Konva render styles (2px stroke,
 * 4.5px when selected, class-colored label tag). Sizes are in 1440×1080
 * viewBox units (≈2.6 units per screen px at typical mock size). */
function Box({
  x,
  y,
  w,
  h,
  color,
  label,
  selected = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  label: string;
  selected?: boolean;
}) {
  const tagH = 34;
  const tagY = y >= tagH + 8 ? y - tagH - 4 : y + 6;
  const tagW = label.length * 13.5 + 18;
  const anchors: [number, number][] = [
    [x, y],
    [x + w / 2, y],
    [x + w, y],
    [x, y + h / 2],
    [x + w, y + h / 2],
    [x, y + h],
    [x + w / 2, y + h],
    [x + w, y + h],
  ];
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
        strokeWidth={selected ? 11 : 5}
      />
      {selected && (
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={3}
          strokeDasharray="16 8"
        />
      )}
      <rect
        x={x}
        y={tagY}
        width={tagW}
        height={tagH}
        rx={4}
        fill={color}
        opacity={0.85}
      />
      <text
        x={x + 9}
        y={tagY + tagH - 10}
        fontSize={24}
        fill="#ffffff"
        fontFamily="ui-sans-serif, system-ui"
      >
        {label}
      </text>
      {selected &&
        anchors.map(([ax, ay], i) => (
          <circle
            key={i}
            cx={ax}
            cy={ay}
            r={11}
            fill="#3b82f6"
            stroke="#ffffff"
            strokeWidth={3.5}
          />
        ))}
    </g>
  );
}

/** Strings the current editor chrome adds on top of `t.mocks.editor`
 * (app `annotate.*` keys). */
const COPY = {
  ko: {
    fitToScreen: '화면에 맞추기',
    autoLabel: '자동 라벨링',
    tabs: {
      objects: '오브젝트',
      classes: '클래스',
      tags: '태그',
      issues: '이슈',
      settings: '설정',
    },
  },
  en: {
    fitToScreen: 'Fit to screen',
    autoLabel: 'Auto-label',
    tabs: {
      objects: 'Objects',
      classes: 'Classes',
      tags: 'Tags',
      issues: 'Issues',
      settings: 'Settings',
    },
  },
} as const;

/** Header icon button (`Button variant="ghost" size="icon"`, h-8 → h-6). */
function HeaderIcon({
  icon: Icon,
  dim = false,
  className,
}: {
  icon: LucideIcon;
  dim?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'flex size-6 shrink-0 items-center justify-center rounded-md',
        dim ? 'text-muted-foreground/40' : 'text-muted-foreground',
        className,
      )}
    >
      <Icon className="size-3.5" />
    </span>
  );
}

export function MockImageEditor() {
  const {t, lang} = useLanguage();
  const m = t.mocks.editor;
  const c = COPY[lang];

  // `EDITOR_KIND_TOOLS.image`, rendered in TOOL_DEFS order:
  // V M P R O E L G B X K W C.
  const tools = [
    {icon: MousePointer2, active: false},
    {icon: Move, active: false},
    {icon: CircleDot, active: false},
    {icon: Square, active: true},
    {icon: Diamond, active: false},
    {icon: Circle, active: false},
    {icon: Spline, active: false},
    {icon: Pentagon, active: false},
    {icon: Brush, active: false},
    {icon: Eraser, active: false},
    {icon: PersonStanding, active: false},
    {icon: Wand2, active: false},
    {icon: MessageSquarePlus, active: false},
  ];

  const tabs = [
    {icon: BoxesIcon, label: c.tabs.objects, active: true},
    {icon: Shapes, label: c.tabs.classes, active: false},
    {icon: Tags, label: c.tabs.tags, active: false},
    {icon: MessagesSquare, label: c.tabs.issues, active: false},
    {icon: Settings2, label: c.tabs.settings, active: false},
  ];

  return (
    <MockWindow className="@container">
      <MockChrome />
      {/* EditorHeader */}
      <div className="relative z-20 flex h-10 items-center gap-1.5 border-b border-border bg-background px-2.5 text-xs">
        <HeaderIcon icon={ArrowLeft} />
        <span className="mr-1 truncate text-[11px] font-medium">{m.fileName}</span>
        <span className="hidden h-6 w-24 shrink-0 items-center gap-1.5 rounded-md border border-input px-2 text-[10px] @xl:flex">
          <Tags className="size-3 text-green-600 dark:text-green-400" />
          <span className="flex-1 truncate">{m.statusLabeled}</span>
          <ChevronDown className="size-3 text-muted-foreground/60" />
        </span>
        <span className="flex items-center">
          <HeaderIcon icon={ChevronLeft} />
          <span className="min-w-10 text-center text-[10px] text-muted-foreground tabular-nums">
            {m.position}
          </span>
          <HeaderIcon icon={ChevronRight} />
        </span>
        <span className="flex-1" />
        <span className="hidden items-center @3xl:flex">
          <HeaderIcon icon={ZoomOut} />
          <span className="px-1.5 text-[10px] font-medium text-muted-foreground">
            {c.fitToScreen}
          </span>
          <HeaderIcon icon={ZoomIn} />
        </span>
        <HeaderIcon icon={Grid3x3} className="hidden @2xl:flex" />
        <HeaderIcon icon={Keyboard} className="hidden @2xl:flex" />
        {/* RF-DETR auto-label, shown with its hover tooltip */}
        <span className="relative flex size-6 shrink-0 items-center justify-center rounded-md bg-accent text-foreground">
          <Sparkles className="size-3.5" />
          <span className="absolute top-full right-0 mt-1.5 rounded-md bg-primary px-2 py-1 text-[10px] whitespace-nowrap text-primary-foreground shadow">
            {c.autoLabel} (A)
          </span>
        </span>
        <HeaderIcon icon={FileJson} className="hidden @xl:flex" />
        <span className="mx-1 h-5 w-px shrink-0 bg-border" />
        <HeaderIcon icon={Undo2} />
        <HeaderIcon icon={Redo2} dim />
        <span className="ml-1 flex h-6 shrink-0 items-center gap-1 rounded-md border border-input px-2 text-[10px] font-medium text-muted-foreground shadow-sm">
          <Save className="size-3" />
          {m.saved}
        </span>
      </div>

      <div className="flex h-[25rem] sm:h-[27rem]">
        {/* ToolSidebar */}
        <div className="flex w-10 shrink-0 flex-col items-center gap-px border-r border-border bg-background py-2">
          {tools.map(({icon, active}, i) => (
            <MockIconButton key={i} icon={icon} active={active} size="sm" />
          ))}
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden bg-neutral-950">
          <svg
            viewBox={`0 0 ${IMG_W} ${IMG_H}`}
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <image href={IMAGE_URL} width={IMG_W} height={IMG_H} />
            {OBJECTS.filter(o => !o.selected).map(o => (
              <Box
                key={o.id}
                x={o.x}
                y={o.y}
                w={o.w}
                h={o.h}
                color={o.color}
                label={o.name}
              />
            ))}
            {OBJECTS.filter(o => o.selected).map(o => (
              <Box
                key={o.id}
                x={o.x}
                y={o.y}
                w={o.w}
                h={o.h}
                color={o.color}
                label={o.name}
                selected
              />
            ))}
          </svg>
        </div>

        <aside className="hidden w-52 shrink-0 flex-col border-l border-border bg-sidebar @2xl:flex">
          <div className="m-1.5 grid h-7 grid-cols-5 gap-0.5 rounded-md bg-muted p-0.5">
            {tabs.map(({icon: Icon, label, active}) => (
              <span
                key={label}
                title={label}
                className={cn(
                  'flex items-center justify-center rounded',
                  active ? 'bg-background shadow-sm' : 'text-muted-foreground',
                )}
              >
                <Icon className="size-3.5" />
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between px-3 py-1.5">
            <span className="text-xs font-semibold">{m.objectsTitle}</span>
            <span className="text-[10px] text-muted-foreground">{OBJECTS.length}</span>
          </div>
          <ul className="min-h-0 flex-1 space-y-0.5 overflow-hidden px-2">
            {OBJECTS.map(o => (
              <li
                key={o.id}
                className={cn(
                  'flex items-center gap-2 rounded border px-2 py-1.5 text-[11px]',
                  o.selected ? 'border-primary bg-accent' : 'border-transparent',
                )}
              >
                <Swatch color={o.color} />
                <Square className="size-3 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate">{o.name}</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  #{o.id}
                </span>
                <Eye className="size-3 shrink-0 text-muted-foreground" />
              </li>
            ))}
          </ul>
          <div className="border-t border-border px-3 py-2">
            <span className="block truncate text-[10px] text-muted-foreground">
              {m.classesTitle}: {CLASS_NAMES}
            </span>
          </div>
        </aside>
      </div>
    </MockWindow>
  );
}
