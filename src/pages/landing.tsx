import {ArrowRight, Box, Images, Video} from 'lucide-react';
import type {ComponentType} from 'react';
import {Link} from 'react-router-dom';

import {CtaButtons} from '@/components/cta-buttons';
import {FinalCta} from '@/components/final-cta';
import {Footer} from '@/components/footer';
import {MockApiSnippet} from '@/components/mocks/api-snippet';
import {MockAutoSegment} from '@/components/mocks/auto-segment';
import {MockImageEditor} from '@/components/mocks/image-editor';
import {MockIssuePanel} from '@/components/mocks/issue-panel';
import {MockPointCloudEditor} from '@/components/mocks/point-cloud-editor';
import {MockSampleGallery} from '@/components/mocks/sample-gallery';
import {MockVideoTimeline} from '@/components/mocks/video-timeline';
import {Reveal} from '@/components/reveal';
import {TopBar} from '@/components/top-bar';
import {useLanguage} from '@/lib/i18n';
import {PLANS, type PlanDef} from '@/lib/pricing';
import {paths} from '@/lib/site';
import type {Translations} from '@/lib/translations';
import {usePageMeta} from '@/lib/use-page-meta';
import {cn} from '@/lib/utils';

type SectionCopy = Translations['sections'][keyof Translations['sections']];

/** One feature band: kicker + headline + body matched 1:1 with a mock. */
function FeatureBand({
  copy,
  to,
  layout,
  tinted = false,
  mock: Mock,
}: {
  copy: SectionCopy;
  to: string;
  layout: 'stack' | 'split';
  tinted?: boolean;
  mock: ComponentType;
}) {
  const text = (
    <div className={layout === 'split' ? 'max-w-xl' : 'max-w-2xl'}>
      <p className="text-sm font-semibold tracking-wide text-brand-cyan uppercase">
        {copy.kicker}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {copy.title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {copy.body}
      </p>
      <Link
        to={to}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand-cyan"
      >
        {copy.cta}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );

  return (
    <section className={cn('border-t border-border', tinted && 'bg-muted/20')}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        {layout === 'stack' ? (
          <>
            <Reveal>{text}</Reveal>
            <Reveal className="mt-10" delay={100}>
              <Mock />
            </Reveal>
          </>
        ) : (
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>{text}</Reveal>
            <Reveal delay={100}>
              <Mock />
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}

function PlanTeaserCard({plan, t}: {plan: PlanDef; t: Translations}) {
  const p = t.pricingPage;
  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-5',
        plan.highlighted ? 'border-brand-cyan/60' : 'border-border',
      )}
    >
      <span className="text-sm font-semibold">{p.planNames[plan.code]}</span>
      <p className="mt-1 text-2xl font-bold tracking-tight">
        {plan.monthlyUsd === null
          ? plan.code === 'free'
            ? p.freePrice
            : p.contactPrice
          : `$${plan.monthlyUsd}`}
        {plan.monthlyUsd !== null && (
          <span className="text-sm font-normal text-muted-foreground">
            {p.perMonth}
          </span>
        )}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">{p.planTaglines[plan.code]}</p>
    </div>
  );
}

export function LandingPage() {
  const {t} = useLanguage();
  usePageMeta('CVP — Computer Vision Platform', t.hero.description);

  const modalityLinks = [
    {icon: Images, label: t.modalities.tabs.images, to: paths.labelingImages},
    {icon: Video, label: t.modalities.tabs.videos, to: paths.labelingVideos},
    {icon: Box, label: t.modalities.tabs.pointClouds, to: paths.labelingPointClouds},
  ];

  const teaserPlans = PLANS.filter(plan => plan.code !== 'enterprise');

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="flex-1">
        {/* hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-glow opacity-60" />
          <div className="grid-pattern pointer-events-none absolute inset-0 -z-10 opacity-60" />

          <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-20">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                {t.hero.badge}
              </span>
              <h1 className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-6xl">
                <span className="text-gradient-brand">{t.hero.title}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
                {t.hero.description}
              </p>
              <div className="mt-9">
                <CtaButtons />
              </div>
            </div>

            {/* hero mock: the 3D editor */}
            <Reveal className="relative mx-auto mt-14 max-w-5xl" delay={150}>
              <div className="pointer-events-none absolute -inset-x-8 -top-8 bottom-0 -z-10 bg-mesh-glow opacity-40" />
              <MockPointCloudEditor />
              <p className="mt-3 text-center text-xs text-muted-foreground">
                {t.misc.mockNote}
              </p>
              <p className="mt-1 text-center text-[11px] text-muted-foreground/70">
                {t.misc.dataNote}
              </p>
            </Reveal>
          </div>
        </section>

        {/* modality band */}
        <section className="border-t border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
            <p className="text-sm font-semibold tracking-wide text-brand-cyan uppercase">
              {t.modalities.label}
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {t.modalities.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t.modalities.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {modalityLinks.map(({icon: Icon, label, to}) => (
                <Link
                  key={to}
                  to={to}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-brand-cyan/60 hover:text-brand-cyan"
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* feature bands — one mock per feature */}
        <FeatureBand
          copy={t.sections.images}
          to={paths.labelingImages}
          layout="stack"
          mock={MockImageEditor}
        />
        <FeatureBand
          copy={t.sections.videos}
          to={paths.labelingVideos}
          layout="stack"
          tinted
          mock={MockVideoTimeline}
        />
        <FeatureBand
          copy={t.sections.pointClouds}
          to={paths.labelingPointClouds}
          layout="split"
          mock={MockAutoSegment}
        />
        <FeatureBand
          copy={t.sections.review}
          to={paths.platformReview}
          layout="stack"
          tinted
          mock={MockIssuePanel}
        />
        <FeatureBand
          copy={t.sections.workspace}
          to={paths.platformDatasets}
          layout="stack"
          mock={MockSampleGallery}
        />
        <FeatureBand
          copy={t.sections.developers}
          to={paths.platformDevelopers}
          layout="split"
          tinted
          mock={MockApiSnippet}
        />

        {/* pricing teaser */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold tracking-wide text-brand-cyan uppercase">
                {t.pricingTeaser.label}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                {t.pricingTeaser.title}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {t.pricingTeaser.description}
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
              {teaserPlans.map(plan => (
                <PlanTeaserCard key={plan.code} plan={plan} t={t} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to={paths.pricing}
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand-cyan"
              >
                {t.pricingTeaser.cta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
