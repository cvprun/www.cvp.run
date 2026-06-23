/* eslint-disable react-refresh/only-export-components -- shared NAV_ICONS const co-located with frame components */
import {
  Activity,
  ChevronsUpDown,
  Cpu,
  Database,
  Factory,
  FlaskConical,
  FolderKanban,
  LayoutDashboard,
  LayoutGrid,
  PanelLeftClose,
  Settings,
  Users,
  Video,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

import {Logo} from '@/components/logo';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/** Icons aligned 1:1 with `showcase.nav` order in translations.ts. */
export const NAV_ICONS: LucideIcon[] = [
  LayoutDashboard,
  Activity,
  Cpu,
  Database,
  Workflow,
  Video,
  Factory,
  LayoutGrid,
  FlaskConical,
  Users,
  Settings,
];

export function AppFrame({
  activeNav,
  children,
}: {
  activeNav: number;
  children: React.ReactNode;
}) {
  const {t} = useLanguage();
  const s = t.showcase;

  return (
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
                <span className="block text-[10px] text-muted-foreground">{s.plan}</span>
              </span>
              <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground" />
            </button>
          </div>

          <nav className="flex-1 overflow-hidden px-2">
            <p className="px-2 py-2 text-[10px] font-semibold tracking-wider text-muted-foreground/70 uppercase">
              {s.navGroup}
            </p>
            <ul className="space-y-0.5">
              {s.nav.map((label, i) => {
                const Icon = NAV_ICONS[i % NAV_ICONS.length];
                const active = i === activeNav;
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
                <span className="block truncate text-xs font-medium">{s.userName}</span>
                <span className="block truncate text-[10px] text-muted-foreground">
                  {s.userEmail}
                </span>
              </span>
              <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground" />
            </div>
          </div>
        </aside>

        {/* main content */}
        <div className="min-w-0 flex-1 overflow-hidden p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}

/** Shared breadcrumb + title header used inside the main content area. */
export function ScreenHeader({
  icon: Icon,
  title,
  description,
  actions,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  const {t} = useLanguage();
  const s = t.showcase;

  return (
    <>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>{s.breadcrumbHome}</span>
        <span>/</span>
        <span>{s.projectName}</span>
        <span>/</span>
        <span className="text-foreground">{title}</span>
      </div>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Icon className="size-6 text-foreground/80" />
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
    </>
  );
}
