import {ArrowLeft, Eye, FileCode, FileText, LayoutTemplate, Save} from 'lucide-react';

import {MockChrome, MockWindow} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

export function MockWiki() {
  const {t} = useLanguage();
  const m = t.mocks.wiki;

  const modes = [
    {icon: FileCode, label: m.modeText, active: false},
    {icon: LayoutTemplate, label: m.modeVisual, active: false},
    {icon: Eye, label: m.modePreview, active: true},
  ];

  return (
    <MockWindow>
      <MockChrome />
      {/* wiki header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2 text-xs">
        <ArrowLeft className="size-3.5 text-muted-foreground" />
        <span className="font-medium">{m.title}</span>
        <span className="ml-auto flex overflow-hidden rounded-md bg-muted p-0.5">
          {modes.map(({icon: Icon, label, active}) => (
            <span
              key={label}
              className={cn(
                'flex items-center gap-1 rounded px-2 py-1 text-[10px]',
                active ? 'bg-background shadow-sm' : 'text-muted-foreground',
              )}
            >
              <Icon className="size-3" />
              {label}
            </span>
          ))}
        </span>
        <span className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground">
          <Save className="size-3" />
          {m.save}
        </span>
      </div>

      <div className="flex h-[19rem] sm:h-[21rem]">
        {/* page tree */}
        <aside className="hidden w-44 shrink-0 border-r border-border bg-muted/20 p-2 sm:block">
          <p className="px-2 py-1.5 text-[9px] font-semibold tracking-wider text-muted-foreground uppercase">
            {m.pagesTitle}
          </p>
          <ul className="space-y-0.5">
            {m.pages.map((page, i) => (
              <li
                key={page}
                className={cn(
                  'flex items-center gap-1.5 rounded px-2 py-1 text-[11px]',
                  i === 0 ? 'bg-muted font-medium' : 'text-muted-foreground',
                )}
              >
                <FileText className="size-3 shrink-0" />
                <span className="truncate">{page}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* rendered markdown */}
        <div className="min-w-0 flex-1 overflow-hidden p-5 sm:px-8">
          <h4 className="border-b border-border pb-1 text-base font-semibold">
            {m.docH2a}
          </h4>
          <p className="mt-2 text-[12px] leading-relaxed text-foreground/90">
            {m.docP1}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] text-foreground/90">
            <li>{m.docLi1}</li>
            <li>{m.docLi2}</li>
          </ul>
          <h4 className="mt-5 border-b border-border pb-1 text-base font-semibold">
            {m.docH2b}
          </h4>
          <p className="mt-2 text-[12px] leading-relaxed text-foreground/90">
            {m.docP2}{' '}
            <span className="inline-flex overflow-hidden rounded text-[10px] font-medium">
              <span className="bg-neutral-700 px-1.5 py-0.5 text-white">preset</span>
              <span className="bg-brand-blue px-1.5 py-0.5 text-white">COCO-17</span>
            </span>
          </p>
        </div>
      </div>
    </MockWindow>
  );
}
