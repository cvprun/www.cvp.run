import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {LanguageSwitcher} from '@/components/language-switcher';
import {Logo} from '@/components/logo';
import {ModeToggle} from '@/components/mode-toggle';
import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

export function TopBar() {
  const {t} = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    {href: '/#features', label: t.nav.features},
    {href: '/#modules', label: t.nav.modules},
    {href: '/#preview', label: t.nav.preview},
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center" aria-label="CVP">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <span className="mr-1 hidden items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground sm:inline-flex">
            <span className="size-1.5 animate-pulse rounded-full bg-brand-cyan" />
            {t.nav.status}
          </span>
          <LanguageSwitcher />
          <ModeToggle />
          <Button asChild size="sm" className="ml-1 hidden sm:inline-flex">
            <a href="/#features">{t.hero.secondaryCta}</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
