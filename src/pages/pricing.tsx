import {Check, ChevronDown, Minus} from 'lucide-react';
import {Fragment, type ReactNode} from 'react';

import {FinalCta} from '@/components/final-cta';
import {MockSlot} from '@/components/mocks/mock-slot';
import {Reveal} from '@/components/reveal';
import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n';
import {
  formatKb,
  formatLimit,
  formatStorage,
  PLANS,
  TOKEN_PACKAGES,
  type PlanDef,
} from '@/lib/pricing';
import {appLink, SALES_MAILTO} from '@/lib/site';
import type {Translations} from '@/lib/translations';
import {usePageMeta} from '@/lib/use-page-meta';
import {cn} from '@/lib/utils';

type PricingCopy = Translations['pricingPage'];

function priceLabel(plan: PlanDef, p: PricingCopy) {
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

/** Card CTA: sign up for self-serve plans, mail sales for Enterprise. */
function PlanCta({plan, className}: {plan: PlanDef; className?: string}) {
  const {t} = useLanguage();
  const p = t.pricingPage;
  const signup = appLink('/signup');
  const variant = plan.highlighted ? 'default' : 'outline';

  if (plan.code === 'enterprise') {
    return (
      <Button asChild variant={variant} className={className}>
        <a href={SALES_MAILTO}>{p.contactCta}</a>
      </Button>
    );
  }
  if (!signup) {
    return (
      <Button
        variant={variant}
        disabled
        className={cn('cursor-not-allowed', className)}
      >
        {t.nav.comingSoon}
      </Button>
    );
  }
  return (
    <Button asChild variant={variant} className={className}>
      <a href={signup}>{plan.code === 'free' ? p.currentCta : p.paidCta}</a>
    </Button>
  );
}

function PlanCard({plan}: {plan: PlanDef}) {
  const {t} = useLanguage();
  const p = t.pricingPage;

  const highlights = [
    `${p.rows.members}: ${formatLimit(plan.limits.members, p.unlimited)}`,
    `${p.rows.storage}: ${formatStorage(plan.limits.storageGb, p.unlimited)}`,
    `${p.rows.apiCalls}: ${formatLimit(plan.limits.apiCallsPerMonth, p.unlimited)}`,
    `${p.rows.agentTraffic}: ${formatStorage(plan.limits.agentTrafficGb, p.unlimited)}`,
    `${p.rows.mlflowExperiments}: ${formatLimit(plan.limits.mlflowExperiments, p.unlimited)}`,
    ...(plan.limits.videoEncryption ? [p.rows.videoEncryption] : []),
  ];

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
      <PlanCta plan={plan} />
    </div>
  );
}

function BoolCell({value}: {value: boolean}) {
  return value ? (
    <Check className="mx-auto size-4 text-foreground" aria-label="✓" />
  ) : (
    <Minus className="mx-auto size-4 text-muted-foreground/40" aria-label="—" />
  );
}

type RowDef = {label: string; render: (plan: PlanDef) => ReactNode};
type GroupDef = {title: string; rows: RowDef[]};

function useComparisonGroups(): GroupDef[] {
  const {t} = useLanguage();
  const p = t.pricingPage;
  const r = p.rows;

  const count =
    (key: keyof PlanDef['limits']): RowDef['render'] =>
    plan =>
      formatLimit(plan.limits[key] as number, p.unlimited);
  const flag =
    (key: keyof PlanDef['limits']): RowDef['render'] =>
    plan => <BoolCell value={plan.limits[key] as boolean} />;
  const always: RowDef['render'] = () => <BoolCell value />;

  return [
    {
      title: p.groups.usage,
      rows: [
        {label: r.members, render: count('members')},
        {
          label: r.storage,
          render: plan => formatStorage(plan.limits.storageGb, p.unlimited),
        },
        {label: r.apiCalls, render: count('apiCallsPerMonth')},
        {
          label: r.agentTraffic,
          render: plan => formatStorage(plan.limits.agentTrafficGb, p.unlimited),
        },
      ],
    },
    {
      title: p.groups.workspace,
      rows: [
        {label: r.wikiPages, render: count('wikiPages')},
        {label: r.gridRows, render: count('gridRows')},
        {label: r.gridColumns, render: count('gridColumns')},
        {label: r.mapFeatures, render: count('mapFeatures')},
        {label: r.graphs, render: count('graphs')},
        {
          label: r.graphNodeRuns,
          render: plan =>
            plan.limits.graphNodeRunsPerMonth === 0
              ? p.browserOnly
              : formatLimit(plan.limits.graphNodeRunsPerMonth, p.unlimited),
        },
      ],
    },
    {
      title: p.groups.field,
      rows: [
        {label: r.twinScenes, render: count('twinScenes')},
        {label: r.twinRecordings, render: count('twinRecordings')},
        {label: r.memoryMaps, render: count('memoryMaps')},
        {
          label: r.memoryMapSize,
          render: plan => formatKb(plan.limits.memoryMapKb, p.unlimited),
        },
        {
          label: r.modbusInterval,
          render: plan =>
            plan.limits.modbusIntervalMs === -1
              ? r.noFloor
              : `${plan.limits.modbusIntervalMs.toLocaleString('en-US')} ms`,
        },
      ],
    },
    {
      title: p.groups.build,
      rows: [
        {label: r.mlflowExperiments, render: count('mlflowExperiments')},
        {label: r.licenseKeys, render: count('licenseKeys')},
      ],
    },
    {
      title: p.groups.included,
      rows: [
        {label: r.labeling, render: always},
        {label: r.aiLabeling, render: always},
        {label: r.agents, render: always},
        {label: r.review, render: always},
        {label: r.wiki, render: always},
        {label: r.tokens, render: always},
        {label: r.accountSecurity, render: always},
      ],
    },
    {
      title: p.groups.features,
      rows: [
        {label: r.videoEncryption, render: flag('videoEncryption')},
        {label: r.prioritySupport, render: flag('prioritySupport')},
        {label: r.auditLogs, render: flag('auditLogs')},
        {label: r.customS3, render: flag('customS3')},
        {label: r.sso, render: flag('sso')},
      ],
    },
  ];
}

function ComparisonTable() {
  const {t} = useLanguage();
  const p = t.pricingPage;
  const groups = useComparisonGroups();

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[44rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="w-[34%] px-4 py-3 text-left font-medium">
              <span className="sr-only">{p.compareTitle}</span>
            </th>
            {PLANS.map(plan => (
              <th key={plan.code} className="px-4 py-3 text-center font-semibold">
                {p.planNames[plan.code]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <Fragment key={group.title}>
              <tr className="border-b border-border">
                <th
                  colSpan={PLANS.length + 1}
                  scope="colgroup"
                  className="bg-muted/15 px-4 pt-5 pb-2 text-left text-xs font-semibold tracking-wide text-muted-foreground"
                >
                  {group.title}
                </th>
              </tr>
              {group.rows.map(row => (
                <tr key={row.label} className="border-b border-border/60">
                  <th
                    scope="row"
                    className="px-4 py-2.5 text-left font-normal text-muted-foreground"
                  >
                    {row.label}
                  </th>
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
            </Fragment>
          ))}
          <tr>
            <td className="px-4 py-4" />
            {PLANS.map(plan => (
              <td key={plan.code} className="px-3 py-4">
                <PlanCta plan={plan} className="w-full" />
              </td>
            ))}
          </tr>
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
    <>
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
            <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
              {p.compareTitle}
            </h2>
            <ComparisonTable />
          </Reveal>
        </div>
      </section>

      {/* usage tokens */}
      <section className="border-t border-border bg-muted/20">
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
      <section className="border-t border-border">
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
            <MockSlot mock="usage" />
            <p className="mt-3 text-xs text-muted-foreground">{t.misc.mockNote}</p>
          </Reveal>
        </div>
      </section>

      {/* enterprise */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold tracking-tight">
              {p.enterpriseTitle}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.enterpriseBody}</p>
          </div>
          <Button asChild variant="outline">
            <a href={SALES_MAILTO}>{p.contactCta}</a>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_2fr] lg:gap-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {p.faqTitle}
          </h2>
          <div className="border-t border-border">
            {p.faq.map(item => (
              <details key={item.q} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="-mt-1 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
