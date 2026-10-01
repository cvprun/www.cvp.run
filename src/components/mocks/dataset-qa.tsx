import {
  ChartColumn,
  Download,
  Images,
  Shapes,
  Square,
  Tags,
  Upload,
} from 'lucide-react';

import {MockAppFrame} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Dataset detail → QA & 통계 tab (`pages/(app)/proj/datasets/[datasetId]/qa.tsx`):
 * overview (progress bar + 5 figures), class distribution (horizontal bars in
 * class colors), class co-occurrence heatmap, objects-per-sample histogram.
 */
const COPY = {
  ko: {
    datasetName: '차량 감지 v3',
    tabs: ['샘플', '업로드', '다운로드', '클래스', '태그', 'QA & 통계'],
    overview: '개요',
    progress: '라벨링 진행률',
    samples: '샘플',
    annotations: '어노테이션',
    classes: '클래스',
    tags: '태그',
    comments: '코멘트',
    classDistribution: '클래스 분포',
    classDistributionDescription:
      '클래스별 어노테이션 수입니다. 어노테이션이 없는 클래스는 데이터 불균형의 신호일 수 있습니다.',
    hideEmpty: '샘플 없는 클래스 숨기기',
    classSamples: '샘플',
    coOccurrence: '클래스 동시 등장',
    coOccurrenceDescription: '두 클래스가 같은 샘플에 함께 등장한 횟수입니다.',
    topClasses: '상위 클래스',
    objectCounts: '샘플당 객체 수',
    objectCountsDescription: '각 샘플이 가진 어노테이션 개수 분포입니다.',
    avg: '평균',
    max: '최대',
  },
  en: {
    datasetName: 'Vehicle detection v3',
    tabs: ['Samples', 'Upload', 'Download', 'Classes', 'Tags', 'QA & Stats'],
    overview: 'Overview',
    progress: 'Labeling progress',
    samples: 'Samples',
    annotations: 'Annotations',
    classes: 'Classes',
    tags: 'Tags',
    comments: 'Comments',
    classDistribution: 'Class distribution',
    classDistributionDescription:
      'Annotation counts per class. Classes with no annotations may indicate an unbalanced dataset.',
    hideEmpty: 'Hide classes without samples',
    classSamples: 'Samples',
    coOccurrence: 'Class co-occurrence',
    coOccurrenceDescription: 'Number of samples where two classes appear together.',
    topClasses: 'Top classes',
    objectCounts: 'Objects per sample',
    objectCountsDescription: 'How many annotations each sample carries.',
    avg: 'Average',
    max: 'Max',
  },
} as const;

/** unlabeled / in progress / labeled / reviewed (LabelingProgressBar). */
const BY_STATUS = [120, 300, 620, 200];
const STATUS_COLORS = ['#a1a1aa', '#fbbf24', '#4ade80', '#38bdf8'];
const TOTAL = BY_STATUS.reduce((a, b) => a + b, 0);
const DONE = BY_STATUS[2] + BY_STATUS[3];

const CLASSES = [
  {id: 'car', color: '#6496F5', annotations: 1428, samples: 1012},
  {id: 'person', color: '#FF1E1E', annotations: 861, samples: 688},
  {id: 'traffic-sign', color: '#FF0000', annotations: 536, samples: 489},
  {id: 'traffic-light', color: '#FFC800', annotations: 442, samples: 402},
  {id: 'truck', color: '#501EB4', annotations: 214, samples: 196},
];
const ANNOTATIONS = CLASSES.reduce((a, c) => a + c.annotations, 0);

/** Samples where both classes appear (symmetric, keyed by sorted pair). */
const PAIRS: Record<string, number> = {
  'car|person': 612,
  'car|traffic-sign': 468,
  'car|traffic-light': 395,
  'car|truck': 188,
  'person|traffic-sign': 344,
  'person|traffic-light': 301,
  'person|truck': 97,
  'traffic-light|traffic-sign': 356,
  'traffic-sign|truck': 81,
  'traffic-light|truck': 72,
};
const PAIR_MAX = Math.max(...Object.values(PAIRS));
const pairCount = (a: string, b: string) => PAIRS[[a, b].sort().join('|')] ?? 0;

/** dataset_object_stats fixed bins. */
const BINS: [string, number][] = [
  ['0', 120],
  ['1', 96],
  ['2', 148],
  ['3', 172],
  ['4', 161],
  ['5', 134],
  ['6-10', 291],
  ['11-20', 98],
  ['21-50', 20],
  ['51+', 0],
];
const BIN_MAX = 300;

const HEAT_COLOR = '#2a78d6';

function Section({
  title,
  description,
  control,
  className,
  children,
}: {
  title: string;
  description?: string;
  control?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn('rounded-md border border-border bg-card p-3', className)}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="text-[11px] font-semibold">{title}</h4>
          {description && (
            <p className="mt-0.5 text-[10px] text-muted-foreground">{description}</p>
          )}
        </div>
        {control}
      </div>
      {children}
    </section>
  );
}

function SwitchControl({label}: {label: string}) {
  return (
    <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-muted-foreground">
      <span className="flex h-3.5 w-6 items-center rounded-full bg-primary p-px">
        <span className="ml-auto size-3 rounded-full bg-background" />
      </span>
      {label}
    </span>
  );
}

export function MockDatasetQa() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const tabIcons = [Images, Upload, Download, Shapes, Tags, ChartColumn];
  const tabs = c.tabs.map((label, i) => ({icon: tabIcons[i], label, active: i === 5}));
  const barMax = 1600;
  const ticks = [0, 400, 800, 1200, 1600];

  const figures: [string, string][] = [
    [c.samples, TOTAL.toLocaleString()],
    [c.annotations, ANNOTATIONS.toLocaleString()],
    [c.classes, String(CLASSES.length)],
    [c.tags, '4'],
    [c.comments, '15'],
  ];

  return (
    <MockAppFrame
      activeNav="datasets"
      crumbs={[{icon: Images, label: c.datasetName}, {label: c.tabs[5]}]}
      title={c.datasetName}
      titleIcon={Images}
      tabs={tabs}
    >
      <div className="relative max-h-[40rem] space-y-3 overflow-hidden">
        {/* overview */}
        <Section title={c.overview}>
          <div className="mt-2.5 space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground">{c.progress}</span>
              <span className="font-medium tabular-nums">
                {DONE} / {TOTAL} ({Math.round((DONE / TOTAL) * 100)}%)
              </span>
            </div>
            <span className="flex h-1.5 overflow-hidden rounded-full bg-muted">
              {BY_STATUS.map((n, i) => (
                <span
                  key={i}
                  style={{width: `${(n / TOTAL) * 100}%`, background: STATUS_COLORS[i]}}
                />
              ))}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 @3xl:grid-cols-5">
            {figures.map(([label, value]) => (
              <div key={label} className="rounded-md border border-border bg-card p-2">
                <div className="text-[10px] text-muted-foreground">{label}</div>
                <div className="mt-0.5 text-[15px] font-semibold tabular-nums">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* class distribution */}
        <Section
          title={c.classDistribution}
          description={c.classDistributionDescription}
          control={<SwitchControl label={c.hideEmpty} />}
        >
          <div className="mt-3 flex">
            <div className="w-20 shrink-0 space-y-1.5 pr-2 text-right">
              {CLASSES.map(cls => (
                <div
                  key={cls.id}
                  className="flex h-5 items-center justify-end truncate text-[10px] text-muted-foreground"
                >
                  {cls.id}
                </div>
              ))}
            </div>
            <div className="relative min-w-0 flex-1">
              {ticks.map(t => (
                <span
                  key={t}
                  className="absolute top-0 bottom-4 border-l border-dashed border-border"
                  style={{left: `${(t / barMax) * 100}%`}}
                />
              ))}
              <div className="relative space-y-1.5">
                {CLASSES.map(cls => (
                  <div key={cls.id} className="flex h-5 items-center">
                    <span
                      className="h-full rounded"
                      style={{
                        width: `${(cls.annotations / barMax) * 100}%`,
                        backgroundColor: cls.color,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="relative mt-1 h-3 text-[9px] text-muted-foreground tabular-nums">
                {ticks.map((t, i) => (
                  <span
                    key={t}
                    className={cn(
                      'absolute',
                      i === 0
                        ? ''
                        : i === ticks.length - 1
                          ? '-translate-x-full'
                          : '-translate-x-1/2',
                    )}
                    style={{left: `${(t / barMax) * 100}%`}}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ul className="mt-3 space-y-1">
            {CLASSES.map(cls => (
              <li key={cls.id} className="flex items-center gap-1.5 text-[10px]">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{backgroundColor: cls.color}}
                />
                <span className="min-w-0 flex-1 truncate font-medium">{cls.id}</span>
                <span className="text-muted-foreground tabular-nums">
                  {c.classSamples} {cls.samples.toLocaleString()}
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-full border border-border bg-background px-1.5 text-[9px] text-muted-foreground">
                  <Square className="size-2.5" />
                  <span className="tabular-nums">
                    {cls.annotations.toLocaleString()}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <div className="grid gap-3 @4xl:grid-cols-2">
          {/* co-occurrence heatmap */}
          <Section
            title={c.coOccurrence}
            description={c.coOccurrenceDescription}
            control={
              <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-muted-foreground">
                {c.topClasses}
                <span className="rounded-md border border-input px-1.5 py-0.5 text-foreground">
                  30
                </span>
              </span>
            }
          >
            <table className="mt-2 border-separate border-spacing-0 text-[9px]">
              <thead>
                <tr>
                  <th className="p-0.5" />
                  {CLASSES.map(col => (
                    <th key={col.id} className="h-16 w-8 p-0.5 align-bottom">
                      <span className="block max-w-[4.5rem] origin-bottom-left translate-x-2.5 -rotate-45 truncate text-left font-medium whitespace-nowrap">
                        {col.id}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CLASSES.map(row => (
                  <tr key={row.id}>
                    <th className="p-0.5 pr-1 text-right font-medium whitespace-nowrap">
                      {row.id}
                    </th>
                    {CLASSES.map(col => {
                      if (col.id === row.id) {
                        return (
                          <td
                            key={col.id}
                            className="h-8 w-8 border border-border/40 bg-muted/40"
                          />
                        );
                      }
                      const n = pairCount(row.id, col.id);
                      return (
                        <td
                          key={col.id}
                          className="h-8 w-8 border border-border/40 text-center tabular-nums"
                          style={{
                            backgroundColor: `color-mix(in oklab, ${HEAT_COLOR} ${
                              15 + Math.round((n / PAIR_MAX) * 60)
                            }%, transparent)`,
                          }}
                        >
                          {n}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* objects-per-sample histogram */}
          <Section title={c.objectCounts} description={c.objectCountsDescription}>
            <div className="mt-3 flex h-36 gap-1.5">
              <div className="flex w-6 shrink-0 flex-col justify-between pb-4 text-right text-[9px] text-muted-foreground tabular-nums">
                {[300, 200, 100, 0].map(v => (
                  <span key={v} className="leading-none">
                    {v}
                  </span>
                ))}
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="relative flex min-h-0 flex-1 items-end gap-1 border-b border-border">
                  {[1, 2, 3].map(i => (
                    <span
                      key={i}
                      className="absolute right-0 left-0 border-t border-dashed border-border"
                      style={{bottom: `${(i / 3) * 100}%`}}
                    />
                  ))}
                  {BINS.map(([label, n]) => (
                    <span
                      key={label}
                      // --chart-2 of the app theme
                      className="relative min-w-0 flex-1 rounded-t bg-[#0070f3] dark:bg-[#52a8ff]"
                      style={{height: `${(n / BIN_MAX) * 100}%`}}
                    />
                  ))}
                </div>
                <div className="flex h-4 items-center gap-1">
                  {BINS.map(([label]) => (
                    <span
                      key={label}
                      className="min-w-0 flex-1 truncate text-center text-[8px] text-muted-foreground"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <dl className="mt-2 flex gap-4 text-[10px]">
              <div className="flex gap-1">
                <dt className="text-muted-foreground">{c.avg}</dt>
                <dd className="font-medium tabular-nums">
                  {(ANNOTATIONS / TOTAL).toFixed(2)}
                </dd>
              </div>
              <div className="flex gap-1">
                <dt className="text-muted-foreground">{c.max}</dt>
                <dd className="font-medium tabular-nums">34</dd>
              </div>
            </dl>
          </Section>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-gradient-to-t from-background to-transparent" />
      </div>
    </MockAppFrame>
  );
}
