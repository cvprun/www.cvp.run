import {notFound} from 'next/navigation';
import {Hero} from '@/components/hero';
import {Features} from '@/components/features';
import {CTA} from '@/components/cta';
import {Footer} from '@/components/footer';
import {isValidLanguage, languages, type Language} from '@/lib/i18n';

interface HomePageProps {
  params: Promise<{lang: string}>;
}

export function generateStaticParams() {
  return languages.map(lang => ({lang}));
}

export default async function HomePage({params}: HomePageProps) {
  const {lang} = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  return (
    <>
      <main>
        <Hero lang={lang as Language} />
        <Features lang={lang as Language} />
        <CTA lang={lang as Language} />
      </main>
      <Footer lang={lang as Language} />
    </>
  );
}
