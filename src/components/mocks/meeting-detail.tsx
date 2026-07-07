import {Check, ExternalLink, Play} from 'lucide-react';

import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';

function Step({label, last = false}: {label: string; last?: boolean}) {
  return (
    <span className="flex items-center gap-2">
      <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check className="size-3" />
      </span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
      {!last && <span className="h-px w-6 bg-border sm:w-8" />}
    </span>
  );
}

export function MockMeetingDetail() {
  const {t} = useLanguage();
  const m = t.mocks.meetings;

  return (
    <MockPanelFrame>
      {/* header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="text-sm font-semibold">{m.title}</span>
        <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
          {m.statusDone}
        </span>
      </div>

      {/* pipeline stepper */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-2.5">
        <Step label={m.stepUploading} />
        <Step label={m.stepTranscribing} />
        <Step label={m.stepSummarizing} />
        <Step label={m.stepDone} last />
      </div>

      <div className="space-y-3 px-4 py-3">
        {/* recording + minutes cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              {m.recordingTitle}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Play className="size-3" />
              </span>
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                <span className="block h-full w-[35%] rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[9px] text-muted-foreground tabular-nums">
                14:48 / {m.duration}
              </span>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              {m.minutesTitle}
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[10px] font-medium">
              <ExternalLink className="size-3" />
              {m.openWiki}
            </span>
          </div>
        </div>

        {/* transcript */}
        <div>
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
            {m.transcriptTitle}
          </p>
          <div className="mt-1.5 rounded-lg border border-border bg-card p-3">
            <p className="text-[11px] leading-relaxed whitespace-pre-wrap text-foreground/90">
              {m.transcript}
            </p>
          </div>
        </div>
      </div>
    </MockPanelFrame>
  );
}
