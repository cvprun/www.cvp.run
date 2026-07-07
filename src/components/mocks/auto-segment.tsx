import {Check, Wand2} from 'lucide-react';

import {Swatch} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';

function Checkbox({checked = true}: {checked?: boolean}) {
  return (
    <span
      className={
        'flex size-3.5 shrink-0 items-center justify-center rounded-[4px] border ' +
        (checked
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border')
      }
    >
      {checked && <Check className="size-2.5" />}
    </span>
  );
}

function Field({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-36 shrink-0 text-[11px] text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

/** The 3D auto-segmentation dialog, reproduced as a floating card. */
export function MockAutoSegment() {
  const {t} = useLanguage();
  const m = t.mocks.autoseg;

  return (
    <div
      className="mx-auto w-full max-w-md rounded-xl border border-border bg-popover p-5 text-left shadow-2xl shadow-black/20"
      aria-hidden
    >
      <div className="flex items-center gap-2">
        <Wand2 className="size-4 text-muted-foreground" />
        <span className="text-sm font-semibold">{m.title}</span>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
        {m.description}
      </p>

      <div className="mt-4 space-y-2.5">
        <Field label={m.clusterClass}>
          <span className="flex h-7 flex-1 items-center gap-2 rounded-md border border-border bg-background px-2 text-[11px]">
            <Swatch color="#6496F5" />
            car
          </span>
        </Field>
        <Field label={m.gridSize}>
          <span className="flex h-7 w-24 items-center rounded-md border border-border bg-background px-2 font-mono text-[11px]">
            0.5
          </span>
        </Field>
        <Field label={m.minPoints}>
          <span className="flex h-7 w-24 items-center rounded-md border border-border bg-background px-2 font-mono text-[11px]">
            10
          </span>
        </Field>

        <div className="space-y-1.5 pt-1">
          <span className="flex items-center gap-2 text-[11px]">
            <Checkbox />
            {m.excludeInvalid}
          </span>
          <span className="flex items-center gap-2 text-[11px]">
            <Checkbox />
            {m.removePlane}
          </span>
          <span className="flex items-center gap-2 text-[11px]">
            <Checkbox checked={false} />
            {m.hideNoise}
          </span>
        </div>
      </div>

      <div className="mt-4 rounded bg-muted px-2 py-1.5 font-mono text-[10px] text-muted-foreground">
        {m.result}
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <span className="rounded-md border border-border px-3 py-1.5 text-[11px] text-muted-foreground">
          {m.cancel}
        </span>
        <span className="rounded-md bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground">
          {m.run}
        </span>
      </div>
    </div>
  );
}
