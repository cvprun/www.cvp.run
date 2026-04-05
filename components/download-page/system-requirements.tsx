import {Check} from 'lucide-react';

import type {Language} from '@/lib/i18n';
import {getTranslations} from '@/lib/translations';

interface SystemRequirementsProps {
  lang: Language;
}

export function SystemRequirements({lang}: SystemRequirementsProps) {
  const t = getTranslations(lang);

  return (
    <section className="container mx-auto pb-16">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border bg-card p-8">
          <h2 className="text-2xl font-bold mb-6">{t.download.requirements.title}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {t.download.requirements.items.map(item => (
              <li key={item} className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
