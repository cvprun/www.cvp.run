import {
  Cpu,
  Download,
  Loader2,
  MoreHorizontal,
  Plus,
  Radar,
  ScanSearch,
  Wand2,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Agents list (`/proj/:id/agents`, `_AgentsTable.tsx`): section tabs
 * 에이전트/설치, a card with the agents table — name + UUID + running-app chips,
 * solid status badges, last connected / created, row menu.
 */

const COPY = {
  ko: {
    title: '에이전트',
    install: '설치',
    create: '에이전트 생성',
    cardTitle: '에이전트',
    cardDescription: '이 프로젝트에 연결된 에이전트를 관리하세요.',
    name: '이름',
    status: '상태',
    lastConnected: '마지막 연결',
    createdAt: '생성일',
    actions: '작업',
    never: '없음',
    active: '활성',
    starting: '기동 중',
    disconnected: '연결 끊김',
    rfdetr: 'RF-DETR 비전 모델',
    sam2: 'SAM2 세그멘테이션',
    collectorSim: '수집기 시뮬레이터',
  },
  en: {
    title: 'Agents',
    install: 'Install',
    create: 'Create Agent',
    cardTitle: 'Agents',
    cardDescription: 'Manage agents connected to this project.',
    name: 'Name',
    status: 'Status',
    lastConnected: 'Last Connected',
    createdAt: 'Created',
    actions: 'Actions',
    never: 'Never',
    active: 'Active',
    starting: 'Starting',
    disconnected: 'Disconnected',
    rfdetr: 'RF-DETR Vision',
    sam2: 'SAM2 Segmentation',
    collectorSim: 'Collector simulator',
  },
} as const;

type Status = 'active' | 'starting' | 'disconnected';

const STATUS_CLASS: Record<Status, string> = {
  active: 'bg-emerald-500 text-white',
  starting: 'bg-blue-500 text-white',
  disconnected: 'bg-amber-500 text-white',
};

type Row = {
  name: string;
  id: string;
  status: Status;
  apps: {icon: LucideIcon; key: 'rfdetr' | 'sam2' | 'collectorSim'}[];
  lastConnected: string | null;
  created: string;
};

const ROWS: Row[] = [
  {
    name: 'gpu-node-01',
    id: '7f3a9c1e-4b8d-4e21-9a0c-5d2e8b61f0a4',
    status: 'active',
    apps: [
      {icon: ScanSearch, key: 'rfdetr'},
      {icon: Wand2, key: 'sam2'},
    ],
    lastConnected: '2026-10-01',
    created: '2026-08-14',
  },
  {
    name: 'line-02-edge',
    id: '2c91d05f-a3e7-41b6-8f2d-0e7c9a4b1d63',
    status: 'active',
    apps: [{icon: Radar, key: 'collectorSim'}],
    lastConnected: '2026-10-01',
    created: '2026-09-03',
  },
  {
    name: 'jetson-orin-03',
    id: '9b4e21c7-60fa-4d18-b3e5-7a2c0f9d8e15',
    status: 'starting',
    apps: [],
    lastConnected: null,
    created: '2026-09-30',
  },
  {
    name: 'plc-gateway-04',
    id: '5e08b7c2-d914-4a6f-8c31-b0e2f7a95d28',
    status: 'disconnected',
    apps: [],
    lastConnected: '2026-09-27',
    created: '2026-07-21',
  },
];

/** `toLocaleDateString()` as the app renders it in each language. */
function localDate(iso: string, lang: 'ko' | 'en'): string {
  const [y, m, d] = iso.split('-').map(Number);
  return lang === 'ko' ? `${y}. ${m}. ${d}.` : `${m}/${d}/${y}`;
}

export function MockAgentList() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="agents"
      title={c.title}
      actions={
        <MockButton icon={Plus} variant="default">
          {c.create}
        </MockButton>
      }
      tabs={[
        {icon: Cpu, label: c.title, active: true},
        {icon: Download, label: c.install},
      ]}
    >
      <div className="rounded-md border border-border bg-card">
        <div className="px-4 pt-3.5 pb-2">
          <p className="text-[13px] font-semibold tracking-[-0.01em]">{c.cardTitle}</p>
          <p className="text-[10px] text-muted-foreground">{c.cardDescription}</p>
        </div>
        <div className="px-4 pb-3">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="h-8 border-b border-border text-left text-muted-foreground">
                <th className="font-medium">{c.name}</th>
                <th className="px-2 font-medium">{c.status}</th>
                <th className="hidden px-2 font-medium @2xl:table-cell">
                  {c.lastConnected}
                </th>
                <th className="hidden px-2 font-medium @3xl:table-cell">
                  {c.createdAt}
                </th>
                <th className="w-8 font-medium" />
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, ri) => (
                <tr key={row.id} className={cn(ri > 0 && 'border-t border-border')}>
                  <td className="max-w-0 py-2">
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span className="min-w-0 shrink-0">
                        <span className="block text-[11px] leading-tight font-medium">
                          {row.name}
                        </span>
                        <span className="block max-w-[11rem] truncate text-[9px] text-muted-foreground @3xl:max-w-none">
                          {row.id}
                        </span>
                      </span>
                      {row.status === 'active' && (
                        <span className="hidden min-w-0 items-center gap-0.5 overflow-hidden @xl:flex">
                          {row.apps.map(({icon: Icon, key}) => (
                            <span
                              key={key}
                              className="flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground"
                            >
                              <Icon className="size-3" />
                              {c[key]}
                            </span>
                          ))}
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-2 py-2">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap',
                        STATUS_CLASS[row.status],
                      )}
                    >
                      {row.status === 'starting' && (
                        <Loader2 className="mr-1 size-2.5 animate-spin" />
                      )}
                      {c[row.status]}
                    </span>
                  </td>
                  <td className="hidden px-2 py-2 whitespace-nowrap text-muted-foreground @2xl:table-cell">
                    {row.lastConnected ? localDate(row.lastConnected, lang) : c.never}
                  </td>
                  <td className="hidden px-2 py-2 whitespace-nowrap text-muted-foreground @3xl:table-cell">
                    {localDate(row.created, lang)}
                  </td>
                  <td className="py-2 text-muted-foreground">
                    <span className="flex size-6 items-center justify-center">
                      <MoreHorizontal className="size-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MockAppFrame>
  );
}
