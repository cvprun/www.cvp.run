import {AppShowcase} from '@/components/app-showcase';
import {Cta} from '@/components/cta';
import {Features} from '@/components/features';
import {Footer} from '@/components/footer';
import {Hero} from '@/components/hero';
import {Modules} from '@/components/modules';
import {TopBar} from '@/components/top-bar';

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Modules />
        <AppShowcase />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
