import type {Language} from '@/lib/i18n';
import {LanguageSwitcher} from './language-switcher';

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  contentHtml: string;
  currentLang: Language;
  slug: string;
}

export function LegalPage({title, lastUpdated, contentHtml, currentLang, slug}: LegalPageProps) {
  const formattedDate = new Date(lastUpdated).toLocaleDateString(
    currentLang === 'ko' ? 'ko-KR' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const lastUpdatedLabel = currentLang === 'ko' ? '최종 수정일' : 'Last updated';

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-2">
            {lastUpdatedLabel}: {formattedDate}
          </p>
        </div>
        <LanguageSwitcher currentLang={currentLang} slug={slug} />
      </div>
      <article
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{__html: contentHtml}}
      />
    </main>
  );
}
