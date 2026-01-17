import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {LegalPage} from '@/components/legal-page';
import {isValidLanguage, languages, type Language} from '@/lib/i18n';
import {getLegalContent} from '@/lib/markdown';

interface TermsOfServicePageProps {
  params: Promise<{lang: string}>;
}

export function generateStaticParams() {
  return languages.map((lang) => ({lang}));
}

export async function generateMetadata({params}: TermsOfServicePageProps): Promise<Metadata> {
  const {lang} = await params;
  const title = lang === 'ko' ? '이용약관' : 'Terms of Service';
  return {
    title: `${title} | CVP`,
  };
}

export default async function TermsOfServicePage({params}: TermsOfServicePageProps) {
  const {lang} = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  const content = await getLegalContent('terms-of-service', lang as Language);

  return (
    <LegalPage
      title={content.title}
      lastUpdated={content.lastUpdated}
      contentHtml={content.contentHtml}
      currentLang={lang as Language}
      slug="terms-of-service"
    />
  );
}
