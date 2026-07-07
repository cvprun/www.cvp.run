import {ArrowRight} from 'lucide-react';
import {Link, useParams} from 'react-router-dom';

import {CtaButtons} from '@/components/cta-buttons';
import {FinalCta} from '@/components/final-cta';
import {Footer} from '@/components/footer';
import {MOCKS} from '@/components/mocks';
import {NotFoundPage} from '@/pages/not-found';
import {Reveal} from '@/components/reveal';
import {TopBar} from '@/components/top-bar';
import {useLanguage} from '@/lib/i18n';
import {FEATURE_PAGES, getFeaturePage, type FeatureCategory} from '@/lib/site';
import {usePageMeta} from '@/lib/use-page-meta';
import {cn} from '@/lib/utils';

export function FeaturePage({category}: {category: FeatureCategory}) {
  const {t} = useLanguage();
  const {slug} = useParams();
  const def = getFeaturePage(category, slug);

  const meta = def ? t.pageMeta[def.slug] : null;
  const page = def ? t.pages[def.slug] : null;
  usePageMeta(meta ? `${meta.label} — CVP` : 'CVP', page ? page.intro : undefined);

  if (!def || !page || !meta) {
    return <NotFoundPage />;
  }

  const kicker =
    def.category === 'labeling'
      ? t.featurePage.labelingKicker
      : def.category === 'platform'
        ? t.featurePage.platformKicker
        : t.featurePage.moreKicker;
  const HeroMock = def.heroMock ? MOCKS[def.heroMock] : null;
  const inDevelopment = def.status === 'development';

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="flex-1">
        {/* intro */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-glow opacity-40" />
          <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16">
            <div className="mx-auto max-w-3xl text-center">
              <p className="flex items-center justify-center gap-2 text-sm font-semibold tracking-wide text-brand-cyan uppercase">
                {kicker} · {meta.label}
                {inDevelopment && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium tracking-normal text-amber-600 normal-case dark:text-amber-400">
                    <span className="size-1.5 animate-pulse rounded-full bg-amber-500" />
                    {t.featurePage.statusInDevelopment}
                  </span>
                )}
              </p>
              <h1 className="mt-4 text-3xl leading-[1.12] font-extrabold tracking-tight text-balance sm:text-5xl">
                {page.title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
                {page.intro}
              </p>
              {inDevelopment ? (
                <p className="mx-auto mt-6 max-w-xl text-xs text-muted-foreground">
                  {t.featurePage.developmentNote}
                </p>
              ) : (
                <div className="mt-8">
                  <CtaButtons withNote={false} />
                </div>
              )}
            </div>

            {HeroMock && (
              <Reveal className="relative mx-auto mt-12 max-w-5xl" delay={100}>
                <div className="pointer-events-none absolute -inset-x-8 -top-8 bottom-0 -z-10 bg-mesh-glow opacity-30" />
                <HeroMock />
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {t.misc.mockNote}
                </p>
              </Reveal>
            )}
          </div>
        </section>

        {/* detail sections — copy matched 1:1 with a mock when available */}
        {page.sections.map((section, i) => {
          const mockKey = def.sectionMocks[i] ?? null;
          const Mock = mockKey ? MOCKS[mockKey] : null;
          return (
            <section
              key={section.title}
              className={cn('border-t border-border', i % 2 === 1 && 'bg-muted/20')}
            >
              <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
                {Mock ? (
                  <div className="grid items-center gap-10 lg:grid-cols-2">
                    <Reveal className={i % 2 === 1 ? 'lg:order-2' : undefined}>
                      <div className="max-w-xl">
                        <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                          {section.title}
                        </h2>
                        <p className="mt-4 leading-relaxed text-muted-foreground">
                          {section.body}
                        </p>
                      </div>
                    </Reveal>
                    <Reveal
                      delay={100}
                      className={i % 2 === 1 ? 'lg:order-1' : undefined}
                    >
                      <Mock />
                    </Reveal>
                  </div>
                ) : (
                  <Reveal>
                    <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
                      <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                        {section.title}
                      </h2>
                      <p className="leading-relaxed text-muted-foreground">
                        {section.body}
                      </p>
                    </div>
                  </Reveal>
                )}
              </div>
            </section>
          );
        })}

        {/* specs */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              {t.featurePage.specsTitle}
            </h2>
            <dl className="mt-5 overflow-hidden rounded-xl border border-border">
              {page.specs.rows.map(([label, value], i) => (
                <div
                  key={label}
                  className={cn(
                    'grid gap-1 px-5 py-3.5 sm:grid-cols-[12rem_1fr] sm:gap-4',
                    i % 2 === 1 && 'bg-muted/20',
                  )}
                >
                  <dt className="text-sm font-medium">{label}</dt>
                  <dd className="text-sm text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* related pages */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              {t.featurePage.relatedTitle}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {def.related.map(slug => {
                const related = FEATURE_PAGES.find(p => p.slug === slug);
                if (!related) {
                  return null;
                }
                return (
                  <Link
                    key={slug}
                    to={related.path}
                    className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand-cyan/60"
                  >
                    <span className="flex items-center justify-between gap-2 text-sm font-semibold">
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="truncate">{t.pageMeta[slug].label}</span>
                        {related.status === 'development' && (
                          <span className="shrink-0 rounded-full border border-amber-500/40 bg-amber-500/10 px-1.5 py-px text-[9px] font-medium text-amber-600 dark:text-amber-400">
                            {t.featurePage.statusInDevelopment}
                          </span>
                        )}
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {t.pageMeta[slug].tagline}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
