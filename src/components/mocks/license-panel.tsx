import {
  Copy,
  Download,
  FileText,
  Fingerprint,
  KeyRound,
  Plus,
  ShieldCheck,
  Trash2,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {MockBadge} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

const COPY = {
  ko: {
    title: '제품키',
    tabs: ['라이선스', '정책', '기능', '서명 키'],
    issue: '라이선스 발급',
    colKey: '키',
    colCustomer: '고객',
    colPolicy: '정책',
    colStatus: '상태',
    colExpires: '만료',
    colMachines: '머신',
    perpetual: '영구',
    status: {active: '활성', suspended: '일시중지', revoked: '취소됨'},
    customers: ['(주)비전로보틱스', '한빛정밀', '스마트팩토리랩'],
    policies: ['Pro 1년', 'Trial 30일', 'Enterprise 영구'],
  },
  en: {
    title: 'Product Keys',
    tabs: ['Licenses', 'Policies', 'Features', 'Signing Key'],
    issue: 'Issue License',
    colKey: 'Key',
    colCustomer: 'Customer',
    colPolicy: 'Policy',
    colStatus: 'Status',
    colExpires: 'Expires',
    colMachines: 'Machines',
    perpetual: 'Perpetual',
    status: {active: 'Active', suspended: 'Suspended', revoked: 'Revoked'},
    customers: ['Vision Robotics Inc.', 'Hanbit Precision', 'Smart Factory Lab'],
    policies: ['Pro 1 year', 'Trial 30 days', 'Enterprise perpetual'],
  },
} as const;

type Status = 'active' | 'suspended' | 'revoked';

const STATUS_TONE = {
  active: 'success',
  suspended: 'warning',
  revoked: 'destructive',
} as const;

const TAB_ICONS = [KeyRound, FileText, ShieldCheck, Fingerprint];

/** `/proj/:id/license` — licenses tab (TableShell with key/customer/policy/…). */
export function MockLicensePanel() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  const rows: {
    key: string;
    status: Status;
    expires: string | null;
    machines: number;
  }[] = [
    {
      key: 'A1B2C3D4-E5F60718-9A0BCDEF-01234567',
      status: 'active',
      expires: '2027-09-14 10:00',
      machines: 5,
    },
    {
      key: '7E6D5C4B-3A291807-F0E1D2C3-89ABCDEF',
      status: 'suspended',
      expires: '2026-10-21 09:30',
      machines: 1,
    },
    {
      key: '0F1E2D3C-4B5A6978-8796A5B4-C3D2E1F0',
      status: 'active',
      expires: null,
      machines: 20,
    },
  ];

  return (
    <MockAppFrame
      activeNav="license"
      title={c.title}
      tabs={c.tabs.map((label, i) => ({label, icon: TAB_ICONS[i], active: i === 0}))}
    >
      <div className="mb-3 flex justify-end">
        <MockButton icon={Plus} variant="default">
          {c.issue}
        </MockButton>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-card">
        <table className="w-full table-fixed text-[11px]">
          <thead>
            <tr className="h-8 border-b border-border text-muted-foreground">
              <th className="w-7 px-2">
                <span className="block size-3 rounded-sm border border-input" />
              </th>
              <th className="w-[42%] px-2 text-left font-medium">{c.colKey}</th>
              <th className="hidden px-2 text-left font-medium @2xl:table-cell">
                {c.colCustomer}
              </th>
              <th className="hidden px-2 text-left font-medium @4xl:table-cell">
                {c.colPolicy}
              </th>
              <th className="w-20 px-2 text-left font-medium">{c.colStatus}</th>
              <th className="hidden w-28 px-2 text-left font-medium @4xl:table-cell">
                {c.colExpires}
              </th>
              <th className="hidden w-12 px-2 text-right font-medium @4xl:table-cell">
                {c.colMachines}
              </th>
              <th className="w-20" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.key} className={cn(i > 0 && 'border-t border-border')}>
                <td className="px-2 py-2">
                  <span className="block size-3 rounded-sm border border-input" />
                </td>
                <td className="truncate px-2 py-2 font-mono text-[10px]">{row.key}</td>
                <td className="hidden truncate px-2 py-2 @2xl:table-cell">
                  {c.customers[i]}
                </td>
                <td className="hidden truncate px-2 py-2 @4xl:table-cell">
                  {c.policies[i]}
                </td>
                <td className="px-2 py-2">
                  <MockBadge tone={STATUS_TONE[row.status]}>
                    {c.status[row.status]}
                  </MockBadge>
                </td>
                <td className="hidden truncate px-2 py-2 text-[10px] tabular-nums text-muted-foreground @4xl:table-cell">
                  {row.expires ?? c.perpetual}
                </td>
                <td className="hidden px-2 py-2 text-right tabular-nums @4xl:table-cell">
                  {row.machines}
                </td>
                <td className="px-2 py-2">
                  <span className="flex justify-end gap-2 text-muted-foreground">
                    <Copy className="size-3.5" />
                    <Download className="size-3.5" />
                    <Trash2 className="size-3.5 text-destructive" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockAppFrame>
  );
}
