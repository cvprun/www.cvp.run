import {Boxes, Cpu, Factory, Package, type LucideIcon} from 'lucide-react';
import type {CSSProperties, ReactNode} from 'react';

import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

function TopologyNode({
  style,
  icon: Icon,
  chipClass,
  borderClass,
  title,
  sub,
  children,
}: {
  style: CSSProperties;
  icon: LucideIcon;
  chipClass: string;
  borderClass: string;
  title: string;
  sub: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'absolute w-40 rounded-lg border bg-card px-2.5 py-2 shadow-sm',
        borderClass,
      )}
      style={style}
    >
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            'flex size-5 shrink-0 items-center justify-center rounded-md text-white',
            chipClass,
          )}
        >
          <Icon className="size-3" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[11px] font-semibold">{title}</span>
          <span className="block font-mono text-[8px] text-muted-foreground">
            {sub}
          </span>
        </span>
      </div>
      {children}
    </div>
  );
}

function SolidBadge({className, children}: {className: string; children: ReactNode}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-1.5 py-px text-[8px] font-medium text-white',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function MockMesTopology() {
  const {t} = useLanguage();
  const m = t.mocks.mes;

  const legend = [
    {label: m.legendProduct, color: 'bg-sky-500'},
    {label: m.legendWorkOrder, color: 'bg-violet-500'},
    {label: m.legendWorkCenter, color: 'bg-amber-500'},
    {label: m.legendEquipment, color: 'bg-emerald-600'},
  ];

  return (
    <MockPanelFrame>
      {/* tab bar */}
      <div className="flex gap-3 overflow-hidden border-b border-border px-4 pt-2.5 text-[11px] whitespace-nowrap">
        {m.tabs.map((tab, i) => (
          <span
            key={tab}
            className={cn(
              '-mb-px border-b-2 pb-2',
              i === 7
                ? 'border-primary font-medium'
                : 'border-transparent text-muted-foreground',
            )}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* legend */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-2 text-[10px] text-muted-foreground">
        {legend.map(item => (
          <span key={item.label} className="flex items-center gap-1.5">
            <span className={cn('h-2.5 w-2.5 rounded-sm', item.color)} />
            {item.label}
          </span>
        ))}
      </div>

      {/* topology canvas */}
      <div
        className="relative h-64 overflow-hidden border-t border-border bg-background sm:h-72"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        {/* edges */}
        <svg className="absolute inset-0 h-full w-full">
          <g fill="none" className="stroke-muted-foreground/40" strokeWidth={1.5}>
            <path d="M 176 52 C 210 52, 200 60, 232 60" />
            <path d="M 176 52 C 214 52, 200 150, 232 150" />
            <path d="M 408 76 C 442 76, 430 96, 464 96" />
            <path d="M 408 166 C 442 166, 430 112, 464 112" />
            <path d="M 640 96 C 672 96, 662 56, 694 56" />
            <path d="M 640 112 C 672 112, 662 160, 694 160" />
          </g>
        </svg>

        {/* col 0: product */}
        <TopologyNode
          style={{left: 16, top: 30}}
          icon={Package}
          chipClass="bg-sky-500"
          borderClass="border-sky-300/70"
          title="Widget"
          sub="WID-100"
        />

        {/* col 1: work orders */}
        <TopologyNode
          style={{left: 232, top: 34}}
          icon={Boxes}
          chipClass="bg-violet-500"
          borderClass="border-violet-300/70"
          title="WO-1001"
          sub="Widget · 6/10"
        >
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
              <span className="block h-full w-[60%] rounded-full bg-primary" />
            </span>
            <span className="text-[8px] text-muted-foreground tabular-nums">60%</span>
            <SolidBadge className="bg-amber-500">{m.statusInProgress}</SolidBadge>
          </div>
        </TopologyNode>
        <TopologyNode
          style={{left: 232, top: 124}}
          icon={Boxes}
          chipClass="bg-violet-500"
          borderClass="border-violet-300/70"
          title="WO-1002"
          sub="Gadget · 0/20"
        >
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <SolidBadge className="bg-blue-500">{m.statusScheduled}</SolidBadge>
          </div>
        </TopologyNode>

        {/* col 2: work center */}
        <TopologyNode
          style={{left: 464, top: 74}}
          icon={Factory}
          chipClass="bg-amber-500"
          borderClass="border-amber-300/70"
          title="Line A"
          sub="LINE-A"
        >
          <p className="mt-1 text-[8px] text-muted-foreground">{m.equipmentCount}</p>
        </TopologyNode>

        {/* col 3: equipment */}
        <TopologyNode
          style={{left: 694, top: 30}}
          icon={Cpu}
          chipClass="bg-emerald-600"
          borderClass="border-emerald-300/70"
          title="CNC 1"
          sub="M-01"
        >
          <div className="mt-1.5 flex items-center gap-1.5">
            <SolidBadge className="bg-emerald-500">{m.statusRunning}</SolidBadge>
            <span className="flex items-center gap-1 text-[8px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {m.agentConnected}
            </span>
          </div>
        </TopologyNode>
        <TopologyNode
          style={{left: 694, top: 134}}
          icon={Cpu}
          chipClass="bg-emerald-600"
          borderClass="border-emerald-300/70"
          title="CNC 2"
          sub="M-02"
        >
          <div className="mt-1.5 flex items-center gap-1.5">
            <SolidBadge className="bg-amber-500">{m.statusMaintenance}</SolidBadge>
            <span className="flex items-center gap-1 text-[8px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-slate-400" />
              {m.agentNone}
            </span>
          </div>
        </TopologyNode>
      </div>
    </MockPanelFrame>
  );
}
