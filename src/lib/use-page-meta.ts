import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {SITE_ORIGIN} from '@/lib/site';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

/**
 * Sets the document title, description, canonical URL and the Open Graph /
 * Twitter tags for the current route. The build writes the same tags into
 * each route's static HTML (`scripts/vite-route-html.ts`) for crawlers that do
 * not run scripts; this keeps them right after client-side navigation and
 * language switches.
 */
export function usePageMeta(title: string, description?: string) {
  const {pathname} = useLocation();

  useEffect(() => {
    const url = `${SITE_ORIGIN}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
    document.title = title;
    setCanonical(url);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', title);
    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
      setMeta('name', 'twitter:description', description);
    }
  }, [title, description, pathname]);
}
