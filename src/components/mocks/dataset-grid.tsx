import {
  ArrowUpRight,
  Box,
  Calendar,
  Images,
  Layers,
  Plus,
  Video,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame} from '@/components/mocks/app-frame';
import {Swatch} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import type {Translations} from '@/lib/translations';

const CLASS_COUNTS = [
  {name: 'car', color: '#6496F5', count: '1,204'},
  {name: 'person', color: '#FF1E1E', count: '861'},
  {name: 'traffic-sign', color: '#FF0000', count: '316'},
];

function DatasetCard({
  icon: Icon,
  name,
  description,
  samples,
  date,
  sampleCount,
}: {
  icon: LucideIcon;
  name: string;
  description: string;
  samples: string;
  date: string;
  sampleCount: (n: string) => string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="flex items-start gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40">
          <Icon className="size-4 text-muted-foreground" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium">{name}</span>
          <span className="block text-[9px] tracking-wider text-muted-foreground uppercase">
            {sampleCount(samples)}
          </span>
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-[11px] text-muted-foreground">
        {description}
      </p>
      <div className="mt-2.5 flex items-center gap-3 border-t border-border/60 pt-2.5 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Layers className="size-3" />
          {samples}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="size-3" />
          {date}
        </span>
        <ArrowUpRight className="ml-auto size-3" />
      </div>
    </div>
  );
}

function StatsPanel({m}: {m: Translations['mocks']['datasets']}) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold">{m.statsTitle}</span>
        <span className="text-[10px] text-muted-foreground">{m.annotations}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <span className="block h-full w-[66%] rounded-full bg-primary" />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
        <span className="rounded-full border border-border px-2 py-0.5 text-muted-foreground">
          {m.statusUnlabeled} 120
        </span>
        <span className="rounded-full border border-border px-2 py-0.5 text-muted-foreground">
          {m.statusInProgress} 300
        </span>
        <span className="rounded-full border border-primary bg-primary/10 px-2 py-0.5">
          {m.statusLabeled} 620
        </span>
        <span className="rounded-full border border-border px-2 py-0.5 text-muted-foreground">
          {m.statusReviewed} 200
        </span>
      </div>
      <div className="mt-2.5 border-t border-border/60 pt-2">
        <span className="text-[9px] tracking-wider text-muted-foreground uppercase">
          {m.byClass}
        </span>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {CLASS_COUNTS.map(c => (
            <span
              key={c.name}
              className="flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[10px]"
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
  );
}

export function MockDatasetGrid() {
  const {t} = useLanguage();
  const m = t.mocks.datasets;

  return (
    <MockAppFrame activeNav="datasets">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{m.title}</h3>
          <p className="mt-1 text-[11px] text-muted-foreground">{m.description}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-medium text-primary-foreground">
          <Plus className="size-3" />
          {m.newDataset}
        </span>
      </div>

      <div className="mt-4">
        <StatsPanel m={m} />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <DatasetCard
          icon={Images}
          name={m.names.image}
          description={m.names.imageDesc}
          samples="1,240"
          date="2026-07-01"
          sampleCount={m.sampleCount}
        />
        <DatasetCard
          icon={Video}
          name={m.names.video}
          description={m.names.videoDesc}
          samples="12"
          date="2026-06-24"
          sampleCount={m.sampleCount}
        />
        <DatasetCard
          icon={Box}
          name={m.names.pointCloud}
          description={m.names.pointCloudDesc}
          samples="86"
          date="2026-06-12"
          sampleCount={m.sampleCount}
        />
      </div>
    </MockAppFrame>
  );
}
