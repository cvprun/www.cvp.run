import {Check, ChevronDown} from 'lucide-react';

import {MockButton} from '@/components/mocks/app-frame';
import {seededRandom} from '@/components/mocks/mock-ui';
import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Upload wizard, time-series "Column roles" step: the track `Stepper`
 * (upload.tsx) over `_UploadTsMappingStep` — column table with a role per
 * column, preview sparkline and timestamp format / time zone / resample.
 */

type Role =
  | 'timestamp'
  | 'series_id'
  | 'target'
  | 'covariate_past'
  | 'covariate_known'
  | 'static'
  | 'ignore';

const COPY = {
  ko: {
    steps: ['시계열 표', '파일', '어노테이션', '컬럼', '검증', '옵션', '업로드'],
    title: '열 역할',
    desc: '타임스탬프·시리즈 ID·채널을 정합니다. 시리즈 ID 하나가 Parquet 샘플 하나가 됩니다.',
    readFrom: 'line_a.csv 기준 · 파일 3개',
    column: '열',
    detected: '감지된 형식',
    example: '예시 값',
    role: '역할',
    iso: 'ISO 8601',
    dtype: {f64: '실수', i64: '정수', str: '문자열'},
    distinct: (n: number) => `고유값 ${n}`,
    roles: {
      timestamp: '타임스탬프',
      series_id: '시리즈 ID',
      target: '대상 값',
      covariate_past: '공변량 · 과거만 앎',
      covariate_known: '공변량 · 미래도 앎',
      static: '정적 속성',
      ignore: '무시',
    } satisfies Record<Role, string>,
    preview: '미리보기',
    tsFormatLabel: '타임스탬프 형식',
    timezone: '시간대',
    timezoneHint: '오프셋 없는 타임스탬프에 적용합니다. 값은 UTC 로 저장합니다.',
    resample: '리샘플',
    keepOriginal: '원본 유지',
    storageNote:
      '시리즈별 Parquet(ts + 채널)로 저장합니다. 원본 파일은 보관하지 않고, 열 매핑은 샘플마다 기록합니다.',
    back: '뒤로',
    next: '다음',
  },
  en: {
    steps: [
      'Time-series table',
      'Files',
      'Annotations',
      'Columns',
      'Check',
      'Options',
      'Upload',
    ],
    title: 'Column roles',
    desc: 'Pick the timestamp, the series id and the channels. Each series id becomes one sample stored as Parquet.',
    readFrom: 'Columns from line_a.csv · 3 file(s)',
    column: 'Column',
    detected: 'Detected',
    example: 'Example',
    role: 'Role',
    iso: 'ISO 8601',
    dtype: {f64: 'Decimal', i64: 'Integer', str: 'Text'},
    distinct: (n: number) => `${n} distinct`,
    roles: {
      timestamp: 'Timestamp',
      series_id: 'Series id',
      target: 'Target',
      covariate_past: 'Covariate · past only',
      covariate_known: 'Covariate · known ahead',
      static: 'Static attribute',
      ignore: 'Ignore',
    } satisfies Record<Role, string>,
    preview: 'Preview',
    tsFormatLabel: 'Timestamp format',
    timezone: 'Time zone',
    timezoneHint: 'Used for timestamps without an offset. Values are stored in UTC.',
    resample: 'Resample',
    keepOriginal: 'Keep original',
    storageNote:
      'Stored per series as Parquet (ts + channels). Original files are not kept; the mapping is recorded on each sample.',
    back: 'Back',
    next: 'Next',
  },
} as const;

const CURRENT_STEP = 3;

const ROLE_DOT: Record<Role, string> = {
  timestamp: 'bg-foreground',
  series_id: 'bg-teal-600',
  target: 'bg-blue-600',
  covariate_past: 'bg-amber-500',
  covariate_known: 'bg-violet-500',
  static: 'bg-stone-400',
  ignore: 'bg-muted-foreground/30',
};

type Profile = {
  name: string;
  /** `iso` for a detected timestamp, else the dtype. */
  kind: 'iso' | 'f64' | 'i64' | 'str';
  distinct?: number;
  sample: string;
  role: Role;
};

const PROFILES: Profile[] = [
  {
    name: 'timestamp',
    kind: 'iso',
    sample: '2026-09-15T00:00:00+09:00',
    role: 'timestamp',
  },
  {name: 'machine_id', kind: 'str', distinct: 3, sample: 'press-01', role: 'series_id'},
  {name: 'vib_rms', kind: 'f64', sample: '2.13', role: 'target'},
  {name: 'motor_current', kind: 'f64', sample: '38.42', role: 'target'},
  {name: 'pressure', kind: 'f64', sample: '181.6', role: 'target'},
  {name: 'temp_c', kind: 'f64', sample: '57.9', role: 'covariate_past'},
  {name: 'shift_plan', kind: 'i64', sample: '1', role: 'covariate_known'},
  {name: 'line', kind: 'str', distinct: 1, sample: 'A', role: 'static'},
  {
    name: 'operator_note',
    kind: 'str',
    distinct: 42,
    sample: 'die change',
    role: 'ignore',
  },
];

/** Preview lines, in target order (`PREVIEW_COLORS`; #171717 → foreground). */
const PREVIEW: {name: string; color: string; f: (t: number, n: number) => number}[] = [
  {name: 'vib_rms', color: '#0070f3', f: (t, n) => 2 + Math.sin(t * 0.21) * 0.3 + n},
  {
    name: 'motor_current',
    color: 'var(--foreground)',
    f: (t, n) => 38 + Math.sin(t * 0.07 + 1) * 1.5 + n * 1.5,
  },
  {
    name: 'pressure',
    color: '#0f9d8a',
    f: (t, n) => 182 + Math.sin(t * 0.5) * 3 + n * 2,
  },
  {name: 'temp_c', color: '#d97706', f: (t, n) => 56 + t * 0.018 + n * 0.3},
];

const PREVIEW_PATHS = PREVIEW.map((s, k) => {
  const rand = seededRandom(100 + k);
  const values = Array.from({length: 120}, (_, t) => s.f(t, rand() - 0.5));
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pad = (hi - lo) * 0.08;
  return values
    .map((v, i) => {
      const x = 2 + (i / 119) * 396;
      const y = 2 + (1 - (v - lo + pad) / (hi - lo + pad * 2)) * 76;
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join('');
});

function SelectBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'flex h-6 min-w-0 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px] shadow-sm',
        className,
      )}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
    </span>
  );
}

export function MockTsColumnMapping() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockPanelFrame className="@container bg-background">
      <div className="space-y-4 p-4 text-[11px]">
        {/* Stepper (appearance="track") */}
        <div className="rounded-lg border border-border bg-card px-3 py-3">
          <ol className="flex items-center gap-1.5 @xl:gap-2.5">
            {c.steps.map((label, i) => {
              const done = i < CURRENT_STEP;
              const active = i === CURRENT_STEP;
              const last = i === c.steps.length - 1;
              return (
                <li
                  key={label}
                  className={cn(
                    'flex items-center gap-1.5 @xl:gap-2.5',
                    last ? 'shrink-0' : 'flex-1',
                  )}
                >
                  <span
                    className={cn(
                      'flex shrink-0 items-center gap-1.5 text-[11px] whitespace-nowrap',
                      active ? 'font-semibold' : 'font-medium',
                      !active && !done && 'text-muted-foreground',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded-full text-[10px]',
                        (done || active) && 'bg-primary text-primary-foreground',
                        active && 'font-semibold ring-[3px] ring-border',
                        !done && !active && 'border-[1.5px] border-muted-foreground/40',
                      )}
                    >
                      {done ? <Check className="size-3" strokeWidth={2.5} /> : i + 1}
                    </span>
                    <span className={cn(!active && 'hidden @4xl:inline')}>{label}</span>
                  </span>
                  {!last && (
                    <span
                      className={cn(
                        'h-0.5 min-w-2 flex-1 rounded-full',
                        done ? 'bg-primary' : 'bg-border',
                      )}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* UploadStepHeader */}
        <div className="flex flex-wrap items-end justify-between gap-x-5 gap-y-1.5">
          <div className="min-w-0">
            <h4 className="text-[15px] font-bold tracking-tight">{c.title}</h4>
            <p className="mt-1 text-[11px] text-muted-foreground">{c.desc}</p>
          </div>
          <span className="text-[10px] text-muted-foreground">{c.readFrom}</span>
        </div>

        <div className="grid gap-4 @3xl:grid-cols-[minmax(0,1fr)_15rem]">
          {/* column table (TableShell) */}
          <div className="overflow-hidden rounded-md border border-border bg-card">
            <table className="w-full table-fixed text-[11px]">
              <thead className="bg-muted/50 text-left text-[10px] text-muted-foreground">
                <tr className="h-8 border-b border-border">
                  <th className="px-2.5 font-medium">{c.column}</th>
                  <th className="hidden px-2.5 font-medium @lg:table-cell">
                    {c.detected}
                  </th>
                  <th className="hidden px-2.5 font-medium @4xl:table-cell">
                    {c.example}
                  </th>
                  <th className="w-40 px-2.5 font-medium">{c.role}</th>
                </tr>
              </thead>
              <tbody>
                {PROFILES.map(p => (
                  <tr key={p.name} className="border-b border-border last:border-b-0">
                    <td className="truncate px-2.5 py-1.5 font-mono text-[10.5px]">
                      {p.name}
                    </td>
                    <td className="hidden truncate px-2.5 py-1.5 text-[10.5px] text-muted-foreground @lg:table-cell">
                      {p.kind === 'iso' ? c.iso : c.dtype[p.kind]}
                      {p.distinct !== undefined && ` · ${c.distinct(p.distinct)}`}
                    </td>
                    <td className="hidden truncate px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground @4xl:table-cell">
                      {p.sample}
                    </td>
                    <td className="px-2.5 py-1.5">
                      <span className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            'size-1.5 shrink-0 rounded-full',
                            ROLE_DOT[p.role],
                          )}
                        />
                        <SelectBox className="flex-1">{c.roles[p.role]}</SelectBox>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="grid content-start gap-3 @lg:grid-cols-2 @3xl:grid-cols-1">
            <section className="space-y-2 rounded-md border border-border bg-card p-3">
              <h5 className="text-[11px] font-semibold">{c.preview}</h5>
              <svg
                viewBox="0 0 400 80"
                preserveAspectRatio="none"
                className="block h-20 w-full"
              >
                {PREVIEW_PATHS.map((d, i) => (
                  <path
                    key={PREVIEW[i].name}
                    d={d}
                    fill="none"
                    style={{stroke: PREVIEW[i].color}}
                    strokeWidth={1.25}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
              <ul className="flex flex-wrap gap-x-2.5 gap-y-1 text-[10px] text-muted-foreground">
                {PREVIEW.map(s => (
                  <li key={s.name} className="flex items-center gap-1">
                    <span className="h-0.5 w-2.5" style={{background: s.color}} />
                    <span className="font-mono">{s.name}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-2.5 rounded-md border border-border bg-card p-3">
              <div className="space-y-1">
                <p className="text-[10px] font-medium">{c.tsFormatLabel}</p>
                <SelectBox>{c.iso}</SelectBox>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-medium">{c.timezone}</p>
                <SelectBox>Asia/Seoul</SelectBox>
                <p className="text-[9.5px] leading-snug text-muted-foreground">
                  {c.timezoneHint}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-medium">{c.resample}</p>
                <SelectBox>{c.keepOriginal}</SelectBox>
              </div>
            </section>

            <p className="text-[9.5px] leading-relaxed text-muted-foreground @lg:col-span-2 @3xl:col-span-1">
              {c.storageNote}
            </p>
          </aside>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <MockButton>{c.back}</MockButton>
          <MockButton variant="default">{c.next}</MockButton>
        </div>
      </div>
    </MockPanelFrame>
  );
}
