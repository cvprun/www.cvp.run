import {Check, Minus} from 'lucide-react';

import {FinalCta} from '@/components/final-cta';
import {Footer} from '@/components/footer';
import {Reveal} from '@/components/reveal';
import {TopBar} from '@/components/top-bar';
import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n';
import {formatLimit, formatStorage, PLANS, type PlanDef} from '@/lib/pricing';
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
    `${p.rows.projects}: ${formatLimit(plan.limits.projects, p.unlimited)}`,
    `${p.rows.members}: ${formatLimit(plan.limits.members, p.unlimited)}`,
    `${p.rows.storage}: ${formatStorage(plan.limits.storageGb, p.unlimited)}`,
    `${p.rows.apiCalls}: ${formatLimit(plan.limits.apiCallsPerMonth, p.unlimited)}`,
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
        'relative flex flex-col rounded-2xl border bg-card p-6',
        plan.highlighted ? 'border-brand-cyan/60 shadow-lg' : 'border-border',
      )}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-cyan px-3 py-0.5 text-[11px] font-semibold text-neutral-900">
          {p.mostPopular}
        </span>
      )}
      <span className="text-sm font-semibold">{p.planNames[plan.code]}</span>
      <span className="mt-2 text-3xl font-bold tracking-tight">
        {priceLabel(plan, p)}
      </span>
      <p className="mt-2 min-h-8 text-xs text-muted-foreground">
        {p.planTaglines[plan.code]}
      </p>
      <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
        {highlights.map(line => (
          <li key={line} className="flex items-start gap-2 text-muted-foreground">
            <Check className="mt-0.5 size-3.5 shrink-0 text-brand-cyan" />
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
    <Check className="mx-auto size-4 text-brand-cyan" />
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
  const rows: RowDef[] = [
    {
      label: p.rows.projects,
      render: plan => formatLimit(plan.limits.projects, p.unlimited),
    },
    {
      label: p.rows.members,
      render: plan => formatLimit(plan.limits.members, p.unlimited),
    },
    {
      label: p.rows.storage,
      render: plan => formatStorage(plan.limits.storageGb, p.unlimited),
    },
    {
      label: p.rows.apiCalls,
      render: plan => formatLimit(plan.limits.apiCallsPerMonth, p.unlimited),
    },
    {label: p.rows.labeling, render: always},
    {label: p.rows.review, render: always},
    {label: p.rows.wiki, render: always},
    {label: p.rows.tokens, render: always},
    {label: p.rows.license, render: always},
    {
      label: p.rows.prioritySupport,
      render: plan => <BoolCell value={plan.limits.prioritySupport} />,
    },
    {
      label: p.rows.auditLogs,
      render: plan => <BoolCell value={plan.limits.auditLogs} />,
    },
    {label: p.rows.customS3, render: plan => <BoolCell value={plan.limits.customS3} />},
    {label: p.rows.sso, render: plan => <BoolCell value={plan.limits.sso} />},
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
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
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-glow opacity-30" />
          <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
                {p.title}
              </h1>
              <p className="mt-5 text-muted-foreground sm:text-lg">{p.description}</p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs text-amber-600 dark:text-amber-400">
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

        {/* FAQ */}
        <section className="border-t border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              {p.faqTitle}
            </h2>
            <div className="mx-auto mt-10 grid max-w-4xl gap-x-10 gap-y-8 sm:grid-cols-2">
              {p.faq.map(item => (
                <div key={item.q}>
                  <h3 className="text-sm font-semibold">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
