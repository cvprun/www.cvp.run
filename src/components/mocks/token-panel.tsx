import {
  CreditCard,
  HardDrive,
  KeyRound,
  MoreHorizontal,
  Plus,
  Settings2,
  SlidersHorizontal,
  TriangleAlert,
  Users,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {MockBadge} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

const COPY = {
  ko: {
    title: '액세스 토큰',
    create: '토큰 생성',
    tabs: [
      '일반',
      '스토리지',
      '멤버',
      '결제',
      '액세스 토큰',
      '메뉴 사용자화',
      '위험 영역',
    ],
    cols: {
      name: '이름',
      scopes: '범위',
      status: '상태',
      expires: '만료',
      lastUsed: '마지막 사용',
      actions: '작업',
    },
    active: '활성',
    revoked: '폐기됨',
    noExpiry: '무기한',
    never: '없음',
    scopes: {
      expRead: '실험: 읽기',
      expWrite: '실험: 쓰기',
      modelRead: '모델: 읽기',
      modelWrite: '모델: 쓰기',
      regPull: '레지스트리: 풀',
      regPush: '레지스트리: 푸시·풀',
    },
    rows: [
      ['CI 파이프라인', '학습 결과 MLflow 기록용'],
      ['배포 서버', '모델 내려받기 전용'],
      ['빌드 러너', '컨테이너 이미지 푸시'],
    ],
  },
  en: {
    title: 'Access Tokens',
    create: 'Create token',
    tabs: [
      'General',
      'Storage',
      'Members',
      'Billing',
      'Access Tokens',
      'Customize menu',
      'Danger Zone',
    ],
    cols: {
      name: 'Name',
      scopes: 'Scopes',
      status: 'Status',
      expires: 'Expires',
      lastUsed: 'Last used',
      actions: 'Actions',
    },
    active: 'Active',
    revoked: 'Revoked',
    noExpiry: 'No expiry',
    never: 'Never',
    scopes: {
      expRead: 'Experiments: read',
      expWrite: 'Experiments: write',
      modelRead: 'Models: read',
      modelWrite: 'Models: write',
      regPull: 'Registry: pull',
      regPush: 'Registry: push & pull',
    },
    rows: [
      ['CI pipeline', 'Logs training runs to MLflow'],
      ['Deploy server', 'Model download only'],
      ['Build runner', 'Pushes container images'],
    ],
  },
} as const;

const TAB_ICONS = [
  SlidersHorizontal,
  HardDrive,
  Users,
  CreditCard,
  KeyRound,
  Settings2,
  TriangleAlert,
];

export function MockTokenPanel() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const s = c.scopes;

  const rows = [
    {
      text: c.rows[0],
      scopes: [s.expWrite, s.modelWrite],
      active: true,
      expires: c.noExpiry,
      lastUsed: '2026-09-30 14:12',
    },
    {
      text: c.rows[1],
      scopes: [s.modelRead],
      active: true,
      expires: '2026-12-31',
      lastUsed: '2026-09-29 09:40',
    },
    {
      text: c.rows[2],
      scopes: [s.regPush],
      active: false,
      expires: '2026-10-15',
      lastUsed: c.never,
    },
  ];

  return (
    <MockAppFrame
      activeNav="settings"
      crumbs={[{label: c.title, icon: KeyRound}]}
      title={c.title}
      titleIcon={KeyRound}
      actions={
        <MockButton icon={Plus} variant="default">
          {c.create}
        </MockButton>
      }
      tabs={c.tabs.map((label, i) => ({icon: TAB_ICONS[i], label, active: i === 4}))}
    >
      <div className="rounded-md border border-border bg-card p-3">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="h-8 border-b border-border text-left text-muted-foreground">
              <th className="px-2 font-medium">{c.cols.name}</th>
              <th className="hidden px-2 font-medium @4xl:table-cell">
                {c.cols.scopes}
              </th>
              <th className="px-2 font-medium">{c.cols.status}</th>
              <th className="hidden px-2 font-medium @2xl:table-cell">
                {c.cols.expires}
              </th>
              <th className="hidden px-2 font-medium @4xl:table-cell">
                {c.cols.lastUsed}
              </th>
              <th className="w-10 px-2 font-medium whitespace-nowrap">
                {c.cols.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.text[0]} className="border-b border-border last:border-0">
                <td className="px-2 py-2">
                  <span className="block truncate font-medium">{row.text[0]}</span>
                  <span className="block truncate text-[10px] text-muted-foreground">
                    {row.text[1]}
                  </span>
                </td>
                <td className="hidden px-2 py-2 @4xl:table-cell">
                  <span className="flex flex-wrap gap-1">
                    {row.scopes.map(scope => (
                      <MockBadge key={scope} tone="outline">
                        {scope}
                      </MockBadge>
                    ))}
                  </span>
                </td>
                <td className="px-2 py-2">
                  <MockBadge
                    tone={row.active ? 'primary' : 'destructive'}
                    className={cn(!row.active && 'bg-destructive text-white')}
                  >
                    {row.active ? c.active : c.revoked}
                  </MockBadge>
                </td>
                <td className="hidden px-2 py-2 text-[10px] text-muted-foreground tabular-nums @2xl:table-cell">
                  {row.expires}
                </td>
                <td className="hidden px-2 py-2 text-[10px] text-muted-foreground tabular-nums @4xl:table-cell">
                  {row.lastUsed}
                </td>
                <td className="px-2 py-2 text-muted-foreground">
                  <MoreHorizontal className="size-3.5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockAppFrame>
  );
}
