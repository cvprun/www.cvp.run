import type {Metadata} from 'next';
import {PricingHero} from '@/components/pricing-page/pricing-hero';
import {PricingTiers} from '@/components/pricing-page/pricing-tiers';
import {Footer} from '@/components/footer';

export const metadata: Metadata = {
  title: 'Pricing - CVP Computer Vision Player',
  description:
    'CVP pricing plans. Free for personal use, Enterprise licenses for commercial deployment.',
};

export default function PricingPage() {
  return (
    <>
      <main>
        <PricingHero />
        <PricingTiers />
      </main>
      <Footer />
    </>
  );
}
