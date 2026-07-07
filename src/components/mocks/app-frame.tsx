import {
  Activity,
  BookOpen,
  ChevronsUpDown,
  Clapperboard,
  CreditCard,
  Database,
  FolderKanban,
  Gauge,
  HardDrive,
  KeyRound,
  LayoutDashboard,
  LayoutGrid,
  PanelLeftClose,
  Settings,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type {ReactNode} from 'react';

import {Logo} from '@/components/logo';
import {MockChrome, MockWindow} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

type NavKey =
  | 'dashboard'
  | 'activity'
  | 'files'
  | 'datasets'
  | 'wiki'
  | 'videos'
  | 'apps'
  | 'tokens'
  | 'license'
  | 'members'
  | 'usage'
  | 'billing'
  | 'settings';

const NAV_ITEMS: {key: NavKey; icon: LucideIcon}[] = [
  {key: 'dashboard', icon: LayoutDashboard},
  {key: 'activity', icon: Activity},
  {key: 'files', icon: HardDrive},
  {key: 'datasets', icon: Database},
  {key: 'wiki', icon: BookOpen},
  {key: 'videos', icon: Clapperboard},
  {key: 'apps', icon: LayoutGrid},
  {key: 'tokens', icon: KeyRound},
  {key: 'license', icon: ShieldCheck},
  {key: 'members', icon: Users},
  {key: 'usage', icon: Gauge},
  {key: 'billing', icon: CreditCard},
  {key: 'settings', icon: Settings},
];

/** Project shell (sidebar + main) mirroring the real app layout. */
export function MockAppFrame({
  activeNav,
  children,
}: {
  activeNav: NavKey;
  children: ReactNode;
}) {
  const {t} = useLanguage();
  const f = t.mocks.frame;

  return (
    <MockWindow>
      <MockChrome />
      <div className="flex min-h-[26rem] text-sm">
        <aside className="hidden w-52 shrink-0 flex-col border-r border-border bg-muted/30 md:flex">
          <div className="flex flex-col gap-3 px-3 pt-4 pb-3">
            <Logo />
            <span className="flex items-center gap-2 rounded-md border border-border bg-background/60 px-2 py-1.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded bg-foreground/5">
                <FolderKanban className="size-3" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-medium">
                  {f.projectName}
                </span>
                <span className="block text-[9px] text-muted-foreground">{f.plan}</span>
              </span>
              <ChevronsUpDown className="size-3 shrink-0 text-muted-foreground" />
            </span>
          </div>

          <nav className="flex-1 overflow-hidden px-2">
            <ul className="space-y-px">
              {NAV_ITEMS.map(({key, icon: Icon}) => {
                const active = key === activeNav;
                return (
                  <li key={key}>
                    <span
                      className={cn(
                        'relative flex items-center gap-2 rounded-md px-2 py-1 text-[11px]',
                        active
                          ? 'bg-accent font-medium text-foreground'
                          : 'text-muted-foreground/80',
                      )}
                    >
                      {active && (
                        <span className="absolute top-1 bottom-1 left-0 w-px rounded-full bg-foreground" />
                      )}
                      <Icon className="size-3.5 shrink-0" />
                      <span className="truncate">{f.nav[key]}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-border px-2 py-1.5">
            <span className="flex items-center gap-2 rounded-md px-2 py-1 text-[11px] text-muted-foreground">
              <PanelLeftClose className="size-3.5" />
              {f.collapse}
            </span>
          </div>
          <div className="border-t border-border px-3 py-2">
            <span className="flex items-center gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
                {f.userName.slice(0, 1)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-medium">
                  {f.userName}
                </span>
                <span className="block truncate text-[9px] text-muted-foreground">
                  {f.userEmail}
                </span>
              </span>
            </span>
          </div>
        </aside>

        <div className="min-w-0 flex-1 overflow-hidden p-5 sm:p-6">{children}</div>
      </div>
    </MockWindow>
  );
}
