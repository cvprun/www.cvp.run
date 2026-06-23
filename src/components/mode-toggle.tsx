import {Moon, Sun} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {useTheme} from '@/components/theme-provider';

export function ModeToggle() {
  const {theme, toggleTheme} = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="block size-4 dark:hidden" />
    </Button>
  );
}
