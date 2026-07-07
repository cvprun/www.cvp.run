import {Copy, Download, KeyRound, Plus, Trash2} from 'lucide-react';

import {MockBadge} from '@/components/mocks/mock-ui';
import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

const PUBKEY = 'MCowBQYDK2VwAyEAq9Zt3lXhK2mF8dWn4rB1cJp6vTgY0eIuLxA5oNhRkSM=';

export function MockLicensePanel() {
  const {t} = useLanguage();
  const m = t.mocks.license;

  const tabs = m.tabs;
  const rows = [
    {
      key: 'A1B2C3D4-E5F60718-9A0BCDEF-01234567',
      customer: m.customers[0],
      status: m.statusActive,
      tone: 'success' as const,
      expiry: '2027-07-06',
      machines: '2 / 5',
    },
    {
      key: '7E6D5C4B-3A291807-F0E1D2C3-89ABCDEF',
      customer: m.customers[1],
      status: m.statusSuspended,
      tone: 'warning' as const,
      expiry: '2026-12-31',
      machines: '1 / 3',
    },
  ];

  return (
    <MockPanelFrame>
      {/* header + tabs */}
      <div className="flex items-center gap-2 border-b border-border px-4 pt-2.5">
        <span className="pb-2.5 text-sm font-semibold">{m.title}</span>
        <span className="ml-4 flex gap-3 text-[11px]">
          {tabs.map((tab, i) => (
            <span
              key={tab}
              className={cn(
                '-mb-px border-b-2 pb-2',
                i === 0
                  ? 'border-primary font-medium'
                  : 'border-transparent text-muted-foreground',
              )}
            >
              {tab}
            </span>
          ))}
        </span>
        <span className="mb-1.5 ml-auto flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[11px] font-medium text-primary-foreground">
          <Plus className="size-3" />
          {m.issue}
        </span>
      </div>

      {/* license table */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-[2.2fr_1fr_4rem_4.2rem_3rem_3rem] items-center gap-2 border-b border-border pb-2 text-[10px] text-muted-foreground">
          <span>{m.colKey}</span>
          <span>{m.colCustomer}</span>
          <span>{m.colStatus}</span>
          <span>{m.colExpiry}</span>
          <span className="text-right">{m.colMachines}</span>
          <span />
        </div>
        {rows.map(row => (
          <div
            key={row.key}
            className="grid grid-cols-[2.2fr_1fr_4rem_4.2rem_3rem_3rem] items-center gap-2 border-b border-border/50 py-2 text-[11px]"
          >
            <code className="truncate font-mono text-[10px]">{row.key}</code>
            <span className="truncate">{row.customer}</span>
            <span>
              <MockBadge tone={row.tone}>{row.status}</MockBadge>
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {row.expiry}
            </span>
            <span className="text-right font-mono text-[10px] tabular-nums">
              {row.machines}
            </span>
            <span className="flex justify-end gap-1 text-muted-foreground">
              <Copy className="size-3" />
              <Download className="size-3" />
              <Trash2 className="size-3" />
            </span>
          </div>
        ))}

        {/* signing key strip */}
        <div className="mt-3 rounded-md border border-border bg-muted/20 p-3">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold">
            <KeyRound className="size-3.5 text-muted-foreground" />
            {m.signKeyTitle}
          </span>
          <p className="mt-1 text-[10px] text-muted-foreground">{m.signKeyDesc}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px]">
            <span className="text-muted-foreground">{m.algorithm}</span>
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono">ed25519</code>
            <span className="text-muted-foreground">{m.publicKey}</span>
            <code className="min-w-0 flex-1 truncate rounded bg-muted px-1.5 py-0.5 font-mono">
              {PUBKEY}
            </code>
            <Copy className="size-3 shrink-0 text-muted-foreground" />
          </div>
        </div>
      </div>
    </MockPanelFrame>
  );
}
