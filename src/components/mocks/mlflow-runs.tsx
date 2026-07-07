import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

const SERIES = [
  {
    key: 'accuracy',
    color: '#16a34a',
    points: [0.62, 0.74, 0.81, 0.86, 0.9, 0.93, 0.95, 0.97],
  },
  {
    key: 'loss',
    color: '#dc2626',
    points: [0.92, 0.61, 0.44, 0.31, 0.22, 0.16, 0.11, 0.083],
  },
  {
    key: 'val_loss',
    color: '#2563eb',
    points: [0.95, 0.7, 0.52, 0.4, 0.31, 0.24, 0.18, 0.13],
  },
];

function linePath(points: number[]): string {
  const width = 480;
  const height = 120;
  const pad = 8;
  const step = (width - pad * 2) / (points.length - 1);
  return points
    .map((value, i) => {
      const x = pad + i * step;
      const y = height - pad - value * (height - pad * 2);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

export function MockMlflowRuns() {
  const {t} = useLanguage();
  const m = t.mocks.mlflow;

  const runs = [
    {
      name: 'baseline-rfdetr',
      id: 'a3f9c2e1b4d8',
      status: 'FINISHED',
      start: '07-06 14:20',
      active: true,
    },
    {
      name: 'aug-mixup-v2',
      id: '7d1e0f5c9a23',
      status: 'RUNNING',
      start: '07-07 09:12',
      active: false,
    },
    {
      name: m.unnamed,
      id: 'f42b8a610c9e',
      status: 'FAILED',
      start: '07-05 18:03',
      active: false,
    },
  ];

  const params = [
    ['lr', '0.01'],
    ['batch_size', '32'],
    ['epochs', '80'],
  ];

  return (
    <MockPanelFrame>
      <div className="flex">
        {/* experiments list */}
        <aside className="hidden w-40 shrink-0 border-r border-border bg-muted/20 p-2 sm:block">
          <p className="px-2 py-1.5 text-[9px] font-semibold tracking-wider text-muted-foreground uppercase">
            {m.experiments}
          </p>
          <ul className="space-y-0.5">
            <li className="rounded bg-accent px-2 py-1 text-[11px] font-medium">
              {m.exp1}
            </li>
            <li className="rounded px-2 py-1 text-[11px] text-muted-foreground">
              {m.exp2}
            </li>
          </ul>
        </aside>

        <div className="min-w-0 flex-1">
          {/* runs table */}
          <div className="px-4 py-2.5">
            <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              {m.runs}
            </p>
            <div className="mt-1.5 grid grid-cols-[1.4fr_6rem_5rem_5rem] items-center gap-2 border-b border-border pb-1.5 text-[10px] text-muted-foreground">
              <span>{m.colName}</span>
              <span>{m.colRunId}</span>
              <span>{m.colStatus}</span>
              <span>{m.colStart}</span>
            </div>
            {runs.map(run => (
              <div
                key={run.id}
                className={cn(
                  'grid grid-cols-[1.4fr_6rem_5rem_5rem] items-center gap-2 border-b border-border/40 py-1.5 text-[11px] last:border-b-0',
                  run.active && 'bg-accent/40',
                )}
              >
                <span className="truncate font-medium">{run.name}</span>
                <span className="font-mono text-[9px] text-muted-foreground">
                  {run.id}
                </span>
                <span>
                  <span className="rounded-full border border-border px-1.5 py-px font-mono text-[9px] text-muted-foreground">
                    {run.status}
                  </span>
                </span>
                <span className="font-mono text-[9px] text-muted-foreground">
                  {run.start}
                </span>
              </div>
            ))}
          </div>

          {/* metrics chart + params */}
          <div className="grid gap-3 border-t border-border px-4 py-3 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                {m.metricsTitle}
              </p>
              <svg
                viewBox="0 0 480 120"
                className="mt-1.5 w-full rounded border border-border bg-background"
              >
                {[30, 60, 90].map(y => (
                  <line
                    key={y}
                    x1={8}
                    x2={472}
                    y1={y}
                    y2={y}
                    className="stroke-border"
                    strokeWidth={0.5}
                  />
                ))}
                {SERIES.map(series => (
                  <path
                    key={series.key}
                    d={linePath(series.points)}
                    fill="none"
                    stroke={series.color}
                    strokeWidth={1.5}
                  />
                ))}
              </svg>
              <div className="mt-1.5 flex gap-3">
                {SERIES.map(series => (
                  <span
                    key={series.key}
                    className="flex items-center gap-1 font-mono text-[9px] text-muted-foreground"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-sm"
                      style={{backgroundColor: series.color}}
                    />
                    {series.key}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                {m.paramsTitle}
              </p>
              <div className="mt-1.5 overflow-hidden rounded border border-border">
                <div className="grid grid-cols-2 gap-2 border-b border-border bg-muted/30 px-2 py-1 text-[9px] text-muted-foreground">
                  <span>{m.colKey}</span>
                  <span>{m.colValue}</span>
                </div>
                {params.map(([key, value]) => (
                  <div
                    key={key}
                    className="grid grid-cols-2 gap-2 border-b border-border/40 px-2 py-1 text-[10px] last:border-b-0"
                  >
                    <span className="font-mono text-muted-foreground">{key}</span>
                    <span className="font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockPanelFrame>
  );
}
