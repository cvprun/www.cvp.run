import {ArrowLeft} from 'lucide-react';
import {useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';

import {Footer} from '@/components/footer';
import {TopBar} from '@/components/top-bar';
import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n';
import {confirmNewsletter, unsubscribeNewsletter} from '@/lib/newsletter';
import {paths} from '@/lib/site';

type ActionStatus = 'idle' | 'working' | 'success' | 'invalid';

/** Landing page for links in newsletter emails. The action only fires on an
 * explicit button click so mail scanners prefetching the URL cannot trigger
 * it. `mode` selects between double-opt-in confirmation and unsubscribe. */
export function NewsletterActionPage({mode}: {mode: 'confirm' | 'unsubscribe'}) {
  const {t} = useLanguage();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [status, setStatus] = useState<ActionStatus>(token ? 'idle' : 'invalid');

  const copy =
    mode === 'confirm'
      ? {
          title: t.newsletter.confirmTitle,
          description: t.newsletter.confirmDescription,
          action: t.newsletter.confirmAction,
          successTitle: t.newsletter.confirmSuccessTitle,
          successDescription: t.newsletter.confirmSuccessDescription,
        }
      : {
          title: t.newsletter.unsubscribeTitle,
          description: t.newsletter.unsubscribeDescription,
          action: t.newsletter.unsubscribeAction,
          successTitle: t.newsletter.unsubscribeSuccessTitle,
          successDescription: t.newsletter.unsubscribeSuccessDescription,
        };

  const handleAction = async () => {
    if (status !== 'idle') {
      return;
    }
    setStatus('working');
    const run = mode === 'confirm' ? confirmNewsletter : unsubscribeNewsletter;
    const ok = await run(token);
    setStatus(ok ? 'success' : 'invalid');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center px-4 py-32 text-center">
        {status === 'success' ? (
          <>
            <h1 className="text-3xl font-bold tracking-tight">{copy.successTitle}</h1>
            <p className="mt-3 text-muted-foreground">{copy.successDescription}</p>
          </>
        ) : status === 'invalid' ? (
          <>
            <h1 className="text-3xl font-bold tracking-tight">
              {t.newsletter.invalidTitle}
            </h1>
            <p className="mt-3 text-muted-foreground">
              {t.newsletter.invalidDescription}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold tracking-tight">{copy.title}</h1>
            <p className="mt-3 text-muted-foreground">{copy.description}</p>
            <Button
              size="lg"
              className="mt-8"
              disabled={status === 'working'}
              onClick={handleAction}
            >
              {status === 'working' ? t.newsletter.working : copy.action}
            </Button>
          </>
        )}
        <Button asChild variant="ghost" className="mt-10">
          <Link to={paths.home}>
            <ArrowLeft className="size-4" />
            {t.notFound.back}
          </Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
