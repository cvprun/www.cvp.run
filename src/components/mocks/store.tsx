import {
  Activity,
  BadgeCheck,
  BookText,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Coins,
  Database,
  Download,
  FolderOpen,
  House,
  Lightbulb,
  Package,
  PanelLeftClose,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Table2,
  type LucideIcon,
} from 'lucide-react';

import {Logo} from '@/components/logo';
import {MockButton, MockPageTabs} from '@/components/mocks/app-frame';
import {MockBadge, MockChrome, MockWindow} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Global store (`/store`): the home sidebar (`_HomeNavigation`: workspace
 * links + recent projects), header with tabs and the publish button, the
 * browse toolbar (search, type, sort, official-only) and a grid of
 * `StoreItemCard`s.
 */

const COPY = {
  ko: {
    workspace: '워크스페이스',
    nav: ['활동', '프로젝트', '어시스턴트', '피드백', '스토어'],
    recentProjects: '최근 프로젝트',
    projects: ['자율주행 PoC', '용접 셀 A동', '품질 검사'],
    title: '스토어',
    tabs: ['둘러보기', '내 아이템', '구매 내역'],
    search: '스토어 검색',
    allTypes: '모든 종류',
    recent: '최신순',
    officialOnly: '공식만',
    publish: '등록하기',
    type: {wiki: '위키', grid: '그리드', dataset: '데이터셋'},
    official: '공식',
    free: '무료',
    noRating: '평가 없음',
    items: [
      [
        '오피스 허브',
        '회의록·주간 보고·업무 인수인계 페이지를 한 번에 설치하는 위키 묶음입니다.',
      ],
      [
        'COCO128 스타터',
        'COCO 80개 클래스에서 고른 128장과 박스 라벨. 첫 학습 확인용.',
      ],
      [
        '설비 점검 체크리스트',
        '일·주·월 점검 항목, 담당자, 사진 첨부 칸을 갖춘 설비 점검 그리드.',
      ],
      [
        '라벨링 가이드라인 템플릿',
        '클래스 정의, 경계 사례, 가림·잘림 규칙을 예시 이미지와 함께 정리합니다.',
      ],
      ['PCB 불량 유형 6종', '단락·오픈·스퍼·핀홀 등 6개 클래스, 1,386장 폴리곤 라벨.'],
      ['금형 이력 관리 대장', '금형별 타수, 수리 이력, 다음 점검일을 관리하는 그리드.'],
    ],
    authors: ['CVP', 'CVP', '한결 엔지니어링', '박소라', '비전랩', '김태오'],
  },
  en: {
    workspace: 'Workspace',
    nav: ['Activity', 'Projects', 'Assistant', 'Feedback', 'Store'],
    recentProjects: 'Recent projects',
    projects: ['AV Perception PoC', 'Welding cell A', 'Quality inspection'],
    title: 'Store',
    tabs: ['Browse', 'My items', 'Purchases'],
    search: 'Search the store',
    allTypes: 'All types',
    recent: 'Recent',
    officialOnly: 'Official only',
    publish: 'Publish',
    type: {wiki: 'Wiki', grid: 'Grid', dataset: 'Dataset'},
    official: 'Official',
    free: 'Free',
    noRating: 'Not rated',
    items: [
      [
        'Office Hub',
        'A wiki bundle that installs meeting notes, weekly reports and handover pages at once.',
      ],
      [
        'COCO128 Starter',
        '128 images picked from the 80 COCO classes, with box labels. For a first training check.',
      ],
      [
        'Equipment inspection checklist',
        'A grid of daily/weekly/monthly checks with owners and photo attachments.',
      ],
      [
        'Labeling guideline template',
        'Class definitions, edge cases and occlusion/truncation rules with example images.',
      ],
      [
        'PCB defects (6 types)',
        'Short, open, spur, pinhole and more: 6 classes, 1,386 polygon-labeled images.',
      ],
      [
        'Mold history ledger',
        'A grid tracking shot counts, repair history and next inspection per mold.',
      ],
    ],
    authors: [
      'CVP',
      'CVP',
      'Hangyeol Engineering',
      'Sora Park',
      'VisionLab',
      'Taeo Kim',
    ],
  },
} as const;

type ItemType = 'wiki' | 'grid' | 'dataset';

const TYPE_ICONS: Record<ItemType, LucideIcon> = {
  wiki: BookText,
  grid: Table2,
  dataset: Database,
};

const ITEMS: {
  type: ItemType;
  official?: boolean;
  price: number;
  rating: number | null;
  installs: number;
  tags: string[];
}[] = [
  {
    type: 'wiki',
    official: true,
    price: 0,
    rating: 4.8,
    installs: 1284,
    tags: ['office', 'template'],
  },
  {
    type: 'dataset',
    official: true,
    price: 0,
    rating: 4.6,
    installs: 932,
    tags: ['coco', 'detection'],
  },
  {
    type: 'grid',
    price: 300,
    rating: 4.4,
    installs: 214,
    tags: ['maintenance', 'factory'],
  },
  {type: 'wiki', price: 0, rating: 4.7, installs: 508, tags: ['labeling', 'guide']},
  {
    type: 'dataset',
    price: 1200,
    rating: 4.2,
    installs: 87,
    tags: ['pcb', 'segmentation', 'defect'],
  },
  {type: 'grid', price: 0, rating: null, installs: 12, tags: ['mold', 'ledger']},
];

const PROJECT_TINTS = [
  'oklch(0.62 0.14 250)',
  'oklch(0.64 0.15 35)',
  'oklch(0.6 0.13 155)',
];

function NavRow({
  icon: Icon,
  label,
  active = false,
}: {
  icon?: LucideIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        'relative flex items-center gap-2 rounded-md px-2 py-[5px] text-[11px] tracking-[-0.011em]',
        active
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground/65',
      )}
    >
      {active && (
        <span className="absolute top-1 bottom-1 left-0 w-px bg-sidebar-primary" />
      )}
      {Icon && <Icon className={cn('size-3.5 shrink-0', !active && 'opacity-80')} />}
      <span className="flex-1 truncate">{label}</span>
    </span>
  );
}

function Select({label}: {label: string}) {
  return (
    <span className="flex h-6 w-24 shrink-0 items-center justify-between rounded-md border border-input bg-background px-2 text-[10px]">
      <span className="truncate">{label}</span>
      <ChevronDown className="size-3 text-muted-foreground" />
    </span>
  );
}

export function MockStore() {
  const {t, lang} = useLanguage();
  const f = t.mocks.frame;
  const c = COPY[lang];
  const navIcons = [Activity, FolderOpen, Sparkles, Lightbulb, Store];

  return (
    <MockWindow className="@container">
      <MockChrome />
      <div className="flex min-h-[26rem] text-sm">
        {/* home sidebar */}
        <aside className="hidden w-48 shrink-0 flex-col border-r border-sidebar-border bg-sidebar @3xl:flex">
          <div className="flex flex-col px-2.5 pt-3.5 pb-2.5">
            <span className="flex h-6 items-center justify-center">
              <Logo />
            </span>
          </div>
          <nav className="min-h-0 flex-1 overflow-hidden px-1.5 py-1">
            <div className="px-2 pb-1.5 text-[9px] font-medium tracking-wider text-sidebar-foreground/55 uppercase">
              {c.workspace}
            </div>
            <div className="flex flex-col gap-px">
              {c.nav.map((label, i) => (
                <NavRow key={label} icon={navIcons[i]} label={label} active={i === 4} />
              ))}
            </div>
            <div className="mt-4 px-2 pb-1.5 text-[9px] font-medium tracking-wider text-sidebar-foreground/55 uppercase">
              {c.recentProjects}
            </div>
            <div className="flex flex-col gap-px">
              {c.projects.map((name, i) => (
                <span
                  key={name}
                  className="flex items-center gap-2 rounded-md px-2 py-[5px] text-[11px] text-sidebar-foreground/65"
                >
                  <span
                    className="flex size-3.5 shrink-0 items-center justify-center rounded-[3px] text-[8px] font-semibold text-white"
                    style={{background: PROJECT_TINTS[i]}}
                  >
                    {name.slice(0, 1)}
                  </span>
                  <span className="truncate">{name}</span>
                </span>
              ))}
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
          <div className="flex h-9 shrink-0 items-center border-b border-border bg-background/95 px-4">
            <ol className="flex items-center gap-1 text-[11px] whitespace-nowrap text-muted-foreground">
              <li className="flex items-center gap-1">
                <House className="size-3.5" />
                {f.breadcrumbHome}
              </li>
              <li className="flex items-center gap-1">
                <ChevronRight className="size-3" />
                <Store className="size-3.5" />
                <span className="font-medium text-foreground">{c.title}</span>
              </li>
            </ol>
          </div>

          <div className="shrink-0 px-4 pt-4 sm:px-5">
            <div className="flex min-h-7 items-center gap-3">
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <Store className="size-5 shrink-0 text-muted-foreground" />
                <h3 className="truncate text-[17px] leading-tight font-semibold tracking-[-0.02em]">
                  {c.title}
                </h3>
              </span>
              <MockButton icon={Plus} variant="default">
                {c.publish}
              </MockButton>
            </div>
            <MockPageTabs
              className="mt-3"
              tabs={[
                {icon: Store, label: c.tabs[0], active: true},
                {icon: Package, label: c.tabs[1]},
                {icon: ShoppingBag, label: c.tabs[2]},
              ]}
            />
          </div>

          <div className="min-h-0 flex-1 overflow-hidden px-4 pt-3 pb-5 sm:px-5">
            {/* toolbar */}
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              <span className="flex h-6 w-36 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px] text-muted-foreground/70">
                <Search className="size-3 text-muted-foreground" />
                {c.search}
              </span>
              <span className="hidden @2xl:contents">
                <Select label={c.allTypes} />
                <Select label={c.recent} />
              </span>
              <MockButton icon={BadgeCheck}>{c.officialOnly}</MockButton>
            </div>

            {/* grid */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(13.5rem,100%),1fr))] gap-3">
              {ITEMS.map((item, i) => {
                const Icon = TYPE_ICONS[item.type];
                const [title, summary] = c.items[i];
                return (
                  <div
                    key={title}
                    className={cn(
                      'flex flex-col rounded-md border border-border bg-card',
                      i >= 4 && 'hidden @2xl:flex',
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 px-3 pt-3">
                      <div className="flex min-w-0 items-start gap-2">
                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                          <Icon className="size-3.5" />
                        </span>
                        <div className="min-w-0 space-y-0.5">
                          <p className="truncate text-[12px] font-semibold tracking-[-0.01em]">
                            {title}
                          </p>
                          <span className="flex flex-wrap items-center gap-1">
                            <span className="text-[9px] tracking-wider text-muted-foreground uppercase">
                              {c.type[item.type]}
                            </span>
                            {item.official && (
                              <span className="inline-flex items-center gap-0.5 rounded-md border border-primary/40 px-1 text-[9px] font-medium text-primary">
                                <BadgeCheck className="size-2.5" />
                                {c.official}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      <span className="flex shrink-0 items-center gap-1 text-[11px] font-medium tabular-nums">
                        {item.price === 0 ? (
                          <MockBadge className="px-1 py-0 text-[9px] uppercase">
                            {c.free}
                          </MockBadge>
                        ) : (
                          <>
                            <Coins className="size-3 text-muted-foreground" />
                            {item.price.toLocaleString()}
                          </>
                        )}
                      </span>
                    </div>
                    <div className="flex-1 space-y-2 px-3 pt-2 pb-2">
                      <p className="line-clamp-2 text-[10px] leading-snug text-muted-foreground">
                        {summary}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(tag => (
                          <MockBadge
                            key={tag}
                            className="px-1 py-0 text-[9px] font-normal"
                          >
                            {tag}
                          </MockBadge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 px-3 pb-2.5 text-[10px] text-muted-foreground">
                      <span className="truncate">{c.authors[i]}</span>
                      <span className="flex shrink-0 items-center gap-2.5 tabular-nums">
                        <span className="flex items-center gap-0.5">
                          <Star className="size-3" />
                          {item.rating === null ? c.noRating : item.rating.toFixed(1)}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Download className="size-3" />
                          {item.installs}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}
