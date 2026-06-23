import {ArrowRight, Sparkles} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n';

export function Hero() {
  const {t} = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-glow opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 grid-pattern opacity-60" />

      <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-brand-cyan" />
            {t.hero.badge}
          </span>

          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
            <span className="block">{t.hero.titleLine1}</span>
            <span className="block text-gradient-vivid">{t.hero.titleLine2}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            {t.hero.description}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" disabled className="cursor-not-allowed">
              {t.hero.primaryCta}
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#features">
                {t.hero.secondaryCta}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t.hero.primaryCtaNote}</p>
        </div>

        {/* stat strip */}
        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {[
            {value: t.hero.stat1Value, label: t.hero.stat1Label},
            {value: t.hero.stat2Value, label: t.hero.stat2Label},
            {value: t.hero.stat3Value, label: t.hero.stat3Label},
          ].map(stat => (
            <div key={stat.label} className="bg-card px-6 py-6 text-center">
              <dt className="text-2xl font-bold tracking-tight">{stat.value}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
