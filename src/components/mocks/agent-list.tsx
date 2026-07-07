import {Cpu, Loader2, MoreHorizontal, Plus} from 'lucide-react';
import type {ReactNode} from 'react';

import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

function SolidBadge({className, children}: {className: string; children: ReactNode}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-white',
        className,
      )}
    >
      {children}
    </span>
  );
}

const COLS = 'grid-cols-[1.6fr_6rem_6rem_6rem_2rem]';

export function MockAgentList() {
  const {t} = useLanguage();
  const m = t.mocks.agents;

  return (
    <MockPanelFrame>
      {/* header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span>
          <span className="block text-sm font-semibold">{m.title}</span>
          <span className="block text-[10px] text-muted-foreground">
            {m.description}
          </span>
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1 rounded-md bg-primary px-2 py-1 text-[11px] font-medium text-primary-foreground">
          <Plus className="size-3" />
          {m.create}
        </span>
      </div>

      {/* table */}
      <div className="px-4 py-2">
        <div
          className={cn(
            'grid items-center gap-2 border-b border-border pb-2 text-[10px] text-muted-foreground',
            COLS,
          )}
        >
          <span>{m.colName}</span>
          <span>{m.colStatus}</span>
          <span>{m.colLastSeen}</span>
          <span>{m.colCreated}</span>
          <span />
        </div>

        {/* row 1: active + modbus */}
        <div
          className={cn(
            'grid items-center gap-2 border-b border-border/50 py-2 text-[11px]',
            COLS,
          )}
        >
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <span className="truncate font-medium">line-01-vision</span>
              <span className="flex shrink-0 items-center gap-1 rounded border border-border px-1 py-px text-[9px] text-muted-foreground">
                <Cpu className="size-2.5" />
                Modbus
              </span>
            </span>
            <span className="block truncate font-mono text-[9px] text-muted-foreground">
              ag_7f3a9c1e4b8d
            </span>
          </span>
          <span>
            <SolidBadge className="bg-emerald-500">{m.statusActive}</SolidBadge>
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            2026-07-06
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            2026-06-14
          </span>
          <MoreHorizontal className="size-3.5 text-muted-foreground" />
        </div>

        {/* row 2: starting */}
        <div
          className={cn(
            'grid items-center gap-2 border-b border-border/50 py-2 text-[11px]',
            COLS,
          )}
        >
          <span className="min-w-0">
            <span className="block truncate font-medium">edge-gpu-02</span>
            <span className="block truncate font-mono text-[9px] text-muted-foreground">
              ag_2c91d05fa3e7
            </span>
          </span>
          <span>
            <SolidBadge className="bg-blue-500">
              <Loader2 className="size-2.5 animate-spin" />
              {m.statusStarting}
            </SolidBadge>
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">{m.never}</span>
          <span className="font-mono text-[10px] text-muted-foreground">
            2026-07-01
          </span>
          <MoreHorizontal className="size-3.5 text-muted-foreground" />
        </div>

        {/* row 3: disconnected */}
        <div className={cn('grid items-center gap-2 py-2 text-[11px]', COLS)}>
          <span className="min-w-0">
            <span className="block truncate font-medium">modbus-plc-03</span>
            <span className="block truncate font-mono text-[9px] text-muted-foreground">
              ag_5e08b7c2d914
            </span>
          </span>
          <span>
            <SolidBadge className="bg-amber-500">{m.statusDisconnected}</SolidBadge>
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            2026-07-05
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            2026-05-20
          </span>
          <MoreHorizontal className="size-3.5 text-muted-foreground" />
        </div>
      </div>

      {/* detail strip: heartbeat + cron schedule */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border bg-muted/20 px-4 py-2 text-[10px] text-muted-foreground">
        <span>
          {m.heartbeat} <span className="font-mono text-foreground/80">14:21:03</span>
        </span>
        <span>
          {m.schedule} <span className="text-foreground/80">{m.scheduleName}</span>{' '}
          <code className="rounded bg-muted px-1 py-px font-mono">0 0 * * *</code>
        </span>
      </div>
    </MockPanelFrame>
  );
}
