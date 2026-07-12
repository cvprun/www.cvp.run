import CvpFace from '@/assets/cvp-face.svg?react';
import {cn} from '@/lib/utils';

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <CvpFace className="size-6 text-foreground" aria-hidden />
      {showWordmark && <span className="text-base font-bold tracking-tight">CVP</span>}
    </span>
  );
}
