import {Cta} from '@/components/cta';
import {Features} from '@/components/features';
import {Footer} from '@/components/footer';
import {Hero} from '@/components/hero';
import {Modules} from '@/components/modules';
import {TechStack} from '@/components/tech-stack';
import {TopBar} from '@/components/top-bar';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Modules />
        <TechStack />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

export default App;
