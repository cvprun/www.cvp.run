import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/** "In development" tag next to a feature page name (nav, cards, page intro). */
export function DevelopmentBadge({className}: {className?: string}) {
  const {t} = useLanguage();
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-sm border border-amber-500/40 px-1 text-[10px] leading-4 font-medium text-amber-600 dark:text-amber-400',
        className,
      )}
    >
      {t.featurePage.statusInDevelopment}
    </span>
  );
}
