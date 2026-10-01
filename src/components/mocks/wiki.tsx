import {
  Eye,
  FileCode,
  HelpCircle,
  LayoutTemplate,
  MonitorPlay,
  MoreHorizontal,
  RefreshCw,
  Save,
  Share2,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

const COPY = {
  ko: {share: '공유', present: '발표', approved: '승인됨'},
  en: {share: 'Share', present: 'Present', approved: 'Approved'},
} as const;

/** Wiki page detail (`/proj/:p/wiki/:pageId`): title row + edit bar + preview. */
export function MockWiki() {
  const {t, lang} = useLanguage();
  const m = t.mocks.wiki;
  const c = COPY[lang];

  const modes = [
    {icon: FileCode, label: m.modeText, active: false},
    {icon: LayoutTemplate, label: m.modeVisual, active: false},
    {icon: Eye, label: m.modePreview, active: true},
  ];

  return (
    <MockAppFrame
      activeNav="wiki"
      crumbs={[{label: m.title}]}
      title={m.title}
      meta={
        <span className="rounded-md bg-emerald-500 px-1.5 py-0.5 text-[9px] font-medium text-white">
          {c.approved}
        </span>
      }
      actions={
        <>
          <MockButton icon={Share2} variant="ghost" className="hidden @2xl:inline-flex">
            {c.share}
          </MockButton>
          <MockButton icon={MonitorPlay} variant="ghost">
            {c.present}
          </MockButton>
          <MockButton icon={Save} variant="default" className="opacity-50">
            {m.save}
          </MockButton>
          <MoreHorizontal className="size-3.5 text-muted-foreground" />
        </>
      }
      fill
    >
      {/* edit bar: refresh · syntax help | mode segmented control */}
      <div className="flex items-center gap-1 border-b border-border px-4 py-1 sm:px-5">
        <span className="flex size-6 items-center justify-center text-muted-foreground">
          <RefreshCw className="size-3.5" />
        </span>
        <span className="flex size-6 items-center justify-center text-muted-foreground">
          <HelpCircle className="size-3.5" />
        </span>
        <span className="ml-auto flex items-center gap-0.5 rounded-md bg-muted p-0.5">
          {modes.map(({icon: Icon, label, active}) => (
            <span
              key={label}
              className={cn(
                'flex h-5 items-center gap-1 rounded px-1.5 text-[10px] font-medium',
                active ? 'bg-background shadow-sm' : 'text-muted-foreground',
              )}
            >
              <Icon className="size-3" />
              {label}
            </span>
          ))}
        </span>
      </div>

      {/* rendered markdown (MarkdownView, max-w-3xl) */}
      <div className="h-[18rem] overflow-hidden p-4 sm:h-[20rem]">
        <div className="mx-auto max-w-2xl">
          <h4 className="border-b border-border pb-1 text-[15px] font-semibold">
            {m.docH2a}
          </h4>
          <p className="mt-2 text-[11px] leading-relaxed text-foreground/90">
            {m.docP1}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] text-foreground/90">
            <li>{m.docLi1}</li>
            <li>{m.docLi2}</li>
          </ul>
          <h4 className="mt-5 border-b border-border pb-1 text-[15px] font-semibold">
            {m.docH2b}
          </h4>
          <p className="mt-2 text-[11px] leading-relaxed text-foreground/90">
            {m.docP2}{' '}
            <span className="inline-flex overflow-hidden rounded text-[10px] font-medium">
              <span className="bg-neutral-700 px-1.5 py-0.5 text-white">preset</span>
              <span className="bg-brand-blue px-1.5 py-0.5 text-white">COCO-17</span>
            </span>
          </p>
        </div>
      </div>
    </MockAppFrame>
  );
}
