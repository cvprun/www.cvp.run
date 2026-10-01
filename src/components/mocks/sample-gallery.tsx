import {
  ChartColumn,
  Check,
  Download,
  Upload,
  CircleCheck,
  File,
  FileCheck,
  FileImage,
  FilePenLine,
  Images,
  Layers,
  MessageSquareWarning,
  Shapes,
  Tags,
  Trash2,
  type LucideIcon,
} from 'lucide-react';

import {ViewModeSwitcher} from '@/components/mocks/dataset-grid';
import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {Swatch} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/** Real photos from the Open Images V6 validation split (CC BY 2.0) — the
 * same urban-traffic subset the image-editor mock is labeled on. */
type SampleStatus = 'unlabeled' | 'in_progress' | 'labeled' | 'reviewed';

type Sample = {
  file: string;
  img: string;
  status: SampleStatus;
  checked?: boolean;
};

const SAMPLES: Sample[] = [
  {file: 'street_0419.jpg', img: '/mockdata/gallery/g02.webp', status: 'labeled'},
  {
    file: 'street_0420.jpg',
    img: '/mockdata/gallery/g03.webp',
    status: 'in_progress',
    checked: true,
  },
  {file: 'street_0421.jpg', img: '/mockdata/gallery/g01.webp', status: 'labeled'},
  {file: 'street_0422.jpg', img: '/mockdata/gallery/g04.webp', status: 'reviewed'},
  {
    file: 'street_0423.jpg',
    img: '/mockdata/gallery/g05.webp',
    status: 'labeled',
    checked: true,
  },
  {file: 'street_0424.jpg', img: '/mockdata/gallery/g06.webp', status: 'labeled'},
  {file: 'street_0425.jpg', img: '/mockdata/gallery/g07.webp', status: 'in_progress'},
  {file: 'street_0426.jpg', img: '/mockdata/gallery/g08.webp', status: 'unlabeled'},
  {file: 'street_0427.jpg', img: '/mockdata/gallery/g09.webp', status: 'labeled'},
  {file: 'street_0428.jpg', img: '/mockdata/gallery/g10.webp', status: 'unlabeled'},
  {file: 'street_0429.jpg', img: '/mockdata/gallery/g11.webp', status: 'reviewed'},
  {file: 'street_0430.jpg', img: '/mockdata/gallery/g12.webp', status: 'labeled'},
];

const CLASS_COUNTS = [
  {name: 'car', color: '#6496F5', count: '1,428'},
  {name: 'person', color: '#FF1E1E', count: '861'},
  {name: 'truck', color: '#501EB4', count: '214'},
  {name: 'traffic-light', color: '#FFC800', count: '442'},
  {name: 'traffic-sign', color: '#FF0000', count: '536'},
];

function StatusBadge({status}: {status: SampleStatus}) {
  const {t} = useLanguage();
  const m = t.mocks.datasets;
  const map: Record<
    SampleStatus,
    {icon: LucideIcon; label: string; className: string}
  > = {
    unlabeled: {
      icon: File,
      label: m.statusUnlabeled,
      className: 'border border-border text-muted-foreground',
    },
    in_progress: {
      icon: FilePenLine,
      label: m.statusInProgress,
      className: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
    },
    labeled: {
      icon: FileImage,
      label: m.statusLabeled,
      className: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400',
    },
    reviewed: {
      icon: FileCheck,
      label: m.statusReviewed,
      className: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400',
    },
  };
  const {icon: Icon, label, className} = map[status];
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-0.5 rounded px-1 py-0.5 text-[8px] font-medium',
        className,
      )}
    >
      <Icon className="size-2.5" />
      {label}
    </span>
  );
}

function StatChip({
  icon: Icon,
  label,
  count,
  active = false,
}: {
  icon: LucideIcon;
  label: string;
  count: number;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        'flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px]',
        active ? 'border-primary bg-primary/10' : 'border-border text-muted-foreground',
      )}
    >
      <Icon className="size-3" />
      {label}
      <span className="font-semibold tabular-nums">{count}</span>
    </span>
  );
}

export function MockSampleGallery() {
  const {t} = useLanguage();
  const m = t.mocks.datasets;
  const g = m.gallery;

  const tabs = [
    {icon: Images, label: g.tabSamples, active: true},
    {icon: Upload, label: g.tabUpload},
    {icon: Download, label: g.tabDownload},
    {icon: Shapes, label: g.tabClasses},
    {icon: Tags, label: g.tabTags},
    {icon: ChartColumn, label: g.tabQa},
  ];

  return (
    <MockAppFrame
      activeNav="datasets"
      crumbs={[{icon: Images, label: g.datasetName}]}
      title={g.datasetName}
      titleIcon={Images}
      actions={
        <span className="hidden @2xl:flex">
          <MockButton icon={Trash2} variant="destructive">
            {g.deleteSelected('2')}
          </MockButton>
        </span>
      }
      tabs={tabs}
    >
      {/* labeling statistics */}
      <div className="rounded-md border border-border bg-card p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold">{m.statsTitle}</span>
          <span className="text-[10px] text-muted-foreground">{m.annotations}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="font-mono tabular-nums">{m.progressCounter}</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
          <span className="block h-full w-[66%] rounded-full bg-primary" />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <StatChip icon={File} label={m.statusUnlabeled} count={120} />
          <StatChip icon={FilePenLine} label={m.statusInProgress} count={300} />
          <StatChip icon={FileImage} label={m.statusLabeled} count={620} active />
          <StatChip icon={FileCheck} label={m.statusReviewed} count={200} />
          <span className="mx-0.5 h-4 w-px bg-border" />
          <StatChip icon={MessageSquareWarning} label={m.issueOpen} count={3} />
          <StatChip icon={CircleCheck} label={m.issueResolved} count={12} />
        </div>
        <div className="mt-2.5 border-t border-border/60 pt-2">
          <span className="text-[9px] tracking-wider text-muted-foreground uppercase">
            {m.byClass}
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {CLASS_COUNTS.map(c => (
              <span
                key={c.name}
                className="flex items-center gap-1.5 rounded-full border border-border bg-background px-2 py-0.5 text-[10px]"
              >
                <Swatch color={c.color} round />
                {c.name}
                <span className="font-mono text-[9px] text-muted-foreground">
                  {c.count}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* toolbar: label overlay toggle + view switcher */}
      <div className="mt-3 flex items-center justify-end gap-1.5">
        <MockButton icon={Layers}>{g.showLabels}</MockButton>
        <ViewModeSwitcher active="grid" />
      </div>

      {/* sample grid — real Open Images photos */}
      <div className="mt-2 grid grid-cols-3 gap-2 @2xl:grid-cols-4 @5xl:grid-cols-6">
        {SAMPLES.map(sample => (
          <div
            key={sample.file}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <div className="relative aspect-square w-full">
              <span
                className={cn(
                  'absolute top-1.5 left-1.5 z-10 flex size-3.5 items-center justify-center rounded border',
                  sample.checked
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background/80',
                )}
              >
                {sample.checked && <Check className="size-2.5" />}
              </span>
              <img
                src={sample.img}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-1 px-1.5 py-1">
              <span className="min-w-0 flex-1 truncate text-[9px] font-medium">
                {sample.file}
              </span>
              <StatusBadge status={sample.status} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <span className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-[11px] text-muted-foreground">
          {g.loadMore}
        </span>
      </div>
    </MockAppFrame>
  );
}
