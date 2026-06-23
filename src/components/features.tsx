import {
  ArrowUpRight,
  Boxes,
  Camera,
  Database,
  Puzzle,
  Radio,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import {Link} from 'react-router-dom';

import {useLanguage} from '@/lib/i18n';

const ICONS: LucideIcon[] = [Workflow, Radio, Boxes, Camera, Database, Puzzle];

export function Features() {
  const {t} = useLanguage();

  return (
    <section id="features" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-brand-cyan uppercase">
            {t.features.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.features.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.features.description}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Link
                key={item.slug}
                to={`/features/${item.slug}`}
                className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
              >
                <ArrowUpRight className="absolute top-5 right-5 size-4 text-muted-foreground/50 transition-colors group-hover:text-foreground" />
                <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors group-hover:text-brand-cyan">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <span className="mt-4 text-sm font-medium text-foreground/80 group-hover:text-foreground">
                  {t.features.cardCta} →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
