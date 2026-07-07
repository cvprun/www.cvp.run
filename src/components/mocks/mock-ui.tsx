/* eslint-disable react-refresh/only-export-components -- mock helpers (seededRandom, turbo) co-located with mock primitives */
import type {LucideIcon} from 'lucide-react';

import {cn} from '@/lib/utils';

/**
 * Shared primitives for app mockups. Visual details (sizes, tokens, layout)
 * mirror app.cvp.run so mocks stay faithful to the real product UI.
 */

/** Rounded window frame every mockup sits in. */
export function MockWindow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-background text-left',
        'shadow-2xl shadow-black/10 select-none',
        className,
      )}
      aria-hidden
    >
      {children}
    </div>
  );
}

/** Browser chrome bar (traffic lights + address) for full-app mockups. */
export function MockChrome() {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
      <span className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-green-400/80" />
      </span>
      <span className="mx-auto rounded-md border border-border bg-background/60 px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
        app.cvp.run
      </span>
      <span className="w-12" />
    </div>
  );
}

/** App-style icon button (h-9 w-9 in the editor toolbar, h-8 w-8 in headers). */
export function MockIconButton({
  icon: Icon,
  active = false,
  dashed = false,
  size = 'md',
  label,
}: {
  icon: LucideIcon;
  active?: boolean;
  dashed?: boolean;
  size?: 'sm' | 'md';
  label?: string;
}) {
  return (
    <span
      title={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md',
        size === 'md' ? 'h-8 w-8' : 'h-7 w-7',
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent',
        dashed && 'border border-dashed opacity-50',
      )}
    >
      <Icon className={size === 'md' ? 'size-4' : 'size-3.5'} />
    </span>
  );
}

/** Class/track color swatch (`h-2.5 w-2.5 rounded` in the app). */
export function Swatch({color, round = false}: {color: string; round?: boolean}) {
  return (
    <span
      className={cn(
        'inline-block size-2.5 shrink-0',
        round ? 'rounded-full' : 'rounded',
      )}
      style={{backgroundColor: color}}
    />
  );
}

export function MockBadge({
  children,
  tone = 'secondary',
  className,
}: {
  children: React.ReactNode;
  tone?: 'secondary' | 'outline' | 'primary' | 'success' | 'warning' | 'destructive';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium',
        tone === 'secondary' && 'bg-muted text-muted-foreground',
        tone === 'outline' && 'border border-border text-muted-foreground',
        tone === 'primary' && 'bg-primary text-primary-foreground',
        tone === 'success' &&
          'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
        tone === 'warning' && 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
        tone === 'destructive' && 'bg-destructive/15 text-destructive',
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Deterministic pseudo-random sequence (LCG) for point scatters. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

/** Turbo-ish colormap stops used for height/intensity coloring. */
const TURBO = [
  '#30123b',
  '#4669db',
  '#26bce1',
  '#72fe5e',
  '#d3e835',
  '#fb7e21',
  '#d93807',
];

export function turbo(t: number): string {
  const clamped = Math.min(1, Math.max(0, t));
  return TURBO[Math.min(TURBO.length - 1, Math.floor(clamped * TURBO.length))];
}
