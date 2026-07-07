import {
  ArrowLeft,
  Brush,
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleDot,
  Diamond,
  Eraser,
  Eye,
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

const CLASS_CAR = '#6496F5';
const CLASS_PERSON = '#FF1E1E';
const CLASS_SIGN = '#FF0000';

const OBJECTS = [
  {id: 1, name: 'car', color: CLASS_CAR},
  {id: 2, name: 'car', color: CLASS_CAR},
  {id: 3, name: 'person', color: CLASS_PERSON},
  {id: 4, name: 'traffic-sign', color: CLASS_SIGN},
];

/** Bounding box + class label, matching Konva render styles (2px stroke,
 * 4.5px when selected, white 12px label on class-colored tag). */
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
        strokeWidth={selected ? 4 : 2}
      />
      <rect
        x={x}
        y={y - 17}
        width={label.length * 7.5 + 10}
        height={16}
        rx={2}
        fill={color}
        opacity={0.85}
      />
      <text
        x={x + 5}
        y={y - 5}
        fontSize={11}
        fill="#ffffff"
        fontFamily="ui-sans-serif, system-ui"
      >
        {label}
      </text>
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
            r={5}
            fill="#3b82f6"
            stroke="#ffffff"
            strokeWidth={1.5}
          />
        ))}
    </g>
  );
}

/** Abstract street scene standing in for a photo. */
function Scene() {
  return (
    <g>
      <rect width={800} height={450} fill="#1c2431" />
      <rect width={800} height={230} fill="#232e40" />
      {/* buildings */}
      <rect x={0} y={90} width={150} height={140} fill="#2b3850" />
      <rect x={160} y={130} width={90} height={100} fill="#26314a" />
      <rect x={620} y={70} width={180} height={160} fill="#2b3850" />
      <rect x={560} y={140} width={60} height={90} fill="#26314a" />
      {/* road */}
      <polygon points="0,450 800,450 640,230 240,230" fill="#38445c" />
      <rect
        x={396}
        y={250}
        width={8}
        height={30}
        fill="#8fa1c0"
        opacity={0.7}
        transform="skewX(-2)"
      />
      <rect x={390} y={310} width={9} height={40} fill="#8fa1c0" opacity={0.7} />
      <rect x={382} y={390} width={10} height={50} fill="#8fa1c0" opacity={0.7} />
      {/* car bodies */}
      <rect x={310} y={285} width={170} height={62} rx={10} fill="#4c5b7a" />
      <rect x={340} y={262} width={105} height={34} rx={8} fill="#55648a" />
      <rect x={548} y={266} width={84} height={36} rx={6} fill="#4c5b7a" />
      <rect x={565} y={252} width={50} height={20} rx={5} fill="#55648a" />
      {/* person body */}
      <circle cx={224} cy={242} r={9} fill="#6d7d9e" />
      <rect x={215} y={251} width={18} height={34} rx={6} fill="#5d6d8f" />
      <rect x={217} y={284} width={7} height={22} rx={3} fill="#55648a" />
      <rect x={226} y={284} width={7} height={22} rx={3} fill="#55648a" />
      {/* sign */}
      <rect x={648} y={148} width={26} height={26} rx={4} fill="#6d7d9e" />
      <rect x={659} y={174} width={4} height={44} fill="#55648a" />
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
      {/* editor header */}
      <div className="flex h-10 items-center gap-2 border-b border-border bg-background px-3 text-xs">
        <ArrowLeft className="size-3.5 text-muted-foreground" />
        <span className="font-medium">{m.fileName}</span>
        <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
          {m.statusLabeled}
        </span>
        <span className="ml-auto flex items-center gap-1 text-muted-foreground">
          <ChevronLeft className="size-3.5" />
          <span className="font-mono text-[11px]">{m.position}</span>
          <ChevronRight className="size-3.5" />
        </span>
        <span className="mx-1 h-4 w-px bg-border" />
        <Undo2 className="size-3.5 text-muted-foreground" />
        <Redo2 className="size-3.5 text-muted-foreground/50" />
        <span className="ml-1 flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground">
          <Save className="size-3" />
          {m.saved}
        </span>
      </div>

      <div className="flex h-[22rem] sm:h-[26rem]">
        {/* tool sidebar */}
        <div className="flex w-11 shrink-0 flex-col items-center gap-0.5 border-r border-border bg-background py-2">
          {tools.map(({icon, active}, i) => (
            <MockIconButton key={i} icon={icon} active={active} />
          ))}
        </div>

        {/* canvas */}
        <div className="relative min-w-0 flex-1 overflow-hidden bg-neutral-950">
          <svg
            viewBox="0 0 800 450"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <Scene />
            <Box
              x={296}
              y={252}
              w={196}
              h={100}
              color={CLASS_CAR}
              label="car"
              selected
            />
            <Box x={540} y={244} w={100} h={62} color={CLASS_CAR} label="car" />
            <Box x={210} y={228} w={30} h={80} color={CLASS_PERSON} label="person" />
            <Box
              x={644}
              y={144}
              w={34}
              h={34}
              color={CLASS_SIGN}
              label="traffic-sign"
            />
          </svg>
        </div>

        {/* right panel */}
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
          <ul className="space-y-0.5 px-2">
            {OBJECTS.map((o, i) => (
              <li
                key={o.id}
                className={cn(
                  'flex items-center gap-2 rounded border px-2 py-1.5 text-[11px]',
                  i === 0 ? 'border-primary bg-accent' : 'border-transparent',
                )}
              >
                <Swatch color={o.color} />
                <span className="flex-1 truncate">{o.name}</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  #{o.id}
                </span>
                <Eye className="size-3 text-muted-foreground" />
              </li>
            ))}
          </ul>
          <div className="mt-auto border-t border-border px-3 py-2">
            <span className="text-[10px] text-muted-foreground">
              {m.classesTitle}: car · person · traffic-sign
            </span>
          </div>
        </aside>
      </div>
    </MockWindow>
  );
}
