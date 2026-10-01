import {
  BookOpen,
  Box,
  Braces,
  Clapperboard,
  Copy,
  Database,
  Download,
  Folder,
  FolderInput,
  FolderPlus,
  HardDrive,
  Image,
  LayoutGrid,
  List,
  MoreHorizontal,
  PenLine,
  Trash2,
  Upload,
  Video,
  X,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {MockBadge} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

const COPY = {
  ko: {
    title: '파일',
    trash: '휴지통',
    newFolder: '새 폴더',
    upload: '업로드',
    download: '다운로드',
    rename: '이름 변경',
    move: '이동',
    copy: '복사',
    delete: '삭제',
    selected: '3개 선택됨',
    folders: {datasets: 'Datasets', wiki: 'Wiki', videos: 'Videos'},
  },
  en: {
    title: 'Files',
    trash: 'Trash',
    newFolder: 'New folder',
    upload: 'Upload',
    download: 'Download',
    rename: 'Rename',
    move: 'Move',
    copy: 'Copy',
    delete: 'Delete',
    selected: '3 selected',
    folders: {datasets: 'Datasets', wiki: 'Wiki', videos: 'Videos'},
  },
} as const;

type Row = {
  icon: LucideIcon;
  iconClass: string;
  overlay?: LucideIcon;
  name: string;
  size: string;
  type: string;
  modified: string;
  selected?: boolean;
  folder?: boolean;
};

export function MockFiles() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  const rows: Row[] = [
    {
      icon: Folder,
      iconClass: 'text-muted-foreground',
      overlay: Database,
      name: c.folders.datasets,
      size: '—',
      type: 'folder',
      modified: '—',
      folder: true,
    },
    {
      icon: Folder,
      iconClass: 'text-muted-foreground',
      overlay: BookOpen,
      name: c.folders.wiki,
      size: '—',
      type: 'folder',
      modified: '—',
      folder: true,
    },
    {
      icon: Folder,
      iconClass: 'text-muted-foreground',
      overlay: Clapperboard,
      name: c.folders.videos,
      size: '—',
      type: 'folder',
      modified: '—',
      folder: true,
    },
    {
      icon: Image,
      iconClass: 'text-emerald-500/70',
      name: 'street_0421.jpg',
      size: '2.4 MB',
      type: 'jpeg',
      modified: '2026-09-28',
      selected: true,
    },
    {
      icon: Video,
      iconClass: 'text-rose-500/70',
      name: 'clip_07.mp4',
      size: '148 MB',
      type: 'mp4',
      modified: '2026-09-26',
      selected: true,
    },
    {
      icon: Box,
      iconClass: 'text-violet-500/70',
      name: 'lidar_seq08_0042.laz',
      size: '812 MB',
      type: 'laz',
      modified: '2026-09-24',
      selected: true,
    },
    {
      icon: Braces,
      iconClass: 'text-orange-500/70',
      name: 'labels.json',
      size: '1.1 MB',
      type: 'json',
      modified: '2026-09-21',
    },
  ];

  const bulk: {
    icon: LucideIcon;
    label: string;
    danger?: boolean;
    disabled?: boolean;
  }[] = [
    {icon: Download, label: c.download},
    {icon: PenLine, label: c.rename, disabled: true},
    {icon: FolderInput, label: c.move},
    {icon: Copy, label: c.copy},
    {icon: Trash2, label: c.delete, danger: true},
  ];

  return (
    <MockAppFrame
      activeNav="files"
      title={c.title}
      actions={
        <>
          <MockButton icon={FolderPlus}>{c.newFolder}</MockButton>
          <MockButton icon={Upload} variant="default">
            {c.upload}
          </MockButton>
        </>
      }
      tabs={[
        {icon: HardDrive, label: c.title, active: true},
        {icon: Trash2, label: c.trash},
      ]}
    >
      {/* PageToolbar: grid / table */}
      <div className="mb-3 flex items-center">
        <span className="flex overflow-hidden rounded-md border border-border">
          <span className="flex size-6 items-center justify-center text-muted-foreground">
            <LayoutGrid className="size-3" />
          </span>
          <span className="flex size-6 items-center justify-center bg-accent text-foreground">
            <List className="size-3" />
          </span>
        </span>
      </div>

      <div className="space-y-3 rounded-md border border-border bg-card p-3">
        {/* FileBreadcrumb */}
        <span className="flex items-center gap-1.5 text-[11px] font-medium">
          <HardDrive className="size-3.5" />
          {c.title}
        </span>

        {/* SelectionToolbar */}
        <div className="flex items-center gap-0.5 rounded-md border border-border bg-accent/50 px-1.5 py-1">
          {bulk.map(({icon: Icon, label, danger, disabled}) => (
            <span
              key={label}
              className={cn(
                'flex h-6 shrink-0 items-center gap-1 rounded-md px-1.5 text-[10px] font-medium',
                danger && 'text-destructive',
                disabled && 'opacity-50',
                // keep the bar on one line in narrow columns
                (label === c.rename || label === c.copy) && 'hidden @2xl:flex',
              )}
            >
              <Icon className="size-3" />
              {label}
            </span>
          ))}
          <span className="ml-auto flex shrink-0 items-center gap-1 text-[11px] font-medium">
            {c.selected}
            <X className="size-3 text-muted-foreground" />
          </span>
        </div>

        {/* FileTable */}
        <table className="w-full text-[11px]">
          <thead>
            <tr className="h-8 border-b border-border text-left text-muted-foreground">
              <th className="px-2 font-medium">Name</th>
              <th className="hidden px-2 font-medium @2xl:table-cell">Size</th>
              <th className="hidden px-2 font-medium @4xl:table-cell">Type</th>
              <th className="hidden px-2 font-medium @2xl:table-cell">Modified</th>
              <th className="w-6" />
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr
                key={row.name}
                className={cn(
                  'border-b border-border last:border-0',
                  row.selected && 'bg-accent',
                )}
              >
                <td className="px-2 py-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="relative shrink-0">
                      <row.icon
                        className={cn('size-3.5', row.iconClass)}
                        strokeWidth={1.5}
                      />
                      {row.overlay && (
                        <row.overlay className="absolute -right-1 -bottom-1 size-2 text-muted-foreground" />
                      )}
                    </span>
                    <span className="truncate font-medium">{row.name}</span>
                  </span>
                </td>
                <td className="hidden px-2 py-2 text-muted-foreground tabular-nums @2xl:table-cell">
                  {row.size}
                </td>
                <td className="hidden px-2 py-2 @4xl:table-cell">
                  <MockBadge tone={row.folder ? 'outline' : 'secondary'}>
                    {row.type}
                  </MockBadge>
                </td>
                <td className="hidden px-2 py-2 text-muted-foreground tabular-nums @2xl:table-cell">
                  {row.modified}
                </td>
                <td className="pr-1 text-muted-foreground">
                  {!row.folder && <MoreHorizontal className="size-3.5" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockAppFrame>
  );
}
