import {getTranslations} from '@/lib/translations';
import type {Language} from '@/lib/i18n';

interface PricingHeroProps {
  lang: Language;
}

export function PricingHero({lang}: PricingHeroProps) {
  const t = getTranslations(lang);

  return (
    <section className="container mx-auto py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          {t.pricing.hero.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
          {t.pricing.hero.description}
        </p>
      </div>
    </section>
  );
}
