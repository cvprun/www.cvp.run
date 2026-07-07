import {ChevronDown, Menu, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import {LanguageSwitcher} from '@/components/language-switcher';
import {Logo} from '@/components/logo';
import {ModeToggle} from '@/components/mode-toggle';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useLanguage} from '@/lib/i18n';
import {appLink, FEATURE_PAGES, paths, type FeatureCategory} from '@/lib/site';
import {cn} from '@/lib/utils';

function NavDropdown({category, label}: {category: FeatureCategory; label: string}) {
  const {t} = useLanguage();
  const pages = FEATURE_PAGES.filter(p => p.category === category);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground data-[state=open]:text-foreground">
        {label}
        <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {pages.map(page => (
          <DropdownMenuItem key={page.slug} asChild>
            <Link to={page.path} className="flex flex-col items-start gap-0.5">
              <span className="text-sm font-medium">{t.pageMeta[page.slug].label}</span>
              <span className="text-xs text-muted-foreground">
                {t.pageMeta[page.slug].tagline}
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TopBar() {
  const {t} = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const signin = appLink('/signin');
  const signup = appLink('/signup');

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors',
        scrolled || mobileOpen
          ? 'border-b border-border bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to={paths.home} className="flex items-center" aria-label="CVP">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavDropdown category="labeling" label={t.nav.labeling} />
          <NavDropdown category="platform" label={t.nav.platform} />
          <Link
            to={paths.pricing}
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.pricing}
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ModeToggle />
          {signin && (
            <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
              <a href={signin}>{t.nav.login}</a>
            </Button>
          )}
          {signup ? (
            <Button asChild size="sm" className="ml-1 hidden sm:inline-flex">
              <a href={signup}>{t.nav.getStarted}</a>
            </Button>
          ) : (
            <span className="ml-1 hidden items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground sm:inline-flex">
              <span className="size-1.5 animate-pulse rounded-full bg-brand-cyan" />
              {t.nav.comingSoon}
            </span>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setMobileOpen(open => !open)}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background/95 px-4 pt-2 pb-4 backdrop-blur-md md:hidden">
          <p className="px-2 pt-2 pb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {t.nav.labeling}
          </p>
          {FEATURE_PAGES.filter(p => p.category === 'labeling').map(page => (
            <Link
              key={page.slug}
              to={page.path}
              className="block rounded-md px-2 py-2 text-sm text-foreground/90"
            >
              {t.pageMeta[page.slug].label}
            </Link>
          ))}
          <p className="px-2 pt-3 pb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {t.nav.platform}
          </p>
          {FEATURE_PAGES.filter(p => p.category === 'platform').map(page => (
            <Link
              key={page.slug}
              to={page.path}
              className="block rounded-md px-2 py-2 text-sm text-foreground/90"
            >
              {t.pageMeta[page.slug].label}
            </Link>
          ))}
          <Link
            to={paths.pricing}
            className="mt-2 block border-t border-border px-2 pt-3 text-sm font-medium"
          >
            {t.nav.pricing}
          </Link>
        </nav>
      )}
    </header>
  );
}
