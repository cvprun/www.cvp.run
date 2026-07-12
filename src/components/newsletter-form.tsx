import {useEffect, useRef, useState, type FormEvent} from 'react';

import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n';
import {
  NEWSLETTER_API_URL,
  subscribeNewsletter,
  TURNSTILE_SITE_KEY,
  type NewsletterSource,
} from '@/lib/newsletter';
import {cn} from '@/lib/utils';

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
        },
      ) => string;
    };
  }
}

const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function loadTurnstileScript(): Promise<void> {
  return new Promise(resolve => {
    if (window.turnstile) {
      resolve();
      return;
    }
    const existing = document.querySelector(`script[src="${TURNSTILE_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      return;
    }
    const script = document.createElement('script');
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.addEventListener('load', () => resolve());
    document.head.appendChild(script);
  });
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/** Email signup form for the mailing list. Hidden until the app API base
 * (VITE_API_URL / VITE_APP_URL) is configured. */
export function NewsletterForm({
  source,
  className,
}: {
  source: NewsletterSource;
  className?: string;
}) {
  const {lang, t} = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const siteKey = TURNSTILE_SITE_KEY;
    if (!siteKey || !turnstileRef.current) {
      return;
    }
    let cancelled = false;
    const container = turnstileRef.current;
    void loadTurnstileScript().then(() => {
      if (cancelled || !window.turnstile || container.childElementCount > 0) {
        return;
      }
      window.turnstile.render(container, {
        sitekey: siteKey,
        callback: token => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(null),
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!NEWSLETTER_API_URL) {
    return null;
  }

  if (status === 'success') {
    return (
      <p className={cn('text-sm text-muted-foreground', className)}>
        {t.newsletter.success}
      </p>
    );
  }

  const waitingForTurnstile = Boolean(TURNSTILE_SITE_KEY) && !turnstileToken;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting' || waitingForTurnstile) {
      return;
    }
    setStatus('submitting');
    const ok = await subscribeNewsletter({
      email,
      locale: lang,
      source,
      turnstileToken: turnstileToken ?? undefined,
    });
    setStatus(ok ? 'success' : 'error');
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder={t.newsletter.emailPlaceholder}
          aria-label={t.newsletter.emailLabel}
          className="h-9 w-full min-w-0 flex-1 rounded-md border bg-background px-3 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
        <Button type="submit" disabled={status === 'submitting' || waitingForTurnstile}>
          {status === 'submitting' ? t.newsletter.submitting : t.newsletter.subscribe}
        </Button>
      </div>
      {TURNSTILE_SITE_KEY && <div ref={turnstileRef} className="mt-2" />}
      {status === 'error' && (
        <p className="mt-2 text-sm text-destructive">{t.newsletter.error}</p>
      )}
    </form>
  );
}
