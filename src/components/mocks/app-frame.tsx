/* eslint-disable react-refresh/only-export-components -- mock shell helpers (NAV_ICONS, useNavLabel) live beside the frame */
import {
  Activity,
  BookOpen,
  Box,
  BrainCircuit,
  ChevronRight,
  ChevronsUpDown,
  Clapperboard,
  Cpu,
  Cuboid,
  Database,
  Download,
  FileVideo2,
  Folder,
  FolderKanban,
  Gauge,
  HardDrive,
  House,
  LayoutDashboard,
  LayoutGrid,
  Map,
  MemoryStick,
  Mic,
  Package,
  PanelLeftClose,
  Radar,
  ScanSearch,
  Server,
  Settings,
  ShieldCheck,
  Signature,
  Table2,
  Wand2,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type {ReactNode} from 'react';

import {Logo} from '@/components/logo';
import {MockChrome, MockWindow} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Project shell mirroring app.cvp.run's desktop layout (`_AppLayout` →
 * `_AppSidebar` + `_PageChromeBar` + `PageFrame`):
 *
 * - sidebar: logo, project switcher, the DEFAULT sidebar blueprint
 *   (`constants/projectSidebar.ts`, agent apps folded into one group),
 *   collapse toggle, user menu;
 * - chrome bar: breadcrumb 홈 › project › section › …;
 * - page header: icon + h1 + meta | actions, then underline tabs.
 *
 * Sizes are scaled down ~0.8× so a whole screen fits a marketing column.
 */

export type NavKey =
  | 'dashboard'
  | 'activity'
  | 'usage'
  | 'agents'
  | 'rfdetr'
  | 'modbus'
  | 'sam2'
  | 'ytdlp'
  | 'ffmpeg'
  | 'pointcept'
  | 'timeseries'
  | 'collectors'
  | 'files'
  | 'datasets'
  | 'grids'
  | 'signatures'
  | 'meetings'
  | 'wiki'
  | 'maps'
  | 'twin'
  | 'memory'
  | 'videos'
  | 'apps'
  | 'mlops'
  | 'registry'
  | 'license'
  | 'graphs'
  | 'settings';

const NAV_LABELS: Record<'ko' | 'en', Record<NavKey | 'agentApps', string>> = {
  ko: {
    dashboard: '대시보드',
    activity: '활동',
    usage: '사용량',
    agents: '에이전트',
    agentApps: '에이전트 앱',
    rfdetr: 'RF-DETR',
    modbus: 'Modbus',
    sam2: 'SAM2',
    ytdlp: '다운로더',
    ffmpeg: '변환기',
    pointcept: 'Pointcept',
    timeseries: '시계열',
    collectors: 'Collectors',
    files: '파일',
    datasets: '데이터셋',
    grids: '그리드',
    signatures: '전자서명',
    meetings: '회의록',
    wiki: '위키',
    maps: '지도',
    twin: '디지털 트윈',
    memory: '메모리 맵',
    videos: '동영상',
    apps: '어플리케이션',
    mlops: 'MLOps',
    registry: '레지스트리',
    license: '제품키',
    graphs: '그래프',
    settings: '설정',
  },
  en: {
    dashboard: 'Dashboard',
    activity: 'Activity',
    usage: 'Usage',
    agents: 'Agents',
    agentApps: 'Agent apps',
    rfdetr: 'RF-DETR',
    modbus: 'Modbus',
    sam2: 'SAM2',
    ytdlp: 'Downloader',
    ffmpeg: 'Converter',
    pointcept: 'Pointcept',
    timeseries: 'Time series',
    collectors: 'Collectors',
    files: 'Files',
    datasets: 'Datasets',
    grids: 'Grids',
    signatures: 'Signatures',
    meetings: 'Meetings',
    wiki: 'Wiki',
    maps: 'Maps',
    twin: 'Digital Twin',
    memory: 'Memory maps',
    videos: 'Videos',
    apps: 'Applications',
    mlops: 'MLOps',
    registry: 'Registry',
    license: 'Product Keys',
    graphs: 'Graphs',
    settings: 'Settings',
  },
};

export const NAV_ICONS: Record<NavKey, LucideIcon> = {
  dashboard: LayoutDashboard,
  activity: Activity,
  usage: Gauge,
  agents: Cpu,
  rfdetr: ScanSearch,
  modbus: Server,
  sam2: Wand2,
  ytdlp: Download,
  ffmpeg: FileVideo2,
  pointcept: Box,
  timeseries: Activity,
  collectors: Radar,
  files: HardDrive,
  datasets: Database,
  grids: Table2,
  signatures: Signature,
  meetings: Mic,
  wiki: BookOpen,
  maps: Map,
  twin: Cuboid,
  memory: MemoryStick,
  videos: Clapperboard,
  apps: LayoutGrid,
  mlops: BrainCircuit,
  registry: Package,
  license: ShieldCheck,
  graphs: Workflow,
  settings: Settings,
};

const AGENT_APPS: NavKey[] = [
  'rfdetr',
  'modbus',
  'sam2',
  'ytdlp',
  'ffmpeg',
  'pointcept',
  'timeseries',
];

type NavEntry = NavKey | {group: NavKey[]};

const NAV_TREE: NavEntry[] = [
  'dashboard',
  'activity',
  'usage',
  'agents',
  {group: AGENT_APPS},
  'collectors',
  'files',
  'datasets',
  'grids',
  'signatures',
  'meetings',
  'wiki',
  'maps',
  'twin',
  'memory',
  'videos',
  'apps',
  'mlops',
  'registry',
  'license',
  'graphs',
  'settings',
];

/** Localized label for a sidebar section (used by mocks for crumbs/titles). */
export function useNavLabel(): (key: NavKey) => string {
  const {lang} = useLanguage();
  return key => NAV_LABELS[lang][key];
}

export type MockCrumb = {label: string; icon?: LucideIcon};

export type MockTab = {label: ReactNode; icon: LucideIcon; active?: boolean};

function NavRow({
  icon: Icon,
  label,
  active = false,
  indent = false,
  trailing,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  indent?: boolean;
  trailing?: ReactNode;
}) {
  return (
    <span
      className={cn(
        'relative flex items-center gap-2 rounded-md px-2 py-[5px] text-[11px] tracking-[-0.011em]',
        active
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground/65',
        indent && 'pl-6',
      )}
    >
      {active && (
        <span className="absolute top-1 bottom-1 left-0 w-px bg-sidebar-primary" />
      )}
      <Icon className={cn('size-3.5 shrink-0', !active && 'opacity-80')} />
      <span className="flex-1 truncate">{label}</span>
      {trailing}
    </span>
  );
}

/** Underline tab bar (`PageTabs`): icon + label, no horizontal padding. */
export function MockPageTabs({tabs, className}: {tabs: MockTab[]; className?: string}) {
  return (
    <nav
      className={cn(
        'flex items-center gap-x-4 overflow-hidden border-b border-border',
        className,
      )}
    >
      {tabs.map(({icon: Icon, label, active}, i) => (
        <span
          key={i}
          className={cn(
            '-mb-px inline-flex shrink-0 items-center gap-1 border-b-2 py-1.5 text-[11px] font-medium whitespace-nowrap',
            active
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground',
          )}
        >
          <Icon className="size-3.5" />
          {label}
        </span>
      ))}
    </nav>
  );
}

/** App-style small button (`Button size="sm"`): outline by default. */
export function MockButton({
  icon: Icon,
  children,
  variant = 'outline',
  className,
}: {
  icon?: LucideIcon;
  children?: ReactNode;
  variant?: 'outline' | 'default' | 'ghost' | 'destructive';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center gap-1 rounded-md px-2 text-[10px] font-medium whitespace-nowrap',
        variant === 'outline' && 'border border-input bg-background shadow-sm',
        variant === 'default' && 'bg-primary text-primary-foreground shadow',
        variant === 'ghost' && 'text-muted-foreground',
        variant === 'destructive' && 'border border-destructive/40 text-destructive',
        className,
      )}
    >
      {Icon && <Icon className="size-3" />}
      {children}
    </span>
  );
}

/**
 * Full project screen. Pass `title` to render the page header (title row +
 * optional tabs, as `PageFrame` does); omit it for editor-style pages whose
 * body fills the frame (`fill`).
 */
export function MockAppFrame({
  activeNav,
  crumbs = [],
  title,
  titleIcon,
  meta,
  actions,
  tabs,
  children,
  fill = false,
  className,
}: {
  activeNav: NavKey;
  /** Extra breadcrumb levels after 홈 › project › section. */
  crumbs?: MockCrumb[];
  title?: string;
  titleIcon?: LucideIcon;
  meta?: ReactNode;
  actions?: ReactNode;
  tabs?: MockTab[];
  children: ReactNode;
  /** Body without page padding (editors, canvases). */
  fill?: boolean;
  className?: string;
}) {
  const {t, lang} = useLanguage();
  const f = t.mocks.frame;
  const labels = NAV_LABELS[lang];
  const appsOpen = AGENT_APPS.includes(activeNav);
  const SectionIcon = NAV_ICONS[activeNav];
  const TitleIcon = titleIcon ?? SectionIcon;

  const trail: MockCrumb[] = [
    {icon: House, label: f.breadcrumbHome},
    {icon: FolderKanban, label: f.projectName},
    {icon: SectionIcon, label: labels[activeNav]},
    ...crumbs,
  ];

  return (
    <MockWindow className={cn('@container', className)}>
      <MockChrome />
      <div className="flex min-h-[26rem] text-sm">
        {/* sidebar */}
        <aside className="hidden w-48 shrink-0 flex-col border-r border-sidebar-border bg-sidebar @3xl:flex">
          <div className="flex flex-col gap-2.5 px-2.5 pt-3.5 pb-2.5">
            <span className="flex h-6 items-center justify-center">
              <Logo />
            </span>
            <span className="flex items-center gap-2 rounded-md p-1.5">
              <span
                className="flex size-6 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold text-white"
                style={{background: 'oklch(0.62 0.14 250)'}}
              >
                {f.projectName.slice(0, 1)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-semibold">
                  {f.projectName}
                </span>
                <span className="block text-[9px] text-sidebar-foreground/50">
                  {f.plan}
                </span>
              </span>
              <ChevronsUpDown className="size-3 shrink-0 text-sidebar-foreground/50" />
            </span>
          </div>

          <nav className="min-h-0 flex-1 overflow-hidden px-1.5 py-1">
            <div className="flex flex-col gap-px">
              {NAV_TREE.map(entry =>
                typeof entry === 'string' ? (
                  <NavRow
                    key={entry}
                    icon={NAV_ICONS[entry]}
                    label={labels[entry]}
                    active={entry === activeNav}
                  />
                ) : (
                  <div key="agent-apps" className="flex flex-col gap-px">
                    <NavRow
                      icon={Folder}
                      label={labels.agentApps}
                      trailing={
                        <ChevronRight
                          className={cn('size-3 shrink-0', appsOpen && 'rotate-90')}
                        />
                      }
                    />
                    {appsOpen &&
                      entry.group.map(key => (
                        <NavRow
                          key={key}
                          icon={NAV_ICONS[key]}
                          label={labels[key]}
                          active={key === activeNav}
                          indent
                        />
                      ))}
                  </div>
                ),
              )}
            </div>
          </nav>

          <div className="border-t border-sidebar-border px-1.5 py-1.5">
            <NavRow icon={PanelLeftClose} label={f.collapse} />
          </div>
          <div className="border-t border-sidebar-border px-1.5 py-2">
            <span className="flex items-center gap-2 rounded-md p-1.5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-[10px] font-semibold text-sidebar-primary-foreground">
                {f.userName.slice(0, 1)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-semibold">
                  {f.userName}
                </span>
                <span className="block truncate text-[9px] text-sidebar-foreground/50">
                  {f.userEmail}
                </span>
              </span>
              <ChevronsUpDown className="size-3 shrink-0 text-sidebar-foreground/50" />
            </span>
          </div>
        </aside>

        {/* main */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* page chrome bar: breadcrumb */}
          <div className="flex h-9 shrink-0 items-center border-b border-border bg-background/95 px-4">
            <ol className="flex min-w-0 items-center gap-1 overflow-hidden text-[11px] whitespace-nowrap text-muted-foreground">
              {trail.map(({icon: Icon, label}, i) => {
                const last = i === trail.length - 1;
                return (
                  <li
                    key={`${i}-${label}`}
                    className={cn(
                      'flex min-w-0 items-center gap-1',
                      // keep the tail visible when the frame gets narrow
                      i > 0 && i < trail.length - 2 && 'hidden @2xl:flex',
                    )}
                  >
                    {i > 0 && <ChevronRight className="size-3 shrink-0" />}
                    {Icon && <Icon className="size-3.5 shrink-0" />}
                    <span
                      className={cn('truncate', last && 'font-medium text-foreground')}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {title && (
            <div className="shrink-0 px-4 pt-4 sm:px-5">
              <div className="flex min-h-7 flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex min-w-0 flex-1 items-center gap-2">
                  <TitleIcon className="size-5 shrink-0 text-muted-foreground" />
                  <h3 className="truncate text-[17px] leading-tight font-semibold tracking-[-0.02em]">
                    {title}
                  </h3>
                  {meta && <span className="flex shrink-0 gap-1.5">{meta}</span>}
                </span>
                {actions && (
                  <span className="flex shrink-0 items-center gap-1.5">{actions}</span>
                )}
              </div>
              {tabs ? (
                <MockPageTabs tabs={tabs} className="mt-3" />
              ) : (
                <div className="mt-3 border-b border-border" />
              )}
            </div>
          )}

          <div
            className={cn(
              'min-h-0 flex-1 overflow-hidden',
              !fill && 'px-4 pt-4 pb-5 sm:px-5',
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </MockWindow>
  );
}
