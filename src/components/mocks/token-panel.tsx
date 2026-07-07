import {Copy, MoreHorizontal, Plus, TriangleAlert} from 'lucide-react';

import {MockBadge} from '@/components/mocks/mock-ui';
import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';

const TOKEN = 'cvp_9f2a7b1c4e8d0356a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718';

export function MockTokenPanel() {
  const {t} = useLanguage();
  const m = t.mocks.tokens;

  return (
    <MockPanelFrame>
      {/* header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="text-sm font-semibold">{m.title}</span>
        <span className="ml-auto flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[11px] font-medium text-primary-foreground">
          <Plus className="size-3" />
          {m.create}
        </span>
      </div>

      {/* one-time plaintext reveal */}
      <div className="mx-4 mt-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold">
          <TriangleAlert className="size-3.5 text-amber-500" />
          {m.copyTitle}
        </span>
        <p className="mt-1 text-[10px] text-muted-foreground">{m.copyDesc}</p>
        <div className="mt-2 flex items-center gap-2">
          <code className="flex-1 truncate rounded bg-muted px-2 py-1 font-mono text-[10px]">
            {TOKEN}
          </code>
          <span className="flex size-6 shrink-0 items-center justify-center rounded border border-border text-muted-foreground">
            <Copy className="size-3" />
          </span>
        </div>
      </div>

      {/* tokens table */}
      <div className="p-4">
        <div className="grid grid-cols-[1.2fr_1.3fr_3.5rem_3.5rem_4.5rem_1.5rem] items-center gap-2 border-b border-border pb-2 text-[10px] text-muted-foreground">
          <span>{m.colName}</span>
          <span>{m.colScopes}</span>
          <span>{m.colStatus}</span>
          <span>{m.colExpiry}</span>
          <span>{m.colLastUsed}</span>
          <span />
        </div>
        <div className="grid grid-cols-[1.2fr_1.3fr_3.5rem_3.5rem_4.5rem_1.5rem] items-center gap-2 py-2.5 text-[11px]">
          <span className="min-w-0">
            <span className="block truncate font-medium">{m.rowName}</span>
            <span className="block truncate text-[10px] text-muted-foreground">
              {m.rowDesc}
            </span>
          </span>
          <span className="flex min-w-0 flex-wrap gap-1">
            <MockBadge tone="outline" className="font-mono">
              experiments:read
            </MockBadge>
            <MockBadge tone="outline" className="font-mono">
              models:read
            </MockBadge>
          </span>
          <span>
            <MockBadge tone="primary">{m.statusActive}</MockBadge>
          </span>
          <span className="text-[10px] text-muted-foreground">{m.noExpiry}</span>
          <span className="text-[10px] text-muted-foreground">{m.lastUsed}</span>
          <MoreHorizontal className="size-3.5 text-muted-foreground" />
        </div>
      </div>
    </MockPanelFrame>
  );
}
