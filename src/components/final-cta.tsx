import {CtaButtons} from '@/components/cta-buttons';
import {NewsletterForm} from '@/components/newsletter-form';
import {useLanguage} from '@/lib/i18n';
import {NEWSLETTER_API_URL} from '@/lib/newsletter';
import {cn} from '@/lib/utils';

/** Closing call-to-action band shared by every page. The newsletter column
 * only renders when the signup form itself can render. */
export function FinalCta() {
  const {t} = useLanguage();
  const withNewsletter = Boolean(NEWSLETTER_API_URL);

  return (
    <section className="border-t border-border bg-muted/20">
      <div
        className={cn(
          'mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-24',
          withNewsletter && 'lg:grid-cols-[1.4fr_1fr] lg:items-end',
        )}
      >
        <div>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">{t.cta.description}</p>
          <div className="mt-8">
            <CtaButtons />
          </div>
        </div>
        {withNewsletter && (
          <div className="border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <p className="text-sm text-muted-foreground">{t.newsletter.ctaLead}</p>
            <NewsletterForm source="www-cta" className="mt-3" />
          </div>
        )}
      </div>
    </section>
  );
}
