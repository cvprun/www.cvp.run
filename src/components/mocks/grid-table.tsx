import {
  ArrowUpDown,
  Baseline,
  Calendar,
  CalendarDays,
  ChartGantt,
  ChevronLeft,
  ChevronRight,
  Download,
  EyeOff,
  FileImage,
  Group,
  Hash,
  LayoutGrid,
  Link2,
  ListChecks,
  ListFilter,
  LockOpen,
  PaintBucket,
  Paperclip,
  Plus,
  Search,
  Share2,
  SquareCheck,
  SquareChevronDown,
  SquareKanban,
  Table2,
  TextCursorInput,
  Upload,
  User,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

const COPY = {
  ko: {
    name: '라벨링 작업 현황',
    description: '9월 스프린트 라벨링 배치별 담당자·진척·검수 상태',
    views: ['그리드', '갤러리', '칸반', '캘린더', '타임라인', '폼', '설문'],
    lock: '시트 잠그기',
    filter: '필터',
    sort: '정렬',
    group: '그룹',
    color: '색상',
    hideFields: '필드 숨기기',
    search: '행 검색...',
    shareView: '뷰 공유',
    export: '내보내기',
    import: '가져오기',
    addRow: '행 추가',
    rowCount: '행 42개',
    prev: '이전',
    next: '다음',
    pageInfo: '3 중 1 페이지',
    cols: [
      '작업',
      '담당자',
      '상태',
      '샘플 수',
      '마감일',
      '검수',
      '데이터셋',
      '첨부',
      '가이드',
    ],
    done: '완료',
    rows: [
      [
        '야간 교차로 배치 #12',
        '김지훈',
        '완료',
        '1,240',
        '2026-09-18',
        true,
        '도심 주행 이미지',
        'guide.pdf',
        'wiki/night',
      ],
      [
        '보행자 키포인트 배치 #4',
        '박서연',
        '검수 중',
        '860',
        '2026-09-24',
        false,
        '보행자 포즈',
        'sample.png',
        'wiki/pose',
      ],
      [
        '라이다 차선 분할 #7',
        '이도현',
        '진행 중',
        '86',
        '2026-09-30',
        false,
        '라이다 스캔',
        '',
        'wiki/lane',
      ],
      [
        '고속도로 차량 배치 #9',
        '최유나',
        '완료',
        '2,015',
        '2026-09-12',
        true,
        '고속도로 영상',
        'rules.pdf',
        'wiki/hwy',
      ],
      [
        '우천 시 표지판 #3',
        '정민재',
        '대기',
        '420',
        '2026-10-06',
        false,
        '도심 주행 이미지',
        '',
        'wiki/sign',
      ],
      [
        '주차장 번호판 #2',
        '김지훈',
        '진행 중',
        '310',
        '2026-10-02',
        false,
        '주차장 CCTV',
        'plate.png',
        'wiki/lpr',
      ],
    ],
  },
  en: {
    name: 'Labeling tasks',
    description: 'Owner, progress and review state for each September labeling batch',
    views: ['Grid', 'Gallery', 'Kanban', 'Calendar', 'Timeline', 'Form', 'Survey'],
    lock: 'Lock sheet',
    filter: 'Filter',
    sort: 'Sort',
    group: 'Group',
    color: 'Color',
    hideFields: 'Hide fields',
    search: 'Search rows...',
    shareView: 'Share view',
    export: 'Export',
    import: 'Import',
    addRow: 'Add row',
    rowCount: '42 rows',
    prev: 'Previous',
    next: 'Next',
    pageInfo: 'Page 1 of 3',
    cols: [
      'Task',
      'Assignee',
      'Status',
      'Samples',
      'Due',
      'Reviewed',
      'Dataset',
      'Files',
      'Guide',
    ],
    done: 'Done',
    rows: [
      [
        'Night intersections #12',
        'Jihoon Kim',
        'Done',
        '1,240',
        '2026-09-18',
        true,
        'Urban driving',
        'guide.pdf',
        'wiki/night',
      ],
      [
        'Pedestrian keypoints #4',
        'Seoyeon Park',
        'In review',
        '860',
        '2026-09-24',
        false,
        'Pedestrian pose',
        'sample.png',
        'wiki/pose',
      ],
      [
        'LiDAR lane segmentation #7',
        'Dohyun Lee',
        'In progress',
        '86',
        '2026-09-30',
        false,
        'LiDAR scans',
        '',
        'wiki/lane',
      ],
      [
        'Highway vehicles #9',
        'Yuna Choi',
        'Done',
        '2,015',
        '2026-09-12',
        true,
        'Highway video',
        'rules.pdf',
        'wiki/hwy',
      ],
      [
        'Rainy road signs #3',
        'Minjae Jung',
        'Queued',
        '420',
        '2026-10-06',
        false,
        'Urban driving',
        '',
        'wiki/sign',
      ],
      [
        'Parking plates #2',
        'Jihoon Kim',
        'In progress',
        '310',
        '2026-10-02',
        false,
        'Parking CCTV',
        'plate.png',
        'wiki/lpr',
      ],
    ],
  },
} as const;

const VIEW_ICONS: LucideIcon[] = [
  Table2,
  LayoutGrid,
  SquareKanban,
  CalendarDays,
  ChartGantt,
  TextCursorInput,
  ListChecks,
];

/** `ColumnTypeIcon` per column: text, person, select, number, date, boolean,
 * reference, file, link. */
const COL_ICONS: LucideIcon[] = [
  Baseline,
  User,
  SquareChevronDown,
  Hash,
  Calendar,
  SquareCheck,
  Table2,
  Paperclip,
  Link2,
];

/** Container-query visibility per column (task, assignee, status always shown). */
const COL_HIDE = [
  '',
  '',
  '',
  'hidden @2xl:table-cell',
  'hidden @3xl:table-cell',
  'hidden @2xl:table-cell',
  'hidden @4xl:table-cell',
  'hidden @5xl:table-cell',
  'hidden @6xl:table-cell',
];

const DONE_COLOR = '#22c55e';
const AVATAR_COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#14b8a6', '#8b5cf6'];

function ToolbarToggle({
  icon: Icon,
  label,
  count,
}: {
  icon: LucideIcon;
  label: string;
  count?: number;
}) {
  return (
    <span
      className={cn(
        'flex h-6 shrink-0 items-center gap-1 rounded-md px-1.5 text-[10px]',
        count ? 'text-primary' : 'text-muted-foreground',
      )}
    >
      <Icon className="size-3" />
      <span className="hidden @xl:inline">{label}</span>
      {count ? (
        <span className="rounded bg-primary/10 px-1 text-[9px] tabular-nums">
          {count}
        </span>
      ) : null}
    </span>
  );
}

export function MockGridTable() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="grids"
      crumbs={[{label: c.name}]}
      title={c.name}
      fill
      actions={
        <>
          {/* GridLockToggle: ghost icon button (unlocked sheet → "시트 잠그기") */}
          <span
            title={c.lock}
            className="flex size-6 items-center justify-center text-muted-foreground"
          >
            <LockOpen className="size-3.5" />
          </span>
          {/* GridViewSwitcher */}
          <span className="flex items-center gap-0.5">
            {c.views.map((label, i) => {
              const Icon = VIEW_ICONS[i];
              const active = i === 0;
              return (
                <span
                  key={label}
                  className={cn(
                    'flex h-6 items-center gap-1 rounded-md px-1.5 text-[10px] font-medium',
                    active ? 'bg-primary/10 text-primary' : 'text-muted-foreground',
                  )}
                >
                  <Icon className="size-3 shrink-0" />
                  <span className={cn(!active && 'hidden @5xl:inline')}>{label}</span>
                </span>
              );
            })}
          </span>
        </>
      }
    >
      <div className="flex h-full flex-col">
        <p className="truncate px-4 py-1 text-[10px] text-muted-foreground sm:px-5">
          {c.description}
        </p>

        {/* GridToolbar */}
        <div className="flex items-center gap-0.5 border-y border-border bg-background px-2 py-1">
          <ToolbarToggle icon={ListFilter} label={c.filter} count={1} />
          <ToolbarToggle icon={ArrowUpDown} label={c.sort} />
          <ToolbarToggle icon={Group} label={c.group} />
          <ToolbarToggle icon={PaintBucket} label={c.color} count={1} />
          <ToolbarToggle icon={EyeOff} label={c.hideFields} />
          <span className="ml-auto flex items-center gap-0.5">
            <span className="flex h-6 w-24 items-center gap-1 rounded-md border border-input bg-background px-1.5 text-[10px] text-muted-foreground @3xl:w-36">
              <Search className="size-3 shrink-0" />
              <span className="truncate">{c.search}</span>
            </span>
            <span className="hidden @4xl:contents">
              <MockButton icon={Share2} variant="ghost">
                {c.shareView}
              </MockButton>
            </span>
            <span className="hidden @2xl:contents">
              <MockButton icon={Download} variant="ghost">
                {c.export}
              </MockButton>
              <MockButton icon={Upload} variant="ghost">
                {c.import}
              </MockButton>
            </span>
          </span>
        </div>

        {/* GridSheet */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <table className="w-full table-fixed text-[11px]">
            <thead>
              <tr className="h-7 bg-muted text-muted-foreground">
                <th className="w-8 border-r border-b border-border pr-1.5 text-right text-[10px] font-medium">
                  #
                </th>
                {c.cols.map((label, i) => {
                  const Icon = COL_ICONS[i];
                  return (
                    <th
                      key={label}
                      className={cn(
                        'border-r border-b border-border px-1.5 text-left font-medium',
                        i === 0 && 'w-[34%] @3xl:w-auto',
                        COL_HIDE[i],
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-1">
                        <Icon className="size-3 shrink-0" />
                        <span className="truncate">{label}</span>
                      </span>
                    </th>
                  );
                })}
                <th className="w-7 border-b border-border">
                  <Plus className="mx-auto size-3" />
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row, ri) => {
                const done = row[2] === c.done;
                return (
                  <tr
                    key={row[0]}
                    className="h-7 border-b border-border"
                    style={done ? {backgroundColor: `${DONE_COLOR}14`} : undefined}
                  >
                    <td
                      className="border-r border-border pr-1.5 text-right text-[10px] text-muted-foreground tabular-nums"
                      style={
                        done ? {boxShadow: `inset 3px 0 0 0 ${DONE_COLOR}`} : undefined
                      }
                    >
                      {ri + 1}
                    </td>
                    <td className="truncate border-r border-border px-1.5">{row[0]}</td>
                    <td className="border-r border-border px-1.5">
                      <span className="flex min-w-0 items-center gap-1">
                        <span
                          className="flex size-4 shrink-0 items-center justify-center rounded-full text-[8px] font-semibold text-white"
                          style={{background: AVATAR_COLORS[ri % AVATAR_COLORS.length]}}
                        >
                          {row[1].slice(0, 1)}
                        </span>
                        <span className="truncate text-[10px]">{row[1]}</span>
                      </span>
                    </td>
                    <td className="truncate border-r border-border px-1.5">{row[2]}</td>
                    <td
                      className={cn(
                        'border-r border-border px-1.5 text-right tabular-nums',
                        COL_HIDE[3],
                      )}
                    >
                      {row[3]}
                    </td>
                    <td
                      className={cn(
                        'truncate border-r border-border px-1.5 tabular-nums text-muted-foreground',
                        COL_HIDE[4],
                      )}
                    >
                      {row[4]}
                    </td>
                    <td className={cn('border-r border-border px-1.5', COL_HIDE[5])}>
                      {row[5] ? '✓' : '✗'}
                    </td>
                    <td className={cn('border-r border-border px-1.5', COL_HIDE[6])}>
                      <span className="block truncate rounded bg-muted px-1.5 py-0.5 text-[10px]">
                        {row[6]}
                      </span>
                    </td>
                    <td className={cn('border-r border-border px-1.5', COL_HIDE[7])}>
                      {row[7] && (
                        <span className="flex min-w-0 items-center gap-1">
                          <FileImage className="size-3 shrink-0 text-muted-foreground" />
                          <span className="truncate text-[10px]">{row[7]}</span>
                        </span>
                      )}
                    </td>
                    <td className={cn('border-r border-border px-1.5', COL_HIDE[8])}>
                      <span className="block truncate text-primary">{row[8]}</span>
                    </td>
                    <td />
                  </tr>
                );
              })}
              <tr className="h-7">
                <td colSpan={11} className="px-3 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Plus className="size-3" />
                    {c.addRow}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* footer: row count + pagination */}
        <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-1.5 text-[10px] text-muted-foreground">
          <span>{c.rowCount}</span>
          <span className="flex items-center gap-1.5">
            <MockButton icon={ChevronLeft}>{c.prev}</MockButton>
            <span className="hidden @xl:inline">{c.pageInfo}</span>
            <MockButton>
              {c.next}
              <ChevronRight className="size-3" />
            </MockButton>
          </span>
        </div>
      </div>
    </MockAppFrame>
  );
}
