import {
  Compass,
  Eye,
  EyeOff,
  MapPin,
  Minus,
  MoreHorizontal,
  Plus,
  Spline,
  Square,
  Trash2,
  X,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

const COPY = {
  ko: {
    title: '지도',
    layers: '레이어',
    newLayer: '새 레이어',
    select: '선택',
    feature: '피처',
    save: '저장',
    delete: '삭제',
    featureCount: (n: number) => `피처 ${n}개`,
    layerNames: ['거점', '순찰 경로', '통제 구역'],
    featureLabel: '판교 테스트베드 A',
  },
  en: {
    title: 'Maps',
    layers: 'Layers',
    newLayer: 'New Layer',
    select: 'Select',
    feature: 'Feature',
    save: 'Save',
    delete: 'Delete',
    featureCount: (n: number) => (n === 1 ? '1 feature' : `${n} features`),
    layerNames: ['Sites', 'Patrol route', 'Restricted zones'],
    featureLabel: 'Pangyo testbed A',
  },
} as const;

const LAYER_BASE = '#2563eb';
const LAYER_ROUTE = '#dc2626';
const LAYER_ZONE = '#16a34a';

/** Stylized vector basemap (blocks + roads) standing in for MapLibre tiles. */
function Basemap() {
  return (
    <g>
      <rect width={640} height={320} className="fill-muted/40" />
      {/* city blocks */}
      <g className="fill-muted-foreground/10">
        <rect x={30} y={26} width={120} height={80} rx={3} />
        <rect x={170} y={26} width={90} height={80} rx={3} />
        <rect x={30} y={130} width={120} height={70} rx={3} />
        <rect x={170} y={130} width={90} height={70} rx={3} />
        <rect x={300} y={26} width={150} height={80} rx={3} />
        <rect x={300} y={130} width={150} height={70} rx={3} />
        <rect x={480} y={26} width={130} height={174} rx={3} />
        <rect x={30} y={224} width={230} height={70} rx={3} />
        <rect x={300} y={224} width={310} height={70} rx={3} />
      </g>
      {/* roads */}
      <g className="stroke-background" strokeWidth={10} fill="none">
        <line x1={0} y1={118} x2={640} y2={118} />
        <line x1={0} y1={212} x2={640} y2={212} />
        <line x1={282} y1={0} x2={282} y2={320} />
        <line x1={464} y1={0} x2={464} y2={320} />
      </g>
    </g>
  );
}

export function MockMapView() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  const layers = [
    {name: c.layerNames[0], color: LAYER_BASE, count: 12, active: true, visible: true},
    {name: c.layerNames[1], color: LAYER_ROUTE, count: 4, active: false, visible: true},
    {name: c.layerNames[2], color: LAYER_ZONE, count: 3, active: false, visible: false},
  ];

  return (
    <MockAppFrame
      activeNav="maps"
      title={c.title}
      actions={
        <MockButton icon={Plus} variant="default">
          {c.newLayer}
        </MockButton>
      }
    >
      <div className="grid gap-4 @2xl:grid-cols-[12rem_1fr] @4xl:grid-cols-[16rem_1fr]">
        {/* layers panel */}
        <aside className="hidden space-y-1.5 @2xl:block">
          <h4 className="px-1 text-[11px] font-medium text-muted-foreground">
            {c.layers}
          </h4>
          <ul className="space-y-1">
            {layers.map(layer => (
              <li
                key={layer.name}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border px-2 py-1.5',
                  layer.active ? 'border-primary bg-accent/40' : 'border-transparent',
                )}
              >
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{backgroundColor: layer.color}}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px]">{layer.name}</span>
                  <span className="block text-[10px] text-muted-foreground">
                    {c.featureCount(layer.count)}
                  </span>
                </span>
                <span className="flex size-5 items-center justify-center">
                  {layer.visible ? (
                    <Eye className="size-3" />
                  ) : (
                    <EyeOff className="size-3 text-muted-foreground" />
                  )}
                </span>
                <span className="flex size-5 items-center justify-center">
                  <MoreHorizontal className="size-3" />
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* map */}
        <div className="relative min-w-0 overflow-hidden rounded-xl border border-border">
          <svg
            viewBox="0 0 640 320"
            className="h-72 w-full @4xl:h-80"
            preserveAspectRatio="xMidYMid slice"
          >
            <Basemap />
            <polygon
              points="310,140 442,140 442,196 360,196 310,176"
              fill={LAYER_ZONE}
              fillOpacity={0.25}
              stroke={LAYER_ZONE}
              strokeWidth={2}
            />
            <polyline
              points="60,260 200,258 286,212 300,150 380,70"
              fill="none"
              stroke={LAYER_ROUTE}
              strokeWidth={3}
              strokeLinejoin="round"
            />
            {[
              [90, 60],
              [214, 70],
              [356, 92],
              [520, 120],
              [120, 168],
              [540, 250],
            ].map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={6}
                fill={LAYER_BASE}
                stroke="#ffffff"
                strokeWidth={1.5}
              />
            ))}
            <circle
              cx={520}
              cy={120}
              r={10}
              fill="none"
              stroke={LAYER_BASE}
              strokeWidth={1.5}
              opacity={0.5}
            />
          </svg>

          {/* drawing toolbar: 선택 + 점 / 선 / 다각형 */}
          <div className="absolute top-2 left-2 flex items-center gap-0.5 rounded-lg border border-border bg-background/95 p-1.5 shadow-sm backdrop-blur">
            <MockButton variant="default">{c.select}</MockButton>
            {[MapPin, Spline, Square].map((Icon, i) => (
              <span
                key={i}
                className="flex size-6 items-center justify-center rounded-md text-muted-foreground"
              >
                <Icon className="size-3.5" />
              </span>
            ))}
          </div>

          {/* navigation control */}
          <div className="absolute top-2 right-2 flex flex-col overflow-hidden rounded-md border border-border bg-background/95 backdrop-blur">
            <span className="flex size-6 items-center justify-center border-b border-border">
              <Plus className="size-3" />
            </span>
            <span className="flex size-6 items-center justify-center border-b border-border">
              <Minus className="size-3" />
            </span>
            <span className="flex size-6 items-center justify-center">
              <Compass className="size-3" />
            </span>
          </div>

          {/* selected feature panel */}
          <div className="absolute bottom-2 left-2 w-56 rounded-lg border border-border bg-background/95 p-2.5 shadow-md backdrop-blur">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-medium">{c.feature}</span>
              <X className="size-3.5 text-muted-foreground" />
            </div>
            <span className="flex h-7 items-center rounded-md border border-input bg-background px-2 text-[11px]">
              {c.featureLabel}
            </span>
            <div className="mt-2 flex items-center gap-1.5">
              <MockButton variant="default">{c.save}</MockButton>
              <MockButton
                icon={Trash2}
                className="border-0 bg-destructive text-white"
                variant="ghost"
              >
                {c.delete}
              </MockButton>
            </div>
          </div>
        </div>
      </div>
    </MockAppFrame>
  );
}
