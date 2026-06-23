import {
  Activity,
  Bot,
  ChevronsUpDown,
  Cpu,
  Database,
  Factory,
  FileText,
  FlaskConical,
  FolderKanban,
  LayoutDashboard,
  PanelLeftClose,
  Pencil,
  Settings,
  Users,
  Video,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

import {Logo} from '@/components/logo';
import {useLanguage} from '@/lib/i18n';
import type {Language} from '@/lib/translations';
import {cn} from '@/lib/utils';

const NAV_ICONS: LucideIcon[] = [
  LayoutDashboard,
  Activity,
  Cpu,
  Database,
  Workflow,
  Video,
  Factory,
  FlaskConical,
  Users,
  Settings,
];

type AgentStatus = 'online' | 'idle' | 'offline';

const STAT_ROWS: {key: 'statAgents' | 'statFiles' | 'statDatasets'; icon: LucideIcon; value: string; delta: string}[] = [
  {key: 'statAgents', icon: Bot, value: '12', delta: '+3'},
  {key: 'statFiles', icon: FileText, value: '248', delta: '+24'},
  {key: 'statDatasets', icon: Database, value: '7', delta: '+1'},
];

const AGENT_ROWS: {name: string; status: AgentStatus; n: number; unit: 'm' | 'h' | 'd'}[] = [
  {name: 'edge-cam-01', status: 'online', n: 2, unit: 'm'},
  {name: 'line-a-vision', status: 'idle', n: 18, unit: 'm'},
  {name: 'qa-inspector', status: 'online', n: 1, unit: 'h'},
  {name: 'gate-rtsp-07', status: 'offline', n: 3, unit: 'h'},
];

const FILE_ROWS: {name: string; size: string; n: number; unit: 'm' | 'h' | 'd'}[] = [
  {name: 'calibration_2026.json', size: '4.2 KB', n: 5, unit: 'm'},
  {name: 'line-a-batch.mp4', size: '182 MB', n: 40, unit: 'm'},
  {name: 'defects_dataset.zip', size: '1.3 GB', n: 2, unit: 'h'},
  {name: 'report_q2.pdf', size: '820 KB', n: 1, unit: 'd'},
];

function ago(lang: Language, n: number, unit: 'm' | 'h' | 'd') {
  if (lang === 'ko') {
    const u = unit === 'm' ? '분' : unit === 'h' ? '시간' : '일';
    return `${n}${u} 전`;
  }
  return `${n}${unit} ago`;
}

const STATUS_DOT: Record<AgentStatus, string> = {
  online: 'bg-brand-cyan',
  idle: 'bg-amber-400',
  offline: 'bg-muted-foreground/40',
};

export function AppShowcase() {
  const {t, lang} = useLanguage();
  const s = t.showcase;
  const statusLabel: Record<AgentStatus, string> = {
    online: s.statusOnline,
    idle: s.statusIdle,
    offline: s.statusOffline,
  };

  return (
    <section id="preview" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-brand-cyan uppercase">
            {s.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {s.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{s.description}</p>
        </div>

        {/* App window frame */}
        <div className="relative mx-auto mt-14 max-w-5xl">
          <div className="pointer-events-none absolute -inset-x-8 -top-8 bottom-0 -z-10 bg-mesh-glow opacity-40" />
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/10">
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
              <span className="flex gap-1.5">
                <span className="size-3 rounded-full bg-red-400/80" />
                <span className="size-3 rounded-full bg-amber-400/80" />
                <span className="size-3 rounded-full bg-green-400/80" />
              </span>
              <div className="mx-auto flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                <span className="font-mono">app.cvp.run</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px]">
                  <span className="size-1.5 animate-pulse rounded-full bg-brand-cyan" />
                  {s.windowStatus}
                </span>
              </div>
            </div>

            {/* app body */}
            <div className="flex min-h-[30rem] text-sm">
              {/* sidebar */}
              <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-muted/30 md:flex">
                {/* sidebar header */}
                <div className="flex flex-col gap-3 px-3 pt-4 pb-3">
                  <Logo />
                  <button className="flex items-center gap-2 rounded-md border border-border bg-background/60 px-2.5 py-2 text-left">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded bg-foreground/5">
                      <FolderKanban className="size-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-medium">
                        {s.projectName}
                      </span>
                      <span className="block text-[10px] text-muted-foreground">
                        {s.plan}
                      </span>
                    </span>
                    <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground" />
                  </button>
                </div>

                {/* nav */}
                <nav className="flex-1 overflow-hidden px-2">
                  <p className="px-2 py-2 text-[10px] font-semibold tracking-wider text-muted-foreground/70 uppercase">
                    {s.navGroup}
                  </p>
                  <ul className="space-y-0.5">
                    {s.nav.map((label, i) => {
                      const Icon = NAV_ICONS[i % NAV_ICONS.length];
                      const active = i === 0;
                      return (
                        <li key={label}>
                          <span
                            className={cn(
                              'relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px]',
                              active
                                ? 'bg-accent font-medium text-foreground'
                                : 'text-muted-foreground',
                            )}
                          >
                            {active && (
                              <span className="absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-full bg-foreground" />
                            )}
                            <Icon className="size-4 shrink-0" />
                            <span className="truncate">{label}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* sidebar footer */}
                <div className="border-t border-border px-2 py-2">
                  <span className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground">
                    <PanelLeftClose className="size-4" />
                    {s.collapse}
                  </span>
                </div>
                <div className="border-t border-border px-2 py-3">
                  <div className="flex items-center gap-2 rounded-md px-1.5 py-1">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background">
                      JD
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-medium">
                        {s.userName}
                      </span>
                      <span className="block truncate text-[10px] text-muted-foreground">
                        {s.userEmail}
                      </span>
                    </span>
                    <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground" />
                  </div>
                </div>
              </aside>

              {/* main content */}
              <div className="min-w-0 flex-1 overflow-hidden p-6 sm:p-8">
                {/* breadcrumb */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>{s.breadcrumbHome}</span>
                  <span>/</span>
                  <span>{s.projectName}</span>
                  <span>/</span>
                  <span className="text-foreground">{s.dashTitle}</span>
                </div>

                {/* header */}
                <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="size-6 text-foreground/80" />
                    <h3 className="text-2xl font-bold tracking-tight">{s.dashTitle}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground">
                      {s.preset}
                      <ChevronsUpDown className="size-3.5" />
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium">
                      <Pencil className="size-3.5" />
                      {s.edit}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.dashDescription}</p>

                {/* stat widgets */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {STAT_ROWS.map(stat => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.key}
                        className="rounded-md border border-border bg-background/40 p-4"
                      >
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon className="size-4" />
                          {s[stat.key]}
                        </div>
                        <div className="mt-3 text-3xl font-bold tracking-tight">
                          {stat.value}
                        </div>
                        <div className="mt-1 text-xs text-brand-cyan">
                          {stat.delta} {s.deltaWeek}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* list widgets */}
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {/* recent agents */}
                  <div className="rounded-md border border-border bg-background/40">
                    <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                      <Bot className="size-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">{s.recentAgents}</span>
                    </div>
                    <ul className="divide-y divide-border">
                      {AGENT_ROWS.map(row => (
                        <li
                          key={row.name}
                          className="flex items-center justify-between gap-3 px-4 py-2.5"
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <span
                              className={cn(
                                'size-1.5 shrink-0 rounded-full',
                                STATUS_DOT[row.status],
                              )}
                            />
                            <span className="truncate font-mono text-xs">{row.name}</span>
                          </span>
                          <span className="flex shrink-0 items-center gap-3">
                            <span className="text-[11px] text-muted-foreground">
                              {statusLabel[row.status]}
                            </span>
                            <span className="text-[11px] text-muted-foreground/70">
                              {ago(lang, row.n, row.unit)}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* recent files */}
                  <div className="rounded-md border border-border bg-background/40">
                    <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                      <FileText className="size-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">{s.recentFiles}</span>
                    </div>
                    <ul className="divide-y divide-border">
                      {FILE_ROWS.map(row => (
                        <li
                          key={row.name}
                          className="flex items-center justify-between gap-3 px-4 py-2.5"
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <FileText className="size-3.5 shrink-0 text-muted-foreground/70" />
                            <span className="truncate font-mono text-xs">{row.name}</span>
                          </span>
                          <span className="flex shrink-0 items-center gap-3">
                            <span className="text-[11px] text-muted-foreground">
                              {row.size}
                            </span>
                            <span className="text-[11px] text-muted-foreground/70">
                              {ago(lang, row.n, row.unit)}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">{s.mockNote}</p>
        </div>
      </div>
    </section>
  );
}
