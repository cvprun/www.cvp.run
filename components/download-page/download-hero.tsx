import type {Language} from '@/lib/i18n';
import {getTranslations} from '@/lib/translations';

interface DownloadHeroProps {
  lang: Language;
}

export function DownloadHero({lang}: DownloadHeroProps) {
  const t = getTranslations(lang);

  return (
    <section className="container mx-auto py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          {t.download.hero.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
          {t.download.hero.description}
        </p>
      </div>
    </section>
  );
}
