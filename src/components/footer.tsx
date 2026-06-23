import {Logo} from '@/components/logo';
import {useLanguage} from '@/lib/i18n';

export function Footer() {
  const {t} = useLanguage();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t.footer.description}
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h3 className="text-sm font-semibold">{t.footer.productTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="transition-colors hover:text-foreground">
                    {t.footer.features}
                  </a>
                </li>
                <li>
                  <a href="#modules" className="transition-colors hover:text-foreground">
                    {t.footer.modules}
                  </a>
                </li>
                <li>
                  <a href="#platform" className="transition-colors hover:text-foreground">
                    {t.footer.platform}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">{t.footer.statusTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="inline-flex items-center gap-2">
                  <span className="size-1.5 animate-pulse rounded-full bg-brand-cyan" />
                  {t.footer.inDevelopment}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
