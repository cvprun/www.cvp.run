import {ArrowRight} from 'lucide-react';

import {FinalCta} from '@/components/final-cta';
import {MockSlot} from '@/components/mocks/mock-slot';
import {Reveal} from '@/components/reveal';
import {SectionLabel} from '@/components/section-header';
import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n';
import {SALES_MAILTO} from '@/lib/site';
import {usePageMeta} from '@/lib/use-page-meta';
import {cn} from '@/lib/utils';

/** What protects data, accounts, access and content today, area by area. */
export function SecurityPage() {
  const {t} = useLanguage();
  const s = t.securityPage;
  usePageMeta(`${s.label} — CVP`, s.description);

  return (
    <>
      <section>
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16">
          <div className="max-w-3xl">
            <SectionLabel>{s.label}</SectionLabel>
            <h1 className="mt-4 text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-5xl">
              {s.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {s.description}
            </p>
          </div>
          <Reveal className="mt-12" delay={100}>
            <MockSlot mock="accountSecurity" eager />
            <p className="mt-3 text-xs text-muted-foreground">{s.mockNote}</p>
          </Reveal>
        </div>
      </section>

      {s.sections.map((section, i) => (
        <section
          key={section.title}
          className={cn('border-t border-border', i % 2 === 0 && 'bg-muted/20')}
        >
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_2fr] lg:gap-10">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                {section.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{section.description}</p>
            </Reveal>
            <Reveal delay={100}>
              <dl className="grid gap-x-10 sm:grid-cols-2">
                {section.items.map(item => (
                  <div key={item.title} className="border-t border-border py-5">
                    <dt className="text-sm font-semibold">{item.title}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold tracking-tight">
              {s.enterpriseTitle}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.enterpriseBody}</p>
          </div>
          <Button asChild variant="outline">
            <a href={SALES_MAILTO}>
              {s.enterpriseCta}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
