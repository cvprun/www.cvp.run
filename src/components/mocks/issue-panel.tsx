import {Check, ChevronDown, MessageSquare, Send} from 'lucide-react';

import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';

const CLASS_CAR = '#6496F5';

/** Canvas crop with one open pin and one resolved pin over a labeled box. */
function PinnedCanvas() {
  return (
    <div className="relative h-full min-h-56 overflow-hidden bg-neutral-950">
      <svg
        viewBox="0 0 520 320"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width={520} height={320} fill="#1c2431" />
        <polygon points="0,320 520,320 430,160 90,160" fill="#38445c" />
        <rect x={0} y={60} width={110} height={100} fill="#2b3850" />
        <rect x={420} y={50} width={100} height={110} fill="#2b3850" />
        {/* truck body: cabin + bed */}
        <rect x={150} y={182} width={92} height={64} rx={7} fill="#4c5b7a" />
        <rect x={238} y={168} width={150} height={78} rx={7} fill="#42506e" />
        {/* box currently spanning cabin AND bed (the issue) */}
        <rect
          x={142}
          y={158}
          width={254}
          height={96}
          fill={CLASS_CAR}
          fillOpacity={0.12}
          stroke={CLASS_CAR}
          strokeWidth={2}
        />
        <rect
          x={142}
          y={141}
          width={34}
          height={16}
          rx={2}
          fill={CLASS_CAR}
          opacity={0.85}
        />
        <text
          x={147}
          y={153}
          fontSize={11}
          fill="#ffffff"
          fontFamily="ui-sans-serif, system-ui"
        >
          car
        </text>
      </svg>

      {/* open pin (#1, amber) */}
      <span className="absolute top-[38%] left-[62%] flex h-6 min-w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full border-2 border-white bg-amber-500 px-1 text-[11px] font-semibold text-white shadow-md ring-2 ring-primary">
        <MessageSquare className="size-3" />1
      </span>
      {/* resolved pin (green check) */}
      <span className="absolute top-[70%] left-[28%] flex h-6 min-w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-emerald-500 px-1 text-white shadow-md">
        <Check className="size-3" />
      </span>
    </div>
  );
}

export function MockIssuePanel() {
  const {t} = useLanguage();
  const m = t.mocks.issues;

  return (
    <MockPanelFrame>
      <div className="flex flex-col sm:flex-row">
        <div className="min-w-0 flex-1">
          <PinnedCanvas />
        </div>

        {/* issues tab */}
        <aside className="flex w-full shrink-0 flex-col border-t border-border bg-card sm:w-72 sm:border-t-0 sm:border-l">
          <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
            <span className="text-[11px] text-muted-foreground">{m.headerOpen}</span>
            <span className="flex gap-0.5 text-[10px]">
              <span className="rounded px-1.5 py-0.5 text-muted-foreground">
                {m.filterAll}
              </span>
              <span className="rounded bg-primary px-1.5 py-0.5 text-primary-foreground">
                {m.filterOpen}
              </span>
              <span className="rounded px-1.5 py-0.5 text-muted-foreground">
                {m.filterResolved}
              </span>
            </span>
          </div>

          {/* expanded issue row */}
          <div className="bg-accent/30 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-semibold text-white">
                1
              </span>
              <span className="text-[11px] font-medium">{m.reviewer}</span>
              <span className="text-[10px] text-muted-foreground">{m.openAgo}</span>
              <ChevronDown className="ml-auto size-3.5 rotate-180 text-muted-foreground" />
            </div>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
              <MessageSquare className="size-2.5" />
              {m.commentCount}
            </div>

            {/* thread */}
            <div className="mt-2 space-y-2 rounded-md border border-border bg-background p-2">
              <div>
                <span className="text-[10px] font-medium">{m.reviewer}</span>
                <span className="ml-1.5 text-[9px] text-muted-foreground">
                  {m.openAgo}
                </span>
                <p className="mt-0.5 text-[11px] leading-snug">{m.comment1}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium">{m.me}</span>
                <span className="ml-1.5 text-[9px] text-muted-foreground">
                  {m.openAgo}
                </span>
                <p className="mt-0.5 text-[11px] leading-snug">{m.comment2}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="min-h-7 flex-1 rounded border border-border px-2 py-1.5 text-[10px] text-muted-foreground">
                  {m.replyPlaceholder}
                </span>
                <span className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
                  <Send className="size-3" />
                </span>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="flex h-7 flex-1 items-center justify-center rounded-md bg-primary text-[11px] font-medium text-primary-foreground">
                {m.resolve}
              </span>
            </div>
          </div>

          {/* resolved issue row (collapsed) */}
          <div className="border-t border-border px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-white">
                <Check className="size-3" />
              </span>
              <span className="text-[11px] font-medium">{m.labeler}</span>
              <span className="text-[10px] text-muted-foreground">{m.resolvedAgo}</span>
              <ChevronDown className="ml-auto size-3.5 text-muted-foreground" />
            </div>
          </div>
        </aside>
      </div>
    </MockPanelFrame>
  );
}
