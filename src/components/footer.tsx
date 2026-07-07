import {Link} from 'react-router-dom';

import {Logo} from '@/components/logo';
import {useLanguage} from '@/lib/i18n';
import {FEATURE_PAGES, paths} from '@/lib/site';

export function Footer() {
  const {t} = useLanguage();

  const labeling = FEATURE_PAGES.filter(p => p.category === 'labeling');
  const platform = FEATURE_PAGES.filter(p => p.category === 'platform');

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t.footer.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-16">
            <div>
              <h3 className="text-sm font-semibold">{t.footer.labelingTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {labeling.map(page => (
                  <li key={page.slug}>
                    <Link
                      to={page.path}
                      className="transition-colors hover:text-foreground"
                    >
                      {t.pageMeta[page.slug].label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">{t.footer.platformTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {platform.map(page => (
                  <li key={page.slug}>
                    <Link
                      to={page.path}
                      className="transition-colors hover:text-foreground"
                    >
                      {t.pageMeta[page.slug].label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">{t.footer.companyTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    to={paths.pricing}
                    className="transition-colors hover:text-foreground"
                  >
                    {t.footer.pricing}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{t.footer.copyright}</span>
          <span className="text-xs">{t.footer.roadmapNote}</span>
        </div>
      </div>
    </footer>
  );
}
