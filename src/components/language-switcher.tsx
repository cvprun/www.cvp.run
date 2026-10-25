import {Check, Languages} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useLanguage} from '@/lib/i18n';
import type {Language} from '@/lib/translations';

const LABELS: Record<Language, string> = {
  ko: '한국어',
  en: 'English',
};

export function LanguageSwitcher() {
  const {lang, setLang, t} = useLanguage();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t.nav.language}
          title={t.nav.language}
        >
          <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(LABELS) as Language[]).map(code => (
          <DropdownMenuItem
            key={code}
            lang={code}
            onClick={() => setLang(code)}
            className="justify-between gap-6"
          >
            {LABELS[code]}
            {code === lang && <Check className="size-3.5" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
