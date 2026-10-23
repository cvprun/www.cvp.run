import {Check, Minus} from 'lucide-react';

import {FinalCta} from '@/components/final-cta';
import {Footer} from '@/components/footer';
import {MockUsage} from '@/components/mocks/usage-panel';
import {Reveal} from '@/components/reveal';
import {TopBar} from '@/components/top-bar';
import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n';
import {
  formatLimit,
  formatStorage,
  PLANS,
  TOKEN_PACKAGES,
  type PlanDef,
} from '@/lib/pricing';
import {appLink} from '@/lib/site';
import type {Translations} from '@/lib/translations';
import {usePageMeta} from '@/lib/use-page-meta';
import {cn} from '@/lib/utils';

function priceLabel(plan: PlanDef, p: Translations['pricingPage']) {
  if (plan.monthlyUsd !== null) {
    return (
      <>
        ${plan.monthlyUsd}
        <span className="text-sm font-normal text-muted-foreground">{p.perMonth}</span>
      </>
    );
  }
  return plan.code === 'free' ? p.freePrice : p.contactPrice;
}

function PlanCard({plan}: {plan: PlanDef}) {
  const {t} = useLanguage();
  const p = t.pricingPage;
  const signup = appLink('/signup');

  const highlights = [
    `${p.rows.members}: ${formatLimit(plan.limits.members, p.unlimited)}`,
    `${p.rows.storage}: ${formatStorage(plan.limits.storageGb, p.unlimited)}`,
    `${p.rows.apiCalls}: ${formatLimit(plan.limits.apiCallsPerMonth, p.unlimited)}`,
    `${p.rows.agentTraffic}: ${formatStorage(plan.limits.agentTrafficGb, p.unlimited)}`,
  ];

  const cta =
    plan.code === 'free'
      ? p.currentCta
      : plan.code === 'enterprise'
        ? p.contactCta
        : p.paidCta;

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border bg-card p-6',
        plan.highlighted ? 'border-foreground/60' : 'border-border',
      )}
    >
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-semibold">{p.planNames[plan.code]}</span>
        {plan.highlighted && (
          <span className="text-xs text-muted-foreground">{p.mostPopular}</span>
        )}
      </span>
      <span className="mt-2 text-3xl font-semibold tracking-tight">
        {priceLabel(plan, p)}
      </span>
      <p className="mt-2 min-h-8 text-xs text-muted-foreground">
        {p.planTaglines[plan.code]}
      </p>
      <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
        {highlights.map(line => (
          <li key={line} className="flex items-start gap-2 text-muted-foreground">
            <Check className="mt-0.5 size-3.5 shrink-0 text-foreground" />
            {line}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex-1" />
      {plan.code !== 'enterprise' && signup ? (
        <Button asChild variant={plan.highlighted ? 'default' : 'outline'}>
          <a href={signup}>{cta}</a>
        </Button>
      ) : (
        <Button
          variant={plan.highlighted ? 'default' : 'outline'}
          disabled={plan.code !== 'enterprise'}
          className={plan.code !== 'enterprise' ? 'cursor-not-allowed' : undefined}
        >
          {plan.code === 'enterprise' ? cta : t.nav.comingSoon}
        </Button>
      )}
    </div>
  );
}

function BoolCell({value}: {value: boolean}) {
  return value ? (
    <Check className="mx-auto size-4 text-foreground" />
  ) : (
    <Minus className="mx-auto size-4 text-muted-foreground/40" />
  );
}

function ComparisonTable() {
  const {t} = useLanguage();
  const p = t.pricingPage;

  type RowDef = {
    label: string;
    render: (plan: PlanDef) => React.ReactNode;
  };

  const always: RowDef['render'] = () => <BoolCell value />;
  const count =
    (key: keyof PlanDef['limits']): RowDef['render'] =>
    plan =>
      formatLimit(plan.limits[key] as number, p.unlimited);
  const flag =
    (key: keyof PlanDef['limits']): RowDef['render'] =>
    plan => <BoolCell value={plan.limits[key] as boolean} />;

  const rows: RowDef[] = [
    {label: p.rows.members, render: count('members')},
    {
      label: p.rows.storage,
      render: plan => formatStorage(plan.limits.storageGb, p.unlimited),
    },
    {label: p.rows.apiCalls, render: count('apiCallsPerMonth')},
    {
      label: p.rows.agentTraffic,
      render: plan => formatStorage(plan.limits.agentTrafficGb, p.unlimited),
    },
    {
      label: p.rows.graphNodeRuns,
      render: plan =>
        plan.limits.graphNodeRunsPerMonth === 0
          ? p.browserOnly
          : formatLimit(plan.limits.graphNodeRunsPerMonth, p.unlimited),
    },
    {label: p.rows.mlflowExperiments, render: count('mlflowExperiments')},
    {label: p.rows.twinScenes, render: count('twinScenes')},
    {label: p.rows.wikiPages, render: count('wikiPages')},
    {label: p.rows.gridRows, render: count('gridRows')},
    {label: p.rows.memoryMaps, render: count('memoryMaps')},
    {label: p.rows.mapFeatures, render: count('mapFeatures')},
    {label: p.rows.licenseKeys, render: count('licenseKeys')},
    {label: p.rows.labeling, render: always},
    {label: p.rows.aiLabeling, render: always},
    {label: p.rows.agents, render: always},
    {label: p.rows.review, render: always},
    {label: p.rows.wiki, render: always},
    {label: p.rows.tokens, render: always},
    {label: p.rows.videoEncryption, render: flag('videoEncryption')},
    {label: p.rows.prioritySupport, render: flag('prioritySupport')},
    {label: p.rows.auditLogs, render: flag('auditLogs')},
    {label: p.rows.customS3, render: flag('customS3')},
    {label: p.rows.sso, render: flag('sso')},
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[40rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="px-4 py-3 text-left font-medium" />
            {PLANS.map(plan => (
              <th key={plan.code} className="px-4 py-3 text-center font-semibold">
                {p.planNames[plan.code]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={cn('border-b border-border/60', i % 2 === 1 && 'bg-muted/15')}
            >
              <td className="px-4 py-2.5 text-muted-foreground">{row.label}</td>
              {PLANS.map(plan => (
                <td
                  key={plan.code}
                  className="px-4 py-2.5 text-center font-mono text-xs tabular-nums"
                >
                  {row.render(plan)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PricingPage() {
  const {t} = useLanguage();
  const p = t.pricingPage;
  usePageMeta(`${t.nav.pricing} — CVP`, p.description);

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="flex-1">
        <section>
          <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                {p.title}
              </h1>
              <p className="mt-5 text-muted-foreground sm:text-lg">{p.description}</p>
              <p className="mt-5 border-l-2 border-amber-500/60 pl-3 text-xs text-muted-foreground">
                {p.betaNote}
              </p>
            </div>

            <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {PLANS.map(plan => (
                <PlanCard key={plan.code} plan={plan} />
              ))}
            </Reveal>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <Reveal>
              <ComparisonTable />
            </Reveal>
          </div>
        </section>

        {/* usage tokens */}
        <section className="border-t border-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                {p.tokensTitle}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {p.tokensDescription}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                {TOKEN_PACKAGES.map(pkg => (
                  <div
                    key={pkg.usd}
                    className="rounded-lg border border-border bg-card px-4 py-3"
                  >
                    <span className="block text-lg font-semibold tabular-nums">
                      ${pkg.usd}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {p.tokensUnit(pkg.tokens.toLocaleString('en-US'))}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <dl className="border-t border-border">
                {p.tokenUses.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-1 border-b border-border py-3.5 sm:grid-cols-[13rem_1fr] sm:gap-4"
                  >
                    <dt className="text-sm font-medium">{label}</dt>
                    <dd className="text-sm text-muted-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* usage screen */}
        <section className="border-t border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                  {p.usageTitle}
                </h2>
                <p className="mt-4 text-muted-foreground">{p.usageDescription}</p>
              </div>
            </Reveal>
            <Reveal className="mt-10" delay={100}>
              <MockUsage />
              <p className="mt-3 text-xs text-muted-foreground">{t.misc.mockNote}</p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_2fr] lg:gap-10">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {p.faqTitle}
            </h2>
            <dl className="border-t border-border">
              {p.faq.map(item => (
                <div key={item.q} className="border-b border-border py-5">
                  <dt className="text-sm font-semibold">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
