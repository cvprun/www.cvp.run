import {Moon, Sun} from 'lucide-react';

import {useTheme} from '@/components/theme-provider';
import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n';

export function ModeToggle() {
  const {theme, toggleTheme} = useTheme();
  const {t} = useLanguage();
  const label = theme === 'dark' ? t.nav.themeToLight : t.nav.themeToDark;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="block size-4 dark:hidden" />
    </Button>
  );
}
