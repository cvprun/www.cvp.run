/**
 * Newsletter API client. Posts to the product app's public /api/newsletter
 * endpoints (app.cvp.run worker). The base URL follows VITE_API_URL when set
 * and falls back to VITE_APP_URL; when neither is configured the signup form
 * stays hidden (same "coming soon" convention as the CTA buttons).
 */
import {APP_URL} from './site';

export const NEWSLETTER_API_URL: string | undefined =
  (import.meta.env.VITE_API_URL as string | undefined) ?? APP_URL;

/** Cloudflare Turnstile site key. Optional — unset renders the form without
 * the widget (the worker only enforces Turnstile when its secret is set). */
export const TURNSTILE_SITE_KEY: string | undefined = import.meta.env
  .VITE_TURNSTILE_SITE_KEY as string | undefined;

export type NewsletterSource = 'www-footer' | 'www-cta';

async function post(path: string, body: Record<string, unknown>): Promise<boolean> {
  if (!NEWSLETTER_API_URL) {
    return false;
  }
  try {
    const res = await fetch(`${NEWSLETTER_API_URL}${path}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function subscribeNewsletter(input: {
  email: string;
  locale: string;
  source: NewsletterSource;
  turnstileToken?: string;
}): Promise<boolean> {
  return post('/api/newsletter/subscribe', input);
}

export function confirmNewsletter(token: string): Promise<boolean> {
  return post('/api/newsletter/confirm', {token});
}

export function unsubscribeNewsletter(token: string): Promise<boolean> {
  return post('/api/newsletter/unsubscribe', {token});
}
