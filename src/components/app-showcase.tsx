import {AppFrame} from '@/components/app-frame';
import {SCREENS} from '@/components/screens';
import {useLanguage} from '@/lib/i18n';

export function AppShowcase() {
  const {t} = useLanguage();
  const s = t.showcase;
  const Dashboard = SCREENS.dashboard;

  return (
    <section id="preview" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-brand-cyan uppercase">
            {s.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {s.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{s.description}</p>
        </div>

        <div className="relative mx-auto mt-14 max-w-5xl">
          <div className="pointer-events-none absolute -inset-x-8 -top-8 bottom-0 -z-10 bg-mesh-glow opacity-40" />
          <AppFrame activeNav={0}>
            <Dashboard />
          </AppFrame>
          <p className="mt-4 text-center text-xs text-muted-foreground">{s.mockNote}</p>
        </div>
      </div>
    </section>
  );
}
