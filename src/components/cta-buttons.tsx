import {ArrowRight} from 'lucide-react';
import {Link} from 'react-router-dom';

import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n';
import {appLink, paths} from '@/lib/site';

/** Primary "start for free" + secondary "see pricing" pair. Falls back to a
 * disabled coming-soon state until VITE_APP_URL is configured. */
export function CtaButtons({withNote = true}: {withNote?: boolean}) {
  const {t} = useLanguage();
  const signup = appLink('/signup');

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        {signup ? (
          <Button asChild size="lg">
            <a href={signup}>
              {t.cta.primary}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        ) : (
          <Button size="lg" disabled className="cursor-not-allowed">
            {t.nav.comingSoon}
          </Button>
        )}
        <Button asChild size="lg" variant="outline">
          <Link to={paths.pricing}>{t.cta.secondary}</Link>
        </Button>
      </div>
      {withNote && !signup && (
        <p className="text-xs text-muted-foreground">{t.cta.comingSoonNote}</p>
      )}
    </div>
  );
}
