import Link from 'next/link';
import {Check, Github, Building2} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {getTranslations} from '@/lib/translations';
import type {Language} from '@/lib/i18n';

interface PricingTiersProps {
  lang: Language;
}

export function PricingTiers({lang}: PricingTiersProps) {
  const t = getTranslations(lang);

  return (
    <section className="container mx-auto pb-16 md:pb-24 lg:pb-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Free Tier */}
          <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Github className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">{t.pricing.free.name}</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{t.pricing.free.price}</span>
                <span className="text-muted-foreground">{t.pricing.free.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.pricing.free.description}
              </p>
            </div>

            <ul className="mb-8 space-y-3">
              {t.pricing.free.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full" variant="outline" size="lg" asChild>
              <Link
                href="https://github.com/cvprun/cvp"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                {t.pricing.free.button}
              </Link>
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              {t.pricing.free.license}
            </p>
          </div>

          {/* Enterprise Tier */}
          <div className="relative rounded-2xl border-2 border-primary bg-card p-8 shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {t.pricing.enterprise.badge}
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">{t.pricing.enterprise.name}</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{t.pricing.enterprise.price}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.pricing.enterprise.description}
              </p>
            </div>

            <ul className="mb-8 space-y-3">
              {t.pricing.enterprise.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full" size="lg" asChild>
              <Link href="mailto:contact@cvp.run">{t.pricing.enterprise.button}</Link>
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              {t.pricing.enterprise.license}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
