import {
  ArrowDownWideNarrow,
  ChartColumn,
  Check,
  ChevronDown,
  Download,
  Images,
  Layers,
  LayoutGrid,
  ListFilter,
  Search,
  Shapes,
  Table2,
  Tags,
  Trash2,
  Upload,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Dataset › 샘플 (`/proj/:p/datasets/:d`) on the list toolkit: the labeling
 * progress line, the toolbar (search, status segment with counts, filter,
 * sort, label overlay, S/M/L size, grid/table), and the selection bar in
 * "every matching sample" mode — the selection covers all 612 labeled
 * samples, not just this page, minus two excluded. Photos are real Open
 * Images V6 validation images (CC BY 2.0), the same urban-traffic subset the
 * image-editor mock is labeled on.
 */
const COPY = {
  ko: {
    dataset: '도심 주행 2026-10',
    tabs: ['샘플', '업로드', '다운로드', '클래스', '태그', 'QA & 통계'],
    progress: '라벨링 진행률',
    annotations: '어노테이션 8,931개',
    qa: 'QA 통계 보기',
    search: '이름 검색',
    segments: ['전체', '미라벨링', '진행 중', '라벨링 완료', '검토 완료'],
    filter: '필터',
    sort: '생성일',
    allMatching: '조건에 맞는 612개 모두 선택됨 · 제외 2개',
    pageOnly: '이 쪽만 선택',
    changeStatus: '상태 변경',
    clear: '선택 해제',
    remove: '삭제',
    labeled: '라벨링 완료',
    pager: '1–50 / 612',
  },
  en: {
    dataset: 'Urban drive 2026-10',
    tabs: ['Samples', 'Upload', 'Download', 'Classes', 'Tags', 'QA & Stats'],
    progress: 'Labeling progress',
    annotations: '8,931 annotations',
    qa: 'View QA stats',
    search: 'Search by name',
    segments: ['All', 'Unlabeled', 'In progress', 'Labeled', 'Reviewed'],
    filter: 'Filter',
    sort: 'Created',
    allMatching: 'All 612 matching samples selected · 2 excluded',
    pageOnly: 'Select this page only',
    changeStatus: 'Change status',
    clear: 'Clear selection',
    remove: 'Delete',
    labeled: 'Labeled',
    pager: '1–50 of 612',
  },
} as const;

/** `count_samples_by_status` for this dataset; dots as in the segment. */
const COUNTS = [1284, 402, 96, 612, 174];
const SEGMENT_DOTS = [
  '',
  'bg-slate-400',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-blue-500',
];
const ACTIVE_SEGMENT = 3;

/** Progress bar parts: unlabeled · in progress · labeled · reviewed. */
const BAR = [
  {count: 402, className: 'bg-zinc-400'},
  {count: 96, className: 'bg-amber-400'},
  {count: 612, className: 'bg-green-400'},
  {count: 174, className: 'bg-sky-400'},
];

const SAMPLES = Array.from({length: 12}, (_, i) => ({
  file: `street_${String(419 + i).padStart(4, '0')}.jpg`,
  img: `/mockdata/gallery/g${String(((i + 1) % 12) + 1).padStart(2, '0')}.webp`,
  excluded: i === 3 || i === 8,
}));

const TAB_ICONS: LucideIcon[] = [Images, Upload, Download, Shapes, Tags, ChartColumn];

export function MockSampleGallery() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const total = BAR.reduce((sum, part) => sum + part.count, 0);

  return (
    <MockAppFrame
      activeNav="datasets"
      crumbs={[{icon: Images, label: c.dataset}]}
      title={c.dataset}
      titleIcon={Images}
      tabs={c.tabs.map((label, i) => ({icon: TAB_ICONS[i], label, active: i === 0}))}
    >
      {/* progress line */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9.5px]">
        <span className="font-medium">{c.progress}</span>
        <span className="flex h-1.5 min-w-24 flex-1 overflow-hidden rounded-full bg-muted">
          {BAR.map(part => (
            <span
              key={part.className}
              className={part.className}
              style={{width: `${(part.count / total) * 100}%`}}
            />
          ))}
        </span>
        <span className="font-mono tabular-nums">786 / 1,284</span>
        <span className="hidden text-muted-foreground @xl:inline">{c.annotations}</span>
        <span className="hidden text-muted-foreground underline-offset-2 @2xl:inline">
          {c.qa}
        </span>
      </div>

      {/* toolbar */}
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <span className="flex h-6 w-28 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px] text-muted-foreground">
          <Search className="size-3 shrink-0" />
          {c.search}
        </span>
        <span className="flex gap-0.5 rounded-md bg-muted p-[3px]">
          {c.segments.map((label, i) => (
            <span
              key={label}
              className={cn(
                'flex items-center gap-1 rounded-[4px] px-1.5 py-0.5 text-[9.5px] font-medium whitespace-nowrap',
                i === ACTIVE_SEGMENT
                  ? 'bg-background shadow-sm'
                  : 'text-muted-foreground',
                (i === 1 || i === 2) && 'hidden @3xl:flex',
              )}
            >
              {SEGMENT_DOTS[i] && (
                <span className={cn('size-1.5 rounded-full', SEGMENT_DOTS[i])} />
              )}
              {label}
              <span className="opacity-60 tabular-nums">
                {COUNTS[i].toLocaleString('en-US')}
              </span>
            </span>
          ))}
        </span>
        <span className="ml-auto flex items-center gap-1">
          <MockButton icon={ListFilter} className="hidden @2xl:inline-flex">
            {c.filter}
          </MockButton>
          <MockButton icon={ArrowDownWideNarrow} className="hidden @4xl:inline-flex">
            {c.sort}
          </MockButton>
          <span className="flex size-6 items-center justify-center rounded-md border border-border text-muted-foreground">
            <Layers className="size-3" />
          </span>
          <span className="hidden overflow-hidden rounded-md border border-border text-[9px] font-medium @xl:flex">
            {['S', 'M', 'L'].map(size => (
              <span
                key={size}
                className={cn(
                  'px-1.5 py-1',
                  size === 'M' ? 'bg-accent' : 'text-muted-foreground',
                )}
              >
                {size}
              </span>
            ))}
          </span>
          <span className="flex overflow-hidden rounded-md border border-border">
            <span className="flex size-6 items-center justify-center bg-accent">
              <LayoutGrid className="size-3" />
            </span>
            <span className="flex size-6 items-center justify-center text-muted-foreground">
              <Table2 className="size-3" />
            </span>
          </span>
        </span>
      </div>

      {/* selection bar — every matching sample */}
      <div className="mt-2 flex flex-wrap items-center gap-2 rounded-md bg-muted/60 px-2.5 py-1.5 text-[9.5px]">
        <span className="font-medium">{c.allMatching}</span>
        <span className="text-muted-foreground underline underline-offset-2">
          {c.pageOnly}
        </span>
        <span className="ml-auto flex gap-1">
          <MockButton>
            {c.changeStatus}
            <ChevronDown className="size-2.5" />
          </MockButton>
          <MockButton className="hidden @xl:inline-flex">{c.clear}</MockButton>
          <MockButton icon={Trash2} variant="destructive">
            {c.remove}
          </MockButton>
        </span>
      </div>

      {/* sample grid */}
      <div className="mt-2 grid grid-cols-3 gap-2 @2xl:grid-cols-4 @5xl:grid-cols-6">
        {SAMPLES.map(sample => (
          <div
            key={sample.file}
            className={cn(
              'overflow-hidden rounded-lg border bg-card',
              sample.excluded ? 'border-border' : 'border-primary ring-1 ring-primary',
            )}
          >
            <div className="relative aspect-square w-full">
              <span
                className={cn(
                  'absolute top-1.5 left-1.5 z-10 flex size-3.5 items-center justify-center rounded border',
                  sample.excluded
                    ? 'border-border bg-background/80'
                    : 'border-primary bg-primary text-primary-foreground',
                )}
              >
                {!sample.excluded && <Check className="size-2.5" />}
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
              <span className="inline-flex shrink-0 items-center gap-0.5 rounded bg-green-100 px-1 py-0.5 text-[8px] font-medium text-green-700 dark:bg-green-500/15 dark:text-green-400">
                <Tags className="size-2.5" />
                <span className="hidden @3xl:inline">{c.labeled}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-end gap-2 text-[9.5px] text-muted-foreground">
        <span className="tabular-nums">{c.pager}</span>
        <span className="flex gap-0.5">
          {['1', '2', '3', '…', '13'].map(page => (
            <span
              key={page}
              className={cn(
                'flex size-5 items-center justify-center rounded-md',
                page === '1' ? 'bg-accent text-foreground' : '',
              )}
            >
              {page}
            </span>
          ))}
        </span>
      </div>
    </MockAppFrame>
  );
}
