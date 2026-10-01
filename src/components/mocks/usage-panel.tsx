import {MockAppFrame} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * `/proj/:id/usage` (`pages/(app)/proj/usage`): near-limit banner, 추이
 * (`UsageCharts`: one uPlot panel per metric, 24 hourly buckets for 실시간),
 * 종량 사용량 (`MeteredUsageSection`) and 할당량 (`UsageMetricCard` grid).
 */
const COPY = {
  ko: {
    title: '사용량',
    plan: 'Pro 플랜',
    nearLimit: '그리드 행 사용량이 한도의 82%에 도달했습니다.',
    charts: '추이',
    range: '2026-09-30 15:00 — 2026-10-01 14:00',
    scopes: ['실시간', '일간', '월간', '연간'],
    hourly: '시간 단위',
    total: '기간 합계',
    latest: '현재',
    metered: '종량 사용량',
    meteredHint: '플랜 포함량을 넘긴 만큼만 크레딧에서 차감됩니다.',
    monthly: '월간',
    overage: (v: string) => `초과 ${v}`,
    spend: '이번 달 과금',
    thisPeriod: '이번 주기',
    balance: '크레딧 잔액 $12.34',
    spendCapOff: '지출 한도 꺼짐',
    costControl: '비용 제어 설정',
    quotas: '할당량',
    quotasHint:
      '한도에 도달하면 새로 만드는 것만 막히고 기존 데이터는 그대로 남습니다.',
    perGrid: '그리드 1개당 한도 · 가장 큰 그리드 기준',
    m: {
      agent_traffic: '에이전트 통신량',
      graph_node_runs: '그래프 노드 실행',
      api_calls: 'API 호출',
      storage: '스토리지',
      members: '멤버',
      grid_columns: '그리드 컬럼',
      grid_rows: '그리드 행',
      wiki_pages: '위키 페이지',
    },
  },
  en: {
    title: 'Usage',
    plan: 'Pro plan',
    nearLimit: 'Grid rows usage has reached 82% of the limit.',
    charts: 'Trends',
    range: '2026-09-30 15:00 — 2026-10-01 14:00',
    scopes: ['Realtime', 'Daily', 'Monthly', 'Yearly'],
    hourly: 'Hourly buckets',
    total: 'Total in range',
    latest: 'Current',
    metered: 'Metered usage',
    meteredHint: 'Only usage past the plan allowance is charged against credits.',
    monthly: 'Monthly',
    overage: (v: string) => `${v} over`,
    spend: 'Charged this month',
    thisPeriod: 'this period',
    balance: 'Credit balance $12.34',
    spendCapOff: 'Spend cap off',
    costControl: 'Cost controls',
    quotas: 'Quotas',
    quotasHint: 'Reaching a limit blocks new resources only; existing data stays.',
    perGrid: 'Per-grid limit · shows the largest grid',
    m: {
      agent_traffic: 'Agent traffic',
      graph_node_runs: 'Graph node runs',
      api_calls: 'API Calls',
      storage: 'Storage',
      members: 'Members',
      grid_columns: 'Grid columns',
      grid_rows: 'Grid rows',
      wiki_pages: 'Wiki pages',
    },
  },
} as const;

type MetricKey = keyof (typeof COPY)['ko']['m'];

/** `sysChartTheme` light series palette (3 verified colors, cycled). */
const SERIES = ['#2a78d6', '#eb6834', '#1baf7a'];

/** 24 hourly samples, deterministic, shaped like a working day. */
function hourly(base: number, amp: number, seed: number): number[] {
  let s = seed;
  return Array.from({length: 24}, (_, i) => {
    s = (s * 16807) % 2147483647;
    const hour = (15 + i) % 24;
    const day = hour >= 8 && hour <= 19 ? 1 : 0.25;
    return Math.max(0, base * day + amp * day * (s / 2147483647));
  });
}

const CHARTS: {
  metric: MetricKey;
  kind: 'bars' | 'line';
  headline: string;
  gauge?: boolean;
  values: number[];
}[] = [
  {
    metric: 'agent_traffic',
    kind: 'bars',
    headline: '3.8 GB',
    values: hourly(120, 180, 3),
  },
  {
    metric: 'graph_node_runs',
    kind: 'bars',
    headline: '1,284',
    values: hourly(40, 70, 17),
  },
  {metric: 'api_calls', kind: 'bars', headline: '18,420', values: hourly(600, 900, 29)},
  {
    metric: 'storage',
    kind: 'line',
    headline: '6.2 GB',
    gauge: true,
    values: Array.from({length: 24}, (_, i) => 5.6 + i * 0.024 + (i > 17 ? 0.08 : 0)),
  },
];

function Eyebrow({label, hint}: {label: string; hint?: string}) {
  return (
    <div className="mb-3">
      <p className="text-[9px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </p>
      <div className="mt-1.5 h-px w-8 bg-foreground/60" />
      {hint && <p className="mt-1.5 text-[10px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

const W = 240;
const H = 64;

function Panel({
  title,
  subtitle,
  headline,
  caption,
  color,
  kind,
  values,
}: {
  title: string;
  subtitle: string;
  headline: string;
  caption: string;
  color: string;
  kind: 'bars' | 'line';
  values: number[];
}) {
  const max = Math.max(...values) * 1.1;
  const min = kind === 'line' ? Math.min(...values) * 0.97 : 0;
  const y = (v: number) => H - 8 - ((v - min) / (max - min)) * (H - 12);
  const step = W / values.length;
  return (
    <div className="min-w-0 rounded-md border border-border bg-card px-3 pt-2.5 pb-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="truncate text-[11px] font-semibold">{title}</p>
        <span className="truncate text-[9px] text-muted-foreground">{subtitle}</span>
      </div>
      <span className="mt-1 flex items-center gap-1.5 text-[10px]">
        <span className="h-0.5 w-3 rounded-full" style={{backgroundColor: color}} />
        <span className="font-medium tabular-nums">{headline}</span>
        <span className="text-muted-foreground">{caption}</span>
      </span>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-1.5 block w-full">
        {[0.25, 0.5, 0.75].map(f => (
          <line
            key={f}
            x1={0}
            x2={W}
            y1={4 + f * (H - 12)}
            y2={4 + f * (H - 12)}
            className="stroke-border"
            strokeWidth={0.6}
          />
        ))}
        <line x1={0} x2={W} y1={H - 8} y2={H - 8} className="stroke-border" />
        {kind === 'bars' ? (
          values.map((v, i) => (
            <rect
              key={i}
              x={i * step + step * 0.15}
              y={y(v)}
              width={step * 0.7}
              height={H - 8 - y(v)}
              fill={color}
              rx={1}
            />
          ))
        ) : (
          <path
            d={values
              .map(
                (v, i) =>
                  `${i ? 'L' : 'M'}${(i * step + step / 2).toFixed(1)} ${y(v).toFixed(1)}`,
              )
              .join(' ')}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
          />
        )}
        {['15:00', '21:00', '03:00', '09:00'].map((label, i) => (
          <text
            key={label}
            x={i * 6 * step + step / 2}
            y={H - 1}
            fontSize={6.5}
            className="fill-muted-foreground"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

/** `UsageMetricCard`: eyebrow label, big value / limit, bar (≥70% yellow, ≥90% red). */
function MetricCard({
  label,
  value,
  limit,
  percent,
  badge,
  hint,
  className,
}: {
  label: string;
  value: string;
  limit: string;
  percent: number;
  badge?: string;
  hint?: string;
  className?: string;
}) {
  const bar =
    percent >= 90
      ? 'bg-destructive'
      : percent >= 70
        ? 'bg-yellow-500'
        : 'bg-foreground';
  return (
    <div className={cn('rounded-md border border-border bg-card p-3', className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[9px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
          {label}
        </p>
        {badge && (
          <span className="rounded-md bg-secondary px-1 py-px text-[8px] font-medium tracking-wider text-muted-foreground uppercase">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-1.5 mb-2 flex items-baseline gap-1">
        <span className="text-[20px] leading-tight font-semibold tracking-tight tabular-nums">
          {value}
        </span>
        <span className="text-[10px] text-muted-foreground tabular-nums">
          / {limit}
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-muted">
        <div
          className={cn('h-full rounded-full', bar)}
          style={{width: `${Math.min(percent, 100)}%`}}
        />
      </div>
      {hint && (
        <p className="mt-1.5 truncate text-[9px] text-muted-foreground tabular-nums">
          {hint}
        </p>
      )}
    </div>
  );
}

export function MockUsage() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="usage"
      title={c.title}
      actions={
        <span className="rounded-md border border-border px-1.5 py-0.5 text-[9px] font-medium tracking-wider">
          {c.plan}
        </span>
      }
    >
      {/* near-limit banner */}
      <div className="mb-4 rounded-md border border-yellow-500/40 bg-yellow-500/5 px-3 py-2 text-[10px]">
        {c.nearLimit}
      </div>

      {/* 추이 */}
      <section className="mb-5">
        <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1.5">
          <Eyebrow label={c.charts} />
          <div className="mb-3 flex items-center gap-2">
            <span className="hidden text-[9px] text-muted-foreground tabular-nums @4xl:inline">
              {c.range}
            </span>
            <span className="flex h-6 items-center rounded-md bg-muted p-0.5 text-[10px]">
              {c.scopes.map((scope, i) => (
                <span
                  key={scope}
                  className={cn(
                    'rounded-sm px-2 py-0.5',
                    i === 0
                      ? 'bg-background font-medium shadow-sm'
                      : 'text-muted-foreground',
                  )}
                >
                  {scope}
                </span>
              ))}
            </span>
          </div>
        </div>
        <div className="grid gap-2.5 @xl:grid-cols-2">
          {CHARTS.map((chart, i) => (
            <div key={chart.metric} className={cn(i >= 2 && 'hidden @4xl:block')}>
              <Panel
                title={c.m[chart.metric]}
                subtitle={c.hourly}
                headline={chart.headline}
                caption={chart.gauge ? c.latest : c.total}
                color={SERIES[i % 3]}
                kind={chart.kind}
                values={chart.values}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 종량 사용량 */}
      <section className="mb-5">
        <Eyebrow label={c.metered} hint={c.meteredHint} />
        <div className="grid gap-2.5 @xl:grid-cols-2 @4xl:grid-cols-3">
          <MetricCard
            label={c.m.agent_traffic}
            badge={c.monthly}
            value="21.6 GB"
            limit="50 GB"
            percent={43}
          />
          <MetricCard
            label={c.m.graph_node_runs}
            badge={c.monthly}
            value="11,240"
            limit="10,000"
            percent={100}
            hint={c.overage('1,240')}
            className="hidden @4xl:block"
          />
          <div className="rounded-md border border-border bg-card p-3">
            <p className="text-[9px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              {c.spend}
            </p>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span className="text-[20px] leading-tight font-semibold tracking-tight tabular-nums">
                $2.48
              </span>
              <span className="text-[10px] text-muted-foreground">{c.thisPeriod}</span>
            </div>
            <p className="mt-0.5 text-[9px] text-muted-foreground tabular-nums">
              {c.balance}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-border px-1 py-px text-[8px] font-medium tracking-wider uppercase">
                {c.spendCapOff}
              </span>
              <span className="text-[10px] text-muted-foreground underline underline-offset-2">
                {c.costControl}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 할당량 */}
      <section>
        <Eyebrow label={c.quotas} hint={c.quotasHint} />
        <div className="grid grid-cols-2 gap-2.5 @4xl:grid-cols-3">
          <MetricCard label={c.m.storage} value="6.2 GB" limit="10 GB" percent={62} />
          <MetricCard
            label={c.m.api_calls}
            badge={c.monthly}
            value="18,420"
            limit="100,000"
            percent={18}
          />
          <MetricCard label={c.m.members} value="8" limit="30" percent={27} />
          <MetricCard
            label={c.m.grid_rows}
            value="8,240"
            limit="10,000"
            percent={82}
            hint={c.perGrid}
          />
          <MetricCard
            label={c.m.grid_columns}
            value="42"
            limit="100"
            percent={42}
            hint={c.perGrid}
            className="hidden @4xl:block"
          />
          <MetricCard
            label={c.m.wiki_pages}
            value="46"
            limit="500"
            percent={9}
            className="hidden @4xl:block"
          />
        </div>
      </section>
    </MockAppFrame>
  );
}
