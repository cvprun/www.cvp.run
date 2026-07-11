import {
  Box,
  Database,
  File,
  FileCheck,
  FileImage,
  FilePenLine,
  Images,
  LayoutGrid,
  List,
  PersonStanding,
  Plus,
  Video,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

type Row = {
  icon: LucideIcon;
  name: string;
  description: string;
  samples: string;
  /** unlabeled / in progress / labeled / reviewed */
  statuses: [number, number, number, number];
  pct: number;
  created: string;
};

const STATUS_ICONS: LucideIcon[] = [File, FilePenLine, FileImage, FileCheck];

function ProgressCell({pct}: {pct: number}) {
  return (
    <div className="relative mx-auto h-4 w-20 overflow-hidden rounded-full bg-muted">
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium tabular-nums text-foreground">
        {pct}%
      </span>
      <div
        className="absolute inset-y-0 left-0 overflow-hidden bg-primary"
        style={{width: `${pct}%`}}
      >
        <span className="flex h-full w-20 items-center justify-center text-[10px] font-medium tabular-nums text-primary-foreground">
          {pct}%
        </span>
      </div>
    </div>
  );
}

/** Grid/table view switcher as rendered in the app's list headers. */
export function ViewModeSwitcher({active}: {active: 'grid' | 'table'}) {
  return (
    <span className="flex overflow-hidden rounded-md border border-border">
      <span
        className={cn(
          'flex h-7 w-7 items-center justify-center',
          active === 'grid'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground',
        )}
      >
        <LayoutGrid className="size-3.5" />
      </span>
      <span
        className={cn(
          'flex h-7 w-7 items-center justify-center',
          active === 'table'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground',
        )}
      >
        <List className="size-3.5" />
      </span>
    </span>
  );
}

export function MockDatasetGrid() {
  const {t} = useLanguage();
  const m = t.mocks.datasets;
  const f = t.mocks.frame;

  const rows: Row[] = [
    {
      icon: Images,
      name: m.names.image,
      description: m.names.imageDesc,
      samples: '1,240',
      statuses: [120, 300, 620, 200],
      pct: 66,
      created: '2026-07-01',
    },
    {
      icon: Video,
      name: m.names.video,
      description: m.names.videoDesc,
      samples: '12',
      statuses: [0, 2, 8, 2],
      pct: 83,
      created: '2026-06-24',
    },
    {
      icon: Box,
      name: m.names.pointCloud,
      description: m.names.pointCloudDesc,
      samples: '86',
      statuses: [6, 12, 52, 16],
      pct: 79,
      created: '2026-06-12',
    },
  ];

  const statusTitles = [
    m.statusUnlabeled,
    m.statusInProgress,
    m.statusLabeled,
    m.statusReviewed,
  ];

  return (
    <MockAppFrame activeNav="datasets">
      {/* project page header */}
      <p className="text-[10px] text-muted-foreground">
        {f.breadcrumbHome} / {f.projectName} / {f.nav.datasets}
      </p>
      <div className="mt-1.5 flex flex-wrap items-end justify-between gap-2">
        <span className="flex items-center gap-2">
          <Database className="size-5 shrink-0 text-muted-foreground" />
          <h3 className="text-xl font-semibold tracking-tight">{m.title}</h3>
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <ViewModeSwitcher active="table" />
          <span className="hidden items-center gap-1 rounded-md border border-border px-2 py-1.5 text-[11px] text-muted-foreground @2xl:flex">
            <PersonStanding className="size-3" />
            {m.keypointPresets}
          </span>
          <span className="flex items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-medium text-primary-foreground">
            <Plus className="size-3" />
            {m.newDataset}
          </span>
        </span>
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground">{m.description}</p>

      {/* dataset table */}
      <div className="mt-4 overflow-hidden rounded-md border border-border bg-card">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="px-3 py-2 text-left font-medium">{m.columns.name}</th>
              <th className="hidden px-3 py-2 text-left font-medium @4xl:table-cell">
                {m.columns.description}
              </th>
              <th className="px-2 py-2 text-center font-medium">{m.columns.samples}</th>
              {STATUS_ICONS.map((Icon, i) => (
                <th
                  key={i}
                  className="hidden px-1.5 py-2 @2xl:table-cell"
                  title={statusTitles[i]}
                >
                  <Icon className="mx-auto size-3.5" />
                </th>
              ))}
              <th className="px-2 py-2 text-center font-medium">
                {m.columns.progress}
              </th>
              <th className="hidden px-3 py-2 text-right font-medium @3xl:table-cell">
                {m.columns.created}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({icon: Icon, ...row}, ri) => (
              <tr
                key={row.name}
                className={cn(
                  'hover:bg-accent/40',
                  ri > 0 && 'border-t border-border/60',
                )}
              >
                <td className="px-3 py-2.5 font-medium text-foreground">
                  <span className="flex items-center gap-2">
                    <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate">{row.name}</span>
                  </span>
                </td>
                <td className="hidden max-w-0 truncate px-3 py-2.5 text-muted-foreground @4xl:table-cell">
                  {row.description}
                </td>
                <td className="px-2 py-2.5 text-center tabular-nums">{row.samples}</td>
                {row.statuses.map((n, i) => (
                  <td
                    key={i}
                    className="hidden px-1.5 py-2.5 text-center tabular-nums text-muted-foreground @2xl:table-cell"
                  >
                    {n}
                  </td>
                ))}
                <td className="px-2 py-2.5">
                  <ProgressCell pct={row.pct} />
                </td>
                <td className="hidden px-3 py-2.5 text-right font-mono text-[10px] text-muted-foreground @3xl:table-cell">
                  {row.created}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockAppFrame>
  );
}
