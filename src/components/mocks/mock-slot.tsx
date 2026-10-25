import {Suspense, useEffect, useRef, useState} from 'react';

import {MOCKS} from '@/components/mocks';
import type {MockKey} from '@/lib/site';
import {cn} from '@/lib/utils';

/** Reserved space while a mock's chunk loads — the same window outline the
 * mock draws, so the page does not jump when it arrives. */
export function MockPlaceholder({className}: {className?: string}) {
  return (
    <div
      aria-hidden
      className={cn(
        'h-[26rem] rounded-xl border border-border bg-muted/20 motion-safe:animate-pulse',
        className,
      )}
    />
  );
}

/**
 * Renders a registered mock lazily. The chunk is requested once the slot comes
 * within ~600px of the viewport (`eager` skips the wait for above-the-fold
 * mocks), so a long page downloads screens as the visitor scrolls to them.
 */
export function MockSlot({
  mock,
  eager = false,
  className,
}: {
  mock: MockKey;
  eager?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(eager);

  useEffect(() => {
    if (near) {
      return;
    }
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      {rootMargin: '600px 0px'},
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [near]);

  const Mock = MOCKS[mock];
  return (
    <div ref={ref} className={className}>
      {near ? (
        <Suspense fallback={<MockPlaceholder />}>
          <Mock />
        </Suspense>
      ) : (
        <MockPlaceholder />
      )}
    </div>
  );
}
