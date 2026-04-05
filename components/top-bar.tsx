'use client';

import {Star, Globe} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {ModeToggle} from '@/components/mode-toggle';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {type Language, languages, defaultLanguage} from '@/lib/i18n';
import {getTranslations} from '@/lib/translations';

function getLanguageFromPathname(pathname: string): Language {
  const segment = pathname.split('/')[1];
  if (languages.includes(segment as Language)) {
    return segment as Language;
  }
  return defaultLanguage;
}

function getPathnameWithoutLang(pathname: string): string {
  const segments = pathname.split('/');
  if (languages.includes(segments[1] as Language)) {
    return '/' + segments.slice(2).join('/') || '';
  }
  return pathname === '/' ? '' : pathname;
}

export function TopBar() {
  const pathname = usePathname();
  const currentLang = getLanguageFromPathname(pathname);
  const t = getTranslations(currentLang);
  const pathWithoutLang = getPathnameWithoutLang(pathname);

  const languageNames: Record<Language, string> = {
    ko: '한국어',
    en: 'English',
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href={`/${currentLang}`} className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">CVP</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href={`/${currentLang}/features`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t.nav.features}
            </Link>
            <Link
              href={`/${currentLang}/download`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t.nav.download}
            </Link>
            <Link
              href={`/${currentLang}/pricing`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t.nav.pricing}
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile menu can be added here if needed */}
          </div>

          <nav className="flex items-center space-x-2">
            <Link
              href="https://github.com/cvprun/cvp"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              <Star className="mr-2 h-4 w-4" />
              {t.nav.starOnGithub}
            </Link>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Switch language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map(lang => (
                  <DropdownMenuItem key={lang} asChild>
                    <Link
                      href={`/${lang}${pathWithoutLang}`}
                      className={currentLang === lang ? 'font-semibold' : ''}
                    >
                      {languageNames[lang]}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
