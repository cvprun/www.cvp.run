import {ArrowLeft, Check} from 'lucide-react';
import {Link, useParams} from 'react-router-dom';

import {AppFrame} from '@/components/app-frame';
import {Cta} from '@/components/cta';
import {Footer} from '@/components/footer';
import {SCREENS} from '@/components/screens';
import {TopBar} from '@/components/top-bar';
import {Button} from '@/components/ui/button';
import {getDetailItem, SCREEN_META, type DetailKind} from '@/lib/catalog';
import {useLanguage} from '@/lib/i18n';

export function DetailPage({kind}: {kind: DetailKind}) {
  const {t} = useLanguage();
  const {slug} = useParams();
  const item = getDetailItem(t, kind, slug);
  const meta = slug ? SCREEN_META[slug] : undefined;

  const kicker = kind === 'feature' ? t.detail.featureKicker : t.detail.moduleKicker;

  if (!item || !meta) {
    return (
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center px-4 py-32 text-center">
          <h1 className="text-3xl font-bold tracking-tight">{t.detail.notFoundTitle}</h1>
          <p className="mt-3 text-muted-foreground">{t.detail.notFoundDesc}</p>
          <Button asChild className="mt-8">
            <Link to="/">
              <ArrowLeft className="size-4" />
              {t.detail.back}
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const Screen = SCREENS[meta.screen];

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="flex-1">
        {/* intro */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-glow opacity-50" />
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              {t.detail.back}
            </Link>

            <p className="mt-8 text-sm font-semibold tracking-wide text-brand-cyan uppercase">
              {kicker}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              {item.label}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              {item.description}
            </p>
          </div>
        </section>

        {/* description + highlights */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-base leading-relaxed text-foreground/90">{item.long}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                {t.detail.highlights}
              </h2>
              <ul className="mt-4 space-y-3">
                {item.points.map(point => (
                  <li key={point} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-cyan/15 text-brand-cyan">
                      <Check className="size-3" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* app preview */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="text-center text-2xl font-bold tracking-tight">
              {t.detail.previewTitle}
            </h2>
            <div className="relative mx-auto mt-10 max-w-5xl">
              <div className="pointer-events-none absolute -inset-x-8 -top-8 bottom-0 -z-10 bg-mesh-glow opacity-40" />
              <AppFrame activeNav={meta.activeNav}>
                <Screen />
              </AppFrame>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                {t.showcase.mockNote}
              </p>
            </div>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </div>
  );
}
