import {Reveal} from '@/components/reveal';
import {useLanguage} from '@/lib/i18n';
import {getLabelingTools, type ToolSlug} from '@/lib/labeling-tools';
import {cn} from '@/lib/utils';

/**
 * "Packed with advanced labeling tools" — a responsive grid of the drawing and
 * AI tools the active editor actually ships (see `lib/labeling-tools.ts`). Each
 * card shows the product's real icon, name, one-line description, and shortcut
 * key. Rendered on the labeling feature pages only; returns null otherwise.
 */
export function LabelingToolsSection({
  slug,
  tinted = false,
}: {
  slug: string;
  tinted?: boolean;
}) {
  const {t} = useLanguage();
  const tools = getLabelingTools(slug);
  if (!tools) {
    return null;
  }

  const lt = t.labelingTools;
  const subtitle = lt.subtitles[slug as ToolSlug];

  return (
    <section className={cn('border-t border-border', tinted && 'bg-muted/20')}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-wide text-brand-cyan uppercase">
              {lt.kicker}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              {lt.title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{subtitle}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {tools.map(({id, icon: Icon, shortcut, ai}) => {
              const tool = lt.tools[id as keyof typeof lt.tools];
              return (
                <li
                  key={id}
                  className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand-cyan/60"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-muted/40 text-brand-cyan transition-colors group-hover:border-brand-cyan/40">
                      <Icon className="size-5" />
                    </span>
                    <span className="flex items-center gap-1.5">
                      {ai && (
                        <span className="rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase">
                          {lt.aiBadge}
                        </span>
                      )}
                      <kbd className="min-w-5 rounded border border-border bg-muted/40 px-1 text-center font-mono text-[10px] leading-5 text-muted-foreground">
                        {shortcut}
                      </kbd>
                    </span>
                  </div>
                  <h3 className="mt-3.5 text-sm font-semibold">{tool.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {tool.desc}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-6 text-center text-xs text-muted-foreground/80">
            {lt.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
