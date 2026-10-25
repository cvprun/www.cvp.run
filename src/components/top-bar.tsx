import {ChevronDown, Menu, X} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import {DevelopmentBadge} from '@/components/development-badge';
import {LanguageSwitcher} from '@/components/language-switcher';
import {Logo} from '@/components/logo';
import {ModeToggle} from '@/components/mode-toggle';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useLanguage} from '@/lib/i18n';
import {PAGE_ICONS} from '@/lib/page-icons';
import {
  appLink,
  FEATURE_GROUPS,
  pagesIn,
  paths,
  type FeatureCategory,
  type FeaturePageDef,
} from '@/lib/site';
import {cn} from '@/lib/utils';

/** One menu entry: the page's sidebar icon, name and one-line tagline. */
function MenuEntry({page}: {page: FeaturePageDef}) {
  const {t} = useLanguage();
  const Icon = PAGE_ICONS[page.slug];
  return (
    <DropdownMenuItem asChild className="items-start gap-3 px-2.5 py-2">
      <Link to={page.path}>
        <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <span className="min-w-0">
          <span className="flex items-center gap-2 text-sm font-medium">
            {t.pageMeta[page.slug].label}
            {page.status === 'development' && <DevelopmentBadge />}
          </span>
          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
            {t.pageMeta[page.slug].tagline}
          </span>
        </span>
      </Link>
    </DropdownMenuItem>
  );
}

function NavDropdown({
  category,
  label,
  active,
}: {
  category: FeatureCategory;
  label: string;
  active: boolean;
}) {
  const {t} = useLanguage();
  const pages = pagesIn(category);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={cn(
          'group flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 data-[state=open]:text-foreground',
          active ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {label}
        <ChevronDown className="size-3.5 transition-transform group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={10}
        collisionPadding={16}
        className={cn(
          'p-2',
          category === 'labeling' && 'w-80',
          category === 'platform' && 'grid w-[36rem] grid-cols-2 gap-x-1',
          category === 'more' && 'grid w-[50rem] grid-cols-3 gap-x-2',
        )}
      >
        {category === 'more'
          ? FEATURE_GROUPS.map(group => (
              <DropdownMenuGroup key={group}>
                <DropdownMenuLabel>{t.nav.groups[group]}</DropdownMenuLabel>
                {pages
                  .filter(page => page.group === group)
                  .map(page => (
                    <MenuEntry key={page.slug} page={page} />
                  ))}
              </DropdownMenuGroup>
            ))
          : pages.map(page => <MenuEntry key={page.slug} page={page} />)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TopLink({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: string;
}) {
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground',
        active ? 'text-foreground' : 'text-muted-foreground',
      )}
    >
      {children}
    </Link>
  );
}

/** Collapsible group in the phone menu. */
function MobileGroup({category, label}: {category: FeatureCategory; label: string}) {
  const {t} = useLanguage();
  return (
    <details className="group border-b border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-sm font-medium [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <ul className="pb-3">
        {pagesIn(category).map(page => {
          const Icon = PAGE_ICONS[page.slug];
          return (
            <li key={page.slug}>
              <Link
                to={page.path}
                className="flex items-center gap-3 rounded-md px-1 py-2 text-sm text-foreground/90"
              >
                <Icon className="size-4 shrink-0 text-muted-foreground" />
                {t.pageMeta[page.slug].label}
                {page.status === 'development' && <DevelopmentBadge />}
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

export function TopBar() {
  const {t} = useLanguage();
  const {pathname} = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(64);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // While the phone menu is open the page underneath must not scroll, and
  // Escape closes it like any other overlay.
  useEffect(() => {
    if (!mobileOpen) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const toggleMobile = () => {
    if (!mobileOpen && headerRef.current) {
      setPanelTop(headerRef.current.getBoundingClientRect().bottom);
    }
    setMobileOpen(open => !open);
  };

  const signin = appLink('/signin');
  const signup = appLink('/signup');
  const inCategory = (category: FeatureCategory) =>
    pagesIn(category).some(page => pathname === page.path);

  return (
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-50 w-full transition-colors',
        // No backdrop-filter while the phone menu is open: it would make the
        // header the containing block of the fixed menu panel.
        mobileOpen
          ? 'border-b border-border bg-background'
          : scrolled
            ? 'border-b border-border bg-background/85 backdrop-blur-md'
            : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link to={paths.home} className="flex shrink-0 items-center" aria-label="CVP">
          <Logo />
        </Link>

        <nav aria-label={t.nav.primary} className="hidden items-center lg:flex">
          <NavDropdown
            category="labeling"
            label={t.nav.labeling}
            active={inCategory('labeling')}
          />
          <NavDropdown
            category="platform"
            label={t.nav.platform}
            active={inCategory('platform')}
          />
          <NavDropdown category="more" label={t.nav.more} active={inCategory('more')} />
          <TopLink to={paths.pricing} active={pathname === paths.pricing}>
            {t.nav.pricing}
          </TopLink>
          <TopLink to={paths.changelog} active={pathname === paths.changelog}>
            {t.nav.changelog}
          </TopLink>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <LanguageSwitcher />
          <ModeToggle />
          {signin && (
            <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
              <a href={signin}>{t.nav.login}</a>
            </Button>
          )}
          {signup ? (
            <Button asChild size="sm" className="ml-1">
              <a href={signup}>{t.nav.getStarted}</a>
            </Button>
          ) : (
            <span className="ml-1 hidden rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground sm:inline-flex">
              {t.nav.comingSoon}
            </span>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden"
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={toggleMobile}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label={t.nav.primary}
          style={{top: panelTop}}
          className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto border-t border-border bg-background px-4 pb-8 sm:px-6 lg:hidden"
        >
          <div className="mx-auto max-w-6xl">
            <MobileGroup category="labeling" label={t.nav.labeling} />
            <MobileGroup category="platform" label={t.nav.platform} />
            <MobileGroup category="more" label={t.nav.more} />
            {[
              {to: paths.pricing, label: t.nav.pricing},
              {to: paths.changelog, label: t.nav.changelog},
              {to: paths.security, label: t.nav.security},
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block border-b border-border py-3.5 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 grid gap-2">
              {signup ? (
                <Button asChild>
                  <a href={signup}>{t.nav.getStarted}</a>
                </Button>
              ) : (
                <Button disabled>{t.nav.comingSoon}</Button>
              )}
              {signin && (
                <Button asChild variant="outline">
                  <a href={signin}>{t.nav.login}</a>
                </Button>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
