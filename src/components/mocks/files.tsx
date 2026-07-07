import {
  BookOpen,
  Box,
  Braces,
  Clapperboard,
  Database,
  Folder,
  FolderPlus,
  Image,
  Upload,
  Video,
  type LucideIcon,
} from 'lucide-react';

import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

type Row = {
  icon: LucideIcon;
  iconClass: string;
  overlay?: LucideIcon;
  name: string;
  size: string;
  modified: string;
  selected?: boolean;
  readonly?: boolean;
};

export function MockFiles() {
  const {t} = useLanguage();
  const m = t.mocks.files;

  const rows: Row[] = [
    {
      icon: Folder,
      iconClass: 'text-muted-foreground',
      overlay: Database,
      name: m.folders.datasets,
      size: '—',
      modified: '2026-07-01',
      readonly: true,
    },
    {
      icon: Folder,
      iconClass: 'text-muted-foreground',
      overlay: BookOpen,
      name: m.folders.wiki,
      size: '—',
      modified: '2026-06-28',
      readonly: true,
    },
    {
      icon: Folder,
      iconClass: 'text-muted-foreground',
      overlay: Clapperboard,
      name: m.folders.videos,
      size: '—',
      modified: '2026-06-30',
      readonly: true,
    },
    {
      icon: Image,
      iconClass: 'text-emerald-500/70',
      name: 'street_0421.jpg',
      size: '2.4MB',
      modified: '2026-07-04',
      selected: true,
    },
    {
      icon: Video,
      iconClass: 'text-rose-500/70',
      name: 'clip_07.mp4',
      size: '148MB',
      modified: '2026-07-03',
      selected: true,
    },
    {
      icon: Box,
      iconClass: 'text-violet-500/70',
      name: 'lidar_seq08_0042.laz',
      size: '812MB',
      modified: '2026-07-02',
      selected: true,
    },
    {
      icon: Braces,
      iconClass: 'text-orange-500/70',
      name: 'labels.json',
      size: '1.1MB',
      modified: '2026-07-01',
    },
  ];

  return (
    <MockPanelFrame>
      {/* header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="text-sm font-semibold">{m.title}</span>
        <span className="ml-auto flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground">
          <FolderPlus className="size-3" />
          {m.newFolder}
        </span>
        <span className="flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[11px] font-medium text-primary-foreground">
          <Upload className="size-3" />
          {m.upload}
        </span>
      </div>

      {/* selection toolbar */}
      <div className="flex items-center gap-2 border-b border-border bg-accent/40 px-4 py-1.5 text-[11px] text-muted-foreground">
        {m.selected}
      </div>

      {/* table */}
      <div className="px-2 py-1">
        <div className="grid grid-cols-[1fr_4.5rem_5.5rem] gap-2 px-2 py-1.5 text-[10px] text-muted-foreground">
          <span>{m.name}</span>
          <span className="text-right">{m.size}</span>
          <span className="text-right">{m.modified}</span>
        </div>
        {rows.map(row => (
          <div
            key={row.name}
            className={cn(
              'grid grid-cols-[1fr_4.5rem_5.5rem] items-center gap-2 rounded-md px-2 py-1.5 text-[12px]',
              row.selected && 'bg-primary/10',
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="relative shrink-0">
                <row.icon className={cn('size-4', row.iconClass)} strokeWidth={1.5} />
                {row.overlay && (
                  <row.overlay className="absolute -right-1 -bottom-1 size-2.5 text-muted-foreground" />
                )}
              </span>
              <span className="truncate">{row.name}</span>
              {row.readonly && (
                <span className="rounded border border-border px-1 py-px text-[9px] text-muted-foreground">
                  {m.readonly}
                </span>
              )}
            </span>
            <span className="text-right font-mono text-[10px] text-muted-foreground">
              {row.size}
            </span>
            <span className="text-right font-mono text-[10px] text-muted-foreground">
              {row.modified}
            </span>
          </div>
        ))}
      </div>
    </MockPanelFrame>
  );
}
