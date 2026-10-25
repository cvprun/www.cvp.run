/**
 * Build-time route pages for crawlers and link previews.
 *
 * The site is a client-rendered SPA, so every URL used to receive the same
 * `index.html` head. After the bundle is written this plugin:
 *
 * - copies `dist/index.html` to `dist/<route>.html` per route with that
 *   route's title, description, canonical URL and Open Graph / Twitter tags
 *   (Cloudflare Pages serves `/labeling/images` from `labeling/images.html`;
 *   unknown paths still fall back to `index.html` as an SPA);
 * - writes `dist/sitemap.xml` from the same route list;
 * - writes `dist/_redirects` with permanent redirects for retired URLs.
 *
 * Copy comes from the Korean translations, the site's primary language. The
 * client updates the tags again after hydration (`usePageMeta`).
 */
import fs from 'node:fs';
import path from 'node:path';

import type {Plugin} from 'vite';

import {FEATURE_PAGES, LEGACY_REDIRECTS, SITE_ORIGIN, paths} from '../src/lib/site';
import {translations} from '../src/lib/translations';

type RouteMeta = {path: string; title: string; description: string};

const META_START = '<!-- route-meta:start -->';
const META_END = '<!-- route-meta:end -->';
const OG_IMAGE = `${SITE_ORIGIN}/og.png`;

function routeMetas(): RouteMeta[] {
  const t = translations.ko;
  return [
    {path: paths.home, title: t.meta.homeTitle, description: t.meta.homeDescription},
    {
      path: paths.pricing,
      title: `${t.nav.pricing} — CVP`,
      description: t.pricingPage.description,
    },
    {
      path: paths.security,
      title: `${t.securityPage.label} — CVP`,
      description: t.securityPage.description,
    },
    {
      path: paths.changelog,
      title: `${t.changelogPage.label} — CVP`,
      description: t.changelogPage.description,
    },
    ...FEATURE_PAGES.map(page => ({
      path: page.path,
      title: `${t.pageMeta[page.slug].label} — CVP`,
      description: t.pages[page.slug].intro,
    })),
  ];
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function canonical(routePath: string): string {
  return `${SITE_ORIGIN}${routePath === '/' ? '/' : routePath}`;
}

function headTags({path: routePath, title, description}: RouteMeta): string {
  const url = canonical(routePath);
  const tags = [
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="CVP" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta property="og:locale:alternate" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ];
  return tags.map(tag => `    ${tag}`).join('\n');
}

function withMeta(html: string, meta: RouteMeta): string {
  const start = html.indexOf(META_START);
  const end = html.indexOf(META_END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`index.html must contain ${META_START} … ${META_END}`);
  }
  return `${html.slice(0, start + META_START.length)}\n${headTags(meta)}\n    ${html.slice(end)}`;
}

function sitemap(routes: RouteMeta[]): string {
  const urls = routes.map(route => `  <url><loc>${canonical(route.path)}</loc></url>`);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

function redirects(): string {
  const rules = Object.entries(LEGACY_REDIRECTS).map(
    ([from, to]) => `${from} ${to} 301`,
  );
  return [...rules, '/features/* / 301', '/modules/* / 301', ''].join('\n');
}

export function routeHtml(): Plugin {
  let outDir = 'dist';
  return {
    name: 'cvp-route-html',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const indexPath = path.join(outDir, 'index.html');
      const template = fs.readFileSync(indexPath, 'utf8');
      const routes = routeMetas();

      for (const route of routes) {
        const html = withMeta(template, route);
        if (route.path === paths.home) {
          fs.writeFileSync(indexPath, html);
          continue;
        }
        const file = path.join(outDir, `${route.path.slice(1)}.html`);
        fs.mkdirSync(path.dirname(file), {recursive: true});
        fs.writeFileSync(file, html);
      }

      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap(routes));
      fs.writeFileSync(path.join(outDir, '_redirects'), redirects());
    },
  };
}
