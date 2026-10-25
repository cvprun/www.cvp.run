import {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';

import {AnnouncementBar} from '@/components/announcement-bar';
import {Footer} from '@/components/footer';
import {TopBar} from '@/components/top-bar';
import {useLanguage} from '@/lib/i18n';

/** Scrolls to the top on navigation, or to `#hash` targets once they render. */
function ScrollManager() {
  const {pathname, hash} = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // The target may mount a frame later (lazy mocks above it); retry briefly.
    let frame = 0;
    let tries = 0;
    const seek = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
      if (tries++ < 30) {
        frame = requestAnimationFrame(seek);
      }
    };
    seek();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

/** Shell shared by every page: skip link, announcement, top bar, footer. The
 * bar and footer stay mounted across navigation, as in a product app. */
export function SiteLayout() {
  const {t} = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-background px-3 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:ring-2 focus:ring-ring"
      >
        {t.nav.skipToContent}
      </a>
      <AnnouncementBar />
      <TopBar />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
