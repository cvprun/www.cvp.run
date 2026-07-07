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
  X,
} from 'lucide-react';

import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

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
  const {t} = useLanguage();
  const m = t.mocks.maps;

  const layers = [
    {
      name: m.layerBase,
      color: LAYER_BASE,
      count: m.featureCount12,
      active: true,
      visible: true,
    },
    {
      name: m.layerRoute,
      color: LAYER_ROUTE,
      count: m.featureCount4,
      active: false,
      visible: true,
    },
    {
      name: m.layerZone,
      color: LAYER_ZONE,
      count: m.featureCount3,
      active: false,
      visible: false,
    },
  ];

  return (
    <MockPanelFrame>
      <div className="flex">
        {/* layer panel */}
        <aside className="hidden w-44 shrink-0 border-r border-border bg-card p-2 sm:block">
          <div className="flex items-center justify-between px-1 py-1">
            <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              {m.layersTitle}
            </span>
            <span className="flex items-center gap-0.5 rounded border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">
              <Plus className="size-2.5" />
              {m.newLayer}
            </span>
          </div>
          <ul className="mt-1 space-y-1">
            {layers.map(layer => (
              <li
                key={layer.name}
                className={cn(
                  'rounded-lg border px-2 py-1.5',
                  layer.active ? 'border-primary bg-accent/40' : 'border-border',
                )}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className="size-3 shrink-0 rounded-full"
                    style={{backgroundColor: layer.color}}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11px]">{layer.name}</span>
                    <span className="block text-[9px] text-muted-foreground">
                      {layer.count}
                    </span>
                  </span>
                  {layer.visible ? (
                    <Eye className="size-3 text-muted-foreground" />
                  ) : (
                    <EyeOff className="size-3 text-muted-foreground/50" />
                  )}
                  <MoreHorizontal className="size-3 text-muted-foreground" />
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* map */}
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <svg
            viewBox="0 0 640 320"
            className="h-64 w-full sm:h-80"
            preserveAspectRatio="xMidYMid slice"
          >
            <Basemap />
            {/* zone polygon (hidden layer still drawn faint? keep visible zone) */}
            <polygon
              points="310,140 442,140 442,196 360,196 310,176"
              fill={LAYER_ZONE}
              fillOpacity={0.25}
              stroke={LAYER_ZONE}
              strokeWidth={2}
            />
            {/* patrol route */}
            <polyline
              points="60,260 200,258 286,212 300,150 380,70"
              fill="none"
              stroke={LAYER_ROUTE}
              strokeWidth={3}
              strokeLinejoin="round"
            />
            {/* site points */}
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
            {/* selected point highlight */}
            <circle
              cx={90}
              cy={60}
              r={10}
              fill="none"
              stroke={LAYER_BASE}
              strokeWidth={1.5}
              opacity={0.5}
            />
          </svg>

          {/* drawing toolbar */}
          <div className="absolute top-2 left-2 flex items-center gap-0.5 rounded-lg border border-border bg-background/95 p-1 backdrop-blur">
            <span className="rounded bg-primary px-2 py-1 text-[9px] font-medium text-primary-foreground">
              {m.toolSelect}
            </span>
            <span className="flex size-6 items-center justify-center rounded text-muted-foreground">
              <MapPin className="size-3" />
            </span>
            <span className="flex size-6 items-center justify-center rounded text-muted-foreground">
              <Spline className="size-3" />
            </span>
            <span className="flex size-6 items-center justify-center rounded text-muted-foreground">
              <Square className="size-3" />
            </span>
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
          <div className="absolute bottom-2 left-2 w-52 rounded-lg border border-border bg-background/95 p-2 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold">{m.featureTitle}</span>
              <X className="size-3 text-muted-foreground" />
            </div>
            <span className="mt-1.5 flex h-6 items-center rounded border border-border bg-background px-1.5 text-[10px]">
              {m.featureName}
            </span>
            <div className="mt-1.5 flex gap-1.5">
              <span className="flex-1 rounded bg-primary px-2 py-1 text-center text-[9px] font-medium text-primary-foreground">
                {m.save}
              </span>
              <span className="rounded border border-border px-2 py-1 text-[9px] text-destructive">
                {m.delete}
              </span>
            </div>
          </div>
        </div>
      </div>
    </MockPanelFrame>
  );
}
