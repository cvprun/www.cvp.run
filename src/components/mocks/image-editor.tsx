import {
  ArrowLeft,
  Brush,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleDot,
  Diamond,
  Eraser,
  Eye,
  Maximize,
  MessageSquarePlus,
  MessagesSquare,
  MousePointer2,
  Move,
  Pentagon,
  PersonStanding,
  Redo2,
  Save,
  Shapes,
  SlidersHorizontal,
  Spline,
  Square,
  Tags,
  Undo2,
  ZoomIn,
  ZoomOut,
  Boxes as BoxesIcon,
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

export function MockImageEditor() {
  const {t} = useLanguage();
  const m = t.mocks.editor;

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
    {icon: MessageSquarePlus, active: false},
  ];

  const tabs = [
    {icon: BoxesIcon, label: m.tabObjects, active: true},
    {icon: SlidersHorizontal, label: m.tabProperties, active: false},
    {icon: Shapes, label: m.tabClasses, active: false},
    {icon: Tags, label: m.tabTags, active: false},
    {icon: MessagesSquare, label: m.tabIssues, active: false},
  ];

  return (
    <MockWindow>
      <MockChrome />
      <div className="flex h-10 items-center gap-2 border-b border-border bg-background px-3 text-xs">
        <ArrowLeft className="size-3.5 text-muted-foreground" />
        <span className="font-medium">{m.fileName}</span>
        <span className="flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
          {m.statusLabeled}
          <ChevronDown className="size-2.5" />
        </span>
        <span className="ml-auto flex items-center gap-1 text-muted-foreground">
          <ChevronLeft className="size-3.5" />
          <span className="font-mono text-[11px]">{m.position}</span>
          <ChevronRight className="size-3.5" />
        </span>
        <span className="mx-1 h-4 w-px bg-border" />
        <span className="hidden items-center gap-1 text-muted-foreground sm:flex">
          <ZoomOut className="size-3.5" />
          <Maximize className="size-3.5" />
          <ZoomIn className="size-3.5" />
          <span className="mx-1 h-4 w-px bg-border" />
        </span>
        <Undo2 className="size-3.5 text-muted-foreground" />
        <Redo2 className="size-3.5 text-muted-foreground/50" />
        <span className="ml-1 flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground">
          <Save className="size-3" />
          {m.saved}
        </span>
      </div>

      <div className="flex h-[22rem] sm:h-[26rem]">
        <div className="flex w-11 shrink-0 flex-col items-center gap-0.5 border-r border-border bg-background py-2">
          {tools.map(({icon, active}, i) => (
            <MockIconButton key={i} icon={icon} active={active} />
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

        <aside className="hidden w-52 shrink-0 flex-col border-l border-border bg-muted/30 md:flex">
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
