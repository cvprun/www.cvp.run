import {ArrowRight} from 'lucide-react';
import {Link, useParams} from 'react-router-dom';

import {CtaButtons} from '@/components/cta-buttons';
import {DevelopmentBadge} from '@/components/development-badge';
import {FinalCta} from '@/components/final-cta';
import {LabelingToolsSection} from '@/components/labeling-tools';
import {MockSlot} from '@/components/mocks/mock-slot';
import {NotFoundPage} from '@/pages/not-found';
import {Reveal} from '@/components/reveal';
import {SectionLabel} from '@/components/section-header';
import {useLanguage} from '@/lib/i18n';
import {PAGE_ICONS} from '@/lib/page-icons';
import {FEATURE_PAGES, getFeaturePage, type FeatureCategory} from '@/lib/site';
import {usePageMeta} from '@/lib/use-page-meta';
import {cn} from '@/lib/utils';

/** Pages whose mocks show real open-dataset media (see t.misc.dataNote). */
const REAL_DATA_SLUGS = new Set([
  'images',
  'videos',
  'pointClouds',
  'datasets',
  'review',
  'training',
  'inference',
  'media',
]);

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
  const inDevelopment = def.status === 'development';

  return (
    <>
      {/* intro */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16">
          <div className="max-w-3xl">
            <SectionLabel className="flex items-center gap-2">
              {kicker} · {meta.label}
              {inDevelopment && <DevelopmentBadge />}
            </SectionLabel>
            <h1 className="mt-4 text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {page.intro}
            </p>
            {inDevelopment ? (
              <p className="mt-6 max-w-xl border-l-2 border-amber-500/60 pl-3 text-xs text-muted-foreground">
                {t.featurePage.developmentNote}
              </p>
            ) : (
              <div className="mt-8">
                <CtaButtons withNote={false} />
              </div>
            )}
          </div>

          {def.heroMock && (
            <Reveal className="mt-12" delay={100}>
              <MockSlot mock={def.heroMock} eager />
              <p className="mt-3 text-xs text-muted-foreground">{t.misc.mockNote}</p>
              {REAL_DATA_SLUGS.has(def.slug) && (
                <p className="mt-1 text-[11px] text-muted-foreground/70">
                  {t.misc.dataNote}
                </p>
              )}
            </Reveal>
          )}
        </div>
      </section>

      {/* labeling-tool grid — renders only on the labeling editor pages */}
      <LabelingToolsSection slug={def.slug} tinted />

      {/* detail sections — copy matched 1:1 with a mock when available */}
      {page.sections.map((section, i) => {
        const mockKey = def.sectionMocks[i] ?? null;
        return (
          <section
            key={section.title}
            className={cn('border-t border-border', i % 2 === 1 && 'bg-muted/20')}
          >
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
              {mockKey ? (
                <div className="grid items-center gap-10 lg:grid-cols-2 [&>*]:min-w-0">
                  <Reveal className={i % 2 === 1 ? 'lg:order-2' : undefined}>
                    <div className="max-w-xl">
                      <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
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
                    <MockSlot mock={mockKey} />
                  </Reveal>
                </div>
              ) : (
                <Reveal>
                  <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
                    <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
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
          <h2 className="text-lg font-semibold tracking-tight">
            {t.featurePage.specsTitle}
          </h2>
          <dl className="mt-5 border-t border-border">
            {page.specs.rows.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 border-b border-border py-3.5 sm:grid-cols-[12rem_1fr] sm:gap-4"
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
          <h2 className="text-lg font-semibold tracking-tight">
            {t.featurePage.relatedTitle}
          </h2>
          <ul className="mt-5 grid gap-x-10 sm:grid-cols-3">
            {def.related.map(slug => {
              const related = FEATURE_PAGES.find(p => p.slug === slug);
              if (!related) {
                return null;
              }
              const Icon = PAGE_ICONS[slug];
              return (
                <li key={slug} className="border-t border-border">
                  <Link to={related.path} className="group block py-5">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <Icon className="size-4 shrink-0 text-muted-foreground" />
                      <span className="truncate underline-offset-4 group-hover:underline">
                        {t.pageMeta[slug].label}
                      </span>
                      {related.status === 'development' && <DevelopmentBadge />}
                      <ArrowRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-1.5 block text-xs text-muted-foreground">
                      {t.pageMeta[slug].tagline}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
