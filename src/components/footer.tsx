import {Link} from 'react-router-dom';

import {LanguageSwitcher} from '@/components/language-switcher';
import {Logo} from '@/components/logo';
import {ModeToggle} from '@/components/mode-toggle';
import {NewsletterForm} from '@/components/newsletter-form';
import {useLanguage} from '@/lib/i18n';
import {NEWSLETTER_API_URL} from '@/lib/newsletter';
import {appLink, FEATURE_GROUPS, pagesIn, paths, type FeaturePageDef} from '@/lib/site';

type FooterLink = {to: string; label: string; external?: boolean};

function FooterColumn({title, links}: {title: string; links: FooterLink[]}) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
        {links.map(link => (
          <li key={link.to}>
            {link.external ? (
              <a href={link.to} className="transition-colors hover:text-foreground">
                {link.label}
              </a>
            ) : (
              <Link to={link.to} className="transition-colors hover:text-foreground">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const {t} = useLanguage();
  const toLinks = (pages: FeaturePageDef[]): FooterLink[] =>
    pages.map(page => ({to: page.path, label: t.pageMeta[page.slug].label}));

  const more = pagesIn('more');
  const signin = appLink('/signin');
  const resources: FooterLink[] = [
    {to: paths.pricing, label: t.footer.pricing},
    {to: paths.changelog, label: t.footer.changelog},
    {to: paths.security, label: t.footer.security},
    ...(signin ? [{to: signin, label: t.nav.login, external: true}] : []),
  ];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-12">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t.footer.description}
            </p>
            {NEWSLETTER_API_URL && (
              <>
                <h3 className="mt-8 text-sm font-semibold">{t.newsletter.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t.newsletter.description}
                </p>
                <NewsletterForm source="www-footer" className="mt-3" />
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-10 sm:grid-cols-3 lg:grid-cols-6">
            <FooterColumn
              title={t.footer.labelingTitle}
              links={toLinks(pagesIn('labeling'))}
            />
            <FooterColumn
              title={t.footer.platformTitle}
              links={toLinks(pagesIn('platform'))}
            />
            {FEATURE_GROUPS.map(group => (
              <FooterColumn
                key={group}
                title={t.nav.groups[group]}
                links={toLinks(more.filter(page => page.group === group))}
              />
            ))}
            <FooterColumn title={t.footer.resourcesTitle} links={resources} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span>{t.footer.copyright}</span>
            <span className="text-xs">{t.footer.roadmapNote}</span>
          </div>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
