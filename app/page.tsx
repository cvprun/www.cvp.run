import {Hero} from '@/components/hero';
import {Features} from '@/components/features';
import {CTA} from '@/components/cta';

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <footer></footer>
    </div>
  );
}
