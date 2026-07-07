import {CtaButtons} from '@/components/cta-buttons';
import {useLanguage} from '@/lib/i18n';

/** Closing call-to-action band shared by every page. */
export function FinalCta() {
  const {t} = useLanguage();

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-12">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-glow opacity-40" />
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t.cta.description}
          </p>
          <div className="mt-8">
            <CtaButtons />
          </div>
        </div>
      </div>
    </section>
  );
}
