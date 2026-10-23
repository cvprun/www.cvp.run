import type {ReactNode} from 'react';

import {cn} from '@/lib/utils';

/** Small label above a section headline. Muted and in sentence case so the
 * headline carries the hierarchy, as in the app (no colored eyebrows). */
export function SectionLabel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={cn('text-sm font-medium text-muted-foreground', className)}>
      {children}
    </p>
  );
}

/** Left-aligned label + headline + description block shared by sections. */
export function SectionHeader({
  label,
  title,
  description,
  className,
}: {
  label?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2
        className={cn(
          'text-3xl font-semibold tracking-tight text-balance sm:text-4xl',
          label && 'mt-3',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
