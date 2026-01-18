import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {LegalPage} from '@/components/legal-page';
import {isValidLanguage, languages, type Language} from '@/lib/i18n';
import {getLegalContent} from '@/lib/markdown';

interface PrivacyPolicyPageProps {
  params: Promise<{lang: string}>;
}

export function generateStaticParams() {
  return languages.map(lang => ({lang}));
}

export async function generateMetadata({
  params,
}: PrivacyPolicyPageProps): Promise<Metadata> {
  const {lang} = await params;
  const title = lang === 'ko' ? '개인정보처리방침' : 'Privacy Policy';
  return {
    title: `${title} | CVP`,
  };
}

export default async function PrivacyPolicyPage({params}: PrivacyPolicyPageProps) {
  const {lang} = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  const content = await getLegalContent('privacy-policy', lang as Language);

  return (
    <LegalPage
      title={content.title}
      lastUpdated={content.lastUpdated}
      contentHtml={content.contentHtml}
      currentLang={lang as Language}
      slug="privacy-policy"
    />
  );
}
