import {
  ArrowUpDown,
  Baseline,
  Calendar,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  Group,
  Hash,
  LayoutGrid,
  ListFilter,
  PaintBucket,
  Plus,
  Search,
  SquareChevronDown,
  SquareKanban,
  Table2,
  type LucideIcon,
} from 'lucide-react';

import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

const WON_COLOR = '#22c55e';
const GRID_COLS = 'grid-cols-[2rem_1.1fr_1.4fr_5rem_5.5rem_5.5rem_2rem]';

export function MockGridTable() {
  const {t} = useLanguage();
  const m = t.mocks.grids;

  const toolbar: {label: string; icon: LucideIcon; active?: boolean}[] = [
    {label: m.filter, icon: ListFilter, active: true},
    {label: m.sort, icon: ArrowUpDown},
    {label: m.group, icon: Group},
    {label: m.color, icon: PaintBucket, active: true},
    {label: m.hideFields, icon: EyeOff},
  ];

  const headers: {label: string; icon: LucideIcon}[] = [
    {label: m.colName, icon: Baseline},
    {label: m.colEmail, icon: Baseline},
    {label: m.colStatus, icon: SquareChevronDown},
    {label: m.colAmount, icon: Hash},
    {label: m.colDate, icon: Calendar},
  ];

  const views = [
    {label: m.viewGrid, icon: Table2, active: true},
    {label: m.viewGallery, icon: LayoutGrid, active: false},
    {label: m.viewKanban, icon: SquareKanban, active: false},
  ];

  return (
    <MockPanelFrame>
      {/* header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="text-sm font-semibold">{m.name}</span>
        <span className="ml-auto flex gap-0.5">
          {views.map(({label, icon: Icon, active}) => (
            <span
              key={label}
              className={cn(
                'flex h-6 items-center gap-1 rounded px-1.5 text-[10px]',
                active ? 'bg-primary/10 text-primary' : 'text-muted-foreground',
              )}
            >
              <Icon className="size-3" />
              {label}
            </span>
          ))}
        </span>
      </div>

      {/* toolbar */}
      <div className="flex items-center gap-1 border-b border-border px-3 py-1.5">
        {toolbar.map(({label, icon: Icon, active}) => (
          <span
            key={label}
            className={cn(
              'flex h-6 items-center gap-1 rounded px-1.5 text-[10px]',
              active ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            <Icon className="size-3" />
            {label}
            {active && (
              <span className="rounded bg-primary/10 px-1 text-[9px] tabular-nums">
                1
              </span>
            )}
          </span>
        ))}
        <span className="ml-auto flex h-6 items-center gap-1 rounded-md border border-border bg-background px-1.5 text-[10px] text-muted-foreground">
          <Search className="size-3" />
          {m.searchPlaceholder}
        </span>
      </div>

      {/* sheet */}
      <div className="text-[11px]">
        {/* header row */}
        <div
          className={cn(
            'grid items-center border-b border-border bg-muted/60',
            GRID_COLS,
          )}
        >
          <span className="px-2 py-1.5 text-right text-[10px] text-muted-foreground">
            #
          </span>
          {headers.map(({label, icon: Icon}) => (
            <span
              key={label}
              className="flex items-center gap-1 border-l border-border px-2 py-1.5 font-medium"
            >
              <Icon className="size-3 text-muted-foreground" />
              <span className="truncate">{label}</span>
            </span>
          ))}
          <span className="flex items-center justify-center border-l border-border py-1.5">
            <Plus className="size-3 text-muted-foreground" />
          </span>
        </div>

        {/* data rows */}
        {m.rows.map((row, i) => {
          const won = row[2] === m.rows[1][2]; // "계약"/"Won" row colored by rule
          return (
            <div
              key={row[0]}
              className={cn(
                'relative grid items-center border-b border-border/50',
                GRID_COLS,
              )}
              style={won ? {backgroundColor: `${WON_COLOR}14`} : undefined}
            >
              {won && (
                <span
                  className="absolute top-0 bottom-0 left-0 w-[3px]"
                  style={{backgroundColor: WON_COLOR}}
                />
              )}
              <span className="px-2 py-1.5 text-right text-[10px] text-muted-foreground tabular-nums">
                {i + 1}
              </span>
              <span className="truncate border-l border-border/50 px-2 py-1.5">
                {row[0]}
              </span>
              <span className="truncate border-l border-border/50 px-2 py-1.5 font-mono text-[10px] text-muted-foreground">
                {row[1]}
              </span>
              <span className="truncate border-l border-border/50 px-2 py-1.5">
                {row[2]}
              </span>
              <span className="truncate border-l border-border/50 px-2 py-1.5 text-right font-mono text-[10px] tabular-nums">
                {row[3]}
              </span>
              <span className="truncate border-l border-border/50 px-2 py-1.5 font-mono text-[10px] text-muted-foreground">
                {row[4]}
              </span>
              <span className="border-l border-border/50 py-1.5" />
            </div>
          );
        })}

        {/* add row */}
        <div className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] text-muted-foreground">
          <Plus className="size-3" />
          {m.addRow}
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center gap-2 border-t border-border px-3 py-1.5 text-[10px] text-muted-foreground">
        <span>{m.rowCount}</span>
        <span className="ml-auto flex items-center gap-1">
          <ChevronLeft className="size-3" />
          {m.pageInfo}
          <ChevronRight className="size-3" />
        </span>
      </div>
    </MockPanelFrame>
  );
}
