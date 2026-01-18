import Link from 'next/link';
import {Rocket, Github, BookOpen} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {getTranslations} from '@/lib/translations';
import type {Language} from '@/lib/i18n';

interface QuickStartProps {
  lang: Language;
}

export function QuickStart({lang}: QuickStartProps) {
  const t = getTranslations(lang);

  return (
    <section className="container mx-auto pb-16 md:pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border bg-card p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t.download.quickStart.title}</h2>
              <p className="text-sm text-muted-foreground">
                {t.download.quickStart.description}
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/50 overflow-hidden mb-6">
            <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-muted-foreground font-mono">shell</span>
            </div>
            <div className="p-4">
              <pre className="text-sm font-mono text-foreground">
                <code>
                  <span className="text-muted-foreground"># {t.download.quickStart.commands.player}</span>
                  {'\n'}
                  <span className="text-primary">$</span> cvp player
                  {'\n\n'}
                  <span className="text-muted-foreground"># {t.download.quickStart.commands.help}</span>
                  {'\n'}
                  <span className="text-primary">$</span> cvp --help
                </code>
              </pre>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link
                href="https://github.com/cvprun/cvp#readme"
                target="_blank"
                rel="noreferrer"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                {t.download.cta.viewDocs}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href="https://github.com/cvprun/cvp"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                {t.download.cta.viewOnGithub}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
