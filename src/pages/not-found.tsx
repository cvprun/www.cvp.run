import {ArrowLeft, ArrowRight} from 'lucide-react';
import {Link} from 'react-router-dom';

import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n';
import {PAGE_ICONS} from '@/lib/page-icons';
import {FEATURE_PAGES, paths, type FeatureSlug} from '@/lib/site';
import {usePageMeta} from '@/lib/use-page-meta';

/** Pages offered when a URL does not resolve. */
const SUGGESTED: FeatureSlug[] = ['images', 'pointClouds', 'inference', 'mlops'];

export function NotFoundPage() {
  const {t} = useLanguage();
  usePageMeta(`${t.notFound.title} — CVP`, t.notFound.description);

  return (
    <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <div className="max-w-2xl">
        <p className="font-mono text-sm text-muted-foreground">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.notFound.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{t.notFound.description}</p>
        <Button asChild className="mt-8">
          <Link to={paths.home}>
            <ArrowLeft className="size-4" />
            {t.notFound.back}
          </Link>
        </Button>
      </div>

      <p className="mt-16 text-sm text-muted-foreground">{t.notFound.suggestions}</p>
      <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
        {SUGGESTED.map(slug => {
          const page = FEATURE_PAGES.find(p => p.slug === slug);
          if (!page) {
            return null;
          }
          const Icon = PAGE_ICONS[slug];
          return (
            <li key={slug} className="border-t border-border">
              <Link to={page.path} className="group block py-5">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="size-4 text-muted-foreground" />
                  <span className="underline-offset-4 group-hover:underline">
                    {t.pageMeta[slug].label}
                  </span>
                  <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1.5 block text-xs text-muted-foreground">
                  {t.pageMeta[slug].tagline}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
