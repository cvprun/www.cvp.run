import {Construction} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n';

export function Cta() {
  const {t} = useLanguage();

  return (
    <section id="cta" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-12">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-glow opacity-50" />

          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Construction className="size-3.5 text-brand-pink" />
            {t.cta.badge}
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t.cta.description}
          </p>

          <div className="mt-8 flex flex-col items-center gap-2">
            <Button size="lg" disabled className="cursor-not-allowed">
              {t.cta.button}
            </Button>
            <span className="text-xs text-muted-foreground">{t.cta.buttonNote}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
