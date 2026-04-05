import {notFound} from 'next/navigation';

import {DownloadHero} from '@/components/download-page/download-hero';
import {InstallMethods} from '@/components/download-page/install-methods';
import {QuickStart} from '@/components/download-page/quick-start';
import {SystemRequirements} from '@/components/download-page/system-requirements';
import {Footer} from '@/components/footer';
import {isValidLanguage, languages, type Language} from '@/lib/i18n';
import {getTranslations} from '@/lib/translations';

import type {Metadata} from 'next';

interface DownloadPageProps {
  params: Promise<{lang: string}>;
}

export function generateStaticParams() {
  return languages.map(lang => ({lang}));
}

export async function generateMetadata({params}: DownloadPageProps): Promise<Metadata> {
  const {lang} = await params;
  const t = getTranslations(lang as Language);
  return {
    title: t.download.title,
    description: t.download.description,
  };
}

export default async function DownloadPage({params}: DownloadPageProps) {
  const {lang} = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  return (
    <>
      <main>
        <DownloadHero lang={lang as Language} />
        <SystemRequirements lang={lang as Language} />
        <InstallMethods lang={lang as Language} />
        <QuickStart lang={lang as Language} />
      </main>
      <Footer lang={lang as Language} />
    </>
  );
}
