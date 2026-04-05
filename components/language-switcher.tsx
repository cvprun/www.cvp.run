'use client';

import Link from 'next/link';

import type {Language} from '@/lib/i18n';
import {languages} from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLang: Language;
  slug: string;
}

export function LanguageSwitcher({currentLang, slug}: LanguageSwitcherProps) {
  return (
    <div className="flex gap-2">
      {languages.map(lang => (
        <Link
          key={lang}
          href={`/${lang}/${slug}`}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currentLang === lang
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          {lang.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
