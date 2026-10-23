import {Reveal} from '@/components/reveal';
import {SectionHeader} from '@/components/section-header';
import {useLanguage} from '@/lib/i18n';
import {getLabelingTools, type ToolSlug} from '@/lib/labeling-tools';
import {cn} from '@/lib/utils';

/**
 * "Packed with advanced labeling tools" — a ruled reference list of the
 * drawing and AI tools the active editor actually ships (see
 * `lib/labeling-tools.ts`). Each entry shows the product's real icon, name,
 * one-line description, and shortcut key. Rendered on the labeling feature
 * pages only; returns null otherwise.
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
          <SectionHeader label={lt.kicker} title={lt.title} description={subtitle} />
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map(({id, icon: Icon, shortcut, ai}) => {
              const tool = lt.tools[id as keyof typeof lt.tools];
              return (
                <li key={id} className="border-t border-border py-5">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    <h3 className="truncate text-sm font-medium">{tool.name}</h3>
                    {ai && (
                      <span className="shrink-0 rounded-sm border border-border px-1 font-mono text-[10px] leading-4 text-muted-foreground">
                        {lt.aiBadge}
                      </span>
                    )}
                    <kbd className="ml-auto min-w-5 shrink-0 rounded-sm border border-border px-1 text-center font-mono text-[10px] leading-4 text-muted-foreground">
                      {shortcut}
                    </kbd>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {tool.desc}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <p className="mt-4 text-xs text-muted-foreground">{lt.footnote}</p>
      </div>
    </section>
  );
}
