import {ArrowRight} from 'lucide-react';
import {useState} from 'react';
import {Link} from 'react-router-dom';

import {FinalCta} from '@/components/final-cta';
import {NewsletterForm} from '@/components/newsletter-form';
import {Reveal} from '@/components/reveal';
import {SectionLabel} from '@/components/section-header';
import {
  CHANGELOG,
  CHANGELOG_TAGS,
  changelogByMonth,
  type ChangelogEntry,
  type ChangelogTag,
} from '@/lib/changelog';
import {useLanguage} from '@/lib/i18n';
import {NEWSLETTER_API_URL} from '@/lib/newsletter';
import {FEATURE_PAGES, paths} from '@/lib/site';
import {usePageMeta} from '@/lib/use-page-meta';
import {cn} from '@/lib/utils';

function entryPath(entry: ChangelogEntry): string | null {
  if (!entry.page) {
    return null;
  }
  if (entry.page === 'security') {
    return paths.security;
  }
  return FEATURE_PAGES.find(page => page.slug === entry.page)?.path ?? null;
}

function useDateFormat() {
  const {lang} = useLanguage();
  const locale = lang === 'ko' ? 'ko-KR' : 'en-US';
  return {
    month: (month: string) =>
      new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        timeZone: 'UTC',
      }).format(new Date(`${month}-01T00:00:00Z`)),
    day: (date: string) =>
      new Intl.DateTimeFormat(locale, {
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(new Date(`${date}T00:00:00Z`)),
  };
}

/** One changelog line: date, tag, title, body and a link to its page. */
function ChangelogItem({entry}: {entry: ChangelogEntry}) {
  const {t} = useLanguage();
  const c = t.changelogPage;
  const format = useDateFormat();
  const text = c.entries[entry.id];
  const to = entryPath(entry);

  return (
    <article className="grid gap-2 border-t border-border py-6 sm:grid-cols-[7rem_1fr] sm:gap-6">
      <div className="flex items-center gap-2 text-xs text-muted-foreground sm:flex-col sm:items-start sm:gap-1.5">
        <time dateTime={entry.date} className="tabular-nums">
          {format.day(entry.date)}
        </time>
        <span className="rounded-sm border border-border px-1.5 leading-5">
          {c.tags[entry.tag]}
        </span>
      </div>
      <div className="max-w-2xl">
        <h3 className="text-base font-semibold tracking-tight">{text.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {text.body}
        </p>
        {to && (
          <Link
            to={to}
            className="group mt-2.5 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
          >
            {c.more}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </article>
  );
}

export function ChangelogPage() {
  const {t} = useLanguage();
  const c = t.changelogPage;
  const format = useDateFormat();
  const [tag, setTag] = useState<ChangelogTag | null>(null);
  usePageMeta(`${c.label} — CVP`, c.description);

  const visible = tag ? CHANGELOG.filter(entry => entry.tag === tag) : CHANGELOG;
  const months = changelogByMonth(visible);

  return (
    <>
      <section>
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 sm:pt-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div className="max-w-2xl">
              <SectionLabel>{c.label}</SectionLabel>
              <h1 className="mt-4 text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-5xl">
                {c.title}
              </h1>
              <p className="mt-5 text-base text-muted-foreground sm:text-lg">
                {c.description}
              </p>
            </div>
            {NEWSLETTER_API_URL && (
              <div>
                <p className="text-sm text-muted-foreground">{c.subscribeLead}</p>
                <NewsletterForm source="www-changelog" className="mt-3" />
              </div>
            )}
          </div>

          <div
            role="group"
            aria-label={c.filterLabel}
            className="mt-10 flex flex-wrap gap-1.5"
          >
            {[null, ...CHANGELOG_TAGS].map(value => (
              <button
                key={value ?? 'all'}
                type="button"
                aria-pressed={tag === value}
                onClick={() => setTag(value)}
                className={cn(
                  'rounded-md border px-2.5 py-1 text-sm transition-colors',
                  tag === value
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                {value ? c.tags[value] : c.all}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          {months.length === 0 && (
            <p className="py-16 text-sm text-muted-foreground">{c.empty}</p>
          )}
          {months.map(group => (
            <Reveal key={group.month}>
              <div className="grid gap-x-10 pt-12 lg:grid-cols-[12rem_1fr]">
                <h2 className="mb-2 text-lg font-semibold tracking-tight lg:sticky lg:top-24 lg:mb-0 lg:self-start">
                  {format.month(group.month)}
                </h2>
                <div>
                  {group.entries.map(entry => (
                    <ChangelogItem key={entry.id} entry={entry} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
