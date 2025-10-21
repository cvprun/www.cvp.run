import Link from 'next/link';
import {Github, BookOpen} from 'lucide-react';
import {Button} from '@/components/ui/button';

export function CTA() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Get started for free today
        </h2>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open source and MIT licensed. Start building computer vision applications in
          minutes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" asChild>
            <Link href="https://github.com/cvprun/cvp" target="_blank" rel="noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Get Started
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link
              href="https://github.com/cvprun/cvp#readme"
              target="_blank"
              rel="noreferrer"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Read Documentation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
