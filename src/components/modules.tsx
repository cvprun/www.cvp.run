import {
  AppWindow,
  Boxes,
  Cpu,
  Factory,
  GitGraph,
  LineChart,
  MonitorPlay,
  ScanEye,
  type LucideIcon,
} from 'lucide-react';

import {useLanguage} from '@/lib/i18n';

const ICONS: LucideIcon[] = [
  ScanEye,
  MonitorPlay,
  Factory,
  Boxes,
  GitGraph,
  LineChart,
  Cpu,
  AppWindow,
];

export function Modules() {
  const {t} = useLanguage();

  return (
    <section id="modules" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-brand-violet uppercase dark:text-brand-pink">
            {t.modules.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.modules.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.modules.description}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.modules.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={item.name}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-transform hover:-translate-y-0.5"
              >
                <Icon className="size-6 text-foreground/80" />
                <div>
                  <h3 className="font-mono text-sm font-semibold">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
