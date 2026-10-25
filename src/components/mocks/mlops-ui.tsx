/* eslint-disable react-refresh/only-export-components -- shared MLOps mock parts (tab builder) beside the badges */
import {
  Activity,
  Boxes,
  CheckCircle2,
  FlaskConical,
  GitCompare,
  LayoutDashboard,
  Loader2,
  Plug,
  XCircle,
} from 'lucide-react';
import type {ReactNode} from 'react';

import type {MockTab} from '@/components/mocks/app-frame';
import {cn} from '@/lib/utils';

/**
 * Parts shared by the MLOps mocks: the fixed six-tab bar (`MLOPS_TABS`), run
 * status badges (`RunStatusBadge`), the CVP/SDK source chip and alias chips.
 */
export type MlopsTabKey =
  | 'overview'
  | 'experiments'
  | 'runs'
  | 'compare'
  | 'models'
  | 'connect';

const TAB_LABELS: Record<'ko' | 'en', Record<MlopsTabKey, string>> = {
  ko: {
    overview: '개요',
    experiments: '실험',
    runs: '런',
    compare: '비교',
    models: '모델',
    connect: '연동',
  },
  en: {
    overview: 'Overview',
    experiments: 'Experiments',
    runs: 'Runs',
    compare: 'Compare',
    models: 'Models',
    connect: 'Connect',
  },
};

const TAB_ICONS = {
  overview: LayoutDashboard,
  experiments: FlaskConical,
  runs: Activity,
  compare: GitCompare,
  models: Boxes,
  connect: Plug,
} as const;

export function mlopsTabs(lang: 'ko' | 'en', active: MlopsTabKey): MockTab[] {
  return (Object.keys(TAB_ICONS) as MlopsTabKey[]).map(key => ({
    icon: TAB_ICONS[key],
    label: TAB_LABELS[lang][key],
    active: key === active,
  }));
}

export function mlopsTabLabel(lang: 'ko' | 'en', key: MlopsTabKey): string {
  return TAB_LABELS[lang][key];
}

export type RunTone = 'running' | 'preparing' | 'succeeded' | 'failed' | 'muted';

const TONE_CLASS: Record<RunTone, string> = {
  running: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400',
  preparing: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400',
  succeeded:
    'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  failed: 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400',
  muted: 'border-border bg-muted text-muted-foreground',
};

/** Outline status badge with its size-3 icon, as the run tables draw it. */
export function RunStatus({tone, children}: {tone: RunTone; children: ReactNode}) {
  const Icon =
    tone === 'running' || tone === 'preparing'
      ? Loader2
      : tone === 'succeeded'
        ? CheckCircle2
        : tone === 'failed'
          ? XCircle
          : null;
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-md border px-1.5 py-px text-[9px] font-medium whitespace-nowrap',
        TONE_CLASS[tone],
      )}
    >
      {Icon && (
        <Icon
          className={cn('size-2.5', tone === 'running' && 'motion-safe:animate-spin')}
        />
      )}
      {children}
    </span>
  );
}

/** `SourceBadge`: CVP training (filled) vs MLflow SDK (bordered). */
export function SourceBadge({source}: {source: 'cvp' | 'sdk'}) {
  return (
    <span
      className={cn(
        'inline-flex h-4 shrink-0 items-center rounded-[4px] px-1 text-[8.5px] font-medium',
        source === 'cvp' ? 'bg-foreground text-background' : 'border border-border',
      )}
    >
      {source === 'cvp' ? 'CVP' : 'SDK'}
    </span>
  );
}

/** Alias chip: @production filled, @staging outlined, @previous dashed. */
export function AliasChip({alias}: {alias: 'production' | 'staging' | 'previous'}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-[4px] px-1 font-mono text-[8.5px] font-medium',
        alias === 'production' && 'bg-foreground text-background',
        alias === 'staging' && 'border border-foreground/70',
        alias === 'previous' &&
          'border border-dashed border-border text-muted-foreground',
      )}
    >
      @{alias}
    </span>
  );
}

/** Metric delta against a baseline: emerald when better, red when worse. */
export function Delta({value, better}: {value: string; better: boolean}) {
  return (
    <span
      className={cn(
        'text-[9px] tabular-nums',
        better
          ? 'text-emerald-700 dark:text-emerald-400'
          : 'text-red-700 dark:text-red-400',
      )}
    >
      {value}
    </span>
  );
}
