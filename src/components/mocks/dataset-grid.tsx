import {
  Activity,
  ArrowDownWideNarrow,
  Box,
  CheckCheck,
  CircleQuestionMark,
  Database,
  Images,
  LayoutGrid,
  List,
  MoreHorizontal,
  PersonStanding,
  Plus,
  Tags,
  Video,
  LineSquiggle,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

type Row = {
  icon: LucideIcon;
  name: string;
  description: string;
  samples: string;
  /** unlabeled / in progress / labeled / reviewed */
  statuses: [number, number, number, number];
  created: string;
};

/** Status columns as in the app: icon + tint per labeling status. */
const STATUS_ICONS: {icon: LucideIcon; className: string}[] = [
  {icon: CircleQuestionMark, className: 'text-muted-foreground'},
  {icon: LineSquiggle, className: 'text-amber-600'},
  {icon: Tags, className: 'text-green-600'},
  {icon: CheckCheck, className: 'text-sky-600'},
];

const SEGMENT_COLORS = ['#a1a1aa', '#fbbf24', '#4ade80', '#38bdf8'];

/** `LabelingProgressBar`: zinc / amber / green / sky segments + percent. */
function ProgressCell({statuses}: {statuses: Row['statuses']}) {
  const total = statuses.reduce((a, b) => a + b, 0);
  const done = statuses[2] + statuses[3];
  return (
    <span className="flex items-center justify-center gap-1.5">
      <span className="flex h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        {statuses.map((n, i) => (
          <span
            key={i}
            style={{width: `${(n / total) * 100}%`, background: SEGMENT_COLORS[i]}}
          />
        ))}
      </span>
      <span className="w-7 text-right text-[10px] tabular-nums text-muted-foreground">
        {Math.round((done / total) * 100)}%
      </span>
    </span>
  );
}

/** Grid/table view switcher as rendered in the app's list headers. */
export function ViewModeSwitcher({active}: {active: 'grid' | 'table'}) {
  return (
    <span className="flex overflow-hidden rounded-md border border-border">
      <span
        className={cn(
          'flex h-6 w-6 items-center justify-center',
          active === 'grid' ? 'bg-accent text-foreground' : 'text-muted-foreground',
        )}
      >
        <LayoutGrid className="size-3" />
      </span>
      <span
        className={cn(
          'flex h-6 w-6 items-center justify-center',
          active === 'table' ? 'bg-accent text-foreground' : 'text-muted-foreground',
        )}
      >
        <List className="size-3" />
      </span>
    </span>
  );
}

export function MockDatasetGrid() {
  const {t} = useLanguage();
  const m = t.mocks.datasets;

  const rows: Row[] = [
    {
      icon: Images,
      name: m.names.image,
      description: m.names.imageDesc,
      samples: '1,240',
      statuses: [120, 300, 620, 200],
      created: '2026-09-01',
    },
    {
      icon: Video,
      name: m.names.video,
      description: m.names.videoDesc,
      samples: '12',
      statuses: [0, 2, 8, 2],
      created: '2026-08-24',
    },
    {
      icon: Box,
      name: m.names.pointCloud,
      description: m.names.pointCloudDesc,
      samples: '86',
      statuses: [6, 12, 52, 16],
      created: '2026-08-12',
    },
    {
      icon: Activity,
      name: m.names.timeSeries,
      description: m.names.timeSeriesDesc,
      samples: '48',
      statuses: [18, 6, 20, 4],
      created: '2026-09-20',
    },
  ];

  return (
    <MockAppFrame
      activeNav="datasets"
      title={m.title}
      actions={
        <MockButton icon={Plus} variant="default">
          {m.newDataset}
        </MockButton>
      }
      tabs={[
        {icon: Database, label: m.title, active: true},
        {icon: PersonStanding, label: m.keypointPresets},
      ]}
    >
      {/* list controls */}
      <div className="mb-3 flex items-center gap-1.5">
        <ViewModeSwitcher active="table" />
        <MockButton icon={ArrowDownWideNarrow}>{m.columns.created}</MockButton>
      </div>

      {/* dataset table (TableShell) */}
      <div className="overflow-hidden rounded-md border border-border bg-card">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="h-8 border-b border-border text-muted-foreground">
              <th className="px-2.5 text-left font-medium">{m.columns.name}</th>
              <th className="hidden px-2 text-left font-medium @4xl:table-cell">
                {m.columns.description}
              </th>
              <th className="px-2 text-center font-medium">{m.columns.samples}</th>
              {STATUS_ICONS.map(({icon: Icon, className}, i) => (
                <th key={i} className="hidden px-1 @3xl:table-cell">
                  <Icon className={cn('mx-auto size-3.5', className)} />
                </th>
              ))}
              <th className="px-2 text-center font-medium">{m.columns.progress}</th>
              <th className="hidden px-2 text-left font-medium @2xl:table-cell">
                {m.columns.created}
              </th>
              <th className="w-6" />
            </tr>
          </thead>
          <tbody>
            {rows.map(({icon: Icon, ...row}, ri) => (
              <tr key={row.name} className={cn(ri > 0 && 'border-t border-border')}>
                <td className="px-2.5 py-2 font-medium text-foreground">
                  <span className="flex items-center gap-2">
                    <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate">{row.name}</span>
                  </span>
                </td>
                <td className="hidden max-w-0 truncate px-2 py-2 text-muted-foreground @4xl:table-cell">
                  {row.description}
                </td>
                <td className="px-2 py-2 text-center tabular-nums">{row.samples}</td>
                {row.statuses.map((n, i) => (
                  <td
                    key={i}
                    className="hidden px-1 py-2 text-center tabular-nums text-muted-foreground @3xl:table-cell"
                  >
                    {n}
                  </td>
                ))}
                <td className="px-2 py-2">
                  <ProgressCell statuses={row.statuses} />
                </td>
                <td className="hidden px-2 py-2 text-[10px] tabular-nums text-muted-foreground @2xl:table-cell">
                  {row.created}
                </td>
                <td className="pr-2 text-muted-foreground">
                  <MoreHorizontal className="size-3.5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockAppFrame>
  );
}
