import {ArrowRight, Check, Repeat} from 'lucide-react';
import type {ReactNode} from 'react';
import {Link} from 'react-router-dom';

import {CtaButtons} from '@/components/cta-buttons';
import {DevelopmentBadge} from '@/components/development-badge';
import {FinalCta} from '@/components/final-cta';
import {MockSlot} from '@/components/mocks/mock-slot';
import {ProductTour} from '@/components/product-tour';
import {Reveal} from '@/components/reveal';
import {SectionHeader, SectionLabel} from '@/components/section-header';
import {CHANGELOG} from '@/lib/changelog';
import {useLanguage} from '@/lib/i18n';
import {PAGE_ICONS} from '@/lib/page-icons';
import {PLANS, type PlanDef} from '@/lib/pricing';
import {
  FEATURE_GROUPS,
  FEATURE_PAGES,
  pagesIn,
  paths,
  type FeatureSlug,
  type MockKey,
} from '@/lib/site';
import type {Translations} from '@/lib/translations';
import {usePageMeta} from '@/lib/use-page-meta';
import {cn} from '@/lib/utils';

type SectionCopy = Translations['sections'][keyof Translations['sections']];

function pathOf(slug: FeatureSlug): string {
  return FEATURE_PAGES.find(page => page.slug === slug)?.path ?? paths.home;
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

/** Section shell: full-width rule on top, optional tint, centered column. */
function Band({
  tinted = false,
  id,
  children,
}: {
  tinted?: boolean;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn('border-t border-border', tinted && 'bg-muted/20')}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">{children}</div>
    </section>
  );
}

/** One feature band: kicker + headline + body matched 1:1 with a mock. */
function FeatureBand({
  copy,
  to,
  layout,
  tinted = false,
  mock,
}: {
  copy: SectionCopy;
  to: string;
  layout: 'stack' | 'split';
  tinted?: boolean;
  mock: MockKey;
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
    <Band tinted={tinted}>
      {layout === 'stack' ? (
        <>
          <Reveal>{text}</Reveal>
          <Reveal className="mt-10" delay={100}>
            <MockSlot mock={mock} />
          </Reveal>
        </>
      ) : (
        <div className="grid items-center gap-10 lg:grid-cols-2 [&>*]:min-w-0">
          <Reveal>{text}</Reveal>
          <Reveal delay={100}>
            <MockSlot mock={mock} />
          </Reveal>
        </div>
      )}
    </Band>
  );
}

function Hero() {
  const {t} = useLanguage();
  return (
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
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {t.hero.points.map(point => (
              <li key={point} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-foreground" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="mt-14" delay={150}>
          <ProductTour />
          <p className="mt-3 text-xs text-muted-foreground">{t.misc.mockNote}</p>
          <p className="mt-1 text-[11px] text-muted-foreground/70">{t.misc.dataNote}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Facts() {
  const {t} = useLanguage();
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {t.facts.map((fact, i) => (
            <div
              key={fact.label}
              className={cn(
                'py-8 pr-4',
                i % 2 === 1 && 'border-l border-border pl-6',
                i >= 2 && 'border-t border-border lg:border-t-0',
                i === 2 && 'lg:border-l lg:pl-6',
              )}
            >
              <dt className="text-sm font-medium">{fact.label}</dt>
              <dd className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">
                {fact.value}
              </dd>
              <dd className="mt-2 text-xs text-muted-foreground">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const WORKFLOW_PAGES: FeatureSlug[] = [
  'datasets',
  'images',
  'review',
  'training',
  'inference',
];

function Workflow() {
  const {t} = useLanguage();
  const w = t.workflow;
  return (
    <Band tinted>
      <Reveal>
        <SectionHeader label={w.label} title={w.title} description={w.description} />
      </Reveal>
      <Reveal delay={100}>
        <ol className="mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
          {w.steps.map((step, i) => {
            const slug = WORKFLOW_PAGES[i];
            const Icon = PAGE_ICONS[slug];
            return (
              <li key={step.title} className="border-t border-border py-6">
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon className="size-3.5" />
                </span>
                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
                <ArrowLink to={pathOf(slug)} className="mt-3 text-xs">
                  {t.pageMeta[slug].label}
                </ArrowLink>
              </li>
            );
          })}
        </ol>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Repeat className="size-4 shrink-0" />
          {w.loop}
        </p>
      </Reveal>
    </Band>
  );
}

function ScopeGrid() {
  const {t} = useLanguage();
  const pages = pagesIn('more');
  return (
    <Band tinted>
      <Reveal>
        <SectionHeader
          label={t.scope.label}
          title={t.scope.title}
          description={t.scope.description}
        />
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-12 grid gap-x-10 gap-y-10 lg:grid-cols-3">
          {FEATURE_GROUPS.map(group => (
            <div key={group}>
              <h3 className="text-sm font-semibold">{t.nav.groups[group]}</h3>
              <ul className="mt-3">
                {pages
                  .filter(page => page.group === group)
                  .map(page => {
                    const Icon = PAGE_ICONS[page.slug];
                    return (
                      <li key={page.slug} className="border-t border-border">
                        <Link to={page.path} className="group flex gap-3 py-3.5">
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
            </div>
          ))}
        </div>
      </Reveal>
    </Band>
  );
}

function Integrations() {
  const {t} = useLanguage();
  const it = t.integrations;
  return (
    <Band>
      <Reveal>
        <SectionHeader label={it.label} title={it.title} description={it.description} />
      </Reveal>
      <Reveal delay={100}>
        <dl className="mt-10">
          {it.groups.map(group => (
            <div
              key={group.title}
              className="grid gap-3 border-t border-border py-5 sm:grid-cols-[12rem_1fr] sm:gap-6"
            >
              <dt className="text-sm font-medium">{group.title}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {group.items.map(item => (
                  <span
                    key={item}
                    className="rounded-md border border-border px-2 py-0.5 text-sm text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Band>
  );
}

function SecurityTeaser() {
  const {t} = useLanguage();
  const s = t.securityTeaser;
  return (
    <Band tinted>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <SectionHeader label={s.label} title={s.title} description={s.description} />
          <ArrowLink to={paths.security} className="mt-5">
            {s.cta}
          </ArrowLink>
        </Reveal>
        <Reveal delay={100}>
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {s.items.map(item => (
              <div key={item.title} className="border-t border-border py-5">
                <dt className="text-sm font-semibold">{item.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Band>
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

function PricingTeaser() {
  const {t} = useLanguage();
  const teaserPlans = PLANS.filter(plan => plan.code !== 'enterprise');
  return (
    <Band>
      <Reveal>
        <SectionHeader
          label={t.pricingTeaser.label}
          title={t.pricingTeaser.title}
          description={t.pricingTeaser.description}
        />
      </Reveal>
      <Reveal delay={100}>
        <ul className="mt-10 grid max-w-4xl gap-x-10 sm:grid-cols-3">
          {teaserPlans.map(plan => (
            <PlanTeaser key={plan.code} plan={plan} t={t} />
          ))}
        </ul>
        <ArrowLink to={paths.pricing} className="mt-6">
          {t.pricingTeaser.cta}
        </ArrowLink>
      </Reveal>
    </Band>
  );
}

function ChangelogTeaser() {
  const {t, lang} = useLanguage();
  const c = t.changelogTeaser;
  const entries = CHANGELOG.slice(0, 4);
  const day = new Intl.DateTimeFormat(lang === 'ko' ? 'ko-KR' : 'en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
  return (
    <Band tinted>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <SectionHeader label={c.label} title={c.title} description={c.description} />
          <ArrowLink to={paths.changelog} className="mt-5">
            {c.cta}
          </ArrowLink>
        </Reveal>
        <Reveal delay={100}>
          <ul>
            {entries.map(entry => (
              <li key={entry.id} className="border-t border-border py-4">
                <Link to={paths.changelog} className="group flex items-baseline gap-4">
                  <time
                    dateTime={entry.date}
                    className="w-16 shrink-0 text-xs text-muted-foreground tabular-nums"
                  >
                    {day.format(new Date(`${entry.date}T00:00:00Z`))}
                  </time>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium underline-offset-4 group-hover:underline">
                      {t.changelogPage.entries[entry.id].title}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {t.changelogPage.tags[entry.tag]}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Band>
  );
}

export function LandingPage() {
  const {t} = useLanguage();
  usePageMeta(t.meta.homeTitle, t.meta.homeDescription);

  return (
    <>
      <Hero />
      <Facts />
      <Workflow />

      {/* feature bands — one mock per feature */}
      <FeatureBand
        copy={t.sections.ai}
        to={paths.platformTraining}
        layout="split"
        mock="autoLabelReview"
      />
      <FeatureBand
        copy={t.sections.mlops}
        to={paths.platformMlops}
        layout="stack"
        tinted
        mock="mlopsRun"
      />
      <FeatureBand
        copy={t.sections.inference}
        to={paths.platformInference}
        layout="stack"
        mock="inferenceOverview"
      />
      <FeatureBand
        copy={t.sections.review}
        to={paths.platformReview}
        layout="stack"
        tinted
        mock="issuePanel"
      />
      <FeatureBand
        copy={t.sections.workspace}
        to={paths.platformDatasets}
        layout="stack"
        mock="sampleGallery"
      />
      <FeatureBand
        copy={t.sections.edge}
        to={paths.moreModbus}
        layout="stack"
        tinted
        mock="modbusTags"
      />
      <FeatureBand
        copy={t.sections.developers}
        to={paths.platformDevelopers}
        layout="stack"
        mock="apiSnippet"
      />

      <ScopeGrid />
      <Integrations />
      <SecurityTeaser />
      <PricingTeaser />
      <ChangelogTeaser />
      <FinalCta tinted={false} />
    </>
  );
}
