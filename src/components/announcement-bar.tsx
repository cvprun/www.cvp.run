import {ArrowRight, X} from 'lucide-react';
import {useState} from 'react';
import {Link} from 'react-router-dom';

import {useLanguage} from '@/lib/i18n';
import {paths} from '@/lib/site';

/** Bump when the announcement changes so a dismissed bar shows again. */
const ANNOUNCEMENT_ID = '2026-10-inference';
const STORAGE_KEY = 'cvp-announcement-dismissed';

function readDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === ANNOUNCEMENT_ID;
  } catch {
    return false;
  }
}

/** One-line product news above the top bar, linking to the changelog. */
export function AnnouncementBar() {
  const {t} = useLanguage();
  const [dismissed, setDismissed] = useState(readDismissed);

  if (dismissed) {
    return null;
  }

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, ANNOUNCEMENT_ID);
    } catch {
      // Storage may be blocked; the bar then simply hides for this visit.
    }
    setDismissed(true);
  };

  return (
    <div className="border-b border-border bg-muted/30 text-xs">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6">
        <Link
          to={paths.changelog}
          className="group flex min-w-0 flex-1 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="shrink-0 rounded-sm border border-border px-1.5 leading-5 font-medium text-foreground">
            {t.announcement.label}
          </span>
          <span className="truncate">{t.announcement.text}</span>
          <span className="hidden shrink-0 items-center gap-1 font-medium text-foreground sm:inline-flex">
            {t.announcement.cta}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t.announcement.dismiss}
          className="-mr-1 shrink-0 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
