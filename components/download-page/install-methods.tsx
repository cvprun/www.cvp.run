import {Terminal, Github} from 'lucide-react';
import {getTranslations} from '@/lib/translations';
import type {Language} from '@/lib/i18n';

interface InstallMethodsProps {
  lang: Language;
}

function CodeBlock({children}: {children: React.ReactNode}) {
  return (
    <div className="rounded-lg border bg-muted/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs text-muted-foreground font-mono">shell</span>
      </div>
      <div className="p-4">
        <pre className="text-sm font-mono text-foreground overflow-x-auto">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}

export function InstallMethods({lang}: InstallMethodsProps) {
  const t = getTranslations(lang);

  return (
    <section className="container mx-auto pb-16">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* pip install */}
        <div className="rounded-2xl border bg-card p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t.download.methods.pip.title}</h2>
              <p className="text-sm text-muted-foreground">
                {t.download.methods.pip.description}
              </p>
            </div>
          </div>

          <ol className="list-decimal list-inside space-y-4 text-muted-foreground mb-4">
            <li>{t.download.methods.pip.steps[0]}</li>
            <li>{t.download.methods.pip.steps[1]}</li>
          </ol>

          <CodeBlock>pip install cvp</CodeBlock>
        </div>

        {/* GitHub install */}
        <div className="rounded-2xl border bg-card p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Github className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t.download.methods.github.title}</h2>
              <p className="text-sm text-muted-foreground">
                {t.download.methods.github.description}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.download.methods.github.steps[0]}
              </p>
              <CodeBlock>git clone https://github.com/cvprun/cvp.git</CodeBlock>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.download.methods.github.steps[1]}
              </p>
              <CodeBlock>cd cvp && pip install -e .</CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
