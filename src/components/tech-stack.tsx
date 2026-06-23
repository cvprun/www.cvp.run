import {useLanguage} from '@/lib/i18n';

export function TechStack() {
  const {t} = useLanguage();

  return (
    <section id="platform" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-brand-blue uppercase dark:text-brand-cyan">
            {t.tech.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.tech.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.tech.description}</p>
        </div>

        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
          {t.tech.items.map(name => (
            <span
              key={name}
              className="rounded-full border border-border bg-card px-4 py-2 font-mono text-sm text-foreground/80"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
