import {
  Activity,
  ArrowRight,
  Box,
  BrainCircuit,
  Cpu,
  Cuboid,
  Images,
  LayoutGrid,
  Map,
  MemoryStick,
  Mic,
  Package,
  Radar,
  Signature,
  Store,
  Table2,
  Video,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type {ComponentType, ReactNode} from 'react';
import {Link} from 'react-router-dom';

import {CtaButtons} from '@/components/cta-buttons';
import {DevelopmentBadge} from '@/components/development-badge';
import {FinalCta} from '@/components/final-cta';
import {Footer} from '@/components/footer';
import {MockApiSnippet} from '@/components/mocks/api-snippet';
import {MockAutoLabelReview} from '@/components/mocks/auto-label-review';
import {MockCollectorsTimeline} from '@/components/mocks/collectors-timeline';
import {MockImageEditor} from '@/components/mocks/image-editor';
import {MockIssuePanel} from '@/components/mocks/issue-panel';
import {MockPointCloudEditor} from '@/components/mocks/point-cloud-editor';
import {MockPointceptAutoLabel} from '@/components/mocks/pointcept-autolabel';
import {MockSampleGallery} from '@/components/mocks/sample-gallery';
import {MockTimeseriesEditor} from '@/components/mocks/timeseries-editor';
import {MockTrainingWizard} from '@/components/mocks/training-wizard';
import {MockVideoTimeline} from '@/components/mocks/video-timeline';
import {Reveal} from '@/components/reveal';
import {SectionHeader, SectionLabel} from '@/components/section-header';
import {TopBar} from '@/components/top-bar';
import {useLanguage} from '@/lib/i18n';
import {PLANS, type PlanDef} from '@/lib/pricing';
import {FEATURE_PAGES, paths, type FeatureSlug} from '@/lib/site';
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
    <div>
      <SectionHeader
        label={copy.kicker}
        title={copy.title}
        description={copy.body}
        className={layout === 'split' ? 'max-w-xl' : undefined}
      />
      <ArrowLink to={to} className="mt-5">
        {copy.cta}
      </ArrowLink>
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
          <div className="grid items-center gap-10 lg:grid-cols-2 [&>*]:min-w-0">
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

/** Text link with a trailing arrow, used under section copy. */
function ArrowLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline',
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/** One plan in the pricing teaser: a ruled column, the highlighted plan
 * marked by a solid top rule instead of a colored card. */
function PlanTeaser({plan, t}: {plan: PlanDef; t: Translations}) {
  const p = t.pricingPage;
  return (
    <li
      className={cn(
        'border-t py-5',
        plan.highlighted ? 'border-foreground' : 'border-border',
      )}
    >
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-semibold">{p.planNames[plan.code]}</span>
        {plan.highlighted && (
          <span className="text-xs text-muted-foreground">{p.mostPopular}</span>
        )}
      </span>
      <p className="mt-2 text-2xl font-semibold tracking-tight">
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
    </li>
  );
}

/** Icons for the "inside one project" grid — same icons as the app sidebar. */
const SCOPE_ICONS: Partial<Record<FeatureSlug, LucideIcon>> = {
  agents: Cpu,
  collectors: Radar,
  twin: Cuboid,
  mlflow: BrainCircuit,
  graphs: Workflow,
  grids: Table2,
  maps: Map,
  meetings: Mic,
  signatures: Signature,
  memory: MemoryStick,
  registry: Package,
  apps: LayoutGrid,
  store: Store,
};

function ScopeGrid() {
  const {t} = useLanguage();
  const pages = FEATURE_PAGES.filter(p => p.category === 'more');
  return (
    <section className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeader
            label={t.scope.label}
            title={t.scope.title}
            description={t.scope.description}
          />
        </Reveal>
        <Reveal delay={100}>
          <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map(page => {
              const Icon = SCOPE_ICONS[page.slug] ?? LayoutGrid;
              return (
                <li key={page.slug} className="border-t border-border">
                  <Link to={page.path} className="group flex gap-3 py-4">
                    <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-sm font-medium underline-offset-4 group-hover:underline">
                        {t.pageMeta[page.slug].label}
                        {page.status === 'development' && <DevelopmentBadge />}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {t.pageMeta[page.slug].tagline}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function LandingPage() {
  const {t} = useLanguage();
  usePageMeta('CVP — Computer Vision Platform', t.hero.description);

  const modalityLinks = [
    {
      icon: Images,
      label: t.modalities.tabs.images,
      tagline: t.pageMeta.images.tagline,
      to: paths.labelingImages,
    },
    {
      icon: Video,
      label: t.modalities.tabs.videos,
      tagline: t.pageMeta.videos.tagline,
      to: paths.labelingVideos,
    },
    {
      icon: Box,
      label: t.modalities.tabs.pointClouds,
      tagline: t.pageMeta.pointClouds.tagline,
      to: paths.labelingPointClouds,
    },
    {
      icon: Activity,
      label: t.modalities.tabs.timeSeries,
      tagline: t.pageMeta.timeSeries.tagline,
      to: paths.labelingTimeSeries,
    },
  ];

  const teaserPlans = PLANS.filter(plan => plan.code !== 'enterprise');

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="flex-1">
        {/* hero */}
        <section>
          <div className="mx-auto max-w-6xl px-4 pt-16 pb-16 sm:px-6 sm:pt-24 sm:pb-20">
            <div className="max-w-3xl">
              <SectionLabel>{t.hero.badge}</SectionLabel>
              <h1 className="mt-4 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-6xl">
                {t.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
                {t.hero.description}
              </p>
              <div className="mt-9">
                <CtaButtons />
              </div>
            </div>

            {/* hero mock: the 3D editor */}
            <Reveal className="mt-14" delay={150}>
              <MockPointCloudEditor />
              <p className="mt-3 text-xs text-muted-foreground">{t.misc.mockNote}</p>
              <p className="mt-1 text-[11px] text-muted-foreground/70">
                {t.misc.dataNote}
              </p>
            </Reveal>
          </div>
        </section>

        {/* modality index */}
        <section className="border-t border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SectionHeader
              label={t.modalities.label}
              title={t.modalities.title}
              description={t.modalities.description}
            />
            <ul className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
              {modalityLinks.map(({icon: Icon, label, tagline, to}) => (
                <li key={to} className="border-t border-border">
                  <Link to={to} className="group block py-5">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                      <span className="underline-offset-4 group-hover:underline">
                        {label}
                      </span>
                      <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-1.5 block text-xs text-muted-foreground">
                      {tagline}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
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
          mock={MockPointceptAutoLabel}
        />
        <FeatureBand
          copy={t.sections.timeSeries}
          to={paths.labelingTimeSeries}
          layout="stack"
          tinted
          mock={MockTimeseriesEditor}
        />
        <FeatureBand
          copy={t.sections.ai}
          to={paths.platformTraining}
          layout="split"
          mock={MockAutoLabelReview}
        />
        <FeatureBand
          copy={t.sections.training}
          to={paths.platformTraining}
          layout="stack"
          tinted
          mock={MockTrainingWizard}
        />
        <FeatureBand
          copy={t.sections.review}
          to={paths.platformReview}
          layout="stack"
          mock={MockIssuePanel}
        />
        <FeatureBand
          copy={t.sections.workspace}
          to={paths.platformDatasets}
          layout="stack"
          tinted
          mock={MockSampleGallery}
        />
        <FeatureBand
          copy={t.sections.edge}
          to={paths.moreAgents}
          layout="stack"
          mock={MockCollectorsTimeline}
        />
        <FeatureBand
          copy={t.sections.developers}
          to={paths.platformDevelopers}
          layout="split"
          tinted
          mock={MockApiSnippet}
        />

        <ScopeGrid />

        {/* pricing teaser */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
            <SectionHeader
              label={t.pricingTeaser.label}
              title={t.pricingTeaser.title}
              description={t.pricingTeaser.description}
            />
            <ul className="mt-10 grid max-w-4xl gap-x-10 sm:grid-cols-3">
              {teaserPlans.map(plan => (
                <PlanTeaser key={plan.code} plan={plan} t={t} />
              ))}
            </ul>
            <ArrowLink to={paths.pricing} className="mt-6">
              {t.pricingTeaser.cta}
            </ArrowLink>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
