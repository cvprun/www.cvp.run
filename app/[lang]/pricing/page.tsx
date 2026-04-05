import {notFound} from 'next/navigation';

import {Footer} from '@/components/footer';
import {PricingHero} from '@/components/pricing-page/pricing-hero';
import {PricingTiers} from '@/components/pricing-page/pricing-tiers';
import {isValidLanguage, languages, type Language} from '@/lib/i18n';

import type {Metadata} from 'next';

interface PricingPageProps {
  params: Promise<{lang: string}>;
}

export function generateStaticParams() {
  return languages.map(lang => ({lang}));
}

export async function generateMetadata({params}: PricingPageProps): Promise<Metadata> {
  const {lang} = await params;
  const title = lang === 'ko' ? '가격 - CVP' : 'Pricing - CVP';
  const description =
    lang === 'ko'
      ? 'CVP 요금제. 개인 사용은 무료, 상업적 배포를 위한 Enterprise 라이선스.'
      : 'CVP pricing plans. Free for personal use, Enterprise licenses for commercial deployment.';

  return {
    title,
    description,
  };
}

export default async function PricingPage({params}: PricingPageProps) {
  const {lang} = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  return (
    <>
      <main>
        <PricingHero lang={lang as Language} />
        <PricingTiers lang={lang as Language} />
      </main>
      <Footer lang={lang as Language} />
    </>
  );
}
