import {ArrowRight} from 'lucide-react';
import {useId, useState, type KeyboardEvent} from 'react';
import {Link} from 'react-router-dom';

import {preloadMock} from '@/components/mocks';
import {MockSlot} from '@/components/mocks/mock-slot';
import {useLanguage} from '@/lib/i18n';
import {PAGE_ICONS} from '@/lib/page-icons';
import {FEATURE_PAGES, type FeatureSlug, type MockKey} from '@/lib/site';
import {cn} from '@/lib/utils';

type TourStop = {slug: FeatureSlug; mock: MockKey};

/** The editors and the inference screen, one tab each, under the hero. */
const STOPS: readonly TourStop[] = [
  {slug: 'images', mock: 'imageEditor'},
  {slug: 'videos', mock: 'videoTimeline'},
  {slug: 'pointClouds', mock: 'pointCloudEditor'},
  {slug: 'timeSeries', mock: 'timeseriesEditor'},
  {slug: 'inference', mock: 'inferenceFeature'},
];

/**
 * Tabbed product tour: a tab per modality switches the large mock below it.
 * Follows the WAI-ARIA tabs pattern (arrow keys move between tabs); a tab's
 * mock chunk starts loading on hover or focus so switching feels instant.
 */
export function ProductTour() {
  const {t} = useLanguage();
  const [active, setActive] = useState(2);
  const baseId = useId();
  const stop = STOPS[active];
  const page = FEATURE_PAGES.find(p => p.slug === stop.slug);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : STOPS.length - 1;
      setActive(next);
      document.getElementById(`${baseId}-tab-${next}`)?.focus();
      return;
    }
    if (!delta) {
      return;
    }
    event.preventDefault();
    const next = (active + delta + STOPS.length) % STOPS.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={t.tour.label}
        className="flex gap-1 overflow-x-auto border-b border-border [scrollbar-width:none]"
      >
        {STOPS.map((item, i) => {
          const Icon = PAGE_ICONS[item.slug];
          const selected = i === active;
          return (
            <button
              key={item.slug}
              id={`${baseId}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              onMouseEnter={() => preloadMock(item.mock)}
              onFocus={() => preloadMock(item.mock)}
              className={cn(
                '-mb-px inline-flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:bg-accent/60',
                selected
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon className="size-4" />
              {t.tour.tabs[item.slug as keyof typeof t.tour.tabs]}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="pt-5"
      >
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <p className="max-w-2xl text-sm text-muted-foreground">
            {t.tour.captions[stop.slug as keyof typeof t.tour.captions]}
          </p>
          {page && (
            <Link
              to={page.path}
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              {t.tour.more}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
        {/* key: remount per tab so the slot shows its placeholder, not the old mock */}
        <MockSlot key={stop.mock} mock={stop.mock} eager />
      </div>
    </div>
  );
}
