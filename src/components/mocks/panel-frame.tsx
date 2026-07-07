import type {ReactNode} from 'react';

import {cn} from '@/lib/utils';

/** Frameless card for page-fragment mockups (tables, panels, dialogs). */
export function MockPanelFrame({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card text-left',
        'shadow-xl shadow-black/10 select-none',
        className,
      )}
      aria-hidden
    >
      {children}
    </div>
  );
}
